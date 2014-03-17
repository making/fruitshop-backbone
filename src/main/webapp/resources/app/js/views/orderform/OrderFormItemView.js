define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    var orderFormItem = require('text!app/js/templates/orderform/orderFormItem.hbs');

    var OrderFormItemView = Backbone.View.extend({
        template: Handlebars.compile(orderFormItem),
        tagName: 'tr',
        events: {
            'click': 'onRowClicked',
            'dblclick': 'openEditMode',
            'blur [name=quantity]': 'closeEditMode',
            'keypress [name=quantity]': 'onEnterQuantity'
        },
        bindings: {
            '.subtotal': {
                observe: 'quantity',
                updateModel: false, // 一方向バインディングにする(Model -> View)
                update: function ($el, val, model) {
                    $el.text(model.calcSubtotal());
                }
            },
            '[name=quantity]': 'quantity',
            '.quantity': 'quantity'
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
        },
        openEditMode: function () {
            this.$el.addClass('editing');
            this.$('[name=quantity]').focus();
        },
        closeEditMode: function () {
            this.$el.removeClass('editing');
        },
        onEnterQuantity: function (e) {
            if (e.keyCode !== 13) return;
            this.closeEditMode();
        }
    });
    return OrderFormItemView;
});