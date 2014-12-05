(function (angular) {
	"use strict";

	var module = angular.module('net.enzey.example',
		[
			'net.enzey.dialog'
		]
	);

	module.controller('dialogManagerCtrl', function ($scope) {
		$scope.itemList = [
			{text: "red"},
			{text: "blue"},
			{text: "purple"},
			{text: "while"},
			{text: "black"},
		];
		$scope.show = function() {
			$scope.$broadcast('displayDialog');
		}
	});

})(angular);
