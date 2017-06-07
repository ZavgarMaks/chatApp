(function () {
	angular.module('chatApp')
	.factory('Messages', Messages);

	Messages.$inject = [ '$http' ];
	function Messages ($http) {
		var service = {
			getMessage,
			createMessage
		};

		return service;

		function getMessage () {
			return $http.get('/api/messages');
		}

		function createMessage (textMsg) {
			return $http.post('/api/messages', { text: textMsg });
		}
	}
})();
