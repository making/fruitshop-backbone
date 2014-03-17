define(function (require) {
    var Backbone = require('backbone');
    var Product = require('app/js/models/Product');
    var Products = Backbone.Collection.extend({
        url: 'api/v1/products',
        model: Product
    });
    return Products;
});
