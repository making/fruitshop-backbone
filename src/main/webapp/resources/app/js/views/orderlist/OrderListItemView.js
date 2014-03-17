define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var OrderLines = require('app/js/collections/OrderLines');

    var orderListItem = require('text!app/js/templates/orderlist/orderListItem.hbs');

    var OrderListItemView = Backbone.View.extend({
        tagName: 'tr',
        template: Handlebars.compile(orderListItem),

        initialize: function () {
        },
        render: function () {
            var orderLines = new OrderLines(this.model.get('orderLines'));
            this.$el.html(this.template(_.extend({
                'total': orderLines.calcTotal()
            }, this.model.toJSON())));
            return this;
        }
    });
    return OrderListItemView;
});