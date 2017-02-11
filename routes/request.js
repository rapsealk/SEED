var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var admin = require('firebase-admin');

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
    console.log('post::delete');

    admin.auth().getUserByEmail(req.body.email)
        .then(function(userRecord) {
            req.body.user = userRecord;
            rest.deleteUser(req, res);
        })
        .catch(function(error) {
            res.rendern('problem', { error: error });
        })
    //req.body.user = admin.auth().getUserByEmail(req.body.email);
    //rest.deleteUser(req, res);
});

module.exports = router;
