(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('BridgeService', function($state, CoreService, AffiliatedInstitution,Guardian,Bridge,Alignment, BridgeClass,gettextCatalog) {

            this.find = function() {
                return Bridge.find().$promise;
            };

            this.findById = function(id) {
                return Bridge.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(bridge) {
                var k=parseInt(bridge.K);
                var m=parseInt(bridge.M);
                var num=k*1000+m;
                bridge.startendmileage=num;

                var a=parseInt(bridge.K);
                var b=parseInt(bridge.M);
                var num=a*1000+b;
                bridge.centermileage=num;
                return Bridge.upsert(bridge).$promise
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
                        Bridge.deleteMultiple({ multiple: ids }, function() {
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
                        Bridge.deleteById({ id: id }, function() {
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
                        key: 'brdgenumber',
                        type: 'input',
                        templateOptions: {
                            label: '桥梁编号',
                            required: true,
                            placeholder: '请输入编号'
                        }
                    },
                    {
                        key: 'bridgename',
                        type: 'input',
                        templateOptions: {
                            label: '桥梁名称',
                            required: true,
                            placeholder: '请输入名称'
                        }
                    },
                     {
                        key: 'bridgeClass',
                        type: 'select',
                        templateOptions: {
                        label: '桥梁类别',
                        required: true,
                        options: [],
                        valueProp: "id",
                        labelProp: "bridgeClass"
                        },
                        controller: function($scope, BridgeClass) {
                            BridgeClass.find().$promise.then(function(value) {
                            console.log("桥梁类别--", JSON.stringify(value));
                            $scope.to.options = value;
                            return value;
                            });
                        }
                      }, 
                    {
                        key: 'bridgestructure',
                        type: 'input',
                        templateOptions: {
                            label: '桥梁结构',
                            required: true,
                            placeholder: '请输入桥梁结构'
                        }
                    },
                    {
                        key: 'bridgematerial',
                        type: 'input',
                        templateOptions: {
                            label: '桥梁材质',
                            required: true,
                            placeholder: '请输入桥梁材质'
                        }
                    },
                    {
                        key: 'brgdgelength',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true,
                            placeholder: '请输入长度'
                        }
                    },
                    {
                        key: 'bridgehight',
                        type: 'input',
                        templateOptions: {
                            label: '高度',
                            required: true,
                            placeholder: '请输入高度'
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
                    // {
                    //     key: 'startendmileage',
                    //     type: 'input',
                    //     templateOptions: {
                    //         label: '起始里程',
                    //         required: true,
                    //         placeholder: '请输入起始里程'
                    //     }
                    // }, 
                    {
                        key: 'K',
                        type: 'input',
                        templateOptions: {
                            label: '起始里程K',
                            required: true,
                            placeholder: '请输入起始里程的千米数K'
                        }
                    }, 
                    {
                        key: 'M',
                        type: 'input',
                        templateOptions: {
                            label: '起始里程M',
                            required: true,
                            placeholder: '请输入起始里程的百米数'
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
                        key: 'railwayhighwaypublic',
                        type: 'select',
                        templateOptions: {
                            label: '是否公路铁路一起用',
                            required: true,
                            placeholder: '请选择是否',
                            options: [
                                { name: '是', value: '1' },
                                { name: '否', value: '0' },
                            ],

                        }
                    }

                    , {
                        key: 'crosshighway',
                        type: 'input',
                        templateOptions: {
                            label: '跨越公路',
                            required: false,
                            placeholder: '请输入跨越公路'
                        }
                    }

                    , {
                        key: 'crosswatersystem',
                        type: 'input',
                        templateOptions: {
                            label: '跨越水系',
                            required: false,
                            placeholder: '请输入跨越水系'
                        }
                    }

                    , {
                        key: 'crossbrooks',
                        type: 'input',
                        templateOptions: {
                            label: '跨越山涧',
                            required: false,
                            placeholder: '请输入跨越山涧'
                        }
                    }

                    , {
                        key: 'crossother',
                        type: 'input',
                        templateOptions: {
                            label: '跨越其他',
                            required: false,
                            placeholder: '请输入跨越其他'
                        }
                    }, {
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
                      },  {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址',
                            required: true,
                            placeholder: '请输入地址'
                        }
                    }

                    , {
                        key: 'localpolicestation',
                        type: 'input',
                        templateOptions: {
                            label: '所属当地派出所',
                            required: true,
                            placeholder: '请输入所属地方派出所'
                        }
                    }

                    , {
                        key: 'admimdepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门',
                            required: true,
                            placeholder: '请输入管理部门'
                        }
                    }

                    , {
                        key: 'personincharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人',
                            required: true,
                            placeholder: '请输入负责人'
                        }
                    }, {
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
                      }, {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度',
                            required: false,
                            placeholder: '请输入经度'
                        }
                    }, {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度',
                            required: false,
                            placeholder: '请输入纬度'
                        }
                    }, {
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明',
                            required: false,
                            placeholder: '请输入说明'
                        }
                    }, {
                        key: 'brdgeremark',
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