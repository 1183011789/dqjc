(function() {
    'use strict';
    angular
        .module('com.module.keyPlaces')
        .run(function($rootScope) {
            $rootScope.addMenu('重点场所', 'app.keyPlaces.list', 'fa-asterisk');
        });
})();