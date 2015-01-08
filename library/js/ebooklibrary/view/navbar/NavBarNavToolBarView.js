/**
 * NavBarNavToolBarView.js
 *
 * Backbone view representing nav toolbar for ebooklibrary navigation bar.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/toolbar/NavToolBarView',
    'hbs!ebooklibrary/template/navbar/NavBarNavToolBar',
    'ebooklibrary/view/dropdown/LinksDropdownView',
    'ebooklibrary/collection/LinkCollection',
    'backbone',
    'bootstrap'
],
function(
    NavToolBarView,
    NavBarNavToolBarTemplate,
    LinksDropdownView,
    LinkCollection,
    Backbone
) {
	var NavBarNavToolBarView = NavToolBarView.extend({
		tagName: 'ul',
		className: 'navbar-nav-toolbar navbar-nav nav navbar-right',
		//template: NavBarNavToolBarTemplate,
		//initialNavItemId: 'viewas-thumbnails',
		//initialDropdownItemId: 'sortby-name',

		linksDropdownView: null,

		/**
		 * Initialize nav toolbar.
		 * @param options nav toolbar options.
		 */
		initialize: function(options) {
			NavToolBarView.prototype.initialize.apply(this, options);

			var linkCollection = new LinkCollection();
			linkCollection.fetch({reset: true});

			this.linksDropdownView = new LinksDropdownView({collection: linkCollection});
		},

		/**
		 * Render nav toolbar.
		 * @return nav toolbar view
		 */
		render: function(options) {
			NavToolBarView.prototype.render.apply(this, options);

			this.$el.prepend(this.linksDropdownView.render().el);

			return this;
		},

		remove: function(options) {
			this.linksDropdownView.remove();

			NavToolBarView.prototype.remove.apply(this, options);
		},

		/**
		 * Event handler for nav item select event.
		 * @param navItemId id of nav item.
		 * @param navItemGroup group name of nav item.
		 */
		onToolBarSelectNavItem: function(navItemId, navItemGroup) {
/*
			if (navItemGroup === 'viewas') {
				var viewAs = navItemId.substr(navItemGroup.length + 1);
				this.trigger('toolBarViewAs', viewAs);
			}
*/
		},

		/**
		 * Event handler for dropdown item select event.
		 * @param dropdownItemId id of dropdown item.
		 * @param $dropdownItemParent parent of dropdown item (dropdown menu).
		 * @param isAscending true if dropdown item is ascending.
		 */
		onToolBarSelectDropdownItem: function(dropdownItemId, $dropdownItemParent, isAscending) {
			console.log('rabbit');
/*
			var sortByPrefix = 'sortby-';
			var sortBy = dropdownItemId.substr(sortByPrefix.length);
			this.trigger('toolBarSortBy', sortBy, isAscending);
*/
		},

		onClickNavItem: function(e) {
			return true;
		},

		onClickDropdownItem: function(e) {
			return true;
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

	return NavBarNavToolBarView;
});
