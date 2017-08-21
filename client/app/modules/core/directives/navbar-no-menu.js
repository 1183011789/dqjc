(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.core.directive:navbar
   * @description
   * # navbar
   */
  angular
    .module('com.module.core')
    .directive('navbarNoMenu', function () {return {
        templateUrl: 'modules/core/views/elements/navbar-no-menu.html',
        restrict: 'E'
      };
    });

})();
