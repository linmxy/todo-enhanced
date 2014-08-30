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
            title: 'empty todo...',
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