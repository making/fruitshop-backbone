define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var productSearch = require('text!app/js/templates/productSearch.hbs');

    var ProductSearchView = Backbone.View.extend({
        events: {

        },
        template: Handlebars.compile(productSearch),

        initialize: function () {

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return ProductSearchView;
});