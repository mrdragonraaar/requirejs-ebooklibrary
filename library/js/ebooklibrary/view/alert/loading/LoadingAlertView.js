/**
 * LoadingAlertView.js
 *
 * Backbone view representing ebooklibrary loading alert.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/alert/loading/LoadingAlert',
    'backbone'
],
function(
    LoadingAlertTemplate,
    Backbone
) {
	var LoadingAlertView = Backbone.View.extend({
		tagName: 'loading',
		className: 'alert alert-loading',

		/**
		 * Render the loading alert.
		 * @return loading alert view
		 */
		render: function() {
			var loadingAlertTmpl = LoadingAlertTemplate();
			this.$el.append(loadingAlertTmpl);

			return this;
		}
	});

	return LoadingAlertView;
});
