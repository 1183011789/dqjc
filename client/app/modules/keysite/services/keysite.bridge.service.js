(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('BridgeService', function($state, CoreService, Bridge, gettextCatalog) {

            this.find = function() {
                return Bridge.find().$promise;
            };

            this.findById = function(id) {
                return Bridge.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(bridge) {
                return Bridge.upsert(bridge).$promise
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
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        Bridge.deleteMultiple({ multiple: ids }, function() {
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

            this.delete = function(id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        Bridge.deleteById({ id: id }, function() {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('deleted'),
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
                        key: 'brdgenumber',
                        type: 'input',
                        templateOptions: {
                            label: '编号',
                            required: true
                        }
                    },
                    {
                        key: 'bridgename',
                        type: 'input',
                        templateOptions: {
                            label: '名称',
                            required: true
                        }
                    },
                    {
                        key: 'bridgeclass',
                        type: 'input',
                        templateOptions: {
                            label: '类别',
                            required: true
                        }
                    },
                    {
                        key: 'bridgestructure',
                        type: 'input',
                        templateOptions: {
                            label: '结构',
                            required: true
                        }
                    },
                    {
                        key: 'bridgematerial',
                        type: 'input',
                        templateOptions: {
                            label: '材料',
                            required: true
                        }
                    },
                    {
                        key: 'brgdgelength',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true
                        }
                    },
                    {
                        key: 'bridgehight',
                        type: 'input',
                        templateOptions: {
                            label: '高度',
                            required: true
                        }
                    },
                    {
                        key: 'bridgealignment',
                        type: 'input',
                        templateOptions: {
                            label: '桥梁线形',
                            required: true
                        }
                    }, {
                        key: 'startendmileage',
                        type: 'input',
                        templateOptions: {
                            label: '起始里程',
                            required: true
                        }
                    }

                    , {
                        key: 'centermileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程',
                            required: true
                        }
                    }

                    , {
                        key: 'railwayhighwaypublic',
                        type: 'input',
                        templateOptions: {
                            label: 'railwayhighwaypublic',
                            required: true
                        }
                    }

                    , {
                        key: 'crosshighway',
                        type: 'input',
                        templateOptions: {
                            label: '高路交叉',
                            required: true
                        }
                    }

                    , {
                        key: 'crosswatersystem',
                        type: 'input',
                        templateOptions: {
                            label: '十字水系',
                            required: true
                        }
                    }

                    , {
                        key: 'crossbrooks',
                        type: 'input',
                        templateOptions: {
                            label: '交叉',
                            required: true
                        }
                    }

                    , {
                        key: 'crossother',
                        type: 'input',
                        templateOptions: {
                            label: 'crossother',
                            required: true
                        }
                    }

                    , {
                        key: 'guardian',
                        type: 'input',
                        templateOptions: {
                            label: '监护人',
                            required: true
                        }
                    }

                    , {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址',
                            required: true
                        }
                    }

                    , {
                        key: 'localpolicestation',
                        type: 'input',
                        templateOptions: {
                            label: '当地派出所',
                            required: true
                        }
                    }

                    , {
                        key: 'admimdepartment',
                        type: 'input',
                        templateOptions: {
                            label: '行政部',
                            required: true
                        }
                    }

                    , {
                        key: 'personincharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人',
                            required: true
                        }
                    }

                    , {
                        key: 'affiliatedinstitution',
                        type: 'input',
                        templateOptions: {
                            label: 'affiliatedinstitution',
                            required: true
                        }
                    }

                    , {
                        key: 'brdgeremark',
                        type: 'input',
                        templateOptions: {
                            label: '备注',
                            required: true
                        }
                    }
                ];
                return form;
            };

        });

})();