var mongoose = require('mongoose');
var Schema   = mongoose.Schema;



var book1 = new books({
  date_created 	: Date.now(),
	title 			: "Game of thrones",
	authors 		: 
	description	: "Dragons nads boobies",
	image       : "/images/game_of_thrones_bokks.jpg"
	price 			: 10,
	currency    : "USD",
	pages 			: 111
});

var author1 = new authors({
	date_created 	: Date.now(),
	lastname 		: "R.R. Martin",
	firstname 	: "George",
	fullname 		: "George R.R. Martin",
	image 			: "/images/george_rr_martin.jpg",
	description : "Shithead",
	books				: 
});


var user1 = new users({ 
	date_created 	: Date.now(),
	last_login  	: Date.now(),
	username  		: "pokopikos",
	password  		: "String",
	image 		  	: "/images/user.png",
	lastname  		: "White",
	firstname 		: "Walker",
	address   		: "Pacific Cycle, Inc PO Box 344 Olney, IL 62450",
	transactions  : 
});



