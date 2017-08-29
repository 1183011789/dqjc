(function() {
    'use strict';
    angular
        .module('com.module.emergencyaccess')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.emergencyaccess', {
                    abstract: true,
                    url: '/emergencyaccess',
                    templateUrl: 'modules/emergencyaccess/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                // .state('app.emergencyaccess.list', {
                //     url: '',
                //     templateUrl: 'modules/emergencyaccess/views/list.html',
                //     controllerAs: 'ctrl',
                //     controller: function(emergencyaccess) {
                //         this.emergencyaccess = emergencyaccess;
                //     },
                //     resolve: {
                //         emergencyaccess: function(EmergencyAccessService) {
                //             return EmergencyAccessService.find();
                //         }
                //     }
                // })
                .state('app.emergencyaccess.list', {
                    url: '',
                    templateUrl: 'modules/emergencyaccess/views/list.html',
                    controller: 'EmergencyaccessListCtrl',
                })
                .state('app.emergencyaccess.map', {
                    url: '/map',
                    templateUrl: 'modules/emergencyaccess/views/map.html',
                    controller: 'MapCtrl',
                })
                 //线路分配
                .state('app.emergencyaccess.line', {
                    url: '/line',
                    templateUrl: 'modules/emergencyaccess/views/line.html',
                    controller: 'LineAllocationCtrl',
                })
            .state('app.emergencyaccess.add', {
                    url: '/add',
                    templateUrl: 'modules/emergencyaccess/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, EmergencyAccessService, emergencyaccess) {
                        this.emergencyaccess = emergencyaccess;
                        this.formFields = EmergencyAccessService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            EmergencyAccessService.upsert(this.emergencyaccess).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        emergencyaccess: function() {
                            return {};
                        }
                    }
                })
                .state('app.emergencyaccess.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/emergencyaccess/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, EmergencyAccessService, emergencyaccess) {
                        this.emergencyaccess = emergencyaccess;
                        this.formFields = EmergencyAccessService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            EmergencyAccessService.upsert(this.emergencyaccess).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        emergencyaccess: function($stateParams, EmergencyAccessService) {
                            return EmergencyAccessService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.emergencyaccess.view', {
                    url: '/:id',
                    templateUrl: 'modules/emergencyaccess/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(emergencyaccess) {
                        this.emergencyaccess = emergencyaccess;
                    },
                    resolve: {
                        emergencyaccess: function($stateParams, EmergencyAccessService) {
                            return EmergencyAccessService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.emergencyaccess.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, EmergencyAccessService) {
                        EmergencyAccessService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });
        });

})();