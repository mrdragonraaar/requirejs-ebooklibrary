/**
 * AuthorModel.js
 *
 * Backbone model representing an author item.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/model/FileModel'
],
function(
    FileModel
) {
	var AuthorModel = FileModel.extend({
		/**
		 * Get url href.
		 * @return href
		 */
		href: function() {
			return '/library/#!/books/' + this.get('fileInfo').name + '/';
		},

		/**
		 * Get json representation of author model.
		 * @param options json options.
		 * @return author model json
		 */
		toJSON: function(options) {
			var json = FileModel.prototype.toJSON.call(this, options);
			json.href = this.href();
			return json;
		}
	});

	return AuthorModel;
});
