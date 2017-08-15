(function () {
  'use strict';
  angular
    .module('com.module.settings')
    .run(function ($rootScope, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Settings'),
        'app.settings.list', 'fa-cog',true);

    });

})();
