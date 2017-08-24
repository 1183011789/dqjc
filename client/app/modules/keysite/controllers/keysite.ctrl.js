(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .controller('KeysiteCtrl', function($scope) {
            // console.log($location.path());
            $scope.items = [{
                name: '横跨铁桥',
                sref: '.crossIronBridge.index'
            }, {
                name: '基站',
                sref: '.baseStation.index'
            }, {
                name: '桥梁',
                sref: '.bridge.index'
            }, {
                name: '涵洞',
                sref: '.culvert.index'
            }, {
                name: '道口',
                sref: '.levelCrossing.index'
            }, {
                name: '检修口',
                sref: '.servicePort.index'
            }, {
                name: '车站',
                sref: '.station.index'
            }, {
                name: '隧道',
                sref: '.tunnel.index'
            }];
        });
})();