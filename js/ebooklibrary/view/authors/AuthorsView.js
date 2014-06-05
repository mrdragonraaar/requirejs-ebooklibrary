/**
 * AuthorsView.js
 *
 * Backbone view representing ebooklibrary authors.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/authors/AuthorsView',
    'ebooklibrary/collection/AuthorCollection',
    'backbone'
],
function(
    AuthorsViewTemplate,
    AuthorCollection,
    Backbone
) {
	var AuthorsView = Backbone.View.extend({
		tagName: 'authors',
		className: 'panel panel-authors',

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
		 * Render the authors collection.
		 * @param collection author collection.
		 */
		renderAuthors: function(collection) {
			var authorsTmpl = AuthorsViewTemplate({authors: collection.toJSON()});
			this.$el.append(authorsTmpl);
		}
	});

	return AuthorsView;
});
