(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('SandboxFormsCtrl', function ($scope, CoreService) {

      var now = new Date();

      $scope.formOptions = {};

      $scope.formData = {
        name: null,
        description: null,
        startDate: now,
        startTime: now,
        endDate: now,
        endTime: now
      };

      $scope.formFields = [{
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name'
        }
      },{
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: '密码',
          placeholder: '请输入最少6个字符的新密码',
          required: true,
          minlength: 6
        }
      },{
        key: 'confirmPassword',
        type: 'input',
        optionsTypes: ['matchField'],
        model: this.confirmationModel,
        templateOptions: {
          type: 'password',
          label: '确认密码',
          placeholder: '请输入确认密码',
          required: true
        },
        data: {
          fieldToMatch: 'password',
          modelToMatch: this.model
        }
      },{
        key: 'description',
        type: 'textarea',
        templateOptions: {
          label: 'Description'
        }
      },{
        key: 'startDate',
        type: 'datepicker',
        templateOptions: {
          label: 'Start Date'
        }
      }, {
        key: 'startTime',
        type: 'timepicker',
        templateOptions: {
          label: 'Start Time'
        }
      }, {
        key: 'endDate',
        type: 'datepicker',
        templateOptions: {
          label: 'End Date'
        }
      }, {
        key: 'endTime',
        type: 'timepicker',
        templateOptions: {
          label: 'End Time'
        }
      }];

      $scope.onSubmit = function (data) {
        CoreService.alertSuccess('Good job!', JSON.stringify(data, null, 2));
      };
    });

})();
