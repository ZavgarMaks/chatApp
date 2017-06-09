var Message = require('./messages.model');
var io = require('../../../app.js').io;

module.exports = function (route) {
	route.get('/api/messages/:room', function (req, res) {
		Message.find({ room: req.params.room }, function (err, msg) {
			if (err) {
				res.status(500).send(err);
				return console.error(err);
			}
			res.send(msg);
		});
	});

	route.post('/api/messages/', function (req, res) {
		Message.create({
			text   : req.body.text,
			author : req.body.author,
			date   : req.body.date,
			room   : req.body.room
		}, function (err, msg) {
			if (err) {
				res.send(err);
			}
			io.emit('chat message', msg);
			res.send(msg);
		});
	});
};
