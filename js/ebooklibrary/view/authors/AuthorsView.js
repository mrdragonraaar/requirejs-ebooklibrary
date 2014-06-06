/**
 * AuthorsView.js
 *
 * Backbone view representing ebooklibrary authors.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/authors/AuthorsView',
    'hbs!ebooklibrary/template/authors/AuthorListView',
    'ebooklibrary/collection/AuthorCollection',
    'backbone'
],
function(
    AuthorsViewTemplate,
    AuthorListViewTemplate,
    AuthorCollection,
    Backbone
) {
	var AuthorsView = Backbone.View.extend({
		tagName: 'authors',
		className: 'panel panel-authors',

		/**
		 * Define authors filter event.
		 */
		events: {
			'click .panel-heading > .list-group > .list-group-item > a': 'onFilterAuthorName',
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
			return this.$('.panel-heading > .list-group > .list-group-item > a[title="' + letter + '"]');
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
		},

		/**
		 * Render the authors view.
		 */
		render: function() {
			var authorsTmpl = AuthorsViewTemplate();
			this.$el.html(authorsTmpl);
			this.setActiveFilterLink('All');
			return this;
		},

		/**
		 * Render the authors collection.
		 * @param collection author collection.
		 */
		renderAuthors: function(collection) {
			var authorListTmpl = AuthorListViewTemplate({authors: collection.toJSON()});
			this.$('.panel-body').html(authorListTmpl);
		}
	});

	return AuthorsView;
});
