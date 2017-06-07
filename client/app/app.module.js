(function () {
	angular.module('chatApp', [ 'ngRoute', 'ngCookies' ])
		.config(routes);

	routes.$inject = [ '$routeProvider' ];
	function routes ($routeProvider) {
		$routeProvider
			.when('/', {
				controller  : 'mainController',
				templateUrl : 'app/modules/main/main.html'
			})

			.when('/login', {
				controller  : 'loginController',
				templateUrl : 'app/modules/login/login.html'
			})

			.when('/register', {
				controller  : 'registerController',
				templateUrl : 'app/modules/register/register.html'
			});
	}
})();
