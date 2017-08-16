(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:RouteCtrl
   * @description Redirect for acess
   * @requires $q
   * @requires $scope
   * @requires $state
   * @requires $location
   * @requires AppAuth
   **/
  angular
    .module('com.module.core')
    .controller('RouteCtrl', function (ApiService, AppAuth, $location,User) {

      ApiService.checkConnection()
        .then(function () {
          console.log('ApiService.checkConnection success');

          if (!AppAuth.currentUser) {
            AppAuth.currentUser = User.getCurrent(function() {
              $location.path('/app');
            }, function() {
              $location.path('/login');
            });
          } else {
            $location.path('/app');
          }
        })
        .catch(function (err) {
          console.log('ApiService.checkConnection err: ' + err);
          $location.path('/error');
        });

    });

})();
