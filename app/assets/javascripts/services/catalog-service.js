(function() {
	'use strict';

	angular
		.module('catalog')
		.service('catalogService', ['$q', '$http', catalogService]);

	function catalogService($q, $http) {
		var products = [];

		var service = {
			getProducts: getProducts,
			removeProduct: removeProduct
		};

		return service;

		/**
		 * request new products list or return current list
		 * @param  {Boolean} force request new products list
		 * @return {Array}
		 */
		function getProducts(force) {
			var q = $q.defer();

			if (force || !products.length) {
				$http.get('api/products').then(function(result) {
					if (result && result.data) products = result.data;
					q.resolve(products);
				}, function(error) {
					q.reject(error);
				});
			} else {
				q.resolve(products);
			}

			return q.promise;
		};

		/**
		 * decrease the quantity
		 * @param  {Object} product
		 */
		function removeProduct(product) {
			var index = products.map(function(e) { return e.id }).indexOf(product.id);

			if (index != -1) {
				products[index].quantity -= 1;
			} else {
				console.warn('product ID not found');
			}

		}

	};

})();
