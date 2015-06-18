var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello/:value', function(req, res, next) {
  res.render('index', { title: req.params.value });
});

router.get('/hello1/:value', function(req, res, next) {
  res.render('index', { title: req.params.value });
});

module.exports = router;
