/**
 * FileCollection.js
 *
 * Backbone collection of file models.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/FileModel',
    'backbone'
],
function(
    FileModel,
    Backbone
) {
	var FileCollection = Backbone.Collection.extend({
		model: FileModel,	// file model

		/**
		 * Initialise the file collection.
		 * @param models file collection models.
		 * @param options file collection options.
		 */
		initialize: function(models, options) {
			options = options || {};
			this.setSortBy('name', true);
		},

		/**
		 * Set sort comparator.
		 * @param key sort comparator key.
		 * @param asc true if comparator is ascending.
		 */
		setSortBy: function(key, asc) {
			this.comparator = this._sortBy(key, asc);
		},

		/**
		 * Get sort comparator.
		 * @param key sort comparator key.
		 * @param asc true if comparator is ascending.
		 */
		_sortBy: function(key, asc) {
			if (key.toLowerCase() === 'name') return this._sortByName(asc);
			if (key.toLowerCase() === 'atime') return this._sortByATime(asc);
			if (key.toLowerCase() === 'ctime') return this._sortByCTime(asc);
			if (key.toLowerCase() === 'mtime') return this._sortByMTime(asc);
			if (key.toLowerCase() === 'last modified') return this._sortByMTime(asc);
			if (key.toLowerCase() === 'size') return this._sortBySize(asc);
		},

		/**
		 * Get comparator to sort by file name.
		 * @param asc true if comparator is ascending.
		 */
		_sortByName: function(asc) {
			return asc ? this._sortByNameAsc : this._sortByNameDesc;
		},

		/**
		 * Comparator to sort ascending by file name.
		 */
		_sortByNameAsc: function(a, b) {
			a = a.get('fileInfo').name;
			b = b.get('fileInfo').name;
			return a < b ? -1
				: a > b ? 1
				: 0;
		},

		/**
		 * Comparator to sort descending by file name.
		 */
		_sortByNameDesc: function(a, b) {
			a = a.get('fileInfo').name;
			b = b.get('fileInfo').name;
			return a < b ? 1
				: a > b ? -1
				: 0;
		},

		/**
		 * Get comparator to sort by atime.
		 * @param asc true if comparator is ascending.
		 */
		_sortByATime: function(asc) {
			return asc ? this._sortByATimeAsc : this._sortByATimeDesc;
		},

		/**
		 * Comparator to sort ascending by atime.
		 */
		_sortByATimeAsc: function(a, b) {
			a = a.get('fileInfo').atime;
			b = b.get('fileInfo').atime;

			return a - b;
		},

		/**
		 * Comparator to sort descending by atime.
		 */
		_sortByATimeDesc: function(a, b) {
			a = a.get('fileInfo').atime;
			b = b.get('fileInfo').atime;

			return b - a;
		},

		/**
		 * Get comparator to sort by ctime.
		 * @param asc true if comparator is ascending.
		 */
		_sortByCTime: function(asc) {
			return asc ? this._sortByCTimeAsc : this._sortByCTimeDesc;
		},

		/**
		 * Comparator to sort ascending by ctime.
		 */
		_sortByCTimeAsc: function(a, b) {
			a = a.get('fileInfo').ctime;
			b = b.get('fileInfo').ctime;

			return a - b;
		},

		/**
		 * Comparator to sort descending by ctime.
		 */
		_sortByCTimeDesc: function(a, b) {
			a = a.get('fileInfo').ctime;
			b = b.get('fileInfo').ctime;

			return b - a;
		},

		/**
		 * Get comparator to sort by mtime.
		 * @param asc true if comparator is ascending.
		 */
		_sortByMTime: function(asc) {
			return asc ? this._sortByMTimeAsc : this._sortByMTimeDesc;
		},

		/**
		 * Comparator to sort ascending by mtime.
		 */
		_sortByMTimeAsc: function(a, b) {
			a = a.get('fileInfo').mtime;
			b = b.get('fileInfo').mtime;

			return a - b;
		},

		/**
		 * Comparator to sort descending by mtime.
		 */
		_sortByMTimeDesc: function(a, b) {
			a = a.get('fileInfo').mtime;
			b = b.get('fileInfo').mtime;

			return b - a;
		},

		/**
		 * Get comparator to sort by size.
		 * @param asc true if comparator is ascending.
		 */
		_sortBySize: function(asc) {
			return asc ? this._sortBySizeAsc : this._sortBySizeDesc;
		},

		/**
		 * Comparator to sort ascending by size.
		 */
		_sortBySizeAsc: function(a, b) {
			a = a.get('fileInfo').size;
			b = b.get('fileInfo').size;

			return a - b;
		},

		/**
		 * Comparator to sort descending by size.
		 */
		_sortBySizeDesc: function(a, b) {
			a = a.get('fileInfo').size;
			b = b.get('fileInfo').size;

			return b - a;
		}
	});

	return FileCollection;
});
