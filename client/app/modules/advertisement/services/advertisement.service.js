(function() {
    'use strict';
    angular
        .module('com.module.advertisement')
        .service('AdvertisementService', function($state, CoreService, BroadcastWarningPost, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.count = function() {
                console.log("条数-----");
                return BroadcastWarningPost.count().$promise;
            };
            //总数
            // this.find = function(filter) {
            //     return BroadcastWarningPost.find(filter).$promise;
            // };
            this.find = function(filter) {
                var filter = filter || {};
                return BroadcastWarningPost.find(filter).$promise;
            };


            this.findById = function(id) {
                return BroadcastWarningPost.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(advertisement) {
                return BroadcastWarningPost.upsert(advertisement).$promise
                    .then(function() {
                        CoreService.toastSuccess(
                            gettextCatalog.getString('Setting saved'),
                            gettextCatalog.getString('Your setting is safe with us!')
                        );
                    })
                    .catch(function(err) {
                        CoreService.toastError(
                            gettextCatalog.getString('Error saving setting '),
                            gettextCatalog.getString('This setting could no be saved: ' + err)
                        );
                    });
            };

            this.delete = function(id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        BroadcastWarningPost.deleteById({ id: id }, function() {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Setting deleted'),
                                gettextCatalog.getString('Your setting is deleted!'));
                            successCb();
                        }, function(err) {
                            CoreService.toastError(
                                gettextCatalog.getString('Error deleting setting'),
                                gettextCatalog.getString('Your setting is not deleted! ') + err);
                            cancelCb();
                        });
                    },
                    function() {
                        cancelCb();
                    }
                );
            };


            this.getFormFields = function() {
                var form = [{
                        key: 'name',
                        type: 'input',
                        templateOptions: {
                            label: '名字:',
                            required: true
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址：',
                            required: true
                        }
                    },
                    {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: true
                        }
                    },
                    {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: true
                        }
                    }, {
                        key: 'state',
                        type: 'input',
                        templateOptions: {
                            label: '状态:',
                            required: true
                        }
                    }, {
                        key: 'voicebroadcast',
                        type: 'input',
                        templateOptions: {
                            label: '语音播报:',
                            required: true
                        }
                    }, {
                        key: 'unicast',
                        type: 'input',
                        templateOptions: {
                            label: '单点广播:',
                            required: true
                        }
                    }, {
                        key: 'cameraid',
                        type: 'input',
                        templateOptions: {
                            label: '摄像头id:',
                            required: true
                        }
                    }
                ];
                return form;
            };

        });

})();