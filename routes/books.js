var express = require('express');
var router = express.Router();

//database models
var mongoose = require( 'mongoose' );
//var users = mongoose.model( 'users', users );
var books = mongoose.model( 'books', books );

//path=/books
router.get('/', function(req, res){
  if(!req.user){//if he is not loged in
		return res.redirect('login');
	}
	if(req.user.isAdmin) {
		books.find({}, function(err,docs){
  		console.log(docs);
  		console.log("fernw vivlio");   
			return res.render('books',{data:docs});
		});
		return res.render('books');
	}

 	return res.redirect('/');
});

router.get('/createbook', function(req, res){
  if(!req.user){//if he is not loged in
		return res.redirect('login');
	}
	if(req.user.isAdmin) {
		return res.render('createbook');
	}
 	return res.redirect('/');
});

router.get('/editbook', function(req, res){
  if(!req.user){//if he is not loged in
		return res.redirect('login');
	}
	if(req.user.isAdmin) {
		return res.render('editbook');
	}
 	return res.redirect('/');
});


module.exports = router;