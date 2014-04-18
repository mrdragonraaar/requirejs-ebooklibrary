/**
 * AppView.js
 *
 * Backbone view representing ebooklibrary main application.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/AppModel',
    'ebooklibrary/view/navbar/NavBarView',
    'ebooklibrary/view/footer/FooterView',
    'ebooklibrary/view/AppHomeView',
    'ebooklibrary/view/AppBooksView',
    'ebooklibrary/view/AppSearchView',
    'ebooklibrary/view/AppBookTextView',
    'backbone'
],
function(
    AppModel,
    NavBarView,
    FooterView,
    AppHomeView,
    AppBooksView,
    AppSearchView,
    AppBookTextView,
    Backbone
) {
	var AppView = Backbone.View.extend({
		el: '#ebooklibrary',
		
		navBarView: null,	// navigation bar view

		/**
		 * Initialise the main application view.
		 */
		initialize: function() {
			this.navBarView = new NavBarView();

			this.listenTo(AppModel, 'viewHome', this.renderHome);
			this.listenTo(AppModel, 'viewBooks', this.renderBooks);
			this.listenTo(AppModel, 'viewSearch', this.renderSearch);
			this.listenTo(AppModel, 'viewBookText', this.renderBookText);
		},
		
		/**
		 * Render the main application view.
		 * @return main application view
		 */
		render: function() {
			this.$el.prepend(this.navBarView.render().el);

			var footerView = new FooterView();
			this.$el.append(footerView.render().el);
		},

		/**
		 * Render the application home page view.
		 */
		renderHome: function() {
			this.$('.content-container').empty();

			this.navBarView.setBreadcrumb();
			this.navBarView.searchBoxView.showSearchBox(true);

			var appHomeView = new AppHomeView();
			appHomeView.render();
		},

		/**
		 * Render the application books page view.
		 * @param author author name.
		 * @param series series name.
		 */
		renderBooks: function(author, series) {
			this.$('.content-container').empty();

			this.navBarView.setBreadcrumb({author: author, series: series});
			this.navBarView.searchBoxView.showSearchBox(false);

			var appBooksView = new AppBooksView({author: author, series: series});
			appBooksView.render();
		},

		/**
		 * Render the application search page view.
		 * @param keyword search keyword.
		 */
		renderSearch: function(keyword) {
			this.$('.content-container').empty();

			this.navBarView.setBreadcrumb({search: keyword});
			this.navBarView.searchBoxView.showSearchBox(true);

			var appSearchView = new AppSearchView({keyword: keyword});
			appSearchView.render();
		},

		/**
		 * Render the application book text page view.
		 * @param author author name.
		 * @param series series name.
		 * @param book book file name.
		 */
		renderBookText: function(author, series, book) {
			this.$('.content-container').empty();

			this.navBarView.setBreadcrumb({author: author, series: series});
			this.navBarView.breadcrumbView.setAuthorActive(false);
			this.navBarView.breadcrumbView.setSeriesActive(false);
			this.navBarView.searchBoxView.showSearchBox(false);

			var appBookTextView = new AppBookTextView({author: author, series: series, book: book});
			appBookTextView.render();
		}
	});
	
	return new AppView;
});
