var User = require('./users.model');
var express = require('express');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var saltHashPassword = require('../services/crypto.service.js');
var hashPassword = require('../services/decrypto.service.js');
var app = express();

app.use(expressJWT({ secret: 'london is red' }).unless({ path: [ '/api/users' ] }));

module.exports = function (route) {
	route.get('/api/users/:token', function (req, res) {
		jwt.verify(req.params.token, 'london is red', function (err, decoded) {
			if (err) {
				res.send('err');
			} else {
				User.findOne({ _id: decoded._id }, function (err, user) {
					var userInfo = { name     : user.name,
						email    : user.email,
						username : user.username,
						_id      : user._id };
					res.send(userInfo);
				});
			}
		});
	});
	route.put('/api/users', function (req, res) {
		var passwordData = saltHashPassword(req.body.password);
		User.create({
			name     : req.body.name,
			email    : req.body.email,
			username : req.body.username,
			password : passwordData.passwordHash,
			salt     : passwordData.salt
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
			var encryptPass = hashPassword(req.body.password, user.salt).passwordHash;
			if (user.password !== encryptPass) {
				res.status(401).send('Invalid Password');
			} else {
				var myToken = jwt.sign({ _id: user._id }, 'london is red', { expiresIn: '1h' });
				console.log(myToken);
				res.status(200).json(myToken);
			}
		});
	});
};
