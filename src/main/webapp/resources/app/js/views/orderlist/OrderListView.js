define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var Orders = require('app/js/collections/Orders');
    var OrderListItemView = require('app/js/views/orderlist/OrderListItemView');
    var orderList = require('text!app/js/templates/orderlist/orderList.hbs');

    var OrderListView = Backbone.View.extend({
        template: Handlebars.compile(orderList),

        events: {
            'click #btn-reload-orders': 'onClickReloadOrders'
        },

        initialize: function () {
            this.collection = new Orders();
            this.listenTo(this.collection, 'sync', this.renderTable);
        },
        render: function () {
            this.$el.html(this.template());
            this.collection.fetch();
            return this;
        },
        renderTable: function () {
            var $tbody = this.$('tbody').empty();
            this.collection.each(function (order) {
                var orderListItemView = new OrderListItemView({
                    model: order
                });
                $tbody.append(orderListItemView.render().$el);
            });
        },
        onClickReloadOrders: function (e) {
            e.preventDefault();
            this.collection.fetch();
        }
    });
    return OrderListView;
});