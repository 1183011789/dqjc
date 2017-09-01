(function() {
    'use strict';
    angular
        .module('com.module.apropagandapoint')
        .service('PropagandaPointService', function($state, CoreService, AffiliatedInstitution, APropagandaPoint, gettextCatalog) {

            this.count = function() {
                console.log("条数-----");
                return APropagandaPoint.count().$promise;
            };
            this.find = function(result) {
                return APropagandaPoint.find().$promise;
            };

            this.findById = function(id) {
                return APropagandaPoint.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(apropagandapoint) {
                console.log("添加-------");
                return APropagandaPoint.upsert(apropagandapoint).$promise
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
                        APropagandaPoint.deleteById({ id: id }, function() {
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
                        APropagandaPoint.deleteMultiple({ multiple: ids }, function() {
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
                        key: 'number',
                        type: 'input',
                        templateOptions: {
                            label: '编号:',
                            required: true,
                            placeholder: "请输入编号"
                        }
                    },
                    {
                        key: 'name',
                        type: 'input',
                        templateOptions: {
                            label: '名称:',
                            required: true,
                            placeholder: "请输入名称"
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
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: false,
                            placeholder: "请输入经度"
                        }
                    },
                    {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: false,
                            placeholder: "请输入备注"
                        }
                    }, {
                        key: 'personCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true,
                            placeholder: "请输入负责人"
                        }
                    },
                    {
                        key: 'contactNumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话:',
                            required: true,
                            placeholder: "请输入联系电话",
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
                        //   validators: {
                        //     phone: {
                        //         expression: function(viewValue, modelValue) {
                        //             var value = modelValue || viewValue;
                        //             return /^([0-9]|[-])+$/g.test(value);
                        //         },
                        //         message: '$viewValue + " is not a valid IP Address"'
                        //     }
                        // }
                    },
                    {
                        key: 'affiliatedinstitution',
                        type: 'select',
                        templateOptions: {
                            label: '所属机构',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "affiliatedinstitution",
                        },
                        controller: function($scope, AffiliatedInstitution) {
                            AffiliatedInstitution.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    },
                    
                    {
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