'use strict';

// to enable these logs set `DEBUG=boot:01-load-settings` or `DEBUG=boot:*`
var log = require('debug')('boot:01-load-settings');

module.exports = function(app) {

    var Setting = app.models.Setting;

    function loadDefaultSettings() {
        console.error('Creating default settings');

        var settings = [{
            type: 'string',
            key: 'appName',
            value: 'MZBaseServer'
        }, {
            type: 'select',
            key: 'appTheme',
            value: 'skin-blue',
            options: [
                'skin-blue',
                'skin-black'
            ]
        }, {
            type: 'select',
            key: 'appLayout',
            value: 'fixed',
            options: [
                'skin-blue',
                'not-fixed'
            ]
        }, {
            type: 'boolean',
            key: 'registrationEnabled',
            value: true
        }, {
            type: 'string',
            key: 'appVersion',
            value: '0.0.1'
        }];

        settings.forEach(function(setting) {
            Setting.create(setting, function(err) {
                if (err) {
                    console.error(err);
                }
            });
        });
    }

    function loadExistingSettings() {
        console.error('Loading existing settings');

        Setting.find(function(data) {
            log(data);
        });
    }


    Setting.count(function(err, result) {
        if (err) {
            console.error(err);
        }
        if (result < 1) {
            loadDefaultSettings();
        } else {
            loadExistingSettings();
        }
    });


};