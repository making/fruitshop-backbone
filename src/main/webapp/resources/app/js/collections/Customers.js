define(function (require) {
    var Backbone = require('backbone');
    var Customer = require('app/js/models/Customer');
    var Customers = Backbone.Collection.extend({
        model: Customer
    });
    return Customers;
});
