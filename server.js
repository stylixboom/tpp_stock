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

// Configure internal directories
var api = process.env.NODE_PATH + '/api';
var ui = process.env.NODE_PATH + '/ui';

// This moddleware can protect the route
app.use(function timeLog(req, res, next) {
    console.log('------------------- Time: ', Date.now());
    next();
});

// --------------- Passport authentication ---------------
var pass_authen = require(ui + '/login/passport_authen.js');
app.use('/', pass_authen);

// --------------- Express API server initialize ---------------
var server = app.listen(process.env.SERV_PORT || listening_port, process.env.SERV_IP || listening_ip, function () {
    console.log(utils.printLogTime() + ' TPP stock management service is now listening on %s:%s', server.address().address, server.address().port);
});

// --------------- Configure routes ---------------  
// ---- API
var api_register = require(api + '/register/register');
app.use('/api/register', api_register);

// ---- UI
var ui_home = require(ui + '/home/home');
var ui_login = require(ui + '/login/login');
var ui_register = require(ui + '/register/register');
var ui_test = require(ui + '/test/test');
app.use('/public', express.static(ui + '/public'));
app.use('/', ui_home);
app.use('/login', ui_login);
app.use('/register', ui_register);
app.use('/test', ui_test);


// --------------- Socket.IO ---------------
var io = require('socket.io')(server);
// Socket.IO events implementation
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