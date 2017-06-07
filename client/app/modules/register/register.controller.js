(function () {
	angular
		.module('chatApp')
		.controller('registerController', registerController);
	registerController.$inject = [ '$scope', '$location', 'Users' ];

	function registerController ($scope, $location, Users) {
		$scope.createUser = function () {
			if ($scope.name !== undefined && $scope.email !== undefined && $scope.username !== undefined && $scope.password !== undefined) {
				Users.createUser($scope.name, $scope.email, $scope.username, $scope.password)
					.then(function () {
						$location.path('/login');
					});
			}
		};
	}
})();
