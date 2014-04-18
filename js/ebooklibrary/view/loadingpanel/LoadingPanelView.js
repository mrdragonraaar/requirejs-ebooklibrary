/**
 * LoadingPanelView.js
 *
 * Backbone view representing ebooklibrary loading panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/loadingpanel/LoadingPanelView',
    'backbone'
],
function(
    LoadingPanelViewTemplate,
    Backbone
) {
	var LoadingPanelView = Backbone.View.extend({
		tagName: 'loadingpanel',

		/**
		 * Render the loading panel.
		 * @return loading panel view
		 */
		render: function() {
			var loadingPanelTmpl = LoadingPanelViewTemplate();
			this.$el.append(loadingPanelTmpl);

			return this;
		}
	});

	return LoadingPanelView;
});
