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
        .module('com.module.keysite')
        .controller('TlineCtrl', function($scope, $state, CoreService, RodeContain, $rootScope, Tunnel, Rode, $location) {
            console.log("线路分配----------");
            Tunnel.find({}).$promise.then(function(value) {
                $scope.warningPosts = value;
            });
            $scope.findeAllRode = function() {
                Rode.find({}).$promise.then(function(value) {
                    $scope.rodes = value;

                });
            }
            $scope.findeAllRode();
            //点击铁路 选择要分配的铁路
            $scope.selectedRodes = new Set();
            $scope.selectedRodeCommits = new Set();
            $scope.selectedRodeCommitsArray = [];
            $scope.deleteIds = [];
            //点击rode
            $scope.addEditItem = function(item) {
                // 将需要删除的item加入selectedRodes
                console.log("item--", JSON.stringify(item));
                if (item.checked) {
                    $scope.selectedRodeCommits.add(item.id);
                    $scope.selectedRodeCommitsArray = Array.from($scope.selectedRodeCommits);
                    console.log("修改后的铁路 --id-", JSON.stringify($scope.selectedRodeCommitsArray));
                    console.log("size-1--", JSON.stringify($scope.selectedRodeCommits.size));
                    //实时保存添加的关联的铁路
                    var objs = {
                        rodeId: $scope.selectedRodeCommitsArray[0],
                        tunnelId: $scope.warningPostsArray[0]
                    }
                    RodeContain.create(objs, function(result) {
                        console.log("更新成功----", JSON.stringify(result));
                        CoreService.toastSuccess(
                            '分配成功!'
                        );
                        // $scope.selectedWarningposts.clear();
                        $scope.selectedRodeCommits.clear();
                        $scope.selectedRodeCommitsArray = Array.from($scope.selectedRodeCommits);
                        console.log("提交后的铁路数组id-", JSON.stringify($scope.selectedRodeCommitsArray));
                        console.log("结果----", JSON.stringify(result));
                        console.log("广播警示柱id----", JSON.stringify($scope.warningPostsArray[0]));
                        RodeContain.find({
                            filter: {
                                include: [
                                    "rode"
                                ],
                                where: {
                                    tunnelId: $scope.warningPostsArray[0],
                                }
                            }
                        }, function(res) {
                            //查出当前选择的关系数据
                            console.log("关系数据所有的--", JSON.stringify(res));
                            $scope.allRodeContians = res;
                        }, function() {

                        })
                    }, function(err) {
                        CoreService.toastError(
                            '提示',
                            '分配失败，请您重新分配' + err
                        );
                        console.log("错误--", JSON.stringify(err));
                    });
                } else {
                    console.log("实时删除------------", item.id);
                    // 直接删除id
                    for (var i = 0; i < $scope.allRodeContians.length; i++) {
                        if ($scope.allRodeContians[i].rode.id === item.id) {
                            $scope.deleteIds.push($scope.allRodeContians[i].id);
                        }
                    }
                    $scope.deleteArry = new Array();
                    for (var j in $scope.deleteIds) {
                        //该元素在tmp内部不存在才允许追加
                        if ($scope.deleteArry.indexOf($scope.deleteIds[j]) == -1) {
                            $scope.deleteArry.push($scope.deleteIds[j]);
                        }
                    }
                    console.log("所有要删除的-id---", JSON.stringify($scope.deleteArry));
                    deleteload(0);
                }
            };
            $scope.clickRodeRow = function(rode) {
                    console.log("选中铁路---");
                    if (rode.checked) {
                        rode.checked = false;
                        $scope.addEditItem(rode);
                    } else {
                        rode.checked = true;
                        $scope.addEditItem(rode);
                    }
                }
                //最后删除
            function deleteload(index) {
                RodeContain.delete({
                        id: $scope.deleteArry[index]
                    },
                    function(result) {
                        if (index === $scope.deleteArry.length - 1) {
                            console.log('最后提交------成功---');
                            CoreService.toastSuccess(
                                '取消成功!'
                            );

                        } else {
                            deleteload(index + 1);
                        }

                    },
                    function(err) {

                        CoreService.toastError(
                            '提示',
                            '取消失败，请您重新操作' + err
                        );
                    });
            }

            //选择广播警示住的时候 
            $scope.RodesArray = [];
            $scope.selectedWarningposts = new Set();
            $scope.selectRow = function(warningpost) {
                    console.log("查看------");
                    $scope.findeAllRode();
                    console.log("id-1----", warningpost.id);
                    // $scope.warning = warningpost.id;
                    RodeContain.find({
                        filter: {
                            include: [
                                "rode"
                            ],
                            where: {
                                tunnelId: warningpost.id
                            }
                        }
                    }, function(result) {
                        $scope.allRodeContians = result;
                        //每次检索的时候清空 选择的铁路id 重新刷新
                        $scope.selectedRodes.clear();
                        var selRode = result;
                        //查出所有的路
                        for (var i = 0; i < $scope.rodes.length; i++) {
                            var rode = $scope.rodes[i];
                            //标记单个警示柱 所关联的铁路
                            for (var j = 0; j < selRode.length; j++) {
                                if (selRode[j].rode.id === rode.id) {
                                    rode.checked = true;
                                    //添加到数组中的
                                    $scope.selectedRodes.add(rode.id)
                                }
                            }
                        }

                        $scope.RodesArray = Array.from($scope.selectedRodes);

                    }, function(err) {
                        console.log("出错了--", JSON.stringify(err));
                    });
                }
                //select 某项
            $scope.hindenOrshow = true;
            $scope.selectwarningpost = function(warningpost) {
                    console.log("广播警示柱---", JSON.stringify(warningpost));
                    if (warningpost.checked) {
                        $scope.selectedWarningposts.add(warningpost.id)
                        for (var j = 0; j < $scope.warningPosts.length; j++) {
                            if ($scope.warningPosts[j].id === warningpost.id) {
                                $scope.selectedWarningposts.clear();
                                $scope.selectedWarningposts.add($scope.warningPosts[j].id);

                            } else {
                                $scope.warningPosts[j].checked = false;
                                // $scope.selectedWarningposts.clear();
                            }
                        }
                        $scope.selectRow(warningpost);
                        $scope.hindenOrshow = true;
                        // $scope.findeAllRode();
                        $scope.warningPostsArray = Array.from($scope.selectedWarningposts);
                    } else {
                        $scope.hindenOrshow = false;
                        $scope.selectedWarningposts.delete(warningpost.id)
                        $scope.findeAllRode();
                        $scope.warningPostsArray = Array.from($scope.selectedWarningposts);
                    }
                }
                //选择信息某项
            $scope.selectRows = function(row) {
                $scope.warning = row.id;
                // if (row.checked) {
                //     row.checked = false;
                //     $scope.selectwarningpost(row);
                // } else {
                //     row.checked = true;
                //     $scope.selectwarningpost(row);
                // }

                if ($scope.hindenOrshow) {
                    console.log("查看所有分配---");
                    for (var j = 0; j < $scope.warningPosts.length; j++) {
                        if ($scope.warningPosts[j].id === row.id) {
                            $scope.selectedWarningposts.clear();
                            $scope.selectedWarningposts.add($scope.warningPosts[j].id);
                            $scope.warningPosts[j].checked = true
                            $scope.rowobj = $scope.warningPosts[j];
                            $scope.selectwarningpost($scope.rowobj);
                            $scope.hindenOrshow = true;
                            console.log("改变的对象-----", JSON.stringify($scope.rowobj));
                        } else {
                            $scope.warningPosts[j].checked = false;
                            // $scope.selectedWarningposts.clear();
                        }
                    }
                } else {
                    console.log("取消查看所有分配---");
                    // $scope.hindenOrshow = true;

                    $scope.selectedRodes.clear();
                    $scope.RodesArray = Array.from($scope.selectedRodes);
                    console.log("警示柱---id--" + JSON.stringify($scope.RodesArray));

                }
            }
        });

})();