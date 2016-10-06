// --------------- Generic function -----------------
var utils = require('./utils.js');

var dbConfig = require('./db_config.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

// Mongoose connection events
{
    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log(utils.printLogTime() + ' Mongoose connected to ' + dbConfig.url);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log(utils.printLogTime() + ' Mongoose connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log(utils.printLogTime() + ' Mongoose disconnected');
    });
}

module.exports = mongoose;