(function() {
    'use strict';
    angular
        .module('com.module.hiddenplace')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('隐患处所'),
                'app.hiddenplace.list', 'glyphicon glyphicon-exclamation-sign', true);

        });

})();