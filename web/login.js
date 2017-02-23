var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var admin = require('firebase-admin');

router.get('/', function(req, res) {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            res.redirect('../');
        } else { // No user is signed in.
            res.render('login', { title: 'Login' });
        }
    });

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
