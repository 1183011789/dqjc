(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name com.module.core.controller:HomeCtrl
     * @description Dashboard
     * @requires $scope
     * @requires $rootScope
     **/
    angular
        .module('com.module.core')
        .controller('CoverCtrl', function($scope, $rootScope) {
            $scope.boxes = [{
                    name: '基础数据',
                    color: 'bg-blue',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                },
                {
                    name: '基础数据',
                    color: 'bg-aqua',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                },
                {
                    name: '基础数据',
                    color: 'bg-maroon',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                },
                {
                    name: '基础数据',
                    color: 'bg-purple',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                },
                {
                    name: '基础数据',
                    color: 'bg-orange',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                },
                {
                    name: '基础数据',
                    color: 'bg-lime',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                },
                {
                    name: '基础数据',
                    color: 'bg-olive',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                },
                {
                    name: '基础数据',
                    color: 'bg-teal',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                },
                {
                    name: '基础数据',
                    color: 'bg-fuchsia',
                    icon: 'ion-information',
                    quantity: '0',
                    href: 'app.home'
                }
            ];
        });

})();