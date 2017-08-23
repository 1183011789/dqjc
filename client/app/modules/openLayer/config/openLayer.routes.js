'use strict';

angular.module('com.module.openLayer')
	.config(function($stateProvider) {
		$stateProvider
			.state('app.openlayer', {
          abstract: true,
          url: '/openlayer',
          templateUrl: 'modules/openLayer/views/main.html',
        })
        .state('app.openlayer.map', {
          url: '',
          templateUrl: 'modules/openLayer/views/map.html',
          controller: 'OpenLayerCtrl'
        })
			;
		});