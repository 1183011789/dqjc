(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.openLayer.controller:OpenLayerCtrl
   * @description Dashboard
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.road')
    .controller('RoadMapCtrl', function($scope, olData,
                                        Rode, RouteMapInformation,
                                        AffiliatedInstitution, AdministrativeAreaMapInformation) {
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
      $scope.below_wms = {
        source: {
          type: 'TileWMS',
          // url: 'http://58.56.96.171:10903/geoserver/BJMap/wms',
          url: 'http://58.56.96.171:10903/geoserver/gwc/service/wms',
          crossOrigin: null,
          params: {
            // LAYERS: 'BJMapDB:BJMapDB',
            LAYERS: 'BJMap:BJMap',
            FORMAT: format,
            VERSION: '1.1.1',
            STYLES: ''
            // tilesOrigin: bounds[1] + ',' + bounds[0]
          }
        }
      };
      $scope.above_wms = {
        source: {
          type: 'TileWMS',
          // url: 'http://58.56.96.171:10903/geoserver/BJMap/wms',
          url: 'http://58.56.96.171:10903/geoserver/gwc/service/wms',
          crossOrigin: null,
          params: {
            LAYERS: 'BJMapDB:BJMapDB',
            // LAYERS: 'BJMap:BJMap',
            FORMAT: format,
            VERSION: '1.1.1',
            STYLES: ''
            // tilesOrigin: bounds[1] + ',' + bounds[0]
          }
        }
      };
      olData.getMap().then(function (map) {
        // map is the native ol3 object. use the ol3 api to draw features on top of existing layers
        console.log("--map-->", map);
      });

      $scope.kml = {
        name: 'kml',
        source: {
          type: 'KML',
          projection: 'EPSG:4326',
          url: 'modules/advertisement/data/bjhlb_map_data.kml'
        }
      };

      // 除地图外的其他数据
      /////////////////////////////////////////////////////////////

      $scope.paths = [];
      $scope.lines = [];
      $scope.markers = [];

      $scope.$on("MapMarkerAdded", function (event, data) {
        $scope.markers = $scope.markers.concat(data);
        // _.concat($scope.markers, data);
      });

      $scope.$on("MapMarkerRemoved", function (event, item) {
        _.remove($scope.markers, function (i) {
          return i.category == item.id;
        });
      });

      $scope.$on("MapPathAdded", function (event, data) {
        $scope.paths = $scope.paths.concat(data);
      });

      $scope.$on("MapPathRemoved", function (event, item) {
        _.remove($scope.paths, function (i) {
          return i.place_id == item.id;
        });
      });

      // 获取所有线路信息
      Rode.find().$promise.then(function (value) {
        $scope.railways = value;
      });
      // 获取所有行政区域信息
      AffiliatedInstitution.find().$promise.then(function (value) {
        $scope.affiliatedInstitutions = value;
      });

      // 铁路线路地图 (线)
      $scope.selectRailwayRouteMap = function (item) {
        if (item.checked) {
          // 根据铁路信息，获取该条线路
        // ,order: ['lng DESC', 'lat DESC']
          RouteMapInformation.find({
            filter: {
              where:{
                rodeId: item.id
              }
            }
          }).$promise.then(function (value) {

            var c = value.map(function (i) {
              return [parseFloat(i.lng), parseFloat(i.lat)];
            });
            $scope.lines.push({
              line_id: item.id,
              message: item.rodename,
              style: {
                stroke: {
                  color: [255, 255, 255, 1],
                  width: 4
                }
              },
              coords: c
            });

            $scope.lines.push({
              line_id: item.id,
              message: item.rodename,
              style: {
                stroke: {
                  color: [0, 0, 0, 1],
                  width: 4,
                  lineDash: [20, 20],
                  lineCap: 'butt',
                  lineJoin: 'miter'
                }
              },
              coords: c
            });
          });
        } else {
          _.remove($scope.lines, function (i) {
            return i.line_id == item.id;
          });
        }
      };
      // 行政区域地图 affiliatedInstitution（面）
      $scope.selectAdminAreaMap = function (item) {
        if (item.checked) { // 查询并展示数据
          AdministrativeAreaMapInformation.find({
            filter: {
              where:{
                regionalId: item.id
              }
            }
          }).$promise.then(function (value) {
            var c = value.map(function (i) {
              return [parseFloat(i.lng), parseFloat(i.lat)];
            });
            $scope.paths.push({
              area_id: item.id,
              message: item.affiliatedInstitution,
              style: {
                stroke: {
                  color: [255, 0, 255, 0.7],
                  width: 2
                }
              },
              coords: [c]
            });
          });
        } else {
          _.remove($scope.paths, function (i) {
            return i.area_id == item.id;
          });
        }
      };

      /* 以下为地图信息数据, 仅为参考 */
      /////////////////////////////////////////////////////////////

      $scope.center = {
        lat: (bounds[1] + bounds[3]) / 2,
        lon: (bounds[0] + bounds[2]) / 2,
        zoom: 10
      };

      // $scope.markers = [{
      //   lat: (bounds[1] + bounds[3]) / 2,
      //   lon: (bounds[0] + bounds[2]) / 2,
      //   label: {
      //     message: '<span style="color:red;">Test arker</span>',
      //     show: false,
      //     showOnMouseOver: false,
      //     showOnMouseClick: true,
      //     keepOneOverlayVisible: false
      //   },
      //   style: {
      //     image: {
      //       icon: {
      //         anchor: [0.5, 1],
      //         anchorXUnits: 'fraction',
      //         anchorYUnits: 'fraction',
      //         opacity: 0.90,
      //         src: 'images/村庄.png'
      //       }
      //     }
      //   }
      // }];


      // $scope.paths = [{
      //   message: 'Test Area!!!',
      //   style: {
      //     fill: {
      //       "color": "rgba(255, 0, 255, 0.6)"
      //     },
      //     stroke: {
      //       color: [0, 225, 0, 0.7],
      //       width: 5
      //     }
      //   },
      //   coords: [
      //     [
      //       [116.2720166815729, 39.83681016129364],
      //       [116.2720269616892, 39.83726814319131],
      //       [116.2719604304608, 39.83752586725619],
      //       [116.2719186598635, 39.83779035627363],
      //       [116.2718155849266, 39.83811419496216],
      //       [116.2716854338556, 39.83841346185489],
      //       [116.2715023519512, 39.83874553800589],
      //       [116.2713149664068, 39.83905138379967],
      //       [116.2708898719198, 39.83954945426746],
      //       [116.2704046142097, 39.84006074939639],
      //       [116.2697951945997, 39.84067360296604],
      //       [116.2692727207009, 39.84124289008672],
      //       [116.2687752009756, 39.84171165757021],
      //       [116.2680599409045, 39.84247838269626],
      //       [116.2673767340772, 39.8431521471501],
      //       [116.2668777476082, 39.84365421692757],
      //       [116.2663822551182, 39.84409998064898],
      //       [116.2660576397036, 39.84435404551056],
      //       [116.2654996978072, 39.84469202723114],
      //       [116.2650309426084, 39.84492303028461],
      //       [116.2644832619745, 39.84510591877611],
      //       [116.2640550922213, 39.84529621611856],
      //       [116.2636442618165, 39.84544091826757],
      //       [116.2631655204835, 39.84560114047613],
      //       [116.2628311913608, 39.84571270782228],
      //       [116.2625401524385, 39.84580229088169]
      //     ]
      //   ]
      // },
      //   {
      //     message: 'Test Path!!!',
      //     style: {
      //       stroke: {
      //         color: [0, 0, 0, 0.7],
      //         width: 3
      //       }
      //     },
      //     coords: [
      //       [
      //         [116.4347927747106, 39.89547531742212],
      //         [116.55178016662598, 40.522943267822266]
      //       ],
      //       [
      //         [116.55178016662598, 40.522943267822266],
      //         [117.11854414506392, 40.54504394531251]
      //       ]
      //     ]
      //   }
      // ];

    });
})();
