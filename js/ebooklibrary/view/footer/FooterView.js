/**
 * FooterView.js
 *
 * Backbone view representing ebooklibrary footer.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/footer/FooterView',
    'backbone'
],
function(
    FooterViewTemplate,
    Backbone
) {
	var FooterView = Backbone.View.extend({
		tagName: 'footer',

		/**
		 * Render the footer view.
		 * @return footer view
		 */
		render: function() {
			var footerTmpl = FooterViewTemplate();
			this.$el.html(footerTmpl);

			return this;
		}
	});

	return FooterView;
});
