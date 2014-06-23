/**
 * BooksListView.js
 *
 * Backbone view representing a books list.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/list/BooksList',
    'hbs!ebooklibrary/template/list/BooksListItems',
    'backbone'
],
function(
    BooksListTemplate,
    BooksListItemsTemplate
) {
	var BooksListView = Backbone.View.extend({
		className: 'books-list',

		/**
		 * Initialise the books list view.
		 * @param options books list options.
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.renderBooksListItems);
		},

		/**
		 * Render the books list view.
		 * @return books list view
		 */
		render: function() {
			var booksListTmpl = BooksListTemplate();
			this.$el.html(booksListTmpl);

			return this;
		},

		/**
		 * Render the books list items.
		 * @param collection book collection.
		 */
		renderBooksListItems: function(collection) {
			var booksListItemsTmpl = BooksListItemsTemplate({books: collection.toJSON()});
			this.$('.books-list-items').html(booksListItemsTmpl);
		}
	});

	return BooksListView;
});
