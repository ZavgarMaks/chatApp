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

		function getMessage (room) {
			return $http.get('/api/messages/' + room);
		}

		function createMessage (textMsg, author, date, currentRoom) {
			return $http.post('/api/messages/', {
				text   : textMsg,
				author : author,
				date   : date,
				room   : currentRoom
			});
		}
	}
})();
