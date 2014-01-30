define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var OrderFormView = require('app/js/views/OrderFormView');
    var OrderListView = require('app/js/views/OrderListView');
    var MasterView = require('app/js/views/MasterView');

    return Backbone.View.extend({
        events: {
            'show.bs.tab a[data-toggle="tab"]': 'onTabChanged'
        },

        initialize: function () {
            this.orderFormView = new OrderFormView({
                el: this.$('#order-form')
            });
            this.orderListView = new OrderListView({
                el: this.$('#order-list')
            });
            this.masterView = new MasterView({
                el: this.$('#master')
            });

            this.viewMap = {
                '#order-form': this.orderFormView,
                '#order-list': this.orderListView,
                '#master': this.masterView,
                '#': this.orderFormView
            }
        },
        render: function () {
            var hash = '#' + Backbone.history.getHash();
            this.changeView(hash);
            return this;
        },
        changeView: function (hash) {
            var targetView = this.viewMap[hash];
            if (targetView !== this.currentView) {
                console.log(targetView);
                targetView.render();
                this.currentView = targetView;
                this.$('a[href=' + hash + ']').parent().addClass('active');
            }
        },
        onTabChanged: function (e) {
            var hash = e.target.hash;
            this.changeView(hash);
            Backbone.history.navigate(hash);
        }
    });
});