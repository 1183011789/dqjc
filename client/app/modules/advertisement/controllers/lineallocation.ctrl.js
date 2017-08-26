(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name com.module.orders.controller:ListCtrl
     * @description Dashboard
     * @requires $scope
     * @requires $rootScope
     **/
    angular
        .module('com.module.advertisement')
        .controller('LineAllocationCtrl', function($scope, $state, CoreService, RodeContain, $rootScope, BroadcastWarningPost, Rode, $location) {
            console.log("线路分配----------");
            BroadcastWarningPost.find({}).$promise.then(function(value) {
                $scope.warningPosts = value;
                console.log("广播警示柱---", JSON.stringify(value));
            });
            Rode.find({}).$promise.then(function(value) {
                $scope.rodes = value;
                console.log("铁路信息---", JSON.stringify(value));
            });
            //点击铁路
            $scope.selectedRodes = new Set();
            $scope.addEditItem = function(item) {
                // 将需要删除的item加入selectedRodes
                console.log("item--", JSON.stringify(item));
                if (item.checked) {
                    $scope.selectedRodes.add(item.id)
                    $scope.RodesArray = Array.from($scope.selectedRodes);
                    console.log("selectedRodes-1-", JSON.stringify($scope.selectedRodes));
                    console.log("array-1-", JSON.stringify($scope.RodesArray));
                    console.log("size-1--", JSON.stringify($scope.selectedRodes.size));
                } else {
                    $scope.selectedRodes.delete(item.id)
                    $scope.RodesArray = Array.from($scope.selectedRodes);
                    console.log("selectedRodes-2-", JSON.stringify($scope.selectedRodes));
                    console.log("array-2-", JSON.stringify($scope.RodesArray));
                    console.log("size-2--", JSON.stringify($scope.selectedRodes.size));
                }
            };

            //选择广播警示住的时候
            $scope.selectedWarningposts = new Set();
            $scope.selectRow = function(warningpost) {
                    if ($scope.biaoji) {
                        console.log("分配----", warningpost.id);
                        $scope.biaoji = false;
                    } else {
                        console.log("查看------");
                        console.log("id-1----", warningpost.id);
                        $scope.warning = warningpost.id;

                        RodeContain.find({
                            filter: {
                                include: [
                                    "rode"
                                ],
                                where: {
                                    broadcastWarningPostId: warningpost.id
                                }
                            }
                        }, function(result) {
                            console.log("result--", JSON.stringify(result));
                        }, function() {

                        });




                    }
                }
                //select
            $scope.selectwarningpost = function(warningpost) {
                    $scope.biaoji = true;
                    console.log("广播警示柱---", JSON.stringify(warningpost));
                    if (warningpost.checked) {
                        $scope.selectedWarningposts.add(warningpost.id)
                        for (var j = 0; j < $scope.warningPosts.length; j++) {
                            if ($scope.warningPosts[j].id === warningpost.id) {
                                $scope.selectedWarningposts.clear();
                                $scope.selectedWarningposts.add($scope.warningPosts[j].id)
                            } else {
                                $scope.warningPosts[j].checked = false;
                                // $scope.selectedWarningposts.clear();
                            }
                        }
                        $scope.warningPostsArray = Array.from($scope.selectedWarningposts);
                        console.log("selectedWarningposts-1-", JSON.stringify($scope.selectedWarningposts));
                        console.log("array-1-", JSON.stringify($scope.warningPostsArray));
                        console.log("size-1--", JSON.stringify($scope.selectedWarningposts.size));
                    } else {
                        $scope.selectedWarningposts.delete(warningpost.id)
                        $scope.warningPostsArray = Array.from($scope.selectedWarningposts);
                        console.log("selectedWarningposts-2-", JSON.stringify($scope.selectedWarningposts));
                        console.log("array-2-", JSON.stringify($scope.warningPostsArray));
                        console.log("size-2--", JSON.stringify($scope.selectedWarningposts.size));
                    }
                }
                //最后保存
            $scope.allows = [];
            var objs = {};
            $scope.preservationItem = function() {
                    if (!$scope.RodesArray || !$scope.warningPostsArray) {
                        CoreService.alertWarning('提示', '还没选中');
                        return;
                    }
                    for (var a = 0; a < $scope.RodesArray.length; a++) {
                        objs = {
                            rodeId: $scope.RodesArray[a],
                            broadcastWarningPostId: $scope.warningPostsArray[0]
                        }
                        console.log("objs---", JSON.stringify(objs));
                        $scope.allows.push(objs);
                    }
                    upload(0);
                    console.log("$scope.allows----", JSON.stringify($scope.allows));
                }
                //提交
            function upload(index) {
                RodeContain.create($scope.allows[index], function(result) {
                    if (index === $scope.allows.length - 1) {
                        console.log("全部上传成功----");
                        $scope.selectedWarningposts.clear();
                        $scope.selectedRodes.clear();
                        console.log('最后提交---------');
                        var array = Array.from($scope.selectedRodes);
                        console.log("array-2-", JSON.stringify(array));
                        console.log("$scope.warningPosts", JSON.stringify($scope.rodes[0].checked));
                        for (var i = 0; i < $scope.rodes.length; i++) {
                            $scope.rodes[i].checked = false;
                        }
                        for (var k = 0; k < $scope.warningPosts.length; k++) {
                            $scope.warningPosts[k].checked = false;
                        }
                    } else {
                        upload(index + 1);
                    }
                    console.log("结果----", JSON.stringify(result));
                }, function(err) {
                    console.log("错误--", JSON.stringify(err));
                });
            }



        });

})();