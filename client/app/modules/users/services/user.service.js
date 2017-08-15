(function () {
  'use strict';
  angular
    .module('com.module.users')
    .service('UserService', function ($state, CoreService, User, gettextCatalog) {

      this.find = function () {
        return User.find().$promise;
      };

      this.findById = function (id) {
        return User.findOne({
          filter: {
            where: {
              id: id
            },
            include:'roles'
          }
      }).$promise;
      };

      this.upsert = function (user) {
        return User.upsert(user).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('User saved'),
              gettextCatalog.getString('Your user is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error saving user '),
              gettextCatalog.getString('This user could no be saved: ' + err)
            );
          }
        );
      };
      
      this.create = function (user, successCb, cancelCb) {
        User.create(user,function(){
          CoreService.toastSuccess(
              gettextCatalog.getString('User saved'),
              gettextCatalog.getString('Your user is safe with us!')
            );
          successCb();
        },function(err){
          CoreService.toastError(
              gettextCatalog.getString('Error saving user '),
              gettextCatalog.getString('This user could no be saved: ' + err)
            );
          cancelCb();
        });
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            User.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('User deleted'),
                gettextCatalog.getString('Your user is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting user'),
                gettextCatalog.getString('Your user is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };


      this.getFormFields = function (formType) {

        if (formType === 'password') {
          var f = [
            {
              key: 'password',
              type: 'input',
              templateOptions: {
                type: 'password',
                label: '新密码',
                placeholder: '请输入最少6个字符的新密码',
                required: true,
                minlength: 6
              }
            },
            {
              key: 'confirmPassword',
              type: 'input',
              optionsTypes: ['matchField'],
              model: this.confirmationModel,
              templateOptions: {
                type: 'password',
                label: '确认密码',
                placeholder: '请输入确认密码',
                required: true
              },
              data: {
                fieldToMatch: 'password',
                modelToMatch: this.model
              }
            }
          ];

          return f;
        }

        var form = [
          {
            key: 'username',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Username'),
              required: true
            }
          },
          {
            key: 'email',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Email'),
              required: true
            }
          },
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              label: '姓名',
              required: true
            }
          }
        ];
        if (formType === 'add') {
          form.push({
            key: 'password',
            type: 'input',
            templateOptions: {
              type: 'password',
              label: gettextCatalog.getString('Password'),
              placeholder: '请输入最少6个字符的新密码',
              required: true,
              minlength: 6
            }
          });
          form.push({
              key: 'confirmPassword',
              type: 'input',
              optionsTypes: ['matchField'],
              model: this.confirmationModel,
              templateOptions: {
                type: 'password',
                label: '确认密码',
                placeholder: '请输入确认密码',
                required: true
              },
              data: {
                fieldToMatch: 'password',
                modelToMatch: this.model
              }
            });
        }

        return form;
      };

    });

})();
