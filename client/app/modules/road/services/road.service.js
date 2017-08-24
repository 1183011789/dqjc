(function() {
    'use strict';
    angular
        .module('com.module.road')
        .service('RoadService', function($state, CoreService, Rode, gettextCatalog) {
            console.log("路况信息--1--");
            this.count = function() {
                console.log("条数-----");
                return Rode.count().$promise;
            };
           
            this.find = function(filter) {
                var filter = filter || {};
                return Rode.find(filter).$promise;
            };


            this.findById = function(id) {
                return Rode.findById({
                    id: id
                }).$promise;
            };

            this.upsert = function(road) {
                return Rode.upsert(road).$promise
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
                        Rode.deleteById({ id: id }, function() {
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

      this.getFormFields = function () {
        var form = [
          {
            key: 'rodename',
            type: 'input',
            templateOptions: {
              label: '铁路名',
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
            key: 'startendmileage',
            type: 'input',
            templateOptions: {
              label: '起始里程',
              required: true
            }
          },
          {
            key: 'rodelenth',
            type: 'input',
            templateOptions: {
              label: '长度',
              required: true
            }
          },
          {
            key: 'railwayadministrat',
            type: 'input',
            templateOptions: {
              label: '隶属铁路局',
              required: true
            }
          },
          {
            key: 'stationnumber',
            type: 'input',
            templateOptions: {
              label: '车站',
              required: true
            }
          },
          {
            key: 'bridgenumber',
            type: 'input',
            templateOptions: {
              label: '桥梁',
              required: true
            }
          },
          {
            key: 'tunnelnumber',
            type: 'input',
            templateOptions: {
              label: '隧道',
              required: true
            }
          },
          {
            key: 'levelcrossingnumber',
            type: 'input',
            templateOptions: {
              label: '道口',
              required: true
            }
          },
          {
            key: 'culvertnumber',
            type: 'input',
            templateOptions: {
              label: '涵洞',
              required: true
            }
          },{
            key: 'Kwamerailwaynumber',
            type: 'input',
            templateOptions: {
              label: '跨铁路数',
              required: true
            }
          },
          {
            key: 'remark1',
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
