(function() {
	'use strict';

	angular.
		module('orders')
			.controller('OrdersCtrl', ['$scope', 'ordersService', OrdersCtrl]);

	function OrdersCtrl ($scope, ordersService) {

		$scope.orders = [];
		$scope.isLoading = true;

		init();

		function init() {
			return getOrders();
		}

		function getOrders() {
			$scope.isLoading = true;
			ordersService.getOrders().then(function(result) {
				$scope.orders = result;
			}, function(error) {
				console.warn(error);
			}).finally(function() {
				$scope.isLoading = false;
			});
		}

	}

})();
