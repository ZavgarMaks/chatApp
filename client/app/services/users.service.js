(function () {
	angular.module('chatApp')
	.factory('Users', Users);

	Users.$inject = [ '$http' ];
	function Users ($http) {
		var service = {
			createUser,
			Authentication
		};

		return service;

		function createUser (name, email, username, password) {
			return $http.put('/api/users', {
				name     : name,
				email    : email,
				password : password,
				username : username });
		}

		function Authentication (email, password) {
			return $http.post('/api/users', {
				email    : email,
				password : password
			});
		}
	}
})();
