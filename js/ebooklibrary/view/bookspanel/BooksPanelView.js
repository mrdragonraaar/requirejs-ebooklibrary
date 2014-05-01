/**
 * BooksPanelView.js
 *
 * Backbone view representing ebooklibrary books panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/bookspanel/BooksPanelView',
    'hbs!ebooklibrary/template/bookspanel/ThumbsView',
    'hbs!ebooklibrary/template/bookspanel/DetailsView',
    'hbs!ebooklibrary/template/bookspanel/ListView',
    'ebooklibrary/view/bookspanel/BooksPanelToolBarView',
    'backbone'
],
function(
    BooksPanelViewTemplate,
    ThumbsViewTemplate,
    DetailsViewTemplate,
    ListViewTemplate,
    BooksPanelToolBarView,
    Backbone
) {
	var BooksPanelView = Backbone.View.extend({
		tagName: 'bookspanel',
		className: 'panel panel-books',

		toolBarView: null,	// toolbar view

		/**
		 * Initialise the books panel view.
		 * @param options books panel options (collection).
		 */
		initialize: function(options) {
			options = options || {};

			if (this.collection)
				this.collection.fetch({timeout: 20000});

			this.listenTo(this.collection, 'sync', this.fadeInBooks);
			this.listenTo(this.collection, 'sort', this.renderBooks);

			this.toolBarView = new BooksPanelToolBarView();
			this.listenTo(this.toolBarView, 'booksPanelToolBarSortBy', this.onBooksPanelToolBarSortBy);
			this.listenTo(this.toolBarView, 'booksPanelToolBarViewAs', this.onBooksPanelToolBarViewAs);
		},

		/**
		 * Event handler for toolbar viewAs event.
		 * @param viewAsButtonName name of viewAs button.
		 */
		onBooksPanelToolBarViewAs: function(viewAsButtonName) {
			if (this.collection)
				this.fadeInBooks(this.collection);
		},

		/**
		 * Event handler for toolbar sortBy event.
		 * @param sortByMenuName name of sortBy menu.
		 * @param asc true if sortBy menu is ascending.
		 */
		onBooksPanelToolBarSortBy: function(sortByMenuName, asc) {
			if (this.collection) {
				this.collection.setSortBy(sortByMenuName, asc);
				this.collection.sort();
			}
		},

		/**
		 * Render the books panel.
		 * @return books panel view
		 */
		render: function() {
			var booksPanelTmpl = BooksPanelViewTemplate();
			this.$el.append(booksPanelTmpl);

			this.$('.panel-heading').append(this.toolBarView.render().el);
			this.toolBarView.setActiveViewAsThumbnailsButton();
			this.toolBarView.disableAllViewAsButtons(true);
			this.toolBarView.setActiveSortByMenu('Name', true);
			this.toolBarView.disableSortByButton(true);

			return this;
		},

		/**
		 * Render and fade in the books panel collection.
		 * @param collection books collection.
		 */
		fadeInBooks: function(collection) {
			this.setBooksBadge(collection.length);
			this.$('.panel-body > .bookspanel-books').fadeOut('slow');
			this.renderBooks(collection);
			this.$('.panel-body > .bookspanel-books').hide();
			this.$('.panel-body > .bookspanel-books').fadeIn('slow');
			if (collection.length > 0) {
				this.toolBarView.disableAllViewAsButtons(false);
				this.toolBarView.disableSortByButton(false);
			}
		},

		/**
		 * Set the value for book count badge.
		 * @param count book count.
		 */
		setBooksBadge: function(count) {
			count = count || 0;
			this.$('.panel-heading > .badge-books').text(count);
			this.$('.panel-heading > .badge-books').attr('title', count + ' books');
		},

		/**
		 * Render the books panel collection.
		 * @param collection books collection.
		 */
		renderBooks: function(collection) {
			var viewAsButtonName = this.toolBarView.getActiveViewAsButtonName();

			if (viewAsButtonName === 'Details') {
				this.renderBooksDetails(collection);
			} else if (viewAsButtonName === 'List') {
				this.renderBooksList(collection);
			} else {
				this.renderBooksThumbnails(collection);
			}
		},

		/**
		 * Render the books panel collection as thumbnails.
		 * @param collection books collection.
		 */
		renderBooksThumbnails: function(collection) {
			var booksThumbsTmpl = ThumbsViewTemplate({books: collection.toJSON()});
			this.$('.panel-body').html(booksThumbsTmpl);
		},

		/**
		 * Render the books panel collection as details.
		 * @param collection books collection.
		 */
		renderBooksDetails: function(collection) {
			var booksDetailsTmpl = DetailsViewTemplate({books: collection.toJSON()});
			this.$('.panel-body').html(booksDetailsTmpl);
		},

		/**
		 * Render the books panel collection as list.
		 * @param collection books collection.
		 */
		renderBooksList: function(collection) {
			var booksListTmpl = ListViewTemplate({books: collection.toJSON()});
			this.$('.panel-body').html(booksListTmpl);
		}
	});

	return BooksPanelView;
});
