requirejs.config({
    baseUrl: 'store/js',
    paths: {
        jquery: '../../bower_components/jquery/dist/jquery',
        underscore: '../../bower_components/underscore/underscore',
        backbone: '../../bower_components/backbone/backbone',
    },
    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    }
});

// Load the main app module to start the app
require(['route'], function (StoreRoute) {

    storeRoute = new StoreRoute();
    Backbone.history.start();

});
