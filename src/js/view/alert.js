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
        show: function() {
            this.render();
            $(document.body).append(this.$el);
            var that = this;
            setTimeout(function(){
                that.close();
            }, 3000);
        },
        close : function() {
            var $el = this.$el;
            var modal = $el.find('.modal');
            modal.addClass('hidden');
            setTimeout(function(){
                $el.remove();
            }, 500);

        }
    });

    return AlertView;
});