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
    'ebooklibrary/view/links/LinksView',
    'ebooklibrary/view/page/HomePageView',
    'ebooklibrary/view/page/BooksPageView',
    'ebooklibrary/view/page/SearchPageView',
    'ebooklibrary/view/page/BookPageView',
    'backbone'
],
function(
    AppModel,
    NavBarView,
    FooterView,
    LinksView,
    HomePageView,
    BooksPageView,
    SearchPageView,
    BookPageView,
    Backbone
) {
	var AppView = Backbone.View.extend({
		el: 'body',
		//el: '#ebooklibrary',
		
		navBarView: null,	// navigation bar view

		pageView: null,

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

		renderPageView: function(view) {
			this.pageView && this.pageView.remove();
			this.pageView = view;
			this.$('.content-container').html(this.pageView.render().el);
		},

		/**
		 * Render the application home page view.
		 */
		renderHome: function() {
			//this.$('.content-container').empty();

			this.setApplicationPageClass('home');

			this.navBarView.setBreadcrumb();
			//this.navBarView.searchBoxView.showSearchBox(true);

			//this.$('.footer-default > .footer-content').empty();
			//var linksView = new LinksView();
			//this.$('.footer-default > .footer-content').append(linksView.render().el);
			
			//var appHomeView = new AppHomeView();
			//appHomeView.render();

			this.renderPageView(new HomePageView());
		},

		/**
		 * Render the application books page view.
		 * @param author author name.
		 * @param series series name.
		 */
		renderBooks: function(author, series) {

			//this.$('.content-container').empty();

			this.setApplicationPageClass('books');

			this.navBarView.setBreadcrumb({author: author, series: series});
			//this.navBarView.searchBoxView.showSearchBox(false);

			//this.$('.footer-default > .footer-content').empty();

			//var appBooksView = new AppBooksView({author: author, series: series});
			//appBooksView.render();

			//this.appBooksView = new AppBooksView({author: author, series: series});
			//this.appBooksView.render();

			//this.pageView && this.pageView.remove();
			//this.pageView = new AppBooksView({author: author, series: series});
			//this.$('.content-container').html(this.pageView.render().el);

			this.renderPageView(new BooksPageView({author: author, series: series}));
		},

		/**
		 * Render the application search page view.
		 * @param keyword search keyword.
		 */
		renderSearch: function(keyword) {
			this.$('.content-container').empty();

			this.setApplicationPageClass('search');

			this.navBarView.setBreadcrumb({search: keyword});
			//this.navBarView.searchBoxView.showSearchBox(true);

			//var appSearchView = new AppSearchView({keyword: keyword});
			//appSearchView.render();

			this.renderPageView(new SearchPageView({keyword: keyword}));
		},

		/**
		 * Render the application book text page view.
		 * @param author author name.
		 * @param series series name.
		 * @param book book file name.
		 */
		renderBookText: function(author, series, book) {
			this.$('.content-container').empty();

			this.setApplicationPageClass('book');

			this.navBarView.setBreadcrumb({author: author, series: series});
			this.navBarView.breadcrumbView.setAuthorActive(false);
			this.navBarView.breadcrumbView.setSeriesActive(false);
			//this.navBarView.searchBoxView.showSearchBox(false);

			//var appBookTextView = new AppBookTextView({author: author, series: series, book: book});
			//appBookTextView.render();

			this.renderPageView(new BookPageView({author: author, series: series, book: book}));
		},

		/**
		 * Set the application class for specified page.
		 * @param page page class.
		 */
		setApplicationPageClass: function(page) {
			this.removeApplicationPageClasses();
			this.$el.addClass('application-' + page);
		},

		/**
		 * Remove all the application page classes.
		 */
		removeApplicationPageClasses: function() {
			this.$el.removeClass(function(index, css) {
				return (css.match(/application-\w*/g) || []).join(' ');
			});
		}
	});
	
	return new AppView;
});
