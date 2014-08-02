/**
 * BooksPanelView.js
 *
 * Backbone view representing ebooklibrary books panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/panel/books/BooksPanel',
    'ebooklibrary/view/panel/books/toolbar/BooksPanelNavToolBarView',
    'ebooklibrary/view/panel/books/content/BooksPanelContentView',
    'backbone'
],
function(
    BooksPanelTemplate,
    BooksPanelNavToolBarView,
    BooksPanelContentView,
    Backbone
) {
	var BooksPanelView = Backbone.View.extend({
		tagName: 'books',
		className: 'panel panel-books',

		toolBar: null,		// toolbar view
		content: null,		// content view

		/**
		 * Initialise the books panel view.
		 * @param options books panel options (collection).
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.resetBooksPanel);

			this.content = new BooksPanelContentView({collection: this.collection});

			this.toolBar = new BooksPanelNavToolBarView();
			this.listenTo(this.toolBar, 'toolBarViewAs', this.showBooksContent);
			this.listenTo(this.toolBar, 'toolBarSortBy', this.sortBooksContent);
		},

		/**
		 * Reset the books panel view.
		 * @param collection books collection.
		 */
		resetBooksPanel: function(collection) {
			this.setBooksPanelBadge(collection.length);

			if (collection.length > 0) {
				this.toolBar.enableNavToolBar();
			}
		},

		/**
		 * Set the value for books panels badge.
		 * @param count book count.
		 */
		setBooksPanelBadge: function(count) {
			count = count || 0;
			this.$('.panel-heading > .badge-books').text(count);
			this.$('.panel-heading > .badge-books').attr('title', count + ' book(s)');
		},

		/**
		 * Show the books panels content.
		 * @param viewAs key to show content as.
		 */
		showBooksContent: function(viewAs) {
			this.content.showBooksContent(viewAs);
		},

		/**
		 * Sort the books panels content.
		 * @param sortBy key to sort content by.
		 * @param isAscending true if content is to be sorted ascending.
		 */
		sortBooksContent: function(sortBy, isAscending) {
			this.content.sortBooksContent(sortBy, isAscending);
		},

		/**
		 * Render the books panel view.
		 * @return books panel view
		 */
		render: function() {
			var booksPanelTmpl = BooksPanelTemplate();
			this.$el.html(booksPanelTmpl);

			this.$('.panel-heading').append(this.toolBar.render().el);
			this.toolBar.disableNavToolBar();

			this.$el.append(this.content.render().el);

			return this;
		},

		/**
		 * Remove the books panel view.
		 */
		remove: function() {
			this.toolBar.remove();
			this.content.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return BooksPanelView;
});
