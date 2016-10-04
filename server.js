// --------------- Generic function -----------------
var utils = require('./utils.js');

// --------------- MongoDB initialize ---------------
var DB_ADDR = '10.128.0.215';
var DB_PORT = '27017';
var DB_NAME = 'tpp_stock'; // Database name

var db = require('monk')((DB_ADDR + ":" + DB_PORT + '/' + DB_NAME), function (err) {
    if (err) {
        console.log(utils.printLogTime() + " " + "Error: Monk connection failed " + DB_ADDR + ":" + DB_PORT + '/' + DB_NAME);
        console.log("Message: " + err);
        process.exit(1);
    } else {
        console.log(utils.printLogTime() + " " + "Connected to MongoDB " + DB_ADDR + ":" + DB_PORT + '/' + DB_NAME);
    }
});

// --------------- Express server parameters ---------------
var listening_ip = '0.0.0.0';
var listening_port = 8080;

var express = require('express');
var app = express();

// Express configure
var logger = require('morgan');
app.use(logger('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// --------------- Configure passport ----------------
// **** Passport and authentication need to be set before all routes
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// initialize
app.use(passport.initialize());
app.use(passport.session());

// -------------- Logged in user Instance ---------------
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
    })
);

app.get('/loginFailure', function (req, res, next) {
    res.send('Failed to authenticate');
});

app.get('/loginSuccess', function (req, res, next) {
    res.send('Successfully authenticated');
});

// serialize/deserialize user instance
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var bCrypt = require('bcrypt-nodejs');
var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}


// -------------- User query/authen with MongoDB ---------------
var mongoose = require('mongoose/');
mongoose.connect('mongodb://localhost/tpp_db');
// Schema and model
var Schema = mongoose.Schema;
var UserDetail = new Schema({
    username: String,
    password: String
}, {
        collection: 'userInfo'
    });
var UserDetails = mongoose.model('userInfo', UserDetail);

// Authentication logic with passport
passport.use(new LocalStrategy(function (username, password, done) {
    process.nextTick(function () {
        UserDetails.findOne({
            'username': username,
        }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
}));

// --------------- Express API server initialize ---------------
var server = app.listen(process.env.SERV_PORT || listening_port, process.env.SERV_IP || listening_ip, function () {
    console.log(utils.printLogTime() + ' TPP stock management service is now listening on %s:%s', server.address().address, server.address().port);
});

/*
// Routes hot-reload
const path = require('path');
var templatesDir = __dirname + '/routes';
require('marko/hot-reload').enable();
require('fs').watch(templatesDir, function (event, filename) {
    if (/\.marko$/.test(filename)) {
        // Resolve the filename to a full template path:
        var templatePath = path.join(templatesDir, filename);

        console.log('Marko template modified: ', templatePath);

        // Pass along the *full* template path to marko
        require('marko/hot-reload').handleFileModified(templatePath);
    }
});
*/

// --------------- Configure routes ---------------  
// Generic
var route = __dirname + '/routes';
app.use('/public', express.static(__dirname + '/routes/public'));

// Specific
var home = require(route + '/home/home');
var login = require(route + '/login/login');
var register = require(route + '/register/register');
var test = require(route + '/test/test');
app.use('/', home);
app.use('/login', login);
app.use('/register', register);
app.use('/test', test);


// --------------- Hashmap initialize ---------------
var HashMap = require('hashmap');

// --------------- Socket.IO ---------------
var client_socket_info = new HashMap();
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    //var socketId = socket.id;
    var clientIp = socket.request.socket._peername.address;
    var clientPort = socket.request.socket._peername.port;
    console.log(utils.printLogTime() + ' New connection from IP: ' + clientIp + " Port: " + clientPort);

    socket.on('login', function (data) {
        console.log(utils.printLogTime() + " Client login as a: " + data.mode);
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
                console.log(utils.printLogTime() + " Unknow role " + data.mode);
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
        console.log(utils.printLogTime() + " Disconnecting from " + client_info.mode + " IP: " + client_info.ip);
    });

});

// --------------- Terminate cleanup ---------------
function terminate_cleanup() {
    console.log(utils.printLogTime() + " Closing server");

    if (io) {
        console.log(utils.printLogTime() + " Closing Socket.IO");
        // Socket IO closing
        io.close();
    }

    if (db) {
        console.log(utils.printLogTime() + " Closing DB");
        // MongoDB closing
        db.close();
    }

    process.exit();
}

// CTRL-C
process.on('SIGINT', function () {
    terminate_cleanup();
});

// Kill
process.on('SIGTERM', function () {
    terminate_cleanup();
});