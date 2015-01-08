/*global jQuery, define, console*/
/*jshint browser: true*/

/**
 * @fileoverview jQuery Simple Touch Plugin
 * @author marco.l
 * @since 2013-03-25
 * @version 0.1.3
 */
(function (fTouch) {

	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], fTouch);
	} else {
		fTouch(jQuery);
	}

}(function ($) {

	'use strict';

	var orientation,
		oTouch = {},
		timer = null,
		SWIPE_DISTANCE = 50,
		EVENT_DELAY = 25,
		DOUBLE_TAP_TIMER = 250;

	// check jQuery support
	if (!$) {
		console.error('Unable to find jQuery');
		return;
	}

	$(document).ready(function () {

		$('body').bind('touchstart', function (oEvt) {

			var now = new Date(),
				diff = now - (oTouch.last || now),
				touchItem = oEvt.originalEvent.touches[0];

			// oEvt.preventDefault();

			if (timer) {
				clearTimeout(timer);
			}

			oTouch.$target = $(touchItem.target);
			oTouch.initX = touchItem.pageX;
			oTouch.last = now;

			if (diff > 0 && diff <= DOUBLE_TAP_TIMER) {
				oTouch.isDoubleTap = true;
			}

		}).bind('touchmove', function (oEvt) {

			oTouch.endX = oEvt.originalEvent.touches[0].pageX;

		}).bind('touchend', function (oEvt) {

			oEvt.preventDefault();

			if (oTouch.isDoubleTap) {

				oTouch.$target.trigger('doubletap');
				oTouch = {};

			} else if (oTouch.endX > 0) {

				if (oTouch.initX - oTouch.endX > SWIPE_DISTANCE) {
					orientation = 'left';
				} else if (oTouch.endX - oTouch.initX > SWIPE_DISTANCE) {
					orientation = 'right';
				}

				setTimeout(function () {
					oTouch.$target.trigger('swipe', { type: orientation});
					oTouch.$target.trigger('swipe' + orientation);
					oTouch.initX = oTouch.endX = oTouch.last = 0;
				}, EVENT_DELAY);
/*
			} else if (oTouch.hasOwnProperty('last')) {

				timer = setTimeout(function () {
					timer = null;
					oTouch.$target.trigger('tap');
					oTouch = {};
				}, DOUBLE_TAP_TIMER);
*/
			}

		}).bind('touchcancel', function () {
			oTouch = {};
		});
	});

	['swipe', 'swipeleft', 'swiperight', 'doubletap', 'tap'].forEach(function (sEvt) {

		$.fn[sEvt] = function (fCallback) {
			return this.bind(sEvt, fCallback);
		};

	});

}));
