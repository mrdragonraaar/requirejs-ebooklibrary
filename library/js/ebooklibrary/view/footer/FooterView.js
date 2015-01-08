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

		events: {
			'click > .container-fluid > .footer-links > li > .footer-link-top': 'onGotoTop'
		},

		onGotoTop: function(e) {
			e.preventDefault();

			$("html, body").animate({ scrollTop: 0 }, "slow");
		},

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
