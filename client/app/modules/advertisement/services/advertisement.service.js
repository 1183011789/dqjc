(function() {
    'use strict';
    angular
        .module('com.module.advertisement')
        .service('AdvertisementService', function($state, CoreService, BroadcastWarningPost, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.count = function() {
                console.log("条数-----");
                return BroadcastWarningPost.count().$promise;
            };
            //总数
            // this.find = function(filter) {
            //     return BroadcastWarningPost.find(filter).$promise;
            // };
            this.find = function(filter) {
                var filter = filter || {};
                return BroadcastWarningPost.find(filter).$promise;
            };


            this.findById = function(id) {
                return BroadcastWarningPost.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(advertisement) {
                console.log("修改--------", JSON.stringify(advertisement));
                // if (!advertisement) {
                //     CoreService.alertWarning('提示', '内容');
                // }
                return BroadcastWarningPost.upsert(advertisement).$promise
                    .then(function() {
                        CoreService.toastSuccess(
                            gettextCatalog.getString('Setting saved'),
                            gettextCatalog.getString('Your setting is safe with us!')
                        );
                    })
                    .catch(function(err) {
                        CoreService.toastError(
                            gettextCatalog.getString('Error saving setting '),
                            gettextCatalog.getString('This setting could no be saved: ' + err)
                        );
                    });
            };

            this.deleteMultiple = function(ids, successCb, cancelCb) {
                console.log('=========' + ids);
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        BroadcastWarningPost.deleteMultiple({ multiple: ids }, function() {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Setting deleted'),
                                gettextCatalog.getString('Your setting is deleted!'));
                            successCb();
                        }, function(err) {
                            CoreService.toastError(
                                gettextCatalog.getString('Error deleting setting'),
                                gettextCatalog.getString('Your setting is not deleted! ') + err);
                            cancelCb();
                        });
                    },
                    function() {
                        cancelCb();
                    }
                );
            };



            this.getFormFields = function() {
                var form = [{
                        key: 'name',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: '名字:',
                            required: false,
                            placeholder: '请输入名字'
                        }
                    },
                    {
                        key: 'number',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: '编号:',
                            required: false,
                            placeholder: '请输入编号'
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址：',
                            required: false,
                            placeholder: '请输入地址'
                        }
                    },
                    {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: false,
                            placeholder: '请输入经度'
                        }
                    },
                    {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: false,
                            placeholder: '请输入纬度'
                        }
                    }, {
                        key: 'state',
                        type: 'select',
                        templateOptions: {
                            label: '状态',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "state"
                        },
                        controller: function($scope, State) {
                            State.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    },
                    {
                        key: 'voicebroadcast',
                        type: 'input',
                        templateOptions: {
                            label: '语音播报:',
                            required: true,
                            placeholder: '请输入语音播报'
                        }
                    }, {
                        key: 'unicast',
                        type: 'input',
                        templateOptions: {
                            label: '单点广播:',
                            required: true,
                            placeholder: '请输入单点广播'
                        }
                    }, {
                        key: 'cameraid',
                        type: 'input',
                        templateOptions: {
                            label: '摄像头id:',
                            required: true,
                            placeholder: '请输入摄像头id'
                        }
                    }, {
                        key: 'personCharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true,
                            placeholder: '请输入负责人'
                        }
                    }, {
                        key: 'contactNumber',
                        type: 'input',
                        templateOptions: {
                            label: '电话:',
                            required: true,
                            placeholder: '请输入电话'
                        },
                        validators: {
                            phone: {
                                expression: function(viewValue, modelValue) {
                                    var value = modelValue || viewValue;
                                    return /^([0-9]|[-])+$/g.test(value);
                                },
                                message: '$viewValue + " 不是正确的电话格式"'
                            }
                        }


                    }, {
                        key: 'affiliatedInstitution',
                        type: 'select',
                        templateOptions: {
                            label: '所属机构',
                            required: true,
                            options: [],
                            valueProp: "id",
                            labelProp: "affiliatedInstitution"
                        },
                        controller: function($scope, AffiliatedInstitution) {
                            AffiliatedInstitution.find().$promise.then(function(value) {
                                $scope.to.options = value;
                                return value;
                            });
                        }
                    }, {
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注:',
                            required: false,
                            placeholder: '请输入备注'
                        }
                    }
                ];
                return form;
            };

        });

})();