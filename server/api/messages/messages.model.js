var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	text    : String,
	author  : String,
	creator : String,
	date    : String,
	room   	: String
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
