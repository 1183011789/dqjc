(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('CrossIronBridgeService', function($state, CoreService, CrossIronBridge, gettextCatalog) {

            this.find = function() {
                return CrossIronBridge.find().$promise;
            };

            this.findById = function(id) {
                return CrossIronBridge.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(crossIronBridge) {
                return CrossIronBridge.upsert(crossIronBridge).$promise
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
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        CrossIronBridge.deleteMultiple({ multiple: ids }, function() {
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
                        key: 'ironbridgename',
                        type: 'input',
                        templateOptions: {
                            label: '名称',
                            required: true
                        }
                    },
                    {
                        key: 'length',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true
                        }
                    },
                    {
                        key: 'centermileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程',
                            required: true
                        }
                    },
                    {
                        key: 'protect',
                        type: 'input',
                        templateOptions: {
                            label: '是否有防护措施',
                            required: true
                        }
                    },
                    {
                        key: 'restrictionandspeed',
                        type: 'input',
                        templateOptions: {
                            label: '是否有限重限速标示',
                            required: true
                        }
                    },
                    {
                        key: 'weightlimit',
                        type: 'input',
                        templateOptions: {
                            label: '限重',
                            required: true
                        }
                    },
                    {
                        key: 'speedlimit',
                        type: 'input',
                        templateOptions: {
                            label: '限速',
                            required: true
                        }
                    },
                    {
                        key: 'transfer',
                        type: 'input',
                        templateOptions: {
                            label: '移交',
                            required: true
                        }
                    },
                    {
                        key: 'pedestrianpassage',
                        type: 'input',
                        templateOptions: {
                            label: '行人通道',
                            required: true
                        }
                    },
                    {
                        key: 'handovertime',
                        type: 'input',
                        templateOptions: {
                            label: '移交时间',
                            required: true
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址',
                            required: true
                        }
                    },
                    {
                        key: 'localpolicestation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所',
                            required: true
                        }
                    },
                    {
                        key: 'admimdepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门',
                            required: true
                        }
                    },
                    {
                        key: 'personincharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人',
                            required: true
                        }
                    },
                    {
                        key: 'contactnumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话',
                            required: true
                        }
                    },
                    {
                        key: 'affiliatedinstitution',
                        type: 'input',
                        templateOptions: {
                            label: '所属机构',
                            required: true
                        }
                    },
                    {
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注',
                            required: true
                        }
                    }
                ];
                return form;
            };

        });

})();