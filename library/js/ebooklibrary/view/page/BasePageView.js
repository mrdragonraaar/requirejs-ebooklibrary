/**
 * BasePageView.js
 *
 * Backbone view representing ebooklibrary application base page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/well/loading/LoadingWellView',
    'backbone'
],
function(
    LoadingWellView,
    Backbone
) {
	var BasePageView = Backbone.View.extend({
		loading: null,			// loading well view

		/**
		 * Initialise the application base page view.
		 * @param options base page options.
		 */
		//initialize: function(options) {
		constructor: function(options) {
			this.loading = new LoadingWellView();

			this.listenTo(this, 'pageRender', this.onPageRender);
			this.listenTo(this, 'pageRemove', this.onPageRemove);

			Backbone.View.apply(this, arguments);
		},

		/**
		 * Render the application base page.
		 * @return application base page view
		 */
		render: function() {
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
