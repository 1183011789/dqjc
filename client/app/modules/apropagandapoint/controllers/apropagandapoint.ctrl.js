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
        .controller('PropagandaPointCtrl', function($scope, CoreService, $state, APropagandaPoint, PropagandaPointService, NgTableParams, $location) {
            $scope.maxSize = 6;
            $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10
            }, {
                getData: function(params) {
                    var where = {};
                    if (params._params.filter.name) {
                        where.name = {
                            like: `%${params._params.filter.name}%`
                        };
                    }
                    APropagandaPoint.count({ where: where }).$promise.then(function(result) {
                        params.total(result.count);
                        $scope.totalItems = result.count;
                    });
                    var offset = params._params.count * (params._params.page - 1);
                    APropagandaPoint.find({
                        filter: {
                            limit: params._params.count,
                            offset: offset,
                            where: where
                        }
                    }).$promise.then(function(value) {
                        $scope.propagandaPoints = value;
                    });
                }
            });

            // 查询条件
            $scope.searchConditions = {
                name: ""
            };

            // 选中的item 的id
            $scope.selectedItems = new Set();

            $scope.addEditItem = function(item) {
                // 将需要删除的item加入selectedItems
                if (item.checked) {
                    $scope.selectedItems.add(item.id)
                } else {
                    $scope.selectedItems.delete(item.id)
                }
            };

            $scope.startSearch = function() {
                $scope.tableParams.filter({
                    name: $scope.searchConditions.name
                });
            };

            // 编辑, 每次只能编辑一个
            $scope.editItem = function() {
                if ($scope.selectedItems.size < 1) {
                    CoreService.alertWarning('提示', '还没选中');
                } else if ($scope.selectedItems.size > 1) {
                    CoreService.alertWarning('提示', '一次只能编辑一个');
                } else {
                    // ui-sref="^.edit({id: item.id})"
                    for (var value of $scope.selectedItems) {
                        var editItm = value;
                        break;
                    }
                    $state.go('^.edit', { id: editItm });
                }
            };

            //  一次可以删除多个
            $scope.deleteItems = function(item) {
                if ($scope.selectedItems.size == 0) {
                    CoreService.alertWarning('提示', '还没选中');
                    return;
                }

                var array = Array.from($scope.selectedItems);
                if (array.length == 1) {
                    array.push(-100);
                }
                console.log(array)
                PropagandaPointService.deleteMultiple(array, function() {
                    $state.go('^.list');
                    $scope.tableParams.reload();
                }, function() {
                    $state.go('^.list');
                });
            };

            // $scope.maxSize = 6;
            // $scope.itemsPerPage = 10;
            // PropagandaPointService.count()
            //     .then(function(result) {
            //         $scope.totalItems = result.count;
            //         console.log("条数-----", $scope.totalItems);
            //     })
            //     .catch(function(err) {
            //         console.log('OrderService.count err: ' + err);
            //         // $location.path('/error');
            //     });


            // var loadOrders = function() {
            //     PropagandaPointService.find({
            //             filter: {
            //                 limit: $scope.itemsPerPage,
            //                 skip: ($scope.currentPage - 1) * $scope.itemsPerPage
            //             }
            //         })
            //         .then(function(result) {
            //             $scope.mess = result;
            //             console.log("result所有数据----", JSON.stringify(result));
            //         })
            //         .catch(function(err) {
            //             console.log('OrderService.find err: ' + err);
            //             // $location.path('/error');
            //         });
            // };
            // $scope.totalItems = 100;
            // $scope.currentPage = 1;
            // $scope.order = 'id';
            // loadOrders();
            // $scope.pageChanged = function() {
            //     loadOrders();
            // };
        });
})();