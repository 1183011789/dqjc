(function() {
    'use strict';
    angular
        .module('com.module.securityequipment')
        .run(function($rootScope, gettextCatalog) {
            $rootScope.addMenu(gettextCatalog.getString('SecurityEquipment'),
                'app.securityequipment.list', 'fa-chain', true);

        });

})();