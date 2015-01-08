/**
 * ScrollableListView.js
 *
 * Backbone view representing a scrollable list.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'backbone'
    //'touch'
],
function(
    Backbone
) {
	var ScrollableListView = Backbone.View.extend({
		className: 'scrollable-list',
		template: null,
		itemTemplate: null,

		/**
		 * Define scrollable list click events.
		 */
		events: {
			'click > .scrollable-list-previous':	'onClickPrevious',
			'click > .scrollable-list-next':	'onClickNext',
			'swipe > .scrollable-list-viewport':	'onSwipe',
			'tap':	'onTap'
		},

		onSwipe: function(e, dir) {
			if (dir.type === 'right') {
				this.onClickPrevious(e);
			} else {
				this.onClickNext(e);
			}
			//alert('swiped ' + dir.type);
		},

		onTap: function(e, dir) {
			alert('tap');
			return true;
		},

		/**
		 * Event handler for scrollable list previous click event.
		 * @param e click event.
		 */
		onClickPrevious: function(e) {
			e.preventDefault();
			this.page = Math.max(this.page - 1, 1);
			this.scroll();
		},

		/**
		 * Event handler for scrollable list next click event.
		 * @param e click event.
		 */
		onClickNext: function(e) {
			e.preventDefault();
			this.page = Math.min(this.page + 1, this.pages);
			this.scroll();
		},

		/**
		 * Scroll to scrollable list page.
		 */
		scroll: function() {
			var pageOffset = (this.page - 1) * this.pageWidth;
			this.getViewportList().css("transform", "translate(" + (-1 * pageOffset) + "px, 0)");

			this.trigger('scrollPage', this.page, this.pages);

			this.disableScrollLinks();
		},

		/**
		 * Event handler for scrollable list resize event.
		 */
		onResize: function() {
			var viewportWidth = this.getViewport().width();
			this.page = 1;

			var itemsList = this.getViewportListItems();
			if (itemsList.length) {
				var itemWidth = itemsList.outerWidth(true);
				var itemMarginRight = parseInt(itemsList.css("margin-right"), 10);
				var itemsListWidth = itemWidth * itemsList.length;
				var itemsPerPage = Math.floor((viewportWidth + itemMarginRight) / itemWidth);

				this.pageWidth = itemWidth * itemsPerPage;
				this.pages = Math.ceil(itemsListWidth / this.pageWidth);

				this.getViewportList().width(itemsListWidth);

				this.scroll();
			}
		},


		/**
		 * Page methods.
		 */

		/**
		 * Check whether page is first page.
		 * @return true if first page
		 */
		isFirstPage: function() {
			return this.page === 1;
		},

		/**
		 * Check whether page is last page.
		 * @return true if last page
		 */
		isLastPage: function() {
			return this.page === this.pages;
		},


		/**
		 * Navigation link methods.
		 */

		/**
		 * Get previous link.
		 * @return previous link
		 */
		getPreviousLink: function() {
			return this.$('.scrollable-list-previous');
		},

		/**
		 * Enable previous link.
		 */
		enablePreviousLink: function() {
			this.getPreviousLink().removeClass('disabled');
		},

		/**
		 * Disable previous link.
		 */
		disablePreviousLink: function() {
			this.getPreviousLink().addClass('disabled');
		},

		/**
		 * Get next link.
		 * @return next link
		 */
		getNextLink: function() {
			return this.$('.scrollable-list-next');
		},

		/**
		 * Enable next link.
		 */
		enableNextLink: function() {
			this.getNextLink().removeClass('disabled');
		},

		/**
		 * Disable next link.
		 */
		disableNextLink: function() {
			this.getNextLink().addClass('disabled');
		},

		/**
		 * Enable both links.
		 */
		enableLinks: function() {
			this.enablePreviousLink();
			this.enableNextLink();
		},

		/**
		 * Disable both links.
		 */
		disableLinks: function() {
			this.disablePreviousLink();
			this.disableNextLink();
		},

		/**
		 * Disable previous link if first page.
		 * Disable next link if last page.
		 */
		disableScrollLinks: function() {
			this.enableLinks();

			if (this.isFirstPage()) {
				this.disablePreviousLink();
			}

			if (this.isLastPage()) {
				this.disableNextLink();
			}
		},


		/**
		 * Viewport methods.
		 */

		/**
		 * Get viewport.
		 * @return viewport
		 */
		getViewport: function() {
			return this.$('.scrollable-list-viewport');
		},

		/**
		 * Get viewport list.
		 * @return viewport list
		 */
		getViewportList: function() {
			return this.$('.scrollable-list-viewport > ul');
		},

		/**
		 * Get viewport list items.
		 * @return viewport list items
		 */
		getViewportListItems: function() {
			return this.getViewportList().children();
		},


		/**
		 * Initialise the scrollable list view.
		 * @param options scrollable list options.
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.renderScrollableListItems);
			$(window).on("resize", _.debounce(_.bind(this.onResize, this), 200));
		},

		/**
		 * Render the scrollable list view.
		 * @return scrollable list view
		 */
		render: function() {
			this.$el.html(this.template);

			this.$('.scrollable-list-viewport').on('touchstart', _.bind(function(e) {
				this.initX = e.originalEvent.touches[0].pageX;
			}, this));

			this.$('.scrollable-list-viewport').on('touchmove', _.bind(function(e) {
				this.endX = e.originalEvent.touches[0].pageX;
			}, this));

			this.$('.scrollable-list-viewport').on('touchend', _.bind(function(e) {
				if (this.endX > 0) {
				//alert('touchend ' + this.initX + ' ' + this.endX);
					if (this.endX - this.initX > 50) {
						// Right
						this.onClickPrevious(e);
					} else if (this.initX - this.endX > 50) {
						// Left
						this.onClickNext(e);
					}

						this.initX = this.endX = 0;
/*
					setTimeout(function() {
						this.initX = this.endX = 0;
					}, 25);
*/
				}
			}, this));

			return this;
		},

		/**
		 * Render the scrollable list items.
		 * @param collection collection.
		 */
		renderScrollableListItems: function(collection) {
			this.getViewportList().empty();
			collection.each(function(item) {
				this.getViewportList().append(this.itemTemplate(item.toJSON()));
			}, this);
			this.onResize();
		},

		/**
		 * Remove the books list view.
		 */
		remove: function() {
			$(window).off("resize");

			this.$('.scrollable-list-viewport').off('touchstart');
			this.$('.scrollable-list-viewport').off('touchmove');
			this.$('.scrollable-list-viewport').off('touchend');

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return ScrollableListView;
});
