var Message = require('./messages.model');

module.exports = function (route) {
	route.get('/api/messages', function (req, res) {
		Message.find({}, function (err, msg) {
			if (err) {
				res.status(500).send(err);
				return console.error(err);
			}
			res.send(msg);
		});
	});

	route.post('/api/messages', function (req, res) {
		Message.create({
			text : req.body.text
		}, function (err, msg) {
			if (err) {
				res.send(err);
			}
			res.send(msg);
		});
	});
};
