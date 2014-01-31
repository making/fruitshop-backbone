define(function (require) {
    var Backbone = require('backbone');
    var OrderLine = Backbone.Model.extend({
        defaults: {
            'selected': false
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