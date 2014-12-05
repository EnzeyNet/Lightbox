(function (angular) {
    "use strict";

	var module = angular.module('net.enzey.dialog', []);

	module.directive('nzDialog', function($compile, $document) {
		return {
			priority: 1000,
			terminal: true,
			compile: function($element, $attrs) {
				$element.attr('nz-include-transclude', $attrs[this.name]);

				return {
					pre: function(scope, element, attrs) {
						var cElem;
						scope.$on('displayDialog', function() {
							if (!cElem || cElem.parent().length === 0) {
								cElem = element.clone();
								angular.element($document[0].body).append(cElem);
								$compile(cElem, null, 1000)(scope);
							}
						});
						element.remove();
					},
					post: function(scope, element, attrs) {
					}
				}
			}
		}
	});

	module.directive('nzIncludeTransclude', function() {
		return {
			transclude: true,
			templateUrl: function(element, attrs) {
				return attrs[this.name];
			},
		}
	});

})(angular);