/**
 * Created by linmin on 30/8/14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!tmpl/item.handlebars',
    'common/handlebars',
    'common/common'
], function ($, _, Backbone, todosTemplate, Handlebars, Common) {
    'use strict';

    var TodoView = Backbone.View.extend({

        tagName:  'li',

        template: Handlebars.compile(todosTemplate),

        // The DOM events specific to an item.
        events: {
            'click .toggle':	'toggleDone',
            'dblclick .view':	'edit',
            'click .destroy':	'clear',
            'keypress .edit':	'updateOnEnter',
            'keydown .edit':	'revertOnEscape',
            'click .cancel':    'close',
            'click .save':		'save'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));

            this.toggleVisible();
            this.$input = this.$('input.edit');
            this.$content = this.$('textarea.edit');
            return this;
        },

        toggleVisible: function () {
            this.$el.toggleClass('hidden',  this.isHidden());
        },

        isHidden: function () {
            var isCompleted = this.model.get('done');
            return (// hidden cases only
                (!isCompleted && Common.TodoFilter === 'done') ||
                    (isCompleted && Common.TodoFilter === 'active')
                );
        },

        toggleDone: function () {
            this.model.toggle();
        },

        edit: function () {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        save: function () {
            var title = this.$input.val();
            var trimmedTitle = title.trim();
            var content = this.$content.val();
            var trimmedContent = content.trim();
            trimmedContent = trimmedContent.replace(/[^a-zA-Z0-9\s]/g, '');
            trimmedContent = trimmedContent.replace(/\s{2,}/g, ' ');
            trimmedContent = trimmedContent.replace(/([\w]{30})[\w]+/g, function(){
                return arguments[1];
            });
            if(trimmedContent.length>140){
                Common.alert("Max length: 140");
                return;
            }
            trimmedContent = trimmedContent.substring(0, 140);

            if (trimmedTitle || trimmedContent) {
                this.model.save({ title: trimmedTitle, content: trimmedContent, update_time: new Date().getTime()});

                //Model values changes consisting of whitespaces only are not causing change to be triggered
                if (title !== trimmedTitle || content !== trimmedContent) {
                    this.model.trigger('change');
                }
            } else {
                this.clear();
            }

            this.$el.removeClass('editing');
        },
        close: function () {
            this.$el.removeClass('editing');
        },

        updateOnEnter: function (e) {
            if (e.keyCode === Common.ENTER_KEY) {
                this.close();
            }
        },

        revertOnEscape: function (e) {
            if (e.which === Common.ESCAPE_KEY) {
                this.$el.removeClass('editing');
                this.$input.val(this.model.get('title'));
            }
        },

        clear: function () {
            if(!this.model.get('done')){
                Common.alert("Can't delete undone item");
            }else{
                this.model.destroy();
            }
        }
    });

    return TodoView;
});