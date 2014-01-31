define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    require('typeahead');

    var OrderLines = require('app/js/collections/OrderLines');
    var CustomerSearchView = require('app/js/views/CustomerSearchView');
    var ProductSearchView = require('app/js/views/ProductSearchView');
    var OrderLineView = require('app/js/views/OrderLineView');
    var orderForm = require('text!app/js/templates/orderForm.hbs');

    var OrderFormView = Backbone.View.extend({
        events: {
            'click #btn-delete-selected-row': 'onDeleteRowClicked'
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

            this.collection = new OrderLines();
            this.orderLineTable = this.$('#order-lines >> tbody');

            this.listenTo(this.customerSearchView, 'selectedCustomer', _.bind(this.productSearchView.focusProductCode, this.productSearchView));
            this.listenTo(this.productSearchView, 'addedOrderLine', this.addOrderLine);
            this.listenTo(this.collection, 'add remove sort', this.renderOrderLineTable);

            this.total = this.$('#total');
            return this;
        },
        addOrderLine: function (o) {
            this.collection.add(o);
        },
        renderOrderLineTable: function () {
            this.orderLineTable.empty();
            this.collection.each(function (o) {
                this.orderLineTable.append(
                    new OrderLineView({
                        model: o
                    }).render().el);
            }, this);
            this.updateTotal();
        },
        updateTotal: function () {
            this.total.text(this.collection.calcTotal());
        },
        onDeleteRowClicked: function (e) {
            e.preventDefault();
            var selected = this.collection.filter(function (o) {
                return o.isSelected();
            });
            this.collection.remove(selected);
        }
    });
    return OrderFormView;
});