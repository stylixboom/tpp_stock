var express = require('express');
var router = express.Router();

var templatePath = require.resolve('./test.marko');
var template = require('marko').load(templatePath);

/* GET home page. */
console.log("read test.js");
router.get('/', function (req, res) {
    console.log("test");
    template.render({ title: 'Test' }, res);
});

module.exports = router;
