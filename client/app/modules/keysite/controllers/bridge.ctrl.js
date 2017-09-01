(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .controller('BridgeCtrl', function($scope, CoreService, Bridge, BridgeService, $state, NgTableParams) {
            $scope.maxSize = 6;
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                getData: function(params) {

                    var where = {};
                    if (params._params.filter.bridgename) {
                        where.bridgename = {
                            like: `%${params._params.filter.bridgename}%`
                        };
                    }

                    if (params._params.filter.AdministrativeDepartment) {
                        where.AdministrativeDepartment = {
                            like: `%${params._params.filter.AdministrativeDepartment}%`
                        };
                    }
                    Bridge.count({ where: where }).$promise.then(function(result) {
                        console.log('===SEI=====')
                        console.log(result.count)
                        $scope.totalItems = result.count;
                        params.total(result.count);
                    });

                    var offset = params._params.count * (params._params.page - 1);

                    Bridge.count().$promise.then(function(result) {
                        params.total(result.count);
                        $scope.totalItems = result.count;
                    });
                    Bridge.find({
                        filter: {
                            limit: params._params.count,
                            offset: offset,
                            where: where
                        }
                    }).$promise.then(function(value) {
                        $scope.bridges = value;
                    });
                }
            });

            // 查询条件
            $scope.searchConditions = {
                bridgename: ""
            };

            $scope.startSearch = function() {
                $scope.tableParams.filter({
                    bridgename: $scope.searchConditions.bridgename
                });
            };

            $scope.deleteItems = function() {
                if ($scope.selectedItems.size == 0) {
                    CoreService.alertWarning('提示', '还没选中');
                    return;
                }

                var array = Array.from($scope.selectedItems);
                if (array.length == 1) {
                    array.push(-100);
                }
                console.log(array)
                BridgeService.deleteMultiple(array, function() {
                    $state.go('^.index');
                    $scope.tableParams.reload();
                }, function() {
                    $state.go('^.index');
                });
            };

            // 编辑
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

            $scope.selectedItems = new Set();

            $scope.addEditItem = function(item) {
                // 将需要删除的item加入selectedItems
                if (item.checked) {
                    $scope.selectedItems.add(item.id)
                } else {
                    $scope.selectedItems.delete(item.id)
                }
            };
        });
})();