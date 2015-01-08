/**
 * SeriesHeaderView.js
 *
 * Backbone view representing ebooklibrary series header.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/well/series/SeriesWellList',
    'ebooklibrary/view/panel/series/SeriesPanelView',
    'ebooklibrary/collection/SeriesCollection',
    'backbone'
],
function(
    SeriesWellListTemplate,
    SeriesPanelView,
    SeriesCollection,
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

			//var seriesCollection = new SeriesCollection([],
			   //{author: options.author, series: options.series});
			//seriesCollection.fetch({reset: true});

			//this.series = new SeriesPanelView({collection: seriesCollection});
			//this.series = new SeriesPanelView({collection: this.collection});

			this.listenTo(this.collection, 'reset', this.renderSeries);
		},

		/**
		 * Render the header view.
		 * @return header view
		 */
		render: function() {
			//this.$el.html(this.series.render().el);

			return this;
		},

		/**
		 * Render the series well collection.
		 * @param collection series collection.
		 */
		renderSeries: function(collection) {
			var seriesWellListTmpl = SeriesWellListTemplate({series: collection.toJSON()});
			this.$el.html(seriesWellListTmpl);
		},

		/**
		 * Remove the header view.
		 */
		remove: function() {
			//this.series.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return SeriesHeaderView;
});
