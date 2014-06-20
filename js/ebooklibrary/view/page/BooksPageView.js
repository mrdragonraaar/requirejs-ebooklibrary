/**
 * BooksPageView.js
 *
 * Backbone view representing ebooklibrary application books page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/well/loading/LoadingPanelView',
    'ebooklibrary/view/well/series/SeriesWellView',
    'ebooklibrary/view/panel/books/BooksPanelView',
    'ebooklibrary/collection/SeriesCollection',
    'ebooklibrary/collection/BookCollection',
    'backbone'
],
function(
    LoadingWellView,
    SeriesWellView,
    BooksPanelView,
    SeriesCollection,
    BookCollection,
    Backbone
) {
	var BooksPageView = Backbone.View.extend({
		className: 'content-books',
		
		loading: null,		// loading well view
		series: null,		// series well view
		books: null,		// books panel view

		/**
		 * Initialise the application books page view.
		 * @param options books page options (author, series).
		 */
		initialize: function(options) {
			options = options || {};

			this.loading = new LoadingWellView();

			var seriesCollection = new SeriesCollection([],
			   {author: options.author, series: options.series});
			seriesCollection.fetch({reset: true});

			this.series = new SeriesWellView({collection: seriesCollection});
			this.listenTo(this.series.collection, 'reset', this.showSeries);

			var bookCollection = new BookCollection([],
			   {author: options.author, series: options.series});
			bookCollection.fetch({reset: true, timeout: 20000});

			this.books = new BooksPanelView({collection: bookCollection});
			this.listenTo(this.books.collection, 'reset', this.showBooks);
		},
		
		/**
		 * Render the application books page.
		 * @return application books page view
		 */
		render: function() {
			this.$el.append(this.loading.render().el);

			this.series.$el.hide();
			this.$el.append(this.series.render().el);
			this.$el.append(this.books.render().el);

			return this;
		},

		/**
		 * Show series.
		 * @param collection series collection.
		 */
		showSeries: function(collection) {
			if (collection.length > 0) {
				this.series.$el.fadeIn('slow');
			}
		},

		/**
		 * Show books panel.
		 * @param collection books collection.
		 */
		showBooks: function(collection) {
			this.loading.$el.fadeOut('slow');
		},

		/**
		 * Remove the application books page.
		 */
		remove: function() {
			this.loading.remove();
			this.series.remove();
			this.books.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});
	
	return BooksPageView;
});
