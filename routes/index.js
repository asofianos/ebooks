var express = require('express');
var router = express.Router();


//authendication 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto    = require('crypto');
var key       = 'secret';
var algorithm = 'sha1';
var hash, hmac;

//database models
var mongoose = require( 'mongoose' );
var users = mongoose.model( 'users', users );
var books = mongoose.model( 'books', books );

//passport file
require('../pass.js')(passport, LocalStrategy);

/*
router.get('/', function(req, res){
  return res.render('index', { title: 'Express' });
});
*/

router.get('/', function(req , res){
	books.find({}, function(err,docs){
    return res.render('index',{data:docs,title: 'Express'});     
  });
}); 

router.get('/login', function(req, res){
	if(req.user){
		return res.redirect('/');
	}
  return res.render('sign_in');
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res){
    res.redirect('/');
  }
);

router.get('/signup', function(req, res){
	if(req.user){
		return res.redirect('/');
	}
  return res.render('sign_up');
});

router.post('/signup', function(req, res){
	if(req.user){
		return res.redirect('/');
	}
	var user = req.body;
	//if no username
	if(!user.username  || !user.username.trim()){
		return res.json({status: "err", message: "empty username"});
	}
	//if no password 
	if(!user.password  || !user.password.trim()){
		return res.json({status: "err", message: "empty password"});
	}
	//create password hash
  hash = generateHash(req.body.password);

  var username = req.body.username.toLowerCase();
  var user = new users({
    username      : username,
    password      : hash
  });
  users.findOne({username:username}).exec(function(err, user_exists){
    if(err){
    	return res.json({status:"error", message:"error occured"});
    }
    if(user_exists){
      return res.json({status:"error", message:"the user already exists"});
    }
    if(!user_exists){
      user.save( function(err, user){
        if(err){
        	return res.json({status:"error", message:"could not save new user"});
        }
        req.logIn(user, function(err){
          if(err){ 
          	return res.json({status:"error", message:"error occured"});
          }
      		return res.redirect('/');
        });
      });
    }
  });
});

router.get('/logout', function(req, res){
	if(req.user){
    req.logout();
  }
  return res.redirect('/login');
});

function generateHash(text){
  hmac = crypto.createHmac(algorithm, key);
  // change to 'binary' if you want a binary digest
  hmac.setEncoding('hex');
  // write in the text that you want the hmac digest for
  hmac.write(text);
  // you cannot read from the stream until you call end()
  hmac.end();
  return  hmac.read();
}


module.exports = router;
