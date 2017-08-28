(function() {
    'use strict';
    angular
        .module('com.module.institutionaiteam')
        .service('InstitutionalTeamService', function(CoreService, AffiliatedInstitution, InstitutionalTeam, gettextCatalog) {
            this.find = function(result) {
                console.log("广播警示柱--2--");
                return InstitutionalTeam.find().$promise;
            };

            this.findById = function(id) {
                return InstitutionalTeam.findById({
                    id: id
                }).$promise;
            };

            this.deleteMultiple = function(ids, successCb, cancelCb) {
                console.log('=========' + ids);
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        InstitutionalTeam.deleteMultiple({ multiple: ids }, function() {
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

            this.upsert = function(institutionaiteam) {
                console.log("添加-------");
                return InstitutionalTeam.upsert(institutionaiteam).$promise
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
                        InstitutionalTeam.deleteById({ id: id }, function() {
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
                            label: '机构名:',
                            required: true,
                            placeholder: "请输入机构名"
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址:',
                            required: true,
                            placeholder: "请输入地址"
                        }
                    },
                    {
                        key: 'personcharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true,
                            placeholder: "请输入负责人"
                        }
                    }, {
                        key: 'admimdepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门:',
                            required: true,
                            placeholder: "请输入管理部门"
                        }
                    }, {
                        key: 'contactnumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话:',
                            required: true,
                            placeholder: "请输入联系电话"
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

                    }, {
                        key: 'affiliatedinstitution',
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
                            placeholder: "请输入备注"
                        }
                    }
                ];
                return form;
            };
        });
})();