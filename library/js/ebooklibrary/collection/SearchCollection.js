/**
 * SearchCollection.js
 *
 * Backbone collection of searched book models.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/collection/BookCollection'
],
function(
    BookCollection
) {
	var SearchCollection = BookCollection.extend({
		keyword: '',	// search keyword

		/**
		 * Define search collection url.
		 * @return search collection url
		 */
		url: function() {
			var url = '/library/json/search';
			if (this.keyword) {
				url += '/' + this.keyword;
			}

			return url;
		},

		initialize: function(models, options) {
			options = options || {};
			if (options.keyword) this.keyword = options.keyword;
			this.setSortBy('name', true);
		}
	});

	return SearchCollection;
});
