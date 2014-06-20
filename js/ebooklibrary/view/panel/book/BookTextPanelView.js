/**
 * BookTextPanelView.js
 *
 * Backbone view representing ebooklibrary book text panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/booktextpanel/BookTextPanelView',
    'ebooklibrary/model/BookModel',
    'backbone'
],
function(
    BookTextPanelViewTemplate,
    BookModel,
    Backbone
) {
	var BookTextPanelView = Backbone.View.extend({
		tagName: 'booktextpanel',
		className: 'panel panel-default panel-book-text',

		/**
		 * Initialise the book text panel view.
		 * @param options book text panel options (author, series, book).
		 */
		initialize: function(options) {
			options = options || {};

			this.model = new BookModel(
			   {authorName: options.author, seriesName: options.series, baseName: options.book});
			this.model.fetch();

			this.listenTo(this.model, 'sync', this.renderBook);
		},

		/**
		 * Render the book text panel model.
		 * @param model book text model.
		 */
		renderBook: function(model) {
			var bookTextPanelTmpl = BookTextPanelViewTemplate(model.toJSON());
			this.$el.append(bookTextPanelTmpl);
		}
	});

	return BookTextPanelView;
});
