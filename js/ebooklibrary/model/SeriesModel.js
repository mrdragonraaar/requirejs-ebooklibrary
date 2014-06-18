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
		 * Get url href.
		 * @return href
		 */
		href: function() {
			var href = '/library/#!/books/' + this.get('authorName') + '/';
			if (this.get('seriesName')) {
				href += this.get('seriesName') + '/';
			}
			href += this.get('fileInfo').name + '/';

			return href;
		}
	});

	return SeriesModel;
});
