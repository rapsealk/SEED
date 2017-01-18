var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var admin = require('firebase-admin');

router.get('/', function(req, res) {
    console.log('get::login');
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res) {

    firebase.auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(function() {
            res.redirect(307, '../../');
        })
        .catch(function(error) {
            if (error) console.log(error);
            res.render('problem', { error: error });

        });

});

module.exports = router;
