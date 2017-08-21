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
        .controller('OrdersListCtrl', function($scope, AdvertisementService, $rootScope, $location) {
            console.log("广播警示柱界面------");
            // $scope.maxSize = 6;
            // $scope.itemsPerPage = 10;
            AdvertisementService.count()
                .then(function(result) {
                    $scope.totalItems = result.count;
                    console.log("条数-----", scope.totalItems);
                })
                .catch(function(err) {
                    console.log('OrderService.count err: ' + err);
                    // $location.path('/error');
                });
            // var loadOrders = function() {
            //     AdvertisementService.find({
            //             filter: {
            //                 limit: $scope.itemsPerPage,
            //                 skip: ($scope.currentPage - 1) * $scope.itemsPerPage
            //             }
            //         })
            //         .then(function(result) {
            //             $scope.images = result;
            //             console.log("result所有数据----", JSON.stringify(result));
            //         })
            //         .catch(function(err) {
            //             console.log('OrderService.find err: ' + err);
            //             // $location.path('/error');
            //         });
            // };
            // // $scope.totalItems = 100;
            // $scope.currentPage = 1;
            // // $scope.order = 'id';
            // loadOrders();
            // $scope.pageChanged = function() {
            //     loadOrders();
            // };

            //加载list

            $scope.currentPage = 1;
            $scope.maxSize = 5;
            $scope.hasImage = true;

            // $scope.tableParams = new NgTableParams({
            //     page: 1, // show first page
            //     count: 20,
            //     // sorting: {
            //     //     lastUpdated: 'DESC' // initial sorting
            //     // }
            // }, {
            //     counts: [10, 20, 50, 100],
            //     total: 0, // length of data
            //     getData: function(params) {
            //         AdvertisementService.find()
            //             .then(function(result) {
            //                 // use build-in angular filter

            //                 $scope.images = result;
            //                 console.log("$scope.images----", JSON.stringify($scope.images));
            //                 return $scope.images;
            //             })
            //             .catch(function(err) {
            //                 console.log('AdvertisementService.find err: ' + err);
            //                 $location.path('/error');

            //             });
            //     }
            // });
            // $scope.openLightboxImageChecked = function() {
            //     console.log("");
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
            // $scope.openLightboxImageModal = function(index) {
            //     Lightbox.openModal($scope.images, index);
            // };
            // $scope.getSelectedCount = function() {
            //     if ($scope.images) {
            //         var count = 0;
            //         for (var i = 0; i < $scope.images.length; i++) {
            //             if ($scope.images[i].checked) {
            //                 count += 1;
            //             }
            //         }
            //         return count;
            //     } else {
            //         return 0;
            //     }
            // };
            // $scope.renameImage = function() {
            //     for (var i = 0; i < $scope.images.length; i++) {
            //         if ($scope.images[i].checked) {
            //             $scope.images[i].rename = true;
            //         }
            //     }
            // };
            // $scope.titleImage = function() {
            //     for (var i = 0; i < $scope.images.length; i++) {
            //         if ($scope.images[i].checked) {
            //             $scope.images[i].titleEdit = true;
            //         }
            //     }
            // };
            // $scope.updateImage = function(file) {
            //     file.rename = false;
            //     file.titleEdit = false;
            //     if (file.changed) {
            //         AdvertisementService.upsert(file);
            //     }
            // };
            // $scope.updateImageCancel = function(file) {
            //     if (file.changed) {
            //         console.log(file);
            //         AdvertisementService.findById(file.id).then(function(f) {
            //             file.title = f.title;
            //             file.name = f.name;
            //             file.rename = false;
            //             file.titleEdit = false;
            //         });
            //     }
            // };
            // $scope.deleteImage = function() {
            //     var warningInfo = '';
            //     var deleteImages = [];
            //     for (var i = 0; i < $scope.images.length; i++) {
            //         if ($scope.images[i].checked) {
            //             deleteImages.push($scope.images[i]);

            //             warningInfo += $scope.images[i].name;
            //             warningInfo += ',\n';
            //         }
            //     }
            //     if (!deleteImages.length) {
            //         return;
            //     }
            //     CoreService.confirm('确定要删除', '文件：[\n' + warningInfo + '] 吗？',
            //         function() {
            //             var i = 0;
            //             var deletePhoto = function(data) {
            //                 AdvertisementService.delete(data.id, function() {
            //                     $state.go('^.list');
            //                 }, function() {
            //                     $state.go('^.list');
            //                 });
            //             };
            //             for (; i < deleteImages.length; i++) {
            //                 deletePhoto(deleteImages[i]);
            //             }
            //         },
            //         function() {
            //             return false;
            //         });
            // };


            // $scope.ok = function() {
            //     console.log("确定----");
            //     if ($rootScope.modalInstance.imageCheckAdd) {
            //         var modalImages = [];
            //         for (var i = 0; i < $scope.images.length; i++) {
            //             if ($scope.images[i].checked) {
            //                 modalImages.push($scope.images[i]);
            //             }
            //         }
            //         $rootScope.modalInstance.close(modalImages);
            //     }
            //     if ($rootScope.modalInstance.imageRadioAdd && $rootScope.modalInstance.avatarRadio >= 0) {
            //         $rootScope.modalInstance.close($scope.images[$rootScope.modalInstance.avatarRadio]);
            //     }
            //     $rootScope.unsavedChanges = true;
            // };

            // $scope.cancel = function() {
            //     console.log("取消---");
            //     $rootScope.modalInstance.dismiss('cancel');
            // };



        });

})();