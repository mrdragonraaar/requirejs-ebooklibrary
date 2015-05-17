/**
 * The {{#letters}} helper loops through letters a-z.
 */
define(['Handlebars'], function(Handlebars) {
	Handlebars.registerHelper('letters', function(context, options) {
		var A = 65;
		var Z = 90;

		var out = '';
		for (var c=A; c<=Z; c++) {
			out = out + options.fn({uc: String.fromCharCode(c), lc: String.fromCharCode(c+32)});
		}

		return out;
	});
});
