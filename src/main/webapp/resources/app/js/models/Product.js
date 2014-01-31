define(function (require) {
    var Backbone = require('backbone');
    var Product = Backbone.Model.extend({
        validation: {
            productCode: {
                required: true
            }
        }
    });
    return Product;
});