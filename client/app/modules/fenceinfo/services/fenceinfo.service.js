(function() {
    'use strict';
    angular
        .module('com.module.fenceinfo')
        .service('FenceInfoService', function($state, CoreService,AffiliatedInstitution, Alignment,FenceInfo, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.find = function(result) {
                console.log("广播警示柱--2--");
                return FenceInfo.find().$promise;
            };

            this.findById = function(id) {
                return FenceInfo.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(fenceinfo) {
                // if (!(/^1[34578]\d{9}$/.test(fenceinfo.contactNumber))) {
                //     CoreService.alertWarning('提示', '手机号格式输入有误');
                //     return;
                // }

                console.log("添加-------");
                return FenceInfo.upsert(fenceinfo).$promise
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
                        FenceInfo.deleteById({ id: id }, function() {
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
                        FenceInfo.deleteMultiple({ multiple: ids }, function() {
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
                            label: '名称:',
                            required: true,
                            placeholder: "请输入名称"
                        }
                    },
                    {
                        key: 'length',
                        type: 'input',
                        templateOptions: {
                            label: '长度:',
                            required: true,
                            placeholder: "请输入长度"
                        }
                    },
                    {
                        key: 'lengthOfRollingCage',
                        type: 'input',
                        templateOptions: {
                            label: '刺死滚笼长度:',
                            required: true,
                            placeholder: "请输入刺死滚笼长度"
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
                    }, {
                        key: 'textureOfMaterial',
                        type: 'input',
                        templateOptions: {
                            label: '材质:',
                            required: true,
                            placeholder: "请输入材质"
                        }
                    }, {
                        key: 'height',
                        type: 'input',
                        templateOptions: {
                            label: '高度:',
                            required: true,
                            placeholder: "请输入高度"
                        }
                    },
                    {
                        key: 'subgradeSection',
                        type: 'select',
                        templateOptions: {
                            label: '是否路基段:',
                            required: true,
                            placeholder: "请选择是否",
                            options: [
                                { name: '是', value: '1' },
                                { name: '否', value: '0' },
                            ],
                        }
                    },
                    {
                        key: 'lineSpeedPerHour',
                        type: 'input',
                        templateOptions: {
                            label: '线路段设计时速:',
                            required: true,
                            placeholder: "请输入线路段设计时速"
                        }
                    }, {
                        key: 'kilometerMark',
                        type: 'input',
                        templateOptions: {
                            label: '公里标:',
                            required: true,
                            placeholder: "请输入公里标"
                        }
                    }, {
                        key: 'workGateUseUnit',
                        type: 'input',
                        templateOptions: {
                            label: '工作门使用单位:',
                            required: true,
                            placeholder: "请输入工作门使用单位"
                        }
                    }, {
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
                    }, {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址:',
                            required: true,
                            placeholder: "请输入地址"
                        }
                    }, {
                        key: 'localPoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所:',
                            required: true,
                            placeholder: "请输入所属地方派出所"

                        }
                    }, {
                        key: 'administrativeDepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门:',
                            required: true,
                            placeholder: "请输入管理部门"

                        }
                    }, {
                        key: 'personCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true,
                            placeholder: "请输入负责人"
                        }
                    }, {
                        key: 'contactNumber',
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
                    },
                    {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: false,
                            placeholder: "请输入经度"
                        }
                    }, {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: false,
                            placeholder: "请输入纬度"

                        }
                    }, {
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明:',
                            required: false,
                            placeholder: "请输入说明"

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