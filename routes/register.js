var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var admin = require('firebase-admin');

router.get('/', function(req, res, next) {
    console.log('get::register');
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res) {
    console.log('post::register', req.body.email, req.body.password);

    admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        displayName: req.body.email.split('@')[0],
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/seed-3a079.appspot.com/o/favicon-firebase.png?alt=media&token=d4572aea-1901-43b8-a150-508984102fc4',
        disabled: false
    })
        .then(function(userRecord) {
           firebase.auth()
               .signInWithEmailAndPassword(req.body.email, req.body.password)
               .then(function() {
                   res.redirect(307, '../..');
               })
               .catch(function(error) {
                   if (error) console.log(error);
                   res.render('problem', { error: error });
               });
        })
        .catch(function(error) {
            if (error) console.log(error);
            res.render('problem', { error: error });
        });
/*
    firebase.auth()
        .createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(function() {
            firebase.auth()
                .signInWithEmailAndPassword(req.body.email, req.body.password)
                .then(function() {
                    res.redirect(307, '../../');
                })
                .catch(function(error) {
                    if (error) console.log(error);
                    // Handle errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    res.render('problem', { error: error });

                });
        })
        .catch(function(error) {
            if (error) console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            res.render('problem', { error: error });
        });
*/
    //res.redirect(307, '../../'); // redirect post
});

module.exports = router;
