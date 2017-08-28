(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('CrossIronBridgeService', function($state, AffiliatedInstitution,CoreService, CrossIronBridge, gettextCatalog) {

            this.find = function() {
                return CrossIronBridge.find().$promise;
            };

            this.findById = function(id) {
                return CrossIronBridge.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(crossIronBridge) {
                return CrossIronBridge.upsert(crossIronBridge).$promise
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
                        CrossIronBridge.deleteMultiple({ multiple: ids }, function() {
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
                        CrossIronBridge.deleteById({ id: id }, function() {
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
                        key: 'ironbridgename',
                        type: 'input',
                        templateOptions: {
                            label: '横跨铁桥名称',
                            required: true,
                            placeholder: '请输入横跨铁桥名称'
                        }
                    },
                    {
                        key: 'length',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true,
                            placeholder: '请输入长度'
                        }
                    },
                    {
                        key: 'centermileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程',
                            required: true,
                            placeholder: '请输入中心里程'
                        }
                    },
                    {
                        key: 'protect',
                        type: 'input',
                        templateOptions: {
                            label: '是否有防护措施',
                            required: true,
                            placeholder: '请选择是否',
                            options: [
                                { name: '是', value: '1' },
                                { name: '否', value: '0' },
                            ],
                        }
                    },
                    {
                        key: 'restrictionandspeed',
                        type: 'input',
                        templateOptions: {
                            label: '是否有限重限速标示',
                            required: true,
                            placeholder: '请选择是否',
                             options: [
                                { name: '是', value: '1' },
                                { name: '否', value: '0' },
                            ],
                        }
                    },
                    {
                        key: 'weightlimit',
                        type: 'input',
                        templateOptions: {
                            label: '限重',
                            required: true,
                            placeholder: '请输入限重'
                        }
                    },
                    {
                        key: 'speedlimit',
                        type: 'input',
                        templateOptions: {
                            label: '限速',
                            required: true,
                            placeholder: '请输入限速'
                        }
                    },
                    {
                        key: 'transfer',
                        type: 'input',
                        templateOptions: {
                            label: '是否移交',
                            required: true,
                            placeholder: '请选择是否',
                             options: [
                                { name: '是', value: '1' },
                                { name: '否', value: '0' },
                            ],
                        }
                    },
                    {
                        key: 'pedestrianpassage',
                        type: 'input',
                        templateOptions: {
                            label: '行人通道',
                            required: true,
                            placeholder: '请输入行人通道'
                        }
                    },
                    {
                        key: 'handovertime',
                        type: 'datepicker',
                        templateOptions: {
                            label: '移交时间',
                            required: true,

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
                        key: 'admimdepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门',
                            required: true,
                            placeholder: '请输入管理部门'
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
                            placeholder: '请输入联系电话'
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
                            required: false,
                            placeholder: '请输入经度'
                        }
                    },
                    {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度',
                            required: false,
                            placeholder: '请输入纬度'
                        }
                    },
                    {
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明',
                            required: false,
                            placeholder: '请输入说明'
                        }
                    },{
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注',
                            required: false,
                            placeholder: '请输入备注'

                        }
                    }
                ];
                return form;
            };

        });

})();