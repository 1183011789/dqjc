(function() {
    'use strict';
    angular
        .module('com.module.institutionaiteam')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.institutionaiteam', {
                    abstract: true,
                    url: '/institutionaiteam',
                    templateUrl: 'modules/institutionaiteam/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.institutionaiteam.list', {
                    url: '',
                    templateUrl: 'modules/institutionaiteam/views/list.html',
                    controller: 'InstitutionalTeamCtrl'
                })
                .state('app.institutionaiteam.map', {
                    url: '/map',
                    templateUrl: 'modules/institutionaiteam/views/map.html',
                    controller: 'MapCtrl',
                })
                
                .state('app.institutionaiteam.add', {
                    url: '/add',
                    templateUrl: 'modules/institutionaiteam/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, InstitutionalTeamService, institutionaiteam) {
                        this.institutionaiteam = institutionaiteam;
                        this.formFields = InstitutionalTeamService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            InstitutionalTeamService.upsert(this.institutionaiteam).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        institutionaiteam: function() {
                            return {};
                        }
                    }
                })
                .state('app.institutionaiteam.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/institutionaiteam/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, InstitutionalTeamService, institutionaiteam) {
                        this.institutionaiteam = institutionaiteam;
                        this.formFields = InstitutionalTeamService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            InstitutionalTeamService.upsert(this.institutionaiteam).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        institutionaiteam: function($stateParams, InstitutionalTeamService) {
                            return InstitutionalTeamService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.institutionaiteam.view', {
                    url: '/:id',
                    templateUrl: 'modules/institutionaiteam/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(institutionaiteam) {
                        this.institutionaiteam = institutionaiteam;
                    },
                    resolve: {
                        institutionaiteam: function($stateParams, InstitutionalTeamService) {
                            return InstitutionalTeamService.findById($stateParams.id);
                        }
                    }
                });
            // .state('app.institutionaiteam.delete', {
            //     url: '/:id/delete',
            //     template: '',
            //     controllerAs: 'ctrl',
            //     controller: function($stateParams, $state, InstitutionaIteamService) {
            //         InstitutionaIteamService.delete($stateParams.id, function() {
            //             $state.go('^.list');
            //         }, function() {
            //             $state.go('^.list');
            //         });
            //     }
            // });
        });

})();