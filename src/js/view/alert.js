/**
 * Created by linmin on 30/8/14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!tmpl/alert.handlebars',
    'common/handlebars',
], function ($, _, Backbone, alertTemplate, Handlebars) {
    'use strict';

    var AlertView = Backbone.View.extend({

        template: Handlebars.compile(alertTemplate),

        events: {
            'click .close':	'close'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        close : function() {
            this.$el.remove();
        }
    });

    return AlertView;
});