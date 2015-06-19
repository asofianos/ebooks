// Mongoose import
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var books = new Schema({
	date_created 	: Date,
	title 				: String,
	authors 			: [String],
	description		: String,
	image 				: String,
	price 				: Number,
	currency    	: String,
	pages 				: Number
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
	transactions  : [{ type: Schema.Types.ObjectId, ref: 'transactions' }],
	isAdmin				: {type: Boolean, default: false } 
});

mongoose.model( 'users', users );
mongoose.model( 'transactions', transactions );
mongoose.model( 'books', books );


mongoose.connect( 'mongodb://localhost/ebooks' );