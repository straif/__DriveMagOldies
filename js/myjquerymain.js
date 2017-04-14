function inherit(t, e) {
    var i = function() {
        t.call(this, arguments[0]), "undefined" != typeof this.initialize && this.initialize.apply(this, arguments)
    };
    return i.prototype = Object.create(t.prototype), $.extend(i.prototype, e), i
}
if (function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(t) {
            for (var e = t.css("visibility");
                "inherit" === e;) t = t.parent(), e = t.css("visibility");
            return "hidden" !== e
        }

        function i(t) {
            for (var e, i; t.length && t[0] !== document;) {
                if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
                t = t.parent()
            }
            return 0
        }

        function s() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function n(e) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e.on("mouseout", i, function() {
                t(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && t(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && t(this).removeClass("ui-datepicker-next-hover")
            }).on("mouseover", i, o)
        }

        function o() {
            t.datepicker._isDisabledDatepicker(p.inline ? p.dpDiv.parent()[0] : p.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && t(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && t(this).addClass("ui-datepicker-next-hover"))
        }

        function a(e, i) {
            t.extend(e, i);
            for (var s in i) null == i[s] && (e[s] = i[s]);
            return e
        }

        function r(t) {
            return function() {
                var e = this.element.val();
                t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
            }
        }
        t.ui = t.ui || {};
        var l = (t.ui.version = "1.12.0", 0),
            h = Array.prototype.slice;
        t.cleanData = function(e) {
            return function(i) {
                var s, n, o;
                for (o = 0; null != (n = i[o]); o++) try {
                    s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove")
                } catch (a) {}
                e(i)
            }
        }(t.cleanData), t.widget = function(e, i, s) {
            var n, o, a, r = {},
                l = e.split(".")[0];
            e = e.split(".")[1];
            var h = l + "-" + e;
            return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][h.toLowerCase()] = function(e) {
                return !!t.data(e, h)
            }, t[l] = t[l] || {}, n = t[l][e], o = t[l][e] = function(t, e) {
                return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new o(t, e)
            }, t.extend(o, n, {
                version: s.version,
                _proto: t.extend({}, s),
                _childConstructors: []
            }), a = new i, a.options = t.widget.extend({}, a.options), t.each(s, function(e, s) {
                return t.isFunction(s) ? void(r[e] = function() {
                    function t() {
                        return i.prototype[e].apply(this, arguments)
                    }

                    function n(t) {
                        return i.prototype[e].apply(this, t)
                    }
                    return function() {
                        var e, i = this._super,
                            o = this._superApply;
                        return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e
                    }
                }()) : void(r[e] = s)
            }), o.prototype = t.widget.extend(a, {
                widgetEventPrefix: n ? a.widgetEventPrefix || e : e
            }, r, {
                constructor: o,
                namespace: l,
                widgetName: e,
                widgetFullName: h
            }), n ? (t.each(n._childConstructors, function(e, i) {
                var s = i.prototype;
                t.widget(s.namespace + "." + s.widgetName, o, i._proto)
            }), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o
        }, t.widget.extend = function(e) {
            for (var i, s, n = h.call(arguments, 1), o = 0, a = n.length; o < a; o++)
                for (i in n[o]) s = n[o][i], n[o].hasOwnProperty(i) && void 0 !== s && (t.isPlainObject(s) ? e[i] = t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], s) : t.widget.extend({}, s) : e[i] = s);
            return e
        }, t.widget.bridge = function(e, i) {
            var s = i.prototype.widgetFullName || e;
            t.fn[e] = function(n) {
                var o = "string" == typeof n,
                    a = h.call(arguments, 1),
                    r = this;
                return o ? this.each(function() {
                    var i, o = t.data(this, s);
                    return "instance" === n ? (r = o, !1) : o ? t.isFunction(o[n]) && "_" !== n.charAt(0) ? (i = o[n].apply(o, a), i !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + n + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + n + "'")
                }) : (a.length && (n = t.widget.extend.apply(null, [n].concat(a))), this.each(function() {
                    var e = t.data(this, s);
                    e ? (e.option(n || {}), e._init && e._init()) : t.data(this, s, new i(n, this))
                })), r
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                classes: {},
                disabled: !1,
                create: null
            },
            _createWidget: function(e, i) {
                i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = l++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === i && this.destroy()
                    }
                }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: function() {
                return {}
            },
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                var e = this;
                this._destroy(), t.each(this.classesElementLookup, function(t, i) {
                    e._removeClass(i, t)
                }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(e, i) {
                var s, n, o, a = e;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof e)
                    if (a = {}, s = e.split("."), e = s.shift(), s.length) {
                        for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; o < s.length - 1; o++) n[s[o]] = n[s[o]] || {}, n = n[s[o]];
                        if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];
                        n[e] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                        a[e] = i
                    }
                return this._setOptions(a), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this
            },
            _setOptionClasses: function(e) {
                var i, s, n;
                for (i in e) n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({
                    element: s,
                    keys: i,
                    classes: e,
                    add: !0
                })))
            },
            _setOptionDisabled: function(t) {
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _classes: function(e) {
                function i(i, o) {
                    var a, r;
                    for (r = 0; r < i.length; r++) a = n.classesElementLookup[i[r]] || t(), a = t(e.add ? t.unique(a.get().concat(e.element.get())) : a.not(e.element).get()), n.classesElementLookup[i[r]] = a, s.push(i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]])
                }
                var s = [],
                    n = this;
                return e = t.extend({
                    element: this.element,
                    classes: this.options.classes || {}
                }, e), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ")
            },
            _removeClass: function(t, e, i) {
                return this._toggleClass(t, e, i, !1)
            },
            _addClass: function(t, e, i) {
                return this._toggleClass(t, e, i, !0)
            },
            _toggleClass: function(t, e, i, s) {
                s = "boolean" == typeof s ? s : i;
                var n = "string" == typeof t || null === t,
                    o = {
                        extra: n ? e : i,
                        keys: n ? t : e,
                        element: n ? this.element : t,
                        add: s
                    };
                return o.element.toggleClass(this._classes(o), s), this
            },
            _on: function(e, i, s) {
                var n, o = this;
                "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function(s, a) {
                    function r() {
                        if (e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled")) return ("string" == typeof a ? o[a] : a).apply(o, arguments)
                    }
                    "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                    var l = s.match(/^([\w:-]*)\s*(.*)$/),
                        h = l[1] + o.eventNamespace,
                        c = l[2];
                    c ? n.on(h, c, r) : i.on(h, r)
                })
            },
            _off: function(e, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
            },
            _delay: function(t, e) {
                function i() {
                    return ("string" == typeof t ? s[t] : t).apply(s, arguments)
                }
                var s = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        this._addClass(t(e.currentTarget), null, "ui-state-hover")
                    },
                    mouseleave: function(e) {
                        this._removeClass(t(e.currentTarget), null, "ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        this._addClass(t(e.currentTarget), null, "ui-state-focus")
                    },
                    focusout: function(e) {
                        this._removeClass(t(e.currentTarget), null, "ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, s) {
                var n, o, a = this.options[e];
                if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                    for (n in o) n in i || (i[n] = o[n]);
                return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(s, n, o) {
                "string" == typeof n && (n = {
                    effect: n
                });
                var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
                n = n || {}, "number" == typeof n && (n = {
                    duration: n
                }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
                    t(this)[e](), o && o.call(s[0]), i()
                })
            }
        });
        t.widget;
        ! function() {
            function e(t, e, i) {
                return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
            }

            function i(e, i) {
                return parseInt(t.css(e, i), 10) || 0
            }

            function s(e) {
                var i = e[0];
                return 9 === i.nodeType ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : t.isWindow(i) ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: i.pageY,
                        left: i.pageX
                    }
                } : {
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    offset: e.offset()
                }
            }
            var n, o, a = Math.max,
                r = Math.abs,
                l = Math.round,
                h = /left|center|right/,
                c = /top|center|bottom/,
                d = /[\+\-]\d+(\.[\d]+)?%?/,
                u = /^\w+/,
                p = /%$/,
                f = t.fn.position;
            o = function() {
                var e = t("<div>").css("position", "absolute").appendTo("body").offset({
                        top: 1.5,
                        left: 1.5
                    }),
                    i = 1.5 === e.offset().top;
                return e.remove(), o = function() {
                    return i
                }, i
            }, t.position = {
                scrollbarWidth: function() {
                    if (void 0 !== n) return n;
                    var e, i, s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        o = s.children()[0];
                    return t("body").append(s), e = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = s[0].clientWidth), s.remove(), n = e - i
                },
                getScrollInfo: function(e) {
                    var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                        s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                        n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                        o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
                    return {
                        width: o ? t.position.scrollbarWidth() : 0,
                        height: n ? t.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(e) {
                    var i = t(e || window),
                        s = t.isWindow(i[0]),
                        n = !!i[0] && 9 === i[0].nodeType,
                        o = !s && !n;
                    return {
                        element: i,
                        isWindow: s,
                        isDocument: n,
                        offset: o ? t(e).offset() : {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: i.outerWidth(),
                        height: i.outerHeight()
                    }
                }
            }, t.fn.position = function(n) {
                if (!n || !n.of) return f.apply(this, arguments);
                n = t.extend({}, n);
                var p, g, m, v, b, y, w = t(n.of),
                    _ = t.position.getWithinInfo(n.within),
                    x = t.position.getScrollInfo(_),
                    k = (n.collision || "flip").split(" "),
                    C = {};
                return y = s(w), w[0].preventDefault && (n.at = "left top"), g = y.width, m = y.height, v = y.offset, b = t.extend({}, v), t.each(["my", "at"], function() {
                    var t, e, i = (n[this] || "").split(" ");
                    1 === i.length && (i = h.test(i[0]) ? i.concat(["center"]) : c.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = h.test(i[0]) ? i[0] : "center", i[1] = c.test(i[1]) ? i[1] : "center", t = d.exec(i[0]), e = d.exec(i[1]), C[this] = [t ? t[0] : 0, e ? e[0] : 0], n[this] = [u.exec(i[0])[0], u.exec(i[1])[0]]
                }), 1 === k.length && (k[1] = k[0]), "right" === n.at[0] ? b.left += g : "center" === n.at[0] && (b.left += g / 2), "bottom" === n.at[1] ? b.top += m : "center" === n.at[1] && (b.top += m / 2), p = e(C.at, g, m), b.left += p[0], b.top += p[1], this.each(function() {
                    var s, h, c = t(this),
                        d = c.outerWidth(),
                        u = c.outerHeight(),
                        f = i(this, "marginLeft"),
                        y = i(this, "marginTop"),
                        $ = d + f + i(this, "marginRight") + x.width,
                        T = u + y + i(this, "marginBottom") + x.height,
                        S = t.extend({}, b),
                        D = e(C.my, c.outerWidth(), c.outerHeight());
                    "right" === n.my[0] ? S.left -= d : "center" === n.my[0] && (S.left -= d / 2), "bottom" === n.my[1] ? S.top -= u : "center" === n.my[1] && (S.top -= u / 2), S.left += D[0], S.top += D[1], o() || (S.left = l(S.left), S.top = l(S.top)), s = {
                        marginLeft: f,
                        marginTop: y
                    }, t.each(["left", "top"], function(e, i) {
                        t.ui.position[k[e]] && t.ui.position[k[e]][i](S, {
                            targetWidth: g,
                            targetHeight: m,
                            elemWidth: d,
                            elemHeight: u,
                            collisionPosition: s,
                            collisionWidth: $,
                            collisionHeight: T,
                            offset: [p[0] + D[0], p[1] + D[1]],
                            my: n.my,
                            at: n.at,
                            within: _,
                            elem: c
                        })
                    }), n.using && (h = function(t) {
                        var e = v.left - S.left,
                            i = e + g - d,
                            s = v.top - S.top,
                            o = s + m - u,
                            l = {
                                target: {
                                    element: w,
                                    left: v.left,
                                    top: v.top,
                                    width: g,
                                    height: m
                                },
                                element: {
                                    element: c,
                                    left: S.left,
                                    top: S.top,
                                    width: d,
                                    height: u
                                },
                                horizontal: i < 0 ? "left" : e > 0 ? "right" : "center",
                                vertical: o < 0 ? "top" : s > 0 ? "bottom" : "middle"
                            };
                        g < d && r(e + i) < g && (l.horizontal = "center"), m < u && r(s + o) < m && (l.vertical = "middle"), a(r(e), r(i)) > a(r(s), r(o)) ? l.important = "horizontal" : l.important = "vertical", n.using.call(this, t, l)
                    }), c.offset(t.extend(S, {
                        using: h
                    }))
                })
            }, t.ui.position = {
                fit: {
                    left: function(t, e) {
                        var i, s = e.within,
                            n = s.isWindow ? s.scrollLeft : s.offset.left,
                            o = s.width,
                            r = t.left - e.collisionPosition.marginLeft,
                            l = n - r,
                            h = r + e.collisionWidth - o - n;
                        e.collisionWidth > o ? l > 0 && h <= 0 ? (i = t.left + l + e.collisionWidth - o - n, t.left += l - i) : h > 0 && l <= 0 ? t.left = n : l > h ? t.left = n + o - e.collisionWidth : t.left = n : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = a(t.left - r, t.left)
                    },
                    top: function(t, e) {
                        var i, s = e.within,
                            n = s.isWindow ? s.scrollTop : s.offset.top,
                            o = e.within.height,
                            r = t.top - e.collisionPosition.marginTop,
                            l = n - r,
                            h = r + e.collisionHeight - o - n;
                        e.collisionHeight > o ? l > 0 && h <= 0 ? (i = t.top + l + e.collisionHeight - o - n, t.top += l - i) : h > 0 && l <= 0 ? t.top = n : l > h ? t.top = n + o - e.collisionHeight : t.top = n : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = a(t.top - r, t.top)
                    }
                },
                flip: {
                    left: function(t, e) {
                        var i, s, n = e.within,
                            o = n.offset.left + n.scrollLeft,
                            a = n.width,
                            l = n.isWindow ? n.scrollLeft : n.offset.left,
                            h = t.left - e.collisionPosition.marginLeft,
                            c = h - l,
                            d = h + e.collisionWidth - a - l,
                            u = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                            p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                            f = -2 * e.offset[0];
                        c < 0 ? (i = t.left + u + p + f + e.collisionWidth - a - o, (i < 0 || i < r(c)) && (t.left += u + p + f)) : d > 0 && (s = t.left - e.collisionPosition.marginLeft + u + p + f - l, (s > 0 || r(s) < d) && (t.left += u + p + f))
                    },
                    top: function(t, e) {
                        var i, s, n = e.within,
                            o = n.offset.top + n.scrollTop,
                            a = n.height,
                            l = n.isWindow ? n.scrollTop : n.offset.top,
                            h = t.top - e.collisionPosition.marginTop,
                            c = h - l,
                            d = h + e.collisionHeight - a - l,
                            u = "top" === e.my[1],
                            p = u ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                            f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                            g = -2 * e.offset[1];
                        c < 0 ? (s = t.top + p + f + g + e.collisionHeight - a - o, (s < 0 || s < r(c)) && (t.top += p + f + g)) : d > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - l, (i > 0 || r(i) < d) && (t.top += p + f + g))
                    }
                },
                flipfit: {
                    left: function() {
                        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                    }
                }
            }
        }();
        t.ui.position, t.extend(t.expr[":"], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                return function(i) {
                    return !!t.data(i, e)
                }
            }) : function(e, i, s) {
                return !!t.data(e, s[3])
            }
        }), t.fn.extend({
            disableSelection: function() {
                var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function() {
                    return this.on(t + ".ui-disableSelection", function(t) {
                        t.preventDefault()
                    })
                }
            }(),
            enableSelection: function() {
                return this.off(".ui-disableSelection")
            }
        });
        t.ui.focusable = function(i, s) {
            var n, o, a, r, l, h = i.nodeName.toLowerCase();
            return "area" === h ? (n = i.parentNode, o = n.name, !(!i.href || !o || "map" !== n.nodeName.toLowerCase()) && (a = t("img[usemap='#" + o + "']"), a.length > 0 && a.is(":visible"))) : (/^(input|select|textarea|button|object)$/.test(h) ? (r = !i.disabled, r && (l = t(i).closest("fieldset")[0], l && (r = !l.disabled))) : r = "a" === h ? i.href || s : s, r && t(i).is(":visible") && e(t(i)))
        }, t.extend(t.expr[":"], {
            focusable: function(e) {
                return t.ui.focusable(e, null != t.attr(e, "tabindex"))
            }
        });
        t.ui.focusable, t.fn.form = function() {
            return "string" == typeof this[0].form ? this.closest("form") : t(this[0].form)
        }, t.ui.formResetMixin = {
            _formResetHandler: function() {
                var e = t(this);
                setTimeout(function() {
                    var i = e.data("ui-form-reset-instances");
                    t.each(i, function() {
                        this.refresh()
                    })
                })
            },
            _bindFormResetHandler: function() {
                if (this.form = this.element.form(), this.form.length) {
                    var t = this.form.data("ui-form-reset-instances") || [];
                    t.length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t)
                }
            },
            _unbindFormResetHandler: function() {
                if (this.form.length) {
                    var e = this.form.data("ui-form-reset-instances");
                    e.splice(t.inArray(this, e), 1), e.length ? this.form.data("ui-form-reset-instances", e) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
                }
            }
        };
        "1.7" === t.fn.jquery.substring(0, 3) && (t.each(["Width", "Height"], function(e, i) {
            function s(e, i, s, o) {
                return t.each(n, function() {
                    i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
                }), i
            }
            var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                o = i.toLowerCase(),
                a = {
                    innerWidth: t.fn.innerWidth,
                    innerHeight: t.fn.innerHeight,
                    outerWidth: t.fn.outerWidth,
                    outerHeight: t.fn.outerHeight
                };
            t.fn["inner" + i] = function(e) {
                return void 0 === e ? a["inner" + i].call(this) : this.each(function() {
                    t(this).css(o, s(this, e) + "px")
                })
            }, t.fn["outer" + i] = function(e, n) {
                return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function() {
                    t(this).css(o, s(this, e, !0, n) + "px")
                })
            }
        }), t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        });
        var c = (t.ui.keyCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }, t.ui.escapeSelector = function() {
            var t = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;
            return function(e) {
                return e.replace(t, "\\$1")
            }
        }(), t.fn.labels = function() {
            var e, i, s, n, o;
            return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (n = this.eq(0).parents("label"), s = this.attr("id"), s && (e = this.eq(0).parents().last(), o = e.add(e.length ? e.siblings() : this.siblings()), i = "label[for='" + t.ui.escapeSelector(s) + "']", n = n.add(o.find(i).addBack(i))), this.pushStack(n))
        }, t.fn.scrollParent = function(e) {
            var i = this.css("position"),
                s = "absolute" === i,
                n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                o = this.parents().filter(function() {
                    var e = t(this);
                    return (!s || "static" !== e.css("position")) && n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                }).eq(0);
            return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
        }, t.extend(t.expr[":"], {
            tabbable: function(e) {
                var i = t.attr(e, "tabindex"),
                    s = null != i;
                return (!s || i >= 0) && t.ui.focusable(e, s)
            }
        }), t.fn.extend({
            uniqueId: function() {
                var t = 0;
                return function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++t)
                    })
                }
            }(),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
                })
            }
        }), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), !1);
        t(document).on("mouseup", function() {
            c = !1
        });
        t.widget("ui.mouse", {
            version: "1.12.0",
            options: {
                cancel: "input, textarea, button, select, option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var e = this;
                this.element.on("mousedown." + this.widgetName, function(t) {
                    return e._mouseDown(t)
                }).on("click." + this.widgetName, function(i) {
                    if (!0 === t.data(i.target, e.widgetName + ".preventClickEvent")) return t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(e) {
                if (!c) {
                    this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                    var i = this,
                        s = 1 === e.which,
                        n = !("string" != typeof this.options.cancel || !e.target.nodeName) && t(e.target).closest(this.options.cancel).length;
                    return !(s && !n && this._mouseCapture(e)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        i.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                        return i._mouseMove(t)
                    }, this._mouseUpDelegate = function(t) {
                        return i._mouseUp(t)
                    }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), c = !0, !0))
                }
            },
            _mouseMove: function(e) {
                if (this._mouseMoved) {
                    if (t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button) return this._mouseUp(e);
                    if (!e.which)
                        if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                        else if (!this.ignoreMissingWhich) return this._mouseUp(e)
                }
                return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
            },
            _mouseUp: function(e) {
                this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, c = !1, e.preventDefault()
            },
            _mouseDistanceMet: function(t) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        }), t.ui.plugin = {
            add: function(e, i, s) {
                var n, o = t.ui[e].prototype;
                for (n in s) o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]])
            },
            call: function(t, e, i, s) {
                var n, o = t.plugins[e];
                if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                    for (n = 0; n < o.length; n++) t.options[o[n][0]] && o[n][1].apply(t.element, i)
            }
        }, t.ui.safeActiveElement = function(t) {
            var e;
            try {
                e = t.activeElement
            } catch (i) {
                e = t.body
            }
            return e || (e = t.body), e.nodeName || (e = t.body), e
        }, t.ui.safeBlur = function(e) {
            e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur")
        };
        t.widget("ui.draggable", t.ui.mouse, {
            version: "1.12.0",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit()
            },
            _setOption: function(t, e) {
                this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
            },
            _destroy: function() {
                return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this._removeHandleClassName(), void this._mouseDestroy())
            },
            _mouseCapture: function(e) {
                var i = this.options;
                return this._blurActiveElement(e), !(this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(e), !!this.handle && (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0))
            },
            _blockFrames: function(e) {
                this.iframeBlocks = this.document.find(e).map(function() {
                    var e = t(this);
                    return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _blurActiveElement: function(e) {
                var i = t.ui.safeActiveElement(this.document[0]),
                    s = t(e.target);
                this._getHandle(e) && s.closest(i).length || t.ui.safeBlur(i)
            },
            _mouseStart: function(e) {
                var i = this.options;
                return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                    return "fixed" === t(this).css("position")
                }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
            },
            _refreshOffsets: function(t) {
                this.offset = {
                    top: this.positionAbs.top - this.margins.top,
                    left: this.positionAbs.left - this.margins.left,
                    scroll: !1,
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }, this.offset.click = {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                }
            },
            _mouseDrag: function(e, i) {
                if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                    var s = this._uiHash();
                    if (this._trigger("drag", e, s) === !1) return this._mouseUp(new t.Event("mouseup", e)), !1;
                    this.position = s.position
                }
                return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
            },
            _mouseStop: function(e) {
                var i = this,
                    s = !1;
                return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    i._trigger("stop", e) !== !1 && i._clear()
                }) : this._trigger("stop", e) !== !1 && this._clear(), !1
            },
            _mouseUp: function(e) {
                return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", {
                    target: this.element[0]
                })) : this._clear(), this
            },
            _getHandle: function(e) {
                return !this.options.handle || !!t(e.target).closest(this.element.find(this.options.handle)).length
            },
            _setHandleClassName: function() {
                this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle")
            },
            _removeHandleClassName: function() {
                this._removeClass(this.handleElement, "ui-draggable-handle")
            },
            _createHelper: function(e) {
                var i = this.options,
                    s = t.isFunction(i.helper),
                    n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
            },
            _setPositionRelative: function() {
                /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _isRootNode: function(t) {
                return /(html|body)/i.test(t.tagName) || t === this.document[0]
            },
            _getParentOffset: function() {
                var e = this.offsetParent.offset(),
                    i = this.document[0];
                return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" !== this.cssPosition) return {
                    top: 0,
                    left: 0
                };
                var t = this.element.position(),
                    e = this._isRootNode(this.scrollParent[0]);
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, s, n = this.options,
                    o = this.document[0];
                return this.relativeContainer = null,
                    n.containment ? "window" === n.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === n.containment ? void(this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : n.containment.constructor === Array ? void(this.containment = n.containment) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], void(s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
            },
            _convertPositionTo: function(t, e) {
                e || (e = this.position);
                var i = "absolute" === t ? 1 : -1,
                    s = this._isRootNode(this.scrollParent[0]);
                return {
                    top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                    left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
                }
            },
            _generatePosition: function(t, e) {
                var i, s, n, o, a = this.options,
                    r = this._isRootNode(this.scrollParent[0]),
                    l = t.pageX,
                    h = t.pageY;
                return r && this.offset.scroll || (this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (l = this.originalPageX), "x" === a.axis && (h = this.originalPageY)), {
                    top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
                    left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
            },
            _trigger: function(e, i, s) {
                return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), t.ui.plugin.add("draggable", "connectToSortable", {
            start: function(e, i, s) {
                var n = t.extend({}, i, {
                    item: s.element
                });
                s.sortables = [], t(s.options.connectToSortable).each(function() {
                    var i = t(this).sortable("instance");
                    i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n))
                })
            },
            stop: function(e, i, s) {
                var n = t.extend({}, i, {
                    item: s.element
                });
                s.cancelHelperRemoval = !1, t.each(s.sortables, function() {
                    var t = this;
                    t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                        position: t.placeholder.css("position"),
                        top: t.placeholder.css("top"),
                        left: t.placeholder.css("left")
                    }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n))
                })
            },
            drag: function(e, i, s) {
                t.each(s.sortables, function() {
                    var n = !1,
                        o = this;
                    o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, t.each(s.sortables, function() {
                        return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1), n
                    })), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function() {
                        return i.helper[0]
                    }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", e), s.dropped = o.element, t.each(s.sortables, function() {
                        this.refreshPositions()
                    }), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function() {
                        this.refreshPositions()
                    }))
                })
            }
        }), t.ui.plugin.add("draggable", "cursor", {
            start: function(e, i, s) {
                var n = t("body"),
                    o = s.options;
                n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor)
            },
            stop: function(e, i, s) {
                var n = s.options;
                n._cursor && t("body").css("cursor", n._cursor)
            }
        }), t.ui.plugin.add("draggable", "opacity", {
            start: function(e, i, s) {
                var n = t(i.helper),
                    o = s.options;
                n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity)
            },
            stop: function(e, i, s) {
                var n = s.options;
                n._opacity && t(i.helper).css("opacity", n._opacity)
            }
        }), t.ui.plugin.add("draggable", "scroll", {
            start: function(t, e, i) {
                i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
            },
            drag: function(e, i, s) {
                var n = s.options,
                    o = !1,
                    a = s.scrollParentNotHidden[0],
                    r = s.document[0];
                a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
            }
        }), t.ui.plugin.add("draggable", "snap", {
            start: function(e, i, s) {
                var n = s.options;
                s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
                    var e = t(this),
                        i = e.offset();
                    this !== s.element[0] && s.snapElements.push({
                        item: this,
                        width: e.outerWidth(),
                        height: e.outerHeight(),
                        top: i.top,
                        left: i.left
                    })
                })
            },
            drag: function(e, i, s) {
                var n, o, a, r, l, h, c, d, u, p, f = s.options,
                    g = f.snapTolerance,
                    m = i.offset.left,
                    v = m + s.helperProportions.width,
                    b = i.offset.top,
                    y = b + s.helperProportions.height;
                for (u = s.snapElements.length - 1; u >= 0; u--) l = s.snapElements[u].left - s.margins.left, h = l + s.snapElements[u].width, c = s.snapElements[u].top - s.margins.top, d = c + s.snapElements[u].height, v < l - g || m > h + g || y < c - g || b > d + g || !t.contains(s.snapElements[u].item.ownerDocument, s.snapElements[u].item) ? (s.snapElements[u].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {
                    snapItem: s.snapElements[u].item
                })), s.snapElements[u].snapping = !1) : ("inner" !== f.snapMode && (n = Math.abs(c - y) <= g, o = Math.abs(d - b) <= g, a = Math.abs(l - v) <= g, r = Math.abs(h - m) <= g, n && (i.position.top = s._convertPositionTo("relative", {
                    top: c - s.helperProportions.height,
                    left: 0
                }).top), o && (i.position.top = s._convertPositionTo("relative", {
                    top: d,
                    left: 0
                }).top), a && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: l - s.helperProportions.width
                }).left), r && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: h
                }).left)), p = n || o || a || r, "outer" !== f.snapMode && (n = Math.abs(c - b) <= g, o = Math.abs(d - y) <= g, a = Math.abs(l - m) <= g, r = Math.abs(h - v) <= g, n && (i.position.top = s._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top), o && (i.position.top = s._convertPositionTo("relative", {
                    top: d - s.helperProportions.height,
                    left: 0
                }).top), a && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left), r && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: h - s.helperProportions.width
                }).left)), !s.snapElements[u].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {
                    snapItem: s.snapElements[u].item
                })), s.snapElements[u].snapping = n || o || a || r || p)
            }
        }), t.ui.plugin.add("draggable", "stack", {
            start: function(e, i, s) {
                var n, o = s.options,
                    a = t.makeArray(t(o.stack)).sort(function(e, i) {
                        return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                    });
                a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function(e) {
                    t(this).css("zIndex", n + e)
                }), this.css("zIndex", n + a.length))
            }
        }), t.ui.plugin.add("draggable", "zIndex", {
            start: function(e, i, s) {
                var n = t(i.helper),
                    o = s.options;
                n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex)
            },
            stop: function(e, i, s) {
                var n = s.options;
                n._zIndex && t(i.helper).css("zIndex", n._zIndex)
            }
        });
        t.ui.draggable;
        t.widget("ui.droppable", {
            version: "1.12.0",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                addClasses: !0,
                greedy: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var e, i = this.options,
                    s = i.accept;
                this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function(t) {
                    return t.is(s)
                }, this.proportions = function() {
                    return arguments.length ? void(e = arguments[0]) : e ? e : e = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable")
            },
            _addToManager: function(e) {
                t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
            },
            _splice: function(t) {
                for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1)
            },
            _destroy: function() {
                var e = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(e)
            },
            _setOption: function(e, i) {
                if ("accept" === e) this.accept = t.isFunction(i) ? i : function(t) {
                    return t.is(i)
                };
                else if ("scope" === e) {
                    var s = t.ui.ddmanager.droppables[this.options.scope];
                    this._splice(s), this._addToManager(i)
                }
                this._super(e, i)
            },
            _activate: function(e) {
                var i = t.ui.ddmanager.current;
                this._addActiveClass(), i && this._trigger("activate", e, this.ui(i))
            },
            _deactivate: function(e) {
                var i = t.ui.ddmanager.current;
                this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i))
            },
            _over: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)))
            },
            _out: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)))
            },
            _drop: function(e, i) {
                var s = i || t.ui.ddmanager.current,
                    n = !1;
                return !(!s || (s.currentItem || s.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                    var i = t(this).droppable("instance");
                    if (i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && d(s, t.extend(i, {
                            offset: i.element.offset()
                        }), i.options.tolerance, e)) return n = !0, !1
                }), !n && (!!this.accept.call(this.element[0], s.currentItem || s.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(s)), this.element)))
            },
            ui: function(t) {
                return {
                    draggable: t.currentItem || t.element,
                    helper: t.helper,
                    position: t.position,
                    offset: t.positionAbs
                }
            },
            _addHoverClass: function() {
                this._addClass("ui-droppable-hover")
            },
            _removeHoverClass: function() {
                this._removeClass("ui-droppable-hover")
            },
            _addActiveClass: function() {
                this._addClass("ui-droppable-active")
            },
            _removeActiveClass: function() {
                this._removeClass("ui-droppable-active")
            }
        });
        var d = t.ui.intersect = function() {
            function t(t, e, i) {
                return t >= e && t < e + i
            }
            return function(e, i, s, n) {
                if (!i.offset) return !1;
                var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
                    a = (e.positionAbs || e.position.absolute).top + e.margins.top,
                    r = o + e.helperProportions.width,
                    l = a + e.helperProportions.height,
                    h = i.offset.left,
                    c = i.offset.top,
                    d = h + i.proportions().width,
                    u = c + i.proportions().height;
                switch (s) {
                    case "fit":
                        return h <= o && r <= d && c <= a && l <= u;
                    case "intersect":
                        return h < o + e.helperProportions.width / 2 && r - e.helperProportions.width / 2 < d && c < a + e.helperProportions.height / 2 && l - e.helperProportions.height / 2 < u;
                    case "pointer":
                        return t(n.pageY, c, i.proportions().height) && t(n.pageX, h, i.proportions().width);
                    case "touch":
                        return (a >= c && a <= u || l >= c && l <= u || a < c && l > u) && (o >= h && o <= d || r >= h && r <= d || o < h && r > d);
                    default:
                        return !1
                }
            }
        }();
        t.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function(e, i) {
                var s, n, o = t.ui.ddmanager.droppables[e.options.scope] || [],
                    a = i ? i.type : null,
                    r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
                t: for (s = 0; s < o.length; s++)
                    if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
                        for (n = 0; n < r.length; n++)
                            if (r[n] === o[s].element[0]) {
                                o[s].proportions().height = 0;
                                continue t
                            }
                        o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions({
                            width: o[s].element[0].offsetWidth,
                            height: o[s].element[0].offsetHeight
                        }))
                    }
            },
            drop: function(e, i) {
                var s = !1;
                return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && d(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                }), s
            },
            dragStart: function(e, i) {
                e.element.parentsUntil("body").on("scroll.droppable", function() {
                    e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                })
            },
            drag: function(e, i) {
                e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var s, n, o, a = d(e, this, this.options.tolerance, i),
                            r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
                        r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
                            return t(this).droppable("instance").options.scope === n
                        }), o.length && (s = t(o[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
                    }
                })
            },
            dragStop: function(e, i) {
                e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            }
        }, t.uiBackCompat !== !1 && t.widget("ui.droppable", t.ui.droppable, {
            options: {
                hoverClass: !1,
                activeClass: !1
            },
            _addActiveClass: function() {
                this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass)
            },
            _removeActiveClass: function() {
                this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass)
            },
            _addHoverClass: function() {
                this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass)
            },
            _removeHoverClass: function() {
                this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
            }
        });
        t.ui.droppable;
        t.widget("ui.resizable", t.ui.mouse, {
            version: "1.12.0",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                classes: {
                    "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
                },
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _num: function(t) {
                return parseFloat(t) || 0
            },
            _isNumber: function(t) {
                return !isNaN(parseFloat(t))
            },
            _hasScroll: function(e, i) {
                if ("hidden" === t(e).css("overflow")) return !1;
                var s = i && "left" === i ? "scrollLeft" : "scrollTop",
                    n = !1;
                return e[s] > 0 || (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
            },
            _create: function() {
                var e, i = this.options,
                    s = this;
                this._addClass("ui-resizable"), t.extend(this, {
                    _aspectRatio: !!i.aspectRatio,
                    aspectRatio: i.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, e = {
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom"),
                    marginLeft: this.originalElement.css("marginLeft")
                }, this.element.css(e), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css(e), this._proportionallyResize()), this._setupHandles(), i.autoHide && t(this.element).on("mouseenter", function() {
                    i.disabled || (s._removeClass("ui-resizable-autohide"), s._handles.show())
                }).on("mouseleave", function() {
                    i.disabled || s.resizing || (s._addClass("ui-resizable-autohide"), s._handles.hide())
                }), this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var e, i = function(e) {
                    t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
                };
                return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                    position: e.css("position"),
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: e.css("top"),
                    left: e.css("left")
                }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
            },
            _setOption: function(t, e) {
                switch (this._super(t, e), t) {
                    case "handles":
                        this._removeHandles(), this._setupHandles()
                }
            },
            _setupHandles: function() {
                var e, i, s, n, o, a = this.options,
                    r = this;
                if (this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this._handles = t(), this.handles.constructor === String)
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), s = this.handles.split(","), this.handles = {}, i = 0; i < s.length; i++) e = t.trim(s[i]), n = "ui-resizable-" + e, o = t("<div>"), this._addClass(o, "ui-resizable-handle " + n), o.css({
                        zIndex: a.zIndex
                    }), this.handles[e] = ".ui-resizable-" + e, this.element.append(o);
                this._renderAxis = function(e) {
                    var i, s, n, o;
                    e = e || this.element;
                    for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], {
                        mousedown: r._mouseDown
                    })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
                }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function() {
                    r.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), r.axis = o && o[1] ? o[1] : "se")
                }), a.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
            },
            _removeHandles: function() {
                this._handles.remove()
            },
            _mouseCapture: function(e) {
                var i, s, n = !1;
                for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
                return !this.options.disabled && n
            },
            _mouseStart: function(e) {
                var i, s, n, o = this.options,
                    a = this.element;
                return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: i,
                    top: s
                }, this.size = this._helper ? {
                    width: this.helper.width(),
                    height: this.helper.height()
                } : {
                    width: a.width(),
                    height: a.height()
                }, this.originalSize = this._helper ? {
                    width: a.outerWidth(),
                    height: a.outerHeight()
                } : {
                    width: a.width(),
                    height: a.height()
                }, this.sizeDiff = {
                    width: a.outerWidth() - a.width(),
                    height: a.outerHeight() - a.height()
                }, this.originalPosition = {
                    left: i,
                    top: s
                }, this.originalMousePosition = {
                    left: e.pageX,
                    top: e.pageY
                }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), this._addClass("ui-resizable-resizing"), this._propagate("start", e), !0
            },
            _mouseDrag: function(e) {
                var i, s, n = this.originalMousePosition,
                    o = this.axis,
                    a = e.pageX - n.left || 0,
                    r = e.pageY - n.top || 0,
                    l = this._change[o];
                return this._updatePrevProperties(), !!l && (i = l.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1)
            },
            _mouseStop: function(e) {
                this.resizing = !1;
                var i, s, n, o, a, r, l, h = this.options,
                    c = this;
                return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = {
                    width: c.helper.width() - o,
                    height: c.helper.height() - n
                }, r = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null, l = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {
                    top: l,
                    left: r
                })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
            },
            _updatePrevProperties: function() {
                this.prevPosition = {
                    top: this.position.top,
                    left: this.position.left
                }, this.prevSize = {
                    width: this.size.width,
                    height: this.size.height
                }
            },
            _applyChanges: function() {
                var t = {};
                return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
            },
            _updateVirtualBoundaries: function(t) {
                var e, i, s, n, o, a = this.options;
                o = {
                    minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
                    maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
                    minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
                    maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0
                }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), i < o.maxWidth && (o.maxWidth = i), n < o.maxHeight && (o.maxHeight = n)), this._vBoundaries = o
            },
            _updateCache: function(t) {
                this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
            },
            _updateRatio: function(t) {
                var e = this.position,
                    i = this.size,
                    s = this.axis;
                return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
            },
            _respectSize: function(t) {
                var e = this._vBoundaries,
                    i = this.axis,
                    s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                    n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                    o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                    a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                    r = this.originalPosition.left + this.originalSize.width,
                    l = this.originalPosition.top + this.originalSize.height,
                    h = /sw|nw|w/.test(i),
                    c = /nw|ne|n/.test(i);
                return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), n && (t.height = e.maxHeight), o && h && (t.left = r - e.minWidth), s && h && (t.left = r - e.maxWidth), a && c && (t.top = l - e.minHeight), n && c && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
            },
            _getPaddingPlusBorderDimensions: function(t) {
                for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; e < 4; e++) i[e] = parseFloat(s[e]) || 0, i[e] += parseFloat(n[e]) || 0;
                return {
                    height: i[0] + i[2],
                    width: i[1] + i[3]
                }
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length)
                    for (var t, e = 0, i = this.helper || this.element; e < this._proportionallyResizeElements.length; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                        height: i.height() - this.outerDimensions.height || 0,
                        width: i.width() - this.outerDimensions.width || 0
                    })
            },
            _renderProxy: function() {
                var e = this.element,
                    i = this.options;
                this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++i.zIndex
                }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(t, e) {
                    return {
                        width: this.originalSize.width + e
                    }
                },
                w: function(t, e) {
                    var i = this.originalSize,
                        s = this.originalPosition;
                    return {
                        left: s.left + e,
                        width: i.width - e
                    }
                },
                n: function(t, e, i) {
                    var s = this.originalSize,
                        n = this.originalPosition;
                    return {
                        top: n.top + i,
                        height: s.height - i
                    }
                },
                s: function(t, e, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(e, i, s) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
                },
                sw: function(e, i, s) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
                },
                ne: function(e, i, s) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
                },
                nw: function(e, i, s) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
                }
            },
            _propagate: function(e, i) {
                t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), t.ui.plugin.add("resizable", "animate", {
            stop: function(e) {
                var i = t(this).resizable("instance"),
                    s = i.options,
                    n = i._proportionallyResizeElements,
                    o = n.length && /textarea/i.test(n[0].nodeName),
                    a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
                    r = o ? 0 : i.sizeDiff.width,
                    l = {
                        width: i.size.width - r,
                        height: i.size.height - a
                    },
                    h = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                    c = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(t.extend(l, c && h ? {
                    top: c,
                    left: h
                } : {}), {
                    duration: s.animateDuration,
                    easing: s.animateEasing,
                    step: function() {
                        var s = {
                            width: parseFloat(i.element.css("width")),
                            height: parseFloat(i.element.css("height")),
                            top: parseFloat(i.element.css("top")),
                            left: parseFloat(i.element.css("left"))
                        };
                        n && n.length && t(n[0]).css({
                            width: s.width,
                            height: s.height
                        }), i._updateCache(s), i._propagate("resize", e)
                    }
                })
            }
        }), t.ui.plugin.add("resizable", "containment", {
            start: function() {
                var e, i, s, n, o, a, r, l = t(this).resizable("instance"),
                    h = l.options,
                    c = l.element,
                    d = h.containment,
                    u = d instanceof t ? d.get(0) : /parent/.test(d) ? c.parent().get(0) : d;
                u && (l.containerElement = t(u), /document/.test(d) || d === document ? (l.containerOffset = {
                    left: 0,
                    top: 0
                }, l.containerPosition = {
                    left: 0,
                    top: 0
                }, l.parentData = {
                    element: t(document),
                    left: 0,
                    top: 0,
                    width: t(document).width(),
                    height: t(document).height() || document.body.parentNode.scrollHeight
                }) : (e = t(u), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, s) {
                    i[t] = l._num(e.css("padding" + s))
                }), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
                    height: e.innerHeight() - i[3],
                    width: e.innerWidth() - i[1]
                }, s = l.containerOffset, n = l.containerSize.height, o = l.containerSize.width, a = l._hasScroll(u, "left") ? u.scrollWidth : o, r = l._hasScroll(u) ? u.scrollHeight : n, l.parentData = {
                    element: u,
                    left: s.left,
                    top: s.top,
                    width: a,
                    height: r
                }))
            },
            resize: function(e) {
                var i, s, n, o, a = t(this).resizable("instance"),
                    r = a.options,
                    l = a.containerOffset,
                    h = a.position,
                    c = a._aspectRatio || e.shiftKey,
                    d = {
                        top: 0,
                        left: 0
                    },
                    u = a.containerElement,
                    p = !0;
                u[0] !== document && /static/.test(u.css("position")) && (d = l), h.left < (a._helper ? l.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - d.left), c && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? l.left : 0), h.top < (a._helper ? l.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? l.top : 0), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top),
                    i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - d.left : a.offset.left - l.left)), s = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - d.top : a.offset.top - l.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio, p = !1)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height)
            },
            stop: function() {
                var e = t(this).resizable("instance"),
                    i = e.options,
                    s = e.containerOffset,
                    n = e.containerPosition,
                    o = e.containerElement,
                    a = t(e.helper),
                    r = a.offset(),
                    l = a.outerWidth() - e.sizeDiff.width,
                    h = a.outerHeight() - e.sizeDiff.height;
                e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                    left: r.left - n.left - s.left,
                    width: l,
                    height: h
                }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                    left: r.left - n.left - s.left,
                    width: l,
                    height: h
                })
            }
        }), t.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var e = t(this).resizable("instance"),
                    i = e.options;
                t(i.alsoResize).each(function() {
                    var e = t(this);
                    e.data("ui-resizable-alsoresize", {
                        width: parseFloat(e.width()),
                        height: parseFloat(e.height()),
                        left: parseFloat(e.css("left")),
                        top: parseFloat(e.css("top"))
                    })
                })
            },
            resize: function(e, i) {
                var s = t(this).resizable("instance"),
                    n = s.options,
                    o = s.originalSize,
                    a = s.originalPosition,
                    r = {
                        height: s.size.height - o.height || 0,
                        width: s.size.width - o.width || 0,
                        top: s.position.top - a.top || 0,
                        left: s.position.left - a.left || 0
                    };
                t(n.alsoResize).each(function() {
                    var e = t(this),
                        s = t(this).data("ui-resizable-alsoresize"),
                        n = {},
                        o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    t.each(o, function(t, e) {
                        var i = (s[e] || 0) + (r[e] || 0);
                        i && i >= 0 && (n[e] = i || null)
                    }), e.css(n)
                })
            },
            stop: function() {
                t(this).removeData("ui-resizable-alsoresize")
            }
        }), t.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var e = t(this).resizable("instance"),
                    i = e.size;
                e.ghost = e.originalElement.clone(), e.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: i.height,
                    width: i.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }), e._addClass(e.ghost, "ui-resizable-ghost"), t.uiBackCompat !== !1 && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost), e.ghost.appendTo(e.helper)
            },
            resize: function() {
                var e = t(this).resizable("instance");
                e.ghost && e.ghost.css({
                    position: "relative",
                    height: e.size.height,
                    width: e.size.width
                })
            },
            stop: function() {
                var e = t(this).resizable("instance");
                e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
            }
        }), t.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var e, i = t(this).resizable("instance"),
                    s = i.options,
                    n = i.size,
                    o = i.originalSize,
                    a = i.originalPosition,
                    r = i.axis,
                    l = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
                    h = l[0] || 1,
                    c = l[1] || 1,
                    d = Math.round((n.width - o.width) / h) * h,
                    u = Math.round((n.height - o.height) / c) * c,
                    p = o.width + d,
                    f = o.height + u,
                    g = s.maxWidth && s.maxWidth < p,
                    m = s.maxHeight && s.maxHeight < f,
                    v = s.minWidth && s.minWidth > p,
                    b = s.minHeight && s.minHeight > f;
                s.grid = l, v && (p += h), b && (f += c), g && (p -= h), m && (f -= c), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - u) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - d) : ((f - c <= 0 || p - h <= 0) && (e = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = a.top - u) : (f = c - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = a.left - d) : (p = h - e.width, i.size.width = p, i.position.left = a.left + o.width - p))
            }
        });
        t.ui.resizable, t.widget("ui.selectable", t.ui.mouse, {
            version: "1.12.0",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var e = this;
                this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                    e.elementPos = t(e.element[0]).offset(), e.selectees = t(e.options.filter, e.element[0]), e._addClass(e.selectees, "ui-selectee"), e.selectees.each(function() {
                        var i = t(this),
                            s = i.offset(),
                            n = {
                                left: s.left - e.elementPos.left,
                                top: s.top - e.elementPos.top
                            };
                        t.data(this, "selectable-item", {
                            element: this,
                            $element: i,
                            left: n.left,
                            top: n.top,
                            right: n.left + i.outerWidth(),
                            bottom: n.top + i.outerHeight(),
                            startselected: !1,
                            selected: i.hasClass("ui-selected"),
                            selecting: i.hasClass("ui-selecting"),
                            unselecting: i.hasClass("ui-unselecting")
                        })
                    })
                }, this.refresh(), this._mouseInit(), this.helper = t("<div>"), this._addClass(this.helper, "ui-selectable-helper")
            },
            _destroy: function() {
                this.selectees.removeData("selectable-item"), this._mouseDestroy()
            },
            _mouseStart: function(e) {
                var i = this,
                    s = this.options;
                this.opos = [e.pageX, e.pageY], this.elementPos = t(this.element[0]).offset(), this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({
                    left: e.pageX,
                    top: e.pageY,
                    width: 0,
                    height: 0
                }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var s = t.data(this, "selectable-item");
                    s.startselected = !0, e.metaKey || e.ctrlKey || (i._removeClass(s.$element, "ui-selected"), s.selected = !1, i._addClass(s.$element, "ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {
                        unselecting: s.element
                    }))
                }), t(e.target).parents().addBack().each(function() {
                    var s, n = t.data(this, "selectable-item");
                    if (n) return s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), i._removeClass(n.$element, s ? "ui-unselecting" : "ui-selected")._addClass(n.$element, s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, {
                        selecting: n.element
                    }) : i._trigger("unselecting", e, {
                        unselecting: n.element
                    }), !1
                }))
            },
            _mouseDrag: function(e) {
                if (this.dragged = !0, !this.options.disabled) {
                    var i, s = this,
                        n = this.options,
                        o = this.opos[0],
                        a = this.opos[1],
                        r = e.pageX,
                        l = e.pageY;
                    return o > r && (i = r, r = o, o = i), a > l && (i = l, l = a, a = i), this.helper.css({
                        left: o,
                        top: a,
                        width: r - o,
                        height: l - a
                    }), this.selectees.each(function() {
                        var i = t.data(this, "selectable-item"),
                            h = !1,
                            c = {};
                        i && i.element !== s.element[0] && (c.left = i.left + s.elementPos.left, c.right = i.right + s.elementPos.left, c.top = i.top + s.elementPos.top, c.bottom = i.bottom + s.elementPos.top, "touch" === n.tolerance ? h = !(c.left > r || c.right < o || c.top > l || c.bottom < a) : "fit" === n.tolerance && (h = c.left > o && c.right < r && c.top > a && c.bottom < l), h ? (i.selected && (s._removeClass(i.$element, "ui-selected"), i.selected = !1), i.unselecting && (s._removeClass(i.$element, "ui-unselecting"), i.unselecting = !1), i.selecting || (s._addClass(i.$element, "ui-selecting"), i.selecting = !0, s._trigger("selecting", e, {
                            selecting: i.element
                        }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, s._addClass(i.$element, "ui-selected"), i.selected = !0) : (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, i.startselected && (s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, {
                            unselecting: i.element
                        }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (s._removeClass(i.$element, "ui-selected"), i.selected = !1, s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, {
                            unselecting: i.element
                        })))))
                    }), !1
                }
            },
            _mouseStop: function(e) {
                var i = this;
                return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                    var s = t.data(this, "selectable-item");
                    i._removeClass(s.$element, "ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {
                        unselected: s.element
                    })
                }), t(".ui-selecting", this.element[0]).each(function() {
                    var s = t.data(this, "selectable-item");
                    i._removeClass(s.$element, "ui-selecting")._addClass(s.$element, "ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {
                        selected: s.element
                    })
                }), this._trigger("stop", e), this.helper.remove(), !1
            }
        }), t.widget("ui.sortable", t.ui.mouse, {
            version: "1.12.0",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _isOverAxis: function(t, e, i) {
                return t >= e && t < e + i
            },
            _isFloating: function(t) {
                return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
            },
            _create: function() {
                this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
            },
            _setOption: function(t, e) {
                this._super(t, e), "handle" === t && this._setHandleClassName()
            },
            _setHandleClassName: function() {
                var e = this;
                this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), t.each(this.items, function() {
                    e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
                })
            },
            _destroy: function() {
                this._mouseDestroy();
                for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                return this
            },
            _mouseCapture: function(e, i) {
                var s = null,
                    n = !1,
                    o = this;
                return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(e), t(e.target).parents().each(function() {
                    if (t.data(this, o.widgetName + "-item") === o) return s = t(this), !1
                }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), !!s && (!(this.options.handle && !i && (t(this.options.handle, s).find("*").addBack().each(function() {
                    this === e.target && (n = !0)
                }), !n)) && (this.currentItem = s, this._removeCurrentsFromItems(), !0))))
            },
            _mouseStart: function(e, i, s) {
                var n, o, a = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
                    for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, this._uiHash(this));
                return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(e), !0
            },
            _mouseDrag: function(e) {
                var i, s, n, o, a = this.options,
                    r = !1;
                for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)), e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                    if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && !(n === this.currentItem[0] || this.placeholder[1 === o ? "next" : "prev"]()[0] === n || t.contains(this.placeholder[0], n) || "semi-dynamic" === this.options.type && t.contains(this.element[0], n))) {
                        if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                        this._rearrange(e, s), this._trigger("change", e, this._uiHash());
                        break
                    }
                return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(e, i) {
                if (e) {
                    if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                        var s = this,
                            n = this.placeholder.offset(),
                            o = this.options.axis,
                            a = {};
                        o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
                            s._clear(e)
                        })
                    } else this._clear(e, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                    for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    s = [];
                return e = e || {}, t(i).each(function() {
                    var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                    i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
                }), !s.length && e.key && s.push(e.key + "="), s.join("&")
            },
            toArray: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    s = [];
                return e = e || {}, i.each(function() {
                    s.push(t(e.item || this).attr(e.attribute || "id") || "")
                }), s
            },
            _intersectsWith: function(t) {
                var e = this.positionAbs.left,
                    i = e + this.helperProportions.width,
                    s = this.positionAbs.top,
                    n = s + this.helperProportions.height,
                    o = t.left,
                    a = o + t.width,
                    r = t.top,
                    l = r + t.height,
                    h = this.offset.click.top,
                    c = this.offset.click.left,
                    d = "x" === this.options.axis || s + h > r && s + h < l,
                    u = "y" === this.options.axis || e + c > o && e + c < a,
                    p = d && u;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < a && r < s + this.helperProportions.height / 2 && n - this.helperProportions.height / 2 < l
            },
            _intersectsWithPointer: function(t) {
                var e, i, s = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                    n = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                    o = s && n;
                return !!o && (e = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1))
            },
            _intersectsWithSides: function(t) {
                var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                    i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                    s = this._getDragVerticalDirection(),
                    n = this._getDragHorizontalDirection();
                return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && e || "up" === s && !e)
            },
            _getDragVerticalDirection: function() {
                var t = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== t && (t > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var t = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== t && (t > 0 ? "right" : "left")
            },
            refresh: function(t) {
                return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
            },
            _connectWith: function() {
                var t = this.options;
                return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
            },
            _getItemsAsjQuery: function(e) {
                function i() {
                    r.push(this)
                }
                var s, n, o, a, r = [],
                    l = [],
                    h = this._connectWith();
                if (h && e)
                    for (s = h.length - 1; s >= 0; s--)
                        for (o = t(h[s], this.document[0]), n = o.length - 1; n >= 0; n--) a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && l.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
                for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = l.length - 1; s >= 0; s--) l[s][0].each(i);
                return t(r)
            },
            _removeCurrentsFromItems: function() {
                var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = t.grep(this.items, function(t) {
                    for (var i = 0; i < e.length; i++)
                        if (e[i] === t.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(e) {
                this.items = [], this.containers = [this];
                var i, s, n, o, a, r, l, h, c = this.items,
                    d = [
                        [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                            item: this.currentItem
                        }) : t(this.options.items, this.element), this]
                    ],
                    u = this._connectWith();
                if (u && this.ready)
                    for (i = u.length - 1; i >= 0; i--)
                        for (n = t(u[i], this.document[0]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (d.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                            item: this.currentItem
                        }) : t(o.options.items, o.element), o]), this.containers.push(o));
                for (i = d.length - 1; i >= 0; i--)
                    for (a = d[i][1], r = d[i][0], s = 0, h = r.length; s < h; s++) l = t(r[s]), l.data(this.widgetName + "-item", a), c.push({
                        item: l,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(e) {
                this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)), this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i, s, n, o;
                for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(e) {
                e = e || this;
                var i, s = e.options;
                s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
                    element: function() {
                        var s = e.currentItem[0].nodeName.toLowerCase(),
                            n = t("<" + s + ">", e.document[0]);
                        return e._addClass(n, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(n, "ui-sortable-helper"), "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(n)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, n) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
                    },
                    update: function(t, n) {
                        i && !s.forcePlaceholderSize || (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
            },
            _createTrPlaceholder: function(e, i) {
                var s = this;
                e.children().each(function() {
                    t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
                })
            },
            _contactContainers: function(e) {
                var i, s, n, o, a, r, l, h, c, d, u = null,
                    p = null;
                for (i = this.containers.length - 1; i >= 0; i--)
                    if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
                        if (this._intersectsWith(this.containers[i].containerCache)) {
                            if (u && t.contains(this.containers[i].element[0], u.element[0])) continue;
                            u = this.containers[i], p = i
                        } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
                if (u)
                    if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);
                    else {
                        for (n = 1e4, o = null, c = u.floating || this._isFloating(this.currentItem), a = c ? "left" : "top", r = c ? "width" : "height", d = c ? "pageX" : "pageY", s = this.items.length - 1; s >= 0; s--) t.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (l = this.items[s].item.offset()[a], h = !1, e[d] - l > this.items[s][r] / 2 && (h = !0), Math.abs(e[d] - l) < n && (n = Math.abs(e[d] - l), o = this.items[s], this.direction = h ? "up" : "down"));
                        if (!o && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[p]) return void(this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1));
                        o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
                    }
            },
            _createHelper: function(e) {
                var i = this.options,
                    s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), s[0].style.width && !i.forceHelperSize || s.width(this.currentItem.width()), s[0].style.height && !i.forceHelperSize || s.height(this.currentItem.height()), s
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var e = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var t = this.currentItem.position();
                    return {
                        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, s, n = this.options;
                "parent" === n.containment && (n.containment = this.helper[0].parentNode), "document" !== n.containment && "window" !== n.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(e, i) {
                i || (i = this.position);
                var s = "absolute" === e ? 1 : -1,
                    n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(n[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
                    left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
                }
            },
            _generatePosition: function(e) {
                var i, s, n = this.options,
                    o = e.pageX,
                    a = e.pageY,
                    r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    l = /(html|body)/i.test(r[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
                    top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : r.scrollTop()),
                    left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : r.scrollLeft())
                }
            },
            _rearrange: function(t, e, i, s) {
                i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var n = this.counter;
                this._delay(function() {
                    n === this.counter && this.refreshPositions(!s)
                })
            },
            _clear: function(t, e) {
                function i(t, e, i) {
                    return function(s) {
                        i._trigger(t, s, e._uiHash(e))
                    }
                }
                this.reverting = !1;
                var s, n = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (s in this._storedCSS) "auto" !== this._storedCSS[s] && "static" !== this._storedCSS[s] || (this._storedCSS[s] = "");
                    this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !e && n.push(function(t) {
                        this._trigger("receive", t, this._uiHash(this.fromOutside))
                    }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function(t) {
                        this._trigger("update", t, this._uiHash())
                    }), this !== this.currentContainer && (e || (n.push(function(t) {
                        this._trigger("remove", t, this._uiHash())
                    }), n.push(function(t) {
                        return function(e) {
                            t._trigger("receive", e, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)), n.push(function(t) {
                        return function(e) {
                            t._trigger("update", e, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                    for (s = 0; s < n.length; s++) n[s].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !this.cancelHelperRemoval
            },
            _trigger: function() {
                t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
            },
            _uiHash: function(e) {
                var i = e || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || t([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: e ? e.element : null
                }
            }
        }), t.widget("ui.accordion", {
            version: "1.12.0",
            options: {
                active: 0,
                animate: {},
                classes: {
                    "ui-accordion-header": "ui-corner-top",
                    "ui-accordion-header-collapsed": "ui-corner-all",
                    "ui-accordion-content": "ui-corner-bottom"
                },
                collapsible: !1,
                event: "click",
                header: "> li > :first-child, > :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            hideProps: {
                borderTopWidth: "hide",
                borderBottomWidth: "hide",
                paddingTop: "hide",
                paddingBottom: "hide",
                height: "hide"
            },
            showProps: {
                borderTopWidth: "show",
                borderBottomWidth: "show",
                paddingTop: "show",
                paddingBottom: "show",
                height: "show"
            },
            _create: function() {
                var e = this.options;
                this.prevShow = this.prevHide = t(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"), this.element.attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), e.active < 0 && (e.active += this.headers.length), this._refresh()
            },
            _getCreateEventData: function() {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : t()
                }
            },
            _createIcons: function() {
                var e, i, s = this.options.icons;
                s && (e = t("<span>"), this._addClass(e, "ui-accordion-header-icon", "ui-icon " + s.header), e.prependTo(this.headers), i = this.active.children(".ui-accordion-header-icon"), this._removeClass(i, s.header)._addClass(i, null, s.activeHeader)._addClass(this.headers, "ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove()
            },
            _destroy: function() {
                var t;
                this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "")
            },
            _setOption: function(t, e) {
                return "active" === t ? void this._activate(e) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), void("icons" === t && (this._destroyIcons(), e && this._createIcons())))
            },
            _setOptionDisabled: function(t) {
                this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!t)
            },
            _keydown: function(e) {
                if (!e.altKey && !e.ctrlKey) {
                    var i = t.ui.keyCode,
                        s = this.headers.length,
                        n = this.headers.index(e.target),
                        o = !1;
                    switch (e.keyCode) {
                        case i.RIGHT:
                        case i.DOWN:
                            o = this.headers[(n + 1) % s];
                            break;
                        case i.LEFT:
                        case i.UP:
                            o = this.headers[(n - 1 + s) % s];
                            break;
                        case i.SPACE:
                        case i.ENTER:
                            this._eventHandler(e);
                            break;
                        case i.HOME:
                            o = this.headers[0];
                            break;
                        case i.END:
                            o = this.headers[s - 1]
                    }
                    o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), t(o).trigger("focus"), e.preventDefault())
                }
            },
            _panelKeyDown: function(e) {
                e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().trigger("focus")
            },
            refresh: function() {
                var e = this.options;
                this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
            },
            _processPanels: function() {
                var t = this.headers,
                    e = this.panels;
                this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"), this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(), this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)))
            },
            _refresh: function() {
                var e, i = this.options,
                    s = i.heightStyle,
                    n = this.element.parent();
                this.active = this._findActive(i.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"), this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(), this.headers.attr("role", "tab").each(function() {
                    var e = t(this),
                        i = e.uniqueId().attr("id"),
                        s = e.next(),
                        n = s.uniqueId().attr("id");
                    e.attr("aria-controls", n), s.attr("aria-labelledby", i)
                }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-hidden": "true"
                }).hide(), this.active.length ? this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-hidden": "false"
                }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === s ? (e = n.height(), this.element.siblings(":visible").each(function() {
                    var i = t(this),
                        s = i.css("position");
                    "absolute" !== s && "fixed" !== s && (e -= i.outerHeight(!0))
                }), this.headers.each(function() {
                    e -= t(this).outerHeight(!0)
                }), this.headers.next().each(function() {
                    t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()))
                }).css("overflow", "auto")) : "auto" === s && (e = 0, this.headers.next().each(function() {
                    var i = t(this).is(":visible");
                    i || t(this).show(), e = Math.max(e, t(this).css("height", "").height()), i || t(this).hide()
                }).height(e))
            },
            _activate: function(e) {
                var i = this._findActive(e)[0];
                i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: t.noop
                }))
            },
            _findActive: function(e) {
                return "number" == typeof e ? this.headers.eq(e) : t()
            },
            _setupEvents: function(e) {
                var i = {
                    keydown: "_keydown"
                };
                e && t.each(e.split(" "), function(t, e) {
                    i[e] = "_eventHandler"
                }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                    keydown: "_panelKeyDown"
                }), this._hoverable(this.headers), this._focusable(this.headers)
            },
            _eventHandler: function(e) {
                var i, s, n = this.options,
                    o = this.active,
                    a = t(e.currentTarget),
                    r = a[0] === o[0],
                    l = r && n.collapsible,
                    h = l ? t() : a.next(),
                    c = o.next(),
                    d = {
                        oldHeader: o,
                        oldPanel: c,
                        newHeader: l ? t() : a,
                        newPanel: h
                    };
                e.preventDefault(), r && !n.collapsible || this._trigger("beforeActivate", e, d) === !1 || (n.active = !l && this.headers.index(a), this.active = r ? t() : a, this._toggle(d), this._removeClass(o, "ui-accordion-header-active", "ui-state-active"), n.icons && (i = o.children(".ui-accordion-header-icon"), this._removeClass(i, null, n.icons.activeHeader)._addClass(i, null, n.icons.header)), r || (this._removeClass(a, "ui-accordion-header-collapsed")._addClass(a, "ui-accordion-header-active", "ui-state-active"), n.icons && (s = a.children(".ui-accordion-header-icon"), this._removeClass(s, null, n.icons.header)._addClass(s, null, n.icons.activeHeader)), this._addClass(a.next(), "ui-accordion-content-active")))
            },
            _toggle: function(e) {
                var i = e.newPanel,
                    s = this.prevShow.length ? this.prevShow : e.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({
                    "aria-hidden": "true"
                }), s.prev().attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), i.length && s.length ? s.prev().attr({
                    tabIndex: -1,
                    "aria-expanded": "false"
                }) : i.length && this.headers.filter(function() {
                    return 0 === parseInt(t(this).attr("tabIndex"), 10)
                }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _animate: function(t, e, i) {
                var s, n, o, a = this,
                    r = 0,
                    l = t.css("box-sizing"),
                    h = t.length && (!e.length || t.index() < e.index()),
                    c = this.options.animate || {},
                    d = h && c.down || c,
                    u = function() {
                        a._toggleComplete(i)
                    };
                return "number" == typeof d && (o = d), "string" == typeof d && (n = d), n = n || d.easing || c.easing, o = o || d.duration || c.duration, e.length ? t.length ? (s = t.show().outerHeight(), e.animate(this.hideProps, {
                    duration: o,
                    easing: n,
                    step: function(t, e) {
                        e.now = Math.round(t)
                    }
                }), void t.hide().animate(this.showProps, {
                    duration: o,
                    easing: n,
                    complete: u,
                    step: function(t, i) {
                        i.now = Math.round(t), "height" !== i.prop ? "content-box" === l && (r += i.now) : "content" !== a.options.heightStyle && (i.now = Math.round(s - e.outerHeight() - r), r = 0)
                    }
                })) : e.animate(this.hideProps, o, n, u) : t.animate(this.showProps, o, n, u)
            },
            _toggleComplete: function(t) {
                var e = t.oldPanel,
                    i = e.prev();
                this._removeClass(e, "ui-accordion-content-active"), this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
            }
        }), t.widget("ui.menu", {
            version: "1.12.0",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-caret-1-e"
                },
                items: "> *",
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({
                    role: this.options.role,
                    tabIndex: 0
                }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({
                    "mousedown .ui-menu-item": function(t) {
                        t.preventDefault()
                    },
                    "click .ui-menu-item": function(e) {
                        var i = t(e.target),
                            s = t(t.ui.safeActiveElement(this.document[0]));
                        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && s.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(e) {
                        if (!this.previousFilter) {
                            var i = t(e.target).closest(".ui-menu-item"),
                                s = t(e.currentTarget);
                            i[0] === s[0] && (this._removeClass(s.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(e, s))
                        }
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(t, e) {
                        var i = this.active || this.element.find(this.options.items).eq(0);
                        e || this.focus(t, i)
                    },
                    blur: function(e) {
                        this._delay(function() {
                            var i = !t.contains(this.element[0], t.ui.safeActiveElement(this.document[0]));
                            i && this.collapseAll(e)
                        })
                    },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function(t) {
                        this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                var e = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
                    i = e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), i.children().each(function() {
                    var e = t(this);
                    e.data("ui-menu-submenu-caret") && e.remove()
                })
            },
            _keydown: function(e) {
                var i, s, n, o, a = !0;
                switch (e.keyCode) {
                    case t.ui.keyCode.PAGE_UP:
                        this.previousPage(e);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        this.nextPage(e);
                        break;
                    case t.ui.keyCode.HOME:
                        this._move("first", "first", e);
                        break;
                    case t.ui.keyCode.END:
                        this._move("last", "last", e);
                        break;
                    case t.ui.keyCode.UP:
                        this.previous(e);
                        break;
                    case t.ui.keyCode.DOWN:
                        this.next(e);
                        break;
                    case t.ui.keyCode.LEFT:
                        this.collapse(e);
                        break;
                    case t.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                        break;
                    case t.ui.keyCode.ENTER:
                    case t.ui.keyCode.SPACE:
                        this._activate(e);
                        break;
                    case t.ui.keyCode.ESCAPE:
                        this.collapse(e);
                        break;
                    default:
                        a = !1, s = this.previousFilter || "", n = String.fromCharCode(e.keyCode), o = !1, clearTimeout(this.filterTimer), n === s ? o = !0 : n = s + n, i = this._filterMenuItems(n), i = o && i.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(e.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(e, i), this.previousFilter = n, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter
                }
                a && e.preventDefault()
            },
            _activate: function(t) {
                this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
            },
            refresh: function() {
                var e, i, s, n, o, a = this,
                    r = this.options.icons.submenu,
                    l = this.element.find(this.options.menus);
                this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), s = l.filter(":not(.ui-menu)").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var e = t(this),
                        i = e.prev(),
                        s = t("<span>").data("ui-menu-submenu-caret", !0);
                    a._addClass(s, "ui-menu-icon", "ui-icon " + r), i.attr("aria-haspopup", "true").prepend(s), e.attr("aria-labelledby", i.attr("id"))
                }), this._addClass(s, "ui-menu", "ui-widget ui-widget-content ui-front"), e = l.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function() {
                    var e = t(this);
                    a._isDivider(e) && a._addClass(e, "ui-menu-divider", "ui-widget-content")
                }), n = i.not(".ui-menu-item, .ui-menu-divider"), o = n.children().not(".ui-menu").uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), this._addClass(n, "ui-menu-item")._addClass(o, "ui-menu-item-wrapper"), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            _setOption: function(t, e) {
                if ("icons" === t) {
                    var i = this.element.find(".ui-menu-icon");
                    this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu)
                }
                this._super(t, e)
            },
            _setOptionDisabled: function(t) {
                this._super(t), this.element.attr("aria-disabled", String(t)), this._toggleClass(null, "ui-state-disabled", !!t)
            },
            focus: function(t, e) {
                var i, s, n;
                this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children(".ui-menu-item-wrapper"), this._addClass(s, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), n = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(n, null, "ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
                    item: e
                })
            },
            _scrollIntoView: function(e) {
                var i, s, n, o, a, r;
                this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.outerHeight(), n < 0 ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r))
            },
            blur: function(t, e) {
                e || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", t, {
                    item: this.active
                }), this.active = null)
            },
            _startOpening: function(t) {
                clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                    this._close(), this._open(t)
                }, this.delay))
            },
            _open: function(e) {
                var i = t.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function(e, i) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                    s.length || (s = this.element), this._close(s), this.blur(e), this._removeClass(s.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = s
                }, this.delay)
            },
            _close: function(t) {
                t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
            },
            _closeOnDocumentClick: function(e) {
                return !t(e.target).closest(".ui-menu").length
            },
            _isDivider: function(t) {
                return !/[^\-\u2014\u2013\s]/.test(t.text())
            },
            collapse: function(t) {
                var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                e && e.length && (this._close(), this.focus(t, e))
            },
            expand: function(t) {
                var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                e && e.length && (this._open(e.parent()), this._delay(function() {
                    this.focus(t, e)
                }))
            },
            next: function(t) {
                this._move("next", "first", t)
            },
            previous: function(t) {
                this._move("prev", "last", t)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(t, e, i) {
                var s;
                this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[e]()), this.focus(i, s)
            },
            nextPage: function(e) {
                var i, s, n;
                return this.active ? void(this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                    return i = t(this), i.offset().top - s - n < 0
                }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(e)
            },
            previousPage: function(e) {
                var i, s, n;
                return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                    return i = t(this), i.offset().top - s + n > 0
                }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first()))) : void this.next(e)
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(e) {
                this.active = this.active || t(e.target).closest(".ui-menu-item");
                var i = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
            },
            _filterMenuItems: function(e) {
                var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    s = new RegExp("^" + i, "i");
                return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                    return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()))
                })
            }
        });
        t.widget("ui.autocomplete", {
            version: "1.12.0",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var e, i, s, n = this.element[0].nodeName.toLowerCase(),
                    o = "textarea" === n,
                    a = "input" === n;
                this.isMultiLine = o || !a && this._isContentEditable(this.element), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function(n) {
                        if (this.element.prop("readOnly")) return e = !0, s = !0, void(i = !0);
                        e = !1, s = !1, i = !1;
                        var o = t.ui.keyCode;
                        switch (n.keyCode) {
                            case o.PAGE_UP:
                                e = !0, this._move("previousPage", n);
                                break;
                            case o.PAGE_DOWN:
                                e = !0, this._move("nextPage", n);
                                break;
                            case o.UP:
                                e = !0, this._keyEvent("previous", n);
                                break;
                            case o.DOWN:
                                e = !0, this._keyEvent("next", n);
                                break;
                            case o.ENTER:
                                this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
                                break;
                            case o.TAB:
                                this.menu.active && this.menu.select(n);
                                break;
                            case o.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(n)
                        }
                    },
                    keypress: function(s) {
                        if (e) return e = !1, void(this.isMultiLine && !this.menu.element.is(":visible") || s.preventDefault());
                        if (!i) {
                            var n = t.ui.keyCode;
                            switch (s.keyCode) {
                                case n.PAGE_UP:
                                    this._move("previousPage", s);
                                    break;
                                case n.PAGE_DOWN:
                                    this._move("nextPage", s);
                                    break;
                                case n.UP:
                                    this._keyEvent("previous", s);
                                    break;
                                case n.DOWN:
                                    this._keyEvent("next", s)
                            }
                        }
                    },
                    input: function(t) {
                        return s ? (s = !1, void t.preventDefault()) : void this._searchTimeout(t)
                    },
                    focus: function() {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function(t) {
                        return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(t), void this._change(t))
                    }
                }), this._initSource(), this.menu = t("<ul>").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, {
                    mousedown: function(e) {
                        e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur, this.element[0] !== t.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
                        })
                    },
                    menufocus: function(e, i) {
                        var s, n;
                        return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() {
                            t(e.target).trigger(e.originalEvent)
                        })) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, {
                            item: n
                        }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, void(s && t.trim(s).length && (this.liveRegion.children().hide(), t("<div>").text(s).appendTo(this.liveRegion))))
                    },
                    menuselect: function(e, i) {
                        var s = i.item.data("ui-autocomplete-item"),
                            n = this.previous;
                        this.element[0] !== t.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = n, this._delay(function() {
                            this.previous = n, this.selectedItem = s
                        })), !1 !== this._trigger("select", e, {
                            item: s
                        }) && this._value(s.value), this.term = this._value(), this.close(e), this.selectedItem = s
                    }
                }), this.liveRegion = t("<div>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function(t, e) {
                this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
            },
            _isEventTargetInWidget: function(e) {
                var i = this.menu.element[0];
                return e.target === this.element[0] || e.target === i || t.contains(i, e.target)
            },
            _closeOnClickOutside: function(t) {
                this._isEventTargetInWidget(t) || this.close()
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e
            },
            _initSource: function() {
                var e, i, s = this;
                t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, s) {
                    s(t.ui.autocomplete.filter(e, i.term))
                }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, n) {
                    s.xhr && s.xhr.abort(), s.xhr = t.ajax({
                        url: i,
                        data: e,
                        dataType: "json",
                        success: function(t) {
                            n(t)
                        },
                        error: function() {
                            n([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(t) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    var e = this.term === this._value(),
                        i = this.menu.element.is(":visible"),
                        s = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
                    e && (!e || i || s) || (this.selectedItem = null, this.search(null, t))
                }, this.options.delay)
            },
            search: function(t, e) {
                return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
            },
            _search: function(t) {
                this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                    term: t
                }, this._response())
            },
            _response: function() {
                var e = ++this.requestIndex;
                return t.proxy(function(t) {
                    e === this.requestIndex && this.__response(t), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function(t) {
                t && (t = this._normalize(t)), this._trigger("response", null, {
                    content: t
                }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
            },
            close: function(t) {
                this.cancelSearch = !0, this._close(t)
            },
            _close: function(t) {
                this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
            },
            _change: function(t) {
                this.previous !== this._value() && this._trigger("change", t, {
                    item: this.selectedItem
                })
            },
            _normalize: function(e) {
                return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                    return "string" == typeof e ? {
                        label: e,
                        value: e
                    } : t.extend({}, e, {
                        label: e.label || e.value,
                        value: e.value || e.label
                    })
                })
            },
            _suggest: function(e) {
                var i = this.menu.element.empty();
                this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, {
                    mousedown: "_closeOnClickOutside"
                })
            },
            _resizeMenu: function() {
                var t = this.menu.element;
                t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(e, i) {
                var s = this;
                t.each(i, function(t, i) {
                    s._renderItemData(e, i)
                })
            },
            _renderItemData: function(t, e) {
                return this._renderItem(t, e).data("ui-autocomplete-item", e)
            },
            _renderItem: function(e, i) {
                return t("<li>").append(t("<div>").text(i.label)).appendTo(e)
            },
            _move: function(t, e) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[t](e) : void this.search(null, e)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(t, e) {
                this.isMultiLine && !this.menu.element.is(":visible") || (this._move(t, e), e.preventDefault())
            },
            _isContentEditable: function(t) {
                if (!t.length) return !1;
                var e = t.prop("contentEditable");
                return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e
            }
        }), t.extend(t.ui.autocomplete, {
            escapeRegex: function(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(e, i) {
                var s = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                return t.grep(e, function(t) {
                    return s.test(t.label || t.value || t)
                })
            }
        }), t.widget("ui.autocomplete", t.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(t) {
                        return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(e) {
                var i;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion))
            }
        });
        var u = (t.ui.autocomplete, /ui-corner-([a-z]){2,6}/g);
        t.widget("ui.controlgroup", {
            version: "1.12.0",
            defaultElement: "<div>",
            options: {
                direction: "horizontal",
                disabled: null,
                onlyVisible: !0,
                items: {
                    button: "input[type=button], input[type=submit], input[type=reset], button, a",
                    controlgroupLabel: ".ui-controlgroup-label",
                    checkboxradio: "input[type='checkbox'], input[type='radio']",
                    selectmenu: "select",
                    spinner: ".ui-spinner-input"
                }
            },
            _create: function() {
                this._enhance()
            },
            _enhance: function() {
                this.element.attr("role", "toolbar"), this.refresh()
            },
            _destroy: function() {
                this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
            },
            _initWidgets: function() {
                var e = this,
                    i = [];
                t.each(this.options.items, function(s, n) {
                    var o, a = {};
                    if (n) return "controlgroupLabel" === s ? (o = e.element.find(n), o.each(function() {
                        var e = t(this);
                        e.children(".ui-controlgroup-label-contents").length || e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")
                    }), e._addClass(o, null, "ui-widget ui-widget-content ui-state-default"), void(i = i.concat(o.get()))) : void(t.fn[s] && (e["_" + s + "Options"] && (a = e["_" + s + "Options"]("middle")), e.element.find(n).each(function() {
                        var n = t(this),
                            o = n[s]("instance"),
                            r = t.widget.extend({}, a);
                        if ("button" !== s || !n.parent(".ui-spinner").length) {
                            o || (o = n[s]()[s]("instance")), o && (r.classes = e._resolveClassesValues(r.classes, o)), n[s](r);
                            var l = n[s]("widget");
                            t.data(l[0], "ui-controlgroup-data", o ? o : n[s]("instance")), i.push(l[0])
                        }
                    })))
                }), this.childWidgets = t(t.unique(i)), this._addClass(this.childWidgets, "ui-controlgroup-item")
            },
            _callChildMethod: function(e) {
                this.childWidgets.each(function() {
                    var i = t(this),
                        s = i.data("ui-controlgroup-data");
                    s && s[e] && s[e]()
                })
            },
            _updateCornerClass: function(t, e) {
                var i = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
                    s = this._buildSimpleOptions(e, "label").classes.label;
                this._removeClass(t, null, i), this._addClass(t, null, s)
            },
            _buildSimpleOptions: function(t, e) {
                var i = "vertical" === this.options.direction,
                    s = {
                        classes: {}
                    };
                return s.classes[e] = {
                    middle: "",
                    first: "ui-corner-" + (i ? "top" : "left"),
                    last: "ui-corner-" + (i ? "bottom" : "right"),
                    only: "ui-corner-all"
                }[t], s
            },
            _spinnerOptions: function(t) {
                var e = this._buildSimpleOptions(t, "ui-spinner");
                return e.classes["ui-spinner-up"] = "", e.classes["ui-spinner-down"] = "", e
            },
            _buttonOptions: function(t) {
                return this._buildSimpleOptions(t, "ui-button")
            },
            _checkboxradioOptions: function(t) {
                return this._buildSimpleOptions(t, "ui-checkboxradio-label")
            },
            _selectmenuOptions: function(t) {
                var e = "vertical" === this.options.direction;
                return {
                    width: !!e && "auto",
                    classes: {
                        middle: {
                            "ui-selectmenu-button-open": "",
                            "ui-selectmenu-button-closed": ""
                        },
                        first: {
                            "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
                            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left")
                        },
                        last: {
                            "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
                            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right")
                        },
                        only: {
                            "ui-selectmenu-button-open": "ui-corner-top",
                            "ui-selectmenu-button-closed": "ui-corner-all"
                        }
                    }[t]
                }
            },
            _resolveClassesValues: function(e, i) {
                var s = {};
                return t.each(e, function(t) {
                    var n = i.options.classes[t] || "";
                    n = n.replace(u, "").trim(), s[t] = (n + " " + e[t]).replace(/\s+/g, " ")
                }), s
            },
            _setOption: function(t, e) {
                return "direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(t, e), "disabled" === t ? void this._callChildMethod(e ? "disable" : "enable") : void this.refresh()
            },
            refresh: function() {
                var e, i = this;
                this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), e = this.childWidgets, this.options.onlyVisible && (e = e.filter(":visible")), e.length && (t.each(["first", "last"], function(t, s) {
                    var n = e[s]().data("ui-controlgroup-data");
                    if (n && i["_" + n.widgetName + "Options"]) {
                        var o = i["_" + n.widgetName + "Options"](1 === e.length ? "only" : s);
                        o.classes = i._resolveClassesValues(o.classes, n), n.element[n.widgetName](o)
                    } else i._updateCornerClass(e[s](), s)
                }), this._callChildMethod("refresh"))
            }
        });
        t.widget("ui.checkboxradio", [t.ui.formResetMixin, {
            version: "1.12.0",
            options: {
                disabled: null,
                label: null,
                icon: !0,
                classes: {
                    "ui-checkboxradio-label": "ui-corner-all",
                    "ui-checkboxradio-icon": "ui-corner-all"
                }
            },
            _getCreateOptions: function() {
                var e, i, s = this,
                    n = this._super() || {};
                return this._readType(), i = this.element.labels(), this.label = t(i[i.length - 1]), this.label.length || t.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element).each(function() {
                    s.originalLabel += 3 === this.nodeType ? t(this).text() : this.outerHTML
                }), this.originalLabel && (n.label = this.originalLabel), e = this.element[0].disabled, null != e && (n.disabled = e), n
            },
            _create: function() {
                var t = this.element[0].checked;
                this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), t && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({
                    change: "_toggleClasses",
                    focus: function() {
                        this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
                    },
                    blur: function() {
                        this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
                    }
                })
            },
            _readType: function() {
                var e = this.element[0].nodeName.toLowerCase();
                this.type = this.element[0].type, "input" === e && /radio|checkbox/.test(this.type) || t.error("Can't create checkboxradio on element.nodeName=" + e + " and element.type=" + this.type);
            },
            _enhance: function() {
                this._updateIcon(this.element[0].checked)
            },
            widget: function() {
                return this.label
            },
            _getRadioGroup: function() {
                var e, i = this.element[0].name,
                    s = "input[name='" + t.ui.escapeSelector(i) + "']";
                return i ? (e = this.form.length ? t(this.form[0].elements).filter(s) : t(s).filter(function() {
                    return 0 === t(this).form().length
                }), e.not(this.element)) : t([])
            },
            _toggleClasses: function() {
                var e = this.element[0].checked;
                this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", e), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", e)._toggleClass(this.icon, null, "ui-icon-blank", !e), "radio" === this.type && this._getRadioGroup().each(function() {
                    var e = t(this).checkboxradio("instance");
                    e && e._removeClass(e.label, "ui-checkboxradio-checked", "ui-state-active")
                })
            },
            _destroy: function() {
                this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove())
            },
            _setOption: function(t, e) {
                if ("label" !== t || e) return this._super(t, e), "disabled" === t ? (this._toggleClass(this.label, null, "ui-state-disabled", e), void(this.element[0].disabled = e)) : void this.refresh()
            },
            _updateIcon: function(e) {
                var i = "ui-icon ui-icon-background ";
                this.options.icon ? (this.icon || (this.icon = t("<span>"), this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (i += e ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, e ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", i), e || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon)
            },
            _updateLabel: function() {
                this.label.contents().not(this.element.add(this.icon).add(this.iconSpace)).remove(), this.label.append(this.options.label)
            },
            refresh: function() {
                var t = this.element[0].checked,
                    e = this.element[0].disabled;
                this._updateIcon(t), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), null !== this.options.label && this._updateLabel(), e !== this.options.disabled && this._setOptions({
                    disabled: e
                })
            }
        }]);
        t.ui.checkboxradio;
        t.widget("ui.button", {
            version: "1.12.0",
            defaultElement: "<button>",
            options: {
                classes: {
                    "ui-button": "ui-corner-all"
                },
                disabled: null,
                icon: null,
                iconPosition: "beginning",
                label: null,
                showLabel: !0
            },
            _getCreateOptions: function() {
                var t, e = this._super() || {};
                return this.isInput = this.element.is("input"), t = this.element[0].disabled, null != t && (e.disabled = t), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (e.label = this.originalLabel), e
            },
            _create: function() {
                !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({
                    keyup: function(e) {
                        e.keyCode === t.ui.keyCode.SPACE && (e.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                    }
                })
            },
            _enhance: function() {
                this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
            },
            _updateTooltip: function() {
                this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label)
            },
            _updateIcon: function(e, i) {
                var s = "iconPosition" !== e,
                    n = s ? this.options.iconPosition : i,
                    o = "top" === n || "bottom" === n;
                this.icon ? s && this._removeClass(this.icon, null, this.options.icon) : (this.icon = t("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), s && this._addClass(this.icon, null, i), this._attachIcon(n), o ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(n))
            },
            _destroy: function() {
                this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title")
            },
            _attachIconSpace: function(t) {
                this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace)
            },
            _attachIcon: function(t) {
                this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon)
            },
            _setOptions: function(t) {
                var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
                    i = void 0 === t.icon ? this.options.icon : t.icon;
                e || i || (t.showLabel = !0), this._super(t)
            },
            _setOption: function(t, e) {
                "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === t && this._updateIcon(t, e), "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e), this._updateTooltip()), "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(t, e), "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e), this.element[0].disabled = e, e && this.element.blur())
            },
            refresh: function() {
                var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
                t !== this.options.disabled && this._setOptions({
                    disabled: t
                }), this._updateTooltip()
            }
        }), t.uiBackCompat !== !1 && (t.widget("ui.button", t.ui.button, {
            options: {
                text: !0,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super()
            },
            _setOption: function(t, e) {
                return "text" === t ? void this._super("showLabel", e) : ("showLabel" === t && (this.options.text = e), "icon" === t && (this.options.icons.primary = e), "icons" === t && (e.primary ? (this._super("icon", e.primary), this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary), this._super("iconPosition", "end"))), void this._superApply(arguments))
            }
        }), t.fn.button = function(e) {
            return function() {
                return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? e.apply(this, arguments) : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({
                    icon: !1
                }) : this.checkboxradio.apply(this, arguments))
            }
        }(t.fn.button), t.fn.buttonset = function() {
            return t.ui.controlgroup || t.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
                button: arguments[0].items
            }), this.controlgroup.apply(this, arguments))
        });
        t.ui.button;
        t.extend(t.ui, {
            datepicker: {
                version: "1.12.0"
            }
        });
        var p;
        t.extend(s.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(t) {
                return a(this._defaults, t || {}), this
            },
            _attachDatepicker: function(e, i) {
                var s, n, o;
                s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), n), o.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, o) : n && this._inlineDatepicker(e, o)
            },
            _newInst: function(e, i) {
                var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: s,
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(e, i) {
                var s = t(e);
                i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
            },
            _attachments: function(e, i) {
                var s, n, o, a = this._get(i, "appendText"),
                    r = this._get(i, "isRTL");
                i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.off("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), "focus" !== s && "both" !== s || e.on("focus", this._showDatepicker), "button" !== s && "both" !== s || (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                    src: o,
                    alt: n,
                    title: n
                }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
                    src: o,
                    alt: n,
                    title: n
                }) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.on("click", function() {
                    return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
                }))
            },
            _autoSize: function(t) {
                if (this._get(t, "autoSize") && !t.inline) {
                    var e, i, s, n, o = new Date(2009, 11, 20),
                        a = this._get(t, "dateFormat");
                    a.match(/[DM]/) && (e = function(t) {
                        for (i = 0, s = 0, n = 0; n < t.length; n++) t[n].length > i && (i = t[n].length, s = n);
                        return s
                    }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length)
                }
            },
            _inlineDatepicker: function(e, i) {
                var s = t(e);
                s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(e, i, s, n, o) {
                var r, l, h, c, d, u = this._dialogInst;
                return u || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), t("body").append(this._dialogInput), u = this._dialogInst = this._newInst(this._dialogInput, !1), u.settings = {}, t.data(this._dialogInput[0], "datepicker", u)), a(u.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(u, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, h = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + c, h / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), u.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", u), this
            },
            _destroyDatepicker: function(e) {
                var i, s = t(e),
                    n = t.data(e, "datepicker");
                s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== i && "span" !== i || s.removeClass(this.markerClassName).empty(), p === n && (p = null))
            },
            _enableDatepicker: function(e) {
                var i, s, n = t(e),
                    o = t.data(e, "datepicker");
                n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : "div" !== i && "span" !== i || (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }))
            },
            _disableDatepicker: function(e) {
                var i, s, n = t(e),
                    o = t.data(e, "datepicker");
                n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : "div" !== i && "span" !== i || (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }), this._disabledInputs[this._disabledInputs.length] = e)
            },
            _isDisabledDatepicker: function(t) {
                if (!t) return !1;
                for (var e = 0; e < this._disabledInputs.length; e++)
                    if (this._disabledInputs[e] === t) return !0;
                return !1
            },
            _getInst: function(e) {
                try {
                    return t.data(e, "datepicker")
                } catch (i) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(e, i, s) {
                var n, o, r, l, h = this._getInst(e);
                return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : h ? "all" === i ? t.extend({}, h.settings) : this._get(h, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), void(h && (this._curInst === h && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), r = this._getMinMaxDate(h, "min"), l = this._getMinMaxDate(h, "max"), a(h.settings, n), null !== r && void 0 !== n.dateFormat && void 0 === n.minDate && (h.settings.minDate = this._formatDate(h, r)), null !== l && void 0 !== n.dateFormat && void 0 === n.maxDate && (h.settings.maxDate = this._formatDate(h, l)), "disabled" in n && (n.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), h), this._autoSize(h), this._setDate(h, o), this._updateAlternate(h), this._updateDatepicker(h))))
            },
            _changeDatepicker: function(t, e, i) {
                this._optionDatepicker(t, e, i)
            },
            _refreshDatepicker: function(t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e)
            },
            _setDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
            },
            _doKeyDown: function(e) {
                var i, s, n, o = t.datepicker._getInst(e.target),
                    a = !0,
                    r = o.dpDiv.is(".ui-datepicker-rtl");
                if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        t.datepicker._hideDatepicker(), a = !1;
                        break;
                    case 13:
                        return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), n[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, n[0]), i = t.datepicker._get(o, "onSelect"), i ? (s = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : t.datepicker._hideDatepicker(), !1;
                    case 27:
                        t.datepicker._hideDatepicker();
                        break;
                    case 33:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 34:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        a = !1
                } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
                a && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function(e) {
                var i, s, n = t.datepicker._getInst(e.target);
                if (t.datepicker._get(n, "constrainInput")) return i = t.datepicker._possibleChars(t.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || s < " " || !i || i.indexOf(s) > -1
            },
            _doKeyUp: function(e) {
                var i, s = t.datepicker._getInst(e.target);
                if (s.input.val() !== s.lastVal) try {
                    i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
                } catch (n) {}
                return !0
            },
            _showDatepicker: function(e) {
                if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                    var s, n, o, r, l, h, c;
                    s = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== s && (t.datepicker._curInst.dpDiv.stop(!0, !0), s && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(s, "beforeShow"), o = n ? n.apply(e, [e, s]) : {}, o !== !1 && (a(s.settings, o), s.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(s), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function() {
                        return r |= "fixed" === t(this).css("position"), !r
                    }), l = {
                        left: t.datepicker._pos[0],
                        top: t.datepicker._pos[1]
                    }, t.datepicker._pos = null, s.dpDiv.empty(), s.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), t.datepicker._updateDatepicker(s), l = t.datepicker._checkOffset(s, l, r), s.dpDiv.css({
                        position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute",
                        display: "none",
                        left: l.left + "px",
                        top: l.top + "px"
                    }), s.inline || (h = t.datepicker._get(s, "showAnim"), c = t.datepicker._get(s, "duration"), s.dpDiv.css("z-index", i(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? s.dpDiv.show(h, t.datepicker._get(s, "showOptions"), c) : s.dpDiv[h || "show"](h ? c : null), t.datepicker._shouldFocusInput(s) && s.input.trigger("focus"), t.datepicker._curInst = s))
                }
            },
            _updateDatepicker: function(e) {
                this.maxRows = 4, p = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
                var i, s = this._getNumberOfMonths(e),
                    n = s[1],
                    a = 17,
                    r = e.dpDiv.find("." + this._dayOverClass + " a");
                r.length > 0 && o.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.trigger("focus"), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                    i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(t) {
                return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
            },
            _checkOffset: function(e, i, s) {
                var n = e.dpDiv.outerWidth(),
                    o = e.dpDiv.outerHeight(),
                    a = e.input ? e.input.outerWidth() : 0,
                    r = e.input ? e.input.outerHeight() : 0,
                    l = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
                    h = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
                return i.left -= this._get(e, "isRTL") ? n - a : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > l && l > n ? Math.abs(i.left + n - l) : 0), i.top -= Math.min(i.top, i.top + o > h && h > o ? Math.abs(o + r) : 0), i
            },
            _findPos: function(e) {
                for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[n ? "previousSibling" : "nextSibling"];
                return i = t(e).offset(), [i.left, i.top]
            },
            _hideDatepicker: function(e) {
                var i, s, n, o, a = this._curInst;
                !a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), s = this._get(a, "duration"), n = function() {
                    t.datepicker._tidyDialog(a)
                }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), s, n) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(a, "onClose"), o && o.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(t) {
                t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(e) {
                if (t.datepicker._curInst) {
                    var i = t(e.target),
                        s = t.datepicker._getInst(i[0]);
                    (i[0].id === t.datepicker._mainDivId || 0 !== i.parents("#" + t.datepicker._mainDivId).length || i.hasClass(t.datepicker.markerClassName) || i.closest("." + t.datepicker._triggerClass).length || !t.datepicker._datepickerShowing || t.datepicker._inDialog && t.blockUI) && (!i.hasClass(t.datepicker.markerClassName) || t.datepicker._curInst === s) || t.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(e, i, s) {
                var n = t(e),
                    o = this._getInst(n[0]);
                this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o))
            },
            _gotoToday: function(e) {
                var i, s = t(e),
                    n = this._getInst(s[0]);
                this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
            },
            _selectMonthYear: function(e, i, s) {
                var n = t(e),
                    o = this._getInst(n[0]);
                o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n)
            },
            _selectDay: function(e, i, s, n) {
                var o, a = t(e);
                t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
            },
            _clearDate: function(e) {
                var i = t(e);
                this._selectDate(i, "")
            },
            _selectDate: function(e, i) {
                var s, n = t(e),
                    o = this._getInst(n[0]);
                i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.trigger("focus"), this._lastInput = null)
            },
            _updateAlternate: function(e) {
                var i, s, n, o = this._get(e, "altField");
                o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(o).val(n))
            },
            noWeekends: function(t) {
                var e = t.getDay();
                return [e > 0 && e < 6, ""]
            },
            iso8601Week: function(t) {
                var e, i = new Date(t.getTime());
                return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
            },
            parseDate: function(e, i, s) {
                if (null == e || null == i) throw "Invalid arguments";
                if (i = "object" == typeof i ? i.toString() : i + "", "" === i) return null;
                var n, o, a, r, l = 0,
                    h = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    c = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10),
                    d = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
                    u = (s ? s.dayNames : null) || this._defaults.dayNames,
                    p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
                    f = (s ? s.monthNames : null) || this._defaults.monthNames,
                    g = -1,
                    m = -1,
                    v = -1,
                    b = -1,
                    y = !1,
                    w = function(t) {
                        var i = n + 1 < e.length && e.charAt(n + 1) === t;
                        return i && n++, i
                    },
                    _ = function(t) {
                        var e = w(t),
                            s = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                            n = "y" === t ? s : 1,
                            o = new RegExp("^\\d{" + n + "," + s + "}"),
                            a = i.substring(l).match(o);
                        if (!a) throw "Missing number at position " + l;
                        return l += a[0].length, parseInt(a[0], 10)
                    },
                    x = function(e, s, n) {
                        var o = -1,
                            a = t.map(w(e) ? n : s, function(t, e) {
                                return [
                                    [e, t]
                                ]
                            }).sort(function(t, e) {
                                return -(t[1].length - e[1].length)
                            });
                        if (t.each(a, function(t, e) {
                                var s = e[1];
                                if (i.substr(l, s.length).toLowerCase() === s.toLowerCase()) return o = e[0], l += s.length, !1
                            }), o !== -1) return o + 1;
                        throw "Unknown name at position " + l
                    },
                    k = function() {
                        if (i.charAt(l) !== e.charAt(n)) throw "Unexpected literal at position " + l;
                        l++
                    };
                for (n = 0; n < e.length; n++)
                    if (y) "'" !== e.charAt(n) || w("'") ? k() : y = !1;
                    else switch (e.charAt(n)) {
                        case "d":
                            v = _("d");
                            break;
                        case "D":
                            x("D", d, u);
                            break;
                        case "o":
                            b = _("o");
                            break;
                        case "m":
                            m = _("m");
                            break;
                        case "M":
                            m = x("M", p, f);
                            break;
                        case "y":
                            g = _("y");
                            break;
                        case "@":
                            r = new Date(_("@")), g = r.getFullYear(), m = r.getMonth() + 1, v = r.getDate();
                            break;
                        case "!":
                            r = new Date((_("!") - this._ticksTo1970) / 1e4), g = r.getFullYear(), m = r.getMonth() + 1, v = r.getDate();
                            break;
                        case "'":
                            w("'") ? k() : y = !0;
                            break;
                        default:
                            k()
                    }
                    if (l < i.length && (a = i.substr(l), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;
                if (g === -1 ? g = (new Date).getFullYear() : g < 100 && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (g <= c ? 0 : -100)), b > -1)
                    for (m = 1, v = b;;) {
                        if (o = this._getDaysInMonth(g, m - 1), v <= o) break;
                        m++, v -= o
                    }
                if (r = this._daylightSavingAdjust(new Date(g, m - 1, v)), r.getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== v) throw "Invalid date";
                return r
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function(t, e, i) {
                if (!e) return "";
                var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    o = (i ? i.dayNames : null) || this._defaults.dayNames,
                    a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    r = (i ? i.monthNames : null) || this._defaults.monthNames,
                    l = function(e) {
                        var i = s + 1 < t.length && t.charAt(s + 1) === e;
                        return i && s++, i
                    },
                    h = function(t, e, i) {
                        var s = "" + e;
                        if (l(t))
                            for (; s.length < i;) s = "0" + s;
                        return s
                    },
                    c = function(t, e, i, s) {
                        return l(t) ? s[e] : i[e]
                    },
                    d = "",
                    u = !1;
                if (e)
                    for (s = 0; s < t.length; s++)
                        if (u) "'" !== t.charAt(s) || l("'") ? d += t.charAt(s) : u = !1;
                        else switch (t.charAt(s)) {
                            case "d":
                                d += h("d", e.getDate(), 2);
                                break;
                            case "D":
                                d += c("D", e.getDay(), n, o);
                                break;
                            case "o":
                                d += h("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                d += h("m", e.getMonth() + 1, 2);
                                break;
                            case "M":
                                d += c("M", e.getMonth(), a, r);
                                break;
                            case "y":
                                d += l("y") ? e.getFullYear() : (e.getFullYear() % 100 < 10 ? "0" : "") + e.getFullYear() % 100;
                                break;
                            case "@":
                                d += e.getTime();
                                break;
                            case "!":
                                d += 1e4 * e.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                l("'") ? d += "'" : u = !0;
                                break;
                            default:
                                d += t.charAt(s)
                        }
                        return d
            },
            _possibleChars: function(t) {
                var e, i = "",
                    s = !1,
                    n = function(i) {
                        var s = e + 1 < t.length && t.charAt(e + 1) === i;
                        return s && e++, s
                    };
                for (e = 0; e < t.length; e++)
                    if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;
                    else switch (t.charAt(e)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            n("'") ? i += "'" : s = !0;
                            break;
                        default:
                            i += t.charAt(e)
                    }
                    return i
            },
            _get: function(t, e) {
                return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e]
            },
            _setDateFromField: function(t, e) {
                if (t.input.val() !== t.lastVal) {
                    var i = this._get(t, "dateFormat"),
                        s = t.lastVal = t.input ? t.input.val() : null,
                        n = this._getDefaultDate(t),
                        o = n,
                        a = this._getFormatConfig(t);
                    try {
                        o = this.parseDate(i, s, a) || n
                    } catch (r) {
                        s = e ? "" : s
                    }
                    t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t)
                }
            },
            _getDefaultDate: function(t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
            },
            _determineDate: function(e, i, s) {
                var n = function(t) {
                        var e = new Date;
                        return e.setDate(e.getDate() + t), e
                    },
                    o = function(i) {
                        try {
                            return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                        } catch (s) {}
                        for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = n.getFullYear(), a = n.getMonth(), r = n.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, h = l.exec(i); h;) {
                            switch (h[2] || "d") {
                                case "d":
                                case "D":
                                    r += parseInt(h[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    r += 7 * parseInt(h[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    a += parseInt(h[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));
                                    break;
                                case "y":
                                case "Y":
                                    o += parseInt(h[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a))
                            }
                            h = l.exec(i)
                        }
                        return new Date(o, a, r)
                    },
                    a = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
                return a = a && "Invalid Date" === a.toString() ? s : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
            },
            _daylightSavingAdjust: function(t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
            },
            _setDate: function(t, e, i) {
                var s = !e,
                    n = t.selectedMonth,
                    o = t.selectedYear,
                    a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
            },
            _getDate: function(t) {
                var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return e
            },
            _attachHandlers: function(e) {
                var i = this._get(e, "stepMonths"),
                    s = "#" + e.id.replace(/\\\\/g, "\\");
                e.dpDiv.find("[data-handler]").map(function() {
                    var e = {
                        prev: function() {
                            t.datepicker._adjustDate(s, -i, "M")
                        },
                        next: function() {
                            t.datepicker._adjustDate(s, +i, "M")
                        },
                        hide: function() {
                            t.datepicker._hideDatepicker()
                        },
                        today: function() {
                            t.datepicker._gotoToday(s)
                        },
                        selectDay: function() {
                            return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return t.datepicker._selectMonthYear(s, this, "M"), !1
                        },
                        selectYear: function() {
                            return t.datepicker._selectMonthYear(s, this, "Y"), !1
                        }
                    };
                    t(this).on(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(t) {
                var e, i, s, n, o, a, r, l, h, c, d, u, p, f, g, m, v, b, y, w, _, x, k, C, $, T, S, D, P, I, A, E, O, M, z, H, N, W, L, F = new Date,
                    j = this._daylightSavingAdjust(new Date(F.getFullYear(), F.getMonth(), F.getDate())),
                    R = this._get(t, "isRTL"),
                    q = this._get(t, "showButtonPanel"),
                    B = this._get(t, "hideIfNoPrevNext"),
                    U = this._get(t, "navigationAsDateFormat"),
                    Y = this._getNumberOfMonths(t),
                    V = this._get(t, "showCurrentAtPos"),
                    K = this._get(t, "stepMonths"),
                    G = 1 !== Y[0] || 1 !== Y[1],
                    X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                    Q = this._getMinMaxDate(t, "min"),
                    Z = this._getMinMaxDate(t, "max"),
                    J = t.drawMonth - V,
                    tt = t.drawYear;
                if (J < 0 && (J += 12, tt--), Z)
                    for (e = this._daylightSavingAdjust(new Date(Z.getFullYear(), Z.getMonth() - Y[0] * Y[1] + 1, Z.getDate())), e = Q && e < Q ? Q : e; this._daylightSavingAdjust(new Date(tt, J, 1)) > e;) J--, J < 0 && (J = 11, tt--);
                for (t.drawMonth = J, t.drawYear = tt, i = this._get(t, "prevText"), i = U ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, J - K, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, tt, J) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "e" : "w") + "'>" + i + "</span></a>" : B ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "e" : "w") + "'>" + i + "</span></a>",
                    n = this._get(t, "nextText"), n = U ? this.formatDate(n, this._daylightSavingAdjust(new Date(tt, J + K, 1)), this._getFormatConfig(t)) : n, o = this._canAdjustMonth(t, 1, tt, J) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "w" : "e") + "'>" + n + "</span></a>" : B ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "w" : "e") + "'>" + n + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? X : j, a = U ? this.formatDate(a, r, this._getFormatConfig(t)) : a, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", h = q ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (R ? l : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (R ? "" : l) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, d = this._get(t, "showWeek"), u = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), b = this._get(t, "selectOtherMonths"), y = this._getDefaultDate(t), w = "", x = 0; x < Y[0]; x++) {
                    for (k = "", this.maxRows = 4, C = 0; C < Y[1]; C++) {
                        if ($ = this._daylightSavingAdjust(new Date(tt, J, t.selectedDay)), T = " ui-corner-all", S = "", G) {
                            if (S += "<div class='ui-datepicker-group", Y[1] > 1) switch (C) {
                                case 0:
                                    S += " ui-datepicker-group-first", T = " ui-corner-" + (R ? "right" : "left");
                                    break;
                                case Y[1] - 1:
                                    S += " ui-datepicker-group-last", T = " ui-corner-" + (R ? "left" : "right");
                                    break;
                                default:
                                    S += " ui-datepicker-group-middle", T = ""
                            }
                            S += "'>"
                        }
                        for (S += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === x ? R ? o : s : "") + (/all|right/.test(T) && 0 === x ? R ? s : o : "") + this._generateMonthYearHeader(t, J, tt, Q, Z, x > 0 || C > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead><tr>", D = d ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", _ = 0; _ < 7; _++) P = (_ + c) % 7, D += "<th scope='col'" + ((_ + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + u[P] + "'>" + p[P] + "</span></th>";
                        for (S += D + "</tr></thead><tbody>", I = this._getDaysInMonth(tt, J), tt === t.selectedYear && J === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, I)), A = (this._getFirstDayOfMonth(tt, J) - c + 7) % 7, E = Math.ceil((A + I) / 7), O = G && this.maxRows > E ? this.maxRows : E, this.maxRows = O, M = this._daylightSavingAdjust(new Date(tt, J, 1 - A)), z = 0; z < O; z++) {
                            for (S += "<tr>", H = d ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(M) + "</td>" : "", _ = 0; _ < 7; _++) N = m ? m.apply(t.input ? t.input[0] : null, [M]) : [!0, ""], W = M.getMonth() !== J, L = W && !b || !N[0] || Q && M < Q || Z && M > Z, H += "<td class='" + ((_ + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (W ? " ui-datepicker-other-month" : "") + (M.getTime() === $.getTime() && J === t.selectedMonth && t._keyEvent || y.getTime() === M.getTime() && y.getTime() === $.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (W && !v ? "" : " " + N[1] + (M.getTime() === X.getTime() ? " " + this._currentClass : "") + (M.getTime() === j.getTime() ? " ui-datepicker-today" : "")) + "'" + (W && !v || !N[2] ? "" : " title='" + N[2].replace(/'/g, "&#39;") + "'") + (L ? "" : " data-handler='selectDay' data-event='click' data-month='" + M.getMonth() + "' data-year='" + M.getFullYear() + "'") + ">" + (W && !v ? "&#xa0;" : L ? "<span class='ui-state-default'>" + M.getDate() + "</span>" : "<a class='ui-state-default" + (M.getTime() === j.getTime() ? " ui-state-highlight" : "") + (M.getTime() === X.getTime() ? " ui-state-active" : "") + (W ? " ui-priority-secondary" : "") + "' href='#'>" + M.getDate() + "</a>") + "</td>", M.setDate(M.getDate() + 1), M = this._daylightSavingAdjust(M);
                            S += H + "</tr>"
                        }
                        J++, J > 11 && (J = 0, tt++), S += "</tbody></table>" + (G ? "</div>" + (Y[0] > 0 && C === Y[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), k += S
                    }
                    w += k
                }
                return w += h, t._keyEvent = !1, w
            },
            _generateMonthYearHeader: function(t, e, i, s, n, o, a, r) {
                var l, h, c, d, u, p, f, g, m = this._get(t, "changeMonth"),
                    v = this._get(t, "changeYear"),
                    b = this._get(t, "showMonthAfterYear"),
                    y = "<div class='ui-datepicker-title'>",
                    w = "";
                if (o || !m) w += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
                else {
                    for (l = s && s.getFullYear() === i, h = n && n.getFullYear() === i, w += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; c < 12; c++)(!l || c >= s.getMonth()) && (!h || c <= n.getMonth()) && (w += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                    w += "</select>"
                }
                if (b || (y += w + (!o && m && v ? "" : "&#xa0;")), !t.yearshtml)
                    if (t.yearshtml = "", o || !v) y += "<span class='ui-datepicker-year'>" + i + "</span>";
                    else {
                        for (d = this._get(t, "yearRange").split(":"), u = (new Date).getFullYear(), p = function(t) {
                                var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? u + parseInt(t, 10) : parseInt(t, 10);
                                return isNaN(e) ? u : e
                            }, f = p(d[0]), g = Math.max(f, p(d[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, g = n ? Math.min(g, n.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; f <= g; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                        t.yearshtml += "</select>", y += t.yearshtml, t.yearshtml = null
                    }
                return y += this._get(t, "yearSuffix"), b && (y += (!o && m && v ? "" : "&#xa0;") + w), y += "</div>"
            },
            _adjustInstDate: function(t, e, i) {
                var s = t.selectedYear + ("Y" === i ? e : 0),
                    n = t.selectedMonth + ("M" === i ? e : 0),
                    o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
                    a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
                t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), "M" !== i && "Y" !== i || this._notifyChange(t)
            },
            _restrictMinMax: function(t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    s = this._getMinMaxDate(t, "max"),
                    n = i && e < i ? i : e;
                return s && n > s ? s : n
            },
            _notifyChange: function(t) {
                var e = this._get(t, "onChangeMonthYear");
                e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
            },
            _getNumberOfMonths: function(t) {
                var e = this._get(t, "numberOfMonths");
                return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
            },
            _getMinMaxDate: function(t, e) {
                return this._determineDate(t, this._get(t, e + "Date"), null)
            },
            _getDaysInMonth: function(t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
            },
            _getFirstDayOfMonth: function(t, e) {
                return new Date(t, e, 1).getDay()
            },
            _canAdjustMonth: function(t, e, i, s) {
                var n = this._getNumberOfMonths(t),
                    o = this._daylightSavingAdjust(new Date(i, s + (e < 0 ? e : n[0] * n[1]), 1));
                return e < 0 && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
            },
            _isInRange: function(t, e) {
                var i, s, n = this._getMinMaxDate(t, "min"),
                    o = this._getMinMaxDate(t, "max"),
                    a = null,
                    r = null,
                    l = this._get(t, "yearRange");
                return l && (i = l.split(":"), s = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || e.getFullYear() <= r)
            },
            _getFormatConfig: function(t) {
                var e = this._get(t, "shortYearCutoff");
                return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                    shortYearCutoff: e,
                    dayNamesShort: this._get(t, "dayNamesShort"),
                    dayNames: this._get(t, "dayNames"),
                    monthNamesShort: this._get(t, "monthNamesShort"),
                    monthNames: this._get(t, "monthNames")
                }
            },
            _formatDate: function(t, e, i, s) {
                e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
                var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
            }
        }), t.fn.datepicker = function(e) {
            if (!this.length) return this;
            t.datepicker.initialized || (t(document).on("mousedown", t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
            var i = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
                "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
            }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
        }, t.datepicker = new s, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.12.0";
        t.datepicker;
        t.widget("ui.dialog", {
            version: "1.12.0",
            options: {
                appendTo: "body",
                autoOpen: !0,
                buttons: [],
                classes: {
                    "ui-dialog": "ui-corner-all",
                    "ui-dialog-titlebar": "ui-corner-all"
                },
                closeOnEscape: !0,
                closeText: "Close",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: null,
                maxWidth: null,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function(e) {
                        var i = t(this).css(e).offset().top;
                        i < 0 && t(this).css("top", e.top - i)
                    }
                },
                resizable: !0,
                show: null,
                title: null,
                width: 300,
                beforeClose: null,
                close: null,
                drag: null,
                dragStart: null,
                dragStop: null,
                focus: null,
                open: null,
                resize: null,
                resizeStart: null,
                resizeStop: null
            },
            sizeRelatedOptions: {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            resizableRelatedOptions: {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            },
            _create: function() {
                this.originalCss = {
                    display: this.element[0].style.display,
                    width: this.element[0].style.width,
                    minHeight: this.element[0].style.minHeight,
                    maxHeight: this.element[0].style.maxHeight,
                    height: this.element[0].style.height
                }, this.originalPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
            },
            _destroy: function() {
                var t, e = this.originalPosition;
                this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
            },
            widget: function() {
                return this.uiDialog
            },
            disable: t.noop,
            enable: t.noop,
            close: function(e) {
                var i = this;
                this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function() {
                    i._trigger("close", e)
                }))
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function() {
                this._moveToTop()
            },
            _moveToTop: function(e, i) {
                var s = !1,
                    n = this.uiDialog.siblings(".ui-front:visible").map(function() {
                        return +t(this).css("z-index")
                    }).get(),
                    o = Math.max.apply(null, n);
                return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), s = !0), s && !i && this._trigger("focus", e), s
            },
            open: function() {
                var e = this;
                return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = t(t.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
                    e._focusTabbable(), e._trigger("focus")
                }), this._makeFocusTarget(), void this._trigger("open"))
            },
            _focusTabbable: function() {
                var t = this._focusedElement;
                t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).trigger("focus")
            },
            _keepFocus: function(e) {
                function i() {
                    var e = t.ui.safeActiveElement(this.document[0]),
                        i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
                    i || this._focusTabbable()
                }
                e.preventDefault(), i.call(this), this._delay(i)
            },
            _createWrapper: function() {
                this.uiDialog = t("<div>").hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, {
                    keydown: function(e) {
                        if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), void this.close(e);
                        if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                            var i = this.uiDialog.find(":tabbable"),
                                s = i.filter(":first"),
                                n = i.filter(":last");
                            e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function() {
                                n.trigger("focus")
                            }), e.preventDefault()) : (this._delay(function() {
                                s.trigger("focus")
                            }), e.preventDefault())
                        }
                    },
                    mousedown: function(t) {
                        this._moveToTop(t) && this._focusTabbable()
                    }
                }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            },
            _createTitlebar: function() {
                var e;
                this.uiDialogTitlebar = t("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, {
                    mousedown: function(e) {
                        t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
                    }
                }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
                    label: t("<a>").text(this.options.closeText).html(),
                    icon: "ui-icon-closethick",
                    showLabel: !1
                }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, {
                    click: function(t) {
                        t.preventDefault(), this.close(t)
                    }
                }), e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(e, "ui-dialog-title"), this._title(e), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({
                    "aria-labelledby": e.attr("id")
                })
            },
            _title: function(t) {
                this.options.title ? t.text(this.options.title) : t.html("&#160;")
            },
            _createButtonPane: function() {
                this.uiDialogButtonPane = t("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons()
            },
            _createButtons: function() {
                var e = this,
                    i = this.options.buttons;
                return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? void this._removeClass(this.uiDialog, "ui-dialog-buttons") : (t.each(i, function(i, s) {
                    var n, o;
                    s = t.isFunction(s) ? {
                        click: s,
                        text: i
                    } : s, s = t.extend({
                        type: "button"
                    }, s), n = s.click, o = {
                        icon: s.icon,
                        iconPosition: s.iconPosition,
                        showLabel: s.showLabel
                    }, delete s.click, delete s.icon, delete s.iconPosition, delete s.showLabel, t("<button></button>", s).button(o).appendTo(e.uiButtonSet).on("click", function() {
                        n.apply(e.element[0], arguments)
                    })
                }), this._addClass(this.uiDialog, "ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
            },
            _makeDraggable: function() {
                function e(t) {
                    return {
                        position: t.position,
                        offset: t.offset
                    }
                }
                var i = this,
                    s = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(s, n) {
                        i._addClass(t(this), "ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n))
                    },
                    drag: function(t, s) {
                        i._trigger("drag", t, e(s))
                    },
                    stop: function(n, o) {
                        var a = o.offset.left - i.document.scrollLeft(),
                            r = o.offset.top - i.document.scrollTop();
                        s.position = {
                            my: "left top",
                            at: "left" + (a >= 0 ? "+" : "") + a + " top" + (r >= 0 ? "+" : "") + r,
                            of: i.window
                        }, i._removeClass(t(this), "ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(o))
                    }
                })
            },
            _makeResizable: function() {
                function e(t) {
                    return {
                        originalPosition: t.originalPosition,
                        originalSize: t.originalSize,
                        position: t.position,
                        size: t.size
                    }
                }
                var i = this,
                    s = this.options,
                    n = s.resizable,
                    o = this.uiDialog.css("position"),
                    a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: s.maxWidth,
                    maxHeight: s.maxHeight,
                    minWidth: s.minWidth,
                    minHeight: this._minHeight(),
                    handles: a,
                    start: function(s, n) {
                        i._addClass(t(this), "ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n))
                    },
                    resize: function(t, s) {
                        i._trigger("resize", t, e(s))
                    },
                    stop: function(n, o) {
                        var a = i.uiDialog.offset(),
                            r = a.left - i.document.scrollLeft(),
                            l = a.top - i.document.scrollTop();
                        s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = {
                            my: "left top",
                            at: "left" + (r >= 0 ? "+" : "") + r + " top" + (l >= 0 ? "+" : "") + l,
                            of: i.window
                        }, i._removeClass(t(this), "ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(o))
                    }
                }).css("position", o)
            },
            _trackFocus: function() {
                this._on(this.widget(), {
                    focusin: function(e) {
                        this._makeFocusTarget(), this._focusedElement = t(e.target)
                    }
                })
            },
            _makeFocusTarget: function() {
                this._untrackInstance(), this._trackingInstances().unshift(this)
            },
            _untrackInstance: function() {
                var e = this._trackingInstances(),
                    i = t.inArray(this, e);
                i !== -1 && e.splice(i, 1)
            },
            _trackingInstances: function() {
                var t = this.document.data("ui-dialog-instances");
                return t || (t = [], this.document.data("ui-dialog-instances", t)), t
            },
            _minHeight: function() {
                var t = this.options;
                return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
            },
            _position: function() {
                var t = this.uiDialog.is(":visible");
                t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
            },
            _setOptions: function(e) {
                var i = this,
                    s = !1,
                    n = {};
                t.each(e, function(t, e) {
                    i._setOption(t, e), t in i.sizeRelatedOptions && (s = !0), t in i.resizableRelatedOptions && (n[t] = e)
                }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n)
            },
            _setOption: function(e, i) {
                var s, n, o = this.uiDialog;
                "disabled" !== e && (this._super(e, i), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({
                    label: t("<a>").text("" + this.options.closeText).html()
                }), "draggable" === e && (s = o.is(":data(ui-draggable)"), s && !i && o.draggable("destroy"), !s && i && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (n = o.is(":data(ui-resizable)"), n && !i && o.resizable("destroy"), n && "string" == typeof i && o.resizable("option", "handles", i), n || i === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
            },
            _size: function() {
                var t, e, i, s = this.options;
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    height: 0
                }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({
                    height: "auto",
                    width: s.width
                }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({
                    minHeight: e,
                    maxHeight: i,
                    height: "auto"
                }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            },
            _blockFrames: function() {
                this.iframeBlocks = this.document.find("iframe").map(function() {
                    var e = t(this);
                    return t("<div>").css({
                        position: "absolute",
                        width: e.outerWidth(),
                        height: e.outerHeight()
                    }).appendTo(e.parent()).offset(e.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _allowInteraction: function(e) {
                return !!t(e.target).closest(".ui-dialog").length || !!t(e.target).closest(".ui-datepicker").length
            },
            _createOverlay: function() {
                if (this.options.modal) {
                    var e = !0;
                    this._delay(function() {
                        e = !1
                    }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                        focusin: function(t) {
                            e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                        }
                    }), this.overlay = t("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, {
                        mousedown: "_keepFocus"
                    }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
                }
            },
            _destroyOverlay: function() {
                if (this.options.modal && this.overlay) {
                    var t = this.document.data("ui-dialog-overlays") - 1;
                    t ? this.document.data("ui-dialog-overlays", t) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null
                }
            }
        }), t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, {
            options: {
                dialogClass: ""
            },
            _createWrapper: function() {
                this._super(), this.uiDialog.addClass(this.options.dialogClass)
            },
            _setOption: function(t, e) {
                "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e), this._superApply(arguments)
            }
        });
        t.ui.dialog, t.widget("ui.progressbar", {
            version: "1.12.0",
            options: {
                classes: {
                    "ui-progressbar": "ui-corner-all",
                    "ui-progressbar-value": "ui-corner-left",
                    "ui-progressbar-complete": "ui-corner-right"
                },
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function() {
                this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({
                    role: "progressbar",
                    "aria-valuemin": this.min
                }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = t("<div>").appendTo(this.element), this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue()
            },
            _destroy: function() {
                this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove()
            },
            value: function(t) {
                return void 0 === t ? this.options.value : (this.options.value = this._constrainedValue(t), void this._refreshValue())
            },
            _constrainedValue: function(t) {
                return void 0 === t && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, t))
            },
            _setOptions: function(t) {
                var e = t.value;
                delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
            },
            _setOption: function(t, e) {
                "max" === t && (e = Math.max(this.min, e)), this._super(t, e)
            },
            _setOptionDisabled: function(t) {
                this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t)
            },
            _percentage: function() {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
            },
            _refreshValue: function() {
                var e = this.options.value,
                    i = this._percentage();
                this.valueDiv.toggle(this.indeterminate || e > this.min).width(i.toFixed(0) + "%"), this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, e === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": e
                }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
            }
        }), t.widget("ui.selectmenu", [t.ui.formResetMixin, {
            version: "1.12.0",
            defaultElement: "<select>",
            options: {
                appendTo: null,
                classes: {
                    "ui-selectmenu-button-open": "ui-corner-top",
                    "ui-selectmenu-button-closed": "ui-corner-all"
                },
                disabled: null,
                icons: {
                    button: "ui-icon-triangle-1-s"
                },
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                width: !1,
                change: null,
                close: null,
                focus: null,
                open: null,
                select: null
            },
            _create: function() {
                var e = this.element.uniqueId().attr("id");
                this.ids = {
                    element: e,
                    button: e + "-button",
                    menu: e + "-menu"
                }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = t()
            },
            _drawButton: function() {
                var e, i = this,
                    s = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
                this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, {
                    click: function(t) {
                        this.button.focus(), t.preventDefault()
                    }
                }), this.element.hide(), this.button = t("<span>", {
                    tabindex: this.options.disabled ? -1 : 0,
                    id: this.ids.button,
                    role: "combobox",
                    "aria-expanded": "false",
                    "aria-autocomplete": "list",
                    "aria-owns": this.ids.menu,
                    "aria-haspopup": "true",
                    title: this.element.attr("title")
                }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), e = t("<span>").appendTo(this.button), this._addClass(e, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(s).appendTo(this.button), this.options.width !== !1 && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
                    i._rendered || i._refreshMenu()
                })
            },
            _drawMenu: function() {
                var e = this;
                this.menu = t("<ul>", {
                    "aria-hidden": "true",
                    "aria-labelledby": this.ids.button,
                    id: this.ids.menu
                }), this.menuWrap = t("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                    classes: {
                        "ui-menu": "ui-corner-bottom"
                    },
                    role: "listbox",
                    select: function(t, i) {
                        t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t)
                    },
                    focus: function(t, i) {
                        var s = i.item.data("ui-selectmenu-item");
                        null != e.focusIndex && s.index !== e.focusIndex && (e._trigger("focus", t, {
                            item: s
                        }), e.isOpen || e._select(s, t)), e.focusIndex = s.index, e.button.attr("aria-activedescendant", e.menuItems.eq(s.index).attr("id"))
                    }
                }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
                    return !1
                }, this.menuInstance._isDivider = function() {
                    return !1
                }
            },
            refresh: function() {
                this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton()
            },
            _refreshMenu: function() {
                var t, e = this.element.find("option");
                this.menu.empty(), this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, e.length && (t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
            },
            open: function(t) {
                this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t)))
            },
            _position: function() {
                this.menuWrap.position(t.extend({
                    of: this.button
                }, this.options.position))
            },
            close: function(t) {
                this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t))
            },
            widget: function() {
                return this.button
            },
            menuWidget: function() {
                return this.menu
            },
            _renderButtonItem: function(e) {
                var i = t("<span>");
                return this._setText(i, e.label), this._addClass(i, "ui-selectmenu-text"), i
            },
            _renderMenu: function(e, i) {
                var s = this,
                    n = "";
                t.each(i, function(i, o) {
                    var a;
                    o.optgroup !== n && (a = t("<li>", {
                        text: o.optgroup
                    }), s._addClass(a, "ui-selectmenu-optgroup", "ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), a.appendTo(e), n = o.optgroup), s._renderItemData(e, o)
                })
            },
            _renderItemData: function(t, e) {
                return this._renderItem(t, e).data("ui-selectmenu-item", e)
            },
            _renderItem: function(e, i) {
                var s = t("<li>"),
                    n = t("<div>", {
                        title: i.element.attr("title")
                    });
                return i.disabled && this._addClass(s, null, "ui-state-disabled"), this._setText(n, i.label), s.append(n).appendTo(e)
            },
            _setText: function(t, e) {
                e ? t.text(e) : t.html("&#160;")
            },
            _move: function(t, e) {
                var i, s, n = ".ui-menu-item";
                this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), n += ":not(.ui-state-disabled)"), s = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](n).eq(-1) : i[t + "All"](n).eq(0), s.length && this.menuInstance.focus(e, s)
            },
            _getSelectedItem: function() {
                return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
            },
            _toggle: function(t) {
                this[this.isOpen ? "close" : "open"](t)
            },
            _setSelection: function() {
                var t;
                this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus())
            },
            _documentClick: {
                mousedown: function(e) {
                    this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + t.ui.escapeSelector(this.ids.button)).length || this.close(e))
                }
            },
            _buttonEvents: {
                mousedown: function() {
                    var t;
                    window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange()
                },
                click: function(t) {
                    this._setSelection(), this._toggle(t)
                },
                keydown: function(e) {
                    var i = !0;
                    switch (e.keyCode) {
                        case t.ui.keyCode.TAB:
                        case t.ui.keyCode.ESCAPE:
                            this.close(e), i = !1;
                            break;
                        case t.ui.keyCode.ENTER:
                            this.isOpen && this._selectFocusedItem(e);
                            break;
                        case t.ui.keyCode.UP:
                            e.altKey ? this._toggle(e) : this._move("prev", e);
                            break;
                        case t.ui.keyCode.DOWN:
                            e.altKey ? this._toggle(e) : this._move("next", e);
                            break;
                        case t.ui.keyCode.SPACE:
                            this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                            break;
                        case t.ui.keyCode.LEFT:
                            this._move("prev", e);
                            break;
                        case t.ui.keyCode.RIGHT:
                            this._move("next", e);
                            break;
                        case t.ui.keyCode.HOME:
                        case t.ui.keyCode.PAGE_UP:
                            this._move("first", e);
                            break;
                        case t.ui.keyCode.END:
                        case t.ui.keyCode.PAGE_DOWN:
                            this._move("last", e);
                            break;
                        default:
                            this.menu.trigger(e), i = !1
                    }
                    i && e.preventDefault()
                }
            },
            _selectFocusedItem: function(t) {
                var e = this.menuItems.eq(this.focusIndex).parent("li");
                e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
            },
            _select: function(t, e) {
                var i = this.element[0].selectedIndex;
                this.element[0].selectedIndex = t.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(t)), this._setAria(t), this._trigger("select", e, {
                    item: t
                }), t.index !== i && this._trigger("change", e, {
                    item: t
                }), this.close(e)
            },
            _setAria: function(t) {
                var e = this.menuItems.eq(t.index).attr("id");
                this.button.attr({
                    "aria-labelledby": e,
                    "aria-activedescendant": e
                }), this.menu.attr("aria-activedescendant", e)
            },
            _setOption: function(t, e) {
                if ("icons" === t) {
                    var i = this.button.find("span.ui-icon");
                    this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button)
                }
                this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "width" === t && this._resizeButton()
            },
            _setOptionDisabled: function(t) {
                this._super(t), this.menuInstance.option("disabled", t), this.button.attr("aria-disabled", t), this._toggleClass(this.button, null, "ui-state-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e
            },
            _toggleAttr: function() {
                this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
            },
            _resizeButton: function() {
                var t = this.options.width;
                return t === !1 ? void this.button.css("width", "") : (null === t && (t = this.element.show().outerWidth(), this.element.hide()), void this.button.outerWidth(t))
            },
            _resizeMenu: function() {
                this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
            },
            _getCreateOptions: function() {
                var t = this._super();
                return t.disabled = this.element.prop("disabled"), t
            },
            _parseOptions: function(e) {
                var i = this,
                    s = [];
                e.each(function(e, n) {
                    s.push(i._parseOption(t(n), e))
                }), this.items = s
            },
            _parseOption: function(t, e) {
                var i = t.parent("optgroup");
                return {
                    element: t,
                    index: e,
                    value: t.val(),
                    label: t.text(),
                    optgroup: i.attr("label") || "",
                    disabled: i.prop("disabled") || t.prop("disabled")
                };
            },
            _destroy: function() {
                this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element)
            }
        }]), t.widget("ui.slider", t.ui.mouse, {
            version: "1.12.0",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                classes: {
                    "ui-slider": "ui-corner-all",
                    "ui-slider-handle": "ui-corner-all",
                    "ui-slider-range": "ui-corner-all ui-widget-header"
                },
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            numPages: 5,
            _create: function() {
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1
            },
            _refresh: function() {
                this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
            },
            _createHandles: function() {
                var e, i, s = this.options,
                    n = this.element.find(".ui-slider-handle"),
                    o = "<span tabindex='0'></span>",
                    a = [];
                for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; e < i; e++) a.push(o);
                this.handles = n.add(t(a.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function(e) {
                    t(this).data("ui-slider-handle-index", e)
                })
            },
            _createRange: function() {
                var e = this.options;
                e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
                    left: "",
                    bottom: ""
                })) : (this.range = t("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), "min" !== e.range && "max" !== e.range || this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null)
            },
            _setupEvents: function() {
                this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
            },
            _destroy: function() {
                this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy()
            },
            _mouseCapture: function(e) {
                var i, s, n, o, a, r, l, h, c = this,
                    d = this.options;
                return !d.disabled && (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), i = {
                    x: e.pageX,
                    y: e.pageY
                }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                    var i = Math.abs(s - c.values(e));
                    (n > i || n === i && (e === c._lastChangedValue || c.values(e) === d.min)) && (n = i, o = t(this), a = e)
                }), r = this._start(e, a), r !== !1 && (this._mouseSliding = !0, this._handleIndex = a, this._addClass(o, null, "ui-state-active"), o.trigger("focus"), l = o.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {
                    left: 0,
                    top: 0
                } : {
                    left: e.pageX - l.left - o.width() / 2,
                    top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0))
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(t) {
                var e = {
                        x: t.pageX,
                        y: t.pageY
                    },
                    i = this._normValueFromMouse(e);
                return this._slide(t, this._handleIndex, i), !1
            },
            _mouseStop: function(t) {
                return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(t) {
                var e, i, s, n, o;
                return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), s < 0 && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o)
            },
            _uiHash: function(t, e, i) {
                var s = {
                    handle: this.handles[t],
                    handleIndex: t,
                    value: void 0 !== e ? e : this.value()
                };
                return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t), s.values = i || this.values()), s
            },
            _hasMultipleValues: function() {
                return this.options.values && this.options.values.length
            },
            _start: function(t, e) {
                return this._trigger("start", t, this._uiHash(e))
            },
            _slide: function(t, e, i) {
                var s, n, o = this.value(),
                    a = this.values();
                this._hasMultipleValues() && (n = this.values(e ? 0 : 1), o = this.values(e), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), a[e] = i), i !== o && (s = this._trigger("slide", t, this._uiHash(e, i, a)), s !== !1 && (this._hasMultipleValues() ? this.values(e, i) : this.value(i)))
            },
            _stop: function(t, e) {
                this._trigger("stop", t, this._uiHash(e))
            },
            _change: function(t, e) {
                this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e)))
            },
            value: function(t) {
                return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
            },
            values: function(e, i) {
                var s, n, o;
                if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, e);
                if (!arguments.length) return this._values();
                if (!t.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(e) : this.value();
                for (s = this.options.values, n = arguments[0], o = 0; o < s.length; o += 1) s[o] = this._trimAlignValue(n[o]), this._change(null, o);
                this._refreshValue()
            },
            _setOption: function(e, i) {
                var s, n = 0;
                switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), this._super(e, i), e) {
                    case "orientation":
                        this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), s = n - 1; s >= 0; s--) this._change(null, s);
                        this._animateOff = !1;
                        break;
                    case "step":
                    case "min":
                    case "max":
                        this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                        break;
                    case "range":
                        this._animateOff = !0, this._refresh(), this._animateOff = !1
                }
            },
            _setOptionDisabled: function(t) {
                this._super(t), this._toggleClass(null, "ui-state-disabled", !!t)
            },
            _value: function() {
                var t = this.options.value;
                return t = this._trimAlignValue(t)
            },
            _values: function(t) {
                var e, i, s;
                if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
                if (this._hasMultipleValues()) {
                    for (i = this.options.values.slice(), s = 0; s < i.length; s += 1) i[s] = this._trimAlignValue(i[s]);
                    return i
                }
                return []
            },
            _trimAlignValue: function(t) {
                if (t <= this._valueMin()) return this._valueMin();
                if (t >= this._valueMax()) return this._valueMax();
                var e = this.options.step > 0 ? this.options.step : 1,
                    i = (t - this._valueMin()) % e,
                    s = t - i;
                return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
            },
            _calculateNewMax: function() {
                var t = this.options.max,
                    e = this._valueMin(),
                    i = this.options.step,
                    s = Math.round((t - e) / i) * i;
                t = s + e, t > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision()))
            },
            _precision: function() {
                var t = this._precisionOf(this.options.step);
                return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
            },
            _precisionOf: function(t) {
                var e = t.toString(),
                    i = e.indexOf(".");
                return i === -1 ? 0 : e.length - i - 1
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.max
            },
            _refreshRange: function(t) {
                "vertical" === t && this.range.css({
                    width: "",
                    left: ""
                }), "horizontal" === t && this.range.css({
                    height: "",
                    bottom: ""
                })
            },
            _refreshValue: function() {
                var e, i, s, n, o, a = this.options.range,
                    r = this.options,
                    l = this,
                    h = !this._animateOff && r.animate,
                    c = {};
                this._hasMultipleValues() ? this.handles.each(function(s) {
                    i = (l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100, c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({
                        left: i + "%"
                    }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({
                        width: i - e + "%"
                    }, {
                        queue: !1,
                        duration: r.animate
                    })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({
                        bottom: i + "%"
                    }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({
                        height: i - e + "%"
                    }, {
                        queue: !1,
                        duration: r.animate
                    }))), e = i
                }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? (s - n) / (o - n) * 100 : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    width: i + "%"
                }, r.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    width: 100 - i + "%"
                }, r.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    height: i + "%"
                }, r.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                    height: 100 - i + "%"
                }, r.animate))
            },
            _handleEvents: {
                keydown: function(e) {
                    var i, s, n, o, a = t(e.target).data("ui-slider-handle-index");
                    switch (e.keyCode) {
                        case t.ui.keyCode.HOME:
                        case t.ui.keyCode.END:
                        case t.ui.keyCode.PAGE_UP:
                        case t.ui.keyCode.PAGE_DOWN:
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.RIGHT:
                        case t.ui.keyCode.DOWN:
                        case t.ui.keyCode.LEFT:
                            if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(t(e.target), null, "ui-state-active"), i = this._start(e, a), i === !1)) return
                    }
                    switch (o = this.options.step, s = n = this._hasMultipleValues() ? this.values(a) : this.value(), e.keyCode) {
                        case t.ui.keyCode.HOME:
                            n = this._valueMin();
                            break;
                        case t.ui.keyCode.END:
                            n = this._valueMax();
                            break;
                        case t.ui.keyCode.PAGE_UP:
                            n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                            break;
                        case t.ui.keyCode.PAGE_DOWN:
                            n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                            break;
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.RIGHT:
                            if (s === this._valueMax()) return;
                            n = this._trimAlignValue(s + o);
                            break;
                        case t.ui.keyCode.DOWN:
                        case t.ui.keyCode.LEFT:
                            if (s === this._valueMin()) return;
                            n = this._trimAlignValue(s - o)
                    }
                    this._slide(e, a, n)
                },
                keyup: function(e) {
                    var i = t(e.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), this._removeClass(t(e.target), null, "ui-state-active"))
                }
            }
        });
        t.widget("ui.spinner", {
            version: "1.12.0",
            defaultElement: "<input>",
            widgetEventPrefix: "spin",
            options: {
                classes: {
                    "ui-spinner": "ui-corner-all",
                    "ui-spinner-down": "ui-corner-br",
                    "ui-spinner-up": "ui-corner-tr"
                },
                culture: null,
                icons: {
                    down: "ui-icon-triangle-1-s",
                    up: "ui-icon-triangle-1-n"
                },
                incremental: !0,
                max: null,
                min: null,
                numberFormat: null,
                page: 10,
                step: 1,
                change: null,
                spin: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _getCreateOptions: function() {
                var e = this._super(),
                    i = this.element;
                return t.each(["min", "max", "step"], function(t, s) {
                    var n = i.attr(s);
                    null != n && n.length && (e[s] = n)
                }), e
            },
            _events: {
                keydown: function(t) {
                    this._start(t) && this._keydown(t) && t.preventDefault()
                },
                keyup: "_stop",
                focus: function() {
                    this.previous = this.element.val()
                },
                blur: function(t) {
                    return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", t)))
                },
                mousewheel: function(t, e) {
                    if (e) {
                        if (!this.spinning && !this._start(t)) return !1;
                        this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                            this.spinning && this._stop(t)
                        }, 100), t.preventDefault()
                    }
                },
                "mousedown .ui-spinner-button": function(e) {
                    function i() {
                        var e = this.element[0] === t.ui.safeActiveElement(this.document[0]);
                        e || (this.element.trigger("focus"), this.previous = s, this._delay(function() {
                            this.previous = s
                        }))
                    }
                    var s;
                    s = this.element[0] === t.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur, i.call(this)
                    }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
                },
                "mouseup .ui-spinner-button": "_stop",
                "mouseenter .ui-spinner-button": function(e) {
                    if (t(e.currentTarget).hasClass("ui-state-active")) return this._start(e) !== !1 && void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
                },
                "mouseleave .ui-spinner-button": "_stop"
            },
            _enhance: function() {
                this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>")
            },
            _draw: function() {
                this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"), this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
                    classes: {
                        "ui-button": ""
                    }
                }), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"), this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({
                    icon: this.options.icons.up,
                    showLabel: !1
                }), this.buttons.last().button({
                    icon: this.options.icons.down,
                    showLabel: !1
                }), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height())
            },
            _keydown: function(e) {
                var i = this.options,
                    s = t.ui.keyCode;
                switch (e.keyCode) {
                    case s.UP:
                        return this._repeat(null, 1, e), !0;
                    case s.DOWN:
                        return this._repeat(null, -1, e), !0;
                    case s.PAGE_UP:
                        return this._repeat(null, i.page, e), !0;
                    case s.PAGE_DOWN:
                        return this._repeat(null, -i.page, e), !0
                }
                return !1
            },
            _start: function(t) {
                return !(!this.spinning && this._trigger("start", t) === !1) && (this.counter || (this.counter = 1), this.spinning = !0, !0)
            },
            _repeat: function(t, e, i) {
                t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                    this._repeat(40, e, i)
                }, t), this._spin(e * this.options.step, i)
            },
            _spin: function(t, e) {
                var i = this.value() || 0;
                this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {
                    value: i
                }) === !1 || (this._value(i), this.counter++)
            },
            _increment: function(e) {
                var i = this.options.incremental;
                return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
            },
            _precision: function() {
                var t = this._precisionOf(this.options.step);
                return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
            },
            _precisionOf: function(t) {
                var e = t.toString(),
                    i = e.indexOf(".");
                return i === -1 ? 0 : e.length - i - 1
            },
            _adjustValue: function(t) {
                var e, i, s = this.options;
                return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && t < s.min ? s.min : t
            },
            _stop: function(t) {
                this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
            },
            _setOption: function(t, e) {
                var i, s, n;
                return "culture" === t || "numberFormat" === t ? (i = this._parse(this.element.val()), this.options[t] = e, void this.element.val(this._format(i))) : ("max" !== t && "min" !== t && "step" !== t || "string" == typeof e && (e = this._parse(e)), "icons" === t && (s = this.buttons.first().find(".ui-icon"), this._removeClass(s, null, this.options.icons.up), this._addClass(s, null, e.up), n = this.buttons.last().find(".ui-icon"), this._removeClass(n, null, this.options.icons.down), this._addClass(n, null, e.down)), void this._super(t, e))
            },
            _setOptionDisabled: function(t) {
                this._super(t), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable")
            },
            _setOptions: r(function(t) {
                this._super(t)
            }),
            _parse: function(t) {
                return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
            },
            _format: function(t) {
                return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
            },
            _refresh: function() {
                this.element.attr({
                    "aria-valuemin": this.options.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._parse(this.element.val())
                })
            },
            isValid: function() {
                var t = this.value();
                return null !== t && t === this._adjustValue(t)
            },
            _value: function(t, e) {
                var i;
                "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
            },
            _destroy: function() {
                this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element)
            },
            stepUp: r(function(t) {
                this._stepUp(t)
            }),
            _stepUp: function(t) {
                this._start() && (this._spin((t || 1) * this.options.step), this._stop())
            },
            stepDown: r(function(t) {
                this._stepDown(t)
            }),
            _stepDown: function(t) {
                this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
            },
            pageUp: r(function(t) {
                this._stepUp((t || 1) * this.options.page)
            }),
            pageDown: r(function(t) {
                this._stepDown((t || 1) * this.options.page)
            }),
            value: function(t) {
                return arguments.length ? void r(this._value).call(this, t) : this._parse(this.element.val())
            },
            widget: function() {
                return this.uiSpinner
            }
        }), t.uiBackCompat !== !1 && t.widget("ui.spinner", t.ui.spinner, {
            _enhance: function() {
                this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
            },
            _uiSpinnerHtml: function() {
                return "<span>"
            },
            _buttonHtml: function() {
                return "<a></a><a></a>"
            }
        });
        t.ui.spinner;
        t.widget("ui.tabs", {
            version: "1.12.0",
            delay: 300,
            options: {
                active: null,
                classes: {
                    "ui-tabs": "ui-corner-all",
                    "ui-tabs-nav": "ui-corner-all",
                    "ui-tabs-panel": "ui-corner-bottom",
                    "ui-tabs-tab": "ui-corner-top"
                },
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _isLocal: function() {
                var t = /#.*$/;
                return function(e) {
                    var i, s;
                    i = e.href.replace(t, ""), s = location.href.replace(t, "");
                    try {
                        i = decodeURIComponent(i)
                    } catch (n) {}
                    try {
                        s = decodeURIComponent(s)
                    } catch (n) {}
                    return e.hash.length > 1 && i === s
                }
            }(),
            _create: function() {
                var e = this,
                    i = this.options;
                this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                    return e.tabs.index(t)
                }))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(i.active) : this.active = t(), this._refresh(), this.active.length && this.load(i.active)
            },
            _initialActive: function() {
                var e = this.options.active,
                    i = this.options.collapsible,
                    s = location.hash.substring(1);
                return null === e && (s && this.tabs.each(function(i, n) {
                    if (t(n).attr("aria-controls") === s) return e = i, !1
                }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== e && e !== -1 || (e = !!this.tabs.length && 0)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), e === -1 && (e = !i && 0)), !i && e === !1 && this.anchors.length && (e = 0), e
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : t()
                }
            },
            _tabKeydown: function(e) {
                var i = t(t.ui.safeActiveElement(this.document[0])).closest("li"),
                    s = this.tabs.index(i),
                    n = !0;
                if (!this._handlePageNav(e)) {
                    switch (e.keyCode) {
                        case t.ui.keyCode.RIGHT:
                        case t.ui.keyCode.DOWN:
                            s++;
                            break;
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.LEFT:
                            n = !1, s--;
                            break;
                        case t.ui.keyCode.END:
                            s = this.anchors.length - 1;
                            break;
                        case t.ui.keyCode.HOME:
                            s = 0;
                            break;
                        case t.ui.keyCode.SPACE:
                            return e.preventDefault(), clearTimeout(this.activating), void this._activate(s);
                        case t.ui.keyCode.ENTER:
                            return e.preventDefault(), clearTimeout(this.activating), void this._activate(s !== this.options.active && s);
                        default:
                            return
                    }
                    e.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), e.ctrlKey || e.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function() {
                        this.option("active", s)
                    }, this.delay))
                }
            },
            _panelKeydown: function(e) {
                this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.trigger("focus"))
            },
            _handlePageNav: function(e) {
                return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
            },
            _findNextTab: function(e, i) {
                function s() {
                    return e > n && (e = 0), e < 0 && (e = n), e
                }
                for (var n = this.tabs.length - 1; t.inArray(s(), this.options.disabled) !== -1;) e = i ? e + 1 : e - 1;
                return e
            },
            _focusNextTab: function(t, e) {
                return t = this._findNextTab(t, e), this.tabs.eq(t).trigger("focus"), t
            },
            _setOption: function(t, e) {
                return "active" === t ? void this._activate(e) : (this._super(t, e), "collapsible" === t && (this._toggleClass("ui-tabs-collapsible", null, e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), void("heightStyle" === t && this._setupHeightStyle(e)))
            },
            _sanitizeSelector: function(t) {
                return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function() {
                var e = this.options,
                    i = this.tablist.children(":has(a[href])");
                e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                    return i.index(t)
                }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
            },
            _refresh: function() {
                this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-hidden": "true"
                }), this.active.length ? (this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function() {
                var e = this,
                    i = this.tabs,
                    s = this.anchors,
                    n = this.panels;
                this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function(e) {
                    t(this).is(".ui-state-disabled") && e.preventDefault()
                }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                    t(this).closest("li").is(".ui-state-disabled") && this.blur()
                }), this.tabs = this.tablist.find("> li:has(a[href])").attr({
                    role: "tab",
                    tabIndex: -1
                }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function() {
                    return t("a", this)[0]
                }).attr({
                    role: "presentation",
                    tabIndex: -1
                }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = t(), this.anchors.each(function(i, s) {
                    var n, o, a, r = t(s).uniqueId().attr("id"),
                        l = t(s).closest("li"),
                        h = l.attr("aria-controls");
                    e._isLocal(s) ? (n = s.hash, a = n.substring(1), o = e.element.find(e._sanitizeSelector(n))) : (a = l.attr("aria-controls") || t({}).uniqueId()[0].id, n = "#" + a, o = e.element.find(n), o.length || (o = e._createPanel(a), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), h && l.data("ui-tabs-aria-controls", h), l.attr({
                        "aria-controls": a,
                        "aria-labelledby": r
                    }), o.attr("aria-labelledby", r)
                }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)))
            },
            _getList: function() {
                return this.tablist || this.element.find("ol, ul").eq(0)
            },
            _createPanel: function(e) {
                return t("<div>").attr("id", e).data("ui-tabs-destroy", !0)
            },
            _setOptionDisabled: function(e) {
                var i, s, n;
                for (t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1), n = 0; s = this.tabs[n]; n++) i = t(s), e === !0 || t.inArray(n, e) !== -1 ? (i.attr("aria-disabled", "true"), this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"), this._removeClass(i, null, "ui-state-disabled"));
                this.options.disabled = e, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, e === !0)
            },
            _setupEvents: function(e) {
                var i = {};
                e && t.each(e.split(" "), function(t, e) {
                    i[e] = "_eventHandler"
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                    click: function(t) {
                        t.preventDefault()
                    }
                }), this._on(this.anchors, i), this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }), this._on(this.panels, {
                    keydown: "_panelKeydown"
                }), this._focusable(this.tabs), this._hoverable(this.tabs)
            },
            _setupHeightStyle: function(e) {
                var i, s = this.element.parent();
                "fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                    var e = t(this),
                        s = e.css("position");
                    "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function() {
                    i -= t(this).outerHeight(!0)
                }), this.panels.each(function() {
                    t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
                }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                    i = Math.max(i, t(this).height("").height())
                }).height(i))
            },
            _eventHandler: function(e) {
                var i = this.options,
                    s = this.active,
                    n = t(e.currentTarget),
                    o = n.closest("li"),
                    a = o[0] === s[0],
                    r = a && i.collapsible,
                    l = r ? t() : this._getPanelForTab(o),
                    h = s.length ? this._getPanelForTab(s) : t(),
                    c = {
                        oldTab: s,
                        oldPanel: h,
                        newTab: r ? t() : o,
                        newPanel: l
                    };
                e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = !r && this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), h.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(o), e), this._toggle(e, c))
            },
            _toggle: function(e, i) {
                function s() {
                    o.running = !1, o._trigger("activate", e, i)
                }

                function n() {
                    o._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), a.length && o.options.show ? o._show(a, o.options.show, s) : (a.show(), s())
                }
                var o = this,
                    a = i.newPanel,
                    r = i.oldPanel;
                this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
                    o._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), n()
                }) : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), r.hide(), n()), r.attr("aria-hidden", "true"), i.oldTab.attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
                    return 0 === t(this).attr("tabIndex")
                }).attr("tabIndex", -1), a.attr("aria-hidden", "false"), i.newTab.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _activate: function(e) {
                var i, s = this._findActive(e);
                s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: t.noop
                }))
            },
            _findActive: function(e) {
                return e === !1 ? t() : this.tabs.eq(e)
            },
            _getIndex: function(e) {
                return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + t.ui.escapeSelector(e) + "']"))), e
            },
            _destroy: function() {
                this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                    t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
                }), this.tabs.each(function() {
                    var e = t(this),
                        i = e.data("ui-tabs-aria-controls");
                    i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
                }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
            },
            enable: function(e) {
                var i = this.options.disabled;
                i !== !1 && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i, function(t) {
                    return t !== e ? t : null
                }) : t.map(this.tabs, function(t, i) {
                    return i !== e ? i : null
                })), this._setOptionDisabled(i))
            },
            disable: function(e) {
                var i = this.options.disabled;
                if (i !== !0) {
                    if (void 0 === e) i = !0;
                    else {
                        if (e = this._getIndex(e), t.inArray(e, i) !== -1) return;
                        i = t.isArray(i) ? t.merge([e], i).sort() : [e]
                    }
                    this._setOptionDisabled(i)
                }
            },
            load: function(e, i) {
                e = this._getIndex(e);
                var s = this,
                    n = this.tabs.eq(e),
                    o = n.find(".ui-tabs-anchor"),
                    a = this._getPanelForTab(n),
                    r = {
                        tab: n,
                        panel: a
                    },
                    l = function(t, e) {
                        "abort" === e && s.panels.stop(!1, !0), s._removeClass(n, "ui-tabs-loading"), a.removeAttr("aria-busy"), t === s.xhr && delete s.xhr
                    };
                this._isLocal(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(n, "ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.done(function(t, e, n) {
                    setTimeout(function() {
                        a.html(t), s._trigger("load", i, r), l(n, e)
                    }, 1)
                }).fail(function(t, e) {
                    setTimeout(function() {
                        l(t, e)
                    }, 1)
                })))
            },
            _ajaxSettings: function(e, i, s) {
                var n = this;
                return {
                    url: e.attr("href"),
                    beforeSend: function(e, o) {
                        return n._trigger("beforeLoad", i, t.extend({
                            jqXHR: e,
                            ajaxSettings: o
                        }, s))
                    }
                }
            },
            _getPanelForTab: function(e) {
                var i = t(e).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + i))
            }
        }), t.uiBackCompat !== !1 && t.widget("ui.tabs", t.ui.tabs, {
            _processTabs: function() {
                this._superApply(arguments), this._addClass(this.tabs, "ui-tab")
            }
        });
        t.ui.tabs;
        t.widget("ui.tooltip", {
            version: "1.12.0",
            options: {
                classes: {
                    "ui-tooltip": "ui-corner-all ui-widget-shadow"
                },
                content: function() {
                    var e = t(this).attr("title") || "";
                    return t("<a>").text(e).html()
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                track: !1,
                close: null,
                open: null
            },
            _addDescribedBy: function(e, i) {
                var s = (e.attr("aria-describedby") || "").split(/\s+/);
                s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")))
            },
            _removeDescribedBy: function(e) {
                var i = e.data("ui-tooltip-id"),
                    s = (e.attr("aria-describedby") || "").split(/\s+/),
                    n = t.inArray(i, s);
                n !== -1 && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby")
            },
            _create: function() {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                }), this.tooltips = {}, this.parents = {}, this.liveRegion = t("<div>").attr({
                    role: "log",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = t([])
            },
            _setOption: function(e, i) {
                var s = this;
                this._super(e, i), "content" === e && t.each(this.tooltips, function(t, e) {
                    s._updateContent(e.element)
                })
            },
            _setOptionDisabled: function(t) {
                this[t ? "_disable" : "_enable"]()
            },
            _disable: function() {
                var e = this;
                t.each(this.tooltips, function(i, s) {
                    var n = t.Event("blur");
                    n.target = n.currentTarget = s.element[0], e.close(n, !0)
                }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
                    var e = t(this);
                    if (e.is("[title]")) return e.data("ui-tooltip-title", e.attr("title")).removeAttr("title")
                }))
            },
            _enable: function() {
                this.disabledTitles.each(function() {
                    var e = t(this);
                    e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
                }), this.disabledTitles = t([])
            },
            open: function(e) {
                var i = this,
                    s = t(e ? e.target : this.element).closest(this.options.items);
                s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function() {
                    var e, s = t(this);
                    s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {
                        element: this,
                        title: s.attr("title")
                    }, s.attr("title", ""))
                }), this._registerCloseHandlers(e, s), this._updateContent(s, e))
            },
            _updateContent: function(t, e) {
                var i, s = this.options.content,
                    n = this,
                    o = e ? e.type : null;
                return "string" == typeof s || s.nodeType || s.jquery ? this._open(e, t, s) : (i = s.call(t[0], function(i) {
                    n._delay(function() {
                        t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i))
                    })
                }), void(i && this._open(e, t, i)))
            },
            _open: function(e, i, s) {
                function n(t) {
                    h.of = t, a.is(":hidden") || a.position(h)
                }
                var o, a, r, l, h = t.extend({}, this.options.position);
                if (s) {
                    if (o = this._find(i)) return void o.tooltip.find(".ui-tooltip-content").html(s);
                    i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), a = o.tooltip, this._addDescribedBy(i, a.attr("id")), a.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), l = t("<div>").html(a.find(".ui-tooltip-content").html()), l.removeAttr("name").find("[name]").removeAttr("name"), l.removeAttr("id").find("[id]").removeAttr("id"), l.appendTo(this.liveRegion), this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, {
                        mousemove: n
                    }), n(e)) : a.position(t.extend({
                        of: i
                    }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.track && this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function() {
                        a.is(":visible") && (n(h.of), clearInterval(r))
                    }, t.fx.interval)), this._trigger("open", e, {
                        tooltip: a
                    })
                }
            },
            _registerCloseHandlers: function(e, i) {
                var s = {
                    keyup: function(e) {
                        if (e.keyCode === t.ui.keyCode.ESCAPE) {
                            var s = t.Event(e);
                            s.currentTarget = i[0], this.close(s, !0)
                        }
                    }
                };
                i[0] !== this.element[0] && (s.remove = function() {
                    this._removeTooltip(this._find(i).tooltip)
                }), e && "mouseover" !== e.type || (s.mouseleave = "close"), e && "focusin" !== e.type || (s.focusout = "close"), this._on(!0, i, s)
            },
            close: function(e) {
                var i, s = this,
                    n = t(e ? e.currentTarget : this.element),
                    o = this._find(n);
                return o ? (i = o.tooltip, void(o.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function() {
                    s._removeTooltip(t(this))
                }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
                    t(i.element).attr("title", i.title), delete s.parents[e]
                }), o.closing = !0, this._trigger("close", e, {
                    tooltip: i
                }), o.hiding || (o.closing = !1)))) : void n.removeData("ui-tooltip-open")
            },
            _tooltip: function(e) {
                var i = t("<div>").attr("role", "tooltip"),
                    s = t("<div>").appendTo(i),
                    n = i.uniqueId().attr("id");
                return this._addClass(s, "ui-tooltip-content"), this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"), i.appendTo(this._appendTo(e)), this.tooltips[n] = {
                    element: e,
                    tooltip: i
                }
            },
            _find: function(t) {
                var e = t.data("ui-tooltip-id");
                return e ? this.tooltips[e] : null
            },
            _removeTooltip: function(t) {
                t.remove(), delete this.tooltips[t.attr("id")]
            },
            _appendTo: function(t) {
                var e = t.closest(".ui-front, dialog");
                return e.length || (e = this.document[0].body), e
            },
            _destroy: function() {
                var e = this;
                t.each(this.tooltips, function(i, s) {
                    var n = t.Event("blur"),
                        o = s.element;
                    n.target = n.currentTarget = o[0], e.close(n, !0), t("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"))
                }), this.liveRegion.remove()
            }
        }), t.uiBackCompat !== !1 && t.widget("ui.tooltip", t.ui.tooltip, {
            options: {
                tooltipClass: null
            },
            _tooltip: function() {
                var t = this._superApply(arguments);
                return this.options.tooltipClass && t.tooltip.addClass(this.options.tooltipClass), t
            }
        });
        var f = (t.ui.tooltip, "ui-effects-"),
            g = "ui-effects-style",
            m = "ui-effects-animated",
            v = t;
        t.effects = {
                effect: {}
            },
            function(t, e) {
                function i(t, e, i) {
                    var s = d[e.type] || {};
                    return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : s.max < t ? s.max : t)
                }

                function s(e) {
                    var i = h(),
                        s = i._rgba = [];
                    return e = e.toLowerCase(), f(l, function(t, n) {
                        var o, a = n.re.exec(e),
                            r = a && n.parse(a),
                            l = n.space || "rgba";
                        if (r) return o = i[l](r), i[c[l].cache] = o[c[l].cache], s = i._rgba = o._rgba, !1
                    }), s.length ? ("0,0,0,0" === s.join() && t.extend(s, o.transparent), i) : o[e]
                }

                function n(t, e, i) {
                    return i = (i + 1) % 1, 6 * i < 1 ? t + (e - t) * i * 6 : 2 * i < 1 ? e : 3 * i < 2 ? t + (e - t) * (2 / 3 - i) * 6 : t
                }
                var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    r = /^([\-+])=\s*(\d+\.?\d*)/,
                    l = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [t[1], t[2], t[3], t[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(t) {
                            return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(t) {
                            return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(t) {
                            return [t[1], t[2] / 100, t[3] / 100, t[4]]
                        }
                    }],
                    h = t.Color = function(e, i, s, n) {
                        return new t.Color.fn.parse(e, i, s, n)
                    },
                    c = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    d = {
                        "byte": {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    u = h.support = {},
                    p = t("<p>")[0],
                    f = t.each;
                p.style.cssText = "background-color:rgba(1,1,1,.5)", u.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t, e) {
                    e.cache = "_" + t, e.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), h.fn = t.extend(h.prototype, {
                    parse: function(n, a, r, l) {
                        if (n === e) return this._rgba = [null, null, null, null], this;
                        (n.jquery || n.nodeType) && (n = t(n).css(a), a = e);
                        var d = this,
                            u = t.type(n),
                            p = this._rgba = [];
                        return a !== e && (n = [n, a, r, l], u = "array"), "string" === u ? this.parse(s(n) || o._default) : "array" === u ? (f(c.rgba.props, function(t, e) {
                            p[e.idx] = i(n[e.idx], e)
                        }), this) : "object" === u ? (n instanceof h ? f(c, function(t, e) {
                            n[e.cache] && (d[e.cache] = n[e.cache].slice())
                        }) : f(c, function(e, s) {
                            var o = s.cache;
                            f(s.props, function(t, e) {
                                if (!d[o] && s.to) {
                                    if ("alpha" === t || null == n[t]) return;
                                    d[o] = s.to(d._rgba)
                                }
                                d[o][e.idx] = i(n[t], e, !0)
                            }), d[o] && t.inArray(null, d[o].slice(0, 3)) < 0 && (d[o][3] = 1, s.from && (d._rgba = s.from(d[o])))
                        }), this) : void 0
                    },
                    is: function(t) {
                        var e = h(t),
                            i = !0,
                            s = this;
                        return f(c, function(t, n) {
                            var o, a = e[n.cache];
                            return a && (o = s[n.cache] || n.to && n.to(s._rgba) || [], f(n.props, function(t, e) {
                                if (null != a[e.idx]) return i = a[e.idx] === o[e.idx]
                            })), i
                        }), i
                    },
                    _space: function() {
                        var t = [],
                            e = this;
                        return f(c, function(i, s) {
                            e[s.cache] && t.push(i)
                        }), t.pop()
                    },
                    transition: function(t, e) {
                        var s = h(t),
                            n = s._space(),
                            o = c[n],
                            a = 0 === this.alpha() ? h("transparent") : this,
                            r = a[o.cache] || o.to(a._rgba),
                            l = r.slice();
                        return s = s[o.cache], f(o.props, function(t, n) {
                            var o = n.idx,
                                a = r[o],
                                h = s[o],
                                c = d[n.type] || {};
                            null !== h && (null === a ? l[o] = h : (c.mod && (h - a > c.mod / 2 ? a += c.mod : a - h > c.mod / 2 && (a -= c.mod)), l[o] = i((h - a) * e + a, n)))
                        }), this[n](l)
                    },
                    blend: function(e) {
                        if (1 === this._rgba[3]) return this;
                        var i = this._rgba.slice(),
                            s = i.pop(),
                            n = h(e)._rgba;
                        return h(t.map(i, function(t, e) {
                            return (1 - s) * n[e] + s * t
                        }))
                    },
                    toRgbaString: function() {
                        var e = "rgba(",
                            i = t.map(this._rgba, function(t, e) {
                                return null == t ? e > 2 ? 1 : 0 : t
                            });
                        return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                    },
                    toHslaString: function() {
                        var e = "hsla(",
                            i = t.map(this.hsla(), function(t, e) {
                                return null == t && (t = e > 2 ? 1 : 0), e && e < 3 && (t = Math.round(100 * t) + "%"), t
                            });
                        return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                    },
                    toHexString: function(e) {
                        var i = this._rgba.slice(),
                            s = i.pop();
                        return e && i.push(~~(255 * s)), "#" + t.map(i, function(t) {
                            return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                        }).join("")
                    },
                    toString: function() {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), h.fn.parse.prototype = h.fn, c.hsla.to = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e, i, s = t[0] / 255,
                        n = t[1] / 255,
                        o = t[2] / 255,
                        a = t[3],
                        r = Math.max(s, n, o),
                        l = Math.min(s, n, o),
                        h = r - l,
                        c = r + l,
                        d = .5 * c;
                    return e = l === r ? 0 : s === r ? 60 * (n - o) / h + 360 : n === r ? 60 * (o - s) / h + 120 : 60 * (s - n) / h + 240, i = 0 === h ? 0 : d <= .5 ? h / c : h / (2 - c), [Math.round(e) % 360, i, d, null == a ? 1 : a]
                }, c.hsla.from = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e = t[0] / 360,
                        i = t[1],
                        s = t[2],
                        o = t[3],
                        a = s <= .5 ? s * (1 + i) : s + i - s * i,
                        r = 2 * s - a;
                    return [Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o]
                }, f(c, function(s, n) {
                    var o = n.props,
                        a = n.cache,
                        l = n.to,
                        c = n.from;
                    h.fn[s] = function(s) {
                        if (l && !this[a] && (this[a] = l(this._rgba)), s === e) return this[a].slice();
                        var n, r = t.type(s),
                            d = "array" === r || "object" === r ? s : arguments,
                            u = this[a].slice();
                        return f(o, function(t, e) {
                            var s = d["object" === r ? t : e.idx];
                            null == s && (s = u[e.idx]), u[e.idx] = i(s, e)
                        }), c ? (n = h(c(u)), n[a] = u, n) : h(u)
                    }, f(o, function(e, i) {
                        h.fn[e] || (h.fn[e] = function(n) {
                            var o, a = t.type(n),
                                l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s,
                                h = this[l](),
                                c = h[i.idx];
                            return "undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), h[i.idx] = n, this[l](h)))
                        })
                    })
                }), h.hook = function(e) {
                    var i = e.split(" ");
                    f(i, function(e, i) {
                        t.cssHooks[i] = {
                            set: function(e, n) {
                                var o, a, r = "";
                                if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
                                    if (n = h(o || n), !u.rgba && 1 !== n._rgba[3]) {
                                        for (a = "backgroundColor" === i ? e.parentNode : e;
                                            ("" === r || "transparent" === r) && a && a.style;) try {
                                            r = t.css(a, "backgroundColor"), a = a.parentNode
                                        } catch (l) {}
                                        n = n.blend(r && "transparent" !== r ? r : "_default")
                                    }
                                    n = n.toRgbaString()
                                }
                                try {
                                    e.style[i] = n
                                } catch (l) {}
                            }
                        }, t.fx.step[i] = function(e) {
                            e.colorInit || (e.start = h(e.elem, i), e.end = h(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                        }
                    })
                }, h.hook(a), t.cssHooks.borderColor = {
                    expand: function(t) {
                        var e = {};
                        return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
                            e["border" + s + "Color"] = t
                        }), e
                    }
                }, o = t.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(v),
            function() {
                function e(e) {
                    var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                        o = {};
                    if (n && n.length && n[0] && n[n[0]])
                        for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]);
                    else
                        for (i in n) "string" == typeof n[i] && (o[i] = n[i]);
                    return o
                }

                function i(e, i) {
                    var s, o, a = {};
                    for (s in i) o = i[s], e[s] !== o && (n[s] || !t.fx.step[s] && isNaN(parseFloat(o)) || (a[s] = o));
                    return a
                }
                var s = ["add", "remove", "toggle"],
                    n = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
                    t.fx.step[i] = function(t) {
                        ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (v.style(t.elem, i, t.end), t.setAttr = !0)
                    }
                }), t.fn.addBack || (t.fn.addBack = function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }), t.effects.animateClass = function(n, o, a, r) {
                    var l = t.speed(o, a, r);
                    return this.queue(function() {
                        var o, a = t(this),
                            r = a.attr("class") || "",
                            h = l.children ? a.find("*").addBack() : a;
                        h = h.map(function() {
                            var i = t(this);
                            return {
                                el: i,
                                start: e(this)
                            }
                        }), o = function() {
                            t.each(s, function(t, e) {
                                n[e] && a[e + "Class"](n[e])
                            })
                        }, o(), h = h.map(function() {
                            return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this
                        }), a.attr("class", r), h = h.map(function() {
                            var e = this,
                                i = t.Deferred(),
                                s = t.extend({}, l, {
                                    queue: !1,
                                    complete: function() {
                                        i.resolve(e)
                                    }
                                });
                            return this.el.animate(this.diff, s), i.promise()
                        }), t.when.apply(t, h.get()).done(function() {
                            o(), t.each(arguments, function() {
                                var e = this.el;
                                t.each(this.diff, function(t) {
                                    e.css(t, "")
                                })
                            }), l.complete.call(a[0])
                        })
                    })
                }, t.fn.extend({
                    addClass: function(e) {
                        return function(i, s, n, o) {
                            return s ? t.effects.animateClass.call(this, {
                                add: i
                            }, s, n, o) : e.apply(this, arguments)
                        }
                    }(t.fn.addClass),
                    removeClass: function(e) {
                        return function(i, s, n, o) {
                            return arguments.length > 1 ? t.effects.animateClass.call(this, {
                                remove: i
                            }, s, n, o) : e.apply(this, arguments)
                        }
                    }(t.fn.removeClass),
                    toggleClass: function(e) {
                        return function(i, s, n, o, a) {
                            return "boolean" == typeof s || void 0 === s ? n ? t.effects.animateClass.call(this, s ? {
                                add: i
                            } : {
                                remove: i
                            }, n, o, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, {
                                toggle: i
                            }, s, n, o)
                        }
                    }(t.fn.toggleClass),
                    switchClass: function(e, i, s, n, o) {
                        return t.effects.animateClass.call(this, {
                            add: i,
                            remove: e
                        }, s, n, o)
                    }
                })
            }(),
            function() {
                function e(e, i, s, n) {
                    return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                        effect: e
                    }, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
                }

                function i(e) {
                    return !(e && "number" != typeof e && !t.fx.speeds[e]) || ("string" == typeof e && !t.effects.effect[e] || (!!t.isFunction(e) || "object" == typeof e && !e.effect))
                }

                function s(t, e) {
                    var i = e.outerWidth(),
                        s = e.outerHeight(),
                        n = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
                        o = n.exec(t) || ["", 0, i, s, 0];
                    return {
                        top: parseFloat(o[1]) || 0,
                        right: "auto" === o[2] ? i : parseFloat(o[2]),
                        bottom: "auto" === o[3] ? s : parseFloat(o[3]),
                        left: parseFloat(o[4]) || 0
                    }
                }
                t.expr && t.expr.filters && t.expr.filters.animated && (t.expr.filters.animated = function(e) {
                    return function(i) {
                        return !!t(i).data(m) || e(i)
                    }
                }(t.expr.filters.animated)), t.uiBackCompat !== !1 && t.extend(t.effects, {
                    save: function(t, e) {
                        for (var i = 0, s = e.length; i < s; i++) null !== e[i] && t.data(f + e[i], t[0].style[e[i]])
                    },
                    restore: function(t, e) {
                        for (var i, s = 0, n = e.length; s < n; s++) null !== e[s] && (i = t.data(f + e[s]), t.css(e[s], i))
                    },
                    setMode: function(t, e) {
                        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                    },
                    createWrapper: function(e) {
                        if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                        var i = {
                                width: e.outerWidth(!0),
                                height: e.outerHeight(!0),
                                "float": e.css("float")
                            },
                            s = t("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            n = {
                                width: e.width(),
                                height: e.height()
                            },
                            o = document.activeElement;
                        try {
                            o.id
                        } catch (a) {
                            o = document.body
                        }
                        return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"), s = e.parent(), "static" === e.css("position") ? (s.css({
                            position: "relative"
                        }), e.css({
                            position: "relative"
                        })) : (t.extend(i, {
                            position: e.css("position"),
                            zIndex: e.css("z-index")
                        }), t.each(["top", "left", "bottom", "right"], function(t, s) {
                            i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                        }), e.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), e.css(n), s.css(i).show()
                    },
                    removeWrapper: function(e) {
                        var i = document.activeElement;
                        return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).trigger("focus")), e
                    }
                }), t.extend(t.effects, {
                    version: "1.12.0",
                    define: function(e, i, s) {
                        return s || (s = i, i = "effect"), t.effects.effect[e] = s, t.effects.effect[e].mode = i, s
                    },
                    scaledDimensions: function(t, e, i) {
                        if (0 === e) return {
                            height: 0,
                            width: 0,
                            outerHeight: 0,
                            outerWidth: 0
                        };
                        var s = "horizontal" !== i ? (e || 100) / 100 : 1,
                            n = "vertical" !== i ? (e || 100) / 100 : 1;
                        return {
                            height: t.height() * n,
                            width: t.width() * s,
                            outerHeight: t.outerHeight() * n,
                            outerWidth: t.outerWidth() * s
                        }
                    },
                    clipToBox: function(t) {
                        return {
                            width: t.clip.right - t.clip.left,
                            height: t.clip.bottom - t.clip.top,
                            left: t.clip.left,
                            top: t.clip.top
                        }
                    },
                    unshift: function(t, e, i) {
                        var s = t.queue();
                        e > 1 && s.splice.apply(s, [1, 0].concat(s.splice(e, i))), t.dequeue()
                    },
                    saveStyle: function(t) {
                        t.data(g, t[0].style.cssText)
                    },
                    restoreStyle: function(t) {
                        t[0].style.cssText = t.data(g) || "", t.removeData(g)
                    },
                    mode: function(t, e) {
                        var i = t.is(":hidden");
                        return "toggle" === e && (e = i ? "show" : "hide"), (i ? "hide" === e : "show" === e) && (e = "none"), e
                    },
                    getBaseline: function(t, e) {
                        var i, s;
                        switch (t[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = .5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = t[0] / e.height
                        }
                        switch (t[1]) {
                            case "left":
                                s = 0;
                                break;
                            case "center":
                                s = .5;
                                break;
                            case "right":
                                s = 1;
                                break;
                            default:
                                s = t[1] / e.width
                        }
                        return {
                            x: s,
                            y: i
                        }
                    },
                    createPlaceholder: function(e) {
                        var i, s = e.css("position"),
                            n = e.position();
                        return e.css({
                            marginTop: e.css("marginTop"),
                            marginBottom: e.css("marginBottom"),
                            marginLeft: e.css("marginLeft"),
                            marginRight: e.css("marginRight")
                        }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()), /^(static|relative)/.test(s) && (s = "absolute", i = t("<" + e[0].nodeName + ">").insertAfter(e).css({
                            display: /^(inline|ruby)/.test(e.css("display")) ? "inline-block" : "block",
                            visibility: "hidden",
                            marginTop: e.css("marginTop"),
                            marginBottom: e.css("marginBottom"),
                            marginLeft: e.css("marginLeft"),
                            marginRight: e.css("marginRight"),
                            "float": e.css("float")
                        }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"), e.data(f + "placeholder", i)), e.css({
                            position: s,
                            left: n.left,
                            top: n.top
                        }), i
                    },
                    removePlaceholder: function(t) {
                        var e = f + "placeholder",
                            i = t.data(e);
                        i && (i.remove(), t.removeData(e))
                    },
                    cleanUp: function(e) {
                        t.effects.restoreStyle(e), t.effects.removePlaceholder(e)
                    },
                    setTransition: function(e, i, s, n) {
                        return n = n || {}, t.each(i, function(t, i) {
                            var o = e.cssUnit(i);
                            o[0] > 0 && (n[i] = o[0] * s + o[1])
                        }), n
                    }
                }), t.fn.extend({
                    effect: function() {
                        function i(e) {
                            function i() {
                                r.removeData(m), t.effects.cleanUp(r), "hide" === s.mode && r.hide(), a()
                            }

                            function a() {
                                t.isFunction(l) && l.call(r[0]), t.isFunction(e) && e()
                            }
                            var r = t(this);
                            s.mode = c.shift(), t.uiBackCompat === !1 || o ? "none" === s.mode ? (r[h](), a()) : n.call(r[0], s, i) : (r.is(":hidden") ? "hide" === h : "show" === h) ? (r[h](), a()) : n.call(r[0], s, a)
                        }
                        var s = e.apply(this, arguments),
                            n = t.effects.effect[s.effect],
                            o = n.mode,
                            a = s.queue,
                            r = a || "fx",
                            l = s.complete,
                            h = s.mode,
                            c = [],
                            d = function(e) {
                                var i = t(this),
                                    s = t.effects.mode(i, h) || o;
                                i.data(m, !0), c.push(s), o && ("show" === s || s === o && "hide" === s) && i.show(), o && "none" === s || t.effects.saveStyle(i), t.isFunction(e) && e()
                            };
                        return t.fx.off || !n ? h ? this[h](s.duration, l) : this.each(function() {
                            l && l.call(this)
                        }) : a === !1 ? this.each(d).each(i) : this.queue(r, d).queue(r, i)
                    },
                    show: function(t) {
                        return function(s) {
                            if (i(s)) return t.apply(this, arguments);
                            var n = e.apply(this, arguments);
                            return n.mode = "show", this.effect.call(this, n)
                        }
                    }(t.fn.show),
                    hide: function(t) {
                        return function(s) {
                            if (i(s)) return t.apply(this, arguments);
                            var n = e.apply(this, arguments);
                            return n.mode = "hide", this.effect.call(this, n)
                        }
                    }(t.fn.hide),
                    toggle: function(t) {
                        return function(s) {
                            if (i(s) || "boolean" == typeof s) return t.apply(this, arguments);
                            var n = e.apply(this, arguments);
                            return n.mode = "toggle", this.effect.call(this, n)
                        }
                    }(t.fn.toggle),
                    cssUnit: function(e) {
                        var i = this.css(e),
                            s = [];
                        return t.each(["em", "px", "%", "pt"], function(t, e) {
                            i.indexOf(e) > 0 && (s = [parseFloat(i), e])
                        }), s
                    },
                    cssClip: function(t) {
                        return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : s(this.css("clip"), this)
                    },
                    transfer: function(e, i) {
                        var s = t(this),
                            n = t(e.to),
                            o = "fixed" === n.css("position"),
                            a = t("body"),
                            r = o ? a.scrollTop() : 0,
                            l = o ? a.scrollLeft() : 0,
                            h = n.offset(),
                            c = {
                                top: h.top - r,
                                left: h.left - l,
                                height: n.innerHeight(),
                                width: n.innerWidth()
                            },
                            d = s.offset(),
                            u = t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({
                                top: d.top - r,
                                left: d.left - l,
                                height: s.innerHeight(),
                                width: s.innerWidth(),
                                position: o ? "fixed" : "absolute"
                            }).animate(c, e.duration, e.easing, function() {
                                u.remove(), t.isFunction(i) && i()
                            })
                    }
                }), t.fx.step.clip = function(e) {
                    e.clipInit || (e.start = t(e.elem).cssClip(), "string" == typeof e.end && (e.end = s(e.end, e.elem)), e.clipInit = !0), t(e.elem).cssClip({
                        top: e.pos * (e.end.top - e.start.top) + e.start.top,
                        right: e.pos * (e.end.right - e.start.right) + e.start.right,
                        bottom: e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom,
                        left: e.pos * (e.end.left - e.start.left) + e.start.left
                    })
                }
            }(),
            function() {
                var e = {};
                t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                    e[i] = function(e) {
                        return Math.pow(e, t + 2)
                    }
                }), t.extend(e, {
                    Sine: function(t) {
                        return 1 - Math.cos(t * Math.PI / 2)
                    },
                    Circ: function(t) {
                        return 1 - Math.sqrt(1 - t * t)
                    },
                    Elastic: function(t) {
                        return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(t) {
                        return t * t * (3 * t - 2)
                    },
                    Bounce: function(t) {
                        for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                    }
                }), t.each(e, function(e, i) {
                    t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                        return 1 - i(1 - t)
                    }, t.easing["easeInOut" + e] = function(t) {
                        return t < .5 ? i(2 * t) / 2 : 1 - i(t * -2 + 2) / 2
                    }
                })
            }();
        var b, b = t.effects;
        t.effects.define("blind", "hide", function(e, i) {
            var s = {
                    up: ["bottom", "top"],
                    vertical: ["bottom", "top"],
                    down: ["top", "bottom"],
                    left: ["right", "left"],
                    horizontal: ["right", "left"],
                    right: ["left", "right"]
                },
                n = t(this),
                o = e.direction || "up",
                a = n.cssClip(),
                r = {
                    clip: t.extend({}, a)
                },
                l = t.effects.createPlaceholder(n);
            r.clip[s[o][0]] = r.clip[s[o][1]], "show" === e.mode && (n.cssClip(r.clip), l && l.css(t.effects.clipToBox(r)), r.clip = a), l && l.animate(t.effects.clipToBox(r), e.duration, e.easing), n.animate(r, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("clip", "hide", function(e, i) {
            var s, n = {},
                o = t(this),
                a = e.direction || "vertical",
                r = "both" === a,
                l = r || "horizontal" === a,
                h = r || "vertical" === a;
            s = o.cssClip(), n.clip = {
                top: h ? (s.bottom - s.top) / 2 : s.top,
                right: l ? (s.right - s.left) / 2 : s.right,
                bottom: h ? (s.bottom - s.top) / 2 : s.bottom,
                left: l ? (s.right - s.left) / 2 : s.left
            }, t.effects.createPlaceholder(o), "show" === e.mode && (o.cssClip(n.clip), n.clip = s), o.animate(n, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("drop", "hide", function(e, i) {
            var s, n = t(this),
                o = e.mode,
                a = "show" === o,
                r = e.direction || "left",
                l = "up" === r || "down" === r ? "top" : "left",
                h = "up" === r || "left" === r ? "-=" : "+=",
                c = "+=" === h ? "-=" : "+=",
                d = {
                    opacity: 0
                };
            t.effects.createPlaceholder(n), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, d[l] = h + s, a && (n.css(d), d[l] = c + s, d.opacity = 1), n.animate(d, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("fade", "toggle", function(e, i) {
            var s = "show" === e.mode;
            t(this).css("opacity", s ? 0 : 1).animate({
                opacity: s ? 1 : 0
            }, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }), t.effects.define("fold", "hide", function(e, i) {
            var s = t(this),
                n = e.mode,
                o = "show" === n,
                a = "hide" === n,
                r = e.size || 15,
                l = /([0-9]+)%/.exec(r),
                h = !!e.horizFirst,
                c = h ? ["right", "bottom"] : ["bottom", "right"],
                d = e.duration / 2,
                u = t.effects.createPlaceholder(s),
                p = s.cssClip(),
                f = {
                    clip: t.extend({}, p)
                },
                g = {
                    clip: t.extend({}, p)
                },
                m = [p[c[0]], p[c[1]]],
                v = s.queue().length;
            l && (r = parseInt(l[1], 10) / 100 * m[a ? 0 : 1]), f.clip[c[0]] = r, g.clip[c[0]] = r, g.clip[c[1]] = 0, o && (s.cssClip(g.clip), u && u.css(t.effects.clipToBox(g)), g.clip = p), s.queue(function(i) {
                u && u.animate(t.effects.clipToBox(f), d, e.easing).animate(t.effects.clipToBox(g), d, e.easing), i()
            }).animate(f, d, e.easing).animate(g, d, e.easing).queue(i), t.effects.unshift(s, v, 4)
        }), t.effects.define("size", function(e, i) {
            var s, n, o, a = t(this),
                r = ["fontSize"],
                l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                c = e.mode,
                d = "effect" !== c,
                u = e.scale || "both",
                p = e.origin || ["middle", "center"],
                f = a.css("position"),
                g = a.position(),
                m = t.effects.scaledDimensions(a),
                v = e.from || m,
                b = e.to || t.effects.scaledDimensions(a, 0);
            t.effects.createPlaceholder(a), "show" === c && (o = v, v = b, b = o), n = {
                from: {
                    y: v.height / m.height,
                    x: v.width / m.width
                },
                to: {
                    y: b.height / m.height,
                    x: b.width / m.width
                }
            }, "box" !== u && "both" !== u || (n.from.y !== n.to.y && (v = t.effects.setTransition(a, l, n.from.y, v), b = t.effects.setTransition(a, l, n.to.y, b)), n.from.x !== n.to.x && (v = t.effects.setTransition(a, h, n.from.x, v), b = t.effects.setTransition(a, h, n.to.x, b))), "content" !== u && "both" !== u || n.from.y !== n.to.y && (v = t.effects.setTransition(a, r, n.from.y, v), b = t.effects.setTransition(a, r, n.to.y, b)), p && (s = t.effects.getBaseline(p, m), v.top = (m.outerHeight - v.outerHeight) * s.y + g.top, v.left = (m.outerWidth - v.outerWidth) * s.x + g.left, b.top = (m.outerHeight - b.outerHeight) * s.y + g.top, b.left = (m.outerWidth - b.outerWidth) * s.x + g.left), a.css(v), "content" !== u && "both" !== u || (l = l.concat(["marginTop", "marginBottom"]).concat(r), h = h.concat(["marginLeft", "marginRight"]), a.find("*[width]").each(function() {
                var i = t(this),
                    s = t.effects.scaledDimensions(i),
                    o = {
                        height: s.height * n.from.y,
                        width: s.width * n.from.x,
                        outerHeight: s.outerHeight * n.from.y,
                        outerWidth: s.outerWidth * n.from.x
                    },
                    a = {
                        height: s.height * n.to.y,
                        width: s.width * n.to.x,
                        outerHeight: s.height * n.to.y,
                        outerWidth: s.width * n.to.x
                    };
                n.from.y !== n.to.y && (o = t.effects.setTransition(i, l, n.from.y, o), a = t.effects.setTransition(i, l, n.to.y, a)), n.from.x !== n.to.x && (o = t.effects.setTransition(i, h, n.from.x, o), a = t.effects.setTransition(i, h, n.to.x, a)), d && t.effects.saveStyle(i), i.css(o), i.animate(a, e.duration, e.easing, function() {
                    d && t.effects.restoreStyle(i)
                })
            })), a.animate(b, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    var e = a.offset();
                    0 === b.opacity && a.css("opacity", v.opacity), d || (a.css("position", "static" === f ? "relative" : f).offset(e), t.effects.saveStyle(a)), i()
                }
            })
        }), t.effects.define("scale", function(e, i) {
            var s = t(this),
                n = e.mode,
                o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "effect" !== n ? 0 : 100),
                a = t.extend(!0, {
                    from: t.effects.scaledDimensions(s),
                    to: t.effects.scaledDimensions(s, o, e.direction || "both"),
                    origin: e.origin || ["middle", "center"]
                }, e);
            e.fade && (a.from.opacity = 1, a.to.opacity = 0), t.effects.effect.size.call(this, a, i)
        }), t.effects.define("puff", "hide", function(e, i) {
            var s = t.extend(!0, {}, e, {
                fade: !0,
                percent: parseInt(e.percent, 10) || 150
            });
            t.effects.effect.scale.call(this, s, i)
        }), t.effects.define("slide", "show", function(e, i) {
            var s, n, o = t(this),
                a = {
                    up: ["bottom", "top"],
                    down: ["top", "bottom"],
                    left: ["right", "left"],
                    right: ["left", "right"]
                },
                r = e.mode,
                l = e.direction || "left",
                h = "up" === l || "down" === l ? "top" : "left",
                c = "up" === l || "left" === l,
                d = e.distance || o["top" === h ? "outerHeight" : "outerWidth"](!0),
                u = {};
            t.effects.createPlaceholder(o), s = o.cssClip(), n = o.position()[h], u[h] = (c ? -1 : 1) * d + n, u.clip = o.cssClip(), u.clip[a[l][1]] = u.clip[a[l][0]], "show" === r && (o.cssClip(u.clip), o.css(h, u[h]), u.clip = s, u[h] = n), o.animate(u, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        });
        t.uiBackCompat !== !1 && (b = t.effects.define("transfer", function(e, i) {
            t(this).transfer(e, i)
        }))
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery), + function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {
                end: e[i]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            s = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0
        });
        var n = function() {
            i || t(s).trigger(t.support.transition.end)
        };
        return setTimeout(n, e), this
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.alert");
            n || i.data("bs.alert", n = new s(this)), "string" == typeof e && n[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]',
        s = function(e) {
            t(e).on("click", i, this.close)
        };
    s.VERSION = "3.3.6", s.TRANSITION_DURATION = 150, s.prototype.close = function(e) {
        function i() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var n = t(this),
            o = n.attr("data-target");
        o || (o = n.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(o);
        e && e.preventDefault(), a.length || (a = n.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(s.TRANSITION_DURATION) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = s, t.fn.alert.noConflict = function() {
        return t.fn.alert = n, this
    }, t(document).on("click.bs.alert.data-api", i, s.prototype.close)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.button"),
                o = "object" == typeof e && e;
            n || s.data("bs.button", n = new i(this, o)), "toggle" == e ? n.toggle() : e && n.setState(e)
        })
    }
    var i = function(e, s) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, s), this.isLoading = !1
    };
    i.VERSION = "3.3.6", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function(e) {
        var i = "disabled",
            s = this.$element,
            n = s.is("input") ? "val" : "html",
            o = s.data();
        e += "Text", null == o.resetText && s.data("resetText", s[n]()), setTimeout(t.proxy(function() {
            s[n](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, s.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, s.removeClass(i).removeAttr(i))
        }, this), 0)
    }, i.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var s = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = s, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var s = t(i.target);
        s.hasClass("btn") || (s = s.closest(".btn")), e.call(s, "toggle"), t(i.target).is('input[type="radio"]') || t(i.target).is('input[type="checkbox"]') || i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.carousel"),
                o = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : o.slide;
            n || s.data("bs.carousel", n = new i(this, o)), "number" == typeof e ? n.to(e) : a ? n[a]() : o.interval && n.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
            s = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (s && !this.options.wrap) return e;
        var n = "prev" == t ? -1 : 1,
            o = (i + n) % this.$items.length;
        return this.$items.eq(o)
    }, i.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function(e, s) {
        var n = this.$element.find(".item.active"),
            o = s || this.getItemForDirection(e, n),
            a = this.interval,
            r = "next" == e ? "left" : "right",
            l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var h = o[0],
            c = t.Event("slide.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var d = t(this.$indicators.children()[this.getItemIndex(o)]);
                d && d.addClass("active")
            }
            var u = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, n.addClass(r), o.addClass(r), n.one("bsTransitionEnd", function() {
                o.removeClass([e, r].join(" ")).addClass("active"), n.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(u)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(u)), a && this.cycle(), this
        }
    };
    var s = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = s, this
    };
    var n = function(i) {
        var s, n = t(this),
            o = t(n.attr("data-target") || (s = n.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var a = t.extend({}, o.data(), n.data()),
                r = n.attr("data-slide-to");
            r && (a.interval = !1), e.call(o, a), r && o.data("bs.carousel").to(r), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i, s = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(s)
    }

    function i(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.collapse"),
                o = t.extend({}, s.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && o.toggle && /show|hide/.test(e) && (o.toggle = !1), n || i.data("bs.collapse", n = new s(this, o)), "string" == typeof e && n[e]()
        })
    }
    var s = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, s.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    s.VERSION = "3.3.6", s.TRANSITION_DURATION = 350, s.DEFAULTS = {
        toggle: !0
    }, s.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, s.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return r.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[a](this.$element[0][l])
                }
            }
        }
    }, s.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : n.call(this)
            }
        }
    }, s.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, s.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, s) {
            var n = t(s);
            this.addAriaAndCollapsedClass(e(n), n)
        }, this)).end()
    }, s.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = s, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
        var n = t(this);
        n.attr("data-target") || s.preventDefault();
        var o = e(n),
            a = o.data("bs.collapse"),
            r = a ? "toggle" : n.data();
        i.call(o, r)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var s = i && t(i);
        return s && s.length ? s : e.parent()
    }

    function i(i) {
        i && 3 === i.which || (t(n).remove(), t(o).each(function() {
            var s = t(this),
                n = e(s),
                o = {
                    relatedTarget: this
                };
            n.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(n[0], i.target) || (n.trigger(i = t.Event("hide.bs.dropdown", o)), i.isDefaultPrevented() || (s.attr("aria-expanded", "false"), n.removeClass("open").trigger(t.Event("hidden.bs.dropdown", o)))))
        }))
    }

    function s(e) {
        return this.each(function() {
            var i = t(this),
                s = i.data("bs.dropdown");
            s || i.data("bs.dropdown", s = new a(this)), "string" == typeof e && s[e].call(i)
        })
    }
    var n = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        a = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    a.VERSION = "3.3.6", a.prototype.toggle = function(s) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var o = e(n),
                a = o.hasClass("open");
            if (i(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var r = {
                    relatedTarget: this
                };
                if (o.trigger(s = t.Event("show.bs.dropdown", r)), s.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r))
            }
            return !1
        }
    }, a.prototype.keydown = function(i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var s = t(this);
            if (i.preventDefault(), i.stopPropagation(), !s.is(".disabled, :disabled")) {
                var n = e(s),
                    a = n.hasClass("open");
                if (!a && 27 != i.which || a && 27 == i.which) return 27 == i.which && n.find(o).trigger("focus"), s.trigger("click");
                var r = " li:not(.disabled):visible a",
                    l = n.find(".dropdown-menu" + r);
                if (l.length) {
                    var h = l.index(i.target);
                    38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus")
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = s, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r, this
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery), + function(t) {
    "use strict";

    function e(e, s) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.modal"),
                a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            o || n.data("bs.modal", o = new i(this, a)), "string" == typeof e ? o[e](s) : a.show && o.show(s)
        })
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function(e) {
        var s = this,
            n = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            s.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(s.$element) && (s.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var n = t.support.transition && s.$element.hasClass("fade");
            s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), n && s.$element[0].offsetWidth, s.$element.addClass("in"), s.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? s.$dialog.one("bsTransitionEnd", function() {
                s.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(o)
        }))
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function(e) {
        var s = this,
            n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && n;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                s.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, i.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var s = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = s, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var s = t(this),
            n = s.attr("href"),
            o = t(s.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            a = o.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(n) && n
            }, o.data(), s.data());
        s.is("a") && i.preventDefault(), o.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                s.is(":visible") && s.trigger("focus")
            })
        }), e.call(o, a, this)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.tooltip"),
                o = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || s.data("bs.tooltip", n = new i(this, o)), "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, s) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(s), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), o = n.length; o--;) {
            var a = n[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin",
                    l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, s) {
            i[t] != s && (e[t] = s)
        }), e
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide())
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var s = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !s) return;
            var n = this,
                o = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                h = l.test(r);
            h && (r = r.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var c = this.getPosition(),
                d = o[0].offsetWidth,
                u = o[0].offsetHeight;
            if (h) {
                var p = r,
                    f = this.getPosition(this.$viewport);
                r = "bottom" == r && c.bottom + u > f.bottom ? "top" : "top" == r && c.top - u < f.top ? "bottom" : "right" == r && c.right + d > f.width ? "left" : "left" == r && c.left - d < f.left ? "right" : r, o.removeClass(p).addClass(r)
            }
            var g = this.getCalculatedOffset(r, c, d, u);
            this.applyPlacement(g, r);
            var m = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", m).emulateTransitionEnd(i.TRANSITION_DURATION) : m()
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var s = this.tip(),
            n = s[0].offsetWidth,
            o = s[0].offsetHeight,
            a = parseInt(s.css("margin-top"), 10),
            r = parseInt(s.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top += a, e.left += r, t.offset.setOffset(s[0], t.extend({
            using: function(t) {
                s.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), s.addClass("in");
        var l = s[0].offsetWidth,
            h = s[0].offsetHeight;
        "top" == i && h != o && (e.top = e.top + o - h);
        var c = this.getViewportAdjustedDelta(i, e, l, h);
        c.left ? e.left += c.left : e.top += c.top;
        var d = /top|bottom/.test(i),
            u = d ? 2 * c.left - n + l : 2 * c.top - o + h,
            p = d ? "offsetWidth" : "offsetHeight";
        s.offset(e), this.replaceArrow(u, s[0][p], d)
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function(e) {
        function s() {
            "in" != n.hoverState && o.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e()
        }
        var n = this,
            o = t(this.$tip),
            a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function() {
        return this.getTitle()
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0],
            s = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var o = s ? {
                top: 0,
                left: 0
            } : e.offset(),
            a = {
                scroll: s ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            r = s ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, n, a, r, o)
    }, i.prototype.getCalculatedOffset = function(t, e, i, s) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - s,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - s / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - s / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, s) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - o - a.scroll,
                l = e.top + o - a.scroll + s;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l)
        } else {
            var h = e.left - o,
                c = e.left + o + i;
            h < a.left ? n.left = a.left - h : c > a.right && (n.left = a.left + a.width - c)
        }
        return n
    }, i.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function() {
        this.enabled = !0
    }, i.prototype.disable = function() {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null
        })
    };
    var s = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = s, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.popover"),
                o = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || s.data("bs.popover", n = new i(this, o)), "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.6", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var s = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = s, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(i, s) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, s), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.scrollspy"),
                o = "object" == typeof i && i;
            n || s.data("bs.scrollspy", n = new e(this, o)), "string" == typeof i && n[i]()
        })
    }
    e.VERSION = "3.3.6", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = this,
            i = "offset",
            s = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                n = e.data("target") || e.attr("href"),
                o = /^#./.test(n) && t(n);
            return o && o.length && o.is(":visible") && [
                [o[i]().top + s, n]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            s = this.options.offset + i - this.$scrollElement.height(),
            n = this.offsets,
            o = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= s) return a != (t = o[o.length - 1]) && this.activate(t);
        if (a && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--;) a != o[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            s = t(i).parents("li").addClass("active");
        s.parent(".dropdown-menu").length && (s = s.closest("li.dropdown").addClass("active")), s.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var s = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = s, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.tab");
            n || s.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]()
        })
    }
    var i = function(e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            s = e.data("target");
        if (s || (s = e.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                a = t.Event("show.bs.tab", {
                    relatedTarget: n[0]
                });
            if (n.trigger(o), e.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var r = t(s);
                this.activate(e.closest("li"), i), this.activate(r, r.parent(), function() {
                    n.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function(e, s, n) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n()
        }
        var a = s.find("> .active"),
            r = n && t.support.transition && (a.length && a.hasClass("fade") || !!s.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), a.removeClass("in")
    };
    var s = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = s, this
    };
    var n = function(i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.affix"),
                o = "object" == typeof e && e;
            n || s.data("bs.affix", n = new i(this, o)), "string" == typeof e && n[e]()
        })
    }
    var i = function(e, s) {
        this.options = t.extend({}, i.DEFAULTS, s), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.6", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function(t, e, i, s) {
        var n = this.$target.scrollTop(),
            o = this.$element.offset(),
            a = this.$target.height();
        if (null != i && "top" == this.affixed) return i > n && "top";
        if ("bottom" == this.affixed) return null != i ? !(n + this.unpin <= o.top) && "bottom" : !(t - s >= n + a) && "bottom";
        var r = null == this.affixed,
            l = r ? n : o.top,
            h = r ? a : e;
        return null != i && i >= n ? "top" : null != s && l + h >= t - s && "bottom"
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                s = this.options.offset,
                n = s.top,
                o = s.bottom,
                a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof s && (o = n = s), "function" == typeof n && (n = s.top(this.$element)), "function" == typeof o && (o = s.bottom(this.$element));
            var r = this.getState(a, e, n, o);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : ""),
                    h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == r && this.$element.offset({
                top: a - e - o
            })
        }
    };
    var s = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = s, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this),
                s = i.data();
            s.offset = s.offset || {}, null != s.offsetBottom && (s.offset.bottom = s.offsetBottom), null != s.offsetTop && (s.offset.top = s.offsetTop), e.call(i, s)
        })
    })
}(jQuery),
function(t) {
    function e(e) {
        var i = e || window.event,
            s = [].slice.call(arguments, 1),
            n = 0,
            o = 0,
            a = 0,
            e = t.event.fix(i);
        return e.type = "mousewheel", i.wheelDelta && (n = i.wheelDelta / 120), i.detail && (n = -i.detail / 3), a = n, void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && (a = 0, o = -1 * n), void 0 !== i.wheelDeltaY && (a = i.wheelDeltaY / 120), void 0 !== i.wheelDeltaX && (o = -1 * i.wheelDeltaX / 120), s.unshift(e, n, o, a), (t.event.dispatch || t.event.handle).apply(this, s)
    }
    var i = ["DOMMouseScroll", "mousewheel"];
    if (t.event.fixHooks)
        for (var s = i.length; s;) t.event.fixHooks[i[--s]] = t.event.mouseHooks;
    t.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var t = i.length; t;) this.addEventListener(i[--t], e, !1);
            else this.onmousewheel = e
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var t = i.length; t;) this.removeEventListener(i[--t], e, !1);
            else this.onmousewheel = null
        }
    }, t.fn.extend({
        mousewheel: function(t) {
            return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
        },
        unmousewheel: function(t) {
            return this.unbind("mousewheel", t)
        }
    })
}(jQuery),
function(t, e, i, s) {
    "use strict";
    var n = i("html"),
        o = i(t),
        a = i(e),
        r = i.fancybox = function() {
            r.open.apply(this, arguments)
        },
        l = navigator.userAgent.match(/msie/i),
        h = null,
        c = e.createTouch !== s,
        d = function(t) {
            return t && t.hasOwnProperty && t instanceof i
        },
        u = function(t) {
            return t && "string" === i.type(t)
        },
        p = function(t) {
            return u(t) && t.indexOf("%") > 0
        },
        f = function(t) {
            return t && !(t.style.overflow && "hidden" === t.style.overflow) && (t.clientWidth && t.scrollWidth > t.clientWidth || t.clientHeight && t.scrollHeight > t.clientHeight)
        },
        g = function(t, e) {
            var i = parseInt(t, 10) || 0;
            return e && p(t) && (i = r.getViewport()[e] / 100 * i), Math.ceil(i)
        },
        m = function(t, e) {
            return g(t, e) + "px"
        };
    i.extend(r, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !c,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: i.noop,
            beforeLoad: i.noop,
            afterLoad: i.noop,
            beforeShow: i.noop,
            afterShow: i.noop,
            beforeChange: i.noop,
            beforeClose: i.noop,
            afterClose: i.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(t, e) {
            if (t && (i.isPlainObject(e) || (e = {}), !1 !== r.close(!0))) return i.isArray(t) || (t = d(t) ? i(t).get() : [t]), i.each(t, function(n, o) {
                var a, l, h, c, p, f, g, m = {};
                "object" === i.type(o) && (o.nodeType && (o = i(o)), d(o) ? (m = {
                    href: o.data("fancybox-href") || o.attr("href"),
                    title: o.data("fancybox-title") || o.attr("title"),
                    isDom: !0,
                    element: o
                }, i.metadata && i.extend(!0, m, o.metadata())) : m = o), a = e.href || m.href || (u(o) ? o : null), l = e.title !== s ? e.title : m.title || "", h = e.content || m.content, c = h ? "html" : e.type || m.type, !c && m.isDom && (c = o.data("fancybox-type"), c || (p = o.prop("class").match(/fancybox\.(\w+)/), c = p ? p[1] : null)), u(a) && (c || (r.isImage(a) ? c = "image" : r.isSWF(a) ? c = "swf" : "#" === a.charAt(0) ? c = "inline" : u(o) && (c = "html", h = o)), "ajax" === c && (f = a.split(/\s+/, 2), a = f.shift(), g = f.shift())), h || ("inline" === c ? a ? h = i(u(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : m.isDom && (h = o) : "html" === c ? h = a : c || a || !m.isDom || (c = "inline", h = o)), i.extend(m, {
                    href: a,
                    type: c,
                    content: h,
                    title: l,
                    selector: g
                }), t[n] = m
            }), r.opts = i.extend(!0, {}, r.defaults, e), e.keys !== s && (r.opts.keys = !!e.keys && i.extend({}, r.defaults.keys, e.keys)), r.group = t, r._start(r.opts.index)
        },
        cancel: function() {
            var t = r.coming;
            t && !1 !== r.trigger("onCancel") && (r.hideLoading(), r.ajaxLoad && r.ajaxLoad.abort(), r.ajaxLoad = null, r.imgPreload && (r.imgPreload.onload = r.imgPreload.onerror = null), t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), r.coming = null, r.current || r._afterZoomOut(t))
        },
        close: function(t) {
            r.cancel(), !1 !== r.trigger("beforeClose") && (r.unbindEvents(), r.isActive && (r.isOpen && t !== !0 ? (r.isOpen = r.isOpened = !1, r.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), r.wrap.stop(!0, !0).removeClass("fancybox-opened"), r.transitions[r.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), r._afterZoomOut())))
        },
        play: function(t) {
            var e = function() {
                    clearTimeout(r.player.timer)
                },
                i = function() {
                    e(), r.current && r.player.isActive && (r.player.timer = setTimeout(r.next, r.current.playSpeed))
                },
                s = function() {
                    e(), a.unbind(".player"), r.player.isActive = !1, r.trigger("onPlayEnd")
                },
                n = function() {
                    r.current && (r.current.loop || r.current.index < r.group.length - 1) && (r.player.isActive = !0, a.bind({
                        "onCancel.player beforeClose.player": s,
                        "onUpdate.player": i,
                        "beforeLoad.player": e
                    }), i(), r.trigger("onPlayStart"))
                };
            t === !0 || !r.player.isActive && t !== !1 ? n() : s()
        },
        next: function(t) {
            var e = r.current;
            e && (u(t) || (t = e.direction.next), r.jumpto(e.index + 1, t, "next"))
        },
        prev: function(t) {
            var e = r.current;
            e && (u(t) || (t = e.direction.prev), r.jumpto(e.index - 1, t, "prev"))
        },
        jumpto: function(t, e, i) {
            var n = r.current;
            n && (t = g(t), r.direction = e || n.direction[t >= n.index ? "next" : "prev"], r.router = i || "jumpto", n.loop && (t < 0 && (t = n.group.length + t % n.group.length), t %= n.group.length), n.group[t] !== s && (r.cancel(), r._start(t)))
        },
        reposition: function(t, e) {
            var s, n = r.current,
                o = n ? n.wrap : null;
            o && (s = r._getPosition(e), t && "scroll" === t.type ? (delete s.position, o.stop(!0, !0).animate(s, 200)) : (o.css(s), n.pos = i.extend({}, n.dim, s)))
        },
        update: function(t) {
            var e = t && t.type,
                i = !e || "orientationchange" === e;
            i && (clearTimeout(h), h = null), r.isOpen && !h && (h = setTimeout(function() {
                var s = r.current;
                s && !r.isClosing && (r.wrap.removeClass("fancybox-tmp"), (i || "load" === e || "resize" === e && s.autoResize) && r._setDimension(), "scroll" === e && s.canShrink || r.reposition(t), r.trigger("onUpdate"), h = null)
            }, i && !c ? 0 : 300))
        },
        toggle: function(t) {
            r.isOpen && (r.current.fitToView = "boolean" === i.type(t) ? t : !r.current.fitToView, c && (r.wrap.removeAttr("style").addClass("fancybox-tmp"), r.trigger("onUpdate")), r.update())
        },
        hideLoading: function() {
            a.unbind(".loading"), i("#fancybox-loading").remove()
        },
        showLoading: function() {
            var t, e;
            r.hideLoading(), t = i('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body"), a.bind("keydown.loading", function(t) {
                27 === (t.which || t.keyCode) && (t.preventDefault(), r.cancel())
            }), r.defaults.fixed || (e = r.getViewport(), t.css({
                position: "absolute",
                top: .5 * e.h + e.y,
                left: .5 * e.w + e.x
            }))
        },
        getViewport: function() {
            var e = r.current && r.current.locked || !1,
                i = {
                    x: o.scrollLeft(),
                    y: o.scrollTop()
                };
            return e ? (i.w = e[0].clientWidth, i.h = e[0].clientHeight) : (i.w = c && t.innerWidth ? t.innerWidth : o.width(), i.h = c && t.innerHeight ? t.innerHeight : o.height()), i
        },
        unbindEvents: function() {
            r.wrap && d(r.wrap) && r.wrap.unbind(".fb"), a.unbind(".fb"), o.unbind(".fb")
        },
        bindEvents: function() {
            var t, e = r.current;
            e && (o.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), r.update), t = e.keys, t && a.bind("keydown.fb", function(n) {
                var o = n.which || n.keyCode,
                    a = n.target || n.srcElement;
                return (27 !== o || !r.coming) && void(n.ctrlKey || n.altKey || n.shiftKey || n.metaKey || a && (a.type || i(a).is("[contenteditable]")) || i.each(t, function(t, a) {
                    return e.group.length > 1 && a[o] !== s ? (r[t](a[o]), n.preventDefault(), !1) : i.inArray(o, a) > -1 ? (r[t](), n.preventDefault(), !1) : void 0
                }))
            }), i.fn.mousewheel && e.mouseWheel && r.wrap.bind("mousewheel.fb", function(t, s, n, o) {
                for (var a = t.target || null, l = i(a), h = !1; l.length && !(h || l.is(".fancybox-skin") || l.is(".fancybox-wrap"));) h = f(l[0]), l = i(l).parent();
                0 === s || h || r.group.length > 1 && !e.canShrink && (o > 0 || n > 0 ? r.prev(o > 0 ? "down" : "left") : (o < 0 || n < 0) && r.next(o < 0 ? "up" : "right"), t.preventDefault())
            }))
        },
        trigger: function(t, e) {
            var s, n = e || r.coming || r.current;
            if (n) {
                if (i.isFunction(n[t]) && (s = n[t].apply(n, Array.prototype.slice.call(arguments, 1))), s === !1) return !1;
                n.helpers && i.each(n.helpers, function(e, s) {
                    s && r.helpers[e] && i.isFunction(r.helpers[e][t]) && r.helpers[e][t](i.extend(!0, {}, r.helpers[e].defaults, s), n)
                }), a.trigger(t)
            }
        },
        isImage: function(t) {
            return u(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(t) {
            return u(t) && t.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(t) {
            var e, s, n, o, a, l = {};
            if (t = g(t), e = r.group[t] || null, !e) return !1;
            if (l = i.extend(!0, {}, r.opts, e), o = l.margin, a = l.padding, "number" === i.type(o) && (l.margin = [o, o, o, o]), "number" === i.type(a) && (l.padding = [a, a, a, a]), l.modal && i.extend(!0, l, {
                    closeBtn: !1,
                    closeClick: !1,
                    nextClick: !1,
                    arrows: !1,
                    mouseWheel: !1,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: !1
                        }
                    }
                }), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), "auto" === l.height && (l.autoHeight = !0), l.group = r.group, l.index = t, r.coming = l, !1 === r.trigger("beforeLoad")) return void(r.coming = null);
            if (n = l.type, s = l.href, !n) return r.coming = null, !(!r.current || !r.router || "jumpto" === r.router) && (r.current.index = t, r[r.router](r.direction));
            if (r.isActive = !0, "image" !== n && "swf" !== n || (l.autoHeight = l.autoWidth = !1, l.scrolling = "visible"), "image" === n && (l.aspectRatio = !0), "iframe" === n && c && (l.scrolling = "scroll"), l.wrap = i(l.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + n + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), i.extend(l, {
                    skin: i(".fancybox-skin", l.wrap),
                    outer: i(".fancybox-outer", l.wrap),
                    inner: i(".fancybox-inner", l.wrap)
                }), i.each(["Top", "Right", "Bottom", "Left"], function(t, e) {
                    l.skin.css("padding" + e, m(l.padding[t]))
                }), r.trigger("onReady"), "inline" === n || "html" === n) {
                if (!l.content || !l.content.length) return r._error("content")
            } else if (!s) return r._error("href");
            "image" === n ? r._loadImage() : "ajax" === n ? r._loadAjax() : "iframe" === n ? r._loadIframe() : r._afterLoad()
        },
        _error: function(t) {
            i.extend(r.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: t,
                content: r.coming.tpl.error
            }), r._afterLoad()
        },
        _loadImage: function() {
            var t = r.imgPreload = new Image;
            t.onload = function() {
                this.onload = this.onerror = null, r.coming.width = this.width / r.opts.pixelRatio, r.coming.height = this.height / r.opts.pixelRatio, r._afterLoad()
            }, t.onerror = function() {
                this.onload = this.onerror = null, r._error("image")
            }, t.src = r.coming.href, t.complete !== !0 && r.showLoading()
        },
        _loadAjax: function() {
            var t = r.coming;
            r.showLoading(), r.ajaxLoad = i.ajax(i.extend({}, t.ajax, {
                url: t.href,
                error: function(t, e) {
                    r.coming && "abort" !== e ? r._error("ajax", t) : r.hideLoading()
                },
                success: function(e, i) {
                    "success" === i && (t.content = e, r._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var t = r.coming,
                e = i(t.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : t.iframe.scrolling).attr("src", t.href);
            i(t.wrap).bind("onReset", function() {
                try {
                    i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (t) {}
            }), t.iframe.preload && (r.showLoading(), e.one("load", function() {
                i(this).data("ready", 1), c || i(this).bind("load.fb", r.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), r._afterLoad()
            })), t.content = e.appendTo(t.inner), t.iframe.preload || r._afterLoad()
        },
        _preloadImages: function() {
            var t, e, i = r.group,
                s = r.current,
                n = i.length,
                o = s.preload ? Math.min(s.preload, n - 1) : 0;
            for (e = 1; e <= o; e += 1) t = i[(s.index + e) % n], "image" === t.type && t.href && ((new Image).src = t.href)
        },
        _afterLoad: function() {
            var t, e, s, n, o, a, l = r.coming,
                h = r.current,
                c = "fancybox-placeholder";
            if (r.hideLoading(), l && r.isActive !== !1) {
                if (!1 === r.trigger("afterLoad", l, h)) return l.wrap.stop(!0).trigger("onReset").remove(), void(r.coming = null);
                switch (h && (r.trigger("beforeChange", h), h.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), r.unbindEvents(), t = l, e = l.content, s = l.type, n = l.scrolling, i.extend(r, {
                    wrap: t.wrap,
                    skin: t.skin,
                    outer: t.outer,
                    inner: t.inner,
                    current: t,
                    previous: h
                }), o = t.href, s) {
                    case "inline":
                    case "ajax":
                    case "html":
                        t.selector ? e = i("<div>").html(e).find(t.selector) : d(e) && (e.data(c) || e.data(c, i('<div class="' + c + '"></div>').insertAfter(e).hide()), e = e.show().detach(), t.wrap.bind("onReset", function() {
                            i(this).find(e).length && e.hide().replaceAll(e.data(c)).data(c, !1)
                        }));
                        break;
                    case "image":
                        e = t.tpl.image.replace("{href}", o);
                        break;
                    case "swf":
                        e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', a = "", i.each(t.swf, function(t, i) {
                            e += '<param name="' + t + '" value="' + i + '"></param>', a += " " + t + '="' + i + '"'
                        }), e += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>"
                }
                d(e) && e.parent().is(t.inner) || t.inner.append(e), r.trigger("beforeShow"), t.inner.css("overflow", "yes" === n ? "scroll" : "no" === n ? "hidden" : n), r._setDimension(), r.reposition(), r.isOpen = !1, r.coming = null, r.bindEvents(), r.isOpened ? h.prevMethod && r.transitions[h.prevMethod]() : i(".fancybox-wrap").not(t.wrap).stop(!0).trigger("onReset").remove(), r.transitions[r.isOpened ? t.nextMethod : t.openMethod](), r._preloadImages()
            }
        },
        _setDimension: function() {
            var t, e, s, n, o, a, l, h, c, d, u, f, v, b, y, w = r.getViewport(),
                _ = 0,
                x = !1,
                k = !1,
                C = r.wrap,
                $ = r.skin,
                T = r.inner,
                S = r.current,
                D = S.width,
                P = S.height,
                I = S.minWidth,
                A = S.minHeight,
                E = S.maxWidth,
                O = S.maxHeight,
                M = S.scrolling,
                z = S.scrollOutside ? S.scrollbarWidth : 0,
                H = S.margin,
                N = g(H[1] + H[3]),
                W = g(H[0] + H[2]);
            if (C.add($).add(T).width("auto").height("auto").removeClass("fancybox-tmp"), t = g($.outerWidth(!0) - $.width()), e = g($.outerHeight(!0) - $.height()), s = N + t, n = W + e, o = p(D) ? (w.w - s) * g(D) / 100 : D, a = p(P) ? (w.h - n) * g(P) / 100 : P, "iframe" === S.type) {
                if (b = S.content, S.autoHeight && 1 === b.data("ready")) try {
                    b[0].contentWindow.document.location && (T.width(o).height(9999), y = b.contents().find("body"), z && y.css("overflow-x", "hidden"), a = y.outerHeight(!0))
                } catch (L) {}
            } else(S.autoWidth || S.autoHeight) && (T.addClass("fancybox-tmp"), S.autoWidth || T.width(o), S.autoHeight || T.height(a), S.autoWidth && (o = T.width()), S.autoHeight && (a = T.height()), T.removeClass("fancybox-tmp"));
            if (D = g(o), P = g(a), c = o / a, I = g(p(I) ? g(I, "w") - s : I), E = g(p(E) ? g(E, "w") - s : E), A = g(p(A) ? g(A, "h") - n : A), O = g(p(O) ? g(O, "h") - n : O), l = E, h = O, S.fitToView && (E = Math.min(w.w - s, E), O = Math.min(w.h - n, O)), f = w.w - N, v = w.h - W, S.aspectRatio ? (D > E && (D = E, P = g(D / c)), P > O && (P = O, D = g(P * c)), D < I && (D = I, P = g(D / c)), P < A && (P = A, D = g(P * c))) : (D = Math.max(I, Math.min(D, E)), S.autoHeight && "iframe" !== S.type && (T.width(D), P = T.height()), P = Math.max(A, Math.min(P, O))), S.fitToView)
                if (T.width(D).height(P), C.width(D + t), d = C.width(), u = C.height(), S.aspectRatio)
                    for (;
                        (d > f || u > v) && D > I && P > A && !(_++ > 19);) P = Math.max(A, Math.min(O, P - 10)), D = g(P * c), D < I && (D = I, P = g(D / c)), D > E && (D = E, P = g(D / c)), T.width(D).height(P), C.width(D + t), d = C.width(), u = C.height();
                else D = Math.max(I, Math.min(D, D - (d - f))), P = Math.max(A, Math.min(P, P - (u - v)));
            z && "auto" === M && P < a && D + t + z < f && (D += z), T.width(D).height(P), C.width(D + t), d = C.width(), u = C.height(), x = (d > f || u > v) && D > I && P > A, k = S.aspectRatio ? D < l && P < h && D < o && P < a : (D < l || P < h) && (D < o || P < a), i.extend(S, {
                dim: {
                    width: m(d),
                    height: m(u)
                },
                origWidth: o,
                origHeight: a,
                canShrink: x,
                canExpand: k,
                wPadding: t,
                hPadding: e,
                wrapSpace: u - $.outerHeight(!0),
                skinSpace: $.height() - P
            }), !b && S.autoHeight && P > A && P < O && !k && T.height("auto")
        },
        _getPosition: function(t) {
            var e = r.current,
                i = r.getViewport(),
                s = e.margin,
                n = r.wrap.width() + s[1] + s[3],
                o = r.wrap.height() + s[0] + s[2],
                a = {
                    position: "absolute",
                    top: s[0],
                    left: s[3]
                };
            return e.autoCenter && e.fixed && !t && o <= i.h && n <= i.w ? a.position = "fixed" : e.locked || (a.top += i.y, a.left += i.x), a.top = m(Math.max(a.top, a.top + (i.h - o) * e.topRatio)), a.left = m(Math.max(a.left, a.left + (i.w - n) * e.leftRatio)), a
        },
        _afterZoomIn: function() {
            var t = r.current;
            t && (r.isOpen = r.isOpened = !0, r.wrap.css("overflow", "visible").addClass("fancybox-opened"), r.update(), (t.closeClick || t.nextClick && r.group.length > 1) && r.inner.css("cursor", "pointer").bind("click.fb", function(e) {
                i(e.target).is("a") || i(e.target).parent().is("a") || (e.preventDefault(), r[t.closeClick ? "close" : "next"]())
            }), t.closeBtn && i(t.tpl.closeBtn).appendTo(r.skin).bind("click.fb", function(t) {
                t.preventDefault(), r.close()
            }), t.arrows && r.group.length > 1 && ((t.loop || t.index > 0) && i(t.tpl.prev).appendTo(r.outer).bind("click.fb", r.prev), (t.loop || t.index < r.group.length - 1) && i(t.tpl.next).appendTo(r.outer).bind("click.fb", r.next)), r.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? r.opts.autoPlay && !r.player.isActive && (r.opts.autoPlay = !1, r.play()) : r.play(!1))
        },
        _afterZoomOut: function(t) {
            t = t || r.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(r, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), r.trigger("afterClose", t)
        }
    }), r.transitions = {
        getOrigPosition: function() {
            var t = r.current,
                e = t.element,
                i = t.orig,
                s = {},
                n = 50,
                o = 50,
                a = t.hPadding,
                l = t.wPadding,
                h = r.getViewport();
            return !i && t.isDom && e.is(":visible") && (i = e.find("img:first"), i.length || (i = e)), d(i) ? (s = i.offset(), i.is("img") && (n = i.outerWidth(), o = i.outerHeight())) : (s.top = h.y + (h.h - o) * t.topRatio, s.left = h.x + (h.w - n) * t.leftRatio), ("fixed" === r.wrap.css("position") || t.locked) && (s.top -= h.y, s.left -= h.x), s = {
                top: m(s.top - a * t.topRatio),
                left: m(s.left - l * t.leftRatio),
                width: m(n + l),
                height: m(o + a)
            }
        },
        step: function(t, e) {
            var i, s, n, o = e.prop,
                a = r.current,
                l = a.wrapSpace,
                h = a.skinSpace;
            "width" !== o && "height" !== o || (i = e.end === e.start ? 1 : (t - e.start) / (e.end - e.start), r.isClosing && (i = 1 - i), s = "width" === o ? a.wPadding : a.hPadding, n = t - s, r.skin[o](g("width" === o ? n : n - l * i)), r.inner[o](g("width" === o ? n : n - l * i - h * i)))
        },
        zoomIn: function() {
            var t = r.current,
                e = t.pos,
                s = t.openEffect,
                n = "elastic" === s,
                o = i.extend({
                    opacity: 1
                }, e);
            delete o.position, n ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) : "fade" === s && (e.opacity = .1), r.wrap.css(e).animate(o, {
                duration: "none" === s ? 0 : t.openSpeed,
                easing: t.openEasing,
                step: n ? this.step : null,
                complete: r._afterZoomIn
            })
        },
        zoomOut: function() {
            var t = r.current,
                e = t.closeEffect,
                i = "elastic" === e,
                s = {
                    opacity: .1
                };
            i && (s = this.getOrigPosition(), t.closeOpacity && (s.opacity = .1)), r.wrap.animate(s, {
                duration: "none" === e ? 0 : t.closeSpeed,
                easing: t.closeEasing,
                step: i ? this.step : null,
                complete: r._afterZoomOut
            })
        },
        changeIn: function() {
            var t, e = r.current,
                i = e.nextEffect,
                s = e.pos,
                n = {
                    opacity: 1
                },
                o = r.direction,
                a = 200;
            s.opacity = .1, "elastic" === i && (t = "down" === o || "up" === o ? "top" : "left", "down" === o || "right" === o ? (s[t] = m(g(s[t]) - a), n[t] = "+=" + a + "px") : (s[t] = m(g(s[t]) + a), n[t] = "-=" + a + "px")), "none" === i ? r._afterZoomIn() : r.wrap.css(s).animate(n, {
                duration: e.nextSpeed,
                easing: e.nextEasing,
                complete: r._afterZoomIn
            })
        },
        changeOut: function() {
            var t = r.previous,
                e = t.prevEffect,
                s = {
                    opacity: .1
                },
                n = r.direction,
                o = 200;
            "elastic" === e && (s["down" === n || "up" === n ? "top" : "left"] = ("up" === n || "left" === n ? "-" : "+") + "=" + o + "px"), t.wrap.animate(s, {
                duration: "none" === e ? 0 : t.prevSpeed,
                easing: t.prevEasing,
                complete: function() {
                    i(this).trigger("onReset").remove()
                }
            })
        }
    }, r.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !c,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: i("html"),
        create: function(t) {
            t = i.extend({}, this.defaults, t), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(r.coming ? r.coming.parent : t.parent), this.fixed = !1, t.fixed && r.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function(t) {
            var e = this;
            t = i.extend({}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(t), this.fixed || (o.bind("resize.overlay", i.proxy(this.update, this)), this.update()), t.closeClick && this.overlay.bind("click.overlay", function(t) {
                if (i(t.target).hasClass("fancybox-overlay")) return r.isActive ? r.close() : e.close(), !1
            }), this.overlay.css(t.css).show()
        },
        close: function() {
            var t, e;
            o.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"), t = o.scrollTop(), e = o.scrollLeft(), this.el.removeClass("fancybox-lock"), o.scrollTop(t).scrollLeft(e)), i(".fancybox-overlay").remove().hide(), i.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var t, i = "100%";
            this.overlay.width(i).height("100%"), l ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), a.width() > t && (i = a.width())) : a.width() > o.width() && (i = a.width()), this.overlay.width(i).height(a.height())
        },
        onReady: function(t, e) {
            var s = this.overlay;
            i(".fancybox-overlay").stop(!0, !0), s || this.create(t), t.locked && this.fixed && e.fixed && (s || (this.margin = a.height() > o.height() && i("html").css("margin-right").replace("px", "")), e.locked = this.overlay.append(e.wrap), e.fixed = !1), t.showEarly === !0 && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(t, e) {
            var s, n;
            e.locked && (this.margin !== !1 && (i("*").filter(function() {
                return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), s = o.scrollTop(), n = o.scrollLeft(), this.el.addClass("fancybox-lock"), o.scrollTop(s).scrollLeft(n)), this.open(t)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(t) {
            this.overlay && !r.coming && this.overlay.fadeOut(t.speedOut, i.proxy(this.close, this))
        }
    }, r.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(t) {
            var e, s, n = r.current,
                o = n.title,
                a = t.type;
            if (i.isFunction(o) && (o = o.call(n.element, n)), u(o) && "" !== i.trim(o)) {
                switch (e = i('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + o + "</div>"), a) {
                    case "inside":
                        s = r.skin;
                        break;
                    case "outside":
                        s = r.wrap;
                        break;
                    case "over":
                        s = r.inner;
                        break;
                    default:
                        s = r.skin, e.appendTo("body"), l && e.width(e.width()), e.wrapInner('<span class="child"></span>'), r.current.margin[2] += Math.abs(g(e.css("margin-bottom")))
                }
                e["top" === t.position ? "prependTo" : "appendTo"](s)
            }
        }
    }, i.fn.fancybox = function(t) {
        var e, s = i(this),
            n = this.selector || "",
            o = function(o) {
                var a, l, h = i(this).blur(),
                    c = e;
                o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || h.is(".fancybox-wrap") || (a = t.groupAttr || "data-fancybox-group", l = h.attr(a), l || (a = "rel", l = h.get(0)[a]), l && "" !== l && "nofollow" !== l && (h = n.length ? i(n) : s, h = h.filter("[" + a + '="' + l + '"]'), c = h.index(this)), t.index = c, r.open(h, t) !== !1 && o.preventDefault())
            };
        return t = t || {}, e = t.index || 0, n && t.live !== !1 ? a.undelegate(n, "click.fb-start").delegate(n + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", o) : s.unbind("click.fb-start").bind("click.fb-start", o), this.filter("[data-fancybox-start=1]").trigger("click"), this
    }, a.ready(function() {
        var e, o;
        i.scrollbarWidth === s && (i.scrollbarWidth = function() {
            var t = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                e = t.children(),
                s = e.innerWidth() - e.height(99).innerWidth();
            return t.remove(), s
        }), i.support.fixedPosition === s && (i.support.fixedPosition = function() {
            var t = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                e = 20 === t[0].offsetTop || 15 === t[0].offsetTop;
            return t.remove(), e
        }()), i.extend(r.defaults, {
            scrollbarWidth: i.scrollbarWidth(),
            fixed: i.support.fixedPosition,
            parent: i("body")
        }), e = i(t).width(), n.addClass("fancybox-lock-test"), o = i(t).width(), n.removeClass("fancybox-lock-test"), i("<style type='text/css'>.fancybox-margin{margin-right:" + (o - e) + "px;}</style>").appendTo("head")
    })
}(window, document, jQuery),
function(t, e, i, s) {
    "use strict";
    var n = i("html"),
        o = i(t),
        a = i(e),
        r = i.fancybox = function() {
            r.open.apply(this, arguments)
        },
        l = navigator.userAgent.match(/msie/i),
        h = null,
        c = e.createTouch !== s,
        d = function(t) {
            return t && t.hasOwnProperty && t instanceof i
        },
        u = function(t) {
            return t && "string" === i.type(t)
        },
        p = function(t) {
            return u(t) && t.indexOf("%") > 0
        },
        f = function(t) {
            return t && !(t.style.overflow && "hidden" === t.style.overflow) && (t.clientWidth && t.scrollWidth > t.clientWidth || t.clientHeight && t.scrollHeight > t.clientHeight)
        },
        g = function(t, e) {
            var i = parseInt(t, 10) || 0;
            return e && p(t) && (i = r.getViewport()[e] / 100 * i), Math.ceil(i)
        },
        m = function(t, e) {
            return g(t, e) + "px"
        };
    i.extend(r, {
        version: "2.1.5",
        defaults: {
            padding: 0,
            margin: 0,
            width: 853,
            height: 480,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 1600,
            maxHeight: 1200,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !c,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .15,
            scrolling: "no",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !1,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancy-pmo pc-only"><a href="#"></a></div><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "fade",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "fade",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: i.noop,
            beforeLoad: i.noop,
            afterLoad: i.noop,
            beforeShow: i.noop,
            afterShow: i.noop,
            beforeChange: i.noop,
            beforeClose: i.noop,
            afterClose: i.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(t, e) {
            if (t && (i.isPlainObject(e) || (e = {}), !1 !== r.close(!0))) return i.isArray(t) || (t = d(t) ? i(t).get() : [t]), i.each(t, function(n, o) {
                var a, l, h, c, p, f, g, m = {};
                "object" === i.type(o) && (o.nodeType && (o = i(o)), d(o) ? (m = {
                    href: o.data("fancybox-href") || o.attr("href"),
                    title: o.data("fancybox-title") || o.attr("title"),
                    isDom: !0,
                    element: o
                }, i.metadata && i.extend(!0, m, o.metadata())) : m = o), a = e.href || m.href || (u(o) ? o : null), l = e.title !== s ? e.title : m.title || "", h = e.content || m.content, c = h ? "html" : e.type || m.type, !c && m.isDom && (c = o.data("fancybox-type"), c || (p = o.prop("class").match(/fancybox\.(\w+)/), c = p ? p[1] : null)), u(a) && (c || (r.isImage(a) ? c = "image" : r.isSWF(a) ? c = "swf" : "#" === a.charAt(0) ? c = "inline" : u(o) && (c = "html", h = o)), "ajax" === c && (f = a.split(/\s+/, 2), a = f.shift(), g = f.shift())), h || ("inline" === c ? a ? h = i(u(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : m.isDom && (h = o) : "html" === c ? h = a : c || a || !m.isDom || (c = "inline", h = o)), i.extend(m, {
                    href: a,
                    type: c,
                    content: h,
                    title: l,
                    selector: g
                }), t[n] = m
            }), r.opts = i.extend(!0, {}, r.defaults, e), e.keys !== s && (r.opts.keys = !!e.keys && i.extend({}, r.defaults.keys, e.keys)), r.group = t, r._start(r.opts.index)
        },
        cancel: function() {
            var t = r.coming;
            t && !1 !== r.trigger("onCancel") && (r.hideLoading(), r.ajaxLoad && r.ajaxLoad.abort(), r.ajaxLoad = null, r.imgPreload && (r.imgPreload.onload = r.imgPreload.onerror = null), t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), r.coming = null, r.current || r._afterZoomOut(t))
        },
        close: function(t) {
            r.cancel(), !1 !== r.trigger("beforeClose") && (r.unbindEvents(), r.isActive && (r.isOpen && t !== !0 ? (r.isOpen = r.isOpened = !1, r.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), r.wrap.stop(!0, !0).removeClass("fancybox-opened"), r.transitions[r.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), r._afterZoomOut())))
        },
        play: function(t) {
            var e = function() {
                    clearTimeout(r.player.timer)
                },
                i = function() {
                    e(), r.current && r.player.isActive && (r.player.timer = setTimeout(r.next, r.current.playSpeed))
                },
                s = function() {
                    e(), a.unbind(".player"), r.player.isActive = !1, r.trigger("onPlayEnd")
                },
                n = function() {
                    r.current && (r.current.loop || r.current.index < r.group.length - 1) && (r.player.isActive = !0, a.bind({
                        "onCancel.player beforeClose.player": s,
                        "onUpdate.player": i,
                        "beforeLoad.player": e
                    }), i(), r.trigger("onPlayStart"))
                };
            t === !0 || !r.player.isActive && t !== !1 ? n() : s()
        },
        next: function(t) {
            var e = r.current;
            e && (u(t) || (t = e.direction.next), r.jumpto(e.index + 1, t, "next"))
        },
        prev: function(t) {
            var e = r.current;
            e && (u(t) || (t = e.direction.prev), r.jumpto(e.index - 1, t, "prev"))
        },
        jumpto: function(t, e, i) {
            var n = r.current;
            n && (t = g(t), r.direction = e || n.direction[t >= n.index ? "next" : "prev"], r.router = i || "jumpto", n.loop && (t < 0 && (t = n.group.length + t % n.group.length), t %= n.group.length), n.group[t] !== s && (r.cancel(), r._start(t)))
        },
        reposition: function(t, e) {
            var s, n = r.current,
                o = n ? n.wrap : null;
            o && (s = r._getPosition(e), t && "scroll" === t.type ? (delete s.position, o.stop(!0, !0).animate(s, 200)) : (o.css(s), n.pos = i.extend({}, n.dim, s)))
        },
        update: function(t) {
            var e = t && t.type,
                i = !e || "orientationchange" === e;
            i && (clearTimeout(h), h = null), r.isOpen && !h && (h = setTimeout(function() {
                var s = r.current;
                s && !r.isClosing && (r.wrap.removeClass("fancybox-tmp"), (i || "load" === e || "resize" === e && s.autoResize) && r._setDimension(), "scroll" === e && s.canShrink || r.reposition(t), r.trigger("onUpdate"), h = null)
            }, i && !c ? 0 : 300))
        },
        toggle: function(t) {
            r.isOpen && (r.current.fitToView = "boolean" === i.type(t) ? t : !r.current.fitToView, c && (r.wrap.removeAttr("style").addClass("fancybox-tmp"), r.trigger("onUpdate")), r.update())
        },
        hideLoading: function() {
            a.unbind(".loading"), i("#fancybox-loading").remove()
        },
        showLoading: function() {
            var t, e;
            r.hideLoading(), t = i('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body"), a.bind("keydown.loading", function(t) {
                27 === (t.which || t.keyCode) && (t.preventDefault(), r.cancel())
            }), r.defaults.fixed || (e = r.getViewport(), t.css({
                position: "absolute",
                top: .5 * e.h + e.y,
                left: .5 * e.w + e.x
            }))
        },
        getViewport: function() {
            var e = r.current && r.current.locked || !1,
                i = {
                    x: o.scrollLeft(),
                    y: o.scrollTop()
                };
            return e ? (i.w = e[0].clientWidth, i.h = e[0].clientHeight) : (i.w = c && t.innerWidth ? t.innerWidth : o.width(), i.h = c && t.innerHeight ? t.innerHeight : o.height()), i
        },
        unbindEvents: function() {
            r.wrap && d(r.wrap) && r.wrap.unbind(".fb"), a.unbind(".fb"), o.unbind(".fb")
        },
        bindEvents: function() {
            var t, e = r.current;
            e && (o.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), r.update), t = e.keys, t && a.bind("keydown.fb", function(n) {
                var o = n.which || n.keyCode,
                    a = n.target || n.srcElement;
                return (27 !== o || !r.coming) && void(n.ctrlKey || n.altKey || n.shiftKey || n.metaKey || a && (a.type || i(a).is("[contenteditable]")) || i.each(t, function(t, a) {
                    return e.group.length > 1 && a[o] !== s ? (r[t](a[o]), n.preventDefault(), !1) : i.inArray(o, a) > -1 ? (r[t](), n.preventDefault(), !1) : void 0
                }))
            }), i.fn.mousewheel && e.mouseWheel && r.wrap.bind("mousewheel.fb", function(t, s, n, o) {
                for (var a = t.target || null, l = i(a), h = !1; l.length && !(h || l.is(".fancybox-skin") || l.is(".fancybox-wrap"));) h = f(l[0]), l = i(l).parent();
                0 === s || h || r.group.length > 1 && !e.canShrink && (o > 0 || n > 0 ? r.prev(o > 0 ? "down" : "left") : (o < 0 || n < 0) && r.next(o < 0 ? "up" : "right"), t.preventDefault())
            }))
        },
        trigger: function(t, e) {
            var s, n = e || r.coming || r.current;
            if (n) {
                if (i.isFunction(n[t]) && (s = n[t].apply(n, Array.prototype.slice.call(arguments, 1))), s === !1) return !1;
                n.helpers && i.each(n.helpers, function(e, s) {
                    s && r.helpers[e] && i.isFunction(r.helpers[e][t]) && r.helpers[e][t](i.extend(!0, {}, r.helpers[e].defaults, s), n)
                }), a.trigger(t)
            }
        },
        isImage: function(t) {
            return u(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(t) {
            return u(t) && t.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(t) {
            var e, s, n, o, a, l = {};
            if (t = g(t), e = r.group[t] || null, !e) return !1;
            if (l = i.extend(!0, {}, r.opts, e), o = l.margin, a = l.padding, "number" === i.type(o) && (l.margin = [o, o, o, o]), "number" === i.type(a) && (l.padding = [a, a, a, a]), l.modal && i.extend(!0, l, {
                    closeBtn: !1,
                    closeClick: !1,
                    nextClick: !1,
                    arrows: !1,
                    mouseWheel: !1,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: !1
                        }
                    }
                }), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), "auto" === l.height && (l.autoHeight = !0), l.group = r.group, l.index = t, r.coming = l, !1 === r.trigger("beforeLoad")) return void(r.coming = null);
            if (n = l.type, s = l.href, !n) return r.coming = null, !(!r.current || !r.router || "jumpto" === r.router) && (r.current.index = t, r[r.router](r.direction));
            if (r.isActive = !0, "image" !== n && "swf" !== n || (l.autoHeight = l.autoWidth = !1, l.scrolling = "visible"), "image" === n && (l.aspectRatio = !0), "iframe" === n && c && (l.scrolling = "scroll"), l.wrap = i(l.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + n + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), i.extend(l, {
                    skin: i(".fancybox-skin", l.wrap),
                    outer: i(".fancybox-outer", l.wrap),
                    inner: i(".fancybox-inner", l.wrap)
                }), i.each(["Top", "Right", "Bottom", "Left"], function(t, e) {
                    l.skin.css("padding" + e, m(l.padding[t]))
                }), r.trigger("onReady"),
                "inline" === n || "html" === n) {
                if (!l.content || !l.content.length) return r._error("content")
            } else if (!s) return r._error("href");
            "image" === n ? r._loadImage() : "ajax" === n ? r._loadAjax() : "iframe" === n ? r._loadIframe() : r._afterLoad()
        },
        _error: function(t) {
            i.extend(r.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: t,
                content: r.coming.tpl.error
            }), r._afterLoad()
        },
        _loadImage: function() {
            var t = r.imgPreload = new Image;
            t.onload = function() {
                this.onload = this.onerror = null, r.coming.width = this.width / r.opts.pixelRatio, r.coming.height = this.height / r.opts.pixelRatio, r._afterLoad()
            }, t.onerror = function() {
                this.onload = this.onerror = null, r._error("image")
            }, t.src = r.coming.href, t.complete !== !0 && r.showLoading()
        },
        _loadAjax: function() {
            var t = r.coming;
            r.showLoading(), r.ajaxLoad = i.ajax(i.extend({}, t.ajax, {
                url: t.href,
                error: function(t, e) {
                    r.coming && "abort" !== e ? r._error("ajax", t) : r.hideLoading()
                },
                success: function(e, i) {
                    "success" === i && (t.content = e, r._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var t = r.coming,
                e = i(t.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : t.iframe.scrolling).attr("src", t.href);
            i(t.wrap).bind("onReset", function() {
                try {
                    i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (t) {}
            }), t.iframe.preload && (r.showLoading(), e.one("load", function() {
                i(this).data("ready", 1), c || i(this).bind("load.fb", r.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), r._afterLoad()
            })), t.content = e.appendTo(t.inner), t.iframe.preload || r._afterLoad()
        },
        _preloadImages: function() {
            var t, e, i = r.group,
                s = r.current,
                n = i.length,
                o = s.preload ? Math.min(s.preload, n - 1) : 0;
            for (e = 1; e <= o; e += 1) t = i[(s.index + e) % n], "image" === t.type && t.href && ((new Image).src = t.href)
        },
        _afterLoad: function() {
            var t, e, s, n, o, a, l = r.coming,
                h = r.current,
                c = "fancybox-placeholder";
            if (r.hideLoading(), l && r.isActive !== !1) {
                if (!1 === r.trigger("afterLoad", l, h)) return l.wrap.stop(!0).trigger("onReset").remove(), void(r.coming = null);
                switch (h && (r.trigger("beforeChange", h), h.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), r.unbindEvents(), t = l, e = l.content, s = l.type, n = l.scrolling, i.extend(r, {
                    wrap: t.wrap,
                    skin: t.skin,
                    outer: t.outer,
                    inner: t.inner,
                    current: t,
                    previous: h
                }), o = t.href, s) {
                    case "inline":
                    case "ajax":
                    case "html":
                        t.selector ? e = i("<div>").html(e).find(t.selector) : d(e) && (e.data(c) || e.data(c, i('<div class="' + c + '"></div>').insertAfter(e).hide()), e = e.show().detach(), t.wrap.bind("onReset", function() {
                            i(this).find(e).length && e.hide().replaceAll(e.data(c)).data(c, !1)
                        }));
                        break;
                    case "image":
                        e = t.tpl.image.replace("{href}", o);
                        break;
                    case "swf":
                        e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', a = "", i.each(t.swf, function(t, i) {
                            e += '<param name="' + t + '" value="' + i + '"></param>', a += " " + t + '="' + i + '"'
                        }), e += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>"
                }
                d(e) && e.parent().is(t.inner) || t.inner.append(e), r.trigger("beforeShow"), t.inner.css("overflow", "yes" === n ? "scroll" : "no" === n ? "hidden" : n), r._setDimension(), r.reposition(), r.isOpen = !1, r.coming = null, r.bindEvents(), r.isOpened ? h.prevMethod && r.transitions[h.prevMethod]() : i(".fancybox-wrap").not(t.wrap).stop(!0).trigger("onReset").remove(), r.transitions[r.isOpened ? t.nextMethod : t.openMethod](), r._preloadImages()
            }
        },
        _setDimension: function() {
            var t, e, s, n, o, a, l, h, c, d, u, f, v, b, y, w = r.getViewport(),
                _ = 0,
                x = !1,
                k = !1,
                C = r.wrap,
                $ = r.skin,
                T = r.inner,
                S = r.current,
                D = S.width,
                P = S.height,
                I = S.minWidth,
                A = S.minHeight,
                E = S.maxWidth,
                O = S.maxHeight,
                M = S.scrolling,
                z = S.scrollOutside ? S.scrollbarWidth : 0,
                H = S.margin,
                N = g(H[1] + H[3]),
                W = g(H[0] + H[2]);
            if (C.add($).add(T).width("auto").height("auto").removeClass("fancybox-tmp"), t = g($.outerWidth(!0) - $.width()), e = g($.outerHeight(!0) - $.height()), s = N + t, n = W + e, o = p(D) ? (w.w - s) * g(D) / 100 : D, a = p(P) ? (w.h - n) * g(P) / 100 : P, "iframe" === S.type) {
                if (b = S.content, S.autoHeight && 1 === b.data("ready")) try {
                    b[0].contentWindow.document.location && (T.width(o).height(9999), y = b.contents().find("body"), z && y.css("overflow-x", "hidden"), a = y.outerHeight(!0))
                } catch (L) {}
            } else(S.autoWidth || S.autoHeight) && (T.addClass("fancybox-tmp"), S.autoWidth || T.width(o), S.autoHeight || T.height(a), S.autoWidth && (o = T.width()), S.autoHeight && (a = T.height()), T.removeClass("fancybox-tmp"));
            if (D = g(o), P = g(a), c = o / a, I = g(p(I) ? g(I, "w") - s : I), E = g(p(E) ? g(E, "w") - s : E), A = g(p(A) ? g(A, "h") - n : A), O = g(p(O) ? g(O, "h") - n : O), l = E, h = O, S.fitToView && (E = Math.min(w.w - s, E), O = Math.min(w.h - n, O)), f = w.w - N, v = w.h - W, S.aspectRatio ? (D > E && (D = E, P = g(D / c)), P > O && (P = O, D = g(P * c)), D < I && (D = I, P = g(D / c)), P < A && (P = A, D = g(P * c))) : (D = Math.max(I, Math.min(D, E)), S.autoHeight && "iframe" !== S.type && (T.width(D), P = T.height()), P = Math.max(A, Math.min(P, O))), S.fitToView)
                if (T.width(D).height(P), C.width(D + t), d = C.width(), u = C.height(), S.aspectRatio)
                    for (;
                        (d > f || u > v) && D > I && P > A && !(_++ > 19);) P = Math.max(A, Math.min(O, P - 10)), D = g(P * c), D < I && (D = I, P = g(D / c)), D > E && (D = E, P = g(D / c)), T.width(D).height(P), C.width(D + t), d = C.width(), u = C.height();
                else D = Math.max(I, Math.min(D, D - (d - f))), P = Math.max(A, Math.min(P, P - (u - v)));
            z && "auto" === M && P < a && D + t + z < f && (D += z), T.width(D).height(P), C.width(D + t), d = C.width(), u = C.height(), x = (d > f || u > v) && D > I && P > A, k = S.aspectRatio ? D < l && P < h && D < o && P < a : (D < l || P < h) && (D < o || P < a), i.extend(S, {
                dim: {
                    width: m(d),
                    height: m(u)
                },
                origWidth: o,
                origHeight: a,
                canShrink: x,
                canExpand: k,
                wPadding: t,
                hPadding: e,
                wrapSpace: u - $.outerHeight(!0),
                skinSpace: $.height() - P
            }), !b && S.autoHeight && P > A && P < O && !k && T.height("auto")
        },
        _getPosition: function(t) {
            var e = r.current,
                i = r.getViewport(),
                s = e.margin,
                n = r.wrap.width() + s[1] + s[3],
                o = r.wrap.height() + s[0] + s[2],
                a = {
                    position: "absolute",
                    top: s[0],
                    left: s[3]
                };
            return e.autoCenter && e.fixed && !t && o <= i.h && n <= i.w ? a.position = "fixed" : e.locked || (a.top += i.y, a.left += i.x), a.top = m(Math.max(a.top, a.top + (i.h - o) * e.topRatio)), a.left = m(Math.max(a.left, a.left + (i.w - n) * e.leftRatio)), a
        },
        _afterZoomIn: function() {
            var t = r.current;
            t && (r.isOpen = r.isOpened = !0, r.wrap.css("overflow", "visible").addClass("fancybox-opened"), r.update(), (t.closeClick || t.nextClick && r.group.length > 1) && r.inner.css("cursor", "pointer").bind("click.fb", function(e) {
                i(e.target).is("a") || i(e.target).parent().is("a") || (e.preventDefault(), r[t.closeClick ? "close" : "next"]())
            }), t.closeBtn && i(t.tpl.closeBtn).appendTo(r.skin).bind("click.fb", function(t) {
                t.preventDefault(), r.close()
            }), t.arrows && r.group.length > 1 && ((t.loop || t.index > 0) && i(t.tpl.prev).appendTo(r.outer).bind("click.fb", r.prev), (t.loop || t.index < r.group.length - 1) && i(t.tpl.next).appendTo(r.outer).bind("click.fb", r.next)), r.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? r.opts.autoPlay && !r.player.isActive && (r.opts.autoPlay = !1, r.play()) : r.play(!1))
        },
        _afterZoomOut: function(t) {
            t = t || r.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(r, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), r.trigger("afterClose", t)
        }
    }), r.transitions = {
        getOrigPosition: function() {
            var t = r.current,
                e = t.element,
                i = t.orig,
                s = {},
                n = 50,
                o = 50,
                a = t.hPadding,
                l = t.wPadding,
                h = r.getViewport();
            return !i && t.isDom && e.is(":visible") && (i = e.find("img:first"), i.length || (i = e)), d(i) ? (s = i.offset(), i.is("img") && (n = i.outerWidth(), o = i.outerHeight())) : (s.top = h.y + (h.h - o) * t.topRatio, s.left = h.x + (h.w - n) * t.leftRatio), ("fixed" === r.wrap.css("position") || t.locked) && (s.top -= h.y, s.left -= h.x), s = {
                top: m(s.top - a * t.topRatio),
                left: m(s.left - l * t.leftRatio),
                width: m(n + l),
                height: m(o + a)
            }
        },
        step: function(t, e) {
            var i, s, n, o = e.prop,
                a = r.current,
                l = a.wrapSpace,
                h = a.skinSpace;
            "width" !== o && "height" !== o || (i = e.end === e.start ? 1 : (t - e.start) / (e.end - e.start), r.isClosing && (i = 1 - i), s = "width" === o ? a.wPadding : a.hPadding, n = t - s, r.skin[o](g("width" === o ? n : n - l * i)), r.inner[o](g("width" === o ? n : n - l * i - h * i)))
        },
        zoomIn: function() {
            var t = r.current,
                e = t.pos,
                s = t.openEffect,
                n = "elastic" === s,
                o = i.extend({
                    opacity: 1
                }, e);
            delete o.position, n ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) : "fade" === s && (e.opacity = .1), r.wrap.css(e).animate(o, {
                duration: "none" === s ? 0 : t.openSpeed,
                easing: t.openEasing,
                step: n ? this.step : null,
                complete: r._afterZoomIn
            })
        },
        zoomOut: function() {
            var t = r.current,
                e = t.closeEffect,
                i = "elastic" === e,
                s = {
                    opacity: .1
                };
            i && (s = this.getOrigPosition(), t.closeOpacity && (s.opacity = .1)), r.wrap.animate(s, {
                duration: "none" === e ? 0 : t.closeSpeed,
                easing: t.closeEasing,
                step: i ? this.step : null,
                complete: r._afterZoomOut
            })
        },
        changeIn: function() {
            var t, e = r.current,
                i = e.nextEffect,
                s = e.pos,
                n = {
                    opacity: 1
                },
                o = r.direction,
                a = 200;
            s.opacity = .1, "elastic" === i && (t = "down" === o || "up" === o ? "top" : "left", "down" === o || "right" === o ? (s[t] = m(g(s[t]) - a), n[t] = "+=" + a + "px") : (s[t] = m(g(s[t]) + a), n[t] = "-=" + a + "px")), "none" === i ? r._afterZoomIn() : r.wrap.css(s).animate(n, {
                duration: e.nextSpeed,
                easing: e.nextEasing,
                complete: r._afterZoomIn
            })
        },
        changeOut: function() {
            var t = r.previous,
                e = t.prevEffect,
                s = {
                    opacity: .1
                },
                n = r.direction,
                o = 200;
            "elastic" === e && (s["down" === n || "up" === n ? "top" : "left"] = ("up" === n || "left" === n ? "-" : "+") + "=" + o + "px"), t.wrap.animate(s, {
                duration: "none" === e ? 0 : t.prevSpeed,
                easing: t.prevEasing,
                complete: function() {
                    i(this).trigger("onReset").remove()
                }
            })
        }
    }, r.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !1,
            css: {},
            locked: !c,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: i("html"),
        create: function(t) {
            t = i.extend({}, this.defaults, t), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(r.coming ? r.coming.parent : t.parent), this.fixed = !1, t.fixed && r.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function(t) {
            var e = this;
            t = i.extend({}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(t), this.fixed || (o.bind("resize.overlay", i.proxy(this.update, this)), this.update()), t.closeClick && this.overlay.bind("click.overlay", function(t) {
                if (i(t.target).hasClass("fancybox-overlay")) return r.isActive ? r.close() : e.close(), !1
            }), this.overlay.css(t.css).show()
        },
        close: function() {
            var t, e;
            o.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"), t = o.scrollTop(), e = o.scrollLeft(), this.el.removeClass("fancybox-lock"), o.scrollTop(t).scrollLeft(e)), i(".fancybox-overlay").remove().hide(), i.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var t, i = "100%";
            this.overlay.width(i).height("100%"), l ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), a.width() > t && (i = a.width())) : a.width() > o.width() && (i = a.width()), this.overlay.width(i).height(a.height())
        },
        onReady: function(t, e) {
            var s = this.overlay;
            i(".fancybox-overlay").stop(!0, !0), s || this.create(t), t.locked && this.fixed && e.fixed && (s || (this.margin = a.height() > o.height() && i("html").css("margin-right").replace("px", "")), e.locked = this.overlay.append(e.wrap), e.fixed = !1), t.showEarly === !0 && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(t, e) {
            var s, n;
            e.locked && (this.margin !== !1 && (i("*").filter(function() {
                return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), s = o.scrollTop(), n = o.scrollLeft(), this.el.addClass("fancybox-lock"), o.scrollTop(s).scrollLeft(n)), this.open(t)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(t) {
            this.overlay && !r.coming && this.overlay.fadeOut(t.speedOut, i.proxy(this.close, this))
        }
    }, r.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(t) {
            var e, s, n = r.current,
                o = n.title,
                a = t.type;
            if (i.isFunction(o) && (o = o.call(n.element, n)), u(o) && "" !== i.trim(o)) {
                switch (e = i('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + o + "</div>"), a) {
                    case "inside":
                        s = r.skin;
                        break;
                    case "outside":
                        s = r.wrap;
                        break;
                    case "over":
                        s = r.inner;
                        break;
                    default:
                        s = r.skin, e.appendTo("body"), l && e.width(e.width()), e.wrapInner('<span class="child"></span>'), r.current.margin[2] += Math.abs(g(e.css("margin-bottom")))
                }
                e["top" === t.position ? "prependTo" : "appendTo"](s)
            }
        }
    }, i.fn.fancybox = function(t) {
        var e, s = i(this),
            n = this.selector || "",
            o = function(o) {
                var a, l, h = i(this).blur(),
                    c = e;
                o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || h.is(".fancybox-wrap") || (a = t.groupAttr || "data-fancybox-group", l = h.attr(a), l || (a = "rel", l = h.get(0)[a]), l && "" !== l && "nofollow" !== l && (h = n.length ? i(n) : s, h = h.filter("[" + a + '="' + l + '"]'), c = h.index(this)), t.index = c, r.open(h, t) !== !1 && o.preventDefault())
            };
        return t = t || {}, e = t.index || 0, n && t.live !== !1 ? a.undelegate(n, "click.fb-start").delegate(n + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", o) : s.unbind("click.fb-start").bind("click.fb-start", o), this.filter("[data-fancybox-start=1]").trigger("click"), this
    }, a.ready(function() {
        var e, o;
        i.scrollbarWidth === s && (i.scrollbarWidth = function() {
            var t = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                e = t.children(),
                s = e.innerWidth() - e.height(99).innerWidth();
            return t.remove(), s
        }), i.support.fixedPosition === s && (i.support.fixedPosition = function() {
            var t = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                e = 20 === t[0].offsetTop || 15 === t[0].offsetTop;
            return t.remove(), e
        }()), i.extend(r.defaults, {
            scrollbarWidth: i.scrollbarWidth(),
            fixed: i.support.fixedPosition,
            parent: i("body")
        }), e = i(t).width(), n.addClass("fancybox-lock-test"), o = i(t).width(), n.removeClass("fancybox-lock-test"), i("<style type='text/css'>.fancybox-margin{margin-right:" + (o - e) + "px;}</style>").appendTo("head")
    })
}(window, document, jQuery),
function(t) {
    var e = t.fancybox;
    e.helpers.buttons = {
        defaults: {
            skipSingle: !1,
            position: "top",
            tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
        },
        list: null,
        buttons: null,
        beforeLoad: function(t, e) {
            return t.skipSingle && e.group.length < 2 ? (e.helpers.buttons = !1, void(e.closeBtn = !0)) : void(e.margin["bottom" === t.position ? 2 : 0] += 30)
        },
        onPlayStart: function() {
            this.buttons && this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn")
        },
        onPlayEnd: function() {
            this.buttons && this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn")
        },
        afterShow: function(i, s) {
            var n = this.buttons;
            n || (this.list = t(i.tpl).addClass(i.position).appendTo("body"), n = {
                prev: this.list.find(".btnPrev").click(e.prev),
                next: this.list.find(".btnNext").click(e.next),
                play: this.list.find(".btnPlay").click(e.play),
                toggle: this.list.find(".btnToggle").click(e.toggle),
                close: this.list.find(".btnClose").click(e.close)
            }), s.index > 0 || s.loop ? n.prev.removeClass("btnDisabled") : n.prev.addClass("btnDisabled"), s.loop || s.index < s.group.length - 1 ? (n.next.removeClass("btnDisabled"), n.play.removeClass("btnDisabled")) : (n.next.addClass("btnDisabled"), n.play.addClass("btnDisabled")), this.buttons = n, this.onUpdate(i, s)
        },
        onUpdate: function(t, e) {
            var i;
            this.buttons && (i = this.buttons.toggle.removeClass("btnDisabled btnToggleOn"), e.canShrink ? i.addClass("btnToggleOn") : e.canExpand || i.addClass("btnDisabled"))
        },
        beforeClose: function() {
            this.list && this.list.remove(), this.list = null, this.buttons = null
        }
    }
}(jQuery),
function(t) {
    "use strict";
    var e = t.fancybox,
        i = function(e, i, s) {
            return s = s || "", "object" === t.type(s) && (s = t.param(s, !0)), t.each(i, function(t, i) {
                e = e.replace("$" + t, i || "")
            }), s.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + s), e
        };
    e.helpers.media = {
        defaults: {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "opaque",
                    enablejsapi: 1
                },
                type: "iframe",
                url: "//www.youtube.com/embed/$3"
            },
            vimeo: {
                matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                type: "iframe",
                url: "//player.vimeo.com/video/$1"
            },
            metacafe: {
                matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                params: {
                    autoPlay: "yes"
                },
                type: "swf",
                url: function(e, i, s) {
                    return s.swf.flashVars = "playerVars=" + t.param(i, !0), "//www.metacafe.com/fplayer/" + e[1] + "/.swf"
                }
            },
            dailymotion: {
                matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                params: {
                    additionalInfos: 0,
                    autoStart: 1
                },
                type: "swf",
                url: "//www.dailymotion.com/swf/video/$1"
            },
            twitvid: {
                matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                params: {
                    autoplay: 0
                },
                type: "iframe",
                url: "//www.twitvid.com/embed.php?guid=$1"
            },
            twitpic: {
                matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                type: "image",
                url: "//twitpic.com/show/full/$1/"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            google_maps: {
                matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[1] + "/" + t[3] + t[4] + "&output=" + (t[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            }
        },
        beforeLoad: function(e, s) {
            var n, o, a, r, l = s.href || "",
                h = !1;
            for (n in e)
                if (e.hasOwnProperty(n) && (o = e[n], a = l.match(o.matcher))) {
                    h = o.type, r = t.extend(!0, {}, o.params, s[n] || (t.isPlainObject(e[n]) ? e[n].params : null)), l = "function" === t.type(o.url) ? o.url.call(this, a, r, s) : i(o.url, a, r);
                    break
                }
            h && (s.href = l, s.type = h, s.autoHeight = !1)
        }
    }
}(jQuery),
function(t) {
    var e = t.fancybox;
    e.helpers.thumbs = {
        defaults: {
            width: 50,
            height: 50,
            position: "bottom",
            source: function(e) {
                var i;
                return e.element && (i = t(e.element).find("img").attr("src")), !i && "image" === e.type && e.href && (i = e.href), i
            }
        },
        wrap: null,
        list: null,
        width: 0,
        init: function(e, i) {
            var s, n = this,
                o = e.width,
                a = e.height,
                r = e.source;
            s = "";
            for (var l = 0; l < i.group.length; l++) s += '<li><a style="width:' + o + "px;height:" + a + 'px;" href="javascript:jQuery.fancybox.jumpto(' + l + ');"></a></li>';
            this.wrap = t('<div id="fancybox-thumbs"></div>').addClass(e.position).appendTo("body"), this.list = t("<ul>" + s + "</ul>").appendTo(this.wrap), t.each(i.group, function(e) {
                var s = r(i.group[e]);
                s && t("<img />").load(function() {
                    var i, s, r, l = this.width,
                        h = this.height;
                    n.list && l && h && (i = l / o, s = h / a, r = n.list.children().eq(e).find("a"), i >= 1 && s >= 1 && (i > s ? (l = Math.floor(l / s), h = a) : (l = o, h = Math.floor(h / i))), t(this).css({
                        width: l,
                        height: h,
                        top: Math.floor(a / 2 - h / 2),
                        left: Math.floor(o / 2 - l / 2)
                    }), r.width(o).height(a), t(this).hide().appendTo(r).fadeIn(300))
                }).attr("src", s)
            }), this.width = this.list.children().eq(0).outerWidth(!0), this.list.width(this.width * (i.group.length + 1)).css("left", Math.floor(.5 * t(window).width() - (i.index * this.width + .5 * this.width)))
        },
        beforeLoad: function(t, e) {
            return e.group.length < 2 ? void(e.helpers.thumbs = !1) : void(e.margin["top" === t.position ? 0 : 2] += t.height + 15)
        },
        afterShow: function(t, e) {
            this.list ? this.onUpdate(t, e) : this.init(t, e), this.list.children().removeClass("active").eq(e.index).addClass("active")
        },
        onUpdate: function(e, i) {
            this.list && this.list.stop(!0).animate({
                left: Math.floor(.5 * t(window).width() - (i.index * this.width + .5 * this.width))
            }, 150)
        },
        beforeClose: function() {
            this.wrap && this.wrap.remove(), this.wrap = null, this.list = null, this.width = 0
        }
    }
}(jQuery),
function(t) {
    var e = !0;
    t.flexslider = function(i, s) {
        var n = t(i);
        n.vars = t.extend({}, t.flexslider.defaults, s);
        var o, a = n.vars.namespace,
            r = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            l = ("ontouchstart" in window || r || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
            h = "click touchend MSPointerUp keyup",
            c = "",
            d = "vertical" === n.vars.direction,
            u = n.vars.reverse,
            p = n.vars.itemWidth > 0,
            f = "fade" === n.vars.animation,
            g = "" !== n.vars.asNavFor,
            m = {};
        t.data(i, "flexslider", n), m = {
            init: function() {
                n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = t(n.vars.selector, n), n.container = t(n.containerSelector, n), n.count = n.slides.length, n.syncExists = t(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = d ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !f && n.vars.useCSS && function() {
                    var t = document.createElement("div"),
                        e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in e)
                        if (void 0 !== t.style[e[i]]) return n.pfx = e[i].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                    return !1
                }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = t(n.vars.controlsContainer).length > 0 && t(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = t(n.vars.manualControls).length > 0 && t(n.vars.manualControls)), "" !== n.vars.customDirectionNav && (n.customDirectionNav = 2 === t(n.vars.customDirectionNav).length && t(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && m.controlNav.setup(), n.vars.directionNav && m.directionNav.setup(), n.vars.keyboard && (1 === t(n.containerSelector).length || n.vars.multipleKeyboard) && t(document).bind("keyup", function(t) {
                    var e = t.keyCode;
                    if (!n.animating && (39 === e || 37 === e)) {
                        var i = 39 === e ? n.getTarget("next") : 37 === e && n.getTarget("prev");
                        n.flexAnimate(i, n.vars.pauseOnAction)
                    }
                }), n.vars.mousewheel && n.bind("mousewheel", function(t, e, i, s) {
                    t.preventDefault();
                    var o = e < 0 ? n.getTarget("next") : n.getTarget("prev");
                    n.flexAnimate(o, n.vars.pauseOnAction)
                }), n.vars.pausePlay && m.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && m.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function() {
                    n.manualPlay || n.manualPause || n.pause()
                }, function() {
                    n.manualPause || n.manualPlay || n.stopped || n.play()
                }), n.vars.pauseInvisible && m.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), g && m.asNav.setup(), l && n.vars.touch && m.touch(), (!f || f && n.vars.smoothHeight) && t(window).bind("resize orientationchange focus", m.resize), n.find("img").attr("draggable", "false"), setTimeout(function() {
                    n.vars.start(n)
                }, 200)
            },
            asNav: {
                setup: function() {
                    n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(a + "active-slide").eq(n.currentItem).addClass(a + "active-slide"), r ? (i._slider = n, n.slides.each(function() {
                        var e = this;
                        e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(t) {
                            t.preventDefault(), t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
                        }, !1), e.addEventListener("MSGestureTap", function(e) {
                            e.preventDefault();
                            var i = t(this),
                                s = i.index();
                            t(n.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (n.direction = n.currentItem < s ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : n.slides.on(h, function(e) {
                        e.preventDefault();
                        var i = t(this),
                            s = i.index(),
                            o = i.offset().left - t(n).scrollLeft();
                        o <= 0 && i.hasClass(a + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : t(n.vars.asNavFor).data("flexslider").animating || i.hasClass(a + "active-slide") || (n.direction = n.currentItem < s ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    n.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var e, i, s = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
                        o = 1;
                    if (n.controlNavScaffold = t('<ol class="' + a + "control-nav " + a + s + '"></ol>'), n.pagingCount > 1)
                        for (var r = 0; r < n.pagingCount; r++) {
                            if (i = n.slides.eq(r), void 0 === i.attr("data-thumb-alt") && i.attr("data-thumb-alt", ""), altText = "" !== i.attr("data-thumb-alt") ? altText = ' alt="' + i.attr("data-thumb-alt") + '"' : "", e = "thumbnails" === n.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"' + altText + "/>" : '<a href="#">' + o + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
                                var l = i.attr("data-thumbcaption");
                                "" !== l && void 0 !== l && (e += '<span class="' + a + 'caption">' + l + "</span>")
                            }
                            n.controlNavScaffold.append("<li>" + e + "</li>"), o++
                        }
                    n.controlsContainer ? t(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), n.controlNavScaffold.delegate("a, img", h, function(e) {
                        if (e.preventDefault(), "" === c || c === e.type) {
                            var i = t(this),
                                s = n.controlNav.index(i);
                            i.hasClass(a + "active") || (n.direction = s > n.currentSlide ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction))
                        }
                        "" === c && (c = e.type), m.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    n.controlNav = n.manualControls, m.controlNav.active(), n.controlNav.bind(h, function(e) {
                        if (e.preventDefault(), "" === c || c === e.type) {
                            var i = t(this),
                                s = n.controlNav.index(i);
                            i.hasClass(a + "active") || (s > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(s, n.vars.pauseOnAction))
                        }
                        "" === c && (c = e.type), m.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
                    n.controlNav = t("." + a + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n)
                },
                active: function() {
                    n.controlNav.removeClass(a + "active").eq(n.animatingTo).addClass(a + "active")
                },
                update: function(e, i) {
                    n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append(t('<li><a href="#">' + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(i).closest("li").remove(), m.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(i, e) : m.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var e = t('<ul class="' + a + 'direction-nav"><li class="' + a + 'nav-prev"><a class="' + a + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + a + 'nav-next"><a class="' + a + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                    n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? (t(n.controlsContainer).append(e), n.directionNav = t("." + a + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = t("." + a + "direction-nav li a", n)), m.directionNav.update(), n.directionNav.bind(h, function(e) {
                        e.preventDefault();
                        var i;
                        "" !== c && c !== e.type || (i = t(this).hasClass(a + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(i, n.vars.pauseOnAction)), "" === c && (c = e.type), m.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var t = a + "disabled";
                    1 === n.pagingCount ? n.directionNav.addClass(t).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(t).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(t).filter("." + a + "prev").addClass(t).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(t).filter("." + a + "next").addClass(t).attr("tabindex", "-1") : n.directionNav.removeClass(t).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var e = t('<div class="' + a + 'pauseplay"><a href="#"></a></div>');
                    n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = t("." + a + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = t("." + a + "pauseplay a", n)), m.pausePlay.update(n.vars.slideshow ? a + "pause" : a + "play"), n.pausePlay.bind(h, function(e) {
                        e.preventDefault(), "" !== c && c !== e.type || (t(this).hasClass(a + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === c && (c = e.type), m.setToClearWatchedEvent()
                    })
                },
                update: function(t) {
                    "play" === t ? n.pausePlay.removeClass(a + "pause").addClass(a + "play").html(n.vars.playText) : n.pausePlay.removeClass(a + "play").addClass(a + "pause").html(n.vars.pauseText)
                }
            },
            touch: function() {
                function t(t) {
                    t.stopPropagation(), n.animating ? t.preventDefault() : (n.pause(), i._gesture.addPointer(t.pointerId), x = 0, h = d ? n.h : n.w, g = Number(new Date), l = p && u && n.animatingTo === n.last ? 0 : p && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : p && n.currentSlide === n.last ? n.limit : p ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * h : (n.currentSlide + n.cloneOffset) * h)
                }

                function e(t) {
                    t.stopPropagation();
                    var e = t.target._slider;
                    if (e) {
                        var s = -t.translationX,
                            n = -t.translationY;
                        return x += d ? n : s, c = x, y = d ? Math.abs(x) < Math.abs(-s) : Math.abs(x) < Math.abs(-n), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
                            i._gesture.stop()
                        }) : void((!y || Number(new Date) - g > 500) && (t.preventDefault(), !f && e.transitions && (e.vars.animationLoop || (c = x / (0 === e.currentSlide && x < 0 || e.currentSlide === e.last && x > 0 ? Math.abs(x) / h + 2 : 1)), e.setProps(l + c, "setTouch"))))
                    }
                }

                function s(t) {
                    t.stopPropagation();
                    var e = t.target._slider;
                    if (e) {
                        if (e.animatingTo === e.currentSlide && !y && null !== c) {
                            var i = u ? -c : c,
                                s = i > 0 ? e.getTarget("next") : e.getTarget("prev");
                            e.canAdvance(s) && (Number(new Date) - g < 550 && Math.abs(i) > 50 || Math.abs(i) > h / 2) ? e.flexAnimate(s, e.vars.pauseOnAction) : f || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
                        }
                        o = null, a = null, c = null, l = null, x = 0
                    }
                }
                var o, a, l, h, c, g, m, v, b, y = !1,
                    w = 0,
                    _ = 0,
                    x = 0;
                r ? (i.style.msTouchAction = "none", i._gesture = new MSGesture, i._gesture.target = i, i.addEventListener("MSPointerDown", t, !1), i._slider = n, i.addEventListener("MSGestureChange", e, !1), i.addEventListener("MSGestureEnd", s, !1)) : (m = function(t) {
                    n.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (n.pause(), h = d ? n.h : n.w, g = Number(new Date), w = t.touches[0].pageX, _ = t.touches[0].pageY, l = p && u && n.animatingTo === n.last ? 0 : p && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : p && n.currentSlide === n.last ? n.limit : p ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * h : (n.currentSlide + n.cloneOffset) * h, o = d ? _ : w, a = d ? w : _, i.addEventListener("touchmove", v, !1), i.addEventListener("touchend", b, !1))
                }, v = function(t) {
                    w = t.touches[0].pageX, _ = t.touches[0].pageY, c = d ? o - _ : o - w, y = d ? Math.abs(c) < Math.abs(w - a) : Math.abs(c) < Math.abs(_ - a);
                    var e = 500;
                    (!y || Number(new Date) - g > e) && (t.preventDefault(), !f && n.transitions && (n.vars.animationLoop || (c /= 0 === n.currentSlide && c < 0 || n.currentSlide === n.last && c > 0 ? Math.abs(c) / h + 2 : 1), n.setProps(l + c, "setTouch")))
                }, b = function(t) {
                    if (i.removeEventListener("touchmove", v, !1), n.animatingTo === n.currentSlide && !y && null !== c) {
                        var e = u ? -c : c,
                            s = e > 0 ? n.getTarget("next") : n.getTarget("prev");
                        n.canAdvance(s) && (Number(new Date) - g < 550 && Math.abs(e) > 50 || Math.abs(e) > h / 2) ? n.flexAnimate(s, n.vars.pauseOnAction) : f || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                    }
                    i.removeEventListener("touchend", b, !1), o = null, a = null, c = null, l = null
                }, i.addEventListener("touchstart", m, !1))
            },
            resize: function() {
                !n.animating && n.is(":visible") && (p || n.doMath(), f ? m.smoothHeight() : p ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && m.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
            },
            smoothHeight: function(t) {
                if (!d || f) {
                    var e = f ? n : n.viewport;
                    t ? e.animate({
                        height: n.slides.eq(n.animatingTo).height()
                    }, t) : e.height(n.slides.eq(n.animatingTo).height())
                }
            },
            sync: function(e) {
                var i = t(n.vars.sync).data("flexslider"),
                    s = n.animatingTo;
                switch (e) {
                    case "animate":
                        i.flexAnimate(s, n.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        i.playing || i.asNav || i.play();
                        break;
                    case "pause":
                        i.pause()
                }
            },
            uniqueID: function(e) {
                return e.filter("[id]").add(e.find("[id]")).each(function() {
                    var e = t(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var t = m.pauseInvisible.getHiddenProp();
                    if (t) {
                        var e = t.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(e, function() {
                            m.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play()
                        })
                    }
                },
                isHidden: function() {
                    var t = m.pauseInvisible.getHiddenProp();
                    return !!t && document[t]
                },
                getHiddenProp: function() {
                    var t = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var e = 0; e < t.length; e++)
                        if (t[e] + "Hidden" in document) return t[e] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(o), o = setTimeout(function() {
                    c = ""
                }, 3e3)
            }
        }, n.flexAnimate = function(e, i, s, o, r) {
            if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), g && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, r) || s) && n.is(":visible")) {
                if (g && o) {
                    var h = t(n.vars.asNavFor).data("flexslider");
                    if (n.atEnd = 0 === e || e === n.count - 1, h.flexAnimate(e, !0, !1, !0, r), n.direction = n.currentItem < e ? "next" : "prev", h.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(a + "active-slide").eq(e).addClass(a + "active-slide"), !1;
                    n.currentItem = e, n.slides.removeClass(a + "active-slide").eq(e).addClass(a + "active-slide"), e = Math.floor(e / n.visible)
                }
                if (n.animating = !0,
                    n.animatingTo = e, i && n.pause(), n.vars.before(n), n.syncExists && !r && m.sync("animate"), n.vars.controlNav && m.controlNav.active(), p || n.slides.removeClass(a + "active-slide").eq(e).addClass(a + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && m.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), f) l ? (n.slides.eq(n.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), n.slides.eq(e).css({
                    opacity: 1,
                    zIndex: 2
                }), n.wrapup(y)) : (n.slides.eq(n.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, n.vars.animationSpeed, n.vars.easing, n.wrapup));
                else {
                    var c, v, b, y = d ? n.slides.filter(":first").height() : n.computedW;
                    p ? (c = n.vars.itemMargin, b = (n.itemW + c) * n.move * n.animatingTo, v = b > n.limit && 1 !== n.visible ? n.limit : b) : v = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? u ? (n.count + n.cloneOffset) * y : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? u ? 0 : (n.count + 1) * y : u ? (n.count - 1 - e + n.cloneOffset) * y : (e + n.cloneOffset) * y, n.setProps(v, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(n.ensureAnimationEnd), n.wrapup(y)
                    }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function() {
                        n.wrapup(y)
                    }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function() {
                        n.wrapup(y)
                    })
                }
                n.vars.smoothHeight && m.smoothHeight(n.vars.animationSpeed)
            }
        }, n.wrapup = function(t) {
            f || p || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(t, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(t, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
        }, n.animateSlides = function() {
            !n.animating && e && n.flexAnimate(n.getTarget("next"))
        }, n.pause = function() {
            clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && m.pausePlay.update("play"), n.syncExists && m.sync("pause")
        }, n.play = function() {
            n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && m.pausePlay.update("pause"), n.syncExists && m.sync("play")
        }, n.stop = function() {
            n.pause(), n.stopped = !0
        }, n.canAdvance = function(t, e) {
            var i = g ? n.pagingCount - 1 : n.last;
            return !!e || (!(!g || n.currentItem !== n.count - 1 || 0 !== t || "prev" !== n.direction) || (!g || 0 !== n.currentItem || t !== n.pagingCount - 1 || "next" === n.direction) && (!(t === n.currentSlide && !g) && (!!n.vars.animationLoop || (!n.atEnd || 0 !== n.currentSlide || t !== i || "next" === n.direction) && (!n.atEnd || n.currentSlide !== i || 0 !== t || "next" !== n.direction))))
        }, n.getTarget = function(t) {
            return n.direction = t, "next" === t ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
        }, n.setProps = function(t, e, i) {
            var s = function() {
                var i = t ? t : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
                    s = function() {
                        if (p) return "setTouch" === e ? t : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : i;
                        switch (e) {
                            case "setTotal":
                                return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * t : (n.currentSlide + n.cloneOffset) * t;
                            case "setTouch":
                                return u ? t : t;
                            case "jumpEnd":
                                return u ? t : n.count * t;
                            case "jumpStart":
                                return u ? n.count * t : t;
                            default:
                                return t
                        }
                    }();
                return s * -1 + "px"
            }();
            n.transitions && (s = d ? "translate3d(0," + s + ",0)" : "translate3d(" + s + ",0,0)", i = void 0 !== i ? i / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", i), n.container.css("transition-duration", i)), n.args[n.prop] = s, (n.transitions || void 0 === i) && n.container.css(n.args), n.container.css("transform", s)
        }, n.setup = function(e) {
            if (f) n.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === e && (l ? n.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(n.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && m.smoothHeight();
            else {
                var i, s;
                "init" === e && (n.viewport = t('<div class="' + a + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (s = t.makeArray(n.slides).reverse(), n.slides = t(s), n.container.empty().append(n.slides))), n.vars.animationLoop && !p && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(m.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = t(n.vars.selector, n), i = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !p ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    n.newSlides.css({
                        display: "block"
                    }), n.doMath(), n.viewport.height(n.h), n.setProps(i * n.h, "init")
                }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(i * n.computedW, "init"), setTimeout(function() {
                    n.doMath(), n.newSlides.css({
                        width: n.computedW,
                        marginRight: n.computedM,
                        "float": "left",
                        display: "block"
                    }), n.vars.smoothHeight && m.smoothHeight()
                }, "init" === e ? 100 : 0))
            }
            p || n.slides.removeClass(a + "active-slide").eq(n.currentSlide).addClass(a + "active-slide"), n.vars.init(n)
        }, n.doMath = function() {
            var t = n.slides.first(),
                e = n.vars.itemMargin,
                i = n.vars.minItems,
                s = n.vars.maxItems;
            n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = t.height(), n.boxPadding = t.outerWidth() - t.width(), p ? (n.itemT = n.vars.itemWidth + e, n.itemM = e, n.minW = i ? i * n.itemT : n.w, n.maxW = s ? s * n.itemT - e : n.w, n.itemW = n.minW > n.w ? (n.w - e * (i - 1)) / i : n.maxW < n.w ? (n.w - e * (s - 1)) / s : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + e * (n.count - 1) : (n.itemW + e) * n.count - n.w - e) : (n.itemW = n.w, n.itemM = e, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding, n.computedM = n.itemM
        }, n.update = function(t, e) {
            n.doMath(), p || (t < n.currentSlide ? n.currentSlide += 1 : t <= n.currentSlide && 0 !== t && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === e && !p || n.pagingCount > n.controlNav.length ? m.controlNav.update("add") : ("remove" === e && !p || n.pagingCount < n.controlNav.length) && (p && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), m.controlNav.update("remove", n.last))), n.vars.directionNav && m.directionNav.update()
        }, n.addSlide = function(e, i) {
            var s = t(e);
            n.count += 1, n.last = n.count - 1, d && u ? void 0 !== i ? n.slides.eq(n.count - i).after(s) : n.container.prepend(s) : void 0 !== i ? n.slides.eq(i).before(s) : n.container.append(s), n.update(i, "add"), n.slides = t(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
        }, n.removeSlide = function(e) {
            var i = isNaN(e) ? n.slides.index(t(e)) : e;
            n.count -= 1, n.last = n.count - 1, isNaN(e) ? t(e, n.slides).remove() : d && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(i, "remove"), n.slides = t(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
        }, m.init()
    }, t(window).blur(function(t) {
        e = !1
    }).focus(function(t) {
        e = !0
    }), t.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, t.fn.flexslider = function(e) {
        if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() {
            var i = t(this),
                s = e.selector ? e.selector : ".slides > li",
                n = i.find(s);
            1 === n.length && e.allowOneSlide === !0 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(i)) : void 0 === i.data("flexslider") && new t.flexslider(this, e)
        });
        var i = t(this).data("flexslider");
        switch (e) {
            case "play":
                i.play();
                break;
            case "pause":
                i.pause();
                break;
            case "stop":
                i.stop();
                break;
            case "next":
                i.flexAnimate(i.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                i.flexAnimate(i.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof e && i.flexAnimate(e, !0)
        }
    }
}(jQuery), ! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var e = window.Slick || {};
    e = function() {
        function e(e, s) {
            var n, o = this;
            o.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: t(e),
                appendDots: t(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, e) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (e + 1) + "</button>"
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !1,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, o.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, t.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.hidden = "hidden", o.paused = !1, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = t(e), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, n = t(e).data("slick") || {}, o.options = t.extend({}, o.defaults, n, s), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, "undefined" != typeof document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = t.proxy(o.autoPlay, o), o.autoPlayClear = t.proxy(o.autoPlayClear, o), o.changeSlide = t.proxy(o.changeSlide, o), o.clickHandler = t.proxy(o.clickHandler, o), o.selectHandler = t.proxy(o.selectHandler, o), o.setPosition = t.proxy(o.setPosition, o), o.swipeHandler = t.proxy(o.swipeHandler, o), o.dragHandler = t.proxy(o.dragHandler, o), o.keyHandler = t.proxy(o.keyHandler, o), o.autoPlayIterator = t.proxy(o.autoPlayIterator, o), o.instanceUid = i++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0), o.checkResponsive(!0)
        }
        var i = 0;
        return e
    }(), e.prototype.addSlide = e.prototype.slickAdd = function(e, i, s) {
        var n = this;
        if ("boolean" == typeof i) s = i, i = null;
        else if (0 > i || i >= n.slideCount) return !1;
        n.unload(), "number" == typeof i ? 0 === i && 0 === n.$slides.length ? t(e).appendTo(n.$slideTrack) : s ? t(e).insertBefore(n.$slides.eq(i)) : t(e).insertAfter(n.$slides.eq(i)) : s === !0 ? t(e).prependTo(n.$slideTrack) : t(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e)
        }), n.$slidesCache = n.$slides, n.reinit()
    }, e.prototype.animateHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({
                height: e
            }, t.options.speed)
        }
    }, e.prototype.animateSlide = function(e, i) {
        var s = {},
            n = this;
        n.animateHeight(), n.options.rtl === !0 && n.options.vertical === !1 && (e = -e), n.transformsEnabled === !1 ? n.options.vertical === !1 ? n.$slideTrack.animate({
            left: e
        }, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({
            top: e
        }, n.options.speed, n.options.easing, i) : n.cssTransitions === !1 ? (n.options.rtl === !0 && (n.currentLeft = -n.currentLeft), t({
            animStart: n.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: n.options.speed,
            easing: n.options.easing,
            step: function(t) {
                t = Math.ceil(t), n.options.vertical === !1 ? (s[n.animType] = "translate(" + t + "px, 0px)", n.$slideTrack.css(s)) : (s[n.animType] = "translate(0px," + t + "px)", n.$slideTrack.css(s))
            },
            complete: function() {
                i && i.call()
            }
        })) : (n.applyTransition(), e = Math.ceil(e), n.options.vertical === !1 ? s[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : s[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(s), i && setTimeout(function() {
            n.disableTransition(), i.call()
        }, n.options.speed))
    }, e.prototype.asNavFor = function(e) {
        var i = this,
            s = i.options.asNavFor;
        s && null !== s && (s = t(s).not(i.$slider)), null !== s && "object" == typeof s && s.each(function() {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(t) {
        var e = this,
            i = {};
        e.options.fade === !1 ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.autoPlay = function() {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var t = this;
        t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (t.currentSlide - 1 === 0 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
    }, e.prototype.buildArrows = function() {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, i, s = this;
        if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
            for (i = '<ul class="' + s.options.dotsClass + '">', e = 0; e <= s.getDotCount(); e += 1) i += "<li>" + s.options.customPaging.call(this, s, e) + "</li>";
            i += "</ul>", s.$dots = t(i).appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var t, e, i, s, n, o, a, r = this;
        if (s = document.createDocumentFragment(), o = r.$slider.children(), r.options.rows > 1) {
            for (a = r.options.slidesPerRow * r.options.rows, n = Math.ceil(o.length / a), t = 0; n > t; t++) {
                var l = document.createElement("div");
                for (e = 0; e < r.options.rows; e++) {
                    var h = document.createElement("div");
                    for (i = 0; i < r.options.slidesPerRow; i++) {
                        var c = t * a + (e * r.options.slidesPerRow + i);
                        o.get(c) && h.appendChild(o.get(c))
                    }
                    l.appendChild(h)
                }
                s.appendChild(l)
            }
            r.$slider.html(s), r.$slider.children().children().children().css({
                width: 100 / r.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, i) {
        var s, n, o, a = this,
            r = !1,
            l = a.$slider.width(),
            h = window.innerWidth || t(window).width();
        if ("window" === a.respondTo ? o = h : "slider" === a.respondTo ? o = l : "min" === a.respondTo && (o = Math.min(h, l)), a.options.responsive && a.options.responsive.length && null !== a.options.responsive) {
            n = null;
            for (s in a.breakpoints) a.breakpoints.hasOwnProperty(s) && (a.originalSettings.mobileFirst === !1 ? o < a.breakpoints[s] && (n = a.breakpoints[s]) : o > a.breakpoints[s] && (n = a.breakpoints[s]));
            null !== n ? null !== a.activeBreakpoint ? (n !== a.activeBreakpoint || i) && (a.activeBreakpoint = n, "unslick" === a.breakpointSettings[n] ? a.unslick(n) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[n]), e === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = n) : (a.activeBreakpoint = n, "unslick" === a.breakpointSettings[n] ? a.unslick(n) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[n]), e === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = n) : null !== a.activeBreakpoint && (a.activeBreakpoint = null, a.options = a.originalSettings, e === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(e), r = n), e || r === !1 || a.$slider.trigger("breakpoint", [a, r])
        }
    }, e.prototype.changeSlide = function(e, i) {
        var s, n, o, a = this,
            r = t(e.target);
        switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), o = a.slideCount % a.options.slidesToScroll !== 0, s = o ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll, e.data.message) {
            case "previous":
                n = 0 === s ? a.options.slidesToScroll : a.options.slidesToShow - s, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - n, !1, i);
                break;
            case "next":
                n = 0 === s ? a.options.slidesToScroll : s, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + n, !1, i);
                break;
            case "index":
                var l = 0 === e.data.index ? 0 : e.data.index || r.index() * a.options.slidesToScroll;
                a.slideHandler(a.checkNavigable(l), !1, i), r.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(t) {
        var e, i, s = this;
        if (e = s.getNavigableIndexes(), i = 0, t > e[e.length - 1]) t = e[e.length - 1];
        else
            for (var n in e) {
                if (t < e[n]) {
                    t = i;
                    break
                }
                i = e[n]
            }
        return t
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide), e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).off("mouseenter.slick", t.proxy(e.setPaused, e, !0)).off("mouseleave.slick", t.proxy(e.setPaused, e, !1))), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.$list.off("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpRows = function() {
        var t, e = this;
        e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.html(t))
    }, e.prototype.clickHandler = function(t) {
        var e = this;
        e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, e.prototype.destroy = function(e) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            t(this).attr("style", t(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
    }, e.prototype.disableTransition = function(t) {
        var e = this,
            i = {};
        i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.fadeSlide = function(t, e) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(t).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(t).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function() {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, e.prototype.fadeSlideOut = function(t) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        var t = this;
        return t.currentSlide
    }, e.prototype.getDotCount = function() {
        var t = this,
            e = 0,
            i = 0,
            s = 0;
        if (t.options.infinite === !0)
            for (; e < t.slideCount;) ++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else if (t.options.centerMode === !0) s = t.slideCount;
        else
            for (; e < t.slideCount;) ++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return s - 1
    }, e.prototype.getLeft = function(t) {
        var e, i, s, n = this,
            o = 0;
        return n.slideOffset = 0, i = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, o = i * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll !== 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (t > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (t - n.slideCount)) * n.slideWidth * -1, o = (n.options.slidesToShow - (t - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, o = n.slideCount % n.options.slidesToScroll * i * -1))) : t + n.options.slidesToShow > n.slideCount && (n.slideOffset = (t + n.options.slidesToShow - n.slideCount) * n.slideWidth, o = (t + n.options.slidesToShow - n.slideCount) * i), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, o = 0), n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? t * n.slideWidth * -1 + n.slideOffset : t * i * -1 + o, n.options.variableWidth === !0 && (s = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow), e = n.options.rtl === !0 ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, n.options.centerMode === !0 && (s = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, e += (n.$list.width() - s.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
        var e = this;
        return e.options[t]
    }, e.prototype.getNavigableIndexes = function() {
        var t, e = this,
            i = 0,
            s = 0,
            n = [];
        for (e.options.infinite === !1 ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, s = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); t > i;) n.push(i), i = s + e.options.slidesToScroll, s += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return n
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, i, s, n = this;
        return s = n.options.centerMode === !0 ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(e, o) {
            return o.offsetLeft - s + t(o).outerWidth() / 2 > -1 * n.swipeLeft ? (i = o, !1) : void 0
        }), e = Math.abs(t(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
        var i = this;
        i.changeSlide({
            data: {
                message: "index",
                index: parseInt(t)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots()), e && i.$slider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA()
    }, e.prototype.initArrowEvents = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
            message: "previous"
        }, t.changeSlide), t.$nextArrow.on("click.slick", {
            message: "next"
        }, t.changeSlide))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.setPaused, e, !0)).on("mouseleave.slick", t.proxy(e.setPaused, e, !1))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), e.$list.on("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.initUI = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
    }, e.prototype.keyHandler = function(t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({
            data: {
                message: "previous"
            }
        }) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide({
            data: {
                message: "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            t("img[data-lazy]", e).each(function() {
                var e = t(this),
                    i = t(this).attr("data-lazy"),
                    s = document.createElement("img");
                s.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        e.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy").removeClass("slick-loading")
                        })
                    })
                }, s.src = i
            })
        }
        var i, s, n, o, a = this;
        a.options.centerMode === !0 ? a.options.infinite === !0 ? (n = a.currentSlide + (a.options.slidesToShow / 2 + 1), o = n + a.options.slidesToShow + 2) : (n = Math.max(0, a.currentSlide - (a.options.slidesToShow / 2 + 1)), o = 2 + (a.options.slidesToShow / 2 + 1) + a.currentSlide) : (n = a.options.infinite ? a.options.slidesToShow + a.currentSlide : a.currentSlide, o = n + a.options.slidesToShow, a.options.fade === !0 && (n > 0 && n--, o <= a.slideCount && o++)), i = a.$slider.find(".slick-slide").slice(n, o), e(i), a.slideCount <= a.options.slidesToShow ? (s = a.$slider.find(".slick-slide"), e(s)) : a.currentSlide >= a.slideCount - a.options.slidesToShow ? (s = a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow), e(s)) : 0 === a.currentSlide && (s = a.$slider.find(".slick-cloned").slice(-1 * a.options.slidesToShow), e(s))
    }, e.prototype.loadSlider = function() {
        var t = this;
        t.setPosition(), t.$slideTrack.css({
            opacity: 1
        }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        var t = this;
        t.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var t = this;
        t.checkResponsive(), t.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var t = this;
        t.autoPlayClear(), t.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var t = this;
        t.paused = !1, t.autoPlay()
    }, e.prototype.postSlide = function(t) {
        var e = this;
        e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay === !0 && e.paused === !1 && e.autoPlay(), e.options.accessibility === !0 && e.initADA()
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        var t = this;
        t.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(t) {
        t.preventDefault()
    }, e.prototype.progressiveLazyLoad = function() {
        var e, i, s = this;
        e = t("img[data-lazy]", s.$slider).length, e > 0 && (i = t("img[data-lazy]", s.$slider).first(), i.attr("src", null), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function() {
            i.removeAttr("data-lazy"), s.progressiveLazyLoad(), s.options.adaptiveHeight === !0 && s.setPosition()
        }).error(function() {
            i.removeAttr("data-lazy"), s.progressiveLazyLoad()
        }))
    }, e.prototype.refresh = function(e) {
        var i, s, n = this;
        s = n.slideCount - n.options.slidesToShow, n.options.infinite || (n.slideCount <= n.options.slidesToShow ? n.currentSlide = 0 : n.currentSlide > s && (n.currentSlide = s)),
            i = n.currentSlide, n.destroy(!0), t.extend(n, n.initials, {
                currentSlide: i
            }), n.init(), e || n.changeSlide({
                data: {
                    message: "index",
                    index: i
                }
            }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, i, s, n = this,
            o = n.options.responsive || null;
        if ("array" === t.type(o) && o.length) {
            n.respondTo = n.options.respondTo || "window";
            for (e in o)
                if (s = n.breakpoints.length - 1, i = o[e].breakpoint, o.hasOwnProperty(e)) {
                    for (; s >= 0;) n.breakpoints[s] && n.breakpoints[s] === i && n.breakpoints.splice(s, 1), s--;
                    n.breakpoints.push(i), n.breakpointSettings[i] = o[e].settings
                }
            n.breakpoints.sort(function(t, e) {
                return n.options.mobileFirst ? t - e : e - t
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses(0), e.setPosition(), e.$slider.trigger("reInit", [e]), e.options.autoplay === !0 && e.focusHandler()
    }, e.prototype.resize = function() {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, i) {
        var s = this;
        return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : s.slideCount - 1) : t = e === !0 ? --t : t, !(s.slideCount < 1 || 0 > t || t > s.slideCount - 1) && (s.unload(), i === !0 ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, void s.reinit())
    }, e.prototype.setCSS = function(t) {
        var e, i, s = this,
            n = {};
        s.options.rtl === !0 && (t = -t), e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", n[s.positionProp] = t, s.transformsEnabled === !1 ? s.$slideTrack.css(n) : (n = {}, s.cssTransitions === !1 ? (n[s.animType] = "translate(" + e + ", " + i + ")", s.$slideTrack.css(n)) : (n[s.animType] = "translate3d(" + e + ", " + i + ", 0px)", s.$slideTrack.css(n)))
    }, e.prototype.setDimensions = function() {
        var t = this;
        t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
            padding: "0px " + t.options.centerPadding
        }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
            padding: t.options.centerPadding + " 0px"
        })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, i = this;
        i.$slides.each(function(s, n) {
            e = i.slideWidth * s * -1, i.options.rtl === !0 ? t(n).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : t(n).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function(e, i, s) {
        var n, o, a = this;
        if ("responsive" === e && "array" === t.type(i))
            for (o in i)
                if ("array" !== t.type(a.options.responsive)) a.options.responsive = [i[o]];
                else {
                    for (n = a.options.responsive.length - 1; n >= 0;) a.options.responsive[n].breakpoint === i[o].breakpoint && a.options.responsive.splice(n, 1), n--;
                    a.options.responsive.push(i[o])
                } else a.options[e] = i;
        s === !0 && (a.unload(), a.reinit())
    }, e.prototype.setPosition = function() {
        var t = this;
        t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
    }, e.prototype.setProps = function() {
        var t = this,
            e = document.body.style;
        t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && t.animType !== !1
    }, e.prototype.setSlideClasses = function(t) {
        var e, i, s, n, o = this;
        i = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), o.$slides.eq(t).addClass("slick-current"), o.options.centerMode === !0 ? (e = Math.floor(o.options.slidesToShow / 2), o.options.infinite === !0 && (t >= e && t <= o.slideCount - 1 - e ? o.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = o.options.slidesToShow + t, i.slice(s - e + 1, s + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - o.options.slidesToShow).addClass("slick-center") : t === o.slideCount - 1 && i.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(t, t + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= o.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = o.slideCount % o.options.slidesToShow, s = o.options.infinite === !0 ? o.options.slidesToShow + t : t, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - t < o.options.slidesToShow ? i.slice(s - (o.options.slidesToShow - n), s + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === o.options.lazyLoad && o.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, i, s, n = this;
        if (n.options.fade === !0 && (n.options.centerMode = !1), n.options.infinite === !0 && n.options.fade === !1 && (i = null, n.slideCount > n.options.slidesToShow)) {
            for (s = n.options.centerMode === !0 ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - s; e -= 1) i = e - 1, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
            for (e = 0; s > e; e += 1) i = e, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
            n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                t(this).attr("id", "")
            })
        }
    }, e.prototype.setPaused = function(t) {
        var e = this;
        e.options.autoplay === !0 && e.options.pauseOnHover === !0 && (e.paused = t, t ? e.autoPlayClear() : e.autoPlay())
    }, e.prototype.selectHandler = function(e) {
        var i = this,
            s = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
            n = parseInt(s.attr("data-slick-index"));
        return n || (n = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(n), void i.asNavFor(n)) : void i.slideHandler(n)
    }, e.prototype.slideHandler = function(t, e, i) {
        var s, n, o, a, r = null,
            l = this;
        return e = e || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (e === !1 && l.asNavFor(t), s = t, r = l.getLeft(s), a = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? a : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, i !== !0 ? l.animateSlide(a, function() {
            l.postSlide(s)
        }) : l.postSlide(s))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, i !== !0 ? l.animateSlide(a, function() {
            l.postSlide(s)
        }) : l.postSlide(s))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), n = 0 > s ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + s : s >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : s - l.slideCount : s, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, n]), o = l.currentSlide, l.currentSlide = n, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (i !== !0 ? (l.fadeSlideOut(o), l.fadeSlide(n, function() {
            l.postSlide(n)
        })) : l.postSlide(n), void l.animateHeight()) : void(i !== !0 ? l.animateSlide(r, function() {
            l.postSlide(n)
        }) : l.postSlide(n))))
    }, e.prototype.startLoad = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var t, e, i, s, n = this;
        return t = n.touchObject.startX - n.touchObject.curX, e = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(e, t), s = Math.round(180 * i / Math.PI), 0 > s && (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? n.options.rtl === !1 ? "left" : "right" : 360 >= s && s >= 315 ? n.options.rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ? n.options.rtl === !1 ? "right" : "left" : n.options.verticalSwiping === !0 ? s >= 35 && 135 >= s ? "left" : "right" : "vertical"
    }, e.prototype.swipeEnd = function(t) {
        var e, i = this;
        if (i.dragging = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
        if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (i.swipeDirection()) {
            case "left":
                e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(e), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                break;
            case "right":
                e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(e), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
        } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
    }, e.prototype.swipeHandler = function(t) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case "start":
                e.swipeStart(t);
                break;
            case "move":
                e.swipeMove(t);
                break;
            case "end":
                e.swipeEnd(t)
        }
    }, e.prototype.swipeMove = function(t) {
        var e, i, s, n, o, a = this;
        return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || o && 1 !== o.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, a.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), a.options.verticalSwiping === !0 && (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))), i = a.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && t.preventDefault(), n = (a.options.rtl === !1 ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), a.options.verticalSwiping === !0 && (n = a.touchObject.curY > a.touchObject.startY ? 1 : -1), s = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, a.options.infinite === !1 && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (s = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), a.options.vertical === !1 ? a.swipeLeft = e + s * n : a.swipeLeft = e + s * (a.$list.height() / a.listWidth) * n, a.options.verticalSwiping === !0 && (a.swipeLeft = e + s * n), a.options.fade !== !0 && a.options.touchMove !== !1 && (a.animating === !0 ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))) : void 0)
    }, e.prototype.swipeStart = function(t) {
        var e, i = this;
        return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(t) {
        var e = this;
        e.$slider.trigger("unslick", [e, t]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var t, e = this;
        t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, e.prototype.visibility = function() {
        var t = this;
        document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
            t(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + e.instanceUid + i
            })
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function(i) {
            t(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + i,
                id: "slick-slide" + e.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, e.prototype.activateADA = function() {
        var t = this;
        t.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var s = t(this);
            setTimeout(function() {
                e.isPlay && (s.is(":focus") ? (e.autoPlayClear(), e.paused = !0) : (e.paused = !1, e.autoPlay()))
            }, 0)
        })
    }, t.fn.slick = function() {
        var t, i, s = this,
            n = arguments[0],
            o = Array.prototype.slice.call(arguments, 1),
            a = s.length;
        for (t = 0; a > t; t++)
            if ("object" == typeof n || "undefined" == typeof n ? s[t].slick = new e(s[t], n) : i = s[t].slick[n].apply(s[t].slick, o), "undefined" != typeof i) return i;
        return s
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(this, function(t) {
    ! function(t) {
        "use strict";

        function e(e) {
            var i = [{
                re: /[\xC0-\xC6]/g,
                ch: "A"
            }, {
                re: /[\xE0-\xE6]/g,
                ch: "a"
            }, {
                re: /[\xC8-\xCB]/g,
                ch: "E"
            }, {
                re: /[\xE8-\xEB]/g,
                ch: "e"
            }, {
                re: /[\xCC-\xCF]/g,
                ch: "I"
            }, {
                re: /[\xEC-\xEF]/g,
                ch: "i"
            }, {
                re: /[\xD2-\xD6]/g,
                ch: "O"
            }, {
                re: /[\xF2-\xF6]/g,
                ch: "o"
            }, {
                re: /[\xD9-\xDC]/g,
                ch: "U"
            }, {
                re: /[\xF9-\xFC]/g,
                ch: "u"
            }, {
                re: /[\xC7-\xE7]/g,
                ch: "c"
            }, {
                re: /[\xD1]/g,
                ch: "N"
            }, {
                re: /[\xF1]/g,
                ch: "n"
            }];
            return t.each(i, function() {
                e = e.replace(this.re, this.ch)
            }), e
        }

        function i(t) {
            var e = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                i = "(?:" + Object.keys(e).join("|") + ")",
                s = new RegExp(i),
                n = new RegExp(i, "g"),
                o = null == t ? "" : "" + t;
            return s.test(o) ? o.replace(n, function(t) {
                return e[t]
            }) : o
        }

        function s(e, i) {
            var s = arguments,
                o = e,
                a = i;
            [].shift.apply(s);
            var r, l = this.each(function() {
                var e = t(this);
                if (e.is("select")) {
                    var i = e.data("selectpicker"),
                        l = "object" == typeof o && o;
                    if (i) {
                        if (l)
                            for (var h in l) l.hasOwnProperty(h) && (i.options[h] = l[h])
                    } else {
                        var c = t.extend({}, n.DEFAULTS, t.fn.selectpicker.defaults || {}, e.data(), l);
                        c.template = t.extend({}, n.DEFAULTS.template, t.fn.selectpicker.defaults ? t.fn.selectpicker.defaults.template : {}, e.data().template, l.template), e.data("selectpicker", i = new n(this, c, a))
                    }
                    "string" == typeof o && (r = i[o] instanceof Function ? i[o].apply(i, s) : i.options[o])
                }
            });
            return "undefined" != typeof r ? r : l
        }
        String.prototype.includes || ! function() {
            var t = {}.toString,
                e = function() {
                    try {
                        var t = {},
                            e = Object.defineProperty,
                            i = e(t, t, t) && e
                    } catch (s) {}
                    return i
                }(),
                i = "".indexOf,
                s = function(e) {
                    if (null == this) throw new TypeError;
                    var s = String(this);
                    if (e && "[object RegExp]" == t.call(e)) throw new TypeError;
                    var n = s.length,
                        o = String(e),
                        a = o.length,
                        r = arguments.length > 1 ? arguments[1] : void 0,
                        l = r ? Number(r) : 0;
                    l != l && (l = 0);
                    var h = Math.min(Math.max(l, 0), n);
                    return !(a + h > n) && i.call(s, o, l) != -1
                };
            e ? e(String.prototype, "includes", {
                value: s,
                configurable: !0,
                writable: !0
            }) : String.prototype.includes = s
        }(), String.prototype.startsWith || ! function() {
            var t = function() {
                    try {
                        var t = {},
                            e = Object.defineProperty,
                            i = e(t, t, t) && e
                    } catch (s) {}
                    return i
                }(),
                e = {}.toString,
                i = function(t) {
                    if (null == this) throw new TypeError;
                    var i = String(this);
                    if (t && "[object RegExp]" == e.call(t)) throw new TypeError;
                    var s = i.length,
                        n = String(t),
                        o = n.length,
                        a = arguments.length > 1 ? arguments[1] : void 0,
                        r = a ? Number(a) : 0;
                    r != r && (r = 0);
                    var l = Math.min(Math.max(r, 0), s);
                    if (o + l > s) return !1;
                    for (var h = -1; ++h < o;)
                        if (i.charCodeAt(l + h) != n.charCodeAt(h)) return !1;
                    return !0
                };
            t ? t(String.prototype, "startsWith", {
                value: i,
                configurable: !0,
                writable: !0
            }) : String.prototype.startsWith = i
        }(), Object.keys || (Object.keys = function(t, e, i) {
            i = [];
            for (e in t) i.hasOwnProperty.call(t, e) && i.push(e);
            return i
        }), t.fn.triggerNative = function(t) {
            var e, i = this[0];
            i.dispatchEvent ? ("function" == typeof Event ? e = new Event(t, {
                bubbles: !0
            }) : (e = document.createEvent("Event"), e.initEvent(t, !0, !1)), i.dispatchEvent(e)) : (i.fireEvent && (e = document.createEventObject(), e.eventType = t, i.fireEvent("on" + t, e)), this.trigger(t))
        }, t.expr[":"].icontains = function(e, i, s) {
            var n = t(e),
                o = (n.data("tokens") || n.text()).toUpperCase();
            return o.includes(s[3].toUpperCase())
        }, t.expr[":"].ibegins = function(e, i, s) {
            var n = t(e),
                o = (n.data("tokens") || n.text()).toUpperCase();
            return o.startsWith(s[3].toUpperCase())
        }, t.expr[":"].aicontains = function(e, i, s) {
            var n = t(e),
                o = (n.data("tokens") || n.data("normalizedText") || n.text()).toUpperCase();
            return o.includes(s[3].toUpperCase())
        }, t.expr[":"].aibegins = function(e, i, s) {
            var n = t(e),
                o = (n.data("tokens") || n.data("normalizedText") || n.text()).toUpperCase();
            return o.startsWith(s[3].toUpperCase())
        };
        var n = function(e, i, s) {
            s && (s.stopPropagation(), s.preventDefault()), this.$element = t(e), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = i, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = n.prototype.val, this.render = n.prototype.render, this.refresh = n.prototype.refresh, this.setStyle = n.prototype.setStyle, this.selectAll = n.prototype.selectAll, this.deselectAll = n.prototype.deselectAll, this.destroy = n.prototype.destroy, this.remove = n.prototype.remove, this.show = n.prototype.show, this.hide = n.prototype.hide, this.init()
        };
        n.VERSION = "1.9.3", n.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function(t, e) {
                return 1 == t ? "{0} item selected" : "{0} items selected"
            },
            maxOptionsText: function(t, e) {
                return [1 == t ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == e ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: !1,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: "btn-default",
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: !1,
            container: !1,
            hideDisabled: !1,
            showSubtext: !1,
            showIcon: !0,
            showContent: !0,
            dropupAuto: !0,
            header: !1,
            liveSearch: !1,
            liveSearchPlaceholder: null,
            liveSearchNormalize: !1,
            liveSearchStyle: "contains",
            actionsBox: !1,
            iconBase: "glyphicon",
            tickIcon: "glyphicon-ok",
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: !1,
            mobile: !1,
            selectOnTab: !1,
            dropdownAlignRight: !1
        }, n.prototype = {
            constructor: n,
            init: function() {
                var e = this,
                    i = this.$element.attr("id");
                this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof i && (this.$button.attr("data-id", i), t('label[for="' + i + '"]').click(function(t) {
                    t.preventDefault(), e.$button.focus()
                })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
                    "hide.bs.dropdown": function(t) {
                        e.$element.trigger("hide.bs.select", t)
                    },
                    "hidden.bs.dropdown": function(t) {
                        e.$element.trigger("hidden.bs.select", t)
                    },
                    "show.bs.dropdown": function(t) {
                        e.$element.trigger("show.bs.select", t)
                    },
                    "shown.bs.dropdown": function(t) {
                        e.$element.trigger("shown.bs.select", t)
                    }
                }), e.$element[0].hasAttribute("required") && this.$element.on("invalid", function() {
                    e.$button.addClass("bs-invalid").focus(), e.$element.on({
                        "focus.bs.select": function() {
                            e.$button.focus(), e.$element.off("focus.bs.select")
                        },
                        "shown.bs.select": function() {
                            e.$element.val(e.$element.val()).off("shown.bs.select")
                        },
                        "rendered.bs.select": function() {
                            this.validity.valid && e.$button.removeClass("bs-invalid"), e.$element.off("rendered.bs.select")
                        }
                    })
                }), setTimeout(function() {
                    e.$element.trigger("loaded.bs.select")
                })
            },
            createDropdown: function() {
                var e = this.multiple ? " show-tick" : "",
                    s = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                    n = this.autofocus ? " autofocus" : "",
                    o = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                    a = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') + "></div>" : "",
                    r = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                    l = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
                    h = '<div class="btn-group bootstrap-select' + e + s + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + n + '><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open">' + o + a + r + '<ul class="dropdown-menu inner" role="menu"></ul>' + l + "</div></div>";
                return t(h)
            },
            createView: function() {
                var t = this.createDropdown(),
                    e = this.createLi();
                return t.find("ul")[0].innerHTML = e, t
            },
            reloadLi: function() {
                this.destroyLi();
                var t = this.createLi();
                this.$menuInner[0].innerHTML = t
            },
            destroyLi: function() {
                this.$menu.find("li").remove()
            },
            createLi: function() {
                var s = this,
                    n = [],
                    o = 0,
                    a = document.createElement("option"),
                    r = -1,
                    l = function(t, e, i, s) {
                        return "<li" + ("undefined" != typeof i & "" !== i ? ' class="' + i + '"' : "") + ("undefined" != typeof e & null !== e ? ' data-original-index="' + e + '"' : "") + ("undefined" != typeof s & null !== s ? 'data-optgroup="' + s + '"' : "") + ">" + t + "</li>"
                    },
                    h = function(t, n, o, a) {
                        return '<a tabindex="0"' + ("undefined" != typeof n ? ' class="' + n + '"' : "") + ("undefined" != typeof o ? ' style="' + o + '"' : "") + (s.options.liveSearchNormalize ? ' data-normalized-text="' + e(i(t)) + '"' : "") + ("undefined" != typeof a || null !== a ? ' data-tokens="' + a + '"' : "") + ">" + t + '<span class="' + s.options.iconBase + " " + s.options.tickIcon + ' check-mark"></span></a>'
                    };
                if (this.options.title && !this.multiple && (r--, !this.$element.find(".bs-title-option").length)) {
                    var c = this.$element[0];
                    a.className = "bs-title-option", a.appendChild(document.createTextNode(this.options.title)), a.value = "", c.insertBefore(a, c.firstChild), void 0 === t(c.options[c.selectedIndex]).attr("selected") && (a.selected = !0)
                }
                return this.$element.find("option").each(function(e) {
                    var i = t(this);
                    if (r++, !i.hasClass("bs-title-option")) {
                        var a = this.className || "",
                            c = this.style.cssText,
                            d = i.data("content") ? i.data("content") : i.html(),
                            u = i.data("tokens") ? i.data("tokens") : null,
                            p = "undefined" != typeof i.data("subtext") ? '<small class="text-muted">' + i.data("subtext") + "</small>" : "",
                            f = "undefined" != typeof i.data("icon") ? '<span class="' + s.options.iconBase + " " + i.data("icon") + '"></span> ' : "",
                            g = this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled;
                        if ("" !== f && g && (f = "<span>" + f + "</span>"), s.options.hideDisabled && g) return void r--;
                        if (i.data("content") || (d = f + '<span class="text">' + d + p + "</span>"), "OPTGROUP" === this.parentNode.tagName && i.data("divider") !== !0) {
                            var m = " " + this.parentNode.className || "";
                            if (0 === i.index()) {
                                o += 1;
                                var v = this.parentNode.label,
                                    b = "undefined" != typeof i.parent().data("subtext") ? '<small class="text-muted">' + i.parent().data("subtext") + "</small>" : "",
                                    y = i.parent().data("icon") ? '<span class="' + s.options.iconBase + " " + i.parent().data("icon") + '"></span> ' : "";
                                v = y + '<span class="text">' + v + b + "</span>", 0 !== e && n.length > 0 && (r++, n.push(l("", null, "divider", o + "div"))), r++, n.push(l(v, null, "dropdown-header" + m, o))
                            }
                            n.push(l(h(d, "opt " + a + m, c, u), e, "", o))
                        } else i.data("divider") === !0 ? n.push(l("", e, "divider")) : i.data("hidden") === !0 ? n.push(l(h(d, a, c, u), e, "hidden is-hidden")) : (this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName && (r++, n.push(l("", null, "divider", o + "div"))), n.push(l(h(d, a, c, u), e)));
                        s.liObj[e] = r
                    }
                }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), n.join("")
            },
            findLis: function() {
                return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
            },
            render: function(e) {
                var i, s = this;
                e !== !1 && this.$element.find("option").each(function(t) {
                    var e = s.findLis().eq(s.liObj[t]);
                    s.setDisabled(t, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, e), s.setSelected(t, this.selected, e)
                }), this.tabIndex();
                var n = this.$element.find("option").map(function() {
                        if (this.selected) {
                            if (s.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                            var e, i = t(this),
                                n = i.data("icon") && s.options.showIcon ? '<i class="' + s.options.iconBase + " " + i.data("icon") + '"></i> ' : "";
                            return e = s.options.showSubtext && i.data("subtext") && !s.multiple ? ' <small class="text-muted">' + i.data("subtext") + "</small>" : "", "undefined" != typeof i.attr("title") ? i.attr("title") : i.data("content") && s.options.showContent ? i.data("content") : n + i.html() + e
                        }
                    }).toArray(),
                    o = this.multiple ? n.join(this.options.multipleSeparator) : n[0];
                if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                    var a = this.options.selectedTextFormat.split(">");
                    if (a.length > 1 && n.length > a[1] || 1 == a.length && n.length >= 2) {
                        i = this.options.hideDisabled ? ", [disabled]" : "";
                        var r = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + i).length,
                            l = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(n.length, r) : this.options.countSelectedText;
                        o = l.replace("{0}", n.length.toString()).replace("{1}", r.toString())
                    }
                }
                void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (o = this.options.title), o || (o = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", t.trim(o.replace(/<[^>]*>?/g, ""))), this.$button.children(".filter-option").html(o), this.$element.trigger("rendered.bs.select")
            },
            setStyle: function(t, e) {
                this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                var i = t ? t : this.options.style;
                "add" == e ? this.$button.addClass(i) : "remove" == e ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style), this.$button.addClass(i))
            },
            liHeight: function(e) {
                if (e || this.options.size !== !1 && !this.sizeInfo) {
                    var i = document.createElement("div"),
                        s = document.createElement("div"),
                        n = document.createElement("ul"),
                        o = document.createElement("li"),
                        a = document.createElement("li"),
                        r = document.createElement("a"),
                        l = document.createElement("span"),
                        h = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
                        c = this.options.liveSearch ? document.createElement("div") : null,
                        d = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        u = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                    if (l.className = "text", i.className = this.$menu[0].parentNode.className + " open", s.className = "dropdown-menu open", n.className = "dropdown-menu inner", o.className = "divider", l.appendChild(document.createTextNode("Inner text")), r.appendChild(l), a.appendChild(r), n.appendChild(a), n.appendChild(o), h && s.appendChild(h), c) {
                        var p = document.createElement("span");
                        c.className = "bs-searchbox", p.className = "form-control", c.appendChild(p), s.appendChild(c)
                    }
                    d && s.appendChild(d), s.appendChild(n), u && s.appendChild(u), i.appendChild(s), document.body.appendChild(i);
                    var f = r.offsetHeight,
                        g = h ? h.offsetHeight : 0,
                        m = c ? c.offsetHeight : 0,
                        v = d ? d.offsetHeight : 0,
                        b = u ? u.offsetHeight : 0,
                        y = t(o).outerHeight(!0),
                        w = "function" == typeof getComputedStyle && getComputedStyle(s),
                        _ = w ? null : t(s),
                        x = parseInt(w ? w.paddingTop : _.css("paddingTop")) + parseInt(w ? w.paddingBottom : _.css("paddingBottom")) + parseInt(w ? w.borderTopWidth : _.css("borderTopWidth")) + parseInt(w ? w.borderBottomWidth : _.css("borderBottomWidth")),
                        k = x + parseInt(w ? w.marginTop : _.css("marginTop")) + parseInt(w ? w.marginBottom : _.css("marginBottom")) + 2;
                    document.body.removeChild(i), this.sizeInfo = {
                        liHeight: f,
                        headerHeight: g,
                        searchHeight: m,
                        actionsHeight: v,
                        doneButtonHeight: b,
                        dividerHeight: y,
                        menuPadding: x,
                        menuExtras: k
                    }
                }
            },
            setSize: function() {
                if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), this.options.size !== !1) {
                    var e, i, s, n, o = this,
                        a = this.$menu,
                        r = this.$menuInner,
                        l = t(window),
                        h = this.$newElement[0].offsetHeight,
                        c = this.sizeInfo.liHeight,
                        d = this.sizeInfo.headerHeight,
                        u = this.sizeInfo.searchHeight,
                        p = this.sizeInfo.actionsHeight,
                        f = this.sizeInfo.doneButtonHeight,
                        g = this.sizeInfo.dividerHeight,
                        m = this.sizeInfo.menuPadding,
                        v = this.sizeInfo.menuExtras,
                        b = this.options.hideDisabled ? ".disabled" : "",
                        y = function() {
                            s = o.$newElement.offset().top - l.scrollTop(), n = l.height() - s - h
                        };
                    if (y(), "auto" === this.options.size) {
                        var w = function() {
                            var l, h = function(e, i) {
                                    return function(s) {
                                        return i ? s.classList ? s.classList.contains(e) : t(s).hasClass(e) : !(s.classList ? s.classList.contains(e) : t(s).hasClass(e))
                                    }
                                },
                                g = o.$menuInner[0].getElementsByTagName("li"),
                                b = Array.prototype.filter ? Array.prototype.filter.call(g, h("hidden", !1)) : o.$lis.not(".hidden"),
                                w = Array.prototype.filter ? Array.prototype.filter.call(b, h("dropdown-header", !0)) : b.filter(".dropdown-header");
                            y(), e = n - v, o.options.container ? (a.data("height") || a.data("height", a.height()), i = a.data("height")) : i = a.height(), o.options.dropupAuto && o.$newElement.toggleClass("dropup", s > n && e - v < i), o.$newElement.hasClass("dropup") && (e = s - v), l = b.length + w.length > 3 ? 3 * c + v - 2 : 0, a.css({
                                "max-height": e + "px",
                                overflow: "hidden",
                                "min-height": l + d + u + p + f + "px"
                            }), r.css({
                                "max-height": e - d - u - p - f - m + "px",
                                "overflow-y": "auto",
                                "min-height": Math.max(l - m, 0) + "px"
                            })
                        };
                        w(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", w), l.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", w)
                    } else if (this.options.size && "auto" != this.options.size && this.$lis.not(b).length > this.options.size) {
                        var _ = this.$lis.not(".divider").not(b).children().slice(0, this.options.size).last().parent().index(),
                            x = this.$lis.slice(0, _ + 1).filter(".divider").length;
                        e = c * this.options.size + x * g + m, o.options.container ? (a.data("height") || a.data("height", a.height()), i = a.data("height")) : i = a.height(), o.options.dropupAuto && this.$newElement.toggleClass("dropup", s > n && e - v < i), a.css({
                            "max-height": e + d + u + p + f + "px",
                            overflow: "hidden",
                            "min-height": ""
                        }), r.css({
                            "max-height": e - m + "px",
                            "overflow-y": "auto",
                            "min-height": ""
                        })
                    }
                }
            },
            setWidth: function() {
                if ("auto" === this.options.width) {
                    this.$menu.css("min-width", "0");
                    var t = this.$menu.parent().clone().appendTo("body"),
                        e = this.options.container ? this.$newElement.clone().appendTo("body") : t,
                        i = t.children(".dropdown-menu").outerWidth(),
                        s = e.css("width", "auto").children("button").outerWidth();
                    t.remove(), e.remove(), this.$newElement.css("width", Math.max(i, s) + "px")
                } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
                this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
            },
            selectPosition: function() {
                this.$bsContainer = t('<div class="bs-container" />');
                var e, i, s = this,
                    n = function(t) {
                        s.$bsContainer.addClass(t.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", t.hasClass("dropup")), e = t.offset(), i = t.hasClass("dropup") ? 0 : t[0].offsetHeight, s.$bsContainer.css({
                            top: e.top + i,
                            left: e.left,
                            width: t[0].offsetWidth
                        })
                    };
                this.$button.on("click", function() {
                    var e = t(this);
                    s.isDisabled() || (n(s.$newElement), s.$bsContainer.appendTo(s.options.container).toggleClass("open", !e.hasClass("open")).append(s.$menu))
                }), t(window).on("resize scroll", function() {
                    n(s.$newElement)
                }), this.$element.on("hide.bs.select", function() {
                    s.$menu.data("height", s.$menu.height()), s.$bsContainer.detach()
                })
            },
            setSelected: function(t, e, i) {
                i || (i = this.findLis().eq(this.liObj[t])), i.toggleClass("selected", e)
            },
            setDisabled: function(t, e, i) {
                i || (i = this.findLis().eq(this.liObj[t])), e ? i.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1) : i.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0)
            },
            isDisabled: function() {
                return this.$element[0].disabled
            },
            checkDisabled: function() {
                var t = this;
                this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled")), this.$button.attr("tabindex") != -1 || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() {
                    return !t.isDisabled()
                })
            },
            tabIndex: function() {
                this.$element.data("tabindex") !== this.$element.attr("tabindex") && this.$element.attr("tabindex") !== -98 && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98)
            },
            clickListener: function() {
                var e = this,
                    i = t(document);
                this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(t) {
                    t.stopPropagation()
                }), i.data("spaceSelect", !1), this.$button.on("keyup", function(t) {
                    /(32)/.test(t.keyCode.toString(10)) && i.data("spaceSelect") && (t.preventDefault(), i.data("spaceSelect", !1))
                }), this.$button.on("click", function() {
                    e.setSize(), e.$element.on("shown.bs.select", function() {
                        if (e.options.liveSearch || e.multiple) {
                            if (!e.multiple) {
                                var t = e.liObj[e.$element[0].selectedIndex];
                                if ("number" != typeof t || e.options.size === !1) return;
                                var i = e.$lis.eq(t)[0].offsetTop - e.$menuInner[0].offsetTop;
                                i = i - e.$menuInner[0].offsetHeight / 2 + e.sizeInfo.liHeight / 2, e.$menuInner[0].scrollTop = i
                            }
                        } else e.$menuInner.find(".selected a").focus()
                    })
                }), this.$menuInner.on("click", "li a", function(i) {
                    var s = t(this),
                        n = s.parent().data("originalIndex"),
                        o = e.$element.val(),
                        a = e.$element.prop("selectedIndex");
                    if (e.multiple && i.stopPropagation(), i.preventDefault(), !e.isDisabled() && !s.parent().hasClass("disabled")) {
                        var r = e.$element.find("option"),
                            l = r.eq(n),
                            h = l.prop("selected"),
                            c = l.parent("optgroup"),
                            d = e.options.maxOptions,
                            u = c.data("maxOptions") || !1;
                        if (e.multiple) {
                            if (l.prop("selected", !h), e.setSelected(n, !h), s.blur(), d !== !1 || u !== !1) {
                                var p = d < r.filter(":selected").length,
                                    f = u < c.find("option:selected").length;
                                if (d && p || u && f)
                                    if (d && 1 == d) r.prop("selected", !1), l.prop("selected", !0), e.$menuInner.find(".selected").removeClass("selected"), e.setSelected(n, !0);
                                    else if (u && 1 == u) {
                                    c.find("option:selected").prop("selected", !1), l.prop("selected", !0);
                                    var g = s.parent().data("optgroup");
                                    e.$menuInner.find('[data-optgroup="' + g + '"]').removeClass("selected"), e.setSelected(n, !0)
                                } else {
                                    var m = "function" == typeof e.options.maxOptionsText ? e.options.maxOptionsText(d, u) : e.options.maxOptionsText,
                                        v = m[0].replace("{n}", d),
                                        b = m[1].replace("{n}", u),
                                        y = t('<div class="notify"></div>');
                                    m[2] && (v = v.replace("{var}", m[2][d > 1 ? 0 : 1]), b = b.replace("{var}", m[2][u > 1 ? 0 : 1])), l.prop("selected", !1), e.$menu.append(y), d && p && (y.append(t("<div>" + v + "</div>")), e.$element.trigger("maxReached.bs.select")), u && f && (y.append(t("<div>" + b + "</div>")), e.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                        e.setSelected(n, !1)
                                    }, 10), y.delay(750).fadeOut(300, function() {
                                        t(this).remove()
                                    })
                                }
                            }
                        } else r.prop("selected", !1), l.prop("selected", !0), e.$menuInner.find(".selected").removeClass("selected"), e.setSelected(n, !0);
                        e.multiple ? e.options.liveSearch && e.$searchbox.focus() : e.$button.focus(), (o != e.$element.val() && e.multiple || a != e.$element.prop("selectedIndex") && !e.multiple) && (e.$element.triggerNative("change"), e.$element.trigger("changed.bs.select", [n, l.prop("selected"), h]))
                    }
                }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(i) {
                    i.currentTarget == this && (i.preventDefault(), i.stopPropagation(), e.options.liveSearch && !t(i.target).hasClass("close") ? e.$searchbox.focus() : e.$button.focus())
                }), this.$menuInner.on("click", ".divider, .dropdown-header", function(t) {
                    t.preventDefault(), t.stopPropagation(), e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus()
                }), this.$menu.on("click", ".popover-title .close", function() {
                    e.$button.click()
                }), this.$searchbox.on("click", function(t) {
                    t.stopPropagation()
                }), this.$menu.on("click", ".actions-btn", function(i) {
                    e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus(), i.preventDefault(), i.stopPropagation(), t(this).hasClass("bs-select-all") ? e.selectAll() : e.deselectAll(), e.$element.triggerNative("change")
                }), this.$element.change(function() {
                    e.render(!1)
                })
            },
            liveSearchListener: function() {
                var s = this,
                    n = t('<li class="no-results"></li>');
                this.$button.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
                    s.$menuInner.find(".active").removeClass("active"), s.$searchbox.val() && (s.$searchbox.val(""), s.$lis.not(".is-hidden").removeClass("hidden"), n.parent().length && n.remove()), s.multiple || s.$menuInner.find(".selected").addClass("active"), setTimeout(function() {
                        s.$searchbox.focus()
                    }, 10)
                }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(t) {
                    t.stopPropagation()
                }), this.$searchbox.on("input propertychange", function() {
                    if (s.$searchbox.val()) {
                        var o = s.$lis.not(".is-hidden").removeClass("hidden").children("a");
                        o = s.options.liveSearchNormalize ? o.not(":a" + s._searchStyle() + '("' + e(s.$searchbox.val()) + '")') : o.not(":" + s._searchStyle() + '("' + s.$searchbox.val() + '")'), o.parent().addClass("hidden"), s.$lis.filter(".dropdown-header").each(function() {
                            var e = t(this),
                                i = e.data("optgroup");
                            0 === s.$lis.filter("[data-optgroup=" + i + "]").not(e).not(".hidden").length && (e.addClass("hidden"), s.$lis.filter("[data-optgroup=" + i + "div]").addClass("hidden"))
                        });
                        var a = s.$lis.not(".hidden");
                        a.each(function(e) {
                            var i = t(this);
                            i.hasClass("divider") && (i.index() === a.first().index() || i.index() === a.last().index() || a.eq(e + 1).hasClass("divider")) && i.addClass("hidden")
                        }), s.$lis.not(".hidden, .no-results").length ? n.parent().length && n.remove() : (n.parent().length && n.remove(), n.html(s.options.noneResultsText.replace("{0}", '"' + i(s.$searchbox.val()) + '"')).show(), s.$menuInner.append(n))
                    } else s.$lis.not(".is-hidden").removeClass("hidden"), n.parent().length && n.remove();
                    s.$lis.filter(".active").removeClass("active"), s.$searchbox.val() && s.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(), t(this).focus()
                })
            },
            _searchStyle: function() {
                var t = {
                    begins: "ibegins",
                    startsWith: "ibegins"
                };
                return t[this.options.liveSearchStyle] || "icontains"
            },
            val: function(t) {
                return "undefined" != typeof t ? (this.$element.val(t), this.render(), this.$element) : this.$element.val()
            },
            changeAll: function(e) {
                "undefined" == typeof e && (e = !0), this.findLis();
                for (var i = this.$element.find("option"), s = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").toggleClass("selected", e), n = s.length, o = [], a = 0; a < n; a++) {
                    var r = s[a].getAttribute("data-original-index");
                    o[o.length] = i.eq(r)[0]
                }
                t(o).prop("selected", e), this.render(!1)
            },
            selectAll: function() {
                return this.changeAll(!0)
            },
            deselectAll: function() {
                return this.changeAll(!1)
            },
            keydown: function(i) {
                var s, n, o, a, r, l, h, c, d, u = t(this),
                    p = u.is("input") ? u.parent().parent() : u.parent(),
                    f = p.data("this"),
                    g = ":not(.disabled, .hidden, .dropdown-header, .divider)",
                    m = {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9"
                    };
                if (f.options.liveSearch && (p = u.parent().parent()), f.options.container && (p = f.$menu), s = t("[role=menu] li", p), d = f.$newElement.hasClass("open"), !d && (i.keyCode >= 48 && i.keyCode <= 57 || i.keyCode >= 96 && i.keyCode <= 105 || i.keyCode >= 65 && i.keyCode <= 90) && (f.options.container ? f.$button.trigger("click") : (f.setSize(), f.$menu.parent().addClass("open"), d = !0), f.$searchbox.focus()), f.options.liveSearch && (/(^9$|27)/.test(i.keyCode.toString(10)) && d && 0 === f.$menu.find(".active").length && (i.preventDefault(), f.$menu.parent().removeClass("open"), f.options.container && f.$newElement.removeClass("open"), f.$button.focus()), s = t("[role=menu] li" + g, p), u.val() || /(38|40)/.test(i.keyCode.toString(10)) || 0 === s.filter(".active").length && (s = f.$menuInner.find("li"), s = f.options.liveSearchNormalize ? s.filter(":a" + f._searchStyle() + "(" + e(m[i.keyCode]) + ")") : s.filter(":" + f._searchStyle() + "(" + m[i.keyCode] + ")"))), s.length) {
                    if (/(38|40)/.test(i.keyCode.toString(10))) n = s.index(s.find("a").filter(":focus").parent()), a = s.filter(g).first().index(), r = s.filter(g).last().index(), o = s.eq(n).nextAll(g).eq(0).index(), l = s.eq(n).prevAll(g).eq(0).index(), h = s.eq(o).prevAll(g).eq(0).index(), f.options.liveSearch && (s.each(function(e) {
                        t(this).hasClass("disabled") || t(this).data("index", e)
                    }), n = s.index(s.filter(".active")), a = s.first().data("index"), r = s.last().data("index"), o = s.eq(n).nextAll().eq(0).data("index"), l = s.eq(n).prevAll().eq(0).data("index"), h = s.eq(o).prevAll().eq(0).data("index")), c = u.data("prevIndex"), 38 == i.keyCode ? (f.options.liveSearch && n--, n != h && n > l && (n = l), n < a && (n = a), n == c && (n = r)) : 40 == i.keyCode && (f.options.liveSearch && n++, n == -1 && (n = 0), n != h && n < o && (n = o), n > r && (n = r), n == c && (n = a)), u.data("prevIndex", n), f.options.liveSearch ? (i.preventDefault(), u.hasClass("dropdown-toggle") || (s.removeClass("active").eq(n).addClass("active").children("a").focus(), u.focus())) : s.eq(n).children("a").focus();
                    else if (!u.is("input")) {
                        var v, b, y = [];
                        s.each(function() {
                            t(this).hasClass("disabled") || t.trim(t(this).children("a").text().toLowerCase()).substring(0, 1) == m[i.keyCode] && y.push(t(this).index())
                        }), v = t(document).data("keycount"), v++, t(document).data("keycount", v), b = t.trim(t(":focus").text().toLowerCase()).substring(0, 1), b != m[i.keyCode] ? (v = 1, t(document).data("keycount", v)) : v >= y.length && (t(document).data("keycount", 0), v > y.length && (v = 1)), s.eq(y[v - 1]).children("a").focus()
                    }
                    if ((/(13|32)/.test(i.keyCode.toString(10)) || /(^9$)/.test(i.keyCode.toString(10)) && f.options.selectOnTab) && d) {
                        if (/(32)/.test(i.keyCode.toString(10)) || i.preventDefault(), f.options.liveSearch) /(32)/.test(i.keyCode.toString(10)) || (f.$menuInner.find(".active a").click(), u.focus());
                        else {
                            var w = t(":focus");
                            w.click(), w.focus(), i.preventDefault(), t(document).data("spaceSelect", !0)
                        }
                        t(document).data("keycount", 0)
                    }(/(^9$|27)/.test(i.keyCode.toString(10)) && d && (f.multiple || f.options.liveSearch) || /(27)/.test(i.keyCode.toString(10)) && !d) && (f.$menu.parent().removeClass("open"), f.options.container && f.$newElement.removeClass("open"), f.$button.focus())
                }
            },
            mobile: function() {
                this.$element.addClass("mobile-device")
            },
            refresh: function() {
                this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
            },
            hide: function() {
                this.$newElement.hide()
            },
            show: function() {
                this.$newElement.show()
            },
            remove: function() {
                this.$newElement.remove(), this.$element.remove()
            },
            destroy: function() {
                this.$newElement.remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
            }
        };
        var o = t.fn.selectpicker;
        t.fn.selectpicker = s, t.fn.selectpicker.Constructor = n, t.fn.selectpicker.noConflict = function() {
            return t.fn.selectpicker = o, this
        }, t(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', n.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function(t) {
            t.stopPropagation()
        }), t(window).on("load.bs.select.data-api", function() {
            t(".selectpicker").each(function() {
                var e = t(this);
                s.call(e, e.data())
            })
        })
    }(t)
}), ! function(t, e) {
    "use strict";

    function i(i, s, o, a, r) {
        function l() {
            k = t.devicePixelRatio > 1, h(o), s.delay >= 0 && setTimeout(function() {
                c(!0)
            }, s.delay), (s.delay < 0 || s.combined) && (a.e = v(s.throttle, function(t) {
                "resize" === t.type && (_ = x = -1), c(t.all)
            }), a.a = function(t) {
                h(t), o.push.apply(o, t)
            }, a.g = function() {
                return o = n(o).filter(function() {
                    return !n(this).data(s.loadedName)
                })
            }, c(), n(s.appendScroll).on("scroll." + r + " resize." + r, a.e))
        }

        function h(t) {
            var o = s.defaultImage,
                a = s.placeholder,
                r = s.imageBase,
                l = s.srcsetAttribute,
                h = s.loaderAttribute,
                c = s._f || {};
            t = n(t).filter(function() {
                var t = n(this),
                    i = g(this);
                return !t.data(s.handledName) && (t.attr(s.attribute) || t.attr(l) || t.attr(h) || c[i] != e)
            }).data("plugin_" + s.name, i);
            for (var d = 0, u = t.length; u > d; d++) {
                var p = n(t[d]),
                    f = g(t[d]),
                    v = p.attr(s.imageBaseAttribute) || r;
                f == S && v && p.attr(l) && p.attr(l, m(p.attr(l), v)), c[f] == e || p.attr(h) || p.attr(h, c[f]), f == S && o && !p.attr(D) ? p.attr(D, o) : f == S || !a || p.css(A) && "none" != p.css(A) || p.css(A, "url('" + a + "')")
            }
        }

        function c(t) {
            if (!o.length) return void(s.autoDestroy && i.destroy());
            for (var e = !1, a = s.imageBase || "", r = s.srcsetAttribute, l = s.handledName, h = 0, c = o.length; c > h; h++)(function(i) {
                if (t || u(i)) {
                    var o = n(i),
                        h = g(i),
                        c = o.attr(s.attribute),
                        p = o.attr(s.imageBaseAttribute) || a,
                        f = o.attr(s.loaderAttribute);
                    o.data(l) || s.visibleOnly && !o.is(":visible") || !((c || o.attr(r)) && (h == S && (p + c != o.attr(D) || o.attr(r) != o.attr(P)) || h != S && p + c != o.css(A)) || f) || (e = !0, o.data(l, !0), d(o, h, p, f))
                }
            })(o[h]);
            e && (o = n(o).filter(function() {
                return !n(this).data(l)
            }))
        }

        function d(t, e, i, o) {
            ++w;
            var a = function() {
                y("onError", t), b(), a = n.noop
            };
            y("beforeLoad", t);
            var r = s.attribute,
                l = s.srcsetAttribute,
                h = s.sizesAttribute,
                c = s.retinaAttribute,
                d = s.removeAttribute,
                u = s.loadedName,
                p = t.attr(c);
            if (o) {
                var f = function() {
                    d && t.removeAttr(s.loaderAttribute), t.data(u, !0), y(C, t), setTimeout(b, 1), f = n.noop
                };
                t.off(T).one(T, a).one($, f), y(o, t, function(e) {
                    e ? (t.off($), f()) : (t.off(T), a())
                }) || t.error()
            } else {
                var g = n(new Image);
                g.one(T, a).one($, function() {
                    t.hide(), e == S ? t.attr(I, g.attr(I)).attr(P, g.attr(P)).attr(D, g.attr(D)) : t.css(A, "url('" + g.attr(D) + "')"), t[s.effect](s.effectTime), d && (t.removeAttr(r + " " + l + " " + c + " " + s.imageBaseAttribute), h !== I && t.removeAttr(h)), t.data(u, !0), y(C, t), g.remove(), b()
                });
                var m = (k && p ? p : t.attr(r)) || "";
                g.attr(I, t.attr(h)).attr(P, t.attr(l)).attr(D, m ? i + m : null), g.complete && g.load()
            }
        }

        function u(t) {
            var e = t.getBoundingClientRect(),
                i = s.scrollDirection,
                n = s.threshold,
                o = f() + n > e.top && -n < e.bottom,
                a = p() + n > e.left && -n < e.right;
            return "vertical" == i ? o : "horizontal" == i ? a : o && a
        }

        function p() {
            return _ >= 0 ? _ : _ = n(t).width()
        }

        function f() {
            return x >= 0 ? x : x = n(t).height()
        }

        function g(t) {
            return t.tagName.toLowerCase()
        }

        function m(t, e) {
            if (e) {
                var i = t.split(",");
                t = "";
                for (var s = 0, n = i.length; n > s; s++) t += e + i[s].trim() + (s !== n - 1 ? "," : "")
            }
            return t
        }

        function v(t, e) {
            var n, o = 0;
            return function(a, r) {
                function l() {
                    o = +new Date, e.call(i, a)
                }
                var h = +new Date - o;
                n && clearTimeout(n), h > t || !s.enableThrottle || r ? l() : n = setTimeout(l, t - h)
            }
        }

        function b() {
            --w, o.length || w || y("onFinishedAll")
        }

        function y(t, e, n) {
            return !!(t = s[t]) && (t.apply(i, [].slice.call(arguments, 1)), !0)
        }
        var w = 0,
            _ = -1,
            x = -1,
            k = !1,
            C = "afterLoad",
            $ = "load",
            T = "error",
            S = "img",
            D = "src",
            P = "srcset",
            I = "sizes",
            A = "background-image";
        "event" == s.bind ? l() : n(t).on($ + "." + r, l)
    }

    function s(s, a) {
        var r = this,
            l = n.extend({}, r.config, a),
            h = {},
            c = l.name + "-" + ++o;
        return r.config = function(t, i) {
            return i === e ? l[t] : (l[t] = i, r)
        }, r.addItems = function(t) {
            return h.a && h.a("string" === n.type(t) ? n(t) : t), r
        }, r.getItems = function() {
            return h.g ? h.g() : {}
        }, r.update = function(t) {
            return h.e && h.e({}, !t), r
        }, r.loadAll = function() {
            return h.e && h.e({
                all: !0
            }, !0), r
        }, r.destroy = function() {
            return n(l.appendScroll).off("." + c, h.e), n(t).off("." + c), h = {}, e
        }, i(r, l, s, h, c), l.chainable ? s : r
    }
    var n = t.jQuery || t.Zepto,
        o = 0;
    n.fn.Lazy = n.fn.lazy = function(t) {
        return new s(this, t)
    }, n.Lazy = n.lazy = function(t, i, o) {
        if (n.isFunction(i) && (o = i, i = []), n.isFunction(o)) {
            t = n.isArray(t) ? t : [t], i = n.isArray(i) ? i : [i];
            for (var a = s.prototype.config, r = a._f || (a._f = {}), l = 0, h = t.length; h > l; l++)(a[t[l]] === e || n.isFunction(a[t[l]])) && (a[t[l]] = o);
            for (var c = 0, d = i.length; d > c; c++) r[i[c]] = t[0]
        }
    }, s.prototype.config = {
        name: "lazy",
        chainable: !0,
        autoDestroy: !0,
        bind: "load",
        threshold: 500,
        appendScroll: t,
        scrollDirection: "both",
        defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        delay: -1,
        attribute: "data-src",
        srcsetAttribute: "data-srcset",
        sizesAttribute: "data-sizes",
        retinaAttribute: "data-retina",
        loaderAttribute: "data-loader",
        imageBaseAttribute: "data-imagebase",
        removeAttribute: !0,
        handledName: "handled",
        loadedName: "loaded",
        effect: "show",
        effectTime: 0,
        enableThrottle: !0,
        throttle: 250
    }
}(window),
function(t, e, i, s) {
    "use strict";

    function n(e, s) {
        if (this.el = e, this.$el = t(e), this.s = t.extend({}, o, s), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in i.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = t(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(t(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
    }
    var o = {
        mode: "lg-slide",
        cssEasing: "ease",
        easing: "linear",
        speed: 600,
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 150,
        hideBarsDelay: 6e3,
        useLeft: !1,
        closable: !0,
        loop: !0,
        escKey: !0,
        keyPress: !0,
        controls: !0,
        slideEndAnimatoin: !0,
        hideControlOnEnd: !1,
        mousewheel: !0,
        getCaptionFromTitleOrAlt: !0,
        appendSubHtmlTo: ".lg-sub-html",
        subHtmlSelectorRelative: !1,
        preload: 1,
        showAfterLoad: !0,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: !1,
        iframeMaxWidth: "100%",
        download: !0,
        counter: !0,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: !0,
        enableDrag: !0,
        dynamic: !1,
        dynamicEl: [],
        galleryId: 1
    };
    n.prototype.init = function() {
        var i = this;
        i.s.preload > i.$items.length && (i.s.preload = i.$items.length);
        var s = e.location.hash;
        s.indexOf("lg=" + this.s.galleryId) > 0 && (i.index = parseInt(s.split("&slide=")[1], 10), t("body").addClass("lg-from-hash"), t("body").hasClass("lg-on") || (setTimeout(function() {
            i.build(i.index)
        }), t("body").addClass("lg-on"))), i.s.dynamic ? (i.$el.trigger("onBeforeOpen.lg"), i.index = i.s.index || 0, t("body").hasClass("lg-on") || setTimeout(function() {
            i.build(i.index), t("body").addClass("lg-on")
        })) : i.$items.on("click.lgcustom", function(e) {
            try {
                e.preventDefault(), e.preventDefault()
            } catch (s) {
                e.returnValue = !1
            }
            i.$el.trigger("onBeforeOpen.lg"), i.index = i.s.index || i.$items.index(this), t("body").hasClass("lg-on") || (i.build(i.index), t("body").addClass("lg-on"))
        })
    }, n.prototype.build = function(e) {
        var i = this;
        i.structure(), t.each(t.fn.lightGallery.modules, function(e) {
            i.modules[e] = new t.fn.lightGallery.modules[e](i.el)
        }), i.slide(e, !1, !1), i.s.keyPress && i.keyPress(), i.$items.length > 1 && (i.arrow(), setTimeout(function() {
            i.enableDrag(), i.enableSwipe()
        }, 50), i.s.mousewheel && i.mousewheel()), i.counter(), i.closeGallery(), i.$el.trigger("onAfterOpen.lg"), i.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
            i.$outer.removeClass("lg-hide-items"), clearTimeout(i.hideBartimeout), i.hideBartimeout = setTimeout(function() {
                i.$outer.addClass("lg-hide-items")
            }, i.s.hideBarsDelay)
        })
    }, n.prototype.structure = function() {
        var i, s = "",
            n = "",
            o = 0,
            a = "",
            r = this;
        for (t("body").append('<div class="lg-backdrop"></div>'), t(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), o = 0; o < this.$items.length; o++) s += '<div class="lg-item"></div>';
        if (this.s.controls && this.$items.length > 1 && (n = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (a = '<div class="lg-sub-html"></div>'), i = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + s + '</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>' + n + a + "</div></div>", t("body").append(i), this.$outer = t(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), r.setTop(), t(e).on("resize.lg orientationchange.lg", function() {
                setTimeout(function() {
                    r.setTop()
                }, 100)
            }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
            var l = this.$outer.find(".lg-inner");
            l.css("transition-timing-function", this.s.cssEasing), l.css("transition-duration", this.s.speed + "ms")
        }
        t(".lg-backdrop").addClass("in"), setTimeout(function() {
            r.$outer.addClass("lg-visible")
        }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = t(e).scrollTop()
    }, n.prototype.setTop = function() {
        if ("100%" !== this.s.height) {
            var i = t(e).height(),
                s = (i - parseInt(this.s.height, 10)) / 2,
                n = this.$outer.find(".lg");
            i >= parseInt(this.s.height, 10) ? n.css("top", s + "px") : n.css("top", "0px")
        }
    }, n.prototype.doCss = function() {
        var t = function() {
            var t = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                e = i.documentElement,
                s = 0;
            for (s = 0; s < t.length; s++)
                if (t[s] in e.style) return !0
        };
        return !!t()
    }, n.prototype.isVideo = function(t, e) {
        var i;
        if (i = this.s.dynamic ? this.s.dynamicEl[e].html : this.$items.eq(e).attr("data-html"), !t && i) return {
            html5: !0
        };
        var s = t.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
            n = t.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
            o = t.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
            a = t.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
        return s ? {
            youtube: s
        } : n ? {
            vimeo: n
        } : o ? {
            dailymotion: o
        } : a ? {
            vk: a
        } : void 0
    }, n.prototype.counter = function() {
        this.s.counter && t(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
    }, n.prototype.addHtml = function(e) {
        var i, s, n = null;
        if (this.s.dynamic ? this.s.dynamicEl[e].subHtmlUrl ? i = this.s.dynamicEl[e].subHtmlUrl : n = this.s.dynamicEl[e].subHtml : (s = this.$items.eq(e), s.attr("data-sub-html-url") ? i = s.attr("data-sub-html-url") : (n = s.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !n && (n = s.attr("title") || s.find("img").first().attr("alt")))), !i)
            if ("undefined" != typeof n && null !== n) {
                var o = n.substring(0, 1);
                "." !== o && "#" !== o || (n = this.s.subHtmlSelectorRelative && !this.s.dynamic ? s.find(n).html() : t(n).html())
            } else n = "";
            ".lg-sub-html" === this.s.appendSubHtmlTo ? i ? this.$outer.find(this.s.appendSubHtmlTo).load(i) : this.$outer.find(this.s.appendSubHtmlTo).html(n) : i ? this.$slide.eq(e).load(i) : this.$slide.eq(e).append(n), "undefined" != typeof n && null !== n && ("" === n ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [e])
    }, n.prototype.preload = function(t) {
        var e = 1,
            i = 1;
        for (e = 1; e <= this.s.preload && !(e >= this.$items.length - t); e++) this.loadContent(t + e, !1, 0);
        for (i = 1; i <= this.s.preload && !(t - i < 0); i++) this.loadContent(t - i, !1, 0)
    }, n.prototype.loadContent = function(i, s, n) {
        var o, a, r, l, h, c, d = this,
            u = !1,
            p = function(i) {
                for (var s = [], n = [], o = 0; o < i.length; o++) {
                    var r = i[o].split(" ");
                    "" === r[0] && r.splice(0, 1), n.push(r[0]), s.push(r[1])
                }
                for (var l = t(e).width(), h = 0; h < s.length; h++)
                    if (parseInt(s[h], 10) > l) {
                        a = n[h];
                        break
                    }
            };
        if (d.s.dynamic) {
            if (d.s.dynamicEl[i].poster && (u = !0, r = d.s.dynamicEl[i].poster), c = d.s.dynamicEl[i].html, a = d.s.dynamicEl[i].src, d.s.dynamicEl[i].responsive) {
                var f = d.s.dynamicEl[i].responsive.split(",");
                p(f)
            }
            l = d.s.dynamicEl[i].srcset, h = d.s.dynamicEl[i].sizes
        } else {
            if (d.$items.eq(i).attr("data-poster") && (u = !0, r = d.$items.eq(i).attr("data-poster")), c = d.$items.eq(i).attr("data-html"), a = d.$items.eq(i).attr("href") || d.$items.eq(i).attr("data-src"), d.$items.eq(i).attr("data-responsive")) {
                var g = d.$items.eq(i).attr("data-responsive").split(",");
                p(g)
            }
            l = d.$items.eq(i).attr("data-srcset"), h = d.$items.eq(i).attr("data-sizes")
        }
        var m = !1;
        d.s.dynamic ? d.s.dynamicEl[i].iframe && (m = !0) : "true" === d.$items.eq(i).attr("data-iframe") && (m = !0);
        var v = d.isVideo(a, i);
        if (!d.$slide.eq(i).hasClass("lg-loaded")) {
            if (m) d.$slide.eq(i).prepend('<div class="lg-video-cont" style="max-width:' + d.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + a + '"  allowfullscreen="true"></iframe></div></div>');
            else if (u) {
                var b = "";
                b = v && v.youtube ? "lg-has-youtube" : v && v.vimeo ? "lg-has-vimeo" : "lg-has-html5", d.$slide.eq(i).prepend('<div class="lg-video-cont ' + b + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + r + '" /></div></div>')
            } else v ? (d.$slide.eq(i).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), d.$el.trigger("hasVideo.lg", [i, a, c])) : d.$slide.eq(i).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + a + '" /></div>');
            if (d.$el.trigger("onAferAppendSlide.lg", [i]), o = d.$slide.eq(i).find(".lg-object"), h && o.attr("sizes", h), l) {
                o.attr("srcset", l);
                try {
                    picturefill({
                        elements: [o[0]]
                    })
                } catch (y) {
                    console.error("Make sure you have included Picturefill version 2")
                }
            }
            ".lg-sub-html" !== this.s.appendSubHtmlTo && d.addHtml(i), d.$slide.eq(i).addClass("lg-loaded")
        }
        d.$slide.eq(i).find(".lg-object").on("load.lg error.lg", function() {
            var e = 0;
            n && !t("body").hasClass("lg-from-hash") && (e = n), setTimeout(function() {
                d.$slide.eq(i).addClass("lg-complete"), d.$el.trigger("onSlideItemLoad.lg", [i, n || 0])
            }, e)
        }), v && v.html5 && !u && d.$slide.eq(i).addClass("lg-complete"), s === !0 && (d.$slide.eq(i).hasClass("lg-complete") ? d.preload(i) : d.$slide.eq(i).find(".lg-object").on("load.lg error.lg", function() {
            d.preload(i)
        }))
    }, n.prototype.slide = function(e, i, s) {
        var n = this.$outer.find(".lg-current").index(),
            o = this;
        if (!o.lGalleryOn || n !== e) {
            var a = this.$slide.length,
                r = o.lGalleryOn ? this.s.speed : 0,
                l = !1,
                h = !1;
            if (!o.lgBusy) {
                if (this.s.download) {
                    var c;
                    c = o.s.dynamic ? o.s.dynamicEl[e].downloadUrl !== !1 && (o.s.dynamicEl[e].downloadUrl || o.s.dynamicEl[e].src) : "false" !== o.$items.eq(e).attr("data-download-url") && (o.$items.eq(e).attr("data-download-url") || o.$items.eq(e).attr("href") || o.$items.eq(e).attr("data-src")), c ? (t("#lg-download").attr("href", c), o.$outer.removeClass("lg-hide-download")) : o.$outer.addClass("lg-hide-download")
                }
                if (this.$el.trigger("onBeforeSlide.lg", [n, e, i, s]), o.lgBusy = !0, clearTimeout(o.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                        o.addHtml(e)
                    }, r), this.arrowDisable(e), i) {
                    var d = e - 1,
                        u = e + 1;
                    0 === e && n === a - 1 ? (u = 0, d = a - 1) : e === a - 1 && 0 === n && (u = 0, d = a - 1), this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"), o.$slide.eq(d).addClass("lg-prev-slide"), o.$slide.eq(u).addClass("lg-next-slide"), o.$slide.eq(e).addClass("lg-current")
                } else o.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), e < n ? (h = !0, 0 !== e || n !== a - 1 || s || (h = !1, l = !0)) : e > n && (l = !0, e !== a - 1 || 0 !== n || s || (h = !0, l = !1)), h ? (this.$slide.eq(e).addClass("lg-prev-slide"), this.$slide.eq(n).addClass("lg-next-slide")) : l && (this.$slide.eq(e).addClass("lg-next-slide"), this.$slide.eq(n).addClass("lg-prev-slide")), setTimeout(function() {
                    o.$slide.removeClass("lg-current"), o.$slide.eq(e).addClass("lg-current"), o.$outer.removeClass("lg-no-trans")
                }, 50);
                o.lGalleryOn ? (setTimeout(function() {
                    o.loadContent(e, !0, 0)
                }, this.s.speed + 50), setTimeout(function() {
                    o.lgBusy = !1, o.$el.trigger("onAfterSlide.lg", [n, e, i, s])
                }, this.s.speed)) : (o.loadContent(e, !0, o.s.backdropDuration), o.lgBusy = !1, o.$el.trigger("onAfterSlide.lg", [n, e, i, s])), o.lGalleryOn = !0, this.s.counter && t("#lg-counter-current").text(e + 1)
            }
        }
    }, n.prototype.goToNextSlide = function(t) {
        var e = this;
        e.lgBusy || (e.index + 1 < e.$slide.length ? (e.index++, e.$el.trigger("onBeforeNextSlide.lg", [e.index]), e.slide(e.index, t, !1)) : e.s.loop ? (e.index = 0, e.$el.trigger("onBeforeNextSlide.lg", [e.index]), e.slide(e.index, t, !1)) : e.s.slideEndAnimatoin && (e.$outer.addClass("lg-right-end"), setTimeout(function() {
            e.$outer.removeClass("lg-right-end");
        }, 400)))
    }, n.prototype.goToPrevSlide = function(t) {
        var e = this;
        e.lgBusy || (e.index > 0 ? (e.index--, e.$el.trigger("onBeforePrevSlide.lg", [e.index, t]), e.slide(e.index, t, !1)) : e.s.loop ? (e.index = e.$items.length - 1, e.$el.trigger("onBeforePrevSlide.lg", [e.index, t]), e.slide(e.index, t, !1)) : e.s.slideEndAnimatoin && (e.$outer.addClass("lg-left-end"), setTimeout(function() {
            e.$outer.removeClass("lg-left-end")
        }, 400)))
    }, n.prototype.keyPress = function() {
        var i = this;
        this.$items.length > 1 && t(e).on("keyup.lg", function(t) {
            i.$items.length > 1 && (37 === t.keyCode && (t.preventDefault(), i.goToPrevSlide()), 39 === t.keyCode && (t.preventDefault(), i.goToNextSlide()))
        }), t(e).on("keydown.lg", function(t) {
            i.s.escKey === !0 && 27 === t.keyCode && (t.preventDefault(), i.$outer.hasClass("lg-thumb-open") ? i.$outer.removeClass("lg-thumb-open") : i.destroy())
        })
    }, n.prototype.arrow = function() {
        var t = this;
        this.$outer.find(".lg-prev").on("click.lg", function() {
            t.goToPrevSlide()
        }), this.$outer.find(".lg-next").on("click.lg", function() {
            t.goToNextSlide()
        })
    }, n.prototype.arrowDisable = function(t) {
        !this.s.loop && this.s.hideControlOnEnd && (t + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), t > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
    }, n.prototype.setTranslate = function(t, e, i) {
        this.s.useLeft ? t.css("left", e) : t.css({
            transform: "translate3d(" + e + "px, " + i + "px, 0px)"
        })
    }, n.prototype.touchMove = function(e, i) {
        var s = i - e;
        Math.abs(s) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), s, 0), this.setTranslate(t(".lg-prev-slide"), -this.$slide.eq(this.index).width() + s, 0), this.setTranslate(t(".lg-next-slide"), this.$slide.eq(this.index).width() + s, 0))
    }, n.prototype.touchEnd = function(t) {
        var e = this;
        "lg-slide" !== e.s.mode && e.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
            e.$outer.removeClass("lg-dragging"), t < 0 && Math.abs(t) > e.s.swipeThreshold ? e.goToNextSlide(!0) : t > 0 && Math.abs(t) > e.s.swipeThreshold ? e.goToPrevSlide(!0) : Math.abs(t) < 5 && e.$el.trigger("onSlideClick.lg"), e.$slide.removeAttr("style")
        }), setTimeout(function() {
            e.$outer.hasClass("lg-dragging") || "lg-slide" === e.s.mode || e.$outer.removeClass("lg-slide")
        }, e.s.speed + 100)
    }, n.prototype.enableSwipe = function() {
        var t = this,
            e = 0,
            i = 0,
            s = !1;
        t.s.enableSwipe && t.isTouch && t.doCss() && (t.$slide.on("touchstart.lg", function(i) {
            t.$outer.hasClass("lg-zoomed") || t.lgBusy || (i.preventDefault(), t.manageSwipeClass(), e = i.originalEvent.targetTouches[0].pageX)
        }), t.$slide.on("touchmove.lg", function(n) {
            t.$outer.hasClass("lg-zoomed") || (n.preventDefault(), i = n.originalEvent.targetTouches[0].pageX, t.touchMove(e, i), s = !0)
        }), t.$slide.on("touchend.lg", function() {
            t.$outer.hasClass("lg-zoomed") || (s ? (s = !1, t.touchEnd(i - e)) : t.$el.trigger("onSlideClick.lg"))
        }))
    }, n.prototype.enableDrag = function() {
        var i = this,
            s = 0,
            n = 0,
            o = !1,
            a = !1;
        i.s.enableDrag && !i.isTouch && i.doCss() && (i.$slide.on("mousedown.lg", function(e) {
            i.$outer.hasClass("lg-zoomed") || (t(e.target).hasClass("lg-object") || t(e.target).hasClass("lg-video-play")) && (e.preventDefault(), i.lgBusy || (i.manageSwipeClass(), s = e.pageX, o = !0, i.$outer.scrollLeft += 1, i.$outer.scrollLeft -= 1, i.$outer.removeClass("lg-grab").addClass("lg-grabbing"), i.$el.trigger("onDragstart.lg")))
        }), t(e).on("mousemove.lg", function(t) {
            o && (a = !0, n = t.pageX, i.touchMove(s, n), i.$el.trigger("onDragmove.lg"))
        }), t(e).on("mouseup.lg", function(e) {
            a ? (a = !1, i.touchEnd(n - s), i.$el.trigger("onDragend.lg")) : (t(e.target).hasClass("lg-object") || t(e.target).hasClass("lg-video-play")) && i.$el.trigger("onSlideClick.lg"), o && (o = !1, i.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
        }))
    }, n.prototype.manageSwipeClass = function() {
        var t = this.index + 1,
            e = this.index - 1,
            i = this.$slide.length;
        this.s.loop && (0 === this.index ? e = i - 1 : this.index === i - 1 && (t = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), e > -1 && this.$slide.eq(e).addClass("lg-prev-slide"), this.$slide.eq(t).addClass("lg-next-slide")
    }, n.prototype.mousewheel = function() {
        var t = this;
        t.$outer.on("mousewheel.lg", function(e) {
            e.deltaY && (e.deltaY > 0 ? t.goToPrevSlide() : t.goToNextSlide(), e.preventDefault())
        })
    }, n.prototype.closeGallery = function() {
        var e = this,
            i = !1;
        this.$outer.find(".lg-close").on("click.lg", function() {
            e.destroy()
        }), e.s.closable && (e.$outer.on("mousedown.lg", function(e) {
            i = !!(t(e.target).is(".lg-outer") || t(e.target).is(".lg-item ") || t(e.target).is(".lg-img-wrap"))
        }), e.$outer.on("mouseup.lg", function(s) {
            (t(s.target).is(".lg-outer") || t(s.target).is(".lg-item ") || t(s.target).is(".lg-img-wrap") && i) && (e.$outer.hasClass("lg-dragging") || e.destroy())
        }))
    }, n.prototype.destroy = function(i) {
        var s = this;
        i || s.$el.trigger("onBeforeClose.lg"), t(e).scrollTop(s.prevScrollTop), i && (s.s.dynamic || this.$items.off("click.lg click.lgcustom"), t.removeData(s.el, "lightGallery")), this.$el.off(".lg.tm"), t.each(t.fn.lightGallery.modules, function(t) {
            s.modules[t] && s.modules[t].destroy()
        }), this.lGalleryOn = !1, clearTimeout(s.hideBartimeout), this.hideBartimeout = !1, t(e).off(".lg"), t("body").removeClass("lg-on lg-from-hash"), s.$outer && s.$outer.removeClass("lg-visible"), t(".lg-backdrop").removeClass("in"), setTimeout(function() {
            s.$outer && s.$outer.remove(), t(".lg-backdrop").remove(), i || s.$el.trigger("onCloseAfter.lg")
        }, s.s.backdropDuration + 50)
    }, t.fn.lightGallery = function(e) {
        return this.each(function() {
            if (t.data(this, "lightGallery")) try {
                t(this).data("lightGallery").init()
            } catch (i) {
                console.error("lightGallery has not initiated properly")
            } else t.data(this, "lightGallery", new n(this, e))
        })
    }, t.fn.lightGallery.modules = {}
}(jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = {
            autoplay: !1,
            pause: 5e3,
            progressBar: !0,
            fourceAutoplay: !1,
            autoplayControls: !0,
            appendAutoplayControlsTo: ".lg-toolbar"
        },
        o = function(e) {
            return this.core = t(e).data("lightGallery"), this.$el = t(e), !(this.core.$items.length < 2) && (this.core.s = t.extend({}, n, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
        };
    o.prototype.init = function() {
        var t = this;
        t.core.s.autoplayControls && t.controls(), t.core.s.progressBar && t.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), t.progress(), t.core.s.autoplay && t.startlAuto(), t.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() {
            t.interval && (t.cancelAuto(), t.canceledOnTouch = !0)
        }), t.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {
            !t.interval && t.canceledOnTouch && (t.startlAuto(), t.canceledOnTouch = !1)
        })
    }, o.prototype.progress = function() {
        var t, e, i = this;
        i.$el.on("onBeforeSlide.lg.tm", function() {
            i.core.s.progressBar && i.fromAuto && (t = i.core.$outer.find(".lg-progress-bar"), e = i.core.$outer.find(".lg-progress"), i.interval && (e.removeAttr("style"), t.removeClass("lg-start"), setTimeout(function() {
                e.css("transition", "width " + (i.core.s.speed + i.core.s.pause) + "ms ease 0s"), t.addClass("lg-start")
            }, 20))), i.fromAuto || i.core.s.fourceAutoplay || i.cancelAuto(), i.fromAuto = !1
        })
    }, o.prototype.controls = function() {
        var e = this,
            i = '<span class="lg-autoplay-button lg-icon"></span>';
        t(this.core.s.appendAutoplayControlsTo).append(i), e.core.$outer.find(".lg-autoplay-button").on("click.lg", function() {
            t(e.core.$outer).hasClass("lg-show-autoplay") ? (e.cancelAuto(), e.core.s.fourceAutoplay = !1) : e.interval || (e.startlAuto(), e.core.s.fourceAutoplay = e.fourceAutoplayTemp)
        })
    }, o.prototype.startlAuto = function() {
        var t = this;
        t.core.$outer.find(".lg-progress").css("transition", "width " + (t.core.s.speed + t.core.s.pause) + "ms ease 0s"), t.core.$outer.addClass("lg-show-autoplay"), t.core.$outer.find(".lg-progress-bar").addClass("lg-start"), t.interval = setInterval(function() {
            t.core.index + 1 < t.core.$items.length ? t.core.index++ : t.core.index = 0, t.fromAuto = !0, t.core.slide(t.core.index, !1, !1)
        }, t.core.s.speed + t.core.s.pause)
    }, o.prototype.cancelAuto = function() {
        clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
    }, o.prototype.destroy = function() {
        this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
    }, t.fn.lightGallery.modules.autoplay = o
}(jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = {
            fullScreen: !0
        },
        o = function(e) {
            return this.core = t(e).data("lightGallery"), this.$el = t(e), this.core.s = t.extend({}, n, this.core.s), this.init(), this
        };
    o.prototype.init = function() {
        var t = "";
        if (this.core.s.fullScreen) {
            if (!(i.fullscreenEnabled || i.webkitFullscreenEnabled || i.mozFullScreenEnabled || i.msFullscreenEnabled)) return;
            t = '<span class="lg-fullscreen lg-icon"></span>', this.core.$outer.find(".lg-toolbar").append(t), this.fullScreen()
        }
    }, o.prototype.requestFullscreen = function() {
        var t = i.documentElement;
        t.requestFullscreen ? t.requestFullscreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen && t.webkitRequestFullscreen()
    }, o.prototype.exitFullscreen = function() {
        i.exitFullscreen ? i.exitFullscreen() : i.msExitFullscreen ? i.msExitFullscreen() : i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen && i.webkitExitFullscreen()
    }, o.prototype.fullScreen = function() {
        var e = this;
        t(i).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
            e.core.$outer.toggleClass("lg-fullscreen-on")
        }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
            i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement || i.msFullscreenElement ? e.exitFullscreen() : e.requestFullscreen()
        })
    }, o.prototype.destroy = function() {
        this.exitFullscreen(), t(i).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
    }, t.fn.lightGallery.modules.fullscreen = o
}(jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = {
            pager: !1
        },
        o = function(e) {
            return this.core = t(e).data("lightGallery"), this.$el = t(e), this.core.s = t.extend({}, n, this.core.s), this.core.s.pager && this.core.$items.length > 1 && this.init(), this
        };
    o.prototype.init = function() {
        var e, i, s, n = this,
            o = "";
        if (n.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), n.core.s.dynamic)
            for (var a = 0; a < n.core.s.dynamicEl.length; a++) o += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + n.core.s.dynamicEl[a].thumb + '" /></div></span>';
        else n.core.$items.each(function() {
            o += n.core.s.exThumbImage ? '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + t(this).attr(n.core.s.exThumbImage) + '" /></div></span>' : '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + t(this).find("img").attr("src") + '" /></div></span>'
        });
        i = n.core.$outer.find(".lg-pager-outer"), i.html(o), e = n.core.$outer.find(".lg-pager-cont"), e.on("click.lg touchend.lg", function() {
            var e = t(this);
            n.core.index = e.index(), n.core.slide(n.core.index, !1, !1)
        }), i.on("mouseover.lg", function() {
            clearTimeout(s), i.addClass("lg-pager-hover")
        }), i.on("mouseout.lg", function() {
            s = setTimeout(function() {
                i.removeClass("lg-pager-hover")
            })
        }), n.core.$el.on("onBeforeSlide.lg.tm", function(t, i, s) {
            e.removeClass("lg-pager-active"), e.eq(s).addClass("lg-pager-active")
        })
    }, o.prototype.destroy = function() {}, t.fn.lightGallery.modules.pager = o
}(jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = {
            thumbnail: !0,
            animateThumb: !0,
            currentPagerPosition: "middle",
            thumbWidth: 100,
            thumbContHeight: 100,
            thumbMargin: 5,
            exThumbImage: !1,
            showThumbByDefault: !0,
            toogleThumb: !0,
            pullCaptionUp: !0,
            enableThumbDrag: !0,
            enableThumbSwipe: !0,
            swipeThreshold: 50,
            loadYoutubeThumbnail: !0,
            youtubeThumbSize: 1,
            loadVimeoThumbnail: !0,
            vimeoThumbSize: "thumbnail_small",
            loadDailymotionThumbnail: !0
        },
        o = function(e) {
            return this.core = t(e).data("lightGallery"), this.core.s = t.extend({}, n, this.core.s), this.$el = t(e), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.left = 0, this.init(), this
        };
    o.prototype.init = function() {
        var t = this;
        this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function() {
            t.core.$outer.addClass("lg-thumb-open")
        }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb ? (this.core.s.enableThumbDrag && !this.core.isTouch && this.core.doCss() && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.core.isTouch && this.core.doCss() && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
    }, o.prototype.build = function() {
        function i(t, e, i) {
            var s, r = n.core.isVideo(t, i) || {},
                l = "";
            r.youtube || r.vimeo || r.dailymotion ? r.youtube ? s = n.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + r.youtube[1] + "/" + n.core.s.youtubeThumbSize + ".jpg" : e : r.vimeo ? n.core.s.loadVimeoThumbnail ? (s = "//i.vimeocdn.com/video/error_" + a + ".jpg", l = r.vimeo[1]) : s = e : r.dailymotion && (s = n.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + r.dailymotion[1] : e) : s = e, o += '<div data-vimeo-id="' + l + '" class="lg-thumb-item" style="width:' + n.core.s.thumbWidth + "px; margin-right: " + n.core.s.thumbMargin + 'px"><img src="' + s + '" /></div>', l = ""
        }
        var s, n = this,
            o = "",
            a = "",
            r = '<div class="lg-thumb-outer"><div class="lg-thumb group"></div></div>';
        switch (this.core.s.vimeoThumbSize) {
            case "thumbnail_large":
                a = "640";
                break;
            case "thumbnail_medium":
                a = "200x150";
                break;
            case "thumbnail_small":
                a = "100x75"
        }
        if (n.core.$outer.addClass("lg-has-thumb"), n.core.$outer.find(".lg").append(r), n.$thumbOuter = n.core.$outer.find(".lg-thumb-outer"), n.thumbOuterWidth = n.$thumbOuter.width(), n.core.s.animateThumb && n.core.$outer.find(".lg-thumb").css({
                width: n.thumbTotalWidth + "px",
                position: "relative"
            }), this.core.s.animateThumb && n.$thumbOuter.css("height", n.core.s.thumbContHeight + "px"), n.core.s.dynamic)
            for (var l = 0; l < n.core.s.dynamicEl.length; l++) i(n.core.s.dynamicEl[l].src, n.core.s.dynamicEl[l].thumb, l);
        else n.core.$items.each(function(e) {
            n.core.s.exThumbImage ? i(t(this).attr("href") || t(this).attr("data-src"), t(this).attr(n.core.s.exThumbImage), e) : i(t(this).attr("href") || t(this).attr("data-src"), t(this).find("img").attr("src"), e)
        });
        n.core.$outer.find(".lg-thumb").html(o), s = n.core.$outer.find(".lg-thumb-item"), s.each(function() {
            var e = t(this),
                i = e.attr("data-vimeo-id");
            i && t.getJSON("//www.vimeo.com/api/v2/video/" + i + ".json?callback=?", {
                format: "json"
            }, function(t) {
                e.find("img").attr("src", t[0][n.core.s.vimeoThumbSize])
            })
        }), s.eq(n.core.index).addClass("active"), n.core.$el.on("onBeforeSlide.lg.tm", function() {
            s.removeClass("active"), s.eq(n.core.index).addClass("active")
        }), s.on("click.lg touchend.lg", function() {
            var e = t(this);
            setTimeout(function() {
                (n.thumbClickable && !n.core.lgBusy || !n.core.doCss()) && (n.core.index = e.index(), n.core.slide(n.core.index, !1, !0))
            }, 50)
        }), n.core.$el.on("onBeforeSlide.lg.tm", function() {
            n.animateThumb(n.core.index)
        }), t(e).on("resize.lg.thumb orientationchange.lg.thumb", function() {
            setTimeout(function() {
                n.animateThumb(n.core.index), n.thumbOuterWidth = n.$thumbOuter.width()
            }, 200)
        })
    }, o.prototype.setTranslate = function(t) {
        this.core.$outer.find(".lg-thumb").css({
            transform: "translate3d(-" + t + "px, 0px, 0px)"
        })
    }, o.prototype.animateThumb = function(t) {
        var e = this.core.$outer.find(".lg-thumb");
        if (this.core.s.animateThumb) {
            var i;
            switch (this.core.s.currentPagerPosition) {
                case "left":
                    i = 0;
                    break;
                case "middle":
                    i = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                    break;
                case "right":
                    i = this.thumbOuterWidth - this.core.s.thumbWidth
            }
            this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * t - 1 - i, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (e.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || e.animate({
                left: -this.left + "px"
            }, this.core.s.speed)) : this.core.doCss() || e.css("left", -this.left + "px"), this.setTranslate(this.left)
        }
    }, o.prototype.enableThumbDrag = function() {
        var i = this,
            s = 0,
            n = 0,
            o = !1,
            a = !1,
            r = 0;
        i.$thumbOuter.addClass("lg-grab"), i.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(t) {
            i.thumbTotalWidth > i.thumbOuterWidth && (t.preventDefault(), s = t.pageX, o = !0, i.core.$outer.scrollLeft += 1, i.core.$outer.scrollLeft -= 1, i.thumbClickable = !1, i.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
        }), t(e).on("mousemove.lg.thumb", function(t) {
            o && (r = i.left, a = !0, n = t.pageX, i.$thumbOuter.addClass("lg-dragging"), r -= n - s, r > i.thumbTotalWidth - i.thumbOuterWidth && (r = i.thumbTotalWidth - i.thumbOuterWidth), r < 0 && (r = 0), i.setTranslate(r))
        }), t(e).on("mouseup.lg.thumb", function() {
            a ? (a = !1, i.$thumbOuter.removeClass("lg-dragging"), i.left = r, Math.abs(n - s) < i.core.s.swipeThreshold && (i.thumbClickable = !0)) : i.thumbClickable = !0, o && (o = !1, i.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
        })
    }, o.prototype.enableThumbSwipe = function() {
        var t = this,
            e = 0,
            i = 0,
            s = !1,
            n = 0;
        t.core.$outer.find(".lg-thumb").on("touchstart.lg", function(i) {
            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e = i.originalEvent.targetTouches[0].pageX, t.thumbClickable = !1)
        }), t.core.$outer.find(".lg-thumb").on("touchmove.lg", function(o) {
            t.thumbTotalWidth > t.thumbOuterWidth && (o.preventDefault(), i = o.originalEvent.targetTouches[0].pageX, s = !0, t.$thumbOuter.addClass("lg-dragging"), n = t.left, n -= i - e, n > t.thumbTotalWidth - t.thumbOuterWidth && (n = t.thumbTotalWidth - t.thumbOuterWidth), n < 0 && (n = 0), t.setTranslate(n))
        }), t.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
            t.thumbTotalWidth > t.thumbOuterWidth && s ? (s = !1, t.$thumbOuter.removeClass("lg-dragging"), Math.abs(i - e) < t.core.s.swipeThreshold && (t.thumbClickable = !0), t.left = n) : t.thumbClickable = !0
        })
    }, o.prototype.toogle = function() {
        var t = this;
        t.core.s.toogleThumb && (t.core.$outer.addClass("lg-can-toggle"), t.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), t.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
            t.core.$outer.toggleClass("lg-thumb-open")
        }))
    }, o.prototype.thumbkeyPress = function() {
        var i = this;
        t(e).on("keydown.lg.thumb", function(t) {
            38 === t.keyCode ? (t.preventDefault(), i.core.$outer.addClass("lg-thumb-open")) : 40 === t.keyCode && (t.preventDefault(), i.core.$outer.removeClass("lg-thumb-open"))
        })
    }, o.prototype.destroy = function() {
        this.core.s.thumbnail && this.core.$items.length > 1 && (t(e).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
    }, t.fn.lightGallery.modules.Thumbnail = o
}(jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = {
            videoMaxWidth: "855px",
            youtubePlayerParams: !1,
            vimeoPlayerParams: !1,
            dailymotionPlayerParams: !1,
            vkPlayerParams: !1,
            videojs: !1,
            videojsOptions: {}
        },
        o = function(e) {
            return this.core = t(e).data("lightGallery"), this.$el = t(e), this.core.s = t.extend({}, n, this.core.s), this.videoLoaded = !1, this.init(), this
        };
    o.prototype.init = function() {
        var e = this;
        e.core.$el.on("hasVideo.lg.tm", function(t, i, s, n) {
            if (e.core.$slide.eq(i).find(".lg-video").append(e.loadVideo(s, "lg-object", !0, i, n)), n)
                if (e.core.s.videojs) try {
                    videojs(e.core.$slide.eq(i).find(".lg-html5").get(0), e.core.s.videojsOptions, function() {
                        e.videoLoaded || this.play()
                    })
                } catch (o) {
                    console.error("Make sure you have included videojs")
                } else e.core.$slide.eq(i).find(".lg-html5").get(0).play()
        }), e.core.$el.on("onAferAppendSlide.lg.tm", function(t, i) {
            e.core.$slide.eq(i).find(".lg-video-cont").css("max-width", e.core.s.videoMaxWidth), e.videoLoaded = !0
        });
        var i = function(t) {
            if (t.find(".lg-object").hasClass("lg-has-poster") && t.find(".lg-object").is(":visible"))
                if (t.hasClass("lg-has-video")) {
                    var i = t.find(".lg-youtube").get(0),
                        s = t.find(".lg-vimeo").get(0),
                        n = t.find(".lg-dailymotion").get(0),
                        o = t.find(".lg-html5").get(0);
                    if (i) i.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    else if (s) try {
                            $f(s).api("play")
                        } catch (a) {
                            console.error("Make sure you have included froogaloop2 js")
                        } else if (n) n.contentWindow.postMessage("play", "*");
                        else if (o)
                        if (e.core.s.videojs) try {
                            videojs(o).play()
                        } catch (a) {
                            console.error("Make sure you have included videojs")
                        } else o.play();
                    t.addClass("lg-video-playing")
                } else {
                    t.addClass("lg-video-playing lg-has-video");
                    var r, l, h = function(i, s) {
                        if (t.find(".lg-video").append(e.loadVideo(i, "", !1, e.core.index, s)), s)
                            if (e.core.s.videojs) try {
                                videojs(e.core.$slide.eq(e.core.index).find(".lg-html5").get(0), e.core.s.videojsOptions, function() {
                                    this.play()
                                })
                            } catch (n) {
                                console.error("Make sure you have included videojs")
                            } else e.core.$slide.eq(e.core.index).find(".lg-html5").get(0).play()
                    };
                    e.core.s.dynamic ? (r = e.core.s.dynamicEl[e.core.index].src, l = e.core.s.dynamicEl[e.core.index].html, h(r, l)) : (r = e.core.$items.eq(e.core.index).attr("href") || e.core.$items.eq(e.core.index).attr("data-src"), l = e.core.$items.eq(e.core.index).attr("data-html"), h(r, l));
                    var c = t.find(".lg-object");
                    t.find(".lg-video").append(c), t.find(".lg-video-object").hasClass("lg-html5") || (t.removeClass("lg-complete"), t.find(".lg-video-object").on("load.lg error.lg", function() {
                        t.addClass("lg-complete")
                    }))
                }
        };
        e.core.doCss() && e.core.$items.length > 1 && (e.core.s.enableSwipe && e.core.isTouch || e.core.s.enableDrag && !e.core.isTouch) ? e.core.$el.on("onSlideClick.lg.tm", function() {
            var t = e.core.$slide.eq(e.core.index);
            i(t)
        }) : e.core.$slide.on("click.lg", function() {
            i(t(this))
        }), e.core.$el.on("onBeforeSlide.lg.tm", function(i, s, n) {
            var o = e.core.$slide.eq(s),
                a = o.find(".lg-youtube").get(0),
                r = o.find(".lg-vimeo").get(0),
                l = o.find(".lg-dailymotion").get(0),
                h = o.find(".lg-vk").get(0),
                c = o.find(".lg-html5").get(0);
            if (a) a.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
            else if (r) try {
                    $f(r).api("pause")
                } catch (d) {
                    console.error("Make sure you have included froogaloop2 js")
                } else if (l) l.contentWindow.postMessage("pause", "*");
                else if (c)
                if (e.core.s.videojs) try {
                    videojs(c).pause()
                } catch (d) {
                    console.error("Make sure you have included videojs")
                } else c.pause();
            h && t(h).attr("src", t(h).attr("src").replace("&autoplay", "&noplay"));
            var u;
            u = e.core.s.dynamic ? e.core.s.dynamicEl[n].src : e.core.$items.eq(n).attr("href") || e.core.$items.eq(n).attr("data-src");
            var p = e.core.isVideo(u, n) || {};
            (p.youtube || p.vimeo || p.dailymotion || p.vk) && e.core.$outer.addClass("lg-hide-download")
        }), e.core.$el.on("onAfterSlide.lg.tm", function(t, i) {
            e.core.$slide.eq(i).removeClass("lg-video-playing")
        })
    }, o.prototype.loadVideo = function(e, i, s, n, o) {
        var a = "",
            r = 1,
            l = "",
            h = this.core.isVideo(e, n) || {};
        if (s && (r = this.videoLoaded ? 0 : 1), h.youtube) l = "?wmode=opaque&autoplay=" + r + "&enablejsapi=1", this.core.s.youtubePlayerParams && (l = l + "&" + t.param(this.core.s.youtubePlayerParams)), a = '<iframe class="lg-video-object lg-youtube ' + i + '" width="560" height="315" src="//www.youtube.com/embed/' + h.youtube[1] + l + '" frameborder="0" allowfullscreen></iframe>';
        else if (h.vimeo) l = "?autoplay=" + r + "&api=1", this.core.s.vimeoPlayerParams && (l = l + "&" + t.param(this.core.s.vimeoPlayerParams)), a = '<iframe class="lg-video-object lg-vimeo ' + i + '" width="560" height="315"  src="//player.vimeo.com/video/' + h.vimeo[1] + l + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
        else if (h.dailymotion) l = "?wmode=opaque&autoplay=" + r + "&api=postMessage", this.core.s.dailymotionPlayerParams && (l = l + "&" + t.param(this.core.s.dailymotionPlayerParams)), a = '<iframe class="lg-video-object lg-dailymotion ' + i + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + h.dailymotion[1] + l + '" frameborder="0" allowfullscreen></iframe>';
        else if (h.html5) {
            var c = o.substring(0, 1);
            "." !== c && "#" !== c || (o = t(o).html()), a = o
        } else h.vk && (l = "&autoplay=" + r, this.core.s.vkPlayerParams && (l = l + "&" + t.param(this.core.s.vkPlayerParams)), a = '<iframe class="lg-video-object lg-vk ' + i + '" width="560" height="315" src="http://vk.com/video_ext.php?' + h.vk[1] + l + '" frameborder="0" allowfullscreen></iframe>');
        return a
    }, o.prototype.destroy = function() {
        this.videoLoaded = !1
    }, t.fn.lightGallery.modules.video = o
}(jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = {
            scale: 1,
            zoom: !0,
            actualSize: !0,
            enableZoomAfter: 300
        },
        o = function(i) {
            return this.core = t(i).data("lightGallery"), this.core.s = t.extend({}, n, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = t(e).width() / 2, this.pageY = t(e).height() / 2 + t(e).scrollTop()), this
        };
    o.prototype.init = function() {
        var i = this,
            s = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
        i.core.s.actualSize && (s += '<span id="lg-actual-size" class="lg-icon"></span>'), this.core.$outer.find(".lg-toolbar").append(s), i.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(e, s, n) {
            var o = i.core.s.enableZoomAfter + n;
            t("body").hasClass("lg-from-hash") && n ? o = 0 : t("body").removeClass("lg-from-hash"), i.zoomabletimeout = setTimeout(function() {
                i.core.$slide.eq(s).addClass("lg-zoomable")
            }, o + 30)
        });
        var n = 1,
            o = function(s) {
                var n, o, a = i.core.$outer.find(".lg-current .lg-image"),
                    r = (t(e).width() - a.width()) / 2,
                    l = (t(e).height() - a.height()) / 2 + t(e).scrollTop();
                n = i.pageX - r, o = i.pageY - l;
                var h = (s - 1) * n,
                    c = (s - 1) * o;
                a.css("transform", "scale3d(" + s + ", " + s + ", 1)").attr("data-scale", s), a.parent().css({
                    left: -h + "px",
                    top: -c + "px"
                }).attr("data-x", h).attr("data-y", c)
            },
            a = function() {
                n > 1 ? i.core.$outer.addClass("lg-zoomed") : i.resetZoom(), n < 1 && (n = 1), o(n)
            },
            r = function(s, o, r, l) {
                var h, c = o.width();
                h = i.core.s.dynamic ? i.core.s.dynamicEl[r].width || o[0].naturalWidth || c : i.core.$items.eq(r).attr("data-width") || o[0].naturalWidth || c;
                var d;
                i.core.$outer.hasClass("lg-zoomed") ? n = 1 : h > c && (d = h / c, n = d || 2), l ? (i.pageX = t(e).width() / 2, i.pageY = t(e).height() / 2 + t(e).scrollTop()) : (i.pageX = s.pageX || s.originalEvent.targetTouches[0].pageX, i.pageY = s.pageY || s.originalEvent.targetTouches[0].pageY), a(), setTimeout(function() {
                    i.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                }, 10)
            },
            l = !1;
        i.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(t, e) {
            var s = i.core.$slide.eq(e).find(".lg-image");
            s.on("dblclick", function(t) {
                r(t, s, e)
            }), s.on("touchstart", function(t) {
                l ? (clearTimeout(l), l = null, r(t, s, e)) : l = setTimeout(function() {
                    l = null
                }, 300), t.preventDefault()
            })
        }), t(e).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
            i.pageX = t(e).width() / 2, i.pageY = t(e).height() / 2 + t(e).scrollTop(), o(n)
        }), t("#lg-zoom-out").on("click.lg", function() {
            i.core.$outer.find(".lg-current .lg-image").length && (n -= i.core.s.scale, a())
        }), t("#lg-zoom-in").on("click.lg", function() {
            i.core.$outer.find(".lg-current .lg-image").length && (n += i.core.s.scale, a())
        }), t("#lg-actual-size").on("click.lg", function(t) {
            r(t, i.core.$slide.eq(i.core.index).find(".lg-image"), i.core.index, !0)
        }), i.core.$el.on("onBeforeSlide.lg.tm", function() {
            n = 1, i.resetZoom()
        }), i.core.isTouch || i.zoomDrag(), i.core.isTouch && i.zoomSwipe()
    }, o.prototype.resetZoom = function() {
        this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = t(e).width() / 2, this.pageY = t(e).height() / 2 + t(e).scrollTop()
    }, o.prototype.zoomSwipe = function() {
        var t = this,
            e = {},
            i = {},
            s = !1,
            n = !1,
            o = !1;
        t.core.$slide.on("touchstart.lg", function(i) {
            if (t.core.$outer.hasClass("lg-zoomed")) {
                var s = t.core.$slide.eq(t.core.index).find(".lg-object");
                o = s.outerHeight() * s.attr("data-scale") > t.core.$outer.find(".lg").height(), n = s.outerWidth() * s.attr("data-scale") > t.core.$outer.find(".lg").width(), (n || o) && (i.preventDefault(), e = {
                    x: i.originalEvent.targetTouches[0].pageX,
                    y: i.originalEvent.targetTouches[0].pageY
                })
            }
        }), t.core.$slide.on("touchmove.lg", function(a) {
            if (t.core.$outer.hasClass("lg-zoomed")) {
                var r, l, h = t.core.$slide.eq(t.core.index).find(".lg-img-wrap");
                a.preventDefault(), s = !0, i = {
                    x: a.originalEvent.targetTouches[0].pageX,
                    y: a.originalEvent.targetTouches[0].pageY
                }, t.core.$outer.addClass("lg-zoom-dragging"), l = o ? -Math.abs(h.attr("data-y")) + (i.y - e.y) : -Math.abs(h.attr("data-y")), r = n ? -Math.abs(h.attr("data-x")) + (i.x - e.x) : -Math.abs(h.attr("data-x")), (Math.abs(i.x - e.x) > 15 || Math.abs(i.y - e.y) > 15) && h.css({
                    left: r + "px",
                    top: l + "px"
                })
            }
        }), t.core.$slide.on("touchend.lg", function() {
            t.core.$outer.hasClass("lg-zoomed") && s && (s = !1, t.core.$outer.removeClass("lg-zoom-dragging"), t.touchendZoom(e, i, n, o))
        })
    }, o.prototype.zoomDrag = function() {
        var i = this,
            s = {},
            n = {},
            o = !1,
            a = !1,
            r = !1,
            l = !1;
        i.core.$slide.on("mousedown.lg.zoom", function(e) {
            var n = i.core.$slide.eq(i.core.index).find(".lg-object");
            l = n.outerHeight() * n.attr("data-scale") > i.core.$outer.find(".lg").height(), r = n.outerWidth() * n.attr("data-scale") > i.core.$outer.find(".lg").width(), i.core.$outer.hasClass("lg-zoomed") && t(e.target).hasClass("lg-object") && (r || l) && (e.preventDefault(), s = {
                x: e.pageX,
                y: e.pageY
            }, o = !0, i.core.$outer.scrollLeft += 1, i.core.$outer.scrollLeft -= 1, i.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
        }), t(e).on("mousemove.lg.zoom", function(t) {
            if (o) {
                var e, h, c = i.core.$slide.eq(i.core.index).find(".lg-img-wrap");
                a = !0, n = {
                    x: t.pageX,
                    y: t.pageY
                }, i.core.$outer.addClass("lg-zoom-dragging"), h = l ? -Math.abs(c.attr("data-y")) + (n.y - s.y) : -Math.abs(c.attr("data-y")), e = r ? -Math.abs(c.attr("data-x")) + (n.x - s.x) : -Math.abs(c.attr("data-x")), c.css({
                    left: e + "px",
                    top: h + "px"
                })
            }
        }), t(e).on("mouseup.lg.zoom", function(t) {
            o && (o = !1, i.core.$outer.removeClass("lg-zoom-dragging"), !a || s.x === n.x && s.y === n.y || (n = {
                x: t.pageX,
                y: t.pageY
            }, i.touchendZoom(s, n, r, l)), a = !1), i.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
        })
    }, o.prototype.touchendZoom = function(t, e, i, s) {
        var n = this,
            o = n.core.$slide.eq(n.core.index).find(".lg-img-wrap"),
            a = n.core.$slide.eq(n.core.index).find(".lg-object"),
            r = -Math.abs(o.attr("data-x")) + (e.x - t.x),
            l = -Math.abs(o.attr("data-y")) + (e.y - t.y),
            h = (n.core.$outer.find(".lg").height() - a.outerHeight()) / 2,
            c = Math.abs(a.outerHeight() * Math.abs(a.attr("data-scale")) - n.core.$outer.find(".lg").height() + h),
            d = (n.core.$outer.find(".lg").width() - a.outerWidth()) / 2,
            u = Math.abs(a.outerWidth() * Math.abs(a.attr("data-scale")) - n.core.$outer.find(".lg").width() + d);
        (Math.abs(e.x - t.x) > 15 || Math.abs(e.y - t.y) > 15) && (s && (l <= -c ? l = -c : l >= -h && (l = -h)), i && (r <= -u ? r = -u : r >= -d && (r = -d)), s ? o.attr("data-y", Math.abs(l)) : l = -Math.abs(o.attr("data-y")), i ? o.attr("data-x", Math.abs(r)) : r = -Math.abs(o.attr("data-x")), o.css({
            left: r + "px",
            top: l + "px"
        }))
    }, o.prototype.destroy = function() {
        var i = this;
        i.core.$el.off(".lg.zoom"), t(e).off(".lg.zoom"), i.core.$slide.off(".lg.zoom"), i.core.$el.off(".lg.tm.zoom"), i.resetZoom(), clearTimeout(i.zoomabletimeout), i.zoomabletimeout = !1
    }, t.fn.lightGallery.modules.zoom = o
}(jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = {
            hash: !0
        },
        o = function(i) {
            return this.core = t(i).data("lightGallery"), this.core.s = t.extend({}, n, this.core.s), this.core.s.hash && (this.oldHash = e.location.hash, this.init()), this
        };
    o.prototype.init = function() {
        var i, s = this;
        s.core.$el.on("onAfterSlide.lg.tm", function(t, i, n) {
            e.location.hash = "lg=" + s.core.s.galleryId + "&slide=" + n
        }), t(e).on("hashchange.lg.hash", function() {
            i = e.location.hash;
            var t = parseInt(i.split("&slide=")[1], 10);
            i.indexOf("lg=" + s.core.s.galleryId) > -1 ? s.core.slide(t, !1, !1) : s.core.lGalleryOn && s.core.destroy()
        })
    }, o.prototype.destroy = function() {
        this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? e.location.hash = this.oldHash : history.pushState ? history.pushState("", i.title, e.location.pathname + e.location.search) : e.location.hash = "", this.core.$el.off(".lg.hash"))
    }, t.fn.lightGallery.modules.hash = o
}(jQuery, window, document);
var Filter = function(t) {
    this.instance = $("#" + t), this.optionsContainer = $("#" + t + "_options")
};
Filter.prototype.renderHTMLOption = function(t) {
    return ""
}, Filter.prototype.addOptions = function(t) {
    var e = this;
    this.instance.find("img.ajax-loader").show(), e.instance.removeClass("hidden");
    var s = this.optionsContainer;
    for (i in t) $.isNumeric(i) && s.append(e.renderHTMLOption(t[i]))
}, Filter.prototype.empty = function() {
    this.optionsContainer.empty()
}, Filter.prototype.hideAndEmpty = function() {
    this.instance.addClass("hidden"), this.empty()
}, Filter.prototype.enableLoadingState = function() {
    this.empty(), this.instance.find(".body-type-heading").show(), this.instance.find("img.ajax-loader").show()
}, Filter.prototype.disableLoadingState = function() {
    this.instance.find("img.ajax-loader").css("display", "none")
}, Filter.prototype.addOptionsAndEnable = function(t) {
    this.addOptions(t), this.disableLoadingState()
}, Filter.prototype.getChekboxField = function(t, e, i, s) {
    return '<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6"><input id="' + t + '" name="' + e + '" value="' + i + '" type="checkbox" indeterminate="true"><label for="' + t + '"><span></span>' + s + "</label></div>"
};
var BodyTypesFilter = inherit(Filter, {
        renderHTMLOption: function(t) {
            var e = "body_types_" + t.body_type,
                i = "body_type[]",
                s = t.body_type,
                n = t.body_type_value;
            return this.getChekboxField(e, i, s, n)
        }
    }),
    DriveFilter = inherit(Filter, {
        renderHTMLOption: function(t) {
            var e = "drive_" + t.drive,
                i = "drive[]",
                s = t.drive,
                n = t.drive_full;
            return this.getChekboxField(e, i, s, n)
        }
    }),
    TransmissionTypesFilter = inherit(Filter, {
        renderHTMLOption: function(t) {
            var e = "transmission_types_" + t.transmission_type,
                i = "transmission[]",
                s = t.transmission_type,
                n = t.transmission_type_value;
            return this.getChekboxField(e, i, s, n)
        }
    }),
    FuelTypesFilter = inherit(Filter, {
        renderHTMLOption: function(t) {
            var e = "fuel_types_" + t.fuel_type,
                i = "fuel[]",
                s = t.fuel_type,
                n = t.fuel_type_value;
            return this.getChekboxField(e, i, s, n)
        }
    }),
    EngineVolumesFilter = inherit(Filter, {
        renderHTMLOption: function(t) {
            var e = "engine_volumes_" + t.min_value + "_" + t.max_value,
                i = "engine[]",
                s = t.min_value + "-" + t.max_value,
                n = t.min_value + "-" + t.max_value;
            return this.getChekboxField(e, i, s, n)
        }
    }),
    PowerFilter = inherit(Filter, {
        renderHTMLOption: function(t) {
            var e = "power_" + t.min_value + "_" + t.max_value,
                i = "power[]",
                s = t.min_value + "-" + t.max_value,
                n = t.min_value + "-" + t.max_value;
            return this.getChekboxField(e, i, s, n)
        }
    }),
    SelectPickerFilter = function(t) {
        this.selectPicker = t
    };
if (SelectPickerFilter.prototype.enableLoadingState = function() {
        this.selectPicker.closest(".loader-container").find("img.ajax-loader").css("display", "inline")
    }, SelectPickerFilter.prototype.disableLoadingState = function() {
        this.selectPicker.closest(".loader-container").find("img.ajax-loader").hide()
    }, SelectPickerFilter.prototype.disable = function() {
        this.selectPicker.prop("disabled", !0), this.selectPicker.selectpicker("refresh"), this.selectPicker.closest(".bootstrap-select").prev().hide()
    }, SelectPickerFilter.prototype.empty = function() {
        this.selectPicker.children("[value!='']").remove(), this.selectPicker.selectpicker("refresh")
    }, SelectPickerFilter.prototype.enable = function() {
        this.selectPicker.prop("disabled", !1), this.selectPicker.selectpicker("refresh"), this.selectPicker.selectpicker("deselectAll"), this.selectPicker.closest(".bootstrap-select").prev().show()
    }, SelectPickerFilter.prototype.addOptions = function(t) {
        var e = this.selectPicker;
        $.each(t, function(t, i) {
            e.append('<option value="' + i.brand + '">' + i.brand + "</option>")
        }), e.selectpicker("refresh")
    }, "undefined" == typeof EDITION) var EDITION = "ww";
var caller = function() {
    this.routes = Routing.getRoutes().a, this.defaults = new Object, this.defaults.method = "POST", this.defaults.async = !0, this.generateFunction = function(t) {
        return function(e, i, s) {
            return "undefined" == typeof s && (s = this.defaults), "undefined" == typeof s.method && (s.method = this.defaults.method), "undefined" == typeof s.async && (s.async = this.defaults.async), "undefined" == typeof s.routeParameters ? "undefined" == typeof EDITION ? s.routeParameters = {
                edition: "ww"
            } : s.routeParameters = {
                edition: EDITION
            } : s.routeParameters.edition = EDITION, $.ajax({
                method: s.method,
                url: Routing.generate(t, s.routeParameters),
                async: s.async,
                data: e,
                success: function(t) {
                    "function" == typeof i && i(t)
                }
            }), this
        }
    };
    for (var t in this.routes) this[this.routes[t]] = this.generateFunction(this.routes[t])
};
$(document).ready(function() {
    function t() {
        $(".car-specs").width($(".comp-table").width())
    }

    function e() {
        $(".car-switch").attr("class", "car-switch"), $(".car-switch:last").attr("class", "car-switch car-switch-disabled")
    }
    $(".car-img-missing").on("click", function(t) {
        t.preventDefault()
    }), $(".accordion").accordion({
        animate: {
            duration: 0
        },
        heightStyle: "content",
        collapsible: !0,
        disabled: !0
    }), $("#compare-expand").click(function(t) {
        t.preventDefault(), $(".accordion .ui-accordion-header").addClass("ui-accordion-header-active").next().show()
    }), $("#compare-collapse").click(function(t) {
        t.preventDefault(), $(".accordion .ui-accordion-header").removeClass("ui-accordion-header-active").next().hide()
    }), $("#compare-cars").scroll(function() {
        var t = $("#compare-cars").scrollLeft();
        $(".tab-fixed").css("margin-left", t + "px")
    }), $(".car-price-tip").attr({
        "data-toggle": "tooltip",
        "data-placement": "bottom"
    }), $(".price-old .car-price-tip").attr({
        title: "Prices for cars not in production are from the last time they were available for sale."
    }), $(".price-new .car-price-tip").attr({
        title: "Prices are for information purposes only. They are subject to change without notification. Prices may differ from region to region and include VAT where it applies."
    }), $('[data-toggle="tooltip"]').tooltip(), $(window).load(function() {
        t()
    }), $(window).resize(function() {
        t()
    }), $(".photo_gallery").on("click", ".car-remove", function() {
        var t = this.id.replace("remove", ""),
            e = "cln" + t;
        $("." + e).remove(), $(".page-loader").css("display", "block"), $("#compare-cars").remove(), token = $("#token").val();
        var i = new caller;
        return i.removeCarFromCompare({
            vehicle_id: t
        }, function(t) {
            location.reload(!0)
        }, {
            routeParameters: {
                token: token
            },
            method: "GET"
        })
    }), $(".brand_model_switch").on("click", ".car-switch", function() {
        var i = $(this).parent().attr("id").replace("car", ""),
            s = $(this).parent().next().attr("id").replace("car", "");
        $(this).parent().attr("id", "car" + s), $(this).parent().next().attr("id", "car" + i), $(".cln" + i).each(function(t, e) {
            var i = $(e).next().html(),
                s = $(e).html();
            $(e).html(i), $(e).next().html(s);
            var n = $(e).next().attr("class"),
                o = $(e).attr("class");
            $(e).attr("class", n), $(e).next().attr("class", o)
        }), e(), t()
    }), e(), $(window).scroll(function() {
        var t = $(".comp-row.pic").height(),
            e = $("#page-banner").parent().height(),
            i = t + e,
            s = $(".comp-row.brand").height(),
            n = $(".comp-row.price").height(),
            o = ($("header").height(), $(window).scrollTop());
        $("#compare-cars").scrollTop();
        $(".stuck").css("margin-top", o - e - 4 + "px"), $(this).scrollTop() > i ? ($(".comp-row.brand").addClass("stuck"), $(".comp-row.price").addClass("stuck"), $(".car-specs").css("padding-top", s + n - 4 + "px")) : ($(".comp-row.brand").removeClass("stuck"), $(".comp-row.price").removeClass("stuck"), $(".car-specs").css("padding-top", "0px"))
    }), $(".spec-categ .tab-style").click(function() {
        var t = ($(".comp-row.pic").height(), $("#page-banner").parent().height(), $(".comp-row.brand").height()),
            e = $(".comp-row.price").height(),
            i = $("header").height();
        $(window).scrollTop(), $("#compare-cars").scrollTop();
        $("html, body").animate({
            scrollTop: $(this).offset().top - i - t - e
        }, 500)
    });
    var i = ($("#compare-cars").width(), $(window).width(), $(".comp-cell").width());
    $("#slide-right").click(function(t) {
        t.preventDefault(), console.log(i + "px"), $("#compare-cars").animate({
            scrollLeft: "+=" + i
        }, 200)
    }), $("#slide-left").click(function(t) {
        t.preventDefault(), console.log("-" + i + "px"), $("#compare-cars").animate({
            scrollLeft: "-=" + i
        }, 200)
    })
}), $(window).on("load resize", function(t) {
    var e = $(".comp-row.pic .comp-cell").width();
    $(".comp-row.pic .comp-cell").height(9 * e / 16)
}), $(".faq-accordion").length > 0 && $(".faq-accordion").accordion({
    collapsible: !0,
    active: !1
}), $(function() {
    var t = new caller,
        e = new Array,
        i = $("#selected-number"),
        s = new SelectPickerFilter($("#findCarsBrand")),
        n = $("#find-car-results"),
        o = n.children(".results-container:first"),
        a = n.find("img.ajax-loader:first"),
        r = new BodyTypesFilter("body_types_filter"),
        l = new DriveFilter("drive_filter"),
        h = new TransmissionTypesFilter("transmission_types_filter"),
        c = new FuelTypesFilter("fuel_types_filter"),
        d = new EngineVolumesFilter("engine_volumes_filter"),
        u = new PowerFilter("power_filter"),
        p = $("#findCarsRegion"),
        f = $("#find-a-car-button");
    p.on("loaded.bs.select", function() {
        var t = $(this),
            e = $("#default_region").val(),
            i = new Array;
        t.children("option").each(function(t, e) {
            $(e).val() && i.push($(e).val())
        }), e && $.inArray(e, i) > -1 && (t.selectpicker("val", e), t.trigger("change"))
    });
    var g = function(t, e, i) {
        t.disable(), e && i && (t.enableLoadingState(), t.empty(), $.get("/api/brands?db=" + i + "&region=" + e, function(e) {
            t.addOptions(e), t.disableLoadingState(), t.enable()
        }))
    };
    p.change(function() {
        var t = $(this).val();
        $(".db-currency").addClass("hidden"), g(s, t, "current"), "" != t ? ($(".db-currency[data-region='" + t + "']").removeClass("hidden"), r.enableLoadingState(), l.enableLoadingState(), h.enableLoadingState(), c.enableLoadingState(), d.enableLoadingState(), u.enableLoadingState(), $.get("/api/buying-guide/fields/" + t, function(t) {
            r.addOptionsAndEnable(t.body_types), l.addOptionsAndEnable(t.drive), h.addOptionsAndEnable(t.transmission_types), c.addOptionsAndEnable(t.fuel_types), d.addOptionsAndEnable(t.engine_volumes), u.addOptionsAndEnable(t.power), f.prop("disabled", !1)
        }, "json")) : (r.hideAndEmpty(), l.hideAndEmpty(), h.hideAndEmpty(), c.hideAndEmpty(), d.hideAndEmpty(), u.hideAndEmpty(), console.log("make disable"), f.prop("disabled", !0)), m()
    });
    var m = function() {
            o.addClass("hide"), o.empty()
        },
        v = function() {
            var t = $("#add-to-compare-form");
            t.length && $("#add-to-compare-form").find(":input").remove()
        },
        b = function() {
            a.css("display", "inline-block"), m()
        },
        y = function(t) {
            return t.find(":input").filter(function() {
                return $.trim(this.value).length > 0
            }).serializeArray()
        },
        w = function(t) {
            o.append(t), o.find("ul.results-vu-ul li").each(function(t, i) {
                var s = $(i);
                s.is("li") && $.inArray(s.attr("id"), e) > -1 && s.addClass("result-selected")
            }), $("#selected-number").html(e.length), a.hide(), o.removeClass("hide")
        };
    f.click(function() {
        e = new Array, i.html(0), v(), b(n);
        var s = y($(this).closest("form"));
        return t.apiBuyingGuideVehicles(s, w, {
            method: "GET"
        }), !1
    }), window.getNewPage = function(t) {
        return b(n), window.addViewType(t), $.get($(t).attr("action"), $(t).serializeArray(), w), !1
    }, Array.prototype.remove || (Array.prototype.remove = function(t) {
        var e = this.indexOf(t);
        return e > -1 ? this.splice(e, 1) : []
    }), $("body").on("click", "#find-car-results .results-vu-ul a", function() {
        return $(this).closest("li").children(".select-check:first").trigger("click"), !1
    }), $("body").on("click", ".select-check", function() {
        var t = $(this).parent();
        t.toggleClass("result-selected"), t.hasClass("result-selected") ? e.push(t.attr("id")) : e.remove(t.attr("id")), $("#selected-number").html(e.length)
    }), $("body").on("click", "#add-to-compare", function() {
        if (v(), e.length) {
            var t = $("<input>").attr("type", "hidden").attr("name", "region").val(p.val()),
                i = $("#add-to-compare-form");
            i.append($(t)), $(e).each(function(t, e) {
                var s = $("<input>").attr("type", "hidden").attr("name", "vehicle_ids[]").val(e);
                i.append($(s))
            }), i.submit()
        } else alert("No car selected!");
        return !1
    });
    var _ = $("#left-find-cars-submit");
    _.click(function() {
        var t = $(this).closest("form");
        t.find(".message").empty();
        var e = t.children("select").val();
        return !!e && (t.submit(), !0)
    })
});
var IE = navigator.userAgent.match(/msie/i),
    fancyBoxDefaultsConfig = {
        padding: 0,
        margin: 0,
        width: 853,
        height: 480,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 1600,
        maxHeight: 1200,
        pixelRatio: 1,
        autoSize: !0,
        autoHeight: !1,
        autoWidth: !1,
        autoResize: !0,
        fitToView: !0,
        aspectRatio: !1,
        topRatio: .5,
        leftRatio: .5,
        scrolling: "no",
        wrapCSS: "",
        arrows: !0,
        closeBtn: !0,
        closeClick: !1,
        nextClick: !1,
        mouseWheel: !1,
        autoPlay: !1,
        playSpeed: 3e3,
        preload: 3,
        modal: !1,
        loop: !0,
        ajax: {
            dataType: "html",
            headers: {
                "X-fancyBox": !0
            }
        },
        iframe: {
            scrolling: "auto",
            preload: !0
        },
        swf: {
            wmode: "transparent",
            allowfullscreen: "true",
            allowscriptaccess: "always"
        },
        keys: {
            next: {
                13: "left",
                34: "up",
                39: "left",
                40: "up"
            },
            prev: {
                8: "right",
                33: "down",
                37: "right",
                38: "down"
            },
            close: [27],
            play: [32],
            toggle: [70]
        },
        direction: {
            next: "left",
            prev: "right"
        },
        scrollOutside: !0,
        index: 0,
        type: null,
        href: null,
        content: null,
        title: null,
        tpl: {
            wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
            image: '<img class="fancybox-image" src="{href}" alt="" />',
            iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen ' + (IE ? ' allowtransparency="true"' : "") + "></iframe>",
            error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
            closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        openEffect: "fade",
        openSpeed: 250,
        openEasing: "swing",
        openOpacity: !0,
        openMethod: "zoomIn",
        closeEffect: "fade",
        closeSpeed: 250,
        closeEasing: "swing",
        closeOpacity: !0,
        closeMethod: "zoomOut",
        nextEffect: "fade",
        nextSpeed: 250,
        nextEasing: "swing",
        nextMethod: "changeIn",
        prevEffect: "fade",
        prevSpeed: 250,
        prevEasing: "swing",
        prevMethod: "changeOut",
        helpers: {
            overlay: !0,
            title: !0
        },
        onCancel: $.noop,
        beforeLoad: $.noop,
        afterLoad: $.noop,
        beforeShow: $.noop,
        afterShow: $.noop,
        beforeChange: $.noop,
        beforeClose: $.noop,
        afterClose: $.noop
    };
jQuery.extend(jQuery.fancybox.defaults, fancyBoxDefaultsConfig), $(function() {
    function t(t, e, i) {
        var s = [],
            n = 0;
        $(t).each(function(t, i) {
            var o = $(i);
            o.data("url") == e.data("url") && (n = t), s.push({
                src: o.data("url"),
                thumb: o.data("thumb"),
                subHtml: "<h4>" + o.data("caption") + "</h4>"
            })
        }), s.length && e.lightGallery({
            backdropDuration: 50,
            preload: 2,
            index: n,
            download: !1,
            dynamic: !0,
            dynamicEl: s,
            hash: !1
        })
    }

    function e(t, e) {
        e || (e = window.location.href), t = t.replace(/[\[\]]/g, "\\$&");
        var i = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)"),
            s = i.exec(e);
        return s ? s[2] ? decodeURIComponent(s[2].replace(/\+/g, " ")) : "" : null
    }

    function i() {
        var t = 767,
            e = 990,
            i = window.innerWidth,
            a = 9 / 16;
        i > e ? ($(".home-nav").addClass("nav-toggle"), $("#main-nav").removeAttr("style"), c || n(T, S)) : ($(".home-nav").removeClass("nav-toggle"), c || o(T, S));
        var r = $("ul#brand-icons li").width();
        $("ul#brand-icons li").height(r), $("ul#all-brands li").height(m), s(t, e, i, a)
    }

    function s(t, e, i, s) {
        var n = $(".generic-slider .slides li").width(),
            o = $(".block-large").width(),
            a = $(".results-vu-grid li .result-img").width(),
            r = $(".results-vu-list li .result-img").width();
        $(".block-img").each(function() {
            var t = $(this).width();
            $(this).height(t * s)
        }), $(".ratio").each(function() {
            var t = $(this).width();
            $(this).height(t * s)
        }), $(".generic-slider .slides li").height(n * s), $(".block-large").height(o * s), $(".results-vu-grid li .result-img").height(a * s), $(".results-vu-list li .result-img").height(r * s);
        var l = $(".block-card").width(),
            h = l * s;
        i > e ? h = l * s / 2 : e >= i && i > t ? h = l * s / 3 : i <= t && (h = l * s), $(".block-card .block-img").height(h)
    }

    function n(t, e) {
        c = !0, t instanceof jQuery && (t.removeClass("results-vu-grid").addClass("results-vu-list"), "undefined" != typeof e && e instanceof jQuery && e.removeClass("to-list").addClass("to-grid"), window.currentViewType = "list"), i()
    }

    function o(t, e) {
        c = !0, t instanceof jQuery && (t.removeClass("results-vu-list").addClass("results-vu-grid"), "undefined" != typeof e && e instanceof jQuery && e.removeClass("to-grid").addClass("to-list"), window.currentViewType = "gird"), i()
    }

    function a(t, e, i, s) {
        i = "-" == t ? Math.floor(Math.min(i, Math.max(O - M.width() - Math.abs(E.position().left) + 180, 0))) : Math.floor(Math.min(i, Math.abs(E.position().left) + z)), $(e).hasClass("disabled") || A || (A = !0, E.animate({
            left: t + "=" + i
        }, s, function() {
            A = !1, Math.ceil(E.position().left) < 0 ? $(".sliding-left").removeClass("disabled") : $(".sliding-left").addClass("disabled"), O >= Math.abs(Math.ceil(E.position().left)) + M.width() + 2 ? $(".sliding-right").removeClass("disabled") : $(".sliding-right").addClass("disabled")
        }))
    }
    var r = $("#gotop"),
        l = $("header"),
        h = $("body"),
        c = !1;
    $("body").on("click", ".item-gallery", function(e) {
        e.preventDefault(), e.stopPropagation();
        var i = $(this),
            s = i.attr("gallery");
        "undefined" != typeof s && s !== !1 && t("[gallery=" + s + "]", i)
    }), $("#vehicle-gallery-exterior", "#vehicle-gallery-interior").click(function(t) {
        t.preventDefault(), console.log(this)
    }), $(".gallery-link").click(function() {
        var t = $(this).attr("rel-gallery");
        return "undefined" === t ? (console.log("The 'rel-gallery' attribute is missing."), !1) : ($('.item-gallery[data-url="' + t + '"]').trigger("click"), !1)
    });
    var d = e("view-type", window.location.href);
    null != d && "" != d && (c = !0), $(window).on("load resize", function(t) {
        i()
    }), r.hide(), r.click(function() {
        $("html").animate({
            scrollTop: 0
        }, 600), h.animate({
            scrollTop: 0
        }, 600)
    });
    var u = $("#fun-nav");
    $(window).scroll(function() {
        var t = $("#header").height();
        $(this).scrollTop() > t + 100 ? (l.addClass("sticky"), r.fadeIn(600), u.fadeOut(600), $(".nav-toggle").fadeIn(300)) : (l.removeClass("sticky"), r.fadeOut(600), u.fadeIn(600), $(".nav-toggle").fadeOut(300))
    }), $("#header-search-button").click(function() {
        $("#header-search-input").fadeToggle(200)
    });
    var p = ' <span class="glyphicon glyphicon-menu-down"></span>';
    $("li.drop > a").append(p).click(function(t) {
        t.preventDefault()
    }), $(function() {
        $("#main-nav li").click(function() {
            $("ul", this).slideToggle("fast")
        })
    }), $(function() {
        $("#header-stacks").click(function() {
            $("#main-nav").slideToggle("fast")
        })
    });
    var f = $("#page-banner").html();
    $("#page-title").html(f), $("#car-brands").hide(), $("#toggle-brands").click(function(t) {
        t.preventDefault(), $("#car-brands").slideToggle(200)
    });
    var g = $("ul#brand-icons li").width(),
        m = $("ul#all-brands li").width();
    $("ul#brand-icons li").height(g), $("ul#all-brands li").height(m), $("#toggle-left-panel .btn-default").click(function(t) {
        t.preventDefault(), $(".left-panel").slideToggle(200)
    });
    var v = $(".generic-slider .flexslider");
    v.flexslider({
        animation: "slide",
        slideshowSpeed: 5e3,
        animationSpeed: 600,
        controlNav: !1,
        directionNav: !0,
        mousewheel: !1,
        slideshow: !1,
        animationLoop: !1,
        start: function(t) {
            var e = t.slides;
            $(e).each(function(t, e) {
                var i = $(e);
                i.height(9 * i.width() / 16), 0 == t && i.lazy({
                    bind: "event",
                    delay: 0
                })
            })
        }
    }), v.find("li.img").each(function() {
        $(this).lazy({
            bind: "event",
            delay: 0
        })
    }), $(window).load(function() {
        $("#main-slider .flexslider").flexslider({
            animation: "slide",
            slideshowSpeed: 4e3,
            animationSpeed: 1e3,
            controlNav: "thumbnails",
            directionNav: !1,
            mousewheel: !1,
            start: function(t) {
                h.removeClass("loading")
            }
        }), $(".profile-slider .flexslider").flexslider({
            animation: "fade",
            slideshowSpeed: 5e3,
            animationSpeed: 600,
            controlNav: !1,
            directionNav: !0,
            mousewheel: !1,
            slideshow: !1,
            animationLoop: !1
        })
    }), $(function() {
        var t = $(".fancybox");
        t.fancybox({
            helpers: {
                title: {
                    type: "inside"
                }
            },
            loop: !1
        })
    }), window.innerWidth < 992 && $("#article-pmo-3-hidden").html('<a href="images/pmo-lastgear1.gif" rel="article-gallery-1" title="" class="fancybox"><img src="images/pmo-lastgear1.gif" alt="" title="" /></a>').css("display", "none"), window.innerWidth > 992 && $("#article-pmo-3-hidden").html("").css("display", "none");
    var b = $("#app-compare-box-2").html();
    $(".add-more").click(function(t) {
        t.preventDefault(), $(this).parent().html(b)
    }), $(".close-x").click(function(t) {
        t.preventDefault()
    });
    var y = $(".social-network").html();
    $(".social-network-responsive").html(y), $(".carousel").slick({
        dots: !1,
        infinite: !0,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: !0,
        autoplaySpeed: 2e3,
        responsive: [{
            breakpoint: 1600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: !0,
                dots: !1
            }
        }, {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: !0,
                dots: !1
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: !0,
                dots: !1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: !0,
                dots: !1
            }
        }]
    }), $(".carousel-small").slick({
        dots: !1,
        infinite: !0,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: !0,
        autoplaySpeed: 3e3,
        responsive: [{
            breakpoint: 1600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: !0,
                dots: !1
            }
        }, {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: !0,
                dots: !1
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }]
    }), $(".carousel-tiny").slick({
        dots: !1,
        infinite: !0,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: !0,
        autoplaySpeed: 2400
    });
    var w = $("#article-pmo-1").html(),
        _ = $("#article-pmo-1").css("background-image");
    $("#article-pmo-1-reflect").addClass("block-square").html(w).css("background-image", _);
    var x = $("#article-pmo-2").html(),
        k = $("#article-pmo-2").css("background-image");
    $("#article-pmo-2-reflect").addClass("block-square").html(x).css("background-image", k), $("#ajax-first").click(function() {
        $("#ajax-loaded").load("external.html #first")
    }), $("#ajax-second").click(function() {
        $("#ajax-loaded").load("external.html #second")
    }), $("#ajax-third").click(function() {
        $("#ajax-loaded").load("external.html #third")
    }), $("#tabs-v").tabs({
        show: "fade",
        hide: "fade"
    });
    var C = $(".tabs-v-tabs ul li");
    $(".tabs-v-tabs ul li.selected");
    $(C).click(function() {
        $(C).removeClass("selected"), $(this).addClass("selected")
    }), $(".tabs-h").tabs({
        activate: function(t, e) {
            e.newPanel.hide().fadeIn(300)
        }
    });
    var C = $(".tabs-h-tabs ul li");
    $(".tabs-h-tabs ul li.selected");
    $(C).click(function() {
        $(C).removeClass("selected"), $(this).addClass("selected")
    }), h.on("click", "#results-vu-toggle", function(t) {
        var e = $(this),
            i = $(".results-vu-ul");
        i.hasClass("results-vu-grid") ? n(i, e) : o(i, e)
    });
    var T = $(".results-vu-ul").not(".always-grid"),
        S = $("#results-vu-toggle");
    $(window).load(function() {
        window.innerWidth < 992 && o(T, S)
    }), $("label").prepend("<span></span>"), window.paginatorCall = function(t, e) {
        return !$(t).parent().hasClass("disabled") && ($(t).closest(".paginator-container").find(".paginator-form").find(".page").val(e), $(t).closest(".paginator-container").find(".paginator-form").submit(), !0)
    }, window.addViewType = function(t) {
        return "undefined" == typeof window.currentViewType && (window.currentViewType = "list"), $(t).append('<input type="hidden" value="' + window.currentViewType + '" name="view-type" />'), !0
    }, window.addSearchText = function(t, e) {
        return $(t).append('<input type="hidden" value="' + $(e).val() + '" name="searchText" />'), !0
    }, window.addParameters = function(t, e) {
        $(e).each(function() {
            return $(t).find(".extra-params-holder").append($(this).html()), !0
        })
    };
    var D = $("#carfile-specs-form-submit"),
        P = $("#carfile-specs-form"),
        I = P.find("input[type=checkbox]");
    I.click(function() {
        $("#carfile-specs-form").find(".alert").addClass("hidden"), $(this).is(":checked") ? D.prop("disabled", !1) : I.filter(":checked").size() || D.prop("disabled", !0)
    }), D.click(function() {
        I.filter(":checked").size() ? P.submit() : $("#carfile-specs-form").find(".alert").removeClass("hidden")
    }), $("#carfile-brand").change(function() {
        $("#carfile-model").val(""), $("#carfile-models-group").html($("#carfile-models-container-" + $(this).val().replace(/\s/g, "")).html())
    }), $("#testdrive-brand").change(function() {
        $("#testdrive-model").val(""), $("#testdrive-models-group").html($("#testdrive-models-container-" + $(this).val().replace(/\s/g, "")).html()), $("#testdrive-trim").val(""), $("#testdrive-trims-group").html("")
    }), $("#testdrive-model").change(function() {
        $("#testdrive-trim").val(""), $("#testdrive-trims-group").html($("#testdrive-models-trims-container-" + $(this).val().replace(/\s/g, "")).html())
    }), $("[href]").not(".fancybox").not(".pagination [href]").not(".ui-tabs-anchor").not('[href="#"]').click(function(t) {
        t.preventDefault();
        var e = $(this).attr("href"),
            i = "text";
        "button" == $(this).prop("nodeName") && (i = "button"), ("none" != $(this).css("background-image") && "" != $(this).css("background-image") || "none" != $(this).parent().css("background-image") && "" != $(this).parent().css("background-image")) && (i = "image"), ga("send", "event", $("title").html() + "-" + $(this).attr("href") + " " + i, $(this).attr("href"), i);
        var s = $(this).attr("target");
        "undefined" != typeof s && 0 != s ? setTimeout(function() {
            window.open(e, s)
        }, 100) : setTimeout(function() {
            window.location.href = e
        }, 100)
    }), $(window).bind("pageshow", function() {
        $(".left-form").find("select").val("")
    }), $("#left-find-cars-region-selector").change(function() {
        "" != $(this).val() && $("#left-find-cars-submit").removeClass("btn-disabled")
    }), $(".lazy").lazy();
    var A = !1;
    $(".sliding-right").click(function() {
        a("-", this, Math.floor($(this).parent().width() / 2), 700)
    }), $(".sliding-left").click(function() {
        a("+", this, Math.floor($(this).parent().width() / 2), 700)
    });
    var E = $(".model-list-container").find("ul"),
        O = 0;
    E.children().each(function() {
        O += $(this).outerWidth(!0)
    }), O = Math.ceil(O);
    var M = $(".model-list-container div");
    if (M.width() > O && $(".sliding-right").addClass("disabled"), E.length > 0) var z = E.position().left;
    $(window).scroll(function() {
        var t = $("#video-player"),
            e = $(".breadcrumb").outerHeight();
        window.innerWidth < 992 && ($(this).scrollTop() > e + 10 ? t.css("top", $(this).scrollTop() - e - 10 + "px") : t.css("top", "0"))
    })
}), $(function() {
    var t = $("#region"),
        e = $("#check-history"),
        i = $("#brand"),
        s = $("#model"),
        n = $("#year"),
        o = $("#body_type"),
        a = $("#doors"),
        r = $("#transmission"),
        l = $("#fuel"),
        h = $("#engine"),
        c = $("#trim"),
        d = $("#add-a-car-button");
    $(".bootstrap-select.disabled").prev().hide(), d.prop("disabled", !0);
    var u = function(t) {
            return t.vehicle_id
        },
        p = function(t) {
            return t.model_year + " - " + t.trim_name + " (" + t.body_type_full + ")"
        },
        f = function(t) {
            t.children("[value!='']").remove(), t.selectpicker("refresh")
        },
        g = function(t) {
            t.prop("disabled", !0), t.selectpicker("refresh"), t.closest(".bootstrap-select").prev().hide()
        },
        m = function(t) {
            t.prop("disabled", !1), t.selectpicker("refresh"), t.selectpicker("deselectAll"), t.closest(".bootstrap-select").prev().show()
        },
        v = function(t) {
            t.closest(".loader-container").find("img.ajax-loader").css("display", "inline")
        },
        b = function(t) {
            t.closest(".loader-container").find("img.ajax-loader").hide()
        },
        y = function() {
            return e.is(":checked") ? "history" : "current"
        },
        w = function(t) {
            t.append('<option value="all" selected="selected">all</option>'), t.selectpicker("refresh")
        };
    $("select.selectpicker").each(function() {
        $(this).selectpicker("deselectAll")
    }), e.change(function() {
        d.prop("disabled", !0), this.checked ? T(t.val(), "history") : T(t.val(), "current")
    }), t.change(function() {
        d.prop("disabled", !0), T($(this).val(), y()), f(s), g(s)
    }), i.change(function() {
        d.prop("disabled", !0), S($(this).val(), t.val(), y())
    }), s.change(function() {
        M(i.val(), s.val(), "all", "all", "all", "all", "all", t.val(), "all", y()), k(n, o, a, r, l, h), D(i.val(), $(this).val(), t.val(), y()), P(i.val(), s.val(), "all", t.val(), y()), I(i.val(), s.val(), "all", "all", t.val(), y()), A(i.val(), s.val(), "all", "all", "all", t.val(), y()), E(i.val(), s.val(), "all", "all", "all", "all", t.val(), y()), O(i.val(), s.val(), "all", "all", "all", "all", "all", t.val(), y()), d.prop("disabled", !0)
    }), n.change(function() {
        M(i.val(), s.val(), n.val(), o.val(), a.val(), r.val(), l.val(), t.val(), h.val(), y()), P(i.val(), s.val(), n.val(), t.val(), y()), d.prop("disabled", !0)
    }), o.change(function() {
        M(i.val(), s.val(), n.val(), o.val(), a.val(), r.val(), l.val(), t.val(), h.val(), y()), I(i.val(), s.val(), n.val(), o.val(), t.val(), y()), d.prop("disabled", !0)
    }), a.change(function() {
        M(i.val(), s.val(), n.val(), o.val(), a.val(), r.val(), l.val(), t.val(), h.val(), y()), A(i.val(), s.val(), n.val(), o.val(), a.val(), t.val(), y()), d.prop("disabled", !0)
    }), r.change(function() {
        M(i.val(), s.val(), n.val(), o.val(), a.val(), r.val(), l.val(), t.val(), h.val(), y()), E(i.val(), s.val(), n.val(), o.val(), a.val(), r.val(), t.val(), y()), d.prop("disabled", !0)
    }), l.change(function() {
        M(i.val(), s.val(), n.val(), o.val(), a.val(), r.val(), l.val(), t.val(), h.val(), y()), O(i.val(), s.val(), n.val(), o.val(), a.val(), r.val(), l.val(), t.val(), y()), d.prop("disabled", !0)
    }), c.change(function() {
        d.prop("disabled", !1)
    }), g(i), g(s), g(n), g(o), g(a), g(r), g(l), g(h), g(c);
    var _ = function() {
            var t = Array.prototype.slice.call(arguments);
            t.forEach(function(t) {
                f(t)
            })
        },
        x = function() {
            var t = Array.prototype.slice.call(arguments);
            t.forEach(function(t) {
                g(t)
            })
        },
        k = function() {
            var t = Array.prototype.slice.call(arguments);
            t.forEach(function(t) {
                m(t)
            })
        },
        C = function() {
            var t = Array.prototype.slice.call(arguments);
            t.forEach(function(t) {
                w(t)
            })
        },
        T = function(t, e) {
            x(i, s, c, n, o, a, r, l, h), _(i, s, c, n, o, a, r, l, h), C(n, o, a, r, l, h), t && e && (v(i), $.get("/api/brands?db=" + e + "&region=" + t, function(t) {
                $.each(t, function(t, e) {
                    i.append('<option value="' + e.brand + '">' + e.brand + "</option>")
                }), i.selectpicker("refresh"), b(i), m(i)
            }))
        },
        S = function(t, e, i) {
            x(c, n, o, a, r, l, h), _(c, n, o, a, r, l, h), C(n, o, a, r, l, h), t && e && i && (v(s), f(s), g(s), w(n), $.get(Routing.generate("apiModelsByBrand", {
                brandName: t,
                db: i,
                region: e
            }), function(t) {
                $.each(t, function(t, e) {
                    s.append('<option value="' + e.model + '">' + e.model + "</option>")
                }), s.selectpicker("refresh"), b(s), m(s)
            }))
        },
        D = function(t, e, i, s) {
            _(o, a, r, l, h), C(o, a, r, l, h), t && e && i && s && (v(n), f(n), g(n), $.get("/api/brands/" + t + "/models/" + e + "/years?db=" + s + "&region=" + i, function(t) {
                n.append('<option value="all">all</option>'), $.each(t, function(t, e) {
                    var i = 1 == e.number_of_trims ? "car" : "cars";
                    n.append('<option value="' + e.year + '">' + e.year + " (" + e.number_of_trims + " " + i + ")</option>")
                }), n.selectpicker("refresh"), b(n), m(n)
            }))
        },
        P = function(t, e, i, s, n) {
            _(a, r, l, h), C(a, r, l, h), t && e && i && s && n && (console.log("a3"), v(o), f(o), g(o), $.get("/api/brands/" + t + "/models/" + e + "/years/" + i + "/body_types?db=" + n + "&region=" + s, function(t) {
                w(o), $.each(t, function(t, e) {
                    var i = 1 == e.number_of_trims ? "car" : "cars";
                    o.append('<option value="' + e.body_type + '">' + e.body_type_value + " (" + e.number_of_trims + " " + i + ")</option>")
                }), o.selectpicker("refresh"), b(o), m(o)
            }))
        },
        I = function(t, e, i, s, n, o) {
            _(r, l, h), C(r, l, h), t && e && i && s && n && o && (v(a), f(a), g(a), $.get("/api/brands/" + t + "/models/" + e + "/years/" + i + "/body_types/" + s + "/number_of_doors?db=" + o + "&region=" + n, function(t) {
                w(a), $.each(t, function(t, e) {
                    var i = 1 == e.number_of_trims ? "car" : "cars";
                    a.append('<option value="' + e.doors + '">' + e.doors + " (" + e.number_of_trims + " " + i + ")</option>")
                }), a.selectpicker("refresh"), b(a), m(a)
            }))
        },
        A = function(t, e, i, s, n, o, a) {
            _(l, h), C(l, h), t && e && i && s && o && n && a && (v(r), f(r), g(r), $.get("/api/brands/" + t + "/models/" + e + "/years/" + i + "/body_types/" + s + "/number_of_doors/" + n + "/transmission_types?db=" + a + "&region=" + o, function(t) {
                w(r), $.each(t, function(t, e) {
                    var i = 1 == e.number_of_trims ? "car" : "cars";
                    r.append('<option value="' + e.transmission_type + '">' + e.transmission_type_value + " (" + e.number_of_trims + " " + i + ")</option>")
                }), r.selectpicker("refresh"), b(r), m(r)
            }))
        },
        E = function(t, e, i, s, n, o, a, r) {
            _(h), C(h), t && e && i && s && n && o && a && r && (v(l), f(l), g(l), $.get("/api/brands/" + t + "/models/" + e + "/years/" + i + "/body_types/" + s + "/number_of_doors/" + n + "/transmission_types/" + o + "/fuel_types?db=" + r + "&region=" + a, function(t) {
                w(l), $.each(t, function(t, e) {
                    var i = 1 == e.number_of_trims ? "car" : "cars";
                    l.append('<option value="' + e.fuel_type + '">' + e.fuel_type_value + " (" + e.number_of_trims + " " + i + ")</option>")
                }), l.selectpicker("refresh"), b(l), m(l)
            }))
        },
        O = function(t, e, i, s, n, o, a, r, l) {
            t && e && i && s && n && o && a && r && l && (v(h), f(h), g(h), $.get("/api/brands/" + t + "/models/" + e + "/years/" + i + "/body_types/" + s + "/number_of_doors/" + n + "/transmission_types/" + o + "/fuel_types/" + a + "/engine_volumes?db=" + l + "&region=" + r, function(t) {
                w(h), $.each(t, function(t, e) {
                    var i = 1 == e.number_of_trims ? "car" : "cars";
                    h.append('<option value="' + e.engine_volume + '">' + e.engine_volume + " l (" + e.number_of_trims + " " + i + ")</option>")
                }), h.selectpicker("refresh"), b(h), m(h)
            }))
        },
        M = function(t, e, i, s, n, o, a, r, l, h) {
            t && e && i && s && n && o && a && l && r && h && (v(c), f(c), g(c), $.get("/api/brands/" + t + "/models/" + e + "/years/" + i + "/body_types/" + s + "/number_of_doors/" + n + "/transmission_types/" + o + "/fuel_types/" + a + "/engine_volumes/" + l + "/trims?db=" + h + "&region=" + r, function(t) {
                $.each(t, function(t, e) {
                    c.append('<option value="' + u(e) + '">' + p(e) + "</option>")
                }), c.selectpicker("refresh"), b(c), m(c)
            }))
        }
}), $(document).ready(function() {
    function t() {
        e.toggleClass("change-up"), i.slideToggle(200)
    }
    $(".accordion .ui-accordion-header").click(function() {
        $(this).toggleClass("ui-accordion-header-active").next().slideToggle()
    }), $("#compare-expand").click(function(t) {
        t.preventDefault(), $(".accordion .ui-accordion-header").addClass("ui-accordion-header-active").next().show()
    }), $("#compare-collapse").click(function(t) {
        t.preventDefault(), $(".accordion .ui-accordion-header").removeClass("ui-accordion-header-active").next().hide()
    }), $("#show-vehicle-change a").click(function(t) {
        t.preventDefault(), $(this).slideUp(100), $("#vehicle-change").slideDown(100)
    });
    var e = $("#vehicle-title-trim-change"),
        i = $("#vehicle-title-trim-list");
    e.click(function(e) {
        e.preventDefault(), t()
    }), e.blur(function() {
        e.removeClass("change-up"), i.slideUp(200)
    })
});