/**
 * BooksView.js
 *
 * Backbone view representing ebooklibrary books.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/books/BooksView',
    'hbs!ebooklibrary/template/books/BooksThumbnailsView',
    'hbs!ebooklibrary/template/books/BooksDetailsView',
    'hbs!ebooklibrary/template/books/BooksListView',
    'ebooklibrary/view/books/BooksNavToolBarView',
    'backbone'
],
function(
    BooksViewTemplate,
    BooksThumbnailsViewTemplate,
    BooksDetailsViewTemplate,
    BooksListViewTemplate,
    BooksNavToolBarView,
    Backbone
) {
	var BooksView = Backbone.View.extend({
		tagName: 'books',
		className: 'panel panel-books',

		toolBarView: null,	// toolbar view

		/**
		 * Initialise the books view.
		 * @param options books options (collection).
		 */
		initialize: function(options) {
			options = options || {};

			if (this.collection)
				this.collection.fetch({timeout: 20000});

			this.listenTo(this.collection, 'sync', this.fadeInBooks);
			//this.listenTo(this.collection, 'sync', this.renderBooks);
			this.listenTo(this.collection, 'sort', this.renderBooks);

			this.toolBarView = new BooksNavToolBarView();
			this.listenTo(this.toolBarView, 'booksPanelToolBarSortBy', this.onToolBarSortBy);
			//this.listenTo(this.toolBarView, 'selectViewAsNavItem', this.onToolBarViewAs);
			this.listenTo(this.toolBarView, 'selectBooksContent', this.onSelectBooksContent);
		},

		/**
		 * Event handler for toolbar viewAs event.
		 * @param viewAsButtonName name of viewAs button.
		 */
		onSelectBooksContent: function(booksContentType) {
			if (this.collection) {
				this.setBooksBadge(this.collection.length);
				this.$('.panel-body > .bookspanel-books').fadeOut('slow');
				this.renderBooks(this.collection, booksContentType);
				this.$('.panel-body > .bookspanel-books').hide();
				this.$('.panel-body > .bookspanel-books').fadeIn('slow');
				if (this.collection.length > 0) {
					this.toolBarView.enableNavToolBar();
					this.toolBarView.disableSortByButton(false);
				}
			}
		},

		/**
		 * Event handler for toolbar sortBy event.
		 * @param sortByMenuName name of sortBy menu.
		 * @param asc true if sortBy menu is ascending.
		 */
		onToolBarSortBy: function(sortByMenuName, asc) {
			if (this.collection) {
				this.collection.setSortBy(sortByMenuName, asc);
				this.collection.sort();
			}
		},

		/**
		 * Render the books view.
		 * @return books view
		 */
		render: function() {
			var booksTmpl = BooksViewTemplate();
			this.$el.append(booksTmpl);

			this.$('.panel-heading').append(this.toolBarView.render().el);
			this.toolBarView.activateThumbnailsNavItem();
			this.toolBarView.disableNavToolBar();

			this.toolBarView.setActiveSortByMenu('Name', true);
			this.toolBarView.disableSortByButton(true);

			return this;
		},

		/**
		 * Render and fade in the books collection.
		 * @param collection books collection.
		 */
		fadeInBooks: function(collection, booksView) {
			this.setBooksBadge(collection.length);
			this.$('.panel-body > .bookspanel-books').fadeOut('slow');
			this.renderBooks(collection, booksView);
			this.$('.panel-body > .bookspanel-books').hide();
			this.$('.panel-body > .bookspanel-books').fadeIn('slow');
			if (collection.length > 0) {
				this.toolBarView.enableNavToolBar();
				this.toolBarView.disableSortByButton(false);
			}
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

		/**
		 * Render the books collection.
		 * @param collection books collection.
		 */
		renderBooks: function(collection, viewAsTitle) {
			//var viewAsTitle = this.toolBarView.getActiveViewAsNavItemName();
			//var viewAsTitle = this.toolBarView.getActiveNavItemName('viewas');

			if (viewAsTitle === 'details') {
				this.renderBooksDetails(collection);
			} else if (viewAsTitle === 'list') {
				this.renderBooksList(collection);
			} else {
				this.renderBooksThumbnails(collection);
			}
		},

		/**
		 * Render the books collection as thumbnails.
		 * @param collection books collection.
		 */
		renderBooksThumbnails: function(collection) {
			var booksThumbsTmpl = BooksThumbnailsViewTemplate({books: collection.toJSON()});
			this.$('.panel-body').html(booksThumbsTmpl);
		},

		/**
		 * Render the books collection as details.
		 * @param collection books collection.
		 */
		renderBooksDetails: function(collection) {
			var booksDetailsTmpl = BooksDetailsViewTemplate({books: collection.toJSON()});
			this.$('.panel-body').html(booksDetailsTmpl);
		},

		/**
		 * Render the books collection as list.
		 * @param collection books collection.
		 */
		renderBooksList: function(collection) {
			var booksListTmpl = BooksListViewTemplate({books: collection.toJSON()});
			this.$('.panel-body').html(booksListTmpl);
		}
	});

	return BooksView;
});
