var express = require('express');
var router = express.Router();

const firebase = require('firebase');
const admin = require('firebase-admin');

router.get('/', function(req, res, next) {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            res.render('index', { title: 'Home', email: user.email });
        } else { // No user is signed in.
            res.render('index', { title: 'Home', email: null });
        }
    });

});

router.post('/', function(req, res) {
    console.log('post::index');

    //res.redirect('./user');
    res.render('index', { title: 'Home', email: req.body.email });

});

module.exports = router;
