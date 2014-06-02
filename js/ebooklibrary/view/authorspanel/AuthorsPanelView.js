/**
 * AuthorsPanelView.js
 *
 * Backbone view representing ebooklibrary authors panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/authorspanel/AuthorsPanelView',
    'ebooklibrary/collection/AuthorCollection',
    'backbone'
],
function(
    AuthorsPanelViewTemplate,
    AuthorCollection,
    Backbone
) {
	var AuthorsPanelView = Backbone.View.extend({
		tagName: 'authorspanel',
		className: 'panel-default panel-right',

		/**
		 * Initialise the authors panel view.
		 * @param options authors panel options.
		 */
		initialize: function(options) {
			options = options || {};

			this.collection = new AuthorCollection();
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderAuthors);
		},

		/**
		 * Render the authors panel collection.
		 * @param collection author collection.
		 */
		renderAuthors: function(collection) {
			var authorsPanelTmpl = AuthorsPanelViewTemplate({authors: collection.toJSON()});
			this.$el.append(authorsPanelTmpl);
		}
	});

	return AuthorsPanelView;
});
