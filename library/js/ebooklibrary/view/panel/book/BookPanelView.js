/**
 * BookPanelView.js
 *
 * Backbone view representing ebooklibrary book panel.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/panel/book/BookPanel',
    'ebooklibrary/view/panel/book/toolbar/BookPanelNavToolBarView',
    'ebooklibrary/model/BookModel',
    'backbone'
],
function(
    BookPanelTemplate,
    BookPanelNavToolBarView,
    BookModel,
    Backbone
) {
	var BookPanelView = Backbone.View.extend({
		tagName: 'book',
		className: 'panel panel-book',

		toolBar: null,		// toolbar view

		/**
		 * Define book content link click event.
		 */
		events: {
			'click > .panel-body > .text-book a': 'onClickContentLink'
		},

		onClickContentLink: function(e) {
			if (e.currentTarget.baseURI.indexOf(e.currentTarget.hostname) < 0) {
				e.currentTarget.target = '_blank';
				return;
			}

			e.preventDefault();
			var anchor = e.currentTarget.hash.substring(1);

			_.each(this.chapters, function(value, index) {
				if (value.indexOf('id="'+anchor+'"') > -1) {
					console.log(index);
					this.chapter = index;
					this.$('> .panel-body > .text-book').html(this.chapters[this.chapter]);
				}
			}, this);
		},

		/**
		 * Initialise the book panel view.
		 * @param options book panel options (author, series, book).
		 */
		initialize: function(options) {
			this.listenTo(this.model, 'sync', this.renderBook);

			this.toolBar = new BookPanelNavToolBarView();
			this.listenTo(this.toolBar, 'toolBarChapterNav', this.navigateChapters);
		},

		navigateChapters: function(direction) {
			if (direction === 'first' && this.chapter > 0) {
				this.chapter = 0;
				this.$('> .panel-body > .text-book').html(this.chapters[this.chapter]);
			}

			if (direction === 'previous' && this.chapter > 0) {
				this.chapter--;
				this.$('> .panel-body > .text-book').html(this.chapters[this.chapter]);
			}

			if (direction === 'next' && this.chapter < this.chapters.length - 1) {
				this.chapter++;
				this.$('> .panel-body > .text-book').html(this.chapters[this.chapter]);
			}

			if (direction === 'last' && this.chapter < this.chapters.length - 1) {
				this.chapter = this.chapters.length - 1;
				this.$('> .panel-body > .text-book').html(this.chapters[this.chapter]);
			}
		},

		/**
		 * Render the book panel view.
		 * @return book panel view
		 */
		render: function() {
			var bookPanelTmpl = BookPanelTemplate();
			this.$el.html(bookPanelTmpl);

			this.$('.panel-heading').append(this.toolBar.render().el);

			//this.$el.append(this.content.render().el);

			return this;
		},

		/**
		 * Render the book panel model.
		 * @param model book model.
		 */
		renderBook: function(model) {
			//this.$('.panel-title').append(model.toJSON().bookInfo.title);

			this.chapters = model.toJSON().text;
			this.chapter = 0;

			this.$('> .panel-body > .text-book').html(this.chapters[this.chapter]);
		},

		/**
		 * Remove the book panel view.
		 */
		remove: function() {
			this.toolBar.remove();

			Backbone.View.prototype.remove.apply(this);
		}
	});

	return BookPanelView;
});
