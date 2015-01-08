/**
 * TestPageView.js
 *
 * Backbone view representing ebooklibrary application home page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/page/BasePageView',
    'ebooklibrary/view/header/HeaderView',
    'ebooklibrary/view/panel/authors/AuthorsPanelView',
    'ebooklibrary/view/panel/books/BooksPanelView',
    'ebooklibrary/collection/BookCollection',
    'ebooklibrary/collection/AuthorCollection',
    'backbone'
],
function(
    BasePageView,
    HeaderView,
    AuthorsPanelView,
    BooksPanelView,
    BookCollection,
    AuthorCollection,
    Backbone
) {
	var TestPageView = BasePageView.extend({
		pageClass: 'home',		// application page class
		pageTitle: function() {
			return this.pageBreadCrumb.series ? (this.pageBreadCrumb.author + ' | ' + this.pageBreadCrumb.series) : this.pageBreadCrumb.author;
		},
		
		header: null,			// header view
		authors: null,			// authors panel view
		books: null,			// books panel view

		/**
		 * Initialise the application home page view.
		 * @param options home page options (max).
		 */
		initialize: function(options) {
			options = options || {};

			this.header = new HeaderView({author: options.author, series: options.series});

			//var authorCollection = new AuthorCollection();
			//authorCollection.fetch({reset: true});

			//this.authors = new AuthorsPanelView({collection: authorCollection});
			//this.listenTo(this.authors.collection, 'reset', this.hideLoading);

			var bookCollection = new BookCollection([],
			   {author: options.author, series: options.series});
			bookCollection.fetch({reset: true, timeout: 20000});

			this.books = new BooksPanelView({collection: bookCollection});
			this.listenTo(this.books.collection, 'reset', this.hideLoading);
		},
		
		/**
		 * Render the application home page.
		 * @return application home page view
		 */
		onPageRender: function() {
			this.$el.append(this.header.render().el);
			//this.$el.append(this.authors.render().el);
			this.$el.append(this.books.render().el);

			return this;
		},

		onPageRemove: function() {
			this.header.remove();
			//this.authors.remove();
			this.books.remove();

			//BasePageView.prototype.remove.apply(this);
		}
	});
	
	return TestPageView;
});
