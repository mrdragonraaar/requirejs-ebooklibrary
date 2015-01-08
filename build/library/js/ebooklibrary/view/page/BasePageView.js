/**
 * BasePageView.js
 *
 * Backbone view representing ebooklibrary application base page.
 *
 * (c)2014 mrdragonraaar.com
 */

define(["ebooklibrary/view/well/loading/LoadingWellView","backbone"],function(e,t){var n=t.View.extend({loading:null,constructor:function(n){this.loading=new e,this.listenTo(this,"pageRender",this.onPageRender),this.listenTo(this,"pageRemove",this.onPageRemove),t.View.apply(this,arguments)},render:function(){return this.$el.append(this.loading.render().el),this.trigger("pageRender"),this},onPageRender:function(){console.log("render")},showLoading:function(){this.loading.$el.fadeIn("slow")},hideLoading:function(){this.loading.$el.fadeOut("slow")},remove:function(){this.loading.remove(),this.trigger("pageRemove"),t.View.prototype.remove.apply(this)}});return n});