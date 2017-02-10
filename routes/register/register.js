// --------------- Generic function -----------------
var utils = require(process.env.NODE_PATH + '/utils.js');
var os = require('os');

var express = require('express');
var router = express.Router();
// Mongoose database
var mongoose = require(process.env.NODE_PATH + '/db/db_connect.js');
// Schema and model
var TPP_data_model = require(process.env.NODE_PATH + '/tpp_db_structure.js');

var templatePath = require.resolve('./register.marko');
var template = require('marko').load(templatePath);

/* GET register page. */
router.get('/', function (req, res) {
    console.log("register");
    template.render({ title: 'User registration' }, res);
});

// Encryption bCrypt for password
var bCrypt = require('bcrypt-nodejs');

/* POST register page. */
router.post('/', function (req, res) {
    console.log("registering");
    TPP_data_model.user.findOne({ 'username': req.body.username }, function (err, user) {
        // In case of any error return
        if (err) {
            console.log('Error in registration: ' + err);
            res.send('Error in registration: ' + err);
        }
        // already exists
        if (user) {
            console.log('User already exists');
            res.send('User already exists');
        } else {
            var new_user = new TPP_data_model.user({
                name: req.body.name,
                username: req.body.username,
                password: bCrypt.hashSync(req.body.password),
                identity: req.body.identity,
                address: req.body.address,
                created: new Date(),
                event: utils.printLogTime() + " Account created" + os.EOL,
                activated: true,
            });

            new_user.save(function (err) {
                if (err) {
                    console.log('Error in Saving user: ' + err);
                    throw err;
                }
                console.log('User ' + new_user.name + ' registered successfully!');
                res.send('User ' + new_user.name + ' registered successfully!');
            });
        }
    });
});

module.exports = router;
