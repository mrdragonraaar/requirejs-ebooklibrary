/**
 * NavBarView.js
 *
 * Backbone view representing ebooklibrary navigation bar.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/navbar/NavBarView',
    'ebooklibrary/view/navbar/NavBarBreadcrumbView',
    'ebooklibrary/view/navbar/NavBarSearchBoxView',
    'backbone'
],
function(
    NavBarViewTemplate,
    NavBarBreadcrumbView,
    NavBarSearchBoxView,
    Backbone
) {
	var NavBarView = Backbone.View.extend({
		tagName: 'nav',
		className: 'navbar navbar-default !navbar-fixed-top navbar-static-top',

		breadcrumbView: null,	// breadcrumb view
		searchBoxView: null,	// search box view

		/**
		 * Initialise the navigation bar view.
		 * @param options navigation bar options.
		 */
		initialize: function(options) {
			options = options || {};

			this.breadcrumbView = new NavBarBreadcrumbView();
			this.searchBoxView = new NavBarSearchBoxView();
		},

		/**
		 * Render the navigation bar view.
		 * @return navigation bar view
		 */
		render: function() {
			var navBarTmpl = NavBarViewTemplate();
			this.$el.html(navBarTmpl);

			//this.$('.container-fluid').prepend(this.breadcrumbView.render().el);
			this.$('.navbar-collapse').prepend(this.breadcrumbView.render().el);

			//this.$('.container-fluid').append(this.searchBoxView.render().el);

			return this;
		},

		/**
		 * Set the navigation bar breadcrumb.
		 * @param options breadcrumb options (author, series, search).
		 */
		setBreadcrumb: function(options) {
			this.breadcrumbView.renderBreadcrumb(options);
		}
	});

	return NavBarView;
});
