(function() {
    'use strict';
    angular
        .module('com.module.theroadstation')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.theroadstation', {
                    abstract: true,
                    url: '/theroadstation',
                    templateUrl: 'modules/theroadstation/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.theroadstation.list', {
                    url: '',
                    templateUrl: 'modules/theroadstation/views/list.html',
                    controller: 'TheRoadStationListCtrl',
                })
                 //线路分配
                .state('app.theroadstation.line', {
                    url: '/line',
                    templateUrl: 'modules/theroadstation/views/line.html',
                    controller: 'LineAllocationCtrl',
                })
                .state('app.theroadstation.map', {
                    url: '/map',
                    templateUrl: 'modules/theroadstation/views/map.html',
                    controller: 'MapCtrl',
                })
                .state('app.theroadstation.add', {
                    url: '/add',
                    templateUrl: 'modules/theroadstation/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, TheRoadStationService, theroadstation) {
                        this.theroadstation = theroadstation;
                        this.formFields = TheRoadStationService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            TheRoadStationService.upsert(this.theroadstation).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        theroadstation: function() {
                            return {};
                        }
                    }
                })
                .state('app.theroadstation.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/theroadstation/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, TheRoadStationService, theroadstation) {
                        this.theroadstation = theroadstation;
                        this.formFields = TheRoadStationService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            TheRoadStationService.upsert(this.theroadstation).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        theroadstation: function($stateParams, TheRoadStationService) {
                            return TheRoadStationService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.theroadstation.view', {
                    url: '/:id',
                    templateUrl: 'modules/theroadstation/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(theroadstation) {
                        this.theroadstation = theroadstation;
                    },
                    resolve: {
                        theroadstation: function($stateParams, TheRoadStationService) {
                            return TheRoadStationService.findById($stateParams.id);
                        }
                    }
                })

            .state('app.theroadstation.delete', {
                url: '/:id/delete',
                template: '',
                controllerAs: 'ctrl',
                controller: function($stateParams, $state, TheRoadStationService) {
                    TheRoadStationService.delete($stateParams.id, function() {
                        $state.go('^.list');
                    }, function() {
                        $state.go('^.list');
                    });
                }
            });
        });

})();