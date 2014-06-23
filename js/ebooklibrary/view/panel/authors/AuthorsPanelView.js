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
    'ebooklibrary/collection/AuthorCollection',
    'backbone'
],
function(
    AuthorsPanelTemplate,
    AuthorsPanelListTemplate,
    AuthorsPanelNavToolBarView,
    AuthorCollection,
    Backbone
) {
	var AuthorsPanelView = Backbone.View.extend({
		tagName: 'authors',
		className: 'panel panel-authors',

		toolBar: null,		// toolbar view

		/**
		 * Define authors filter event.
		 */
		events: {
			'click > .panel-heading > .list-group > .list-group-item > a': 'onFilterAuthorName',
		},

		filterAuthors: function(letter) {
			var collection = this.collection;
			if (letter !== "all") {
				var authors = this.collection.filterName(letter.toUpperCase());
				collection = new AuthorCollection(authors);
			}
			this.renderAuthors(collection);
		},

		/**
		 * Event handler for authors filter event.
		 * @param e event.
		 */
		onFilterAuthorName: function(e) {
			e.preventDefault();

			var letter = e.currentTarget.title;

			var collection = this.collection;
			if (letter !== "All") {
				var authors = this.collection.filterName(letter);
				collection = new AuthorCollection(authors);
			}
			this.setActiveFilterLink(letter);
			this.renderAuthors(collection);
		},

		/**
		 * Get filter link.
		 * @param letter letter of filter link.
		 * @return filter link
		 */
		getFilterLink: function(letter) {
			return this.$('> .panel-heading > .list-group > .list-group-item > a[title="' + letter + '"]');
		},

		/**
		 * Get all filter links.
		 * @return filter links
		 */
		getAllFilterLinks: function() {
			return this.$('.panel-heading > .list-group > .list-group-item > a');
		},

		/**
		 * Deactivate all filter links.
		 */
		deactivateAllFilterLinks: function() {
			var filterLinks = this.getAllFilterLinks();
			filterLinks.removeClass('active');
		},

		/**
		 * Set active filter link.
		 * @param letter letter of filter link to activate.
		 */
		setActiveFilterLink: function(letter) {
			this.deactivateAllFilterLinks();

			var filterLink = this.getFilterLink(letter);
			filterLink.addClass('active');
		},

		/**
		 * Initialise the authors view.
		 * @param options authors options.
		 */
		initialize: function(options) {
			options = options || {};

			this.collection = new AuthorCollection();
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderAuthors);

			this.toolBar = new AuthorsPanelNavToolBarView();
			this.listenTo(this.toolBar, 'toolBarFilterBy', this.filterAuthors);
		},

		/**
		 * Render the authors view.
		 */
		render: function() {
			var authorsPanelTmpl = AuthorsPanelTemplate();
			this.$el.html(authorsPanelTmpl);
			//this.setActiveFilterLink('All');

			this.$('.panel-heading').append(this.toolBar.render().el);

			return this;
		},

		/**
		 * Render the authors collection.
		 * @param collection author collection.
		 */
		renderAuthors: function(collection) {
			this.$('.panel-body').empty();
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
