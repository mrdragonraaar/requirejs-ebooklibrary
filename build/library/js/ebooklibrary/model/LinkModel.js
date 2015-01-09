/**
 * LinkModel.js
 *
 * Backbone model representing a link.
 *
 * (c)2014 mrdragonraaar.com
 */

define(["backbone"],function(e){var t=e.Model.extend({idAttribute:"title",defaults:function(){return{title:"",icon:"",url:[]}}});return t});