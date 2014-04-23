/**
 * AppHomeView.js
 *
 * Backbone view representing ebooklibrary application home page.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/loadingpanel/LoadingPanelView',
    'ebooklibrary/view/latestadditionspanel/LatestAdditionsPanelView',
    'ebooklibrary/view/authorspanel/AuthorsPanelView',
    'hbs!ebooklibrary/template/welcomepanel/WelcomePanelView',
    'ebooklibrary/view/linkspanel/LinksPanelView',
    'backbone'
],
function(
    LoadingPanelView,
    LatestAdditionsPanelView,
    AuthorsPanelView,
    WelcomePanelViewTemplate,
    LinksPanelView,
    Backbone
) {
	var AppHomeView = Backbone.View.extend({
		el: '.content-container',
		
		loadingPanelView: null,			// loading panel view
		latestAdditionsPanelView: null,		// latest additions panel view
		authorsPanelView: null,			// authors panel view

		/**
		 * Initialise the application home page view.
		 * @param options home page options (max).
		 */
		initialize: function(options) {
			options = options || {};

			this.loadingPanelView = new LoadingPanelView();

			this.latestAdditionsPanelView = new LatestAdditionsPanelView({max: options.max});
			this.listenTo(this.latestAdditionsPanelView.collection, 'sync', this.showLatestAdditionsPanel);

			this.authorsPanelView = new AuthorsPanelView();
			this.listenTo(this.authorsPanelView.collection, 'sync', this.showAuthorsPanel);
		},
		
		/**
		 * Render the application home page.
		 * @return application home page view
		 */
		render: function() {
			this.$el.append(this.loadingPanelView.render().el);

			this.$el.append(this.latestAdditionsPanelView.render().el);

			this.authorsPanelView.$el.hide();
			this.$el.append(this.authorsPanelView.render().el);

			this.$el.append('<div class="content-sidebar"/>');
			this.$('.content-sidebar').hide();

			var welcomePanelTmpl = WelcomePanelViewTemplate();
			this.$('.content-sidebar').append(welcomePanelTmpl);

			var linksPanelView = new LinksPanelView();
			this.$('.content-sidebar').append(linksPanelView.render().el);

			return this;
		},

		/**
		 * Show authors panel.
		 * @param collection author collection.
		 */
		showAuthorsPanel: function(collection) {
			if (collection.length > 0) {
				this.authorsPanelView.$el.fadeIn('slow');
			}
			this.$('.content-sidebar').fadeIn('slow');
		},

		/**
		 * Show latest additions panel.
		 * @param collection latest additions collection.
		 */
		showLatestAdditionsPanel: function(collection) {
			this.loadingPanelView.$el.hide();
		}
	});
	
	return AppHomeView;
});
