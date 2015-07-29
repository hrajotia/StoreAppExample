var StoreItemView = Backbone.View.extend({
    tagName: "tr",

    className: "store-item-row",

    template: _.template("<td><%= id %></td><td><%= name %></td><td><%= location %></td>"),

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
        if(event && event.preventDefault) event.preventDefault();
        Backbone.history.navigate('store/' + this.model.get('id'), {trigger: true});
    }

});

var StoreView = Backbone.View.extend({
    tagName: "table",

    className: "store-table",

    template: _.template("<thead><tr><th>ID</th><th>Store Name</th><th>Location</th></tr></thead><tbody></tbody>"),

    events: {
    },

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
        var $tbody = this.$('tbody').empty();
        this.collection.each(function(storeItem, index) {
            var $storeItemView = new StoreItemView({model: storeItem}).$el;
            $tbody.append($storeItemView);
        });
    }

});
