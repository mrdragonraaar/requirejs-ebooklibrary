/**
 * NavToolBarView.js
 *
 * Backbone view representing a nav toolbar.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'backbone',
    'bootstrap'
],
function(
) {
	var NavToolBarView = Backbone.View.extend({
		tagName: 'ul',
		template: null,
		initialNavItemId: null,
		initialDropdownItemId: null,

		/**
		 * Define nav toolbar click events.
		 */
		events: {
			'click > li': 'onClickNavItem',
			'click > li.dropdown > .dropdown-menu > li': 'onClickDropdownItem'
		},

		/**
		 * Event handler for nav item click event.
		 * @param e click event.
		 */
		onClickNavItem: function(e) {
			e.preventDefault();

			var navItemId = this.getEventNavItemId(e);
			var navItemGroup = this.getEventNavItemGroup(e);
			var navItemToggle = this.isEventNavItemToggle(e);

			if (navItemId && !this.isDisabledNavItem(navItemId)) {
				// activate group nav item
				if (navItemGroup && !this.isActiveNavItem(navItemId)) {
					this.deactivateNavGroup(navItemGroup);
					this.activateNavItem(navItemId);

					this.trigger('toolBarSelectNavItem', navItemId, navItemGroup);
					return;
				}

				// toggle nav item
				if (navItemToggle) {
					var navItemActiveState = this.toggleNavItem(navItemId);
					this.trigger('toolBarToggleNavItem', navItemId, navItemActiveState);
					return;
				}

				// click nav item
				this.trigger('toolBarSelectNavItem', navItemId);
			}
		},

		/**
		 * Event handler for dropdown item click event.
		 * @param e click event.
		 */
		onClickDropdownItem: function(e) {
			e.preventDefault();

			var dropdownItemId = this.getEventDropdownItemId(e);
			var $dropdownItemParent = this.getEventDropdownItemParent(e);

			if (dropdownItemId && $dropdownItemParent &&
			   !this.isDisabledDropdownItem(dropdownItemId)) {
				this.deactivateDropdownMenu($dropdownItemParent);
				this.activateDropdownItem(dropdownItemId);

				var isAscending = !this.isAscendingDropdownItem(dropdownItemId);
				this.setDescendingDropdownMenu($dropdownItemParent);
				if (isAscending) {
					this.setAscendingDropdownItem(dropdownItemId);
				}

				this.disableDropdownMenuCaret($dropdownItemParent);
				this.enableDropdownItemCaret(dropdownItemId);

				this.trigger('toolBarSelectDropdownItem', dropdownItemId,
				   $dropdownItemParent, isAscending);
			}
		},

		/**
		 * Get item from click event.
		 * @param e click event.
		 * @return item
		 */
		getEventItem: function(e) {
			return this.$(e.currentTarget);
		},

		/**
		 * Get item id from click event.
		 * @param e click event.
		 * @return item id
		 */
		getEventItemId: function(e) {
			return this.getEventItem(e).prop('id');
		},


		/**
		 * Nav methods.
		 */

		/**
		 * Get nav item from click event.
		 * @param e click event.
		 * @return nav item
		 */
		getEventNavItem: function(e) {
			return this.getEventItem(e);
		},

		/**
		 * Get nav item id from click event.
		 * @param e click event.
		 * @return nav item id
		 */
		getEventNavItemId: function(e) {
			return this.getEventItemId(e);
		},

		/**
		 * Get nav item group name from click event.
		 * @param e click event.
		 * @return nav item group name
		 */
		getEventNavItemGroup: function(e) {
			return this.getEventNavItem(e).data('group');
		},

		/**
		 * Check whether nav item from click event is toggle nav item.
		 * @param e click event.
		 * @return true if nav item is toggle nav item
		 */
		isEventNavItemToggle: function(e) {
			return this.getEventNavItem(e).data('toggle') === 'nav';
		},

		/**
		 * Get nav group selector.
		 * @param navItemGroup group name of nav item.
		 * @return nav group selector
		 */
		getNavGroupSelector: function(navItemGroup) {
			return '[data-group = ' + navItemGroup + ']';
		},

		/**
		 * Get nav item.
		 * @param navItemId id of nav item.
		 * @return nav item
		 */
		getNavItem: function(navItemId) {
			return this.$('> li#' + navItemId);
		},

		/**
		 * Get nav item group name.
		 * @param navItemId id of nav item.
		 * @return nav item group name
		 */
		getNavItemGroup: function(navItemId) {
			return this.getNavItem(navItemId).data('group');
		},

		/**
		 * Check whether nav item is toggle nav item.
		 * @param navItemId id of nav item.
		 * @return true if nav item is toggle nav item
		 */
		isNavItemToggle: function(navItemId) {
			return this.getNavItem(navItemId).data('toggle') === 'nav';
		},

		/**
		 * Get nav group.
		 * @param navItemGroup group name of nav item.
		 * @return nav group
		 */
		getNavGroup: function(navItemGroup) {
			return this.$('> li' + this.getNavGroupSelector(navItemGroup));
		},

		/**
		 * Get groups active nav item.
		 * @param navItemGroup group name of nav item.
		 * @return active nav item
		 */
		getActiveGroupNavItem: function(navItemGroup) {
			return this.$('> li' + this.getNavGroupSelector(navItemGroup) + '.active');
		},

		/**
		 * Get groups active nav item id.
		 * @param navItemGroup group name of nav item.
		 * @return active nav item id
		 */
		getActiveGroupNavItemId: function(navItemGroup) {
			return this.getActiveGroupNavItem(navItemGroup).prop('id');
		},

		/**
		 * Check whether nav item is active.
		 * @param navItemId id of nav item.
		 * @return true if nav item is active
		 */
		isActiveNavItem: function(navItemId) {
			return this.getNavItem(navItemId).hasClass('active');
		},

		/**
		 * Activate nav item.
		 * @param navItemId id of nav item.
		 */
		activateNavItem: function(navItemId) {
			this.getNavItem(navItemId).addClass('active');
		},

		/**
		 * Deactivate nav item.
		 * @param navItemId id of nav item.
		 */
		deactivateNavItem: function(navItemId) {
			this.getNavItem(navItemId).removeClass('active');
		},

		/**
		 * Toggle active state of nav item.
		 * @param navItemId id of nav item.
		 * @return true if nav item is active
		 */
		toggleNavItem: function(navItemId) {
			if (this.isActiveNavItem(navItemId)) {
				this.deactivateNavItem(navItemId);
				return false;
			}

			this.activateNavItem(navItemId);
			return true;
		},

		/**
		 * Activate nav group.
		 * @param navItemGroup group name of nav item.
		 */
		activateNavGroup: function(navItemGroup) {
			this.getNavGroup(navItemGroup).addClass('active');
		},

		/**
		 * Deactivate nav group.
		 * @param navItemGroup group name of nav item.
		 */
		deactivateNavGroup: function(navItemGroup) {
			this.getNavGroup(navItemGroup).removeClass('active');
		},

		/**
		 * Check whether nav item is disabled.
		 * @param navItemId id of nav item.
		 * @return true if nav item is disabled
		 */
		isDisabledNavItem: function(navItemId) {
			return this.getNavItem(navItemId).hasClass('disabled');
		},

		/**
		 * Enable nav item.
		 * @param navItemId id of nav item.
		 */
		enableNavItem: function(navItemId) {
			this.getNavItem(navItemId).removeClass('disabled');
		},

		/**
		 * Disable nav item.
		 * @param navItemId id of nav item.
		 */
		disableNavItem: function(navItemId) {
			this.getNavItem(navItemId).addClass('disabled');
		},

		/**
		 * Enable nav group.
		 * @param navItemGroup group name of nav item.
		 */
		enableNavGroup: function(navItemGroup) {
			this.getNavGroup(navItemGroup).removeClass('disabled');
		},

		/**
		 * Disable nav group.
		 * @param navItemGroup group name of nav item.
		 */
		disableNavGroup: function(navItemGroup) {
			this.getNavGroup(navItemGroup).addClass('disabled');
		},

		/**
		 * Enable nav toolbar.
		 */
		enableNavToolBar: function() {
			this.$('> li').removeClass('disabled');
			this.$('.dropdown-toggle').removeClass('disabled');
		},

		/**
		 * Disable nav toolbar.
		 */
		disableNavToolBar: function() {
			this.$('> li').addClass('disabled');
			this.$('.dropdown-toggle').addClass('disabled');
		},


		/**
		 * Dropdown methods.
		 */

		/**
		 * Get dropdown item from click event.
		 * @param e click event.
		 * @return dropdown item
		 */
		getEventDropdownItem: function(e) {
			return this.getEventItem(e);
		},

		/**
		 * Get dropdown item id from click event.
		 * @param e click event.
		 * @return dropdown item id
		 */
		getEventDropdownItemId: function(e) {
			return this.getEventItemId(e);
		},

		/**
		 * Get dropdown item parent from click event.
		 * @param e click event.
		 * @return dropdown item parent
		 */
		getEventDropdownItemParent: function(e) {
			return this.getEventDropdownItem(e).parent();
		},

		/**
		 * Get dropdown item.
		 * @param dropdownItemId id of dropdown item.
		 * @return dropdown item
		 */
		getDropdownItem: function(dropdownItemId) {
			return this.$('.dropdown-menu > li#' + dropdownItemId);
		},

		/**
		 * Check whether dropdown item is active.
		 * @param dropdownItemId id of dropdown item.
		 * @return true if dropdown item is active
		 */
		isActiveDropdownItem: function(dropdownItemId) {
			return this.getDropdownItem(dropdownItemId).hasClass('active');
		},

		/**
		 * Activate dropdown item.
		 * @param dropdownItemId id of dropdown item.
		 */
		activateDropdownItem: function(dropdownItemId) {
			this.getDropdownItem(dropdownItemId).addClass('active');
		},

		/**
		 * Deactivate dropdown item.
		 * @param dropdownItemId id of dropdown item.
		 */
		deactivateDropdownItem: function(dropdownItemId) {
			this.getDropdownItem(dropdownItemId).removeClass('active');
		},

		/**
		 * Activate all dropdown menu items.
		 * @param $dropdownMenu dropdown menu object.
		 */
		activateDropdownMenu: function($dropdownMenu) {
			$dropdownMenu.children().addClass('active');
		},

		/**
		 * Deactivate all dropdown menu items.
		 * @param $dropdownMenu dropdown menu object.
		 */
		deactivateDropdownMenu: function($dropdownMenu) {
			$dropdownMenu.children().removeClass('active');
		},

		/**
		 * Check whether dropdown item is disabled.
		 * @param dropdownItemId id of dropdown item.
		 * @return true if dropdown item is disabled
		 */
		isDisabledDropdownItem: function(dropdownItemId) {
			return this.getDropdownItem(dropdownItemId).hasClass('disabled');
		},

		/**
		 * Enable dropdown item.
		 * @param dropdownItemId id of dropdown item.
		 */
		enableDropdownItem: function(dropdownItemId) {
			this.getDropdownItem(dropdownItemId).removeClass('disabled');
		},

		/**
		 * Disable dropdown item.
		 * @param dropdownItemId id of dropdown item.
		 */
		disableDropdownItem: function(dropdownItemId) {
			this.getDropdownItem(dropdownItemId).addClass('disabled');
		},

		/**
		 * Enable all dropdown menu items.
		 * @param $dropdownMenu dropdown menu object.
		 */
		enableDropdownMenu: function($dropdownMenu) {
			$dropdownMenu.children().removeClass('disabled');
		},

		/**
		 * Disable all dropdown menu items.
		 * @param $dropdownMenu dropdown menu object.
		 */
		disableDropdownMenu: function($dropdownMenu) {
			$dropdownMenu.children().addClass('disabled');
		},

		/**
		 * Check whether dropdown item is ascending.
		 * @param dropdownItemId id of dropdown item.
		 * @return true if dropdown item is ascending
		 */
		isAscendingDropdownItem: function(dropdownItemId) {
			return this.getDropdownItem(dropdownItemId).hasClass('dropup');
		},

		/**
		 * Set dropdown item as ascending.
		 * @param dropdownItemId id of dropdown item.
		 */
		setAscendingDropdownItem: function(dropdownItemId) {
			this.getDropdownItem(dropdownItemId).addClass('dropup');
		},

		/**
		 * Set dropdown item as descending.
		 * @param dropdownItemId id of dropdown item.
		 */
		setDescendingDropdownItem: function(dropdownItemId) {
			this.getDropdownItem(dropdownItemId).removeClass('dropup');
		},

		/**
		 * Set all dropdown menu items as ascending.
		 * @param $dropdownMenu dropdown menu object.
		 */
		setAscendingDropdownMenu: function($dropdownMenu) {
			$dropdownMenu.children().addClass('dropup');
		},

		/**
		 * Set all dropdown menu items as descending.
		 * @param $dropdownMenu dropdown menu object.
		 */
		setDescendingDropdownMenu: function($dropdownMenu) {
			$dropdownMenu.children().removeClass('dropup');
		},

		/**
		 * Check whether dropdown item caret is disabled.
		 * @param dropdownItemId id of dropdown item.
		 * @return true if dropdown item caret is disabled
		 */
		isDisabledDropdownItemCaret: function(dropdownItemId) {
			return this.getDropdownItem(dropdownItemId).find('> a > .caret').hasClass('hide');
		},

		/**
		 * Enable dropdown item caret.
		 * @param dropdownItemId id of dropdown item.
		 */
		enableDropdownItemCaret: function(dropdownItemId) {
			this.getDropdownItem(dropdownItemId).find('> a > .caret').removeClass('hide');
		},

		/**
		 * Disable dropdown item caret.
		 * @param dropdownItemId id of dropdown item.
		 */
		disableDropdownItemCaret: function(dropdownItemId) {
			this.getDropdownItem(dropdownItemId).find('> a > .caret').addClass('hide');
		},

		/**
		 * Enable all dropdown menu item carets.
		 * @param $dropdownMenu dropdown menu object.
		 */
		enableDropdownMenuCaret: function($dropdownMenu) {
			$dropdownMenu.find('> li > a > .caret').removeClass('hide');
		},

		/**
		 * Disable all dropdown menu item carets.
		 * @param $dropdownMenu dropdown menu object.
		 */
		disableDropdownMenuCaret: function($dropdownMenu) {
			$dropdownMenu.find('> li > a > .caret').addClass('hide');
		},


		/**
		 * Initialize nav toolbar.
		 * @param options nav toolbar options.
		 */
		initialize: function(options) {
			Backbone.View.prototype.initialize.apply(this, options);

			this.listenTo(this, 'toolBarSelectNavItem', this.onToolBarSelectNavItem);
			this.listenTo(this, 'toolBarToggleNavItem', this.onToolBarToggleNavItem);
			this.listenTo(this, 'toolBarSelectDropdownItem', this.onToolBarSelectDropdownItem);
		},

		/**
		 * Render nav toolbar.
		 * @return nav toolbar view
		 */
		render: function() {
			this.$el.html(this.template);

			if (this.initialNavItemId) {
				this.activateNavItem(this.initialNavItemId);
			}

			if (this.initialDropdownItemId) {
				this.activateDropdownItem(this.initialDropdownItemId);
				this.setAscendingDropdownItem(this.initialDropdownItemId);
				this.enableDropdownItemCaret(this.initialDropdownItemId);
			}

			return this;
		}
	});

	return NavToolBarView;
});
