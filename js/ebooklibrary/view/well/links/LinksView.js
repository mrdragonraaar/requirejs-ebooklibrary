/**
 * LinksView.js
 *
 * Backbone view representing ebooklibrary links.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/links/LinksView',
    'ebooklibrary/collection/LinkCollection',
    'backbone'
],
function(
    LinksViewTemplate,
    LinkCollection,
    Backbone
) {
	var LinksView = Backbone.View.extend({
		tagName: 'links',
		className: 'well well-wide well-links',

		/**
		 * Initialise the links view.
		 * @param options links options.
		 */
		initialize: function(options) {
			options = options || {};

			this.collection = new LinkCollection();
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderLinks);
		},

		/**
		 * Render the links collection.
		 * @param collection links collection.
		 */
		renderLinks: function(collection) {
			var linksTmpl = LinksViewTemplate({links: collection.toJSON()});
			this.$el.append(linksTmpl);
		}
	});

	return LinksView;
});
