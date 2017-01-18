var express = require('express');
var router = express.Router();

const firebase = require('firebase');

var rest = require('../API/REST');

router.get('/', function(req, res, next) {
    console.log('get::user');

    var user = firebase.auth().currentUser;

    res.render('user', { title: 'User',
        user: user });

});

router.get('/delete', function(req, res) {
    rest.deleteUser(req, res);
});

module.exports = router;
