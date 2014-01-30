define(function (require) {
    var Backbone = require('backbone');
    var Product = require('app/js/models/Product');
    return Backbone.Collection.extend({
        model: Product
    });
});
