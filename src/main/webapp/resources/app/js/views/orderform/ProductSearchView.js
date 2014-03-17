define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var Product = require('app/js/models/Product');
    var OrderLine = require('app/js/models/OrderLine');
    var productSearch = require('text!app/js/templates/orderform/productSearch.hbs');

    var ProductSearchView = Backbone.View.extend({
        events: {
            'click #productCode + > button': 'onSelectedProductCode',
            'keypress #productCode': 'onProductCodeEntered',
            'click #quantity + > button': 'addOrderLine',
            'keypress #quantity': 'onQuantityEntered'
        },
        bindings: {
            '#productCode': 'product.productCode',
            '#productName': 'product.productName',
            '#unitPrice': 'product.unitPrice',
            '#quantity': 'quantity'
        },
        template: Handlebars.compile(productSearch),

        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template());
            this.resetModel(new OrderLine());
            this.productCode = this.$('#productCode');
            this.quantity = this.$('#quantity');
            return this;
        },
        onProductCodeEntered: function (e) {
            if (e.keyCode != 13) return;
            this.onSelectedProductCode(e);
        },
        onSelectedProductCode: function (e) {
            e.preventDefault();
            if (!this.model.isValid('product.productCode')) {
                this.model.validate();
                return;
            }
            this.model.set({
                'product.productName': 'フルーツギフト',
                'product.unitPrice': 7000
            });
            this.focusQuantity();
        },
        onQuantityEntered: function (e) {
            if (e.keyCode != 13) return;
            this.addOrderLine(e);
        },
        addOrderLine: function (e) {
            e.preventDefault();
            if (!this.model.isValid(true)) return;
            this.trigger('addedOrderLine', this.model);
            this.resetModel(new OrderLine());
        },
        resetModel: function (m) {
            this.model = m;
            this.stickit();
            Backbone.Validation.bind(this);
        },
        focusProductCode: function () {
            this.productCode.focus();
        },
        focusQuantity: function () {
            this.quantity.focus();
        }
    });
    return ProductSearchView;
});