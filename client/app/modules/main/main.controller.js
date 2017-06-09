(function () {
	angular
		.module('chatApp')
		.controller('mainController', mainController);
	mainController.$inject = [ '$scope', '$cookies', '$location', '$http', 'Messages', 'Users' ];

	function mainController ($scope, $cookies, $location, $http, Messages, Users) {
		var socket = io();
		var currentRoom = 'general';
		$scope.textMsg = '';
		$scope.userInfo = {};
		getUserInfo();
		Messages.getMessage(currentRoom)
			.then(function (response) {
				$scope.messages = response.data;
			});


		$scope.sendMessages = function () {
			if ($scope.textMsg !== '') {
				Messages.createMessage($scope.textMsg, $scope.userInfo.username, getDate(), currentRoom)
						.then(function () {
							$scope.textMsg = '';
						});
			}
		};
		socket.on('chat message', function (messageInfo) {
			$scope.messages.push(messageInfo);
			$scope.$apply();
		});

		$scope.logout = function () {
			$cookies.remove('myToken');
			console.log($cookies.get('myToken'));
		};

		$scope.changeRoom = function (room) {
			currentRoom = room;
			Messages.getMessage(currentRoom)
			.then(function (response) {
				$scope.messages = response.data;
			});
		};

		function getToken () {
			return $cookies.get('myToken');
		}

		function getUserInfo () {
			if (getToken()) {
				var token = $cookies.get('myToken');
				Users.getUser(token).then(function (response) {
					if (response.data !== 'err') {
						$scope.userInfo = response.data;
					} else {
						$location.path('/login');
					}
				});
			} else {
				$location.path('/login');
			}
		}
		function getDate () {
			var date = new Date();
			var hour = date.getHours();
			if (hour < 10) {
				hour = '0' + hour;
			}
			var minute = date.getMinutes();
			if (minute < 10) {
				minute = '0' + minute;
			}
			var time = hour + ':' + minute;
			return time;
		}
	}
})();
