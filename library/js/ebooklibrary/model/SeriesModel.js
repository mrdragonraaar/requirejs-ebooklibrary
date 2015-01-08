/**
 * SeriesModel.js
 *
 * Backbone model representing a series item.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/AuthorModel'
],
function(
    AuthorModel
) {
	var SeriesModel = AuthorModel.extend({
		/**
		 * Extend model defaults.
		 * @return defaults object
		 */
		defaults: function() {
			return _.extend(this.constructor.__super__.defaults(), {
				authorName: '',
				seriesName: ''
			});
		},

		/**
		 * Get author url href.
		 * @return author href
		 */
		authorHref: function() {
			return '/library/#!/books/' + this.get('authorName') + '/';
		},

		/**
		 * Get series url href.
		 * @return series href
		 */
		seriesHref: function() {
			var href = this.authorHref();
			if (this.get('seriesName')) {
				href += this.get('seriesName') + '/';
			}
			return href;
		},

		/**
		 * Get url href.
		 * @return href
		 */
		href: function() {
			var href = this.seriesHref();
			href += this.get('fileInfo').name + '/';

			return href;
		},

		/**
		 * Get json representation of series model.
		 * @param options json options.
		 * @return series model json
		 */
		toJSON: function(options) {
			var json = AuthorModel.prototype.toJSON.call(this, options);
			json.authorHref = this.authorHref();
			json.seriesHref = this.seriesHref();
			return json;
		}
	});

	return SeriesModel;
});
