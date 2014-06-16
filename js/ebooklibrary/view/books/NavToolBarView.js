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

		/**
		 * Define nav toolbar click events.
		 */
		events: {
			'click > li': 'onClickNavItem',
		},

		/**
		 * Event handler for nav item click event.
		 * @param e click event.
		 */
		onClickNavItem: function(e) {
			e.preventDefault();

			var navItemName = this.getEventNavItemName(e);
			var navItemGroup = this.getEventNavItemGroup(e);

			if (navItemName && navItemGroup && 
			   !this.isActiveNavItem(navItemName, navItemGroup) &&
			   !this.isDisabledNavItem(navItemName, navItemGroup)) {
				this.deactivateNavGroup(navItemGroup);
				this.activateNavItem(navItemName, navItemGroup);

				this.trigger('selectNavItem', navItemName, navItemGroup);
			}
		},

		/**
		 * Get nav item from click event.
		 * @param e click event.
		 * @return nav item
		 */
		getEventNavItem: function(e) {
			return this.$(e.currentTarget);
		},

		/**
		 * Get nav item name from click event.
		 * @param e click event.
		 * @return nav item name
		 */
		getEventNavItemName: function(e) {
			return this.getEventNavItem(e).data('nav-name');
		},

		/**
		 * Get nav item group name from click event.
		 * @param e click event.
		 * @return nav item group name
		 */
		getEventNavItemGroup: function(e) {
			return this.getEventNavItem(e).data('nav-group');
		},

		/**
		 * Get nav item selector.
		 * @param navItemName name of nav item.
		 * @return nav item selector
		 */
		getNavItemSelector: function(navItemName) {
			return '[data-nav-name = ' + navItemName + ']';
		},

		/**
		 * Get nav group selector.
		 * @param navItemGroup group name of nav item.
		 * @return nav group selector
		 */
		getNavGroupSelector: function(navItemGroup) {
			return '[data-nav-group = ' + navItemGroup + ']';
		},

		/**
		 * Get nav item.
		 * @param navItemName name of nav item.
		 * @param navItemGroup group name of nav item.
		 * @return nav item
		 */
		getNavItem: function(navItemName, navItemGroup) {
			return this.$('> li' + this.getNavItemSelector(navItemName) + 
			   this.getNavGroupSelector(navItemGroup));
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
		 * Get active nav item.
		 * @param navItemGroup group name of nav item.
		 * @return active nav item
		 */
		getActiveNavItem: function(navItemGroup) {
			return this.$('> li' + this.getNavGroupSelector(navItemGroup) + '.active');
		},

		/**
		 * Get active nav item name.
		 * @param navItemGroup group name of nav item.
		 * @return active nav item name
		 */
		getActiveNavItemName: function(navItemGroup) {
			return this.getActiveNavItem(navItemGroup).data('nav-name');
		},

		/**
		 * Check whether nav item is active.
		 * @param navItemName name of nav item.
		 * @param navItemGroup group name of nav item.
		 * @return true if nav item is active
		 */
		isActiveNavItem: function(navItemName, navItemGroup) {
			return this.getNavItem(navItemName, navItemGroup).hasClass('active');
		},

		/**
		 * Activate nav item.
		 * @param navItemName name of nav item.
		 * @param navItemGroup group name of nav item.
		 */
		activateNavItem: function(navItemName, navItemGroup) {
			this.getNavItem(navItemName, navItemGroup).addClass('active');
		},

		/**
		 * Deactivate nav item.
		 * @param navItemName name of nav item.
		 * @param navItemGroup group name of nav item.
		 */
		deactivateNavItem: function(navItemName, navItemGroup) {
			this.getNavItem(navItemName, navItemGroup).removeClass('active');
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
		 * @param navItemName name of nav item.
		 * @param navItemGroup group name of nav item.
		 * @return true if nav item is disabled
		 */
		isDisabledNavItem: function(navItemName, navItemGroup) {
			return this.getNavItem(navItemName, navItemGroup).hasClass('disabled');
		},

		/**
		 * Enable nav item.
		 * @param navItemName name of nav item.
		 * @param navItemGroup group name of nav item.
		 */
		enableNavItem: function(navItemName, navItemGroup) {
			this.getNavItem(navItemName, navItemGroup).removeClass('disabled');
		},

		/**
		 * Disable nav item.
		 * @param navItemName name of nav item.
		 * @param navItemGroup group name of nav item.
		 */
		disableNavItem: function(navItemName, navItemGroup) {
			this.getNavItem(navItemName, navItemGroup).addClass('disabled');
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
		},

		/**
		 * Disable nav toolbar.
		 */
		disableNavToolBar: function() {
			this.$('> li').addClass('disabled');
		},

		/**
		 * Initialize nav toolbar.
		 * @param options nav toolbar options.
		 */
		initialize: function(options) {
			Backbone.View.prototype.initialize.apply(this, options);

			this.listenTo(this, 'selectNavItem', this.onSelectNavItem);
		},

		/**
		 * Render nav toolbar.
		 */
		render: function() {
			this.$el.html(this.template);

			return this;
		}
	});

	return NavToolBarView;
});
