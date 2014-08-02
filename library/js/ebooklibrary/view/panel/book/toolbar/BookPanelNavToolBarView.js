/**
 * BookPanelNavToolBarView.js
 *
 * Backbone view representing nav toolbar for ebooklibrary book panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'ebooklibrary/view/toolbar/NavToolBarView',
    'hbs!ebooklibrary/template/panel/book/toolbar/BookPanelNavToolBar',
    'backbone'
],
function(
    NavToolBarView,
    BookPanelNavToolBarTemplate,
    Backbone
) {
	var BookPanelNavToolBarView = NavToolBarView.extend({
		tagName: 'ul',
		className: 'book-nav panel-nav nav panel-right',
		template: BookPanelNavToolBarTemplate,

		/**
		 * Event handler for nav item select event.
		 * @param navItemId id of nav item.
		 */
		onToolBarSelectNavItem: function(navItemId) {
			var chapterNavPrefix = 'chapter-';
			var chapterNav = navItemId.substr(chapterNavPrefix.length);

			this.trigger('toolBarChapterNav', chapterNav);
		}
	});

	return BookPanelNavToolBarView;
});
