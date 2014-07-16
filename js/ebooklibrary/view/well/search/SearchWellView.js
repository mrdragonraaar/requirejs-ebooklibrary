/**
 * SearchWellView.js
 *
 * Backbone view representing ebooklibrary search well.
 *
 * (c)2014 mrdragonraaar.com
 */
define([
    'hbs!ebooklibrary/template/well/search/SearchWell',
    'hbs!ebooklibrary/template/well/search/SearchWellInfoMessage',
    'hbs!ebooklibrary/template/well/search/SearchWellErrorMessage',
    'backbone'
],
function(
    SearchWellTemplate,
    SearchWellInfoMessageTemplate,
    SearchWellErrorMessageTemplate,
    Backbone
) {
	var SearchWellView = Backbone.View.extend({
		tagName: 'search',
		className: 'well well-wide well-search',

		/**
		 * Define search well form events.
		 */
		events: {
			'submit form': 'onSubmitSearch'
		},

		/**
		 * Event handler for search well submit event.
		 * @param e form event.
		 */
		onSubmitSearch: function(e) {
			e.preventDefault();

			var searchVal = this.$('input[name = search]').val();
			this.$('input[name = search]').val('');
			this.$('input[name = search]').blur();

			if (searchVal) {
				Backbone.history.navigate('!/search/' + searchVal, true);
			}
		},

		/**
		 * Initialise the search well view.
		 * @param options search well options (collection).
		 */
		initialize: function(options) {
			this.listenTo(this.collection, 'reset', this.showInfo);
			this.listenTo(this.collection, 'error', this.showError);
		},

		/**
		 * Render the search well view.
		 * @return search well view
		 */
		render: function(options) {
			var searchWellTmpl = SearchWellTemplate();
			this.$el.html(searchWellTmpl);

			return this;
		},

		/**
		 * Show info well.
		 * @param collection search collection.
		 */
		showInfo: function(collection) {
			if (collection.keyword) {
				var searchWellInfoTmpl = SearchWellInfoMessageTemplate(collection);
				this.$el.append(searchWellInfoTmpl);
			}
		},

		/**
		 * Show error well.
		 * @param collection search collection.
		 */
		showError: function(collection) {
			var searchWellErrorTmpl = SearchWellErrorMessageTemplate();
			this.$el.append(searchWellErrorTmpl);
		}
	});

	return SearchWellView;
});
