(function (angular) {
    "use strict";

	var module = angular.module('net.enzey.lightbox', ['net.enzey.services']);

	module.directive('nzLightbox', function($compile, $document) {
		return {
			priority: 1000,
			terminal: true,
			replace: true,
			template: function(element, attrs) {
				var wrapper = angular.element('<div data-nz-lightbox-logic></div>');
				var mask = angular.element('<div class="screenMask"></div>');
				if (!angular.isDefined(attrs.noMask)) {
					wrapper.append(mask);
				}

				var lightbox = angular.element('<form class="lightbox"></form>');
				var form = angular.element('<form name="lightboxForm"></form>');
				lightbox.attr('nz-transcluded-include', attrs[this.name]);
				lightbox.append(element.children());
				//lightbox.append(form);
				wrapper.append(lightbox);

				return wrapper[0].outerHTML;
			},
			compile: function($element, $attrs) {
				$element.addClass('lightboxContainer');

				return {
					pre: function(scope, element, attrs) {
						var cElem;
						scope.$on(attrs.showEvent, function() {
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

	module.directive('nzLightboxLogic', function(nzEventHelper) {
		return {
			// Each Lightbox needs its own scope.
			//   If dialogs are nested (popups in popups) then the lower level lightbox can squelch the event
			//   so the top level lightbox does not propigate all thr way through.
			scope: true,
			require: 'nzLightboxLogic',
			controller: function($scope, $element) {
				$scope.$on('lightboxAccept', function($event) {
					console.log('squelching: ' + 'lightboxAccept');
				});
				$scope.$on('lightboxReject', function($event) {
					console.log('squelching: ' + 'lightboxReject');
				});

				var ctrl;

				ctrl = {
					acceptForm: function() {
						$scope.$emit('lightboxAccept', $scope);
						$element.remove();
					},
					rejectForm: function() {
						$scope.$emit('lightboxReject');
						$element.remove();
					}
				};

				return ctrl;
			},
			link: function(scope, element, attrs, thisCtrl) {
				
				if (!angular.isDefined(attrs.modal)) {
					var lightboxElem = element[0].querySelector('.lightbox');
					lightboxElem = angular.element(lightboxElem);
					nzEventHelper.registerClickAwayAction(function(event) {
						thisCtrl.rejectForm();
						element.remove();
					}, lightboxElem);
				}

			}
		}
	});

	module.directive('lightboxAcceptAction', function($compile) {
		return {
			priority: 500,
			terminal: true,
			require: '^nzLightboxLogic',
			compile: function($element, $attrs) {
				$element.attr('data-ng-disabled', 'lightboxForm.$invalid');
				return function(scope, element, attrs, nzLightboxCtrl) {
					element.on('click', function() {
						nzLightboxCtrl.acceptForm();
					})
					$compile(element, null, 500)(scope);
				}
			}
		}
	});

	module.directive('lightboxRejectAction', function($compile) {
		return {
			priority: 500,
			terminal: true,
			require: '^nzLightboxLogic',
			compile: function($element, $attrs) {
				return function(scope, element, attrs, nzLightboxCtrl) {
					element.on('click', function() {
						nzLightboxCtrl.rejectForm();
					})
					$compile(element, null, 500)(scope);
				}
			}
		}
	});

})(angular);