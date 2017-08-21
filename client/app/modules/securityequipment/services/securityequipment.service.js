(function() {
    'use strict';
    angular
        .module('com.module.securityequipment')
        .service('SecurityEquipmentService', function($state, CoreService, SecurityEquipmentInformation, gettextCatalog) {
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
                console.log("添加-------");
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
                        key: 'Position',
                        type: 'input',
                        templateOptions: {
                            label: '部位:',
                            required: true
                        }
                    },
                    {
                        key: 'Station',
                        type: 'input',
                        templateOptions: {
                            label: '车站:',
                            required: true
                        }
                    },
                    {
                        key: 'Other',
                        type: 'input',
                        templateOptions: {
                            label: '其他:',
                            required: true
                        }
                    }, {
                        key: 'Number',
                        type: 'input',
                        templateOptions: {
                            label: '数量:',
                            required: true
                        }
                    }, {
                        key: 'SiteOfUse',
                        type: 'input',
                        templateOptions: {
                            label: '使用地点:',
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