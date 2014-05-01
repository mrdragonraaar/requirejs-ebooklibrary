/**
 * AppBooksView.js
 *
 * Backbone view representing ebooklibrary application books page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/loadingpanel/LoadingPanelView',
    'ebooklibrary/view/seriespanel/SeriesPanelView',
    'ebooklibrary/view/bookspanel/BooksPanelView',
    'ebooklibrary/collection/BookCollection',
    'backbone'
],
function(
    LoadingPanelView,
    SeriesPanelView,
    BooksPanelView,
    BookCollection,
    Backbone
) {
	var AppBooksView = Backbone.View.extend({
		el: '.content-container',
		
		loadingPanelView: null,		// loading panel view
		seriesPanelView: null,		// series panel view
		booksPanelView: null,		// books panel view

		/**
		 * Initialise the application books page view.
		 * @param options books page options (author, series).
		 */
		initialize: function(options) {
			options = options || {};

			this.loadingPanelView = new LoadingPanelView();

			this.seriesPanelView = new SeriesPanelView({author: options.author, series: options.series});
			this.listenTo(this.seriesPanelView.collection, 'sync', this.showSeriesPanel);

			var bookCollection = new BookCollection([], {author: options.author, series: options.series});
			this.booksPanelView = new BooksPanelView({collection: bookCollection});
			this.listenTo(this.booksPanelView.collection, 'sync', this.showBooksPanel);
		},
		
		/**
		 * Render the application books page.
		 * @return application books page view
		 */
		render: function() {
			this.$el.append(this.loadingPanelView.render().el);

			this.seriesPanelView.$el.hide();
			this.$el.append(this.seriesPanelView.render().el);
			this.$el.append(this.booksPanelView.render().el);

			return this;
		},

		/**
		 * Show series panel.
		 * @param collection series collection.
		 */
		showSeriesPanel: function(collection) {
			if (collection.length > 0) {
				this.seriesPanelView.$el.fadeIn('slow');
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
