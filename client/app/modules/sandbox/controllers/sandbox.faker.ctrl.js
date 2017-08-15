(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .service('FakeService', function ($window) {
      this.faker = $window.faker;
      // this.faker.locale = "zh_CN";
    })
    .controller('SandboxFakerCtrl', function ($scope, $window, CoreService, FakeService, User) {
      $scope.faker = [];

      $scope.records = 10;

      console.log(FakeService);

      $scope.fakeUsers = function () {
        $scope.faker = [];
        for (var i = 0; i < $scope.records; i++) {
          var fake = {
            email: FakeService.faker.internet.email(),
            username: FakeService.faker.internet.userName(),
            name: FakeService.faker.name.findName(),
            password: FakeService.faker.internet.password()
          };
          $scope.faker.push(fake);
          User.create(fake);
        }
        CoreService.toastSuccess('Created ' + $scope.records + ' users');
      };

    });

})();
