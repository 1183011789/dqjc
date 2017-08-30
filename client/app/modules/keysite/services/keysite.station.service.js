(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('StationService', function($state, CoreService,AffiliatedInstitution,StationNature,Administration, Station,StationRank, gettextCatalog) {

            this.find = function() {
                return Station.find().$promise;
            };

            this.findById = function(id) {
                return Station.findById({
                    id: id
                }).$promise;
            };
            
            this.upsert = function(station) {
                var k=parseInt(station.K);
                var m=parseInt(station.M);
                var num=k*1000+m;
                station.CenterMileage=num;
                return Station.upsert(station).$promise
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
                        Station.deleteMultiple({ multiple: ids }, function() {
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
                        key: 'StationName',
                        type: 'input',
                        templateOptions: {
                            label: '车站名称',
                            required: true,
                            placeholder: '请输入车站名称'
                        }
                    },
                    {
                        key: 'Rank',
                        type: 'select',
                        templateOptions: {
                        label: '车站等级',
                        required: true,
                        options: [],
                        valueProp: "id",
                        labelProp: "Rank"
                        },
                        controller: function($scope, StationRank) {
                            StationRank.find().$promise.then(function(value) {
                            console.log("车站等级--", JSON.stringify(value));
                            $scope.to.options = value;
                            return value;
                            });
                        }
                      }, 
                    {
                        key: 'naturen',
                        type: 'select',
                        templateOptions: {
                        label: '车站性质',
                        required: true,
                        options: [],
                        valueProp: "id",
                        labelProp: "naturen"
                        },
                        controller: function($scope, StationNature) {
                            StationNature.find().$promise.then(function(value) {
                            console.log("车站性质--", JSON.stringify(value));
                            $scope.to.options = value;
                            return value;
                            });
                        }
                      }, 
                    {
                        key: 'Highspeed_rail_station',
                        type: 'select',
                        templateOptions: {
                            label: '是否有高铁站',
                            required: true,
                            placeholder: '请选择是否',
                            options: [
                                { name: '是', value: '1' },
                                { name: '否', value: '0' },
                            ],

                        }
                    },
                    // {
                    //     key: 'CenterMileage',
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
                        key: 'administration',
                        type: 'select',
                        templateOptions: {
                        label: '隶属铁路局',
                        required: true,
                        options: [],
                        valueProp: "id",
                        labelProp: "administration"
                        },
                        controller: function($scope, Administration) {
                            Administration.find().$promise.then(function(value) {
                            console.log("隶属铁路局--", JSON.stringify(value));
                            $scope.to.options = value;
                            return value;
                            });
                        }
                      }, 
                    {
                        key: 'Address',
                        type: 'input',
                        templateOptions: {
                            label: '地址',
                            required: true,
                            placeholder: '请输入地址'
                        }
                    },
                    {
                        key: 'PoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所',
                            required: true,
                            placeholder: '请输入所属地方派出所'
                        }
                    },
                    {
                        key: 'PersonInCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人',
                            required: true,
                            placeholder: '请输入负责人'
                        }
                    },
                    {
                        key: 'ContactNumber',
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
                        key: 'Longitudelatitude',
                        type: 'input',
                        templateOptions: {
                            label: '经度',
                            required: false,
                            placeholder: '请输入经度'
                        }
                    },
                    {
                        key: 'Latitude',
                        type: 'input',
                        templateOptions: {
                            label: '纬度',
                            required: false,
                            placeholder: '请输入纬度'
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
                        key: 'length',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true,
                            placeholder: '请输入长度'
                        }
                    },
                    {
                        key: 'Remarks',
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