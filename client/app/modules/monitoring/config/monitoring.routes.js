(function() {
    'use strict';
    angular
        .module('com.module.monitoring')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.monitoring', {
                    abstract: true,
                    url: '/monitoring',
                    templateUrl: 'modules/monitoring/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.monitoring.list', {
                    url: '',
                    templateUrl: 'modules/monitoring/views/list.html',
                    controllerAs: 'ctrl',
                    controller: function(monitoring) {
                        this.monitoring = monitoring;
                    },
                    resolve: {
                        monitoring: function(MonitoringService) {
                            return MonitoringService.find();
                        }
                    }
                })
                .state('app.monitoring.add', {
                    url: '/add',
                    templateUrl: 'modules/monitoring/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, MonitoringService, monitoring) {
                        this.monitoring = monitoring;
                        this.formFields = MonitoringService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            MonitoringService.upsert(this.monitoring).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        monitoring: function() {
                            return {};
                        }
                    }
                })
                .state('app.monitoring.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/monitoring/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, MonitoringService, monitoring) {
                        this.monitoring = monitoring;
                        this.formFields = MonitoringService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            MonitoringService.upsert(this.monitoring).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        monitoring: function($stateParams, MonitoringService) {
                            return MonitoringService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.monitoring.view', {
                    url: '/:id',
                    templateUrl: 'modules/monitoring/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(monitoring) {
                        this.monitoring = monitoring;
                    },
                    resolve: {
                        monitoring: function($stateParams, MonitoringService) {
                            return MonitoringService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.monitoring.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, MonitoringService) {
                        MonitoringService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });
        });

})();