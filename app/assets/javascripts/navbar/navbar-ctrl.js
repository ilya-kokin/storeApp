(function() {
	'use strict';

	angular.
		module('navbar')
			.controller('NavbarCtrl', ['$rootScope', '$scope', 'cartService', NavbarCtrl]);

	function NavbarCtrl ($rootScope, $scope, cartService) {
		$scope.cartCounter = 0;

		$scope.checkState = checkState;

		init();

		function init() {
			$scope.cartCounter = cartService.getCounter();
		}

		function checkState(menuItem) {
			var isActive = $rootScope.pageTitle && menuItem && $rootScope.pageTitle.toLowerCase() === menuItem.toLowerCase();
			return isActive;
		}

		$scope.$on('updateCartEvent', init);

	}

})();
