(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .run(function ($rootScope) {
      $rootScope.addMenu('沙盒', 'app.sandbox.index', 'fa-inbox');
    });

})();
