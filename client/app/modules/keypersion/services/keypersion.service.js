(function() {
    'use strict';
    angular
        .module('com.module.keypersion')
        .service('KeypersionService', function($state, CoreService, KeyPersion, gettextCatalog) {
            console.log("广播警示柱--1--");
            this.find = function(result) {
                console.log("广播警示柱--2--");
                return KeyPersion.find().$promise;
            };

            this.findById = function(id) {
                return KeyPersion.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(keypersion) {
                console.log("添加-------");
                return KeyPersion.upsert(keypersion).$promise
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
                        KeyPersion.deleteById({ id: id }, function() {
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
                            label: '名字:',
                            required: true
                        }
                    },
                    {
                        key: 'gender',
                        type: 'input',
                        templateOptions: {
                            label: '性别:',
                            required: true
                        }
                    },
                    {
                        key: 'age',
                        type: 'input',
                        templateOptions: {
                            label: '年龄:',
                            required: true
                        }
                    },
                    {
                        key: 'height',
                        type: 'input',
                        templateOptions: {
                            label: '身高:',
                            required: true
                        }
                    }, {
                        key: 'weight',
                        type: 'input',
                        templateOptions: {
                            label: '体重:',
                            required: true
                        }
                    }, {
                        key: 'occupation',
                        type: 'input',
                        templateOptions: {
                            label: '职业:',
                            required: true
                        }
                    }, {
                        key: 'idnumber',
                        type: 'input',
                        templateOptions: {
                            label: '身份证号:',
                            required: true
                        }
                    }, {
                        key: 'contactnumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话:',
                            required: true
                        }
                    }, {
                        key: 'residencenow',
                        type: 'input',
                        templateOptions: {
                            label: '现居住地址:',
                            required: true
                        }
                    }, {
                        key: 'familysize',
                        type: 'input',
                        templateOptions: {
                            label: '家庭人数:',
                            required: true
                        }
                    }, {
                        key: 'familymemberone',
                        type: 'input',
                        templateOptions: {
                            label: '家庭成员1:',
                            required: true
                        }
                    }, {
                        key: 'familymembertwo',
                        type: 'input',
                        templateOptions: {
                            label: '家庭成员2:',
                            required: true
                        }
                    }, {
                        key: 'familyaddress',
                        type: 'input',
                        templateOptions: {
                            label: '家庭住址:',
                            required: true
                        }
                    }, {
                        key: 'familycontactnumber',
                        type: 'input',
                        templateOptions: {
                            label: '家庭联系电话:',
                            required: true
                        }
                    }, {
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