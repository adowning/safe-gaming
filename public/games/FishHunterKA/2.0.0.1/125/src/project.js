  
    if( !sessionStorage.getItem('sessionId') ){
        sessionStorage.setItem('sessionId', parseInt(Math.random() * 1000000));
    }
	var serverString='';

    var XmlHttpRequest = new XMLHttpRequest();
    XmlHttpRequest.overrideMimeType("application/json");
    XmlHttpRequest.open('GET', '/socket_config0.json', false);
    XmlHttpRequest.onreadystatechange = function ()
    {
        if (XmlHttpRequest.readyState == 4 && XmlHttpRequest.status == "200")
        {
            var serverConfig = JSON.parse(XmlHttpRequest.responseText);
            serverString=serverConfig.prefix_ws+serverConfig.host_ws+':'+serverConfig.port;
          
        }
    }
    XmlHttpRequest.send(null);


window.__require = function e(t, n, o) {
    function i(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1], !t[c]) {
                    var l = "function" == typeof __require && __require;
                    if (!s && l) return l(c, !0);
                    if (r) return r(c, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var u = n[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                return i(t[a][1][e] || e)
            }, u, u.exports, e, t, n, o)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof __require && __require, a = 0; a < o.length; a++) i(o[a]);
    return i
}({
    1: [function(e, t, n) {
        function o() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function i(e) {
            return "function" == typeof e
        }

        function r(e) {
            return "number" == typeof e
        }

        function a(e) {
            return "object" == typeof e && null !== e
        }

        function s(e) {
            return void 0 === e
        }
        t.exports = o, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._maxListeners = void 0, o.defaultMaxListeners = 10, o.prototype.setMaxListeners = function(e) {
            if (!r(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, o.prototype.emit = function(e) {
            var t, n, o, r, c, l;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
                if ((t = arguments[1]) instanceof Error) throw t;
                var u = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                throw u.context = t, u
            }
            if (s(n = this._events[e])) return !1;
            if (i(n)) switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    r = Array.prototype.slice.call(arguments, 1), n.apply(this, r)
            } else if (a(n))
                for (r = Array.prototype.slice.call(arguments, 1), o = (l = n.slice()).length, c = 0; c < o; c++) l[c].apply(this, r);
            return !0
        }, o.prototype.addListener = function(e, t) {
            var n;
            if (!i(t)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? a(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, a(this._events[e]) && !this._events[e].warned && (n = s(this._maxListeners) ? o.defaultMaxListeners : this._maxListeners) && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
        }, o.prototype.on = o.prototype.addListener, o.prototype.once = function(e, t) {
            if (!i(t)) throw TypeError("listener must be a function");
            var n = !1;

            function o() {
                this.removeListener(e, o), n || (n = !0, t.apply(this, arguments))
            }
            return o.listener = t, this.on(e, o), this
        }, o.prototype.removeListener = function(e, t) {
            var n, o, r, s;
            if (!i(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (r = (n = this._events[e]).length, o = -1, n === t || i(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (a(n)) {
                for (s = r; s-- > 0;)
                    if (n[s] === t || n[s].listener && n[s].listener === t) {
                        o = s;
                        break
                    } if (o < 0) return this;
                1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(o, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, o.prototype.removeAllListeners = function(e) {
            var t, n;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (i(n = this._events[e])) this.removeListener(e, n);
            else if (n)
                for (; n.length;) this.removeListener(e, n[n.length - 1]);
            return delete this._events[e], this
        }, o.prototype.listeners = function(e) {
            return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, o.prototype.listenerCount = function(e) {
            if (this._events) {
                var t = this._events[e];
                if (i(t)) return 1;
                if (t) return t.length
            }
            return 0
        }, o.listenerCount = function(e, t) {
            return e.listenerCount(t)
        }
    }, {}],
    2: [function(e, t, n) {
        var o, i, r = t.exports = {};

        function a() {
            throw new Error("setTimeout has not been defined")
        }

        function s() {
            throw new Error("clearTimeout has not been defined")
        }

        function c(e) {
            if (o === setTimeout) return setTimeout(e, 0);
            if ((o === a || !o) && setTimeout) return o = setTimeout, setTimeout(e, 0);
            try {
                return o(e, 0)
            } catch (t) {
                try {
                    return o.call(null, e, 0)
                } catch (t) {
                    return o.call(this, e, 0)
                }
            }
        }

        function l(e) {
            if (i === clearTimeout) return clearTimeout(e);
            if ((i === s || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);
            try {
                return i(e)
            } catch (t) {
                try {
                    return i.call(null, e)
                } catch (t) {
                    return i.call(this, e)
                }
            }
        }(function() {
            try {
                o = "function" == typeof setTimeout ? setTimeout : a
            } catch (e) {
                o = a
            }
            try {
                i = "function" == typeof clearTimeout ? clearTimeout : s
            } catch (e) {
                i = s
            }
        })();
        var u, h = [],
            p = !1,
            f = -1;

        function d() {
            p && u && (p = !1, u.length ? h = u.concat(h) : f = -1, h.length && _())
        }

        function _() {
            if (!p) {
                var e = c(d);
                p = !0;
                for (var t = h.length; t;) {
                    for (u = h, h = []; ++f < t;) u && u[f].run();
                    f = -1, t = h.length
                }
                u = null, p = !1, l(e)
            }
        }

        function g(e, t) {
            this.fun = e, this.array = t
        }

        function y() {}
        r.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            h.push(new g(e, t)), 1 !== h.length || p || c(_)
        }, g.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = y, r.addListener = y, r.once = y, r.off = y, r.removeListener = y, r.removeAllListeners = y, r.emit = y, r.prependListener = y, r.prependOnceListener = y, r.listeners = function(e) {
            return []
        }, r.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, r.cwd = function() {
            return "/"
        }, r.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, r.umask = function() {
            return 0
        }
    }, {}],
    3: [function(e, t, n) {
        "use strict";
        n.byteLength = function(e) {
            var t = l(e),
                n = t[0],
                o = t[1];
            return 3 * (n + o) / 4 - o
        }, n.toByteArray = function(e) {
            for (var t, n = l(e), o = n[0], a = n[1], s = new r(u(e, o, a)), c = 0, h = a > 0 ? o - 4 : o, p = 0; p < h; p += 4) t = i[e.charCodeAt(p)] << 18 | i[e.charCodeAt(p + 1)] << 12 | i[e.charCodeAt(p + 2)] << 6 | i[e.charCodeAt(p + 3)], s[c++] = t >> 16 & 255, s[c++] = t >> 8 & 255, s[c++] = 255 & t;
            2 === a && (t = i[e.charCodeAt(p)] << 2 | i[e.charCodeAt(p + 1)] >> 4, s[c++] = 255 & t);
            1 === a && (t = i[e.charCodeAt(p)] << 10 | i[e.charCodeAt(p + 1)] << 4 | i[e.charCodeAt(p + 2)] >> 2, s[c++] = t >> 8 & 255, s[c++] = 255 & t);
            return s
        }, n.fromByteArray = function(e) {
            for (var t, n = e.length, i = n % 3, r = [], a = 0, s = n - i; a < s; a += 16383) r.push(p(e, a, a + 16383 > s ? s : a + 16383));
            1 === i ? (t = e[n - 1], r.push(o[t >> 2] + o[t << 4 & 63] + "==")) : 2 === i && (t = (e[n - 2] << 8) + e[n - 1], r.push(o[t >> 10] + o[t >> 4 & 63] + o[t << 2 & 63] + "="));
            return r.join("")
        };
        for (var o = [], i = [], r = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, c = a.length; s < c; ++s) o[s] = a[s], i[a.charCodeAt(s)] = s;

        function l(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var n = e.indexOf("=");
            return -1 === n && (n = t), [n, n === t ? 0 : 4 - n % 4]
        }

        function u(e, t, n) {
            return 3 * (t + n) / 4 - n
        }

        function h(e) {
            return o[e >> 18 & 63] + o[e >> 12 & 63] + o[e >> 6 & 63] + o[63 & e]
        }

        function p(e, t, n) {
            for (var o, i = [], r = t; r < n; r += 3) o = (e[r] << 16 & 16711680) + (e[r + 1] << 8 & 65280) + (255 & e[r + 2]), i.push(h(o));
            return i.join("")
        }
        i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
    }, {}],
    4: [function(e, t, n) {
        (function(o, i) {
            (function(e, o) {
                "object" == typeof n && void 0 !== t ? t.exports = o() : "function" == typeof define && define.amd ? define(o) : e.ES6Promise = o()
            })(this, function() {
                "use strict";

                function t(e) {
                    var t = typeof e;
                    return null !== e && ("object" === t || "function" === t)
                }

                function n(e) {
                    return "function" == typeof e
                }
                var r = Array.isArray ? Array.isArray : function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    a = 0,
                    s = void 0,
                    c = void 0,
                    l = function(e, t) {
                        g[a] = e, g[a + 1] = t, 2 === (a += 2) && (c ? c(y) : m())
                    };
                var u = "undefined" != typeof window ? window : void 0,
                    h = u || {},
                    p = h.MutationObserver || h.WebKitMutationObserver,
                    f = "undefined" == typeof self && void 0 !== o && "[object process]" === {}.toString.call(o),
                    d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

                function _() {
                    var e = setTimeout;
                    return function() {
                        return e(y, 1)
                    }
                }
                var g = new Array(1e3);

                function y() {
                    for (var e = 0; e < a; e += 2) {
                        (0, g[e])(g[e + 1]), g[e] = void 0, g[e + 1] = void 0
                    }
                    a = 0
                }
                var m = void 0;

                function v(e, t) {
                    var n = this,
                        o = new this.constructor(S);
                    void 0 === o[C] && G(o);
                    var i = n._state;
                    if (i) {
                        var r = arguments[i - 1];
                        l(function() {
                            return D(i, o, r, n._result)
                        })
                    } else x(n, o, e, t);
                    return o
                }

                function b(e) {
                    if (e && "object" == typeof e && e.constructor === this) return e;
                    var t = new this(S);
                    return N(t, e), t
                }
                m = f ? function() {
                    return o.nextTick(y)
                } : p ? function() {
                    var e = 0,
                        t = new p(y),
                        n = document.createTextNode("");
                    return t.observe(n, {
                            characterData: !0
                        }),
                        function() {
                            n.data = e = ++e % 2
                        }
                }() : d ? function() {
                    var e = new MessageChannel;
                    return e.port1.onmessage = y,
                        function() {
                            return e.port2.postMessage(0)
                        }
                }() : void 0 === u && "function" == typeof e ? function() {
                    try {
                        var e = Function("return this")().require("vertx");
                        return void 0 !== (s = e.runOnLoop || e.runOnContext) ? function() {
                            s(y)
                        } : _()
                    } catch (e) {
                        return _()
                    }
                }() : _();
                var C = Math.random().toString(36).substring(2);

                function S() {}
                var w = void 0,
                    P = 1,
                    R = 2,
                    O = {
                        error: null
                    };

                function T(e) {
                    try {
                        return e.then
                    } catch (e) {
                        return O.error = e, O
                    }
                }

                function A(e, t, n, o) {
                    try {
                        e.call(t, n, o)
                    } catch (e) {
                        return e
                    }
                }

                function F(e, t, n) {
                    l(function(e) {
                        var o = !1,
                            i = A(n, t, function(n) {
                                o || (o = !0, t !== n ? N(e, n) : B(e, n))
                            }, function(t) {
                                o || (o = !0, L(e, t))
                            }, e._label);
                        !o && i && (o = !0, L(e, i))
                    }, e)
                }

                function I(e, t) {
                    t._state === P ? B(e, t._result) : t._state === R ? L(e, t._result) : x(t, void 0, function(t) {
                        return N(e, t)
                    }, function(t) {
                        return L(e, t)
                    })
                }

                function k(e, t, o) {
                    t.constructor === e.constructor && o === v && t.constructor.resolve === b ? I(e, t) : o === O ? (L(e, O.error), O.error = null) : void 0 === o ? B(e, t) : n(o) ? F(e, t, o) : B(e, t)
                }

                function N(e, n) {
                    e === n ? L(e, new TypeError("You cannot resolve a promise with itself")) : t(n) ? k(e, n, T(n)) : B(e, n)
                }

                function E(e) {
                    e._onerror && e._onerror(e._result), M(e)
                }

                function B(e, t) {
                    e._state === w && (e._result = t, e._state = P, 0 !== e._subscribers.length && l(M, e))
                }

                function L(e, t) {
                    e._state === w && (e._state = R, e._result = t, l(E, e))
                }

                function x(e, t, n, o) {
                    var i = e._subscribers,
                        r = i.length;
                    e._onerror = null, i[r] = t, i[r + P] = n, i[r + R] = o, 0 === r && e._state && l(M, e)
                }

                function M(e) {
                    var t = e._subscribers,
                        n = e._state;
                    if (0 !== t.length) {
                        for (var o = void 0, i = void 0, r = e._result, a = 0; a < t.length; a += 3) o = t[a], i = t[a + n], o ? D(n, o, i, r) : i(r);
                        e._subscribers.length = 0
                    }
                }

                function j(e, t) {
                    try {
                        return e(t)
                    } catch (e) {
                        return O.error = e, O
                    }
                }

                function D(e, t, o, i) {
                    var r = n(o),
                        a = void 0,
                        s = void 0,
                        c = void 0,
                        l = void 0;
                    if (r) {
                        if ((a = j(o, i)) === O ? (l = !0, s = a.error, a.error = null) : c = !0, t === a) return void L(t, new TypeError("A promises callback cannot return that same promise."))
                    } else a = i, c = !0;
                    t._state !== w || (r && c ? N(t, a) : l ? L(t, s) : e === P ? B(t, a) : e === R && L(t, a))
                }

                function H(e, t) {
                    try {
                        t(function(t) {
                            N(e, t)
                        }, function(t) {
                            L(e, t)
                        })
                    } catch (t) {
                        L(e, t)
                    }
                }
                var U = 0;

                function G(e) {
                    e[C] = U++, e._state = void 0, e._result = void 0, e._subscribers = []
                }
                var $ = function() {
                    function e(e, t) {
                        this._instanceConstructor = e, this.promise = new e(S), this.promise[C] || G(this.promise), r(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? B(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && B(this.promise, this._result))) : L(this.promise, new Error("Array Methods must be provided an Array"))
                    }
                    return e.prototype._enumerate = function(e) {
                        for (var t = 0; this._state === w && t < e.length; t++) this._eachEntry(e[t], t)
                    }, e.prototype._eachEntry = function(e, t) {
                        var n = this._instanceConstructor,
                            o = n.resolve;
                        if (o === b) {
                            var i = T(e);
                            if (i === v && e._state !== w) this._settledAt(e._state, t, e._result);
                            else if ("function" != typeof i) this._remaining--, this._result[t] = e;
                            else if (n === q) {
                                var r = new n(S);
                                k(r, e, i), this._willSettleAt(r, t)
                            } else this._willSettleAt(new n(function(t) {
                                return t(e)
                            }), t)
                        } else this._willSettleAt(o(e), t)
                    }, e.prototype._settledAt = function(e, t, n) {
                        var o = this.promise;
                        o._state === w && (this._remaining--, e === R ? L(o, n) : this._result[t] = n), 0 === this._remaining && B(o, this._result)
                    }, e.prototype._willSettleAt = function(e, t) {
                        var n = this;
                        x(e, void 0, function(e) {
                            return n._settledAt(P, t, e)
                        }, function(e) {
                            return n._settledAt(R, t, e)
                        })
                    }, e
                }();

                function W() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function z() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }
                var q = function() {
                    function e(t) {
                        this[C] = U++, this._result = this._state = void 0, this._subscribers = [], S !== t && ("function" != typeof t && W(), this instanceof e ? H(this, t) : z())
                    }
                    return e.prototype.catch = function(e) {
                        return this.then(null, e)
                    }, e.prototype.finally = function(e) {
                        var t = this.constructor;
                        return n(e) ? this.then(function(n) {
                            return t.resolve(e()).then(function() {
                                return n
                            })
                        }, function(n) {
                            return t.resolve(e()).then(function() {
                                throw n
                            })
                        }) : this.then(e, e)
                    }, e
                }();
                return q.prototype.then = v, q.all = function(e) {
                    return new $(this, e).promise
                }, q.race = function(e) {
                    var t = this;
                    return r(e) ? new t(function(n, o) {
                        for (var i = e.length, r = 0; r < i; r++) t.resolve(e[r]).then(n, o)
                    }) : new t(function(e, t) {
                        return t(new TypeError("You must pass an array to race."))
                    })
                }, q.resolve = b, q.reject = function(e) {
                    var t = new this(S);
                    return L(t, e), t
                }, q._setScheduler = function(e) {
                    c = e
                }, q._setAsap = function(e) {
                    l = e
                }, q._asap = l, q.polyfill = function() {
                    var e = void 0;
                    if (void 0 !== i) e = i;
                    else if ("undefined" != typeof self) e = self;
                    else try {
                        e = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var t = e.Promise;
                    if (t) {
                        var n = null;
                        try {
                            n = Object.prototype.toString.call(t.resolve())
                        } catch (e) {}
                        if ("[object Promise]" === n && !t.cast) return
                    }
                    e.Promise = q
                }, q.Promise = q, q
            })
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        _process: 2
    }],
    5: [function(e, t, n) {
        "use strict";
        var o = e("./lib/Pomelo");
        t.exports = new o({
            wsCreator: function(e) {
                var t = e.url,
                    n = e.onError,
                    o = e.onOpen,
                    i = e.onMessage,
                    r = e.onClose,
                    a = wx.connectSocket({
                        url: t
                    });
                return a.onError(n), a.onOpen(o), a.onMessage(i), a.onClose(r), a
            },
            wsCreatorWeb: function(e) {
                var t = e.url,
                    n = e.onError,
                    o = e.onOpen,
                    i = e.onMessage,
                    r = e.onClose,
                    a = new WebSocket(serverString);
                return a.onerror = n, a.onopen = o, a.onmessage = i, a.onclose = r, a
            },
            urlGenerator: function(e, t, n) {
                return e + n
            }
        })
    }, {
        "./lib/Pomelo": 8
    }],
    6: [function(e, t, n) {
        "use strict";
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var r = e("./Protocal"),
            a = e("./util").copyArray;
        t.exports = function() {
            function e() {
                i(this, e)
            }
            return o(e, null, [{
                key: "encode",
                value: function(e, t, n, o, i) {
                    var a = 1 + (s(t) ? l(e) : 0);
                    if (c(t))
                        if (n) {
                            if ("number" != typeof o) throw new Error("error flag for number route!");
                            a += 2
                        } else if (a += 1, o) {
                        if ((o = r.strencode(o)).length > 255) throw new Error("route maxlength is overflow");
                        a += o.length
                    }
                    i && (a += i.length);
                    var d = new Uint8Array(a),
                        _ = 0;
                    return _ = u(t, n, d, _), s(t) && (_ = h(e, d, _)), c(t) && (_ = p(n, o, d, _)), i && (_ = f(i, d, _)), d
                }
            }, {
                key: "decode",
                value: function(e) {
                    var t = new Uint8Array(e),
                        n = t.length || t.byteLength,
                        o = 0,
                        i = 0,
                        l = null,
                        u = t[o++],
                        h = 1 & u,
                        p = u >> 1 & 7;
                    if (s(p)) {
                        var f = parseInt(t[o]),
                            d = 0;
                        do {
                            i += (127 & (f = parseInt(t[o]))) * Math.pow(2, 7 * d), o++, d++
                        } while (f >= 128)
                    }
                    if (c(p))
                        if (h) l = t[o++] << 8 | t[o++];
                        else {
                            var _ = t[o++];
                            _ ? (l = new Uint8Array(_), a(l, 0, t, o, _), l = r.strdecode(l)) : l = "", o += _
                        } var g = n - o,
                        y = new Uint8Array(g);
                    return a(y, 0, t, o, g), {
                        id: i,
                        type: p,
                        compressRoute: h,
                        route: l,
                        body: y
                    }
                }
            }, {
                key: "TYPE_REQUEST",
                get: function() {
                    return 0
                }
            }, {
                key: "TYPE_NOTIFY",
                get: function() {
                    return 1
                }
            }, {
                key: "TYPE_RESPONSE",
                get: function() {
                    return 2
                }
            }, {
                key: "TYPE_PUSH",
                get: function() {
                    return 3
                }
            }]), e
        }();
        var s = function(e) {
                return 0 === e || 2 === e
            },
            c = function(e) {
                return 0 === e || 1 === e || 3 === e
            },
            l = function(e) {
                var t = 0;
                do {
                    t += 1, e >>= 7
                } while (e > 0);
                return t
            },
            u = function(e, t, n, o) {
                if (0 !== e && 1 !== e && 2 !== e && 3 !== e) throw new Error("unkonw message type: " + e);
                return n[o] = e << 1 | (t ? 1 : 0), o + 1
            },
            h = function(e, t, n) {
                do {
                    var o = e % 128,
                        i = Math.floor(e / 128);
                    0 !== i && (o += 128), t[n++] = o, e = i
                } while (0 !== e);
                return n
            },
            p = function(e, t, n, o) {
                if (e) {
                    if (t > 65535) throw new Error("route number is overflow");
                    n[o++] = t >> 8 & 255, n[o++] = 255 & t
                } else t ? (n[o++] = 255 & t.length, a(n, o, t, 0, t.length), o += t.length) : n[o++] = 0;
                return o
            },
            f = function(e, t, n) {
                return a(t, n, e, 0, e.length), n + e.length
            }
    }, {
        "./Protocal": 9,
        "./util": 10
    }],
    7: [function(e, t, n) {
        "use strict";
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var r = e("./util").copyArray;
        t.exports = function() {
            function e() {
                i(this, e)
            }
            return o(e, null, [{
                key: "encode",
                value: function(e, t) {
                    var n = t ? t.length : 0,
                        o = new Uint8Array(4 + n),
                        i = 0;
                    return o[i++] = 255 & e, o[i++] = n >> 16 & 255, o[i++] = n >> 8 & 255, o[i++] = 255 & n, t && r(o, i, t, 0, n), o
                }
            }, {
                key: "decode",
                value: function(e) {
                    for (var t = 0, n = new Uint8Array(e), o = 0, i = []; t < n.length;) {
                        var a = n[t++],
                            s = (o = (n[t++] << 16 | n[t++] << 8 | n[t++]) >>> 0) ? new Uint8Array(o) : null;
                        r(s, 0, n, t, o), t += o, i.push({
                            type: a,
                            body: s
                        })
                    }
                    return 1 === i.length ? i[0] : i
                }
            }, {
                key: "TYPE_HANDSHAKE",
                get: function() {
                    return 1
                }
            }, {
                key: "TYPE_HANDSHAKE_ACK",
                get: function() {
                    return 2
                }
            }, {
                key: "TYPE_HEARTBEAT",
                get: function() {
                    return 3
                }
            }, {
                key: "TYPE_DATA",
                get: function() {
                    return 4
                }
            }, {
                key: "TYPE_KICK",
                get: function() {
                    return 5
                }
            }]), e
        }()
    }, {
        "./util": 10
    }],
    8: [function(e, t, n) {
        "use strict";
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function r(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = e("events"),
            c = e("./Message"),
            l = e("./Protocal"),
            u = e("./Package"),
            h = "js-websocket",
            p = "0.0.1";

        function f(e, t) {
            var n = new FileReader;
            n.onload = function(e) {
                var n = e.target.result;
                t(n)
            }, n.readAsArrayBuffer(e)
        }

        function d(e) {
            var t = c.decode(e);
            try {
                t.body = JSON.parse(l.strdecode(t.body))
            } catch (e) {
                console.log("defaultDecode err ", l.strdecode(t.body))
            }
            return t
        }

        function _(e, t, n) {
            var o = e ? c.TYPE_REQUEST : c.TYPE_NOTIFY;
            n = l.strencode(JSON.stringify(n));
            return c.encode(e, o, 0, t, n)
        }

        function g(e, t) {
            var n = e;
            return t && (n += ":" + t), n
        }
        t.exports = function(e) {
            function t(e) {
                i(this, t);
                var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                    o = e.wsCreator,
                    a = e.wsCreatorWeb,
                    s = e.urlGenerator,
                    c = void 0 === s ? g : s;
                return n.wsCreator = o, n.wsCreatorWeb = a, n.urlGenerator = c, n.reconnect = !1, n.reconncetTimer = null, n.reconnectAttempts = 0, n.reconnectionDelay = 5e3, n.handshakeBuffer = {
                    sys: {
                        type: h,
                        version: p,
                        rsa: {}
                    },
                    user: {}
                }, n.heartbeatInterval = 0, n.heartbeatTimeout = 0, n.nextHeartbeatTimeout = 0, n.gapThreshold = 100, n.heartbeatId = null, n.heartbeatTimeoutId = null, n.handshakeCallback = null, n.callbacks = {}, n.handlers = {}, n.handlers[u.TYPE_HANDSHAKE] = n.handshake.bind(n), n.handlers[u.TYPE_HEARTBEAT] = n.heartbeat.bind(n), n.handlers[u.TYPE_DATA] = n.onData.bind(n), n.handlers[u.TYPE_KICK] = n.onKick.bind(n), n.reqId = 0, n
            }
            return a(t, s), o(t, [{
                key: "handshake",
                value: function(e) {
                    if (501 !== (e = JSON.parse(l.strdecode(e))).code)
                        if (200 === e.code) {
                            this.handshakeInit(e);
                            var t = u.encode(u.TYPE_HANDSHAKE_ACK);
                            this.send(t), this.initCallback && this.initCallback(this.socket)
                        } else this.emit("error", "handshake fail");
                    else this.emit("error", "client version not fullfill")
                }
            }, {
                key: "handshakeInit",
                value: function(e) {
                    e.sys && e.sys.heartbeat ? (this.heartbeatInterval = 1e3 * e.sys.heartbeat, this.heartbeatTimeout = 2 * this.heartbeatInterval) : (this.heartbeatInterval = 0, this.heartbeatTimeout = 0), "function" == typeof this.handshakeCallback && this.handshakeCallback(e.user)
                }
            }, {
                key: "heartbeat",
                value: function(e) {
                    var t = this;
                    if (this.heartbeatInterval) {
                        var n = u.encode(u.TYPE_HEARTBEAT);
                        this.heartbeatTimeoutId && (clearTimeout(this.heartbeatTimeoutId), this.heartbeatTimeoutId = null), this.heartbeatId || (this.heartbeatId = setTimeout(function() {
                            t.heartbeatId = null, t.send(n), t.nextHeartbeatTimeout = Date.now() + t.heartbeatTimeout, t.heartbeatTimeoutId = setTimeout(function() {
                                return t.heartbeatTimeoutCb()
                            }, t.heartbeatTimeout)
                        }, this.heartbeatInterval))
                    }
                }
            }, {
                key: "heartbeatTimeoutCb",
                value: function() {
                    var e = this,
                        t = this.nextHeartbeatTimeout - Date.now();
                    t > this.gapThreshold ? this.heartbeatTimeoutId = setTimeout(function() {
                        return e.heartbeatTimeoutCb()
                    }, t) : (console.error("server heartbeat timeout"), this.emit("heartbeat timeout"), this.disconnect())
                }
            }, {
                key: "reset",
                value: function() {
                    this.reconnect = !1, this.reconnectionDelay = 5e3, this.reconnectAttempts = 0, clearTimeout(this.reconncetTimer)
                }
            }, {
                key: "init",
                value: function(e, t) {
                    this.initCallback = t, this.params = e;
                    var n = e.host,
                        o = e.port,
                        i = e.user,
                        r = e.gamePath,
                        a = e.handshakeCallback,
                        s = e.encode,
                        c = void 0 === s ? _ : s,
                        l = e.decode,
                        u = void 0 === l ? d : l,
                        h = (e.debugMode, e.browserWS);
                    this.encode = c, this.decode = u, this.url = this.urlGenerator(n, o, r), h && (this.wsCreator = this.wsCreatorWeb, this.browserWS = h), this.handshakeBuffer.user = i, this.handshakeCallback = a, this.connect()
                }
            }, {
                key: "connect",
                value: function() {
                    var e = this,
                        t = this.params,
                        n = t.maxReconnectAttempts || 10,
                        o = this.url;
                    this.socket = this.wsCreator({
                        url: o,
                        onError: function(t) {
                            e.emit("io-error", t), console.error("socket error: ", t)
                        },
                        onOpen: function(t) {
                            e.reconnect && e.emit("reconnect"), e.reset();
                            var n = u.encode(u.TYPE_HANDSHAKE, l.strencode(JSON.stringify(e.handshakeBuffer)));
                            e.send(n)
                        },
                        onMessage: function(t) {
                            e.browserWS ? f(t.data, function(t) {
                                e.processPackage(u.decode(t)), e.heartbeatTimeout && (e.nextHeartbeatTimeout = Date.now() + e.heartbeatTimeout)
                            }) : (e.processPackage(u.decode(t.data)), e.heartbeatTimeout && (e.nextHeartbeatTimeout = Date.now() + e.heartbeatTimeout))
                        },
                        onClose: function(o) {
                            e.emit("close", o), e.emit("disconnect", o), t.reconnect && e.reconnectAttempts < n && (e.reconnect = !0, e.reconnectAttempts++, e.reconncetTimer = setTimeout(function() {
                                return e.connect()
                            }, e.reconnectionDelay), e.reconnectionDelay *= 2)
                        }
                    })
                }
            }, {
                key: "disconnect",
                value: function() {
                    this.socket && (this.socket.close(), this.socket = !1), this.heartbeatId && (clearTimeout(this.heartbeatId), this.heartbeatId = null), this.heartbeatTimeoutId && (clearTimeout(this.heartbeatTimeoutId), this.heartbeatTimeoutId = null)
                }
            }, {
                key: "request",
                value: function(e, t, n, o) {
					
					t.action=e;
					t.cookie=document.cookie;
					t.sessionId=sessionStorage.getItem('sessionId');
					
                    2 === arguments.length && "function" == typeof t ? (n = t, t = {}) : t = t || {}, (e = e || t.route) && (this.reqId++, this.sendMessage(this.reqId, e, t), n && null != n && void 0 !== n && (this.callbacks[this.reqId] = n))
                }
            }, {
                key: "notify",
                value: function(e, t) {
                    t = t || {}, this.sendMessage(0, e, t)
                }
            }, {
                key: "sendMessage",
                value: function(e, t, n) {
                    n = this.encode(e, t, n);
                    var o = u.encode(u.TYPE_DATA, n);
                    this.send(o)
                }
            }, {
                key: "send",
                value: function(e) {
                    this.browserWS ? this.socket.send(e.buffer) : this.socket.send({
                        data: e.buffer
                    })
                }
            }, {
                key: "onData",
                value: function(e) {
                    e = this.decode(e), this.processMessage(e)
                }
            }, {
                key: "onKick",
                value: function(e) {
                    e = JSON.parse(l.strdecode(e)), this.emit("onKick", e)
                }
            }, {
                key: "processMessage",
                value: function(e) {
                    if (e.id) {
                        var t = this.callbacks[e.id];
                        delete this.callbacks[e.id], "function" == typeof t && t(e.body)
                    } else this.emit(e.route, e.body)
                }
            }, {
                key: "processPackage",
                value: function(e) {
                    if (Array.isArray(e))
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t];
                            this.handlers[n.type](n.body)
                        } else this.handlers[e.type](e.body)
                }
            }, {
                key: "newInstance",
                value: function() {
                    return new t({
                        wsCreator: this.wsCreator,
                        wsCreatorWeb: this.wsCreatorWeb,
                        urlGenerator: this.urlGenerator
                    })
                }
            }]), t
        }()
    }, {
        "./Message": 6,
        "./Package": 7,
        "./Protocal": 9,
        events: 1
    }],
    9: [function(e, t, n) {
        "use strict";
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var r = e("./util").copyArray;
        t.exports = function() {
            function e() {
                i(this, e)
            }
            return o(e, null, [{
                key: "strencode",
                value: function(e) {
                    for (var t = new Uint8Array(3 * e.length), n = 0, o = 0; o < e.length; o++) {
                        var i = e.charCodeAt(o),
                            a = null;
                        a = i <= 127 ? [i] : i <= 2047 ? [192 | i >> 6, 128 | 63 & i] : [224 | i >> 12, 128 | (4032 & i) >> 6, 128 | 63 & i];
                        for (var s = 0; s < a.length; s++) t[n] = a[s], ++n
                    }
                    var c = new Uint8Array(n);
                    return r(c, 0, t, 0, n), c
                }
            }, {
                key: "strdecode",
                value: function(e) {
                    for (var t = new Uint8Array(e), n = [], o = 0, i = 0, r = t.length; o < r;) t[o] < 128 ? (i = t[o], o += 1) : t[o] < 224 ? (i = ((63 & t[o]) << 6) + (63 & t[o + 1]), o += 2) : t[o] < 240 ? (i = ((15 & t[o]) << 12) + ((63 & t[o + 1]) << 6) + (63 & t[o + 2]), o += 3) : t[o] < 256 && (i = ((7 & t[o]) << 18) + ((63 & t[o + 1]) << 12) + ((63 & t[o + 2]) << 6) + (63 & t[o + 3]), o += 4), n.push(i);
                    return String.fromCodePoint ? String.fromCodePoint.apply(null, n) : String.fromCharCode.apply(null, n)
                }
            }]), e
        }()
    }, {
        "./util": 10
    }],
    10: [function(e, t, n) {
        "use strict";
        t.exports.copyArray = function(e, t, n, o, i) {
            if ("function" == typeof n.copy) n.copy(e, t, o, o + i);
            else
                for (var r = 0; r < i; r++) e[t++] = n[o++]
        }
    }, {}],
    AndroidAskFullScreen: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "3d26fc68NdMYqUQ/EdQc06w", "AndroidAskFullScreen");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Business/AudioManage")),
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._parent = null, t
                }
                var n;
                return o(t, e), n = t, t.prototype._btnFullScreenClick = function(e) {
                    s.default.getInstance().playBtnEffect(), e.target.runAction(cc.sequence(cc.scaleTo(.05, .8), cc.scaleTo(.05, 1))), cc.screen.requestFullScreen(), cc.screen.fullScreen ? cc.screen.exitFullScreen() : cc.screen.requestFullScreen(), s.default.getInstance().playBtnEffect(), n.instance.close()
                }, t.prototype._bgTouchClick = function(e) {
                    s.default.getInstance().playBtnEffect(), n.instance.close()
                }, t.prototype.show = function(e) {
                    n.instance = this, this.node.position = cc.v2(0, 0);
                    var t = this.node.getChildByName("_btnbg"),
                        o = this.node.getChildByName("_info").getChildByName("_btnfullscreen");
                    t.on(cc.Node.EventType.TOUCH_END, this._bgTouchClick, e, !0), o.on(cc.Node.EventType.TOUCH_END, this._btnFullScreenClick, e, !0), this.node.active = !0
                }, t.prototype.close = function() {
                    var e = this.node.getChildByName("_btnbg"),
                        t = this.node.getChildByName("_info").getChildByName("_btnfullscreen");
                    e.off(cc.Node.EventType.TOUCH_END, this._bgTouchClick, this), t.off(cc.Node.EventType.TOUCH_END, this._btnFullScreenClick, this), this.node.active = !1, this.node.destroy()
                }, t.TAG_NAME = "Android_Fullscreen_Frame", t.instance = null, t = n = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {
        "../Business/AudioManage": "AudioManage"
    }],
    AnimationBingo: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4a34d841uFB4aRn/VSesovd", "AnimationBingo");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = e("../../Utils/RealMoneyPlatform"),
            u = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.currencyAtlas = null, t._recycleCb = null, t._bgimg = null, t
                }
                return o(t, e), t.prototype.play = function(e, t) {
                    var n = l.default.getRealMoney(t),
                        o = this.node.getChildByName("_amount"),
                        i = o.getChildByName("_currency"),
                        r = o.getChildByName("_money"),
                        a = i.getComponent(cc.Sprite),
                        s = r.getComponent(cc.Label),
                        u = !1;
                    if (this.node.active) {
                        if (n.rmp < parseInt(s.string)) return;
                        o.stopAllActions(), u = !0
                    }
                    this.node.active = !0, this._bgimg = this.node.getChildByName("_img"), this._bgimg.angle = 0, e.y += 100 + this._bgimg.getContentSize().width / 2, this.node.position = this.node.getParent().convertToNodeSpaceAR(e), s.string = n.rmp, s._updateRenderData(!0), a.spriteFrame = this.currencyAtlas.getSpriteFrame("reelwinmeter_" + c.default.getRealSpriteCurrency(n.cy)), n.isbehind ? i.position = cc.v2(r.position.x + r.getContentSize().width / 2 + i.getContentSize().width / 2 + 4, 0) : i.position = cc.v2(r.position.x - r.getContentSize().width / 2 - i.getContentSize().width / 2 - 4, 0);
                    var h = this;
                    u ? (h.unscheduleAllCallbacks(), o.runAction(cc.sequence(cc.scaleTo(.3, 2, 2), cc.scaleTo(.2, 1, 1), cc.callFunc(function() {
                        o.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.2, 10), cc.rotateTo(.2, 0), cc.rotateTo(.2, 350), cc.rotateTo(.2, 0)))), h.scheduleOnce(function() {
                            h.stop()
                        }, 4)
                    })))) : (o.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.2, 10), cc.rotateTo(.2, 0), cc.rotateTo(.2, 350), cc.rotateTo(.2, 0)))), this.scheduleOnce(function() {
                        h.stop()
                    }, 4))
                }, t.prototype.isPlay = function() {
                    return this.node.active
                }, t.prototype.stop = function() {
                    this.node.getChildByName("_amount").stopAllActions(), this.node.active = !1
                }, t.prototype.update = function() {
                    this.node.active && (this._bgimg.angle -= 12, this._bgimg.angle < -360 && (this._bgimg.angle = 0))
                }, i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "currencyAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = u, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform"
    }],
    AnimationBonus: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "0b80dUeLCRMBrZzwEVQ39Ga", "AnimationBonus");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.bonusAtlas1 = null, t.bonusAtlas2 = null, t.sbonusAtlas = null, t._recycleCb = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {}, t.prototype.init = function(e) {
                    this._recycleCb = e;
                    for (var t = this.node.getChildByName("_image").getComponent(cc.Animation); t.getClips().length > 0;) t.removeClip(t.getClips()[0]);
                    var n, o;
                    n = this.getSpriteFrameList("glowa", 1, 42), o = this.getSBonusSpriteFrameList("sglow", 1, 34);
                    var i = cc.AnimationClip.createWithSpriteFrames(n, 24),
                        r = cc.AnimationClip.createWithSpriteFrames(o, 48);
                    i.wrapMode = cc.WrapMode.Loop, r.wrapMode = cc.WrapMode.Loop, t.addClip(i, "glow"), t.addClip(r, "sglow")
                }, t.prototype.playHitEffect = function(e, t) {
                    this.playAnimation(e, t, "sglow")
                }, t.prototype.playBigHitEffect = function(e, t) {
                    this.playAnimation(e, t, "glow")
                }, t.prototype.playAnimation = function(e, t, n) {
                    var o = this,
                        i = this.node.getChildByName("_image"),
                        r = i.getComponent(cc.Animation),
                        a = this.node.getParent().convertToNodeSpaceAR(e);
                    this.node.position = a, i.position = cc.v2(0, 0), r.stop(), r.play(n), this.scheduleOnce(function() {
                        o._recycleCb && o._recycleCb(o.node)
                    }, .6)
                }, t.prototype.getSpriteFrameList = function(e, t, n) {
                    for (var o = [], i = t; i < n + 1; i++) {
                        var r = e + "_" + c.default.paddingZeroLeft(i.toString(), 2);
                        (a = this.bonusAtlas1.getSpriteFrame(r)) && o.push(a)
                    }
                    for (i = t; i < n + 1; i++) {
                        var a;
                        r = e + "_" + c.default.paddingZeroLeft(i.toString(), 2);
                        (a = this.bonusAtlas2.getSpriteFrame(r)) && o.push(a)
                    }
                    return o.sort(), o
                }, t.prototype.getSBonusSpriteFrameList = function(e, t, n) {
                    for (var o = [], i = t; i < n + 1; i++) {
                        var r = e + "_" + c.default.paddingZeroLeft(i.toString(), 2),
                            a = this.sbonusAtlas.getSpriteFrame(r);
                        a && o.push(a)
                    }
                    return o.sort(), o
                }, i([s(cc.SpriteAtlas)], t.prototype, "bonusAtlas1", void 0), i([s(cc.SpriteAtlas)], t.prototype, "bonusAtlas2", void 0), i([s(cc.SpriteAtlas)], t.prototype, "sbonusAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    AnimationCoin: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "bad8d2AWgVCq5PcUjaTGpBg", "AnimationCoin");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/RealMoneyPlatform"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.goldAtlas = null, t._recycleCb = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {}, t.prototype.init = function(e) {
                    this._recycleCb = e;
                    var t = [{
                            pre: "coin",
                            start: 0,
                            end: 23
                        }, {
                            pre: "bingo",
                            start: 1,
                            end: 10
                        }],
                        n = this.node.getChildByName("_image").getComponent(cc.Animation);
                    if (n.getClips().length != t.length) {
                        for (; n.getClips().length > 0;) n.removeClip(n.getClips()[0]);
                        for (var o = 0; o < t.length; o++) {
                            var i = null;
                            i = "coin" === t[o].pre ? this.getSpriteFrameList(t[o].pre, t[o].start, t[o].end) : this.getBingoSpriteFrameList(t[o].pre, t[o].start, t[o].end);
                            var r = cc.AnimationClip.createWithSpriteFrames(i, "coin" === t[o].pre ? 45 : 15);
                            r.wrapMode = cc.WrapMode.Loop, n.addClip(r, t[o].pre)
                        }
                    }
                }, t.prototype.playAnimation = function(e, t, n) {
                    if (t.indexOf("coin") < 0) this._recycleCb && this._recycleCb(this.node);
                    else {
                        var o = this,
                            i = this.node.getParent().convertToNodeSpaceAR(e);
                        i.x += 0, i.y += 0, this.node.position = i;
                        var r = this.node.getChildByName("_image"),
                            a = r.getComponent(cc.Animation);
                        r.position = cc.v2(0, 0), a.stop(), a.play("bingo" === t ? t : "coin");
                        var s = this.node.getChildByName("_moneyNode");
                        s.position = cc.v2(0, 0), s.opacity = 255, s.stopAllActions();
                        var l = s.getChildByName("_lbRCurrency");
                        l.active = !1;
                        var u = s.getChildByName("_lbLCurrency"),
                            h = s.getChildByName("_lblAmount"),
                            p = h.getComponent(cc.Label),
                            f = c.default.getRealMoney(n);
                        if (0 == f.rmp) p.string = "", u.active = !1, l.active = !1;
                        else {
                            u.active = !0, p.string = f.rmp, p._updateRenderData(!0);
                            var d = u.getComponent(cc.Label);
                            d.string = f.cy, d._updateRenderData(!0), u.x = p.node.x - p.node.width / 2 - d.node.width / 2 - 10, u.y = h.y + 5
                        }
                        s.runAction(cc.sequence(cc.moveTo(.6, cc.v2(0, 40)), cc.fadeOut(.8), cc.callFunc(function() {
                            o._recycleCb && o._recycleCb(o.node)
                        })))
                    }
                }, t.prototype.moveToTarge = function(e) {
                    var t = this.node.getChildByName("_image");
                    t.stopAllActions();
                    var n = this.node.convertToNodeSpaceAR(cc.v2(e.x - 50, e.y));
                    t.runAction(cc.moveTo(.5, n))
                }, t.prototype.getSpriteFrameList = function(e, t, n) {
                    for (var o = [], i = t; i < n + 1; i++) {
                        var r = e + "_" + i,
                            a = this.goldAtlas.getSpriteFrame(r);
                        o.push(a)
                    }
                    return o
                }, t.prototype.getBingoSpriteFrameList = function(e, t, n) {
                    return []
                }, i([s(cc.SpriteAtlas)], t.prototype, "goldAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform"
    }],
    AnimationFire: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "d37fbbWG1lBSIE0qcLSIltH", "AnimationFire");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.cannonAtlas = null, t._recycleCb = null, t
                }
                return o(t, e), t.prototype.init = function(e) {
                    this._recycleCb = e;
                    var t = this.node.getComponent(cc.Animation),
                        n = this.getSpriteFrameList("GunFire", 1, 8),
                        o = cc.AnimationClip.createWithSpriteFrames(n, 8);
                    o.wrapMode = cc.WrapMode.Loop, t.addClip(o, "fire"), this.node.position = cc.v2(0, 30)
                }, t.prototype.playAnimation = function() {
                    var e = this,
                        t = this.node.getComponent(cc.Animation);
                    t.stop(), t.play("fire"), this.scheduleOnce(function() {
                        e._recycleCb && e._recycleCb(e.node)
                    }, .2)
                }, t.prototype.getSpriteFrameList = function(e, t, n) {
                    for (var o = [], i = t; i < n + 1; i++) {
                        var r = e + "_" + i,
                            a = this.cannonAtlas.getSpriteFrame(r);
                        o.push(a)
                    }
                    return o
                }, i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "cannonAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    AnimationFlash: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e4485+98idJULlKsRsLzwfm", "AnimationFlash");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.spriteAtlas = [], t._recycleCb = null, t
                }
                return o(t, e), t.prototype.init = function(e) {
                    this._recycleCb = e;
                    var t, n = this.node.getComponent(cc.Animation);
                    t = this.getSpriteFrameList("flash", 1, 1);
                    var o = cc.AnimationClip.createWithSpriteFrames(t, 6);
                    o.wrapMode = cc.WrapMode.Loop, n.addClip(o, "flash")
                }, t.prototype.playAnimation = function(e, t) {
                    var n = this;
                    e = this.node.getParent().convertToNodeSpaceAR(e), t = this.node.getParent().convertToNodeSpaceAR(t), this.node.position = e, this.node.angle = -this.calcDegree(e, t);
                    var o = t.sub(e).mag();
                    this.node.scaleX = o / 103, this.node.scaleX > 3 ? this.node.scaleY = 3 : this.node.scaleX < 1 ? this.node.scaleY = 1 : this.node.scaleY = this.node.scaleX;
                    var i = this.node.getComponent(cc.Animation);
                    i.stop(), i.play("flash"), this.scheduleOnce(function() {
                        n._recycleCb && n._recycleCb(n.node)
                    }, .4)
                }, t.prototype.calcDegree = function(e, t) {
                    var n;
                    return t.x - e.x == 0 ? n = t.y - e.y > 0 ? -90 : 90 : (n = 180 * -Math.atan((t.y - e.y) / (t.x - e.x)) / 3.14, t.x < e.x && (n += 180)), n
                }, t.prototype.getSpriteFrameList = function(e, t, n) {
                    var o = [];
                    return o.push(this.spriteAtlas[0].getSpriteFrame(e)), o
                }, i([s({
                    type: [cc.SpriteAtlas]
                })], t.prototype, "spriteAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    AnimationOnlyCoin: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4383eAgok5F4avJQ1zidPD4", "AnimationOnlyCoin");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.goldAtlas = null, t._recycleCb = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {}, t.prototype.init = function(e) {
                    this._recycleCb = e;
                    for (var t = this.node.getChildByName("_image").getComponent(cc.Animation); t.getClips().length > 0;) t.removeClip(t.getClips()[0]);
                    var n;
                    n = this.getSpriteFrameList("coin", 0, 23);
                    var o = cc.AnimationClip.createWithSpriteFrames(n, 46);
                    o.wrapMode = cc.WrapMode.Loop, t.addClip(o, "start")
                }, t.prototype.playAnimation = function(e) {
                    var t = this.node.getParent().convertToNodeSpaceAR(e);
                    this.node.position = t;
                    var n = this.node.getChildByName("_image"),
                        o = n.getComponent(cc.Animation);
                    n.position = cc.v2(0, 0), o.stop(), o.play("start")
                }, t.prototype.jumpAndMoveToTarget = function(e, t) {
                    var n = this.node.getChildByName("_image"),
                        o = this.node.convertToNodeSpaceAR(cc.v2(e.x - 50, e.y)),
                        i = c.default.getRandomNum(-200, 200),
                        r = c.default.getRandomNum(30, 200),
                        a = c.default.getRandomNum(3, 6),
                        s = this;
                    n.runAction(cc.sequence(cc.jumpTo(1, cc.v2(i, i), r, a), cc.moveTo(.5 + .05 * t, o), cc.callFunc(function() {
                        s._recycleCb && s._recycleCb(s.node)
                    })))
                }, t.prototype.getSpriteFrameList = function(e, t, n) {
                    for (var o = [], i = t; i < n + 1; i++) {
                        var r = e + "_" + i,
                            a = this.goldAtlas.getSpriteFrame(r);
                        o.push(a)
                    }
                    return o
                }, i([s(cc.SpriteAtlas)], t.prototype, "goldAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    AnimationPause: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "097ddv9bDRDy6UDJIMctBz0", "AnimationPause");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../Business/AudioManage"),
            a = cc._decorator,
            s = a.ccclass,
            c = (a.property, function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._ndParticleSys = null, t._ndSprite = null, t._pauseTime = 0, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    var e = this.node.getChildByName("ndParticle");
                    e && (this._ndParticleSys = e.getComponent(cc.ParticleSystem)), (e = this.node.getChildByName("ndPause")) && (this._ndSprite = e.getComponent(cc.Sprite)), this.node.active = !1, this.loadAllRes()
                }, t.prototype.loadAllRes = function() {}, t.prototype.playAnimation = function(e) {
                    var t = this;
                    this.node.active || (this._pauseTime = e, this.node.active = !0, this._ndParticleSys && (this._ndParticleSys.node.active = !0, this._ndParticleSys.resetSystem(), this._ndParticleSys.duration = 2), this.scheduleOnce(function() {
                        t._ndParticleSys.node.active = !1
                    }, .5))
                }, t.prototype.stop = function() {
                    this.node.active = !1, this._pauseTime = 0, cc.log("AnimationPause pausetime=", this._pauseTime, this.node.active)
                }, t.prototype.update = function(e) {
                    this._pauseTime > 0 ? this._pauseTime -= e : this.node.active && (this.node.active = !1, r.default.getInstance().playThawedOut())
                }, t = i([s], t)
            }(cc.Component));
        n.default = c, cc._RF.pop()
    }, {
        "../Business/AudioManage": "AudioManage"
    }],
    AudioManage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "5567erOxZtG8pwC3ZzOpYuc", "AudioManage");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._musicAudioId = -1, t._effectAudioId = -1, t._effectPause = !1, t._effectDisable = !1, t._musicDisable = !1, t._audioClips = {}, t._bgMusicName1 = "KAFishHunter_bg1", t._bgMusicName2 = "KAFishHunter_bg2", t._bgBossMusicName = "KAFishHunter_BossBattle", t._gunlevel = 0, t._prefix = "KAFishHunter_", t
                }
                var n;
                return o(t, e), n = t, t.getInstance = function() {
                    return n._instance
                }, t.prototype.onLoad = function() {
                    n._instance = this, this.loadAllRes()
                }, t.prototype.loadAllRes = function() {
                    var e = this;
                    if (this._audioClips) {
                        ["KAFishHunter_bg1", "KAFishHunter_bg2", "KAFishHunter_BossBattle"].forEach(function(t, n, o) {
                            var i = "sound/music/" + t + ".mp3";
                            s.default.loadResource(i, function(n) {
                                cc.log(t, " ", n), e._audioClips && (e._audioClips[t] = n)
                            })
                        });
                        ["KAFishHunter_Auto", "KAFishHunter_BetDecrement", "KAFishHunter_BetIncrement", "KAFishHunter_BigBossKilled", "KAFishHunter_BigGunFire", "KAFishHunter_BigWinSound", "KAFishHunter_ButtonPress", "KAFishHunter_FishHit", "KAFishHunter_FishThawedOut", "KAFishHunter_FishTypePopUp", "KAFishHunter_FreezeBomb", "KAFishHunter_FrozenBombEntered", "KAFishHunter_LightningChain", "KAFishHunter_LightningChainEntered", "KAFishHunter_Lock", "KAFishHunter_LuckyAurax7", "KAFishHunter_MediumGunFire", "KAFishHunter_MediumWinSound", "KAFishHunter_NewPlayerJoined", "KAFishHunter_PlayerLeft", "KAFishHunter_SmallBossKilled", "KAFishHunter_SmallGunFire", "KAFishHunter_SmallWinSound", "KAFishHunter_StopAuto", "KAFishHunter_Unlock", "KAFishHunter_wave", "KAFishHunter_cashin", "KAFishHunter_big_cock", "KAFishHunter_medium_cock", "KAFishHunter_small_cock"].forEach(function(t, n, o) {
                            var i = "sound/music/" + t + ".mp3";
                            s.default.loadResource(i, function(n) {
                                e._audioClips && (e._audioClips[t] = n)
                            })
                        })
                    }
                }, t.prototype.onDestroy = function() {
                    -1 != this._musicAudioId && cc.audioEngine.stop(this._musicAudioId), -1 != this._effectAudioId && cc.audioEngine.stop(this._effectAudioId), this._musicAudioId = -1, this._effectAudioId = -1
                }, t.prototype.start = function() {
                    this.playBgMusic(n._instance._bgMusicName1)
                }, t.prototype.changeMusicVolume = function(e) {
                    -1 != this._musicAudioId && cc.audioEngine.setVolume(this._musicAudioId, e)
                }, t.prototype.playTestEffect = function() {}, t.prototype.changeEffectVolume = function(e) {}, t.prototype.stopEffect = function() {
                    -1 != this._effectAudioId && cc.audioEngine.setEffectsVolume(0)
                }, t.prototype.stopMusic = function() {
                    -1 != this._musicAudioId && cc.audioEngine.setMusicVolume(0)
                }, t.prototype.disableEffect = function(e) {
                    this._effectDisable = e, e ? this.stopEffect() : cc.audioEngine.setEffectsVolume(1)
                }, t.prototype.disableMusic = function(e) {
                    this._musicDisable = e, e ? this.stopMusic() : (cc.audioEngine.setMusicVolume(1), -1 != this._musicAudioId && cc.audioEngine.setVolume(this._musicAudioId, 1), this._tempbgMusicName && (this.playBgMusic(this._tempbgMusicName), this._tempbgMusicName = null))
                }, t.prototype.pauseMusic = function() {
                    -1 != this._musicAudioId && cc.audioEngine.pause(this._musicAudioId)
                }, t.prototype.resumeMusic = function() {
                    -1 != this._musicAudioId && cc.audioEngine.resume(this._musicAudioId)
                }, t.prototype.pauseEffect = function() {
                    this._effectPause = !0, -1 != this._effectAudioId && (cc.audioEngine.stop(this._effectAudioId), this._effectAudioId = -1)
                }, t.prototype.resumeEffect = function() {
                    this._effectPause = !1
                }, t.prototype.playCashIn = function() {
                    this._musicDisable || this._playEffect(this._audioClips[this._prefix + "cashin"], null)
                }, t.prototype.playBgMusic = function(e) {
                    this._musicDisable ? this._tempbgMusicName = e : (-1 != this._musicAudioId && (cc.audioEngine.stop(this._musicAudioId), this._musicAudioId = -1), this._audioClips[e] && (this._musicAudioId = cc.audioEngine.play(this._audioClips[e], !0, 1)))
                }, t.prototype.playCannonSwitchEffect = function(e, t) {
                    e > this._gunlevel ? this._playEffect(this._audioClips[this._prefix + "BetIncrement"], null) : this._playEffect(this._audioClips[this._prefix + "BetDecrement"], null);
                    var n = Math.ceil(t / 3),
                        o = e / n,
                        i = null;
                    this._gunlevel / n != o && (i = o >= 1 && o < 2 ? "medium_cock" : o >= 2 ? "big_cock" : "small_cock"), null != i && this._playEffect(this._audioClips[this._prefix + i], null), this._gunlevel = e
                }, t.prototype.playGunFire = function(e) {
                    var t = "SmallGunFire";
                    2 == e ? t = "MediumGunFire" : 3 == e && (t = "BigGunFire"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playHit = function() {
                    this._playEffect(this._audioClips[this._prefix + "FishHit"], null)
                }, t.prototype.playPayTablePopUp = function() {
                    this._playEffect(this._audioClips[this._prefix + "FishTypePopUp"], null)
                }, t.prototype.playFreezeBomb = function() {
                    this._playEffect(this._audioClips[this._prefix + "FreezeBomb"], null)
                }, t.prototype.playThawedOut = function() {
                    this._playEffect(this._audioClips[this._prefix + "FishThawedOut"], null)
                }, t.prototype.playFreezeBomEnter = function() {
                    this._playEffect(this._audioClips[this._prefix + "FrozenBombEntered"], null)
                }, t.prototype.playLightning = function() {
                    this._playEffect(this._audioClips[this._prefix + "LightningChain"], null)
                }, t.prototype.playLightningEnter = function() {
                    this._playEffect(this._audioClips[this._prefix + "LightningChainEntered"], null)
                }, t.prototype.playCastEffect = function() {}, t.prototype.playCoinEffect = function(e) {
                    var t = "SmallWinSound";
                    1 == e ? t = "MediumWinSound" : 2 == e && (t = "BigWinSound"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playAura = function() {
                    this._playEffect(this._audioClips[this._prefix + "LuckyAurax7"], null)
                }, t.prototype.playWin = function(e) {
                    var t = "SmallBossKilled";
                    e && (t = "BigBossKilled"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playBtnEffect = function() {
                    this._playEffect(this._audioClips[this._prefix + "ButtonPress"], null)
                }, t.prototype.playBtnAuto = function(e) {
                    var t = e ? "StopAuto" : "Auto";
                    this._playEffect(this._audioClips[this._prefix + t], 1)
                }, t.prototype.playBtnLock = function(e) {
                    var t = stop ? "Unlock" : "Lock";
                    this._playEffect(this._audioClips[this._prefix + t], 1)
                }, t.prototype.playWaveEffect = function() {
                    this._playEffect(this._audioClips[this._prefix + "wave"], null)
                }, t.prototype.playUserJoin = function() {
                    this._playEffect(this._audioClips[this._prefix + "NewPlayerJoined"], null)
                }, t.prototype.playUserLeave = function() {
                    this._playEffect(this._audioClips[this._prefix + "PlayerLeft"], null)
                }, t.prototype.playBoyEffect = function(e) {}, t.prototype.playGirlEffect = function(e) {}, t.prototype._playEffect = function(e, t) {
                    t || (t = 1), 1 != this._effectPause && (this._effectDisable || (-1 != this._effectAudioId && (this._effectAudioId = -1), this._effectAudioId = cc.audioEngine.play(e, !1, t)))
                }, t._instance = null, t = n = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    BackHome: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "39284G+tTNDWbtCrXF00tFC", "BackHome");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/BusinessStorage")),
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._businessStorage = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._businessStorage = this.node.getComponent(s.default), this.node.on(cc.Node.EventType.TOUCH_END, this.backHome, this)
                }, t.prototype.backHome = function() {
                    this._businessStorage && (this._businessStorage.startGame = !1)
                }, t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {
        "../Model/BusinessStorage": "BusinessStorage"
    }],
    Bezier: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "ad2b4u73N1OsLz5RGqWZNYZ", "Bezier"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t, n) {
                this._pointList = [], this._aliveTime = 0, this._listSize = 0, this._pointList = e, this._aliveTime = n, this._listSize = t
            }
            return e.prototype.PointForBezier = function(e, t) {
                for (var n = new cc.Vec2, o = e.length, i = 0; i < o; i++) {
                    var r = this.formula(o - 1, i, t);
                    n.x += e[i].x * r, n.y += e[i].y * r
                }
                return n
            }, e.prototype.ComputeBezier = function(e, t, n) {
                var o, i;
                for (o = 1 / (t - 1), i = 0; i < t; i++) n[i] = this.PointForBezier(e, i * o)
            }, e.prototype.getPoints = function(e) {
                var t = [],
                    n = this._listSize;
                return e && (n = e), this.ComputeBezier(this._pointList, n, t), t
            }, e.prototype.getPoint = function(e) {
                if (e > this._aliveTime) return null;
                for (var t = new cc.Vec2, n = this._pointList.length, o = 0; o < n; o++) {
                    var i = this.formula(n - 1, o, e / this._aliveTime);
                    t.x += this._pointList[o].x * i, t.y += this._pointList[o].y * i
                }
                return t
            }, e.prototype.formula = function(e, t, n) {
                return this.c(e, t) * Math.pow(n, t) * Math.pow(1 - n, e - t)
            }, e.prototype.c = function(e, t) {
                return this.factorial(e) / (this.factorial(t) * this.factorial(e - t))
            }, e.prototype.factorial = function(e) {
                for (var t = 1, n = 1; n <= e; n++) t *= n;
                return t
            }, e
        }();
        n.default = o, cc._RF.pop()
    }, {}],
    BossNotify: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "91f2a0vaApCb50ewmg9Ba/2", "BossNotify");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.rotationRate = 1, t._ndScan = null, t
                }
                return o(t, e), t.prototype.start = function() {
                    this._ndScan = this.node.getChildByName("_scan"), this.node.active = !0
                }, t.prototype.stop = function() {
                    this._ndScan = null, this.node.active = !1
                }, t.prototype.update = function() {
                    if (this.node.active && this._ndScan && (this._ndScan.rotation += this.rotationRate, this._ndScan.angle <= -360 && (this._ndScan.angle = 0), -270 == this._ndScan.angle)) {
                        var e = this.node.getChildByName("_notifyImgFadeout");
                        e.opacity = 255, e.setScale(1, 1);
                        var t = cc.spawn(cc.fadeOut(.1), cc.scaleTo(.1, 1.2, 1.2));
                        e.runAction(t)
                    }
                }, i([s], t.prototype, "rotationRate", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    Bullet: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "ce1b8nzFldPvIrppzoTO2OO", "Bullet");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = e("../../Components/UI/Fish"),
            s = cc._decorator,
            c = s.ccclass,
            l = s.property,
            u = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.spriteAtlas = null, t._speed = 0, t._angle = 0, t._vx = 0, t._vy = 0, t._ndAnimation = null, t._lockId = null, t._recycleCb = null, t._colliderCb = null, t._isBomb = !1, t._tag = 0, t._isPending = !1, t._enableColliderEvent = !0, t._frameRate = 0, t._selfBullet = !1, t._hideInst = !1, t
                }
                var n;
                return o(t, e), n = t, t.prototype.onLoad = function() {}, t.prototype.init = function(e, t, n, o, i, r, a, s, c) {
                    var l = this;
                    this._enableCollider(!0).tag = e, this._selfBullet = a, this._speed = o, r ? (this._lockId = r, this.node.name = "lock_" + r, this._frameRate >= 40 ? this._speed = 6500 : this._frameRate < 40 && this._frameRate >= 35 ? this._speed = 5500 : this._speed = 5e3) : (this._lockId = null, this.node.name = "bullet" + e), this._recycleCb = s, this._isPending = !1, this._colliderCb = c, this._isBomb = !1, this._enableColliderEvent = a, this._tag = e;
                    var u = this.node.getChildByName("img");
                    this._ndAnimation = u;
                    for (var h = u.getComponent(cc.Animation), p = h.getClips(); p.length > 0;) h.removeClip(p[0], !0), p = h.getClips();
                    var f = i.animats;
                    ["run", "dead"].forEach(function(e, t, n) {
                        var o = l.getSpriteFrameList(f[e], e),
                            i = cc.AnimationClip.createWithSpriteFrames(o, f[e].speed);
                        "run" === e && (i.wrapMode = cc.WrapMode.Loop), h.addClip(i, e)
                    }), h.play("run"), this.node.active = !0, this.node.position = t, this._angle = n, this._vx = this._getAngleX(this._angle, 1), this._vy = this._getAngleY(this._angle, 1), this.node.angle = 0, this.node.angle = -this._getFilpAngle(this._angle, ""), this._angle = -this.node.angle, u.setScale(1.25)
                }, Object.defineProperty(t.prototype, "IsMe", {
                    get: function() {
                        return this._selfBullet
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "lockId", {
                    get: function() {
                        return this._lockId
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.setActiveByHide = function() {
                    this._hideInst = !0, this.node.opacity = 0
                }, t.prototype.setFrameRate = function(e) {
                    this._frameRate = 1 / e
                }, t.prototype.getId = function() {
                    return this._tag
                }, t.prototype.getSpriteFrameList = function(e, t) {
                    var n = e.pre;
                    "dead" == t && this._selfBullet && (n = e.selfpre);
                    for (var o = e.start, i = e.end, r = [], a = o; a < i + 1; a++) {
                        var s = this.spriteAtlas.getSpriteFrame(n);
                        r.push(s)
                    }
                    return r
                }, t.prototype.onCollisionEnter = function(e, t) {
                    this._lockId && e.tag != this._lockId || 0 != e.node.opacity && (e.node.getComponent(a.default).isDie() || (this._enableCollider(!1), this._enableColliderEvent && this._colliderCb && this._colliderCb({
                        bullet: t,
                        fish: e
                    }), this.doBomb()))
                }, t.prototype._playBombAnimation = function() {
                    this._isBomb || (this._isBomb = !0, this.node.getChildByName("img").getComponent(cc.Animation).play("dead"), this.node.runAction(cc.sequence(cc.scaleTo(0, .1), cc.scaleTo(.6, 1))))
                }, t.prototype.doBomb = function() {
                    var e = this;
                    this._isBomb || (this._playBombAnimation(), this.scheduleOnce(function() {
                        e.node.active = !1, e._hideInst = !1, e.node.opacity = 255, e._recycleCb && e._recycleCb(e.node)
                    }, .7))
                }, t.prototype.refund = function() {
                    this._speed = 0, this.node.active = !1, this._recycleCb && this._recycleCb(this.node)
                }, t.prototype.resume = function() {
                    this._enableCollider(!0), this._isPending = !1
                }, t.prototype._enableCollider = function(e) {
                    var t = this.node.getComponent(cc.BoxCollider);
                    return t && (t.enabled = e), t
                }, t.prototype.update = function(e) {
                    if (!this._isPending && !this._isBomb) {
                        var t, n = 0;
                        t = e * this._speed * this._vx, n += e * this._speed * this._vy, this.node.x += t, this.node.y += n;
                        var o = !1,
                            i = !1,
                            r = "";
                        if (this.node.x >= cc.winSize.width / 2 ? (this.node.x = cc.winSize.width / 2, this._vx = -this._vx, i = !0, r = "right", o = !0) : this.node.x <= -cc.winSize.width / 2 && (this.node.x = -cc.winSize.width / 2, this._vx = -this._vx, i = !0, r = "left", o = !0), i) {
                            var a = this._getFilpAngle(this._angle, r);
                            this.node.angle = -a, this._angle = a
                        }
                        if (i = !1, this.node.y >= cc.winSize.height / 2 ? (this.node.y = cc.winSize.height / 2, this._vy = -this._vy, i = !0, r = "top", o = !0) : this.node.y <= -cc.winSize.height / 2 && (this.node.y = -cc.winSize.height / 2, this._vy = -this._vy, i = !0, r = "bottom", o = !0), i) {
                            a = this._getFilpAngle(this._angle, r);
                            this.node.angle = -a, this._angle = a
                        }
                        o && this._lockId && (this._speed = this._speed / 3, this._lockId = null, this.node.name = "bullet" + this._tag)
                    }
                }, t.prototype._getFilpAngle = function(e, t) {
                    var n = 0;
                    return "left" == t || "right" == t ? n = (360 - e) % 360 : "bottom" == t || "top" == t ? n = (180 - e) % 360 : (n = e, n += -90, n %= 360), n
                }, t.prototype._getAngleX = function(e, t) {
                    return e += 180, t * Math.cos(r.default.DegreesToRadians(e))
                }, t.prototype._getAngleY = function(e, t) {
                    return t * Math.sin(r.default.DegreesToRadians(e))
                }, t.isUniqueBulletId = function(e) {
                    return !(n.bulletIdQueue.indexOf(e.bid) >= 0) && (n.bulletIdQueue.length >= 5 && n.bulletIdQueue.shift(), n.bulletIdQueue.push(e.bid), !0)
                }, t.bulletIdQueue = [], i([l({
                    type: cc.SpriteAtlas
                })], t.prototype, "spriteAtlas", void 0), t = n = i([c], t)
            }(cc.Component);
        n.default = u, cc._RF.pop()
    }, {
        "../../Components/UI/Fish": "Fish",
        "../../Utils/CCHelper": "CCHelper"
    }],
    BusinessStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a00dd+/e75BfrFjtoCf+naf", "BusinessStorage");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "pingIntervalId", {
                    get: function() {
                        return n._pingIntervalId
                    },
                    set: function(e) {
                        n._pingIntervalId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "maxBetSetLen", {
                    get: function() {
                        return n._maxBetSetLen
                    },
                    set: function(e) {
                        n._maxBetSetLen = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "recallCallBack", {
                    get: function() {
                        return n._recallCallBack
                    },
                    set: function(e) {
                        n._recallCallBack = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "recallQueue", {
                    get: function() {
                        return n._reacllQueue
                    },
                    set: function(e) {
                        n._reacllQueue = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "showRecall", {
                    get: function() {
                        return n._showRecall
                    },
                    set: function(e) {
                        n._showRecall = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "lockFishType", {
                    get: function() {
                        return n._lockFishType
                    },
                    set: function(e) {
                        n._lockFishType = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "battleBoss", {
                    get: function() {
                        return n._battleboss
                    },
                    set: function(e) {
                        n._battleboss = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "Robot", {
                    get: function() {
                        return n._isRobot
                    },
                    set: function(e) {
                        n._isRobot = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "startGame", {
                    get: function() {
                        return n._startGame
                    },
                    set: function(e) {
                        n._startGame = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "shareMessage", {
                    get: function() {
                        return n._shareMessage
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "taskReward", {
                    get: function() {
                        return n._taskReward
                    },
                    set: function(e) {
                        n._taskReward = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "gameFinish", {
                    get: function() {
                        return n._gameFinish
                    },
                    set: function(e) {
                        n._gameFinish = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "tableInfo", {
                    get: function() {
                        return n._tableInfo
                    },
                    set: function(e) {
                        n._tableInfo = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "playersInfo", {
                    get: function() {
                        return n._playersInfo
                    },
                    set: function(e) {
                        n._playersInfo = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "area", {
                    get: function() {
                        return n._area
                    },
                    set: function(e) {
                        n._area = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "areaPlayers", {
                    get: function() {
                        return n._areaPlayers
                    },
                    set: function(e) {
                        n._areaPlayers = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "joyStickState", {
                    get: function() {
                        return n._joyStickState
                    },
                    set: function(e) {
                        n._joyStickState = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "autoFire", {
                    get: function() {
                        return n._autoFire
                    },
                    set: function(e) {
                        n._autoFire = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "lockTarget", {
                    get: function() {
                        return n._lockTarget
                    },
                    set: function(e) {
                        n._lockTarget = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "lockTargetId", {
                    get: function() {
                        return n._lockTargetId
                    },
                    set: function(e) {
                        n._lockTargetId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.pushBullet = function(e) {
                    n._bulletQueue.push(e)
                }, t.prototype.popBullet = function() {
                    return n._bulletQueue.length > 0 ? n._bulletQueue.shift() : null
                }, t.prototype.bulletQueueLen = function() {
                    return n._bulletQueue.length
                }, t.prototype.pushCollider = function(e) {
                    n._colliderQueue.push(e)
                }, t.prototype.popAllCollider = function() {
                    if (n._colliderQueue.length > 0) {
                        var e = n._colliderQueue;
                        return n._colliderQueue = [], e
                    }
                    return []
                }, t.prototype.colliderQueueLen = function() {
                    return n._colliderQueue.length
                }, t.prototype.pushColliderResult = function(e) {
                    n._colliderResultQueue = n._colliderResultQueue.concat(e)
                }, t.prototype.popAllColliderResult = function() {
                    if (n._colliderResultQueue.length > 0) {
                        var e = n._colliderResultQueue;
                        return n._colliderResultQueue = [], e
                    }
                    return []
                }, t.prototype.colliderResultQueueLen = function() {
                    return n._colliderResultQueue.length
                }, t.prototype.pushFishes = function(e) {
                    n._fishesQueue = n._fishesQueue.concat(e)
                }, t.prototype.popFishes = function() {
                    if (n._fishesQueue.length > 0) {
                        var e = n._fishesQueue;
                        return n._fishesQueue = [], e
                    }
                    return []
                }, t.prototype.fishesQueueLen = function() {
                    return n._fishesQueue.length
                }, t.prototype.pushBulletsRefund = function(e) {
                    n._bulletsRefund = n._bulletsRefund.concat(e)
                }, t.prototype.popAllBulletsRefund = function() {
                    if (n._bulletsRefund.length > 0) {
                        var e = n._bulletsRefund;
                        return n._bulletsRefund = [], e
                    }
                    return []
                }, t.prototype.BulletsRefundQueueLen = function() {
                    return n._bulletsRefund.length
                }, t.prototype.clearAllData = function() {
                    n._bulletsRefund = [], n._fishesQueue = [], n._colliderResultQueue = [], n._colliderQueue = [], n._bulletQueue = [], n._bulletsRefund = [], n._startGame = !1, n._shareMessage = null, n._gameFinish = !1, n._area = null, n._areaPlayers = null, n._tableInfo = null, n._playersInfo = null, n._joyStickState = {
                        direction: 0,
                        angle: 0
                    }, n._autoFire = !1, n._lockTarget = !1, n._lockTargetId = null, n._lockFishType = "", n._bulletQueue = [], n._colliderQueue = [], n._colliderResultQueue = [], n._fishesQueue = [], n._bulletsRefund = [], n._chatMsgQueue = [], n._gameRecallQueue = [], n._changeScene = !1, n._battleboss = !1, n._showRecall = !1, n._reacllQueue = [], n._recallCallBack = null, n._maxBetSetLen = 15
                }, Object.defineProperty(t.prototype, "changeScene", {
                    get: function() {
                        return n._changeScene
                    },
                    set: function(e) {
                        n._changeScene = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "sceneId", {
                    get: function() {
                        return n._sceneId
                    },
                    set: function(e) {
                        n._sceneId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.pushChatMsgQueue = function(e) {
                    n._chatMsgQueue.push(e)
                }, t.prototype.popAllChatMsgQueue = function() {
                    if (n._chatMsgQueue.length > 0) {
                        var e = n._chatMsgQueue;
                        return n._chatMsgQueue = [], e
                    }
                    return []
                }, t.prototype.ChatMsgQueueLen = function() {
                    return n._chatMsgQueue.length
                }, t.prototype.pushToGameRecallQueue = function(e) {
                    n._gameRecallQueue.push(e)
                }, t.prototype.gameRecallQueue = function() {
                    return n._gameRecallQueue
                }, t._getShareMessage = function() {
                    return n._shareMessage || (n._shareMessage = {}), n._shareMessage
                }, t._startGame = !1, t._shareMessage = null, t._taskReward = null, t._gameFinish = !1, t._area = null, t._areaPlayers = null, t._tableInfo = null, t._playersInfo = null, t._joyStickState = {
                    direction: 0,
                    angle: 0
                }, t._autoFire = !1, t._lockTarget = !1, t._lockTargetId = null, t._lockFishType = "", t._bulletQueue = [], t._colliderQueue = [], t._colliderResultQueue = [], t._fishesQueue = [], t._bulletsRefund = [], t._chatMsgQueue = [], t._gameRecallQueue = [], t._changeScene = !1, t._sceneId = 0, t._isRobot = !1, t._battleboss = !1, t._showRecall = !1, t._reacllQueue = [], t._recallCallBack = null, t._maxBetSetLen = 15, t._pingIntervalId = null, t._playview = null, t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    CCHelper: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "bb5c1y43DhOE6Y0Jz1RYrWf", "CCHelper"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("base64-js"),
            i = e("../Config/Config"),
            r = function() {
                function e() {}
                return e.preloadScene = function(e, t, n, o) {
                    var i = cc.director,
                        r = i._getSceneUuid(t);
                    if (r) i.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t), cc.loader.load({
                        uuid: r.uuid,
                        type: "uuid"
                    }, null == o ? null : function(t, n) {
                        o && o.call(e, t, n)
                    }, function(e, o) {
                        e && cc.errorID(1215, t, e.message), n && n(e, o)
                    });
                    else {
                        var a = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
                        n && n(new Error(a)), cc.error("preloadScene: " + a)
                    }
                }, e.dispatchEvent = function(e, t, n, o) {
                    var i = new cc.Event.EventCustom(t, !0),
                        r = {
                            request: n,
                            data: o
                        };
                    i.setUserData(r), e.dispatchEvent(i)
                }, e.isRealNum = function(e) {
                    return "number" == typeof e && !isNaN(e)
                }, e.stringToByte = function(e) {
                    var t, n, o = new Array;
                    t = e.length;
                    for (var i = 0; i < t; i++)(n = e.charCodeAt(i)) >= 65536 && n <= 1114111 ? (o.push(n >> 18 & 7 | 240), o.push(n >> 12 & 63 | 128), o.push(n >> 6 & 63 | 128), o.push(63 & n | 128)) : n >= 2048 && n <= 65535 ? (o.push(n >> 12 & 15 | 224), o.push(n >> 6 & 63 | 128), o.push(63 & n | 128)) : n >= 128 && n <= 2047 ? (o.push(n >> 6 & 31 | 192), o.push(63 & n | 128)) : o.push(255 & n);
                    return o
                }, e.byteToString = function(e) {
                    if ("string" == typeof e) return e;
                    for (var t = "", n = e, o = 0; o < n.length; o++) {
                        var i = n[o].toString(2),
                            r = i.match(/^1+?(?=0)/);
                        if (r && 8 == i.length) {
                            for (var a = r[0].length, s = n[o].toString(2).slice(7 - a), c = 1; c < a; c++) s += n[c + o].toString(2).slice(2);
                            t += String.fromCharCode(parseInt(s, 2)), o += a - 1
                        } else t += String.fromCharCode(n[o])
                    }
                    return t
                }, e.base64Encode = function(t) {
                    var n = JSON.stringify(t);
                    return o.fromByteArray(e.stringToByte(n))
                }, e.base64Decode = function(t) {
                    var n = o.toByteArray(t),
                        i = e.byteToString(n);
                    try {
                        return JSON.parse(i)
                    } catch (e) {
                        return cc.log("_decode ", e), {}
                    }
                }, e.splitNodeName = function(e) {
                    if ("" == e) return {
                        name: ""
                    };
                    var t = e.split("$");
                    if (t.length > 2) throw console.error("Invalid Node Name ", e), "Invalid Node Name";
                    return 2 == t.length ? {
                        name: t[0],
                        tag: t[1]
                    } : {
                        name: t[0]
                    }
                }, e.shuffle = function(e) {
                    return e.sort(function() {
                        return .5 - Math.random()
                    }), e
                }, e.loadResource = function(e, t) {
                    var n = e;
                    if (!t) return new Promise(function(e, t) {
                        cc.loader.loadRes(n, function(o, i) {
                            o ? (cc.log("load config err " + n + " = " + o), t("load failed " + n + " " + o)) : e(i)
                        })
                    });
                    cc.loader.loadRes(n, function(e, o) {
                        e ? cc.log("load config err " + n + " = " + e) : t && t(o)
                    })
                }, e.loadResAsync = function(e, t, n) {
                    if (!n) return new Promise(function(n, o) {
                        cc.loader.loadRes(e, t, function(t, i) {
                            t ? (cc.log("loadResAsync err " + e + " = " + t), o("load failed " + e + " " + t)) : n(i)
                        })
                    });
                    cc.loader.loadRes(e, t, function(t, o) {
                        t ? cc.log("loadResAsync err " + e + " = " + t) : n && n(o)
                    })
                }, e.DegreesToRadians = function(e) {
                    return e * (Math.PI / 180)
                }, e.RadiansToDegrees = function(e) {
                    return e * (180 / Math.PI)
                }, e.getRandomNum = function(e, t) {
                    var n = t - e,
                        o = Math.random();
                    return e + Math.round(o * n)
                }, e.urlParse = function() {
                    var t, n;
                    if (null == window.location) return null;
                    if (Object.keys(e.realMoneyState).length > 0) return e.realMoneyState;
                    var o = window.location.href,
                        i = o.indexOf("?"),
                        r = (o = window.btoaQuery ? window.btoaQuery : o.substr(i + 1)).split("&");
                    r.length > 0 && (e.realMoneyState = {});
                    for (var a = 0; a < r.length; a++)(i = r[a].indexOf("=")) > 0 && (t = r[a].substring(0, i), n = r[a].substr(i + 1), e.realMoneyState[t] = n);
                    return e.isFreePlay() && (e.realMoneyState.p = "demo", e.realMoneyState.ak = "accessKey"), e.realMoneyState
                }, e.getRawUrl = function() {
                    if (null == window.location) return "";
                    var e = window.location.href,
                        t = e.indexOf("?");
                    return e.substr(0, t)
                }, e.paddingZeroLeft = function(t, n) {
                    return t.length >= n ? t : e.paddingZeroLeft("0" + t, n)
                }, e.createLabelWithTTF = function(e, t, n, o, i, r) {
                    var a = new cc.Node;
                    a.setContentSize(o);
                    var s = a.addComponent(cc.Label);
                    return s.fontSize = n, s.string = e, s.font = t, s.horizontalAlign = i, s.verticalAlign = r, a
                }, e.getRealCurrency = function(t) {
                    return e.currencyTables[t] ? e.currencyTables[t] : t
                }, e.getRealSpriteCurrency = function(e) {
                    return "S/" == e ? "S:" : "B/." == e ? "B:." : e
                }, e.maskNickName = function(e) {
                    return e.substr(0, 2) + "***" + e.substr(6, e.length - 1)
                }, e.isQueryExpried = function() {
                    var e = new Date,
                        t = this.urlParse(),
                        n = Math.round(e.getTime() / 1e3);
                    if (t.p) {
                        var o = t.p.toLowerCase();
                        if (i.default.sameUrlQueryRejectPartnerList.indexOf(o) >= 0 && t.ts && n - t.ts >= i.default.consts.REJECT_QUERY_EXPRIED_SEC_TIME) return !0
                    }
                    return !!(t.ts && n - t.ts >= i.default.consts.QUERY_EXPRIED_SEC_TIME)
                }, e.isShowFullScreenNotice = function(t) {
                    if (window.osdevice.isSafari && !window.osdevice.isChrome) return !1;
                    if (!window.osdevice.isMobile) return !1;
                    if (window.osdevice.iOS || window.osdevice.isiPhone || window.osdevice.isiPad) return !1;
                    var n = e.urlParse();
                    if (t == i.default.consts.ANDROID_FULLSCREEN_LOBBY) {
                        if (!n.rlv || void 0 == n.rlv) return !0
                    } else if (t == i.default.consts.ANDROID_FULLSCREEN_PLAY && n.rlv) return !0;
                    return !1
                }, e.isCanBackToLobby = function() {
                    var t = e.urlParse();
                    return !t.rlv || void 0 == t.rlv
                }, e.isAutoSearchTable = function() {
                    var t = e.urlParse();
                    return !(!t.rlv && -1 != t.rlv)
                }, e.getUrlRoomLevel = function() {
                    var t = e.urlParse();
                    return t.rlv ? e.IsSpecialRoomMode() ? 0 : t.rlv : 0
                }, e.getUrlParam = function(t) {
                    return Object.keys(e.realMoneyState).length > 0 ? e.realMoneyState.hasOwnProperty(t) ? e.realMoneyState[t] : null : (e.urlParse(), e.realMoneyState.hasOwnProperty(t) ? e.realMoneyState[t] : null)
                }, e.IsSpecialRoomMode = function() {
                    var t = e.getUrlParam("rlv");
                    return "-1" == t || -1 == t
                }, e.isFreePlay = function() {
                    var t = e.urlParse();
                    return !(!t.m || 1 != t.m && "1" != t.m)
                }, e.setRecommendData = function(t) {
                    e.realMoneyState.openRecommendedGamesInNewWindow = t.openRecommendedGamesInNewWindow, e.realMoneyState.recommendedGames = t.recommendedGames
                }, e.getReCommendGames = function() {
                    var t = {};
                    if (e.realMoneyState.recommendedGames.length > 0)
                        for (var n = 0; n < e.realMoneyState.recommendedGames.length; n++) {
                            var o = e.realMoneyState.recommendedGames[n];
                            if (e.isZhHans() || e.isZhHant()) {
                                var i = e.urlParse();
                                o.iu = o.iu.replace("lang=en", "lang=" + i.loc)
                            }
                            t[o.iu] = o, t[o.iu].idx = n
                        }
                    return t
                }, e.isShowReCommendGames = function() {
                    return !(!e.realMoneyState.recommendedGames || 0 == e.realMoneyState.recommendedGames.length)
                }, e.isReCommendOpenNewWindow = function() {
                    return e.realMoneyState.openRecommendedGamesInNewWindow
                }, e.getReCommendUrlString = function(t) {
                    var n = [];
                    n.push("g"), n.push("loginType"), n.push("uid"), n.push("appId"), n.push("gameId"), n.push("isSpecialRoomMode"), n.push("recommendedGames"), n.push("openRecommendedGamesInNewWindow");
                    for (var o = e.urlParse(), i = Object.keys(o), r = 0; r < n.length; r++) {
                        for (var a = -1, s = 0; s < i.length; s++)
                            if (i[s] == n[r]) {
                                a = s;
                                break
                            } a > -1 && delete i[a]
                    }
                    var c = "";
                    for (r = 0; r < i.length; r++)
                        if (i[r]) {
                            if ("t" == i[r] || "rcmd" == i[r]) continue;
                            c += "&" + i[r] + "=" + o[i[r]]
                        } return t.replace("&rcmd=1", "") + c
                }, e.getMyCannonCostList = function(e, t) {
                    if (!e || t < 0 || t > i.default.consts.MAX_ROOM) return [];
                    var n = Math.ceil(e.length / i.default.consts.MAX_ROOM),
                        o = n * t,
                        r = o + n;
                    return r >= e.length && (r = e.length), e.slice(o, r)
                }, e.getLang = function() {
                    var t = e.urlParse();
                    return cc.log(t.loc), t.loc ? t.loc.toLowerCase() : (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage).toLowerCase()
                }, e.checkAndSetFrameScale = function(e) {
                    var t = cc.winSize.height / i.default.consts.FRAME_HEIGHT;
                    t < 1 && e && e.setScale(t)
                }, e.isZhHans = function() {
                    var t = e.getLang();
                    return "zh-hans" === t || "zh_hans" == t || "zh-cn" == t || "zh" == t || "zh_cn" == t || "zh-sg" == t || "zh_sg" == t
                }, e.isZhHant = function() {
                    var t = e.getLang();
                    return "zh-hant" === t || "zh_hant" == t || "zh-tw" == t || "zh_tw" == t || "zh-hk" == t || "zh_hk" == t || "zh-mo" == t || "zh_mo" == t
                }, e.realMoneyState = {}, e.currencyTables = {
                    MDASH: "mDASH",
                    MBTC: "mBTC",
                    METC: "mETC",
                    MLTC: "mLTC",
                    MXMR: "mXMR",
                    MEOS: "mEOS",
                    USDT: "USDT",
                    USDC: "USDC",
                    mETH: "mETC",
                    EOS: "mS",
                    mB: "mBTC",
                    BTC: "mBTC",
                    ETC: "mTC",
                    LTC: "mLTC",
                    XMR: "mMR",
                    DAS: "mDASH",
                    USC: "USDC",
                    UST: "USDT",
                    TRX: "TRX",
                    mDASH: "mDASH",
                    TRY: "\u20ba",
                    TL: "\u20ba",
                    "\u0440\u0443\u0431": "\u20bd",
                    AFN: "AFN",
                    DZD: "DZD",
                    IRR: "IRR",
                    OMR: "OMR",
                    QAR: "QAR",
                    SAR: "SAR",
                    YER: "YER",
                    MVR: "MVR",
                    PAB: "B/."
                }, e
            }();
        n.default = r, cc._RF.pop()
    }, {
        "../Config/Config": "Config",
        "base64-js": 3
    }],
    CancelTransparentClick: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "3becdPlNmFGyqPtC5evYjrv", "CancelTransparentClick");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o(t, e), t.prototype.onLoad = function() {
                    var e = this;
                    this.node.on(cc.Node.EventType.TOUCH_END, function(t) {
                        e.node.active = !1
                    }), s.default.isCanBackToLobby() && (this.node.active = !1)
                }, t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    ChatPanel: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "ba2d0PmtLFGs5EBkHmdJtx1", "ChatPanel");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../../uikiller/Thor"),
            a = e("../Model/NetConnector"),
            s = e("../../Config/Config"),
            c = e("../Model/UserInfoStorage"),
            l = e("../Model/BusinessStorage"),
            u = e("../UI/MessageItem"),
            h = cc._decorator,
            p = h.ccclass,
            f = h.property,
            d = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.pfbMsgItem = null, t._netConnector = null, t._userInfoStorage = null, t._businessStorage = null, t._nodePool = new cc.NodePool, t._msgList = null, t._msgInput = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._netConnector = this.node.getComponent(a.default), this._userInfoStorage = this.node.getComponent(c.default), this._businessStorage = this.node.getComponent(l.default), this._$._ndMsgList && (this._msgList = this._$._ndMsgList.getComponent(cc.ScrollView)), this._$._ndEdit && (this._msgInput = this._$._ndEdit.getComponent(cc.EditBox));
                    for (var e = 0; e < 20; e++) this._nodePool.put(cc.instantiate(this.pfbMsgItem))
                }, t.prototype._onBtnSendTouchEnd = function() {
                    var e = this;
                    if (cc.log("_onBtnSendTouchEnd"), this._netConnector && this._netConnector.socketConnector) {
                        if ("" == this._msgInput.string) return;
                        var t = {
                            text: this._msgInput.string,
                            type: "text",
                            sender: this._userInfoStorage.playerId
                        };
                        this._netConnector.socketConnector.request(s.default.pomeloRoute.onPushChatMsg, a.default.makeWsPacket({
                            content: t
                        }), function(t) {
                            !t || t.err ? cc.log("onPushChatMsg error ", t) : (cc.log("onPushChatMsg ", t), 200 == t.code && (e._msgInput.string = ""))
                        })
                    }
                }, t.prototype._getMsgItemIns = function() {
                    return 0 == this._nodePool.size() && this._recycleMsgItem(), this._nodePool.get()
                }, t.prototype._recycleMsgItem = function() {
                    for (var e = this._msgList.content, t = 0; t < 10 && 0 != e.children.length; t++) this._nodePool.put(e.children[0])
                }, t.prototype.showMsg = function() {
                    var e = this;
                    if (this._businessStorage && 0 != this._businessStorage.ChatMsgQueueLen()) {
                        var t = this._businessStorage.popAllChatMsgQueue();
                        cc.log("show Chat msg ", t);
                        for (var n = 0; n < t.length; n++) {
                            var o = this._getMsgItemIns(),
                                i = o.getComponent(u.default);
                            cc.log("msg ", t[n]), i.setText(t[n].text, this._userInfoStorage && t[n].sender == this._userInfoStorage.playerId), o.setParent(this._msgList.content)
                        }
                        t.length > 0 && this._msgList.content.height >= this._msgList.node.height - 80 && this.scheduleOnce(function() {
                            e._msgList.scrollToBottom()
                        }, .1)
                    }
                }, t.prototype.update = function(e) {
                    this.showMsg()
                }, i([f({
                    type: cc.Prefab
                })], t.prototype, "pfbMsgItem", void 0), t = i([p], t)
            }(r.default);
        n.default = d, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../uikiller/Thor": "Thor",
        "../Model/BusinessStorage": "BusinessStorage",
        "../Model/NetConnector": "NetConnector",
        "../Model/UserInfoStorage": "UserInfoStorage",
        "../UI/MessageItem": "MessageItem"
    }],
    ClickSprite: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "db33c9+lJtGkKzvwQl841Kc", "ClickSprite");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.spfAvatar = [], t._spAvatar = null, t._currIndex = 0, t
                }
                var n;
                return o(t, e), n = t, t.prototype.onLoad = function() {
                    this._addSpriteComponent(), this._spAvatar = this.node.getComponent(cc.Sprite), this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this)
                }, t.prototype.reset = function(e) {
                    this._currIndex = e, this.spfAvatar.length > e && this._spAvatar && (this._spAvatar.spriteFrame = new cc.SpriteFrame(this.spfAvatar[this._currIndex]))
                }, t.prototype._addSpriteComponent = function() {
                    var e = this.node.getComponent(cc.Sprite);
                    e || (e = this.node.addComponent(cc.Sprite))
                }, t.prototype._onTouchEnd = function(e) {
                    e.stopPropagation(), cc.log("ClickSprite click ", this._currIndex, " length ", this.spfAvatar.length), ++this._currIndex, this.spfAvatar.length > this._currIndex && this._spAvatar && (cc.log("clickSprite set image ", this.spfAvatar[this._currIndex]), this._spAvatar.spriteFrame = new cc.SpriteFrame(this.spfAvatar[this._currIndex])), c.default.dispatchEvent(this.node, n.EVENT, cc.Node.EventType.TOUCH_END, {
                        sender: this,
                        hitCount: this._currIndex,
                        event: e
                    })
                }, t.EVENT = "ClickSprite", i([s({
                    type: [cc.Texture2D]
                })], t.prototype, "spfAvatar", void 0), t = n = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    Config: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "b8c19gLqjZFkIJRpbpMAF2Q", "Config");
        var o = this && this.__decorate || function(e, t, n, o) {
            var i, r = arguments.length,
                a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
            else
                for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
            return r > 3 && a && Object.defineProperty(t, n, a), a
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            r = i.ccclass,
            a = (i.property, e("events")),
            s = function() {
                function e() {}
                return e.getDefaultWSConnectData = function() {
                    return {
                        host: "",
                        port: 0
                    }
                }, e.ASK_LOGOUT_GAME = "ask.logout", e.ERR_TXT_500 = "error.other", e.ERR_TXT_1000 = "error.network", e.ERR_TXT_216 = "error.balance", e.ERR_TXT_KICK = "error.kick", e.ERR_CODE_BALANCE = 216, e.ERR_CODE_NETWORK = 1e3, e.ERR_CODE_SYSTEM = 500, e.ERR_CODE_KICK_LOGOUT = 2e3, e.ERR_CODE_WEBSOCKET_EXCEPTION = 2001, e.ERR_CODE_WEBSOCKET = 2002, e.ERR_CODE_OTHERS = 2999, e.mock = !1, e.mockNetEvent = new a, e.gameId = "10007", e.pomeloRoute = {
                    getConnector: "gate.gateHandler.getConnector",
                    getWebConnector: "gate.gateHandler.getWebConnector",
                    twLogin: "connector.accountHandler.twLogin",
                    searchTable: "playerControl.tableHandler.searchTableAndJoin",
                    createTable: "playerControl.tableHandler.createTable",
                    leaveTable: "playerControl.tableHandler.leaveTable",
                    sitDown: "playerControl.areaHandler.sitDown",
                    quitGame: "playerControl.areaHandler.quitGame",
                    fetchCurrentFishes: "areaFishControl.fishHandler.fetchCurrentFishes",
                    fetchFishInfo: "areaFishControl.fishHandler.fetchFishInfo",
                    onFire: "fishHunter.areaHandler.onFire",
                    onCollider: "playerControl.areaHandler.onCollider",
                    onUpdateCannon: "fishHunter.areaHandler.onUpdateCannon",
                    onLockTarget: "fishHunter.areaHandler.onLockTarget",
                    onPingBalance: "connector.accountHandler.onPingBalance",
                    gameRecall: "connector.accountHandler.gameRecall",
                    gameRecallUrl: "connector.accountHandler.gameRecallUrl"
                }, e.pomeloPushRoute = {
                    joinTable: "table.join",
                    quitTable: "table.quit",
                    sitDown: "game.sitDown",
                    standUp: "game.standUp",
                    gameStart: "game.start",
                    gameEnd: "game.end",
                    gameQuit: "game.quit",
                    onFire: "game.fire",
                    onBulletBomb: "game.bulletBomb",
                    onColliderResult: "game.colliderResult",
                    onSpawnFishes: "game.onSpawnFishes",
                    onSpawnGroup: "game.onSpawnGroup",
                    onChangeScene: "game.changeScene",
                    onUpdateCannon: "game.updateCannon",
                    onLockTarget: "game.lockTarget",
                    onUpdateBalance: "game.updateBalance",
                    onUpdateWallet: "game.updateWallet",
                    CHAT_MESSAGE: "game.onChatMessage",
                    onKick: "onKick"
                }, e.consts = {
                    SHOOT_DELAY: 125,
                    SPACE_SHOOT_DELAY: 125,
                    PING_DELAY: 5,
                    QUERY_EXPRIED_SEC_TIME: 1800,
                    REJECT_QUERY_EXPRIED_SEC_TIME: 30,
                    NOVICE_DELAY_TIME: 8,
                    SOLO: "solo",
                    GROUP: "group",
                    TEAM: "team",
                    BOMB: "bomb",
                    FLOCK: "flock",
                    ANDROID_FULLSCREEN_LOBBY: "lobby",
                    ANDROID_FULLSCREEN_PLAY: "play",
                    FRAME_WIDTH: 1920,
                    FRAME_HEIGHT: 1080,
                    MAX_ROOM: 3,
                    AREA_STAGE_NORMAL: "normal",
                    AREA_STAGE_WAIT: "wait",
                    AREA_STAGE_GROUP: "group",
                    FISH_LIGHTING_BOMB: 1,
                    FISH_LUCKY_AURA: 2
                }, e.sameUrlQueryRejectPartnerList = ["gt", "demo"], e.determineProductionRMPServerUrl = function(e) {
                    var t = new URL(window.location.href),
                        n = window.location.host,
                        o = {
                            host: "",
                            port: null
                        };
                    o.host = "fh.kga8.com" == n ? "pml.kga8.com" : "kafish.kaga88.com" == n ? "pml.kaga88.com" : "fh.kaifa88.com" == n ? "pml.kaifa88.com" : "fhsea.kga8.com" == n ? "pmlsea.kga8.com" : "kafishsea.kaga88.com" == n ? "pmlsea.kaga88.com" : "fhsea.kaifa88.com" == n ? "pmlsea.kaifa88.com" : "kafisheu.kaga88.com" == n ? "pmleu.kaga88.com" : "kafishna.kaga88.com" == n ? "pmlna.kaga88.com" : "kafishaf.kaga88.com" == n ? "pmlaf.kaga88.com" : "fhstage.kga8.com" == n ? "pmlstage.kga8.com" : "kafishstage.kaga88.com" == n ? "pmlstage.kaga88.com" : "fhstage.kaifa88.com" == n ? "pmlstage.kaifa88.com" : "fishtest.kaga88.com" == n ? "rmptest.kaga88.com" : "localhost:7456" === n ? "localhost:3080" : "10.10.2.165:7456" === n ? "rmptest.kaga88.com" : n;
                    return o.gamePath = "/kaga/fish/KAFishHunter", o.host = ("http:" == t.protocol ? "ws" : "wss") + "://" + o.host, cc.log("host=", o.host, "gamePath", o.gamePath), o
                }, e = o([r], e)
            }();
        n.default = s, cc._RF.pop()
    }, {
        events: 1
    }],
    CurrencyLabel: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "9c918yOK+FJ7Y4z08HSjzaH", "CurrencyLabel");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = cc._decorator,
            s = a.ccclass,
            c = a.property,
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.currencyAtlas = null, t
                }
                return o(t, e), t.prototype.init = function(e, t, n) {
                    var o = this.node.getChildByName("_minbet"),
                        i = this.node.getChildByName("_maxbet"),
                        a = this.node.getChildByName("_mincurrency"),
                        s = this.node.getChildByName("_maxcurrency"),
                        c = o.getComponent(cc.Label),
                        l = i.getComponent(cc.Label),
                        u = a.getComponent(cc.Sprite),
                        h = s.getComponent(cc.Sprite);
                    c.string = t, c._updateRenderData(!0), l.string = n, l._updateRenderData(!0), cc.log(e), u.spriteFrame = this.currencyAtlas.getSpriteFrame("reelwinmeter_" + r.default.getRealSpriteCurrency(e)), h.spriteFrame = this.currencyAtlas.getSpriteFrame("reelwinmeter_" + r.default.getRealSpriteCurrency(e))
                }, t.prototype.setSeparate = function(e) {
                    var t = this.node.getChildByName("_separate").getComponent(cc.Label);
                    t.string = " " + e + " ", t._updateRenderData(!0)
                }, t.prototype.show = function(e, t) {
                    var n = this.node.getChildByName("_minbet"),
                        o = this.node.getChildByName("_maxbet"),
                        i = this.node.getChildByName("_mincurrency"),
                        r = this.node.getChildByName("_maxcurrency"),
                        a = this.node.getChildByName("_separate");
                    n.getComponent(cc.Label), o.getComponent(cc.Label), i.getComponent(cc.Sprite), r.getComponent(cc.Sprite), a.getComponent(cc.Label);
                    a.position = cc.v2(t.x, t.y), n.position = cc.v2(a.position.x - a.width / 2 - n.width / 2 + t.x, t.y), i.position = cc.v2(n.position.x - n.width / 2 - i.width / 2 + t.x, t.y), r.position = cc.v2(a.position.x + a.width / 2 + r.width / 2 + t.x + 0, t.y), o.position = cc.v2(r.position.x + r.width / 2 + o.width / 2 + t.x + 10, t.y)
                }, i([c(cc.SpriteAtlas)], t.prototype, "currencyAtlas", void 0), t = i([s], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    DrawBoards: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "fbb7e7xV+5C3rEoZ+w+A8t7", "DrawBoards");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.draw = null, t._positiones = [], t._savePath = [], t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this.draw = this.node.getComponent(cc.Graphics), this.draw.lineWidth = 5, this.show()
                }, t.prototype.show = function() {
                    this.node.active = !0, this.node.on("mousedown", this.mouseDown, this, !1), this.node.getChildByName("_savepath").on(cc.Node.EventType.TOUCH_END, this.savePath, this, !1), this.node.getChildByName("_output").on(cc.Node.EventType.TOUCH_END, this.printPathPosition, this, !1)
                }, t.prototype.hide = function() {
                    this.node.active = !1, this.node.off("mousedown", this.mouseDown, this)
                }, t.prototype.mouseDown = function(e) {
                    var t = this.node.getParent().convertToNodeSpaceAR(e.getLocation()),
                        n = cc.v2(Math.ceil(t.x), Math.ceil(t.y));
                    this._positiones.push(n), this.draw.circle(t.x, t.y, 20), this.draw.fill()
                }, t.prototype.savePath = function(e) {
                    var t = this._positiones.slice(0, this._positiones.length - 2),
                        n = JSON.stringify(t);
                    this._positiones = [];
                    var o = Math.floor(256 * Math.random()),
                        i = Math.floor(256 * Math.random()),
                        r = Math.floor(256 * Math.random());
                    this.draw.fillColor = new cc.Color(o, i, r), this._savePath.push(n)
                }, t.prototype.printPathPosition = function(e) {
                    for (var t = 0; t < this._savePath.length; t++) cc.log(t + 1, ":", this._savePath[t]);
                    this._savePath = [], this._positiones = [], this.draw.clear()
                }, t = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    EventButton: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "9abbccIMSRHKZMjOzSZtOIq", "EventButton");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = cc._decorator,
            s = a.ccclass,
            c = a.property,
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.eventName = "EventButton", t._ndBg = null, t._lblText = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this.node.on(cc.Node.EventType.TOUCH_END, this.onHandle, this)
                }, t.prototype.onHandle = function() {
                    var e = r.default.splitNodeName(this.node.name);
                    e.sender = this, r.default.dispatchEvent(this.node, this.eventName, cc.Node.EventType.TOUCH_END, e)
                }, t.prototype.highLight = function(e) {
                    this._ndBg || (this._ndBg = this.node.getChildByName("bgHighLight")), this._ndBg.active = e
                }, t.prototype.setText = function(e) {
                    if (!this._lblText) {
                        var t = this.node.getChildByName("text");
                        t && (this._lblText = t.getComponent(cc.Label))
                    }
                    this._lblText && (this._lblText.string = e)
                }, i([c], t.prototype, "eventName", void 0), t = i([s], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    FishPondAnimation: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "1b2adRm/sxDerttXAQ9wJJK", "FishPondAnimation");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.animAtlas = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this.init()
                }, t.prototype.init = function() {
                    var e, t = null,
                        n = null;
                    t = this.node.getChildByName("_ndRipples").getComponent(cc.Animation), e = this.getSpriteFrameList("SunLight", 1, 32), (n = cc.AnimationClip.createWithSpriteFrames(e, 16)).wrapMode = cc.WrapMode.Loop, t.addClip(n, "SunLight"), t.play("SunLight")
                }, t.prototype.getSpriteFrameList = function(e, t, n) {
                    for (var o = [], i = t; i < n + 1; i++) {
                        var r = e + "_" + i,
                            a = this.animAtlas.getSpriteFrame(r);
                        o.push(a)
                    }
                    return o
                }, i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "animAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    Fish: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "6a062qQt21A3Iiwe95B8Am5", "Fish");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/Bezier"),
            l = e("../../Config/Config"),
            u = e("./Bullet"),
            h = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.spriteAtlas = [], t.bgAtlas = null, t._ndAnimation = null, t._bezier = null, t._runTime = 0, t._lastPosition = cc.v2(0, 0), t._initPosition = cc.v2(0, 0), t._mode = "normal", t._delay = 0, t._initDelay = 0, t._rate = 1, t._alive = 0, t._state = "", t._pauseTime = 0, t._recycleCb = null, t._isDie = !1, t._tag = 0, t._fishType = "", t._score = 0, t._portrait = !1, t._onStageRect = !1, t._hasLuckyAura = !1, t._fishContainer = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {}, t.prototype.isOnStage = function() {
                    return this._onStageRect
                }, t.prototype.setFishContainer = function(e) {
                    this._fishContainer = e
                }, t.prototype.getRealParent = function() {
                    return this.node.getParent() ? this.node.getParent() : this._fishContainer
                }, t.prototype.init = function(e, t, n, o, i, r, a, s, l, u, h) {
                    var p = this;
                    if (o) {
                        this.unschedule(this._cancelAttackShow), this.node.stopAllActions(), this._score = s, this._recycleCb = h, this._isDie = !1, this._runTime = 0, this._mode = "normal", this._delay = 0, this._initDelay = 0, this._rate = .4, this._alive = 99, this._pauseTime = 0, this._tag = n, this._state = t, this._onStageRect = !1, this._hasLuckyAura = !1;
                        var f = [];
                        for (var d in i) f.push({
                            x: i[d].x + a.x,
                            y: i[d].y + a.y
                        });
                        f = l && u ? this.setGroupPosOffset(o, e, f, u) : this.setNormlPositionOffset(o, e, f), this._bezier = new c.default(f, f.length, r), f.length > 0 && (this._lastPosition = cc.v2(f[0].x, f[0].y), this.node.position = this._lastPosition, this._initPosition = this.node.position);
                        var _ = this.node.getComponent(cc.BoxCollider);
                        _.offset.x = o.collider.offset.x, _.offset.y = o.collider.offset.y, _.size.width = o.collider.size.w, _.size.height = o.collider.size.h, _.tag = n, o.portrait ? this._portrait = !0 : this._portrait = !1;
                        var g = this.node.getChildByName("bg");
                        g && (g.stopAllActions(), g.active = !1);
                        var y = this.node.getChildByName("img");
                        this._ndAnimation = y;
                        for (var m = y.getComponent(cc.Animation), v = m.getClips(); v.length > 0;) m.removeClip(v[0], !0), v = m.getClips();
                        var b = o.animats;
                        this._fishType = b.run.pre.trim(), ["run"].forEach(function(e, t, n) {
                            var o = p.getSpriteFrameList(b[e]),
                                i = cc.AnimationClip.createWithSpriteFrames(o, b[e].speed);
                            "run" === e && (i.wrapMode = cc.WrapMode.Loop), m.addClip(i, e)
                        }), m.play("run"), y.color = cc.color(255, 255, 255), this.node.active = !0, this.node.name = "fish" + n, this.node.opacity = l ? 0 : 255, this.enableCollider(!0)
                    }
                }, t.prototype.checkEndPos = function(e, t) {
                    e.width, e.height, e.width, e.height, e.width, e.height, e.width, e.height;
                    return t.y > 0 && t.y < e.height / 2 ? t.y = e.height + 200 : t.y < 0 && t.y > e.height / 2 && (t.y = -e.height - 200), t.x > 0 && t.x < e.width / 2 ? t.x = e.width + 200 : t.x < 0 && t.x > e.width / 2 && (t.x = -e.width - 200), t
                }, t.prototype.setNormlPositionOffset = function(e, t, n) {
                    e.animats.run.pre > "Fish_08" && (this._rate = .5), "bezier_id_6" == t && "Fish_02" == e.animats.run.pre && (n[0].y += 300), "bezier_id_14" != t || "Fish_02" != e.animats.run.pre && "Fish_03" != e.animats.run.pre && "Fish_04" != e.animats.run.pre && "Fish_05" != e.animats.run.pre || (n[n.length - 1].x -= 200);
                    cc.winSize.width;
                    var o = cc.winSize.height / 2;
                    o > 460 ? o -= 460 : o = 0;
                    var i = n[0].x > 0 ? n[0].x + 500 : n[0].x - 500,
                        r = n[0].y > 0 ? n[0].y + o : n[0].y - o,
                        a = n[0].x > 0 ? n[0].x + 250 : n[0].x - 250,
                        s = r,
                        c = n.length - 1,
                        l = n[c].x > 0 ? n[c].x + 500 : n[c].x - 500,
                        u = n[c].y > 0 ? n[c].y + 500 : n[c].y - 500,
                        h = [{
                            x: i,
                            y: r
                        }, {
                            x: a,
                            y: s
                        }],
                        p = [{
                            x: n[c].x > 0 ? n[c].x + 250 : n[c].x - 250,
                            y: n[c].y > 0 ? n[c].y + 250 : n[c].y - 250
                        }, {
                            x: l,
                            y: u
                        }];
                    return Array.prototype.concat(h, n, p)
                }, t.prototype.setGroupPosOffset = function(e, t, n, o) {
                    if ("group_id_cycle" == o) {
                        var i = cc.winSize.height / 2;
                        i = i > 540 ? 540 : i;
                        var r = n[0],
                            a = n[n.length - 1];
                        r.y >= 0 ? r.y > i && (r.y = i + 300) : r.y > -i && (r.y = -i - 300), a.y >= 0 ? a.y > i && (a.y = i + 300) : a.y > -i && (a.y = -i - 300), n[0] = r, n[n.length - 1] = a
                    }
                    return n
                }, t.prototype.isDie = function() {
                    return this._isDie
                }, t.prototype.setDelay = function(e) {
                    this._delay = e, this._initDelay = e
                }, t.prototype.setRate = function(e) {
                    this._rate = e
                }, t.prototype.setMode = function(e) {
                    this._mode = e
                }, t.prototype.getId = function() {
                    return this._tag
                }, t.prototype.getFishType = function() {
                    return this._fishType
                }, Object.defineProperty(t.prototype, "score", {
                    get: function() {
                        return this._score
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.getSpriteFrameList = function(e) {
                    for (var t = e.pre, n = [], o = 0; o < 20; o++) {
                        var i = t + "_" + o,
                            r = this._getSpriteFrame(i);
                        r && n.push(r)
                    }
                    return n
                }, t.prototype.setBackground = function(e, t) {
                    var n = this.node.getChildByName("bg");
                    if (n) {
                        var o = e.animats.run.pre,
                            i = this.bgAtlas.getSpriteFrame(o);
                        n.active = !0, n.setContentSize(i.getRect().width, i.getRect().height), n.setScale(2), n.getComponent(cc.Sprite).spriteFrame = i, n.runAction(cc.repeatForever(cc.rotateBy(.1, 36)));
                        var r = this.node.getComponent(cc.BoxCollider);
                        r.offset.x = e.collider.offset.x, r.offset.y = e.collider.offset.y, r.size.width = e.collider.size.w, r.size.height = e.collider.size.h, this._hasLuckyAura = t != l.default.consts.FISH_LIGHTING_BOMB
                    }
                }, t.prototype.hasLuckyAura = function() {
                    return this._hasLuckyAura
                }, t.prototype.onCollisionEnter = function(e, t) {
                    if (0 != this.node.opacity) {
                        this.unschedule(this._cancelAttackShow);
                        var n = e.node.getComponent(u.default);
                        if (n.lockId && n.lockId != this._tag) {
                            var o = this.node.getChildByName("img");
                            255 != o.color.getR() && 255 != o.color.getG() && 255 != o.color.getB() && (o.color = cc.color(255, 255, 255))
                        } else {
                            this.node.getChildByName("img").color = cc.color(235, 46, 46), this.scheduleOnce(this._cancelAttackShow, .3)
                        }
                    }
                }, t.prototype.pickStatus = function(e) {
                    var t = this.node.getChildByName("img");
                    t.color = e ? cc.color(255, 255, 255) : cc.color(235, 46, 46)
                }, t.prototype.doDie = function() {
                    var e = this;
                    if (!this._isDie) {
                        this._isDie = !0, this.enableCollider(!1), this.unschedule(this._cancelAttackShow), this._cancelAttackShow();
                        var t = this.node.getChildByName("bg");
                        t.stopAllActions(), t.active = !1, this._onStageRect = !1;
                        var n = this;
                        this.node.runAction(cc.sequence(cc.fadeOut(.4), cc.callFunc(function() {
                            n.node.active = !1, n.node.removeFromParent(), n._recycleCb && e._recycleCb(e.node)
                        })))
                    }
                }, t.prototype.doPause = function(e) {
                    this._pauseTime = e
                }, t.prototype._cancelAttackShow = function() {
                    this.node.getChildByName("img").color = cc.color(255, 255, 255)
                }, t.prototype.enableCollider = function(e) {
                    var t = this.node.getComponent(cc.BoxCollider);
                    return t && (t.enabled = e), t
                }, t.prototype._moveEnd = function() {
                    "loop" == this._mode && this._initDelay > 0 && (this._runTime = 0, this.node.position = this._initPosition)
                }, t.prototype.update = function(e) {
                    if (!this._isDie)
                        if (this._pauseTime - e > 0) this._pauseTime -= e;
                        else if (this._delay -= e, !(this._delay > 0) && (this._state == l.default.consts.GROUP && 0 == this.node.opacity && (this.node.opacity = 255), this._alive -= e, this._runTime += e * this._rate, null != this._bezier)) {
                        var t = this._bezier.getPoint(this._runTime);
                        if (t) {
                            this.node.position = t, this.updateDegree();
                            var n = this.getRealParent().convertToWorldSpaceAR(this.node.position),
                                o = 0;
                            n.x >= 0 && n.x <= cc.winSize.width && o++, n.y >= 0 && n.y <= cc.winSize.height && o++, this._onStageRect = 2 == o
                        } else this._moveEnd(), "group" != this._state && (this._onStageRect = !1), this.node.active = !1, this._recycleCb && this._recycleCb(this.node)
                    }
                }, t.prototype.updateDegree = function() {
                    if (this._lastPosition) {
                        var e = this.node.getPosition();
                        if (!(this._lastPosition.sub(e).mag() < 1)) {
                            var t, n = !1;
                            e.x - this._lastPosition.x == 0 ? e.y - this._lastPosition.y > 0 ? (t = -90, n = !0) : (t = 90, n = !1) : (t = 180 * -Math.atan((e.y - this._lastPosition.y) / (e.x - this._lastPosition.x)) / 3.14, e.x < this._lastPosition.x ? (t += 180, n = !1) : n = !0), this._portrait && n ? this.node.scaleX = -1 : this.node.scaleX = 1, this._portrait ? this.node.angle = 0 : this.node.angle = -(t + 90), this._lastPosition = e
                        }
                    } else this._lastPosition = this.node.position
                }, t.prototype._getSpriteFrame = function(e) {
                    for (var t = 0; t < this.spriteAtlas.length; t++) {
                        var n = this.spriteAtlas[t].getSpriteFrame(e);
                        if (n) return n
                    }
                    return null
                }, t.prototype.inRect = function(e) {
                    var t = this.getRealParent().convertToNodeSpaceAR(e),
                        n = this.node.position.sub(t).mag(),
                        o = 50;
                    return this._fishType <= "Fish_07" ? o = 100 : this._fishType > "Fish_07" && this._fishType <= "Fish_12" && (o = 80), !(n > o)
                }, t.prototype.isShowBingo = function() {
                    return "team" == this._state || "bomb" == this._state
                }, i([s({
                    type: [cc.SpriteAtlas]
                })], t.prototype, "spriteAtlas", void 0), i([s({
                    type: [cc.SpriteAtlas]
                })], t.prototype, "bgAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = h, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/Bezier": "Bezier",
        "./Bullet": "Bullet"
    }],
    GameRankStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "b8445zY/zRKY7Q095dsrZGQ", "GameRankStorage");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "displayRankType", {
                    get: function() {
                        return n._displayRankType
                    },
                    set: function(e) {
                        n._displayRankType = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "worldRankData", {
                    get: function() {
                        return n._worldRankData
                    },
                    set: function(e) {
                        n._worldRankData = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._displayRankType = 0, t._worldRankData = [], t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    GameReCall: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "8f5fbIuhfBIcK2u3O+rsKTD", "GameReCall");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../uikiller/Thor"),
            l = e("../../Config/Config"),
            u = e("../Business/AudioManage"),
            h = e("./RecallRow"),
            p = e("../Model/BusinessStorage"),
            f = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.pfbRecallRow = null, t._businessStorage = null, t.TITLE_COL_MARGIN = 65, t.COL_ROW0_MARGIN = 50, t.COL_ROW_MARGIN = 30, t.MAX_ROW = 5, t._reacllQueue = [], t._defScaleY = 0, t._pageIndex = 0, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._businessStorage = this.node.getComponent(p.default)
                }, t.prototype.init = function(e) {
                    var t = this.getHScale(),
                        n = this.node.getChildByName("_recallframe"),
                        o = n.getChildByName("_title"),
                        i = n.getChildByName("_colum"),
                        r = n.getChildByName("_closeBtn"),
                        a = n.getChildByName("_empty"),
                        s = n.getChildByName("_larrow"),
                        c = n.getChildByName("_rarrow"),
                        l = n.getChildByName("_pagenumber");
                    o.y = n.y + 419 * t, r.y = o.y, i.y = o.y - (this.TITLE_COL_MARGIN * t > 50 ? this.TITLE_COL_MARGIN * t : 50), a.y = i.y - 100 * t;
                    var h = Math.ceil(this._reacllQueue.length / this.MAX_ROW);
                    if (this._reacllQueue.length > 0) {
                        var p = this.MAX_ROW * (this._pageIndex + 1),
                            f = this.MAX_ROW * this._pageIndex;
                        p > this._reacllQueue.length && (p = this._reacllQueue.length);
                        var d = 0 + this.MAX_ROW * this._pageIndex,
                            _ = this.createRow(this._reacllQueue[d]);
                        for (_.x = i.x, _.y = i.y - i.height / 2 - (_.height / 2 * (d - f) + 1) * t - this.COL_ROW0_MARGIN * t, _.name = "row_" + (d - f), _.on(cc.Node.EventType.TOUCH_END, e), n.addChild(_, 99), ++d; d < this.MAX_ROW + f; d++) {
                            var g = this.createRow(this._reacllQueue[d]);
                            g.x = _.x, g.y = _.y - g.height * t - this.COL_ROW_MARGIN, g.name = "row_" + (d - f), n.addChild(g, 99), (_ = g).on(cc.Node.EventType.TOUCH_END, e)
                        }
                        l.active = !0;
                        var y = l.getComponent(cc.Label);
                        y.string = this._pageIndex + 1 + " / " + h, y._updateRenderData(!0), l.y = _.y - _.height * t - this.COL_ROW0_MARGIN + 20, a.active = !1, h > 1 ? (s.active = !0, c.active = !0, s.on(cc.Node.EventType.TOUCH_END, this.btnArrowClick, this), c.on(cc.Node.EventType.TOUCH_END, this.btnArrowClick, this)) : (s.active = !1, c.active = !1)
                    } else s.active = !1, c.active = !1, l.active = !1;
                    var m = this;
                    r.active = !0, r.on(cc.Node.EventType.TOUCH_END, function(e) {
                        u.default.getInstance().playBtnEffect(), r.off(cc.Node.EventType.TOUCH_END), m._businessStorage.showRecall = !1
                    }, this), this._defScaleY = t
                }, t.prototype.show = function() {
                    var e = this.node.getChildByName("_maskbg");
                    if (e && !e.active) {
                        e.active = !0;
                        var t = this.node.getChildByName("_recallframe");
                        t && (t.active = !0), this._reacllQueue = this._businessStorage.recallQueue, this.init(this._businessStorage.recallCallBack)
                    }
                }, t.prototype.close = function() {
                    var e = this.node.getChildByName("_maskbg");
                    if (e && e.active) {
                        e.active = !1;
                        var t = this.node.getChildByName("_recallframe");
                        if (t) {
                            this.clearRow(t);
                            var n = t.getChildByName("_larrow"),
                                o = t.getChildByName("_rarrow");
                            n && n.active && n.off(cc.Node.EventType.TOUCH_END, this.btnArrowClick, this), o && o.active && o.off(cc.Node.EventType.TOUCH_END, this.btnArrowClick, this), t.active = !1
                        }
                        this._pageIndex = 0
                    }
                }, t.prototype.btnArrowClick = function(e) {
                    "_larrow" == e.target.name ? this._pageIndex-- : this._pageIndex++;
                    var t = Math.ceil(this._reacllQueue.length / this.MAX_ROW);
                    this._pageIndex < 0 ? this._pageIndex = t - 1 : this._pageIndex >= t && (this._pageIndex = 0);
                    var n = this.node.getChildByName("_recallframe");
                    this.clearRow(n), this.init(this._businessStorage.recallCallBack), u.default.getInstance().playBtnEffect()
                }, t.prototype.clearRow = function(e) {
                    for (var t = 0, n = e.getChildByName("row_" + t); n;) e.removeChild(n, !0), n = e.getChildByName("row_" + ++t)
                }, t.prototype.getHScale = function() {
                    var e = cc.winSize.height / l.default.consts.FRAME_HEIGHT;
                    return e > 1 ? 1 : e
                }, t.prototype.resetPosition = function() {
                    var e = this.node.getChildByName("_recallframe");
                    e && (this.clearRow(e), this.init(this._businessStorage.recallCallBack))
                }, t.prototype.createRow = function(e) {
                    var t = cc.instantiate(this.pfbRecallRow);
                    return t.getComponent(h.default).init(e), t
                }, t.prototype.update = function(e) {
                    this._businessStorage && this._businessStorage.showRecall ? (this.show(), this._defScaleY != this.getHScale() && this.resetPosition()) : this.close()
                }, i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbRecallRow", void 0), t = i([a], t)
            }(c.default);
        n.default = f, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../uikiller/Thor": "Thor",
        "../Business/AudioManage": "AudioManage",
        "../Model/BusinessStorage": "BusinessStorage",
        "./RecallRow": "RecallRow"
    }],
    GameServerWsConnector: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2aeb64RATVGXrxSrP7cjyH8", "GameServerWsConnector");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Config/Config")),
            c = e("pomelo-weixin-client"),
            l = e("../Model/NetConnector"),
            u = e("es6-promise"),
            h = e("../Model/PromptDialogStorage"),
            p = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.socketConn = c, t.wsConn = c.newInstance(), t._netConnector = null, t._retryDelay = 0, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._netConnector = this.node.getComponent(l.default), this.initWsConnector()
                }, t.prototype.queryGameServer = function() {
                    return new u.Promise(function(e, t) {
                        e(!0)
                    }).then(function() {
                        return s.default.getDefaultWSConnectData()
                    })
                }, t.prototype.initWsConnector = function() {
                    var e = this;
                    this.queryGameServer().then(function(t) {
                        if (t) {
                            if (e._netConnector) {
                                cc.log("porxy back:", t);
                                var n = s.default.determineProductionRMPServerUrl("", t.port);
                                e._netConnector.gameSocketServer.ip = n.host, e._netConnector.gameSocketServer.port = n.port, e._netConnector.gameSocketServer.gamePath = n.gamePath, e.configWsConnector()
                            }
                        } else e._netConnector && (e._netConnector.gameSocketServer.ip = "", e._netConnector.gameSocketServer.port = 0), h.default.showMsg(s.default.ERR_CODE_NETWORK.toString())
                    }).catch(function(t) {
                        cc.log("queryGameServer reject ", t), h.default.showMsg(s.default.ERR_CODE_NETWORK.toString()), e._netConnector && (e._netConnector.socketConnector = null)
                    })
                }, t.prototype._retry = function() {
                    var e = this;
                    cc.log("_retry ", e._retryDelay), ++e._retryDelay, e._retryDelay > 6 && (e._retryDelay = 6), e.scheduleOnce(function() {
                        e.initWsConnector()
                    }, e._retryDelay)
                }, t.prototype.configWsConnector = function() {
                    var e = this;
                    if (e._netConnector && "" != e._netConnector.gameSocketServer.ip && 0 != e._netConnector.gameSocketServer.port) {
                        var t = e._netConnector.gameSocketServer.ip,
                            n = e._netConnector.gameSocketServer.port,
                            o = e._netConnector.gameSocketServer.gamePath;
                        e.wsConn.init({
                            host: t,
                            port: n,
                            gamePath: o,
                            debugMode: !1,
                            browserWS: !0
                        }, function(t) {
                            t ? (e.wsConn.on("close", function(e) {
                                h.default.showMsg(s.default.ERR_CODE_NETWORK.toString())
                            }), e._netConnector.socketConnector = e.wsConn) : (e._netConnector.gameSocketServer.ip = "", e._netConnector.gameSocketServer.port = 0, e._netConnector.socketConnector = null, h.default.showMsg(s.default.ERR_CODE_NETWORK.toString()))
                        })
                    }
                }, t = i([a], t)
            }(cc.Component);
        n.default = p, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../Model/NetConnector": "NetConnector",
        "../Model/PromptDialogStorage": "PromptDialogStorage",
        "es6-promise": 4,
        "pomelo-weixin-client": 5
    }],
    GameStage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "04778ZBUxpO9qkWl8D+jXbu", "GameStage");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../Components/Model/UserInfoStorage"),
            l = e("../Utils/SeedRandom"),
            u = e("../Utils/CCHelper"),
            h = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.label = null, t._userInfo = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._userInfo = this.node.getComponent(c.default), this._userInfo.isLogin || (cc.log("Jump to login"), u.default.preloadScene(this, "Login", function(e, t) {
                        cc.director.loadScene("Login")
                    }, function(e, t) {}))
                }, t.prototype.seedRandomTest = function() {
                    for (var e = [], t = 0; t < 10; t++) e.push(l.default.random(1, 100));
                    cc.log("randNum 1:  ", e), e = [], l.default.seed = 999999;
                    for (t = 0; t < 10; t++) e.push(l.default.random(1, 100));
                    cc.log("randNum 2:  ", e), e = [], l.default.seed = Date.now();
                    for (t = 0; t < 10; t++) e.push(l.default.random(1, 100));
                    cc.log("randNum 3:  ", e), e = [], l.default.seed = 999999;
                    for (t = 0; t < 10; t++) e.push(l.default.random(1, 100));
                    cc.log("randNum 4:  ", e)
                }, t.prototype.start = function() {}, i([s(cc.Label)], t.prototype, "label", void 0), t = i([a], t)
            }(cc.Component);
        n.default = h, cc._RF.pop()
    }, {
        "../Components/Model/UserInfoStorage": "UserInfoStorage",
        "../Utils/CCHelper": "CCHelper",
        "../Utils/SeedRandom": "SeedRandom"
    }],
    GameStart: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "26b38pjY3pNn5+/+CqpYgMz", "GameStart");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/BusinessStorage")),
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._businessStorage = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._businessStorage = this.node.getComponent(s.default)
                }, t.prototype._onTouchEnd = function(e) {
                    if (this._businessStorage) {
                        if (this._businessStorage.startGame) return;
                        this._businessStorage.currQueIndex = this._businessStorage.questionCursor, this._businessStorage.startGame = !0
                    }
                }, t = i([a], t)
            }(e("../../uikiller/Thor").default);
        n.default = c, cc._RF.pop()
    }, {
        "../../uikiller/Thor": "Thor",
        "../Model/BusinessStorage": "BusinessStorage"
    }],
    GunSight: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "1babalw7BBG05dWCMYlaasQ", "GunSight");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.fishAtlas = null, t
                }
                return o(t, e), t.prototype.init = function() {
                    this.setBoxStatus(!1)
                }, t.prototype.setBoxStatus = function(e) {
                    var t = this.node.getChildByName("_fishbox"),
                        n = this.node.getChildByName("_boxbg");
                    t.active = e, n.active = e
                }, t.prototype.setLockFish = function(e) {
                    var t = this.node.getChildByName("_fishbox"),
                        n = this.node.getChildByName("_boxbg"),
                        o = t.getComponent(cc.Sprite);
                    this.getSpriteFrame(e).getRect();
                    o.spriteFrame = this.getSpriteFrame(e), "Fish_22" == e ? t.setContentSize(48, 78) : "Fish_21" == e ? t.setContentSize(60, 100) : "Fish_20" == e ? t.setContentSize(27, 36) : "Fish_19" == e ? t.setContentSize(40, 52) : "Fish_18" == e ? t.setContentSize(36, 70) : "Fish_17" == e ? t.setContentSize(54, 45) : "Fish_16" == e ? t.setContentSize(60, 80) : "Fish_14" == e ? t.setContentSize(53, 51) : "Fish_13" == e ? t.setContentSize(36, 61) : "Fish_12" == e ? t.setContentSize(55, 59) : "Fish_11" == e ? t.setContentSize(45, 69) : "Fish_10" == e ? t.setContentSize(80, 90) : "Fish_09" == e ? t.setContentSize(60, 100) : "Fish_08" == e ? t.setContentSize(100, 80) : "Fish_07" == e ? t.setContentSize(60, 100) : "Fish_06" == e ? t.setContentSize(70, 100) : "Fish_05" == e ? t.setContentSize(60, 100) : "Fish_01" == e ? t.setContentSize(56, 56) : t.setContentSize(100, 100), cc.log(t.getContentSize()), t.position = n.position
                }, t.prototype.showBox = function() {
                    this.setBoxStatus(!0)
                }, t.prototype.closeBox = function() {
                    this.setBoxStatus(!1)
                }, t.prototype.clearFishSprite = function() {
                    var e = this.node.getChildByName("_fishbox");
                    this.node.getChildByName("_boxbg");
                    e.getComponent(cc.Sprite).spriteFrame = null
                }, t.prototype.getSpriteFrame = function(e) {
                    return this.fishAtlas.getSpriteFrame(e)
                }, i([s({
                    type: [cc.SpriteAtlas]
                })], t.prototype, "fishAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    HandlingAnimation: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a60edR/kfVPfZZ0zbB/UBuO", "HandlingAnimation");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.rate = .5, t._idx = 0, t._elapse = 0, t
                }
                return o(t, e), t.prototype.onLoad = function() {}, t.prototype.onAnimation = function(e) {
                    if (this._elapse < this.rate) this._elapse += e;
                    else {
                        this._elapse = 0;
                        for (var t = this.node.children, n = 0; n < t.length; n++) n <= this._idx ? t[n].active = !0 : t[n].active = !1;
                        this._idx = ++this._idx % t.length
                    }
                }, t.prototype.update = function(e) {
                    this.onAnimation(e)
                }, i([s], t.prototype, "rate", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    HorizontalScroll: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a1e47515pBJd5XPaBn8lpsI", "HorizontalScroll");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._scrollView = null, t._percent = 0, t._initPercent = 0, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    var e = this;
                    this._scrollView = this.node.getComponent(cc.ScrollView), this.calcInitPercent(), this._scrollView && this._scrollView.node.on(cc.Node.EventType.SIZE_CHANGED, function() {
                        e.calcInitPercent()
                    })
                }, t.prototype.calcInitPercent = function() {
                    this._scrollView && (this._initPercent = this._scrollView.node.width / this._scrollView.content.width)
                }, t.prototype.horScroll = function(e, t) {
                    if (this._scrollView) {
                        if ((t = parseInt(t)) < 0) {
                            if (this._percent < 0) return void(this._percent = 0);
                            this._percent -= .1
                        } else if (t > 0) {
                            if (this._percent >= 1) return void(this._percent = 1);
                            this._percent += .1
                        }
                        this._scrollView.scrollToPercentHorizontal(this._percent, .3)
                    }
                }, t = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    IphoneXTopPadding: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "838absHsq9Aap9KwdJNZM4l", "IphoneXTopPadding");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.yOffset = 30, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this.onHandle()
                }, t.prototype.onHandle = function() {}, i([s], t.prototype, "yOffset", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    JettonsItem: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a380dFUFIdLlr3qCsHoXQ4d", "JettonsItem");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = cc._decorator,
            s = a.ccclass,
            c = a.property,
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.goldAtlas = null, t._ndTagBg = null, t._lblAmount = null, t._ndAnim = null, t._recycleCb = null, t
                }
                return o(t, e), t.prototype.init = function(e) {
                    this._recycleCb = e, this._ndAnim = this.node.getChildByName("anim"), this._ndTagBg = this.node.getChildByName("tagbg"), this._lblAmount = this._ndTagBg.getChildByName("amount").getComponent(cc.Label);
                    var t = this._ndAnim.getComponent(cc.Animation),
                        n = this.getSpriteFrameList("jetton_1", 1, 3),
                        o = cc.AnimationClip.createWithSpriteFrames(n, 15);
                    o.wrapMode = cc.WrapMode.Loop, t.addClip(o, "jetton")
                }, t.prototype.playAnimation = function(e) {
                    var t = this;
                    this._lblAmount.string = e;
                    var n = e / 5e3 * 372;
                    n < 10 && (n = e / 500 * 372), n %= 372;
                    var o = r.default.getRandomNum(-2, 2);
                    this._ndTagBg.getComponent(cc.Sprite).spriteFrame = o < 0 ? this.goldAtlas.getSpriteFrame("jetton_bgc1") : this.goldAtlas.getSpriteFrame("jetton_bgc2"), this.node.active = !0, this.node.opacity = 255, this.node.y = 0, this._ndTagBg.active = !1, this._ndAnim.active = !0;
                    var i = this._ndAnim.getComponent(cc.Animation);
                    i.stop(), i.play("jetton"), this.node.runAction(cc.sequence(cc.moveTo(1, cc.v2(0, n)), cc.callFunc(function() {
                        i.stop(), t._ndAnim.active = !1, t._ndTagBg.active = !0
                    }), cc.delayTime(.1), cc.fadeOut(.3), cc.callFunc(function() {
                        t._recycleCb && t._recycleCb(t.node)
                    })))
                }, t.prototype.getSpriteFrameList = function(e, t, n) {
                    for (var o = [], i = t; i < n + 1; i++) {
                        var r = e + "_" + i,
                            a = this.goldAtlas.getSpriteFrame(r);
                        o.push(a)
                    }
                    return o
                }, i([c(cc.SpriteAtlas)], t.prototype, "goldAtlas", void 0), t = i([s], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    Joystick: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a962eBT4ohFNbE++6Onpd97", "Joystick");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r, a = cc._decorator,
            s = a.ccclass,
            c = a.property;
        (function(e) {
            e[e.IDLE = 0] = "IDLE", e[e.LEFT = 1] = "LEFT", e[e.UP = 2] = "UP", e[e.RIGHT = 3] = "RIGHT", e[e.DOWN = 4] = "DOWN", e[e.LEFT_UP = 5] = "LEFT_UP", e[e.RIGHT_UP = 6] = "RIGHT_UP", e[e.LEFT_DOWN = 7] = "LEFT_DOWN", e[e.RIGHT_DOWN = 8] = "RIGHT_DOWN"
        })(r = n.Direction || (n.Direction = {}));
        var l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.interactable = !0, t.fixed = !0, t.background = null, t.bar = null, t.moveEvents = [], t.radius = 0, t._dirction = r.IDLE, t._angle = 0, t
            }
            var n;
            return o(t, e), n = t, Object.defineProperty(t.prototype, "direction", {
                get: function() {
                    return this._dirction
                },
                set: function(e) {
                    cc.Component.EventHandler.emitEvents(this.moveEvents, {
                        oldDir: this.direction,
                        newDir: e,
                        angle: this._angle
                    }), this._dirction = e
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.start = function() {
                this.radius = this.background.width / 2, this.direction = r.IDLE, this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this), this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this), this.originPos = this.background.position
            }, t.prototype.calcAngleFromWorldPos = function(e) {
                if (!(this.radius <= 0)) {
                    var t = (e = this.background.convertToNodeSpaceAR(e)).mag();
                    t > this.radius && e.mulSelf(this.radius / t);
                    var n = cc.v2(e.x, e.y),
                        o = cc.v2(-1, 0);
                    return 180 * n.signAngle(o) / Math.PI
                }
            }, t.prototype.onTouchStart = function(e) {
                this.interactable && (this.fixed ? this.onTouchMove(e) : this.background.position = this.node.convertToNodeSpaceAR(e.getLocation()))
            }, t.prototype.onTouchMove = function(e) {
                if (this.interactable) {
                    var t = this.background.convertToNodeSpaceAR(e.getLocation());
                    this.bar && (this.bar.position = t);
                    var o = t.mag();
                    o > this.radius && t.mulSelf(this.radius / o), this.bar && (this.bar.position = t), this._angle = 180 * t.signAngle(cc.v2(-1, 0)) / Math.PI;
                    var i = n.GetDirctionByAngle(this._angle);
                    this.direction = i
                }
            }, t.prototype.onTouchEnd = function() {
                this.interactable && (this.direction = r.IDLE, this.bar && (this.bar.position = cc.v2()), this.fixed || (this.background.position = this.originPos))
            }, t.GetDirctionByAngle = function(e) {
                return e >= -22.5 && e < 22.5 ? r.LEFT : e >= 22.5 && e < 67.5 ? r.LEFT_UP : e >= 67.5 && e < 112.5 ? r.UP : e >= 112.5 && e < 157.5 ? r.RIGHT_UP : e >= 157.5 || e < -157.5 ? r.RIGHT : e >= -157.5 && e < -112.5 ? r.RIGHT_DOWN : e >= -112.5 && e < -67.5 ? r.DOWN : e >= -67.5 && e < -22.5 ? r.LEFT_DOWN : void 0
            }, t.GetDirVecByDir = function(e) {
                switch (e) {
                    case r.LEFT:
                        return cc.v2(-1, 0);
                    case r.UP:
                        return cc.v2(0, 1);
                    case r.RIGHT:
                        return cc.v2(1, 0);
                    case r.DOWN:
                        return cc.v2(0, -1);
                    case r.LEFT_UP:
                        return cc.v2(-1, 1).normalize();
                    case r.RIGHT_UP:
                        return cc.v2(1, 1).normalize();
                    case r.RIGHT_DOWN:
                        return cc.v2(1, -1).normalize();
                    case r.LEFT_DOWN:
                        return cc.v2(-1, -1).normalize();
                    default:
                        return cc.v2()
                }
            }, i([c(cc.Boolean)], t.prototype, "interactable", void 0), i([c({
                tooltip: "\u662f\u5426\u56fa\u5b9a\u4f4d\u7f6e"
            })], t.prototype, "fixed", void 0), i([c(cc.Node)], t.prototype, "background", void 0), i([c(cc.Node)], t.prototype, "bar", void 0), i([c([cc.Component.EventHandler])], t.prototype, "moveEvents", void 0), t = n = i([s], t)
        }(cc.Component);
        n.Joystick = l, cc._RF.pop()
    }, {}],
    LanguageData: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var o = e("polyglot.min"),
            i = null;

        function r(e) {
            return window.i18n.languages[e]
        }

        function a(e) {
            e && (i ? i.replace(e) : i = new o({
                phrases: e,
                allowMissing: !0
            }))
        }
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }), t.exports = {
            init: function(e) {
                if (e !== window.i18n.curLang) {
                    var t = r(e) || {};
                    window.i18n.curLang = e, a(t), this.inst = i
                }
            },
            t: function(e, t) {
                if (i) return i.t(e, t)
            },
            inst: i,
            updateSceneRenderers: function() {
                for (var e = cc.director.getScene().children, t = [], n = 0; n < e.length; ++n) {
                    var o = e[n].getComponentsInChildren("LocalizedLabel");
                    Array.prototype.push.apply(t, o)
                }
                for (var i = 0; i < t.length; ++i) {
                    var r = t[i];
                    r.node.active && r.updateLabel()
                }
                for (var a = [], s = 0; s < e.length; ++s) {
                    var c = e[s].getComponentsInChildren("LocalizedSprite");
                    Array.prototype.push.apply(a, c)
                }
                for (var l = 0; l < a.length; ++l) {
                    var u = a[l];
                    u.node.active && u.updateSprite(window.i18n.curLang)
                }
            }
        }, cc._RF.pop()
    }, {
        "polyglot.min": "polyglot.min"
    }],
    Language: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "6f4b7AVVWdHprs6M9gicjos", "Language");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("LanguageData")),
            c = e("../../Utils/CCHelper"),
            l = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o(t, e), t.prototype.start = function() {
                    var e = c.default.getLang();
                    e ? c.default.isZhHans() ? s.init("zh-hans") : "zh-hant" === e || "zh_hant" == e || "zh-tw" == e || "zh_tw" == e || "zh-hk" == e || "zh_hk" == e || "zh-mo" == e || "zh_mo" == e ? s.init("zh-hant") : "ru" == e ? s.init(e) : ["en", "ru", "ja", "ko", "th"].indexOf(e) >= 0 ? s.init(e) : s.init("en") : s.init("en"), cc.debug.setDisplayStats(!1)
                }, t.prototype.update = function(e) {
                    s.updateSceneRenderers()
                }, t = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        LanguageData: "LanguageData"
    }],
    LobbyViewControl: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "8c0f7sp31VJUoCy7GY1cVQM", "LobbyViewControl");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../Components/Model/UserInfoStorage"),
            l = e("../uikiller/Thor"),
            u = e("../Config/Config"),
            h = e("../Components/UI/AndroidAskFullScreen"),
            p = e("../Utils/CCHelper"),
            f = e("../Components/Model/TableSearchStorage"),
            d = e("../Components/Business/StartSearchTable"),
            _ = e("../Components/UI/CurrencyLabel"),
            g = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._promptDialogStorage = null, t.autoSearchOnce = !1, t.pfbFullScreen = null, t.pfbCurrencyLabel = null, t._userInfoStorage = null, t._tableSearchStorage = null, t._netConnector = null, t._hasInitRoom = !1, t._initLabelPos = !1, t._currenyLabelPoole = [], t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    if (this._userInfoStorage = this.node.getComponent(c.default), this._tableSearchStorage = this.node.getComponent(f.default), this._showHideChildren(!0), p.default.isShowFullScreenNotice(u.default.consts.ANDROID_FULLSCREEN_LOBBY)) {
                        var e = cc.instantiate(this.pfbFullScreen),
                            t = e.getComponent(h.default);
                        e.setParent(this.node), t.show(this.node)
                    }
                    p.default.isAutoSearchTable() && (this.node.getChildByName("_roomoption").active = !1, this.scheduleOnce(function(e) {
                        if (this._tableSearchStorage) {
                            var t = {};
                            t.level = p.default.getUrlRoomLevel(), cc.log("rlv==", t), this._tableSearchStorage.searchParams = t, this._tableSearchStorage.startSearch = !0
                        }
                    }, 1));
                    for (var n = 0; n < u.default.consts.MAX_ROOM; n++) this._currenyLabelPoole.push(cc.instantiate(this.pfbCurrencyLabel))
                }, t.prototype.update = function(e) {
                    if (this._userInfoStorage && this._userInfoStorage.roomlevelCost && !this._hasInitRoom) {
                        this._hasInitRoom = !0;
                        for (var t = this.node.getChildByName("_roomoption"), n = 0; n < u.default.consts.MAX_ROOM; n++) {
                            var o = t.getChildByName("_room" + n),
                                i = (o.getComponent(d.default), p.default.getMyCannonCostList(this._userInfoStorage.roomlevelCost, n)),
                                r = this._currenyLabelPoole[n],
                                a = r.getComponent(_.default);
                            r.setParent(o), r.name = "room_currency_" + n, a.init(i[0].cy, i[0].rmp, i[i.length - 1].rmp), a.setSeparate("-")
                        }
                        p.default.checkAndSetFrameScale(this.node)
                    }
                }, t.prototype.lateUpdate = function() {
                    if (!this._initLabelPos) {
                        this._initLabelPos = !0;
                        for (var e = [-161, -161, -169], t = this.node.getChildByName("_roomoption"), n = 0; n < u.default.consts.MAX_ROOM; n++) {
                            var o = t.getChildByName("_room" + n);
                            this._currenyLabelPoole[n].getComponent(_.default).show(o.position, cc.v2(-10, e[n]))
                        }
                    }
                }, t.prototype._showHideChildren = function(e) {
                    for (var t = this.node.children, n = 0; n < t.length; n++) t[n].active = e
                }, i([s], t.prototype, "autoSearchOnce", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbFullScreen", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbCurrencyLabel", void 0), t = i([a], t)
            }(l.default);
        n.default = g, cc._RF.pop()
    }, {
        "../Components/Business/StartSearchTable": "StartSearchTable",
        "../Components/Model/TableSearchStorage": "TableSearchStorage",
        "../Components/Model/UserInfoStorage": "UserInfoStorage",
        "../Components/UI/AndroidAskFullScreen": "AndroidAskFullScreen",
        "../Components/UI/CurrencyLabel": "CurrencyLabel",
        "../Config/Config": "Config",
        "../Utils/CCHelper": "CCHelper",
        "../uikiller/Thor": "Thor"
    }],
    LocalizedLabel: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var o = e("LanguageData");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                menu: "i18n/LocalizedLabel"
            },
            properties: {
                dataID: {
                    get: function() {
                        return this._dataID
                    },
                    set: function(e) {
                        this._dataID !== e && (this._dataID = e, this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function() {
                o.inst || o.init(), this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Label);
                if (e) return this.label = e, void this.updateLabel()
            },
            updateLabel: function() {
                this.label ? o.t(this.dataID) && (this.label.string = o.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }), cc._RF.pop()
    }, {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var o = e("SpriteFrameSet");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                inspector: "packages://i18n/inspector/localized-sprite.js",
                menu: "i18n/LocalizedSprite"
            },
            properties: {
                spriteFrameSet: {
                    default: [],
                    type: o
                }
            },
            onLoad: function() {
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Sprite);
                if (e) return this.sprite = e, void this.updateSprite(window.i18n.curLang)
            },
            getSpriteFrameByLang: function(e) {
                for (var t = 0; t < this.spriteFrameSet.length; ++t)
                    if (this.spriteFrameSet[t].language === e) return this.spriteFrameSet[t].spriteFrame
            },
            updateSprite: function(e) {
                if (this.sprite) {
                    var t = this.getSpriteFrameByLang(e);
                    !t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame), this.sprite.spriteFrame = t
                } else cc.error("Failed to update localized sprite, sprite component is invalid!")
            }
        }), cc._RF.pop()
    }, {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    LoginStage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a2188Q9iHZNs5b10pMagwHk", "LoginStage");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../Utils/CCHelper"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.loadAtlas = [], t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    var e = this.node.getComponent(cc.Sprite),
                        t = "home_bg_en";
                    c.default.isZhHans() && (t = "home_bg_hans");
                    for (var n = null, o = 0; o < this.loadAtlas.length && !(n = this.loadAtlas[o].getSpriteFrame(t)); o++);
                    n && (e.spriteFrame = n)
                }, i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "loadAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../Utils/CCHelper": "CCHelper"
    }],
    LoginSuccessRedirector: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "78e87AMRhxIh6p0dF/0ZDdp", "LoginSuccessRedirector");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../Model/UserInfoStorage"),
            l = e("../../Utils/CCHelper"),
            u = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.sceneName = "", t._userInfoStorage = null, t._progressBar = null, t._isPreLoad = !1, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._userInfoStorage = this.node.getComponent(c.default);
                    var e = this.node.getChildByName("ProgressBar");
                    e && (this._progressBar = e.getComponent(cc.ProgressBar)), cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
                }, t.prototype.loadGameScene = function(e) {
                    var t = this;
                    if ("" != this.sceneName && !this._isPreLoad) {
                        var n = this;
                        n._isPreLoad = !0, l.default.preloadScene(this, this.sceneName, function(e, o) {
                            cc.director.loadScene(t.sceneName), n._isPreLoad = !1
                        }, function(t, n) {
                            e && (e.progress = t / n)
                        })
                    }
                }, t.prototype.update = function(e) {
                    this._userInfoStorage && this._userInfoStorage.isLogin && this.loadGameScene(this._progressBar)
                }, i([s], t.prototype, "sceneName", void 0), t = i([a], t)
            }(cc.Component);
        n.default = u, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../Model/UserInfoStorage": "UserInfoStorage"
    }],
    MessageItem: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2c15cLnDLVOKZZQTuE/JFZ8", "MessageItem");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.spfBubble = [], t._img = null, t._label = null, t._bgLayout = null, t._bgWidget = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this.initVar()
                }, t.prototype.initVar = function() {
                    this._img = this.node.getComponent(cc.Sprite), this._bgLayout = this.node.getComponent(cc.Layout), this._bgWidget = this.node.getComponent(cc.Widget);
                    var e = this.node.getChildByName("text");
                    e && (this._label = e.getComponent(cc.Label))
                }, t.prototype.setText = function(e, t) {
                    var n = this;
                    this._label || this._img || this.initVar(), this._bgLayout && (this._bgLayout.type = cc.Layout.Type.HORIZONTAL, this._bgLayout.paddingTop = this._bgLayout.paddingBottom = 6, this._bgLayout.paddingLeft = this._bgLayout.paddingRight = 20), this._bgWidget && (t ? (this._bgWidget.isAlignLeft = !1, this._bgWidget.isAlignRight = !0, this._bgWidget.right = 8) : (this._bgWidget.isAlignLeft = !0, this._bgWidget.isAlignRight = !1, this._bgWidget.left = 8)), this._label && (this._label.overflow = cc.Label.Overflow.NONE, this._label.string = e, this._label.node.scaleX = t ? -1 : 1), this._img && (this._img.spriteFrame = t ? this.spfBubble[1] : this.spfBubble[0], this._img.node.scaleX = t ? -1 : 1), this.scheduleOnce(function() {
                        n._label.node.width > 300 && (n._label.overflow = cc.Label.Overflow.RESIZE_HEIGHT, n._label.node.width = 300, n.node.width = 340, n._bgLayout && (n._bgLayout.type = cc.Layout.Type.VERTICAL, n._bgLayout.paddingTop = n._bgLayout.paddingBottom = 6, n._bgLayout.paddingLeft = n._bgLayout.paddingRight = 20))
                    })
                }, i([s([cc.SpriteFrame])], t.prototype, "spfBubble", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    MockPanel: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "30bb2CZ0yxMOLlwEE9V/Gay", "MockPanel");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../uikiller/Thor")),
            c = e("../../Config/Config"),
            l = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o(t, e), t.prototype.onLoad = function() {}, t.prototype._onBtnStartGameTouchEnd = function() {
                    var e = {
                        msg: null
                    };
                    e.msg = {
                        table: {
                            _id: "8a662f70-e333-11e8-9f54-a103d88c53cf",
                            playerIds: ["a6d39f61-e0fb-11e8-9c78-8f51870b57b4"],
                            chairId: ["9a5c8d51-e0fb-11e8-9c78-8f51870b57b4", "c9dd7051-e333-11e8-9e0d-fbd490cfe815", "a6d39f61-e0fb-11e8-9c78-8f51870b57b4", "c2103741-e333-11e8-9e0d-fbd490cfe815"],
                            gameId: "10001",
                            serverId: "whackMole-server-1",
                            hostId: "",
                            name: "Auto"
                        },
                        players: [{
                            id: "a6d39f61-e0fb-11e8-9c78-8f51870b57b4",
                            gameState: "playing",
                            gender: 1,
                            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erQkUeq69icJFhiaqUl8cQ5GpWicxxNoFmMZOu1PqhVQzo3TOSobhGS8APU9S9GbZVggIex0cAn9NLZw/132",
                            nickName: "Fs2hero",
                            tableId: "f482ce70-e367-11e8-baf2-e565bf78afe9",
                            connectorId: "connector-server-1",
                            gameId: "10001",
                            gameServerId: "whackMole-server-1",
                            teamId: "",
                            updateTime: 1541423207585,
                            createTime: 1541423207585,
                            wxOpenId: "o9ZyP4tYZo0v7QYn_dG6Ldv6ejjg",
                            gold: 999
                        }, {
                            id: "c2103741-e333-11e8-9e0d-fbd490cfe815",
                            gameState: "free",
                            gender: 1,
                            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoyNOEic1I3QM87b62sNZphBPJwuMJ6CYe6HA2q1UEicEmsJ80Do9ic0tfDlnwDUtVibVJHzRghZHSgJw/132",
                            nickName: "Baggio",
                            tableId: "8a662f70-e333-11e8-9f54-a103d88c53cf",
                            connectorId: "",
                            gameId: "",
                            gameServerId: "",
                            teamId: "",
                            updateTime: 1541667207421,
                            createTime: 1541667207421,
                            wxOpenId: "o9ZyP4pDCqeLEFG68q4rT75aF0ew",
                            gold: 686
                        }, {
                            id: "9a5c8d51-e0fb-11e8-9c78-8f51870b57b4",
                            gameState: "playing",
                            gender: 0,
                            avatarUrl: "",
                            nickName: "coder",
                            tableId: "f482ce70-e367-11e8-baf2-e565bf78afe9",
                            connectorId: "connector-server-1",
                            gameId: "10001",
                            gameServerId: "whackMole-server-1",
                            teamId: "",
                            updateTime: 1541423186729,
                            createTime: 1541423186729,
                            wxOpenId: "o9ZyP4or1BMhcsNy8LtW6MQbTL8w",
                            gold: 222
                        }, {
                            id: "c9dd7051-e333-11e8-9e0d-fbd490cfe815",
                            gameState: "free",
                            gender: 1,
                            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJKq1370yicYc9zuEkQibUBdLlibviameJCRxV9SZ1WUoe03ka3e2HJJblHUELHib17LzU0cfI7JYISP0A/132",
                            nickName: "\u6664\u6668",
                            tableId: "",
                            connectorId: "",
                            gameId: "",
                            gameServerId: "",
                            teamId: "",
                            updateTime: 1541667220481,
                            createTime: 1541667220481,
                            wxOpenId: "o9ZyP4sfCxl5xFCDiSGoFhY9URE4",
                            gold: 161
                        }],
                        area: {
                            _id: "f68925c0-e367-11e8-baf2-e565bf78afe9",
                            winner: "",
                            state: "started",
                            seed: 1541689629212,
                            tableId: "f482ce70-e367-11e8-baf2-e565bf78afe9",
                            createTime: 1541689629212
                        },
                        areaPlayers: [{
                            _id: "f68ad370-e367-11e8-baf2-e565bf78afe9",
                            score: 0,
                            hits: [],
                            playerId: "a6d39f61-e0fb-11e8-9c78-8f51870b57b4",
                            areaId: "f68925c0-e367-11e8-baf2-e565bf78afe9",
                            createTime: 1541689629223
                        }, {
                            _id: "f68de0b0-e367-11e8-baf2-e565bf78afe9",
                            score: 0,
                            hits: [],
                            playerId: "9a5c8d51-e0fb-11e8-9c78-8f51870b57b4",
                            areaId: "f68925c0-e367-11e8-baf2-e565bf78afe9",
                            createTime: 1541689629243
                        }]
                    }, cc.log("MockPanel StartGame Click "), c.default.mockNetEvent.emit(c.default.pomeloPushRoute.gameStart, e)
                }, t.prototype._onBtnShowHideTouchEnd = function() {
                    this._$._ndContent && (this._$._ndContent.active = !this._$._ndContent.active)
                }, t.prototype._onBtnSpawnFishesTouchEnd = function() {
                    cc.log("_onBtnSpawnFishesTouchEnd");
                    var e = [{
                        state: c.default.consts.SOLO,
                        type: "Fish_00",
                        path: "bezier_id_4",
                        alive: 30
                    }, {
                        state: c.default.consts.SOLO,
                        type: "Fish_01",
                        path: "bezier_id_3",
                        alive: 30
                    }, {
                        state: c.default.consts.SOLO,
                        type: "Fish_02",
                        path: "bezier_id_2",
                        alive: 30
                    }];
                    c.default.mockNetEvent.emit(c.default.pomeloPushRoute.onSpawnFishes, {
                        msg: e
                    })
                }, t.prototype._onBtnSpawnFishGroupTouchEnd = function() {
                    cc.log("_onBtnSpawnFishGroupTouchEnd");
                    var e = [{
                        state: c.default.consts.GROUP,
                        group: "group_id_0",
                        path: "bezier_id_4",
                        seed: Date.now(),
                        alive: 60
                    }];
                    c.default.mockNetEvent.emit(c.default.pomeloPushRoute.onSpawnFishes, {
                        msg: e
                    })
                }, t.prototype._onBtnSitDownTouchEnd = function() {
                    cc.log("_onBtnSitDownTouchEnd"), c.default.mockNetEvent.emit("clickSitDown", {
                        msg: "sitdown"
                    })
                }, t = i([a], t)
            }(s.default);
        n.default = l, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../uikiller/Thor": "Thor"
    }],
    MountUiKiller: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "dd7720VwZpGrba2aJMzWDEK", "MountUiKiller");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o(t, e), t.prototype.onLoad = function() {
                    cc.log("MountUiKiller "), this._$._lblName.$Label.string = "NotFound"
                }, t = i([a], t)
            }(e("../uikiller/Thor").default));
        n.default = s, cc._RF.pop()
    }, {
        "../uikiller/Thor": "Thor"
    }],
    NetConnector: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "77ad4zmU09HprtqxyXfHVQG", "NetConnector");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "webConnector", {
                    get: function() {
                        return n._webConnector
                    },
                    set: function(e) {
                        n._webConnector = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "gameWebServer", {
                    get: function() {
                        return n._gameWebServer
                    },
                    set: function(e) {
                        n._gameWebServer = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "socketConnector", {
                    get: function() {
                        return n._socketConnector
                    },
                    set: function(e) {
                        n._socketConnector = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "gameSocketServer", {
                    get: function() {
                        return n._gameSocketServer
                    },
                    set: function(e) {
                        n._gameSocketServer = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "jwtToken", {
                    get: function() {
                        return n._jwtToken
                    },
                    set: function(e) {
                        n._jwtToken = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.makeWsPacket = function(e) {
                    return {
                        accessToken: n._jwtToken,
                        query: e
                    }
                }, t._webConnector = null, t._gameWebServer = {
                    ip: "",
                    port: 0
                }, t._socketConnector = null, t._gameSocketServer = {
                    ip: "",
                    port: 0
                }, t._jwtToken = "", t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    NodeZOrder: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "495472oJ8lG1qvM5pkcBFgM", "NodeZOrder");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o(t, e), Object.defineProperty(t.prototype, "zOrder", {
                    get: function() {
                        return this.node.zIndex
                    },
                    set: function(e) {
                        this.node.zIndex = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), i([s({
                    type: cc.Integer
                })], t.prototype, "zOrder", null), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    NoviceTeaching: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "666a5xqX5dILYFVVinqFGd/", "NoviceTeaching");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Config/Config")),
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._nerverShow = !1, t
                }
                return o(t, e), t.prototype.play = function() {
                    if (!this._nerverShow) {
                        this.node.active = !0, this._nerverShow = !0;
                        var e = this;
                        this.scheduleOnce(function() {
                            e.close()
                        }, s.default.consts.NOVICE_DELAY_TIME)
                    }
                }, t.prototype.close = function() {
                    var e = this;
                    this.unscheduleAllCallbacks(), this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function() {
                        e.node.active = !1
                    })))
                }, t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {
        "../../Config/Config": "Config"
    }],
    Pair: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2775dsfqeBJsrkdHGeGozcG", "Pair");
        var o = cc.Class({
            name: "Pair",
            properties: {
                key: "",
                value: ""
            }
        });
        t.exports = o, cc._RF.pop()
    }, {}],
    PayTableFishFrame: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "46680inQnRPZpyVE/ViXk8m", "PayTableFishFrame");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = e("LanguageData"),
            u = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.fishAplhaAtlas = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {}, t.prototype.init = function(e, t) {
                    var n = this.node.getChildByName("_fish"),
                        o = this.node.getChildByName("_fishName").getComponent(cc.Label),
                        i = n.getComponent(cc.Sprite),
                        r = n.getContentSize(),
                        a = "",
                        s = "";
                    "lightning" !== e && "award" !== e ? (a = "Fish_" + c.default.paddingZeroLeft(e, 2), s = l.t("fish.name.fish_" + c.default.paddingZeroLeft(e, 2))) : (a = e, s = l.t("fish.name." + e));
                    var u = this.fishAplhaAtlas.getSpriteFrame(a),
                        h = u.getRect(),
                        p = r.height / h.height;
                    if (i.spriteFrame = u, o.string = s, r.height < h.height || r.width < h.width ? n.setScale(p < .9 ? .9 : p) : n.setContentSize(2 * h.width, 2 * h.height), t) {
                        var f = this.node.getChildByName("_score");
                        f.getChildByName("_amount").getComponent(cc.Label).string = t.rmp;
                        var d = t.cy;
                        "\u20bd" == d && (d = "RUB"), f.getChildByName("_cyFontend").getComponent(cc.Label).string = t.isbehind ? "" : d, f.getChildByName("_cyBehind").getComponent(cc.Label).string = t.isbehind ? d : ""
                    } else this.node.getChildByName("_score").active = !1
                }, i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "fishAplhaAtlas", void 0), t = i([a], t)
            }(cc.Component);
        n.default = u, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        LanguageData: "LanguageData"
    }],
    PayTableViewStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "cfeb96SjvJHxKJ9WGrtkmB+", "PayTableViewStorage");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "payData", {
                    get: function() {
                        return n._payData
                    },
                    set: function(e) {
                        n._payData = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "isOpen", {
                    get: function() {
                        return n._isOpen
                    },
                    set: function(e) {
                        n._isOpen = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "pageIdx", {
                    get: function() {
                        return n._pageIdx
                    },
                    set: function(e) {
                        n._pageIdx = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "scaleX", {
                    get: function() {
                        return n._scaleX
                    },
                    set: function(e) {
                        n._scaleX = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "scaleY", {
                    get: function() {
                        return n._scaleY
                    },
                    set: function(e) {
                        n._scaleY = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._isOpen = !1, t._pageIdx = -1, t._payData = null, t._scaleX = 1, t._scaleY = 1, t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    PayTableView: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "15e7cC8EjVPX7S37tIqYi0A", "PayTableView");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../uikiller/Thor"),
            l = e("../../Utils/CCHelper"),
            u = e("../Model/PayTableViewStorage"),
            h = e("../Model/NetConnector"),
            p = e("../../Utils/RealMoneyPlatform"),
            f = e("../Business/AudioManage"),
            d = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.noAplhaAtlas = null, t.fishAplhaAtlas = null, t.fishFrameLarge = null, t.fishFrame = null, t.ptInst = null, t._paytableData = null, t._bulletCost = null, t._cps = 0, t._totalBet = 0, t._closing = !1, t._framecount = 0, t._pageViews = [], t._pageIndex = -1, t._paytableStorage = null, t._netConnector = null, t._intervalId = null, t._scaleX = 1, t._scaleY = 1, t._frameWidth = 0, t._frameHeight = 0, t._frameRatio = 1, t._FRAME_DEF_WIDTH = 1096, t._FRAME_DEF_HEIGHT = 915, t._L_ROW_SPACE = 244, t._S_ROW_SPACE = 126, t
                }
                var n;
                return o(t, e), n = t, t.prototype.onLoad = function() {
                    this._netConnector = this.node.getComponent(h.default), this._paytableStorage = this.node.getComponent(u.default), n._self = this, this.initView(), this.hideAll(!0);
                    var e = this.node.getChildByName("_paytable");
                    this._frameWidth = e.getContentSize().width, this._frameHeight = e.getContentSize().height
                }, t.prototype.getPayRealMoney = function(e) {
                    if (this._paytableData) {
                        var t = this._paytableData.scores["Fish_" + l.default.paddingZeroLeft(e.toString(), 2)];
                        if (t) return p.default.getRealMoney(this._paytableData.cannonCost * t)
                    }
                }, t.prototype.hideAll = function(e) {
                    for (var t = this.node.children, n = 0; n < t.length; n++) t[n].active = !e
                }, t.prototype.changePage = function(e) {
                    this.clearPage(), e > this._pageViews.length || this._pageViews[e - 1]()
                }, t.prototype.clearPage = function() {}, t.prototype.closePaytable = function() {
                    0 != this._paytableStorage.isOpen && (this.clearPage(), this.hideAll(!0), this._paytableStorage.isOpen = !1, this._pageIndex = -1, this._intervalId && (clearInterval(this._intervalId), this._intervalId = null))
                }, t.prototype.showPage = function() {
                    this._pageIndex != this._paytableStorage.pageIdx && (this._paytableData = this._paytableStorage.payData, this.hideAll(!1), this.changePage(this._paytableStorage.pageIdx), this._pageIndex = this._paytableStorage.pageIdx)
                }, t.prototype.onArrowClick = function(e) {
                    var t = "_arrowleft" == e.target.name ? -1 : 1;
                    this._paytableStorage.pageIdx + t > this._pageViews.length ? this._paytableStorage.pageIdx = 1 : this._paytableStorage.pageIdx + t < 0 ? this._paytableStorage.pageIdx = this._pageViews.length : this._paytableStorage.pageIdx += t, 0 == this._paytableStorage.pageIdx && (this._paytableStorage.pageIdx = this._pageViews.length), e.target.runAction(cc.sequence(cc.scaleTo(.05, .8), cc.scaleTo(.05, 1))), f.default.getInstance().playBtnEffect()
                }, t.prototype.onCloseClick = function(e) {
                    f.default.getInstance().playBtnEffect(), this.closePaytable()
                }, t.prototype.update = function(e) {
                    this._paytableStorage && this._paytableStorage.payData && (this._paytableStorage.isOpen ? (this.displayScale(), this.showPage()) : this.closePaytable())
                }, t.prototype.displayScale = function() {
                    var e = this.node.getChildByName("_paytable"),
                        t = e.getContentSize().height / this._frameHeight;
                    e.getContentSize().height > 1200 && e.setContentSize(e.getContentSize().width, 1200);
                    var o = this.node.getChildByName("_title");
                    o.y = e.y + e.getContentSize().height / 2 - .95 * o.height - 10;
                    var i = this.node.getChildByName("_btnNode");
                    if (i.y = e.y + e.getContentSize().height / 2 - i.height / 2 - 80, t >= .92) {
                        if (n._self._fishNode.getChildByName("_page1").active)
                            for (var r = n._self._fishNode.getChildByName("_page1"), a = 2; a <= 7; a++) {
                                (s = r.getChildByName("PTLFishFrame" + (a - 1))).active = !0
                            } else if (n._self._fishNode.getChildByName("_page2").active)
                                for (r = n._self._fishNode.getChildByName("_page2"), a = 8; a <= 22; a++) {
                                    (s = r.getChildByName("PTFishFrame" + (a - 7))).active = !0
                                } else if (n._self._fishNode.getChildByName("_page3").active)
                                    for (r = n._self._fishNode.getChildByName("_page3"), a = 1; a <= 3; a++) {
                                        var s = r.getChildByName("PTFishFrame" + a),
                                            c = r.getChildByName("_label" + a);
                                        s.active = !0, c.active = !0
                                    }
                    } else {
                        if (this._scaleY = t, n._self._fishNode.getChildByName("_page1").active) {
                            r = n._self._fishNode.getChildByName("_page1");
                            var u = .77 - t <= .03 && .77 - t >= .03 ? 0 : 300 * (.77 - t),
                                h = 10;
                            t < .77 && (h = .77 / t * 20);
                            for (a = 2; a <= 7; a++) {
                                (s = r.getChildByName("PTLFishFrame" + (a - 1))).scaleX = this._scaleY, s.scaleY = this._scaleY, s.y = r.y + r.height / 2 - s.height / 2 - r.height / 8 + h, a - 2 >= 3 && (a - 2) % 3 >= 0 && (s.y = s.y - 2 * s.height + 30 + u), s.active = !0
                            }
                        } else if (n._self._fishNode.getChildByName("_page2").active) {
                            r = n._self._fishNode.getChildByName("_page2"), u = .77 - t <= .03 && .77 - t >= .03 ? 0 : 126 * (.77 - t), h = 40;
                            t < .77 && (h = .77 / t * 40);
                            for (a = 8; a <= 12; a++) {
                                (s = r.getChildByName("PTFishFrame" + (a - 7))).scaleX = this._scaleY, s.scaleY = this._scaleY, s.y = r.y + r.height / 2 - s.height + 30, s.active = !0
                            }
                            var p = r.getChildByName("PTFishFrame1");
                            for (a = 13; a <= 17; a++) {
                                (s = r.getChildByName("PTFishFrame" + (a - 7))).scaleX = this._scaleY, s.scaleY = this._scaleY, s.y = p.y - p.height - h, s.active = !0
                            }
                            for (p = r.getChildByName("PTFishFrame6"), a = 18; a <= 22; a++) {
                                (s = r.getChildByName("PTFishFrame" + (a - 7))).scaleX = this._scaleY, s.scaleY = this._scaleY, s.y = p.y - p.height - h, s.active = !0
                            }
                        } else if (n._self._fishNode.getChildByName("_page3").active) {
                            var f = (r = n._self._fishNode.getChildByName("_page3")).getChildByName("PTFishFrame1"),
                                d = r.getChildByName("_label1");
                            f.scaleX = this._scaleY, f.scaleY = this._scaleY, f.y = r.y + r.height / 2 - .7 * f.height, d.scaleX = this._scaleY, d.scaleY = this._scaleY, d.y = f.y - 10, d.x = f.x + d.width / 2 + 50;
                            var _ = r.getChildByName("PTFishFrame2"),
                                g = r.getChildByName("_label3");
                            _.scaleX = this._scaleY, _.scaleY = this._scaleY, _.y = f.y - _.height - 30, g.scaleX = this._scaleY, g.scaleY = this._scaleY, g.y = _.y - 10, g.x = _.x + g.width / 2 + 50;
                            var y = r.getChildByName("PTFishFrame3"),
                                m = r.getChildByName("_label2");
                            y.scaleX = this._scaleY, y.scaleY = this._scaleY, y.y = _.y - y.height - 30, m.scaleX = this._scaleY, m.scaleY = this._scaleY, m.y = y.y - 10, m.x = y.x + m.width / 2 + 50, f.active = !0, _.active = !0, y.active = !0, d.active = !0, g.active = !0, m.active = !0
                        }
                        l.default.checkAndSetFrameScale(this.node.getChildByName("_paytable"))
                    }
                }, t.prototype.createEmtpyLayout = function() {
                    return n._self._fishNode
                }, t.prototype.initView = function() {
                    this._arrowleft.on(cc.Node.EventType.TOUCH_END, this.onArrowClick, this, !0), this._arrowright.on(cc.Node.EventType.TOUCH_END, this.onArrowClick, this, !0), this._close.on(cc.Node.EventType.TOUCH_END, this.onCloseClick, this, !0), this._pageViews.push(this.createPage1), this._pageViews.push(this.createPage2), this._pageViews.push(this.createPage3)
                }, t.prototype.closePage = function() {
                    for (var e = 1; e <= 3; e++) {
                        n._self._fishNode.getChildByName("_page" + e).active = !1
                    }
                }, t.prototype.createPage1 = function() {
                    n._self.closePage();
                    var e = n._self._fishNode.getChildByName("_page1");
                    e.active = !0;
                    for (var t = 2; t <= 7; t++) {
                        var o = e.getChildByName("PTLFishFrame" + (t - 1));
                        if (o) o.getComponent("PayTableFishFrame").init(t.toString(), n._self.getPayRealMoney(t))
                    }
                    e.runAction(cc.fadeIn(1))
                }, t.prototype.createPage2 = function() {
                    n._self.closePage();
                    var e = n._self._fishNode.getChildByName("_page2");
                    e.active = !0;
                    for (var t = 8; t <= 22; t++) {
                        var o = e.getChildByName("PTFishFrame" + (t - 7));
                        if (o) o.getComponent("PayTableFishFrame").init(t.toString(), n._self.getPayRealMoney(t))
                    }
                    e.runAction(cc.fadeIn(.5))
                }, t.prototype.createPage3 = function() {
                    n._self.closePage();
                    var e = n._self._fishNode.getChildByName("_page3");
                    e.active = !0;
                    var t = e.getChildByName("PTFishFrame1").getComponent("PayTableFishFrame"),
                        o = e.getChildByName("PTFishFrame2").getComponent("PayTableFishFrame"),
                        i = e.getChildByName("PTFishFrame3").getComponent("PayTableFishFrame");
                    t.init("1", n._self.getPayRealMoney(1)), o.init("lightning", null), i.init("award", null), e.runAction(cc.fadeIn(.5))
                }, t.LEFT_ARROW_TAG = 75978, t.RIGHT_ARROW_TAG = 1216478, t.PAGEVIEW_TAG = 98123, t.PAYTABLE_FRAME = "PAYTABLE_FRAME", t.PAGE_FRAME = "PAGE_FRAME", t.FISH_FRAME = "FISH_FRAME", t._self = null, i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "noAplhaAtlas", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "fishAplhaAtlas", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "fishFrameLarge", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "fishFrame", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "ptInst", void 0), t = n = i([a], t)
            }(c.default);
        n.default = d, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../../uikiller/Thor": "Thor",
        "../Business/AudioManage": "AudioManage",
        "../Model/NetConnector": "NetConnector",
        "../Model/PayTableViewStorage": "PayTableViewStorage"
    }],
    PlatformStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2648dwwmShIuoaGIHVcPfi2", "PlatformStorage");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "helpSignalSender", {
                    get: function() {
                        return n._helpSignalSender
                    },
                    set: function(e) {
                        n._helpSignalSender = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "helpSignalSenderFinish", {
                    get: function() {
                        return n._helpSignalSenderFinish
                    },
                    set: function(e) {
                        n._helpSignalSenderFinish = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "doNavigateAction", {
                    get: function() {
                        return n._doNavigateAction
                    },
                    set: function(e) {
                        n._doNavigateAction = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._helpSignalSender = null, t._helpSignalSenderFinish = null, t._doNavigateAction = !1, t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    PlayViewControl: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "019ddEszC9PqZMFn7DaxuVP", "PlayViewControl");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../uikiller/Thor"),
            l = e("../Components/Model/BusinessStorage"),
            u = e("../Components/Model/UserInfoStorage"),
            h = e("../Components/Model/NetConnector"),
            p = e("../Config/Config"),
            f = e("../Utils/CCHelper"),
            d = e("../Components/Model/TableSearchStorage"),
            _ = e("../Utils/SeedRandom"),
            g = e("../Components/Platform/WechatAvatarLoader"),
            y = e("../Components/UI/joystick/Joystick"),
            m = e("../Components/UI/Bullet"),
            v = e("../Components/UI/Fish"),
            b = e("../Components/UI/AnimationCoin"),
            C = e("../Components/UI/AnimationFire"),
            S = e("../Components/Business/AudioManage"),
            w = e("../Components/UI/AnimationFlash"),
            P = e("../Components/UI/AnimationPause"),
            R = e("../Components/Model/WalletStorage"),
            O = e("../Components/Model/PromptDialogStorage"),
            T = e("../Components/Model/PngStorage"),
            A = e("LanguageData"),
            F = e("../Utils/RealMoneyPlatform"),
            I = e("../Components/Model/PayTableViewStorage"),
            k = e("../Components/UI/AnimationBonus"),
            N = e("../Components/UI/AnimationOnlyCoin"),
            E = e("../Components/UI/RecallRow"),
            B = e("../Components/UI/AndroidAskFullScreen"),
            L = e("../Components/Business/StartSearchTableForPlayView"),
            x = e("../Components/UI/GunSight"),
            M = e("../Components/UI/CurrencyLabel"),
            j = e("../Components/UI/BossNotify"),
            D = e("../Components/UI/AnimationBingo"),
            H = e("../Components/UI/NoviceTeaching"),
            U = e("../Components/UI/WebViewGameRecall"),
            G = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.pfbBullet = null, t.pfbFish = null, t.tideSpriteAtlas = null, t.sceneAtlas = null, t.pondAnimAtlas = null, t.pfbAnimCoin = null, t.pfbJettonItem = null, t.pfbGunFire = null, t.pfbFlash = null, t.pfbPause = null, t.pfbAnimBonus = null, t.pfbAnimOnlyCoin = null, t.pfbFullScreen = null, t.pfbCurrencyLabel = null, t.pfbBingo = null, t.cannonAtlas = null, t.currencyAtlas = null, t.uiAtlas = null, t._hideStarttime = 0, t._hideStacktime = 0, t._isHideDrop = !1, t._hideDrawCount = 0, t._businessStorage = null, t._userInfo = null, t._netConnector = null, t._tableSearchStorage = null, t._walletStorage = null, t._paytableStorage = null, t._avatarLoader = null, t._ping = null, t._isShow = !1, t._isPending = !1, t._isCancelLock = !1, t._ndBarrels = [], t._ndBelows = [], t._ndUpsides = [], t._ndCannons = [], t._ndWaitPlayer = [], t._ndBulletPool = null, t._shootDelay = 0, t._spaceShootDelay = 0, t._ndFishPool = null, t._spawnFishDelay = -1, t._bulletConfig = {}, t._fishConfig = {}, t._pathConfig = {}, t._groupConfig = {}, t._groupPathConfig = {}, t._flockConfig = {}, t._screenJoyStick = null, t._selfCannonIdx = -1, t._bulletInsPool = new cc.NodePool, t._fishInsPool = new cc.NodePool, t._animCoinPool = new cc.NodePool, t._jettonItemsPool = new cc.NodePool, t._gunFirePool = new cc.NodePool, t._animBonusPool = new cc.NodePool, t._animOnlyCoin = new cc.NodePool, t._animFlashPool = new cc.NodePool, t._animationPause = null, t._fishesNodeCacheMap = {}, t._bulletsNodeCacheMap = {}, t._btnQuitClick = !1, t._fireRequestCount = 0, t._showcounter = !1, t._timer = 0, t._seqNum = 0, t._scrollbarPos = null, t._scrollState = !1, t._scrollAction = !1, t._frameRateTime = 0, t._tideStopFire = !1, t._isShake = !1, t._selfNotify = !1, t._updateAngleNoFire = !1, t._currenyLabelPoole = [], t._bingoAnim = null, t
                }
                var n;
                return o(t, e), n = t, t.prototype.onLoad = function() {
                    var e = this,
                        t = f.default.urlParse();
                    t && t.showfps ? this._showcounter = !0 : this._showcounter = !1, cc.director.getCollisionManager().enabled = !0, this._businessStorage = this.node.getComponent(l.default), this._userInfo = this.node.getComponent(u.default), this._netConnector = this.node.getComponent(h.default), this._tableSearchStorage = this.node.getComponent(d.default), this._avatarLoader = this.node.getComponent(g.default), this._walletStorage = this.node.getComponent(R.default), this._ping = this.node.getComponent(T.default), this._paytableStorage = this.node.getComponent(I.default), F.default.walletInfo = this.node.getComponent(R.default);
                    var n, o = this._$._ndJoyStick,
                        i = this._$._ndScreenCtrl,
                        r = new cc.Component.EventHandler;
                    (r.target = this.node, r.component = "PlayViewControl", r.handler = "onJoyStickMove", r.customEventData = "", o) && ((n = o.getComponent(y.Joystick)) && (n.moveEvents = [], n.moveEvents.push(r)));
                    i && ((n = i.getComponent(y.Joystick)) && (this._screenJoyStick = n, n.moveEvents = [], n.moveEvents.push(r)));
                    this._$._ndLbBarrels && this._ndBarrels.push(this._$._ndLbBarrels), this._$._ndRbBarrels && this._ndBarrels.push(this._$._ndRbBarrels), this._$._ndRtBarrels && this._ndBarrels.push(this._$._ndRtBarrels), this._$._ndLtBarrels && this._ndBarrels.push(this._$._ndLtBarrels), this._$._ndLbTurretFront && this._ndUpsides.push(this._$._ndLbTurretFront), this._$._ndRbTurretFront && this._ndUpsides.push(this._$._ndRbTurretFront), this._$._ndRtTurretFront && this._ndUpsides.push(this._$._ndRtTurretFront), this._$._ndLtTurretFront && this._ndUpsides.push(this._$._ndLtTurretFront), this._$._ndLbTurretBack && this._ndBelows.push(this._$._ndLbTurretBack), this._$._ndRbTurretBack && this._ndBelows.push(this._$._ndRbTurretBack), this._$._ndRtTurretBack && this._ndBelows.push(this._$._ndRtTurretBack), this._$._ndLtTurretBack && this._ndBelows.push(this._$._ndLtTurretBack), this._$._ndLbCannon && this._ndCannons.push(this._$._ndLbCannon), this._$._ndRbCannon && this._ndCannons.push(this._$._ndRbCannon), this._$._ndRtCannon && this._ndCannons.push(this._$._ndRtCannon), this._$._ndLtCannon && this._ndCannons.push(this._$._ndLtCannon), this._$._ndLbWaitPlayer && this._ndWaitPlayer.push(this._$._ndLbWaitPlayer), this._$._ndRbWaitPlayer && this._ndWaitPlayer.push(this._$._ndRbWaitPlayer), this._$._ndRtWaitPlayer && this._ndWaitPlayer.push(this._$._ndRtWaitPlayer), this._$._ndLtWaitPlayer && this._ndWaitPlayer.push(this._$._ndLtWaitPlayer);
                    for (var a = 0; a < this._ndCannons.length; a++) this._ndCannons[a].active = !1;
                    this._$._ndBulletPool && (this._ndBulletPool = this._$._ndBulletPool), this._$._ndFishContainer && (this._ndFishPool = this._$._ndFishContainer), f.default.loadResource("config/bullet.json", function(t) {
                        cc.log("load bullet config ", t), t.json ? e._bulletConfig = t.json : e._bulletConfig = t
                    }), f.default.loadResource("config/fish.json", function(t) {
                        cc.log("load fish config ", t), t.json ? e._fishConfig = t.json : e._fishConfig = t
                    }), f.default.loadResource("config/path.json", function(t) {
                        cc.log("load path config ", t), t.json ? e._pathConfig = t.json : e._pathConfig = t
                    }), f.default.loadResource("config/group.json", function(t) {
                        cc.log("load group config ", t), t.json ? e._groupConfig = t.json : e._groupConfig = t
                    }), f.default.loadResource("config/groupPath.json", function(t) {
                        cc.log("load groupPath config ", t), t.json ? e._groupPathConfig = t.json : e._groupPathConfig = t
                    }), f.default.loadResource("config/fishFlock.json", function(t) {
                        cc.log("load fishFlock config ", t), t.json ? e._flockConfig = t.json : e._flockConfig = t
                    }), l.default._playview = this, this._$._locktouchScreen.active = !1, this._initNodePool(), this._showHideChildren(!1), this._initFlashAnimNodePool(), this._initComponentevent()
                }, t.prototype._showHideChildren = function(e) {
                    for (var t = this.node.children, n = 0; n < t.length; n++) t[n].active = e;
                    e && (this._showcounter ? this._$._ndCounter && (this._$._ndCounter.active = !0) : this._$._ndCounter && (this._$._ndCounter.active = !1)), this._$._locktouchScreen.active = !1, this._$._selectRoomLevel.active = !1, this._$._bossNofity.active = !1, this._$._novice.active = !1, this._$._pathDraw.active = !1, f.default.isFreePlay() || (this._$._FreePlay.active = !1), this._isShow = e
                }, t.prototype._initComponentevent = function() {
                    var e = this;
                    this._$._btnAutoFire.getComponent(cc.Toggle).node.on(cc.Node.EventType.TOUCH_END, this._onBtnAutoFireTouchEnd, this, !0), this._$._btnLockTarget.getComponent(cc.Toggle).node.on(cc.Node.EventType.TOUCH_END, this._onBtnLockTargetTouchEnd, this, !0), this._$._btnSound.getComponent(cc.Toggle).node.on(cc.Node.EventType.TOUCH_END, this._onBtnAudioTouchEnd, this, !0), this._btnPaytable.on(cc.Node.EventType.TOUCH_END, this._onBtnPayTable, this, !0), this._scrollbar.getChildByName("_bg").on(cc.Node.EventType.TOUCH_END, this._onBtnScrolbarClick, this, !0), this._scrollbarPos = this._scrollbar.position;
                    var t = this._scrollbar.getChildByName("_btnlayout"),
                        n = f.default.urlParse(),
                        o = n.nf;
                    if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
                        if (t) {
                            (s = t.getChildByName("_resize")).active = !1;
                            var i = t.getChildByName("_recall");
                            f.default.isFreePlay() ? i.active = !1 : (i.active = !0, i.on(cc.Node.EventType.TOUCH_END, this._onBtnRecallClick, this, !0));
                            var r = t.getChildByName("_btnQuit"),
                                a = t.getChildByName("_btnPromote");
                            "-2" == n.l || "-1" == n.l ? (r.active = !1, f.default.isShowReCommendGames() && (a.active = !0, a.on(cc.Node.EventType.TOUCH_END, this._onBtnRecommendGameClick, this, !0))) : r.on(cc.Node.EventType.TOUCH_END, this._onBtnQuitClick, this, !0)
                        }
                    } else if (t) {
                        var s = t.getChildByName("_resize");
                        o && 1 == o ? s.active = !1 : (s.active = !0, s.on(cc.Node.EventType.TOUCH_END, this._onBtnResizeClick, this, !0));
                        i = t.getChildByName("_recall");
                        f.default.isFreePlay() ? i.active = !1 : (i.active = !0, i.on(cc.Node.EventType.TOUCH_END, this._onBtnRecallClick, this, !0));
                        r = t.getChildByName("_btnQuit"), a = t.getChildByName("_btnPromote");
                        "-2" == n.l || "-1" == n.l ? (r.active = !1, f.default.isShowReCommendGames() && (a.active = !0, a.on(cc.Node.EventType.TOUCH_END, this._onBtnRecommendGameClick, this, !0))) : r.on(cc.Node.EventType.TOUCH_END, this._onBtnQuitClick, this, !0)
                    }
                    if (cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._keyBoardEvent, this), cc.game.on(cc.game.EVENT_SHOW, function(t) {
                            e._netConnector.socketConnector ? (e._hideStarttime = 0, e._hideStacktime = 0, e._isHideDrop = !1, e._hideDrawCount = 0) : window.location.href = "", e._$._btnSound.getComponent(cc.Toggle).isChecked || (S.default.getInstance().disableMusic(!1), S.default.getInstance().disableEffect(!1)), cc.log("emit cc.game.EVENT_SHOW!")
                        }), cc.game.on(cc.game.EVENT_HIDE, function(t) {
                            e._hideStarttime = (new Date).getTime(), S.default.getInstance().disableMusic(!0), S.default.getInstance().disableEffect(!0), cc.log("emit cc.game.EVENT_HIDE!")
                        }), f.default.isAutoSearchTable()) {
                        c = t.getChildByName("_changeroomlevel"), l = this._$._selectRoomLevel.getChildByName("_closebtn"), u = this._$._selectRoomLevel.getChildByName("_roomoption");
                        c.active = !1, u.active = !1, l.active = !1
                    } else {
                        var c, l;
                        (c = t.getChildByName("_changeroomlevel")).on(cc.Node.EventType.TOUCH_END, function(e) {
                            this._businessStorage.lockTarget = !1, this._businessStorage.lockTargetId = null, this._businessStorage.lockFishType = "", this._$._lockboard.active = !1, this._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, this.autoLockClickFindTarget, this), this._$._locktouchScreen.active = !1, this._businessStorage.autoFire = !1, this._closeLockTarget(), this._closeAutoFire(!1), this._businessStorage.autoFire = !1, this._$._selectRoomLevel.active = !0
                        }, this, !0), (l = this._$._selectRoomLevel.getChildByName("_closebtn")).on(cc.Node.EventType.TOUCH_END, function(e) {
                            this._$._selectRoomLevel.active = !1
                        }, this, !0);
                        for (var u = this._$._selectRoomLevel.getChildByName("_roomoption"), h = 0; h < p.default.consts.MAX_ROOM; h++) {
                            var d = u.getChildByName("_room" + h);
                            d.getComponent(L.default).init(this._onChangeRoomLevelClickfunction, this._userInfo.roomlevelCost, h);
                            var _ = f.default.getMyCannonCostList(this._userInfo.roomlevelCost, h),
                                g = this._currenyLabelPoole[h],
                                y = g.getComponent(M.default);
                            g.setParent(d), g.name = "room_currency_" + h, y.init(_[0].cy, _[0].rmp, _[_.length - 1].rmp), y.setSeparate("-")
                        }
                        f.default.checkAndSetFrameScale(this._$._selectRoomLevel)
                    }
                    this._$._ndGunsight.getComponent(x.default).init(), this._businessStorage.joyStickState.angle = 90
                }, t.prototype._onChangeRoomLevelClickfunction = function(e) {
                    var t = this;
                    if (l.default._playview._netConnector.socketConnector) {
                        if (l.default._playview._bingoAnim && 1 == l.default._playview._bingoAnim.active) {
                            var n = l.default._playview._bingoAnim.getComponent(D.default);
                            n && n.stop()
                        }
                        var o = e.target.getComponent(L.default),
                            i = l.default._playview;
                        l.default._playview._netConnector.socketConnector.request(p.default.pomeloRoute.leaveTable, h.default.makeWsPacket({}), function(e) {
                            if (cc.log("leaveTable res:", e), !e || e.err) cc.log("leaveTable error ", e);
                            else {
                                for (i._businessStorage.pingIntervalId && (clearInterval(i._businessStorage.pingIntervalId), i._businessStorage.pingIntervalId = null), S.default.getInstance().onDestroy(); i._ndFishPool.childrenCount > 0;) i._recycleFish(i._ndFishPool.children[0]);
                                for (t._fishesNodeCacheMap = {}, t._bulletsNodeCacheMap = {}; i._ndBulletPool.childrenCount;) {
                                    i._ndBulletPool.children[0].getComponent(m.default) && i._recycleBullet(i._ndBulletPool.children[0])
                                }
                                i._animationPause && i._animationPause.stop();
                                var n = {};
                                n[o.searchParams[0].key] = parseInt(o.searchParams[0].value), i._businessStorage.startGame = !1, i._tableSearchStorage.searchParams = n, i._tableSearchStorage.startSearch = !0, i._tableSearchStorage.doSearching = !0, i._tableSearchStorage.changeRoom = !0, i._onBtnScrolbarClick(null)
                            }
                        })
                    }
                }, t.prototype._onBtnQuitClick = function(e) {
                    S.default.getInstance().playBtnEffect(), "-1" != f.default.urlParse().l && O.default.showAskLogOut(), e.target.runAction(cc.sequence(cc.scaleTo(.05, .9), cc.scaleTo(.05, 1)))
                }, t.prototype._onBtnRecommendGameClick = function(e) {
                    S.default.getInstance().playBtnEffect(), f.default.isShowReCommendGames() && O.default.showRecommendGame(), e.target.runAction(cc.sequence(cc.scaleTo(.05, .9), cc.scaleTo(.05, 1)))
                }, t.prototype._onBtnScrolbarClick = function(e) {
                    var t = this;
                    if (!this._scrollAction) {
                        this.closeNoviceTeaching();
                        for (var n = 0, o = (this._scrollbar.position, this._scrollbar.getChildByName("_btnlayout")), i = this._scrollbar.getChildByName("_bg").getChildByName("_arrow"), r = o.children, a = 0; a < r.length; a++) n += r[a].active ? 1 : 0;
                        this._scrollAction = !0, this._scrollState ? this._scrollbar.runAction(cc.sequence(cc.moveTo(.2, cc.v2(this._scrollbarPos.x, this._scrollbarPos.y)), cc.callFunc(function() {
                            t._scrollAction = !1, t._scrollState = !1, i.getComponent(cc.Sprite).spriteFrame = t.uiAtlas.getSpriteFrame("board_out")
                        }))) : this._scrollbar.runAction(cc.sequence(cc.moveTo(.2, cc.v2(this._scrollbarPos.x - 100 * n - 10, this._scrollbarPos.y)), cc.callFunc(function() {
                            t._scrollAction = !1, t._scrollState = !0, i.getComponent(cc.Sprite).spriteFrame = t.uiAtlas.getSpriteFrame("board_in")
                        }))), S.default.getInstance().playBtnEffect()
                    }
                }, t.prototype._onBtnResizeClick = function(e) {
                    cc.screen.requestFullScreen(), cc.screen.fullScreen ? cc.screen.exitFullScreen() : cc.screen.requestFullScreen(), S.default.getInstance().playBtnEffect()
                }, t.prototype._onBtnRecallClick = function(e) {
                    var t = this;
                    if (S.default.getInstance().playBtnEffect(), this._netConnector.socketConnector) {
                        var n = this;
                        this._netConnector.socketConnector.request(p.default.pomeloRoute.gameRecall, h.default.makeWsPacket({}), function(e) {
                            cc.log("recall res:", e), !e || e.err ? cc.log("gameRecall error ", e) : (t._businessStorage.recallQueue = e.msg.records, t._businessStorage.recallCallBack = n.getRecallUrl, t._businessStorage.showRecall = !0)
                        })
                    }
                }, t.prototype.getRecallUrl = function(e) {
                    var t = e.target.getComponent(E.default);
                    if (t) {
                        var n = f.default.urlParse(),
                            o = t.getTransactionId();
                        if (l.default._playview._netConnector.socketConnector) {
                            l.default._playview._netConnector.socketConnector.request(p.default.pomeloRoute.gameRecallUrl, h.default.makeWsPacket({
                                tid: o
                            }), function(e) {
                                !e || e.err ? cc.log("gameRecallURL error ", e) : U.default.getInstance().disPatchEvent(U.default.EVENT_OPEN, e.msg.url + "&loc=" + n.loc)
                            })
                        }
                    }
                }, t.prototype._disConnet = function() {
                    this._netConnector.socketConnector.disconnect(), this._netConnector.socketConnector = null, cc.log("emit cc.game.EVENT_HIDE! socketConnector close!")
                }, t.prototype._onHideUpdate = function(e) {
                    var t = this;
                    Object.keys(this._fishesNodeCacheMap).forEach(function(n) {
                        var o = t._fishesNodeCacheMap[n];
                        if (o) {
                            var i = o.getComponent(v.default);
                            i && i.update(e)
                        }
                    }), Object.keys(this._bulletsNodeCacheMap).forEach(function(n) {
                        var o = t._bulletsNodeCacheMap[n];
                        if (o) {
                            var i = o.getComponent(m.default);
                            i && i.update(e)
                        }
                    }), this.update(e)
                }, t.prototype._onHideStackTime = function(e) {
                    this._hideStacktime += e, this._hideStacktime > n.HIDE_WAIT_TIME && (this._disConnet(), l.default._playview = null)
                }, t.prototype._onBtnPayTable = function(e) {
                    var t = this;
                    e.target.runAction(cc.sequence(cc.scaleTo(.05, .8), cc.scaleTo(.05, 1))), this.closeNoviceTeaching(), this._netConnector.socketConnector && !this._paytableStorage.isOpen && (this._paytableStorage.payData = null, this._paytableStorage.isOpen = !this._paytableStorage.isOpen, this._netConnector.socketConnector.request(p.default.pomeloRoute.fetchFishInfo, h.default.makeWsPacket({}), function(e) {
                        !e || e.err ? t._paytableStorage.isOpen = !1 : 200 == e.code ? (t._paytableStorage.payData = e.data, t._paytableStorage.pageIdx = 1, S.default.getInstance().playPayTablePopUp()) : t._paytableStorage.isOpen = !1
                    }))
                }, t.prototype._keyBoardEvent = function(e) {
                    if (e.keyCode == cc.macro.KEY.space) {
                        if (this._businessStorage.autoFire || this._businessStorage.lockTarget) return;
                        var t = (new Date).getTime();
                        if (t - this._spaceShootDelay < p.default.consts.SPACE_SHOOT_DELAY) return;
                        this._sendFireRequest(), this._spaceShootDelay = t
                    } else 189 == e.keyCode || e.keyCode == cc.macro.KEY["-"] || e.keyCode == cc.macro.KEY.down ? this._sendCannonUpdateRequest(!1) : 187 == e.keyCode || e.keyCode == cc.macro.KEY["+"] || e.keyCode == cc.macro.KEY.up ? this._sendCannonUpdateRequest(!0) : e.keyCode == cc.macro.KEY.left ? this._updateSelfCannAngleByKeyBoard(-n.KEYBOARD_CANNANGLE) : e.keyCode == cc.macro.KEY.right && this._updateSelfCannAngleByKeyBoard(n.KEYBOARD_CANNANGLE)
                }, t.prototype._updateSelfCannAngleByKeyBoard = function(e) {
                    if (!(this._selfCannonIdx < 0 || this._businessStorage.joyStickState.direction != y.Direction.IDLE)) {
                        var t = this._businessStorage.joyStickState.angle + e;
                        t >= 0 && t <= 180 && (this._updateAngleNoFire = !0, this._businessStorage.joyStickState.angle += e, this._businessStorage.joyStickState.direction = y.Joystick.GetDirctionByAngle(this._businessStorage.joyStickState.angle))
                    }
                }, t.prototype._initPauseAnimNode = function() {
                    var e = cc.instantiate(this.pfbPause);
                    this._animationPause = e.getComponent(P.default), e.setParent(this._$._ndFishpond)
                }, t.prototype._initFlashAnimNodePool = function() {
                    var e = this;
                    for (var t = 0; t < 15; t++) {
                        var n = cc.instantiate(this.pfbFlash);
                        n.getComponent(w.default).init(function(t) {
                            e._recycleAnimFlashIns(t)
                        }), this._animFlashPool.put(n)
                    }
                }, t.prototype._getAnimFlashNodeIns = function() {
                    return this._animFlashPool.get()
                }, t.prototype._recycleAnimFlashIns = function(e) {
                    this._animFlashPool.put(e)
                }, t.prototype._initNodePool = function() {
                    var e = this;
                    for (var t = 0; t < 100; t++) this._fishInsPool.put(cc.instantiate(this.pfbFish));
                    for (var n = 0; n < 100; n++) this._bulletInsPool.put(cc.instantiate(this.pfbBullet));
                    for (var o = 0; o < 40; o++) {
                        (s = cc.instantiate(this.pfbAnimCoin)).getComponent(b.default).init(function(t) {
                            e._recycleAnimCoin(t)
                        }), this._animCoinPool.put(s)
                    }
                    for (var i = 0; i < 80; i++) {
                        (s = cc.instantiate(this.pfbAnimOnlyCoin)).getComponent(N.default).init(function(t) {
                            e._recycleAnimOnlyCoin(t)
                        }), this._animOnlyCoin.put(s)
                    }
                    for (var r = 0; r < 20; r++) {
                        (s = cc.instantiate(this.pfbAnimBonus)).getComponent(k.default).init(function(t) {
                            e._recycleAnimBonus(t)
                        }), this._animBonusPool.put(s)
                    }
                    for (var a = 0; a < 24; a++) {
                        var s;
                        (s = cc.instantiate(this.pfbGunFire)).getComponent(C.default).init(function(t) {
                            e._recycleGunFireAnim(t)
                        }), this._gunFirePool.put(s)
                    }
                    for (var c = 0; c < p.default.consts.MAX_ROOM; c++) this._currenyLabelPoole.push(cc.instantiate(this.pfbCurrencyLabel));
                    this._bingoAnim = cc.instantiate(this.pfbBingo), this._bingoAnim.active = !1
                }, t.prototype._getAnimOnlyCoinIns = function() {
                    var e = this;
                    if (this._animOnlyCoin.size() > 0) return this._animOnlyCoin.get();
                    var t = cc.instantiate(this.pfbAnimOnlyCoin);
                    return t.getComponent(N.default).init(function(t) {
                        e._recycleAnimOnlyCoin(t)
                    }), t
                }, t.prototype._recycleAnimOnlyCoin = function(e) {
                    this._animOnlyCoin.put(e)
                }, t.prototype._getAnimBonusIns = function() {
                    var e = this;
                    if (this._animBonusPool.size() > 0) return this._animBonusPool.get();
                    var t = cc.instantiate(this.pfbAnimBonus);
                    return t.getComponent(k.default).init(function(t) {
                        e._recycleAnimBonus(t)
                    }), t
                }, t.prototype._recycleAnimBonus = function(e) {
                    this._animBonusPool.put(e)
                }, t.prototype._getAnimCoinIns = function() {
                    var e = this;
                    if (this._animCoinPool.size() > 0) return this._animCoinPool.get();
                    var t = cc.instantiate(this.pfbAnimCoin);
                    return t.getComponent(b.default).init(function(t) {
                        e._recycleAnimCoin(t)
                    }), t
                }, t.prototype._recycleAnimCoin = function(e) {
                    this._animCoinPool.put(e)
                }, t.prototype._getGunFireAnimIns = function() {
                    var e = this;
                    if (this._gunFirePool.size() > 0) return this._gunFirePool.get();
                    var t = cc.instantiate(this.pfbGunFire);
                    return t.getComponent(C.default).init(function(t) {
                        e._recycleGunFireAnim(t)
                    }), t
                }, t.prototype._recycleGunFireAnim = function(e) {
                    this._gunFirePool.put(e)
                }, t.prototype._getBulletIns = function() {
                    return this._bulletInsPool.size() > 0 ? this._bulletInsPool.get() : cc.instantiate(this.pfbBullet)
                }, t.prototype._recycleBullet = function(e) {
                    this._bulletInsPool.put(e)
                }, t.prototype._getFishIns = function() {
                    return this._fishInsPool.size() > 0 ? this._fishInsPool.get() : cc.instantiate(this.pfbFish)
                }, t.prototype._recycleFish = function(e) {
                    this._fishInsPool.put(e)
                }, t.prototype._insertFishNodeCacheMap = function(e, t) {
                    this._fishesNodeCacheMap[e] = t
                }, t.prototype._removeFishNodeCacheMap = function(e) {
                    this._fishesNodeCacheMap[e] && delete this._fishesNodeCacheMap[e]
                }, t.prototype._getFishNodeCacheMap = function(e) {
                    return this._fishesNodeCacheMap[e ? e.toString() : e]
                }, t.prototype._findBiggestFish = function() {
                    var e = 0,
                        t = 0;
                    if (this._businessStorage.battleBoss) {
                        for (var n in e = 100, this._fishesNodeCacheMap) this._fishesNodeCacheMap[n].score > e && (t = this._fishesNodeCacheMap[n].getId());
                        if (0 == t)
                            for (var n in e = 0, this._fishesNodeCacheMap) this._fishesNodeCacheMap[n].score > e && (t = this._fishesNodeCacheMap[n].getId(), e = this._fishesNodeCacheMap[n].score)
                    } else
                        for (var n in this._fishesNodeCacheMap) !this._fishesNodeCacheMap[n].isOnStage() || this._fishesNodeCacheMap[n].score < e || this._fishesNodeCacheMap[n].score > e && (e = this._fishesNodeCacheMap[n].score, t = this._fishesNodeCacheMap[n].getId());
                    return t
                }, t.prototype._findTargetFish = function() {
                    if (this._businessStorage && this._businessStorage.lockTarget && this._businessStorage.lockFishType)
                        for (var e in this._fishesNodeCacheMap)
                            if (this._fishesNodeCacheMap[e].getFishType() == this._businessStorage.lockFishType && this._fishesNodeCacheMap[e].isOnStage() && !this._fishesNodeCacheMap[e].isDie()) return this._fishesNodeCacheMap[e];
                    return null
                }, t.prototype._insertBulletNodeCacheMap = function(e, t) {
                    this._bulletsNodeCacheMap[e] = t
                }, t.prototype._removeBulletNodeCacheMap = function(e) {
                    this._bulletsNodeCacheMap[e] && delete this._bulletsNodeCacheMap[e]
                }, t.prototype._getBulletNodeCacheMap = function(e) {
                    return this._bulletsNodeCacheMap[e]
                }, t.prototype._adjustScreenJoyStick = function(e) {
                    if (e) {
                        var t = this._$._ndScreenCtrl,
                            n = e.getParent().convertToWorldSpaceAR(e.position);
                        n = t.convertToNodeSpaceAR(n), t.bg.position = n
                    }
                }, t.prototype._adjustCannonShiftBtns = function(e) {
                    if (e) {
                        var t = this._$._ndShift;
                        if (!t) return;
                        var n = e.position,
                            o = e.getParent().convertToWorldSpaceAR(cc.v2(n.x, n.y - 90));
                        o = t.getParent().convertToNodeSpaceAR(o), t.position = o, t.active = !0
                    }
                }, t.prototype._getSelfChairId = function() {
                    if (this._userInfo)
                        for (var e = this._businessStorage.tableInfo.chairIds, t = 0; t < e.length; t++)
                            if (e[t] == this._userInfo.playerId) return t;
                    return -1
                }, t.prototype.onJoyStickMove = function(e) {
                    this._businessStorage && (this._businessStorage.joyStickState.direction = e.newDir, this._businessStorage.joyStickState.angle = e.angle)
                }, t.prototype.spawnBullet = function(e) {
                    var t = this;
                    if (this._ndBulletPool && this._businessStorage && !(this._businessStorage.bulletQueueLen() <= 0)) {
                        var n = this._businessStorage.popBullet(),
                            o = 0,
                            i = this._getSelfChairId();
                        i > 1 && (o = 2);
                        for (var r = function() {
                                var e = n.chairId,
                                    r = n.playerId == a._userInfo.playerId;
                                if (e < 0) return {
                                    value: void 0
                                };
                                if (a._$._bossNofity.active) return {
                                    value: void 0
                                };
                                var s = n.angle,
                                    c = (e + o) % 4;
                                i == e || a._businessStorage.Robot || (s >= 0 ? a._ndBarrels[c].angle = 0 != s ? -(s - 90) : -s : (s = s < 0 && s >= -90 ? 0 : 180, a._ndBarrels[c].angle = -(s - 90)));
                                var l = "bullet_" + (e + 1),
                                    u = a._bulletConfig[l].small;
                                2 == n.cannonskin ? u = a._bulletConfig[l].mid : 3 == n.cannonskin && (u = a._bulletConfig[l].big);
                                var h = a._getBulletIns(),
                                    p = h.getComponent(m.default);
                                p || cc.log("bullet is null");
                                var d = cc.v2(a._ndBarrels[c].muzzle.position.x, a._ndBarrels[c].muzzle.position.y),
                                    _ = a._ndBarrels[c].convertToWorldSpaceAR(d);
                                _ = a._ndBulletPool.convertToNodeSpaceAR(_), (s = n.angle) < 0 ? s = s >= -90 ? 0 : 180 : 0 == s && (s = 90), c <= 1 ? (p.setFrameRate(a._frameRateTime), p.init(n.bulletId, _, s, 1600, u, n.lockTargetId, r, function(e) {
                                    var n = e.getComponent(m.default);
                                    t._removeBulletNodeCacheMap(n.getId()), t._recycleBullet(e)
                                }, function(e) {
                                    t._businessStorage && t._businessStorage.pushCollider({
                                        bid: e.bullet.tag,
                                        fid: e.fish.tag
                                    })
                                })) : (p.setFrameRate(a._frameRateTime), p.init(n.bulletId, _, s - 180, 1600, u, n.lockTargetId, r, function(e) {
                                    t._removeBulletNodeCacheMap(p.getId()), t._recycleBullet(e)
                                }, function(e) {
                                    t._businessStorage && t._businessStorage.pushCollider({
                                        bid: e.bullet.tag,
                                        fid: e.fish.tag
                                    })
                                })), S.default.getInstance().playCastEffect(), a._insertBulletNodeCacheMap(n.bulletId, p), h.setParent(a._ndBulletPool), n = a._businessStorage.popBullet();
                                var g = a._getGunFireAnimIns();
                                g && (g.setParent(a._ndBarrels[c].muzzle), g.getComponent(C.default).playAnimation());
                                var y = -a._ndBarrels[c].angle,
                                    v = a._ndBarrels[c].position;
                                y = f.default.DegreesToRadians(y + 90);
                                var b = 8 * Math.cos(y);
                                b = Math.ceil(b), b = Math.abs(b);
                                var w = 8 * Math.sin(y);
                                w = Math.ceil(w), w = Math.abs(w), a._ndBarrels[c].runAction(cc.sequence(cc.scaleTo(.1, 1, .9), cc.scaleTo(.1, 1, 1), cc.callFunc(function() {
                                    t._ndBarrels[c].position = v
                                })))
                            }, a = this; n;) {
                            var s = r();
                            if ("object" == typeof s) return s.value
                        }
                    }
                }, t.prototype.fireHandle = function(e, t) {
                    if (this._tableSearchStorage.tableInfo && this._businessStorage.startGame && (this._businessStorage.joyStickState.direction != y.Direction.IDLE || this._businessStorage.autoFire)) {
                        if (this._updateAngleNoFire) return this._updateAngleNoFire = !1, void(this._businessStorage.joyStickState.direction = y.Direction.IDLE);
                        this._spaceShootDelay = (new Date).getTime(), this._spaceShootDelay - this._shootDelay < p.default.consts.SHOOT_DELAY || (this._shootDelay = this._spaceShootDelay, this._sendFireRequest())
                    }
                }, t.prototype._sendFireRequest = function() {
                    var e = this;
                    if (!O.default.isShow() && !(this._$._bossNofity.active || this._tideStopFire && this._businessStorage.lockTarget)) {
                        this.closeNoviceTeaching();
                        for (var t = null, n = this._businessStorage.areaPlayers, o = 0; o < n.length; o++)
                            if (this._userInfo.playerId == n[o].playerId) {
                                t = n[o];
                                break
                            } if (t) {
                            if (this._netConnector.socketConnector) {
                                var i = this;
                                this._netConnector.socketConnector.request(p.default.pomeloRoute.onFire, h.default.makeWsPacket({
                                    angle: this._businessStorage.joyStickState.angle,
                                    lockId: this._businessStorage.lockTargetId,
                                    cannonlevel: t.cannonLevel
                                }), function(t) {
                                    if (!t || t.err) cc.log("onFire error ", t), e._businessStorage.autoFire = !1, e._closeAutoFire(!1);
                                    else if (200 == t.code) {
                                        if (e._ping.updateDelayTime(), t.data) {
                                            S.default.getInstance().playGunFire(t.data.cannonskin);
                                            var n = F.default.getRealMoney(F.default.convertCentsToCredits(t.data.balance));
                                            e._userInfo.gold = n.rmp
                                        }
                                    } else {
                                        if (200 != t.code && 217 != t.code && 216 != t.code) return void O.default.showMsg(t.code);
                                        if (216 == t.code)(o = i._$._btnLockTarget.getComponent(cc.Toggle)) && o.uncheck(), e._businessStorage.lockTarget = !1, e._businessStorage.lockTargetId = null, e._businessStorage.lockFishType = "", e._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, e), e._$._locktouchScreen.active = !1, e._businessStorage.autoFire = !1, e._closeAutoFire(!1), e._closeLockTarget(), O.default.showMsg(t.code.toString());
                                        if (217 == t.code) e._shootDelay = -.9;
                                        else {
                                            if (e._businessStorage.Robot) return;
                                            var o;
                                            e._businessStorage.autoFire = !1, (o = e._$._btnAutoFire.getComponent(cc.Toggle)) && o.uncheck()
                                        }
                                    }
                                })
                            }++this._fireRequestCount
                        }
                    }
                }, t.prototype.updateSelfCannonAngle = function() {
                    if (!(this._selfCannonIdx < 0))
                        if (this._businessStorage && !this._businessStorage.Robot) {
                            if (this._businessStorage.joyStickState.direction != y.Direction.IDLE || this._businessStorage.autoFire || this._businessStorage.lockTarget) {
                                var e = this._businessStorage.joyStickState.angle;
                                e >= 0 ? this._ndBarrels[this._selfCannonIdx].angle = 0 == e ? 0 : -(e - 90) : (e = e < 0 && e >= -90 ? 0 : 180, this._ndBarrels[this._selfCannonIdx].angle = -(e - 90))
                            }
                        } else this._ndBarrels[this._selfCannonIdx].angle = -this._businessStorage.joyStickState.angle
                }, t.prototype.spawnFish = function(e) {
                    var t = this;
                    if (this._ndFishPool) {
                        var n = this._businessStorage.popFishes();
                        if (!(!this._businessStorage || n.length <= 0 || this._$._bossNofity.active))
                            for (var o, i = function(e) {
                                    var i = n[e];
                                    if (i.state == p.default.consts.SOLO) {
                                        var a = i.type,
                                            s = i.path,
                                            c = i.amount * i.score;
                                        if (!r._fishConfig[a]) return cc.log("Not find Config.consts.SOLO fishConfig type=", a), {
                                            value: void 0
                                        };
                                        var l = (x = r._getFishIns()).getComponent(v.default);
                                        o = r._pathConfig[s], l.init(s, i.state, i.id, r._fishConfig[a], o, i.alive, cc.v2(0, 0), c, !1, null, function(e) {
                                            t._removeFishNodeCacheMap(l.getId()), t._recycleFish(e)
                                        }), l.setFishContainer(r._ndFishPool), r._insertFishNodeCacheMap(i.id, l), x.setParent(r._ndFishPool), "Fish_01" == a && S.default.getInstance().playFreezeBomEnter()
                                    } else if (i.state == p.default.consts.GROUP) {
                                        var u = r._groupConfig[i.group],
                                            h = Object.keys(u);
                                        0;
                                        for (var f = 0, d = 0; d < h.length; d++)
                                            for (var _ = u[h[d]].points, g = u[h[d]].anim.repeat, y = u[h[d]].anim.rate, m = u[h[d]].anim.duration || 30, b = u[h[d]].anim.interval * (i.alive / m), C = u[h[d]].anim.mode, w = u[h[d]].anim.direction, P = 0, R = u[h[d]].anim.fristDelay ? u[h[d]].anim.fristDelay : 0, O = 0; O < g; O++) {
                                                P = O;
                                                for (var T = function(e) {
                                                        var n = i.fishes[f].path,
                                                            o = i.fishes[f].amount * i.fishes[f].score,
                                                            a = r._getFishIns(),
                                                            s = a.getComponent(v.default),
                                                            c = i.fishes[f].type;
                                                        s.init(n, i.state, i.fishes[f].id, r._fishConfig[c], r._groupPathConfig[n], i.alive, cc.v2(_[e].x * O, _[e].y), o, !0, i.group, function(e) {
                                                            t._removeFishNodeCacheMap(s.getId()), t._recycleFish(e)
                                                        }), s.setFishContainer(r._ndFishPool), s.setRate(y), s.setMode(C), w ? s.setDelay(R + P * b) : s.setDelay((O + 1) * b), r._insertFishNodeCacheMap(i.fishes[f].id, s), a.setParent(r._ndFishPool), ++f
                                                    }, A = 0; A < _.length; A++) T(A)
                                            }
                                    } else if (i.state == p.default.consts.TEAM) {
                                        a = i.type, s = i.path, c = i.amount * i.score;
                                        if (!r._fishConfig[a]) return cc.log("Not find Config.consts.TEAM fishConfig type=", a), {
                                            value: void 0
                                        };
                                        var F = (x = r._getFishIns()).getComponent(v.default);
                                        F.init(s, i.state, i.id, r._fishConfig[a], r._pathConfig[s], i.alive, cc.v2(0, 0), c, !1, null, function(e) {
                                            t._removeFishNodeCacheMap(F.getId()), t._recycleFish(e)
                                        }), F.setFishContainer(r._ndFishPool), F.setBackground(r._fishConfig.Fish_team, p.default.consts.FISH_LUCKY_AURA), r._insertFishNodeCacheMap(i.id, F), x.setParent(r._ndFishPool)
                                    } else if (i.state == p.default.consts.BOMB) {
                                        a = i.type, s = i.path, c = i.amount * i.score;
                                        if (!r._fishConfig[a]) return cc.log("Not find Config.consts.BOMB fishConfig type=", a), {
                                            value: void 0
                                        };
                                        var I = (x = r._getFishIns()).getComponent(v.default);
                                        I.init(s, i.state, i.id, r._fishConfig[a], r._pathConfig[s], i.alive, cc.v2(0, 0), c, !1, null, function(e) {
                                            t._removeFishNodeCacheMap(I.getId()), t._recycleFish(e)
                                        }), I.setFishContainer(r._ndFishPool), I.setBackground(r._fishConfig.Fish_same, p.default.consts.FISH_LIGHTING_BOMB), r._insertFishNodeCacheMap(i.id, I), x.setParent(r._ndFishPool), S.default.getInstance().playLightningEnter()
                                    } else if (i.state == p.default.consts.FLOCK) {
                                        var k = i.path.split("|");
                                        if (2 != k.length) return "continue";
                                        a = i.type, c = i.amount * i.score, s = k[1];
                                        var N = k[0],
                                            E = r._flockConfig[N],
                                            B = (h = Object.keys(E), []);
                                        for (O = 0; O < h.length; O++)
                                            for (var L = 0; L < E[h[O]].anim.repeat; L++) B = B.concat(E[h[O]].points);
                                        var x, M = (x = r._getFishIns()).getComponent(v.default);
                                        M.init(s, i.state, i.id, r._fishConfig[a], r._groupPathConfig[s], i.alive, B[i.index], c, !1, null, function(e) {
                                            t._removeFishNodeCacheMap(M.getId()), t._recycleFish(e)
                                        }), M.setFishContainer(r._ndFishPool), r._insertFishNodeCacheMap(i.id, M), x.setParent(r._ndFishPool)
                                    }
                                }, r = this, a = 0; a < n.length; a++) {
                                var s = i(a);
                                if ("object" == typeof s) return s.value
                            }
                    }
                }, t.prototype.onColliderHandle = function(e) {
                    if (this._businessStorage && !(this._businessStorage.colliderQueueLen() <= 0)) {
                        for (var t = this._businessStorage.popAllCollider(), n = 0; n < t.length; n++) {
                            var o = this._getBulletNodeCacheMap(t[n].bid);
                            if (o) {
                                var i = o;
                                t[n].success && i && i.doBomb()
                            }
                        }
                        var r = this._businessStorage.areaPlayers;
                        if (p.default.mock) {
                            for (var a = 0; a < t.length; a++) t[a].success = Math.random() < .5, t[a].success ? t[a].die = !0 : t[a].die = !1, t[a].gold = 60;
                            p.default.mockNetEvent.emit(p.default.pomeloPushRoute.onColliderResult, {
                                msg: t
                            })
                        } else {
                            if (!this._netConnector || !this._netConnector.socketConnector) return;
                            S.default.getInstance().playHit();
                            for (var s = null, c = 0; c < r.length; c++)
                                if (this._userInfo.playerId == r[c].playerId) {
                                    s = r[c];
                                    break
                                } if (!s) return;
                            var l = [];
                            for (c = 0; c < t.length; c++) m.default.isUniqueBulletId(t[c]) && (t[c].creditBet = this._userInfo.rmpcannonCost[s.cannonLevel], t[c].denom = F.default.walletInfo.currentDenomination, t[c].currency = f.default.getUrlParam("cr"), l.push(t[c]));
                            this._netConnector.socketConnector.request(p.default.pomeloRoute.onCollider, h.default.makeWsPacket(l), null)
                        }
                    }
                }, t.prototype.onColliderResultHandle = function(e) {
                    if (this._businessStorage && !(this._businessStorage.colliderResultQueueLen() <= 0)) {
                        var t = this._businessStorage.popAllColliderResult();
                        if (!this._$._bossNofity.active)
                            for (var n = 0; n < t.length; n++) {
                                for (var o = 0; o < t[n].diefids.length; o++) {
                                    var i = this._getFishNodeCacheMap(t[n].diefids[o]);
                                    if (i) {
                                        var r = i;
                                        if (r && r.node && r.node.getParent()) {
                                            if (t[n].winscore[o]) {
                                                R.default.convertToCps(t[n].winscore[o], this._walletStorage.currentDenomination);
                                                this._playScreenGoldAnim(r, t[n].fishscore[o], t[n].ftypes, t[n].chairId, t[n].score, t[n].cannonlevel)
                                            }
                                            if (r.doDie(), r.hasLuckyAura() && S.default.getInstance().playAura(), r.getFishType() <= "Fish_07" && "Fish_01" != r.getFishType()) {
                                                var a = 4;
                                                r.getFishType() >= "Fish_02" && r.getFishType() >= "Fish_05" && (a = 8), this._playHitEffect(r, t[n].chairId, a, !0), S.default.getInstance().playWin(!0), this.runShake(30)
                                            } else {
                                                if (t[n].pause && t[n].pause.length > 0) continue;
                                                if (t[n].typeBombs && t[n].typeBombs.length > 0) continue;
                                                this._playHitEffect(r, t[n].chairId, r.hasLuckyAura() ? 4 : 2, !!r.hasLuckyAura()), this.runShake(r.hasLuckyAura() ? 30 : 4)
                                            }
                                        }
                                    } else if (!i) return void cc.log("no fish cache ", t[n].diefids[o])
                                }
                                if (t[n].typeBombs && t[n].typeBombs.length > 0 && (S.default.getInstance().playLightning(), this._playTypeBombAnim(t[n].typeBombs, t[n].chairId), this.runShake(60)), t[n].pause && t[n].pause.length > 0) {
                                    if (!t[n].pauseTime || 0 == t[n].pauseTime) return;
                                    S.default.getInstance().playFreezeBomb(), this._pauseScreenFish(t[n].pauseTime), this.runShake(60)
                                }
                            }
                    }
                }, t.prototype._playHitEffect = function(e, t, n, o) {
                    var i = this._getAnimBonusIns();
                    i.setParent(this._$._ndCoinPool);
                    var r = e.node.getParent().convertToWorldSpaceAR(e.node.position);
                    if (i) {
                        var a = i.getComponent(k.default);
                        a && (o ? a.playBigHitEffect(r, e) : a.playHitEffect(r, e))
                    }
                    var s = 0;
                    this._getSelfChairId() > 1 && (s = 2);
                    this._businessStorage.tableInfo.chairIds;
                    for (var c = (t + s) % 4, l = this._ndCannons[c].getParent().convertToWorldSpaceAR(this._ndCannons[c].position), u = 0; u < n; u++) {
                        var h = this._getAnimOnlyCoinIns();
                        h.setParent(this._$._ndCoinPool);
                        var p = h.getComponent(N.default);
                        p.playAnimation(r), p.jumpAndMoveToTarget(l, u)
                    }
                }, t.prototype._playTypeBombAnim = function(e, t) {
                    var n = this;
                    if (0 != e.length) {
                        var o = this._getFishNodeCacheMap(e[0]);
                        if (o)
                            for (var i = o.node.getParent().convertToWorldSpaceAR(o.node.position), r = 1; r < e.length; r++) {
                                if (o = this._getFishNodeCacheMap(e[r])) {
                                    var a = o.node.getParent().convertToWorldSpaceAR(o.node.position),
                                        s = this._getAnimFlashNodeIns();
                                    if (s) s.setParent(this._$._ndTouchScreen), s.getComponent(w.default).playAnimation(i, a)
                                }
                                this._playHitEffect(o, t, 2, !1)
                            }
                        this._$._ndFishpond.stopAllActions(), this._$._ndFishpond.runAction(cc.sequence(cc.repeat(cc.sequence(cc.moveTo(.05, cc.v2(-5, 5)), cc.moveTo(.05, cc.v2(-5, -5)), cc.moveTo(.05, cc.v2(5, 5)), cc.moveTo(.05, cc.v2(5, -5))), 3), cc.callFunc(function() {
                            n._$._ndFishpond.position = cc.v2(0, 0)
                        })))
                    }
                }, t.prototype._pauseScreenFish = function(e) {
                    var t = this._ndFishPool.children;
                    e /= 1e3;
                    for (var n = 0; n < t.length; n++) {
                        t[n].getComponent(v.default).doPause(e)
                    }
                    this._animationPause && this._animationPause.playAnimation(e)
                }, t.prototype._getAnimCoinType = function(e, t) {
                    for (var n = 0, o = 0; o < t.length; o++) {
                        var i = t[o].split("|");
                        0 != i.length && ("Fish_any" != (i = i[0]) ? i < "Fish_19" ? n < 0 && (n = 0) : i < "Fish_14" ? n < 1 && (n = 1) : n < 2 && (n = 2) : n = 2)
                    }
                    var r = 0;
                    if (0 == n) {
                        var a = e / 10;
                        a = Math.ceil(a), a %= 4
                    } else if (1 == n) {
                        var s = e / 50;
                        s = Math.ceil(s), s %= 4
                    } else {
                        var c = e / 100;
                        c = Math.ceil(c), c %= 4
                    }
                    0 == r && (r = 1);
                    return {
                        type: ["coin_1", "coin_5", "coin_10"][n],
                        count: r
                    }
                }, t.prototype._isShowGoldPlate = function(e) {
                    for (var t = !1, n = 0; n < e.length; n++) {
                        var o = e[n].split("|");
                        if (2 == o.length) {
                            (o = o[0])[1];
                            if (o <= "Fish_07" ? S.default.getInstance().playCoinEffect(2) : o >= "Fish_08" && o <= "Fish_16" ? S.default.getInstance().playCoinEffect(1) : S.default.getInstance().playCoinEffect(0), o < "Fish_08") {
                                t = !0;
                                break
                            }
                        }
                    }
                    return t
                }, t.prototype._playScreenGoldAnim = function(e, t, n, o, i, r) {
                    var a = e.node.getParent().convertToWorldSpaceAR(e.node.position),
                        s = 0;
                    this._getSelfChairId() > 1 && (s = 2);
                    var c = (o + s) % 4,
                        l = this._ndCannons[c],
                        u = F.default.getRealAmountByOtherCannonLevel(t, this._userInfo.rmpcannonCost, r),
                        h = this._getAnimCoinType(u, n);
                    if (!e.hasLuckyAura())
                        for (var p = 0; p < h.count; p++) {
                            var f = this._getAnimCoinIns();
                            if (f) {
                                var d = f.getComponent(b.default);
                                f.setParent(this._$._ndTouchScreen), 0 == p ? d.playAnimation(a, h.type, u) : d.playAnimation(a, h.type, 0), d.moveToTarge(l.getParent().convertToWorldSpaceAR(l.position))
                            }
                        }
                    if (this._isShowGoldPlate(n) || e.isShowBingo()) {
                        var _ = cc.v2(l.x, l.y);
                        if ("_ndLbCannon" == l.name ? (_.x -= 50, _.y -= 40) : "_ndRbCannon" == l.name ? (_.x -= 65, _.y -= 10) : "_ndLtCannon" == l.name ? (_.x -= 30, _.y -= l.y) : "_ndRtCannon" == l.name && (_.x += 30, _.y -= l.y), _ = l.getParent().convertToWorldSpaceAR(_), this._bingoAnim) {
                            this._bingoAnim.setParent(this._$._ndTouchScreen), this._bingoAnim.zIndex = 99;
                            var g = this._bingoAnim.getComponent(D.default),
                                y = F.default.getRealAmountByOtherCannonLevel(i, this._userInfo.rmpcannonCost, r);
                            g.play(_, y)
                        }
                    }
                }, t.prototype.onRefundHandle = function() {
                    if (this._businessStorage && !(this._businessStorage.BulletsRefundQueueLen() <= 0))
                        for (var e = this._businessStorage.popAllBulletsRefund(), t = 0; t < e.length; t++) {
                            var n = this._getBulletNodeCacheMap(e[t].bulletId);
                            if (n) n.node.getComponent(m.default).refund()
                        }
                }, t.prototype.showHide = function() {
                    if (this._businessStorage && this._businessStorage.startGame) {
                        if (this._isShow) return;
                        this._tableSearchStorage && (this._tableSearchStorage.doSearching = !1), this._showHideChildren(!0), this.startGame()
                    } else {
                        if (!this._isShow) return;
                        S.default.getInstance().stopMusic(), this._showHideChildren(!1)
                    }
                }, t.prototype._sendCannonUpdateRequest = function(e) {
                    if (this._netConnector.socketConnector) {
                        var t = this;
                        this._netConnector.socketConnector.request(p.default.pomeloRoute.onUpdateCannon, h.default.makeWsPacket({
                            upgrade: e
                        }), function(e) {
                            !e || e.err ? cc.log("onUpdateCannon error ", e) : 200 == e.code && S.default.getInstance().playCannonSwitchEffect(e.data.areaPlayer.cannonLevel, t._userInfo.rmpcannonCost.length)
                        })
                    }
                }, t.prototype._sendLockTargetRequest = function(e) {
                    this._netConnector.socketConnector && this._netConnector.socketConnector.request(p.default.pomeloRoute.onLockTarget, h.default.makeWsPacket({
                        lock: e
                    }), function(e) {
                        !e || e.err ? cc.log("sendLockTargetRequest error ", e) : (cc.log("sendLockTargetRequest ", e), e.code)
                    })
                }, t.prototype._onBtnUpgradeTouchEnd = function() {
                    this._btnUpgrade && this._btnUpgrade.runAction(cc.sequence(cc.scaleTo(.05, .4, .4), cc.scaleTo(.05, .5, .5))), this._sendCannonUpdateRequest(!0)
                }, t.prototype._onBtnDowngradeTouchEnd = function() {
                    this._btnDowngrade && this._btnDowngrade.runAction(cc.sequence(cc.scaleTo(.05, .4, .4), cc.scaleTo(.05, .5, .5))), this._sendCannonUpdateRequest(!1)
                }, t.prototype._onBtnJoyStickSwitchTouchEnd = function() {
                    var e = this;
                    this.scheduleOnce(function() {
                        e._$._ndJoyStick && e._$._btnJoyStickSwitch && (e._$._btnJoyStickSwitch.getComponent(cc.Toggle).isChecked ? e._$._ndJoyStick.active = !0 : e._$._ndJoyStick.active = !1)
                    })
                }, t.prototype._onBtnAutoFireTouchEnd = function() {
                    var e = this;
                    this._businessStorage && this._businessStorage.lockTarget || (this.closeNoviceTeaching(), this._setAutoFireStatus(!1), this.scheduleOnce(function() {
                        e._$._btnAutoFire.getComponent(cc.Toggle).isChecked ? e._businessStorage.autoFire = !0 : e._businessStorage.autoFire = !1
                    }))
                }, t.prototype._setAutoFireStatus = function(e) {
                    var t = this._$._btnAutoFire.getComponent(cc.Toggle);
                    t.isChecked ? t.uncheck() : t.check(), this._$._btnAutoFire.getChildByName("label_auto").getComponent(cc.Label).string = t.isChecked ? A.t("text.autofire.stop") : A.t("text.autofire"), e || (S.default.getInstance().playBtnEffect(), S.default.getInstance().playBtnAuto(!t.isChecked))
                }, t.prototype._closeAutoFire = function(e) {
                    var t = this._$._btnAutoFire.getComponent(cc.Toggle);
                    t.uncheck(), this._$._btnAutoFire.getChildByName("label_auto").getComponent(cc.Label).string = t.isChecked ? A.t("text.autofire.stop") : A.t("text.autofire"), e || (S.default.getInstance().playBtnEffect(), S.default.getInstance().playBtnAuto(!t.isChecked))
                }, t.prototype._onBtnLockTargetTouchEnd = function() {
                    var e = this;
                    this._setLockTargeStatue(), this.closeNoviceTeaching(), this.scheduleOnce(function() {
                        e._$._btnLockTarget.getComponent(cc.Toggle).isChecked ? (e._businessStorage.lockTarget = !0, e._$._lockboard.active = !0) : (e._businessStorage.lockTarget = !1, e._businessStorage.lockTargetId = null, e._businessStorage.lockFishType = "", e._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, e), e._$._locktouchScreen.active = !1, e._$._lockboard.active = !1, e._closeAutoFire(!1), e._businessStorage.autoFire = !1)
                    })
                }, t.prototype._setLockTargeStatue = function() {
                    var e = this._$._btnLockTarget.getComponent(cc.Toggle);
                    e.isChecked ? e.uncheck() : e.check(), this._$._btnLockTarget.getChildByName("label_lock").getComponent(cc.Label).string = e.isChecked ? A.t("text.unlocktarget") : A.t("text.locktarget"), S.default.getInstance().playBtnEffect(), S.default.getInstance().playBtnLock(!e.isChecked)
                }, t.prototype._closeLockTarget = function() {
                    var e = this._$._btnLockTarget.getComponent(cc.Toggle);
                    e.uncheck(), this._$._btnLockTarget.getChildByName("label_lock").getComponent(cc.Label).string = A.t("text.locktarget"), S.default.getInstance().playBtnEffect(), S.default.getInstance().playBtnLock(!e.isChecked)
                }, t.prototype._onBtnShowPanelTouchEnd = function() {}, t.prototype._onBtnHidePanelTouchEnd = function() {}, t.prototype._onBtnAudioTouchEnd = function() {
                    var e = this._$._btnSound.getComponent(cc.Toggle);
                    e.isChecked ? e.uncheck() : e.check(), S.default.getInstance().playBtnEffect();
                    var t = this;
                    this.scheduleOnce(function() {
                        t._$._btnSound.getComponent(cc.Toggle).isChecked ? (S.default.getInstance().disableMusic(!0), S.default.getInstance().disableEffect(!0)) : (S.default.getInstance().disableMusic(!1), S.default.getInstance().disableEffect(!1))
                    })
                }, t.prototype._onBtnQuitTouchEnd = function() {
                    if (this._tableSearchStorage && !this._tableSearchStorage.quitGameReq) {
                        this._tableSearchStorage.quitGameReq = !0, this._btnQuitClick = !0, this._businessStorage.autoFire = !1, this._businessStorage.lockTarget = !1, this._isCancelLock = !0, this._$._lockboard.active = !1;
                        var e = this._$._btnLockTarget.getComponent(cc.Toggle);
                        e && e.uncheck(), (e = this._$._btnAutoFire.getComponent(cc.Toggle)) && e.uncheck()
                    }
                    this._onBtnHidePanelTouchEnd()
                }, t.prototype._onBtnOpenChatTouchEnd = function() {
                    this._$._ndChatPanel && (this._$._ndChatPanel.active = !this._$._ndChatPanel.active)
                }, t.prototype._onNdTouchScreenTouchStart = function() {
                    return this._$._ndChatPanel.active = !1, this._onBtnHidePanelTouchEnd(), !1
                }, t.prototype._onBtnCurrencyExchangeTouchEnd = function() {
                    this._walletStorage && (this._walletStorage.showExchangeUi = !0)
                }, t.prototype.update = function(e) {
                    this._frameRateTime = e, this.showHide(), this.displayPlayers(), this.updateSelfCannonAngle(), this.spawnFish(e), this.onColliderHandle(e), this.onColliderResultHandle(e), this.autoLockTarget(e), this.fireHandle(e, !1), this.spawnBullet(e), this.playTideAnimation(), this.checkEndGame(), this.closeBossNotify()
                }, t.prototype.playTideAnimation = function() {
                    var e = this;
                    if (this._businessStorage && this._businessStorage.changeScene) {
                        this._businessStorage.changeScene = !1, S.default.getInstance().playWaveEffect();
                        for (var t = 0; t < this._ndFishPool.children.length; t++) {
                            this._ndFishPool.children[t].getComponent(v.default).enableCollider(!1)
                        }
                        this._animationPause && this._animationPause.stop();
                        var n = this._$._ndTide,
                            o = this._$._ndTideAnimation,
                            i = this._$._ndMask,
                            r = o.getComponent(cc.Animation);
                        if (0 == r.getClips().length) {
                            var a = [];
                            a.push(this.tideSpriteAtlas.getSpriteFrame("Seawave_0")), a.push(this.tideSpriteAtlas.getSpriteFrame("Seawave_1")), a.push(this.tideSpriteAtlas.getSpriteFrame("Seawave_2")), a.push(this.tideSpriteAtlas.getSpriteFrame("Seawave_3"));
                            var s = cc.AnimationClip.createWithSpriteFrames(a, 10);
                            s.wrapMode = cc.WrapMode.Loop, r.addClip(s, "tide")
                        }
                        r.play("tide"), i.width = 0, n.active = !0, this._tideStopFire = !0;
                        var c = this;
                        setTimeout(function() {
                            c._tideStopFire = !1
                        }, 9e3);
                        var l = i.getChildByName("bg");
                        l && (l.getComponent(cc.Sprite).spriteFrame = this.sceneAtlas.getSpriteFrame("map_0" + (this._businessStorage.sceneId + 1))), this._fishesNodeCacheMap = {}, i.runAction(cc.sequence(cc.repeat(cc.sequence(cc.callFunc(function() {
                            i.width += 12
                        }), cc.delayTime(4 / (cc.winSize.width / 10))), cc.winSize.width / 10), cc.callFunc(function() {
                            for (r.stop("tide"), e._$._ndFishpondBg && (e._$._ndFishpondBg.getComponent(cc.Sprite).spriteFrame = e.sceneAtlas.getSpriteFrame("map_0" + (e._businessStorage.sceneId + 1))), n.active = !1; e._ndFishPool.childrenCount > 0;) e._recycleFish(e._ndFishPool.children[0]);
                            S.default.getInstance().playBgMusic(S.default.getInstance()._bgBossMusicName), e.scheduleOnce(function() {
                                0 == e._businessStorage.sceneId ? S.default.getInstance().playBgMusic(S.default.getInstance()._bgMusicName1) : S.default.getInstance().playBgMusic(S.default.getInstance()._bgMusicName2)
                            }, 40)
                        })))
                    }
                }, t.prototype.autoLockTarget = function(e) {
                    if (this._businessStorage && this._businessStorage.lockTarget)
                        if (this._businessStorage.lockTarget && "" != this._businessStorage.lockFishType) {
                            if (this._tideStopFire) return;
                            var t = this._businessStorage.lockTargetId ? this._getFishNodeCacheMap(this._businessStorage.lockTargetId) : null;
                            if (!t || !t.isOnStage() || t.isDie()) {
                                if (this._businessStorage.lockTargetId = "", null == (t = this._findTargetFish())) return this._closeAutoFire(!0), void(this._businessStorage.autoFire = !1);
                                this._businessStorage.lockTargetId = t.getId()
                            }
                            this._businessStorage.autoFire || (this._setAutoFireStatus(!0), this._businessStorage.autoFire = !0);
                            var n = this._ndFishPool.convertToWorldSpaceAR(t.node.position),
                                o = this._screenJoyStick.calcAngleFromWorldPos(n);
                            this._businessStorage.joyStickState.angle = o, this._$._ndGunsight && (this._$._ndGunsight.active = !0, this._$._ndGunsight.position = this.node.convertToNodeSpaceAR(n))
                        } else this._$._locktouchScreen.active || (this._$._locktouchScreen.active = !0, this._$._locktouchScreen.on(cc.Node.EventType.TOUCH_END, this.autoLockClickFindTarget, this, !1));
                    else this._$._ndGunsight && this._$._ndGunsight.active && (this._$._ndGunsight.active = !1)
                }, t.prototype.autoLockClickFindTarget = function(e) {
                    var t = this._$._locktouchScreen.getParent().convertToNodeSpaceAR(e.getLocation());
                    if (this._$._ndGunsight && (this._$._ndGunsight.active = !0, this._$._ndGunsight.position = t, !this._businessStorage.lockFishType)) {
                        var n = this._$._ndGunsight.getComponent(x.default);
                        n && (this._businessStorage.lockFishType = "", n.clearFishSprite())
                    }
                    var o = null,
                        i = 0,
                        r = this._$._ndGunsight.getParent().convertToWorldSpaceAR(this._$._ndGunsight.position);
                    for (var a in this._fishesNodeCacheMap) {
                        var s = this._fishesNodeCacheMap[a];
                        s.isOnStage() && !s.isDie() && (s.inRect(r) && s.score > i && (o = a, i = s.score))
                    }
                    if (!o) return this._businessStorage.lockTargetId = "", this._businessStorage.lockFishType = "", this._closeAutoFire(!0), this._businessStorage.autoFire = !1, void cc.log("not find fishkey");
                    if (o) {
                        this._businessStorage.lockTargetId = this._fishesNodeCacheMap[o].getId(), this._businessStorage.lockFishType = this._fishesNodeCacheMap[o].getFishType();
                        var c = this._$._ndGunsight.getComponent(x.default);
                        c.setLockFish(this._businessStorage.lockFishType), c.showBox(), this._$._lockboard.active = !1, this._setAutoFireStatus(!0), this._businessStorage.autoFire = !0
                    }
                }, t.prototype.startGame = function() {
                    if (this._businessStorage) {
                        if (S.default.getInstance().playCashIn(), this._initPauseAnimNode(), this._isHideDrop = !1, this._hideDrawCount = 0, _.default.seed = this._businessStorage.area.seed, this._timer = 60, this._seqNum = 0, this._userInfo) {
                            this._fishesNodeCacheMap = {}, this._bulletsNodeCacheMap = {};
                            for (var e = this._businessStorage.tableInfo.chairIds, t = 0; t < e.length; t++)
                                if (e[t] == this._userInfo.playerId) {
                                    var n = t % 2;
                                    this._adjustScreenJoyStick(this._ndBarrels[n]), this._adjustCannonShiftBtns(this._ndBarrels[n]), t > 1 ? this._$._ndFishpond && (this._$._ndFishpond.angle = -180, this._$._ndFishpondBg.angle = -180, this._$._ndFishContainer.angle = -180, this._$._ndRipples.angle = -180) : this._$._ndFishpond && (this._$._ndFishpond.angle = 0, this._$._ndFishpondBg.angle = 0, this._$._ndFishContainer.angle = 0, this._$._ndRipples.angle = 0), this._selfCannonIdx = n;
                                    break
                                }
                        }
                        this._$._ndTide && (this._$._ndTide.active = !1), this._$._ndFishpondBg && (this._$._ndFishpondBg.getComponent(cc.Sprite).spriteFrame = this.sceneAtlas.getSpriteFrame("map_0" + (this._businessStorage.area.scene + 1)), this.initPond()), this.scheduleOnce(function() {
                            S.default.getInstance().playBgMusic(S.default.getInstance()._bgMusicName1)
                        }, 2.5);
                        var o = this;
                        if (this._businessStorage.pingIntervalId && clearInterval(this._businessStorage.pingIntervalId), this._businessStorage.pingIntervalId = setInterval(function() {
                                var e = !1;
                                Object.keys(o._bulletsNodeCacheMap).forEach(function(t) {
                                    o._bulletsNodeCacheMap[t].getComponent(m.default).IsMe && (e = !0)
                                }), e || o._ping.DoPing(!1)
                            }, 5e3), f.default.isShowFullScreenNotice(p.default.consts.ANDROID_FULLSCREEN_PLAY)) {
                            var i = (c = cc.instantiate(this.pfbFullScreen)).getComponent(B.default);
                            c.setParent(this.node), i.show(this.node)
                        }
                        if (f.default.isCanBackToLobby())
                            for (var r = [-171, -171, -177], a = this._$._selectRoomLevel.getChildByName("_roomoption"), s = 0; s < p.default.consts.MAX_ROOM; s++) {
                                var c, l = a.getChildByName("_room" + s);
                                (c = this._currenyLabelPoole[s]).getComponent(M.default).show(l.position, cc.v2(-10, r[s]))
                            }
                        if (this._businessStorage && this._businessStorage.area && this._businessStorage.area.stage == p.default.consts.AREA_STAGE_GROUP) {
                            var u = this._$._bossNofity.getComponent(j.default);
                            u && u.start()
                        }
                        if (!this._$._bossNofity.active)(i = this._$._novice.getComponent(H.default)) && i.play()
                    }
                }, t.prototype._sendLeaveTable = function() {
                    var e = this;
                    this._netConnector.socketConnector && this._netConnector.socketConnector.request(p.default.pomeloRoute.leaveTable, h.default.makeWsPacket({}), function(t) {
                        !t || t.err ? cc.log("_sendLeaveTable error ", t) : (cc.log("_sendLeaveTable ", t), 200 == t.code && (e._tableSearchStorage.tableInfo = null, window.location.href = "about:blank", window.close()))
                    })
                }, t.prototype.checkEndGame = function() {
                    if (this._isShow && this._btnQuitClick && this._businessStorage && this._businessStorage.gameFinish) {
                        for (; this._ndFishPool.children.length;) this._recycleFish(this._ndFishPool.children[0]);
                        for (; this._ndBulletPool.children.length > 0;) this._recycleBullet(this._ndBulletPool.children[0]);
                        this._businessStorage.startGame = !1, this._btnQuitClick = !1, this._businessStorage.gameFinish = !1, this._sendLeaveTable();
                        for (var e = 0; e < this._ndCannons.length; e++) this._ndCannons[e].active = !1, this._ndCannons[e].jettons.content.removeAllChildren();
                        this._$._ndTouchScreen.removeAllChildren(), S.default.getInstance().stopEffect()
                    }
                }, t.prototype._sendHitCode = function(e) {
                    cc.log("random hitCode ", e)
                }, t.prototype.displayPlayers = function() {
                    if (this._businessStorage && this._businessStorage.tableInfo) {
                        var e = this._getSelfChairId();
                        if (!(e < 0)) {
                            var t = 0;
                            e > 1 && (t = 2);
                            for (var n = this._businessStorage.tableInfo.chairIds, o = this._businessStorage.playersInfo, i = this._businessStorage.areaPlayers, r = !1, a = 0; a < n.length; a++) {
                                var s = (a + t) % 4;
                                if (r = !1, n[a] || !this._ndCannons[s].active) {
                                    for (var c = 0; c < o.length; c++)
                                        if (n[a] == o[c].id) {
                                            if (o[c].id == this._userInfo.playerId) {
                                                this._ndCannons[s].lblNickName.getComponent(cc.Label).string = o[c].nickName, this._ndCannons[s].lblGold.getComponent(cc.Label).string = this._userInfo.gold;
                                                var l = this._ndCannons[s].getChildByName("_coin");
                                                if (l) {
                                                    l.active = !0;
                                                    var u = f.default.getRealCurrency(this._walletStorage.currencySymbol);
                                                    l.getComponent(cc.Sprite).spriteFrame = this.currencyAtlas.getSpriteFrame("reelwinmeter_" + f.default.getRealSpriteCurrency(u))
                                                }
                                            } else this._ndCannons[s].lblNickName.getComponent(cc.Label).string = f.default.maskNickName(o[c].nickName);
                                            r = !0;
                                            break
                                        } for (var h = 0; h < i.length; h++) {
                                        if (this._cannonCost && n[a] == i[h].playerId && i[h].playerId == this._userInfo.playerId) {
                                            if (this._setupMyselfTurrent(s, this._userInfo.rmpcannonCost[i[h].cannonLevel]), this._ndBarrels[s].level != i[h].skin) {
                                                var p = i[h].skin || 1,
                                                    d = this.cannonAtlas.getSpriteFrame("turret_below_" + p),
                                                    _ = this.cannonAtlas.getSpriteFrame("turret_upside_" + p);
                                                (g = this.cannonAtlas.getSpriteFrame("turret_gun_" + p)) && d && _ && (this._ndBarrels[s].getComponent(cc.Sprite).spriteFrame = g, this._ndUpsides[s].getComponent(cc.Sprite).spriteFrame = _, this._ndBelows[s].getComponent(cc.Sprite).spriteFrame = d, this._ndBarrels[s].level = p)
                                            }
                                            break
                                        }
                                        if (n[a] == i[h].playerId && i[h].playerId != this._userInfo.playerId) {
                                            if (this._setupOthtersTurrent(s, i[h].cannonCost), this._ndWaitPlayer[s].active && S.default.getInstance().playUserJoin(), this._ndWaitPlayer[s].active = !1, this._ndBarrels[s].level != i[h].skin) {
                                                var g;
                                                p = i[h].skin || 1, d = this.cannonAtlas.getSpriteFrame("turret_below_" + p), _ = this.cannonAtlas.getSpriteFrame("turret_upside_" + p);
                                                (g = this.cannonAtlas.getSpriteFrame("turret_gun_" + p)) && d && _ && (this._ndBarrels[s].getComponent(cc.Sprite).spriteFrame = g, this._ndUpsides[s].getComponent(cc.Sprite).spriteFrame = _, this._ndBelows[s].getComponent(cc.Sprite).spriteFrame = d, this._ndBarrels[s].level = p)
                                            }
                                            break
                                        }
                                    }
                                    this._ndCannons[s].active = !!r
                                } else this._ndCannons[s].active = !1, this._ndWaitPlayer[s].active = !0, S.default.getInstance().playUserLeave()
                            }
                        }
                    }
                }, t.prototype._setupOthtersTurrent = function(e, t) {
                    this._ndCannons[e].getChildByName("lblGold").active = !1, this._ndCannons[e].getChildByName("_coin").active = !1, this._ndCannons[e].getChildByName("TurretPlayer").active = !1, this._ndCannons[e].getChildByName("_turretOthers").active = !0;
                    var n = this._ndCannons[e].getChildByName("_turretOthers").position;
                    this._ndCannons[e].getChildByName("lblNickName").position = n
                }, t.prototype._setupMyselfTurrent = function(e, t) {
                    var n = F.default.getRealMoney(t);
                    this._cannonCost.getComponent(cc.Label).string = n.rmp, this._crfontend.getComponent(cc.Label).string = n.isbehind ? "" : n.cy, this._crbehind.getComponent(cc.Label).string = n.isbehind ? n.cy : "", this._ndWaitPlayer[e].active = !1, this._ndCannons[e].getChildByName("lblGold").active = !0, this._ndCannons[e].getChildByName("_coin").active = !0, this._ndCannons[e].getChildByName("TurretPlayer").active = !0, this._ndCannons[e].getChildByName("_turretOthers").active = !1;
                    var o = this._ndCannons[e].getChildByName("TurretPlayer").position;
                    if ("_ndLbCannon" == this._ndCannons[e].name ? (o.x -= 0, o.y += 30) : "_ndRbCannon" == this._ndCannons[e].name ? (o.x += 0, o.y += 30) : "_ndLtCannon" == this._ndCannons[e].name ? (o.x -= 0, o.y += 30) : "_ndRtCannon" == this._ndCannons[e].name && (o.x += 0, o.y += 30), this._ndCannons[e].getChildByName("lblNickName").position = cc.v2(o.x, o.y), !this._selfNotify) {
                        this._selfNotify = !0;
                        var i = cc.repeatForever(cc.jumpTo(.8, this._$._selfarrow.x, this._$._selfarrow.y, 30, 1)),
                            r = this._$._selfarrow.runAction(i),
                            a = this;
                        setTimeout(function() {
                            a._$._selfarrow.stopAction(r), a._$._selfarrow.active = !1
                        }, 3e3)
                    }
                }, t.prototype._displayScore = function() {
                    if (this._isShow) {
                        var e = 0,
                            t = 0;
                        if (this._businessStorage.areaPlayers && !this._$._bossNofity.active) {
                            for (var n = 0; n < this._businessStorage.areaPlayers.length; n++) {
                                var o = this._businessStorage.areaPlayers[n],
                                    i = null;
                                this._userInfo && o.playerId == this._userInfo.playerId ? (i = this._$._scoreMyself, e = parseInt(o.score)) : (i = this._$._scoreOther, t = parseInt(o.score)), i && (i.$Label.string = o.score)
                            }
                            var r = this._$._scoreCharts.$ProgressBar;
                            if (r) {
                                var a = e - t;
                                if (0 == a) r.progress = .5;
                                else {
                                    o = 0;
                                    o = a < 0 ? 0 == e ? -.5 : a / e : 0 == t ? .5 : a / t, r.progress = .5 + o
                                }
                            }
                        }
                    }
                }, t.prototype.closeBossNotify = function() {
                    if (this._$._bossNofity.active && this._businessStorage.startGame && (this._businessStorage.area.stage == p.default.consts.AREA_STAGE_NORMAL || this._businessStorage.area.stage == p.default.consts.AREA_STAGE_WAIT)) {
                        var e = this._$._bossNofity.getComponent(j.default);
                        e && e.stop()
                    }
                }, t.prototype._showHideChildren = function(e) {
                    for (var t = this.node.children, n = 0; n < t.length; n++) t[n].active = e;
                    e && (this._showcounter ? this._$._ndCounter && (this._$._ndCounter.active = !0) : this._$._ndCounter && (this._$._ndCounter.active = !1), this._onBtnJoyStickSwitchTouchEnd()), this._$._locktouchScreen.active = !1, this._$._selectRoomLevel.active = !1, this._$._bossNofity.active = !1, this._$._novice.active = !1, this._$._pathDraw.active = !1, f.default.isFreePlay() || (this._$._FreePlay.active = !1), this._isShow = e
                }, t.prototype.initPond = function() {
                    if (this._$._ndRipples.active) {
                        var e = this._$._ndRipples.getComponent(cc.Animation),
                            t = this.getPondSpriteFrameList("SunLight", 1, 32),
                            n = cc.AnimationClip.createWithSpriteFrames(t, 16);
                        n.wrapMode = cc.WrapMode.Loop, e.addClip(n, "SunLight"), e.play("SunLight")
                    }
                }, t.prototype.getPondSpriteFrameList = function(e, t, n) {
                    for (var o = [], i = t; i < n + 1; i++) {
                        var r = e + "_" + i,
                            a = this.pondAnimAtlas.getSpriteFrame(r);
                        o.push(a)
                    }
                    return o
                }, t.prototype.runShake = function(e) {
                    var t = this;
                    if (!this._isShake) {
                        this._isShake = !0;
                        var n = cc.v2(0, e);
                        this.node.runAction(cc.sequence(cc.moveTo(.03, n.rotate(Math.PI / 4 * 0 % 8)), cc.moveTo(.03, n.rotate(Math.PI / 4 * 3 % 8)), cc.moveTo(.03, n.rotate(Math.PI / 4 * 6 % 8)), cc.moveTo(.03, n.rotate(Math.PI / 4 * 9 % 8)), cc.moveTo(.03, n.rotate(Math.PI / 4 * 12 % 8)), cc.moveTo(.03, n.rotate(Math.PI / 4 * 15 % 8)), cc.moveTo(.03, n.rotate(Math.PI / 4 * 18 % 8)), cc.moveTo(.03, n.rotate(Math.PI / 4 * 21 % 8)), cc.moveTo(.01, cc.v2(0, 0)), cc.callFunc(function() {
                            t._isShake = !1
                        })))
                    }
                }, t.prototype.closeNoviceTeaching = function() {
                    if (this._$._novice.active) {
                        var e = this._$._novice.getComponent(H.default);
                        e && e.close()
                    }
                }, t.prototype.hideDrawCheck = function() {
                    this._hideDrawCount++, 2 == this._hideDrawCount && (this._isHideDrop = !0)
                }, t.HIDE_WAIT_TIME = 3e5, t.KEYBOARD_CANNANGLE = 10, i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbBullet", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbFish", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "tideSpriteAtlas", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "sceneAtlas", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "pondAnimAtlas", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbAnimCoin", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbJettonItem", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbGunFire", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbFlash", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbPause", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbAnimBonus", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbAnimOnlyCoin", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbFullScreen", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbCurrencyLabel", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbBingo", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "cannonAtlas", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "currencyAtlas", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "uiAtlas", void 0), t = n = i([a], t)
            }(c.default);
        n.default = G, cc._RF.pop()
    }, {
        "../Components/Business/AudioManage": "AudioManage",
        "../Components/Business/StartSearchTableForPlayView": "StartSearchTableForPlayView",
        "../Components/Model/BusinessStorage": "BusinessStorage",
        "../Components/Model/NetConnector": "NetConnector",
        "../Components/Model/PayTableViewStorage": "PayTableViewStorage",
        "../Components/Model/PngStorage": "PngStorage",
        "../Components/Model/PromptDialogStorage": "PromptDialogStorage",
        "../Components/Model/TableSearchStorage": "TableSearchStorage",
        "../Components/Model/UserInfoStorage": "UserInfoStorage",
        "../Components/Model/WalletStorage": "WalletStorage",
        "../Components/Platform/WechatAvatarLoader": "WechatAvatarLoader",
        "../Components/UI/AndroidAskFullScreen": "AndroidAskFullScreen",
        "../Components/UI/AnimationBingo": "AnimationBingo",
        "../Components/UI/AnimationBonus": "AnimationBonus",
        "../Components/UI/AnimationCoin": "AnimationCoin",
        "../Components/UI/AnimationFire": "AnimationFire",
        "../Components/UI/AnimationFlash": "AnimationFlash",
        "../Components/UI/AnimationOnlyCoin": "AnimationOnlyCoin",
        "../Components/UI/AnimationPause": "AnimationPause",
        "../Components/UI/BossNotify": "BossNotify",
        "../Components/UI/Bullet": "Bullet",
        "../Components/UI/CurrencyLabel": "CurrencyLabel",
        "../Components/UI/Fish": "Fish",
        "../Components/UI/GunSight": "GunSight",
        "../Components/UI/NoviceTeaching": "NoviceTeaching",
        "../Components/UI/RecallRow": "RecallRow",
        "../Components/UI/WebViewGameRecall": "WebViewGameRecall",
        "../Components/UI/joystick/Joystick": "Joystick",
        "../Config/Config": "Config",
        "../Utils/CCHelper": "CCHelper",
        "../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../Utils/SeedRandom": "SeedRandom",
        "../uikiller/Thor": "Thor",
        LanguageData: "LanguageData"
    }],
    PngStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4dedag+TXpFn6TP2s7iRf6E", "PngStorage");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./UserInfoStorage"),
            a = e("../../Config/Config"),
            s = e("./NetConnector"),
            c = e("./BusinessStorage"),
            l = e("../../Utils/RealMoneyPlatform"),
            u = cc._decorator,
            h = u.ccclass,
            p = (u.property, function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._dt = 0, t._userInfo = null, t._netConnector = null, t._businessStorage = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._userInfo = this.node.getComponent(r.default), this._netConnector = this.node.getComponent(s.default), this._businessStorage = this.node.getComponent(c.default), this._dt = (new Date).getTime()
                }, t.prototype.updateDelayTime = function() {
                    this._dt = (new Date).getTime()
                }, t.prototype.DoPing = function(e) {
                    var t = this,
                        n = (new Date).getTime();
                    n - this._dt < 1e3 * a.default.consts.PING_DELAY && !e || (this._dt = n, this._netConnector.socketConnector && this._userInfo && this._businessStorage && this._netConnector.socketConnector.request(a.default.pomeloRoute.onPingBalance, s.default.makeWsPacket({}), function(e) {
                        if (!e || e.err || 200 != e.code) cc.log("ping error");
                        else {
                            var n = l.default.getRealMoney(l.default.convertCentsToCredits(e.msg.rmpRatioCredit));
                            t._userInfo.gold = n.rmp
                        }
                    }))
                }, t = i([h], t)
            }(cc.Component));
        n.default = p, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "./BusinessStorage": "BusinessStorage",
        "./NetConnector": "NetConnector",
        "./UserInfoStorage": "UserInfoStorage"
    }],
    PromptDialogStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e0def8rI7NGEqRl7b0WvAqU", "PromptDialogStorage");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Config/Config")),
            c = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "IsQuit", {
                    get: function() {
                        return n._isQuit
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "IsRecommendGame", {
                    get: function() {
                        return n._isRecommendGame
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "IsAskQuestion", {
                    get: function() {
                        return n._isAskQuestion
                    },
                    set: function(e) {
                        n._isAskQuestion = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "IsNotice", {
                    get: function() {
                        return n._isNotice
                    },
                    set: function(e) {
                        n._isNotice = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "errortype", {
                    get: function() {
                        return n._errortype
                    },
                    set: function(e) {
                        n._errortype = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "show", {
                    get: function() {
                        return n._show
                    },
                    set: function(e) {
                        n._show = e, e && (n._exitCode = -1)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "visibleButtons", {
                    get: function() {
                        return n._visibleButtons
                    },
                    set: function(e) {
                        n._visibleButtons = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "content", {
                    get: function() {
                        return n._content
                    },
                    set: function(e) {
                        n._content = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "exitCode", {
                    get: function() {
                        return n._exitCode
                    },
                    set: function(e) {
                        n._exitCode = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "textHAlign", {
                    get: function() {
                        return n._textHAlign
                    },
                    set: function(e) {
                        n._textHAlign = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.showMsg = function(e) {
                    var t = parseInt(e);
                    n._content = e.toString(), n._exitCode = t, n._show = !0, n._errortype = 216 === t ? s.default.ERR_TXT_216 : 1e3 === t ? s.default.ERR_TXT_1000 : 2e3 === t ? s.default.ERR_TXT_KICK : s.default.ERR_TXT_500, cc.log("errortype=", n._errortype)
                }, t.showAskLogOut = function() {
                    n._show = !0, n._isQuit = !0, n._errortype = s.default.ASK_LOGOUT_GAME
                }, t.showNotice = function() {
                    n._show = !0, n._isNotice = !0
                }, t.reset = function() {
                    n._show = !1, n._isAskQuestion = !1, n._isQuit = !1, n._isRecommendGame = !1, n._errortype = "", n._exitCode = -1
                }, t.isShow = function() {
                    return n._show
                }, t.showRecommendGame = function() {
                    n._show = !0, n._isRecommendGame = !0
                }, t._show = !1, t._visibleButtons = [], t._content = "", t._exitCode = -1, t._textHAlign = cc.macro.TextAlignment.LEFT, t._errortype = "", t._isAskQuestion = !1, t._isNotice = !1, t._isQuit = !1, t._isRecommendGame = !1, t = n = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {
        "../../Config/Config": "Config"
    }],
    PromptDialog: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "7ef55aM5lZNHp2ORWmddpVt", "PromptDialog");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/PromptDialogStorage")),
            c = e("../../uikiller/Thor"),
            l = e("../../Config/Config"),
            u = e("../../Utils/CCHelper"),
            h = e("LanguageData"),
            p = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._promptDialogStorage = null, t._isShow = !1, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._promptDialogStorage = this.node.getComponent(s.default), this._label_ok.active = !1, this._label_cancel.active = !1, this._btnOK.on(cc.Node.EventType.TOUCH_END, this._onBtnOKTouchEnd, this, !0), this._btnCancel.on(cc.Node.EventType.TOUCH_END, this._onBtnCancelTouchEnd, this, !0), this.showHideChildren(!1)
                }, t.prototype._onBtnOKTouchEnd = function(e) {
                    if (cc.log("btn ", e.name, " click ", e.$, " isAskQuestion", this._promptDialogStorage.IsAskQuestion), this._promptDialogStorage) {
						window.parent.postMessage('CloseGame',"*");	
                        if (cc.log("exitCode ", this._promptDialogStorage.exitCode), this._promptDialogStorage.IsNotice) return void(this._promptDialogStorage && s.default.reset());
                        if (this._promptDialogStorage.IsQuit) return cc.game.end(), void this.closePage();
                        s.default.reset(), this._promptDialogStorage.content == String(l.default.ERR_CODE_KICK_LOGOUT) ? (cc.game.end(), this.closePage()) : this._promptDialogStorage.content != String(l.default.ERR_CODE_BALANCE) && (window.location.href = "")
                    }
                }, t.prototype._onBtnCancelTouchEnd = function(e) {
                    this._promptDialogStorage && s.default.reset()
                }, t.prototype.update = function(e) {
                    this._promptDialogStorage && (this._promptDialogStorage.show && !this._isShow ? this.showHideChildren(!0) : !this._promptDialogStorage.show && this._isShow && this.showHideChildren(!1))
                }, t.prototype.showHideChildren = function(e) {
                    for (var t = this.node.children, n = 0; n < t.length; n++) t[n].active = e;
                    e && (this.hideAllButtons(), this._promptDialogStorage && (this._promptDialogStorage.IsAskQuestion ? this.showAskQuestionUI() : this._promptDialogStorage.IsQuit ? u.default.isShowReCommendGames() ? this.showQuitGameRecommendDialog() : this.showAskQuestionUI() : this._promptDialogStorage.IsRecommendGame ? this.showRecommendDialog() : this.showAlertUI())), this._isShow = e
                }, t.prototype.hideAllButtons = function() {
                    this._btnOK.active = !1, this._btnCancel.active = !1, this._label_ok.active = !1, this._label_cancel.active = !1
                }, t.prototype.showAlertUI = function() {
                    (cc.log("showAlertUI"), this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0), this._$._recommend && (this._$._recommend.active = !1), this._$._msg) && (this._$._msg.getComponent(cc.Label).string = h.t(this._promptDialogStorage.errortype));
                    u.default.checkAndSetFrameScale(this.node.getChildByName("content"))
                }, t.prototype.showNoticMsg = function() {
                    this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0), this._$._recommend && (this._$._recommend.active = !1), this._$._msg, u.default.checkAndSetFrameScale(this.node.getChildByName("content"))
                }, t.prototype.showButtons = function(e) {
                    cc.log("showButtons  ", e), this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0)
                }, t.prototype.showAskQuestionUI = function() {
                    (this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0), this._$._btnCancel && (this._$._btnCancel.active = !0, this._label_cancel.active = !0), this._$._recommend && (this._$._recommend.active = !1), this._$._msg) && (this._$._msg.getComponent(cc.Label).string = h.t(this._promptDialogStorage.errortype));
                    u.default.checkAndSetFrameScale(this.node)
                }, t.prototype.showReCommandUI = function() {
                    this._$._recommend && (this._$._recommend.active = !0), this._$._msg;
                    for (var e = this._$._recommend.getChildByName("view").getChildByName("content"), t = 1; t < 50; t++) {
                        var n = e.getChildByName("_game" + t);
                        if (!n) break;
                        n.off(cc.Node.EventType.TOUCH_END), n.active = !1
                    }
                    var o = u.default.getReCommendGames(),
                        i = [];
                    for (var r in o) i.push(o[r]);
                    var a = this;
                    i.sort(function(e, t) {
                        return e.idx - t.idx
                    }).forEach(function(t) {
                        if (!e.getChildByName("_node" + (t.idx + 1))) {
                            var n = a.createEmptyNode(t.idx);
                            e.addChild(n)
                        }
                        cc.loader.load({
                            id: t.iu,
                            type: "png"
                        }, function(t, n) {
                            var i = o[n.url],
                                r = e.getChildByName("_node" + (i.idx + 1));
                            if (r) {
                                var a = r.getChildByName("_game");
                                a.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(n), a.on(cc.Node.EventType.TOUCH_END, function(e) {
                                    r.runAction(cc.sequence(cc.scaleTo(.3, 1.1, 1.1), cc.scaleTo(.3, 1, 1), cc.callFunc(function() {
                                        var e = u.default.getReCommendUrlString(i.lu);
                                        window.location.href = e
                                    })))
                                }), a.active = !0
                            }
                        })
                    }), this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0), this._$._btnCancel && (this._$._btnCancel.active = !0, this._label_cancel.active = !0);
                    i.length;
                    e.width = 420 * i.length, u.default.checkAndSetFrameScale(this.node)
                }, t.prototype.showRecommendDialog = function() {
                    this.showQuitGameRecommendDialog(), this._$._btnOK && (this._$._btnOK.active = !1, this._label_ok.active = !1), this._$._btnCancel && (this._$._btnCancel.active = !0, this._label_cancel.active = !0)
                }, t.prototype.showQuitGameRecommendDialog = function() {
                    this._$._recommend && (this._$._recommend.active = !0);
                    for (var e = this._$._recommend.getChildByName("view").getChildByName("content"), t = 1; t < 50; t++) {
                        var n = e.getChildByName("_game" + t);
                        if (!n) break;
                        n.off(cc.Node.EventType.TOUCH_END), n.active = !1
                    }
                    var o = u.default.getReCommendGames(),
                        i = [];
                    for (var r in o) i.push(o[r]);
                    var a = this;
                    i.sort(function(e, t) {
                        return e.idx - t.idx
                    }).forEach(function(t) {
                        if (!e.getChildByName("_node" + (t.idx + 1))) {
                            var n = a.createEmptyNode(t.idx);
                            e.addChild(n)
                        }
                        cc.loader.load({
                            id: t.iu,
                            type: "png"
                        }, function(t, n) {
                            var i = o[n.url],
                                r = e.getChildByName("_node" + (i.idx + 1));
                            if (r) {
                                var a = r.getChildByName("_game");
                                a.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(n), a.on(cc.Node.EventType.TOUCH_END, function(e) {
                                    r.runAction(cc.sequence(cc.scaleTo(.3, 1.1, 1.1), cc.scaleTo(.3, 1, 1), cc.callFunc(function() {
                                        var e = u.default.getReCommendUrlString(i.lu);
                                        window.location.href = e
                                    })))
                                }), a.active = !0
                            }
                        })
                    }), this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0), this._$._btnCancel && (this._$._btnCancel.active = !0, this._label_cancel.active = !0);
                    i.length;
                    e.width = 420 * i.length, u.default.checkAndSetFrameScale(this.node)
                }, t.prototype.closePage = function() {
                    var e = u.default.urlParse();
                    window.callRedirectOrClose(e.l ? e.l : "", "close_iframe")
                }, t.prototype.createEmptyNode = function(e) {
                    var t = new cc.Node,
                        n = new cc.Node;
                    return n.addComponent(cc.Sprite), t.name = "_node" + (e + 1), t.setContentSize(400, 400), n.name = "_game", n.setContentSize(t.getContentSize()), t.addChild(n), t
                }, t = i([a], t)
            }(c.default);
        n.default = p, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/CCHelper": "CCHelper",
        "../../uikiller/Thor": "Thor",
        "../Model/PromptDialogStorage": "PromptDialogStorage",
        LanguageData: "LanguageData"
    }],
    RealMoneyPlatform: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "024be6qUD1PVKmWO3n36AVJ", "RealMoneyPlatform"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./CCHelper"),
            i = function() {
                function e() {}
                return Object.defineProperty(e, "walletInfo", {
                    get: function() {
                        return e._walletInfo
                    },
                    set: function(t) {
                        e._walletInfo = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.calculateCentsFromCredits = function(e, t) {
                    if (!e || !t) return 0;
                    var n = 100 * e * t;
                    return Math.round(n)
                }, e.formatCents = function(e) {
                    return e / 100
                }, e.convertCreditsToCents = function(t, n) {
                    return n = void 0 === n ? e.walletInfo.currentDenomination : n, Math.floor(t * n * 100 + e.FLT_EPSILON)
                }, e.convertCentsToCredits = function(t) {
                    return Math.floor(t / e.walletInfo.currentDenomination / 100)
                }, e.formatCredits = function(t) {
                    return Math.floor(t / e.walletInfo.currentDenomination / 100)
                }, e.formatCurrencySymbol = function(t, n) {
                    n = void 0 === n || n;
                    var i = o.default.getRealCurrency(e.walletInfo.currencySymbol);
                    return e.walletInfo.currencySymbolInBack ? {
                        cy: i,
                        isbehind: !0,
                        rmp: n ? String(t.toFixed(e.walletInfo.currencyFractionDigits)) : String(t)
                    } : {
                        cy: i,
                        isbehind: !1,
                        rmp: n ? String(t.toFixed(e.walletInfo.currencyFractionDigits)) : String(t)
                    }
                }, e.convertCreditsToCurrency = function(t, n) {
                    return e.formatCents(e.convertCreditsToCents(t, n))
                }, e.formatCreditsToCurrency = function(t, n) {
                    return e.formatCurrencySymbol(e.convertCreditsToCurrency(t, n), "undefined")
                }, e.getRealMoney = function(t) {
                    var n = e.convertCreditsToCurrency(t, e.walletInfo.currentDenomination);
                    return e.formatCurrencySymbol(n, "undefined")
                }, e.getRealAmountByOtherCannonLevel = function(e, t, n) {
                    var o = n;
                    return o >= t && (o = t.length - 1), e * t[o]
                }, e.FLT_EPSILON = 1.1920929e-7, e._walletInfo = null, e
            }();
        n.default = i, cc._RF.pop()
    }, {
        "./CCHelper": "CCHelper"
    }],
    RecallRow: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "50254fwYJ9HYbtTxHI3jj7v", "RecallRow");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/RealMoneyPlatform"),
            a = cc._decorator,
            s = a.ccclass,
            c = (a.property, function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.CURRENCY_INDEX = 150, t._data = null, t
                }
                return o(t, e), t.prototype.init = function(e) {
                    var t = this;
                    this._data = e;
                    var n = this.node.getChildByName("_col1"),
                        o = this.node.getChildByName("_col2"),
                        i = this.node.getChildByName("_col3"),
                        a = this.node.getChildByName("_col4"),
                        s = this.node.getChildByName("_col5"),
                        c = n.getChildByName("_label"),
                        l = o.getChildByName("_label"),
                        u = i.getChildByName("_label"),
                        h = a.getChildByName("_label"),
                        p = s.getChildByName("_label"),
                        f = a.getChildByName("_currency"),
                        d = s.getChildByName("_currency");
                    if (e) {
                        c.active = !0, l.active = !0, u.active = !0, h.active = !0, p.active = !0, f.active = !0, d.active = !0;
                        var _ = c.getComponent(cc.Label),
                            g = l.getComponent(cc.Label),
                            y = u.getComponent(cc.Label),
                            m = h.getComponent(cc.Label),
                            v = p.getComponent(cc.Label),
                            b = a.getChildByName("_currency").getComponent(cc.Label),
                            C = s.getChildByName("_currency").getComponent(cc.Label),
                            S = this._data.transactionId,
                            w = this._data.spinDate,
                            P = 1;
                        P += 0 == this._data.additionalSpin.length ? 0 : this._data.additionalSpin[0].swi.length;
                        var R = r.default.getRealMoney(this._data.totalWager),
                            O = r.default.getRealMoney(this._data.totalWin),
                            T = Math.round(100 * (O.rmp - R.rmp)) / 100;
                        _.string = w, g.string = S, y.string = P.toString(), m.string = R.rmp, v.string = T.toFixed(2).toString();
                        var A = R.cy;
                        "\u20bd" == A && (A = "RUB"), b.string = A, C.string = A, _._updateRenderData(!0), g._updateRenderData(!0), y._updateRenderData(!0), m._updateRenderData(!0), v._updateRenderData(!0), b._updateRenderData(!0), C._updateRenderData(!0), R.isbehind ? (f.x = this.CURRENCY_INDEX, d.x = this.CURRENCY_INDEX) : (f.x = -this.CURRENCY_INDEX, d.x = -this.CURRENCY_INDEX), this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                            var n = t.node.getChildByName("_event_bg");
                            n && (n.active = !0)
                        }), this.node.on(cc.Node.EventType.MOUSE_MOVE, function(e) {
                            var n = t.node.getChildByName("_event_bg");
                            n && (n.active = !0)
                        }), this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                            var n = t.node.getChildByName("_event_bg");
                            n && (n.active = !1)
                        }), this.node.on(cc.Node.EventType.MOUSE_LEAVE, function(e) {
                            var n = t.node.getChildByName("_event_bg");
                            n && (n.active = !1)
                        })
                    } else c.active = !1, l.active = !1, u.active = !1, h.active = !1, p.active = !1, f.active = !1, d.active = !1
                }, Object.defineProperty(t.prototype, "data", {
                    get: function() {
                        return this._data
                    },
                    set: function(e) {
                        this._data = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.getTransactionId = function() {
                    return this.node.getChildByName("_col2").getChildByName("_label").getComponent(cc.Label).string
                }, t = i([s], t)
            }(cc.Component));
        n.default = c, cc._RF.pop()
    }, {
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform"
    }],
    RotationXY: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4f2a3t4ZShPsqpzK8ME3aGJ", "RotationXY");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return o(t, e), Object.defineProperty(t.prototype, "rotationX", {
                    get: function() {
                        return this.node.rotationX
                    },
                    set: function(e) {
                        this.node.rotationX = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "rotationY", {
                    get: function() {
                        return this.node.rotationY
                    },
                    set: function(e) {
                        this.node.rotationY = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.start = function() {}, i([s({
                    type: cc.Integer
                })], t.prototype, "rotationX", null), i([s({
                    type: cc.Integer
                })], t.prototype, "rotationY", null), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    ScanAnimation: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "dc9a3bPB/FF7Y31/6GDFCq3", "ScanAnimation");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.rotationRate = 5, t._ndScan = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._ndScan = this.node.getChildByName("_ndScan")
                }, t.prototype.doAnimation = function() {
                    this._ndScan && (this._ndScan.angle -= this.rotationRate)
                }, t.prototype.update = function(e) {
                    this.doAnimation()
                }, i([s], t.prototype, "rotationRate", void 0), t = i([a], t)
            }(cc.Component);
        n.default = c, cc._RF.pop()
    }, {}],
    SearchTableViewControl: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "b9a0fAoxeFEv7V5s//78YNU", "SearchTableViewControl");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../uikiller/Thor")),
            c = e("../Components/Model/TableSearchStorage"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._tableSearchStorage = null, t._avatarLoader = null, t._countDown = 15, t._isShow = !1, t._isMatchComplete = !1, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._showHideChildren(!1), this._tableSearchStorage = this.node.getComponent(c.default)
                }, t.prototype._onBtnQuitTouchEnd = function() {
                    this._tableSearchStorage && (this._tableSearchStorage.doSearching = !1, this._tableSearchStorage.quitGameReq = !0)
                }, t.prototype.startCountdDown = function() {
                    var e = this;
                    this._countDown = 15;
                    var t = this._$._lblTimer && this._$._lblTimer.$Label;
                    t && (t.string = this._countDown.toString(), this.schedule(function() {
                        t && (--e._countDown, e._countDown < 0 && (e._countDown = 0), t.string = e._countDown.toString())
                    }, 1, cc.macro.REPEAT_FOREVER))
                }, t.prototype.stopCountdDown = function() {
                    this.unscheduleAllCallbacks()
                }, t.prototype.checkShow = function() {
                    this._tableSearchStorage && this._tableSearchStorage.doSearching && (this._isShow || (this.startCountdDown(), this._showHideChildren(!0)))
                }, t.prototype.checkHide = function() {
                    this._tableSearchStorage && !this._tableSearchStorage.doSearching && this._isShow && (this.stopCountdDown(), this._showHideChildren(!1), this._isMatchComplete = !1)
                }, t.prototype.checkSwitchState = function() {
                    if (this._isShow)
                        if (this._tableSearchStorage && this._tableSearchStorage.tableInfo && this._tableSearchStorage.tableInfo.playerIds.length >= 1) {
                            if (this._isMatchComplete) return;
                            this._$._ndSearchDone && (this._$._ndSearchDone.active = !0), this._$._ndSearching && (this._$._ndSearching.active = !1), this._isMatchComplete = !0, this._showPlayers()
                        } else this._$._ndSearchDone && (this._$._ndSearchDone.active = !1), this._$._ndSearching && (this._$._ndSearching.active = !0), this._isMatchComplete = !1
                }, t.prototype._onBtnClose = function() {
                    this._tableSearchStorage && (this._tableSearchStorage.doSearching = !1)
                }, t.prototype._showPlayers = function() {
                    if (this._tableSearchStorage && this._tableSearchStorage.tableInfo) {
                        for (var e = this._tableSearchStorage.tableInfo.playerIds, t = this._tableSearchStorage.playersInfo || [], n = [{
                                head: this._$._imgHeadSelf,
                                name: this._$._lblNameSelf
                            }, {
                                head: this._$._imgHeadOther,
                                name: this._$._lblNameOther
                            }], o = function(o) {
                                if (o >= n.length) return "break";
                                for (var r = 0; r < t.length; r++)
                                    if (e[o] == t[r].id) {
                                        if (n[o].head && i._avatarLoader) i._avatarLoader.load(t[r].avatarUrl, !1).then(function(e) {
                                            n[o].head.$Sprite.spriteFrame = e ? new cc.SpriteFrame(e) : null
                                        });
                                        n[o].name && (n[o].name.$Label.string = t[r].nickName)
                                    }
                            }, i = this, r = 0; r < e.length; r++) {
                            if ("break" === o(r)) break
                        }
                        this._tableSearchStorage.sitDownReq = !0
                    }
                }, t.prototype.update = function(e) {
                    this.checkShow(), this.checkHide()
                }, t.prototype._showHideChildren = function(e) {
                    for (var t = this.node.children, n = 0; n < t.length; n++) t[n].active = e;
                    this._isShow = e
                }, t = i([a], t)
            }(s.default);
        n.default = l, cc._RF.pop()
    }, {
        "../Components/Model/TableSearchStorage": "TableSearchStorage",
        "../uikiller/Thor": "Thor"
    }],
    SeedRandom: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4ea69YUNFlJFKfwt9AddjW9", "SeedRandom");
        var o = this && this.__decorate || function(e, t, n, o) {
            var i, r = arguments.length,
                a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
            else
                for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
            return r > 3 && a && Object.defineProperty(t, n, a), a
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            r = i.ccclass,
            a = (i.property, function() {
                function e() {}
                var t;
                return t = e, e.random = function(e, n) {
                    return n = n || 1, e = e || 0, t.seed = (9301 * t.seed + 49297) % 233280, e + t.seed / 233280 * (n - e)
                }, e.seed = Date.now(), e = t = o([r], e)
            }());
        n.default = a, cc._RF.pop()
    }, {}],
    SpriteFrameSet: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var o = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        t.exports = o, cc._RF.pop()
    }, {}],
    StartSearchTableForPlayView: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "01f7fh/q2dNVYhwd2yL4pm7", "StartSearchTableForPlayView");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/Pair"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.searchParams = [], t
                }
                return o(t, e), t.prototype.init = function(e, t, n) {
                    this.node.on(cc.Node.EventType.TOUCH_END, e, this), window.osdevice.isMobile || (this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onShowLight, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onCloseLight, this)), this.node.getChildByName("_glow").active = !1
                }, t.prototype.onShowLight = function() {
                    this.node.getChildByName("_glow").active = !0
                }, t.prototype.onCloseLight = function() {
                    this.node.getChildByName("_glow").active = !1
                }, i([s({
                    type: c
                })], t.prototype, "searchParams", void 0), t = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/Pair": "Pair"
    }],
    StartSearchTable: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "9e2b6R8U5hFmoGf+9Xm7w8J", "StartSearchTable");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../Model/TableSearchStorage"),
            l = e("../../Utils/Pair"),
            u = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.searchParams = [], t._tableSearchStorage = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this.node.on(cc.Node.EventType.TOUCH_END, this.onHandle, this), window.osdevice.isMobile || (this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onShowLight, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onCloseLight, this)), this._tableSearchStorage = this.node.getComponent(c.default);
                    var e = this.node.getChildByName("_glow");
                    e && (e.active = !1)
                }, t.prototype.onHandle = function() {
                    if (this._tableSearchStorage) {
                        var e = {};
                        e[this.searchParams[0].key] = parseInt(this.searchParams[0].value), this._tableSearchStorage.searchParams = e, this._tableSearchStorage.startSearch = !0, this.node.getParent().getParent().getChildByName("_selecttext").active = !1, this.node.getParent().active = !1
                    }
                }, t.prototype.onShowLight = function() {
                    this.node.getChildByName("_glow").active = !0
                }, t.prototype.onCloseLight = function() {
                    this.node.getChildByName("_glow").active = !1
                }, t.CURRENCY_LABEL_TAG_NAME = "CURRENCY_LABEL", i([s({
                    type: l
                })], t.prototype, "searchParams", void 0), t = i([a], t)
            }(cc.Component);
        n.default = u, cc._RF.pop()
    }, {
        "../../Utils/Pair": "Pair",
        "../Model/TableSearchStorage": "TableSearchStorage"
    }],
    TableSearchStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "d248esxR7lPlpa7lsTRnOZj", "TableSearchStorage");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "changeRoom", {
                    get: function() {
                        return n._changeRoom
                    },
                    set: function(e) {
                        n._changeRoom = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "startSearch", {
                    get: function() {
                        return n._startSearch
                    },
                    set: function(e) {
                        n._startSearch = e, e && (n._doSearching = !0)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "searchParams", {
                    get: function() {
                        return n._searchParams
                    },
                    set: function(e) {
                        n._searchParams = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "startCreate", {
                    get: function() {
                        return n._startCreate
                    },
                    set: function(e) {
                        n._startCreate = e, e && (n._doSearching = !0)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "doSearching", {
                    get: function() {
                        return n._doSearching
                    },
                    set: function(e) {
                        n._doSearching = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "tableInfo", {
                    get: function() {
                        return n._tableInfo
                    },
                    set: function(e) {
                        n._tableInfo = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "playersInfo", {
                    get: function() {
                        return n._playersInfo
                    },
                    set: function(e) {
                        n._playersInfo = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "sitDownReq", {
                    get: function() {
                        return n._sitDownReq
                    },
                    set: function(e) {
                        n._sitDownReq = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "standUpReq", {
                    get: function() {
                        return n._standUpReq
                    },
                    set: function(e) {
                        n._standUpReq = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "quitGameReq", {
                    get: function() {
                        return n._quitGameReq
                    },
                    set: function(e) {
                        n._quitGameReq = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._startSearch = !1, t._searchParams = {}, t._startCreate = !1, t._doSearching = !1, t._tableInfo = null, t._playersInfo = null, t._sitDownReq = !1, t._standUpReq = !1, t._quitGameReq = !1, t._changeRoom = !1, t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    TableSearch: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "1781aH1jwFA9b1sIgGBtb96", "TableSearch");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/TableSearchStorage")),
            c = e("../Model/NetConnector"),
            l = e("../../Config/Config"),
            u = e("../Model/BusinessStorage"),
            h = e("../Model/WalletStorage"),
            p = e("../Model/PromptDialogStorage"),
            f = e("../../Utils/RealMoneyPlatform"),
            d = e("../Model/UserInfoStorage"),
            _ = e("../../Utils/CCHelper"),
            g = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._tableSearchStorage = null, t._netConnector = null, t._isPending = !1, t._initOnPushMsg = !1, t._businessStorage = null, t._walletStorage = null, t._userInfo = null, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._tableSearchStorage = this.node.getComponent(s.default), this._netConnector = this.node.getComponent(c.default), this._businessStorage = this.node.getComponent(u.default), this._walletStorage = this.node.getComponent(h.default), this._userInfo = this.node.getComponent(d.default), f.default.walletInfo = this.node.getComponent(h.default)
                }, t.prototype.doSearchHandle = function() {
                    var e = this;
                    this._tableSearchStorage && this._netConnector && this._netConnector.socketConnector && this._tableSearchStorage.startSearch && !this._isPending && (cc.log("start searching Table "), this._tableSearchStorage.changeRoom && (this._tableSearchStorage.tableInfo = null, this._tableSearchStorage.playersInfo = null, this._businessStorage.clearAllData(), this._tableSearchStorage.changeRoom = !1), this._isPending = !0, this._netConnector.socketConnector.request(l.default.pomeloRoute.searchTable, c.default.makeWsPacket(this._tableSearchStorage.searchParams), function(t) {
                        e._isPending = !1, e._tableSearchStorage.startSearch = !1, !t || t.err ? (cc.log("searchTable error ", t), p.default.showMsg(l.default.ERR_CODE_OTHERS.toString())) : (cc.log("searchTable ", t), 200 == t.code ? (e._tableSearchStorage.tableInfo = t.data.table, e._tableSearchStorage.playersInfo = t.data.players, e._walletStorage.ratio = t.data.ratio ? t.data.ratio : 1, e._userInfo.roomLevel = t.data.roomLevel, e._userInfo.rmpcannonCost = _.default.getMyCannonCostList(t.data.rmpCannonCost, t.data.roomLevel)) : (e._tableSearchStorage.doSearching = !1, p.default.showMsg(l.default.ERR_CODE_OTHERS.toString())))
                    }))
                }, t.prototype.doCreateHandle = function() {
                    this._tableSearchStorage && this._netConnector && this._netConnector.socketConnector && this._tableSearchStorage.startCreate && this._isPending
                }, t.prototype.doSitDownRequest = function() {
                    this._tableSearchStorage && this._netConnector && this._netConnector.socketConnector && this._tableSearchStorage.sitDownReq && this._isPending
                }, t.prototype.doQuitGameRequest = function() {
                    var e = this;
                    this._tableSearchStorage && this._netConnector && this._netConnector.socketConnector && this._tableSearchStorage.quitGameReq && !this._isPending && (this._isPending = !0, this._netConnector.socketConnector.request(l.default.pomeloRoute.quitGame, c.default.makeWsPacket({}), function(t) {
                        e._tableSearchStorage.quitGameReq = !1, e._isPending = !1, !t || t.err ? (cc.log("quitGame error ", t), p.default.showMsg(l.default.ERR_CODE_OTHERS.toString())) : cc.log("quitGame ", t)
                    }))
                }, t.prototype.onPushMsg = function() {
                    var e = this;
                    this._initOnPushMsg || this._netConnector && this._netConnector.socketConnector && (this._initOnPushMsg = !0, this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onKick, function(e) {
                        cc.log("onKick ", e), p.default.showMsg(l.default.ERR_CODE_KICK_LOGOUT.toString())
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.joinTable, function(t) {
                        cc.log("onTableJoin ", t), e._tableSearchStorage.tableInfo = t.msg.table, e._tableSearchStorage.playersInfo = t.msg.players
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.quitTable, function(t) {
                        cc.log("quitTable ", t), e._tableSearchStorage.tableInfo = t.msg.table, e._tableSearchStorage.playersInfo = t.msg.players
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.sitDown, function(e) {
                        cc.log("onGameSitDown ", e)
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.standUp, function(e) {
                        cc.log("onGameStandUp ", e)
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.gameStart, function(t) {
                        if (cc.log("onGameStart ", t), e._businessStorage && (e._businessStorage.tableInfo = t.msg.table, e._businessStorage.playersInfo = t.msg.players, e._businessStorage.area = t.msg.area, e._businessStorage.areaPlayers = t.msg.areaPlayers, cc.log("game start area:", e._businessStorage.area), t.msg.playerId == e._userInfo.playerId)) {
                            e._businessStorage.startGame = !0;
                            for (var n = 0; n < e._businessStorage.playersInfo.length; n++)
                                if (e._businessStorage.playersInfo[n].id == e._userInfo.playerId) {
                                    e._businessStorage.maxBetSetLen = e._businessStorage.playersInfo[n].cannonMaxLen;
                                    break
                                }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.gameEnd, function(t) {
                        cc.log("onGameEnd ", t), e._businessStorage && (e._businessStorage.gameFinish = !0)
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.gameQuit, function(t) {
                        if (cc.log("gameQuit ", t), e._businessStorage) {
                            if (!e._businessStorage.tableInfo) return void(p.default.isShow() || p.default.showMsg(l.default.ERR_CODE_SYSTEM.toString()));
                            e._businessStorage.area = t.msg.area, e._businessStorage.areaPlayers = t.msg.areaPlayers;
                            for (var n = 0; n < t.msg.players.length; n++)
                                for (var o = e._businessStorage.tableInfo.chairIds, i = 0; i < o.length; i++)
                                    if (o[i] == t.msg.players[n].id) {
                                        e._businessStorage.tableInfo.chairIds[i] = "";
                                        break
                                    }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onFire, function(t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame || u.default._playview._isHideDrop) return;
                            e._businessStorage.pushBullet(t.msg.bullet)
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onColliderResult, function(t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame || u.default._playview._isHideDrop) return;
                            if (e._businessStorage.pushColliderResult(t.msg.result), e._userInfo.playerId == t.msg.player.id && t.msg.player.rmpRatioCredit > 0) {
                                var n = f.default.getRealMoney(f.default.convertCentsToCredits(t.msg.player.rmpRatioCredit));
                                e._userInfo.gold = n.rmp
                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onUpdateBalance, function(t) {
                        if (cc.log("onUpdateBalance ", t), e._businessStorage) {
                            if (!e._businessStorage.startGame) return;
                            if (e._userInfo.playerId == t.msg.pid) {
                                var n = f.default.getRealMoney(f.default.convertCentsToCredits(t.msg.balance));
                                e._userInfo.gold = n.rmp
                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onUpdateWallet, function(t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame) return;
                            if (e._userInfo.playerId == t.msg.playerId) {
                                var n = f.default.getRealMoney(f.default.convertCentsToCredits(t.msg.amount));
                                e._userInfo.gold = n.rmp
                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onUpdateCannon, function(t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame) return;
                            for (var n = e._businessStorage.areaPlayers, o = 0; o < n.length; o++)
                                if (n[o].playerId == t.msg.areaPlayer.playerId) {
                                    n[o] = t.msg.areaPlayer, n[o].playerId == e._userInfo.playerId && (e._businessStorage.maxBetSetLen = n[o].cannonMaxLen);
                                    break
                                }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onBulletBomb, function(t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame) return;
                            e._businessStorage.pushColliderResult(t.msg.bullets)
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onSpawnFishes, function(t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame || u.default._playview._isHideDrop) return;
                            if (e._businessStorage.battleBoss && (e._businessStorage.battleBoss = !1), e._businessStorage.area.stage && (e._businessStorage.area.stage = l.default.consts.AREA_STAGE_NORMAL), e._businessStorage.pushFishes(t.msg.fishes), u.default._playview && 0 != u.default._playview._hideStarttime) {
                                var n = (new Date).getTime() - u.default._playview._hideStarttime;
                                if (!u.default._playview) return;
                                var o = n / 1e3;
                                u.default._playview.update(o), u.default._playview._onHideUpdate(o), u.default._playview._hideStarttime = (new Date).getTime(), u.default._playview._onHideStackTime(n), u.default._playview.hideDrawCheck()
                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onSpawnGroup, function(t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame || u.default._playview._isHideDrop) return;
                            e._businessStorage.battleBoss = !0, e._businessStorage.area.stage = l.default.consts.AREA_STAGE_GROUP;
                            var n = t.msg.group;
                            n.fishes = t.msg.fishes, e._businessStorage.pushFishes(n)
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onChangeScene, function(t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame) return;
                            e._businessStorage.changeScene = !0, e._businessStorage.sceneId = t.msg.scene
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.CHAT_MESSAGE, function(t) {
                        e._businessStorage && e._businessStorage.pushChatMsgQueue(t.msg.msg)
                    }))
                }, t.prototype.update = function(e) {
                    this.doSearchHandle(), this.onPushMsg()
                }, t = i([a], t)
            }(cc.Component);
        n.default = g, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../Model/BusinessStorage": "BusinessStorage",
        "../Model/NetConnector": "NetConnector",
        "../Model/PromptDialogStorage": "PromptDialogStorage",
        "../Model/TableSearchStorage": "TableSearchStorage",
        "../Model/UserInfoStorage": "UserInfoStorage",
        "../Model/WalletStorage": "WalletStorage"
    }],
    TextButton: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "edf84qoIl9Ae72B3F8GFcHp", "TextButton");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.normalColor = cc.color(0, 0, 0), t.disableColor = cc.color(255, 255, 255), t._data = null, t._isInit = !1, t._enable = !0, t
                }
                var n;
                return o(t, e), n = t, t.prototype.onLoad = function() {
                    this._addToggleComponent(), this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this)
                }, t.prototype.setText = function(e) {
                    var t = this.node.getChildByName("_text");
                    t || (t = this._addToggleComponent());
                    var n = t.getComponent(cc.Label);
                    n && (n.string = e), this._enable ? t.color = this.normalColor : t.color = this.disableColor
                }, t.prototype.setData = function(e) {
                    this._data = e
                }, t.prototype.getData = function() {
                    return this._data
                }, t.prototype.enabledButton = function(e) {
                    this._enable = e;
                    var t = this.node.getComponent(cc.Button);
                    t && (t.interactable = e);
                    var n = this.node.getChildByName("_text");
                    n.color = e ? this.normalColor : this.disableColor
                }, t.prototype._addToggleComponent = function() {
                    var e = this.node.getChildByName("_text");
                    return e || ((e = new cc.Node("_text")).addComponent(cc.Label), this.node.addChild(e)), e
                }, t.prototype._onTouchEnd = function() {
                    this._enable && c.default.dispatchEvent(this.node, n.EVENT, cc.Node.EventType.TOUCH_END, this)
                }, t.EVENT = "TextButton", i([s({
                    type: cc.Color
                })], t.prototype, "normalColor", void 0), i([s({
                    type: cc.Color
                })], t.prototype, "disableColor", void 0), t = n = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    Thor: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a24b5qC2zpMabUJAoI3Q3lt", "Thor");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./uikiller"),
            a = cc._decorator,
            s = a.ccclass,
            c = a.executeInEditMode,
            l = function(t) {
                function n() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.useController = !1, e.controllerName = "", e._$ = null, e._bindHammer = !1, e.$controller = null, e
                }
                return o(n, t), n.prototype.__preload = function() {
                    this.bindHammer(), this.addEventListen()
                }, n.prototype.getOptions = function() {
                    return {
                        debug: !1
                    }
                }, n.prototype.bindHammer = function() {
                    if (!this._bindHammer) {
                        this._bindHammer = !0;
                        Date.now();
                        var e = this.getOptions();
                        this._$ = this, r.bindComponent(this, e), this.bindController()
                    }
                }, n.prototype.bindController = function() {
                    if (this.useController) {
                        var t = this.controllerName || this.__classname__ + "Controller",
                            n = e(t);
                        this.$controller = new n.default, r.bindNode(this.node, this.$controller)
                    }
                }, n.prototype.getChildNode = function(e) {
                    return this[e]
                }, n.prototype.addEventListen = function() {
                    this.node.on("child-added", this._onSomeChildAdd, this), this.node.on("child-removed", this._onSomeChildRemove, this)
                }, n.prototype._onSomeChildAdd = function(e) {}, n.prototype._onSomeChildRemove = function(e) {}, n = i([s, c], n)
            }(cc.Component);
        n.default = l, window.Thor = l, cc._RF.pop()
    }, {
        "./uikiller": "uikiller"
    }],
    ToggleText: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "d9fdbLI4pJLg5OR4uPyjZfd", "ToggleText");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.defaultColor = cc.color(255, 255, 255), t.highlightClr = cc.color(0, 0, 0), t._data = null, t._preState = null, t
                }
                var n;
                return o(t, e), n = t, t.prototype.onLoad = function() {
                    this._addToggleComponent(), this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this)
                }, Object.defineProperty(t.prototype, "text", {
                    get: function() {
                        var e = this.node.getChildByName("_text");
                        return e ? e.getComponent(cc.Label).string : ""
                    },
                    set: function(e) {
                        var t = this.node.getChildByName("_text");
                        t && (t.getComponent(cc.Label).string = e)
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.setData = function(e) {
                    this._data = e
                }, t.prototype.getData = function() {
                    return this._data
                }, t.prototype._addToggleComponent = function() {
                    var e = this.node.getComponent(cc.Toggle);
                    e || (e = this.node.addComponent(cc.Toggle));
                    var t = this.node.getChildByName("_checkmask");
                    t && (e.checkMark = t.getComponent(cc.Sprite)), e.isChecked = !1, e.interactable = !0
                }, t.prototype.check = function() {
                    var e = this.node.getComponent(cc.Toggle);
                    e && e.check()
                }, t.prototype.uncheck = function() {
                    var e = this.node.getComponent(cc.Toggle);
                    e && e.uncheck()
                }, t.prototype._onTouchEnd = function() {
                    c.default.dispatchEvent(this.node, n.EVENT, cc.Node.EventType.TOUCH_END, this)
                }, t.prototype.update = function(e) {
                    var t = this.node.getComponent(cc.Toggle);
                    if (null == this._preState || this._preState != t.isChecked) {
                        this._preState = t.isChecked;
                        var n = this.node.getChildByName("_text");
                        t.isChecked ? n.color = this.highlightClr : n.color = this.defaultColor
                    }
                }, t.EVENT = "ToggleText", i([s({
                    type: cc.Color
                })], t.prototype, "defaultColor", void 0), i([s({
                    type: cc.Color
                })], t.prototype, "highlightClr", void 0), t = n = i([a], t)
            }(cc.Component);
        n.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    TwLoginLocal: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "69363uu56NEo4YLBc7GSxmW", "TwLoginLocal");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/UserInfoStorage")),
            c = e("../../Utils/CCHelper"),
            l = e("../Model/PromptDialogStorage"),
            u = e("../Model/WalletStorage"),
            h = e("../../Utils/RealMoneyPlatform"),
            p = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.ssoRequestPacket = null, t._userInfoStorage = null, t._walletStorage = null, t._tryCount = 0, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._userInfoStorage = this.node.getComponent(s.default), this._walletStorage = this.node.getComponent(u.default), h.default.walletInfo = this.node.getComponent(u.default), this.checkUserInfo()
                }, t.prototype.checkUserInfo = function() {
                    var e = c.default.urlParse();
                    e.loginType = "web", 1 == e.m && (e.u = "G-" + Math.floor(1e8 * Math.random()) + 0), e.uid = e.u, "web" == e.loginType && (this.ssoRequestPacket = e)
                }, t.prototype.loginSuccess = function(e) {
                    this._tryCount = 0, this.ssoRequestPacket = null;
                    var t = e.playerId || e.openId;
                    if (cc.sys.localStorage.setItem("uid", t), this._userInfoStorage && (this._userInfoStorage.nickName = e.nickName, this._userInfoStorage.openId = e.openId, this._userInfoStorage.avatarUrl = e.avatarUrl, this._userInfoStorage.token = e.token, this._userInfoStorage.isLogin = !0, this._userInfoStorage.playerId = e.playerId ? e.playerId : "", this._userInfoStorage.gold = e.rmpCredit, this._userInfoStorage.money = e.rmpCredit), this._walletStorage && (this._walletStorage.currentDenomination = e.denom, this._walletStorage.currencyFractionDigits = e.currencyFractionDigits, this._walletStorage.currencySymbol = e.currencySymbol, this._walletStorage.currencySymbolInBack = e.currencySymbolInBack, this._walletStorage.thousandsGroupingSeparator = e.thousandGroupingSepartor, this._walletStorage.decimalSeparator = e.decimalSeparator), this._userInfoStorage) {
                        for (var n = [], o = 0; o < e.rmpCannonCost.length; o++) {
                            var i = h.default.getRealMoney(e.rmpCannonCost[o]);
                            n.push(i)
                        }
                        this._userInfoStorage.roomlevelCost = n, this._userInfoStorage.rmpcannonCost = e.rmpCannonCost
                    }
                    c.default.setRecommendData(e)
                }, t.prototype.loginFailed = function(e) {
                    l.default.showMsg(e.code), this.ssoRequestPacket = null
                }, t.prototype.retryLogin = function(e) {
                    this.ssoRequestPacket = null, this._tryCount <= 3 && ++this._tryCount, this._tryCount > 3 ? l.default.showMsg(e.code) : this.checkUserInfo()
                }, t = i([a], t)
            }(cc.Component);
        n.default = p, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../Model/PromptDialogStorage": "PromptDialogStorage",
        "../Model/UserInfoStorage": "UserInfoStorage",
        "../Model/WalletStorage": "WalletStorage"
    }],
    TwLoginWsConnector: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "36e0e/zoU9DObW74es/pgoz", "TwLoginWsConnector");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("./TwLoginLocal")),
            c = e("../../Config/Config"),
            l = e("../Model/NetConnector"),
            u = e("../../Utils/CCHelper"),
            h = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._twLoginLocal = null, t._netConnector = null, t._delayLogin = !1, t._delaytime = 0, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._twLoginLocal = this.node.getComponent(s.default), this._netConnector = this.node.getComponent(l.default)
                }, t.prototype.loginRequest = function() {
                    var e = this;
                    if (this._twLoginLocal && this._twLoginLocal.ssoRequestPacket && this._netConnector && this._netConnector.socketConnector) {
                        var t = this._netConnector.socketConnector;
                        e._twLoginLocal.ssoRequestPacket.appId = c.default.appId, e._twLoginLocal.ssoRequestPacket.gameId = c.default.gameId, e._twLoginLocal.ssoRequestPacket.isSpecialRoomMode = u.default.IsSpecialRoomMode(), t.request(c.default.pomeloRoute.twLogin, e._twLoginLocal.ssoRequestPacket, function(t) {
                            !t || t.err ? (cc.log("login error ", t), 105 === t.err ? e._delayLogin = !0 : e._twLoginLocal.loginFailed(t)) : (cc.log("login ", t), 200 === t.code ? (e._twLoginLocal.loginSuccess(t.data), t.data.token && (e._netConnector.jwtToken = t.data.token)) : e._twLoginLocal.retryLogin(t))
                        })
                    }
                }, t.prototype.doMock = function() {}, t.prototype.update = function(e) {
                    if (this._twLoginLocal && this._twLoginLocal.ssoRequestPacket && this._netConnector && this._netConnector.socketConnector) {
                        if (this._delaytime < 1) return void(this._delaytime += e);
                        this._delaytime = 0, this._delayLogin = !1, this.loginRequest(), this._twLoginLocal.ssoRequestPacket = null
                    }
                    this.doMock()
                }, t = i([a], t)
            }(cc.Component);
        n.default = h, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/CCHelper": "CCHelper",
        "../Model/NetConnector": "NetConnector",
        "./TwLoginLocal": "TwLoginLocal"
    }],
    UserInfoStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "6a583kzC/tM9rcNH/utUwEH", "UserInfoStorage");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "roomlevelCost", {
                    get: function() {
                        return n._roomlevelCost
                    },
                    set: function(e) {
                        n._roomlevelCost = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "rmpcannonCost", {
                    get: function() {
                        return n._rmpcannonCost
                    },
                    set: function(e) {
                        n._rmpcannonCost = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "roomLevel", {
                    get: function() {
                        return n._roomLevel
                    },
                    set: function(e) {
                        n._roomLevel = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "isLogin", {
                    get: function() {
                        return n._isLogin
                    },
                    set: function(e) {
                        n._isLogin = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "nickName", {
                    get: function() {
                        return n._nickName
                    },
                    set: function(e) {
                        n._nickName = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "openId", {
                    get: function() {
                        return n._openId
                    },
                    set: function(e) {
                        n._openId = e, n._getShareMessage().id = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "avatarUrl", {
                    get: function() {
                        return n._avatarUrl
                    },
                    set: function(e) {
                        n._avatarUrl = e, n._getShareMessage().hd = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "token", {
                    get: function() {
                        return n._token
                    },
                    set: function(e) {
                        n._token = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "gold", {
                    get: function() {
                        return n._gold
                    },
                    set: function(e) {
                        n._gold = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "playerId", {
                    get: function() {
                        return n._playerId
                    },
                    set: function(e) {
                        n._playerId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "money", {
                    get: function() {
                        return n._money
                    },
                    set: function(e) {
                        n._money = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "shareMessage", {
                    get: function() {
                        return n._shareMessage
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._getShareMessage = function() {
                    return n._shareMessage || (n._shareMessage = {}), n._shareMessage
                }, t._isLogin = !1, t._nickName = "", t._openId = "", t._avatarUrl = "", t._token = "", t._gold = 0, t._playerId = "", t._money = 0, t._roomLevel = 0, t._rmpcannonCost = [], t._roomlevelCost = [], t._shareMessage = null, t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    WalletStorage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e24bdWWvsJJxqc/0vHZIZL/", "WalletStorage");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, Object.defineProperty(t.prototype, "currentDenomination", {
                    get: function() {
                        return n._currentDenomination
                    },
                    set: function(e) {
                        n._currentDenomination = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "currencySymbol", {
                    get: function() {
                        return n._currencySymbol
                    },
                    set: function(e) {
                        n._currencySymbol = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "currencySymbolInBack", {
                    get: function() {
                        return n._currencySymbolInBack
                    },
                    set: function(e) {
                        n._currencySymbolInBack = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "thousandsGroupingSeparator", {
                    get: function() {
                        return n._thousandsGroupingSeparator
                    },
                    set: function(e) {
                        n._thousandsGroupingSeparator = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "decimalSeparator", {
                    get: function() {
                        return n._decimalSeparator
                    },
                    set: function(e) {
                        n._decimalSeparator = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "currencyFractionDigits", {
                    get: function() {
                        return n._currencyFractionDigits
                    },
                    set: function(e) {
                        n._currencyFractionDigits = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "balanceMeterConfig", {
                    get: function() {
                        return n._balanceMeterConfig
                    },
                    set: function(e) {
                        n._balanceMeterConfig = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "exchangeRatio", {
                    get: function() {
                        return n._exchangeRatio
                    },
                    set: function(e) {
                        n._exchangeRatio = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "exchangeScore", {
                    get: function() {
                        return n._exchangeScore
                    },
                    set: function(e) {
                        n._exchangeScore = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "credit", {
                    get: function() {
                        return n._credit
                    },
                    set: function(e) {
                        n._credit = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "score", {
                    get: function() {
                        return n._score
                    },
                    set: function(e) {
                        n._score = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "showExchangeUi", {
                    get: function() {
                        return n._showExchangeUi
                    },
                    set: function(e) {
                        n._showExchangeUi = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.getSelection = function() {
                    return n._selection
                }, Object.defineProperty(t.prototype, "ratio", {
                    get: function() {
                        return n._ratio
                    },
                    set: function(e) {
                        n._ratio = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.getCPS = function() {
                    return n._score * n._ratio * n._currentDenomination
                }, t.convertToCps = function(e, t) {
                    return e
                }, t._exchangeRatio = 0, t._exchangeScore = 0, t._credit = 0, t._score = 0, t._showExchangeUi = !1, t._selection = 1, t._ratio = 1, t._currencySymbol = null, t._currencySymbolInBack = !1, t._thousandsGroupingSeparator = ",", t._decimalSeparator = ".", t._currencyFractionDigits = 2, t._balanceMeterConfig = 0, t._currentDenomination = 1, t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    WebViewGameRecall: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "9098cdBYolPtJWtTEZFHmzz", "WebViewGameRecall");
        var o = this && this.__extends || function() {
                var e = function(t, n) {
                    return (e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        })(t, n)
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.webview = null, t
                }
                var n;
                return o(t, e), n = t, t.prototype.onLoad = function() {
                    var e = this;
                    n.instance = this, this.webview = this.node.getChildByName("_webView").getComponent(cc.WebView), this.webview.url = n.BLANK;
                    var t = this;
                    this.node.getChildByName("_closeBtn").on(cc.Node.EventType.TOUCH_END, function(o) {
                        t.webview.url = n.BLANK, e.useIOSWebView(!1), e.node.getChildByName("_closeBtn").active = !1, window.osdevice.iOS || (e.node.getChildByName("_webView").active = !1)
                    }), this.node.on(n.EVENT_OPEN, this.open, this)
                }, t.prototype.start = function() {
                    window.osdevice.iOS ? document.getElementById("Cocos2dGameContainer").children[1].style.zIndex = 5 : (document.getElementsByTagName("iframe")[0].style.zIndex = 5, this.node.getChildByName("_webView").active = !1);
                    this.useIOSWebView(!1);
                    var e = document.getElementsByClassName("gameCanvas")[0];
                    e.style.position = "relative", e.style.zIndex = 2, this.node.getChildByName("_closeBtn").active = !1
                }, t.prototype.open = function(e) {
                    this.useIOSWebView(!0), n.instance.node.getChildByName("_webView").active = !0;
                    var t = n.instance.node.getChildByName("_closeBtn");
                    t.x = n.instance.node.getChildByName("_webView").getContentSize().width / 2 + 20, t.y = n.instance.node.getChildByName("_webView").getContentSize().height / 2 - 40, t.active = !0, n.instance.webview.url = e
                }, t.getInstance = function() {
                    return n.instance
                }, t.prototype.disPatchEvent = function(e, t) {
                    n.instance.node.emit(e, t)
                }, t.prototype.useIOSWebView = function(e) {
                    if (window.osdevice.iOS) {
                        var t = document.getElementById("Cocos2dGameContainer").children;
                        t[1].style.zIndex = 5, t[1].style.display = e ? "block" : "none"
                    }
                }, t.EVENT_OPEN = "openGameRecall", t.BLANK = "about:blank", t.instance = null, t = n = i([a], t)
            }(cc.Component));
        n.default = s, cc._RF.pop()
    }, {}],
    WechatAvatarLoader: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "fe82c5tkZdBWa+0UrWPpV7N", "WechatAvatarLoader");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            },
            r = this && this.__awaiter || function(e, t, n, o) {
                return new(n || (n = Promise))(function(i, r) {
                    function a(e) {
                        try {
                            c(o.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(o.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        e.done ? i(e.value) : new n(function(t) {
                            t(e.value)
                        }).then(a, s)
                    }
                    c((o = o.apply(e, t || [])).next())
                })
            },
            a = this && this.__generator || function(e, t) {
                var n, o, i, r, a = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                    return this
                }), r;

                function s(e) {
                    return function(t) {
                        return c([e, t])
                    }
                }

                function c(r) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                        switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                            case 0:
                            case 1:
                                i = r;
                                break;
                            case 4:
                                return a.label++, {
                                    value: r[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, o = r[1], r = [0];
                                continue;
                            case 7:
                                r = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                    a.label = r[1];
                                    break
                                }
                                if (6 === r[0] && a.label < i[1]) {
                                    a.label = i[1], i = r;
                                    break
                                }
                                if (i && a.label < i[2]) {
                                    a.label = i[2], a.ops.push(r);
                                    break
                                }
                                i[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        r = t.call(e, a)
                    } catch (e) {
                        r = [6, e], o = 0
                    } finally {
                        n = i = 0
                    }
                    if (5 & r[0]) throw r[1];
                    return {
                        value: r[0] ? r[1] : void 0,
                        done: !0
                    }
                }
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = cc._decorator,
            c = s.ccclass,
            l = (s.property, e("es6-promise")),
            u = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                var n;
                return o(t, e), n = t, t.prototype.onLoad = function() {}, t.prototype.load = function(e, t) {
                    return r(this, void 0, void 0, function() {
                        var o, i;
                        return a(this, function(r) {
                            return o = this, e ? (i = e.substring(0, e.lastIndexOf("/") + 1) + "64", n._avatarCache[i] ? [2, n._avatarCache[i]] : [2, new l.Promise(function(e, r) {
                                o._loadRes(i, function(o) {
                                    o ? (t && (n._avatarCache[i] = o), e(o)) : e(null)
                                })
                            })]) : [2, null]
                        })
                    })
                }, t.prototype._loadRes = function(e, t) {
                    e ? cc.loader.load({
                        url: e,
                        type: "png"
                    }, function(e, n) {
                        e ? t && t(null) : t && t(n)
                    }) : t && t(null)
                }, t._avatarCache = {}, t = n = i([c], t)
            }(cc.Component);
        n.default = u, cc._RF.pop()
    }, {
        "es6-promise": 4
    }],
    WxWebOauth: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "21b92fae8JIq4aW3n42D/X3", "WxWebOauth");
        var o = this && this.__extends || function() {
                var e = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                };
                return function(t, n) {
                    function o() {
                        this.constructor = t
                    }
                    e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
                }
            }(),
            i = this && this.__decorate || function(e, t, n, o) {
                var i, r = arguments.length,
                    a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
                else
                    for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
                return r > 3 && a && Object.defineProperty(t, n, a), a
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = cc._decorator,
            s = a.ccclass,
            c = (a.property, function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._urlParams = null, t._isComplete = !1, t
                }
                return o(t, e), t.prototype.onLoad = function() {
                    this._urlParams = r.default.urlParse()
                }, t = i([s], t)
            }(cc.Component));
        n.default = c, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    "cocos-help": [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "64762NugJpC/6ETW46GD8US", "cocos-help"), cc.createPrefab = function(e, t) {
            cc.loader.loadRes(e, cc.Prefab, function(e, n) {
                var o = null;
                e ? cc.error("createPrefab " + e) : o = cc.instantiate(n), t && t(e, o)
            })
        }, cc.Component.prototype.createNode = function(e, t, n) {
            var o = this;
            cc.log("createNode " + t), cc.createPrefab(t, function(t, i) {
                e instanceof cc.Node ? e.addChild(i) : o.node && o.node instanceof cc.Node && o.node.addChild(i, 0), n && n(i)
            })
        }, cc.Component.prototype.destroyNode = function() {
            this.node && this.node.destroy()
        }, cc.Node.prototype.hasComponent = function(e) {
            var t = this;
            return Array.isArray(e) || (e = [e]), !!e.find(function(e) {
                return t.getComponent(e)
            })
        }, cc.Sprite.prototype.getTextureFilename = function() {
            if (this.spriteFrame) {
                var e = this.spriteFrame._textureFilename,
                    t = e.indexOf("resources/");
                return e.substr(t + 10)
            }
            return ""
        }, cc.getSpriteFrameByAtlas = function(e, t) {
            var n = cc.path.mainFileName(e),
                o = cc.loader.getRes(n, cc.SpriteAtlas);
            return o ? o.getSpriteFrame(t) : null
        }, cc.createNodeComponent = function(e) {
            return (new cc.Node).addComponent(e)
        }, cc.Component.prototype.loadScene = function(e, t, n) {
            cc.director.loadScene(t, n)
        }, cc._RF.pop()
    }, {}],
    en: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "c178dxcKLNJfKddMNzyhVeR", "en"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.en = {
            "text.loading": "LOADING",
            "text.search": "SEARCHING",
            "text.ok": "OK",
            "text.cancel": "CANCEL",
            "text.locktarget": "LOCK",
            "text.unlocktarget": "UNLOCK",
            "text.autofire": "AUTO",
            "text.autofire.stop": "STOP",
            "text.quit": "QUIT",
            "text.paytable": "PAY TABLE",
            "text.waitforplayer": "WAITING FOR PLAYER",
            "text.locking": "CLICK ON FISH TO ATTACK",
            "text.androidfullscreen": "Click the button above to turn on the full screen for the best visual experience!!",
            "text.recommend.title": "PLAY MORE KA GAME",
            "text.reminder.optionmenu": "OPTION MENU",
            "text.reminder.lockfish": "LOCK TARGET",
            "text.reminder.autofire": "AUTO SHOOTING",
            "text.recall.date": "DATE",
            "text.recall.tid": "ID",
            "text.recall.bullets": "BULLETS",
            "text.recall.totalwager": "BET",
            "text.recall.totalwin": "RESULT",
            "text.recall.title": "GAME RECORD",
            "text.recall.empty": "EMPTY DATA",
            "text.room.pick": " ",
            "text.room.roomA": "BRONZE",
            "text.room.roomB": "SILVER",
            "text.room.roomC": "GOLD",
            "text.bossbattle.wait": "PLEASE WAIT BOSS BATTLE TO END",
            "ask.logout": "Do you really want to exit the game?",
            "error.network": "A network error occurred. Please check your connection and reload.",
            "error.balance": "Your balance is insufficient to play the current bet. Please lower your bet and try again.",
            "error.kick": "Your session has been logged out. Please reload the page and try again.",
            "error.other": "Your balance is intact. Please reload and try again.",
            "fish.name.fish_01": "FREEZE BOMB",
            "fish.name.fish_02": "BLUE WHALE",
            "fish.name.fish_03": "GOLD SHARK",
            "fish.name.fish_04": "SPERM WHALE",
            "fish.name.fish_05": "KILLER WHALE",
            "fish.name.fish_06": "SWORDFISH",
            "fish.name.fish_07": "HAMMERHEAD SHARK",
            "fish.name.fish_08": "STINGRAY",
            "fish.name.fish_09": "FIGHTING FISH",
            "fish.name.fish_10": "LANTERN FISH",
            "fish.name.fish_11": "FLOUNDER",
            "fish.name.fish_12": "PUFFER",
            "fish.name.fish_13": "FLUORESCENT FISH",
            "fish.name.fish_14": "TURTLE",
            "fish.name.fish_15": "SQUID",
            "fish.name.fish_16": "TROPICAL FISH",
            "fish.name.fish_17": "LOBSTER",
            "fish.name.fish_18": "FIGHTING FISH",
            "fish.name.fish_19": "CLOWNFISH",
            "fish.name.fish_20": "KISSING FISH",
            "fish.name.fish_21": "TADPOLE",
            "fish.name.fish_22": "SCORPION FISH",
            "fish.name.lightning": "LIGHTNING CHAIN",
            "fish.name.award": "LUCKY AURA",
            "fish.pt.inst.title": "KA FISH HUNTER RULES",
            "fish.pt.inst.award": "SPECIAL BONUS - Wins of any fish type with this aura multiply the wins by 3x, 4x or 7x.",
            "fish.pt.inst.chain": "CHAIN WIN - Wins of any fish with this aura will cause a chain reaction and kill a certain number of the same species.",
            "fish.pt.inst.bomb": "FREEZE BOMB - Wins when the bomb is successfully killed, all the fish on the screen become frozen and stop acting"
        }, cc._RF.pop()
    }, {}],
    ja: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "1c976GXABpDK7qXZ97L9Hrd", "ja"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.ja = {
            "text.loading": "\u8aad\u307f\u8fbc\u307f\u4e2d",
            "text.search": "\u691c\u7d22\u4e2d",
            "text.ok": "\u30aa\u30c3\u30b1\u30fc",
            "text.cancel": "\u30ad\u30e3\u30f3\u30bb\u30eb",
            "text.locktarget": "\u30ed\u30c3\u30af",
            "text.unlocktarget": "\u30ed\u30c3\u30af\u89e3\u9664",
            "text.autofire": "\u30aa\u30fc\u30c8",
            "text.autofire.stop": "\u30b9\u30c8\u30c3\u30d7",
            "text.quit": "\u7d42\u4e86",
            "text.paytable": "\u9b5a\u306e\u7a2e\u985e",
            "text.waitforplayer": "\u53c2\u52a0\u3092\u5f85\u3063\u3066\u3044\u307e\u3059",
            "text.locking": "\u653b\u6483\u3059\u308b\u306b\u306f\u9b5a\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044",
            "error.network": "\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u63a5\u7d9a\u3092\u78ba\u8a8d\u3057\u3066\u30ea\u30ed\u30fc\u30c9\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
            "error.balance": "\u73fe\u5728\u306e\u30d9\u30c3\u30c8\u3092\u30d7\u30ec\u30a4\u3059\u308b\u306b\u306f\u6b8b\u9ad8\u304c\u4e0d\u8db3\u3057\u3066\u3044\u307e\u3059\u3002\u30d9\u30c3\u30c8\u3092\u4e0b\u3052\u3066\u3001\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002",
            "error.kick": "\u30b7\u30b9\u30c6\u30e0\u304c\u30ed\u30b0\u30a2\u30a6\u30c8\u3092\u691c\u51fa\u3057\u307e\u3057\u305f\u3002\u30ea\u30ed\u30fc\u30c9\u3057\u3066\u8a66\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
            "error.other": "\u6b8b\u9ad8\u306f\u305d\u306e\u307e\u307e\u3067\u3059\u3002\u518d\u30ea\u30ed\u30fc\u30c9\u3057\u3066\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002",
            "text.androidfullscreen": "\u4e0a\u306e\u30dc\u30bf\u30f3\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u5168\u753b\u9762\u3092\u958b\u304d\u3001\u6700\u9ad8\u54c1\u8cea\u306e\u8996\u899a\u4f53\u9a13\u3092\u4f53\u9a13\u3057\u3066\u304f\u3060\u3055\u3044!!",
            "text.recommend.title": "KA GAMES\u3092\u3082\u3063\u3068\u904a\u3076",
            "text.reminder.optionmenu": "\u30aa\u30d7\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc",
            "text.reminder.lockfish": "\u30bf\u30fc\u30b2\u30c3\u30c8\u3092\u30ed\u30c3\u30af",
            "text.reminder.autofire": "\u81ea\u52d5\u653b\u6483",
            "text.recall.date": "\u65e5\u4ed8",
            "text.recall.tid": "\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3",
            "text.recall.bullets": "\u767a\u5c04\u3055\u308c\u305f\u5f3e\u4e38",
            "text.recall.totalwager": "\u3059\u3079\u3066\u306e\u8ced\u3051",
            "text.recall.totalwin": "\u52dd\u3061\u8ca0\u3051\u306e\u7d50\u679c",
            "text.recall.title": "\u30b2\u30fc\u30e0\u8a18\u9332",
            "text.recall.empty": "\u7a7a\u306e\u30c7\u30fc\u30bf",
            "text.room.pick": "  ",
            "text.room.roomA": "\u30d6\u30ed\u30f3\u30ba\u30d5\u30a3\u30fc\u30eb\u30c9",
            "text.room.roomB": "\u30b7\u30eb\u30d0\u30fc\u30d5\u30a3\u30fc\u30eb\u30c9",
            "text.room.roomC": "\u91d1\u30e1\u30c0\u30eb\u30d5\u30a3\u30fc\u30eb\u30c9",
            "text.bossbattle.wait": "BOSS\u30d0\u30c8\u30eb\u30bf\u30a4\u30e0\u306e\u7d42\u4e86\u3092\u304a\u5f85\u3061\u4e0b\u3055\u3044",
            "ask.logout": "\u30b2\u30fc\u30e0\u3092\u7d42\u4e86\u3057\u307e\u3059\u304b\uff1f",
            "fish.name.fish_01": "\u51cd\u7d50\u7206\u5f3e",
            "fish.name.fish_02": "\u30b7\u30ed\u30ca\u30ac\u30b9\u30af\u30b8\u30e9",
            "fish.name.fish_03": "\u30b4\u30fc\u30eb\u30c9 \u30b5\u30e1",
            "fish.name.fish_04": "\u30de\u30c3\u30b3\u30a6\u30af\u30b8\u30e9",
            "fish.name.fish_05": "\u30b7\u30e3\u30c1",
            "fish.name.fish_06": "\u30e1\u30ab\u30b8\u30ad",
            "fish.name.fish_07": "\u30b7\u30e5\u30e2\u30af\u30b6\u30e1",
            "fish.name.fish_08": "\u30b9\u30c6\u30a3\u30f3\u30b0\u30ec\u30a4",
            "fish.name.fish_09": "\u30d5\u30a1\u30a4\u30c6\u30a3\u30f3\u30b0\u30d5\u30a3\u30c3\u30b7\u30e5",
            "fish.name.fish_10": "\u30e9\u30f3\u30bf\u30f3\u9b5a",
            "fish.name.fish_11": "\u30d2\u30e9\u30e1",
            "fish.name.fish_12": "\u30d1\u30d5\u30a1\u30fc",
            "fish.name.fish_13": "\u86cd\u5149\u9b5a",
            "fish.name.fish_14": "\u30a4\u30df\u30ac\u30e1",
            "fish.name.fish_15": "\u30c8\u30f3\u30dc\u9b5a",
            "fish.name.fish_16": "\u71b1\u5e2f\u9b5a",
            "fish.name.fish_17": "\u30ed\u30d6\u30b9\u30bf\u30fc",
            "fish.name.fish_18": "\u30d5\u30a1\u30a4\u30c6\u30a3\u30f3\u30b0\u30d5\u30a3\u30c3\u30b7\u30e5",
            "fish.name.fish_19": "\u30ab\u30af\u30ec\u30af\u30de\u30ce\u30df",
            "fish.name.fish_20": "\u30ad\u30c3\u30b7\u30f3\u30b0\u30d5\u30a3\u30c3\u30b7\u30e5",
            "fish.name.fish_21": "\u30aa\u30bf\u30de\u30b8\u30e3\u30af\u30b7",
            "fish.name.fish_22": "\u30b7\u30e9\u30b9",
            "fish.name.lightning": "\u30e9\u30a4\u30c8\u30cb\u30f3\u30b0\u30c1\u30a7\u30fc\u30f3",
            "fish.name.award": "\u30e9\u30c3\u30ad\u30fc\u30aa\u30fc\u30e9",
            "fish.pt.inst.title": "\u9b5a\u30b2\u30fc\u30e0\u306e\u30eb\u30fc\u30eb",
            "fish.pt.inst.award": "\u7279\u5225\u30dc\u30fc\u30ca\u30b9 - \u3053\u306e\u30aa\u30fc\u30e9\u3092\u6301\u3064\u3042\u3089\u3086\u308b\u9b5a\u7a2e\u306e\u52dd\u5229\u306f\u3001\u52dd\u5229\u306b3\u500d\u30014\u500d\u3001\u307e\u305f\u306f7\u500d\u3092\u639b\u3051\u307e\u3059\u3002",
            "fish.pt.inst.chain": "\u9023\u9396\u52dd\u5229 - \u3053\u306e\u30aa\u30fc\u30e9\u304c\u6bba\u3055\u308c\u308b\u9b5a\u7a2e\u306f\u9023\u9396\u53cd\u5fdc\u3092\u5f15\u304d\u8d77\u3053\u3057\u3001\u7279\u5b9a\u306e\u6570\u306e\u540c\u3058\u306a\u9b5a\u7a2e\u3092\u6bba\u3057\u307e\u3059\u3002",
            "fish.pt.inst.bomb": "\u7206\u5f3e\u51cd\u7d50 - \u7206\u5f3e\u304c\u9996\u5c3e\u3088\u304f\u6bba\u3055\u308c\u308b\u3068\u3001\u753b\u9762\u4e0a\u306e\u3059\u3079\u3066\u306e\u9b5a\u304c\u51cd\u7d50\u3057\u3001\u884c\u52d5\u3092\u505c\u6b62\u3057\u307e\u3059\u3002"
        }, cc._RF.pop()
    }, {}],
    ko: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "aeb7dDeysRKkKEHYlOJjxCv", "ko"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.ko = {
            "text.loading": "LOADING",
            "text.search": "SEARCHING",
            "text.ok": "OK",
            "text.cancel": "CANCEL",
            "text.locktarget": "LOCK",
            "text.unlocktarget": "UNLOCK",
            "text.autofire": "AUTO",
            "text.autofire.stop": "STOP",
            "text.quit": "QUIT",
            "text.paytable": "PAY TABLE",
            "text.waitforplayer": "WAITING FOR PLAYER",
            "text.locking": "CLICK ON FISH TO TARGET",
            "text.androidfullscreen": "Click the button to enable full screen",
            "text.recommend.title": "PLAY MORE KA GAMES",
            "text.reminder.optionmenu": "OPTION MENU",
            "text.reminder.lockfish": "LOCK TARGET",
            "text.reminder.autofire": "AUTO FIRE",
            "text.recall.date": "DATE",
            "text.recall.tid": "ID",
            "text.recall.bullets": "BULLETS",
            "text.recall.totalwager": "BET",
            "text.recall.totalwin": "RESULT",
            "text.recall.title": "GAME RECORD",
            "text.recall.empty": "EMPTY DATA",
            "text.room.pick": " ",
            "text.room.roomA": "BRONZE",
            "text.room.roomB": "SILVER",
            "text.room.roomC": "GOLD",
            "text.bossbattle.wait": "PLEASE WAIT FOR BOSS BATTLE TO END",
            "ask.logout": "Do you really want to exit the game?",
            "error.network": "A network error occurred. Please check your connection and reload.",
            "error.balance": "Your balance is insufficient to play the current bet. Please lower your bet and try again.",
            "error.kick": "Your session has been logged out. Please reload the page and try again.",
            "error.other": "Your balance is intact. Please reload and try again.",
            "fish.pt.inst.title": "GOLDEN DRAGON RULES",
            "fish.pt.inst.chain": "CRYSTAL WIN - Wins of this type will cause a chain reaction and kill all other crystals on the screen.",
            "fish.pt.inst.bomb": "FREEZE BOMB - Wins when the bomb is successfully killed, all the fish on the screen become frozen and stop moving"
        }, cc._RF.pop()
    }, {}],
    "polyglot.min": [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        (function(e, i) {
            "function" == typeof define && define.amd ? define([], function() {
                return i(e)
            }) : "object" == (void 0 === n ? "undefined" : o(n)) ? t.exports = i(e) : e.Polyglot = i(e)
        })(void 0, function(e) {
            function t(e) {
                e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", this.allowMissing = !!e.allowMissing, this.warn = e.warn || l
            }

            function n(e) {
                var t, n, o, i = {};
                for (t in e)
                    if (e.hasOwnProperty(t))
                        for (o in n = e[t]) i[n[o]] = t;
                return i
            }

            function i(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }

            function r(e, t, n) {
                var o, r;
                return null != n && e ? o = i((r = e.split(h))[s(t, n)] || r[0]) : o = e, o
            }

            function a(e) {
                var t = n(f);
                return t[e] || t.en
            }

            function s(e, t) {
                return p[a(e)](t)
            }

            function c(e, t) {
                for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
                return e
            }

            function l(t) {
                e.console && e.console.warn && e.console.warn("WARNING: " + t)
            }

            function u(e) {
                var t = {};
                for (var n in e) t[n] = e[n];
                return t
            }
            t.VERSION = "0.4.3", t.prototype.locale = function(e) {
                return e && (this.currentLocale = e), this.currentLocale
            }, t.prototype.extend = function(e, t) {
                var n;
                for (var i in e) e.hasOwnProperty(i) && (n = e[i], t && (i = t + "." + i), "object" == (void 0 === n ? "undefined" : o(n)) ? this.extend(n, i) : this.phrases[i] = n)
            }, t.prototype.clear = function() {
                this.phrases = {}
            }, t.prototype.replace = function(e) {
                this.clear(), this.extend(e)
            }, t.prototype.t = function(e, t) {
                var n, o;
                return "number" == typeof(t = null == t ? {} : t) && (t = {
                    smart_count: t
                }), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), o = e), "string" == typeof n && (t = u(t), o = c(o = r(n, this.currentLocale, t.smart_count), t)), o
            }, t.prototype.has = function(e) {
                return e in this.phrases
            };
            var h = "||||",
                p = {
                    chinese: function(e) {
                        return 0
                    },
                    german: function(e) {
                        return 1 !== e ? 1 : 0
                    },
                    french: function(e) {
                        return e > 1 ? 1 : 0
                    },
                    russian: function(e) {
                        return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                    },
                    czech: function(e) {
                        return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2
                    },
                    polish: function(e) {
                        return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                    },
                    icelandic: function(e) {
                        return e % 10 != 1 || e % 100 == 11 ? 1 : 0
                    }
                },
                f = {
                    chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                    german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                    french: ["fr", "tl", "pt-br"],
                    russian: ["hr", "ru"],
                    czech: ["cs"],
                    polish: ["pl"],
                    icelandic: ["is"]
                };
            return t
        }), cc._RF.pop()
    }, {}],
    ru: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "c18d4qlJIRPa6HT54xeak3f", "ru"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.ru = {
            "text.loading": "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430",
            "text.search": "\u041f\u043e\u0438\u0441\u043a",
            "text.ok": "OK",
            "text.cancel": "\u041e\u0442\u043c\u0435\u043d\u0430",
            "text.locktarget": "\u0431\u043b\u043e\u043a.",
            "text.unlocktarget": "\u043e\u0442\u043a\u0440.",
            "text.autofire": "\u0410\u0432\u0442\u043e",
            "text.autofire.stop": "\u0421\u0442\u043e\u043f",
            "text.quit": "\u0412\u044b\u0445\u043e\u0434",
            "text.paytable": "\u043f\u0440\u0430\u0432\u0438\u043b\u0430",
            "text.waitforplayer": "\u0416\u0434\u0451\u043c \u0438\u0433\u0440\u043e\u043a\u0430",
            "text.locking": "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u0440\u044b\u0431\u0443, \u0447\u0442\u043e \u0431\u044b \u043d\u0430\u0447\u0430\u0442\u044c \u0441\u0442\u0440\u0435\u043b\u044f\u0442\u044c",
            "text.androidfullscreen": "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443 \u0432\u044b\u0448\u0435, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043f\u043e\u043b\u043d\u044b\u0439 \u044d\u043a\u0440\u0430\u043d \u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043d\u0430\u0438\u043b\u0443\u0447\u0448\u0435\u0435 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f!",
            "text.recommend.title": "\u0418\u0433\u0440\u0430\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u0438\u0433\u0440 \u043e\u0442 KA",
            "ask.logout": "\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u044b\u0439\u0442\u0438 \u0438\u0437 \u0438\u0433\u0440\u044b?",
            "text.reminder.optionmenu": "\u041c\u0435\u043d\u044e",
            "text.reminder.lockfish": "\u0424\u0438\u043a\u0441\u0430\u0446\u0438\u044f \u043f\u0440\u0438\u0446\u0435\u043b\u0430",
            "text.reminder.autofire": "\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0441\u0442\u0440\u0435\u043b\u044c\u0431\u0430",
            "text.recall.date": "\u0414\u0430\u0442\u0430",
            "text.recall.tid": "\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0438",
            "text.recall.bullets": "\u0412\u044b\u043f\u0443\u0449\u0435\u043d\u043d\u044b\u0435 \u043f\u0443\u043b\u0438",
            "text.recall.totalwager": "\u0421\u0443\u043c\u043c\u0430 \u0441\u0442\u0430\u0432\u043a\u0438",
            "text.recall.totalwin": "\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442",
            "text.recall.title": "\u0417\u0430\u043f\u0438\u0441\u044c \u0438\u0433\u0440\u044b",
            "text.recall.empty": "\u041f\u0443\u0441\u0442\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435",
            "text.room.pick": "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0441\u0442\u0430\u0432\u043e\u043a",
            "text.room.roomA": "\u0411\u0420\u041e\u041d\u0417\u0410",
            "text.room.roomB": "\u0421\u0415\u0420\u0415\u0411\u0420\u041e",
            "text.room.roomC": "\u0417\u041e\u041b\u041e\u0422\u041e",
            "text.bossbattle.wait": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435, \u043f\u043e\u043a\u0430 \u0434\u0440\u0443\u0433\u0438\u0435 \u0438\u0433\u0440\u043e\u043a\u0438 \u043e\u043a\u043e\u043d\u0447\u0430\u0442 \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0431\u043e\u0441\u0441\u0430.",
            "error.network": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0442\u0438. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0438 \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0433\u0440\u0443.",
            "error.balance": "\u0412\u0430\u0448 \u0431\u0430\u043b\u0430\u043d\u0441 \u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u0435\u043d \u0434\u043b\u044f \u0438\u0433\u0440\u044b \u043f\u043e \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u0439 \u0441\u0442\u0430\u0432\u043a\u0435. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0438\u0433\u0440\u0430\u0439\u0442\u0435 \u043f\u043e \u0431\u043e\u043b\u0435\u0435 \u043d\u0438\u0437\u043a\u043e\u0439 \u0441\u0442\u0430\u0432\u043a\u0435 \u0438\u043b\u0438 \u0432\u043d\u0435\u0441\u0438\u0442\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0441\u0440\u0435\u0434\u0441\u0442\u0432.",
            "error.kick": "\u0412\u0430\u0448\u0430 \u0441\u0435\u0441\u0441\u0438\u044f \u0431\u044b\u043b\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",
            "error.other": "\u0412\u0430\u0448 \u0431\u0430\u043b\u0430\u043d\u0441 \u0432 \u043f\u043e\u0440\u044f\u0434\u043a\u0435. \u041f\u0435\u0440\u0435\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0440\u0430\u043d\u0438\u0446\u0443 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430.",
            "fish.name.fish_01": "\u041b\u0435\u0434\u044f\u043d\u0430\u044f \u0431\u043e\u043c\u0431\u0430",
            "fish.name.fish_02": "\u0421\u0438\u043d\u0438\u0439 \u043a\u0438\u0442",
            "fish.name.fish_03": "\u0417\u043e\u043b\u043e\u0442\u0430\u044f \u0430\u043a\u0443\u043b\u0430",
            "fish.name.fish_04": "\u041a\u0430\u0448\u0430\u043b\u043e\u0442",
            "fish.name.fish_05": "\u041a\u043e\u0441\u0430\u0442\u043a\u0430",
            "fish.name.fish_06": "\u0420\u044b\u0431\u0430-\u043c\u0435\u0447",
            "fish.name.fish_07": "\u0420\u044b\u0431\u0430-\u043c\u043e\u043b\u043e\u0442",
            "fish.name.fish_08": "\u0421\u043a\u0430\u0442",
            "fish.name.fish_09": "\u041f\u0435\u0442\u0443\u0448\u043e\u043a",
            "fish.name.fish_10": "\u0420\u044b\u0431\u0430-\u0444\u043e\u043d\u0430\u0440\u044c",
            "fish.name.fish_11": "\u041a\u0430\u043c\u0431\u0430\u043b\u0430",
            "fish.name.fish_12": "\u0424\u0443\u0433\u0443",
            "fish.name.fish_13": "\u0413\u043b\u043e\u0443\u0444\u0438\u0448",
            "fish.name.fish_14": "\u0427\u0435\u0440\u0435\u043f\u0430\u0445\u0430",
            "fish.name.fish_15": "\u041a\u0430\u043b\u044c\u043c\u0430\u0440",
            "fish.name.fish_16": "\u0422\u0440\u043e\u043f\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0440\u044b\u0431\u0430",
            "fish.name.fish_17": "\u041b\u043e\u0431\u0441\u0442\u0435\u0440",
            "fish.name.fish_18": "\u041f\u0435\u0442\u0443\u0448\u043e\u043a",
            "fish.name.fish_19": "\u0420\u044b\u0431\u0430-\u043a\u043b\u043e\u0443\u043d",
            "fish.name.fish_20": "\u0426\u0435\u043b\u0443\u044e\u0449\u0438\u0439\u0441\u044f \u0433\u0443\u0440\u0430\u043c\u0438",
            "fish.name.fish_21": "\u0413\u043e\u043b\u043e\u0432\u0430\u0441\u0442\u0438\u043a",
            "fish.name.fish_22": "\u0421\u043a\u043e\u0440\u043f\u0438\u043e\u043d\u043e\u0432\u0430\u044f \u0440\u0430\u0431\u044b",
            "fish.name.lightning": "\u0428\u0430\u0440\u043e\u0432\u0430\u044f \u043c\u043e\u043b\u043d\u0438\u044f",
            "fish.name.award": "\u0410\u0443\u0440\u0430 \u0443\u0434\u0430\u0447\u0438",
            "fish.pt.inst.title": "\u041f\u0440\u0430\u0432\u0438\u043b\u0430 KA Fish Hunter",
            "fish.pt.inst.award": "\u0421\u041f\u0415\u0426\u0418\u0410\u041b\u042c\u041d\u042b\u0419 \u0411\u041e\u041d\u0423\u0421 - \u0432\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u043b\u044e\u0431\u043e\u0433\u043e \u0442\u0438\u043f\u0430 \u0440\u044b\u0431\u044b \u0441 \u044d\u0442\u043e\u0439 \u0430\u0443\u0440\u043e\u0439 \u0443\u043c\u043d\u043e\u0436\u0430\u044e\u0442 \u0432\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u0432 3, 4 \u0438\u043b\u0438 7 \u0440\u0430\u0437.",
            "fish.pt.inst.chain": "\u0426\u0435\u043f\u043d\u0430\u044f \u0440\u0435\u0430\u043a\u0446\u0438\u044f. \u041f\u043e\u0431\u0435\u0434\u0430 \u043b\u044e\u0431\u043e\u0439 \u0440\u044b\u0431\u044b \u0441 \u044d\u0442\u043e\u0439 \u0430\u0443\u0440\u043e\u0439 \u0432\u044b\u0437\u043e\u0432\u0435\u0442 \u0446\u0435\u043f\u043d\u0443\u044e \u0440\u0435\u0430\u043a\u0446\u0438\u044e \u0438 \u0443\u0431\u044c\u0435\u0442 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u043d\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0442\u0435\u0445 \u0436\u0435 \u0432\u0438\u0434\u043e\u0432.",
            "fish.pt.inst.bomb": "\u041b\u0435\u0434\u044f\u043d\u0430\u044f \u0431\u043e\u043c\u0431\u0430 - \u0441\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0435\u0442, \u043a\u043e\u0433\u0434\u0430 \u0431\u043e\u043c\u0431\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0432\u0437\u043e\u0440\u0432\u0430\u043d\u0430, \u0432\u0441\u0435 \u0440\u044b\u0431\u044b \u043d\u0430 \u044d\u043a\u0440\u0430\u043d\u0435 \u0437\u0430\u043c\u0435\u0440\u0437\u0430\u044e\u0442 \u0438 \u043f\u0435\u0440\u0435\u0441\u0442\u0430\u044e\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u043e\u0432\u0430\u0442\u044c"
        }, cc._RF.pop()
    }, {}],
    th: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "7fefdH5hWBJDYy7rVoulvGY", "th"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.th = {
            "text.loading": "\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14",
            "text.search": "\u0e04\u0e49\u0e19\u0e2b\u0e32",
            "text.ok": "\u0e42\u0e2d\u0e40\u0e04",
            "text.cancel": "\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",
            "text.locktarget": "\u0e25\u0e47\u0e2d\u0e01",
            "text.unlocktarget": "\u0e40\u0e1b\u0e34\u0e14\u0e25\u0e47\u0e2d\u0e01",
            "text.autofire": "\u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34",
            "text.autofire.stop": "\u0e2b\u0e22\u0e38\u0e14",
            "text.quit": "\u0e2d\u0e2d\u0e01",
            "text.paytable": "\u0e0a\u0e19\u0e34\u0e14\u0e02\u0e2d\u0e07\u0e1b\u0e25\u0e32",
            "text.waitforplayer": "\u0e23\u0e2d\u0e43\u0e2b\u0e49\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e40\u0e02\u0e49\u0e32\u0e23\u0e48\u0e27\u0e21",
            "text.locking": "\u0e04\u0e25\u0e34\u0e01\u0e17\u0e35\u0e48\u0e1b\u0e25\u0e32\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e42\u0e08\u0e21\u0e15\u0e35",
            "text.androidfullscreen": "\u0e04\u0e25\u0e34\u0e01\u0e1b\u0e38\u0e48\u0e21\u0e14\u0e49\u0e32\u0e19\u0e1a\u0e19\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e40\u0e1b\u0e34\u0e14\u0e41\u0e1a\u0e1a\u0e40\u0e15\u0e47\u0e21\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d\u0e41\u0e25\u0e30\u0e2a\u0e31\u0e21\u0e1c\u0e31\u0e2a\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c\u0e20\u0e32\u0e1e\u0e17\u0e35\u0e48\u0e21\u0e35\u0e04\u0e38\u0e13\u0e20\u0e32\u0e1e\u0e14\u0e35\u0e17\u0e35\u0e48\u0e2a\u0e38\u0e14 !!",
            "text.recommend.title": "\u0e40\u0e25\u0e48\u0e19\u0e40\u0e01\u0e21\u0e2a\u0e4c KA \u0e21\u0e32\u0e01\u0e02\u0e36\u0e49\u0e19",
            "text.reminder.optionmenu": "\u0e40\u0e21\u0e19\u0e39\u0e15\u0e31\u0e27\u0e40\u0e25\u0e37\u0e2d\u0e01",
            "text.reminder.lockfish": "\u0e1b\u0e25\u0e32\u0e25\u0e47\u0e2d\u0e04",
            "text.reminder.autofire": "\u0e22\u0e34\u0e07\u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34",
            "text.recall.date": "\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48",
            "text.recall.tid": "\u0e01\u0e32\u0e23\u0e17\u0e33\u0e18\u0e38\u0e23\u0e01\u0e23\u0e23\u0e21",
            "text.recall.bullets": "\u0e01\u0e23\u0e30\u0e2a\u0e38\u0e19\u0e16\u0e39\u0e01\u0e22\u0e34\u0e07",
            "text.recall.totalwager": "\u0e08\u0e33\u0e19\u0e27\u0e19\u0e40\u0e07\u0e34\u0e19\u0e40\u0e14\u0e34\u0e21\u0e1e\u0e31\u0e19",
            "text.recall.totalwin": "\u0e1c\u0e25\u0e17\u0e35\u0e48\u0e44\u0e14\u0e49",
            "text.recall.title": "\u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e40\u0e01\u0e21",
            "text.recall.empty": "\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e27\u0e48\u0e32\u0e07\u0e40\u0e1b\u0e25\u0e48\u0e32",
            "text.room.pick": "\u0e01\u0e23\u0e38\u0e13\u0e32\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e2b\u0e49\u0e2d\u0e07",
            "text.room.roomA": "BRONZE",
            "text.room.roomB": "SILVER",
            "text.room.roomC": "GOLD",
            "text.bossbattle.wait": "\u0e23\u0e2d\u0e43\u0e2b\u0e49\u0e40\u0e27\u0e25\u0e32\u0e01\u0e32\u0e23\u0e15\u0e48\u0e2d\u0e2a\u0e39\u0e49\u0e02\u0e2d\u0e07 BOSS \u0e2a\u0e34\u0e49\u0e19\u0e2a\u0e38\u0e14\u0e25\u0e07",
            "ask.logout": "\u0e04\u0e38\u0e13\u0e41\u0e19\u0e48\u0e43\u0e08\u0e2b\u0e23\u0e37\u0e2d\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e40\u0e01\u0e21",
            "error.network": "\u0e40\u0e19\u0e47\u0e15\u0e40\u0e27\u0e34\u0e23\u0e4c\u0e04\u0e02\u0e31\u0e14\u0e02\u0e49\u0e2d\u0e07 \u0e01\u0e23\u0e38\u0e13\u0e32\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e15\u0e48\u0e2d\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e41\u0e25\u0e30\u0e42\u0e2b\u0e25\u0e14\u0e43\u0e2b\u0e21\u0e48\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",
            "error.balance": "\u0e22\u0e2d\u0e14\u0e40\u0e07\u0e34\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e44\u0e21\u0e48\u0e40\u0e1e\u0e35\u0e22\u0e07\u0e1e\u0e2d\u0e15\u0e48\u0e2d\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19\u0e40\u0e14\u0e34\u0e21\u0e1e\u0e31\u0e19\u0e1b\u0e31\u0e08\u0e08\u0e38\u0e1a\u0e31\u0e19 \u0e01\u0e23\u0e38\u0e13\u0e32\u0e25\u0e14\u0e40\u0e07\u0e34\u0e19\u0e40\u0e14\u0e34\u0e21\u0e1e\u0e31\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e41\u0e25\u0e30\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",
            "error.kick": "\u0e40\u0e0b\u0e2a\u0e0a\u0e31\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e44\u0e14\u0e49\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e23\u0e30\u0e1a\u0e1a\u0e41\u0e25\u0e49\u0e27 \u0e42\u0e1b\u0e23\u0e14\u0e42\u0e2b\u0e25\u0e14\u0e43\u0e2b\u0e21\u0e48\u0e41\u0e25\u0e49\u0e27\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",
            "error.other": "\u0e22\u0e2d\u0e14\u0e40\u0e07\u0e34\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e22\u0e31\u0e07\u0e04\u0e07\u0e2d\u0e22\u0e39\u0e48 \u0e42\u0e1b\u0e23\u0e14\u0e42\u0e2b\u0e25\u0e14\u0e0b\u0e49\u0e33\u0e41\u0e25\u0e49\u0e27\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",
            "fish.name.fish_01": "\u0e23\u0e30\u0e40\u0e1a\u0e34\u0e14\u0e41\u0e0a\u0e48\u0e41\u0e02\u0e47\u0e07",
            "fish.name.fish_02": "\u0e1b\u0e25\u0e32\u0e27\u0e32\u0e2c\u0e2a\u0e35\u0e19\u0e49\u0e33\u0e40\u0e07\u0e34\u0e19",
            "fish.name.fish_03": "\u0e1b\u0e25\u0e32\u0e09\u0e25\u0e32\u0e21\u0e2a\u0e35\u0e17\u0e2d\u0e07",
            "fish.name.fish_04": "\u0e27\u0e32\u0e2c\u0e2a\u0e40\u0e1b\u0e34\u0e23\u0e4c\u0e21",
            "fish.name.fish_05": "\u0e27\u0e32\u0e2c\u0e40\u0e1e\u0e0a\u0e0c\u0e06\u0e32\u0e15",
            "fish.name.fish_06": "\u0e19\u0e32\u0e01",
            "fish.name.fish_07": "\u0e1b\u0e25\u0e32\u0e09\u0e25\u0e32\u0e21\u0e2b\u0e31\u0e27\u0e04\u0e49\u0e2d\u0e19",
            "fish.name.fish_08": "\u0e1b\u0e25\u0e32\u0e01\u0e23\u0e30\u0e40\u0e1a\u0e19",
            "fish.name.fish_09": "\u0e1b\u0e25\u0e32\u0e15\u0e48\u0e2d\u0e2a\u0e39\u0e49",
            "fish.name.fish_10": "\u0e1b\u0e25\u0e32\u0e42\u0e04\u0e21\u0e44\u0e1f",
            "fish.name.fish_11": "\u0e1b\u0e25\u0e32\u0e1f\u0e25\u0e34\u0e27\u0e39\u0e40\u0e14\u0e2d\u0e23\u0e4c",
            "fish.name.fish_12": "\u0e1b\u0e25\u0e32\u0e01\u0e30\u0e1e\u0e07",
            "fish.name.fish_13": "\u0e1b\u0e25\u0e32\u0e1f\u0e25\u0e39\u0e2d\u0e2d\u0e40\u0e23\u0e2a\u0e40\u0e0b\u0e19\u0e15\u0e4c",
            "fish.name.fish_14": "\u0e40\u0e15\u0e48\u0e32\u0e17\u0e30\u0e40\u0e25",
            "fish.name.fish_15": "\u0e1b\u0e25\u0e32\u0e2b\u0e21\u0e36\u0e01",
            "fish.name.fish_16": "\u0e1b\u0e25\u0e32\u0e40\u0e02\u0e15\u0e23\u0e49\u0e2d\u0e19",
            "fish.name.fish_17": "\u0e01\u0e38\u0e49\u0e07\u0e25\u0e47\u0e2d\u0e1a\u0e40\u0e2a\u0e15\u0e2d\u0e23\u0e4c ",
            "fish.name.fish_18": "\u0e1b\u0e25\u0e32\u0e15\u0e48\u0e2d\u0e2a\u0e39\u0e49",
            "fish.name.fish_19": "\u0e1b\u0e25\u0e32\u0e01\u0e32\u0e23\u0e4c\u0e15\u0e39\u0e19",
            "fish.name.fish_20": "\u0e1b\u0e25\u0e32\u0e08\u0e38\u0e21\u0e1e\u0e34\u0e15",
            "fish.name.fish_21": "\u0e44\u0e21\u0e49\u0e04\u0e49\u0e33",
            "fish.name.fish_22": "\u0e1b\u0e25\u0e32\u0e41\u0e21\u0e07\u0e1b\u0e48\u0e2d\u0e07",
            "fish.name.lightning": "\u0e2a\u0e32\u0e22\u0e1f\u0e49\u0e32",
            "fish.name.award": "\u0e42\u0e0a\u0e04\u0e14\u0e35\u0e2d\u0e2d\u0e23\u0e48\u0e32",
            "fish.pt.inst.title": "\u0e01\u0e0f\u0e40\u0e01\u0e13\u0e11\u0e4c\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19\u0e40\u0e01\u0e21\u0e2a\u0e4c\u0e1b\u0e25\u0e32",
            "fish.pt.inst.award": "\u0e42\u0e1a\u0e19\u0e31\u0e2a\u0e1e\u0e34\u0e40\u0e28\u0e29 - \u0e0a\u0e19\u0e30\u0e0a\u0e19\u0e34\u0e14\u0e1b\u0e25\u0e32\u0e43\u0e14\u0e46\u0e14\u0e49\u0e27\u0e22\u0e2d\u0e2d\u0e23\u0e48\u0e32\u0e19\u0e35\u0e49\u0e04\u0e39\u0e13\u0e0a\u0e19\u0e30\u0e14\u0e49\u0e27\u0e22 3x, 4x \u0e2b\u0e23\u0e37\u0e2d 7x.",
            "fish.pt.inst.chain": "\u0e0a\u0e19\u0e30\u0e41\u0e1a\u0e1a\u0e25\u0e39\u0e01\u0e42\u0e0b\u0e48 - \u0e0a\u0e19\u0e30\u0e1b\u0e25\u0e32\u0e43\u0e14\u0e46\u0e14\u0e49\u0e27\u0e22\u0e2d\u0e2d\u0e23\u0e48\u0e32\u0e19\u0e35\u0e49\u0e08\u0e30\u0e17\u0e33\u0e43\u0e2b\u0e49\u0e40\u0e01\u0e34\u0e14\u0e1b\u0e0f\u0e34\u0e01\u0e34\u0e23\u0e34\u0e22\u0e32\u0e25\u0e39\u0e01\u0e42\u0e0b\u0e48\u0e41\u0e25\u0e30\u0e06\u0e48\u0e32\u0e1a\u0e32\u0e07\u0e2a\u0e48\u0e27\u0e19\u0e02\u0e2d\u0e07\u0e2a\u0e32\u0e22\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e4c\u0e40\u0e14\u0e35\u0e22\u0e27\u0e01\u0e31\u0e19",
            "fish.pt.inst.bomb": "\u0e23\u0e30\u0e40\u0e1a\u0e34\u0e14\u0e41\u0e0a\u0e48\u0e41\u0e02\u0e47\u0e07 - \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e23\u0e30\u0e40\u0e1a\u0e34\u0e14\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08\u0e06\u0e48\u0e32\u0e1b\u0e25\u0e32\u0e15\u0e32\u0e22 \u0e1b\u0e25\u0e32\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14\u0e1a\u0e19\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d\u0e08\u0e30\u0e41\u0e02\u0e47\u0e07\u0e41\u0e25\u0e30\u0e2b\u0e22\u0e38\u0e14\u0e01\u0e32\u0e23\u0e40\u0e04\u0e25\u0e37\u0e48\u0e19\u0e44\u0e2b\u0e27\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14"
        }, cc._RF.pop()
    }, {}],
    "uikiller-plugins": [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "440e7HUsftCuJ8tA+eTGl0B", "uikiller-plugins");
        var o = e("./uikiller"),
            i = {
                name: "UIKillerBindFilter",
                onCheckNode: function(e, t) {
                    if (e === t.node) return !0;
                    var n = t.$options;
                    return (!o.isFunction(n.filter) || !n.filter(e)) && ("@" !== e.name[0] && void 0)
                }
            },
            r = {
                hello: "\u4f60\u597dXXX",
                world: "\u4e16\u754c",
                1: "hello",
                2: "wrold"
            },
            a = {
                name: "UIKillerLabelLanguage",
                onCheckNode: function(e, t) {
                    var n = e.getComponent(cc.Label);
                    if (n) {
                        var o = e.$ || e.name,
                            i = r[o];
                        i && (n.string = i)
                    }
                }
            },
            s = {
                _attack: "3002",
                _expedition: "3006",
                click: "click"
            },
            c = {
                name: "UIKillerTouchSound",
                onAfterHandleEvent: function(e, t, n, o) {
                    if (t.type === cc.Node.EventType.TOUCH_END && !1 !== o) {
                        var i = "sound/" + (s[o] || s[e.name] || s.click);
                        cc.loader.loadRes(i, cc.AudioClip, function(e, t) {
                            Array.isArray(t) || cc.audioEngine.play(t)
                        })
                    }
                }
            };
        o.registerPlugin(i), o.registerPlugin(a), o.registerPlugin(c), cc._RF.pop()
    }, {
        "./uikiller": "uikiller"
    }],
    uikiller: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "db263mqxsdLII30NkwT0ZVm", "uikiller");
        var o = ["_onTouchStart", "_onTouchMove", "_onTouchEnd", "_onTouchCancel"],
            i = {
                _prefix: "_",
                _plugins: [],
                registerPlugin: function(e) {
                    var t = this;
                    Array.isArray(e) || (e = [e]), e.forEach(function(e) {
                        t._plugins.find(function(t) {
                            return t.name === e.name || t === e
                        }) || (t._plugins.push(e), e.onRegister && e.onRegister())
                    })
                },
                _getComponentName: function(e) {
                    return e.name.match(/<.*>$/)[0].slice(1, -1)
                },
                bindComponent: function(e, t) {
                    var n = this;
                    e.$options = t || {};
                    var i = e.node;
                    i._components.forEach(function(e) {
                        if (e.name.match) {
                            var t = n._getComponentName(e);
                            i[t = "$" + t] = e
                        }
                    }), this._bindTouchEvent(i, e, o), this._bindNode(e.node, e)
                },
                bindNode: function(e, t, n) {
                    var o = this;
                    if (t.$options = n || {}, t.$collector) {
                        if (t.$collector.node === e) return;
                        delete t.$collector.node, Object.keys(t.$collector).forEach(function(e) {
                            delete t[e]
                        })
                    }
                    t.$collector = {
                        node: e
                    }, e._components.forEach(function(e) {
                        var n = o._getComponentName(e);
                        t[n = "$" + n] = e, t.$collector[n] = e
                    }), this._bindStartByPlugins(e, t), this._bindNode(e, t), this._bindEndByPlugins(e, t)
                },
                _bindStartByPlugins: function(e, t) {
                    this._plugins.forEach(function(n) {
                        n.onBindStart && n.onBindStart(e, t)
                    })
                },
                _bindEndByPlugins: function(e, t) {
                    this._plugins.forEach(function(n) {
                        n.onBindEnd && n.onBindEnd(e, t)
                    })
                },
                _bindNode: function(e, t) {
                    var n = this,
                        o = e,
                        r = !1;
                    o.name[0] === this._prefix && o._components.forEach(function(e) {
                        var a = n._getComponentName(e);
                        o[a = "$" + a] && t.$options.debug ? cc.warn(a + " property is already exists") : (o[a] = e, i.isFunction(e.onBind) && e.onBind(t), e instanceof Thor && (r || e === t || (r = !0), o.active || e.bindHammer()))
                    }), this._checkNodeByPlugins(o, t) && !r && o.children.forEach(function(e) {
                        var i = e.name;
                        if (i[0] === n._prefix) {
                            var r = i.indexOf("$");
                            if (-1 !== r && (e.$eventName = i.substr(0, r), e.$ = i.substr(r + 1), i = e.$eventName + e.$[0].toUpperCase() + e.$.substr(1), e.name = i), t[i] && t.$options.debug) return void cc.warn(t.name + "." + i + " property is already exists");
                            n._bindTouchEvent(e, t), t[i] = e, t.$collector && (t.$collector[i] = e)
                        } else o[i] || (o[i] = e);
                        n._bindNode(e, t)
                    })
                },
                _getTouchEventName: function(e, t) {
                    var n = e.$eventName || e.name;
                    return n && (n = n[this._prefix.length].toUpperCase() + n.slice(this._prefix.length + 1)), t ? "_on" + n + t : ["_on" + n + "TouchStart", "_on" + n + "TouchMove", "_on" + n + "TouchEnd", "_on" + n + "TouchCancel"]
                },
                _bindTouchEvent: function(e, t, n) {
                    var o = this;
                    if (!e.getComponent(cc.EditBox)) {
                        var i = n || this._getTouchEventName(e),
                            r = [cc.Node.EventType.TOUCH_START, cc.Node.EventType.TOUCH_MOVE, cc.Node.EventType.TOUCH_END, cc.Node.EventType.TOUCH_CANCEL];
                        i.forEach(function(n, i) {
                            (t[n] || e.getComponent(cc.Button)) && e.on(r[i], function(i) {
                                var r = i.currentTarget;
                                if (!1 !== r.interactable && !1 !== r.active) {
                                    var a = r.getComponent(cc.Button);
                                    if (!a || !1 !== a.interactable) {
                                        var s = t[n],
                                            c = s || a && a.clickEvents.length;
                                        c && o._beforeHandleEventByPlugins(r, i, !!s);
                                        var l = void 0;
                                        s && (l = s.call(t, r, i), i.type === cc.Node.EventType.TOUCH_START && !1 === l ? r._touchListener.setSwallowTouches(!1) : (e._touchListener.setSwallowTouches(!0), i.stopPropagation())), c && o._afterHandleEventByPlugins(r, i, !!s, l)
                                    }
                                }
                            })
                        }), this._bindTouchLongEvent(e, t)
                    }
                },
                _bindTouchLongEvent: function(e, t) {
                    var n = e,
                        o = this._getTouchEventName(n, "TouchLong"),
                        r = t[o];
                    i.isFunction(r) && (n._touchLongTimer = null, n.on(cc.Node.EventType.TOUCH_END, function() {
                        n._touchLongTimer && (clearTimeout(n._touchLongTimer), n._touchLongTimer = 0, delete n.interactable)
                    }), n.on(cc.Node.EventType.TOUCH_START, function(e) {
                        n._touchLongTimer = setTimeout(function() {
                            n.interactable = !!r.call(t, n, e), n._touchLongTimer = 0
                        }, n.touchLongTime || 1e3)
                    }))
                },
                _checkNodeByPlugins: function(e, t) {
                    return !this._plugins.find(function(n) {
                        return n.onCheckNode ? !1 === n.onCheckNode(e, t) : null
                    })
                },
                _beforeHandleEventByPlugins: function(e, t, n) {
                    this._plugins.forEach(function(o) {
                        o.onBeforeHandleEvent && o.onBeforeHandleEvent(e, t, n)
                    })
                },
                _afterHandleEventByPlugins: function(e, t, n, o) {
                    this._plugins.forEach(function(i) {
                        i.onAfterHandleEvent && i.onAfterHandleEvent(e, t, n, o)
                    })
                },
                isFunction: function(e) {
                    return "function" == typeof e
                }
            };
        window.uikiller = t.exports = i, cc._RF.pop()
    }, {}],
    "zh-hans": [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "f7c08RqK+lKKI8QCwkJwps3", "zh-hans"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages["zh-hans"] = {
            "text.loading": "\u52a0\u8f7d\u4e2d",
            "text.search": "\u914d\u5bf9\u4e2d",
            "text.ok": "\u786e\u5b9a",
            "text.cancel": "\u53d6\u6d88",
            "text.locktarget": "\u9501\u5b9a",
            "text.unlocktarget": "\u89e3\u9501",
            "text.autofire": "\u81ea\u52a8",
            "text.autofire.stop": "\u505c\u6b62",
            "text.quit": "\u79bb\u5f00",
            "text.paytable": "\u9c7c\u79cd",
            "text.waitforplayer": "\u7b49\u5f85\u52a0\u5165",
            "text.locking": "\u70b9\u51fb\u9c7c\u53ef\u653b\u51fb",
            "text.recall.date": "\u65e5\u671f",
            "text.recall.tid": "\u6ce8\u5355",
            "text.recall.bullets": "\u53d1\u5c04\u5b50\u5f39\u6570",
            "text.recall.totalwager": "\u603b\u6295\u6ce8",
            "text.recall.totalwin": "\u8f93\u8d62\u7ed3\u679c",
            "text.recall.title": "\u6e38\u620f\u8bb0\u5f55",
            "text.recall.empty": "\u65e0\u6e38\u620f\u8bb0\u5f55",
            "text.androidfullscreen": "\u70b9\u51fb\u4e0a\u65b9\u6309\u94ae\u5f00\u542f\u5168\u8424\u5e55,\u4f53\u9a8c\u6700\u4f18\u8d28\u7684\u89c6\u89c9\u611f\u53d7!!",
            "text.recommend.title": "\u73a9\u66f4\u591a\u5f00\u53d1\u7535\u5b50\u7684\u6e38\u620f",
            "ask.logout": "\u771f\u7684\u8981\u767b\u51fa\u6e38\u620f\u5417?",
            "text.reminder.optionmenu": "\u529f\u80fd\u9009\u9879",
            "text.reminder.lockfish": "\u9501\u5b9a\u5c04\u51fb",
            "text.reminder.autofire": "\u81ea\u52a8\u5c04\u51fb",
            "text.room.pick": "\u8bf7\u9009\u62e9\u4e00\u4e2a\u623f\u95f4",
            "text.room.roomA": "\u94dc\u724c\u573a",
            "text.room.roomB": "\u94f6\u724c\u573a",
            "text.room.roomC": "\u91d1\u724c\u573a",
            "text.bossbattle.wait": "\u7b49\u5f85\u9c7c\u6f6e\u6218\u6597\u65f6\u95f4\u7ed3\u675f",
            "error.network": "\u7f51\u8def\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u6574\u7406\u9875\u9762",
            "error.balance": "\u4f59\u989d\u4e0d\u8db3\uff0c\u8bf7\u91cd\u65b0\u6574\u7406\u9875\u9762",
            "error.kick": "\u7cfb\u7edf\u4fa6\u6d4b\u5230\u767b\u51fa\uff0c\u8bf7\u91cd\u65b0\u767b\u5165",
            "error.other": "\u60a8\u7684\u4f59\u989d\u662f\u6ca1\u6709\u53d8\u66f4. \u8bf7\u91cd\u65b0\u52a0\u8f7d\u518d\u8bd5\u4e00\u6b21.",
            "fish.name.fish_01": "\u51bb\u7ed3\u70b8\u5f39",
            "fish.name.fish_02": "\u84dd\u9cb8",
            "fish.name.fish_03": "\u9ec4\u91d1\u9ca8\u9c7c",
            "fish.name.fish_04": "\u62b9\u9999\u9cb8",
            "fish.name.fish_05": "\u864e\u9cb8",
            "fish.name.fish_06": "\u5251\u9c7c",
            "fish.name.fish_07": "\u9524\u5934\u9ca8",
            "fish.name.fish_08": "\u9b5f\u9c7c",
            "fish.name.fish_09": "\u5927\u6597\u9c7c",
            "fish.name.fish_10": "\u706f\u7b3c\u9c7c",
            "fish.name.fish_11": "\u6bd4\u76ee\u9c7c",
            "fish.name.fish_12": "\u6cb3\u8c5a",
            "fish.name.fish_13": "\u8424\u5149\u9c7c",
            "fish.name.fish_14": "\u6d77\u9f9f",
            "fish.name.fish_15": "\u873b\u8713\u9c7c",
            "fish.name.fish_16": "\u5f69\u8272\u9c7c",
            "fish.name.fish_17": "\u5927\u9f99\u867e",
            "fish.name.fish_18": "\u5c0f\u6597\u9c7c",
            "fish.name.fish_19": "\u5c0f\u4e11\u9c7c",
            "fish.name.fish_20": "\u63a5\u543b\u9c7c",
            "fish.name.fish_21": "\u874c\u86aa",
            "fish.name.fish_22": "\u9b69\u4ed4\u9c7c",
            "fish.name.lightning": "\u95ea\u7535\u94fe",
            "fish.name.award": "\u5e78\u8fd0\u5149\u73af",
            "fish.pt.inst.title": "\u9c7c\u79cd\u4ecb\u7ecd",
            "fish.pt.inst.award": "\u7279\u6b8a\u5956\u52b1 - \u4efb\u4f55\u9c7c\u79cd\u5e26\u6709\u6b64\u5149\u73af\u88ab\u51fb\u6740\u65f6\uff0c\u4f1a\u6709\u989d\u5916\u7684\u5956\u52b1\u500d\u6570(x3/x4/x7)",
            "fish.pt.inst.chain": "\u8fde\u9501\u51fb\u6740 - \u4efb\u4f55\u9c7c\u79cd\u5e26\u6709\u6b64\u5149\u73af\u88ab\u51fb\u6740\u65f6\uff0c\u5c06\u4f1a\u9020\u6210\u8fde\u9501\u53cd\u5e94\u4e00\u5e76\u51fb\u6740\u67d0\u4e2a\u6570\u76f8\u540c\u9c7c\u79cd",
            "fish.pt.inst.bomb": "\u51bb\u7ed3\u70b8\u5f39 - \u5f53\u6210\u529f\u51fb\u6740\u6b64\u70b8\u5f39\u65f6\uff0c\u753b\u9762\u4e0a\u6240\u6709\u9c7c\u53d8\u6210\u51bb\u7ed3\u72b6\u6001\u5e76\u505c\u6b62\u884c\u52a8"
        }, cc._RF.pop()
    }, {}],
    "zh-hant": [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "28261MsSFVOpKI1gSck/Co2", "zh-hant"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages["zh-hant"] = {
            "text.loading": "\u52a0\u8f09\u4e2d",
            "text.search": "\u914d\u5c0d\u4e2d",
            "text.ok": "\u78ba\u5b9a",
            "text.cancel": "\u53d6\u6d88",
            "text.locktarget": "\u9396\u5b9a",
            "text.unlocktarget": "\u89e3\u9396",
            "text.autofire": "\u81ea\u52d5",
            "text.autofire.stop": "\u505c\u6b62",
            "text.quit": "\u96e2\u958b",
            "text.paytable": "\u9b5a\u7a2e",
            "text.waitforplayer": "\u7b49\u5f85\u52a0\u5165",
            "text.locking": "\u9ede\u64ca\u9b5a\u53ef\u653b\u64ca",
            "text.androidfullscreen": "\u9ede\u64ca\u4e0a\u65b9\u6309\u9215\u958b\u555f\u5168\u87a2\u5e55,\u9ad4\u9a57\u6700\u512a\u8cea\u7684\u8996\u89ba\u611f\u53d7!!",
            "text.recommend.title": "\u73a9\u66f4\u591a\u958b\u767c\u96fb\u5b50\u7684\u904a\u6232",
            "text.reminder.optionmenu": "\u529f\u80fd\u9078\u9805",
            "text.reminder.lockfish": "\u9396\u5b9a\u5c04\u64ca",
            "text.reminder.autofire": "\u81ea\u52d5\u5c04\u64ca",
            "text.recall.date": "\u65e5\u671f",
            "text.recall.tid": "\u6ce8\u55ae",
            "text.recall.bullets": "\u767c\u5c04\u5b50\u5f48\u6578",
            "text.recall.totalwager": "\u7e3d\u6295\u6ce8",
            "text.recall.totalwin": "\u8f38\u8d0f\u7d50\u679c",
            "text.recall.title": "\u904a\u6232\u8a18\u9304",
            "text.recall.empty": "\u7121\u904a\u6232\u8a18\u9304",
            "text.room.pick": "\u8acb\u9078\u64c7\u4e00\u500b\u623f\u9593",
            "text.room.roomA": "\u9285\u724c\u5834",
            "text.room.roomB": "\u9280\u724c\u5834",
            "text.room.roomC": "\u91d1\u724c\u5834",
            "text.bossbattle.wait": "\u7b49\u5f85\u9b5a\u6f6e\u6230\u9b25\u6642\u9593\u7d50\u675f",
            "ask.logout": "\u771f\u7684\u8981\u767b\u51fa\u904a\u6232\u55ce?",
            "error.network": "\u7db2\u8def\u932f\u8aa4\uff0c\u8acb\u91cd\u65b0\u6574\u7406\u9801\u9762",
            "error.balance": "\u9918\u984d\u4e0d\u8db3\uff0c\u8acb\u91cd\u65b0\u6574\u7406\u9801\u9762",
            "error.kick": "\u7cfb\u7d71\u5075\u6e2c\u5230\u767b\u51fa\uff0c\u8acb\u91cd\u65b0\u767b\u5165",
            "error.other": "\u60a8\u7684\u9918\u984d\u662f\u6c92\u6709\u8b8a\u66f4. \u8acb\u91cd\u65b0\u52a0\u8f09\u518d\u8a66\u4e00\u6b21.",
            "fish.name.fish_01": "\u51cd\u7d50\u70b8\u5f48",
            "fish.name.fish_02": "\u85cd\u9be8",
            "fish.name.fish_03": "\u9ec3\u91d1\u9bca\u9b5a",
            "fish.name.fish_04": "\u62b9\u9999\u9be8",
            "fish.name.fish_05": "\u864e\u9be8",
            "fish.name.fish_06": "\u528d\u9b5a",
            "fish.name.fish_07": "\u9318\u982d\u9bca",
            "fish.name.fish_08": "\u9b5f\u9b5a",
            "fish.name.fish_09": "\u5927\u9b25\u9b5a",
            "fish.name.fish_10": "\u71c8\u7c60\u9b5a",
            "fish.name.fish_11": "\u6bd4\u76ee\u9b5a",
            "fish.name.fish_12": "\u6cb3\u8c5a",
            "fish.name.fish_13": "\u87a2\u5149\u9b5a",
            "fish.name.fish_14": "\u6d77\u9f9c",
            "fish.name.fish_15": "\u873b\u8713\u9b5a",
            "fish.name.fish_16": "\u5f69\u8272\u9b5a",
            "fish.name.fish_17": "\u5927\u9f8d\u8766",
            "fish.name.fish_18": "\u5c0f\u9b25\u9b5a",
            "fish.name.fish_19": "\u5c0f\u7fbd\u9b5a",
            "fish.name.fish_20": "\u63a5\u543b\u9b5a",
            "fish.name.fish_21": "\u874c\u86aa",
            "fish.name.fish_22": "\u9b69\u4ed4\u9c7c",
            "fish.name.lightning": "\u9583\u96fb\u9375",
            "fish.name.award": "\u5e78\u904b\u5149\u74b0",
            "fish.pt.inst.title": "\u9b5a\u7a2e\u4ecb\u7d39",
            "fish.pt.inst.award": "\u7279\u6b8a\u734e\u53b2 - \u4efb\u4f55\u9b5a\u7a2e\u5e36\u6709\u6b64\u5149\u74b0\u88ab\u64ca\u6bba\u6642\uff0c\u6703\u5f97\u5230\u984d\u5916\u7684\u734e\u52f5\u500d\u6578(x3/x4/x7)",
            "fish.pt.inst.chain": "\u9023\u9396\u64ca\u6bba - \u4efb\u4f55\u9b5a\u7a2e\u5e36\u6709\u6b64\u5149\u74b0\u88ab\u64ca\u6bba\u6642\uff0c\u5c07\u6703\u9020\u6210\u9023\u9396\u53cd\u61c9\u4e00\u4f75\u64ca\u6bba\u67d0\u500b\u6578\u76f8\u540c\u9b5a\u7a2e",
            "fish.pt.inst.bomb": "\u51cd\u7d50\u70b8\u5f48 - \u7576\u6210\u529f\u64ca\u6bba\u6b64\u70b8\u5f48\u6642\uff0c\u756b\u9762\u4e0a\u6240\u6709\u9b5a\u6539\u6210\u51cd\u7d50\u72c0\u614b\u4e26\u505c\u6b62\u884c\u52d5"
        }, cc._RF.pop()
    }, {}]
}, {}, ["AudioManage", "BackHome", "CancelTransparentClick", "ChatPanel", "GameStart", "StartSearchTable", "StartSearchTableForPlayView", "TableSearch", "BusinessStorage", "GameRankStorage", "NetConnector", "PayTableViewStorage", "PlatformStorage", "PngStorage", "PromptDialogStorage", "TableSearchStorage", "UserInfoStorage", "WalletStorage", "GameServerWsConnector", "Language", "WechatAvatarLoader", "LoginSuccessRedirector", "TwLoginLocal", "TwLoginWsConnector", "WxWebOauth", "MockPanel", "AndroidAskFullScreen", "AnimationBingo", "AnimationBonus", "AnimationCoin", "AnimationFire", "AnimationFlash", "AnimationOnlyCoin", "AnimationPause", "BossNotify", "Bullet", "ClickSprite", "CurrencyLabel", "DrawBoards", "EventButton", "Fish", "GameReCall", "GunSight", "HandlingAnimation", "HorizontalScroll", "IphoneXTopPadding", "JettonsItem", "MessageItem", "NodeZOrder", "NoviceTeaching", "PayTableFishFrame", "PayTableView", "PromptDialog", "RecallRow", "RotationXY", "ScanAnimation", "TextButton", "ToggleText", "WebViewGameRecall", "Joystick", "Config", "FishPondAnimation", "GameStage", "LobbyViewControl", "LoginStage", "MountUiKiller", "PlayViewControl", "SearchTableViewControl", "Bezier", "CCHelper", "Pair", "RealMoneyPlatform", "SeedRandom", "Thor", "cocos-help", "uikiller-plugins", "uikiller", "en", "ja", "ko", "ru", "th", "zh-hans", "zh-hant", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min"]);