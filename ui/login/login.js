var express = require('express');
var router = express.Router();

var templatePath = require.resolve('./login.marko');
var template = require('marko').load(templatePath);

/* GET home page. */
console.log("read login.js");
router.get('/', function (req, res) {
    console.log("login");
    template.render({ title: 'Login' }, res);
});

module.exports = router;
