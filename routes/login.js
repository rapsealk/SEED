var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var admin = require('firebase-admin');

router.get('/', function(req, res, next) {
    console.log('get::login');
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res) {
    console.log('post::login', req.body.email, req.body.password);

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
            //res.render('login', { title: 'Error',
            //                      message: 'Invalid User Data.' });
            res.render('problem', { error: error });

        });

    //res.redirect(307, '../../'); // redirect post
});

module.exports = router;
