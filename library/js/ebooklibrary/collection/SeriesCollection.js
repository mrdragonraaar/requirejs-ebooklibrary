/**
 * SeriesCollection.js
 *
 * Backbone collection of series models.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/SeriesModel',
    'ebooklibrary/collection/AuthorCollection'
],
function(
    SeriesModel,
    AuthorCollection
) {
	var SeriesCollection = AuthorCollection.extend({
		model: SeriesModel,	// series model
		author: '',		// author name
		series: '',		// series name

		/**
		 * Initialise the series collection.
		 * @param models series collection models.
		 * @param options series collection options (author, series).
		 */
		initialize: function(models, options) {
			AuthorCollection.prototype.initialize.call(this, models, options);
			if (options.author) this.author = options.author;
			if (options.series) this.series = options.series;
		},

		/**
		 * Define series collection url.
		 * @return series collection url
		 */
		url: function() {
			var url = '/library/json/series/' + this.author;
			if (this.series) {
				url += '/' + this.series;
			}

			return url;
		}
	});

	return SeriesCollection;
});
