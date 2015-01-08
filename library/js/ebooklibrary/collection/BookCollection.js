/**
 * BookCollection.js
 *
 * Backbone collection of book models.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/BookModel',
    'ebooklibrary/collection/SeriesCollection'
], function(
    BookModel,
    SeriesCollection
) {
	var BookCollection = SeriesCollection.extend({
		model: BookModel,	// book model

		/**
		 * Define book collection url.
		 * @return book collection url
		 */
		url: function() {
			var url = '/library/json/books/' + this.author;
			if (this.series) {
				url += '/' + this.series;
			}

			return url;
		},

		/**
		 * Get sort comparator.
		 * @param key sort comparator key.
		 * @param asc true if comparator is ascending.
		 */
		_sortBy: function(key, asc) {
			if (key.toLowerCase() === 'title') return this._sortByTitle(asc);
			if (key.toLowerCase() === 'author') return this._sortByAuthor(asc);
			if (key.toLowerCase() === 'publicationdate') return this._sortByPublishingDate(asc);

			return SeriesCollection.prototype._sortBy.call(this, key, asc);
		},

		/**
		 * Get comparator to sort by title.
		 * @param asc true if comparator is ascending.
		 */
		_sortByTitle: function(asc) {
			return asc ? this._sortByTitleAsc : this._sortByTitleDesc;
		},

		/**
		 * Comparator to sort ascending by title.
		 */
		_sortByTitleAsc: function(a, b) {
			a = a.get('bookInfo').titleSort;
			b = b.get('bookInfo').titleSort;
			return a < b ? -1
				: a > b ? 1
				: 0;
		},

		/**
		 * Comparator to sort descending by title.
		 */
		_sortByTitleDesc: function(a, b) {
			a = a.get('bookInfo').titleSort;
			b = b.get('bookInfo').titleSort;
			return a < b ? 1
				: a > b ? -1
				: 0;
		},

		/**
		 * Get comparator to sort by author.
		 * @param asc true if comparator is ascending.
		 */
		_sortByAuthor: function(asc) {
			return asc ? this._sortByAuthorAsc : this._sortByAuthorDesc;
		},

		/**
		 * Comparator to sort ascending by author.
		 */
		_sortByAuthorAsc: function(a, b) {
			a = a.get('bookInfo').authorSort;
			b = b.get('bookInfo').authorSort;
			return a < b ? -1
				: a > b ? 1
				: 0;
		},

		/**
		 * Comparator to sort descending by author.
		 */
		_sortByAuthorDesc: function(a, b) {
			a = a.get('bookInfo').authorSort;
			b = b.get('bookInfo').authorSort;
			return a < b ? 1
				: a > b ? -1
				: 0;
		},

		/**
		 * Get comparator to sort by publishing date.
		 * @param asc true if comparator is ascending.
		 */
		_sortByPublishingDate: function(asc) {
			return asc ? this._sortByPublishingDateAsc : this._sortByPublishingDateDesc;
		},

		/**
		 * Comparator to sort ascending by publishing date.
		 */
		_sortByPublishingDateAsc: function(a, b) {
			a = a.get('bookInfo').publishingDate;
			b = b.get('bookInfo').publishingDate;
			return a < b ? -1
				: a > b ? 1
				: 0;
		},

		/**
		 * Comparator to sort descending by publishing date.
		 */
		_sortByPublishingDateDesc: function(a, b) {
			a = a.get('bookInfo').publishingDate;
			b = b.get('bookInfo').publishingDate;
			return a < b ? 1
				: a > b ? -1
				: 0;
		}
	});

	return BookCollection;
});
