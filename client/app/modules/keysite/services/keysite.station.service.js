(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('StationService', function($state, CoreService, Station, gettextCatalog) {

            this.find = function() {
                return Station.find().$promise;
            };

            this.findById = function(id) {
                return Station.findById({
                    id: id
                }).$promise;
            };
            
            this.upsert = function(station) {
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
                            required: true
                        }
                    },
                    {
                        key: 'StationRank',
                        type: 'input',
                        templateOptions: {
                            label: '车站等级',
                            required: true
                        }
                    },
                    {
                        key: 'StationNature',
                        type: 'input',
                        templateOptions: {
                            label: '车站性质',
                            required: true
                        }
                    },
                    {
                        key: 'Highspeed_rail_station',
                        type: 'input',
                        templateOptions: {
                            label: '是否高铁站',
                            required: true
                        }
                    },
                    {
                        key: 'CenterMileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程',
                            required: true
                        }
                    },
                    {
                        key: 'Railway_Administration',
                        type: 'input',
                        templateOptions: {
                            label: '隶属铁路局',
                            required: true
                        }
                    },
                    {
                        key: 'Address',
                        type: 'input',
                        templateOptions: {
                            label: '地址',
                            required: true
                        }
                    },
                    {
                        key: 'PoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所',
                            required: true
                        }
                    },
                    {
                        key: 'PersonInCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人',
                            required: true
                        }
                    },
                    {
                        key: 'ContactNumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话',
                            required: true
                        }
                    },
                    {
                        key: 'Longitudelatitude',
                        type: 'input',
                        templateOptions: {
                            label: '经度',
                            required: true
                        }
                    },
                    {
                        key: 'Latitude',
                        type: 'input',
                        templateOptions: {
                            label: '纬度',
                            required: true
                        }
                    },
                    {
                        key: 'AffiliatedInstitution',
                        type: 'input',
                        templateOptions: {
                            label: '所属机构',
                            required: true
                        }
                    },

                    {
                        key: 'length',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true
                        }
                    },
                    {
                        key: 'Remarks',
                        type: 'input',
                        templateOptions: {
                            label: '备注',
                            required: true
                        }
                    }
                ];
                return form;
            };

        });

})();