define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var Customer = require('app/js/models/Customer');
    var customerSearch = require('text!app/js/templates/customerSearch.hbs');

    require('backbone.stickit');

    var CustomerSearchView = Backbone.View.extend({
        events: {
            'click #customerId + > button': 'onSelectedCustomerId', // 隣の子のボタン
            'keypress #customerId': 'onCustomerIdEntered'
        },
        bindings: {
            '#customerId': 'customerId',
            '#customerName': 'customerName',
            '#phone': 'phone',
            '#fax': 'fax',
            '#zip': 'zip',
            '#address': 'address',
            '#contactPerson': 'contactPerson'
        },
        template: Handlebars.compile(customerSearch),

        initialize: function () {
            this.model = new Customer();
        },
        render: function () {
            this.$el.html(this.template());
            this.customerId = this.$('#customerId');
            this.stickit();
            return this;
        },
        onCustomerIdEntered: function (e) {
            if (e.keyCode != 13) return;
            this.onSelectedCustomerId(e);
        },
        onSelectedCustomerId: function (e) {
            e.preventDefault();
            this.model.set({
                'customerName': '山田太郎',
                'phone': '05055468779',
                'fax': '0335363007',
                'zip': '1358671',
                'address': '東京都江東区豊洲3-3-9',
                'contactPerson': '鈴木一郎'
            });
            this.trigger('selectedCustomer');
            console.log(this.model.toJSON());
        }
    });
    return CustomerSearchView;
});