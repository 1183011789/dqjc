(function () {
  'use strict';

  angular
    .module('com.module.road')
    .controller('RoadMapFilterCtrl', function ($scope, KeyPlaceCategory, KeyPlace,
                                               CrossIronBridge, Tunnel, Station,
                                               ServicePort, LevelCrossing, Culvert, Bridge, BaseStation,
                                               Monitoring, FenceInfo, APropagandaPoint, TheRoadStation) {

      $scope.otherFilters = [{
        category: '监控设备',
        id: 'monitoring',
        model: Monitoring
      }
      , {
        category: '防护栏',
        id: 'fenceInfo',
        model: FenceInfo
      }
      , {
        category: '护路宣传点',
        id: 'propagandaPoint',
        model: APropagandaPoint
      }
      , {
        category: '护路工作站',
        id: 'roadStation',
        model: TheRoadStation
      }];

      $scope.addOtherFilterItem = function (item) {
        if (item.checked) {
          // item.model.find().$promise.then(function (values) {
          //   console.log('=======>', values);
          //   var c = values.map(function (i, index, array) {
          //     return {
          //       category: item.id,
          //       lat: i.lat,
          //       lon: i.lng,
          //       label: {
          //         message: '<span style="color:red;">' + i.name + '</span>',
          //         show: false,
          //         showOnMouseOver: false,
          //         showOnMouseClick: true,
          //         keepOneOverlayVisible: false
          //       }
          //     };
          //   });
          //   $scope.$emit("MapFilterAdded", c);
          // });
        } else {
          // $scope.$emit("MapFilterRemoved", item);
        }
      };

      $scope.keySiteFilters = [{
        category: '横跨铁桥',
        id: 'crossIronBridge',
        model: CrossIronBridge
      }, {
        category: '基站',
        id: 'baseStation',
        model: BaseStation
      }, {
        category: '桥梁',
        id: 'bridge',
        model: Bridge
      }, {
        category: '涵洞',
        id: 'culvert',
        model: Culvert
      }, {
        category: '道口',
        id: 'levelCrossing',
        model: LevelCrossing
      }, {
        category: '检修口',
        id: 'servicePort',
        model: ServicePort
      }, {
        category: '车站',
        id: 'station',
        model: Station
      }, {
        category: '隧道',
        id: 'tunnel',
        model: Tunnel
      }];

      $scope.addKeySiteFilterItem = function (item) {
        if (item.checked) {
          item.model.find().$promise.then(function (values) {
            console.log('=======>', values);
            var c = values.map(function (i, index, array) {
              return {
                category: item.id,
                lat: i.lat,
                lon: i.lng,
                label: {
                  message: '<span style="color:red;">' + i.name + '</span>',
                  show: false,
                  showOnMouseOver: false,
                  showOnMouseClick: true,
                  keepOneOverlayVisible: false
                }
              };
            });
            $scope.$emit("MapFilterAdded", c);
          });
        } else {
          $scope.$emit("MapFilterRemoved", item);
        }
      };

      KeyPlaceCategory.find().$promise.then(function (value) {
        $scope.keyPlaceFiltes = value;
      });

      // 添加筛选条件后，进行数据筛选
      $scope.addKeyPlaceFilterItem = function (item) {
        if (item.checked) {
          KeyPlace.find({
            filter: {
              where: {
                category: item.id
              },
              include: ['keyPlaceCategory']
            }
          }).$promise.then(function (values) {
            var c = values.map(function (i, index, array) {
              return {
                category: i.category,
                lat: i.lat,
                lon: i.lng,
                label: {
                  message: '<span style="color:red;">' + i.name + '</span>',
                  show: false,
                  showOnMouseOver: false,
                  showOnMouseClick: true,
                  keepOneOverlayVisible: false
                },
                style: {
                  image: {
                    icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      opacity: 0.90,
                      src: 'images/' + i.keyPlaceCategory.category + '.png'
                    }
                  }
                }
              };
            });
            $scope.$emit("MapFilterAdded", c);
          });
        } else { // 未选中， 那么移除所有相关 marker
          $scope.$emit("MapFilterRemoved", item);
        }
      };
    });
})();
