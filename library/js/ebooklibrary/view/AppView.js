/**
 * AppView.js
 *
 * Backbone view representing ebooklibrary main application.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/navbar/NavBarView',
    'ebooklibrary/view/footer/FooterView',
    'ebooklibrary/view/page/HomePageView',
    'ebooklibrary/view/page/BooksPageView',
    'ebooklibrary/view/page/SearchPageView',
    'ebooklibrary/view/page/BookPageView',
    'ebooklibrary/view/page/LinksPageView',
    'backbone'
],
function(
    NavBarView,
    FooterView,
    HomePageView,
    BooksPageView,
    SearchPageView,
    BookPageView,
    LinksPageView,
    Backbone
) {
	var AppView = Backbone.View.extend({
		el: 'body',
		
		navBar: null,	// navigation bar view
		footer: null,	// footer view

		page: null,	// current page view

		/**
		 * Initialize the main application view.
		 */
		initialize: function() {
			this.navBar = new NavBarView();
			this.footer = new FooterView();
		},
		
		/**
		 * Render the main application view.
		 * @return main application view
		 */
		render: function() {
			this.$el.prepend(this.navBar.render().el);
			this.$el.append(this.footer.render().el);
		},

		setPageTitle: function(title) {
			var pageTitle = 'ebooklibrary';

			if (title) {
				pageTitle += ' | ' + title;
			}

			$(document).prop('title', pageTitle);
		},

		/**
		 * Show page view.
		 * @param pageView page view.
		 */
		showPageView: function(pageView) {
			this.page && this.page.remove();
			this.page = pageView;

			this.setApplicationPageClass(this.page.pageClass);
			this.navBar.setBreadcrumb(this.page.pageBreadCrumb);
			console.log(this.page.pageBreadCrumb);

			this.$('.content-container').html(this.page.render().el);
		},

		/**
		 * Show home page.
		 */
		showHomePage: function() {
			this.showPageView(new HomePageView());
		},

		/**
		 * Show books page.
		 * @param author author name.
		 * @param series series name.
		 */
		showBooksPage: function(author, series) {
			this.showPageView(new BooksPageView({author: author, series: series}));
		},

		/**
		 * Show search page.
		 * @param keyword search keyword.
		 */
		showSearchPage: function(keyword) {
			this.showPageView(new SearchPageView({search: keyword}));
		},

		/**
		 * Show book page.
		 * @param author author name.
		 * @param series series name.
		 * @param book book file name.
		 */
		showBookPage: function(author, series, book) {
			this.setApplicationPageClass('book');

			this.navBar.setBreadcrumb({author: author, series: series});
			this.navBar.breadcrumbView.setAuthorActive(false);
			this.navBar.breadcrumbView.setSeriesActive(false);

			this.showPageView(new BookPageView({author: author, series: series, book: book}));
		},

		/**
		 * Show links page.
		 */
		showLinksPage: function() {
			this.setApplicationPageClass('links');

			this.navBar.setBreadcrumb({links: ''});
			this.navBar.searchBoxView.$el.hide();

			this.setPageTitle('Links');

			this.showPageView(new LinksPageView());
		},

		/**
		 * Set the application page class.
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
		},
		
		/**
		 * Remove the main application view.
		 */
		remove: function() {
			this.navBar.remove();
			this.page.remove();
			this.footer.remove();

			Backbone.View.prototype.remove().apply(this);
		}
	});
	
	return new AppView;
});
