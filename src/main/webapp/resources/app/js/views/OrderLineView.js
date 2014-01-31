define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    require('backbone.stickit');

    var orderLine = require('text!app/js/templates/orderLine.hbs');

    var OrderLineView = Backbone.View.extend({
        template: Handlebars.compile(orderLine),
        tagName: 'tr',
        events: {
            'click': 'onRowClicked'
        },
        bindings: {
            '.subtotal': {
                observe: 'quantity',
                updateModel: false, // 一方向バインディングにする(Model -> View)
                update: function ($el, val, model) {
                    $el.text(model.calcSubtotal());
                }
            }
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.stickit();
            if (this.model.isSelected()) {
                this.$el.addClass('active');
            }
            return this;
        },
        toggleSelected: function () {
            if (this.model.isSelected()) {
                this.$el.removeClass('active');
                this.model.deselect();
            } else {
                this.$el.addClass('active');
                this.model.select();
            }
        },
        onRowClicked: function (e) {
            e.preventDefault();
            this.toggleSelected();
        }
    });
    return OrderLineView;
});