(function () {
  'use strict';
  angular
    .module('com.module.keyPlaces')
    .config(function ($stateProvider) {
      $stateProvider.state('app.keyPlaces', {
        abstract: true,
        url: '/keyPlaces',
        templateUrl: 'modules/key-places/views/main.html',
        controller: 'KeyPlaceCtrl'
      })

      //全部
        .state('app.keyPlaces.list', {
          url: '/?category',
          templateUrl: 'modules/key-places/views/list.html',
          controller: 'KeyPlaceCtrl'
        })

        // add
        .state('app.keyPlaces.add', {
          url: '/add',
          templateUrl: 'modules/key-places/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, KeyPlaceService, keyPlace) {
            this.keyPlace = keyPlace;
            this.formFields = KeyPlaceService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              KeyPlaceService.upsert(this.keyPlace).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            keyPlace: function () {
              return {};
            }
          }
        })

        // edit
        .state('app.keyPlaces.edit', {
          url: '/edit',
          templateUrl: 'modules/key-places/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, KeyPlaceService, keyPlace) {
            this.keyPlace = keyPlace;
            this.formFields = KeyPlaceService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              KeyPlaceService.upsert(this.keyPlace).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            keyPlace: function ($stateParams, KeyPlaceService) {
              return KeyPlaceService.findById($stateParams.id);
            }
          }
        })

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
      ;
    });
})();
