define(function (require) {
    var Backbone = require('backbone');
    var Customer = require('app/js/models/Customer');
    var Customers = Backbone.Collection.extend({
        url: 'api/v1/customers',
        localStorage: new Backbone.LocalStorage('Orders'),
        model: Customer
    });
    return Customers;
});
