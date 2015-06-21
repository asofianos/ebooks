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
		return res.render('books');
	}
 	return res.redirect('/');
});

router.post('/', function(req, res){
	if(!req.user){
		return res.redirect('/login');
	}
	if (!req.user.isAdmin) {
		return res.redirect('/');
	}
	var book = req.body;
	console.log(book);
	
	//if no title
	if(!book.title  || !book.title.trim()){
		return res.json({status: "err", message: "empty title"});
	}
	//if no price
	if(!book.price || !book.price.trim()){
		return res.json({status: "err", message: "empty price"});
	}
	var title = req.body.title.toLowerCase();
	var description = req.body.description.toLowerCase();
	var price = req.body.price;
	var pages = req.body.pages;
  var book = new books({
    title       : title,
    description : description,
    price			  : price,
    pages			  : pages
  });
  books.findOne({title:title}).exec(function(err, book_exists){
    if(err){
    	return res.json({status:"error", message:"error occured"});
    }
    if(book_exists){
      return res.json({status:"error", message:"the book already exists"});
    }
    if(!book_exists){
      book.save( function(err, book){
        if(err){
        	return res.json({status:"error", message:"could not save new book"});
        }
        console.log("you create new book");
        return res.redirect('/');
      });
    }
  });
});


module.exports = router;