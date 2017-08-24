(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name com.module.openLayer.controller:OpenLayerCtrl
     * @description Dashboard
     * @requires $scope
     * @requires $rootScope
     **/
    angular
        .module('com.module.keysite')
        .controller('MapCtrl', function($scope, olData) {
            var format = 'image/png';
            var bounds = [115.4168701171875, 39.4354248046875, 117.5042724609375, 41.0614013671875];
            var projection = new ol.proj.Projection({
                code: 'EPSG:4326',
                units: 'degrees'
            });
            $scope.view = {
                projection: projection,
                maxZoom: 18,
                minZoom: 7
            }
            $scope.defaults = {
                // Setting up the
                center: {
                    projection: projection
                },
                interactions: {
                    mouseWheelZoom: true
                },
                view: $scope.view
            }
            $scope.wms = {
                source: {
                    type: 'TileWMS',
                    // url: 'http://58.56.96.171:10903/geoserver/BJMapDB/wms',
                    url: 'http://58.56.96.171:10903/geoserver/gwc/service/wms',
                    crossOrigin: null,
                    params: {
                        LAYERS: 'BJMapDB:BJMapDB',
                        FORMAT: format,
                        VERSION: '1.1.1',
                        STYLES: ''
                            // tilesOrigin: bounds[1] + ',' + bounds[0]
                    }
                }
            };
            olData.getMap().then(function(map) {
                // map is the native ol3 object. use the ol3 api to draw features on top of existing layers
                console.log("---->", map);
            });

            $scope.kml = {
                name: 'kml',
                source: {
                    type: 'KML',
                    projection: 'EPSG:4326',
                    url: 'modules/advertisement/data/bjhlb_map_data.kml'
                }
            };


            /////////////////////////////////////////////////////////////


            $scope.center = {
                lat: (bounds[1] + bounds[3]) / 2,
                lon: (bounds[0] + bounds[2]) / 2,
                zoom: 10
            };

            $scope.markers = [{
                    lat: (bounds[1] + bounds[3]) / 2,
                    lon: (bounds[0] + bounds[2]) / 2,
                    label: {
                        message: '<span style="color:red;">First Message!!!</span>',
                        show: false,
                        showOnMouseOver: false,
                        showOnMouseClick: true,
                        keepOneOverlayVisible: false
                    }
                },
                {
                    lat: 40.10477510259377,
                    lon: 116.8303587733725,
                    label: {
                        message: '<span style="color:red;">Second Message!!!</span>',
                        show: false,
                        showOnMouseOver: false,
                        showOnMouseClick: true,
                        keepOneOverlayVisible: false
                    }
                }
            ];

            $scope.paths = [{
                    message: 'First Path Message!!!',
                    style: {
                        fill: {
                            "color": "rgba(255, 0, 255, 0.6)"
                        },
                        stroke: {
                            color: [0, 225, 0, 0.7],
                            width: 5,
                        }
                    },
                    coords: [
                        [
                            [116.2720166815729, 39.83681016129364],
                            [116.2720269616892, 39.83726814319131],
                            [116.2719604304608, 39.83752586725619],
                            [116.2719186598635, 39.83779035627363],
                            [116.2718155849266, 39.83811419496216],
                            [116.2716854338556, 39.83841346185489],
                            [116.2715023519512, 39.83874553800589],
                            [116.2713149664068, 39.83905138379967],
                            [116.2708898719198, 39.83954945426746],
                            [116.2704046142097, 39.84006074939639],
                            [116.2697951945997, 39.84067360296604],
                            [116.2692727207009, 39.84124289008672],
                            [116.2687752009756, 39.84171165757021],
                            [116.2680599409045, 39.84247838269626],
                            [116.2673767340772, 39.8431521471501],
                            [116.2668777476082, 39.84365421692757],
                            [116.2663822551182, 39.84409998064898],
                            [116.2660576397036, 39.84435404551056],
                            [116.2654996978072, 39.84469202723114],
                            [116.2650309426084, 39.84492303028461],
                            [116.2644832619745, 39.84510591877611],
                            [116.2640550922213, 39.84529621611856],
                            [116.2636442618165, 39.84544091826757],
                            [116.2631655204835, 39.84560114047613],
                            [116.2628311913608, 39.84571270782228],
                            [116.2625401524385, 39.84580229088169]
                        ]
                    ]
                },
                {
                    message: 'Second Path Message!!!',
                    style: {
                        stroke: {
                            color: [225, 0, 0, 0.7],
                            width: 5,
                        }
                    },
                    coords: [
                        [
                            [116.4347927747106, 39.89547531742212],
                            [117.4347910495597, 40.10554418490003]
                        ]
                    ]
                }
            ]

        });
})();