(function() {
    'use strict';
    angular
        .module('com.module.keypersion')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.keypersion', {
                    abstract: true,
                    url: '/keypersion',
                    templateUrl: 'modules/keypersion/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.keypersion.list', {
                    url: '',
                    templateUrl: 'modules/keypersion/views/list.html',
                    controllerAs: 'ctrl',
                    controller: function(keypersion) {
                        this.keypersion = keypersion;
                    },
                    resolve: {
                        keypersion: function(KeypersionService) {
                            return KeypersionService.find();
                        }
                    }
                })
                .state('app.keypersion.add', {
                    url: '/add',
                    templateUrl: 'modules/keypersion/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, KeypersionService, keypersion) {
                        this.keypersion = keypersion;
                        this.formFields = KeypersionService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            KeypersionService.upsert(this.keypersion).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        keypersion: function() {
                            return {};
                        }
                    }
                })
                .state('app.keypersion.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keypersion/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, KeypersionService, keypersion) {
                        this.keypersion = keypersion;
                        this.formFields = KeypersionService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            KeypersionService.upsert(this.keypersion).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        keypersion: function($stateParams, KeypersionService) {
                            return KeypersionService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keypersion.view', {
                    url: '/:id',
                    templateUrl: 'modules/keypersion/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(keypersion) {
                        this.keypersion = keypersion;
                    },
                    resolve: {
                        keypersion: function($stateParams, KeypersionService) {
                            return KeypersionService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keypersion.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, KeypersionService) {
                        KeypersionService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });
        });

})();