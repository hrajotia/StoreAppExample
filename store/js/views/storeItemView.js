define(function(require) {

    var Backbone = require('backbone');

    var StoreItemView = Backbone.View.extend({

        tagName: "div",

        className: "table-row store-item",

        template: _.template("<div class='table-cell'><%= id %></div><div class='table-cell'><%= name %></div><div class='table-cell'><%= location %></div>"),

        events: {
            "click": "itemClick"
        },

        initialize: function(options) {
            this.listenTo(this.model, "sync", this.render);
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        },

        itemClick: function(event) {
            if (event && event.preventDefault) event.preventDefault();
            Backbone.history.navigate('store/' + this.model.get('id'), {trigger: true});
        }

    });

    return StoreItemView;

});
