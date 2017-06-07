var User = require('./users.model');
var express = require('express');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var Cookie = require('cookie-storage');
var saltHashPassword = require('../services/crypto.service.js');
var app = express();
var cookieStorage = new Cookie();

app.use(expressJWT({ secret: 'london is red' }).unless({ path: [ '/api/users' ] }));

module.exports = function (route) {
	route.put('/api/users', function (req, res) {
		User.create({
			name     : req.body.name,
			email    : req.body.email,
			username : req.body.username,
			password : saltHashPassword(req.body.password).passwordHash,
			salt     : saltHashPassword(req.body.password).salt
		}, function (err, user) {
			if (err) {
				res.send(err);
			}
			res.send(user);
		});
	});

	route.post('/api/users', function (req, res) {
		User.findOne({ username: req.body.username }, function (err, user) {
			if (err) {
				res.send(err);
			}
			if (user.password !== req.body.password) {
				res.status(401).send('Invalid Password');
			} else {
				var myToken = jwt.sign({ username: req.body.username }, 'london is red');
				res.status(200).json(myToken);
			}
		});
	});
};
