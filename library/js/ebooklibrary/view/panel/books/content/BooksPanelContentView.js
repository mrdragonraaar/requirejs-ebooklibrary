/**
 * BooksPanelContentView.js
 *
 * Backbone view representing ebooklibrary books panel content.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/panel/books/content/BooksPanelContentThumbnails',
    'hbs!ebooklibrary/template/panel/books/content/BooksPanelContentDetails',
    'hbs!ebooklibrary/template/panel/books/content/BooksPanelContentList',
    'backbone'
],
function(
    BooksPanelContentThumbnailsTemplate,
    BooksPanelContentDetailsTemplate,
    BooksPanelContentListTemplate,
    Backbone
) {
	var BooksPanelContentView = Backbone.View.extend({
		className: 'panel-body',
		contentType: null,

		events: {
			'click .text-more': 'onClickTextMore',
		},

		onClickTextMore: function(e) {
			e.preventDefault();

			var textMoreItem = this.$(e.currentTarget);
			var p = textMoreItem.parent();
			var text = p.children(".text-book");

			console.log(text);

			if (text.hasClass("open")) {
				text.removeClass("open");
				textMoreItem.removeClass("less");
				text.animate({"height": "100px"});
			} else {
				textMoreItem.addClass("less");
/*
				var height = 0;
				var fish = text.children();
				console.log(fish);
				fish.each(function() {
					height += $(this).outerHeight();
					console.log(height);
				});
*/

				var autoHeight = text.css('height', 'auto').height();
				text.height("100px").animate({"height": autoHeight}, 500, function() { text.height('auto'); });
				//text.animate({"height": height}).css("height", "auto");
				//text.animate({"height": "auto"});
				//text.css("height", "auto");
				text.addClass("open");
			}
		},

		/**
		 * Initialise the books panels content view.
		 * @param options books panels content options (collection).
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.fadeBooksContent);
			this.listenTo(this.collection, 'sort', this.renderBooksContent);
		},

		/**
		 * Show the books panels content.
		 * @param viewAs key to show content as.
		 */
		showBooksContent: function(viewAs) {
			this.contentType = viewAs;

			if (this.collection) {
				this.fadeBooksContent(this.collection);
			}
		},

		/**
		 * Sort the books panels content.
		 * @param sortBy key to sort content by.
		 * @param isAscending true if content is to be sorted ascending.
		 */
		sortBooksContent: function(sortBy, isAscending) {
			if (this.collection) {
				this.collection.setSortBy(sortBy, isAscending);
				this.collection.sort();
			}
		},

		/**
		 * Fade in/out the books panels content collection.
		 * @param collection books collection.
		 */
		fadeBooksContent: function(collection) {
			this.$('.panel-content').fadeOut('slow');
			this.renderBooksContent(collection);
			this.$('.panel-content').hide();
			this.$('.panel-content').fadeIn('slow');
		},

		/**
		 * Render the books panels content collection.
		 * @param collection books collection.
		 */
		renderBooksContent: function(collection) {
			if (this.contentType === 'details') {
				this.renderBooksDetails(collection);
			} else if (this.contentType === 'list') {
				this.renderBooksList(collection);
			} else {
				this.renderBooksThumbnails(collection);
			}
		},

		/**
		 * Render the books panels content collection as thumbnails.
		 * @param collection books collection.
		 */
		renderBooksThumbnails: function(collection) {
			var booksContentThumbnailsTmpl = 
			    BooksPanelContentThumbnailsTemplate({books: collection.toJSON()});
			this.$el.html(booksContentThumbnailsTmpl);
		},

		/**
		 * Render the books panels content collection as details.
		 * @param collection books collection.
		 */
		renderBooksDetails: function(collection) {
			var booksContentDetailsTmpl = 
			    BooksPanelContentDetailsTemplate({books: collection.toJSON()});
			this.$el.html(booksContentDetailsTmpl);
		},

		/**
		 * Render the books panels content collection as list.
		 * @param collection books collection.
		 */
		renderBooksList: function(collection) {
			var booksContentListTmpl = 
			    BooksPanelContentListTemplate({books: collection.toJSON()});
			this.$el.html(booksContentListTmpl);
		}
	});

	return BooksPanelContentView;
});
