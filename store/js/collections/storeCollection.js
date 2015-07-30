define(function(require) {

    var Backbone = require('backbone');
    var StoreModel = require('models/storeModel');

    var StoreCollection = Backbone.Collection.extend({

        model: StoreModel,

        url: "stores/",

        initialize: function() {}

    });

    return StoreCollection;

});
