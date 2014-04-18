/**
 * LinkModel.js
 *
 * Backbone model representing a link.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'backbone'
],
function(
    Backbone
) {
	var LinkModel = Backbone.Model.extend({
		idAttribute: 'title',

		/**
		 * Define model defaults.
		 * @return defaults object
		 */
		defaults: function() {
			return {
				title: '',
				icon: '',
				url: []
			}
		}
	});

	return LinkModel;
});
