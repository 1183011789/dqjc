(function() {
    'use strict';
    angular
        .module('com.module.hiddenplace')
        .service('HiddenPlaceService', function($state, CoreService,State,Category, Hazardlevel,HiddenDangerPlace, APropagandaPoint, gettextCatalog) {

            this.count = function() {
                console.log("条数-----");
                return HiddenDangerPlace.count().$promise;
            };
            this.find = function(result) {
                return HiddenDangerPlace.find().$promise;
            };

            this.findById = function(id) {
                return HiddenDangerPlace.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(hiddenplace) {
                console.log("添加-------");
                return HiddenDangerPlace.upsert(hiddenplace).$promise
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
                        HiddenDangerPlace.deleteById({ id: id }, function() {
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
                        HiddenDangerPlace.deleteMultiple({ multiple: ids }, function() {
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
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址:',
                            required: true,
                            placeholder: "请输入地址"
                        }
                    },
                    {
                        key: 'detail',
                        type: 'input',
                        templateOptions: {
                            label: '详情:',
                            required: true,
                            placeholder: "请输入详情"
                        }
                    },
                    {
                        key: 'state',
                        type: 'select',
                        templateOptions: {
                            label: '状态',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "state",
                        },
                        controller: function($scope, State) {
                            State.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    },
                    {
                        key: 'category',
                        type: 'select',
                        templateOptions: {
                            label: '类别',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "category",
                        },
                        controller: function($scope, Category) {
                            Category.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    }, {
                        key: 'LocalPoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所:',
                            required: true,
                            placeholder: "请输入所属地方派出所"
                        }
                    },{
                        key: 'personCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true,
                            placeholder: "请输入负责人"
                        }
                    },{
                        key: 'personPost',
                        type: 'input',
                        templateOptions: {
                            label: '负责人职务:',
                            required: true,
                            placeholder: "请输入负责人职务"
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
                       
                    },
                    {
                        key: 'hazardlevel',
                        type: 'select',
                        templateOptions: {
                            label: '危险级别',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "hazardlevel",
                        },
                        controller: function($scope, Hazardlevel) {
                            Hazardlevel.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    },
                    {
                        key: 'affiliatedinstitution',
                        type: 'select',
                        templateOptions: {
                            label: '所属机构',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "affiliatedInstitution",
                        },
                        controller: function($scope, AffiliatedInstitution) {
                            AffiliatedInstitution.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    },
                    {
                        key: 'securityProtocol',
                        type: 'select',
                        templateOptions: {
                            label: '是否签订安全协议:',
                            required: true,
                            placeholder: "请输入是否",
                            options: [
                                { name: '是', value: '1' },
                                { name: '否', value: '0' },
                            ],
                        }
                    },
                    {
                        key: 'dangerousRailwayNum',
                        type: 'input',
                        templateOptions: {
                            label: '有危害铁路史人数:',
                            required: true,
                            placeholder: "请输入有危害铁路史人数"
                        }
                    },
                    {
                        key: 'stuDangerousRail',
                        type: 'input',
                        templateOptions: {
                            label: '在校学生危害铁路史或发生事故史:',
                            required: true,
                            placeholder: "请输入在校学生危害铁路史或发生事故史"
                        }
                    },
                    {
                        key: 'region',
                        type: 'input',
                        templateOptions: {
                            label: '区域:',
                            required: true,
                            placeholder: "请输入区域"
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
                            placeholder: "请输入纬度"
                        }
                    },
                    {
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明:',
                            required: false,
                            placeholder: "请输入负责人职务"
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