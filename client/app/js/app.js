(function() {
    'use strict';
    /**
     * @ngdoc overview
     * @name loopbackApp
     * @description
     * # loopbackApp
     *
     * Main module of the application.
     */
    angular
        .module('loopbackApp', [
            'angular-loading-bar',
            'angular.filter',
            'angularBootstrapNavTree',
            'angularFileUpload',
            'btford.markdown',
            'oitozero.ngSweetAlert',
            'config',
            'formly',
            'formlyBootstrap',
            'lbServices',
            'monospaced.elastic',
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngLocale',
            'ngSanitize',
            'ngTouch',
            'ui.bootstrap',
            'ui.codemirror',
            'ui.grid',
            'ui.router',
            'toasty',
            'autofields',
            'gettext',
            'angular-underscore/filters',
            'schemaForm',
            'ui.select',
            'permission',
            'permission.ui',
            'com.module.core',
            'com.module.about',
            'com.module.settings',
            'com.module.users',
            'com.module.sandbox',
            'com.module.advertisement',
            'com.module.keypersion',
            'com.module.monitoring',
            'com.module.emergencyaccess',
            'com.module.fenceinfo',
            'com.module.securityequipment',
            'com.module.apropagandapoint',
            'com.module.institutionaiteam'
        ])
        .run(function($rootScope, $cookies, gettextCatalog, $q) {

            // //Fix "$q.resolve is not a function"
            // $q.resolve = $q.when;

            $rootScope.locales = {
                'en': {
                    lang: 'en',
                    country: 'US',
                    name: 'English'
                },
                'zh_CN': {
                    lang: 'zh_CN',
                    country: 'CN',
                    name: '中文'
                }
            };

            /*
            var lang = $cookies.lang || navigator.language || navigator.userLanguage;

            $rootScope.locale = $rootScope.locales[lang];

            if (angular.isUndefined($rootScope.locale)) {
              $rootScope.locale = $rootScope.locales[lang];
              if (angular.isUndefined($rootScope.locale)) {
                $rootScope.locale = $rootScope.locales['en'];
              }
            }
            */
            gettextCatalog.setCurrentLanguage( /*$rootScope.locale.lang*/ 'zh_CN');
        }).run(function(RoleStore, User, RoleMapping, $q) {

            RoleStore.defineRole('ADMIN', function(stateParams) {
                var deferred = $q.defer();
                User.getCurrent(function(user) {
                    RoleMapping.findOne({
                        filter: {
                            where: {
                                principalId: user.id
                            },
                            include: 'role'
                        }
                    }, function(roleMapping) {
                        if (roleMapping.role.name === 'admin') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }, function(err) {
                        console.log(err);
                        deferred.reject();
                    });
                }, function(err) {
                    console.log(err);
                    deferred.reject();
                });

                return deferred.promise;
            });

        })
        .run(function(formlyConfig) {
            /*
             ngModelAttrs stuff
             */
            var ngModelAttrs = {};

            function camelize(string) {
                string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                    return chr ? chr.toUpperCase() : '';
                });
                // Ensure 1st char is always lowercase
                return string.replace(/^([A-Z])/, function(match, chr) {
                    return chr ? chr.toLowerCase() : '';
                });
            }

            /*
             timepicker
             */
            ngModelAttrs = {};

            // attributes
            angular.forEach([
                'meridians',
                'readonly-input',
                'mousewheel',
                'arrowkeys'
            ], function(attr) {
                ngModelAttrs[camelize(attr)] = { attribute: attr };
            });

            // bindings
            angular.forEach([
                'hour-step',
                'minute-step',
                'show-meridian'
            ], function(binding) {
                ngModelAttrs[camelize(binding)] = { bound: binding };
            });

            formlyConfig.setType({
                name: 'timepicker',
                template: '<div uib-timepicker ng-model="model[options.key]"></div>',
                wrapper: [
                    'bootstrapLabel',
                    'bootstrapHasError'
                ],
                defaultOptions: {
                    ngModelAttrs: ngModelAttrs,
                    templateOptions: {
                        timepickerOptions: {}
                    }
                }
            });

            formlyConfig.setType({
                name: 'datepicker',
                template: '<div uib-datepicker ng-model="model[options.key]" ></div>',
                wrapper: [
                    'bootstrapLabel',
                    'bootstrapHasError'
                ],
                defaultOptions: {
                    ngModelAttrs: ngModelAttrs,
                    templateOptions: {
                        datepickerOptions: {}
                    }
                }
            });

            formlyConfig.setType({
                name: 'matchField',
                apiCheck: function() {
                    return {
                        data: {
                            fieldToMatch: formlyExampleApiCheck.string
                        }
                    }
                },
                apiCheckOptions: {
                    prefix: 'matchField type'
                },
                defaultOptions: function matchFieldDefaultOptions(options) {
                    return {
                        extras: {
                            validateOnModelChange: true
                        },
                        expressionProperties: {
                            'templateOptions.disabled': function(viewValue, modelValue, scope) {
                                var matchField = find(scope.fields, 'key', options.data.fieldToMatch);
                                if (!matchField) {
                                    throw new Error('Could not find a field for the key ' + options.data.fieldToMatch);
                                }
                                var model = options.data.modelToMatch || scope.model;
                                var originalValue = model[options.data.fieldToMatch];
                                var invalidOriginal = matchField.formControl && matchField.formControl.$invalid;
                                return !originalValue || invalidOriginal;
                            }
                        },
                        validators: {
                            fieldMatch: {
                                expression: function(viewValue, modelValue, fieldScope) {
                                    var value = modelValue || viewValue;
                                    var model = options.data.modelToMatch || fieldScope.model;
                                    return value === model[options.data.fieldToMatch];
                                },
                                message: options.data.matchFieldMessage || '"Must match"'
                            }
                        }
                    };

                    function find(array, prop, value) {
                        var foundItem;
                        array.some(function(item) {
                            if (item[prop] === value) {
                                foundItem = item;
                            }
                            return !!foundItem;
                        });
                        return foundItem;
                    }
                }
            });
        });

})();