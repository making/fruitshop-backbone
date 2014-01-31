define(function (require) {
    var Backbone = require('backbone');
    var Customer = Backbone.Model.extend({
        validation: {
            'customerId': {
                required: true
            }
        }
    });
    return Customer;
});