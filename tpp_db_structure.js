/*
	Title: Tpp stock database schemas
	Designer: Siriwat Kasamwattanarote
	Date: 4 October 2016 (started from 27 September 2016)
*/

var mongoose = require('mongoose'); // Probably it just reuses the current mongoose object
var Schema = mongoose.Schema;

module.exports.stock = mongoose.model('stock', new Schema({
	group_id: Number,
	product_id: Number,
	transaction: [{
		id: Number,
		time: Date,
		user_id: Number,
		customer_id: Number,
		transaction_direction: String,	// Buying/Selling type
		product_id: Number,
		unit_id: Number,
		unit_price: Number,				// Price per unit
		amont: Number,
		payment: String,				// Cash/Cheque/Credit
		status: String,					// Paid/Unpaid
		remark: String					// Any note
	}]
}, {
	collection: 'stock'
}));

module.exports.product_group = mongoose.model('product_group', new Schema({
	id: Number,
	name: String,
	description: String
}, {
	collection: 'product_group'
}));

module.exports.product = mongoose.model('product', new Schema({
	id: Number,
	name: String,
	description: String
}, {
	collection: 'product'
}));

module.exports.unit = mongoose.model('unit', new Schema({
	id: Number,
	name: String,
	converter_rate: Number,
	description: String
}, {
	collection: 'unit'
}));

module.exports.user = mongoose.model('user', new Schema({
	id: Number,
	name: String,
	email: String,
	username: String,
	password: String,					// Hashed password
	identity: String,
	address: String,
	description: String,	
	created: Date,
	event: String,
	activated: Boolean					// Activated/Revoked
}, {
	collection: 'user'
}));

module.exports.customer = mongoose.model('customer', new Schema({
	id: Number,
	name: String,
	identity: String,
	address: String,
	description: String,
	activated: Boolean					// Activated/Revoked
}, {
	collection: 'customer'
}));

