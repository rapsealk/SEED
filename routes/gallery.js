var express = require('express');
var router = express.Router();

var fs = require('fs');

var rest = require('../API/REST');

var firebase = require('firebase');
var admin = require('firebase-admin');

router.get('/', function(req, res) {
    console.log('get::gallery');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            res.render('gallery', { title: 'Home', user: user });
        } else { // No user is signed in.
            res.redirect('../');
        }
    });
});

router.post('/', function(req, res) {
    console.log('post::gallery');
    res.send(req.body.image);
    /*
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.storage.ref(user.uid+'/images')
        } else {

        }
    });*/
});

module.exports = router;
