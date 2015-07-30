define(function(require) {

    var Backbone = require('backbone');

    var StoreModel = Backbone.Model.extend({

        defaults: {
            storeID: null,
            location: ""
        },

        url: function() {
            return "store/" + this.id;
        },

        initialize: function(options) {
            if (options && options.url) {
                this.url = options.url
            }
        },

        updateData: function() {},

    });

    return StoreModel;

});
