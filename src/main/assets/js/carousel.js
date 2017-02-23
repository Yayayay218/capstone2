/*! (c) Mat Marquis (@wilto). MIT License. http://wil.to/3a */

!function (e, t) {
    var a = 0;
    e.fn.getPercentage = function () {
        var e = this.attr("style").match(/margin\-left:(.*[0-9])/i) && parseInt(RegExp.$1);
        return e
    }, e.fn.adjRounding = function (t) {
        var a = e(this), i = a.find(t), n = a.parent().width() - e(i[0]).width();
        if (0 !== n) {
            e(i).css("position", "relative");
            for (var r = 0; r < i.length; r++)e(i[r]).css("left", n * r + "px")
        }
        return this
    }, e.fn.carousel = function (i) {
        if (!this.data("carousel-initialized")) {
            this.data("carousel-initialized", !0);
            var n = {
                slider: ".carousel",
                slide: ".testimonial",
                prevSlide: null,
                nextSlide: null,
                slideHed: null,
                addPagination: !1,
                addNav: i != t && (i.prevSlide || i.nextSlide) ? !1 : !0,
                namespace: "carousel",
                speed: 300
            }, r = e.extend(n, i), s = this, d = document.body || document.documentElement, o = function () {
                d.setAttribute("style", "transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;");
                var e = !!(d.style.transition || d.style.webkitTransition || d.style.msTransition || d.style.OTransition || d.style.MozTransition);
                return e
            }, l = {
                init: function () {
                    a++, s.each(function (t) {
                        var i = e(this), n = i.find(r.slider), s = i.find(r.slide), d = s.length, o = "margin-left " + r.speed / 1e3 + "s ease", c = "carousel-" + a + "-" + t;
                        s.length <= 1 || (i.css({
                            overflow: "hidden",
                            width: "100%"
                        }).attr("role", "application"), n.attr("id", n[0].id || "carousel-" + a + "-" + t).css({
                            marginLeft: "0px",
                            "float": "left",
                            width: 100 * d + "%",
                            "-webkit-transition": o,
                            "-moz-transition": o,
                            "-ms-transition": o,
                            "-o-transition": o,
                            transition: o
                        }).bind("carouselmove", l.move).bind("nextprev", l.nextPrev).bind("navstate", l.navState), s.css({
                            "float": "left",
                            width: 100 / d + "%"
                        }).each(function (t) {
                            var a = e(this);
                            a.attr({
                                role: "tabpanel document",
                                id: c + "-slide" + t
                            }), r.addPagination && a.attr("aria-labelledby", c + "-tab" + t)
                        }), r.addPagination && l.addPagination(), r.addNav && l.addNav(), n.trigger("navstate", {current: 0}))
                    })
                }, addNav: function () {
                    s.each(function () {
                        var t = e(this), a = t.find(r.slider), i = a[0].id, n = ["", '	<a href="#' + i + '" class="' + r.namespace + '-next"></a>', '	<a href="#' + i + '" class="' + r.namespace + '-prev"></a>', ""].join(""), s = {
                            nextSlide: "." + r.namespace + "-next",
                            prevSlide: "." + r.namespace + "-prev"
                        };
                        r = e.extend(r, s), t.prepend(n)
                    })
                }, addPagination: function () {
                    s.each(function (t) {
                        var i = e(this), n = e('<ol class="' + r.namespace + '-tabs" role="tablist navigation" />'), s = (i.find(r.slider), i.find(r.slide));
                        for (slideNum = s.length, associated = "carousel-" + a + "-" + t; slideNum--;) {
                            var d = e(s[slideNum]).find(r.slideHed).text() || "Page " + (slideNum + 1), o = ['<li role="presentation">', '<a href="#' + associated + "-slide" + slideNum + '"', ' aria-controls="' + associated + "-slide" + slideNum + '"', ' id="' + associated + "-tab" + slideNum + '" role="tab">' + d + "</a>", "</li>"].join("");
                            n.prepend(o)
                        }
                        n.appendTo(i).find("li").keydown(function (t) {
                            var a = e(this), i = a.prev().find("a"), n = a.next().find("a");
                            switch (t.which) {
                                case 37:
                                case 38:
                                    i.length && i.trigger("click").focus(), t.preventDefault();
                                    break;
                                case 39:
                                case 40:
                                    n.length && n.trigger("click").focus(), t.preventDefault()
                            }
                        }).find("a").click(function (t) {
                            var a = e(this);
                            if ("false" == a.attr("aria-selected")) {
                                var n = a.parent().index(), s = -(100 * n), d = i.find(r.slider);
                                d.trigger("carouselmove", {moveTo: s})
                            }
                            t.preventDefault()
                        })
                    })
                }, roundDown: function (e) {
                    var t = parseInt(e, 10);
                    return 100 * Math.ceil((t - t % 100) / 100)
                }, navState: function (t, a) {
                    var i = e(this), n = i.find(r.slide), s = -(a.current / 100), d = e(n[s]);
                    if (i.attr("aria-activedescendant", d[0].id), d.addClass(r.namespace + "-active-slide").attr("aria-hidden", !1).siblings().removeClass(r.namespace + "-active-slide").attr("aria-hidden", !0), r.prevSlide || r.nextSlide) {
                        var o = e('[href*="#' + this.id + '"]');
                        o.removeClass(r.namespace + "-disabled"), 0 == s ? o.filter(r.prevSlide).addClass(r.namespace + "-disabled") : s == n.length - 1 && o.filter(r.nextSlide).addClass(r.namespace + "-disabled")
                    }
                    if (r.addPagination) {
                        var l = d.attr("aria-labelledby"), c = e("#" + l);
                        c.parent().addClass(r.namespace + "-active-tab").siblings().removeClass(r.namespace + "-active-tab").find("a").attr({
                            "aria-selected": !1,
                            tabindex: -1
                        }), c.attr({"aria-selected": !0, tabindex: 0})
                    }
                }, move: function (t, a) {
                    var i = e(this);
                    i.trigger(r.namespace + "-beforemove").trigger("navstate", {current: a.moveTo}), o() ? i.adjRounding(r.slide).css("marginLeft", a.moveTo + "%").one("transitionend webkitTransitionEnd OTransitionEnd", function () {
                            e(this).trigger(r.namespace + "-aftermove")
                        }) : i.adjRounding(r.slide).animate({marginLeft: a.moveTo + "%"}, {
                            duration: r.speed,
                            queue: !1
                        }, function () {
                            e(this).trigger(r.namespace + "-aftermove")
                        })
                }, nextPrev: function (t, a) {
                    var i = e(this), n = i ? i.getPercentage() : 0, s = i.find(r.slide), d = "prev" === a.dir ? 0 != n : -n < 100 * (s.length - 1), o = e('[href="#' + this.id + '"]');
                    if (!i.is(":animated") && d)switch (n = "prev" === a.dir ? n % 100 != 0 ? l.roundDown(n) : n + 100 : n % 100 != 0 ? l.roundDown(n) - 100 : n - 100, i.trigger("carouselmove", {moveTo: n}), o.removeClass(r.namespace + "-disabled").removeAttr("aria-disabled"), n) {
                        case 100 * -(s.length - 1):
                            o.filter(r.nextSlide).addClass(r.namespace + "-disabled").attr("aria-disabled", !0);
                            break;
                        case 0:
                            o.filter(r.prevSlide).addClass(r.namespace + "-disabled").attr("aria-disabled", !0)
                    } else {
                        var c = l.roundDown(n);
                        i.trigger("carouselmove", {moveTo: c})
                    }
                }
            };
            l.init(this), e(r.nextSlide + "," + r.prevSlide).bind("click", function (t) {
                var a = e(this), i = this.hash, n = a.is(r.prevSlide) ? "prev" : "next", s = e(i);
                return a.is("." + r.namespace + "-disabled") ? !1 : (s.trigger("nextprev", {dir: n}), void t.preventDefault())
            }).bind("keydown", function (t) {
                var a = (e(this), this.hash);
                switch (t.which) {
                    case 37:
                    case 38:
                        e("#" + a).trigger("nextprev", {dir: "next"}), t.preventDefault();
                        break;
                    case 39:
                    case 40:
                        e("#" + a).trigger("nextprev", {dir: "prev"}), t.preventDefault()
                }
            });
            var c = {wrap: this, slider: r.slider};
            return s.bind("dragSnap", c, function (t, a) {
                var i = e(this).find(r.slider), n = "left" === a.direction ? "next" : "prev";
                i.trigger("nextprev", {dir: n})
            }), s.filter("[data-autorotate]").each(function () {
                var t, a = e(this), i = a.attr("data-autorotate"), n = a.find(r.slide).length, s = function () {
                    var d = a.find(r.slider), o = -(e(r.slider).getPercentage() / 100) + 1;
                    switch (o) {
                        case n:
                            clearInterval(t), t = setInterval(function () {
                                s(), d.trigger("nextprev", {dir: "prev"})
                            }, i);
                            break;
                        case 1:
                            clearInterval(t), t = setInterval(function () {
                                s(), d.trigger("nextprev", {dir: "next"})
                            }, i)
                    }
                };
                t = setInterval(s, i), a.attr("aria-live", "polite").bind("mouseenter click touchstart", function () {
                    clearInterval(t)
                })
            }), this
        }
    }
}(jQuery), $.event.special.dragSnap = {
    setup: function (e) {
        var t = $(this), a = function (e, t) {
            var a = .3, i = t ? "margin-left " + a + "s ease" : "none";
            e.css({
                "-webkit-transition": i,
                "-moz-transition": i,
                "-ms-transition": i,
                "-o-transition": i,
                transition: i
            })
        }, i = function (e) {
            var e = parseInt(e, 10);
            return 100 * Math.ceil((e - e % 100) / 100)
        }, n = function (e, t) {
            var n = t.target, r = void 0 != n.attr("style") ? n.getPercentage() : 0, s = t.left === !1 ? i(r) - 100 : i(r), d = document.body, o = function () {
                d.setAttribute("style", "transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;");
                var e = !!(d.style.transition || d.style.webkitTransition || d.style.MozTransition);
                return e
            };
            a(n, !0), o() ? n.css("marginLeft", s + "%") : n.animate({marginLeft: s + "%"}, opt.speed)
        };
        t.bind("snapback", n).bind("touchstart", function (i) {
            function n(e) {
                var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                r = {
                    time: (new Date).getTime(),
                    coords: [t.pageX, t.pageY]
                }, deltaX = Math.abs(d.coords[0] - t.pageX), deltaY = Math.abs(d.coords[1] - t.pageY), !d || deltaX < deltaY || deltaX < 15 || deltaX >= 15 && (d.interacting = !0, o.css({"margin-left": l + (r.coords[0] - d.coords[0]) / d.origin.width() * 100 + "%"}), e.preventDefault())
            }

            var r, s = i.originalEvent.touches ? i.originalEvent.touches[0] : i, d = {
                time: (new Date).getTime(),
                coords: [s.pageX, s.pageY],
                origin: $(i.target).closest(e.wrap),
                interacting: !1
            }, o = $(i.target).closest(e.slider), l = void 0 != o.attr("style") ? o.getPercentage() : 0;
            a(o, !1), t.bind("gesturestart", function () {
                t.unbind("touchmove", n).unbind("touchend", n)
            }).bind("touchmove", n).one("touchend", function (e) {
                if (t.unbind("touchmove", n), a(o, !0), d && r) {
                    var i, s = Math.abs(d.coords[0] - r.coords[0]), l = Math.abs(d.coords[1] - r.coords[1]), c = d.coords[0] > r.coords[0];
                    if (!(s > 20 && s > l))return void(d.interacting && t.trigger("snapback", {target: o, left: c}));
                    e.preventDefault(), i = d.origin.width() / 4, -s > i || s > i ? d.origin.trigger("dragSnap", {direction: c ? "left" : "right"}) : t.trigger("snapback", {
                            target: o,
                            left: c
                        })
                }
                d = r = void 0
            })
        })
    }
};

$(document).ready(function () {
    $('.testimonials-carousel').carousel({
        namespace: "mr-rotato" // Defaults to “carousel”.
    })
});