/**
 * SearchPageView.js
 *
 * Backbone view representing ebooklibrary application search page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/well/loading/LoadingWellView',
    'ebooklibrary/view/well/search/SearchWellView',
    'ebooklibrary/view/panel/books/BooksPanelView',
    'ebooklibrary/collection/SearchCollection',
    'backbone'
],
function(
    LoadingWellView,
    SearchWellView,
    BooksPanelView,
    SearchCollection,
    Backbone
) {
	var SearchPageView = Backbone.View.extend({
		className: 'content-search',
		
		loading: null,		// loading well view
		search: null,		// search well view
		books: null,		// books panel view

		/**
		 * Initialise the application search page view.
		 * @param options search page options (keyword).
		 */
		initialize: function(options) {
			options = options || {};

			this.loading = new LoadingWellView();

			var searchCollection = new SearchCollection([], {keyword: options.keyword});
			searchCollection.fetch({reset: true});

			this.search = new SearchWellView({collection: searchCollection});

			this.books = new BooksPanelView({collection: searchCollection});
			this.listenTo(this.books.collection, 'reset', this.showBooks);
			this.listenTo(this.books.collection, 'error', this.showBooks);
		},
		
		/**
		 * Render the application search page.
		 * @return application search page view
		 */
		render: function() {
			this.$el.append(this.loading.render().el);
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
		remove: function() {
			this.loading.remove();
			this.search.remove();
			this.books.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});
	
	return SearchPageView;
});
