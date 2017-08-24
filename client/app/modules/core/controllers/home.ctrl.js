(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name com.module.core.controller:HomeCtrl
     * @description Dashboard
     * @requires $scope
     * @requires $rootScope
     **/
    angular
        .module('com.module.core')
        .controller('HomeCtrl', function($scope, $rootScope) {
            $scope.count = {};
            $scope.boxes = $rootScope.dashboardBox;
            console.log("dashboardBox--", JSON.stringify($scope.boxes));
        });

})();