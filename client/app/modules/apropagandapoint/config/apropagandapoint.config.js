(function() {
    'use strict';
    angular
        .module('com.module.apropagandapoint')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('APropagandaPoint'),
                'app.apropagandapoint.list', 'fa-adn', true);

        });

})();