(function() {
    'use strict';
    angular
        .module('com.module.theroadstation')
        .service('TheRoadStationService', function($state, CoreService, AffiliatedInstitution,ServiceMode, TheRoadStation, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.count = function() {
                // console.log("条数-----");
                return TheRoadStation.count().$promise;
            };
            //总数
            // this.find = function(filter) {
            //     return TheRoadStation.find(filter).$promise;
            // };
            this.find = function(filter) {
                var filter = filter || {};
                return TheRoadStation.find(filter).$promise;
            };


            this.findById = function(id) {
                return TheRoadStation.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(theroadstation) {
                // console.log("修改--------", JSON.stringify(theroadsyation));
                // if (!theroadsyation) {
                //     CoreService.alertWarning('提示', '内容');
                // }
                return TheRoadStation.upsert(theroadstation).$promise
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
                        TheRoadStation.deleteById({ id: id }, function() {
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
                            type: 'text',
                            label: '名字:',
                            required: true,
                            placeholder: '请输入名字'
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址：',
                            required: true,
                            placeholder: '请输入地址'
                        }
                    },
                    {
                        key: 'peoplenumber',
                        type: 'input',
                        templateOptions: {
                            label: '人数:',
                            required: true,
                            placeholder: '请输入人数'
                        }
                    },
                     {
                        key: 'serviceMode',
                        type: 'select',
                        templateOptions: {
                            label: '勤务模式',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "serviceMode"
                        },
                        controller: function($scope, ServiceMode) {
                            ServiceMode.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    }, 
                    {
                        key: 'rangeOfPatrol',
                        type: 'input',
                        templateOptions: {
                            label: '巡视范围:',
                            required: true,
                            placeholder: '巡视范围'
                        }
                    },
                    {
                        key: 'guardianTarget',
                        type: 'input',
                        templateOptions: {
                            label: '守护目标:',
                            required: true,
                            placeholder: '守护目标'
                        }
                    }, {
                        key: 'fireBrigade',
                        type: 'input',
                        templateOptions: {
                            label: '隶属巡防队伍:',
                            required: true,
                            placeholder: '隶属巡防队伍'
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
                            labelProp: "affiliatedInstitution"
                        },
                        controller: function($scope, AffiliatedInstitution) {
                            AffiliatedInstitution.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    }, {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: false,
                            placeholder: '经度'
                        }
                    }, {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: false,
                            placeholder: '纬度'
                        }
                    }, {
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注:',
                            required: false,
                            placeholder: '备注'
                        }
                    }
                ];
                return form;
            };

        });

})();