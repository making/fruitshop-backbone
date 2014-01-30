define(function (require) {
    var Backbone = require('backbone');
    var OrderLine = require('app/js/models/OrderLine');
    var OrderLines = Backbone.Collection.extend({
        model: OrderLine
    });
    return OrderLines;
});
