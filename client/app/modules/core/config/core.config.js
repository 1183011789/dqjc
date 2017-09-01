(function() {
    'use strict';
    angular
        .module('com.module.core')
        .config([
            'cfpLoadingBarProvider', 'formlyConfigProvider',
            function(cfpLoadingBarProvider, formlyConfigProvider) {
                cfpLoadingBarProvider.includeSpinner = false;
                formlyConfigProvider.setType([{
                        name: 'input',
                        templateUrl: 'input-template.html'
                    },
                    {
                        name: 'checkbox',
                        templateUrl: 'checkbox-template.html'
                    }
                ]);
                formlyConfigProvider.setWrapper([{
                        template: [
                            '<div class="formly-template-wrapper form-group"',
                            'ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
                            '<label for="{{::id}}">{{options.templateOptions.label}} {{options.templateOptions.required ? \'*\' : \'\'}}</label>',
                            '<formly-transclude></formly-transclude>',
                            '<div class="validation"',
                            'ng-if="options.validation.errorExistsAndShouldBeVisible"',
                            'ng-messages="options.formControl.$error">',
                            '<div ng-messages-include="error-messages"></div>',
                            '<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
                            '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
                            '</div>',
                            '</div>',
                            '</div>'
                        ].join(' '),
                        types: 'input'
                    },
                    {
                        template: [
                            '<div class="checkbox formly-template-wrapper-for-checkboxes form-group">',
                            '<label for="{{::id}}">',
                            '<formly-transclude></formly-transclude>',
                            '</label>',
                            '</div>'
                        ].join(' '),
                        types: 'checkbox'
                    },
                    {
                        template: [
                            '<div class="checkbox formly-template-wrapper-for-checkboxes form-group">',
                            '<label for="{{::id}}">',
                            '<formly-transclude></formly-transclude>',
                            '</label>',
                            '</div>'
                        ].join(' '),
                        types: 'checkbox'
                    }
                ]);
            }
        ])
        .run(function($rootScope, Setting, gettextCatalog) {

            // $rootScope.$on('$stateChangePermissionStart', function(event, toState, toParams, options) {
            //   console.log(event);
            //   console.log(toState);
            //   console.log(toParams);
            //   console.log(options);
            // });
            // $rootScope.$on('$stateChangePermissionAccepted', function(event, toState, toParams, options) {
            //   console.log(event);
            //   console.log(toState);
            //   console.log(toParams);
            //   console.log(options);
            // });
            // $rootScope.$on('$stateChangePermissionDenied', function(event, toState, toParams, options) {
            //   console.log(event);
            //   console.log(toState);
            //   console.log(toParams);
            //   console.log(options);
            // });

            // Left Sidemenu
            $rootScope.menu = [];

            // Add Sidebar Menu
            $rootScope.addMenu = function(name, uisref, icon, permissionAccess) {
                $rootScope.menu.push({
                    name: name,
                    sref: uisref,
                    icon: icon,
                    permissionAccess: permissionAccess || false
                });
            };

            // Add Menu Dashboard
            // $rootScope.addMenu(gettextCatalog.getString('Dashboard'), 'app.home',
            //   'fa-dashboard');

            // Dashboard
            $rootScope.dashboardBox = [];

            // Add Dashboard Box
            $rootScope.addDashboardBox = function(name, color, icon, quantity, href) {
                $rootScope.dashboardBox.push({
                    name: name,
                    color: color,
                    icon: icon,
                    quantity: quantity,
                    href: href
                });
            };

            // Get Settings for Database
            $rootScope.setSetting = function(key, value) {

                Setting.find({
                    filter: {
                        where: {
                            key: key
                        }
                    }
                }, function(data) {

                    if (data.length) {
                        data[0].value = value;
                        data[0].$save();
                    } else {
                        Setting.create({
                            key: key,
                            value: value
                        }, function(data) {
                            console.log(data);
                        });
                    }
                    $rootScope.loadSettings();
                });
            };

            // Load Settings blank
            $rootScope.settings = {};

            // Get Settings for Loopback Service
            $rootScope.loadSettings = function() {
                Setting.find(function(settings) {
                    $rootScope.settings.data = settings;

                    angular.forEach(settings, function(item) {
                        $rootScope.settings[item.key] = item.value;
                    });

                    $rootScope.addDashboardBox(gettextCatalog.getString('About'), 'bg-teal',
                        'ion-information', 'v' + $rootScope.settings.appVersion, 'app.about.index', 0);

                });
            };

            $rootScope.loadSettings();

        })
        .config(function(LightboxProvider) {
            LightboxProvider.getImageCaption = function(image) {
                if (image.container === 'markhere-record') {
                    return null;
                }
                return image.name;
            };
            // set a custom template
            LightboxProvider.templateUrl = 'modules/core/views/elements/lightbox.html';

            // increase the maximum display height of the image
            LightboxProvider.calculateImageDimensionLimits = function(dimensions) {
                return {
                    'maxWidth': dimensions.windowWidth >= 768 ? // default
                        dimensions.windowWidth - 92 : dimensions.windowWidth - 52,
                    'maxHeight': 1600 // custom
                };
            };

            // the modal height calculation has to be changed since our custom template is
            // taller than the default template
            LightboxProvider.calculateModalDimensions = function(dimensions) {
                var width = Math.max(400, dimensions.imageDisplayWidth + 32);

                if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
                    width = 'auto';
                }

                return {
                    'width': width, // default
                    'height': 'auto' // custom
                };
            };

        });

})();