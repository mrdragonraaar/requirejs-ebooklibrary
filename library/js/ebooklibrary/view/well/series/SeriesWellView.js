/**
 * SeriesWellView.js
 *
 * Backbone view representing ebooklibrary series well.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/well/series/SeriesWellList',
    'backbone'
],
function(
    SeriesWellListTemplate,
    Backbone
) {
	var SeriesWellView = Backbone.View.extend({
		tagName: 'series',
		className: 'well well-wide well-series',

		/**
		 * Initialise the series well view.
		 * @param options series well options (collection).
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.renderSeries);
		},

		/**
		 * Render the series well collection.
		 * @param collection series collection.
		 */
		renderSeries: function(collection) {
			var seriesWellListTmpl = SeriesWellListTemplate({series: collection.toJSON()});
			this.$el.html(seriesWellListTmpl);
		}
	});

	return SeriesWellView;
});
