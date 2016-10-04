var express = require('express');
var router = express.Router();

var templatePath = require.resolve('./home.marko');
var template = require('marko').load(templatePath);

/* GET home page. */
console.log("read home.js");
router.get('/', function (req, res) {
    console.log("home");
    template.render({ title: 'Welcome' }, res);
});

module.exports = router;
