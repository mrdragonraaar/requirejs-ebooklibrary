/**
 * SeriesView.js
 *
 * Backbone view representing ebooklibrary series.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/series/SeriesView',
    'ebooklibrary/collection/SeriesCollection',
    'backbone'
],
function(
    SeriesViewTemplate,
    SeriesCollection,
    Backbone
) {
	var SeriesView = Backbone.View.extend({
		tagName: 'series',
		className: 'well well-wide well-series',

		/**
		 * Initialise the series view.
		 * @param options series options (author, series).
		 */
		initialize: function(options) {
			options = options || {};

			this.collection = new SeriesCollection([], 
			   {author: options.author, series: options.series});
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderSeries);
		},

		/**
		 * Render the series collection.
		 * @param collection series collection.
		 */
		renderSeries: function(collection) {
			var seriesTmpl = SeriesViewTemplate({series: collection.toJSON()});
			this.$el.append(seriesTmpl);
		}
	});

	return SeriesView;
});
