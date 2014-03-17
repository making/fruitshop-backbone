define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var OrderFormView = require('app/js/views/orderform/OrderFormView');
    var OrderListView = require('app/js/views/orderlist/OrderListView');
    var MasterView = require('app/js/views/master/MasterView');

    var AppView = Backbone.View.extend({
        events: {
            'show.bs.tab a[data-toggle="tab"]': 'onTabChanged'
        },

        initialize: function () {
            // タブを切り替えても状態が残るようにあらかじめrender()しておく。
            this.orderFormView = new OrderFormView({
                el: this.$('#order-form')
            }).render();
            this.orderListView = new OrderListView({
                el: this.$('#order-list')
            }).render();
            this.masterView = new MasterView({
                el: this.$('#master')
            }).render();

            this.viewMap = {
                'order-form': this.orderFormView,
                'order-list': this.orderListView,
                'master': this.masterView
            }
        },
        render: function () {
            var hash = Backbone.history.getHash();
            this.changeView(hash);
            return this;
        },
        changeView: function (hash) {
            var targetView = this.viewMap[hash];
            if (targetView && targetView !== this.currentView) {
                if (this.currentView) {
                    this.deactivateCurrentTab(this.currentHash);
                }
                this.currentHash = hash;
                this.currentView = targetView;
                this.activateCurrentTab(hash);
                // ここではrender()しない。
            }
        },
        onTabChanged: function (e) {
            var hash = e.target.hash;
            Backbone.history.navigate(hash, {
                trigger: true
            });
        },
        activateCurrentTab: function (hash) {
            this.$('a[href=#' + hash + ']').parent().addClass('active');
            this.currentView.$el.addClass('active');
        },
        deactivateCurrentTab: function (hash) {
            this.$('a[href=#' + hash + ']').parent().removeClass('active');
            this.currentView.$el.removeClass('active');
        }
    });

    return AppView;
});