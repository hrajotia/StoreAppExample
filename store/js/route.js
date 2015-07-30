define(function(require) {

    var StoreModel = require('models/storeModel');
    var StoreCollection = require('collections/storeCollection');
    var StoreItemView = require('views/storeItemView');
    var StoreView = require('views/storeView');

    var StoreRoute = Backbone.Router.extend({

        routes: {
            "": "index",
            "store/:id": "store", // #store/id
        },

        index: function() {
            var storeCollection = new StoreCollection();
            storeCollection.fetch();
            /*var storeCollection = new StoreCollection(
                [
                    {
                        "name": "Red Stone",
                        "location": "Moon",
                        "id": 1
                    },
                    {
                        "name": "Ice Cubes",
                        "location": "Pluto",
                        "id": 2
                    },
                    {
                        "name": "Nature",
                        "location": "Earth",
                        "id": 3
                    }
                ]
            );*/
            var $view = new StoreView({
                collection: storeCollection
            }).$el;
            $('#container').html($view)
        },

        store: function(id) {
            var storeModel = new StoreModel({id: id});

            //to remove store item from server
            //storeModel.destroy();
            //this.index()

            // to fetch and show current store item data from server
            storeModel.fetch();
            $('#container').empty().html(new StoreItemView({model: storeModel}).$el);
        }

    });

    return StoreRoute;

});
