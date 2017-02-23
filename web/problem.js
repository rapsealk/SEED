var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('get::problem');

});

router.post('/', function(req, res) {
    console.log('post::problem');

    res.render('problem', { message: ''})

});

module.exports = router;
