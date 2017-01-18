var express = require('express');
var router = express.Router();

var rest = require('../API/REST');

router.get('/', function(req, res) {
    res.render('signup', { title: 'Register' });
});

router.post('/', function(req, res) {

    rest.createUser(req, res);

});

module.exports = router;
