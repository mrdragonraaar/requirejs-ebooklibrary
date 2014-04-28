/**
 * AppSearchView.js
 *
 * Backbone view representing ebooklibrary application search page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/searchpanel/SearchPanelView',
    'ebooklibrary/view/loadingpanel/LoadingPanelView',
    'ebooklibrary/view/bookspanel/BooksPanelView',
    'ebooklibrary/collection/SearchCollection',
    'backbone'
],
function(
    SearchPanelViewTemplate,
    LoadingPanelView,
    BooksPanelView,
    SearchCollection,
    Backbone
) {
	var AppSearchView = Backbone.View.extend({
		el: '.content-container',
		
		loadingPanelView: null,		// loading panel view
		booksPanelView: null,		// books panel view

		/**
		 * Initialise the application search page view.
		 * @param options search page options (keyword).
		 */
		initialize: function(options) {
			options = options || {};

			this.loadingPanelView = new LoadingPanelView();

			var searchCollection = new SearchCollection([], {keyword: options.keyword});
			this.booksPanelView = new BooksPanelView({collection: searchCollection});
			this.listenTo(this.booksPanelView.collection, 'sync', this.showBooksPanel);
			this.listenTo(this.booksPanelView.collection, 'error', this.showBooksPanel);
		},
		
		/**
		 * Render the application search page.
		 * @return application search page view
		 */
		render: function() {
			this.$el.append(this.loadingPanelView.render().el);

			this.booksPanelView.$el.hide();
			this.$el.append(this.booksPanelView.render().el);

			return this;
		},

		/**
		 * Show books panel.
		 * @param collection books collection.
		 */
		showBooksPanel: function(collection, resp) {
			this.loadingPanelView.$el.fadeOut('slow');

			if (!(resp instanceof Array) && resp.status !== 200)
				collection.error = true;

			var searchPanelTmpl = SearchPanelViewTemplate(collection);
			this.$el.prepend(searchPanelTmpl);

			this.booksPanelView.$el.fadeIn('slow');
		}
	});
	
	return AppSearchView;
});
