(function() {
    'use strict';
    angular
        .module('com.module.road')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.road', {
                    abstract: true,
                    url: '/road',
                    templateUrl: 'modules/road/views/main.html',
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'login'
                        }
                    }
                })
                .state('app.road.list', {
                    url: '',
                    templateUrl: 'modules/road/views/list.html',
                    controller: 'RoadCtrl',
                })
                .state('app.road.map', {
                    url: '/map',
                    templateUrl: 'modules/road/views/map.html',
                    controller: 'MapCtrl',
                })
                //线路分配
                .state('app.road.line', {
                    url: '/line',
                    templateUrl: 'modules/road/views/line.html',
                    controller: 'LineAllocationCtrl',
                })
                .state('app.road.add', {
                    url: '/add',
                    templateUrl: 'modules/road/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, RoadService, road) {
                        this.road = road;
                        this.formFields = RoadService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            RoadService.upsert(this.road).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        road: function() {
                            return {};
                        }
                    }
                })
                .state('app.road.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/road/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, RoadService, road) {
                        this.road = road;
                        this.formFields = RoadService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            RoadService.upsert(this.road).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        road: function($stateParams, RoadService) {
                            return RoadService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.road.view', {
                    url: '/:id',
                    templateUrl: 'modules/road/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(road) {
                        this.road = road;
                    },
                    resolve: {
                        road: function($stateParams, RoadService) {
                            return RoadService.findById($stateParams.id);
                        }
                    }
                })

                .state('app.road.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: function($stateParams, $state, RoadService) {
                        RoadService.delete($stateParams.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }
                });


                
        });





})();