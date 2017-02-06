(function() {
	'use strict';

	angular.
		module('catalog')
			.controller('CatalogCtrl', ['$rootScope', '$scope', 'catalogService', 'cartService', CatalogCtrl]);

	function CatalogCtrl ($rootScope, $scope, catalogService, cartService) {
		var isSendingToCart = false;

		$scope.products = [];
		$scope.isLoading = false;

		$scope.addToCart = addToCart;

		init();

		function init() {
			return getPproducts();
		}

		/* get all products */
		function getPproducts() {
			$scope.isLoading = true;
			catalogService.getProducts().then(function(result) {
				if (result.length) $scope.products = result;
			}, function(error) {
				console.warn(error);
			}).finally(function() {
				$scope.isLoading = false;
			});
		}

		/**
		 * add a product to the cart
		 * @param {Object} product
		 * @param {Number} index
		 */
		function addToCart(product) {
			if (!product.quantity || isSendingToCart) return;

			isSendingToCart = true;

			cartService.add(product);
			catalogService.removeProduct(product);
			$rootScope.$broadcast('updateCartEvent');

			isSendingToCart = false;
		}
	}

})();
