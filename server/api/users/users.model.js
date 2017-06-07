var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name     : String,
	email    : String,
	username : String,
	password : String,
	salt     : String
});
var User = mongoose.model('User', userSchema);

module.exports = User;
