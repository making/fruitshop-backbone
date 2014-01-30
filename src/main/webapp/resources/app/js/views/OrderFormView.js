define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var CustomerSearchView = require('app/js/views/CustomerSearchView');
    var ProductSearchView = require('app/js/views/ProductSearchView');
    var orderForm = require('text!app/js/templates/orderForm.hbs');

    var OrderFormView = Backbone.View.extend({
        events: {

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
            this.listenTo(this.customerSearchView, 'selectedCustomer', _.bind(this.productSearchView.focusProductCode, this.productSearchView));
            this.listenTo(this.productSearchView, 'addedOrderLine', function (orderLine) {
                alert(JSON.stringify(orderLine));
            });
            return this;
        }
    });
    return OrderFormView;
});