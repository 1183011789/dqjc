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
        .module('com.module.advertisement')
        .controller('LineAllocationCtrl', function($scope, $state, CoreService, $rootScope, BroadcastWarningPost, Rode, $location) {
            console.log("线路分配----------");
            BroadcastWarningPost.find({}).$promise.then(function(value) {
                $scope.warningPosts = value;
                console.log("广播警示柱---", JSON.stringify(value));
            });
            Rode.find({}).$promise.then(function(value) {
                $scope.rodes = value;
                console.log("铁路信息---", JSON.stringify(value));
            });
            $scope.selectedItems = new Set();
            $scope.addEditItem = function(item) {
                // 将需要删除的item加入selectedItems
                console.log("item--", JSON.stringify(item));
                if (item.checked) {
                    $scope.selectedItems.add(item.id)
                    var array = Array.from($scope.selectedItems);
                    console.log("selectedItems-1-", JSON.stringify($scope.selectedItems));
                    console.log("array-1-", JSON.stringify(array));
                    console.log("size-1--", JSON.stringify($scope.selectedItems.size));
                } else {
                    $scope.selectedItems.delete(item.id)
                    var array = Array.from($scope.selectedItems);
                    console.log("selectedItems-2-", JSON.stringify($scope.selectedItems));
                    console.log("array-2-", JSON.stringify(array));
                    console.log("size-2--", JSON.stringify($scope.selectedItems.size));
                }
            };

            $scope.checkedrode = function(item) {

                // if ($scope.selectedItems.size == 0) {
                //     CoreService.alertWarning('提示', '还没选中');
                //     return;
                // }

                // var array = Array.from($scope.selectedItems);
                // if (array.length == 1) {
                //     array.push(-100);
                // }
                // console.log('选择所有下标--', item)
                // AdvertisementService.deleteMultiple(array, function() {
                //     $state.go('^.list');
                //     $scope.tableParams.reload();
                // }, function() {
                //     $state.go('^.list');
                // });

            };


        });

})();