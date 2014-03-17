define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var OrderLines = require('app/js/collections/OrderLines');
    var Orders = require('app/js/collections/Orders');
    var Order = require('app/js/models/Order');
    var CustomerSearchView = require('app/js/views/orderform/CustomerSearchView');
    var ProductSearchView = require('app/js/views/orderform/ProductSearchView');
    var OrderFormItemView = require('app/js/views/orderform/OrderFormItemView');
    var orderForm = require('text!app/js/templates/orderform/orderForm.hbs');

    var OrderFormView = Backbone.View.extend({
        events: {
            'click #btn-delete-selected-row': 'onDeleteRowClicked',
            'click #btn-order': 'onOrderClicked'
        },
        template: Handlebars.compile(orderForm),

        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template());
            this.customerSearchView = new CustomerSearchView({
                el: this.$('#customer-search')
            });
            this.productSearchView = new ProductSearchView({
                el: this.$('#product-search')
            });

            this.customerSearchView.render();
            this.productSearchView.render();

            this.orderLines = new OrderLines();
            this.orders = new Orders();
            this.orderLineTable = this.$('#order-lines >> tbody');

            this.listenTo(this.customerSearchView, 'selectedCustomer', _.bind(this.productSearchView.focusProductCode, this.productSearchView));
            this.listenTo(this.productSearchView, 'addedOrderLine', this.addOrderLine);
            this.listenTo(this.orderLines, 'add remove sort reset', this.renderOrderLineTable);
            this.listenTo(this.orderLines, 'change:quantity', this.updateTotal);

            this.total = this.$('#total');
            return this;
        },
        addOrderLine: function (o) {
            this.orderLines.add(o);
        },
        renderOrderLineTable: function () {
            this.orderLineTable.empty();
            this.orderLines.each(function (o) {
                this.orderLineTable.append(
                    new OrderFormItemView({
                        model: o
                    }).render().el);
            }, this);
            this.updateTotal();
        },
        updateTotal: function () {
            this.total.text(this.orderLines.calcTotal());
        },
        onDeleteRowClicked: function (e) {
            e.preventDefault();
            var selected = this.orderLines.filter(function (o) {
                return o.isSelected();
            });
            this.orderLines.remove(selected);
        },
        doOrder: function() {
            var orderDate = '2014-03-17';
            var order = new Order({
                customer: this.customerSearchView.model.toJSON(),
                orderLines: this.orderLines.toJSON(),
                orderDate: orderDate
            });
            this.orders.create(order);
        },
        onOrderClicked: function (e) {
            e.preventDefault();
            alert('受注登録しました！');
            this.doOrder();
            this.orderLines.reset([]);
        }
    });
    return OrderFormView;
});