(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name com.module.images.controller:ImageUploadCtrl
     * @description Dashboard
     * @requires $scope
     * @requires $rootScope
     **/
    angular
        .module('com.module.hiddenplace')
        .controller('PointImageUploadCtrl', function($scope, $rootScope, APropagandaPointImg, FileUploader, Lightbox, $http, CoreService, $timeout) {
            /*** upload ***/
            // create a uploader with options

            console.log("$rootScope.imageId-护路宣传点-", $rootScope.imageId);
            var uploader = $scope.uploader = new FileUploader({
                scope: $scope, // to automatically update the html. Default: $rootScope
                url: '/api/APropagandaPointImgs/upload'

            });
            // console.log('Add filters and callbacks to the uploader object:', uploader);
            // FILTERS AND CALLBACKS
            uploader.filters.push({
                name: 'imageFilter',
                fn: function(item) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });
            // CALLBACKS
            var failedFiles = [];
            uploader.onWhenAddingFileFailed = function(item, filter, options) {

                if (filter.name === 'imageFilter') {
                    failedFiles.push(item);
                }
                $timeout(
                    function() {
                        if (failedFiles.length > 0) {
                            var errorInfo = '';
                            for (var i = 0; i < failedFiles.length; i++) {
                                errorInfo += failedFiles[i].name;
                                if (i < failedFiles.length - 1) {
                                    errorInfo += ',\n';
                                }
                            }
                            failedFiles = [];
                            CoreService.alertWarning('部分文件添加失败', '文件：[\n' + errorInfo + '\n] 是不支持的图片上传格式！没有添加到上传队列！');
                        }
                    },
                    100
                );
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            //获取上传的图片
            // $scope.imageArray = [];
            uploader.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems[0].file);
            };
            uploader.onBeforeUploadItem = function(item) {
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem);
                console.log("url--", JSON.stringify(response));
                var image = {};
                image.type = fileItem.file.type;
                image.name = fileItem._file.name;
                image.url = response[0].url;
                image.aPropagandaPointId = $rootScope.imageId;
                APropagandaPointImg.create(image);
                $rootScope.imageId = "";
            };


        });

})();