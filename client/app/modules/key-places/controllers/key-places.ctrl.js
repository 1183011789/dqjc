(function() {
    'use strict';
    angular
        .module('com.module.keyPlaces') //['formly', 'formlyBootstrap', 'ngAnimate', 'ngAria', 'ngMessages']
        .controller('KeyPlaceCtrl', function($scope, $rootScope, CoreService, KeyPlaceImg, Lightbox, KeyPlaceCategory, KeyPlace, KeyPlaceService, $state, NgTableParams) {

            // $scope.items = [{
            //     category: '全部',
            //     id: -1,
            //     checked: true
            // }];
            // $scope.selectedItemId = -1;
            // KeyPlaceCategory.find().$promise.then(function(value) {
            //     $scope.items = $scope.items.concat(value);
            // });
            $scope.maxSize = 6;
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

                    if (params._params.filter.name) {
                        where.name = {
                            like: `%${params._params.filter.name}%`
                        };
                    }

                    if (params.filter().category > 0) {
                        where.category = params.filter().category
                    }
                    // console.log('---count-->', params.count());
                    // console.log('---page-->',params.page());
                    // console.log('---filter-->',params.filter());
                    var offset = params.count() * (params.page() - 1);

                    KeyPlace.count({ where: where }).$promise.then(function(result) {
                        params.total(result.count);
                        $scope.totalItems = result.count;
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

            $scope.searchConditions = {
                name: ""
            };

            $scope.startSearch = function() {
                $scope.tableParams.filter({
                    name: $scope.searchConditions.name
                });
            };

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
                InstitutionalTeamService.deleteMultiple(array, function() {
                    $state.go('^.list');
                    $scope.tableParams.reload();
                }, function() {
                    $state.go('^.list');
                });
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
            // $scope.editItem = function() {
            //     console.log($scope.selectedItems);
            //     if ($scope.selectedItems.size < 1) {
            //         CoreService.alertWarning('提示', '还没选中');
            //     } else if ($scope.selectedItems.size > 1) {
            //         CoreService.alertWarning('提示', '一次只能编辑一个');
            //     } else {
            //         var a = Array.from($scope.selectedItems);
            //         console.log(a[0]);
            //         $state.go('^.edit', { id: a[0] });
            //     }
            // };
            $scope.addImage = function() {
                if ($scope.selectedItems.size < 1) {
                    CoreService.alertWarning('提示', '还没选中');
                } else if ($scope.selectedItems.size > 1) {
                    CoreService.alertWarning('提示', '一次只能编辑一个');
                } else {
                    // ui-sref="^.edit({id: item.id})"
                    for (var value of $scope.selectedItems) {
                        var addItm = value;
                        console.log("id---", addItm);
                        $rootScope.imageId = addItm;
                        break;
                    }
                    $state.go('^.upload', { id: addItm });
                }
            }
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
            // $scope.images = [{ "mimeType": "image/png", "key": "Fsj8WTLuHuK8-3BGyGd079Nffn09", "name": "铁路内部单位.png", "title": "", "url": "http://obxk6rroh.bkt.clouddn.com/Fsj8WTLuHuK8-3BGyGd079Nffn09", "container": "aoc-news", "size": 2301, "height": null, "width": null, "created": "2017-08-31T03:54:22.000Z", "lastUpdated": "2017-08-31T03:54:22.000Z", "id": 97, "userId": 22 }, { "mimeType": "image/png", "key": "FqHhcjHf35E2oHUtqU_YAdZqvVNL", "name": "yeoman.png", "title": "", "url": "http://obxk6rroh.bkt.clouddn.com/FqHhcjHf35E2oHUtqU_YAdZqvVNL", "container": "aoc-news", "size": 13501, "height": null, "width": null, "created": "2017-08-31T03:54:22.000Z", "lastUpdated": "2017-08-31T03:54:22.000Z", "id": 98, "userId": 22 }, { "mimeType": "image/png", "key": "FpBmP4e5kLuKeSLAHUsfYBAnirRC", "name": "屏幕快照 2017-05-05 下午2.58.39.png", "title": "", "url": "http://obxk6rroh.bkt.clouddn.com/FpBmP4e5kLuKeSLAHUsfYBAnirRC", "container": "aoc-news", "size": 50915, "height": null, "width": null, "created": "2017-08-29T08:01:13.000Z", "lastUpdated": "2017-08-29T08:01:13.000Z", "id": 95, "userId": 22 }, { "mimeType": "image/png", "key": "FjxAX3yuaT2tqDZ5fwCk9GQ2kmue", "name": "屏幕快照 2017-05-04 下午4.36.20.png", "title": "", "url": "http://obxk6rroh.bkt.clouddn.com/FjxAX3yuaT2tqDZ5fwCk9GQ2kmue", "container": "aoc-news", "size": 126620, "height": null, "width": null, "created": "2017-08-29T08:01:13.000Z", "lastUpdated": "2017-08-29T08:01:13.000Z", "id": 96, "userId": 22 }, { "mimeType": "image/jpeg", "key": "FnjXhuOEiaQ70JV3Uotc6bbffZmr", "name": "o1.jpg", "title": "", "url": "http://obxk6rroh.bkt.clouddn.com/FnjXhuOEiaQ70JV3Uotc6bbffZmr", "container": "aoc-news", "size": 187088, "height": null, "width": null, "created": "2017-08-29T07:55:06.000Z", "lastUpdated": "2017-08-29T07:55:06.000Z", "id": 94, "userId": 22 }, { "mimeType": "image/jpeg", "key": "FnjXhuOEiaQ70JV3Uotc6bbffZmr", "name": "o1.jpg", "title": "", "url": "http://obxk6rroh.bkt.clouddn.com/FnjXhuOEiaQ70JV3Uotc6bbffZmr", "container": "aoc-news", "size": 187088, "height": null, "width": null, "created": "2017-08-29T02:35:08.000Z", "lastUpdated": "2017-08-29T02:35:08.000Z", "id": 93, "userId": 22 }, { "mimeType": "image/png", "key": "Foc1hVb_IBHQXjgIxxKqZJVjMZM3", "name": "D97A0A2E-9F54-4EB1-8025-C25EACC890C5.png", "title": "", "url": "http://obxk6rroh.bkt.clouddn.com/Foc1hVb_IBHQXjgIxxKqZJVjMZM3", "container": "aoc-news", "size": 91044, "height": null, "width": null, "created": "2017-08-22T01:37:15.000Z", "lastUpdated": "2017-08-22T01:37:15.000Z", "id": 91, "userId": 22 }];
            // $scope.openLightboxImageChecked = function() {
            //     console.log("-1----------");
            //     var count = 0;
            //     var tempIndex = -1;
            //     for (var i = 0; i < $scope.images.length; i++) {
            //         if ($scope.images[i].checked) {
            //             count += 1;
            //             tempIndex = i;
            //         }
            //     }
            //     if (count === 1) {
            //         Lightbox.openModal($scope.images, tempIndex);
            //     }
            // };
            $scope.openLightboxImageModal = function(index) {
                $scope.images = [];
                console.log("-2----------", index);
                KeyPlaceImg.find({
                    filter: {
                        where: {
                            keyPlaceId: index
                        }
                    }

                }, function(result) {
                    console.log("result--", JSON.stringify(result));
                    $scope.images = result;
                    if (result.length === 0) {
                        CoreService.alertWarning('提示', '还没上传照片,请上传照片后浏览');
                    } else {
                        Lightbox.openModal($scope.images, index);

                    }

                }, function(error) {

                });


            };

        });
})();