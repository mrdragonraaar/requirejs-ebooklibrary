/**
 * NavBarSearchBoxView.js
 *
 * Backbone view representing ebooklibrary navigation bar's search box.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/navbar/NavBarSearchBoxView',
    'backbone'
],
function(
    NavBarSearchBoxViewTemplate,
    Backbone
) {
	var NavBarSearchBoxView = Backbone.View.extend({
		tagName: 'form',
		className: 'navbar-form navbar-right navbar-form-searchbox',
		//tagName: 'searchbox',
		//className: 'navbar-searchbox navbar-nav nav',

		/**
		 * Define search box form events.
		 */
		events: {
			//'submit form': 'onSubmitSearch',
			'submit': 'onSubmitSearch',
			'focusin .input-search': 'onFocusInSearch',
			'focusout .input-search': 'onFocusOutSearch',
		},

		/**
		 * Render the navigation bar search box view.
		 * @return navigation bar search box view
		 */
		render: function(options) {
			var searchBoxTmpl = NavBarSearchBoxViewTemplate();
			this.$el.html(searchBoxTmpl);

			return this;
		},

		/**
		 * Event handler for search box submit event.
		 * @param e form event.
		 */
		onSubmitSearch: function(e) {
			e.preventDefault();

			var searchVal = this.$('input[name = search]').val();
			this.$('input[name = search]').val('');
			this.$('input[name = search]').blur();

			//var searchVal = this.$('.input-search').val();
			//this.$('.input-search').val('');
			//this.$('.input-search').blur();

			Backbone.history.navigate('!/search/' + searchVal, true);
		},

		/**
		 * Event handler for search box focus in event.
		 * @param e form event.
		 */
		onFocusInSearch: function(e) {
			this.$el.addClass('active');
		},

		/**
		 * Event handler for search box focus out event.
		 * @param e form event.
		 */
		onFocusOutSearch: function(e) {
			this.$el.removeClass('active');
		},

		/**
		 * Show or hide the search box.
		 * @param show if true show search box.
		 */
		showSearchBox: function(show) {
			if (show)
				this.$el.show();
			else
				this.$el.hide();
		}
	});

	return NavBarSearchBoxView;
});
