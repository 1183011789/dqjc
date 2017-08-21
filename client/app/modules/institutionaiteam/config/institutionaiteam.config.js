(function() {
    'use strict';
    angular
        .module('com.module.institutionaiteam')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('InstitutionalTeam'),
                'app.institutionaiteam.list', 'fa-adn', true);

        });

})();