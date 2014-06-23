/**
 * HeaderView.js
 *
 * Backbone view representing ebooklibrary header.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    //'hbs!ebooklibrary/template/header/Header',
    //'ebooklibrary/view/well/latestadditions/LatestAdditionsView',
    'ebooklibrary/view/panel/latestadditions/LatestAdditionsPanelView',
    'backbone'
],
function(
    //HeaderTemplate,
    LatestAdditionsPanelView,
    Backbone
) {
	var HeaderView = Backbone.View.extend({
		tagName: 'header',
		className: 'header header-default',

		latestAdditions: null,		// latest additions well view

		/**
		 * Initialise the header view.
		 * @param options header options.
		 */
		initialize: function(options) {
			options = options || {};

			this.latestAdditions = new LatestAdditionsPanelView({max: options.max});
		},

		/**
		 * Render the header view.
		 * @return header view
		 */
		render: function() {
			//var headerTmpl = HeaderTemplate();
			//this.$el.html(headerTmpl);

			this.$el.html(this.latestAdditions.render().el);

			return this;
		},

		/**
		 * Remove the header view.
		 */
		remove: function() {
			this.latestAdditions.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return HeaderView;
});
