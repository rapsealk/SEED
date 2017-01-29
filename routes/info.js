var express = require('express');
var router = express.Router();

const firebase = require('firebase');
var admin = require('firebase-admin');
var datestringify = require('../API/datestringify');

router.get('/', function(req, res) {

    //console.log(firebase.storage().ref());

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            admin.database().ref('message').once('value', function(snapshot) {
                var data = snapshot.val()[user.uid];
                //var messages = {};
                var time = {};
                for (var timestamp in data) {
                    time[timestamp] = datestringify(new Date(parseInt(timestamp)), true);
                    //messages[datestringify(new Date(parseInt(timestamp)), true)] = data[timestamp];
                }
                res.render('info', { title: 'User', user: user, messages: data, time: time });
            }, function(errorObject) {
                if (errorObject) res.render('problem', { error: errorObject });
            });
        } else { // No user is signed in.
            res.redirect('../');
        }
    });

});

module.exports = router;
