/**
 * BooksContentView.js
 *
 * Backbone view representing ebooklibrary books content.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/books/BooksThumbnailsView',
    'hbs!ebooklibrary/template/books/BooksDetailsView',
    'hbs!ebooklibrary/template/books/BooksListView',
    'backbone'
],
function(
    BooksThumbnailsViewTemplate,
    BooksDetailsViewTemplate,
    BooksListViewTemplate,
    Backbone
) {
	var BooksContentView = Backbone.View.extend({
		className: 'panel-body container-fluid',
		contentType: null,

		/**
		 * Initialise the books content view.
		 * @param options books options (collection).
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.onResetBooksContent);
			this.listenTo(this.collection, 'sort', this.onSortBooksContent);
		},

		onResetBooksContent: function(collection) {
			this.setBooksContent();
		},

		onSortBooksContent: function(collection) {
			this.renderBooks(collection);
		},

		setBooksContent: function(viewAs) {
			this.contentType = viewAs;

			if (this.collection) {
				this.showBooks(this.collection);
			}
		},

		sortBooks: function(sortBy, isAscending) {
			if (this.collection) {
				this.collection.setSortBy(sortBy, isAscending);
				this.collection.sort();
			}
		},

		showBooks: function(collection) {
			this.$('.bookspanel-books').fadeOut('slow');
			this.renderBooks(collection);
			this.$('.bookspanel-books').hide();
			this.$('.bookspanel-books').fadeIn('slow');
		},

		renderBooks: function(collection) {
			if (this.contentType === 'details') {
				this.renderBooksDetails(collection);
			} else if (this.contentType === 'list') {
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
			this.$el.html(booksThumbsTmpl);
		},

		/**
		 * Render the books collection as details.
		 * @param collection books collection.
		 */
		renderBooksDetails: function(collection) {
			var booksDetailsTmpl = BooksDetailsViewTemplate({books: collection.toJSON()});
			this.$el.html(booksDetailsTmpl);
		},

		/**
		 * Render the books collection as list.
		 * @param collection books collection.
		 */
		renderBooksList: function(collection) {
			var booksListTmpl = BooksListViewTemplate({books: collection.toJSON()});
			this.$el.html(booksListTmpl);
		}
	});

	return BooksContentView;
});
