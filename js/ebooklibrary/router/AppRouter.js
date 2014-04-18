/**
 * AppRouter.js
 *
 * Main application router.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/AppView',
    'ebooklibrary/model/AppModel',
    'backbone'
],
function(
    AppView,
    AppModel,
    Backbone
) {
	var AppRouter = Backbone.Router.extend({
		/**
		 * Define main application routes.
		 */
		routes: {
			'!/home(/)': 'home',
			'!/books/:author(/)': 'books',
			'!/books/:author/*series(/)': 'books',
			'!/search(/)': 'search',
			'!/search/*search': 'search',
			'!/book/:author/(*series/):book': 'book',
			'': 'empty',
			'*404': 'empty'
		},
		
		/**
		 * Initialise the main application routing.
		 */
		initialize: function() {
			AppView.render();
			
			Backbone.history.start();
		},
		
		/**
		 * Empty route.
		 */
		empty: function() {
			this.navigate('!/home', {trigger: true});
		},
		
		/**
		 * Home page route.
		 */
		home: function() {
			AppModel.setViewHome();
		},

		/**
		 * Books page route.
		 * @param author author name.
		 * @param series series name.
		 */
		books: function(author, series) {
			AppModel.setViewBooks(author, series);
		},

		/**
		 * Search page route.
		 * @param keyword search keyword.
		 */
		search: function(keyword) {
			AppModel.setViewSearch(keyword);
		},

		/**
		 * Book text page route.
		 * @param author author name.
		 * @param series series name.
		 * @param book name.
		 */
		book: function(author, series, book) {
			AppModel.setViewBookText(author, series, book);
		}
	});
	
	return AppRouter;
});
