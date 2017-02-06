(function() {
	'use strict';

	angular
		.module('orders')
		.service('ordersService', ['$q', '$http', ordersService]);

	function ordersService($q, $http) {

		var orders = [];

		var service = {
			getOrders: getOrders
		};

		return service;

		/* get previous orders */
		function getOrders() {
			var q = $q.defer();
			$http.get('api/orders').then(function(result) {
				if (result && result.data) orders = result.data;
				q.resolve(orders);
			}, function(error) {
				q.reject(error);
			});

			// var items = [
			// 	  { id: '1', customer_name: 'John Doe', customer_phone: '33333333', order: {} }
			// 	, { id: '2', customer_name: 'John Doe2', customer_phone: '33333333', order: {} }
			// 	, { id: '3', customer_name: 'John Doe3', customer_phone: '33333333', order: {} }
			// 	, { id: '4', customer_name: 'John Doe4', customer_phone: '33333333', order: {} }
			// ];

			return q.promise;
		};
	};

})();
