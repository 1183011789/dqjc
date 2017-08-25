(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .controller('LevelCrossingCtrl', function($scope, CoreService, LevelCrossing, LevelCrossingService, $state, NgTableParams) {


            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                getData: function(params) {

                    var where = {};
                    if (params._params.filter.levelcrossname) {
                        where.levelcrossname = {
                            like: `%${params._params.filter.levelcrossname}%`
                        };
                    }

                    if (params._params.filter.AdministrativeDepartment) {
                        where.AdministrativeDepartment = {
                            like: `%${params._params.filter.AdministrativeDepartment}%`
                        };
                    }


                    var offset = params._params.count * (params._params.page - 1);
                    LevelCrossing.count().$promise.then(function(result) {
                        params.total(result.count);
                        $scope.totalItems = result.count;
                    });
                    LevelCrossing.find({
                        filter: {
                            limit: params._params.count,
                            offset: offset,
                            where: where
                        }
                    }).$promise.then(function(value) {
                        $scope.LevelCrossings = value;
                    });
                }
            });


            // 查询条件
            $scope.searchConditions = {
                levelcrossname: ""
            };

            $scope.startSearch = function() {
                $scope.tableParams.filter({
                    levelcrossname: $scope.searchConditions.levelcrossname
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
                LevelCrossingService.deleteMultiple(array, function() {
                    $state.go('^.list');
                    $scope.tableParams.reload();
                }, function() {
                    $state.go('^.list');
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


        })

})();