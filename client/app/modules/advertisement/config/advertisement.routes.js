(function() {
    'use strict';
    angular
        .module('com.module.advertisement')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.advertisement', {
                    abstract: true,
                    url: '/advertisement',
                    templateUrl: 'modules/advertisement/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.advertisement.list', {
                    url: '',
                    templateUrl: 'modules/advertisement/views/list.html',
                    controller: 'OrdersListCtrl',
                })

                .state('app.advertisement.map', {
                    url: '/map',
                    templateUrl: 'modules/advertisement/views/map.html',
                    controller: 'MapCtrl',
                })
                //线路分配
                .state('app.advertisement.line', {
                    url: '/line',
                    templateUrl: 'modules/advertisement/views/line.html',
                    controller: 'LineAllocationCtrl',
                })

                .state('app.advertisement.add', {
                    url: '/add',
                    templateUrl: 'modules/advertisement/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, AdvertisementService, advertisement) {
                        this.advertisement = advertisement;
                        this.formFields = AdvertisementService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            AdvertisementService.upsert(this.advertisement).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        advertisement: function() {
                            return {};
                        }
                    }
                })
                .state('app.advertisement.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/advertisement/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, AdvertisementService, advertisement) {
                        this.advertisement = advertisement;
                        this.formFields = AdvertisementService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            AdvertisementService.upsert(this.advertisement).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        advertisement: function($stateParams, AdvertisementService) {
                            return AdvertisementService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.advertisement.view', {
                    url: '/:id',
                    templateUrl: 'modules/advertisement/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(advertisement) {
                        this.advertisement = advertisement;
                    },
                    resolve: {
                        advertisement: function($stateParams, AdvertisementService) {
                            return AdvertisementService.findById($stateParams.id);
                        }
                    }
                })

                .state('app.advertisement.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, AdvertisementService) {
                        AdvertisementService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });
        });

})();