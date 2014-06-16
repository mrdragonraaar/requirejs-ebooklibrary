/**
 * BooksNavToolBarView.js
 *
 * Backbone view representing nav toolbar for ebooklibrary books.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/books/NavToolBarView',
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

		/**
		 * Event handler for nav item select event.
		 * @param navItemName name of nav item.
		 * @param navItemGroup group name of nav item.
		 */
		onSelectNavItem: function(navItemName, navItemGroup) {
			if (navItemGroup === 'viewas')
				this.trigger('selectBooksContent', navItemName);
		},

		/**
		 * Activate thumbnails nav item.
		 */
		activateThumbnailsNavItem: function() {
			this.activateNavItem('thumbnails', 'viewas');
		},

		/**
		 * Activate details nav item.
		 */
		activateDetailsNavItem: function() {
			this.activateNavItem('details', 'viewas');
		},

		/**
		 * Activate list nav item.
		 */
		activateListNavItem: function() {
			this.activateNavItem('list', 'viewas');
		},






		/**
		 * Event handler for sortBy menu click event.
		 * @param e click event.
		 */
		onClickSortByMenu: function(e) {
			e.preventDefault();

			var selectedSortByMenuName = e.currentTarget.title;

			if (selectedSortByMenuName === this.getActiveSortByMenuName() &&
			   this.isActiveSortByMenuAscending()) {
				this.setActiveSortByMenu(selectedSortByMenuName, false);
				this.trigger('booksPanelToolBarSortBy', selectedSortByMenuName, false);
			}
			else {
				this.setActiveSortByMenu(selectedSortByMenuName, true);
				this.trigger('booksPanelToolBarSortBy', selectedSortByMenuName, true);
			}
		},

		/**
		 * Get sortBy button.
		 * @return sortBy button
		 */
		getSortByButton: function() {
			return this.$('.toolbar-sortby > button.btn-sortby-dropdown');
		},

		/**
		 * Disable sortBy button.
		 * @param disable if true will disable else will enable.
		 */
		disableSortByButton: function(disable) {
			var sortByButton = this.getSortByButton();
			//this.disableButton(sortByButton, disable);
		},

		/**
		 * Get sortBy menu.
		 * @param sortByMenuName name of sortBy menu.
		 * @return sortBy menu
		 */
		getSortByMenu: function(sortByMenuName) {
			return this.$('.toolbar-sortby > .dropdown-menu > li.dropdown-sortby-' + 
			    sortByMenuName.replace(/ /g, '').toLowerCase());
		},

		/**
		 * Get all sortBy menus.
		 * @return sortBy menus
		 */
		getAllSortByMenus: function() {
			return this.$('.toolbar-sortby > .dropdown-menu > li');
		},

		/**
		 * Get active sortBy menu.
		 * @return active sortBy menu
		 */
		getActiveSortByMenu: function() {
			return this.$('.toolbar-sortby > .dropdown-menu > li.active');
		},

		/**
		 * Get active sortBy menu name.
		 * @return active sortBy menu name
		 */
		getActiveSortByMenuName: function() {
			var sortByMenu = this.getActiveSortByMenu();
			if (sortByMenu.length)
				return sortByMenu.children('a').attr('title');

			return '';
		},

		/**
		 * Test if active sortBy menu is ascending.
		 * @return true if active sortBy menu is ascending
		 */
		isActiveSortByMenuAscending: function() {
			var sortByMenu = this.getActiveSortByMenu();
			if (sortByMenu.length)
				return sortByMenu.hasClass('dropup');

			return false;
		},

		/**
		 * Deactivate all sortBy menus.
		 */
		deactivateAllSortByMenus: function() {
			var sortByMenus = this.getAllSortByMenus();
			sortByMenus.removeClass('active').removeClass('dropup');
			sortByMenus.children('a').children('.caret').addClass('hide');
		},

		/**
		 * Set active sortBy menu.
		 * @param sortByMenuName name of sortBy menu to activate.
		 * @param asc true if sortBy menu is ascending.
		 */
		setActiveSortByMenu: function(sortByMenuName, asc) {
			this.deactivateAllSortByMenus();

			var sortByMenu = this.getSortByMenu(sortByMenuName);
			sortByMenu.addClass('active');
			if (asc)
				sortByMenu.addClass('dropup');
			sortByMenu.children('a').children('.caret').removeClass('hide');
		},

		/**
		 * Render the books panel toolbar.
		 * @return books panel toolbar view
		 */
/*
		render: function() {
			var toolBarTmpl = BooksNavToolBarViewTemplate();
			this.$el.html(toolBarTmpl);

			return this;
		}
*/
	});

	return BooksNavToolBarView;
});
