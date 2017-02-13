var express = require('express');
var router = express.Router();

var templatePath = require.resolve('./register.marko');
var template = require('marko').load(templatePath);

/* GET register page. */
router.get('/', function (req, res) {
    console.log("register");
    template.render({ title: 'User registration' }, res);
});

module.exports = router;
