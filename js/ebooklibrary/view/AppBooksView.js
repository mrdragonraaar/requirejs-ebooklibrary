/**
 * AppBooksView.js
 *
 * Backbone view representing ebooklibrary application books page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/loadingpanel/LoadingPanelView',
    'ebooklibrary/view/series/SeriesView',
    'ebooklibrary/view/books/BooksView',
    'ebooklibrary/collection/BookCollection',
    'backbone'
],
function(
    LoadingPanelView,
    SeriesView,
    BooksView,
    BookCollection,
    Backbone
) {
	var AppBooksView = Backbone.View.extend({
		el: '.content-container',
		
		loadingPanelView: null,		// loading panel view
		seriesView: null,		// series view
		booksView: null,		// books panel view

		/**
		 * Initialise the application books page view.
		 * @param options books page options (author, series).
		 */
		initialize: function(options) {
			options = options || {};

			this.loadingPanelView = new LoadingPanelView();

			this.seriesView = new SeriesView({author: options.author, series: options.series});
			this.listenTo(this.seriesView.collection, 'sync', this.showSeries);

			var bookCollection = new BookCollection([], {author: options.author, series: options.series});
			this.booksView = new BooksView({collection: bookCollection});
			this.listenTo(this.booksView.collection, 'sync', this.showBooksPanel);
		},
		
		/**
		 * Render the application books page.
		 * @return application books page view
		 */
		render: function() {
			this.$el.append(this.loadingPanelView.render().el);

			this.seriesView.$el.hide();
			this.$el.append(this.seriesView.render().el);
			this.$el.append(this.booksView.render().el);

			return this;
		},

		/**
		 * Show series.
		 * @param collection series collection.
		 */
		showSeries: function(collection) {
			if (collection.length > 0) {
				this.seriesView.$el.fadeIn('slow');
			}
		},

		/**
		 * Show books panel.
		 * @param collection books collection.
		 */
		showBooksPanel: function(collection) {
			this.loadingPanelView.$el.fadeOut('slow');
		}
	});
	
	return AppBooksView;
});
