// --------------- Generic function -----------------
var utils = require(process.env.NODE_PATH + '/utils.js');

var db_config = require('./db_config.js');
var mongoose = require('mongoose');
mongoose.connect(db_config.url);

// Mongoose connection events
{
    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log(utils.printLogTime() + ' Mongoose connected to ' + db_config.url);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log(utils.printLogTime() + ' Mongoose connection error: ' + err);

        process.exit(0);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log(utils.printLogTime() + ' Mongoose disconnected');
    });
}

module.exports = mongoose;