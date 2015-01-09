/**
 * AppRouter.js
 *
 * Main application router.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/AppView',
    'backbone'
],
function(
    AppView,
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
			'': 'empty',
			'*404': 'empty'
		},
		
		/**
		 * Initialize the main application routing.
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
			AppView.showHomePage();
		},

		/**
		 * Books page route.
		 * @param author author name.
		 * @param series series name.
		 */
		books: function(author, series) {
			AppView.showBooksPage(author, series);
		},

		/**
		 * Search page route.
		 * @param keyword search keyword.
		 */
		search: function(keyword) {
			if (!keyword) keyword = '';
			AppView.showSearchPage(keyword);
		}
	});
	
	return AppRouter;
});
