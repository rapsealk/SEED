var express = require('express');
var router = express.Router();

var firebase = require('firebase');

router.get('/', function(req, res) {

    console.log('get::logout');
    firebase.auth().signOut()
        .then(function() {
            res.redirect('../');
        }, function(error) {
            res.render('problem', { error: error });
        });
});

router.post('/', function(req, res) {

    console.log('post::logout');
    firebase.auth()
        .signOut()
        .then(function() {
            res.redirect('../');
        }, function(error) {
            res.render('problem', { error: error });
        });

});

module.exports = router;
