/**
 * LinkCollection.js
 *
 * Backbone collection of link models.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/LinkModel',
    'backbone'
],
function(
    LinkModel,
    Backbone
) {
	var LinkCollection = Backbone.Collection.extend({
		model: LinkModel,	// link model

		/**
		 * Define link collection url.
		 * @return link collection url
		 */
		url: function() {
			return '/library/json/links';
		}
	});

	return LinkCollection;
});
