/*jslint browser: true*/
/*global $, jQuery, window, TimelineMax, Linear, TweenMax*/
(function () {
    'use strict';
    var checkOrientation = function () {

        var mode = Math.abs(window.orientation) === 90
            ? 'landscape'
            : 'portrait';

        if (mode === 'landscape') {
            $("#orientation").show();
        } else {
            $("#orientation").hide();
        }
    };

    window.addEventListener("resize", checkOrientation, false);
    window.addEventListener("orientationchange", checkOrientation, false);

}());