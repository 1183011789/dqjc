(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('CulvertService', function($state, CoreService, Culvert, gettextCatalog) {

            this.upsert = function(culvert) {
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

            this.getFormFields = function() {
                var form = [{
                        key: 'StationName',
                        type: 'input',
                        templateOptions: {
                            label: '名称',
                            required: true
                        }
                    },
                    {
                        key: 'StationRank',
                        type: 'input',
                        templateOptions: {
                            label: 'StationRank',
                            required: true
                        }
                    },
                    {
                        key: 'StationNature',
                        type: 'input',
                        templateOptions: {
                            label: 'StationNature',
                            required: true
                        }
                    },
                    {
                        key: 'Highspeed_rail_station',
                        type: 'input',
                        templateOptions: {
                            label: 'Highspeed_rail_station',
                            required: true
                        }
                    },
                    {
                        key: 'CenterMileage',
                        type: 'input',
                        templateOptions: {
                            label: 'CenterMileage',
                            required: true
                        }
                    },
                    {
                        key: 'Railway_Administration',
                        type: 'input',
                        templateOptions: {
                            label: 'Railway_Administration',
                            required: true
                        }
                    },
                    {
                        key: 'Address',
                        type: 'input',
                        templateOptions: {
                            label: 'Address',
                            required: true
                        }
                    },
                    {
                        key: 'PoliceStation',
                        type: 'input',
                        templateOptions: {
                            label: 'PoliceStation',
                            required: true
                        }
                    },
                    {
                        key: 'PersonInCharge',
                        type: 'input',
                        templateOptions: {
                            label: 'PersonInCharge',
                            required: true
                        }
                    },
                    {
                        key: 'ContactNumber',
                        type: 'input',
                        templateOptions: {
                            label: 'ContactNumber',
                            required: true
                        }
                    },
                    {
                        key: 'Longitudelatitude',
                        type: 'input',
                        templateOptions: {
                            label: 'Longitudelatitude',
                            required: true
                        }
                    },
                    {
                        key: 'Latitude',
                        type: 'input',
                        templateOptions: {
                            label: 'Latitude',
                            required: true
                        }
                    },
                    {
                        key: 'Remarks',
                        type: 'input',
                        templateOptions: {
                            label: 'Remarks',
                            required: true
                        }
                    }
                ];
                return form;
            };

        });

})();