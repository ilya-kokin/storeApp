(function() {
	'use strict';

	angular.
		module('cart')
			.controller('CartCtrl', ['$rootScope', '$scope', '$location', 'cartService', 'catalogService', CartCtrl]);

	function CartCtrl ($rootScope, $scope, $location, cartService, catalogService) {

		$scope.cartCounter = 0;
		$scope.cart = [];
		$scope.customer = {};
		$scope.alert = {};
		$scope.isSending = false;

		$scope.countSubtotal = countSubtotal;
		$scope.sendOrder = sendOrder;

		init();

		function init() {
			$scope.cart = cartService.get();
			$scope.cartCounter = cartService.getCounter();
		}

		/* get the total price of products */
		function countSubtotal() {
			if (!$scope.cart.length) return 0;

			var result = $scope.cart.reduce(function(sum, current) {
				return sum + (current.price*current.quantity);
			}, 0);

			return result;
		}

		/* send the order then request catalog products */
		function sendOrder() {
			if (!$scope.customer.name || !$scope.customer.phone) return;

			$scope.isSending = true;

			var orderData = {
				customer_name: $scope.customer.name,
				customer_phone: $scope.customer.phone,
				order: $scope.cart
			};

			cartService.sendOrder(orderData).then(function(result) {
				$rootScope.$broadcast('updateCartEvent');
				displayAlert('Success!');
				return catalogService.getProducts(true);
			}, function(error) {
				console.warn(error);
				displayAlert('Error!', true);
				return null;
			}).then(function(result) {
				if (result) $location.url('/');
			}).finally(function() {
				$scope.isSending = false;
			});
		}

		/* result notifications */
		function displayAlert(msg, error) {
			if (!msg) $scope.alert = {};
			$scope.alert = {
				isError: error,
				msg: msg
			};
		}

	}

})();
