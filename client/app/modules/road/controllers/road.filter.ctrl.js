(function () {
  'use strict';

  angular
    .module('com.module.road')
    .controller('RoadMapFilterCtrl', function ($scope, KeyPlaceCategory, KeyPlace,
                                               CrossIronBridge, Tunnel, Station,
                                               ServicePort, LevelCrossing, Culvert, Bridge, BaseStation,
                                               Monitoring, FenceInfo, APropagandaPoint, TheRoadStation) {
// 既有点，又有线
      $scope.otherFilters = [
        {
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
          if(item.id == 'fenceInfo') { // 当为fenceInfo时，为一条线
            item.model.find({
              filter: {
                include: 'fenceMapInfos'
              }
            }).$promise.then(function (values) {
              console.log('=======>', values);
              var c = values.map(function (i, index, array) {
                var co = i.fenceMapInfos.map(function (j, index2, array2) {
                  if(index2 >= array2.length - 1) {
                    return [];
                  }
                  var item1 = array2[index2 + 1];
                  console.log('====>', item1);
                  return [
                    [parseFloat(j.lng), parseFloat(j.lat)],
                    [parseFloat(item1.lng), parseFloat(item1.lat)]
                  ];
                });

                return {
                  place_id: item.id,
                  message: item.name,
                  style: {
                    stroke: {
                      color: [255, 0, 255, 0.7],
                      width: 4
                    }
                  },
                  coords: co
                };
              });
              $scope.$emit("MapPathAdded", c);
            });
          } else { // 其他时，为一个点
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
              $scope.$emit("MapMarkerAdded", c);
            });
          }
        } else {
          if(item.id == 'fenceInfo') {
            $scope.$emit("MapPathRemoved", item);
          } else {
            $scope.$emit("MapMarkerRemoved", item);
          }
        }
      };

      // 点（marker）
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
                  showOnMouseOver: true,
                  showOnMouseClick: false,
                  keepOneOverlayVisible: false
                }
              };
            });
            $scope.$emit("MapMarkerAdded", c);
          });
        } else {
          $scope.$emit("MapMarkerRemoved", item);
        }
      };

      // 添加筛选条件后，进行数据筛选
      // type: 1点 2面
      KeyPlaceCategory.find().$promise.then(function (value) {
        $scope.keyPlaceFiltes = value;
      });
      $scope.addKeyPlaceFilterItem = function (item) {
        console.log('======> ', item);
        if (item.checked) {
          KeyPlace.find({
            filter: {
              where: {
                category: item.id
              }
            }
          }).$promise.then(function (values) {
            if (item.type == 1) { // 这是点
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
                    keepOneOverlayVisible: true
                  },
                  style: {
                    image: {
                      icon: {
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        opacity: 0.90,
                        src: 'images/' + item.category + '.png'
                      }
                    }
                  }
                };
              });
              $scope.$emit("MapMarkerAdded", c);
            } else if (item.type == 2) { // 这是面
              var c = values.map(function (i, index, array) {
                console.log('====region====>', i.region);
                return {
                  place_id: item.id,
                  message: i.name,
                  style: {
                    stroke: {
                      color: [0, 0, 255, 1],
                      width: 2
                    }
                  },
                  coords: [JSON.parse(i.region)]
                };
              });
              $scope.$emit("MapPathAdded", c);
            }
          });
        } else { // 未选中， 那么移除所有相关 marker
          if (item.type == 1) { // 点被移除
            $scope.$emit("MapMarkerRemoved", item);
          } else if (item.type == 2) { // 面被移除
            $scope.$emit("MapPathRemoved", item);
          }
        }
      };
    });
})();
