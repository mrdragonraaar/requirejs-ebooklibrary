/**
 * ebooklibrary.js
 *
 * Main application config and entry point.
 *
 * (c)2014 mrdragonraaar.com
 */
requirejs.config({
	baseUrl: '/js',
	paths:
	{
		backbone: 'lib/backbone/backbone-min',
		underscore: 'lib/underscore/underscore-min',
		jquery: 'lib/jquery/jquery-1.11.0.min',
		hbs: 'lib/hbs/hbs',
		Handlebars: 'lib/hbs/Handlebars',
		i18nprecompile: 'lib/hbs/i18nprecompile',
		json2: 'lib/hbs/json2',
		bootstrap: 'lib/bootstrap/bootstrap.min'
	},
	hbs:
	{
		disableI18n: true,
		helperPathCallback: function(name) {
			return 'lib/hbs/helpers/' + name;
		}
	},
	shim:
	{
		backbone: 
		{
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		bootstrap: ['jquery']
	}
});

/**
 * Main application entry point.
 */
require(['ebooklibrary/app'], function(App) {
	App.initialize();
});
