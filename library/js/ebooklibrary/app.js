/**
 * app.js
 *
 * Main application entry point.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/router/AppRouter'
],
function(
    AppRouter
) {
	return {
		initialize: function() {
			new AppRouter;
		}
	};
});
