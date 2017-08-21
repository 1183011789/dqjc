(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name com.module.orders.controller:ListCtrl
     * @description Dashboard
     * @requires $scope
     * @requires $rootScope
     **/
    angular
        .module('com.module.apropagandapoint')
        .controller('ApropagandapointListCtrl', function($scope, APropagandaPointService, $location) {
            console.log("广播警示柱界面------");
            $scope.maxSize = 6;
            $scope.itemsPerPage = 10;
            APropagandaPointService.count()
                .then(function(result) {
                    $scope.totalItemss = result.count;
                    console.log("条数-----", scope.totalItems);
                })
                .catch(function(err) {
                    console.log('OrderService.count err: ' + err);
                    // $location.path('/error');
                });
            var loadOrders = function() {
                APropagandaPointService.find({
                        filter: {
                            limit: $scope.itemsPerPage,
                            skip: ($scope.currentPage - 1) * $scope.itemsPerPage
                        }
                    })
                    .then(function(result) {
                        $scope.mess = result;
                        console.log("result所有数据----", JSON.stringify(result));
                    })
                    .catch(function(err) {
                        console.log('OrderService.find err: ' + err);
                        // $location.path('/error');
                    });
            };
            // $scope.totalItems = 100;
            $scope.currentPage = 1;
            // $scope.order = 'id';
            loadOrders();
            $scope.pageChanged = function() {
                loadOrders();
            };

        });

})();