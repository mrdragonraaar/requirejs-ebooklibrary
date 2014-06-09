/**
 * NavBarBreadcrumbView.js
 *
 * Backbone view representing ebooklibrary navigation bar's breadcrumb.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/navbar/NavBarBreadcrumbView',
    'backbone'
],
function(
    NavBarBreadcrumbViewTemplate,
    Backbone
) {
	var NavBarBreadcrumbView = Backbone.View.extend({
		tagName: 'ul',
		className: '!navbar-breadcrumb navbar-nav nav navbar-nav-breadcrumb',

		/**
		 * Render the breadcrumb.
		 * @param options breadcrumb options (author, series, search).
		 */
		renderBreadcrumb: function(options) {
			var breadcrumbTmpl = NavBarBreadcrumbViewTemplate(options);
			this.$el.html(breadcrumbTmpl);
		},

		/**
		 * Set the active status of search breadcrumb.
		 * @param active if true set active.
		 */
		setSearchActive: function(active) {
			if (active)
				this.$('.nav-search').addClass('active');
				//this.$('.nav-search > a').addClass('active');
			else
				this.$('.nav-search').removeClass('active');
				//this.$('.nav-search > a').removeClass('active');
		},

		/**
		 * Set the active status of author breadcrumb.
		 * @param active if true set active.
		 */
		setAuthorActive: function(active) {
			if (active)
				this.$('.nav-author').addClass('active');
				//this.$('.nav-author > a').addClass('active');
			else
				this.$('.nav-author').removeClass('active');
				//this.$('.nav-author > a').removeClass('active');
		},

		/**
		 * Set the active status of series breadcrumb.
		 * @param active if true set active.
		 */
		setSeriesActive: function(active) {
			if (active)
				this.$('.nav-series').addClass('active');
				//this.$('.nav-series > a').addClass('active');
			else
				this.$('.nav-series').removeClass('active');
				//this.$('.nav-series > a').removeClass('active');
		}
	});

	return NavBarBreadcrumbView;
});
