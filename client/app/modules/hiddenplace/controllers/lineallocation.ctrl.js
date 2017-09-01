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
        .module('com.module.apropagandapoint')
        .controller('LineAllocationCtrl', function($scope, $state, CoreService, RodeContain, $rootScope, APropagandaPoint, Rode, $location) {
            console.log("线路分配----------");
            APropagandaPoint.find({}).$promise.then(function(value) {
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
                if (item.checked) {
                    $scope.selectedRodeCommits.add(item.id);
                    $scope.selectedRodeCommitsArray = Array.from($scope.selectedRodeCommits);

                    //实时保存添加的关联的铁路
                    var objs = {
                        rodeId: $scope.selectedRodeCommitsArray[0],

                        aPropagandaPointId: $scope.warningPostsArray[0]
                    }
                    RodeContain.create(objs, function(result) {

                        CoreService.toastSuccess(
                            '分配成功!'
                        );
                        // $scope.selectedWarningposts.clear();
                        $scope.selectedRodeCommits.clear();
                        $scope.selectedRodeCommitsArray = Array.from($scope.selectedRodeCommits);
                        RodeContain.find({
                            filter: {
                                include: [
                                    "rode"
                                ],
                                where: {
                                    aPropagandaPointId: $scope.warningPostsArray[0],
                                }
                            }
                        }, function(res) {
                            //查出当前选择的关系数据
                            $scope.allRodeContians = res;
                        }, function() {

                        })
                    }, function(err) {
                        CoreService.toastError(
                            '提示',
                            '分配失败，请您重新分配' + err
                        );
                    });
                } else {
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
                    deleteload(0);
                }
            };
            $scope.clickRodeRow = function(rode) {
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
                            CoreService.toastSuccess(
                                '取消成功!'
                            );
                            // $scope.deleteArry = [];
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
                    $scope.findeAllRode();

                    RodeContain.find({
                        filter: {
                            include: [
                                "rode"
                            ],
                            where: {
                                aPropagandaPointId: warningpost.id
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
                        // console.log("查出的关系表里的数据和铁路关系--", JSON.stringify(result));
                        $scope.RodesArray = Array.from($scope.selectedRodes);

                    }, function(err) {
                        console.log("出错了--", JSON.stringify(err));
                    });
                }
                //select 某项
            $scope.hindenOrshow = true;
            $scope.selectwarningpost = function(warningpost) {
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

                    for (var j = 0; j < $scope.warningPosts.length; j++) {
                        if ($scope.warningPosts[j].id === row.id) {
                            $scope.selectedWarningposts.clear();
                            $scope.selectedWarningposts.add($scope.warningPosts[j].id);
                            $scope.warningPosts[j].checked = true
                            $scope.rowobj = $scope.warningPosts[j];
                            $scope.selectwarningpost($scope.rowobj);
                            $scope.hindenOrshow = true;

                        } else {
                            $scope.warningPosts[j].checked = false;
                            // $scope.selectedWarningposts.clear();
                        }
                    }
                } else {

                    $scope.selectedRodes.clear();
                    $scope.RodesArray = Array.from($scope.selectedRodes);

                }
            }
        });

})();