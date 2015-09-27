var express = require('express');
var router = express.Router();

//database models
var mongoose = require( 'mongoose' );
//var users = mongoose.model( 'users', users );
var books = mongoose.model( 'books', books );

//path=/editbook/id
router.get('/:id', function(req, res){
  if(!req.user){//if he is not loged in
		return res.redirect('login');
	}
	if(req.user.isAdmin) {
		var id = req.params.id;
		books.findOne({ _id:id}, function(err,bookData){ 
			return res.render('editbook',{data:bookData});   
  	});
  	
	}else{
		return res.redirect('/books');
	}
});

router.post('/:id', function(req, res){
	if(!req.user){
		return res.redirect('/login');
	}
	if (!req.user.isAdmin) {
		return res.redirect('/');
	}
	console.log(req.body);
	console.log(req.files);
	var id = req.params.id;
	console.log(id);
   
	
	if (!req.files || !req.files.image) {
		console.log("no files");
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
	
	//asyncronous rename of image
  var imgName = req.file.filename + '.jpg';
  fs.rename('./public/images/'+req.file.filename, './public/images/'+ imgName, function(err){});
	var title = req.body.title;
	var description = req.body.description;
	var price = req.body.price;
	var pages = req.body.pages;
	var allAuthors = req.body.authors;
	var arrayOfAuthors = allAuthors.split(',');

  var book = new books({
    title       : title,
    description : description,
    image				: imgName,
    price			  : price,
    pages			  : pages,
    authors     : arrayOfAuthors
  });
  books.findOne({title:title}).exec(function(err, book_exists){
    if(err){
    	return res.json({status:"error", message:"error occured"});
    }
    if(book_exists){
      //remove the uploaded image
      fs.unlink('./public/images/' + req.file.filename, function(err){});
      fs.unlink('./public/images/' + imgName, function(err){});
      return res.json({status:"error", message:"the book already exists"});
    }
    if(!book_exists){
      book.save( function(err, book){
        if(err){
        	return res.json({status:"error", message:"could not save new book"});
        }
        return res.redirect('/books');
      });
    }
  });
});





module.exports = router;