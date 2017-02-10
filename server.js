// --------------- App home path --------------------
// set up NODE_PATH for global access through the app
process.env.NODE_PATH = __dirname;

// --------------- Generic function -----------------
var utils = require('./utils.js');

// Global mongoose connection
var mongoose = require(process.env.NODE_PATH + '/db/db_connect.js');

// --------------- Express server parameters ---------------
var listening_ip = '0.0.0.0';
var listening_port = 8080;

var express = require('express');
var app = express();

// --------------- Express configure ---------------
var logger = require('morgan');
app.use(logger('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Route home path
var route = process.env.NODE_PATH + '/routes';

// This moddleware can protect the route
app.use(function timeLog(req, res, next) {
    console.log('------------------- Time: ', Date.now());
    next();
});

// --------------- Passport authentication ---------------
var pass_authen = require(route + '/login/passport_authen.js');
app.use('/', pass_authen);

// --------------- Express API server initialize ---------------
var server = app.listen(process.env.SERV_PORT || listening_port, process.env.SERV_IP || listening_ip, function () {
    console.log(utils.printLogTime() + ' TPP stock management service is now listening on %s:%s', server.address().address, server.address().port);
});

// --------------- Configure routes ---------------  
app.use('/public', express.static(process.env.NODE_PATH + '/routes/public'));

// Specific
var pass_authen = require(route + '/login/passport_authen.js');
var home = require(route + '/home/home');
var login = require(route + '/login/login');
var register = require(route + '/register/register');
var test = require(route + '/test/test');
app.use('/', home);
app.use('/login', login);
app.use('/register', register);
app.use('/test', test);

// --------------- Socket.IO ---------------
var io = require('socket.io')(server);
// Event implementations
require(process.env.NODE_PATH + '/socket.io/event')(io);

// --------------- Terminate cleanup ---------------
function terminate_cleanup() {
    console.log(utils.printLogTime() + " Closing server");

    // Socket IO closing
    if (io) {
        console.log(utils.printLogTime() + " Closing Socket.IO");
        io.close();
    }

    // Mongoose DB Disconnecting
    if (mongoose) {
        mongoose.connection.close(function () {
            console.log(utils.printLogTime() + ' Closing Mongoose connection');

            process.exit(0);
        });
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