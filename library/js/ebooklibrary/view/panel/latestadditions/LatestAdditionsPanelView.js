/**
 * LatestAdditionsPanelView.js
 *
 * Backbone view representing ebooklibrary latest additions panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/panel/latestadditions/LatestAdditionsPanel',
    'ebooklibrary/view/list/ScrollableBooksListView',
    'ebooklibrary/collection/LatestAdditionsCollection',
    'backbone'
],
function(
    LatestAdditionsPanelTemplate,
    ScrollableBooksListView,
    LatestAdditionsCollection,
    Backbone
) {
	var LatestAdditionsPanelView = Backbone.View.extend({
		tagName: 'latestadditions',
		className: 'panel panel-latestadditions',

		booksList: null,		// books list view

		/**
		 * Initialise the latest additions panel view.
		 * @param options latest additions panel options.
		 */
		initialize: function(options) {
			options = options || {};

			var latestAdditionsCollection = new LatestAdditionsCollection([],
			   {max: options.max});
			latestAdditionsCollection.fetch({reset: true});

			this.booksList = new ScrollableBooksListView({collection: latestAdditionsCollection});
			this.listenTo(this.booksList, 'scrollPage', this.updateScrollPageNum);
		},

		updateScrollPageNum: function(page, pages) {
			console.log(page);
			console.log(pages);

			this.$('.scroll-page').html('(' + page + ' / ' + pages + ')');
		},

		/**
		 * Render the latest additions panel view.
		 * @return latest additions panel view
		 */
		render: function() {
			var latestAdditionsPanelTmpl = LatestAdditionsPanelTemplate();
			this.$el.html(latestAdditionsPanelTmpl);

			this.$('.panel-body').html(this.booksList.render().el);

			return this;
		},

		/**
		 * Remove the latest additions panel view.
		 */
		remove: function() {
			this.booksList.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return LatestAdditionsPanelView;
});
