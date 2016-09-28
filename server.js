// --------------- Generic function -----------------
// Log timing functions
function printLogTime() {

    var curr_time = new Date();

    var hour = curr_time.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = curr_time.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = curr_time.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec; // 0 padding

    var msec = curr_time.getMilliseconds();
    msec = (msec < 10 ? "00" : msec < 100 ? "0" : "") + msec;

    return "[ " + curr_time.getUTCFullYear() + "-" + (curr_time.getUTCMonth() + 1) + "-" + (curr_time.getUTCDate() + 1) + " " + hour + ":" + min + ":" + sec + "." + msec + " ]";
}

// --------------- MongoDB initialize ---------------
var DB_ADDR = '10.128.0.215';
var DB_PORT = '27017';
var DB_NAME = 'tpp_stock';  // Database name

var db = require('monk')((DB_ADDR + ":" + DB_PORT + '/' + DB_NAME), function (err) {
    if (err) {
        console.log(printLogTime() + " " + "Error: Monk connection failed " + DB_ADDR + ":" + DB_PORT + '/' + DB_NAME);
        console.log("Message: " + err);
        process.exit(1);
    } else {
        console.log(printLogTime() + " " + "Connected to MongoDB " + DB_ADDR + ":" + DB_PORT + '/' + DB_NAME);
    }
});

// --------------- Hashmap initialize ---------------
var HashMap = require('hashmap');


// --------------- Express API server initialize ---------------
var listening_ip = '0.0.0.0';
var listening_port = 80;

var express = require('express');
var app = express();

var server = app.listen(process.env.SKYBOT_PORT || listening_port, process.env.SKYBOT_IP || listening_ip, function () {
    console.log(printLogTime() + ' TPP stock management service is now listening on %s:%s', server.address().address, server.address().port);
});

// Express configure
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/client_ui'));

// --------------- UserDB ----------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + DB_ADDR + ":" + DB_PORT + '/' + DB_NAME);

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'atppstockservicesecretkey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// --------------- Socket.IO ---------------
var client_socket_info = new HashMap();
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    //var socketId = socket.id;
    var clientIp = socket.request.socket._peername.address;
    var clientPort = socket.request.socket._peername.port;
    console.log(printLogTime() + ' New connection from IP: ' + clientIp + " Port: " + clientPort);

    socket.on('login', function (data) {
        console.log(printLogTime() + " Client login as a: " + data.mode);
        socket.emit('set ip', { ip: clientIp });

        // Grap socket id to it's role
        switch (data.mode) {
            case 'web':
                client_socket_info.set(socket.id, {
                    client_ip: clientIp,
                    client_port: clientPort,
                    login: 'yes'
                });
                break;
            default:
                console.log(printLogTime() + " Unknow role " + data.mode);
                break;
        }
    });

    socket.on('check login', function (client_info) {
        var login_info = {
            user: 'dev',
            status: 'permitted',

        };
    });

    socket.on('leave', function (client_info) {
        console.log(printLogTime() + " Disconnecting from " + client_info.mode + " IP: " + client_info.ip);
    });
});


// --------------- Terminate cleanup ---------------
function terminate_cleanup() {
    console.log(printLogTime() + " Closing server");

    if (io) {
        // Socket IO closing
        io.close();

        // MongoDB closing
        db.close();
        process.exit();
    }
}

// CTRL-C
process.on('SIGINT', function () {
    terminate_cleanup();
});

// Kill
process.on('SIGTERM', function () {
    terminate_cleanup();
});