(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('TunnelService', function($state, CoreService, Tunnel,Guardian,AffiliatedInstitution, Alignment,gettextCatalog) {

            this.findById = function(id) {
                return Tunnel.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(tunnel) {
                return Tunnel.upsert(tunnel).$promise
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
                        Tunnel.deleteMultiple({ multiple: ids }, function() {
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
                        Tunnel.deleteById({ id: id }, function() {
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
                        key: 'tunnelname',
                        type: 'input',
                        templateOptions: {
                            label: '隧道名',
                            required: true,
                            placeholder: '请输入隧道名'
                        }
                    },
                    {
                        key: 'tunnelnumber',
                        type: 'input',
                        templateOptions: {
                            label: '隧道编号',
                            required: true,
                            placeholder: '请输入隧道编号'
                        }
                    },
                    {
                        key: 'tunnellength',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true,
                            placeholder: '请输入长度'
                        }
                    },
                   {
                        key: 'alignment',
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
                        key: 'startendmileage',
                        type: 'input',
                        templateOptions: {
                            label: '起始里程',
                            required: true,
                            placeholder: '请输入起始里程'
                        }
                    },
                    {
                        key: 'centermileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程',
                            required: true,
                            placeholder: '请输中心里程'
                        }
                    },
                    {
                        key: 'Guardian',
                        type: 'select',
                        templateOptions: {
                        label: '守护情况',
                        required: true,
                        options: [],
                        valueProp: "id",
                        labelProp: "Guardian"
                        },
                        controller: function($scope, Guardian) {
                            Guardian.find().$promise.then(function(value) {
                            console.log("守护情况--", JSON.stringify(value));
                            $scope.to.options = value;
                            return value;
                            });
                        }
                      }, 
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址',
                            required: true,
                            placeholder: '请输入地址'
                        }
                    },
                    {
                        key: 'localpolicestation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所',
                            required: true,
                            placeholder: '请输入所属地方派出所'
                        }
                    },
                    {
                        key: 'personincharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人',
                            required: true,
                            placeholder: '请输入负责人'
                        }
                    },
                    {
                        key: 'contactnumber',
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
                            console.log("所属机构--", JSON.stringify(value));
                            $scope.to.options = value;
                            return value;
                            });
                        }
                      },
                    {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度',
                            required: false
                        }
                    },{
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度',
                            required: false
                        }
                    },{
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明',
                            required: false
                        }
                    },{
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注',
                            required: false
                        }
                    }
                ];
                return form;
            };

        });

})();