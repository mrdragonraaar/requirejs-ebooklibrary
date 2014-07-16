/**
 * BookPageView.js
 *
 * Backbone view representing ebooklibrary application book page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/well/bookinfo/BookInfoWell',
    'ebooklibrary/view/well/loading/LoadingWellView',
    'ebooklibrary/view/panel/book/BookPanelView',
    'ebooklibrary/model/BookModel',
    'backbone'
],
function(
    BookInfoWellTemplate,
    LoadingWellView,
    BookPanelView,
    BookModel,
    Backbone
) {
	var BookPageView = Backbone.View.extend({
		className: 'content-book',
		
		loading: null,		// loading well view
		book: null,		// book panel view

		/**
		 * Initialise the application book page view.
		 * @param options book page options (author, series, book).
		 */
		initialize: function(options) {
			options = options || {};

			this.loading = new LoadingWellView();

			var bookModel = new BookModel(
			   {authorName: options.author, seriesName: options.series, baseName: options.book});
			bookModel.fetch();

			this.book = new BookPanelView({model: bookModel});
			this.listenTo(this.book.model, 'sync', this.showBook);
		},
		
		/**
		 * Render the application book page.
		 * @return application book page view
		 */
		render: function() {
			this.$el.append(this.loading.render().el);

			//this.book.$el.hide();
			this.$el.append(this.book.render().el);

			return this;
		},

		/**
		 * Show book panel.
		 * @param model book model.
		 */
		showBook: function(model) {
			this.loading.$el.fadeOut('slow');
			//this.book.$el.fadeIn('slow');

			var bookInfoWellTmpl = BookInfoWellTemplate(model.toJSON());
			this.$el.prepend(bookInfoWellTmpl);
		},

		/**
		 * Remove the application book page.
		 */
		remove: function() {
			this.loading.remove();
			this.book.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});
	
	return BookPageView;
});
