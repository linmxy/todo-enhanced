/**
 * Created by linmin on 29/8/14.
 */
require.config({
//    shim: {
//        underscore: {
//            exports: '_'
//        },
//        backbone: {
//            deps: [
//                'underscore',
//                'jquery'
//            ],
//            exports: 'Backbone'
//        },
//        backboneLocalstorage: {
//            deps: ['backbone'],
//            exports: 'storage'
//        }
//    },
    paths: {
        $: [
            'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
            'lib/jquery/jquery'
        ],
        _: [
            'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
            'lib/underscore/underscore'
        ],
        Backbone: [
            'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js',
            'lib/backbone/backbone'
        ],
        Storage: [
            'http://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.13/backbone.localStorage-min.js',
            'lib/backbone.Localstorage/backbone.Localstorage'
        ],
        Text: [
            'http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min.js',
            'lib/requirejs-text/text'
        ]
    }
}).require([], function () {
    console.log("it works!");
});