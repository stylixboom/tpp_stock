var express = require('express');
var router = express.Router();

// --------------- Configure passport ----------------
// **** Passport and authentication need to be set before all routes
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// initialize
router.use(passport.initialize());
router.use(passport.session());

// -------------- Logged in user Instance ---------------
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
    })
);

router.get('/loginFailure', function (req, res, next) {
    res.send('Failed to authenticate');
});

router.get('/loginSuccess', function (req, res, next) {
    res.send('Successfully authenticated');
});

// serialize/deserialize user instance
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// Encryption bCrypt for password
var bCrypt = require('bcrypt-nodejs');
var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}

// -------------- Using mongoose to connect to MongoDB ---------------
var mongoose = require(process.env.NODE_PATH + '/db/db_connect.js');

// Schema and model
var TPP_data_model = require(process.env.NODE_PATH + '/tpp_db_structure.js');

// Authentication logic with passport
passport.use(new LocalStrategy(function (username, password, done) {
    process.nextTick(function () {
        // check in mongo if a user with username exists or not
        TPP_data_model.user.findOne({
            'username': username
        },
            function (err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(null, false);
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }
                // User and password both match, return user from 
                // done method which will be treated like success
                return done(null, user);
            }
        );
    });
}));

module.exports = router;