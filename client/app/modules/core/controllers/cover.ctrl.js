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
        .controller('CoverCtrl', function($scope, olData,
                                          Rode, RouteMapInformation,
                                          AffiliatedInstitution, AdministrativeAreaMapInformation) {
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
            },
            zIndex: -2
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
            },
            zIndex: -1 // 设置layer层级
          };
          olData.getMap().then(function (map) {
            // map is the native ol3 object. use the ol3 api to draw features on top of existing layers
            console.log("--map-->", map.getLayers());
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
          Rode.find({
            filter: {
              include: 'routeMapInformations'
            }
          }).$promise.then(function (value) {
            var lines = [];
            $scope.railways = value.map(function (item, index, array) {
              item.checked  = true;
              var c = item.routeMapInformations.map(function (item2, index2, array2) {
                return [parseFloat(item2.lng), parseFloat(item2.lat)];
              });
              lines.push({
                line_id: item.id,
                style: {
                  stroke: {
                    color: [255, 255, 255, 1],
                    width: 4
                  },
                  zIndex: 1000
                },
                coords: c
              }, {
                line_id: item.id,
                message: item.rodename,
                style: {
                  stroke: {
                    color: [0, 0, 0, 1],
                    width: 4,
                    lineDash: [20, 20],
                    lineCap: 'butt',
                    lineJoin: 'miter'
                  },
                  zIndex: 1000
                },
                coords: c
              });

              return item;
            });
            $scope.lines = lines;
          });

          // 铁路线路地图 (线)
          $scope.selectRailwayRouteMap = function (item) {
            if (item.checked) {
              // 根据铁路信息，获取该条线路
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
                  style: {
                    stroke: {
                      color: [255, 255, 255, 1],
                      width: 4
                    }
                  },
                  coords: c
                }, {
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

          // 1 全选， 0 全不选， -1 反选
          $scope.linesCheckedType = 1;
          $scope.onLinesSelect = function (type) {
            console.log('===type==>',type);
            if(type == 1) {
              Rode.find({
                filter: {
                  include: 'routeMapInformations'
                }
              }).$promise.then(function (value) {
                var lines = [];
                $scope.railways = value.map(function (item, index, array) {
                  item.checked  = true;
                  var c = item.routeMapInformations.map(function (item2, index2, array2) {
                    return [parseFloat(item2.lng), parseFloat(item2.lat)];
                  });
                  lines.push({
                    line_id: item.id,
                    style: {
                      stroke: {
                        color: [255, 255, 255, 1],
                        width: 4
                      }
                    },
                    coords: c
                  },{
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
                  return item;
                });
                $scope.lines = lines;
              });
            } else if (type == 0) {
              $scope.lines = [];
              $scope.railways = $scope.railways.map(function (item, index, array) {
                item.checked = false;
                return item;
              });
            } else { // 反选
              $scope.railways = $scope.railways.map(function (item, index, array) {
                item.checked = !item.checked;
                return item;
              });
            }
          };


          // 获取所有行政区域信息
          AffiliatedInstitution.find().$promise.then(function (value) {
            $scope.affiliatedInstitutions = value;
          });
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
                      color: [255, 0, 255, 0.8],
                      width: 3,
                      lineCap: 'butt',
                      lineJoin: 'miter'
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
            lat: 39.9088966409,
            lon: 116.3974357338,
            zoom: 10
          };
        });
})();
