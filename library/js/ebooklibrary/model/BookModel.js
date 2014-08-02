/**
 * BookModel.js
 *
 * Backbone model representing a book item.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/SeriesModel'
],
function(
    SeriesModel
) {
	var BookModel = SeriesModel.extend({
		/**
		 * Extend model defaults.
		 * @return defaults object
		 */
		defaults: function() {
			return _.extend(this.constructor.__super__.defaults(), {
				text: '',
				bookInfo: {
					author: '',
					authorSort: '',
					contributor: '',
					cover: '',
					creatorSoftware: '',
					description: '',
					isbn: 0,
					language: 'en',
					publisher: '',
					publishingDate: '',
					subject: '',
					title: '',
					titleSort: ''
				}
			});
		},

		/**
		 * Define book model url root.
		 * @return book model url root
		 */
		urlRoot: function() {
			var urlRoot = '/library/json/book/' + this.get('authorName');
			if (this.get('seriesName')) {
				urlRoot += '/' + this.get('seriesName');
			}

			return urlRoot;
		},

		/**
		 * Get string representation of authors.
		 * @return authors string
		 */
		authorStr: function() {
			return BookModel.arrayStr(this.get('bookInfo').author, true);
		},

		/**
		 * Get string representation of subjects.
		 * @return subjects string
		 */
		subjectStr: function() {
			return BookModel.arrayStr(this.get('bookInfo').subject, false);
		},

		/**
		 * Get string representation of publishing date.
		 * @return publishing date string
		 */
		publishingDateStr: function() {
			return BookModel.publishingDateStr(this.get('bookInfo').publishingDate);
		},

		/**
		 * Get url href.
		 * @return href
		 */
		href: function() {
			var href = '/library/#!/book/' + this.get('authorName') + '/';
			if (this.get('seriesName')) {
				href += this.get('seriesName') + '/';
			}
			href += this.get('fileInfo').name;

			return href;
		},

		/**
		 * Get download url of book.
		 * @return download url
		 */
		downloadUrl: function() {
			var downloadUrl = '/library/download/' + this.get('authorName') + '/';
			if (this.get('seriesName')) {
				downloadUrl += this.get('seriesName') + '/';
			}
			downloadUrl += this.get('fileInfo').name;

			return downloadUrl;
		},

		/**
		 * Get json representation of book model.
		 * @param options json options.
		 * @return book model json
		 */
		toJSON: function(options) {
			var json = SeriesModel.prototype.toJSON.call(this, options);
			json.bookInfo.authorStr = this.authorStr();
			json.bookInfo.subjectStr = this.subjectStr();
			json.bookInfo.publishingDateStr = this.publishingDateStr();
			json.downloadUrl = this.downloadUrl();
			return json;
		}
	},
	{
		/**
		 * Get string representation of given array.
		 * @param array array.
		 * @param useAmpersand if true use ampersand before last item.
		 * @return array string
		 */
		arrayStr: function(array, useAmpersand) {
			if (array instanceof Array) {
				var arrayStr = '';
				for (var i = 0; i < array.length; i++) {
					if (i > 0) {
						if (i == array.length - 1 && useAmpersand) {
							arrayStr += ' & ';
						} else {
							arrayStr += ', ';
						}
					}
					arrayStr += array[i];
				}
				return arrayStr;
			}

			return array;
		},

		/**
		 * Get string representation of given publishing date.
		 * @param publishingDate publishing date.
		 * @return publishing date string
		 */
		publishingDateStr: function(publishingDate) {
			var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
				'August', 'September', 'October', 'November', 'December'];

			var date = this.publishingDateObj(publishingDate);

			return months[date.getMonth()] + ' ' +
				('0' + date.getDate()).slice(-2) + ' ' +
				date.getFullYear();
		},

		/**
		 * Get date object representation of given publishing date.
		 * @param publishingDate publishing date.
		 * @return publishing date object
		 */
		publishingDateObj: function(publishingDate) {
			var dateAr = publishingDate.split('-');
			return new Date(dateAr[0], dateAr[1] - 1, dateAr[2]);
		}
	});

	return BookModel;
});
