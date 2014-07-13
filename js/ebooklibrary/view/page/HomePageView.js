/**
 * HomePageView.js
 *
 * Backbone view representing ebooklibrary application home page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/well/loading/LoadingWellView',
    'ebooklibrary/view/header/HeaderView',
    'ebooklibrary/view/panel/authors/AuthorsPanelView',
    'backbone'
],
function(
    LoadingWellView,
    HeaderView,
    AuthorsPanelView,
    Backbone
) {
	var HomePageView = Backbone.View.extend({
		className: 'content-home',
		
		loading: null,			// loading well view
		header: null,			// header view
		authors: null,			// authors panel view

		/**
		 * Initialise the application home page view.
		 * @param options home page options (max).
		 */
		initialize: function(options) {
			options = options || {};

			this.loading = new LoadingWellView();

			this.header = new HeaderView();

			this.authors = new AuthorsPanelView();
			this.listenTo(this.authors.collection, 'sync', this.showAuthors);
		},
		
		/**
		 * Render the application home page.
		 * @return application home page view
		 */
		render: function() {
			this.$el.append(this.loading.render().el);

			this.$el.append(this.header.render().el);

			//this.authors.$el.hide();
			this.$el.append(this.authors.render().el);

			return this;
		},

		/**
		 * Show authors.
		 * @param collection author collection.
		 */
		showAuthors: function(collection) {
			this.loading.$el.fadeOut('slow');
			//this.authors.$el.fadeIn('slow');
		},

		remove: function() {
			this.loading.remove();
			this.header.remove();
			this.authors.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});
	
	return HomePageView;
});
