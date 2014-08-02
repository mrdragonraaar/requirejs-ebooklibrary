/**
 * LinksWellView.js
 *
 * Backbone view representing ebooklibrary links.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/well/links/LinksWell',
    'backbone'
],
function(
    LinksWellTemplate,
    Backbone
) {
	var LinksWellView = Backbone.View.extend({
		tagName: 'links',
		className: 'well well-wide well-links',

		/**
		 * Initialise the links view.
		 * @param options links options.
		 */
		initialize: function(options) {
			options = options || {};

			this.listenTo(this.collection, 'reset', this.renderLinks);
		},

		/**
		 * Render the links collection.
		 * @param collection links collection.
		 */
		renderLinks: function(collection) {
			var linksWellTmpl = LinksWellTemplate({links: collection.toJSON()});
			this.$el.append(linksWellTmpl);
		}
	});

	return LinksWellView;
});
