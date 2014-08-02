/**
 * AppModel.js
 *
 * Backbone model representing main application views.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'backbone'
],
function(
    Backbone
) {
	var AppModel = Backbone.Model.extend({
		/**
		 * Set application view to home page.
		 */
		setViewHome: function() {
			this.trigger('viewHome');
		},

		/**
		 * Set application view to books page.
		 * @param author author name.
		 * @param series series name.
		 */
		setViewBooks: function(author, series) {
			author = author || '';
			series = series || '';
			this.trigger('viewBooks', author, series);
		},

		/**
		 * Set application view to search page.
		 * @param keyword search keyword.
		 */
		setViewSearch: function(keyword) {
			keyword = keyword || '';
			this.trigger('viewSearch', keyword);
		},

		/**
		 * Set application view to book text page.
		 * @param author author name.
		 * @param series series name.
		 * @param book book file name.
		 */
		setViewBookText: function(author, series, book) {
			author = author || '';
			series = series || '';
			book = book || '';
			this.trigger('viewBookText', author, series, book);
		}
	});

	return new AppModel;
});
