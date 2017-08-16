(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.users.controller:RegisterCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $routeParams
   * @requires $location
   * Controller for Register Page
   **/
  angular
    .module('com.module.users')
    .controller('RegisterCtrl', function ($rootScope, $scope, $routeParams, $location, $filter, CoreService, User, AppAuth, gettextCatalog,UserService) {

      if ($rootScope.settings.registrationEnabled !== 'true') {
        $location.path('/login');
      }

      $scope.registration = {
        name: '',
        email: '',
        password: ''
      };

      $scope.schema = [{
        label: '',
        property: 'name',
        placeholder: '姓名',
        type: 'text',
        attr: {
          ngMinlength: 2,
          required: true
        },
        msgs: {
          required: '请填写姓名',
          minlength: '至少需2个字'
        }
      }, {
        label: '',
        property: 'email',
        placeholder: gettextCatalog.getString('Email'),
        type: 'email',
        attr: {
          required: true
        },
        msgs: {
          required: '请填写邮箱地址',
          email: '填写的邮箱地址不正确',
          valid: gettextCatalog.getString('Nice email address!')
        }
      }, {
        type: 'multiple',
        fields: [{
          label: '',
          property: 'password',
          placeholder: gettextCatalog.getString('Password'),
          type: 'password',
          attr: {
            required: true,
            ngMinlength: 6
          },
          msgs: {
            required: '请填写密码',
            minlength: '至少需6个字符'
          }
        }, {
          label: '',
          property: 'confirmPassword',
          placeholder: gettextCatalog.getString('Confirm Password'),
          type: 'password',
          attr: {
            confirmPassword: 'registration.password',
            required: true
          },
          msgs: {
            required: '请填写确认密码',
            match: gettextCatalog.getString(
              'Your passwords need to match')
          }
        }],
        columns: 6
      }];

      $scope.options = {
        validation: {
          enabled: true,
          showMessages: true
        },
        layout: {
          type: 'basic',
          labelSize: 3,
          inputSize: 9
        }
      };

      $scope.confirmPassword = '';

      $scope.register = function () {

        $scope.registration.username = $scope.registration.email;
        delete $scope.registration.confirmPassword;
        $scope.user = UserService.create($scope.registration,
          function () {

            $scope.loginResult = User.login({
                include: 'user',
                rememberMe: true
              }, $scope.registration,
              function () {
                AppAuth.currentUser = $scope.loginResult.user;
                CoreService.toastSuccess(gettextCatalog.getString(
                  'Registered'), gettextCatalog.getString(
                  'You are registered!'));
                $location.path('/');
              },
              function (res) {
                CoreService.toastWarning(gettextCatalog.getString(
                  'Error signin in after registration!'), res.data.error
                  .message);
                $scope.loginError = res.data.error;
              }
            );

          },
          function (res) {
            CoreService.toastError(gettextCatalog.getString(
              'Error registering!'), res.data.error.message);
            $scope.registerError = res.data.error;
          }
        );
      };
    })
    .directive('confirmPassword',
    function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
          var validate = function (viewValue) {
            var password = scope.$eval(attrs.confirmPassword);
            ngModel.$setValidity('match', ngModel.$isEmpty(viewValue) ||
              viewValue === password);
            return viewValue;
          };
          ngModel.$parsers.push(validate);
          scope.$watch(attrs.confirmPassword, function () {
            validate(ngModel.$viewValue);
          });
        }
      };
    }
  );

})();
