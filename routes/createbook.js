var express = require('express');
var router = express.Router();

//database models
var mongoose = require( 'mongoose' );
//var users = mongoose.model( 'users', users );
var books = mongoose.model( 'books', books );

//path=/createbook
router.get('/', function(req, res){
  if(!req.user){//if he is not loged in
		return res.redirect('login');
	}
	if(req.user.isAdmin) {
		return res.render('createbook');
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
	console.log(req.files);
	if (!req.files || !req.files.image) {
		return res.redirect('/createbook');
	}
	//if no title
	if(!req.body.title  || !req.body.title.trim()){
		return res.json({status: "err", message: "empty title"});
	}
	//if no price
	if(!req.body.price || !req.body.price.trim()){
		return res.json({status: "err", message: "empty price"});
	}
	var title = req.body.title;
	var description = req.body.description;
	var image = req.files.image.name;
	var price = req.body.price;
	var pages = req.body.pages;
	var allAuthors = req.body.authors;
	var arrayOfAuthors = allAuthors.split(',');

  var book = new books({
    title       : title,
    description : description,
    image				: image,
    price			  : price,
    pages			  : pages,
    authors           : arrayOfAuthors
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
        return res.redirect('/books');
      });
    }
  });
});


module.exports = router;