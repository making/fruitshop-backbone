define(function (require) {
    var Backbone = require('backbone');
    var Customer = require('app/js/models/Customer');
    return Backbone.Collection.extend({
        model: Customer
    });
});
