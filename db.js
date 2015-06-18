// Mongoose import
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var books = new Schema({
	date_created 	: Date,
	title 			: String,
	authors 		: [{ type: Schema.Types.ObjectId, ref: 'authors' }]
	description	: String,
	image 			: String,
	price 			: Number,
	currency    : String,
	pages 			: Number
});

var authors = new Schema({
	date_created 	: Date,
	lastname 		: String,
	firstname 	: String,
	fullname 		: String,
	image 			: String,
	description : String,
	books				: [{ type: Schema.Types.ObjectId, ref: 'books' }]
});

var transactions = new Schema({
	date_created 	: Date,
	user_id 			: { type: Schema.Types.ObjectId, ref: 'users' },
	books					: [{
		_id 			: false,
		book_id		: { type: Schema.Types.ObjectId, ref: 'books' },
		quantity 	: Number
	}],
	cost					: Number
});

var users = new Schema({ 
	date_created 	: Date,
	last_login  	: Date,
	username  		: String,
	password  		: String,
	image 		  	: String,
	lastname  		: String,
	firstname 		: String,
	address   		: String,
	email 				: String,
	phone     		: String,
	transactions  : [{ type: Schema.Types.ObjectId, ref: 'transactions' }]
});

mongoose.model( 'users', users );
mongoose.model( 'transactions', transactions );
mongoose.model( 'authors', authors );
mongoose.model( 'books', books );


mongoose.connect( 'mongodb://localhost/ebooks' );