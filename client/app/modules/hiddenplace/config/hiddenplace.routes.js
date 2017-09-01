(function() {
    'use strict';
    angular
        .module('com.module.hiddenplace')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.hiddenplace', {
                    abstract: true,
                    url: '/hiddenplace',
                    templateUrl: 'modules/hiddenplace/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.hiddenplace.list', {
                    url: '',
                    templateUrl: 'modules/hiddenplace/views/list.html',
                    controller: 'HiddenPlaceCtrl'
                })

                .state('app.hiddenplace.map', {
                    url: '/map',
                    templateUrl: 'modules/monitoring/views/map.html',
                    controller: 'MapCtrl',
                })
                //线路分配
                .state('app.hiddenplace.line', {
                    url: '/line',
                    templateUrl: 'modules/hiddenplace/views/line.html',
                    controller: 'LineAllocationCtrl',
                })
                .state('app.hiddenplace.upload', {
                    url: '/upload',
                    templateUrl: 'modules/hiddenplace/views/upload.html',
                    // controllerAs: 'ctrl',
                    controller: 'PointImageUploadCtrl'
                })

                .state('app.hiddenplace.add', {
                    url: '/add',
                    templateUrl: 'modules/hiddenplace/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, HiddenPlaceService, hiddenplace) {
                        this.hiddenplace = hiddenplace;
                        this.formFields = HiddenPlaceService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            HiddenPlaceService.upsert(this.hiddenplace).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        hiddenplace: function() {
                            return {};
                        }
                    }
                })
                .state('app.hiddenplace.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/hiddenplace/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, HiddenPlaceService, hiddenplace) {
                        this.hiddenplace = hiddenplace;
                        this.formFields = HiddenPlaceService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            HiddenPlaceService.upsert(this.hiddenplace).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        hiddenplace: function($stateParams, HiddenPlaceService) {
                            return HiddenPlaceService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.hiddenplace.view', {
                    url: '/:id',
                    templateUrl: 'modules/hiddenplace/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(hiddenplace) {
                        this.hiddenplace = hiddenplace;
                    },
                    resolve: {
                        hiddenplace: function($stateParams, HiddenPlaceService) {
                            return HiddenPlaceService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.hiddenplace.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, HiddenPlaceService) {
                        HiddenPlaceService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });
        });
})();