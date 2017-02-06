(function() {
	'use strict';

	angular.module('navbar', []);
	angular.module('catalog', []);
	angular.module('cart', []);
	angular.module('orders', []);

	angular.module('storeApp', [
			  'ngRoute'
			, 'ngMessages'
			, 'templates'
			, 'ui.mask'
			, 'navbar'
			, 'catalog'
			, 'cart'
			, 'orders'
		])
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					controller: 'CatalogCtrl',
					templateUrl: 'catalog/_catalog.html',
					pageTitle: 'Catalog'
				})
				.when('/cart', {
					controller: 'CartCtrl',
					templateUrl: 'cart/_cart.html',
					pageTitle: 'Cart'
				})
				.when('/orders', {
					controller: 'OrdersCtrl',
					templateUrl: 'orders/_orders.html',
					pageTitle: 'Orders'
				})
				.otherwise({redirectTo: '/'});

			if (window.history && window.history.pushState){
				$locationProvider.html5Mode(true);
			}

		}])
		.run(['$rootScope', '$location', run]);

		function run($rootScope, $location) {
			$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
				if (current.hasOwnProperty('$$route')) {
					$rootScope.pageTitle = current.$$route.pageTitle;
				}
        	});
		}
})();
