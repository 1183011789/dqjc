(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('CulvertService', function($state, CoreService,Guardian,AffiliatedInstitution, Alignment,Culvert, gettextCatalog) {

            this.find = function() {
                return Culvert.find().$promise;
            };

            this.findById = function(id) {
                return Culvert.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(culvert) {
                var k=parseInt(culvert.K);
                var m=parseInt(culvert.M);
                var num=k*1000+m;
                culvert.centermileage=num;
                return Culvert.upsert(culvert).$promise
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
                        Culvert.deleteMultiple({ multiple: ids }, function() {
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
                        Culvert.deleteById({ id: id }, function() {
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
                        key: 'culvertnumber',
                        type: 'input',
                        templateOptions: {
                            label: '编号',
                            required: true,
                            placeholder: '请输入编号'
                        }
                    },
                    {
                        key: 'culvertname',
                        type: 'input',
                        templateOptions: {
                            label: '涵洞名',
                            required: true,
                            placeholder: '请输入涵洞名'
                        }
                    },
                    {
                        key: 'classification',
                        type: 'input',
                        templateOptions: {
                            label: '分类',
                            required: true,
                            placeholder: '请输入分类'
                        }
                    },
                    {
                        key: 'culverlength',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true,
                            placeholder: '请输入长度' 
                        }
                    },
                    {
                        key: 'culverwidth',
                        type: 'input',
                        templateOptions: {
                            label: '宽度',
                            required: true,
                            placeholder: '请输入宽度'
                        }
                    },
                    {
                        key: 'culverheight',
                        type: 'input',
                        templateOptions: {
                            label: '高度',
                            required: true,
                            placeholder: '请输入高度'
                        }
                    },
                    {
                        key: 'culverradius',
                        type: 'input',
                        templateOptions: {
                            label: '半径',
                            required: true,
                            placeholder: '请输入半径'
                        }
                    },
                    // {
                    //     key: 'centermileage',
                    //     type: 'input',
                    //     templateOptions: {
                    //         label: '中心里程',
                    //         required: true,
                    //         placeholder: '请输入中心里程'
                    //     }
                    // },
                    {
                        key: 'K',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程K',
                            required: true,
                            placeholder: '请输入中心里程的千米数'
                        }
                    },
                    {
                        key: 'M',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程M',
                            required: true,
                            placeholder: '请输入中心里程的百米数'
                        }
                    },
                    {
                        key: 'culverfunction',
                        type: 'input',
                        templateOptions: {
                            label: '功能',
                            required: true,
                            placeholder: '请输入功能'
                        }
                    },
                    {
                        key: 'istherewater',
                        type: 'input',
                        templateOptions: {
                            label: '是否积水',
                            required: true,
                            placeholder: '请选择是否',
                            options: [
                                { name: '是', value: '1' },
                                { name: '否', value: '0' },
                            ],
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
                    },
                    {
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