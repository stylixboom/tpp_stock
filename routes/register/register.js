var express = require('express');
var router = express.Router();

var templatePath = require.resolve('./register.marko');
var template = require('marko').load(templatePath);

/* GET home page. */
console.log("read register.js");
router.get('/', function (req, res) {
    console.log("register");
    template.render({ title: 'register' }, res);
});


router.post('/', function (req, res) {
    console.log("registering");
    template.render({ title: 'register' }, res);
});

module.exports = router;
