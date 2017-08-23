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
                console.log("修改--------", JSON.stringify(advertisement));
                // if (!advertisement) {
                //     CoreService.alertWarning('提示', '内容');
                // }
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

            this.deleteMultiple = function(ids, successCb, cancelCb) {
                console.log('=========' + ids);
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        BroadcastWarningPost.deleteMultiple({ multiple: ids }, function() {
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
                            type: 'text',
                            label: '名字:',
                            required: false,
                            placeholder: '请输入名字'
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址：',
                            required: false,
                            placeholder: '请输入地址'
                        }
                    },
                    {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: false,
                            placeholder: '请输入经度'
                        }
                    },
                    {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: false,
                            placeholder: '请输入纬度'
                        }
                    }, {
                        key: 'state',
                        type: 'select',
                        templateOptions: {
                            label: '状态',
                            required: true,
                            placeholder: '请选择状态',
                            options: [
                                { name: '可用', value: '1' },
                                { name: '不可用', value: '0' },
                            ],

                        }
                    },
                    {
                        key: 'voicebroadcast',
                        type: 'input',
                        templateOptions: {
                            label: '语音播报:',
                            required: false,
                            placeholder: '请输入语音播报'
                        }
                    }, {
                        key: 'unicast',
                        type: 'input',
                        templateOptions: {
                            label: '单点广播:',
                            required: false,
                            placeholder: '单点广播'
                        }
                    }, {
                        key: 'cameraid',
                        type: 'input',
                        templateOptions: {
                            label: '摄像头id:',
                            required: false,
                            placeholder: '摄像头id'
                        }
                    }
                ];
                return form;
            };

        });

})();