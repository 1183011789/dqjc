(function() {
    'use strict';
    angular
        .module('com.module.keyPlaces') //['formly', 'formlyBootstrap', 'ngAnimate', 'ngAria', 'ngMessages']
        .controller('KeyPlaceCtrl', function($scope, CoreService, KeyPlaceCategory, KeyPlace, KeyPlaceService, $state, NgTableParams, $stateParams) {

            $scope.items = [{
                category: '全部',
                id: -1,
                checked: true
            }];
            var selectedItem = $scope.items[0];
            KeyPlaceCategory.find().$promise.then(function(value) {
                $scope.items = $scope.items.concat(value);
            });

            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                getData: function(params) {
                    console.log("item--1----", JSON.stringify(params));
                    var where = {};
                    if (params._params.filter.category) {
                        where.category = {
                            like: `%${params._params.filter.category}%`
                        };
                    }
                    if (params._params.filter.address) {
                        where.address = {
                            like: `%${params._params.filter.address}%`
                        };
                    }
                    // if (params._params.filter.category > 0) {
                    //     where.category = params._params.filter.category;
                    // }
                    // where.name = {
                    //     like: `%${params._params.filter.name}%`
                    // };
                    var offset = params._params.count * (params._params.page - 1);

                    KeyPlace.count({ where: where }).$promise.then(function(result) {
                        console.log("多少条---", result.count);
                        params.total(result.count);
                    });
                    KeyPlace.find({
                        filter: {
                            limit: params._params.count,
                            offset: offset,
                            where: where
                        }
                    }).$promise.then(function(value) {
                        $scope.keyPlaces = value;
                        // $scope.$apply();
                        // $state.go(0);
                        // $scope.reload();
                        // location.reload()
                        // parent.location.reload();
                        // history.go(0);
                        // window.location.reload();
                        // $scope.tableParams.reload();
                        console.log("查出数据---", JSON.stringify($scope.keyPlaces));
                    });

                }
            });

            // 查询条件
            $scope.searchConditions = {
                category: "",
                address: ""
            };

            $scope.startSearch = function() {
                console.log("category---", $scope.searchConditions.category);
                // isSearchMode = true;
                console.log('===========');
                // console.log(  $scope.tableParams.filter($scope.searchConditions) );
                $scope.tableParams.filter({
                    category: $scope.searchConditions.category,
                    address: $scope.searchConditions.address
                });
            };

            $scope.chooseItem = function(item) {
                selectedItem.checked = false;
                selectedItem = item;
                item.checked = true;
                console.log("item-2--", JSON.stringify(item));
                $scope.tableParams.filter({
                    category: item.id
                });
                $scope.tableParams.reload();
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

            // 编辑
            $scope.editItem = function() {
                console.log($scope.selectedItems);
                if ($scope.selectedItems.size < 1) {
                    CoreService.alertWarning('提示', '还没选中');
                } else if ($scope.selectedItems.size > 1) {
                    CoreService.alertWarning('提示', '一次只能编辑一个');
                } else {
                    var a = Array.from($scope.selectedItems);
                    console.log(a[0]);
                    $state.go('^.edit', { id: a[0] });
                }
            };

            // 删除
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
                KeyPlaceService.deleteMultiple(array, function() {
                    $state.go('^.list');
                    $scope.tableParams.reload();
                }, function() {
                    $state.go('^.list');
                });
            };

        });
})();