var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var admin = require('firebase-admin');

router.get('/', function(req, res) {
    res.render('message', { title: 'Message' });
});

router.post('/', function(req, res) {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            var uid = user.uid;
            var timestamp = ((new Date())-0).toString();
            var data = {};
            data[timestamp] = req.body.message;
            firebase.database().ref('message').child(uid).update(data)
                .then(function() {
                    res.redirect('./');
                })
                .catch(function(error) {
                    res.render('problem', { error: error });
                })
        } else { // No user is signed in.
            res.render('../../');
        }
    });

});

router.post('/delete', function(req, res) {

    var uid = req.body.uid;
    var timestamp = req.body.timestamp;

    admin.database().ref('message').child(uid).child(timestamp).remove()
        .then(function() {
            res.redirect('../');
        })
        .catch(function(error) {
            res.render('problem', { error: error });
        });

    //res.send('message/delete');
});

module.exports = router;