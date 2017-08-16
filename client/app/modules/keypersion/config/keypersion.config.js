(function() {
    'use strict';
    angular
        .module('com.module.keypersion')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('Keypersion'),
                'app.keypersion.list', 'fa-adn', true);

        });

})();