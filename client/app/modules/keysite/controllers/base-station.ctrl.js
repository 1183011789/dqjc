(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .controller('BaseStationCtrl', function($scope, CoreService, BaseStation, BaseStationService, $state, NgTableParams) {

            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                getData: function(params) {
                    var offset = params._params.count * (params._params.page - 1);

                    BaseStation.count().$promise.then(function(result) {
                        params.total(result.count);
                    });
                    BaseStation.find({
                        filter: {
                            limit: params._params.count,
                            offset: offset
                        }
                    }).$promise.then(function(value) {
                        $scope.baseStations = value;
                    });
                }
            });

            // 查询条件
            $scope.searchConditions = {
                name: ""
            };

            $scope.startSearch = function() {
                $scope.tableParams.filter({
                    name: $scope.searchConditions.name
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
                BaseStationService.deleteMultiple(array, function() {
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