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

            this.delete = function(id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        EmergencyAccesss.deleteById({ id: id }, function() {
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
                            required: true
                        }
                    },
                    {
                        key: 'CenterMileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程:',
                            required: true
                        }
                    },
                    {
                        key: 'DoOther',
                        type: 'input',
                        templateOptions: {
                            label: '行别:',
                            required: true
                        }
                    },
                    {
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