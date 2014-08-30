/**
 * Created by linmin on 29/8/14.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            create_time: new Date().getTime(),
            update_time: new Date().getTime(),
            content : '',
            done: false
        },

        toggle: function () {
            this.save({
                done: !this.get('done')
            });
        }
    });

    return Todo;
});