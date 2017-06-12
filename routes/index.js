var express = require('express');
var router = express.Router();

var requestHeaderParser = require("../service/requestHeaderParser");

/* GET home page. */
router.get('/', function (req, res) {
    res.send(requestHeaderParser(req));
});

module.exports = router;
