(function () {
	angular
		.module('chatApp')
		.controller('mainController', mainController);
	mainController.$inject = [ '$scope', '$http', 'Messages' ];

	function mainController ($scope, $http, Messages) {
		$scope.textMsg = '';

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
	}
})();

// (function () {
// 	angular.module('chatApp')
// 		.controller('test', test);

// 	test.$inject = [ '$scope' ];
// 	function test ($scope) {
// 		$scope.name = 'test';
// 		console.log('test')
// 	}
// })();
