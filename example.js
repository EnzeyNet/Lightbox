(function (angular) {
	"use strict";

	var module = angular.module('net.enzey.example',
		[
			'net.enzey.lightbox'
		]
	);

	module.controller('dialogManagerCtrl', function ($scope) {
		$scope.show = function(event) {
			$scope.$broadcast(event);
		}
		$scope.fucks = [
			{id: '', label: ''},
			{id: '3241', label: 'dsafg'},
			{id: '54674', label: 'fghj'},
		]
	});

	module.directive('dropdownSelectionRequired', function() {
		return {
			restrict: 'A', // only activate on element attribute
			require: '?ngModel', // get a hold of NgModelController
			link: function(scope, element, attrs, ngModel) {
				ngModel.$validators.hasSelection = function(modelValue, viewValue) {
					return modelValue ? true : false;
				}
				scope.fucks = [
					{id: '3241', label: 'dsafg'},
					{id: '54674', label: 'fghj'},
				]
			}
		}
	});
})(angular);
