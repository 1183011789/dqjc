(function() {
    'use strict';
    angular
        .module('com.module.advertisement')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('Advertisement'),
                'app.advertisement.list', 'fa-adn', true);

        });

})();