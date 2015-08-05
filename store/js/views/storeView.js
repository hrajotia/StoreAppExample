define(function(require) {

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var StoreItemView = require('views/storeItemView');

    var StoreView = Backbone.View.extend({

        tagName: "div",

        className: "table store-table",

        template: Handlebars.compile("<div class='table-title'>Store Data</div><div class='table-heading'><div class='table-cell'>ID</div><div class='table-cell'>Store Name</div><div class='table-cell'>Location</div></div><div class='table-body'></div>"),

        events: {},

        initialize: function(options) {
            this.listenTo(this.collection, "sync", this.renderStoreItem);
            /*this.listenTo(storeRoute, "route", function() {
                console.log("route change");
            });*/
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            this.renderStoreItem();
        },

        renderStoreItem: function() {
            var $tbody = this.$('.table-body').empty();
            this.collection.each(function(storeItem, index) {
                var $storeItemView = new StoreItemView({model: storeItem}).$el;
                $tbody.append($storeItemView);
            });
        }

    });

    return StoreView;

});
