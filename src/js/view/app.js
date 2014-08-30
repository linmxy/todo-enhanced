define([
    'jquery',
    'underscore',
    'backbone',
    'collection/todos',
    'view/todo',
    'text!tmpl/stat.handlebars',
    'common/handlebars',
    'common/common'
], function ($, _, Backbone, Todos, TodoView, statsTemplate, Handlebars, Common) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#todoapp',

        template: Handlebars.compile(statsTemplate),

        events: {
            'keypress #search': 'search',
            'click #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearDone',
            'click #toggle-all': 'toggleAllComplete'
        },

        initialize: function () {
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#search');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');
            this.$todolist = this.$('.todo-list');
            this.$todoList = this.$('#todo-list');

            this.listenTo(Todos, 'add', this.addOne);
            this.listenTo(Todos, 'reset', this.addAll);
            this.listenTo(Todos, 'change:done', this.filterOne);
            this.listenTo(Todos, 'filter', this.filterAll);
            this.listenTo(Todos, 'all', this.render);


            Todos.fetch({reset: true});
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {
            var collection = this.filtered || Todos;
            var done = collection.done().length;
            var remaining = collection.remaining().length;

            if (collection.length) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.template({
                    done: done,
                    remaining: remaining
                }));

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (Common.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        addOne: function (todo) {
            var view = new TodoView({ model: todo });
            this.$todoList.append(view.render().el);
        },

        addAll: function () {
            var collection = this.filtered || Todos;
            this.$todoList.empty();
            collection.each(this.addOne, this);
        },

        filterOne: function (todo) {
            todo.trigger('visible');
        },

        filterAll: function () {
            var collection = this.filtered || Todos;
            collection.each(this.filterOne, this);
        },

        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                order: Todos.nextOrder(),
                done: false
            };
        },

        createOnEnter: function (e) {
            Todos.create(this.newAttributes());
        },
        search: function (e) {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }
            if (e.which !== Common.ENTER_KEY) {
                var that = this;
                this.searchTimer = setTimeout(function(){
                    that.doSearch();
                }, 3000);
                return;
            }
            this.doSearch();
        },

        doSearch: function() {
            var keyword = this.$input.val().trim();
            if(!keyword || keyword.length < 3){
                this.filtered = null;
            }else{
                this.filtered = Todos.search(keyword);
                this.$input.blur();
            }
            this.addAll();
            this.render();
        },

        clearDone: function () {
            _.invoke(Todos.done(), 'destroy');
            return false;
        },

        toggleAllComplete: function () {
            var done = this.allCheckbox.checked;

            Todos.each(function (todo) {
                todo.save({
                    done: done
                });
            });
        }
    });

    return AppView;
});