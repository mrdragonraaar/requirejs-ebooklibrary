/**
 * LinksPanelView.js
 *
 * Backbone view representing ebooklibrary links panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/linkspanel/LinksPanelView',
    'ebooklibrary/collection/LinkCollection',
    'backbone'
],
function(
    LinksPanelViewTemplate,
    LinkCollection,
    Backbone
) {
	var LinksPanelView = Backbone.View.extend({
		tagName: 'linkspanel',
		className: 'well well-wide well-links',

		/**
		 * Initialise the links panel view.
		 * @param options links panel options.
		 */
		initialize: function(options) {
			options = options || {};

			this.collection = new LinkCollection();
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderLinks);
		},

		/**
		 * Render the links panel collection.
		 * @param collection links collection.
		 */
		renderLinks: function(collection) {
			var linksPanelTmpl = LinksPanelViewTemplate({links: collection.toJSON()});
			this.$el.append(linksPanelTmpl);
		}
	});

	return LinksPanelView;
});
