define(function (require) {
    var Backbone = require('backbone');
    var Product = require('app/js/models/Product');
    var Products = Backbone.Collection.extend({
        model: Product
    });
    return Products;
});
