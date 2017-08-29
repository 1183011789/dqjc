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
                console.log("添加-------", JSON.stringify(keypersion));
                // if (keypersion.idnumber.length !== "18") {
                //     CoreService.alertWarning('提示', '身份证格式不正确');
                //     return;
                // }
                if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(keypersion.idnumber))) {
                    CoreService.alertWarning('提示', '身份证号格式输入有误');
                    return;
                }
                if (!(/^1[34578]\d{9}$/.test(keypersion.contactnumber))) {
                    CoreService.alertWarning('提示', '联系人手机号格式输入有误');
                    return;
                }
                if (!(/^1[34578]\d{9}$/.test(keypersion.familycontactnumber))) {
                    CoreService.alertWarning('提示', '家庭联系人电话输入有误');
                    return;
                }
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

            this.deleteMultiple = function(ids, successCb, cancelCb) {
                console.log('=========' + ids);
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        KeyPersion.deleteMultiple({ multiple: ids }, function() {
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
                            required: true,
                            placeholder: '请输入名字',
                        }
                    },
                    {
                        key: 'gender',
                        type: 'select',
                        templateOptions: {
                            label: '性别:',
                            required: true,
                            placeholder: '请选择性别',
                            options: [
                                { name: '男', value: '1' },
                                { name: '女', value: '0' },
                            ],
                        }
                    },
                    {
                        key: 'age',
                        type: 'input',
                        templateOptions: {
                            label: '年龄:',
                            required: true,
                            placeholder: '请输入年龄',
                        }
                    },
                    {
                        key: 'height',
                        type: 'input',
                        templateOptions: {
                            label: '身高:',
                            required: false,
                            placeholder: '请输入身高',
                        }
                    }, {
                        key: 'weight',
                        type: 'input',
                        templateOptions: {
                            label: '体重:',
                            required: false,
                            placeholder: '请输入体重',
                        }
                    }, {
                        key: 'occupation',
                        type: 'input',
                        templateOptions: {
                            label: '职业:',
                            required: false,
                            placeholder: '请输入职业',
                        }
                    }, {
                        key: 'idnumber',
                        type: 'input',
                        templateOptions: {
                            label: '身份证号:',
                            required: true,
                            placeholder: '请输入身份证号',
                        }
                    }, {
                        key: 'contactnumber',
                        type: 'input',
                        templateOptions: {
                            label: '联系电话:',
                            required: false,
                            placeholder: '请输入联系电话',
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
                        key: 'residencenow',
                        type: 'input',
                        templateOptions: {
                            label: '现居住地址:',
                            required: false,
                            placeholder: '请输入现居住地址',
                        }
                    }, {
                        key: 'familysize',
                        type: 'input',
                        templateOptions: {
                            label: '家庭人数:',
                            required: false,
                            placeholder: '请输入家庭人数',
                        }
                    }, {
                        key: 'familymemberone',
                        type: 'input',
                        templateOptions: {
                            label: '家庭成员1:',
                            required: false,
                            placeholder: '请输入家庭成员1',
                        }
                    }, {
                        key: 'familymembertwo',
                        type: 'input',
                        templateOptions: {
                            label: '家庭成员2:',
                            required: false,
                            placeholder: '请输入家庭成员2',
                        }
                    }, {
                        key: 'familyaddress',
                        type: 'input',
                        templateOptions: {
                            label: '家庭住址:',
                            required: false,
                            placeholder: '请输入家庭住址',
                        }
                    }, {
                        key: 'familycontactnumber',
                        type: 'input',
                        templateOptions: {
                            label: '家庭联系电话:',
                            required: false,
                            placeholder: '请输入家庭联系电话',
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
                        key: 'remark',
                        type: 'input',
                        templateOptions: {
                            label: '备注:',
                            required: false,
                            placeholder: '请输入备注',
                        }
                    }
                ];
                return form;
            };

        });

})();