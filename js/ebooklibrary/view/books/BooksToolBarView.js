/**
 * BooksToolBarView.js
 *
 * Backbone view representing toolbar for ebooklibrary books.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/bookspanel/BooksPanelToolBarView',
    'backbone',
    'bootstrap'
],
function(
    BooksPanelToolBarViewTemplate,
    Backbone
) {
	var BooksToolBarView = Backbone.View.extend({
		//className: 'bookspanel-toolbar btn-toolbar pull-right',
		tagName: 'ul',
		className: 'books-nav panel-nav nav panel-right',

		/**
		 * Define book panel click events.
		 */
		events: {
			//'click .toolbar-viewas button': 'onClickViewAs',
			'click .nav-viewas > a': 'onClickViewAs',
			'click .toolbar-sortby a': 'onClickSortByMenu'
		},

		/**
		 * Event handler for viewAs button click event.
		 * @param e click event.
		 */
		onClickViewAs: function(e) {
			e.preventDefault();

			console.log('viewAs');

			var selectedViewAsButtonName = e.currentTarget.title;
			console.log(selectedViewAsButtonName);

			if (selectedViewAsButtonName !== this.getActiveViewAsButtonName()) {
				this.setActiveViewAsButton(selectedViewAsButtonName);
				this.trigger('booksPanelToolBarViewAs', selectedViewAsButtonName);
			}
		},

		/**
		 * Get viewAs button.
		 * @param viewAsButtonName name of viewAs button.
		 * @return viewAs button
		 */
		getViewAsButton: function(viewAsButtonName) {
			return this.$('.nav-viewas.viewas-' + viewAsButtonName.toLowerCase());

			//return this.$('.nav-viewas > a.viewas-' + 
			    //viewAsButtonName.toLowerCase());
			//return this.$('.toolbar-viewas > button.btn-viewas-' + 
			    //viewAsButtonName.toLowerCase());
		},

		/**
		 * Get all viewAs buttons.
		 * @return viewAs buttons
		 */
		getAllViewAsButtons: function() {
			//return this.$('.toolbar-viewas > button');
			return this.$('.nav-viewas');
		},

		/**
		 * Get active viewAs button.
		 * @return active viewAs button
		 */
		getActiveViewAsButton: function() {
			//return this.$('.toolbar-viewas > button.active');
			return this.$('.nav-viewas.active');
		},

		/**
		 * Get active viewAs button name.
		 * @return active viewAs button name
		 */
		getActiveViewAsButtonName: function() {
			var viewAsButton = this.getActiveViewAsButton();
			if (viewAsButton.length)
				return viewAsButton.children('a').attr('title');

			return '';
		},

		/**
		 * Deactivate all viewAs buttons.
		 */
		deactivateAllViewAsButtons: function() {
			var viewAsButtons = this.getAllViewAsButtons();
			viewAsButtons.removeClass('active');
			//this.$('.nav-viewas').removeClass('active');
		},

		/**
		 * Set active viewAs button.
		 * @param viewAsButtonName name of viewAs button to activate.
		 */
		setActiveViewAsButton: function(viewAsButtonName) {
			this.deactivateAllViewAsButtons();

			var viewAsButton = this.getViewAsButton(viewAsButtonName);
			viewAsButton.addClass('active');
		},

		/**
		 * Set thumbnails viewAs button to active.
		 */
		setActiveViewAsThumbnailsButton: function() {
			this.setActiveViewAsButton('Thumbnails');
		},

		/**
		 * Set details viewAs button to active.
		 */
		setActiveViewAsDetailsButton: function() {
			this.setActiveViewAsButton('Details');
		},

		/**
		 * Set list viewAs button to active.
		 */
		setActiveViewAsListButton: function() {
			this.setActiveViewAsButton('List');
		},

		/**
		 * Disable button.
		 * @param button button to disable.
		 * @param disable if true will disable else will enable.
		 */
		disableButton: function(button, disable) {
			button.prop('disabled', disable);
			if (disable)
				button.addClass('disabled');
			else
				button.removeClass('disabled');
		},

		/**
		 * Disable all viewAs buttons.
		 * @param disable if true will disable else will enable.
		 */
		disableAllViewAsButtons: function(disable) {
			var viewAsButtons = this.getAllViewAsButtons();
			this.disableButton(viewAsButtons, disable);
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
			this.disableButton(sortByButton, disable);
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
		render: function() {
			var toolBarTmpl = BooksPanelToolBarViewTemplate();
			this.$el.html(toolBarTmpl);

			return this;
		}
	});

	return BooksToolBarView;
});
