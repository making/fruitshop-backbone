define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var orderForm = require('text!app/js/templates/orderForm.hbs');

    return Backbone.View.extend({
        template: Handlebars.compile(orderForm),

        initialize: function () {

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
});