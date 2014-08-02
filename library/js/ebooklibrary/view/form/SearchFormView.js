/**
 * SearchFormView.js
 *
 * Backbone view representing ebooklibrary search form.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/form/SearchForm',
    'backbone'
],
function(
    SearchFormTemplate,
    Backbone
) {
	var SearchFormView = Backbone.View.extend({
		tagName: 'form',
		className: 'form-search',
		searchPage: '!/search',

		/**
		 * Define search form events.
		 */
		events: {
			'submit': 'onSubmitSearch',
			'click > .form-group-search > input[name = search]': 'onClickSearch'
		},

		/**
		 * Event handler for search form submit event.
		 * @param e form event.
		 */
		onSubmitSearch: function(e) {
			e.preventDefault();

			var val = this.getSearchInputVal();
			this.setSearchInputVal('');
			this.getSearchInput().blur();

			if (val) {
				this.navigateSearchPage(val);
			}
		},

		/**
		 * Event handler for search input click event.
		 * @param e click event.
		 */
		onClickSearch: function(e) {
			// select entire input text on focus
			this.getSearchInput().select();
		},

		/**
		 * Get search input.
		 * @return search input
		 */
		getSearchInput: function() {
			return this.$('input[name = search]');
		},

		/**
		 * Get search input value.
		 * @return search input value
		 */
		getSearchInputVal: function() {
			return this.getSearchInput().val();
		},

		/**
		 * Set search input value.
		 * @param val search input value
		 */
		setSearchInputVal: function(val) {
			return this.getSearchInput().val(val);
		},

		/**
		 * Navigate to search page.
		 * @param val search value
		 */
		navigateSearchPage: function(val) {
			Backbone.history.navigate(this.searchPage + '/' + val, true);
		},

		/**
		 * Initialise the search form view.
		 * @param options search form options.
		 */
		initialize: function(options) {
		},

		/**
		 * Render the search form view.
		 * @return search form view
		 */
		render: function(options) {
			var searchFormTmpl = SearchFormTemplate();
			this.$el.html(searchFormTmpl);

			this.$el.attr('role', 'search');

			return this;
		}
	});

	return SearchFormView;
});
