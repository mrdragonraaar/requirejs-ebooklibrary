/**
 * AppModel.js
 *
 * Backbone model representing main application views.
 *
 * (c)2014 mrdragonraaar.com
 */

define(["backbone"],function(e){var t=e.Model.extend({setViewHome:function(){this.trigger("viewHome")},setViewBooks:function(e,t){e=e||"",t=t||"",this.trigger("viewBooks",e,t)},setViewSearch:function(e){e=e||"",this.trigger("viewSearch",e)},setViewBookText:function(e,t,n){e=e||"",t=t||"",n=n||"",this.trigger("viewBookText",e,t,n)}});return new t});