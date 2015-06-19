var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//passport file
require('../pass.js')(passport, LocalStrategy);

/* GET home page. */
router.get('/', function(req, res){
  return res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res){
  return res.render('sign_in');
});
router.post(
	'/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res){
    res.redirect('/');
  }
);

router.get('/signup', function(req, res){
  return res.render('sign_up');
});

router.post('/signup', function(req, res){

});

router.get('/logout', function(req, res){
});

router.get('/book', function(req, res){
  return res.render('book');
});

router.get('/author', function(req, res){
  return res.render('author');
});


module.exports = router;
