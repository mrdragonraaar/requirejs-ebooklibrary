/**
 * The {{#exists}} helper checks if variable is defined.
 */
define(['Handlebars'], function(Handlebars) {
	Handlebars.registerHelper('exists', function(variable, options) {
		if (typeof variable !== 'undefined') {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
});
