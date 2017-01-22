var express = require('express');
var router = express.Router();

var rest = require('../API/REST');

router.get('/', function(req, res) {
    res.send('Hello World!');
});

router.post('/create', function(req, res) {
    rest.createUser(req, res);
});

router.get('/delete', function(req, res) {
    res.redirect(307, './');
});

router.post('/delete', function(req, res) {
    rest.deleteUser(req, res);
});

module.exports = router;
