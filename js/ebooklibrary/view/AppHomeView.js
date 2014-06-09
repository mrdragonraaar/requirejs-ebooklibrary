/**
 * AppHomeView.js
 *
 * Backbone view representing ebooklibrary application home page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/loadingpanel/LoadingPanelView',
    'ebooklibrary/view/latestadditions/LatestAdditionsView',
    'ebooklibrary/view/authors/AuthorsView',
    'hbs!ebooklibrary/template/welcomepanel/WelcomePanelView',
    'ebooklibrary/view/links/LinksView',
    'backbone'
],
function(
    LoadingPanelView,
    LatestAdditionsView,
    AuthorsView,
    WelcomePanelViewTemplate,
    LinksView,
    Backbone
) {
	var AppHomeView = Backbone.View.extend({
		el: '.content-container',
		
		loadingPanelView: null,			// loading panel view
		latestAdditionsView: null,		// latest additions view
		authorsView: null,			// authors view

		/**
		 * Initialise the application home page view.
		 * @param options home page options (max).
		 */
		initialize: function(options) {
			options = options || {};

			this.loadingPanelView = new LoadingPanelView();

			this.latestAdditionsView = new LatestAdditionsView({max: options.max});

			this.authorsView = new AuthorsView();
			this.listenTo(this.authorsView.collection, 'sync', this.showAuthors);
		},
		
		/**
		 * Render the application home page.
		 * @return application home page view
		 */
		render: function() {
			this.$el.append(this.loadingPanelView.render().el);

			this.$el.append(this.latestAdditionsView.render().el);

			//this.authorsView.$el.hide();
			this.$el.append(this.authorsView.render().el);

			//this.$el.append('<div class="content-sidebar"/>');
			//this.$('.content-sidebar').hide();

			//var welcomePanelTmpl = WelcomePanelViewTemplate();
			//this.$('.content-sidebar').append(welcomePanelTmpl);

			//var linksView = new LinksView();
			//this.$('.content-sidebar').append(linksPanelView.render().el);
			//this.$el.append(linksView.render().el);

			return this;
		},

		/**
		 * Show authors.
		 * @param collection author collection.
		 */
		showAuthors: function(collection) {
			this.loadingPanelView.$el.fadeOut('slow');
			//this.authorsView.$el.fadeIn('slow');
			//this.$('.content-sidebar').fadeIn('slow');
		}
	});
	
	return AppHomeView;
});
