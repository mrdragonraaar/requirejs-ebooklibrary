/**
 * AuthorCollection.js
 *
 * Backbone collection of author models.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/AuthorModel',
    'ebooklibrary/collection/FileCollection'
],
function(
    AuthorModel,
    FileCollection
) {
	var AuthorCollection = FileCollection.extend({
		model: AuthorModel,	// author model

		/**
		 * Define author collection url.
		 * @return author collection url
		 */
		url: function() {
			return '/library/json/authors';
		}
	});

	return AuthorCollection;
});
