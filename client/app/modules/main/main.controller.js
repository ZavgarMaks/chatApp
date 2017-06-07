(function () {
	angular
		.module('chatApp')
		.controller('mainController', mainController);
	mainController.$inject = [ '$scope', '$cookies', '$http', 'Messages' ];

	function mainController ($scope, $cookies, $http, Messages) {
		$scope.textMsg = '';

		getToken();

		Messages.getMessage()
			.then(function (response) {
				$scope.messages = response.data;
			});

		var socket = io('http://localhost:3000');

		$scope.sendMessages = function () {
			if ($scope.textMsg !== '') {
				var textMsg = { text: $scope.textMsg };
				socket.emit('chat message', textMsg);
				Messages.createMessage($scope.textMsg)
						.then(function () {
							$scope.textMsg = '';
						});
			}
		};
		socket.on('chat message', function (textMsg) {
			$scope.messages.push(textMsg);
			console.log($scope.messages);

			// angular.element(document.querySelector('.messages')).append(angular.element('<li>' + textMsg + '</li>'));
		});

		function getToken () {
			$cookies.get('myToken');
		}
	}
})();
