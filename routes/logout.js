var express = require('express');
var router = express.Router();

var firebase = require('firebase');

router.get('/', function(req, res) {

    firebase.auth().signOut()
        .then(function() {
            res.redirect('../');
        }, function(error) {
            res.render('problem', { error: error });
        });
});

router.post('/', function(req, res) {

    firebase.auth()
        .signOut()
        .then(function() {
            res.redirect('../');
        }, function(error) {
            res.render('problem', { error: error });
        });

});

module.exports = router;
