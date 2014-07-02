/**
 * ScrollableBooksListView.js
 *
 * Backbone view representing a scrollable books list.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/list/ScrollableListView',
    'hbs!ebooklibrary/template/list/ScrollableBooksList',
    'hbs!ebooklibrary/template/list/ScrollableBooksListItem',
    'backbone'
],
function(
    ScrollableListView,
    ScrollableBooksListTemplate,
    ScrollableBooksListItemTemplate
) {
	var ScrollableBooksListView = ScrollableListView.extend({
		className: 'books-list scrollable-list',
		template: ScrollableBooksListTemplate,
		itemTemplate: ScrollableBooksListItemTemplate
	});

	return ScrollableBooksListView;
});
