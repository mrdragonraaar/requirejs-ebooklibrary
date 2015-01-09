/**
 * LinkCollection.js
 *
 * Backbone collection of link models.
 *
 * (c)2014 mrdragonraaar.com
 */

define(["ebooklibrary/model/LinkModel","backbone"],function(e,t){var n=t.Collection.extend({model:e,url:function(){return"/library/json/links"}});return n});