/*
	Title: Tpp stock database schemas
	Designer: Siriwat Kasamwattanarote
	Date: 4 October 2016 (started from 27 September 2016)
*/

var mongoose = require('mongoose');

module.exports.stock = mongoose.model('stock', {
	group_id: Integer,
	product_id: Integer,
	transaction: [{
		id: Integer,
		time: Timestamp,
		user_id: Integer,
		customer_id: Integer,
		transaction_direction: String,	// Buying/Selling type
		product_id: Integer,
		unit_id: Integer,
		unit_price: Double,				// Price per unit
		amont: Integer,
		payment: String,				// Cash/Cheque/Credit
		status: String,					// Paid/Unpaid
		remark: String					// Any note
	}]
});

module.exports.group = mongoose.model('group', {
	id: Integer,
	name: String,
	description: String
});

module.exports.product = mongoose.model('product', {
	id: Integer,
	name: String,
	description: String
});

module.exports.unit = mongoose.model('unit', {
	id: Integer,
	name: String,
	converter_rate: Double,
	description: String
});

module.exports.user = mongoose.model('user', {
	id: Integer,
	username: String,
	password: String,					// Hashed password
	name: String,
	identity: String,
	address: String,
	description: String,
	activated: Boolean					// Activated/Revoked
});

module.exports.customer = mongoose.model('customer', {
	id: Integer,
	name: String,
	identity: String,
	address: String,
	description: String,
	activated: Boolean					// Activated/Revoked
});

