/**
 * SeriesView.js
 *
 * Backbone view representing ebooklibrary series.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/series/SeriesView',
    'backbone'
],
function(
    SeriesViewTemplate,
    Backbone
) {
	var SeriesView = Backbone.View.extend({
		tagName: 'series',
		className: 'well well-wide well-series',

		/**
		 * Initialise the series view.
		 * @param options series options (collection).
		 */
		initialize: function(options) {
			options = options || {};

			this.listenTo(this.collection, 'reset', this.renderSeries);
		},

		/**
		 * Render the series collection.
		 * @param collection series collection.
		 */
		renderSeries: function(collection) {
			var seriesTmpl = SeriesViewTemplate({series: collection.toJSON()});
			this.$el.html(seriesTmpl);
		}
	});

	return SeriesView;
});
