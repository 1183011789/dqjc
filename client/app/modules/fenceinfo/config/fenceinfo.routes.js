(function() {
    'use strict';
    angular
        .module('com.module.fenceinfo')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.fenceinfo', {
                    abstract: true,
                    url: '/fenceinfo',
                    templateUrl: 'modules/fenceinfo/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.fenceinfo.list', {
                    url: '',
                    templateUrl: 'modules/fenceinfo/views/list.html',
                    controller: 'FenceInfoCtrl'
                })
                .state('app.fenceinfo.map', {
                    url: '/map',
                    templateUrl: 'modules/fenceinfo/views/map.html',
                    controller: 'MapCtrl',
                })
                //线路分配
                .state('app.fenceinfo.line', {
                    url: '/line',
                    templateUrl: 'modules/fenceinfo/views/line.html',
                    controller: 'LineAllocationCtrl',
                })
                .state('app.fenceinfo.add', {
                    url: '/add',
                    templateUrl: 'modules/fenceinfo/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, FenceInfoService, fenceInfo) {
                        this.fenceInfo = fenceInfo;
                        this.formFields = FenceInfoService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            FenceInfoService.upsert(this.fenceInfo).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        fenceInfo: function() {
                            return {};
                        }
                    }
                })
                .state('app.fenceinfo.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/fenceinfo/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, FenceInfoService, fenceinfo) {
                        this.fenceinfo = fenceinfo;
                        this.formFields = FenceInfoService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            FenceInfoService.upsert(this.fenceinfo).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        fenceinfo: function($stateParams, FenceInfoService) {
                            return FenceInfoService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.fenceinfo.view', {
                    url: '/:id',
                    templateUrl: 'modules/fenceinfo/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(fenceinfo) {
                        this.fenceinfo = fenceinfo;
                    },
                    resolve: {
                        fenceinfo: function($stateParams, FenceInfoService) {
                            return FenceInfoService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.fenceinfo.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, FenceInfoService) {
                        FenceInfoService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });
        });

})();