define(function (require) {
    var Backbone = require('backbone');
    var OrderLine = require('app/js/models/OrderLine');
    var OrderLines = Backbone.Collection.extend({
        model: OrderLine,
        calcTotal: function () {
            if (_.isEmpty(this.models)) {
                return 0;
            }
            return _.chain(this.models)
                .map(function (o) {
                    return o.calcSubtotal();
                }).reduce(function (a, b) {
                    return a + b;
                }).value();
        }
    });
    return OrderLines;
});
