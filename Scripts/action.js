/*jslint browser: true*/
/*global $, jQuery, window, TimelineMax, Linear, TweenMax*/
(function () {
    'use strict';

    var winW = $(document).width();
    var centerX = winW / 2;
    var winH = $(window).height();

    var tIndex = new TimelineMax({paused: true, useFrames: true});
    var time = 48;




    var scaleOrNot = (winW / 360 < 1)
        ? (winW / 360).toFixed(2)
        : 1;

    $(".posCenter").each(function () {
        var space = Math.floor((winH - $(this).height() * scaleOrNot) / 2);
        var translateOrNot = (space < 55)
            ? Math.abs(space - 55)
            : 0;

        $(this).css({
            height: $(this).height(),
            bottom: 0,
            transform: 'scale(' + scaleOrNot + ') translateY(' + translateOrNot + 'px)',
            MozTransform: 'scale(' + scaleOrNot + ') translateY(' + translateOrNot + 'px)',
            WebkitTransform: 'scale(' + scaleOrNot + ') translateY(' + translateOrNot + 'px)',
            msTransform: 'scale(' + scaleOrNot + ') translateY(' + translateOrNot + 'px)'
        });
    });

    $("#nav .menu").css({height: winH - 54});
    $(".resource ul li").css({width: ($(".resource").width() / 4) - 4});




    function countDown(target) {
        var x = parseInt(target.html(), 10);
        if (x === parseInt(target.attr("data-number"), 10)) {
            target.addClass("fin");
            return false;
        }
        target.html(x + 1);
        setTimeout(function () {
            countDown(target);
        }, 1000 / parseInt(target.attr("data-number"), 10));
    }

    function formulaFadeIn(target) {
        TweenMax.staggerTo(target + " .formula > div", 1, {opacity: 1, onComplete: function () {
            $(target + " .formula").addClass("fin");
        }}, 0.3);
    }




    tIndex
        .to(".index", time, {y: "0", force3D: true}, "first")
        .to(".index", time, {y: "-100%", force3D: true}, "start", "-=" + time)
        .to(".indexMove", time, {opacity: 0}, "-=" + time)

        .to(".unit_1 .section_start", time, {css: {scale: 1}}, "-=" + time / 1.8)
        .to(".unit_1 .section_start .title", time / 2, {y: "-25%", scale: 0.9, force3D: true}, "-=" + time / 3)
        .to(".unit_1 .unitList .brackets", time / 3, {height: 108, marginTop: "-59"}, "-=" + time / 5)
        .to(".unit_1 .unitList h3", time / 3, {opacity: 1, y: 14, force3D: true})
        .staggerTo(".unit_1 .unitList ul li", time / 3, {opacity: 1, y: 14, force3D: true}, time / 12, "-=" + time / 3)


        .to(".unit_1 .unitList", time, {scale: 0.5, force3D: true}, "unit_1-section1")
        .to(".unit_1 .section_start .title", time, {y: "-10%", force3D: true}, "-=" + time)
        .to(".unit_1 .section_1", time, {y: "0%", force3D: true}, "-=" + (time - 5))
        .to(".unit_1 .section_2", time, {y: "0%", force3D: true}, "unit_1-section2")
        .to(".unit_1 .section_3", time, {y: "0%", force3D: true, onComplete: function () {
            if ($(".detail .num span.fin").length === $(".detail .num").length) {
                return false;
            }
            $(".detail .num span").each(function () {
                countDown($(this));
            });
        }}, "unit_1-section3")
        .to(".unit_1 .section_4", time, {y: "0%", force3D: true, onComplete: function () {
            if (!$(".unit_1 .section_4 .formula").hasClass("fin")) {
                formulaFadeIn(".unit_1 .section_4");
            }
        }, onReverseComplete: function () {
            if ($(".detail .num span.fin").length === $(".detail .num").length) {
                return false;
            }
            $(".detail .num span").each(function () {
                countDown($(this));
            });
        }}, "unit_1-section4")
        .to(".unit_1 .section_5", time, {y: "0%", force3D: true, onReverseComplete: function () {
            if (!$(".unit_1 .section_4 .formula").hasClass("fin")) {
                formulaFadeIn(".unit_1 .section_4");
            }
        }}, "unit_1-section5")



        .to(".unit_1", time, {y: "-100%", force3D: true}, "unit_2-start")

        .to(".unit_2 .section_start", time, {css: {scale: 1}}, "-=" + time / 1.8)
        .to(".unit_2 .section_start .title", time / 2, {y: "-25%", scale: 0.9, force3D: true}, "-=" + time / 3)
        .to(".unit_2 .unitList .brackets", time / 3, {height: 108, marginTop: "-59"}, "-=" + time / 5)
        .to(".unit_2 .unitList h3", time / 3, {opacity: 1, y: 14, force3D: true})
        .staggerTo(".unit_2 .unitList ul li", time / 3, {opacity: 1, y: 14, force3D: true}, time / 12, "-=" + time / 3)

        .to(".unit_2 .unitList", time, {scale: 0.5, force3D: true}, "unit_2-section1")
        .to(".unit_2 .section_start .title", time, {y: "-10%", force3D: true}, "-=" + time)
        .to(".unit_2 .section_2", time, {y: "0%", force3D: true, onComplete: function () {
            if ($(".unit_2 .section_2 .puzzle.fin").length === $(".unit_2 .section_2 .puzzle").length) {
                return false;
            }
            TweenMax.staggerTo(".unit_2 .section_2 .puzzle", 1, {opacity: 1, onComplete: function () {
                $(".unit_2 .section_2 .puzzle").addClass("fin");
            }}, 0.3);
        }}, "-=" + time, "unit_2-section2")
        .to(".unit_2 .section_3", time, {y: "0%", force3D: true, onComplete: function () {
            if (!$(".weather").hasClass("fin")) {
                TweenMax.staggerTo(".weather li.element", 0.8, {opacity: 1}, 0.4);
                TweenMax.fromTo(".arrow_1", 0.8, {opacity: "0", rotation: "-20"}, {opacity: "1", rotation: "0"}).delay(0.2);
                TweenMax.fromTo(".arrow_2", 0.8, {opacity: "0", rotation: "114"}, {opacity: "1", rotation: "134"}).delay(0.6);
                TweenMax.fromTo(".arrow_3", 0.8, {opacity: "0", rotation: "204"}, {opacity: "1", rotation: "224", onComplete: function () {
                    $(".weather").addClass("fin");
                }}).delay(1);
            }
        }, onReverseComplete: function () {
            if ($(".unit_2 .section_2 .puzzle.fin").length === $(".unit_2 .section_2 .puzzle").length) {
                return false;
            }
            TweenMax.staggerTo(".unit_2 .section_2 .puzzle", 1, {opacity: 1, onComplete: function () {
                $(".unit_2 .section_2 .puzzle").addClass("fin");
            }}, 0.5);
        }}, "unit_2-section3", "-=" + time)
        .to(".unit_2 .section_4", time, {y: "0%", force3D: true, onReverseComplete: function () {
            if (!$(".weather").hasClass("fin")) {
                TweenMax.staggerTo(".weather li.element", 0.8, {opacity: 1}, 0.4);
                TweenMax.fromTo(".arrow_1", 0.8, {opacity: "0", rotation: "-20"}, {opacity: "1", rotation: "0"}).delay(0.2);
                TweenMax.fromTo(".arrow_2", 0.8, {opacity: "0", rotation: "114"}, {opacity: "1", rotation: "134"}).delay(0.6);
                TweenMax.fromTo(".arrow_3", 0.8, {opacity: "0", rotation: "204"}, {opacity: "1", rotation: "224", onComplete: function () {
                    $(".weather").addClass("fin");
                }}).delay(1);
            }
        }}, "unit_2-section4")



        .to(".unit_2", time, {y: "-100%", force3D: true}, "unit_3-start")

        .to(".unit_3 .section_start", time, {css: {scale: 1}}, "-=" + time / 1.8)
        .to(".unit_3 .section_start .title", time / 2, {y: "-25%", scale: 0.9, force3D: true}, "-=" + time / 3)
        .to(".unit_3 .unitList .brackets", time / 3, {height: 108, marginTop: "-59"}, "-=" + time / 5)
        .to(".unit_3 .unitList h3", time / 3, {opacity: 1, y: 14, force3D: true})
        .staggerTo(".unit_3 .unitList ul li", time / 3, {opacity: 1, y: 14, force3D: true}, time / 12, "-=" + time / 3)

        .to(".unit_3 .unitList", time, {scale: 0.5, force3D: true}, "unit_3-section1")
        .to(".unit_3 .section_start .title", time, {y: "-10%", force3D: true}, "-=" + time)
        .to(".unit_3 .section_1", time, {y: "0%", force3D: true}, "-=" + time)
        .to(".unit_3 .section_2", time, {y: "0%", force3D: true, onComplete: function () {
            if ($(".resource .num span.fin").length === $(".resource .num").length) {
                return false;
            }
            $(".resource .num span").each(function () {
                countDown($(this));
            });
        }}, "unit_3-section2")
        .to(".unit_3 .section_3", time, {y: "0%", force3D: true, onComplete: function () {
            if (!$(".unit_3 .section_3 .formula").hasClass("fin")) {
                formulaFadeIn(".unit_3 .section_3");
            }
        }, onReverseComplete: function () {
            if ($(".resource .num span.fin").length === $(".resource .num").length) {
                return false;
            }
            $(".resource .num span").each(function () {
                countDown($(this));
            });
        }}, "unit_3-section3")



        .to(".unit_3", time, {y: "-100%", force3D: true, onReverseComplete: function () {
            if (!$(".unit_3 .section_3 .formula").hasClass("fin")) {
                formulaFadeIn(".unit_3 .section_3");
            }
        }}, "unit_4-start")

        .to(".unit_4 .section_start", time, {css: {scale: 1}}, "-=" + time / 1.8)
        .to(".unit_4 .section_start .title", time / 2, {y: "-25%", scale: 0.9, force3D: true}, "-=" + time / 3)
        .to(".unit_4 .unitList .brackets", time / 3, {height: 108, marginTop: "-59"}, "-=" + time / 5)
        .to(".unit_4 .unitList h3", time / 3, {opacity: 1, y: 14, force3D: true})
        .staggerTo(".unit_4 .unitList ul li", time / 3, {opacity: 1, y: 14, force3D: true}, time / 12, "-=" + time / 3)

        .to(".unit_4 .unitList", time, {scale: 0.5, force3D: true}, "unit_4-section1")
        .to(".unit_4 .section_start .title", time, {y: "-10%", force3D: true}, "-=" + time)
        .to(".unit_4 .section_1", time, {y: "0%", force3D: true}, "-=" + time)
        .to(".unit_4 .section_2", time, {y: "0%", force3D: true}, "unit_4-section2")
        .to(".unit_4 .section_3", time, {y: "0%", force3D: true, onComplete: function () {
            if ($(".unit_4 .section_3 ul li.fin").length === $(".unit_4 .section_3 ul li").length) {
                return false;
            }
            TweenMax.to(".unit_4 .section_3 ul li svg", 1, {css: {rotation: 360}}, 0.5);
            TweenMax.to(".unit_4 .section_3 ul li p", 1, {opacity: 1, onComplete: function () {
                $(".unit_4 .section_3 ul li").addClass("fin");
            }}, 0.5);
        }}, "unit_4-section3")
        .to("#footer", 25, {top: "0%"}, "end");

    $("#logo").on("click", function () {
        tIndex.timeScale(1).tweenFromTo("first", "start");
    });


    var frame = tIndex.totalDuration();
    var nowLabel;
    var ySMUp = null;
    var ySMDown = null;
    var swipe = false;

    function sectionMoveTouchStart(evt) {
        ySMDown = evt.touches[0].clientY;
        nowLabel = tIndex.time();
    }

    function sectionMoveTouchMove(evt) {
        if (swipe) {
            return false;
        }
        evt.preventDefault();
        var yMove = evt.touches[0].clientY;

        ySMUp = null;

        ySMUp = yMove;

        var ySMDiff = ySMDown - yMove;
        if (ySMDiff > 0) {
            if (tIndex.getLabelTime(tIndex.getLabelAfter()) < 0) {
                tIndex.timeScale(1).time(nowLabel + ySMDiff * (frame - nowLabel) / winH);
            } else {
                tIndex.timeScale(1).time(nowLabel + ySMDiff * (tIndex.getLabelTime(tIndex.getLabelAfter()) - nowLabel) / winH);
            }
        } else {
            if (tIndex.getLabelTime(tIndex.getLabelBefore()) < 0) {
                return false;
            }
            tIndex.timeScale(1).time(nowLabel + ySMDiff * (nowLabel - tIndex.getLabelTime(tIndex.getLabelBefore())) / winH);
        }
    }

    function sectionMoveTouchEnd() {
        if (!ySMUp) {
            return false;
        }

        if (ySMUp > ySMDown) {
            if (tIndex.getLabelTime(tIndex.getLabelBefore()) < 0) {
                return false;
            }
            tIndex.timeScale(1).tweenTo(tIndex.getLabelBefore());
        } else {
            if (tIndex.getLabelTime(tIndex.getLabelAfter()) < 0) {
                tIndex.tweenTo(frame);
            }
            tIndex.timeScale(1).tweenTo(tIndex.getLabelAfter());
        }

        ySMUp = null;
        nowLabel = null;
    }

    document.getElementById("page").addEventListener('touchstart', sectionMoveTouchStart, false);
    document.getElementById("page").addEventListener('touchmove', sectionMoveTouchMove, false);
    document.getElementById("page").addEventListener('touchend', sectionMoveTouchEnd, false);


    $("#nav .menu .link").on("click", function () {
        var n = $(this).index() + 1;
        $("#burger-menu").removeClass("open");
        TweenMax.to("#nav .menu", 0.6, {y: -winH - 1, force3D: true});
        TweenMax.to("#nav", 0.6, {height: 54});
        if (n === 1) {
            tIndex.timeScale(1.4).tweenFromTo("start", "unit_1-section1");
        } else {
            tIndex.timeScale(1.4).tweenFromTo("unit_" + n + "-start", "unit_" + n + "-section1");
        }
    });
    $("#burger-menu").on("click", function () {
        if ($(this).hasClass("open")) {
            TweenMax.to("#nav .menu", 0.6, {y: -winH - 1, force3D: true});
            TweenMax.to("#nav", 0.6, {height: 54}, "-=1");
            $(this).removeClass("open");
        } else {
            TweenMax.to("#nav .menu", 0.6, {y: 0, force3D: true});
            TweenMax.to("#nav", 0.2, {height: "100%"}, "-=1");
            $(this).addClass("open");
        }
    });





    var xDown = null;
    var yDown = null;

    var isAnimating = false;
    var sliderNowpos;

    var liMargin = [parseInt($("#slider_1 li").css("margin-left"), 10), parseInt($("#slider_2 li").css("margin-left"), 10)];
    var liW = [$("#slider_1 li").width(), $("#slider_2 li").width()];
    var sliderMargin = [centerX - liW[0] / 2 - liMargin[0], centerX - liW[1] / 2 - liMargin[1]];
    var index = [$("#slider_1 li").length - 1, 2];

    $("#slider_1").css("margin-left", sliderMargin[0]);

    function handleTouchStart(evt, target) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
        sliderNowpos = parseInt(target.css("margin-left"), 10);
    }

    function handleTouchMove(evt, j, target) {
        evt.preventDefault();
        if (!xDown || !yDown) {
            return;
        }

        if (isAnimating) {
            return false;
        }

        swipe = true;
        isAnimating = true;

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                if (sliderNowpos > 0) {
                    target.animate({marginLeft: (liW[j] + liMargin[j] * 2) * -1 + sliderMargin[j]}, function () {
                        swipe = false;
                        isAnimating = false;
                    });
                } else if (Math.abs(sliderNowpos) === (liW[j] + liMargin[j] * 2) * index[j] - sliderMargin[j]) {
                    swipe = false;
                    isAnimating = false;
                    return false;
                }
                target.animate({marginLeft: sliderNowpos + (liW[j] + liMargin[j] * 2) * -1}, function () {
                    swipe = false;
                    isAnimating = false;
                });
            } else {
                if (sliderNowpos > 0) {
                    swipe = false;
                    isAnimating = false;
                    return false;
                }
                target.animate({marginLeft: sliderNowpos + (liW[j] + liMargin[j] * 2)}, function () {
                    swipe = false;
                    isAnimating = false;
                });
            }
        } else {
            if (yDiff > 0) {
                swipe = false;
                isAnimating = false;
            } else {
                swipe = false;
                isAnimating = false;
            }
        }
        xDown = null;
        yDown = null;
    }

    function handleTouchEnd() {
        swipe = false;
        isAnimating = false;
    }

    document.getElementById("slider_1").addEventListener('touchstart', function () {
        handleTouchStart(event, $(this));
    }, false);


    document.getElementById("slider_1").addEventListener('touchmove', function () {
        handleTouchMove(event, 0, $(this));
    }, false);


    document.getElementById("slider_1").addEventListener('touchend', handleTouchEnd, false);



    var xSLDown, ySLDown;

    function listTouchStart(evt) {
        xSLDown = evt.touches[0].clientX;
        ySLDown = evt.touches[0].clientY;
    }

    function listTouchMove(evt) {
        if (!xSLDown || !ySLDown) {
            return;
        }
        var xSLUp = evt.touches[0].clientX;
        var ySLUp = evt.touches[0].clientY;

        var xSLDiff = xSLDown - xSLUp;
        var ySLDiff = ySLDown - ySLUp;


        if (Math.abs(xSLDiff) > Math.abs(ySLDiff)) {
            if (xSLDiff > 0) {
                swipe = true;
                isAnimating = true;
            } else {
                swipe = true;
                isAnimating = true;
            }
        } else {
            if (ySLDiff > 0) {
                swipe = false;
                isAnimating = false;
            } else {
                swipe = false;
                isAnimating = false;
            }
        }

        xSLDown = null;
        ySLDown = null;
    }
    function listTouchEnd() {
        swipe = false;
        isAnimating = false;
    }

    document.getElementById("slider_2").addEventListener('touchstart', listTouchStart, false);
    document.getElementById("slider_2").addEventListener('touchmove', listTouchMove, false);
    document.getElementById("slider_2").addEventListener('touchend', listTouchEnd, false);





    var xFDown, yFDown;

    function footerMoveTouchStart(evt) {
        xFDown = evt.touches[0].clientX;
        yFDown = evt.touches[0].clientY;
    }

    function footerMoveTouchMove(evt) {
        if (!xFDown || !yFDown) {
            return;
        }

        var xFUp = evt.touches[0].clientX;
        var yFUp = evt.touches[0].clientY;

        var xFDiff = xFDown - xFUp;
        var yFDiff = yFDown - yFUp;

        if (Math.abs(xFDiff) < Math.abs(yFDiff)) {
            if (yFDiff > 0) {
                return false;
            } else {
                if ($(this).find("div").scrollTop() === 0) {
                    tIndex.timeScale(1).tweenTo("end");
                }
            }
        }

        xDown = null;
        yDown = null;
    }

    document.getElementById("footer").addEventListener('touchstart', footerMoveTouchStart, false);
    document.getElementById("footer").addEventListener('touchmove', footerMoveTouchMove, false);

    //FOR TEST

    tIndex.timeScale(10).tweenTo("start");
    // var i = 0;
    // $("body").mousewheel(function (event) {
    //     console.log(i);
    //     if (event.deltaY === -1) {
    //         if (i < frame) {
    //             i += 1;
    //         } else {
    //             i = frame;
    //         }
    //     } else {
    //         if (i > 0) {
    //             i -= 1;
    //         } else {
    //             i = 0;
    //         }
    //     }
    //     tIndex.time(550 + i);
    // });
}());