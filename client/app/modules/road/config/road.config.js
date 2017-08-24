(function () {
  'use strict';
  angular
    .module('com.module.road')
    .run(function ($rootScope, gettextCatalog) {
      $rootScope.addMenu('线路情况',
        'app.road.list', 'fa-road');

    });

})();
