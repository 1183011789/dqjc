(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .service('CulvertService', function($state, CoreService, Culvert, gettextCatalog) {

            this.find = function() {
                return Culvert.find().$promise;
            };

            this.findById = function(id) {
                return Culvert.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(culvert) {
                return Culvert.upsert(culvert).$promise
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
                        Culvert.deleteMultiple({ multiple: ids }, function() {
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
                        Culvert.deleteById({ id: id }, function() {
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
                        key: 'culvertnumber',
                        type: 'input',
                        templateOptions: {
                            label: '编号',
                            required: true
                        }
                    },
                    {
                        key: 'culvertname',
                        type: 'input',
                        templateOptions: {
                            label: '涵洞名',
                            required: true
                        }
                    },
                    {
                        key: 'classification',
                        type: 'input',
                        templateOptions: {
                            label: '分类',
                            required: true
                        }
                    },
                    {
                        key: 'culverlength',
                        type: 'input',
                        templateOptions: {
                            label: '长度',
                            required: true
                        }
                    },
                    {
                        key: 'culverwidth',
                        type: 'input',
                        templateOptions: {
                            label: '宽度',
                            required: true
                        }
                    },
                    {
                        key: 'culverheight',
                        type: 'input',
                        templateOptions: {
                            label: '高度',
                            required: true
                        }
                    },
                    {
                        key: 'culverradius',
                        type: 'input',
                        templateOptions: {
                            label: '半径',
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
                        key: 'culverfunction',
                        type: 'input',
                        templateOptions: {
                            label: '功能',
                            required: true
                        }
                    },
                    {
                        key: 'istherewater',
                        type: 'input',
                        templateOptions: {
                            label: '是否积水',
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
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度',
                            required: true
                        }
                    },
                    {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度',
                            required: true
                        }
                    },
                    {
                        key: 'explain',
                        type: 'input',
                        templateOptions: {
                            label: '说明',
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