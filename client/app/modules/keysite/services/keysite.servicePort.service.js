(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('ServicePortService', function($state, CoreService, ServicePort, gettextCatalog) {

            this.find = function() {
                return ServicePort.find().$promise;
            };

            this.findById = function(id) {
                return ServicePort.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(servicePort) {
                return ServicePort.upsert(servicePort).$promise
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
                        ServicePort.deleteMultiple({ multiple: ids }, function() {
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

            this.delete = function(id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        ServicePort.deleteById({ id: id }, function() {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('deleted'),
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
                            label: '检修口名称',
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
                    },{
                        key: 'localpolicestation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所',
                            required: true
                        }
                    },{
                        key: 'admimdepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门',
                            required: true
                        }
                    },{
                        key: 'centermileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程',
                            required: true
                        }
                    },
                    {
                        key: 'long',
                        type: 'input',
                        templateOptions: {
                            label: '经度',
                            required: true
                        }
                    },
                    {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度',
                            required: true
                        }
                    },
                    {
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明',
                            required: true
                        }
                    }
                ];
                return form;
            };

        });

})();
















