/**
 * SeriesPanelView.js
 *
 * Backbone view representing ebooklibrary series panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/seriespanel/SeriesPanelView',
    'ebooklibrary/collection/SeriesCollection',
    'backbone'
],
function(
    SeriesPanelViewTemplate,
    SeriesCollection,
    Backbone
) {
	var SeriesPanelView = Backbone.View.extend({
		tagName: 'seriespanel',
		className: 'well well-header well-series',

		/**
		 * Initialise the series panel view.
		 * @param options series panel options (author, series).
		 */
		initialize: function(options) {
			options = options || {};

			this.collection = new SeriesCollection([], 
			   {author: options.author, series: options.series});
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderSeries);
		},

		/**
		 * Render the series panel collection.
		 * @param collection series collection.
		 */
		renderSeries: function(collection) {
			var seriesPanelTmpl = SeriesPanelViewTemplate({series: collection.toJSON()});
			this.$el.append(seriesPanelTmpl);
		}
	});

	return SeriesPanelView;
});
