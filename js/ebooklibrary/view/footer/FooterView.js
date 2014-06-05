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
		className: 'footer footer-default',
		//tagName: 'nav',
		//className: 'navbar navbar-default navbar-static-bottom',

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
