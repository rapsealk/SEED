var express = require('express');
var router = express.Router();

var rest = require('../API/REST');

router.get('/', function(req, res) {
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var number = [0,1,2,3,4,5,6,7,8,9];
    var nickname = 'USER-';
    for (var i=0; i<6; i++) {
        var random = parseInt(Math.random()*10);
        if (random%2 == 1) {
            nickname += alphabet[parseInt(Math.random()*100)%26];
        } else {
            nickname += number[parseInt(Math.random()*10)];
        }
    }
    res.render('signup', { title: 'Register', nickname: nickname });
});

module.exports = router;
