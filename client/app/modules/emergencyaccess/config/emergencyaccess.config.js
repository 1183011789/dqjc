(function() {
    'use strict';
    angular
        .module('com.module.emergencyaccess')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('EmergencyAccess'),
                'app.emergencyaccess.list', 'fa-adn', true);

        });

})();