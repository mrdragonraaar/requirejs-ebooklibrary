/**
 * LatestAdditionsPanelView.js
 *
 * Backbone view representing ebooklibrary latest additions panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/latestadditionspanel/LatestAdditionsPanelView',
    'ebooklibrary/collection/LatestAdditionsCollection',
    'backbone'
],
function(
    LatestAdditionsPanelViewTemplate,
    LatestAdditionsCollection,
    Backbone
) {
	var LatestAdditionsPanelView = Backbone.View.extend({
		tagName: 'latestadditionspanel',
		className: 'well well-header well-latestadditions',

		/**
		 * Initialise the latest additions panel view.
		 * @param options latest additions panel options (max).
		 */
		initialize: function(options) {
			options = options || {};

			this.collection = new LatestAdditionsCollection([], {max: options.max});
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderLatestAdditions);
		},

		/**
		 * Render the latest additions panel collection.
		 * @param collection latest additions collection.
		 */
		renderLatestAdditions: function(collection) {
			var latestAdditionsPanelTmpl = LatestAdditionsPanelViewTemplate({latestAdditions: collection.toJSON()});
			this.$el.append(latestAdditionsPanelTmpl);
		}
	});

	return LatestAdditionsPanelView;
});
