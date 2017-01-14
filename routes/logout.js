var express = require('express');
var router = express.Router();

var firebase = require('firebase');

router.get('/', function(req, res, next) {
    console.log('get::logout');
    firebase.auth().signOut()
        .then(function() {
            // sign out successful.
            res.redirect('../');
        }, function(error) {
            // an error occured.
            res.render('problem', { error: error });
        });
});

router.post('/', function(req, res) {
    console.log('post::logout');
    firebase.auth()
        .signOut()
        .then(function() {
            // sign out successful.
            res.redirect('../'); //res.render('index', { title: 'Home' });
        }, function(error) {
            // an error
            res.render('problem', { error: error });
        });

    //res.render('index', { title: 'Express' });
});

module.exports = router;
