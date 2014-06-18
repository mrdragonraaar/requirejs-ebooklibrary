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

		viewAs: 'thumbnails',

		/**
		 * Initialise the books view.
		 * @param options books options (collection).
		 */
		initialize: function(options) {
			options = options || {};

			if (this.collection)
				this.collection.fetch({timeout: 20000});

			this.listenTo(this.collection, 'sync', this.onSyncBooksContent);
			this.listenTo(this.collection, 'sort', this.onSortBooksContent);
			//this.listenTo(this.collection, 'sync', this.fadeInBooks);
			//this.listenTo(this.collection, 'sync', this.renderBooks);
			//this.listenTo(this.collection, 'sync', this.renderBooks);
			//this.listenTo(this.collection, 'sort', this.renderBooks);

			this.toolBarView = new BooksNavToolBarView();
			//this.listenTo(this.toolBarView, 'toolBarSelectBooksContent', this.onToolBarSelectBooksContent);
			//this.listenTo(this.toolBarView, 'toolBarSortBooksContent', this.onToolBarSortBooksContent);
			this.listenTo(this.toolBarView, 'toolBarViewAs', this.onToolBarViewAs);
			this.listenTo(this.toolBarView, 'toolBarSortBy', this.onToolBarSortBy);
		},

		onSyncBooksContent: function(collection) {
			this.setBooksBadge(collection.length);

			this.$('.panel-body > .bookspanel-books').fadeOut('slow');
			this.renderBooks(collection);
			this.$('.panel-body > .bookspanel-books').hide();
			this.$('.panel-body > .bookspanel-books').fadeIn('slow');

			if (collection.length > 0) {
				this.toolBarView.enableNavToolBar();
			}
		},

		onSortBooksContent: function(collection) {
			this.renderBooks(collection);
		},

		/**
		 * Event handler for toolbar viewAs event.
		 * @param viewAs viewAs type.
		 */
		onToolBarViewAs: function(viewAs) {
			if (this.collection) {
				this.viewAs = viewAs;
				this.$('.panel-body > .bookspanel-books').fadeOut('slow');
				this.renderBooks(this.collection);
				this.$('.panel-body > .bookspanel-books').hide();
				this.$('.panel-body > .bookspanel-books').fadeIn('slow');
			}
		},

		/**
		 * Event handler for toolbar sortBy event.
		 * @param sortBy sortBy type.
		 * @param isAscending true if sort type is ascending.
		 */
		onToolBarSortBy: function(sortBy, isAscending) {
			if (this.collection) {
				this.collection.setSortBy(sortBy, isAscending);
				this.collection.sort();
			}
		},

		/**
		 * Event handler for toolbar sortBy event.
		 * @param sortByMenuName name of sortBy menu.
		 * @param asc true if sortBy menu is ascending.
		 */
/*
		onToolBarSortBy: function(sortByMenuName, asc) {
			if (this.collection) {
				this.collection.setSortBy(sortByMenuName, asc);
				this.collection.sort();
			}
		},
*/

		/**
		 * Render the books view.
		 * @return books view
		 */
		render: function() {
			var booksTmpl = BooksViewTemplate();
			this.$el.append(booksTmpl);

			this.$('.panel-heading').append(this.toolBarView.render().el);
			this.toolBarView.disableNavToolBar();

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

			if (this.viewAs === 'details') {
				this.renderBooksDetails(collection);
			} else if (this.viewAs === 'list') {
				this.renderBooksList(collection);
			} else {
				this.renderBooksThumbnails(collection);
			}
/*
			if (viewAsTitle === 'details') {
				this.renderBooksDetails(collection);
			} else if (viewAsTitle === 'list') {
				this.renderBooksList(collection);
			} else {
				this.renderBooksThumbnails(collection);
			}
*/
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
		},

		remove: function() {
			this.toolBarView.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return BooksView;
});
