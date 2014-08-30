/**
 * Created by linmin on 29/8/14.
 */
define([
    'underscore',
    'Backbone'
], function (_, Backbone) {
    'use strict';

    var Todo = Backbone.Model.extend({
        defaults: {
            title: 'empty todo...',
            completed: false
        },

        toggle: function () {
            this.save({
                completed: !this.get('completed')
            });
        }
    });

    return Todo;
});