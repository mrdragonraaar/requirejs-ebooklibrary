/**
 * BooksNavToolBarView.js
 *
 * Backbone view representing nav toolbar for ebooklibrary books.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'base/views/toolbars/NavToolBarView',
    'hbs!ebooklibrary/template/books/BooksNavToolBarView',
    'backbone',
    'bootstrap'
],
function(
    NavToolBarView,
    BooksNavToolBarViewTemplate,
    Backbone
) {
	var BooksNavToolBarView = NavToolBarView.extend({
		tagName: 'ul',
		className: 'books-nav panel-nav nav panel-right',
		template: BooksNavToolBarViewTemplate,
		initialNavItemId: 'viewas-thumbnails',
		initialDropdownItemId: 'sortby-name',

		/**
		 * Event handler for nav item select event.
		 * @param navItemId id of nav item.
		 * @param navItemGroup group name of nav item.
		 */
		onToolBarSelectNavItem: function(navItemId, navItemGroup) {
			if (navItemGroup === 'viewas') {
				var booksContentType = navItemId.substr(navItemGroup.length + 1);
				this.trigger('toolBarSelectBooksContent', booksContentType);
			}
		},

		/**
		 * Event handler for dropdown item select event.
		 * @param dropdownItemId id of dropdown item.
		 * @param $dropdownItemParent parent of dropdown item (dropdown menu).
		 * @param isAscending true if dropdown item is ascending.
		 */
		onToolBarSelectDropdownItem: function(dropdownItemId, $dropdownItemParent, isAscending) {
			var booksContentSortPrefix = 'sortby-';
			var booksContentSort = dropdownItemId.substr(booksContentSortPrefix.length);
			this.trigger('toolBarSortBooksContent', booksContentSort, isAscending);
		},

		/**
		 * Activate thumbnails nav item.
		 */
		activateThumbnailsNavItem: function() {
			this.activateNavItem('viewas-thumbnails');
		},

		/**
		 * Activate details nav item.
		 */
		activateDetailsNavItem: function() {
			this.activateNavItem('viewas-details');
		},

		/**
		 * Activate list nav item.
		 */
		activateListNavItem: function() {
			this.activateNavItem('viewas-list');
		}
	});

	return BooksNavToolBarView;
});
