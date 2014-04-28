/**
 * AppBookTextView.js
 *
 * Backbone view representing ebooklibrary application book text page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/loadingpanel/LoadingPanelView',
    'ebooklibrary/view/booktextpanel/BookTextPanelView',
    'backbone'
],
function(
    LoadingPanelView,
    BookTextPanelView,
    Backbone
) {
	var AppBookTextView = Backbone.View.extend({
		el: '.content-container',
		
		loadingPanelView: null,		// loading panel view
		bookTextPanelView: null,	// book text panel view

		/**
		 * Initialise the application book text page view.
		 * @param options book text page options (author, series, book).
		 */
		initialize: function(options) {
			options = options || {};

			this.loadingPanelView = new LoadingPanelView();

			this.bookTextPanelView = new BookTextPanelView({author: options.author, series: options.series, book: options.book});
			this.listenTo(this.bookTextPanelView.model, 'sync', this.showBookTextPanel);
		},
		
		/**
		 * Render the application book text page.
		 * @return application book text page view
		 */
		render: function() {
			this.$el.append(this.loadingPanelView.render().el);

			this.bookTextPanelView.$el.hide();
			this.$el.append(this.bookTextPanelView.render().el);

			return this;
		},

		/**
		 * Show book text panel.
		 * @param model book text model.
		 */
		showBookTextPanel: function(model) {
			this.loadingPanelView.$el.fadeOut('slow');
			this.bookTextPanelView.$el.fadeIn('slow');
		}
	});
	
	return AppBookTextView;
});
