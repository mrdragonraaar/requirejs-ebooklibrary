/**
 * NavBarSearchBoxView.js
 *
 * Backbone view representing ebooklibrary navigation bar's search box.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/form/SearchFormView'
],
function(
    SearchFormView
) {
	var NavBarSearchBoxView = SearchFormView.extend({
		className: 'navbar-form navbar-right form-search',
	});

	return NavBarSearchBoxView;
});
