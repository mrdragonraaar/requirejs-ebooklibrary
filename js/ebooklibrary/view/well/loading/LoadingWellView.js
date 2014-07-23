/**
 * LoadingWellView.js
 *
 * Backbone view representing ebooklibrary loading well.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/well/loading/LoadingWell',
    'backbone'
],
function(
    LoadingWellTemplate,
    Backbone
) {
	var LoadingWellView = Backbone.View.extend({
		tagName: 'loading',
		className: 'well well-loading',

		/**
		 * Render the loading well.
		 * @return loading well view
		 */
		render: function() {
			var loadingWellTmpl = LoadingWellTemplate();
			this.$el.append(loadingWellTmpl);

			return this;
		}
	});

	return LoadingWellView;
});
