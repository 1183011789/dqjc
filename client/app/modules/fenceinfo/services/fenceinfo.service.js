(function() {
    'use strict';
    angular
        .module('com.module.fenceinfo')
        .service('FenceInfoService', function($state, CoreService, FenceInfo, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.find = function(result) {
                console.log("广播警示柱--2--");
                return FenceInfo.find().$promise;
            };

            this.findById = function(id) {
                return FenceInfo.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(fenceinfo) {
                console.log("添加-------");
                return FenceInfo.upsert(fenceinfo).$promise
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
                        FenceInfo.deleteById({ id: id }, function() {
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

            this.deleteMultiple = function(ids, successCb, cancelCb) {
                console.log('=========' + ids);
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        FenceInfo.deleteMultiple({ multiple: ids }, function() {
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
                            label: '名称:',
                            required: true
                        }
                    },
                    {
                        key: 'length',
                        type: 'input',
                        templateOptions: {
                            label: '长度:',
                            required: true
                        }
                    },
                    {
                        key: 'lengthOfRollingCage',
                        type: 'input',
                        templateOptions: {
                            label: '刺死滚笼长度:',
                            required: true
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址:',
                            required: true
                        }
                    }, {
                        key: 'textureOfMaterial',
                        type: 'input',
                        templateOptions: {
                            label: '材质:',
                            required: true
                        }
                    }, {
                        key: 'height',
                        type: 'input',
                        templateOptions: {
                            label: '高度:',
                            required: true
                        }
                    },
                    {
                        key: 'subgradeSection',
                        type: 'input',
                        templateOptions: {
                            label: '路基段:',
                            required: true
                        }
                    },
                    {
                        key: 'lineSpeedPerHour',
                        type: 'input',
                        templateOptions: {
                            label: '线路段设计时速:',
                            required: true
                        }
                    }, {
                        key: 'kilometerMark',
                        type: 'input',
                        templateOptions: {
                            label: '公里标:',
                            required: true
                        }
                    }, {
                        key: 'workGateUseUnit',
                        type: 'input',
                        templateOptions: {
                            label: '工作门使用单位:',
                            required: true
                        }
                    }, {
                        key: 'doOther',
                        type: 'input',
                        templateOptions: {
                            label: '行别:',
                            required: true
                        }
                    }, {
                        key: 'localPoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所:',
                            required: true
                        }
                    }, {
                        key: 'administrativeDepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门:',
                            required: true
                        }
                    }, {
                        key: 'personCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true
                        }
                    }, {
                        key: 'contactNumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话:',
                            required: true
                        }
                    }, {
                        key: 'affiliatedInstitution',
                        type: 'input',
                        templateOptions: {
                            label: '所属机构:',
                            required: true
                        }
                    }
                ];
                return form;
            };
        });
})();