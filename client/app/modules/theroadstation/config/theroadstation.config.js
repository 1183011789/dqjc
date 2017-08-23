(function() {
    'use strict';
    angular
        .module('com.module.theroadstation')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('护路工作站'),
                'app.theroadstation.list', 'fa-home', true);

        });

})();