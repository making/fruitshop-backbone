define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var Product = require('app/js/models/Product');
    var productSearch = require('text!app/js/templates/productSearch.hbs');

    require('backbone.stickit');

    var ProductSearchView = Backbone.View.extend({
        events: {
            'click #productCode + > button': 'onSelectedProductCode',
            'keypress #productCode': 'onProductCodeEntered',
            'click #quantity + > button': 'addOrderLine',
            'keypress #quantity': 'onQuantityEntered'
        },
        bindings: {
            '#productCode': 'productCode',
            '#productName': 'productName',
            '#unitPrice': 'unitPrice'
        },
        template: Handlebars.compile(productSearch),

        initialize: function () {
            this.model = new Product();
        },
        render: function () {
            this.$el.html(this.template());
            this.$productCode = this.$('#productCode');
            this.$quantity = this.$('#quantity');
            this.stickit();
            return this;
        },
        onProductCodeEntered: function (e) {
            if (e.keyCode != 13) return;
            this.onSelectedProductCode(e);
        },
        onSelectedProductCode: function (e) {
            e.preventDefault();
            this.model.set({
                'productName': 'フルーツギフト',
                'unitPrice': 7000
            });
            console.log(this.model.toJSON());
            this.focusQuantity();
        },
        onQuantityEntered: function (e) {
            if (e.keyCode != 13) return;
            this.addOrderLine(e);
        },
        addOrderLine: function (e) {
            e.preventDefault();
            this.trigger('addedOrderLine', {
                product: this.model,
                quantity: this.$quantity.val()
            });
        },
        focusProductCode: function () {
            this.$productCode.focus();
        },
        focusQuantity: function () {
            this.$quantity.focus();
        }
    });
    return ProductSearchView;
});