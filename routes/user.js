var express = require('express');
var router = express.Router();

const firebase = require('firebase');

router.get('/', function(req, res, next) {
    console.log('get::user');

    var user = firebase.auth().currentUser;

    res.render('user', { title: 'User',
                         user: user });


});
/*
router.post('/', function(req, res) {
    console.log('post::user');
    //res.redirect('./user');
    res.render('user', { title: 'User',
        email: req.body.email });
});
*/
module.exports = router;
