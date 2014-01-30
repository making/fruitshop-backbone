define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var customerSearch = require('text!app/js/templates/customerSearch.hbs');

    var CustomerSearchView = Backbone.View.extend({
        events: {

        },
        template: Handlebars.compile(customerSearch),

        initialize: function () {

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return CustomerSearchView;
});