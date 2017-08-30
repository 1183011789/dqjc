(function() {
    'use strict';
    angular
        .module('com.module.road')
        .service('RoadService', function($state, CoreService,ClassIfication, Rode,Administration, gettextCatalog) {
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
                var k=parseInt(road.K);
                var m=parseInt(road.M);
                var num=k*1000+m;
                road.startendmileage=num;
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

            this.deleteById = function(id, successCb, cancelCb) {
              console.log('====='+id);
                CoreService.confirm(
                    gettextCatalog.getString('Are you sure?'),
                    gettextCatalog.getString('Deleting this cannot be undone'),
                    function() {
                        Rode.deleteById({ id: id }, function() {
                            CoreService.toastSuccess(
                                gettextCatalog.getString('Setting deleted'),
                                gettextCatalog.getString('Your setting is deleted!'));
                            successCb();
                        },
                        function(err) {
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
              required: true,
              placeholder: '请输入铁路名'
            }
          },
          {
            key: 'classIfication',
            type: 'select',
            templateOptions: {
            label: '分类',
            required: true,
            options: [],
            valueProp: "id",
            labelProp: "classIfication"
            },
            controller: function($scope, ClassIfication) {
                ClassIfication.find().$promise.then(function(value) {
                console.log("分类--", JSON.stringify(value));
                $scope.to.options = value;
                return value;
                });
            }
          },
          // {
          //   key: 'startendmileage',
          //   type: 'input',
          //   templateOptions: {
          //     label: '起始里程',
          //     required: true,
          //     placeholder: '请输入起始里程'
          //   }
          // },
          {
            key: 'K',
            type: 'input',
            templateOptions: {
              label: '起始里程K',
              required: true,
              placeholder: '请输入起始里程的千米数'
            }
          },{
            key: 'M',
            type: 'input',
            templateOptions: {
              label: '起始里程M',
              required: true,
              placeholder: '请输入起始里程的百米数'
            }
          },
          {
            key: 'rodelenth',
            type: 'input',
            templateOptions: {
              label: '长度',
              required: true,
              placeholder: '请输入长度'
            }
          },
         {
            key: 'administration',
            type: 'select',
            templateOptions: {
            label: '隶属铁路局',
            required: true,
            options: [],
            valueProp: "id",
            labelProp: "administration"
            },
            controller: function($scope, Administration) {
                Administration.find().$promise.then(function(value) {
                console.log("隶属铁路局--", JSON.stringify(value));
                $scope.to.options = value;
                return value;
                });
            }
          },
          {
            key: 'stationnumber',
            type: 'input',
            templateOptions: {
              label: '车站数量',
              required: true,
              placeholder: '请输入车站数量'
            }
          },
          {
            key: 'bridgenumber',
            type: 'input',
            templateOptions: {
              label: '桥梁数量',
              required: true,
              placeholder: '请输入桥梁数量'
            }
          },
          {
            key: 'tunnelnumber',
            type: 'input',
            templateOptions: {
              label: '隧道数量',
              required: true,
              placeholder: '请输入隧道数量'
            }
          },
          {
            key: 'levelcrossingnumber',
            type: 'input',
            templateOptions: {
              label: '道口数量',
              required: true,
              placeholder: '请输入道口数量'
            }
          },
          {
            key: 'culvertnumber',
            type: 'input',
            templateOptions: {
              label: '涵洞数量',
              required: true,
              placeholder: '请输入道口数量'
            }
          },{
            key: 'Kwamerailwaynumber',
            type: 'input',
            templateOptions: {
              label: '跨铁路数',
              required: true,
              placeholder: '请输入跨铁路数'
            }
          },
          {
            key: 'remark1',
            type: 'input',
            templateOptions: {
              label: '备注',
              required: false,
              placeholder: '请输入备注'
            }
          }

        ];
        return form;
      };
  

        });

})();
