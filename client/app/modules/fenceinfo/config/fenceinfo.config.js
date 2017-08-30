(function() {
    'use strict';
    angular
        .module('com.module.fenceinfo')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('FenceInfo'),
                'app.fenceinfo.list', 'fa-comments', true);

        });
})();