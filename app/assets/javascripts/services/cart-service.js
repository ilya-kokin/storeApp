(function() {
	'use strict';

	angular
		.module('cart')
		.service('cartService', ['$q', '$http', cartService]);

	function cartService($q, $http) {

		var cart = [],
			counter = 0;

		var service = {
			add: add,
			get: get,
			sendOrder: sendOrder,
			getCounter: getCounter,
			reset: reset
		};

		return service;

		/**
		 * add a product to the cart and increase the counter
		 * @param {Object} product
		 */
		function add(product) {

			var newItem = {};

			if (!cart.length) {
				angular.copy(product, newItem);
				newItem.quantity = 1;
				cart.unshift(newItem);
			} else {
				var index = cart.map(function(e) { return e.id }).indexOf(product.id);
				if (index == -1) {
					angular.copy(product, newItem);
					newItem.quantity = 1;
					cart.unshift(newItem);
				} else {
					cart[index].quantity += 1;
				}
			}

			counter += 1;
		}

		/**
		 * return the cart
		 * @return {Array}
		 */
		function get() {
			return cart;
		}

		/**
		 * send an order
		 * @param  {Object} data order details
		 */
		function sendOrder(data) {
			var q = $q.defer();
			$http.post('api/orders', { order: data }).then(function(result) {
				if (result && result.data && !result.data.error) {
					reset();
					q.resolve();
				} else {
					console.warn('error');
					q.reject();
				}
			}, function(error) {
				q.reject(error);
			});
			return q.promise;
		}

		/**
		 * return the counter
		 * @return {Number}
		 */
		function getCounter() {
			return counter;
		}

		/* remove all items from the cart */
		function reset() {
			cart = [];
			counter = 0;
		}
	};

})();
