(function() {
    'use strict';
    angular
        .module('com.module.monitoring')
        .service('MonitoringService', function($state, CoreService, Monitoring,AffiliatedInstitution, gettextCatalog) {
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
                console.log("添加-------", JSON.stringify(monitoring));
                if (!(/^1[34578]\d{9}$/.test(monitoring.ContactNumber))) {

                    CoreService.alertWarning('提示', '手机号格式输入有误');
                    return;
                }
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

            this.deleteMultiple = function(ids, successCb, cancelCb) {
                console.log('=========' + ids);
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        Monitoring.deleteMultiple({ multiple: ids }, function() {
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
                            required: true,
                            placeholder: '请输入编号',
                        }
                    },
                    {
                        key: 'DeviceName',
                        type: 'input',
                        templateOptions: {
                            label: '名称:',
                            required: true,
                            placeholder: '请输入名称',
                        }
                    },
                    {
                        key: 'Position',
                        type: 'input',
                        templateOptions: {
                            label: '监控部位:',
                            required: true,
                            placeholder: '请输入监控设备',
                        }
                    },
                    {
                        key: 'AccessSector',
                        type: 'input',
                        templateOptions: {
                            label: '接入部门:',
                            required: true,
                            placeholder: '请输入接入部门',
                        }
                    }, {
                        key: 'Address',
                        type: 'input',
                        templateOptions: {
                            label: '地址:',
                            required: true,
                            placeholder: '请输入地址',
                        }
                    }, {
                        key: 'LocalPoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所:',
                            required: true,
                            placeholder: '请输入地方派出所',
                        }
                    }, {
                        key: 'AdministrativeDepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门:',
                            required: true,
                            placeholder: '请输入管理部门',
                        }
                    }, {
                        key: 'PersonCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true,
                            placeholder: '请输入负责人',
                        }
                    }, {
                        key: 'ContactNumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话',
                            required: true,
                            placeholder: '请输入联系电话',
                        },
                        validators: {
                            phone: {
                                expression: function(viewValue, modelValue) {
                                    var value = modelValue || viewValue;
                                    return /^([0-9]|[-])+$/g.test(value);
                                },
                                message: '$viewValue + " 不是正确的电话格式"'
                            }
                        }

                        // validators: {
                        //     phone: {
                        //         expression: function(viewValue, modelValue) {
                        //             var value = modelValue || viewValue;
                        //             return /^([0-9]|[-])+$/g.test(value);
                        //         },
                        //         message: '$viewValue + " is not a valid IP Address"'
                        //     }
                        // }
                    }, {
                        key: 'UserName',
                        type: 'input',
                        templateOptions: {
                            label: '用户名:',
                            required: true,
                            placeholder: '请输入用户名',
                        }
                    }, {
                        key: 'Password',
                        type: 'input',
                        templateOptions: {
                            label: '密码:',
                            required: true,
                            placeholder: '请输入密码',
                        }
                    }, {
                        key: 'PortNumber',
                        type: 'input',
                        templateOptions: {
                            label: '端口号:',
                            required: true,
                            placeholder: '请输入端口号',
                        }
                    }, {
                        key: 'ChannelNumber',
                        type: 'input',
                        templateOptions: {
                            label: '通道号:',
                            required: true,
                            placeholder: '请输入通道号',
                        }
                    }, {
                        key: 'CallClass',
                        type: 'input',
                        templateOptions: {
                            label: '调用类:',
                            required: true,
                            placeholder: '请输入通用类',
                        }
                    }, {
                        key: 'longitude',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: false,
                            placeholder: '请输入经度',
                        }
                    }, {
                        key: 'Latitude',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: false,
                            placeholder: '请输入纬度',
                        }
                    },
                    {
                        key: 'affiliatedInstitution',
                        type: 'select',
                        templateOptions: {
                            label: '所属机构',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "affiliatedInstitution"
                        },
                        controller: function($scope, AffiliatedInstitution) {
                            AffiliatedInstitution.find().$promise.then(function(value) {
                                // console.log("所属机构-1--", JSON.stringify(value));
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    }, {
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注:',
                            required: false,
                            placeholder: '请输入备注',
                        }
                    }
                ];
                return form;
            };
        });
})();