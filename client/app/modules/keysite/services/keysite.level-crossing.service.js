(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('LevelCrossingService', function($state, CoreService, LevelCrossing, gettextCatalog) {

            this.findById = function(id) {
                return LevelCrossing.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(levelCrossing) {
                return LevelCrossing.upsert(levelCrossing).$promise
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
                        LevelCrossing.deleteMultiple({ multiple: ids }, function() {
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
                        key: 'levelcrossname',
                        type: 'input',
                        templateOptions: {
                            label: '名称',
                            required: true
                        }
                    },
                    {
                        key: 'centermileage',
                        type: 'input',
                        templateOptions: {
                            label: '中心里程',
                            required: true
                        }
                    },
                    {
                        key: 'crossproperty',
                        type: 'input',
                        templateOptions: {
                            label: '道口性质',
                            required: true
                        }
                    },
                    {
                        key: 'crossalignment',
                        type: 'input',
                        templateOptions: {
                            label: '行别',
                            required: true
                        }
                    },
                    {
                        key: 'guardian',
                        type: 'input',
                        templateOptions: {
                            label: '守护情况',
                            required: true
                        }
                    },
                    {
                        key: 'inspectionstatus',
                        type: 'input',
                        templateOptions: {
                            label: '检查情况',
                            required: true
                        }
                    },
                    {
                        key: 'infinitelyhigh',
                        type: 'input',
                        templateOptions: {
                            label: '有无限高',
                            required: true
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址',
                            required: true
                        }
                    },
                    {
                        key: 'localpolicestation',
                        type: 'input',
                        templateOptions: {
                            label: '所属地方派出所',
                            required: true
                        }
                    },
                    {
                        key: 'personincharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人',
                            required: true
                        }
                    },
                    {
                        key: 'contactnumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话',
                            required: true
                        }
                    },
                    {
                        key: 'affiliatedinstitution',
                        type: 'input',
                        templateOptions: {
                            label: '所属机构',
                            required: true
                        }
                    },
                    {
                        key: 'remark',
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