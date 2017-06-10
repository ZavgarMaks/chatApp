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
		changeColorActiveRoom();
		Messages.getMessage(currentRoom)
			.then(function (response) {
				$scope.messages = response.data;
				setTimeout(function () {
					floatPersonalMsg();
				}, 10);
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
			if (messageInfo.room === currentRoom) {
				$scope.messages.push(messageInfo);
				$scope.$apply();
				setTimeout(function () {
					floatPersonalMsg();
				}, 10);
			}
		});

		$scope.logout = function () {
			$cookies.remove('myToken');
			console.log($cookies.get('myToken'));
		};

		$scope.changeRoom = function (room) {
			currentRoom = room;
			changeColorUnactiveRoom();
			changeColorActiveRoom();
			Messages.getMessage(currentRoom)
			.then(function (response) {
				$scope.messages = response.data;
				setTimeout(function () {
					floatPersonalMsg();
				}, 10);
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

		function changeColorActiveRoom () {
			var roomName = currentRoom.split('"');
			var roomNameClass = '.' + roomName + '';
			var putColorRoom = angular.element(document.querySelector(roomNameClass));
			putColorRoom.css('background-color', '#0070ba');
			putColorRoom.css('color', '#fff');
		}

		function changeColorUnactiveRoom () {
			var allRooms = angular.element(document.querySelector('.rooms')).find('button');
			allRooms.css('background-color', 'aliceblue');
			allRooms.css('color', '#000');
		}
		scrollToBottom();
		function scrollToBottom () {
			var msgWindow = angular.element(document.querySelector('.messages'));
			// msgWindow[ 0 ].scrollTop += 800;
			console.log(document.getElementById('testID').scrollHeight);
			console.log(msgWindow);
		}

		function floatPersonalMsg () {
			var nameClass = '.' + $scope.userInfo.username;
			var foundedClass = angular.element(document.querySelectorAll(nameClass));
			var foundedSpan = foundedClass.find('span');
			foundedClass.css('text-align', 'right');
			foundedSpan.css('float', 'left');
		}
	}
})();
