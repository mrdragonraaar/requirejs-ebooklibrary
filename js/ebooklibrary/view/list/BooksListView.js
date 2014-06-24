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
		 * Define book list click events.
		 */
		events: {
			'click > .books-list-prev':	'onClickPrevious',
			'click > .books-list-next':	'onClickNext'
		},

		/**
		 * Event handler for book list previous click event.
		 * @param e click event.
		 */
		onClickPrevious: function(e) {
			e.preventDefault();
			this.page = Math.max(this.page - 1, 1);
			this.scroll();
		},

		/**
		 * Event handler for book list next click event.
		 * @param e click event.
		 */
		onClickNext: function(e) {
			e.preventDefault();
			this.page = Math.min(this.page + 1, this.pages);
			this.scroll();
		},

		/**
		 * Scroll to current book list page.
		 */
		scroll: function() {
			var pageOffset = (this.page - 1) * this.pageWidth;
			this.$('.books-list-items').css("transform", "translate(" + (-1 * pageOffset) + "px, 0)");
		},

		/**
		 * Event handler for book list resize event.
		 */
		onResize: function() {
			var viewPortWidth = this.$('.books-list-viewport').width();
			this.page = 1;

			var itemsList = this.$('.books-list-items').children();
			if (itemsList.length) {
				var itemWidth = itemsList.outerWidth(true);
				var itemMarginRight = parseInt(itemsList.css("margin-right"), 10);
				var itemsListWidth = itemWidth * itemsList.length;
				var itemsPerPage = Math.floor((viewPortWidth + itemMarginRight) / itemWidth);

				this.pageWidth = itemWidth * itemsPerPage;
				this.pages = Math.ceil(itemsListWidth / this.pageWidth);

				this.$('.books-list-items').width(itemsListWidth);

				this.scroll();
			}
		},

		/**
		 * Initialise the books list view.
		 * @param options books list options.
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.renderBooksListItems);

			this.onResize = _.debounce(_.bind(this.onResize, this), 200);
			$(window).on("resize", this.onResize);
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
			this.$('.books-list-items').hide();
			this.onResize();
			this.$('.books-list-items').fadeIn('slow');
		},

		/**
		 * Remove the books list view.
		 */
		remove: function() {
			$(window).off("resize", this.onResize);
			Backbone.View.prototype.remove.apply(this);
		}
	});

	return BooksListView;
});
