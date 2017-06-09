(function () {
	angular
		.module('chatApp')
		.controller('loginController', loginController);
	loginController.$inject = [ '$scope', '$location', '$cookies', 'Users' ];

	function loginController ($scope, $location, $cookies, Users) {
		$scope.Authentication = function () {
			if ($scope.username !== undefined) {
				if ($scope.password !== undefined) {
					Users.Authentication($scope.username, $scope.password)
					.then(function (response) {
						$cookies.put('myToken', response.data);
						console.log($cookies.get('myToken'));
						$location.path('/');
					});
				}
			}
		};
	}
})();
