(function() {
    'use strict';
    angular
        .module('com.module.securityequipment')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.securityequipment', {
                    abstract: true,
                    url: '/securityequipment',
                    templateUrl: 'modules/securityequipment/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.securityequipment.list', {
                    url: '',
                    templateUrl: 'modules/securityequipment/views/list.html',
                    controllerAs: 'ctrl',
                    controller: function(securityequipment) {
                        this.securityequipment = securityequipment;
                    },
                    resolve: {
                        securityequipment: function(SecurityEquipmentService) {
                            return SecurityEquipmentService.find();
                        }
                    }
                })
                .state('app.securityequipment.add', {
                    url: '/add',
                    templateUrl: 'modules/securityequipment/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, SecurityEquipmentService, securityequipment) {
                        this.securityequipment = securityequipment;
                        this.formFields = SecurityEquipmentService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            SecurityEquipmentService.upsert(this.securityequipment).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        securityequipment: function() {
                            return {};
                        }
                    }
                })
                .state('app.securityequipment.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/securityequipment/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, SecurityEquipmentService, securityequipment) {
                        this.securityequipment = securityequipment;
                        this.formFields = SecurityEquipmentService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            SecurityEquipmentService.upsert(this.securityequipment).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        securityequipment: function($stateParams, SecurityEquipmentService) {
                            return SecurityEquipmentService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.securityequipment.view', {
                    url: '/:id',
                    templateUrl: 'modules/securityequipment/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(securityequipment) {
                        this.securityequipment = securityequipment;
                    },
                    resolve: {
                        securityequipment: function($stateParams, SecurityEquipmentService) {
                            return SecurityEquipmentService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.securityequipment.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, SecurityEquipmentService) {
                        SecurityEquipmentService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });
        });

})();