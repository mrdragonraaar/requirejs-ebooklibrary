/**
 * LatestAdditionsView.js
 *
 * Backbone view representing ebooklibrary latest additions.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/latestadditions/LatestAdditionsView',
    'ebooklibrary/collection/LatestAdditionsCollection',
    'backbone'
],
function(
    LatestAdditionsViewTemplate,
    LatestAdditionsCollection,
    Backbone
) {
	var LatestAdditionsView = Backbone.View.extend({
		tagName: 'latestadditions',
		className: 'well well-header well-latestadditions',

		/**
		 * Initialise the latest additions view.
		 * @param options latest additions options (max).
		 */
		initialize: function(options) {
			options = options || {};

			this.collection = new LatestAdditionsCollection([], {max: options.max});
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderLatestAdditions);
		},

		/**
		 * Render the latest additions collection.
		 * @param collection latest additions collection.
		 */
		renderLatestAdditions: function(collection) {
			var latestAdditionsTmpl = LatestAdditionsViewTemplate({latestAdditions: collection.toJSON()});
			this.$el.append(latestAdditionsTmpl);
		}
	});

	return LatestAdditionsView;
});
