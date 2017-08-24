(function() {
    'use strict';
    angular
        .module('com.module.emergencyaccess')
        .service('EmergencyAccessService', function($state, CoreService, EmergencyAccesss, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.find = function(result) {
                console.log("广播警示柱--2--");
                return EmergencyAccesss.find().$promise;
            };

            this.findById = function(id) {
                return EmergencyAccesss.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(emergencyaccess) {
                if (!(/^1[34578]\d{9}$/.test(emergencyaccess.ContactNumber))) {

                    CoreService.alertWarning('提示', '手机号格式输入有误');
                    return;
                }

                console.log("添加-------");
                return EmergencyAccesss.upsert(emergencyaccess).$promise
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
                        EmergencyAccesss.deleteMultiple({ multiple: ids }, function() {
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
                            placeholder: '名称'
                        }
                    },
                    {
                        key: 'CenterMileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程:',
                            required: true,
                            placeholder: '中心里程'
                        }
                    }, {
                        key: 'DoOther',
                        type: 'select',
                        templateOptions: {
                            label: '行别',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "alignment"
                        },
                        controller: function($scope, Alignment) {
                            Alignment.find().$promise.then(function(value) {
                                console.log("行别--", JSON.stringify(value));
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    },
                    {
                        key: 'Address',
                        type: 'input',
                        templateOptions: {
                            label: '地址:',
                            required: true,
                            placeholder: "地址"
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