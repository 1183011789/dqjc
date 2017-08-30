(function() {
    'use strict';
    angular
        .module('com.module.keyPlaces')
        .service('KeyPlaceService', function($state, CoreService,AffiliatedInstitution, KeyPlaceCategory,Hazardlevel, KeyPlace, gettextCatalog) {

            this.findById = function(id) {
                console.log(id);
                console.log("对象-----", JSON.stringify(KeyPlace.findById(id).$promise));
                // return KeyPlace.findById(id).$promise;
                return KeyPlace.findById({
                    id: id
                }).$promise;
            };
            this.upsert = function(keyPlace) {
                console.log("-----------------");
                return KeyPlace.upsert(keyPlace).$promise
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
                        KeyPlace.deleteMultiple({ multiple: ids }, function() {
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
                            label: '名称',
                            required: true,
                            placeholder: "请输入名称"
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址',
                            required: true,
                            placeholder: "请输入地址"
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
                            labelProp: "category"
                        },
                        controller: function($scope, KeyPlaceCategory) {
                            KeyPlaceCategory.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    },
                    {
                        key: 'contactnumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话',
                            required: true
                        },
                        validators: {
                            phone: {
                                expression: function(viewValue, modelValue) {
                                    var value = modelValue || viewValue;
                                    return /^([0-9]|[-])+$/g.test(value);
                                },
                                message: '$viewValue + " is not a valid IP Address"'
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
                            labelProp: "hazardlevel"
                        },
                        controller: function($scope, Hazardlevel) {
                            Hazardlevel.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                     }
                    ,
                    {
                        key: 'peoplenumber',
                        type: 'input',
                        templateOptions: {
                            label: '人数',
                            required: true,
                            type: 'number',
                            placeholder: "请输入人数"
                        }
                    },
                    {
                        key: 'personincharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人',
                            required: true,
                            placeholder: "请输入负责人"
                        }
                    }, {
                        key: 'personPost',
                        type: 'input',
                        templateOptions: {
                            label: '负责人职务',
                            required: true,
                            placeholder: "请输入负责人职务"
                        }
                    }

                    , {
                        key: 'dangerousRailwayNum',
                        type: 'input',
                        templateOptions: {
                            label: '有危害铁路史人数',
                            required: true,
                            type: 'number',
                            placeholder: "请输入有危害铁路史人数"
                        }
                    }

                    , {
                        key: 'stuDangerousRail',
                        type: 'input',
                        templateOptions: {
                            label: '在校学生危害铁路或发生事故史',
                            required: true,
                            placeholder: "请输入在校学生危害铁路或发生事故史"
                        }
                    }

                    , {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度',
                            required: false,
                            type: 'number',
                            placeholder: "请输入经度"
                        }
                    }

                    , {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度',
                            required: false,
                            type: 'number',
                            placeholder: "请输入纬度"
                        }
                    }

                    , {
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明',
                            required: true,
                            placeholder: "请输入说明"
                        }
                    }

                    , {
                        key: 'localpolicestation',
                        type: 'input',
                        templateOptions: {
                            label: '当地派出所',
                            required: true,
                            placeholder: "请输入当地派出所"
                        }
                    }

                    , {
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
                                $scope.to.options = value;
                                return value;
                            });
                        }
                     },
                   // {
                    //     key: 'region',
                    //     type: 'input',
                    //     templateOptions: {
                    //         label: '区域',
                    //         required: true,
                    //         placeholder: "请输入区域"

                    //     }
                    // }

                    // ,
                     {
                        key: 'securityProtocol',
                        type: 'checkbox',
                        templateOptions: {
                            label: '是否签订安全协议',
                            required: true
                        }
                    }

                    , {
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注',
                            required: false,
                            placeholder: "请输入备注"
                        }
                    }
                ];
                return form;
            };

        });

})();