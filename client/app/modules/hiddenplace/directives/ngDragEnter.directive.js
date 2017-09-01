'use strict';

/**
 * @ngdoc directive
 * @name com.module.images.directive:ng-drag-enter
 * @description executes `ngDragEnter` and `ngDragLeave` events
 */
angular.module('com.module.hiddenplace')
    .directive('ngDragEnter', ['$timeout', function($timeout) {
        console.log("22222222");
        return {
            'scope': false,
            'link': function(scope, element, attrs) {
                var promise;
                var enter = false;
                element.bind('dragover', function(event) {
                    if (!isFileDrag(event)) {
                        return;
                    }
                    if (!enter) {
                        scope.$apply(attrs.ngDragEnter);
                        enter = true;
                    }
                    $timeout.cancel(promise);
                    event.preventDefault();
                });
                element.bind('dragleave drop', function() {
                    promise = $timeout(function() {
                        scope.$eval(attrs.ngDragLeave);
                        promise = null;
                        enter = false;
                    }, 100);
                });

                function isFileDrag(dragEvent) {
                    var fileDrag = false;
                    var dataTransfer = dragEvent.dataTransfer || dragEvent.originalEvent.dataTransfer;
                    angular.forEach(dataTransfer && dataTransfer.types, function(val) {
                        if (val === 'Files') {
                            fileDrag = true;
                        }
                    });
                    return fileDrag;
                }
            }
        };
    }]);