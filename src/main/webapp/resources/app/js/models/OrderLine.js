define(function (require) {
    var Backbone = require('backbone');

    var OrderLine = Backbone.DeepModel.extend({
        defaults: {
            'selected': false
        },
        validation: {
            quantity: {
                pattern: 'digits',
                required: true,
                min: 0
            },
            'product.productCode': {
                required: true
            },
            'product.productName': {
                required: true
            },
            'product.unitPrice': {
                pattern: 'digits',
                required: true,
                min: 0
            }
        },
        select: function () {
            this.set('selected', true);
        },
        deselect: function () {
            this.set('selected', false);
        },
        isSelected: function () {
            return this.get('selected');
        },
        calcSubtotal: function () {
            return Number(this.get('quantity')) * this.get('product').unitPrice;
        }
    });
    return OrderLine;
});