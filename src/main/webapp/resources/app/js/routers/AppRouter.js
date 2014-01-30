define(function (require) {
    var Backbone = require('backbone');

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultRoute',
            'order-form': 'renderTab',
            'order-list': 'renderTab',
            'master': 'renderTab'
        },
        initialize: function (opts) {
            this.appView = opts.appView;
        },
        defaultRoute: function () {
            this.appView.changeView('order-form');
        },
        renderTab: function () {
            var hash = Backbone.history.getHash();
            this.appView.changeView(hash);
        }
    });
    return AppRouter;
});