/**
 * SearchPageView.js
 *
 * Backbone view representing ebooklibrary application search page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/page/BasePageView',
    'ebooklibrary/view/well/search/SearchWellView',
    'ebooklibrary/view/panel/books/BooksPanelView',
    'ebooklibrary/collection/SearchCollection',
    'backbone'
],
function(
    BasePageView,
    SearchWellView,
    BooksPanelView,
    SearchCollection,
    Backbone
) {
	var SearchPageView = BasePageView.extend({
		pageClass: 'search',		// application page class
		pageTitle: 'Search',		// page title
		
		search: null,		// search well view
		books: null,		// books panel view

		/**
		 * Initialise the application search page view.
		 * @param options search page options (keyword).
		 */
		initialize: function(options) {
			options = options || {};

			var searchCollection = new SearchCollection([], {keyword: options.search});
			searchCollection.fetch({reset: true});

			this.search = new SearchWellView({collection: searchCollection});

			this.books = new BooksPanelView({collection: searchCollection});
			//this.listenTo(this.books.collection, 'reset', this.showBooks);
			//this.listenTo(this.books.collection, 'error', this.showBooks);
			this.listenTo(this.books.collection, 'reset', this.hideLoading);
			this.listenTo(this.books.collection, 'error', this.hideLoading);
		},
		
		/**
		 * Render the application search page.
		 * @return application search page view
		 */
		onPageRender: function() {
			this.$el.append(this.search.render().el);
			this.$el.append(this.books.render().el);

			return this;
		},

		/**
		 * Show books.
		 * @param collection books collection.
		 */
		showBooks: function(collection, resp) {
			this.loading.$el.fadeOut('slow');
		},

		/**
		 * Remove the application search page.
		 */
		onPageRemove: function() {
			this.search.remove();
			this.books.remove();

			//Backbone.View.prototype.remove.apply(this);
		}
	});
	
	return SearchPageView;
});
