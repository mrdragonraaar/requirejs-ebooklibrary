/**
 * HomePageView.js
 *
 * Backbone view representing ebooklibrary application home page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/page/BasePageView',
    'ebooklibrary/view/header/HeaderView',
    'ebooklibrary/view/panel/authors/AuthorsPanelView',
    'ebooklibrary/collection/AuthorCollection',
    'backbone'
],
function(
    BasePageView,
    HeaderView,
    AuthorsPanelView,
    AuthorCollection,
    Backbone
) {
	var HomePageView = BasePageView.extend({
		pageClass: 'home',		// application page class
		pageTitle: 'Home',		// page title
		
		header: null,			// header view
		authors: null,			// authors panel view

		/**
		 * Initialise the application home page view.
		 * @param options home page options (max).
		 */
		initialize: function(options) {
			options = options || {};

			this.header = new HeaderView();

			var authorCollection = new AuthorCollection();
			authorCollection.fetch({reset: true});

			this.authors = new AuthorsPanelView({collection: authorCollection});
			this.listenTo(this.authors.collection, 'reset', this.hideLoading);
		},
		
		/**
		 * Render the application home page.
		 * @return application home page view
		 */
		onPageRender: function() {
			this.$el.append(this.header.render().el);
			this.$el.append(this.authors.render().el);

			return this;
		},

		onPageRemove: function() {
			this.header.remove();
			this.authors.remove();

			//BasePageView.prototype.remove.apply(this);
		}
	});
	
	return HomePageView;
});
