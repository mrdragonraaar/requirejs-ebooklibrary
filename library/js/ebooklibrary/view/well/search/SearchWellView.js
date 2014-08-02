/**
 * SearchWellView.js
 *
 * Backbone view representing ebooklibrary search well.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/form/SearchFormView',
    'hbs!ebooklibrary/template/well/search/SearchErrorAlert',
    'backbone'
],
function(
    SearchFormView,
    SearchErrorAlertTemplate,
    Backbone
) {
	var SearchWellView = Backbone.View.extend({
		tagName: 'search',
		className: 'well well-wide well-search',

		searchForm: null,	// search form view

		/**
		 * Initialise the search well view.
		 * @param options search well options (collection).
		 */
		initialize: function(options) {
			this.searchForm = new SearchFormView();

			this.listenTo(this.collection, 'error', this.showError);
		},

		/**
		 * Render the search well view.
		 * @return search well view
		 */
		render: function(options) {
			this.$el.append(this.searchForm.render().el);
			this.searchForm.setSearchInputVal(this.collection.keyword);

			return this;
		},

		/**
		 * Show error alert.
		 * @param collection search collection.
		 */
		showError: function(collection) {
			var searchErrorAlertTmpl = SearchErrorAlertTemplate();
			this.$el.append(searchErrorAlertTmpl);
			this.$('.alert').hide();
			this.$('.alert').fadeIn('slow');
		},

		/**
		 * Remove the search well view.
		 */
		remove: function() {
			this.searchForm.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return SearchWellView;
});
