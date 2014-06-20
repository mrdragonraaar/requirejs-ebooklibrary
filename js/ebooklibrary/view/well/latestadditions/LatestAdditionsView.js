/**
 * LatestAdditionsView.js
 *
 * Backbone view representing ebooklibrary latest additions.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/latestadditions/LatestAdditionsView',
    'hbs!ebooklibrary/template/latestadditions/LatestAdditionsBooksView',
    'ebooklibrary/collection/LatestAdditionsCollection',
    'backbone'
],
function(
    LatestAdditionsViewTemplate,
    LatestAdditionsBooksViewTemplate,
    LatestAdditionsCollection,
    Backbone
) {
	var LatestAdditionsView = Backbone.View.extend({
		tagName: 'latestadditions',
		className: 'well well-wide well-latestadditions',

		events: {
			'click .previous-btn':	'onClickPrevious',
			'click .next-btn':	'onClickNext'
		},

		onClickPrevious: function(e) {
			e.preventDefault();
			console.log('onClickPrevious');
			this.page = Math.max(this.page - 1, 1);
			this.scroll();
		},

		onClickNext: function(e) {
			e.preventDefault();
			console.log('onClickNext');
			this.page = Math.min(this.page + 1, this.pages);
			this.scroll();
		},

		/**
		 * Initialise the latest additions view.
		 * @param options latest additions options (max).
		 */
		initialize: function(options) {
			options = options || {};

			this.page = 1;
			this.pagesPadding = 1;

			this.collection = new LatestAdditionsCollection([], {max: options.max});
			this.collection.fetch();

			this.listenTo(this.collection, 'sync', this.renderLatestAdditions);

			this.onResize = _.debounce(_.bind(this.onResize, this), 200);
			$(window).on("resize", this.onResize);
		},

		remove: function() {
			$(window).on("resize", this.onResize);
			Backbone.View.prototype.remove.apply(this);
		},

		scroll: function() {
			var pageOffset = (this.page - 1) * this.pageWidth;
			console.log(pageOffset);
			var firstItem = (this.page - 1) * this.itemsPerPage;
			var lastItem = firstItem + this.itemsPerPage;
			//firstItem -= this.itemsPadding;
			//lastItem += this.itemsPadding;
			//lastItem += 1;
			var numItems = this.$('.list-latestadditions').children().length;
			console.log(this.page);

			this.$('.list-latestadditions').css("transform", "translate(" + (-1 * pageOffset) + "px, 0)");
			//for (var i = 0; numItems > i; i++) {
				//var item = this.$('.list-latestadditions').children().eq(i);

				//if (i >= firstItem && lastItem > i) {
					//item.show();
				//} else {
					//item.hide();
				//}
			//}

			//console.log("translate(" + (-1 * pageOffset) + "px, 0)");
			//this.$('.latestadditions-books').css("transform", "translate(" + (-1 * pageOffset) + "px, 0)");
		},

		onResize: function() {
			console.log('onResize');

			this.containerWidth = this.$('.latestadditions-books').width();
			console.log(this.containerWidth);

			var list = this.$('.list-latestadditions').children();
			if (list.length) {
				this.itemWidth = list.outerWidth(true);
				this.itemHeight = list.outerHeight(true);
				this.itemMarginRight = parseInt(list.css("margin-right"), 10);
				this.itemMarginBottom = parseInt(list.css("margin-bottom"), 10);
				this.listWidth = this.itemWidth * list.length;
				this.itemsPerPage = Math.floor((this.containerWidth + this.itemMarginRight) / this.itemWidth);
				this.itemsPadding = this.pagesPadding * this.itemsPerPage;
				this.pageWidth = this.itemWidth * this.itemsPerPage;
				this.pages = Math.ceil(this.listWidth / this.pageWidth);
				this.page = 1;

				this.$('.list-latestadditions').width(this.listWidth);

				this.scroll();

				console.log(this.itemWidth);
				console.log(this.itemHeight);
				console.log(this.itemMarginRight);
				console.log(this.itemMarginBottom);
				console.log(this.listWidth);
				console.log(this.itemsPerPage);
				console.log(this.itemsPadding);
				console.log(this.pageWidth);
				console.log(this.pages);
			}

			//console.log(list);
			//console.log(list.outerWidth());
			//console.log(list.outerWidth(true));
			//var item = list.first();
			//var item = list.children[_.first(_.keys(list.children))];
			//console.log(list.css("margin-right"));
			//console.log(item.outerWidth());
		},

		render: function() {
			var latestAdditionsTmpl = LatestAdditionsViewTemplate();
			this.$el.append(latestAdditionsTmpl);
			return this;
		},

		/**
		 * Render the latest additions collection.
		 * @param collection latest additions collection.
		 */
		renderLatestAdditions: function(collection) {
			this.$('.list-latestadditions').empty();
			var latestAdditionsBooksTmpl = LatestAdditionsBooksViewTemplate({latestAdditions: collection.toJSON()});
			this.$('.list-latestadditions').append(latestAdditionsBooksTmpl);
			this.onResize();
		}
	});

	return LatestAdditionsView;
});
