/**
 * ScrollableListView.js
 *
 * Backbone view representing a scrollable list.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'backbone'
],
function(
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
			'click > .scrollable-list-next':	'onClickNext'
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
			this.$('.scrollable-list-viewport > ul').css("transform", "translate(" + (-1 * pageOffset) + "px, 0)");

			this.$('.scrollable-list-previous').removeClass('disabled');
			this.$('.scrollable-list-next').removeClass('disabled');
			if (this.page === 1) {
				this.$('.scrollable-list-previous').addClass('disabled');
			}

			if (this.page === this.pages) {
				this.$('.scrollable-list-next').addClass('disabled');
			}
		},

		/**
		 * Event handler for scrollable list resize event.
		 */
		onResize: function() {
			var viewPortWidth = this.$('.scrollable-list-viewport').width();
			this.page = 1;

			var itemsList = this.$('.scrollable-list-viewport > ul').children();
			if (itemsList.length) {
				var itemWidth = itemsList.outerWidth(true);
				var itemMarginRight = parseInt(itemsList.css("margin-right"), 10);
				var itemsListWidth = itemWidth * itemsList.length;
				var itemsPerPage = Math.floor((viewPortWidth + itemMarginRight) / itemWidth);

				this.pageWidth = itemWidth * itemsPerPage;
				this.pages = Math.ceil(itemsListWidth / this.pageWidth);

				this.$('.scrollable-list-viewport > ul').width(itemsListWidth);

				this.scroll();
			}
		},

		/**
		 * Initialise the scrollable list view.
		 * @param options scrollable list options.
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.renderScrollableListItems);

			this.onResize = _.debounce(_.bind(this.onResize, this), 200);
			$(window).on("resize", this.onResize);
		},

		/**
		 * Render the scrollable list view.
		 * @return scrollable list view
		 */
		render: function() {
			this.$el.html(this.template);

			return this;
		},

		/**
		 * Render the scrollable list items.
		 * @param collection collection.
		 */
		renderScrollableListItems: function(collection) {
			this.$('.scrollable-list-viewport > ul').empty();
			collection.each(function(item) {
				this.$('.scrollable-list-viewport > ul').append(this.itemTemplate(item.toJSON()));
			}, this);
			this.onResize();
		},

		/**
		 * Remove the books list view.
		 */
		remove: function() {
			$(window).off("resize", this.onResize);
			Backbone.View.prototype.remove.apply(this);
		}
	});

	return ScrollableListView;
});
