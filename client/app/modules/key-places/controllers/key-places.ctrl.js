(function() {
    'use strict';
    angular
        .module('com.module.keyPlaces') //['formly', 'formlyBootstrap', 'ngAnimate', 'ngAria', 'ngMessages']
        .controller('KeyPlaceCtrl', function($scope, CoreService, KeyPlaceCategory, KeyPlace, KeyPlaceService, $state, NgTableParams) {

            // $scope.items = [{
            //     category: '全部',
            //     id: -1,
            //     checked: true
            // }];
            // $scope.selectedItemId = -1;
            // KeyPlaceCategory.find().$promise.then(function(value) {
            //     $scope.items = $scope.items.concat(value);
            // });

          $scope.$on('KeyPlace.Changed', function(event, data) {
            // console.log('======data====>', data);
            // console.log('======event====>', event);
            $scope.tableParams.filter({
                  category: data.id
              });
          });

          $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                getData: function(params) {
                  // console.log('------->', params);
                    var where = {};

                    if (params.filter().category > 0) {
                        where.category = params.filter().category
                    }
                    // console.log('---count-->', params.count());
                    // console.log('---page-->',params.page());
                    // console.log('---filter-->',params.filter());
                    var offset = params.count() * (params.page() - 1);

                    KeyPlace.count({ where: where }).$promise.then(function(result) {
                        params.total(result.count);
                    });
                    KeyPlace.find({
                        filter: {
                            limit: params.count(),
                            offset: offset,
                            where: where,
                            include: "keyPlaceCategory"
                        }
                    }).$promise.then(function(results) {
                      console.log('=====>', results);
                        $scope.keyPlaces = results;
                        // return results;
                    });
                }
            });

            // $scope.chooseItem = function(itemId) {
            //     $scope.selectedItemId = itemId;
            //     console.log("item-", JSON.stringify(itemId));
            //     $scope.tableParams.filter({
            //         category: $scope.selectedItemId
            //     });
            //     $scope.tableParams.reload();
            // };

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
                // console.log(array)
                KeyPlaceService.deleteMultiple(array, function() {
                    $state.go('^.list');
                    $scope.tableParams.reload();
                }, function() {
                    $state.go('^.list');
                });
            };

        });
})();
