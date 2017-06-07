(function () {
	var crypto = require('crypto');

	var genRandomString = function (length) {
		return crypto.randomBytes(Math.ceil(length / 2))
                .toString('hex')
                .slice(0, length);
	};

	var sha1 = function (password, salt) {
		var hash = crypto.createHmac('sha1', salt);
		hash.update(password);
		var value = hash.digest('hex');
		return {
			salt         : salt,
			passwordHash : value
		};
	};

	var saltHashPassword = function (userpassword) {
		var salt = genRandomString(8);
		var passwordData = sha1(userpassword, salt);
		return passwordData;
	};

	module.exports = saltHashPassword;
})();
