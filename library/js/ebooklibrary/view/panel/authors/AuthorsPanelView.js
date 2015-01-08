/**
 * AuthorsView.js
 *
 * Backbone view representing ebooklibrary authors.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/panel/authors/AuthorsPanel',
    'hbs!ebooklibrary/template/panel/authors/AuthorsPanelList',
    'ebooklibrary/view/panel/authors/toolbar/AuthorsPanelNavToolBarView',
    'backbone'
],
function(
    AuthorsPanelTemplate,
    AuthorsPanelListTemplate,
    AuthorsPanelNavToolBarView,
    Backbone
) {
	var AuthorsPanelView = Backbone.View.extend({
		tagName: 'authors',
		className: 'panel panel-authors',

		toolBar: null,		// toolbar view

		/**
		 * Initialise the authors view.
		 * @param options authors options.
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.renderAuthors);

			this.toolBar = new AuthorsPanelNavToolBarView();
			this.listenTo(this.toolBar, 'toolBarFilterBy', this.filterAuthors);
		},

		/**
		 * Render the authors view.
		 */
		render: function() {
			var authorsPanelTmpl = AuthorsPanelTemplate();
			this.$el.html(authorsPanelTmpl);

			this.$('.panel-heading').append(this.toolBar.render().el);

			return this;
		},

		/**
		 * Filter the authors collection.
		 * @param letter first letter of authors surname.
		 */
		filterAuthors: function(letter) {
			var collection = this.collection;
			if (letter !== "all") {
				var authors = this.collection.filterName(letter.toUpperCase());
				collection = new Backbone.Collection(authors);
			}
			this.renderAuthors(collection);
		},

		/**
		 * Render the authors collection.
		 * @param collection author collection.
		 */
		renderAuthors: function(collection) {
			var authorsPanelListTmpl = AuthorsPanelListTemplate({authors: collection.toJSON()});
			this.$('.panel-body').html(authorsPanelListTmpl);
		},

		/**
		 * Remove the authors panel view.
		 */
		remove: function() {
			this.toolBar.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return AuthorsPanelView;
});
