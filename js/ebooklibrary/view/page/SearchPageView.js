/**
 * SearchPageView.js
 *
 * Backbone view representing ebooklibrary application search page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/well/search/SearchWell',
    'ebooklibrary/view/well/loading/LoadingWellView',
    'ebooklibrary/view/panel/books/BooksPanelView',
    'ebooklibrary/collection/SearchCollection',
    'backbone'
],
function(
    SearchWellTemplate,
    LoadingWellView,
    BooksPanelView,
    SearchCollection,
    Backbone
) {
	var SearchPageView = Backbone.View.extend({
		className: 'content-search',
		
		loading: null,		// loading well view
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
			this.$el.append(this.books.render().el);

			return this;
		},

		/**
		 * Show books.
		 * @param collection books collection.
		 */
		showBooks: function(collection, resp) {
			this.loading.$el.fadeOut('slow');

			if (!(resp instanceof Array) && resp.status !== 200)
				collection.error = true;

			var searchWellTmpl = SearchWellTemplate(collection);
			this.$el.prepend(searchWellTmpl);
		},

		/**
		 * Remove the application search page.
		 */
		remove: function() {
			this.loading.remove();
			this.books.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});
	
	return SearchPageView;
});
