/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    //baseUrl: 'resources',
    baseUrl: '.',
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'backbone.validation': {
            deps: [
                'backbone'
            ],
            exports: 'Backbone.Validation'
        },
        'Backbone.localStorage': {
            deps: [
                'backbone'
            ],
            exports: 'Backbone.LocalStorage'
        },
        bootstrap: ['jquery'],
        typeahead: ['jquery'],
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: 'vendor/jquery/jquery',
        underscore: 'vendor/lodash/dist/lodash',
        backbone: 'vendor/backbone/backbone',
        'backbone.stickit': 'vendor/backbone.stickit/backbone.stickit',
        'backbone.validation': 'vendor/backbone.validation/src/backbone-validation',
        'Backbone.localStorage': 'vendor/Backbone.localStorage/backbone.localStorage',
        handlebars: 'vendor/handlebars/handlebars',
        spin: 'vendor/spin.js/dist/spin',
        bootstrap: 'vendor/bootstrap/dist/js/bootstrap',
        typeahead: 'vendor/typeahead.js/dist/typeahead',
        text: 'vendor/requirejs-text/text'
    }
});

define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    require('bootstrap');
    require('backbone.stickit');
    require('typeahead');
    Backbone.Validation = require('backbone.validation');

    var AppView = require('app/js/views/AppView');
    var AppRouter = require('app/js/routers/AppRouter');

    $(document).ready(function () {

        // Global validation configuration
        _.extend(Backbone.Validation.callbacks, {
            valid: function (view, attr) {
                var $el = view.$('[name=' + attr + ']'),
                    $group = $el.closest('.form-group');
                $group.removeClass('has-error');
                $group.find('.help-block').text('').addClass('hidden');
            },
            invalid: function (view, attr, error) {
                var $el = view.$('[name=' + attr + ']'),
                    $group = $el.closest('.form-group');
                $group.addClass('has-error');
                $group.find('.help-block').text(error).removeClass('hidden');
            }
        });

        var appView = new AppView({
            el: $('#main')
        }).render();

        new AppRouter({
            appView: appView
        });

        Backbone.history.start();
    });
});
