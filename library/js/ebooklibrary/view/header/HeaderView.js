/**
 * HeaderView.js
 *
 * Backbone view representing ebooklibrary header.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/panel/latestadditions/LatestAdditionsPanelView',
    //'ebooklibrary/view/panel/series/SeriesPanelView',
    //'ebooklibrary/collection/SeriesCollection',
    'backbone'
],
function(
    LatestAdditionsPanelView,
    //SeriesPanelView,
    //SeriesCollection,
    Backbone
) {
	var HeaderView = Backbone.View.extend({
		tagName: 'header',
		className: 'header header-default',

		latestAdditions: null,		// latest additions panel view

		/**
		 * Initialise the header view.
		 * @param options header options.
		 */
		initialize: function(options) {
			options = options || {};

			this.latestAdditions = new LatestAdditionsPanelView({max: options.max});

			//var seriesCollection = new SeriesCollection([],
			   //{author: options.author, series: options.series});
			//seriesCollection.fetch({reset: true});

			//this.series = new SeriesPanelView({collection: seriesCollection});
		},

		/**
		 * Render the header view.
		 * @return header view
		 */
		render: function() {
			this.$el.html(this.latestAdditions.render().el);
			//this.$el.html(this.series.render().el);

			return this;
		},

		/**
		 * Remove the header view.
		 */
		remove: function() {
			this.latestAdditions.remove();
			//this.series.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return HeaderView;
});
