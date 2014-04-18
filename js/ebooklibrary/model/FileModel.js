/**
 * FileModel.js
 *
 * Backbone model representing a file.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'backbone'
],
function(
    Backbone
) {
	var FileModel = Backbone.Model.extend({
		idAttribute: 'baseName',

		/**
		 * Define model defaults.
		 * @return defaults object
		 */
		defaults: function() {
			return {
				fullPath: '',
				baseName: '',
				fileInfo: {
					name: '',
					atime: 0,
					ctime: 0,
					mtime: 0,
					size: 0
				}
			}
		},

		/**
		 * Get string representation of atime.
		 * @return atime string
		 */
		aTimeStr: function() {
			return FileModel.dateStr(this.get('fileInfo').atime);
		},

		/**
		 * Get string representation of ctime.
		 * @return ctime string
		 */
		cTimeStr: function() {
			return FileModel.dateStr(this.get('fileInfo').ctime);
		},

		/**
		 * Get string representation of mtime.
		 * @return mtime string
		 */
		mTimeStr: function() {
			return FileModel.dateStr(this.get('fileInfo').mtime);
		},

		/**
		 * Get string representation of size.
		 * @return size string
		 */
		sizeStr: function() {
			return FileModel.sizeStr(this.get('fileInfo').size);
		},

		/**
		 * Get json representation of file model.
		 * @param options json options.
		 * @return file model json
		 */
		toJSON: function(options) {
			var json = Backbone.Model.prototype.toJSON.call(this, options);
			json.fileInfo.atimeStr = this.aTimeStr();
			json.fileInfo.mtimeStr = this.mTimeStr();
			json.fileInfo.ctimeStr = this.cTimeStr();
			json.fileInfo.sizeStr = this.sizeStr();
			return json;
		}
	},
	{
		/**
		 * Get string representation of given epoch date.
		 * @param epoch date as epoch.
		 * @return date string
		 */
		dateStr: function(epoch) {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
				'Sep', 'Oct', 'Nov', 'Dec'];

			var date = new Date(epoch);

			return ('0' + date.getDate()).slice(-2) + '-' + 
				months[date.getMonth()] + '-' + 
				date.getFullYear() + ' ' + 
				('0' + date.getHours()).slice(-2) + ':' + 
				('0' + date.getMinutes()).slice(-2);
		},

		/**
		 * Get string representation of given size.
		 * @param bytes size in bytes.
		 * @return size string
		 */
		sizeStr: function(bytes) {
			if (bytes > 1024 * 1024 * 1024) {
				return Math.round(bytes * 10 / (1024 * 1024 * 1024)) / 10 + 'G';
			}

			if (bytes > 1024 * 1024) {
				return Math.round(bytes * 10 / (1024 * 1024)) / 10 + 'M';
			}

			if (bytes > 1024) {
				return Math.round(bytes * 10 / 1024) / 10 + 'K';
			}

			return String(bytes);
		}
	});

	return FileModel;
});
