/**
 * BasePageView.js
 *
 * Backbone view representing ebooklibrary application base page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/alert/loading/LoadingAlertView',
    'backbone'
],
function(
    LoadingAlertView,
    Backbone
) {
	var BasePageView = Backbone.View.extend({
		pageClass: 'base',		// default page class,
		basePageTitle: 'ebooklibrary',	// base page title
		pageTitle: '',			// default page title,
		pageBreadCrumb: {},		// default breadcrumb,

		className: function() {
			return 'page-' + this.pageClass;
		},

		loading: null,			// loading alert view

		/**
		 * Initialise the application base page view.
		 * @param options base page options.
		 */
		//initialize: function(options) {
		constructor: function(options) {
			this.pageBreadCrumb = options || {};

			this.loading = new LoadingAlertView();

			this.listenTo(this, 'pageRender', this.onPageRender);
			this.listenTo(this, 'pageRemove', this.onPageRemove);

			Backbone.View.apply(this, arguments);
		},

		setPageTitle: function(title) {
			var pageTitle = this.basePageTitle;

			if (title) {
				pageTitle += ' | ' + title;
			}

			$(document).prop('title', pageTitle);
		},

		/**
		 * Render the application base page.
		 * @return application base page view
		 */
		render: function() {
			this.setPageTitle(_.result(this, 'pageTitle'));

			this.$el.append(this.loading.render().el);

			this.trigger('pageRender');

			return this;
		},
		
		onPageRender: function() {
			console.log('render');
		},

		/**
		 * Show loading.
		 */
		showLoading: function() {
			this.loading.$el.fadeIn('slow');
		},

		/**
		 * Hide loading.
		 */
		hideLoading: function() {
			this.loading.$el.fadeOut('slow');
		},

		remove: function() {
			this.loading.remove();

			this.trigger('pageRemove');

			Backbone.View.prototype.remove.apply(this);
		}
	});
	
	return BasePageView;
});
