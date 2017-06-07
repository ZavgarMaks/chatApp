(function () {
	angular
		.module('chatApp')
		.controller('loginController', loginController);
	loginController.$inject = [ '$scope', '$location', 'Users' ];

	function loginController ($scope, $location, Users) {
		$scope.Authentication = function () {
			if ($scope.username !== undefined) {
				if ($scope.password !== undefined) {
					Users.Authentication($scope.username, $scope.password)
					.then(function () {
						$location.path('/');
					});
				}
			}
		};
	}
})();
