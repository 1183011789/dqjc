(function() {
    'use strict';
    angular
        .module('com.module.securityequipment')
        .service('SecurityEquipmentService', function($state, CoreService, Station, SecurityEquipmentInformation, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.find = function(result) {
                console.log("广播警示柱--2--");
                return SecurityEquipmentInformation.find().$promise;
            };

            this.findById = function(id) {
                return SecurityEquipmentInformation.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(securityequipment) {
                console.log("添加------ContactNumber-");
                if (!(/^1[34578]\d{9}$/.test(securityequipment.ContactNumber))) {
                    CoreService.alertWarning('提示', '手机号格式输入有误');
                    return;
                }
                return SecurityEquipmentInformation.upsert(securityequipment).$promise
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
                        SecurityEquipmentInformation.deleteById({ id: id }, function() {
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
                        SecurityEquipmentInformation.deleteMultiple({ multiple: ids }, function() {
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
                        key: 'Name',
                        type: 'input',
                        templateOptions: {
                            label: '名称:',
                            required: true,
                            placeholder: "名称"
                        }
                    },
                    {
                        key: 'Position',
                        type: 'input',
                        templateOptions: {
                            label: '部位:',
                            required: true,
                            placeholder: "部位"
                        }
                    }, {
                        key: 'Station',
                        type: 'select',
                        templateOptions: {
                            label: '车站',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "StationName"
                        },
                        controller: function($scope, Station) {
                            Station.find().$promise.then(function(value) {
                                console.log("查车站-1--", JSON.stringify(value));
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    },
                    {
                        key: 'Other',
                        type: 'input',
                        templateOptions: {
                            label: '其他:',
                            required: true,
                            placeholder: "其他"
                        }
                    }, {
                        key: 'Number',
                        type: 'input',
                        templateOptions: {
                            label: '数量:',
                            required: true,
                            placeholder: "数量"
                        }
                    }, {
                        key: 'SiteOfUse',
                        type: 'input',
                        templateOptions: {
                            label: '使用地点:',
                            required: true,
                            placeholder: "使用站点"
                        }
                    }, {
                        key: 'LocalPoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所:',
                            required: true,
                            placeholder: "所属地方派出所"
                        }
                    }, {
                        key: 'AdministrativeDepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门:',
                            required: true,
                            placeholder: "管理部门"
                        }
                    }, {
                        key: 'PersonCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true,
                            placeholder: "负责人"
                        }
                    }, {
                        key: 'ContactNumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话:',
                            required: true,
                            placeholder: "联系电话"
                        }
                    }, {
                        key: 'AffiliatedInstitution',
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
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: false,
                            placeholder: "经度"
                        }
                    }, {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: false,
                            placeholder: "纬度"

                        }
                    }, {
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明:',
                            required: false,
                            placeholder: "说明"

                        }
                    }, {
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注:',
                            required: false,
                            placeholder: "备注"
                        }
                    }
                ];
                return form;
            };
        });
})();