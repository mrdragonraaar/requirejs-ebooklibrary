/**
 * NavBarLinkDropdownView.js
 *
 * Backbone view representing ebooklibrary navigation bar's link dropdown menu.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/navbar/NavBarLinkDropdownView',
    'backbone',
    'bootstrap'
],
function(
    NavBarLinkDropdownTemplate,
    Backbone
) {
	var NavBarLinkDropdown = Backbone.View.extend({
		tagName: 'ul',
		className: 'nav navbar-nav navbar-right navbar-nav-linkdropdown',

		/**
		 * Render the link dropdown menu view.
		 * @return link dropdown menu view
		 */
		render: function(options) {
			var navBarLinkDropdownTmpl = NavBarLinkDropdownTemplate();
			this.$el.html(navBarLinkDropdownTmpl);

			return this;
		}
	});

	return NavBarLinkDropdown;
});
