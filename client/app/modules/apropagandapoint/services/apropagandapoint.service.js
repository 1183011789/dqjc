(function() {
    'use strict';
    angular
        .module('com.module.apropagandapoint')
        .service('APropagandaPointService', function($state, CoreService, APropagandaPoint, gettextCatalog) {

            this.count = function() {
                console.log("条数-----");
                return APropagandaPoint.count().$promise;
            };
            this.find = function(result) {
                return APropagandaPoint.find().$promise;
            };

            this.findById = function(id) {
                return APropagandaPoint.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(apropagandapoint) {
                console.log("添加-------");
                return APropagandaPoint.upsert(apropagandapoint).$promise
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

            this.delete = function(id, successCb, cancelCb) {
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        APropagandaPoint.deleteById({ id: id }, function() {
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
                            label: '名称:',
                            required: true
                        }
                    },
                    {
                        key: 'address',
                        type: 'input',
                        templateOptions: {
                            label: '地址:',
                            required: true
                        }
                    },
                    {
                        key: 'lng',
                        type: 'input',
                        templateOptions: {
                            label: '经度:',
                            required: true
                        }
                    },
                    {
                        key: 'lat',
                        type: 'input',
                        templateOptions: {
                            label: '纬度:',
                            required: true
                        }
                    }, {
                        key: 'number',
                        type: 'input',
                        templateOptions: {
                            label: '编号:',
                            required: true
                        }
                    },
                    // {
                    //     key: 'images',
                    //     type: 'input',
                    //     templateOptions: {
                    //         label: '图片:',
                    //         required: true
                    //     }
                    // },
                    {
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注:',
                            required: true
                        }
                    }
                ];
                return form;
            };
        });
})();