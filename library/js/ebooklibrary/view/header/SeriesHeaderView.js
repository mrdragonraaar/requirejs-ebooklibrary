/**
 * SeriesHeaderView.js
 *
 * Backbone view representing ebooklibrary series header.
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
	var SeriesHeaderView = Backbone.View.extend({
		tagName: 'header',
		className: 'header header-series',

		series: null,		// series panel view

		/**
		 * Initialise the header view.
		 * @param options header options.
		 */
		initialize: function(options) {
			options = options || {};

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

	return SeriesHeaderView;
});
