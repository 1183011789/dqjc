(function() {
    'use strict';
    angular
        .module('com.module.monitoring')
        .service('MonitoringService', function($state, CoreService, Monitoring, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.find = function(result) {
                console.log("广播警示柱--2--");
                return Monitoring.find().$promise;
            };

            this.findById = function(id) {
                return Monitoring.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(monitoring) {
                console.log("添加-------");
                return Monitoring.upsert(monitoring).$promise
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
                        Monitoring.deleteById({ id: id }, function() {
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
                        key: 'Number',
                        type: 'input',
                        templateOptions: {
                            label: '编号:',
                            required: true
                        }
                    },
                    {
                        key: 'DeviceName',
                        type: 'input',
                        templateOptions: {
                            label: '名称:',
                            required: true
                        }
                    },
                    {
                        key: 'Position',
                        type: 'input',
                        templateOptions: {
                            label: '监控部位:',
                            required: true
                        }
                    },
                    {
                        key: 'AccessSector',
                        type: 'input',
                        templateOptions: {
                            label: '接入部门:',
                            required: true
                        }
                    }, {
                        key: 'Address',
                        type: 'input',
                        templateOptions: {
                            label: '地址:',
                            required: true
                        }
                    }, {
                        key: 'LocalPoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所:',
                            required: true
                        }
                    }, {
                        key: 'AdministrativeDepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门:',
                            required: true
                        }
                    }, {
                        key: 'PersonCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true
                        }
                    }, {
                        key: 'ContactNumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话:',
                            required: true
                        }
                    }, {
                        key: 'UserName',
                        type: 'input',
                        templateOptions: {
                            label: '用户名:',
                            required: true
                        }
                    }, {
                        key: 'Password',
                        type: 'input',
                        templateOptions: {
                            label: '密码:',
                            required: true
                        }
                    }, {
                        key: 'PortNumber',
                        type: 'input',
                        templateOptions: {
                            label: '端口号:',
                            required: true
                        }
                    }, {
                        key: 'ChannelNumber',
                        type: 'input',
                        templateOptions: {
                            label: '通道号:',
                            required: true
                        }
                    }, {
                        key: 'CallClass',
                        type: 'input',
                        templateOptions: {
                            label: '调用类:',
                            required: true
                        }
                    }, {
                        key: 'longitude',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: true
                        }
                    }, {
                        key: 'Latitude',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: true
                        }
                    }, {
                        key: 'AffiliatedInstitution',
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