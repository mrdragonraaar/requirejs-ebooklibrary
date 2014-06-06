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

		events: {
			'click .panel-heading > .list-group > li > a': 'onClickLetter',
		},

		onClickLetter: function(e) {
			e.preventDefault();

			var letter = e.currentTarget.text;

			var collection = this.collection;
			if (letter !== "All") {
				var authors = this.collection.filterName(letter);
				collection = new AuthorCollection(authors);
			}
			this.renderAuthors(collection);
		},

		renderAuthors2: function(authors) {
			authors.each(function(author) {
				console.log(author.toJSON());
			});
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

		render: function(data) {
			var authorsTmpl = AuthorsViewTemplate();
			this.$el.html(authorsTmpl);
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
