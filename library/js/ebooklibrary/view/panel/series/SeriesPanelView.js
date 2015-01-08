/**
 * SeriesPanelView.js
 *
 * Backbone view representing ebooklibrary series panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/panel/series/SeriesPanel',
    'hbs!ebooklibrary/template/well/series/SeriesWellList',
    'backbone'
],
function(
    SeriesPanelTemplate,
    SeriesWellListTemplate,
    Backbone
) {
	var SeriesPanelView = Backbone.View.extend({
		tagName: 'series',
		className: 'panel header-panel panel-series',

		/**
		 * Initialise the series panel view.
		 * @param options series panel options (collection).
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.renderSeries);
		},

		render: function() {
			var seriesPanelTmpl = SeriesPanelTemplate();
			this.$el.html(seriesPanelTmpl);

			return this;
		},

		/**
		 * Render the series well collection.
		 * @param collection series collection.
		 */
		renderSeries: function(collection) {
			console.log(collection);
			console.log(collection.toJSON());
			var seriesWellListTmpl = SeriesWellListTemplate({series: collection.toJSON()});
			this.$('.panel-body').html(seriesWellListTmpl);
		}
	});

	return SeriesPanelView;
});
