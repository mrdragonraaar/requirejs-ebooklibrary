/**
 * LinksDropdownView.js
 *
 * Backbone view representing ebooklibrary links dropdown menu.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/dropdown/LinksDropdown',
    'backbone'
],
function(
    LinksDropdownTemplate,
    Backbone
) {
	var LinksDropdownView = Backbone.View.extend({
		tagName: 'li',
		className: 'dropdown-links dropdown',

		/**
		 * Initialise the search form view.
		 * @param options search form options.
		 */
		initialize: function(options) {
			options = options || {};

			this.listenTo(this.collection, 'reset', this.renderLinks);
		},

		/**
		 * Render the links collection.
		 * @param collection links collection.
		 */
		renderLinks: function(collection) {
			var linksDropdownTmpl = LinksDropdownTemplate({links: collection.toJSON()});
			this.$el.append(linksDropdownTmpl);
		}
	});

	return LinksDropdownView;
});
