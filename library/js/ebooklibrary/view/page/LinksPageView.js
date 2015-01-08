/**
 * LinksPageView.js
 *
 * Backbone view representing ebooklibrary application links page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/alert/loading/LoadingAlertView',
    'ebooklibrary/view/well/links/LinksWellView',
    'ebooklibrary/collection/LinkCollection',
    'backbone'
],
function(
    LoadingAlertView,
    LinksWellView,
    LinkCollection,
    Backbone
) {
	var LinksPageView = Backbone.View.extend({
		className: 'content-links',
		
		loading: null,		// loading alert view
		links: null,		// links well view

		/**
		 * Initialise the application links page view.
		 * @param options links page options.
		 */
		initialize: function(options) {
			options = options || {};

			this.loading = new LoadingAlertView();

			var linkCollection = new LinkCollection();
			linkCollection.fetch({reset: true});

			this.links = new LinksWellView({collection: linkCollection});
			this.listenTo(this.links.collection, 'reset', this.showLinks);
		},
		
		/**
		 * Render the application links page.
		 * @return application links page view
		 */
		render: function() {
			this.$el.append(this.loading.render().el);
			this.$el.append(this.links.render().el);

			return this;
		},

		/**
		 * Show links.
		 * @param collection links collection.
		 */
		showLinks: function(collection) {
			this.loading.$el.fadeOut('slow');
		},

		/**
		 * Remove the application links page.
		 */
		remove: function() {
			this.loading.remove();
			this.links.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});
	
	return LinksPageView;
});
