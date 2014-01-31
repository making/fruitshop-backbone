define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var orderList = require('text!app/js/templates/orderList.hbs');

    var OrderListView = Backbone.View.extend({
        template: Handlebars.compile(orderList),

        initialize: function () {

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return OrderListView;
});