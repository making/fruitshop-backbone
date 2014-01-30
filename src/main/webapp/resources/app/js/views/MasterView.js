define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var master = require('text!app/js/templates/master.hbs');

    return Backbone.View.extend({
        template: Handlebars.compile(master),

        initialize: function () {

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
});