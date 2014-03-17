define(function (require) {
    var Backbone = require('backbone');
    Backbone.LocalStorage = require('Backbone.localStorage');
    var Order = require('app/js/models/Order');
    var Orders = Backbone.Collection.extend({
        url: 'api/v1/orders',
        localStorage: new Backbone.LocalStorage('Orders'),
        model: Order
    });
    return Orders;
});
