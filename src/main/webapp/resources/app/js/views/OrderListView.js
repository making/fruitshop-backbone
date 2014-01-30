define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var orderList = require('text!app/js/templates/orderList.hbs');

    return Backbone.View.extend({
        template: Handlebars.compile(orderList),

        initialize: function () {

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
});