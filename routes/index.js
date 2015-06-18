var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello/:value', function(req, res, next) {
  res.render('index', { title: req.params.value });
});

router.get('/sign_in', function(req, res, next) {
  res.render('sign_in');
});

router.get('/sign_up', function(req, res, next) {
  res.render('sign_up');
});

router.get('/book', function(req, res, next) {
  res.render('book');
});

router.get('/author', function(req, res, next) {
  res.render('author');
});


module.exports = router;
