(function() {
    'use strict';
    angular
        .module('com.module.institutionaiteam')
        .service('InstitutionaIteamService', function(CoreService, InstitutionalTeam, gettextCatalog) {
            this.find = function(result) {
                console.log("广播警示柱--2--");
                return InstitutionalTeam.find().$promise;
            };

            this.findById = function(id) {
                return InstitutionalTeam.findById({
                    id: id
                }).$promise;
            };

            this.deleteAll = function(ids, successCb, cancelCb) {
                console.log("要删除的id" + ids);
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        // InstitutionalTeam.destroyAll({ where: { id: { inq: ids } } }, function(error, info) {
                        //     CoreService.toastSuccess(
                        //         gettextCatalog.getString('Setting deleted'),
                        //         gettextCatalog.getString('Your setting is deleted!'));
                        //     successCb();
                        // });
                        //   , function(error) {
                        //     CoreService.toastError(
                        //         gettextCatalog.getString('Error deleting setting'),
                        //         gettextCatalog.getString('Your setting is not deleted! ') + err);
                        //     cancelCb();
                        // }
                    },
                    function() {
                        cancelCb();
                    }
                );
            };

            this.upsert = function(institutionaiteam) {
                console.log("添加-------");
                return InstitutionalTeam.upsert(institutionaiteam).$promise
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
                        InstitutionalTeam.deleteById({ id: id }, function() {
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
                            label: '机构名:',
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
                        key: 'personcharge',
                        type: 'input',
                        templateOptions: {
                            label: '负责人:',
                            required: true
                        }
                    }, {
                        key: 'admimdepartment',
                        type: 'input',
                        templateOptions: {
                            label: '管理部门:',
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
                        key: 'affiliatedinstitution',
                        type: 'input',
                        templateOptions: {
                            label: '所属机构:',
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