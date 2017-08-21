(function() {
    'use strict';
    angular
        .module('com.module.institutionaiteam')
        .controller('InstitutionalTeamCtrl', function($scope, CoreService, InstitutionalTeam, InstitutionaIteamService, NgTableParams, $state) {
            $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10
            }, {
                getData: function(params) {
                    InstitutionalTeam.count().$promise.then(function(result) {
                        params.total(result.count);
                    });
                    var offset = params._params.count * (params._params.page - 1);
                    InstitutionalTeam.find({ filter: { limit: params._params.count, offset: offset } }).$promise.then(function(value) {
                        $scope.institutionalTeams = value;
                    });
                }
            });

            $scope.deleteItems = function(item) {
                console.log('=======')
                console.log($scope.selectedItems)
                var array = [];
                for (var value of $scope.selectedItems) {
                    array.push(value)
                }

                InstitutionaIteamService.deleteAll(array, function() {
                    $state.go('^.list');
                }, function() {
                    $state.go('^.list');
                });
            };

            // 编辑
            $scope.editItem = function() {
                if ($scope.selectedItems.size < 1) {
                    CoreService.alertWarning('提示', '还没选中');
                } else if ($scope.selectedItems.size > 1) {
                    CoreService.alertWarning('提示', '一次只能编辑一个');
                } else {
                    // ui-sref="^.edit({id: item.id})"
                    for (var value of $scope.selectedItems) {
                        var editItm = value;
                        break;
                    }
                    $state.go('^.edit', { id: editItm });
                }
            };

            $scope.selectedItems = new Set();

            $scope.addEditItem = function(item) {
                // 将需要删除的item加入selectedItems
                if (item.checked) {
                    $scope.selectedItems.add(item.id)
                } else {
                    $scope.selectedItems.delete(item.id)
                }
            };
        });
})();