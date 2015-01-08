/**
 * LatestAdditionsCollection.js
 *
 * Backbone collection of latest additions book models.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/collection/BookCollection'
],
function(
    BookCollection
) {
	var LatestAdditionsCollection = BookCollection.extend({
		max: 20,	// max books

		/**
		 * Define latest additions collection url.
		 * @return latest additions collection url
		 */
		url: function() {
			var url = '/library/json/latestAdditions';
			if (this.max) {
				url += '/' + this.max;
			}

			return url;
		},

		initialize: function(models, options) {
			options = options || {};
			if (options.max) this.max = options.max;
			this.setSortBy('ctime', false);
		}
	});

	return LatestAdditionsCollection;
});
