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
        .controller('OrdersListCtrl', function($scope, CoreService, BroadcastWarningPost, AdvertisementService, $rootScope, $location, NgTableParams) {
            console.log("广播警示柱界面------");
            // $scope.maxSize = 6;
            // AdvertisementService.count()
            //     .then(function(result) {
            //         $scope.totalItems = result.count;
            //         console.log("条数-----", $scope.totalItems);
            //     })
            //     .catch(function(err) {
            //         console.log('OrderService.count err: ' + err);
            //         // $location.path('/error');
            //     });
            $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10
            }, {
                getData: function(params) {
                    console.log('=====table get date======');
                    var where = {};
                    if (params._params.filter.Name) {
                        where.Name = {
                            like: `%${params._params.filter.Name}%`
                        };
                    }

                    if (params._params.filter.AdministrativeDepartment) {
                        where.AdministrativeDepartment = {
                            like: `%${params._params.filter.AdministrativeDepartment}%`
                        };
                    }

                    BroadcastWarningPost.count({ where: where }).$promise.then(function(result) {
                        console.log('===SEI=====')
                        console.log(result.count)
                        $scope.totalItems = result.count;
                        params.total(result.count);
                    });
                    var offset = params._params.count * (params._params.page - 1);
                    BroadcastWarningPost.find({
                        filter: {
                            limit: params._params.count,
                            offset: offset,
                            where: where
                        }
                    }).$promise.then(function(value) {
                        $scope.securityEquipments = value;
                    });
                }
            });

            // 查询条件
            $scope.searchConditions = {
                Name: "",
                AdministrativeDepartment: ""
            };

            $scope.startSearch = function() {
                // isSearchMode = true;
                console.log('===========');
                // console.log(  $scope.tableParams.filter($scope.searchConditions) );
                $scope.tableParams.filter({
                    Name: $scope.searchConditions.Name,
                    AdministrativeDepartment: $scope.searchConditions.AdministrativeDepartment
                });
            };

            $scope.deleteItems = function(item) {
                console.log('=======')
                console.log($scope.selectedItems)
                var array = [];
                for (var value of $scope.selectedItems) {
                    array.push(value)
                }

                // SecurityEquipmentService.deleteAll(array, function() {
                //     $state.go('^.list');
                // }, function() {
                //     $state.go('^.list');
                // });
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