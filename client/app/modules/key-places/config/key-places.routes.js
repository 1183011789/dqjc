(function() {
    'use strict';
    angular
        .module('com.module.keyPlaces')
        .config(function($stateProvider) {
            $stateProvider.state('app.keyPlaces', {
                abstract: true,
                url: '/keyPlaces',
                templateUrl: 'modules/key-places/views/main.html',
                controllerAs: 'kpCtrl',
                controller: function($scope, KeyPlaceCategory) {
                    $scope.items = [{
                        category: '全部',
                        id: -1,
                        checked: true
                    }];
                    this.selectedItemId = -1;
                    KeyPlaceCategory.find().$promise.then(function(value) {
                        $scope.items = $scope.items.concat(value);
                    });

                    this.chooseItem = function(item) {
                        this.selectedItemId = item.id;
                        console.log("item-", JSON.stringify(item));
                        $scope.$broadcast('KeyPlace.Changed', item);
                    };
                }
            })

            //全部
            .state('app.keyPlaces.list', {
                    url: '/?category',
                    templateUrl: 'modules/key-places/views/list.html',
                    controller: 'KeyPlaceCtrl'
                })
                .state('app.keyPlaces.map', {
                    url: '/map',
                    templateUrl: 'modules/key-places/views/map.html',
                    controller: 'MapCtrl',
                })
                .state('app.keyPlaces.upload', {
                    url: '/upload',
                    templateUrl: 'modules/key-places/views/upload.html',
                    // controllerAs: 'ctrl',
                    controller: 'ImageUploadCtrl'
                })
                // add
                .state('app.keyPlaces.add', {
                    url: '/add',
                    templateUrl: 'modules/key-places/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, KeyPlaceService, keyPlace) {
                        this.keyPlace = keyPlace;
                        this.formFields = KeyPlaceService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            KeyPlaceService.upsert(this.keyPlace).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        keyPlace: function() {
                            return {};
                        }
                    }
                })

            .state('app.keyPlaces.view', {
                    url: '/:id',
                    templateUrl: 'modules/key-places/views/view.html',
                    controllerAs: 'ctrl',
                    controller: function(keyPlace) {
                        this.keyPlace = keyPlace;
                    },
                    resolve: {
                        keyPlace: function($stateParams, KeyPlaceService) {
                            console.log("$stateParams--", JSON.stringify($stateParams));
                            return KeyPlaceService.findById($stateParams.id);
                        }
                    }
                })
                // edit
                .state('app.keyPlaces.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/key-places/views/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, KeyPlaceService, keyPlace) {
                        this.keyPlace = keyPlace;
                        this.formFields = KeyPlaceService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            KeyPlaceService.upsert(this.keyPlace).then(function() {
                                $state.go('^.list');
                            });
                        };
                    },
                    resolve: {
                        keyPlace: function($stateParams, KeyPlaceService) {

                                return KeyPlaceService.findById($stateParams.id);
                            }
                            // keyPlace: function() {
                            //     return {};
                            // }
                    }
                });

            //////////
            // //社区
            // .state('app.keyPlaces.Community', {
            //     abstract: true,
            //     url: '/communities',
            //     templateUrl: 'modules/key-places/views/communities/main.html'
            // })

            // //社区
            // .state('app.keyPlaces.Community.index', {
            //     url: '',
            //     templateUrl: 'modules/key-places/views/communities/list.html',
            //     controller: 'CommunityCtrl',
            // })

            // //社区
            // .state('app.keyPlaces.Community.list', {
            //     url: '',
            //     templateUrl: 'modules/key-places/views/communities/list.html',
            //     controller: 'CommunityCtrl',
            // })


            // /////////
            // //单位 Company
            // .state('app.keyPlaces.Company', {
            //     abstract: true,
            //     url: '/companies',
            //     templateUrl: 'modules/key-places/views/companies/main.html'
            // })

            // //单位 Company
            // .state('app.keyPlaces.Company.index', {
            //     url: '',
            //     templateUrl: 'modules/key-places/views/companies/list.html',
            //     controller: 'CompanyCtrl',
            // })

            // //单位 Company
            // .state('app.keyPlaces.Company.list', {
            //     url: '',
            //     templateUrl: 'modules/key-places/views/companies/list.html',
            //     controller: 'CompanyCtrl',
            // })


            // //////////
            // //危险场所 DangerousPlace
            // .state('app.keyPlaces.Danger', {
            //     abstract: true,
            //     url: '/dangers',
            //     templateUrl: 'modules/key-places/views/dangers/main.html'
            // })

            // //涵洞
            // .state('app.keyPlaces.Danger.index', {
            //     url: '',
            //     templateUrl: 'modules/key-places/views/dangers/list.html',
            //     controller: 'DangerCtrl',
            // })

            // //涵洞
            // .state('app.keyPlaces.Danger.list', {
            //     url: '',
            //     templateUrl: 'modules/key-places/views/dangers/list.html',
            //     controller: 'DangerCtrl',
            // })

        });
})();