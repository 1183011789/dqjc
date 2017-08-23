(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .run(function($rootScope) {
            $rootScope.addMenu('重点部位', 'app.keysite.baseStation.index', 'fa-anchor');
        });
})();