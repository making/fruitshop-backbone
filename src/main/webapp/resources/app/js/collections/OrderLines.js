define(function (require) {
    var Backbone = require('backbone');
    var OrderLine = require('app/js/models/OrderLine');
    return Backbone.Collection.extend({
        model: OrderLine
    });
});
