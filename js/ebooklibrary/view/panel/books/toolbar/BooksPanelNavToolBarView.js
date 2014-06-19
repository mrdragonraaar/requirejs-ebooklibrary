/**
 * BooksPanelNavToolBarView.js
 *
 * Backbone view representing nav toolbar for ebooklibrary books panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'base/view/toolbar/NavToolBarView',
    'hbs!ebooklibrary/template/panel/books/toolbar/BooksPanelNavToolBar',
    'backbone',
    'bootstrap'
],
function(
    NavToolBarView,
    BooksPanelNavToolBarTemplate,
    Backbone
) {
	var BooksPanelNavToolBarView = NavToolBarView.extend({
		tagName: 'ul',
		className: 'books-nav panel-nav nav panel-right',
		template: BooksPanelNavToolBarTemplate,
		initialNavItemId: 'viewas-thumbnails',
		initialDropdownItemId: 'sortby-name',

		/**
		 * Event handler for nav item select event.
		 * @param navItemId id of nav item.
		 * @param navItemGroup group name of nav item.
		 */
		onToolBarSelectNavItem: function(navItemId, navItemGroup) {
			if (navItemGroup === 'viewas') {
				var viewAs = navItemId.substr(navItemGroup.length + 1);
				this.trigger('toolBarViewAs', viewAs);
			}
		},

		/**
		 * Event handler for dropdown item select event.
		 * @param dropdownItemId id of dropdown item.
		 * @param $dropdownItemParent parent of dropdown item (dropdown menu).
		 * @param isAscending true if dropdown item is ascending.
		 */
		onToolBarSelectDropdownItem: function(dropdownItemId, $dropdownItemParent, isAscending) {
			var sortByPrefix = 'sortby-';
			var sortBy = dropdownItemId.substr(sortByPrefix.length);
			this.trigger('toolBarSortBy', sortBy, isAscending);
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

	return BooksPanelNavToolBarView;
});
