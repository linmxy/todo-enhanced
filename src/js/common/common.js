'use strict';

define(['jquery','backbone','view/alert'], function ($, Backbone, AlertView) {
    var exports =  {
        TodoFilter: '', // empty, active, completed

        ENTER_KEY: 13,
        ESCAPE_KEY: 27
    };
    exports.alert = function(str){
        var model = new Backbone.Model({content: str});
        var alert = new AlertView({model: model});
        alert.show();
    };
    return exports;
});