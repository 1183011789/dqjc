(function() {
    'use strict';
    angular
        .module('com.module.apropagandapoint')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.apropagandapoint', {
                    abstract: true,
                    url: '/apropagandapoint',
                    templateUrl: 'modules/apropagandapoint/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.apropagandapoint.list', {
                    url: '',
                    templateUrl: 'modules/apropagandapoint/views/list.html',
                    controller: 'PropagandaPointCtrl'
                })
                .state('app.apropagandapoint.add', {
                    url: '/add',
                    templateUrl: 'modules/apropagandapoint/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, PropagandaPointService, apropagandapoint) {
                        this.apropagandapoint = apropagandapoint;
                        this.formFields = PropagandaPointService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            PropagandaPointService.upsert(this.apropagandapoint).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        apropagandapoint: function() {
                            return {};
                        }
                    }
                })
                .state('app.apropagandapoint.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/apropagandapoint/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, PropagandaPointService, apropagandapoint) {
                        this.apropagandapoint = apropagandapoint;
                        this.formFields = PropagandaPointService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            PropagandaPointService.upsert(this.apropagandapoint).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        apropagandapoint: function($stateParams, PropagandaPointService) {
                            return PropagandaPointService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.apropagandapoint.view', {
                    url: '/:id',
                    templateUrl: 'modules/apropagandapoint/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(apropagandapoint) {
                        this.apropagandapoint = apropagandapoint;
                    },
                    resolve: {
                        apropagandapoint: function($stateParams, PropagandaPointService) {
                            return PropagandaPointService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.apropagandapoint.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, PropagandaPointService) {
                        PropagandaPointService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });
        });
})();