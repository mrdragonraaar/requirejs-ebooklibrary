/**
 * The {{#basename path}} helper returns trailing name component of path.
 */
define(['Handlebars'], function(Handlebars) {
	Handlebars.registerHelper('basename', function(path, options) {
		var b = path;
		var lastChar = b.charAt(b.length - 1);

		if (lastChar === '/' || lastChar === '\\') {
			b = b.slice(0, -1);
		}

		return b.replace(/^.*[\/\\]/g, '');
	});
});
