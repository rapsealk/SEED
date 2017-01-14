var express = require('express');
var router = express.Router();

const firebase = require('firebase');

router.get('/', function(req, res, next) {
  console.log('get::index');
  var user = firebase.auth().currentUser;

  if (user) {
      //res.redirect('./user');
    res.render('index', { title: 'Home',
                          email: user.email });
  } else {
    res.render('index', { title: 'Home',
                          email: null });
  }

});

router.post('/', function(req, res) {
  console.log('post::index');
  //res.redirect('./user');
  res.render('index', { title: 'Home',
                        email: req.body.email });
});

module.exports = router;
