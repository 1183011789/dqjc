(function () {
  'use strict';
  angular
    .module('com.module.openLayer')
    .run(function ($rootScope) {
      $rootScope.addMenu('OpenLayerTest',
        'app.openlayer.map', 'fa-cog');

    });

})();