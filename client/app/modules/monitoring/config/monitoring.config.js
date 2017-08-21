(function() {
    'use strict';
    angular
        .module('com.module.monitoring')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('Monitoring'),
                'app.monitoring.list', 'fa-adn', true);

        });

})();