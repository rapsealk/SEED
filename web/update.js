var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('get::update');
    res.redirect('/', { title: 'Express' });
});

router.post('/', function(req, res) {
    console.log('post::update');
    res.render('index', { title: 'Express' });
});

module.exports = router;