/**
 * BooksView.js
 *
 * Backbone view representing ebooklibrary books.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/books/BooksView',
    'ebooklibrary/view/books/BooksNavToolBarView',
    'ebooklibrary/view/books/BooksContentView',
    'backbone'
],
function(
    BooksViewTemplate,
    BooksNavToolBarView,
    BooksContentView,
    Backbone
) {
	var BooksView = Backbone.View.extend({
		tagName: 'books',
		className: 'panel panel-books',

		toolBarView: null,	// toolbar view
		booksContentView: null,	// books content view

		/**
		 * Initialise the books view.
		 * @param options books options (collection).
		 */
		initialize: function(options) {
			options = options || {};

			this.listenTo(this.collection, 'reset', this.onResetBooksContent);

			this.toolBarView = new BooksNavToolBarView();
			this.listenTo(this.toolBarView, 'toolBarViewAs', this.onToolBarViewAs);
			this.listenTo(this.toolBarView, 'toolBarSortBy', this.onToolBarSortBy);

			this.booksContentView = new BooksContentView({collection: this.collection});
		},

		onResetBooksContent: function(collection) {
			this.setBooksBadge(collection.length);

			if (collection.length > 0) {
				this.toolBarView.enableNavToolBar();
			}
		},

		/**
		 * Event handler for toolbar viewAs event.
		 * @param viewAs viewAs type.
		 */
		onToolBarViewAs: function(viewAs) {
			this.booksContentView.setBooksContent(viewAs);
		},

		/**
		 * Event handler for toolbar sortBy event.
		 * @param sortBy sortBy type.
		 * @param isAscending true if sort type is ascending.
		 */
		onToolBarSortBy: function(sortBy, isAscending) {
			this.booksContentView.sortBooks(sortBy, isAscending);
		},

		/**
		 * Render the books view.
		 * @return books view
		 */
		render: function() {
			var booksTmpl = BooksViewTemplate();
			this.$el.html(booksTmpl);

			this.$('.panel-heading').append(this.toolBarView.render().el);
			this.toolBarView.disableNavToolBar();

			this.$el.append(this.booksContentView.render().el);

			return this;
		},

		/**
		 * Set the value for book count badge.
		 * @param count book count.
		 */
		setBooksBadge: function(count) {
			count = count || 0;
			this.$('.panel-heading > .badge-books').text(count);
			this.$('.panel-heading > .badge-books').attr('title', count + ' books');
		},

		remove: function() {
			this.toolBarView.remove();
			this.booksContentView.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return BooksView;
});
