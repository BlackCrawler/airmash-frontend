(function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).PIXI = e()
    }
})(function() {
    return function e(t, n, r) {
        function i(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var l = "function" == typeof require && require;
                    if (!a && l)
                        return l(s, !0);
                    if (o)
                        return o(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND",
                    u
                }
                var c = n[s] = {
                    exports: {}
                };
                t[s][0].call(c.exports, function(e) {
                    var n = t[s][1][e];
                    return i(n || e)
                }, c, c.exports, e, t, n, r)
            }
            return n[s].exports
        }
        for (var o = "function" == typeof require && require, s = 0; s < r.length; s++)
            i(r[s]);
        return i
    }({
        1: [function(e, t, n) {
            "use restrict";
            function r(e) {
                var t = 32;
                return (e &= -e) && t--,
                65535 & e && (t -= 16),
                16711935 & e && (t -= 8),
                252645135 & e && (t -= 4),
                858993459 & e && (t -= 2),
                1431655765 & e && (t -= 1),
                t
            }
            n.INT_BITS = 32,
            n.INT_MAX = 2147483647,
            n.INT_MIN = -1 << 31,
            n.sign = function(e) {
                return (e > 0) - (e < 0)
            }
            ,
            n.abs = function(e) {
                var t = e >> 31;
                return (e ^ t) - t
            }
            ,
            n.min = function(e, t) {
                return t ^ (e ^ t) & -(e < t)
            }
            ,
            n.max = function(e, t) {
                return e ^ (e ^ t) & -(e < t)
            }
            ,
            n.isPow2 = function(e) {
                return !(e & e - 1 || !e)
            }
            ,
            n.log2 = function(e) {
                var t, n;
                return t = (e > 65535) << 4,
                e >>>= t,
                n = (e > 255) << 3,
                e >>>= n,
                t |= n,
                n = (e > 15) << 2,
                e >>>= n,
                t |= n,
                n = (e > 3) << 1,
                e >>>= n,
                (t |= n) | e >> 1
            }
            ,
            n.log10 = function(e) {
                return e >= 1e9 ? 9 : e >= 1e8 ? 8 : e >= 1e7 ? 7 : e >= 1e6 ? 6 : e >= 1e5 ? 5 : e >= 1e4 ? 4 : e >= 1e3 ? 3 : e >= 100 ? 2 : e >= 10 ? 1 : 0
            }
            ,
            n.popCount = function(e) {
                return e -= e >>> 1 & 1431655765,
                16843009 * ((e = (858993459 & e) + (e >>> 2 & 858993459)) + (e >>> 4) & 252645135) >>> 24
            }
            ,
            n.countTrailingZeros = r,
            n.nextPow2 = function(e) {
                return e += 0 === e,
                --e,
                e |= e >>> 1,
                e |= e >>> 2,
                e |= e >>> 4,
                e |= e >>> 8,
                (e |= e >>> 16) + 1
            }
            ,
            n.prevPow2 = function(e) {
                return e |= e >>> 1,
                e |= e >>> 2,
                e |= e >>> 4,
                e |= e >>> 8,
                (e |= e >>> 16) - (e >>> 1)
            }
            ,
            n.parity = function(e) {
                return e ^= e >>> 16,
                e ^= e >>> 8,
                e ^= e >>> 4,
                27030 >>> (e &= 15) & 1
            }
            ;
            var i = new Array(256);
            !function(e) {
                for (var t = 0; t < 256; ++t) {
                    var n = t
                      , r = t
                      , i = 7;
                    for (n >>>= 1; n; n >>>= 1)
                        r <<= 1,
                        r |= 1 & n,
                        --i;
                    e[t] = r << i & 255
                }
            }(i),
            n.reverse = function(e) {
                return i[255 & e] << 24 | i[e >>> 8 & 255] << 16 | i[e >>> 16 & 255] << 8 | i[e >>> 24 & 255]
            }
            ,
            n.interleave2 = function(e, t) {
                return e &= 65535,
                e = 16711935 & (e | e << 8),
                e = 252645135 & (e | e << 4),
                e = 858993459 & (e | e << 2),
                e = 1431655765 & (e | e << 1),
                t &= 65535,
                t = 16711935 & (t | t << 8),
                t = 252645135 & (t | t << 4),
                t = 858993459 & (t | t << 2),
                t = 1431655765 & (t | t << 1),
                e | t << 1
            }
            ,
            n.deinterleave2 = function(e, t) {
                return e = e >>> t & 1431655765,
                e = 858993459 & (e | e >>> 1),
                e = 252645135 & (e | e >>> 2),
                e = 16711935 & (e | e >>> 4),
                (e = 65535 & (e | e >>> 16)) << 16 >> 16
            }
            ,
            n.interleave3 = function(e, t, n) {
                return e &= 1023,
                e = 4278190335 & (e | e << 16),
                e = 251719695 & (e | e << 8),
                e = 3272356035 & (e | e << 4),
                e = 1227133513 & (e | e << 2),
                t &= 1023,
                t = 4278190335 & (t | t << 16),
                t = 251719695 & (t | t << 8),
                t = 3272356035 & (t | t << 4),
                t = 1227133513 & (t | t << 2),
                e |= t << 1,
                n &= 1023,
                n = 4278190335 & (n | n << 16),
                n = 251719695 & (n | n << 8),
                n = 3272356035 & (n | n << 4),
                n = 1227133513 & (n | n << 2),
                e | n << 2
            }
            ,
            n.deinterleave3 = function(e, t) {
                return e = e >>> t & 1227133513,
                e = 3272356035 & (e | e >>> 2),
                e = 251719695 & (e | e >>> 4),
                e = 4278190335 & (e | e >>> 8),
                (e = 1023 & (e | e >>> 16)) << 22 >> 22
            }
            ,
            n.nextCombination = function(e) {
                var t = e | e - 1;
                return t + 1 | (~t & -~t) - 1 >>> r(e) + 1
            }
        }
        , {}],
        2: [function(e, t, n) {
            function r(e, t, n) {
                n = n || 2;
                var r = t && t.length
                  , l = r ? t[0] * n : e.length
                  , c = i(e, 0, l, n, !0)
                  , h = [];
                if (!c)
                    return h;
                var d, g, m, v, y, b, _;
                if (r && (c = function(e, t, n, r) {
                    var s, l, c, h, d, g = [];
                    for (s = 0,
                    l = t.length; s < l; s++)
                        c = t[s] * r,
                        h = s < l - 1 ? t[s + 1] * r : e.length,
                        (d = i(e, c, h, r, !1)) === d.next && (d.steiner = !0),
                        g.push(function(e) {
                            var t = e
                              , n = e;
                            do {
                                t.x < n.x && (n = t),
                                t = t.next
                            } while (t !== e);return n
                        }(d));
                    for (g.sort(a),
                    s = 0; s < g.length; s++)
                        !function(e, t) {
                            if (t = function(e, t) {
                                var n, r = t, i = e.x, o = e.y, s = -1 / 0;
                                do {
                                    if (o <= r.y && o >= r.next.y) {
                                        var a = r.x + (o - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
                                        if (a <= i && a > s) {
                                            if (s = a,
                                            a === i) {
                                                if (o === r.y)
                                                    return r;
                                                if (o === r.next.y)
                                                    return r.next
                                            }
                                            n = r.x < r.next.x ? r : r.next
                                        }
                                    }
                                    r = r.next
                                } while (r !== t);if (!n)
                                    return null;
                                if (i === s)
                                    return n.prev;
                                var l, c = n, h = n.x, d = n.y, f = 1 / 0;
                                for (r = n.next; r !== c; )
                                    i >= r.x && r.x >= h && u(o < d ? i : s, o, h, d, o < d ? s : i, o, r.x, r.y) && ((l = Math.abs(o - r.y) / (i - r.x)) < f || l === f && r.x > n.x) && p(r, e) && (n = r,
                                    f = l),
                                    r = r.next;
                                return n
                            }(e, t)) {
                                var n = f(t, e);
                                o(n, n.next)
                            }
                        }(g[s], n),
                        n = o(n, n.next);
                    return n
                }(e, t, c, n)),
                e.length > 80 * n) {
                    d = m = e[0],
                    g = v = e[1];
                    for (var x = n; x < l; x += n)
                        y = e[x],
                        b = e[x + 1],
                        y < d && (d = y),
                        b < g && (g = b),
                        y > m && (m = y),
                        b > v && (v = b);
                    _ = Math.max(m - d, v - g)
                }
                return s(c, h, n, d, g, _),
                h
            }
            function i(e, t, n, r, i) {
                var o, s;
                if (i === y(e, t, n, r) > 0)
                    for (o = t; o < n; o += r)
                        s = g(o, e[o], e[o + 1], s);
                else
                    for (o = n - r; o >= t; o -= r)
                        s = g(o, e[o], e[o + 1], s);
                return s && h(s, s.next) && (m(s),
                s = s.next),
                s
            }
            function o(e, t) {
                if (!e)
                    return e;
                t || (t = e);
                var n, r = e;
                do {
                    if (n = !1,
                    r.steiner || !h(r, r.next) && 0 !== c(r.prev, r, r.next))
                        r = r.next;
                    else {
                        if (m(r),
                        (r = t = r.prev) === r.next)
                            return null;
                        n = !0
                    }
                } while (n || r !== t);return t
            }
            function s(e, t, n, r, i, a, g) {
                if (e) {
                    !g && a && function(e, t, n, r) {
                        var i = e;
                        do {
                            null === i.z && (i.z = l(i.x, i.y, t, n, r)),
                            i.prevZ = i.prev,
                            i.nextZ = i.next,
                            i = i.next
                        } while (i !== e);i.prevZ.nextZ = null,
                        i.prevZ = null,
                        function(e) {
                            var t, n, r, i, o, s, a, l, u = 1;
                            do {
                                for (n = e,
                                e = null,
                                o = null,
                                s = 0; n; ) {
                                    for (s++,
                                    r = n,
                                    a = 0,
                                    t = 0; t < u && (a++,
                                    r = r.nextZ); t++)
                                        ;
                                    for (l = u; a > 0 || l > 0 && r; )
                                        0 === a ? (i = r,
                                        r = r.nextZ,
                                        l--) : 0 !== l && r ? n.z <= r.z ? (i = n,
                                        n = n.nextZ,
                                        a--) : (i = r,
                                        r = r.nextZ,
                                        l--) : (i = n,
                                        n = n.nextZ,
                                        a--),
                                        o ? o.nextZ = i : e = i,
                                        i.prevZ = o,
                                        o = i;
                                    n = r
                                }
                                o.nextZ = null,
                                u *= 2
                            } while (s > 1)
                        }(i)
                    }(e, r, i, a);
                    for (var v, y, b = e; e.prev !== e.next; )
                        if (v = e.prev,
                        y = e.next,
                        a ? function(e, t, n, r) {
                            var i = e.prev
                              , o = e
                              , s = e.next;
                            if (c(i, o, s) >= 0)
                                return !1;
                            var a = i.x < o.x ? i.x < s.x ? i.x : s.x : o.x < s.x ? o.x : s.x
                              , h = i.y < o.y ? i.y < s.y ? i.y : s.y : o.y < s.y ? o.y : s.y
                              , d = i.x > o.x ? i.x > s.x ? i.x : s.x : o.x > s.x ? o.x : s.x
                              , p = i.y > o.y ? i.y > s.y ? i.y : s.y : o.y > s.y ? o.y : s.y
                              , f = l(a, h, t, n, r)
                              , g = l(d, p, t, n, r)
                              , m = e.nextZ;
                            for (; m && m.z <= g; ) {
                                if (m !== e.prev && m !== e.next && u(i.x, i.y, o.x, o.y, s.x, s.y, m.x, m.y) && c(m.prev, m, m.next) >= 0)
                                    return !1;
                                m = m.nextZ
                            }
                            m = e.prevZ;
                            for (; m && m.z >= f; ) {
                                if (m !== e.prev && m !== e.next && u(i.x, i.y, o.x, o.y, s.x, s.y, m.x, m.y) && c(m.prev, m, m.next) >= 0)
                                    return !1;
                                m = m.prevZ
                            }
                            return !0
                        }(e, r, i, a) : function(e) {
                            var t = e.prev
                              , n = e
                              , r = e.next;
                            if (c(t, n, r) >= 0)
                                return !1;
                            var i = e.next.next;
                            for (; i !== e.prev; ) {
                                if (u(t.x, t.y, n.x, n.y, r.x, r.y, i.x, i.y) && c(i.prev, i, i.next) >= 0)
                                    return !1;
                                i = i.next
                            }
                            return !0
                        }(e))
                            t.push(v.i / n),
                            t.push(e.i / n),
                            t.push(y.i / n),
                            m(e),
                            e = y.next,
                            b = y.next;
                        else if ((e = y) === b) {
                            g ? 1 === g ? s(e = function(e, t, n) {
                                var r = e;
                                do {
                                    var i = r.prev
                                      , o = r.next.next;
                                    !h(i, o) && d(i, r, r.next, o) && p(i, o) && p(o, i) && (t.push(i.i / n),
                                    t.push(r.i / n),
                                    t.push(o.i / n),
                                    m(r),
                                    m(r.next),
                                    r = e = o),
                                    r = r.next
                                } while (r !== e);return r
                            }(e, t, n), t, n, r, i, a, 2) : 2 === g && function(e, t, n, r, i, a) {
                                var l = e;
                                do {
                                    for (var u = l.next.next; u !== l.prev; ) {
                                        if (l.i !== u.i && function(e, t) {
                                            return e.next.i !== t.i && e.prev.i !== t.i && !function(e, t) {
                                                var n = e;
                                                do {
                                                    if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && d(n, n.next, e, t))
                                                        return !0;
                                                    n = n.next
                                                } while (n !== e);return !1
                                            }(e, t) && p(e, t) && p(t, e) && function(e, t) {
                                                var n = e
                                                  , r = !1
                                                  , i = (e.x + t.x) / 2
                                                  , o = (e.y + t.y) / 2;
                                                do {
                                                    n.y > o != n.next.y > o && i < (n.next.x - n.x) * (o - n.y) / (n.next.y - n.y) + n.x && (r = !r),
                                                    n = n.next
                                                } while (n !== e);return r
                                            }(e, t)
                                        }(l, u)) {
                                            var c = f(l, u);
                                            return l = o(l, l.next),
                                            c = o(c, c.next),
                                            s(l, t, n, r, i, a),
                                            void s(c, t, n, r, i, a)
                                        }
                                        u = u.next
                                    }
                                    l = l.next
                                } while (l !== e)
                            }(e, t, n, r, i, a) : s(o(e), t, n, r, i, a, 1);
                            break
                        }
                }
            }
            function a(e, t) {
                return e.x - t.x
            }
            function l(e, t, n, r, i) {
                return e = 32767 * (e - n) / i,
                t = 32767 * (t - r) / i,
                e = 16711935 & (e | e << 8),
                e = 252645135 & (e | e << 4),
                e = 858993459 & (e | e << 2),
                e = 1431655765 & (e | e << 1),
                t = 16711935 & (t | t << 8),
                t = 252645135 & (t | t << 4),
                t = 858993459 & (t | t << 2),
                t = 1431655765 & (t | t << 1),
                e | t << 1
            }
            function u(e, t, n, r, i, o, s, a) {
                return (i - s) * (t - a) - (e - s) * (o - a) >= 0 && (e - s) * (r - a) - (n - s) * (t - a) >= 0 && (n - s) * (o - a) - (i - s) * (r - a) >= 0
            }
            function c(e, t, n) {
                return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y)
            }
            function h(e, t) {
                return e.x === t.x && e.y === t.y
            }
            function d(e, t, n, r) {
                return !!(h(e, t) && h(n, r) || h(e, r) && h(n, t)) || c(e, t, n) > 0 != c(e, t, r) > 0 && c(n, r, e) > 0 != c(n, r, t) > 0
            }
            function p(e, t) {
                return c(e.prev, e, e.next) < 0 ? c(e, t, e.next) >= 0 && c(e, e.prev, t) >= 0 : c(e, t, e.prev) < 0 || c(e, e.next, t) < 0
            }
            function f(e, t) {
                var n = new v(e.i,e.x,e.y)
                  , r = new v(t.i,t.x,t.y)
                  , i = e.next
                  , o = t.prev;
                return e.next = t,
                t.prev = e,
                n.next = i,
                i.prev = n,
                r.next = n,
                n.prev = r,
                o.next = r,
                r.prev = o,
                r
            }
            function g(e, t, n, r) {
                var i = new v(e,t,n);
                return r ? (i.next = r.next,
                i.prev = r,
                r.next.prev = i,
                r.next = i) : (i.prev = i,
                i.next = i),
                i
            }
            function m(e) {
                e.next.prev = e.prev,
                e.prev.next = e.next,
                e.prevZ && (e.prevZ.nextZ = e.nextZ),
                e.nextZ && (e.nextZ.prevZ = e.prevZ)
            }
            function v(e, t, n) {
                this.i = e,
                this.x = t,
                this.y = n,
                this.prev = null,
                this.next = null,
                this.z = null,
                this.prevZ = null,
                this.nextZ = null,
                this.steiner = !1
            }
            function y(e, t, n, r) {
                for (var i = 0, o = t, s = n - r; o < n; o += r)
                    i += (e[s] - e[o]) * (e[o + 1] + e[s + 1]),
                    s = o;
                return i
            }
            t.exports = r,
            r.deviation = function(e, t, n, r) {
                var i = t && t.length
                  , o = i ? t[0] * n : e.length
                  , s = Math.abs(y(e, 0, o, n));
                if (i)
                    for (var a = 0, l = t.length; a < l; a++) {
                        var u = t[a] * n
                          , c = a < l - 1 ? t[a + 1] * n : e.length;
                        s -= Math.abs(y(e, u, c, n))
                    }
                var h = 0;
                for (a = 0; a < r.length; a += 3) {
                    var d = r[a] * n
                      , p = r[a + 1] * n
                      , f = r[a + 2] * n;
                    h += Math.abs((e[d] - e[f]) * (e[p + 1] - e[d + 1]) - (e[d] - e[p]) * (e[f + 1] - e[d + 1]))
                }
                return 0 === s && 0 === h ? 0 : Math.abs((h - s) / s)
            }
            ,
            r.flatten = function(e) {
                for (var t = e[0][0].length, n = {
                    vertices: [],
                    holes: [],
                    dimensions: t
                }, r = 0, i = 0; i < e.length; i++) {
                    for (var o = 0; o < e[i].length; o++)
                        for (var s = 0; s < t; s++)
                            n.vertices.push(e[i][o][s]);
                    i > 0 && (r += e[i - 1].length,
                    n.holes.push(r))
                }
                return n
            }
        }
        , {}],
        3: [function(e, t, n) {
            function r() {}
            function i(e, t, n) {
                this.fn = e,
                this.context = t,
                this.once = n || !1
            }
            function o() {
                this._events = new r,
                this._eventsCount = 0
            }
            var s = Object.prototype.hasOwnProperty
              , a = "~";
            Object.create && (r.prototype = Object.create(null),
            (new r).__proto__ || (a = !1)),
            o.prototype.eventNames = function() {
                var e, t, n = [];
                if (0 === this._eventsCount)
                    return n;
                for (t in e = this._events)
                    s.call(e, t) && n.push(a ? t.slice(1) : t);
                return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
            }
            ,
            o.prototype.listeners = function(e, t) {
                var n = a ? a + e : e
                  , r = this._events[n];
                if (t)
                    return !!r;
                if (!r)
                    return [];
                if (r.fn)
                    return [r.fn];
                for (var i = 0, o = r.length, s = new Array(o); i < o; i++)
                    s[i] = r[i].fn;
                return s
            }
            ,
            o.prototype.emit = function(e, t, n, r, i, o) {
                var s = a ? a + e : e;
                if (!this._events[s])
                    return !1;
                var l, u, c = this._events[s], h = arguments.length;
                if (c.fn) {
                    switch (c.once && this.removeListener(e, c.fn, void 0, !0),
                    h) {
                    case 1:
                        return c.fn.call(c.context),
                        !0;
                    case 2:
                        return c.fn.call(c.context, t),
                        !0;
                    case 3:
                        return c.fn.call(c.context, t, n),
                        !0;
                    case 4:
                        return c.fn.call(c.context, t, n, r),
                        !0;
                    case 5:
                        return c.fn.call(c.context, t, n, r, i),
                        !0;
                    case 6:
                        return c.fn.call(c.context, t, n, r, i, o),
                        !0
                    }
                    for (u = 1,
                    l = new Array(h - 1); u < h; u++)
                        l[u - 1] = arguments[u];
                    c.fn.apply(c.context, l)
                } else {
                    var d, p = c.length;
                    for (u = 0; u < p; u++)
                        switch (c[u].once && this.removeListener(e, c[u].fn, void 0, !0),
                        h) {
                        case 1:
                            c[u].fn.call(c[u].context);
                            break;
                        case 2:
                            c[u].fn.call(c[u].context, t);
                            break;
                        case 3:
                            c[u].fn.call(c[u].context, t, n);
                            break;
                        case 4:
                            c[u].fn.call(c[u].context, t, n, r);
                            break;
                        default:
                            if (!l)
                                for (d = 1,
                                l = new Array(h - 1); d < h; d++)
                                    l[d - 1] = arguments[d];
                            c[u].fn.apply(c[u].context, l)
                        }
                }
                return !0
            }
            ,
            o.prototype.on = function(e, t, n) {
                var r = new i(t,n || this)
                  , o = a ? a + e : e;
                return this._events[o] ? this._events[o].fn ? this._events[o] = [this._events[o], r] : this._events[o].push(r) : (this._events[o] = r,
                this._eventsCount++),
                this
            }
            ,
            o.prototype.once = function(e, t, n) {
                var r = new i(t,n || this,!0)
                  , o = a ? a + e : e;
                return this._events[o] ? this._events[o].fn ? this._events[o] = [this._events[o], r] : this._events[o].push(r) : (this._events[o] = r,
                this._eventsCount++),
                this
            }
            ,
            o.prototype.removeListener = function(e, t, n, i) {
                var o = a ? a + e : e;
                if (!this._events[o])
                    return this;
                if (!t)
                    return 0 == --this._eventsCount ? this._events = new r : delete this._events[o],
                    this;
                var s = this._events[o];
                if (s.fn)
                    s.fn !== t || i && !s.once || n && s.context !== n || (0 == --this._eventsCount ? this._events = new r : delete this._events[o]);
                else {
                    for (var l = 0, u = [], c = s.length; l < c; l++)
                        (s[l].fn !== t || i && !s[l].once || n && s[l].context !== n) && u.push(s[l]);
                    u.length ? this._events[o] = 1 === u.length ? u[0] : u : 0 == --this._eventsCount ? this._events = new r : delete this._events[o]
                }
                return this
            }
            ,
            o.prototype.removeAllListeners = function(e) {
                var t;
                return e ? (t = a ? a + e : e,
                this._events[t] && (0 == --this._eventsCount ? this._events = new r : delete this._events[t])) : (this._events = new r,
                this._eventsCount = 0),
                this
            }
            ,
            o.prototype.off = o.prototype.removeListener,
            o.prototype.addListener = o.prototype.on,
            o.prototype.setMaxListeners = function() {
                return this
            }
            ,
            o.prefixed = a,
            o.EventEmitter = o,
            void 0 !== t && (t.exports = o)
        }
        , {}],
        4: [function(e, t, n) {
            !function(e) {
                var n = /iPhone/i
                  , r = /iPod/i
                  , i = /iPad/i
                  , o = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i
                  , s = /Android/i
                  , a = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i
                  , l = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i
                  , u = /Windows Phone/i
                  , c = /(?=.*\bWindows\b)(?=.*\bARM\b)/i
                  , h = /BlackBerry/i
                  , d = /BB10/i
                  , p = /Opera Mini/i
                  , f = /(CriOS|Chrome)(?=.*\bMobile\b)/i
                  , g = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i
                  , m = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i")
                  , v = function(e, t) {
                    return e.test(t)
                }
                  , y = function(e) {
                    var t = e || navigator.userAgent
                      , y = t.split("[FBAN");
                    if (void 0 !== y[1] && (t = y[0]),
                    void 0 !== (y = t.split("Twitter"))[1] && (t = y[0]),
                    this.apple = {
                        phone: v(n, t),
                        ipod: v(r, t),
                        tablet: !v(n, t) && v(i, t),
                        device: v(n, t) || v(r, t) || v(i, t)
                    },
                    this.amazon = {
                        phone: v(a, t),
                        tablet: !v(a, t) && v(l, t),
                        device: v(a, t) || v(l, t)
                    },
                    this.android = {
                        phone: v(a, t) || v(o, t),
                        tablet: !v(a, t) && !v(o, t) && (v(l, t) || v(s, t)),
                        device: v(a, t) || v(l, t) || v(o, t) || v(s, t)
                    },
                    this.windows = {
                        phone: v(u, t),
                        tablet: v(c, t),
                        device: v(u, t) || v(c, t)
                    },
                    this.other = {
                        blackberry: v(h, t),
                        blackberry10: v(d, t),
                        opera: v(p, t),
                        firefox: v(g, t),
                        chrome: v(f, t),
                        device: v(h, t) || v(d, t) || v(p, t) || v(g, t) || v(f, t)
                    },
                    this.seven_inch = v(m, t),
                    this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch,
                    this.phone = this.apple.phone || this.android.phone || this.windows.phone,
                    this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet,
                    "undefined" == typeof window)
                        return this
                }
                  , b = function() {
                    var e = new y;
                    return e.Class = y,
                    e
                };
                void 0 !== t && t.exports && "undefined" == typeof window ? t.exports = y : void 0 !== t && t.exports && "undefined" != typeof window ? t.exports = b() : e.isMobile = b()
            }(this)
        }
        , {}],
        5: [function(e, t, n) {
            var r = Object.getOwnPropertySymbols
              , i = Object.prototype.hasOwnProperty
              , o = Object.prototype.propertyIsEnumerable;
            t.exports = function() {
                try {
                    if (!Object.assign)
                        return !1;
                    var e = new String("abc");
                    if (e[5] = "de",
                    "5" === Object.getOwnPropertyNames(e)[0])
                        return !1;
                    for (var t = {}, n = 0; n < 10; n++)
                        t["_" + String.fromCharCode(n)] = n;
                    if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
                        return t[e]
                    }).join(""))
                        return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                        r[e] = e
                    }),
                    "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
                } catch (e) {
                    return !1
                }
            }() ? Object.assign : function(e, t) {
                for (var n, s, a = function(e) {
                    if (null === e || void 0 === e)
                        throw new TypeError("Object.assign cannot be called with null or undefined");
                    return Object(e)
                }(e), l = 1; l < arguments.length; l++) {
                    n = Object(arguments[l]);
                    for (var u in n)
                        i.call(n, u) && (a[u] = n[u]);
                    if (r) {
                        s = r(n);
                        for (var c = 0; c < s.length; c++)
                            o.call(n, s[c]) && (a[s[c]] = n[s[c]])
                    }
                }
                return a
            }
        }
        , {}],
        6: [function(e, t, n) {
            var r = new ArrayBuffer(0)
              , i = function(e, t, n, i) {
                this.gl = e,
                this.buffer = e.createBuffer(),
                this.type = t || e.ARRAY_BUFFER,
                this.drawType = i || e.STATIC_DRAW,
                this.data = r,
                n && this.upload(n),
                this._updateID = 0
            };
            i.prototype.upload = function(e, t, n) {
                n || this.bind();
                var r = this.gl;
                e = e || this.data,
                t = t || 0,
                this.data.byteLength >= e.byteLength ? r.bufferSubData(this.type, t, e) : r.bufferData(this.type, e, this.drawType),
                this.data = e
            }
            ,
            i.prototype.bind = function() {
                this.gl.bindBuffer(this.type, this.buffer)
            }
            ,
            i.createVertexBuffer = function(e, t, n) {
                return new i(e,e.ARRAY_BUFFER,t,n)
            }
            ,
            i.createIndexBuffer = function(e, t, n) {
                return new i(e,e.ELEMENT_ARRAY_BUFFER,t,n)
            }
            ,
            i.create = function(e, t, n, r) {
                return new i(e,t,n,r)
            }
            ,
            i.prototype.destroy = function() {
                this.gl.deleteBuffer(this.buffer)
            }
            ,
            t.exports = i
        }
        , {}],
        7: [function(e, t, n) {
            var r = e("./GLTexture")
              , i = function(e, t, n) {
                this.gl = e,
                this.framebuffer = e.createFramebuffer(),
                this.stencil = null,
                this.texture = null,
                this.width = t || 100,
                this.height = n || 100
            };
            i.prototype.enableTexture = function(e) {
                var t = this.gl;
                this.texture = e || new r(t),
                this.texture.bind(),
                this.bind(),
                t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture.texture, 0)
            }
            ,
            i.prototype.enableStencil = function() {
                if (!this.stencil) {
                    var e = this.gl;
                    this.stencil = e.createRenderbuffer(),
                    e.bindRenderbuffer(e.RENDERBUFFER, this.stencil),
                    e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, this.stencil),
                    e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, this.width, this.height)
                }
            }
            ,
            i.prototype.clear = function(e, t, n, r) {
                this.bind();
                var i = this.gl;
                i.clearColor(e, t, n, r),
                i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT)
            }
            ,
            i.prototype.bind = function() {
                var e = this.gl;
                e.bindFramebuffer(e.FRAMEBUFFER, this.framebuffer)
            }
            ,
            i.prototype.unbind = function() {
                var e = this.gl;
                e.bindFramebuffer(e.FRAMEBUFFER, null)
            }
            ,
            i.prototype.resize = function(e, t) {
                var n = this.gl;
                this.width = e,
                this.height = t,
                this.texture && this.texture.uploadData(null, e, t),
                this.stencil && (n.bindRenderbuffer(n.RENDERBUFFER, this.stencil),
                n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, e, t))
            }
            ,
            i.prototype.destroy = function() {
                var e = this.gl;
                this.texture && this.texture.destroy(),
                e.deleteFramebuffer(this.framebuffer),
                this.gl = null,
                this.stencil = null,
                this.texture = null
            }
            ,
            i.createRGBA = function(e, t, n, o) {
                var s = r.fromData(e, null, t, n);
                s.enableNearestScaling(),
                s.enableWrapClamp();
                var a = new i(e,t,n);
                return a.enableTexture(s),
                a.unbind(),
                a
            }
            ,
            i.createFloat32 = function(e, t, n, o) {
                var s = new r.fromData(e,o,t,n);
                s.enableNearestScaling(),
                s.enableWrapClamp();
                var a = new i(e,t,n);
                return a.enableTexture(s),
                a.unbind(),
                a
            }
            ,
            t.exports = i
        }
        , {
            "./GLTexture": 9
        }],
        8: [function(e, t, n) {
            var r = e("./shader/compileProgram")
              , i = e("./shader/extractAttributes")
              , o = e("./shader/extractUniforms")
              , s = e("./shader/setPrecision")
              , a = e("./shader/generateUniformAccessObject")
              , l = function(e, t, n, l, u) {
                this.gl = e,
                l && (t = s(t, l),
                n = s(n, l)),
                this.program = r(e, t, n, u),
                this.attributes = i(e, this.program),
                this.uniformData = o(e, this.program),
                this.uniforms = a(e, this.uniformData)
            };
            l.prototype.bind = function() {
                this.gl.useProgram(this.program)
            }
            ,
            l.prototype.destroy = function() {
                this.attributes = null,
                this.uniformData = null,
                this.uniforms = null;
                this.gl.deleteProgram(this.program)
            }
            ,
            t.exports = l
        }
        , {
            "./shader/compileProgram": 14,
            "./shader/extractAttributes": 16,
            "./shader/extractUniforms": 17,
            "./shader/generateUniformAccessObject": 18,
            "./shader/setPrecision": 22
        }],
        9: [function(e, t, n) {
            var r = function(e, t, n, r, i) {
                this.gl = e,
                this.texture = e.createTexture(),
                this.mipmap = !1,
                this.premultiplyAlpha = !1,
                this.width = t || -1,
                this.height = n || -1,
                this.format = r || e.RGBA,
                this.type = i || e.UNSIGNED_BYTE
            };
            r.prototype.upload = function(e) {
                this.bind();
                var t = this.gl;
                t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
                var n = e.videoWidth || e.width
                  , r = e.videoHeight || e.height;
                r !== this.height || n !== this.width ? t.texImage2D(t.TEXTURE_2D, 0, this.format, this.format, this.type, e) : t.texSubImage2D(t.TEXTURE_2D, 0, 0, 0, this.format, this.type, e),
                this.width = n,
                this.height = r
            }
            ;
            var i = !1;
            r.prototype.uploadData = function(e, t, n) {
                this.bind();
                var r = this.gl;
                if (e instanceof Float32Array) {
                    if (!i) {
                        if (!r.getExtension("OES_texture_float"))
                            throw new Error("floating point textures not available");
                        i = !0
                    }
                    this.type = r.FLOAT
                } else
                    this.type = this.type || r.UNSIGNED_BYTE;
                r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha),
                t !== this.width || n !== this.height ? r.texImage2D(r.TEXTURE_2D, 0, this.format, t, n, 0, this.format, this.type, e || null) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, t, n, this.format, this.type, e || null),
                this.width = t,
                this.height = n
            }
            ,
            r.prototype.bind = function(e) {
                var t = this.gl;
                void 0 !== e && t.activeTexture(t.TEXTURE0 + e),
                t.bindTexture(t.TEXTURE_2D, this.texture)
            }
            ,
            r.prototype.unbind = function() {
                var e = this.gl;
                e.bindTexture(e.TEXTURE_2D, null)
            }
            ,
            r.prototype.minFilter = function(e) {
                var t = this.gl;
                this.bind(),
                this.mipmap ? t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e ? t.LINEAR_MIPMAP_LINEAR : t.NEAREST_MIPMAP_NEAREST) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e ? t.LINEAR : t.NEAREST)
            }
            ,
            r.prototype.magFilter = function(e) {
                var t = this.gl;
                this.bind(),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e ? t.LINEAR : t.NEAREST)
            }
            ,
            r.prototype.enableMipmap = function() {
                var e = this.gl;
                this.bind(),
                this.mipmap = !0,
                e.generateMipmap(e.TEXTURE_2D)
            }
            ,
            r.prototype.enableLinearScaling = function() {
                this.minFilter(!0),
                this.magFilter(!0)
            }
            ,
            r.prototype.enableNearestScaling = function() {
                this.minFilter(!1),
                this.magFilter(!1)
            }
            ,
            r.prototype.enableWrapClamp = function() {
                var e = this.gl;
                this.bind(),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE)
            }
            ,
            r.prototype.enableWrapRepeat = function() {
                var e = this.gl;
                this.bind(),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT)
            }
            ,
            r.prototype.enableWrapMirrorRepeat = function() {
                var e = this.gl;
                this.bind(),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.MIRRORED_REPEAT),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.MIRRORED_REPEAT)
            }
            ,
            r.prototype.destroy = function() {
                this.gl.deleteTexture(this.texture)
            }
            ,
            r.fromSource = function(e, t, n) {
                var i = new r(e);
                return i.premultiplyAlpha = n || !1,
                i.upload(t),
                i
            }
            ,
            r.fromData = function(e, t, n, i) {
                var o = new r(e);
                return o.uploadData(t, n, i),
                o
            }
            ,
            t.exports = r
        }
        , {}],
        10: [function(e, t, n) {
            function r(e, t) {
                if (this.nativeVaoExtension = null,
                r.FORCE_NATIVE || (this.nativeVaoExtension = e.getExtension("OES_vertex_array_object") || e.getExtension("MOZ_OES_vertex_array_object") || e.getExtension("WEBKIT_OES_vertex_array_object")),
                this.nativeState = t,
                this.nativeVaoExtension) {
                    this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
                    var n = e.getParameter(e.MAX_VERTEX_ATTRIBS);
                    this.nativeState = {
                        tempAttribState: new Array(n),
                        attribState: new Array(n)
                    }
                }
                this.gl = e,
                this.attributes = [],
                this.indexBuffer = null,
                this.dirty = !1
            }
            var i = e("./setVertexAttribArrays");
            r.prototype.constructor = r,
            t.exports = r,
            r.FORCE_NATIVE = !1,
            r.prototype.bind = function() {
                return this.nativeVao ? (this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao),
                this.dirty && (this.dirty = !1,
                this.activate())) : this.activate(),
                this
            }
            ,
            r.prototype.unbind = function() {
                return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(null),
                this
            }
            ,
            r.prototype.activate = function() {
                for (var e = this.gl, t = null, n = 0; n < this.attributes.length; n++) {
                    var r = this.attributes[n];
                    t !== r.buffer && (r.buffer.bind(),
                    t = r.buffer),
                    e.vertexAttribPointer(r.attribute.location, r.attribute.size, r.type || e.FLOAT, r.normalized || !1, r.stride || 0, r.start || 0)
                }
                return i(e, this.attributes, this.nativeState),
                this.indexBuffer && this.indexBuffer.bind(),
                this
            }
            ,
            r.prototype.addAttribute = function(e, t, n, r, i, o) {
                return this.attributes.push({
                    buffer: e,
                    attribute: t,
                    location: t.location,
                    type: n || this.gl.FLOAT,
                    normalized: r || !1,
                    stride: i || 0,
                    start: o || 0
                }),
                this.dirty = !0,
                this
            }
            ,
            r.prototype.addIndex = function(e) {
                return this.indexBuffer = e,
                this.dirty = !0,
                this
            }
            ,
            r.prototype.clear = function() {
                return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao),
                this.attributes.length = 0,
                this.indexBuffer = null,
                this
            }
            ,
            r.prototype.draw = function(e, t, n) {
                var r = this.gl;
                return this.indexBuffer ? r.drawElements(e, t || this.indexBuffer.data.length, r.UNSIGNED_SHORT, 2 * (n || 0)) : r.drawArrays(e, n, t || this.getSize()),
                this
            }
            ,
            r.prototype.destroy = function() {
                this.gl = null,
                this.indexBuffer = null,
                this.attributes = null,
                this.nativeState = null,
                this.nativeVao && this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao),
                this.nativeVaoExtension = null,
                this.nativeVao = null
            }
            ,
            r.prototype.getSize = function() {
                var e = this.attributes[0];
                return e.buffer.data.length / (e.stride / 4 || e.attribute.size)
            }
        }
        , {
            "./setVertexAttribArrays": 13
        }],
        11: [function(e, t, n) {
            t.exports = function(e, t) {
                var n = e.getContext("webgl", t) || e.getContext("experimental-webgl", t);
                if (!n)
                    throw new Error("This browser does not support webGL. Try using the canvas renderer");
                return n
            }
        }
        , {}],
        12: [function(e, t, n) {
            var r = {
                createContext: e("./createContext"),
                setVertexAttribArrays: e("./setVertexAttribArrays"),
                GLBuffer: e("./GLBuffer"),
                GLFramebuffer: e("./GLFramebuffer"),
                GLShader: e("./GLShader"),
                GLTexture: e("./GLTexture"),
                VertexArrayObject: e("./VertexArrayObject"),
                shader: e("./shader")
            };
            void 0 !== t && t.exports && (t.exports = r),
            "undefined" != typeof window && (window.PIXI = window.PIXI || {},
            window.PIXI.glCore = r)
        }
        , {
            "./GLBuffer": 6,
            "./GLFramebuffer": 7,
            "./GLShader": 8,
            "./GLTexture": 9,
            "./VertexArrayObject": 10,
            "./createContext": 11,
            "./setVertexAttribArrays": 13,
            "./shader": 19
        }],
        13: [function(e, t, n) {
            t.exports = function(e, t, n) {
                var r;
                if (n) {
                    var i = n.tempAttribState
                      , o = n.attribState;
                    for (r = 0; r < i.length; r++)
                        i[r] = !1;
                    for (r = 0; r < t.length; r++)
                        i[t[r].attribute.location] = !0;
                    for (r = 0; r < o.length; r++)
                        o[r] !== i[r] && (o[r] = i[r],
                        n.attribState[r] ? e.enableVertexAttribArray(r) : e.disableVertexAttribArray(r))
                } else
                    for (r = 0; r < t.length; r++) {
                        var s = t[r];
                        e.enableVertexAttribArray(s.attribute.location)
                    }
            }
        }
        , {}],
        14: [function(e, t, n) {
            var r = function(e, t, n) {
                var r = e.createShader(t);
                return e.shaderSource(r, n),
                e.compileShader(r),
                e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (console.log(e.getShaderInfoLog(r)),
                null)
            };
            t.exports = function(e, t, n, i) {
                var o = r(e, e.VERTEX_SHADER, t)
                  , s = r(e, e.FRAGMENT_SHADER, n)
                  , a = e.createProgram();
                if (e.attachShader(a, o),
                e.attachShader(a, s),
                i)
                    for (var l in i)
                        e.bindAttribLocation(a, i[l], l);
                return e.linkProgram(a),
                e.getProgramParameter(a, e.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."),
                console.error("gl.VALIDATE_STATUS", e.getProgramParameter(a, e.VALIDATE_STATUS)),
                console.error("gl.getError()", e.getError()),
                "" !== e.getProgramInfoLog(a) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", e.getProgramInfoLog(a)),
                e.deleteProgram(a),
                a = null),
                e.deleteShader(o),
                e.deleteShader(s),
                a
            }
        }
        , {}],
        15: [function(e, t, n) {
            var r = function(e) {
                for (var t = new Array(e), n = 0; n < t.length; n++)
                    t[n] = !1;
                return t
            };
            t.exports = function(e, t) {
                switch (e) {
                case "float":
                    return 0;
                case "vec2":
                    return new Float32Array(2 * t);
                case "vec3":
                    return new Float32Array(3 * t);
                case "vec4":
                    return new Float32Array(4 * t);
                case "int":
                case "sampler2D":
                    return 0;
                case "ivec2":
                    return new Int32Array(2 * t);
                case "ivec3":
                    return new Int32Array(3 * t);
                case "ivec4":
                    return new Int32Array(4 * t);
                case "bool":
                    return !1;
                case "bvec2":
                    return r(2 * t);
                case "bvec3":
                    return r(3 * t);
                case "bvec4":
                    return r(4 * t);
                case "mat2":
                    return new Float32Array([1, 0, 0, 1]);
                case "mat3":
                    return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
                case "mat4":
                    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                }
            }
        }
        , {}],
        16: [function(e, t, n) {
            var r = e("./mapType")
              , i = e("./mapSize")
              , o = function(e, t, n, r) {
                gl.vertexAttribPointer(this.location, this.size, e || gl.FLOAT, t || !1, n || 0, r || 0)
            };
            t.exports = function(e, t) {
                for (var n = {}, s = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), a = 0; a < s; a++) {
                    var l = e.getActiveAttrib(t, a)
                      , u = r(e, l.type);
                    n[l.name] = {
                        type: u,
                        size: i(u),
                        location: e.getAttribLocation(t, l.name),
                        pointer: o
                    }
                }
                return n
            }
        }
        , {
            "./mapSize": 20,
            "./mapType": 21
        }],
        17: [function(e, t, n) {
            var r = e("./mapType")
              , i = e("./defaultValue");
            t.exports = function(e, t) {
                for (var n = {}, o = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), s = 0; s < o; s++) {
                    var a = e.getActiveUniform(t, s)
                      , l = a.name.replace(/\[.*?\]/, "")
                      , u = r(e, a.type);
                    n[l] = {
                        type: u,
                        size: a.size,
                        location: e.getUniformLocation(t, l),
                        value: i(u, a.size)
                    }
                }
                return n
            }
        }
        , {
            "./defaultValue": 15,
            "./mapType": 21
        }],
        18: [function(e, t, n) {
            var r = function(e) {
                var t = s.replace("%%", e);
                return new Function(t)
            }
              , i = function(e, t) {
                var n, r = a.replace(/%%/g, e);
                return (n = 1 === t.size ? l[t.type] : u[t.type]) && (r += "\nthis.gl." + n + ";"),
                new Function("value",r)
            }
              , o = function(e, t) {
                for (var n = t, r = 0; r < e.length - 1; r++) {
                    var i = n[e[r]] || {
                        data: {}
                    };
                    n[e[r]] = i,
                    n = i
                }
                return n
            }
              , s = ["return this.data.%%.value;"].join("\n")
              , a = ["this.data.%%.value = value;", "var location = this.data.%%.location;"].join("\n")
              , l = {
                float: "uniform1f(location, value)",
                vec2: "uniform2f(location, value[0], value[1])",
                vec3: "uniform3f(location, value[0], value[1], value[2])",
                vec4: "uniform4f(location, value[0], value[1], value[2], value[3])",
                int: "uniform1i(location, value)",
                ivec2: "uniform2i(location, value[0], value[1])",
                ivec3: "uniform3i(location, value[0], value[1], value[2])",
                ivec4: "uniform4i(location, value[0], value[1], value[2], value[3])",
                bool: "uniform1i(location, value)",
                bvec2: "uniform2i(location, value[0], value[1])",
                bvec3: "uniform3i(location, value[0], value[1], value[2])",
                bvec4: "uniform4i(location, value[0], value[1], value[2], value[3])",
                mat2: "uniformMatrix2fv(location, false, value)",
                mat3: "uniformMatrix3fv(location, false, value)",
                mat4: "uniformMatrix4fv(location, false, value)",
                sampler2D: "uniform1i(location, value)"
            }
              , u = {
                float: "uniform1fv(location, value)",
                vec2: "uniform2fv(location, value)",
                vec3: "uniform3fv(location, value)",
                vec4: "uniform4fv(location, value)",
                int: "uniform1iv(location, value)",
                ivec2: "uniform2iv(location, value)",
                ivec3: "uniform3iv(location, value)",
                ivec4: "uniform4iv(location, value)",
                bool: "uniform1iv(location, value)",
                bvec2: "uniform2iv(location, value)",
                bvec3: "uniform3iv(location, value)",
                bvec4: "uniform4iv(location, value)",
                sampler2D: "uniform1iv(location, value)"
            };
            t.exports = function(e, t) {
                var n = {
                    data: {}
                };
                n.gl = e;
                for (var s = Object.keys(t), a = 0; a < s.length; a++) {
                    var l = s[a]
                      , u = l.split(".")
                      , c = u[u.length - 1]
                      , h = o(u, n)
                      , d = t[l];
                    h.data[c] = d,
                    h.gl = e,
                    Object.defineProperty(h, c, {
                        get: r(c),
                        set: i(c, d)
                    })
                }
                return n
            }
        }
        , {}],
        19: [function(e, t, n) {
            t.exports = {
                compileProgram: e("./compileProgram"),
                defaultValue: e("./defaultValue"),
                extractAttributes: e("./extractAttributes"),
                extractUniforms: e("./extractUniforms"),
                generateUniformAccessObject: e("./generateUniformAccessObject"),
                setPrecision: e("./setPrecision"),
                mapSize: e("./mapSize"),
                mapType: e("./mapType")
            }
        }
        , {
            "./compileProgram": 14,
            "./defaultValue": 15,
            "./extractAttributes": 16,
            "./extractUniforms": 17,
            "./generateUniformAccessObject": 18,
            "./mapSize": 20,
            "./mapType": 21,
            "./setPrecision": 22
        }],
        20: [function(e, t, n) {
            var r = {
                float: 1,
                vec2: 2,
                vec3: 3,
                vec4: 4,
                int: 1,
                ivec2: 2,
                ivec3: 3,
                ivec4: 4,
                bool: 1,
                bvec2: 2,
                bvec3: 3,
                bvec4: 4,
                mat2: 4,
                mat3: 9,
                mat4: 16,
                sampler2D: 1
            };
            t.exports = function(e) {
                return r[e]
            }
        }
        , {}],
        21: [function(e, t, n) {
            var r = null
              , i = {
                FLOAT: "float",
                FLOAT_VEC2: "vec2",
                FLOAT_VEC3: "vec3",
                FLOAT_VEC4: "vec4",
                INT: "int",
                INT_VEC2: "ivec2",
                INT_VEC3: "ivec3",
                INT_VEC4: "ivec4",
                BOOL: "bool",
                BOOL_VEC2: "bvec2",
                BOOL_VEC3: "bvec3",
                BOOL_VEC4: "bvec4",
                FLOAT_MAT2: "mat2",
                FLOAT_MAT3: "mat3",
                FLOAT_MAT4: "mat4",
                SAMPLER_2D: "sampler2D"
            };
            t.exports = function(e, t) {
                if (!r) {
                    var n = Object.keys(i);
                    r = {};
                    for (var o = 0; o < n.length; ++o) {
                        var s = n[o];
                        r[e[s]] = i[s]
                    }
                }
                return r[t]
            }
        }
        , {}],
        22: [function(e, t, n) {
            t.exports = function(e, t) {
                return "precision" !== e.substring(0, 9) ? "precision " + t + " float;\n" + e : e
            }
        }
        , {}],
        23: [function(e, t, n) {
            (function(e) {
                function t(e, t) {
                    for (var n = 0, r = e.length - 1; r >= 0; r--) {
                        var i = e[r];
                        "." === i ? e.splice(r, 1) : ".." === i ? (e.splice(r, 1),
                        n++) : n && (e.splice(r, 1),
                        n--)
                    }
                    if (t)
                        for (; n--; n)
                            e.unshift("..");
                    return e
                }
                function r(e, t) {
                    if (e.filter)
                        return e.filter(t);
                    for (var n = [], r = 0; r < e.length; r++)
                        t(e[r], r, e) && n.push(e[r]);
                    return n
                }
                var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                  , o = function(e) {
                    return i.exec(e).slice(1)
                };
                n.resolve = function() {
                    for (var n = "", i = !1, o = arguments.length - 1; o >= -1 && !i; o--) {
                        var s = o >= 0 ? arguments[o] : e.cwd();
                        if ("string" != typeof s)
                            throw new TypeError("Arguments to path.resolve must be strings");
                        s && (n = s + "/" + n,
                        i = "/" === s.charAt(0))
                    }
                    return n = t(r(n.split("/"), function(e) {
                        return !!e
                    }), !i).join("/"),
                    (i ? "/" : "") + n || "."
                }
                ,
                n.normalize = function(e) {
                    var i = n.isAbsolute(e)
                      , o = "/" === s(e, -1);
                    return (e = t(r(e.split("/"), function(e) {
                        return !!e
                    }), !i).join("/")) || i || (e = "."),
                    e && o && (e += "/"),
                    (i ? "/" : "") + e
                }
                ,
                n.isAbsolute = function(e) {
                    return "/" === e.charAt(0)
                }
                ,
                n.join = function() {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return n.normalize(r(e, function(e, t) {
                        if ("string" != typeof e)
                            throw new TypeError("Arguments to path.join must be strings");
                        return e
                    }).join("/"))
                }
                ,
                n.relative = function(e, t) {
                    function r(e) {
                        for (var t = 0; t < e.length && "" === e[t]; t++)
                            ;
                        for (var n = e.length - 1; n >= 0 && "" === e[n]; n--)
                            ;
                        return t > n ? [] : e.slice(t, n - t + 1)
                    }
                    e = n.resolve(e).substr(1),
                    t = n.resolve(t).substr(1);
                    for (var i = r(e.split("/")), o = r(t.split("/")), s = Math.min(i.length, o.length), a = s, l = 0; l < s; l++)
                        if (i[l] !== o[l]) {
                            a = l;
                            break
                        }
                    var u = [];
                    for (l = a; l < i.length; l++)
                        u.push("..");
                    return (u = u.concat(o.slice(a))).join("/")
                }
                ,
                n.sep = "/",
                n.delimiter = ":",
                n.dirname = function(e) {
                    var t = o(e)
                      , n = t[0]
                      , r = t[1];
                    return n || r ? (r && (r = r.substr(0, r.length - 1)),
                    n + r) : "."
                }
                ,
                n.basename = function(e, t) {
                    var n = o(e)[2];
                    return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)),
                    n
                }
                ,
                n.extname = function(e) {
                    return o(e)[3]
                }
                ;
                var s = "b" === "ab".substr(-1) ? function(e, t, n) {
                    return e.substr(t, n)
                }
                : function(e, t, n) {
                    return t < 0 && (t = e.length + t),
                    e.substr(t, n)
                }
            }
            ).call(this, e("_process"))
        }
        , {
            _process: 24
        }],
        24: [function(e, t, n) {
            function r() {
                throw new Error("setTimeout has not been defined")
            }
            function i() {
                throw new Error("clearTimeout has not been defined")
            }
            function o(e) {
                if (c === setTimeout)
                    return setTimeout(e, 0);
                if ((c === r || !c) && setTimeout)
                    return c = setTimeout,
                    setTimeout(e, 0);
                try {
                    return c(e, 0)
                } catch (t) {
                    try {
                        return c.call(null, e, 0)
                    } catch (t) {
                        return c.call(this, e, 0)
                    }
                }
            }
            function s() {
                g && p && (g = !1,
                p.length ? f = p.concat(f) : m = -1,
                f.length && a())
            }
            function a() {
                if (!g) {
                    var e = o(s);
                    g = !0;
                    for (var t = f.length; t; ) {
                        for (p = f,
                        f = []; ++m < t; )
                            p && p[m].run();
                        m = -1,
                        t = f.length
                    }
                    p = null,
                    g = !1,
                    function(e) {
                        if (h === clearTimeout)
                            return clearTimeout(e);
                        if ((h === i || !h) && clearTimeout)
                            return h = clearTimeout,
                            clearTimeout(e);
                        try {
                            h(e)
                        } catch (t) {
                            try {
                                return h.call(null, e)
                            } catch (t) {
                                return h.call(this, e)
                            }
                        }
                    }(e)
                }
            }
            function l(e, t) {
                this.fun = e,
                this.array = t
            }
            function u() {}
            var c, h, d = t.exports = {};
            !function() {
                try {
                    c = "function" == typeof setTimeout ? setTimeout : r
                } catch (e) {
                    c = r
                }
                try {
                    h = "function" == typeof clearTimeout ? clearTimeout : i
                } catch (e) {
                    h = i
                }
            }();
            var p, f = [], g = !1, m = -1;
            d.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                f.push(new l(e,t)),
                1 !== f.length || g || o(a)
            }
            ,
            l.prototype.run = function() {
                this.fun.apply(null, this.array)
            }
            ,
            d.title = "browser",
            d.browser = !0,
            d.env = {},
            d.argv = [],
            d.version = "",
            d.versions = {},
            d.on = u,
            d.addListener = u,
            d.once = u,
            d.off = u,
            d.removeListener = u,
            d.removeAllListeners = u,
            d.emit = u,
            d.prependListener = u,
            d.prependOnceListener = u,
            d.listeners = function(e) {
                return []
            }
            ,
            d.binding = function(e) {
                throw new Error("process.binding is not supported")
            }
            ,
            d.cwd = function() {
                return "/"
            }
            ,
            d.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }
            ,
            d.umask = function() {
                return 0
            }
        }
        , {}],
        25: [function(e, t, n) {
            (function(e) {
                !function(r) {
                    function i(e) {
                        throw new RangeError(C[e])
                    }
                    function o(e, t) {
                        for (var n = e.length, r = []; n--; )
                            r[n] = t(e[n]);
                        return r
                    }
                    function s(e, t) {
                        var n = e.split("@")
                          , r = "";
                        n.length > 1 && (r = n[0] + "@",
                        e = n[1]);
                        return r + o((e = e.replace(O, ".")).split("."), t).join(".")
                    }
                    function a(e) {
                        for (var t, n, r = [], i = 0, o = e.length; i < o; )
                            (t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o ? 56320 == (64512 & (n = e.charCodeAt(i++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t),
                            i--) : r.push(t);
                        return r
                    }
                    function l(e) {
                        return o(e, function(e) {
                            var t = "";
                            return e > 65535 && (t += k((e -= 65536) >>> 10 & 1023 | 55296),
                            e = 56320 | 1023 & e),
                            t += k(e)
                        }).join("")
                    }
                    function u(e) {
                        return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : _
                    }
                    function c(e, t) {
                        return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
                    }
                    function h(e, t, n) {
                        var r = 0;
                        for (e = n ? D(e / E) : e >> 1,
                        e += D(e / t); e > R * w >> 1; r += _)
                            e = D(e / R);
                        return D(r + (R + 1) * e / (e + T))
                    }
                    function d(e) {
                        var t, n, r, o, s, a, c, d, p, f, g = [], m = e.length, v = 0, y = I, T = S;
                        for ((n = e.lastIndexOf(P)) < 0 && (n = 0),
                        r = 0; r < n; ++r)
                            e.charCodeAt(r) >= 128 && i("not-basic"),
                            g.push(e.charCodeAt(r));
                        for (o = n > 0 ? n + 1 : 0; o < m; ) {
                            for (s = v,
                            a = 1,
                            c = _; o >= m && i("invalid-input"),
                            ((d = u(e.charCodeAt(o++))) >= _ || d > D((b - v) / a)) && i("overflow"),
                            v += d * a,
                            p = c <= T ? x : c >= T + w ? w : c - T,
                            !(d < p); c += _)
                                a > D(b / (f = _ - p)) && i("overflow"),
                                a *= f;
                            T = h(v - s, t = g.length + 1, 0 == s),
                            D(v / t) > b - y && i("overflow"),
                            y += D(v / t),
                            v %= t,
                            g.splice(v++, 0, y)
                        }
                        return l(g)
                    }
                    function p(e) {
                        var t, n, r, o, s, l, u, d, p, f, g, m, v, y, T, E = [];
                        for (m = (e = a(e)).length,
                        t = I,
                        n = 0,
                        s = S,
                        l = 0; l < m; ++l)
                            (g = e[l]) < 128 && E.push(k(g));
                        for (r = o = E.length,
                        o && E.push(P); r < m; ) {
                            for (u = b,
                            l = 0; l < m; ++l)
                                (g = e[l]) >= t && g < u && (u = g);
                            for (u - t > D((b - n) / (v = r + 1)) && i("overflow"),
                            n += (u - t) * v,
                            t = u,
                            l = 0; l < m; ++l)
                                if ((g = e[l]) < t && ++n > b && i("overflow"),
                                g == t) {
                                    for (d = n,
                                    p = _; f = p <= s ? x : p >= s + w ? w : p - s,
                                    !(d < f); p += _)
                                        T = d - f,
                                        y = _ - f,
                                        E.push(k(c(f + T % y, 0))),
                                        d = D(T / y);
                                    E.push(k(c(d, 0))),
                                    s = h(n, v, r == o),
                                    n = 0,
                                    ++r
                                }
                            ++n,
                            ++t
                        }
                        return E.join("")
                    }
                    var f = "object" == typeof n && n && !n.nodeType && n
                      , g = "object" == typeof t && t && !t.nodeType && t
                      , m = "object" == typeof e && e;
                    m.global !== m && m.window !== m && m.self !== m || (r = m);
                    var v, y, b = 2147483647, _ = 36, x = 1, w = 26, T = 38, E = 700, S = 72, I = 128, P = "-", M = /^xn--/, A = /[^\x20-\x7E]/, O = /[\x2E\u3002\uFF0E\uFF61]/g, C = {
                        overflow: "Overflow: input needs wider integers to process",
                        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    }, R = _ - x, D = Math.floor, k = String.fromCharCode;
                    if (v = {
                        version: "1.4.1",
                        ucs2: {
                            decode: a,
                            encode: l
                        },
                        decode: d,
                        encode: p,
                        toASCII: function(e) {
                            return s(e, function(e) {
                                return A.test(e) ? "xn--" + p(e) : e
                            })
                        },
                        toUnicode: function(e) {
                            return s(e, function(e) {
                                return M.test(e) ? d(e.slice(4).toLowerCase()) : e
                            })
                        }
                    },
                    f && g)
                        if (t.exports == f)
                            g.exports = v;
                        else
                            for (y in v)
                                v.hasOwnProperty(y) && (f[y] = v[y]);
                    else
                        r.punycode = v
                }(this)
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {}],
        26: [function(e, t, n) {
            function r(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            t.exports = function(e, t, n, o) {
                t = t || "&",
                n = n || "=";
                var s = {};
                if ("string" != typeof e || 0 === e.length)
                    return s;
                var a = /\+/g;
                e = e.split(t);
                var l = 1e3;
                o && "number" == typeof o.maxKeys && (l = o.maxKeys);
                var u = e.length;
                l > 0 && u > l && (u = l);
                for (var c = 0; c < u; ++c) {
                    var h, d, p, f, g = e[c].replace(a, "%20"), m = g.indexOf(n);
                    m >= 0 ? (h = g.substr(0, m),
                    d = g.substr(m + 1)) : (h = g,
                    d = ""),
                    p = decodeURIComponent(h),
                    f = decodeURIComponent(d),
                    r(s, p) ? i(s[p]) ? s[p].push(f) : s[p] = [s[p], f] : s[p] = f
                }
                return s
            }
            ;
            var i = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
        }
        , {}],
        27: [function(e, t, n) {
            function r(e, t) {
                if (e.map)
                    return e.map(t);
                for (var n = [], r = 0; r < e.length; r++)
                    n.push(t(e[r], r));
                return n
            }
            var i = function(e) {
                switch (typeof e) {
                case "string":
                    return e;
                case "boolean":
                    return e ? "true" : "false";
                case "number":
                    return isFinite(e) ? e : "";
                default:
                    return ""
                }
            };
            t.exports = function(e, t, n, a) {
                return t = t || "&",
                n = n || "=",
                null === e && (e = void 0),
                "object" == typeof e ? r(s(e), function(s) {
                    var a = encodeURIComponent(i(s)) + n;
                    return o(e[s]) ? r(e[s], function(e) {
                        return a + encodeURIComponent(i(e))
                    }).join(t) : a + encodeURIComponent(i(e[s]))
                }).join(t) : a ? encodeURIComponent(i(a)) + n + encodeURIComponent(i(e)) : ""
            }
            ;
            var o = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
              , s = Object.keys || function(e) {
                var t = [];
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
                return t
            }
        }
        , {}],
        28: [function(e, t, n) {
            n.decode = n.parse = e("./decode"),
            n.encode = n.stringify = e("./encode")
        }
        , {
            "./decode": 26,
            "./encode": 27
        }],
        29: [function(e, t, n) {
            function r() {
                this.protocol = null,
                this.slashes = null,
                this.auth = null,
                this.host = null,
                this.port = null,
                this.hostname = null,
                this.hash = null,
                this.search = null,
                this.query = null,
                this.pathname = null,
                this.path = null,
                this.href = null
            }
            function i(e, t, n) {
                if (e && s.isObject(e) && e instanceof r)
                    return e;
                var i = new r;
                return i.parse(e, t, n),
                i
            }
            var o = e("punycode")
              , s = e("./util");
            n.parse = i,
            n.resolve = function(e, t) {
                return i(e, !1, !0).resolve(t)
            }
            ,
            n.resolveObject = function(e, t) {
                return e ? i(e, !1, !0).resolveObject(t) : t
            }
            ,
            n.format = function(e) {
                return s.isString(e) && (e = i(e)),
                e instanceof r ? e.format() : r.prototype.format.call(e)
            }
            ,
            n.Url = r;
            var a = /^([a-z0-9.+-]+:)/i
              , l = /:[0-9]*$/
              , u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
              , c = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"])
              , h = ["'"].concat(c)
              , d = ["%", "/", "?", ";", "#"].concat(h)
              , p = ["/", "?", "#"]
              , f = /^[+a-z0-9A-Z_-]{0,63}$/
              , g = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
              , m = {
                javascript: !0,
                "javascript:": !0
            }
              , v = {
                javascript: !0,
                "javascript:": !0
            }
              , y = {
                http: !0,
                https: !0,
                ftp: !0,
                gopher: !0,
                file: !0,
                "http:": !0,
                "https:": !0,
                "ftp:": !0,
                "gopher:": !0,
                "file:": !0
            }
              , b = e("querystring");
            r.prototype.parse = function(e, t, n) {
                if (!s.isString(e))
                    throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
                var r = e.indexOf("?")
                  , i = -1 !== r && r < e.indexOf("#") ? "?" : "#"
                  , l = e.split(i);
                l[0] = l[0].replace(/\\/g, "/");
                var c = e = l.join(i);
                if (c = c.trim(),
                !n && 1 === e.split("#").length) {
                    var _ = u.exec(c);
                    if (_)
                        return this.path = c,
                        this.href = c,
                        this.pathname = _[1],
                        _[2] ? (this.search = _[2],
                        this.query = t ? b.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "",
                        this.query = {}),
                        this
                }
                var x = a.exec(c);
                if (x) {
                    var w = (x = x[0]).toLowerCase();
                    this.protocol = w,
                    c = c.substr(x.length)
                }
                if (n || x || c.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var T = "//" === c.substr(0, 2);
                    !T || x && v[x] || (c = c.substr(2),
                    this.slashes = !0)
                }
                if (!v[x] && (T || x && !y[x])) {
                    for (var E = -1, S = 0; S < p.length; S++) {
                        -1 !== (M = c.indexOf(p[S])) && (-1 === E || M < E) && (E = M)
                    }
                    var I, P;
                    -1 !== (P = -1 === E ? c.lastIndexOf("@") : c.lastIndexOf("@", E)) && (I = c.slice(0, P),
                    c = c.slice(P + 1),
                    this.auth = decodeURIComponent(I)),
                    E = -1;
                    for (S = 0; S < d.length; S++) {
                        var M;
                        -1 !== (M = c.indexOf(d[S])) && (-1 === E || M < E) && (E = M)
                    }
                    -1 === E && (E = c.length),
                    this.host = c.slice(0, E),
                    c = c.slice(E),
                    this.parseHost(),
                    this.hostname = this.hostname || "";
                    var A = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!A)
                        for (var O = this.hostname.split(/\./), C = (S = 0,
                        O.length); S < C; S++) {
                            var R = O[S];
                            if (R && !R.match(f)) {
                                for (var D = "", k = 0, L = R.length; k < L; k++)
                                    R.charCodeAt(k) > 127 ? D += "x" : D += R[k];
                                if (!D.match(f)) {
                                    var N = O.slice(0, S)
                                      , U = O.slice(S + 1)
                                      , F = R.match(g);
                                    F && (N.push(F[1]),
                                    U.unshift(F[2])),
                                    U.length && (c = "/" + U.join(".") + c),
                                    this.hostname = N.join(".");
                                    break
                                }
                            }
                        }
                    this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
                    A || (this.hostname = o.toASCII(this.hostname));
                    var B = this.port ? ":" + this.port : ""
                      , j = this.hostname || "";
                    this.host = j + B,
                    this.href += this.host,
                    A && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
                    "/" !== c[0] && (c = "/" + c))
                }
                if (!m[w])
                    for (S = 0,
                    C = h.length; S < C; S++) {
                        var G = h[S];
                        if (-1 !== c.indexOf(G)) {
                            var X = encodeURIComponent(G);
                            X === G && (X = escape(G)),
                            c = c.split(G).join(X)
                        }
                    }
                var H = c.indexOf("#");
                -1 !== H && (this.hash = c.substr(H),
                c = c.slice(0, H));
                var Y = c.indexOf("?");
                if (-1 !== Y ? (this.search = c.substr(Y),
                this.query = c.substr(Y + 1),
                t && (this.query = b.parse(this.query)),
                c = c.slice(0, Y)) : t && (this.search = "",
                this.query = {}),
                c && (this.pathname = c),
                y[w] && this.hostname && !this.pathname && (this.pathname = "/"),
                this.pathname || this.search) {
                    B = this.pathname || "";
                    var W = this.search || "";
                    this.path = B + W
                }
                return this.href = this.format(),
                this
            }
            ,
            r.prototype.format = function() {
                var e = this.auth || "";
                e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"),
                e += "@");
                var t = this.protocol || ""
                  , n = this.pathname || ""
                  , r = this.hash || ""
                  , i = !1
                  , o = "";
                this.host ? i = e + this.host : this.hostname && (i = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
                this.port && (i += ":" + this.port)),
                this.query && s.isObject(this.query) && Object.keys(this.query).length && (o = b.stringify(this.query));
                var a = this.search || o && "?" + o || "";
                return t && ":" !== t.substr(-1) && (t += ":"),
                this.slashes || (!t || y[t]) && !1 !== i ? (i = "//" + (i || ""),
                n && "/" !== n.charAt(0) && (n = "/" + n)) : i || (i = ""),
                r && "#" !== r.charAt(0) && (r = "#" + r),
                a && "?" !== a.charAt(0) && (a = "?" + a),
                n = n.replace(/[?#]/g, function(e) {
                    return encodeURIComponent(e)
                }),
                a = a.replace("#", "%23"),
                t + i + n + a + r
            }
            ,
            r.prototype.resolve = function(e) {
                return this.resolveObject(i(e, !1, !0)).format()
            }
            ,
            r.prototype.resolveObject = function(e) {
                if (s.isString(e)) {
                    var t = new r;
                    t.parse(e, !1, !0),
                    e = t
                }
                for (var n = new r, i = Object.keys(this), o = 0; o < i.length; o++) {
                    var a = i[o];
                    n[a] = this[a]
                }
                if (n.hash = e.hash,
                "" === e.href)
                    return n.href = n.format(),
                    n;
                if (e.slashes && !e.protocol) {
                    for (var l = Object.keys(e), u = 0; u < l.length; u++) {
                        var c = l[u];
                        "protocol" !== c && (n[c] = e[c])
                    }
                    return y[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"),
                    n.href = n.format(),
                    n
                }
                if (e.protocol && e.protocol !== n.protocol) {
                    if (!y[e.protocol]) {
                        for (var h = Object.keys(e), d = 0; d < h.length; d++) {
                            var p = h[d];
                            n[p] = e[p]
                        }
                        return n.href = n.format(),
                        n
                    }
                    if (n.protocol = e.protocol,
                    e.host || v[e.protocol])
                        n.pathname = e.pathname;
                    else {
                        for (var f = (e.pathname || "").split("/"); f.length && !(e.host = f.shift()); )
                            ;
                        e.host || (e.host = ""),
                        e.hostname || (e.hostname = ""),
                        "" !== f[0] && f.unshift(""),
                        f.length < 2 && f.unshift(""),
                        n.pathname = f.join("/")
                    }
                    if (n.search = e.search,
                    n.query = e.query,
                    n.host = e.host || "",
                    n.auth = e.auth,
                    n.hostname = e.hostname || e.host,
                    n.port = e.port,
                    n.pathname || n.search) {
                        var g = n.pathname || ""
                          , m = n.search || "";
                        n.path = g + m
                    }
                    return n.slashes = n.slashes || e.slashes,
                    n.href = n.format(),
                    n
                }
                var b = n.pathname && "/" === n.pathname.charAt(0)
                  , _ = e.host || e.pathname && "/" === e.pathname.charAt(0)
                  , x = _ || b || n.host && e.pathname
                  , w = x
                  , T = n.pathname && n.pathname.split("/") || []
                  , E = (f = e.pathname && e.pathname.split("/") || [],
                n.protocol && !y[n.protocol]);
                if (E && (n.hostname = "",
                n.port = null,
                n.host && ("" === T[0] ? T[0] = n.host : T.unshift(n.host)),
                n.host = "",
                e.protocol && (e.hostname = null,
                e.port = null,
                e.host && ("" === f[0] ? f[0] = e.host : f.unshift(e.host)),
                e.host = null),
                x = x && ("" === f[0] || "" === T[0])),
                _)
                    n.host = e.host || "" === e.host ? e.host : n.host,
                    n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname,
                    n.search = e.search,
                    n.query = e.query,
                    T = f;
                else if (f.length)
                    T || (T = []),
                    T.pop(),
                    T = T.concat(f),
                    n.search = e.search,
                    n.query = e.query;
                else if (!s.isNullOrUndefined(e.search)) {
                    if (E) {
                        n.hostname = n.host = T.shift();
                        (O = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = O.shift(),
                        n.host = n.hostname = O.shift())
                    }
                    return n.search = e.search,
                    n.query = e.query,
                    s.isNull(n.pathname) && s.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
                    n.href = n.format(),
                    n
                }
                if (!T.length)
                    return n.pathname = null,
                    n.search ? n.path = "/" + n.search : n.path = null,
                    n.href = n.format(),
                    n;
                for (var S = T.slice(-1)[0], I = (n.host || e.host || T.length > 1) && ("." === S || ".." === S) || "" === S, P = 0, M = T.length; M >= 0; M--)
                    "." === (S = T[M]) ? T.splice(M, 1) : ".." === S ? (T.splice(M, 1),
                    P++) : P && (T.splice(M, 1),
                    P--);
                if (!x && !w)
                    for (; P--; P)
                        T.unshift("..");
                !x || "" === T[0] || T[0] && "/" === T[0].charAt(0) || T.unshift(""),
                I && "/" !== T.join("/").substr(-1) && T.push("");
                var A = "" === T[0] || T[0] && "/" === T[0].charAt(0);
                if (E) {
                    n.hostname = n.host = A ? "" : T.length ? T.shift() : "";
                    var O;
                    (O = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = O.shift(),
                    n.host = n.hostname = O.shift())
                }
                return (x = x || n.host && T.length) && !A && T.unshift(""),
                T.length ? n.pathname = T.join("/") : (n.pathname = null,
                n.path = null),
                s.isNull(n.pathname) && s.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
                n.auth = e.auth || n.auth,
                n.slashes = n.slashes || e.slashes,
                n.href = n.format(),
                n
            }
            ,
            r.prototype.parseHost = function() {
                var e = this.host
                  , t = l.exec(e);
                t && (":" !== (t = t[0]) && (this.port = t.substr(1)),
                e = e.substr(0, e.length - t.length)),
                e && (this.hostname = e)
            }
        }
        , {
            "./util": 30,
            punycode: 25,
            querystring: 28
        }],
        30: [function(e, t, n) {
            t.exports = {
                isString: function(e) {
                    return "string" == typeof e
                },
                isObject: function(e) {
                    return "object" == typeof e && null !== e
                },
                isNull: function(e) {
                    return null === e
                },
                isNullOrUndefined: function(e) {
                    return null == e
                }
            }
        }
        , {}],
        31: [function(e, t, n) {
            t.exports = function(e, t, n) {
                var r, i = e.length;
                if (!(t >= i || 0 === n)) {
                    var o = i - (n = t + n > i ? i - t : n);
                    for (r = t; r < o; ++r)
                        e[r] = e[r + n];
                    e.length = o
                }
            }
        }
        , {}],
        32: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
              , o = r(e("mini-signals"))
              , s = r(e("parse-uri"))
              , a = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("./async"))
              , l = r(e("./Resource"))
              , u = /(#[\w-]+)?$/
              , c = function() {
                function e() {
                    var t = this
                      , n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                      , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.baseUrl = n,
                    this.progress = 0,
                    this.loading = !1,
                    this.defaultQueryString = "",
                    this._beforeMiddleware = [],
                    this._afterMiddleware = [],
                    this._resourcesParsing = [],
                    this._boundLoadResource = function(e, n) {
                        return t._loadResource(e, n)
                    }
                    ,
                    this._queue = a.queue(this._boundLoadResource, r),
                    this._queue.pause(),
                    this.resources = {},
                    this.onProgress = new o.default,
                    this.onError = new o.default,
                    this.onLoad = new o.default,
                    this.onStart = new o.default,
                    this.onComplete = new o.default
                }
                return e.prototype.add = function(e, t, n, r) {
                    if (Array.isArray(e)) {
                        for (var o = 0; o < e.length; ++o)
                            this.add(e[o]);
                        return this
                    }
                    if ("object" === (void 0 === e ? "undefined" : i(e)) && (r = t || e.callback || e.onComplete,
                    n = e,
                    t = e.url,
                    e = e.name || e.key || e.url),
                    "string" != typeof t && (r = n,
                    n = t,
                    t = e),
                    "string" != typeof t)
                        throw new Error("No url passed to add resource to loader.");
                    if ("function" == typeof n && (r = n,
                    n = null),
                    this.loading && (!n || !n.parentResource))
                        throw new Error("Cannot add resources while the loader is running.");
                    if (this.resources[e])
                        throw new Error('Resource named "' + e + '" already exists.');
                    if (t = this._prepareUrl(t),
                    this.resources[e] = new l.default(e,t,n),
                    "function" == typeof r && this.resources[e].onAfterMiddleware.once(r),
                    this.loading) {
                        for (var s = n.parentResource, a = [], u = 0; u < s.children.length; ++u)
                            s.children[u].isComplete || a.push(s.children[u]);
                        var c = s.progressChunk * (a.length + 1) / (a.length + 2);
                        s.children.push(this.resources[e]),
                        s.progressChunk = c;
                        for (var h = 0; h < a.length; ++h)
                            a[h].progressChunk = c;
                        this.resources[e].progressChunk = c
                    }
                    return this._queue.push(this.resources[e]),
                    this
                }
                ,
                e.prototype.pre = function(e) {
                    return this._beforeMiddleware.push(e),
                    this
                }
                ,
                e.prototype.use = function(e) {
                    return this._afterMiddleware.push(e),
                    this
                }
                ,
                e.prototype.reset = function() {
                    this.progress = 0,
                    this.loading = !1,
                    this._queue.kill(),
                    this._queue.pause();
                    for (var e in this.resources) {
                        var t = this.resources[e];
                        t._onLoadBinding && t._onLoadBinding.detach(),
                        t.isLoading && t.abort()
                    }
                    return this.resources = {},
                    this
                }
                ,
                e.prototype.load = function(e) {
                    if ("function" == typeof e && this.onComplete.once(e),
                    this.loading)
                        return this;
                    for (var t = 100 / this._queue._tasks.length, n = 0; n < this._queue._tasks.length; ++n)
                        this._queue._tasks[n].data.progressChunk = t;
                    return this.loading = !0,
                    this.onStart.dispatch(this),
                    this._queue.resume(),
                    this
                }
                ,
                e.prototype._prepareUrl = function(e) {
                    var t = (0,
                    s.default)(e, {
                        strictMode: !0
                    })
                      , n = void 0;
                    if (n = t.protocol || !t.path || 0 === e.indexOf("//") ? e : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== e.charAt(0) ? this.baseUrl + "/" + e : this.baseUrl + e,
                    this.defaultQueryString) {
                        var r = u.exec(n)[0];
                        -1 !== (n = n.substr(0, n.length - r.length)).indexOf("?") ? n += "&" + this.defaultQueryString : n += "?" + this.defaultQueryString,
                        n += r
                    }
                    return n
                }
                ,
                e.prototype._loadResource = function(e, t) {
                    var n = this;
                    e._dequeue = t,
                    a.eachSeries(this._beforeMiddleware, function(t, r) {
                        t.call(n, e, function() {
                            r(e.isComplete ? {} : null)
                        })
                    }, function() {
                        e.isComplete ? n._onLoad(e) : (e._onLoadBinding = e.onComplete.once(n._onLoad, n),
                        e.load())
                    }, !0)
                }
                ,
                e.prototype._onComplete = function() {
                    this.loading = !1,
                    this.onComplete.dispatch(this, this.resources)
                }
                ,
                e.prototype._onLoad = function(e) {
                    var t = this;
                    e._onLoadBinding = null,
                    this._resourcesParsing.push(e),
                    e._dequeue(),
                    a.eachSeries(this._afterMiddleware, function(n, r) {
                        n.call(t, e, r)
                    }, function() {
                        e.onAfterMiddleware.dispatch(e),
                        t.progress += e.progressChunk,
                        t.onProgress.dispatch(t, e),
                        e.error ? t.onError.dispatch(e.error, t, e) : t.onLoad.dispatch(t, e),
                        t._resourcesParsing.splice(t._resourcesParsing.indexOf(e), 1),
                        t._queue.idle() && 0 === t._resourcesParsing.length && (t.progress = 100,
                        t._onComplete())
                    }, !0)
                }
                ,
                e
            }();
            n.default = c
        }
        , {
            "./Resource": 33,
            "./async": 34,
            "mini-signals": 38,
            "parse-uri": 39
        }],
        33: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function i() {}
            function o(e, t, n) {
                t && 0 === t.indexOf(".") && (t = t.substring(1)),
                t && (e[t] = n)
            }
            function s(e) {
                return e.toString().replace("object ", "")
            }
            n.__esModule = !0;
            var a = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , l = r(e("parse-uri"))
              , u = r(e("mini-signals"))
              , c = !(!window.XDomainRequest || "withCredentials"in new XMLHttpRequest)
              , h = null
              , d = function() {
                function e(t, n, r) {
                    if (function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    "string" != typeof t || "string" != typeof n)
                        throw new Error("Both name and url are required for constructing a resource.");
                    r = r || {},
                    this._flags = 0,
                    this._setFlag(e.STATUS_FLAGS.DATA_URL, 0 === n.indexOf("data:")),
                    this.name = t,
                    this.url = n,
                    this.extension = this._getExtension(),
                    this.data = null,
                    this.crossOrigin = !0 === r.crossOrigin ? "anonymous" : r.crossOrigin,
                    this.loadType = r.loadType || this._determineLoadType(),
                    this.xhrType = r.xhrType,
                    this.metadata = r.metadata || {},
                    this.error = null,
                    this.xhr = null,
                    this.children = [],
                    this.type = e.TYPE.UNKNOWN,
                    this.progressChunk = 0,
                    this._dequeue = i,
                    this._onLoadBinding = null,
                    this._boundComplete = this.complete.bind(this),
                    this._boundOnError = this._onError.bind(this),
                    this._boundOnProgress = this._onProgress.bind(this),
                    this._boundXhrOnError = this._xhrOnError.bind(this),
                    this._boundXhrOnAbort = this._xhrOnAbort.bind(this),
                    this._boundXhrOnLoad = this._xhrOnLoad.bind(this),
                    this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this),
                    this.onStart = new u.default,
                    this.onProgress = new u.default,
                    this.onComplete = new u.default,
                    this.onAfterMiddleware = new u.default
                }
                return e.setExtensionLoadType = function(t, n) {
                    o(e._loadTypeMap, t, n)
                }
                ,
                e.setExtensionXhrType = function(t, n) {
                    o(e._xhrTypeMap, t, n)
                }
                ,
                e.prototype.complete = function() {
                    if (this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1),
                    this.data.removeEventListener("load", this._boundComplete, !1),
                    this.data.removeEventListener("progress", this._boundOnProgress, !1),
                    this.data.removeEventListener("canplaythrough", this._boundComplete, !1)),
                    this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1),
                    this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1),
                    this.xhr.removeEventListener("progress", this._boundOnProgress, !1),
                    this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null,
                    this.xhr.ontimeout = null,
                    this.xhr.onprogress = null,
                    this.xhr.onload = null)),
                    this.isComplete)
                        throw new Error("Complete called again for an already completed resource.");
                    this._setFlag(e.STATUS_FLAGS.COMPLETE, !0),
                    this._setFlag(e.STATUS_FLAGS.LOADING, !1),
                    this.onComplete.dispatch(this)
                }
                ,
                e.prototype.abort = function(t) {
                    if (!this.error) {
                        if (this.error = new Error(t),
                        this.xhr)
                            this.xhr.abort();
                        else if (this.xdr)
                            this.xdr.abort();
                        else if (this.data)
                            if (this.data.src)
                                this.data.src = e.EMPTY_GIF;
                            else
                                for (; this.data.firstChild; )
                                    this.data.removeChild(this.data.firstChild);
                        this.complete()
                    }
                }
                ,
                e.prototype.load = function(t) {
                    var n = this;
                    if (!this.isLoading)
                        if (this.isComplete)
                            t && setTimeout(function() {
                                return t(n)
                            }, 1);
                        else
                            switch (t && this.onComplete.once(t),
                            this._setFlag(e.STATUS_FLAGS.LOADING, !0),
                            this.onStart.dispatch(this),
                            !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)),
                            this.loadType) {
                            case e.LOAD_TYPE.IMAGE:
                                this.type = e.TYPE.IMAGE,
                                this._loadElement("image");
                                break;
                            case e.LOAD_TYPE.AUDIO:
                                this.type = e.TYPE.AUDIO,
                                this._loadSourceElement("audio");
                                break;
                            case e.LOAD_TYPE.VIDEO:
                                this.type = e.TYPE.VIDEO,
                                this._loadSourceElement("video");
                                break;
                            case e.LOAD_TYPE.XHR:
                            default:
                                c && this.crossOrigin ? this._loadXdr() : this._loadXhr()
                            }
                }
                ,
                e.prototype._hasFlag = function(e) {
                    return !!(this._flags & e)
                }
                ,
                e.prototype._setFlag = function(e, t) {
                    this._flags = t ? this._flags | e : this._flags & ~e
                }
                ,
                e.prototype._loadElement = function(e) {
                    this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === e && void 0 !== window.Image ? this.data = new Image : this.data = document.createElement(e),
                    this.crossOrigin && (this.data.crossOrigin = this.crossOrigin),
                    this.metadata.skipSource || (this.data.src = this.url),
                    this.data.addEventListener("error", this._boundOnError, !1),
                    this.data.addEventListener("load", this._boundComplete, !1),
                    this.data.addEventListener("progress", this._boundOnProgress, !1)
                }
                ,
                e.prototype._loadSourceElement = function(e) {
                    if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === e && void 0 !== window.Audio ? this.data = new Audio : this.data = document.createElement(e),
                    null !== this.data) {
                        if (!this.metadata.skipSource)
                            if (navigator.isCocoonJS)
                                this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
                            else if (Array.isArray(this.url))
                                for (var t = this.metadata.mimeType, n = 0; n < this.url.length; ++n)
                                    this.data.appendChild(this._createSource(e, this.url[n], Array.isArray(t) ? t[n] : t));
                            else {
                                var r = this.metadata.mimeType;
                                this.data.appendChild(this._createSource(e, this.url, Array.isArray(r) ? r[0] : r))
                            }
                        this.data.addEventListener("error", this._boundOnError, !1),
                        this.data.addEventListener("load", this._boundComplete, !1),
                        this.data.addEventListener("progress", this._boundOnProgress, !1),
                        this.data.addEventListener("canplaythrough", this._boundComplete, !1),
                        this.data.load()
                    } else
                        this.abort("Unsupported element: " + e)
                }
                ,
                e.prototype._loadXhr = function() {
                    "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                    var t = this.xhr = new XMLHttpRequest;
                    t.open("GET", this.url, !0),
                    this.xhrType === e.XHR_RESPONSE_TYPE.JSON || this.xhrType === e.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = e.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType,
                    t.addEventListener("error", this._boundXhrOnError, !1),
                    t.addEventListener("abort", this._boundXhrOnAbort, !1),
                    t.addEventListener("progress", this._boundOnProgress, !1),
                    t.addEventListener("load", this._boundXhrOnLoad, !1),
                    t.send()
                }
                ,
                e.prototype._loadXdr = function() {
                    "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                    var e = this.xhr = new XDomainRequest;
                    e.timeout = 5e3,
                    e.onerror = this._boundXhrOnError,
                    e.ontimeout = this._boundXdrOnTimeout,
                    e.onprogress = this._boundOnProgress,
                    e.onload = this._boundXhrOnLoad,
                    e.open("GET", this.url, !0),
                    setTimeout(function() {
                        return e.send()
                    }, 1)
                }
                ,
                e.prototype._createSource = function(e, t, n) {
                    n || (n = e + "/" + this._getExtension(t));
                    var r = document.createElement("source");
                    return r.src = t,
                    r.type = n,
                    r
                }
                ,
                e.prototype._onError = function(e) {
                    this.abort("Failed to load element using: " + e.target.nodeName)
                }
                ,
                e.prototype._onProgress = function(e) {
                    e && e.lengthComputable && this.onProgress.dispatch(this, e.loaded / e.total)
                }
                ,
                e.prototype._xhrOnError = function() {
                    var e = this.xhr;
                    this.abort(s(e) + " Request failed. Status: " + e.status + ', text: "' + e.statusText + '"')
                }
                ,
                e.prototype._xhrOnAbort = function() {
                    this.abort(s(this.xhr) + " Request was aborted by the user.")
                }
                ,
                e.prototype._xdrOnTimeout = function() {
                    this.abort(s(this.xhr) + " Request timed out.")
                }
                ,
                e.prototype._xhrOnLoad = function() {
                    var t = this.xhr
                      , n = ""
                      , r = void 0 === t.status ? 200 : t.status;
                    "" !== t.responseType && "text" !== t.responseType && void 0 !== t.responseType || (n = t.responseText),
                    0 === r && n.length > 0 ? r = 200 : 1223 === r && (r = 204);
                    if (2 === (r / 100 | 0)) {
                        if (this.xhrType === e.XHR_RESPONSE_TYPE.TEXT)
                            this.data = n,
                            this.type = e.TYPE.TEXT;
                        else if (this.xhrType === e.XHR_RESPONSE_TYPE.JSON)
                            try {
                                this.data = JSON.parse(n),
                                this.type = e.TYPE.JSON
                            } catch (e) {
                                return void this.abort("Error trying to parse loaded json: " + e)
                            }
                        else if (this.xhrType === e.XHR_RESPONSE_TYPE.DOCUMENT)
                            try {
                                if (window.DOMParser) {
                                    var i = new DOMParser;
                                    this.data = i.parseFromString(n, "text/xml")
                                } else {
                                    var o = document.createElement("div");
                                    o.innerHTML = n,
                                    this.data = o
                                }
                                this.type = e.TYPE.XML
                            } catch (e) {
                                return void this.abort("Error trying to parse loaded xml: " + e)
                            }
                        else
                            this.data = t.response || n;
                        this.complete()
                    } else
                        this.abort("[" + t.status + "] " + t.statusText + ": " + t.responseURL)
                }
                ,
                e.prototype._determineCrossOrigin = function(e, t) {
                    if (0 === e.indexOf("data:"))
                        return "";
                    t = t || window.location,
                    h || (h = document.createElement("a")),
                    h.href = e;
                    var n = !(e = (0,
                    l.default)(h.href, {
                        strictMode: !0
                    })).port && "" === t.port || e.port === t.port
                      , r = e.protocol ? e.protocol + ":" : "";
                    return e.host === t.hostname && n && r === t.protocol ? "" : "anonymous"
                }
                ,
                e.prototype._determineXhrType = function() {
                    return e._xhrTypeMap[this.extension] || e.XHR_RESPONSE_TYPE.TEXT
                }
                ,
                e.prototype._determineLoadType = function() {
                    return e._loadTypeMap[this.extension] || e.LOAD_TYPE.XHR
                }
                ,
                e.prototype._getExtension = function() {
                    var e = this.url
                      , t = "";
                    if (this.isDataUrl) {
                        var n = e.indexOf("/");
                        t = e.substring(n + 1, e.indexOf(";", n))
                    } else {
                        var r = e.indexOf("?")
                          , i = e.indexOf("#")
                          , o = Math.min(r > -1 ? r : e.length, i > -1 ? i : e.length);
                        t = (e = e.substring(0, o)).substring(e.lastIndexOf(".") + 1)
                    }
                    return t.toLowerCase()
                }
                ,
                e.prototype._getMimeFromXhrType = function(t) {
                    switch (t) {
                    case e.XHR_RESPONSE_TYPE.BUFFER:
                        return "application/octet-binary";
                    case e.XHR_RESPONSE_TYPE.BLOB:
                        return "application/blob";
                    case e.XHR_RESPONSE_TYPE.DOCUMENT:
                        return "application/xml";
                    case e.XHR_RESPONSE_TYPE.JSON:
                        return "application/json";
                    case e.XHR_RESPONSE_TYPE.DEFAULT:
                    case e.XHR_RESPONSE_TYPE.TEXT:
                    default:
                        return "text/plain"
                    }
                }
                ,
                a(e, [{
                    key: "isDataUrl",
                    get: function() {
                        return this._hasFlag(e.STATUS_FLAGS.DATA_URL)
                    }
                }, {
                    key: "isComplete",
                    get: function() {
                        return this._hasFlag(e.STATUS_FLAGS.COMPLETE)
                    }
                }, {
                    key: "isLoading",
                    get: function() {
                        return this._hasFlag(e.STATUS_FLAGS.LOADING)
                    }
                }]),
                e
            }();
            n.default = d,
            d.STATUS_FLAGS = {
                NONE: 0,
                DATA_URL: 1,
                COMPLETE: 2,
                LOADING: 4
            },
            d.TYPE = {
                UNKNOWN: 0,
                JSON: 1,
                XML: 2,
                IMAGE: 3,
                AUDIO: 4,
                VIDEO: 5,
                TEXT: 6
            },
            d.LOAD_TYPE = {
                XHR: 1,
                IMAGE: 2,
                AUDIO: 3,
                VIDEO: 4
            },
            d.XHR_RESPONSE_TYPE = {
                DEFAULT: "text",
                BUFFER: "arraybuffer",
                BLOB: "blob",
                DOCUMENT: "document",
                JSON: "json",
                TEXT: "text"
            },
            d._loadTypeMap = {
                gif: d.LOAD_TYPE.IMAGE,
                png: d.LOAD_TYPE.IMAGE,
                bmp: d.LOAD_TYPE.IMAGE,
                jpg: d.LOAD_TYPE.IMAGE,
                jpeg: d.LOAD_TYPE.IMAGE,
                tif: d.LOAD_TYPE.IMAGE,
                tiff: d.LOAD_TYPE.IMAGE,
                webp: d.LOAD_TYPE.IMAGE,
                tga: d.LOAD_TYPE.IMAGE,
                svg: d.LOAD_TYPE.IMAGE,
                "svg+xml": d.LOAD_TYPE.IMAGE,
                mp3: d.LOAD_TYPE.AUDIO,
                ogg: d.LOAD_TYPE.AUDIO,
                wav: d.LOAD_TYPE.AUDIO,
                mp4: d.LOAD_TYPE.VIDEO,
                webm: d.LOAD_TYPE.VIDEO
            },
            d._xhrTypeMap = {
                xhtml: d.XHR_RESPONSE_TYPE.DOCUMENT,
                html: d.XHR_RESPONSE_TYPE.DOCUMENT,
                htm: d.XHR_RESPONSE_TYPE.DOCUMENT,
                xml: d.XHR_RESPONSE_TYPE.DOCUMENT,
                tmx: d.XHR_RESPONSE_TYPE.DOCUMENT,
                svg: d.XHR_RESPONSE_TYPE.DOCUMENT,
                tsx: d.XHR_RESPONSE_TYPE.DOCUMENT,
                gif: d.XHR_RESPONSE_TYPE.BLOB,
                png: d.XHR_RESPONSE_TYPE.BLOB,
                bmp: d.XHR_RESPONSE_TYPE.BLOB,
                jpg: d.XHR_RESPONSE_TYPE.BLOB,
                jpeg: d.XHR_RESPONSE_TYPE.BLOB,
                tif: d.XHR_RESPONSE_TYPE.BLOB,
                tiff: d.XHR_RESPONSE_TYPE.BLOB,
                webp: d.XHR_RESPONSE_TYPE.BLOB,
                tga: d.XHR_RESPONSE_TYPE.BLOB,
                json: d.XHR_RESPONSE_TYPE.JSON,
                text: d.XHR_RESPONSE_TYPE.TEXT,
                txt: d.XHR_RESPONSE_TYPE.TEXT,
                ttf: d.XHR_RESPONSE_TYPE.BUFFER,
                otf: d.XHR_RESPONSE_TYPE.BUFFER
            },
            d.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        }
        , {
            "mini-signals": 38,
            "parse-uri": 39
        }],
        34: [function(e, t, n) {
            function r() {}
            function i(e) {
                return function() {
                    if (null === e)
                        throw new Error("Callback was already called.");
                    var t = e;
                    e = null,
                    t.apply(this, arguments)
                }
            }
            n.__esModule = !0,
            n.eachSeries = function(e, t, n, r) {
                var i = 0
                  , o = e.length;
                !function s(a) {
                    a || i === o ? n && n(a) : r ? setTimeout(function() {
                        t(e[i++], s)
                    }, 1) : t(e[i++], s)
                }()
            }
            ,
            n.queue = function(e, t) {
                function n(e, t, n) {
                    if (null != n && "function" != typeof n)
                        throw new Error("task callback must be a function");
                    if (s.started = !0,
                    null == e && s.idle())
                        setTimeout(function() {
                            return s.drain()
                        }, 1);
                    else {
                        var i = {
                            data: e,
                            callback: "function" == typeof n ? n : r
                        };
                        t ? s._tasks.unshift(i) : s._tasks.push(i),
                        setTimeout(function() {
                            return s.process()
                        }, 1)
                    }
                }
                if (null == t)
                    t = 1;
                else if (0 === t)
                    throw new Error("Concurrency must not be zero");
                var o = 0
                  , s = {
                    _tasks: [],
                    concurrency: t,
                    saturated: r,
                    unsaturated: r,
                    buffer: t / 4,
                    empty: r,
                    drain: r,
                    error: r,
                    started: !1,
                    paused: !1,
                    push: function(e, t) {
                        n(e, !1, t)
                    },
                    kill: function() {
                        o = 0,
                        s.drain = r,
                        s.started = !1,
                        s._tasks = []
                    },
                    unshift: function(e, t) {
                        n(e, !0, t)
                    },
                    process: function() {
                        for (; !s.paused && o < s.concurrency && s._tasks.length; ) {
                            var t = s._tasks.shift();
                            0 === s._tasks.length && s.empty(),
                            (o += 1) === s.concurrency && s.saturated(),
                            e(t.data, i(function(e) {
                                return function() {
                                    o -= 1,
                                    e.callback.apply(e, arguments),
                                    null != arguments[0] && s.error(arguments[0], e.data),
                                    o <= s.concurrency - s.buffer && s.unsaturated(),
                                    s.idle() && s.drain(),
                                    s.process()
                                }
                            }(t)))
                        }
                    },
                    length: function() {
                        return s._tasks.length
                    },
                    running: function() {
                        return o
                    },
                    idle: function() {
                        return s._tasks.length + o === 0
                    },
                    pause: function() {
                        !0 !== s.paused && (s.paused = !0)
                    },
                    resume: function() {
                        if (!1 !== s.paused) {
                            s.paused = !1;
                            for (var e = 1; e <= s.concurrency; e++)
                                s.process()
                        }
                    }
                };
                return s
            }
        }
        , {}],
        35: [function(e, t, n) {
            n.__esModule = !0,
            n.encodeBinary = function(e) {
                for (var t = "", n = 0; n < e.length; ) {
                    for (var i = [0, 0, 0], o = [0, 0, 0, 0], s = 0; s < i.length; ++s)
                        n < e.length ? i[s] = 255 & e.charCodeAt(n++) : i[s] = 0;
                    switch (o[0] = i[0] >> 2,
                    o[1] = (3 & i[0]) << 4 | i[1] >> 4,
                    o[2] = (15 & i[1]) << 2 | i[2] >> 6,
                    o[3] = 63 & i[2],
                    n - (e.length - 1)) {
                    case 2:
                        o[3] = 64,
                        o[2] = 64;
                        break;
                    case 1:
                        o[3] = 64
                    }
                    for (var a = 0; a < o.length; ++a)
                        t += r.charAt(o[a])
                }
                return t
            }
            ;
            var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
        , {}],
        36: [function(e, t, n) {
            var r = e("./Loader").default
              , i = e("./Resource").default
              , o = e("./async")
              , s = e("./b64");
            r.Resource = i,
            r.async = o,
            r.base64 = s,
            t.exports = r,
            t.exports.default = r
        }
        , {
            "./Loader": 32,
            "./Resource": 33,
            "./async": 34,
            "./b64": 35
        }],
        37: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ;
            n.blobMiddlewareFactory = function() {
                return function(e, t) {
                    if (e.data) {
                        if (e.xhr && e.xhrType === o.default.XHR_RESPONSE_TYPE.BLOB)
                            if (window.Blob && "string" != typeof e.data) {
                                if (0 === e.data.type.indexOf("image")) {
                                    var n = function() {
                                        var n = a.createObjectURL(e.data);
                                        return e.blob = e.data,
                                        e.data = new Image,
                                        e.data.src = n,
                                        e.type = o.default.TYPE.IMAGE,
                                        e.data.onload = function() {
                                            a.revokeObjectURL(n),
                                            e.data.onload = null,
                                            t()
                                        }
                                        ,
                                        {
                                            v: void 0
                                        }
                                    }();
                                    if ("object" === (void 0 === n ? "undefined" : i(n)))
                                        return n.v
                                }
                            } else {
                                var r = e.xhr.getResponseHeader("content-type");
                                if (r && 0 === r.indexOf("image"))
                                    return e.data = new Image,
                                    e.data.src = "data:" + r + ";base64," + s.default.encodeBinary(e.xhr.responseText),
                                    e.type = o.default.TYPE.IMAGE,
                                    void (e.data.onload = function() {
                                        e.data.onload = null,
                                        t()
                                    }
                                    )
                            }
                        t()
                    } else
                        t()
                }
            }
            ;
            var o = r(e("../../Resource"))
              , s = r(e("../../b64"))
              , a = window.URL || window.webkitURL
        }
        , {
            "../../Resource": 33,
            "../../b64": 35
        }],
        38: [function(e, t, n) {
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function i(e, t) {
                return e._head ? (e._tail._next = t,
                t._prev = e._tail,
                e._tail = t) : (e._head = t,
                e._tail = t),
                t._owner = e,
                t
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , s = function() {
                function e(t, n, i) {
                    void 0 === n && (n = !1),
                    r(this, e),
                    this._fn = t,
                    this._once = n,
                    this._thisArg = i,
                    this._next = this._prev = this._owner = null
                }
                return o(e, [{
                    key: "detach",
                    value: function() {
                        return null !== this._owner && (this._owner.detach(this),
                        !0)
                    }
                }]),
                e
            }()
              , a = function() {
                function e() {
                    r(this, e),
                    this._head = this._tail = void 0
                }
                return o(e, [{
                    key: "handlers",
                    value: function() {
                        var e = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0]
                          , t = this._head;
                        if (e)
                            return !!t;
                        for (var n = []; t; )
                            n.push(t),
                            t = t._next;
                        return n
                    }
                }, {
                    key: "has",
                    value: function(e) {
                        if (!(e instanceof s))
                            throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");
                        return e._owner === this
                    }
                }, {
                    key: "dispatch",
                    value: function() {
                        var e = this._head;
                        if (!e)
                            return !1;
                        for (; e; )
                            e._once && this.detach(e),
                            e._fn.apply(e._thisArg, arguments),
                            e = e._next;
                        return !0
                    }
                }, {
                    key: "add",
                    value: function(e) {
                        var t = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                        if ("function" != typeof e)
                            throw new Error("MiniSignal#add(): First arg must be a Function.");
                        return i(this, new s(e,!1,t))
                    }
                }, {
                    key: "once",
                    value: function(e) {
                        var t = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                        if ("function" != typeof e)
                            throw new Error("MiniSignal#once(): First arg must be a Function.");
                        return i(this, new s(e,!0,t))
                    }
                }, {
                    key: "detach",
                    value: function(e) {
                        if (!(e instanceof s))
                            throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");
                        return e._owner !== this ? this : (e._prev && (e._prev._next = e._next),
                        e._next && (e._next._prev = e._prev),
                        e === this._head ? (this._head = e._next,
                        null === e._next && (this._tail = null)) : e === this._tail && (this._tail = e._prev,
                        this._tail._next = null),
                        e._owner = null,
                        this)
                    }
                }, {
                    key: "detachAll",
                    value: function() {
                        var e = this._head;
                        if (!e)
                            return this;
                        for (this._head = this._tail = null; e; )
                            e._owner = null,
                            e = e._next;
                        return this
                    }
                }]),
                e
            }();
            a.MiniSignalBinding = s,
            n.default = a,
            t.exports = n.default
        }
        , {}],
        39: [function(e, t, n) {
            t.exports = function(e, t) {
                t = t || {};
                for (var n = {
                    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                    q: {
                        name: "queryKey",
                        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                    },
                    parser: {
                        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                    }
                }, r = n.parser[t.strictMode ? "strict" : "loose"].exec(e), i = {}, o = 14; o--; )
                    i[n.key[o]] = r[o] || "";
                return i[n.q.name] = {},
                i[n.key[12]].replace(n.q.parser, function(e, t, r) {
                    t && (i[n.q.name][t] = r)
                }),
                i
            }
        }
        , {}],
        40: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , o = r(e("ismobilejs"))
              , s = r(e("./accessibleTarget"));
            i.utils.mixins.delayMixin(i.DisplayObject.prototype, s.default);
            var a = 100
              , l = 0
              , u = 0
              , c = 2
              , h = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    !o.default.tablet && !o.default.phone || navigator.isCocoonJS || this.createTouchHook();
                    var n = document.createElement("div");
                    n.style.width = a + "px",
                    n.style.height = a + "px",
                    n.style.position = "absolute",
                    n.style.top = l + "px",
                    n.style.left = u + "px",
                    n.style.zIndex = c,
                    this.div = n,
                    this.pool = [],
                    this.renderId = 0,
                    this.debug = !1,
                    this.renderer = t,
                    this.children = [],
                    this._onKeyDown = this._onKeyDown.bind(this),
                    this._onMouseMove = this._onMouseMove.bind(this),
                    this.isActive = !1,
                    this.isMobileAccessabillity = !1,
                    window.addEventListener("keydown", this._onKeyDown, !1)
                }
                return e.prototype.createTouchHook = function() {
                    var e = this
                      , t = document.createElement("button");
                    t.style.width = "1px",
                    t.style.height = "1px",
                    t.style.position = "absolute",
                    t.style.top = "-1000px",
                    t.style.left = "-1000px",
                    t.style.zIndex = 2,
                    t.style.backgroundColor = "#FF0000",
                    t.title = "HOOK DIV",
                    t.addEventListener("focus", function() {
                        e.isMobileAccessabillity = !0,
                        e.activate(),
                        document.body.removeChild(t)
                    }),
                    document.body.appendChild(t)
                }
                ,
                e.prototype.activate = function() {
                    this.isActive || (this.isActive = !0,
                    window.document.addEventListener("mousemove", this._onMouseMove, !0),
                    window.removeEventListener("keydown", this._onKeyDown, !1),
                    this.renderer.on("postrender", this.update, this),
                    this.renderer.view.parentNode && this.renderer.view.parentNode.appendChild(this.div))
                }
                ,
                e.prototype.deactivate = function() {
                    this.isActive && !this.isMobileAccessabillity && (this.isActive = !1,
                    window.document.removeEventListener("mousemove", this._onMouseMove),
                    window.addEventListener("keydown", this._onKeyDown, !1),
                    this.renderer.off("postrender", this.update),
                    this.div.parentNode && this.div.parentNode.removeChild(this.div))
                }
                ,
                e.prototype.updateAccessibleObjects = function(e) {
                    if (e.visible) {
                        e.accessible && e.interactive && (e._accessibleActive || this.addChild(e),
                        e.renderId = this.renderId);
                        for (var t = e.children, n = t.length - 1; n >= 0; n--)
                            this.updateAccessibleObjects(t[n])
                    }
                }
                ,
                e.prototype.update = function() {
                    if (this.renderer.renderingToScreen) {
                        this.updateAccessibleObjects(this.renderer._lastObjectRendered);
                        var e = this.renderer.view.getBoundingClientRect()
                          , t = e.width / this.renderer.width
                          , n = e.height / this.renderer.height
                          , r = this.div;
                        r.style.left = e.left + "px",
                        r.style.top = e.top + "px",
                        r.style.width = this.renderer.width + "px",
                        r.style.height = this.renderer.height + "px";
                        for (var o = 0; o < this.children.length; o++) {
                            var s = this.children[o];
                            if (s.renderId !== this.renderId)
                                s._accessibleActive = !1,
                                i.utils.removeItems(this.children, o, 1),
                                this.div.removeChild(s._accessibleDiv),
                                this.pool.push(s._accessibleDiv),
                                s._accessibleDiv = null,
                                o--,
                                0 === this.children.length && this.deactivate();
                            else {
                                r = s._accessibleDiv;
                                var a = s.hitArea
                                  , l = s.worldTransform;
                                s.hitArea ? (r.style.left = (l.tx + a.x * l.a) * t + "px",
                                r.style.top = (l.ty + a.y * l.d) * n + "px",
                                r.style.width = a.width * l.a * t + "px",
                                r.style.height = a.height * l.d * n + "px") : (a = s.getBounds(),
                                this.capHitArea(a),
                                r.style.left = a.x * t + "px",
                                r.style.top = a.y * n + "px",
                                r.style.width = a.width * t + "px",
                                r.style.height = a.height * n + "px")
                            }
                        }
                        this.renderId++
                    }
                }
                ,
                e.prototype.capHitArea = function(e) {
                    e.x < 0 && (e.width += e.x,
                    e.x = 0),
                    e.y < 0 && (e.height += e.y,
                    e.y = 0),
                    e.x + e.width > this.renderer.width && (e.width = this.renderer.width - e.x),
                    e.y + e.height > this.renderer.height && (e.height = this.renderer.height - e.y)
                }
                ,
                e.prototype.addChild = function(e) {
                    var t = this.pool.pop();
                    t || ((t = document.createElement("button")).style.width = a + "px",
                    t.style.height = a + "px",
                    t.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent",
                    t.style.position = "absolute",
                    t.style.zIndex = c,
                    t.style.borderStyle = "none",
                    t.addEventListener("click", this._onClick.bind(this)),
                    t.addEventListener("focus", this._onFocus.bind(this)),
                    t.addEventListener("focusout", this._onFocusOut.bind(this))),
                    e.accessibleTitle ? t.title = e.accessibleTitle : e.accessibleTitle || e.accessibleHint || (t.title = "displayObject " + this.tabIndex),
                    e.accessibleHint && t.setAttribute("aria-label", e.accessibleHint),
                    e._accessibleActive = !0,
                    e._accessibleDiv = t,
                    t.displayObject = e,
                    this.children.push(e),
                    this.div.appendChild(e._accessibleDiv),
                    e._accessibleDiv.tabIndex = e.tabIndex
                }
                ,
                e.prototype._onClick = function(e) {
                    var t = this.renderer.plugins.interaction;
                    t.dispatchEvent(e.target.displayObject, "click", t.eventData)
                }
                ,
                e.prototype._onFocus = function(e) {
                    var t = this.renderer.plugins.interaction;
                    t.dispatchEvent(e.target.displayObject, "mouseover", t.eventData)
                }
                ,
                e.prototype._onFocusOut = function(e) {
                    var t = this.renderer.plugins.interaction;
                    t.dispatchEvent(e.target.displayObject, "mouseout", t.eventData)
                }
                ,
                e.prototype._onKeyDown = function(e) {
                    9 === e.keyCode && this.activate()
                }
                ,
                e.prototype._onMouseMove = function() {
                    this.deactivate()
                }
                ,
                e.prototype.destroy = function() {
                    this.div = null;
                    for (var e = 0; e < this.children.length; e++)
                        this.children[e].div = null;
                    window.document.removeEventListener("mousemove", this._onMouseMove),
                    window.removeEventListener("keydown", this._onKeyDown),
                    this.pool = null,
                    this.children = null,
                    this.renderer = null
                }
                ,
                e
            }();
            n.default = h,
            i.WebGLRenderer.registerPlugin("accessibility", h),
            i.CanvasRenderer.registerPlugin("accessibility", h)
        }
        , {
            "../core": 65,
            "./accessibleTarget": 41,
            ismobilejs: 4
        }],
        41: [function(e, t, n) {
            n.__esModule = !0,
            n.default = {
                accessible: !1,
                accessibleTitle: null,
                accessibleHint: null,
                tabIndex: 0,
                _accessibleActive: !1,
                _accessibleDiv: !1
            }
        }
        , {}],
        42: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("./accessibleTarget");
            Object.defineProperty(n, "accessibleTarget", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./AccessibilityManager");
            Object.defineProperty(n, "AccessibilityManager", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            })
        }
        , {
            "./AccessibilityManager": 40,
            "./accessibleTarget": 41
        }],
        43: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = e("./autoDetectRenderer")
              , s = r(e("./display/Container"))
              , a = e("./ticker")
              , l = r(e("./settings"))
              , u = e("./const")
              , c = function() {
                function e(t, n, r, i, u) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    "number" == typeof t && (t = Object.assign({
                        width: t,
                        height: n || l.default.RENDER_OPTIONS.height,
                        forceCanvas: !!i,
                        sharedTicker: !!u
                    }, r)),
                    this._options = t = Object.assign({
                        autoStart: !0,
                        sharedTicker: !1,
                        forceCanvas: !1,
                        sharedLoader: !1
                    }, t),
                    this.renderer = (0,
                    o.autoDetectRenderer)(t),
                    this.stage = new s.default,
                    this._ticker = null,
                    this.ticker = t.sharedTicker ? a.shared : new a.Ticker,
                    t.autoStart && this.start()
                }
                return e.prototype.render = function() {
                    this.renderer.render(this.stage)
                }
                ,
                e.prototype.stop = function() {
                    this._ticker.stop()
                }
                ,
                e.prototype.start = function() {
                    this._ticker.start()
                }
                ,
                e.prototype.destroy = function(e) {
                    var t = this._ticker;
                    this.ticker = null,
                    t.destroy(),
                    this.stage.destroy(),
                    this.stage = null,
                    this.renderer.destroy(e),
                    this.renderer = null,
                    this._options = null
                }
                ,
                i(e, [{
                    key: "ticker",
                    set: function(e) {
                        this._ticker && this._ticker.remove(this.render, this),
                        this._ticker = e,
                        e && e.add(this.render, this, u.UPDATE_PRIORITY.LOW)
                    },
                    get: function() {
                        return this._ticker
                    }
                }, {
                    key: "view",
                    get: function() {
                        return this.renderer.view
                    }
                }, {
                    key: "screen",
                    get: function() {
                        return this.renderer.screen
                    }
                }]),
                e
            }();
            n.default = c
        }
        , {
            "./autoDetectRenderer": 45,
            "./const": 46,
            "./display/Container": 48,
            "./settings": 101,
            "./ticker": 120
        }],
        44: [function(e, t, n) {
            function r(e, t) {
                if (e instanceof Array) {
                    if ("precision" !== e[0].substring(0, 9)) {
                        var n = e.slice(0);
                        return n.unshift("precision " + t + " float;"),
                        n
                    }
                } else if ("precision" !== e.substring(0, 9))
                    return "precision " + t + " float;\n" + e;
                return e
            }
            n.__esModule = !0;
            var i = e("pixi-gl-core")
              , o = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./settings"))
              , s = function(e) {
                function t(n, i, s) {
                    return function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n, r(i, o.default.PRECISION_VERTEX), r(s, o.default.PRECISION_FRAGMENT)))
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t
            }(i.GLShader);
            n.default = s
        }
        , {
            "./settings": 101,
            "pixi-gl-core": 12
        }],
        45: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0,
            n.autoDetectRenderer = function(e, t, n, r) {
                var a = e && e.forceCanvas;
                return void 0 !== r && (a = r),
                !a && i.isWebGLSupported() ? new s.default(e,t,n) : new o.default(e,t,n)
            }
            ;
            var i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("./utils"))
              , o = r(e("./renderers/canvas/CanvasRenderer"))
              , s = r(e("./renderers/webgl/WebGLRenderer"))
        }
        , {
            "./renderers/canvas/CanvasRenderer": 77,
            "./renderers/webgl/WebGLRenderer": 84,
            "./utils": 124
        }],
        46: [function(e, t, n) {
            n.__esModule = !0;
            n.VERSION = "4.5.6",
            n.PI_2 = 2 * Math.PI,
            n.RAD_TO_DEG = 180 / Math.PI,
            n.DEG_TO_RAD = Math.PI / 180,
            n.RENDERER_TYPE = {
                UNKNOWN: 0,
                WEBGL: 1,
                CANVAS: 2
            },
            n.BLEND_MODES = {
                NORMAL: 0,
                ADD: 1,
                MULTIPLY: 2,
                SCREEN: 3,
                OVERLAY: 4,
                DARKEN: 5,
                LIGHTEN: 6,
                COLOR_DODGE: 7,
                COLOR_BURN: 8,
                HARD_LIGHT: 9,
                SOFT_LIGHT: 10,
                DIFFERENCE: 11,
                EXCLUSION: 12,
                HUE: 13,
                SATURATION: 14,
                COLOR: 15,
                LUMINOSITY: 16,
                NORMAL_NPM: 17,
                ADD_NPM: 18,
                SCREEN_NPM: 19
            },
            n.DRAW_MODES = {
                POINTS: 0,
                LINES: 1,
                LINE_LOOP: 2,
                LINE_STRIP: 3,
                TRIANGLES: 4,
                TRIANGLE_STRIP: 5,
                TRIANGLE_FAN: 6
            },
            n.SCALE_MODES = {
                LINEAR: 0,
                NEAREST: 1
            },
            n.WRAP_MODES = {
                CLAMP: 0,
                REPEAT: 1,
                MIRRORED_REPEAT: 2
            },
            n.GC_MODES = {
                AUTO: 0,
                MANUAL: 1
            },
            n.URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i,
            n.DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;(charset=[\w-]+|base64))?,(.*)/i,
            n.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i,
            n.SHAPES = {
                POLY: 0,
                RECT: 1,
                CIRC: 2,
                ELIP: 3,
                RREC: 4
            },
            n.PRECISION = {
                LOW: "lowp",
                MEDIUM: "mediump",
                HIGH: "highp"
            },
            n.TRANSFORM_MODE = {
                STATIC: 0,
                DYNAMIC: 1
            },
            n.TEXT_GRADIENT = {
                LINEAR_VERTICAL: 0,
                LINEAR_HORIZONTAL: 1
            },
            n.UPDATE_PRIORITY = {
                INTERACTION: 50,
                HIGH: 25,
                NORMAL: 0,
                LOW: -25,
                UTILITY: -50
            }
        }
        , {}],
        47: [function(e, t, n) {
            n.__esModule = !0;
            var r = e("../math")
              , i = function() {
                function e() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.minX = 1 / 0,
                    this.minY = 1 / 0,
                    this.maxX = -1 / 0,
                    this.maxY = -1 / 0,
                    this.rect = null
                }
                return e.prototype.isEmpty = function() {
                    return this.minX > this.maxX || this.minY > this.maxY
                }
                ,
                e.prototype.clear = function() {
                    this.updateID++,
                    this.minX = 1 / 0,
                    this.minY = 1 / 0,
                    this.maxX = -1 / 0,
                    this.maxY = -1 / 0
                }
                ,
                e.prototype.getRectangle = function(e) {
                    return this.minX > this.maxX || this.minY > this.maxY ? r.Rectangle.EMPTY : (e = e || new r.Rectangle(0,0,1,1),
                    e.x = this.minX,
                    e.y = this.minY,
                    e.width = this.maxX - this.minX,
                    e.height = this.maxY - this.minY,
                    e)
                }
                ,
                e.prototype.addPoint = function(e) {
                    this.minX = Math.min(this.minX, e.x),
                    this.maxX = Math.max(this.maxX, e.x),
                    this.minY = Math.min(this.minY, e.y),
                    this.maxY = Math.max(this.maxY, e.y)
                }
                ,
                e.prototype.addQuad = function(e) {
                    var t = this.minX
                      , n = this.minY
                      , r = this.maxX
                      , i = this.maxY
                      , o = e[0]
                      , s = e[1];
                    t = o < t ? o : t,
                    n = s < n ? s : n,
                    r = o > r ? o : r,
                    i = s > i ? s : i,
                    o = e[2],
                    s = e[3],
                    t = o < t ? o : t,
                    n = s < n ? s : n,
                    r = o > r ? o : r,
                    i = s > i ? s : i,
                    o = e[4],
                    s = e[5],
                    t = o < t ? o : t,
                    n = s < n ? s : n,
                    r = o > r ? o : r,
                    i = s > i ? s : i,
                    o = e[6],
                    s = e[7],
                    t = o < t ? o : t,
                    n = s < n ? s : n,
                    r = o > r ? o : r,
                    i = s > i ? s : i,
                    this.minX = t,
                    this.minY = n,
                    this.maxX = r,
                    this.maxY = i
                }
                ,
                e.prototype.addFrame = function(e, t, n, r, i) {
                    var o = e.worldTransform
                      , s = o.a
                      , a = o.b
                      , l = o.c
                      , u = o.d
                      , c = o.tx
                      , h = o.ty
                      , d = this.minX
                      , p = this.minY
                      , f = this.maxX
                      , g = this.maxY
                      , m = s * t + l * n + c
                      , v = a * t + u * n + h;
                    d = m < d ? m : d,
                    p = v < p ? v : p,
                    f = m > f ? m : f,
                    g = v > g ? v : g,
                    v = a * r + u * n + h,
                    d = (m = s * r + l * n + c) < d ? m : d,
                    p = v < p ? v : p,
                    f = m > f ? m : f,
                    g = v > g ? v : g,
                    v = a * t + u * i + h,
                    d = (m = s * t + l * i + c) < d ? m : d,
                    p = v < p ? v : p,
                    f = m > f ? m : f,
                    g = v > g ? v : g,
                    v = a * r + u * i + h,
                    d = (m = s * r + l * i + c) < d ? m : d,
                    p = v < p ? v : p,
                    f = m > f ? m : f,
                    g = v > g ? v : g,
                    this.minX = d,
                    this.minY = p,
                    this.maxX = f,
                    this.maxY = g
                }
                ,
                e.prototype.addVertices = function(e, t, n, r) {
                    for (var i = e.worldTransform, o = i.a, s = i.b, a = i.c, l = i.d, u = i.tx, c = i.ty, h = this.minX, d = this.minY, p = this.maxX, f = this.maxY, g = n; g < r; g += 2) {
                        var m = t[g]
                          , v = t[g + 1]
                          , y = o * m + a * v + u
                          , b = l * v + s * m + c;
                        h = y < h ? y : h,
                        d = b < d ? b : d,
                        p = y > p ? y : p,
                        f = b > f ? b : f
                    }
                    this.minX = h,
                    this.minY = d,
                    this.maxX = p,
                    this.maxY = f
                }
                ,
                e.prototype.addBounds = function(e) {
                    var t = this.minX
                      , n = this.minY
                      , r = this.maxX
                      , i = this.maxY;
                    this.minX = e.minX < t ? e.minX : t,
                    this.minY = e.minY < n ? e.minY : n,
                    this.maxX = e.maxX > r ? e.maxX : r,
                    this.maxY = e.maxY > i ? e.maxY : i
                }
                ,
                e.prototype.addBoundsMask = function(e, t) {
                    var n = e.minX > t.minX ? e.minX : t.minX
                      , r = e.minY > t.minY ? e.minY : t.minY
                      , i = e.maxX < t.maxX ? e.maxX : t.maxX
                      , o = e.maxY < t.maxY ? e.maxY : t.maxY;
                    if (n <= i && r <= o) {
                        var s = this.minX
                          , a = this.minY
                          , l = this.maxX
                          , u = this.maxY;
                        this.minX = n < s ? n : s,
                        this.minY = r < a ? r : a,
                        this.maxX = i > l ? i : l,
                        this.maxY = o > u ? o : u
                    }
                }
                ,
                e.prototype.addBoundsArea = function(e, t) {
                    var n = e.minX > t.x ? e.minX : t.x
                      , r = e.minY > t.y ? e.minY : t.y
                      , i = e.maxX < t.x + t.width ? e.maxX : t.x + t.width
                      , o = e.maxY < t.y + t.height ? e.maxY : t.y + t.height;
                    if (n <= i && r <= o) {
                        var s = this.minX
                          , a = this.minY
                          , l = this.maxX
                          , u = this.maxY;
                        this.minX = n < s ? n : s,
                        this.minY = r < a ? r : a,
                        this.maxX = i > l ? i : l,
                        this.maxY = o > u ? o : u
                    }
                }
                ,
                e
            }();
            n.default = i
        }
        , {
            "../math": 70
        }],
        48: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = e("../utils")
              , o = function(e) {
                function t() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return n.children = [],
                    n
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.onChildrenChange = function() {}
                ,
                t.prototype.addChild = function(e) {
                    var t = arguments.length;
                    if (t > 1)
                        for (var n = 0; n < t; n++)
                            this.addChild(arguments[n]);
                    else
                        e.parent && e.parent.removeChild(e),
                        e.parent = this,
                        e.transform._parentID = -1,
                        this.children.push(e),
                        this._boundsID++,
                        this.onChildrenChange(this.children.length - 1),
                        e.emit("added", this);
                    return e
                }
                ,
                t.prototype.addChildAt = function(e, t) {
                    if (t < 0 || t > this.children.length)
                        throw new Error(e + "addChildAt: The index " + t + " supplied is out of bounds " + this.children.length);
                    return e.parent && e.parent.removeChild(e),
                    e.parent = this,
                    e.transform._parentID = -1,
                    this.children.splice(t, 0, e),
                    this._boundsID++,
                    this.onChildrenChange(t),
                    e.emit("added", this),
                    e
                }
                ,
                t.prototype.swapChildren = function(e, t) {
                    if (e !== t) {
                        var n = this.getChildIndex(e)
                          , r = this.getChildIndex(t);
                        this.children[n] = t,
                        this.children[r] = e,
                        this.onChildrenChange(n < r ? n : r)
                    }
                }
                ,
                t.prototype.getChildIndex = function(e) {
                    var t = this.children.indexOf(e);
                    if (-1 === t)
                        throw new Error("The supplied DisplayObject must be a child of the caller");
                    return t
                }
                ,
                t.prototype.setChildIndex = function(e, t) {
                    if (t < 0 || t >= this.children.length)
                        throw new Error("The supplied index is out of bounds");
                    var n = this.getChildIndex(e);
                    (0,
                    i.removeItems)(this.children, n, 1),
                    this.children.splice(t, 0, e),
                    this.onChildrenChange(t)
                }
                ,
                t.prototype.getChildAt = function(e) {
                    if (e < 0 || e >= this.children.length)
                        throw new Error("getChildAt: Index (" + e + ") does not exist.");
                    return this.children[e]
                }
                ,
                t.prototype.removeChild = function(e) {
                    var t = arguments.length;
                    if (t > 1)
                        for (var n = 0; n < t; n++)
                            this.removeChild(arguments[n]);
                    else {
                        var r = this.children.indexOf(e);
                        if (-1 === r)
                            return null;
                        e.parent = null,
                        e.transform._parentID = -1,
                        (0,
                        i.removeItems)(this.children, r, 1),
                        this._boundsID++,
                        this.onChildrenChange(r),
                        e.emit("removed", this)
                    }
                    return e
                }
                ,
                t.prototype.removeChildAt = function(e) {
                    var t = this.getChildAt(e);
                    return t.parent = null,
                    t.transform._parentID = -1,
                    (0,
                    i.removeItems)(this.children, e, 1),
                    this._boundsID++,
                    this.onChildrenChange(e),
                    t.emit("removed", this),
                    t
                }
                ,
                t.prototype.removeChildren = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , t = arguments[1]
                      , n = e
                      , r = "number" == typeof t ? t : this.children.length
                      , i = r - n
                      , o = void 0;
                    if (i > 0 && i <= r) {
                        o = this.children.splice(n, i);
                        for (var s = 0; s < o.length; ++s)
                            o[s].parent = null,
                            o[s].transform && (o[s].transform._parentID = -1);
                        this._boundsID++,
                        this.onChildrenChange(e);
                        for (var a = 0; a < o.length; ++a)
                            o[a].emit("removed", this);
                        return o
                    }
                    if (0 === i && 0 === this.children.length)
                        return [];
                    throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
                }
                ,
                t.prototype.updateTransform = function() {
                    this._boundsID++,
                    this.transform.updateTransform(this.parent.transform),
                    this.worldAlpha = this.alpha * this.parent.worldAlpha;
                    for (var e = 0, t = this.children.length; e < t; ++e) {
                        var n = this.children[e];
                        n.visible && n.updateTransform()
                    }
                }
                ,
                t.prototype.calculateBounds = function() {
                    this._bounds.clear(),
                    this._calculateBounds();
                    for (var e = 0; e < this.children.length; e++) {
                        var t = this.children[e];
                        t.visible && t.renderable && (t.calculateBounds(),
                        t._mask ? (t._mask.calculateBounds(),
                        this._bounds.addBoundsMask(t._bounds, t._mask._bounds)) : t.filterArea ? this._bounds.addBoundsArea(t._bounds, t.filterArea) : this._bounds.addBounds(t._bounds))
                    }
                    this._lastBoundsID = this._boundsID
                }
                ,
                t.prototype._calculateBounds = function() {}
                ,
                t.prototype.renderWebGL = function(e) {
                    if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
                        if (this._mask || this._filters)
                            this.renderAdvancedWebGL(e);
                        else {
                            this._renderWebGL(e);
                            for (var t = 0, n = this.children.length; t < n; ++t)
                                this.children[t].renderWebGL(e)
                        }
                }
                ,
                t.prototype.renderAdvancedWebGL = function(e) {
                    e.flush();
                    var t = this._filters
                      , n = this._mask;
                    if (t) {
                        this._enabledFilters || (this._enabledFilters = []),
                        this._enabledFilters.length = 0;
                        for (var r = 0; r < t.length; r++)
                            t[r].enabled && this._enabledFilters.push(t[r]);
                        this._enabledFilters.length && e.filterManager.pushFilter(this, this._enabledFilters)
                    }
                    n && e.maskManager.pushMask(this, this._mask),
                    this._renderWebGL(e);
                    for (var i = 0, o = this.children.length; i < o; i++)
                        this.children[i].renderWebGL(e);
                    e.flush(),
                    n && e.maskManager.popMask(this, this._mask),
                    t && this._enabledFilters && this._enabledFilters.length && e.filterManager.popFilter()
                }
                ,
                t.prototype._renderWebGL = function(e) {}
                ,
                t.prototype._renderCanvas = function(e) {}
                ,
                t.prototype.renderCanvas = function(e) {
                    if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
                        this._mask && e.maskManager.pushMask(this._mask),
                        this._renderCanvas(e);
                        for (var t = 0, n = this.children.length; t < n; ++t)
                            this.children[t].renderCanvas(e);
                        this._mask && e.maskManager.popMask(e)
                    }
                }
                ,
                t.prototype.destroy = function(t) {
                    e.prototype.destroy.call(this);
                    var n = "boolean" == typeof t ? t : t && t.children
                      , r = this.removeChildren(0, this.children.length);
                    if (n)
                        for (var i = 0; i < r.length; ++i)
                            r[i].destroy(t)
                }
                ,
                r(t, [{
                    key: "width",
                    get: function() {
                        return this.scale.x * this.getLocalBounds().width
                    },
                    set: function(e) {
                        var t = this.getLocalBounds().width;
                        this.scale.x = 0 !== t ? e / t : 1,
                        this._width = e
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.scale.y * this.getLocalBounds().height
                    },
                    set: function(e) {
                        var t = this.getLocalBounds().height;
                        this.scale.y = 0 !== t ? e / t : 1,
                        this._height = e
                    }
                }]),
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./DisplayObject")).default);
            n.default = o,
            o.prototype.containerUpdateTransform = o.prototype.updateTransform
        }
        , {
            "../utils": 124,
            "./DisplayObject": 49
        }],
        49: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = r(e("eventemitter3"))
              , s = e("../const")
              , a = r(e("../settings"))
              , l = r(e("./TransformStatic"))
              , u = r(e("./Transform"))
              , c = r(e("./Bounds"))
              , h = e("../math")
              , d = function(e) {
                function t() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this))
                      , r = a.default.TRANSFORM_MODE === s.TRANSFORM_MODE.STATIC ? l.default : u.default;
                    return n.tempDisplayObjectParent = null,
                    n.transform = new r,
                    n.alpha = 1,
                    n.visible = !0,
                    n.renderable = !0,
                    n.parent = null,
                    n.worldAlpha = 1,
                    n.filterArea = null,
                    n._filters = null,
                    n._enabledFilters = null,
                    n._bounds = new c.default,
                    n._boundsID = 0,
                    n._lastBoundsID = -1,
                    n._boundsRect = null,
                    n._localBoundsRect = null,
                    n._mask = null,
                    n._destroyed = !1,
                    n
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.updateTransform = function() {
                    this.transform.updateTransform(this.parent.transform),
                    this.worldAlpha = this.alpha * this.parent.worldAlpha,
                    this._bounds.updateID++
                }
                ,
                t.prototype._recursivePostUpdateTransform = function() {
                    this.parent ? (this.parent._recursivePostUpdateTransform(),
                    this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
                }
                ,
                t.prototype.getBounds = function(e, t) {
                    return e || (this.parent ? (this._recursivePostUpdateTransform(),
                    this.updateTransform()) : (this.parent = this._tempDisplayObjectParent,
                    this.updateTransform(),
                    this.parent = null)),
                    this._boundsID !== this._lastBoundsID && this.calculateBounds(),
                    t || (this._boundsRect || (this._boundsRect = new h.Rectangle),
                    t = this._boundsRect),
                    this._bounds.getRectangle(t)
                }
                ,
                t.prototype.getLocalBounds = function(e) {
                    var t = this.transform
                      , n = this.parent;
                    this.parent = null,
                    this.transform = this._tempDisplayObjectParent.transform,
                    e || (this._localBoundsRect || (this._localBoundsRect = new h.Rectangle),
                    e = this._localBoundsRect);
                    var r = this.getBounds(!1, e);
                    return this.parent = n,
                    this.transform = t,
                    r
                }
                ,
                t.prototype.toGlobal = function(e, t) {
                    return arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || (this._recursivePostUpdateTransform(),
                    this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent,
                    this.displayObjectUpdateTransform(),
                    this.parent = null)),
                    this.worldTransform.apply(e, t)
                }
                ,
                t.prototype.toLocal = function(e, t, n, r) {
                    return t && (e = t.toGlobal(e, n, r)),
                    r || (this._recursivePostUpdateTransform(),
                    this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent,
                    this.displayObjectUpdateTransform(),
                    this.parent = null)),
                    this.worldTransform.applyInverse(e, n)
                }
                ,
                t.prototype.renderWebGL = function(e) {}
                ,
                t.prototype.renderCanvas = function(e) {}
                ,
                t.prototype.setParent = function(e) {
                    if (!e || !e.addChild)
                        throw new Error("setParent: Argument must be a Container");
                    return e.addChild(this),
                    e
                }
                ,
                t.prototype.setTransform = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
                      , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1
                      , i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0
                      , o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0
                      , s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0
                      , a = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0
                      , l = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0;
                    return this.position.x = e,
                    this.position.y = t,
                    this.scale.x = n || 1,
                    this.scale.y = r || 1,
                    this.rotation = i,
                    this.skew.x = o,
                    this.skew.y = s,
                    this.pivot.x = a,
                    this.pivot.y = l,
                    this
                }
                ,
                t.prototype.destroy = function() {
                    this.removeAllListeners(),
                    this.parent && this.parent.removeChild(this),
                    this.transform = null,
                    this.parent = null,
                    this._bounds = null,
                    this._currentBounds = null,
                    this._mask = null,
                    this.filterArea = null,
                    this.interactive = !1,
                    this.interactiveChildren = !1,
                    this._destroyed = !0
                }
                ,
                i(t, [{
                    key: "_tempDisplayObjectParent",
                    get: function() {
                        return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new t),
                        this.tempDisplayObjectParent
                    }
                }, {
                    key: "x",
                    get: function() {
                        return this.position.x
                    },
                    set: function(e) {
                        this.transform.position.x = e
                    }
                }, {
                    key: "y",
                    get: function() {
                        return this.position.y
                    },
                    set: function(e) {
                        this.transform.position.y = e
                    }
                }, {
                    key: "worldTransform",
                    get: function() {
                        return this.transform.worldTransform
                    }
                }, {
                    key: "localTransform",
                    get: function() {
                        return this.transform.localTransform
                    }
                }, {
                    key: "position",
                    get: function() {
                        return this.transform.position
                    },
                    set: function(e) {
                        this.transform.position.copy(e)
                    }
                }, {
                    key: "scale",
                    get: function() {
                        return this.transform.scale
                    },
                    set: function(e) {
                        this.transform.scale.copy(e)
                    }
                }, {
                    key: "pivot",
                    get: function() {
                        return this.transform.pivot
                    },
                    set: function(e) {
                        this.transform.pivot.copy(e)
                    }
                }, {
                    key: "skew",
                    get: function() {
                        return this.transform.skew
                    },
                    set: function(e) {
                        this.transform.skew.copy(e)
                    }
                }, {
                    key: "rotation",
                    get: function() {
                        return this.transform.rotation
                    },
                    set: function(e) {
                        this.transform.rotation = e
                    }
                }, {
                    key: "worldVisible",
                    get: function() {
                        var e = this;
                        do {
                            if (!e.visible)
                                return !1;
                            e = e.parent
                        } while (e);return !0
                    }
                }, {
                    key: "mask",
                    get: function() {
                        return this._mask
                    },
                    set: function(e) {
                        this._mask && (this._mask.renderable = !0),
                        this._mask = e,
                        this._mask && (this._mask.renderable = !1)
                    }
                }, {
                    key: "filters",
                    get: function() {
                        return this._filters && this._filters.slice()
                    },
                    set: function(e) {
                        this._filters = e && e.slice()
                    }
                }]),
                t
            }(o.default);
            n.default = d,
            d.prototype.displayObjectUpdateTransform = d.prototype.updateTransform
        }
        , {
            "../const": 46,
            "../math": 70,
            "../settings": 101,
            "./Bounds": 47,
            "./Transform": 50,
            "./TransformStatic": 52,
            eventemitter3: 3
        }],
        50: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = e("../math")
              , o = function(e) {
                function t() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return n.position = new i.Point(0,0),
                    n.scale = new i.Point(1,1),
                    n.skew = new i.ObservablePoint(n.updateSkew,n,0,0),
                    n.pivot = new i.Point(0,0),
                    n._rotation = 0,
                    n._cx = 1,
                    n._sx = 0,
                    n._cy = 0,
                    n._sy = 1,
                    n
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.updateSkew = function() {
                    this._cx = Math.cos(this._rotation + this.skew._y),
                    this._sx = Math.sin(this._rotation + this.skew._y),
                    this._cy = -Math.sin(this._rotation - this.skew._x),
                    this._sy = Math.cos(this._rotation - this.skew._x)
                }
                ,
                t.prototype.updateLocalTransform = function() {
                    var e = this.localTransform;
                    e.a = this._cx * this.scale.x,
                    e.b = this._sx * this.scale.x,
                    e.c = this._cy * this.scale.y,
                    e.d = this._sy * this.scale.y,
                    e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c),
                    e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d)
                }
                ,
                t.prototype.updateTransform = function(e) {
                    var t = this.localTransform;
                    t.a = this._cx * this.scale.x,
                    t.b = this._sx * this.scale.x,
                    t.c = this._cy * this.scale.y,
                    t.d = this._sy * this.scale.y,
                    t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c),
                    t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d);
                    var n = e.worldTransform
                      , r = this.worldTransform;
                    r.a = t.a * n.a + t.b * n.c,
                    r.b = t.a * n.b + t.b * n.d,
                    r.c = t.c * n.a + t.d * n.c,
                    r.d = t.c * n.b + t.d * n.d,
                    r.tx = t.tx * n.a + t.ty * n.c + n.tx,
                    r.ty = t.tx * n.b + t.ty * n.d + n.ty,
                    this._worldID++
                }
                ,
                t.prototype.setFromMatrix = function(e) {
                    e.decompose(this)
                }
                ,
                r(t, [{
                    key: "rotation",
                    get: function() {
                        return this._rotation
                    },
                    set: function(e) {
                        this._rotation = e,
                        this.updateSkew()
                    }
                }]),
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./TransformBase")).default);
            n.default = o
        }
        , {
            "../math": 70,
            "./TransformBase": 51
        }],
        51: [function(e, t, n) {
            n.__esModule = !0;
            var r = e("../math")
              , i = function() {
                function e() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.worldTransform = new r.Matrix,
                    this.localTransform = new r.Matrix,
                    this._worldID = 0,
                    this._parentID = 0
                }
                return e.prototype.updateLocalTransform = function() {}
                ,
                e.prototype.updateTransform = function(e) {
                    var t = e.worldTransform
                      , n = this.worldTransform
                      , r = this.localTransform;
                    n.a = r.a * t.a + r.b * t.c,
                    n.b = r.a * t.b + r.b * t.d,
                    n.c = r.c * t.a + r.d * t.c,
                    n.d = r.c * t.b + r.d * t.d,
                    n.tx = r.tx * t.a + r.ty * t.c + t.tx,
                    n.ty = r.tx * t.b + r.ty * t.d + t.ty,
                    this._worldID++
                }
                ,
                e
            }();
            n.default = i,
            i.prototype.updateWorldTransform = i.prototype.updateTransform,
            i.IDENTITY = new i
        }
        , {
            "../math": 70
        }],
        52: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = e("../math")
              , o = function(e) {
                function t() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return n.position = new i.ObservablePoint(n.onChange,n,0,0),
                    n.scale = new i.ObservablePoint(n.onChange,n,1,1),
                    n.pivot = new i.ObservablePoint(n.onChange,n,0,0),
                    n.skew = new i.ObservablePoint(n.updateSkew,n,0,0),
                    n._rotation = 0,
                    n._cx = 1,
                    n._sx = 0,
                    n._cy = 0,
                    n._sy = 1,
                    n._localID = 0,
                    n._currentLocalID = 0,
                    n
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.onChange = function() {
                    this._localID++
                }
                ,
                t.prototype.updateSkew = function() {
                    this._cx = Math.cos(this._rotation + this.skew._y),
                    this._sx = Math.sin(this._rotation + this.skew._y),
                    this._cy = -Math.sin(this._rotation - this.skew._x),
                    this._sy = Math.cos(this._rotation - this.skew._x),
                    this._localID++
                }
                ,
                t.prototype.updateLocalTransform = function() {
                    var e = this.localTransform;
                    this._localID !== this._currentLocalID && (e.a = this._cx * this.scale._x,
                    e.b = this._sx * this.scale._x,
                    e.c = this._cy * this.scale._y,
                    e.d = this._sy * this.scale._y,
                    e.tx = this.position._x - (this.pivot._x * e.a + this.pivot._y * e.c),
                    e.ty = this.position._y - (this.pivot._x * e.b + this.pivot._y * e.d),
                    this._currentLocalID = this._localID,
                    this._parentID = -1)
                }
                ,
                t.prototype.updateTransform = function(e) {
                    var t = this.localTransform;
                    if (this._localID !== this._currentLocalID && (t.a = this._cx * this.scale._x,
                    t.b = this._sx * this.scale._x,
                    t.c = this._cy * this.scale._y,
                    t.d = this._sy * this.scale._y,
                    t.tx = this.position._x - (this.pivot._x * t.a + this.pivot._y * t.c),
                    t.ty = this.position._y - (this.pivot._x * t.b + this.pivot._y * t.d),
                    this._currentLocalID = this._localID,
                    this._parentID = -1),
                    this._parentID !== e._worldID) {
                        var n = e.worldTransform
                          , r = this.worldTransform;
                        r.a = t.a * n.a + t.b * n.c,
                        r.b = t.a * n.b + t.b * n.d,
                        r.c = t.c * n.a + t.d * n.c,
                        r.d = t.c * n.b + t.d * n.d,
                        r.tx = t.tx * n.a + t.ty * n.c + n.tx,
                        r.ty = t.tx * n.b + t.ty * n.d + n.ty,
                        this._parentID = e._worldID,
                        this._worldID++
                    }
                }
                ,
                t.prototype.setFromMatrix = function(e) {
                    e.decompose(this),
                    this._localID++
                }
                ,
                r(t, [{
                    key: "rotation",
                    get: function() {
                        return this._rotation
                    },
                    set: function(e) {
                        this._rotation = e,
                        this.updateSkew()
                    }
                }]),
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./TransformBase")).default);
            n.default = o
        }
        , {
            "../math": 70,
            "./TransformBase": 51
        }],
        53: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("../display/Container"))
              , o = r(e("../textures/RenderTexture"))
              , s = r(e("../textures/Texture"))
              , a = r(e("./GraphicsData"))
              , l = r(e("../sprites/Sprite"))
              , u = e("../math")
              , c = e("../utils")
              , h = e("../const")
              , d = r(e("../display/Bounds"))
              , p = r(e("./utils/bezierCurveTo"))
              , f = r(e("../renderers/canvas/CanvasRenderer"))
              , g = void 0
              , m = new u.Matrix
              , v = new u.Point
              , y = new Float32Array(4)
              , b = new Float32Array(4)
              , _ = function(e) {
                function t() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return r.fillAlpha = 1,
                    r.lineWidth = 0,
                    r.nativeLines = n,
                    r.lineColor = 0,
                    r.graphicsData = [],
                    r.tint = 16777215,
                    r._prevTint = 16777215,
                    r.blendMode = h.BLEND_MODES.NORMAL,
                    r.currentPath = null,
                    r._webGL = {},
                    r.isMask = !1,
                    r.boundsPadding = 0,
                    r._localBounds = new d.default,
                    r.dirty = 0,
                    r.fastRectDirty = -1,
                    r.clearDirty = 0,
                    r.boundsDirty = -1,
                    r.cachedSpriteDirty = !1,
                    r._spriteRect = null,
                    r._fastRect = !1,
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.clone = function() {
                    var e = new t;
                    e.renderable = this.renderable,
                    e.fillAlpha = this.fillAlpha,
                    e.lineWidth = this.lineWidth,
                    e.lineColor = this.lineColor,
                    e.tint = this.tint,
                    e.blendMode = this.blendMode,
                    e.isMask = this.isMask,
                    e.boundsPadding = this.boundsPadding,
                    e.dirty = 0,
                    e.cachedSpriteDirty = this.cachedSpriteDirty;
                    for (var n = 0; n < this.graphicsData.length; ++n)
                        e.graphicsData.push(this.graphicsData[n].clone());
                    return e.currentPath = e.graphicsData[e.graphicsData.length - 1],
                    e.updateLocalBounds(),
                    e
                }
                ,
                t.prototype.lineStyle = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    if (this.lineWidth = e,
                    this.lineColor = t,
                    this.lineAlpha = n,
                    this.currentPath)
                        if (this.currentPath.shape.points.length) {
                            var r = new u.Polygon(this.currentPath.shape.points.slice(-2));
                            r.closed = !1,
                            this.drawShape(r)
                        } else
                            this.currentPath.lineWidth = this.lineWidth,
                            this.currentPath.lineColor = this.lineColor,
                            this.currentPath.lineAlpha = this.lineAlpha;
                    return this
                }
                ,
                t.prototype.moveTo = function(e, t) {
                    var n = new u.Polygon([e, t]);
                    return n.closed = !1,
                    this.drawShape(n),
                    this
                }
                ,
                t.prototype.lineTo = function(e, t) {
                    return this.currentPath.shape.points.push(e, t),
                    this.dirty++,
                    this
                }
                ,
                t.prototype.quadraticCurveTo = function(e, t, n, r) {
                    this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                    var i = this.currentPath.shape.points
                      , o = 0
                      , s = 0;
                    0 === i.length && this.moveTo(0, 0);
                    for (var a = i[i.length - 2], l = i[i.length - 1], u = 1; u <= 20; ++u) {
                        var c = u / 20;
                        o = a + (e - a) * c,
                        s = l + (t - l) * c,
                        i.push(o + (e + (n - e) * c - o) * c, s + (t + (r - t) * c - s) * c)
                    }
                    return this.dirty++,
                    this
                }
                ,
                t.prototype.bezierCurveTo = function(e, t, n, r, i, o) {
                    this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                    var s = this.currentPath.shape.points
                      , a = s[s.length - 2]
                      , l = s[s.length - 1];
                    return s.length -= 2,
                    (0,
                    p.default)(a, l, e, t, n, r, i, o, s),
                    this.dirty++,
                    this
                }
                ,
                t.prototype.arcTo = function(e, t, n, r, i) {
                    this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(e, t) : this.moveTo(e, t);
                    var o = this.currentPath.shape.points
                      , s = o[o.length - 2]
                      , a = o[o.length - 1] - t
                      , l = s - e
                      , u = r - t
                      , c = n - e
                      , h = Math.abs(a * c - l * u);
                    if (h < 1e-8 || 0 === i)
                        o[o.length - 2] === e && o[o.length - 1] === t || o.push(e, t);
                    else {
                        var d = a * a + l * l
                          , p = u * u + c * c
                          , f = a * u + l * c
                          , g = i * Math.sqrt(d) / h
                          , m = i * Math.sqrt(p) / h
                          , v = g * f / d
                          , y = m * f / p
                          , b = g * c + m * l
                          , _ = g * u + m * a
                          , x = l * (m + v)
                          , w = a * (m + v)
                          , T = c * (g + y)
                          , E = u * (g + y)
                          , S = Math.atan2(w - _, x - b)
                          , I = Math.atan2(E - _, T - b);
                        this.arc(b + e, _ + t, i, S, I, l * u > c * a)
                    }
                    return this.dirty++,
                    this
                }
                ,
                t.prototype.arc = function(e, t, n, r, i) {
                    var o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
                    if (r === i)
                        return this;
                    !o && i <= r ? i += 2 * Math.PI : o && r <= i && (r += 2 * Math.PI);
                    var s = i - r
                      , a = 40 * Math.ceil(Math.abs(s) / (2 * Math.PI));
                    if (0 === s)
                        return this;
                    var l = e + Math.cos(r) * n
                      , u = t + Math.sin(r) * n
                      , c = this.currentPath ? this.currentPath.shape.points : null;
                    c ? c[c.length - 2] === l && c[c.length - 1] === u || c.push(l, u) : (this.moveTo(l, u),
                    c = this.currentPath.shape.points);
                    for (var h = s / (2 * a), d = 2 * h, p = Math.cos(h), f = Math.sin(h), g = a - 1, m = g % 1 / g, v = 0; v <= g; ++v) {
                        var y = h + r + d * (v + m * v)
                          , b = Math.cos(y)
                          , _ = -Math.sin(y);
                        c.push((p * b + f * _) * n + e, (p * -_ + f * b) * n + t)
                    }
                    return this.dirty++,
                    this
                }
                ,
                t.prototype.beginFill = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    return this.filling = !0,
                    this.fillColor = e,
                    this.fillAlpha = t,
                    this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling,
                    this.currentPath.fillColor = this.fillColor,
                    this.currentPath.fillAlpha = this.fillAlpha),
                    this
                }
                ,
                t.prototype.endFill = function() {
                    return this.filling = !1,
                    this.fillColor = null,
                    this.fillAlpha = 1,
                    this
                }
                ,
                t.prototype.drawRect = function(e, t, n, r) {
                    return this.drawShape(new u.Rectangle(e,t,n,r)),
                    this
                }
                ,
                t.prototype.drawRoundedRect = function(e, t, n, r, i) {
                    return this.drawShape(new u.RoundedRectangle(e,t,n,r,i)),
                    this
                }
                ,
                t.prototype.drawCircle = function(e, t, n) {
                    return this.drawShape(new u.Circle(e,t,n)),
                    this
                }
                ,
                t.prototype.drawEllipse = function(e, t, n, r) {
                    return this.drawShape(new u.Ellipse(e,t,n,r)),
                    this
                }
                ,
                t.prototype.drawPolygon = function(e) {
                    var t = e
                      , n = !0;
                    if (t instanceof u.Polygon && (n = t.closed,
                    t = t.points),
                    !Array.isArray(t)) {
                        t = new Array(arguments.length);
                        for (var r = 0; r < t.length; ++r)
                            t[r] = arguments[r]
                    }
                    var i = new u.Polygon(t);
                    return i.closed = n,
                    this.drawShape(i),
                    this
                }
                ,
                t.prototype.clear = function() {
                    return (this.lineWidth || this.filling || this.graphicsData.length > 0) && (this.lineWidth = 0,
                    this.filling = !1,
                    this.boundsDirty = -1,
                    this.dirty++,
                    this.clearDirty++,
                    this.graphicsData.length = 0),
                    this.currentPath = null,
                    this._spriteRect = null,
                    this
                }
                ,
                t.prototype.isFastRect = function() {
                    return 1 === this.graphicsData.length && this.graphicsData[0].shape.type === h.SHAPES.RECT && !this.graphicsData[0].lineWidth
                }
                ,
                t.prototype._renderWebGL = function(e) {
                    this.dirty !== this.fastRectDirty && (this.fastRectDirty = this.dirty,
                    this._fastRect = this.isFastRect()),
                    this._fastRect ? this._renderSpriteRect(e) : (e.setObjectRenderer(e.plugins.graphics),
                    e.plugins.graphics.render(this))
                }
                ,
                t.prototype._renderSpriteRect = function(e) {
                    var t = this.graphicsData[0].shape;
                    this._spriteRect || (this._spriteRect = new l.default(new s.default(s.default.WHITE)));
                    var n = this._spriteRect;
                    if (16777215 === this.tint)
                        n.tint = this.graphicsData[0].fillColor;
                    else {
                        var r = y
                          , i = b;
                        (0,
                        c.hex2rgb)(this.graphicsData[0].fillColor, r),
                        (0,
                        c.hex2rgb)(this.tint, i),
                        r[0] *= i[0],
                        r[1] *= i[1],
                        r[2] *= i[2],
                        n.tint = (0,
                        c.rgb2hex)(r)
                    }
                    n.alpha = this.graphicsData[0].fillAlpha,
                    n.worldAlpha = this.worldAlpha * n.alpha,
                    n.blendMode = this.blendMode,
                    n._texture._frame.width = t.width,
                    n._texture._frame.height = t.height,
                    n.transform.worldTransform = this.transform.worldTransform,
                    n.anchor.set(-t.x / t.width, -t.y / t.height),
                    n._onAnchorUpdate(),
                    n._renderWebGL(e)
                }
                ,
                t.prototype._renderCanvas = function(e) {
                    !0 !== this.isMask && e.plugins.graphics.render(this)
                }
                ,
                t.prototype._calculateBounds = function() {
                    this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty,
                    this.updateLocalBounds(),
                    this.cachedSpriteDirty = !0);
                    var e = this._localBounds;
                    this._bounds.addFrame(this.transform, e.minX, e.minY, e.maxX, e.maxY)
                }
                ,
                t.prototype.containsPoint = function(e) {
                    this.worldTransform.applyInverse(e, v);
                    for (var t = this.graphicsData, n = 0; n < t.length; ++n) {
                        var r = t[n];
                        if (r.fill && (r.shape && r.shape.contains(v.x, v.y))) {
                            if (r.holes)
                                for (var i = 0; i < r.holes.length; i++) {
                                    if (r.holes[i].contains(v.x, v.y))
                                        return !1
                                }
                            return !0
                        }
                    }
                    return !1
                }
                ,
                t.prototype.updateLocalBounds = function() {
                    var e = 1 / 0
                      , t = -1 / 0
                      , n = 1 / 0
                      , r = -1 / 0;
                    if (this.graphicsData.length)
                        for (var i = 0, o = 0, s = 0, a = 0, l = 0, u = 0; u < this.graphicsData.length; u++) {
                            var c = this.graphicsData[u]
                              , d = c.type
                              , p = c.lineWidth;
                            if (i = c.shape,
                            d === h.SHAPES.RECT || d === h.SHAPES.RREC)
                                o = i.x - p / 2,
                                s = i.y - p / 2,
                                a = i.width + p,
                                l = i.height + p,
                                e = o < e ? o : e,
                                t = o + a > t ? o + a : t,
                                n = s < n ? s : n,
                                r = s + l > r ? s + l : r;
                            else if (d === h.SHAPES.CIRC)
                                o = i.x,
                                s = i.y,
                                a = i.radius + p / 2,
                                l = i.radius + p / 2,
                                e = o - a < e ? o - a : e,
                                t = o + a > t ? o + a : t,
                                n = s - l < n ? s - l : n,
                                r = s + l > r ? s + l : r;
                            else if (d === h.SHAPES.ELIP)
                                o = i.x,
                                s = i.y,
                                a = i.width + p / 2,
                                l = i.height + p / 2,
                                e = o - a < e ? o - a : e,
                                t = o + a > t ? o + a : t,
                                n = s - l < n ? s - l : n,
                                r = s + l > r ? s + l : r;
                            else
                                for (var f = i.points, g = 0, m = 0, v = 0, y = 0, b = 0, _ = 0, x = 0, w = 0, T = 0; T + 2 < f.length; T += 2)
                                    o = f[T],
                                    s = f[T + 1],
                                    g = f[T + 2],
                                    m = f[T + 3],
                                    v = Math.abs(g - o),
                                    y = Math.abs(m - s),
                                    l = p,
                                    (a = Math.sqrt(v * v + y * y)) < 1e-9 || (_ = (l / a * v + y) / 2,
                                    w = (m + s) / 2,
                                    e = (x = (g + o) / 2) - (b = (l / a * y + v) / 2) < e ? x - b : e,
                                    t = x + b > t ? x + b : t,
                                    n = w - _ < n ? w - _ : n,
                                    r = w + _ > r ? w + _ : r)
                        }
                    else
                        e = 0,
                        t = 0,
                        n = 0,
                        r = 0;
                    var E = this.boundsPadding;
                    this._localBounds.minX = e - E,
                    this._localBounds.maxX = t + E,
                    this._localBounds.minY = n - E,
                    this._localBounds.maxY = r + E
                }
                ,
                t.prototype.drawShape = function(e) {
                    this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(),
                    this.currentPath = null;
                    var t = new a.default(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,this.nativeLines,e);
                    return this.graphicsData.push(t),
                    t.type === h.SHAPES.POLY && (t.shape.closed = t.shape.closed || this.filling,
                    this.currentPath = t),
                    this.dirty++,
                    t
                }
                ,
                t.prototype.generateCanvasTexture = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
                      , n = this.getLocalBounds()
                      , r = o.default.create(n.width, n.height, e, t);
                    g || (g = new f.default),
                    this.transform.updateLocalTransform(),
                    this.transform.localTransform.copy(m),
                    m.invert(),
                    m.tx -= n.x,
                    m.ty -= n.y,
                    g.render(this, r, !0, m);
                    var i = s.default.fromCanvas(r.baseTexture._canvasRenderTarget.canvas, e, "graphics");
                    return i.baseTexture.resolution = t,
                    i.baseTexture.update(),
                    i
                }
                ,
                t.prototype.closePath = function() {
                    var e = this.currentPath;
                    return e && e.shape && e.shape.close(),
                    this
                }
                ,
                t.prototype.addHole = function() {
                    var e = this.graphicsData.pop();
                    return this.currentPath = this.graphicsData[this.graphicsData.length - 1],
                    this.currentPath.addHole(e.shape),
                    this.currentPath = null,
                    this
                }
                ,
                t.prototype.destroy = function(t) {
                    e.prototype.destroy.call(this, t);
                    for (var n = 0; n < this.graphicsData.length; ++n)
                        this.graphicsData[n].destroy();
                    for (var r in this._webgl)
                        for (var i = 0; i < this._webgl[r].data.length; ++i)
                            this._webgl[r].data[i].destroy();
                    this._spriteRect && this._spriteRect.destroy(),
                    this.graphicsData = null,
                    this.currentPath = null,
                    this._webgl = null,
                    this._localBounds = null
                }
                ,
                t
            }(i.default);
            n.default = _,
            _._SPRITE_TEXTURE = null
        }
        , {
            "../const": 46,
            "../display/Bounds": 47,
            "../display/Container": 48,
            "../math": 70,
            "../renderers/canvas/CanvasRenderer": 77,
            "../sprites/Sprite": 102,
            "../textures/RenderTexture": 113,
            "../textures/Texture": 115,
            "../utils": 124,
            "./GraphicsData": 54,
            "./utils/bezierCurveTo": 56
        }],
        54: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(t, n, r, i, o, s, a, l) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.lineWidth = t,
                    this.nativeLines = a,
                    this.lineColor = n,
                    this.lineAlpha = r,
                    this._lineTint = n,
                    this.fillColor = i,
                    this.fillAlpha = o,
                    this._fillTint = i,
                    this.fill = s,
                    this.holes = [],
                    this.shape = l,
                    this.type = l.type
                }
                return e.prototype.clone = function() {
                    return new e(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.nativeLines,this.shape)
                }
                ,
                e.prototype.addHole = function(e) {
                    this.holes.push(e)
                }
                ,
                e.prototype.destroy = function() {
                    this.shape = null,
                    this.holes = null
                }
                ,
                e
            }();
            n.default = r
        }
        , {}],
        55: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../../renderers/canvas/CanvasRenderer"))
              , i = e("../../const")
              , o = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t
                }
                return e.prototype.render = function(e) {
                    var t = this.renderer
                      , n = t.context
                      , r = e.worldAlpha
                      , o = e.transform.worldTransform
                      , s = t.resolution;
                    this._prevTint !== this.tint && (this.dirty = !0),
                    n.setTransform(o.a * s, o.b * s, o.c * s, o.d * s, o.tx * s, o.ty * s),
                    e.dirty && (this.updateGraphicsTint(e),
                    e.dirty = !1),
                    t.setBlendMode(e.blendMode);
                    for (var a = 0; a < e.graphicsData.length; a++) {
                        var l = e.graphicsData[a]
                          , u = l.shape
                          , c = l._fillTint
                          , h = l._lineTint;
                        if (n.lineWidth = l.lineWidth,
                        l.type === i.SHAPES.POLY) {
                            n.beginPath(),
                            this.renderPolygon(u.points, u.closed, n);
                            for (var d = 0; d < l.holes.length; d++)
                                this.renderPolygon(l.holes[d].points, !0, n);
                            l.fill && (n.globalAlpha = l.fillAlpha * r,
                            n.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                            n.fill()),
                            l.lineWidth && (n.globalAlpha = l.lineAlpha * r,
                            n.strokeStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6),
                            n.stroke())
                        } else if (l.type === i.SHAPES.RECT)
                            (l.fillColor || 0 === l.fillColor) && (n.globalAlpha = l.fillAlpha * r,
                            n.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                            n.fillRect(u.x, u.y, u.width, u.height)),
                            l.lineWidth && (n.globalAlpha = l.lineAlpha * r,
                            n.strokeStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6),
                            n.strokeRect(u.x, u.y, u.width, u.height));
                        else if (l.type === i.SHAPES.CIRC)
                            n.beginPath(),
                            n.arc(u.x, u.y, u.radius, 0, 2 * Math.PI),
                            n.closePath(),
                            l.fill && (n.globalAlpha = l.fillAlpha * r,
                            n.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                            n.fill()),
                            l.lineWidth && (n.globalAlpha = l.lineAlpha * r,
                            n.strokeStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6),
                            n.stroke());
                        else if (l.type === i.SHAPES.ELIP) {
                            var p = 2 * u.width
                              , f = 2 * u.height
                              , g = u.x - p / 2
                              , m = u.y - f / 2;
                            n.beginPath();
                            var v = p / 2 * .5522848
                              , y = f / 2 * .5522848
                              , b = g + p
                              , _ = m + f
                              , x = g + p / 2
                              , w = m + f / 2;
                            n.moveTo(g, w),
                            n.bezierCurveTo(g, w - y, x - v, m, x, m),
                            n.bezierCurveTo(x + v, m, b, w - y, b, w),
                            n.bezierCurveTo(b, w + y, x + v, _, x, _),
                            n.bezierCurveTo(x - v, _, g, w + y, g, w),
                            n.closePath(),
                            l.fill && (n.globalAlpha = l.fillAlpha * r,
                            n.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                            n.fill()),
                            l.lineWidth && (n.globalAlpha = l.lineAlpha * r,
                            n.strokeStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6),
                            n.stroke())
                        } else if (l.type === i.SHAPES.RREC) {
                            var T = u.x
                              , E = u.y
                              , S = u.width
                              , I = u.height
                              , P = u.radius
                              , M = Math.min(S, I) / 2 | 0;
                            P = P > M ? M : P,
                            n.beginPath(),
                            n.moveTo(T, E + P),
                            n.lineTo(T, E + I - P),
                            n.quadraticCurveTo(T, E + I, T + P, E + I),
                            n.lineTo(T + S - P, E + I),
                            n.quadraticCurveTo(T + S, E + I, T + S, E + I - P),
                            n.lineTo(T + S, E + P),
                            n.quadraticCurveTo(T + S, E, T + S - P, E),
                            n.lineTo(T + P, E),
                            n.quadraticCurveTo(T, E, T, E + P),
                            n.closePath(),
                            (l.fillColor || 0 === l.fillColor) && (n.globalAlpha = l.fillAlpha * r,
                            n.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6),
                            n.fill()),
                            l.lineWidth && (n.globalAlpha = l.lineAlpha * r,
                            n.strokeStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6),
                            n.stroke())
                        }
                    }
                }
                ,
                e.prototype.updateGraphicsTint = function(e) {
                    e._prevTint = e.tint;
                    for (var t = (e.tint >> 16 & 255) / 255, n = (e.tint >> 8 & 255) / 255, r = (255 & e.tint) / 255, i = 0; i < e.graphicsData.length; ++i) {
                        var o = e.graphicsData[i]
                          , s = 0 | o.fillColor
                          , a = 0 | o.lineColor;
                        o._fillTint = ((s >> 16 & 255) / 255 * t * 255 << 16) + ((s >> 8 & 255) / 255 * n * 255 << 8) + (255 & s) / 255 * r * 255,
                        o._lineTint = ((a >> 16 & 255) / 255 * t * 255 << 16) + ((a >> 8 & 255) / 255 * n * 255 << 8) + (255 & a) / 255 * r * 255
                    }
                }
                ,
                e.prototype.renderPolygon = function(e, t, n) {
                    n.moveTo(e[0], e[1]);
                    for (var r = 1; r < e.length / 2; ++r)
                        n.lineTo(e[2 * r], e[2 * r + 1]);
                    t && n.closePath()
                }
                ,
                e.prototype.destroy = function() {
                    this.renderer = null
                }
                ,
                e
            }();
            n.default = o,
            r.default.registerPlugin("graphics", o)
        }
        , {
            "../../const": 46,
            "../../renderers/canvas/CanvasRenderer": 77
        }],
        56: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e, t, n, r, i, o, s, a) {
                var l = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : []
                  , u = 0
                  , c = 0
                  , h = 0
                  , d = 0
                  , p = 0;
                l.push(e, t);
                for (var f = 1, g = 0; f <= 20; ++f)
                    h = (c = (u = 1 - (g = f / 20)) * u) * u,
                    p = (d = g * g) * g,
                    l.push(h * e + 3 * c * g * n + 3 * u * d * i + p * s, h * t + 3 * c * g * r + 3 * u * d * o + p * a);
                return l
            }
        }
        , {}],
        57: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("../../utils")
              , o = e("../../const")
              , s = r(e("../../renderers/webgl/utils/ObjectRenderer"))
              , a = r(e("../../renderers/webgl/WebGLRenderer"))
              , l = r(e("./WebGLGraphicsData"))
              , u = r(e("./shaders/PrimitiveShader"))
              , c = r(e("./utils/buildPoly"))
              , h = r(e("./utils/buildRectangle"))
              , d = r(e("./utils/buildRoundedRectangle"))
              , p = r(e("./utils/buildCircle"))
              , f = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.graphicsDataPool = [],
                    r.primitiveShader = null,
                    r.gl = n.gl,
                    r.CONTEXT_UID = 0,
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.onContextChange = function() {
                    this.gl = this.renderer.gl,
                    this.CONTEXT_UID = this.renderer.CONTEXT_UID,
                    this.primitiveShader = new u.default(this.gl)
                }
                ,
                t.prototype.destroy = function() {
                    s.default.prototype.destroy.call(this);
                    for (var e = 0; e < this.graphicsDataPool.length; ++e)
                        this.graphicsDataPool[e].destroy();
                    this.graphicsDataPool = null
                }
                ,
                t.prototype.render = function(e) {
                    var t = this.renderer
                      , n = t.gl
                      , r = void 0
                      , o = e._webGL[this.CONTEXT_UID];
                    o && e.dirty === o.dirty || (this.updateGraphics(e),
                    o = e._webGL[this.CONTEXT_UID]);
                    var s = this.primitiveShader;
                    t.bindShader(s),
                    t.state.setBlendMode(e.blendMode);
                    for (var a = 0, l = o.data.length; a < l; a++) {
                        var u = (r = o.data[a]).shader;
                        t.bindShader(u),
                        u.uniforms.translationMatrix = e.transform.worldTransform.toArray(!0),
                        u.uniforms.tint = (0,
                        i.hex2rgb)(e.tint),
                        u.uniforms.alpha = e.worldAlpha,
                        t.bindVao(r.vao),
                        r.nativeLines ? n.drawArrays(n.LINES, 0, r.points.length / 6) : r.vao.draw(n.TRIANGLE_STRIP, r.indices.length)
                    }
                }
                ,
                t.prototype.updateGraphics = function(e) {
                    var t = this.renderer.gl
                      , n = e._webGL[this.CONTEXT_UID];
                    if (n || (n = e._webGL[this.CONTEXT_UID] = {
                        lastIndex: 0,
                        data: [],
                        gl: t,
                        clearDirty: -1,
                        dirty: -1
                    }),
                    n.dirty = e.dirty,
                    e.clearDirty !== n.clearDirty) {
                        n.clearDirty = e.clearDirty;
                        for (var r = 0; r < n.data.length; r++)
                            this.graphicsDataPool.push(n.data[r]);
                        n.data.length = 0,
                        n.lastIndex = 0
                    }
                    for (var i = void 0, s = void 0, a = n.lastIndex; a < e.graphicsData.length; a++) {
                        var l = e.graphicsData[a];
                        i = this.getWebGLData(n, 0),
                        l.nativeLines && l.lineWidth && (s = this.getWebGLData(n, 0, !0),
                        n.lastIndex++),
                        l.type === o.SHAPES.POLY && (0,
                        c.default)(l, i, s),
                        l.type === o.SHAPES.RECT ? (0,
                        h.default)(l, i, s) : l.type === o.SHAPES.CIRC || l.type === o.SHAPES.ELIP ? (0,
                        p.default)(l, i, s) : l.type === o.SHAPES.RREC && (0,
                        d.default)(l, i, s),
                        n.lastIndex++
                    }
                    this.renderer.bindVao(null);
                    for (var u = 0; u < n.data.length; u++)
                        (i = n.data[u]).dirty && i.upload()
                }
                ,
                t.prototype.getWebGLData = function(e, t, n) {
                    var r = e.data[e.data.length - 1];
                    return (!r || r.nativeLines !== n || r.points.length > 32e4) && ((r = this.graphicsDataPool.pop() || new l.default(this.renderer.gl,this.primitiveShader,this.renderer.state.attribsState)).nativeLines = n,
                    r.reset(t),
                    e.data.push(r)),
                    r.dirty = !0,
                    r
                }
                ,
                t
            }(s.default);
            n.default = f,
            a.default.registerPlugin("graphics", f)
        }
        , {
            "../../const": 46,
            "../../renderers/webgl/WebGLRenderer": 84,
            "../../renderers/webgl/utils/ObjectRenderer": 94,
            "../../utils": 124,
            "./WebGLGraphicsData": 58,
            "./shaders/PrimitiveShader": 59,
            "./utils/buildCircle": 60,
            "./utils/buildPoly": 62,
            "./utils/buildRectangle": 63,
            "./utils/buildRoundedRectangle": 64
        }],
        58: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("pixi-gl-core"))
              , i = function() {
                function e(t, n, i) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.gl = t,
                    this.color = [0, 0, 0],
                    this.points = [],
                    this.indices = [],
                    this.buffer = r.default.GLBuffer.createVertexBuffer(t),
                    this.indexBuffer = r.default.GLBuffer.createIndexBuffer(t),
                    this.dirty = !0,
                    this.nativeLines = !1,
                    this.glPoints = null,
                    this.glIndices = null,
                    this.shader = n,
                    this.vao = new r.default.VertexArrayObject(t,i).addIndex(this.indexBuffer).addAttribute(this.buffer, n.attributes.aVertexPosition, t.FLOAT, !1, 24, 0).addAttribute(this.buffer, n.attributes.aColor, t.FLOAT, !1, 24, 8)
                }
                return e.prototype.reset = function() {
                    this.points.length = 0,
                    this.indices.length = 0
                }
                ,
                e.prototype.upload = function() {
                    this.glPoints = new Float32Array(this.points),
                    this.buffer.upload(this.glPoints),
                    this.glIndices = new Uint16Array(this.indices),
                    this.indexBuffer.upload(this.glIndices),
                    this.dirty = !1
                }
                ,
                e.prototype.destroy = function() {
                    this.color = null,
                    this.points = null,
                    this.indices = null,
                    this.vao.destroy(),
                    this.buffer.destroy(),
                    this.indexBuffer.destroy(),
                    this.gl = null,
                    this.buffer = null,
                    this.indexBuffer = null,
                    this.glPoints = null,
                    this.glIndices = null
                }
                ,
                e
            }();
            n.default = i
        }
        , {
            "pixi-gl-core": 12
        }],
        59: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                function t(n) {
                    return function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n")))
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../../../Shader")).default);
            n.default = r
        }
        , {
            "../../../Shader": 44
        }],
        60: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e, t, n) {
                var s = e.shape
                  , a = s.x
                  , l = s.y
                  , u = void 0
                  , c = void 0;
                if (e.type === i.SHAPES.CIRC ? (u = s.radius,
                c = s.radius) : (u = s.width,
                c = s.height),
                0 !== u && 0 !== c) {
                    var h = Math.floor(30 * Math.sqrt(s.radius)) || Math.floor(15 * Math.sqrt(s.width + s.height))
                      , d = 2 * Math.PI / h;
                    if (e.fill) {
                        var p = (0,
                        o.hex2rgb)(e.fillColor)
                          , f = e.fillAlpha
                          , g = p[0] * f
                          , m = p[1] * f
                          , v = p[2] * f
                          , y = t.points
                          , b = t.indices
                          , _ = y.length / 6;
                        b.push(_);
                        for (var x = 0; x < h + 1; x++)
                            y.push(a, l, g, m, v, f),
                            y.push(a + Math.sin(d * x) * u, l + Math.cos(d * x) * c, g, m, v, f),
                            b.push(_++, _++);
                        b.push(_ - 1)
                    }
                    if (e.lineWidth) {
                        var w = e.points;
                        e.points = [];
                        for (var T = 0; T < h + 1; T++)
                            e.points.push(a + Math.sin(d * T) * u, l + Math.cos(d * T) * c);
                        (0,
                        r.default)(e, t, n),
                        e.points = w
                    }
                }
            }
            ;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./buildLine"))
              , i = e("../../../const")
              , o = e("../../../utils")
        }
        , {
            "../../../const": 46,
            "../../../utils": 124,
            "./buildLine": 61
        }],
        61: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e, t, n) {
                e.nativeLines ? function(e, t) {
                    var n = 0
                      , r = e.points;
                    if (0 !== r.length) {
                        var o = t.points
                          , s = r.length / 2
                          , a = (0,
                        i.hex2rgb)(e.lineColor)
                          , l = e.lineAlpha
                          , u = a[0] * l
                          , c = a[1] * l
                          , h = a[2] * l;
                        for (n = 1; n < s; n++) {
                            var d = r[2 * (n - 1)]
                              , p = r[2 * (n - 1) + 1]
                              , f = r[2 * n]
                              , g = r[2 * n + 1];
                            o.push(d, p),
                            o.push(u, c, h, l),
                            o.push(f, g),
                            o.push(u, c, h, l)
                        }
                    }
                }(e, n) : function(e, t) {
                    var n = e.points;
                    if (0 !== n.length) {
                        var o = new r.Point(n[0],n[1])
                          , s = new r.Point(n[n.length - 2],n[n.length - 1]);
                        if (o.x === s.x && o.y === s.y) {
                            (n = n.slice()).pop(),
                            n.pop();
                            var a = (s = new r.Point(n[n.length - 2],n[n.length - 1])).x + .5 * (o.x - s.x)
                              , l = s.y + .5 * (o.y - s.y);
                            n.unshift(a, l),
                            n.push(a, l)
                        }
                        var u = t.points
                          , c = t.indices
                          , h = n.length / 2
                          , d = n.length
                          , p = u.length / 6
                          , f = e.lineWidth / 2
                          , g = (0,
                        i.hex2rgb)(e.lineColor)
                          , m = e.lineAlpha
                          , v = g[0] * m
                          , y = g[1] * m
                          , b = g[2] * m
                          , _ = n[0]
                          , x = n[1]
                          , w = n[2]
                          , T = n[3]
                          , E = 0
                          , S = 0
                          , I = -(x - T)
                          , P = _ - w
                          , M = 0
                          , A = 0
                          , O = 0
                          , C = 0
                          , R = Math.sqrt(I * I + P * P);
                        I /= R,
                        P /= R,
                        I *= f,
                        P *= f,
                        u.push(_ - I, x - P, v, y, b, m),
                        u.push(_ + I, x + P, v, y, b, m);
                        for (var D = 1; D < h - 1; ++D) {
                            _ = n[2 * (D - 1)],
                            x = n[2 * (D - 1) + 1],
                            w = n[2 * D],
                            T = n[2 * D + 1],
                            E = n[2 * (D + 1)],
                            S = n[2 * (D + 1) + 1],
                            I = -(x - T),
                            P = _ - w,
                            I /= R = Math.sqrt(I * I + P * P),
                            P /= R,
                            I *= f,
                            P *= f,
                            M = -(T - S),
                            A = w - E,
                            M /= R = Math.sqrt(M * M + A * A),
                            A /= R;
                            var k = -P + x - (-P + T)
                              , L = -I + w - (-I + _)
                              , N = (-I + _) * (-P + T) - (-I + w) * (-P + x)
                              , U = -(A *= f) + S - (-A + T)
                              , F = -(M *= f) + w - (-M + E)
                              , B = (-M + E) * (-A + T) - (-M + w) * (-A + S)
                              , j = k * F - U * L;
                            if (Math.abs(j) < .1)
                                j += 10.1,
                                u.push(w - I, T - P, v, y, b, m),
                                u.push(w + I, T + P, v, y, b, m);
                            else {
                                var G = (L * B - F * N) / j
                                  , X = (U * N - k * B) / j;
                                (G - w) * (G - w) + (X - T) * (X - T) > 196 * f * f ? (O = I - M,
                                C = P - A,
                                O /= R = Math.sqrt(O * O + C * C),
                                C /= R,
                                O *= f,
                                C *= f,
                                u.push(w - O, T - C),
                                u.push(v, y, b, m),
                                u.push(w + O, T + C),
                                u.push(v, y, b, m),
                                u.push(w - O, T - C),
                                u.push(v, y, b, m),
                                d++) : (u.push(G, X),
                                u.push(v, y, b, m),
                                u.push(w - (G - w), T - (X - T)),
                                u.push(v, y, b, m))
                            }
                        }
                        _ = n[2 * (h - 2)],
                        x = n[2 * (h - 2) + 1],
                        w = n[2 * (h - 1)],
                        I = -(x - (T = n[2 * (h - 1) + 1])),
                        P = _ - w,
                        I /= R = Math.sqrt(I * I + P * P),
                        P /= R,
                        I *= f,
                        P *= f,
                        u.push(w - I, T - P),
                        u.push(v, y, b, m),
                        u.push(w + I, T + P),
                        u.push(v, y, b, m),
                        c.push(p);
                        for (var H = 0; H < d; ++H)
                            c.push(p++);
                        c.push(p - 1)
                    }
                }(e, t)
            }
            ;
            var r = e("../../../math")
              , i = e("../../../utils")
        }
        , {
            "../../../math": 70,
            "../../../utils": 124
        }],
        62: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0,
            n.default = function(e, t, n) {
                e.points = e.shape.points.slice();
                var r = e.points;
                if (e.fill && r.length >= 6) {
                    for (var a = [], l = e.holes, u = 0; u < l.length; u++) {
                        var c = l[u];
                        a.push(r.length / 2),
                        r = r.concat(c.points)
                    }
                    var h = t.points
                      , d = t.indices
                      , p = r.length / 2
                      , f = (0,
                    o.hex2rgb)(e.fillColor)
                      , g = e.fillAlpha
                      , m = f[0] * g
                      , v = f[1] * g
                      , y = f[2] * g
                      , b = (0,
                    s.default)(r, a, 2);
                    if (!b)
                        return;
                    for (var _ = h.length / 6, x = 0; x < b.length; x += 3)
                        d.push(b[x] + _),
                        d.push(b[x] + _),
                        d.push(b[x + 1] + _),
                        d.push(b[x + 2] + _),
                        d.push(b[x + 2] + _);
                    for (var w = 0; w < p; w++)
                        h.push(r[2 * w], r[2 * w + 1], m, v, y, g)
                }
                e.lineWidth > 0 && (0,
                i.default)(e, t, n)
            }
            ;
            var i = r(e("./buildLine"))
              , o = e("../../../utils")
              , s = r(e("earcut"))
        }
        , {
            "../../../utils": 124,
            "./buildLine": 61,
            earcut: 2
        }],
        63: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e, t, n) {
                var o = e.shape
                  , s = o.x
                  , a = o.y
                  , l = o.width
                  , u = o.height;
                if (e.fill) {
                    var c = (0,
                    i.hex2rgb)(e.fillColor)
                      , h = e.fillAlpha
                      , d = c[0] * h
                      , p = c[1] * h
                      , f = c[2] * h
                      , g = t.points
                      , m = t.indices
                      , v = g.length / 6;
                    g.push(s, a),
                    g.push(d, p, f, h),
                    g.push(s + l, a),
                    g.push(d, p, f, h),
                    g.push(s, a + u),
                    g.push(d, p, f, h),
                    g.push(s + l, a + u),
                    g.push(d, p, f, h),
                    m.push(v, v, v + 1, v + 2, v + 3, v + 3)
                }
                if (e.lineWidth) {
                    var y = e.points;
                    e.points = [s, a, s + l, a, s + l, a + u, s, a + u, s, a],
                    (0,
                    r.default)(e, t, n),
                    e.points = y
                }
            }
            ;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./buildLine"))
              , i = e("../../../utils")
        }
        , {
            "../../../utils": 124,
            "./buildLine": 61
        }],
        64: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function i(e, t, n) {
                return e + (t - e) * n
            }
            function o(e, t, n, r, o, s) {
                for (var a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [], l = 0, u = 0, c = 0, h = 0, d = 0, p = 0, f = 0, g = 0; f <= 20; ++f)
                    l = i(e, n, g = f / 20),
                    u = i(t, r, g),
                    c = i(n, o, g),
                    h = i(r, s, g),
                    d = i(l, c, g),
                    p = i(u, h, g),
                    a.push(d, p);
                return a
            }
            n.__esModule = !0,
            n.default = function(e, t, n) {
                var r = e.shape
                  , i = r.x
                  , u = r.y
                  , c = r.width
                  , h = r.height
                  , d = r.radius
                  , p = [];
                if (p.push(i, u + d),
                o(i, u + h - d, i, u + h, i + d, u + h, p),
                o(i + c - d, u + h, i + c, u + h, i + c, u + h - d, p),
                o(i + c, u + d, i + c, u, i + c - d, u, p),
                o(i + d, u, i, u, i, u + d + 1e-10, p),
                e.fill) {
                    for (var f = (0,
                    l.hex2rgb)(e.fillColor), g = e.fillAlpha, m = f[0] * g, v = f[1] * g, y = f[2] * g, b = t.points, _ = t.indices, x = b.length / 6, w = (0,
                    s.default)(p, null, 2), T = 0, E = w.length; T < E; T += 3)
                        _.push(w[T] + x),
                        _.push(w[T] + x),
                        _.push(w[T + 1] + x),
                        _.push(w[T + 2] + x),
                        _.push(w[T + 2] + x);
                    for (var S = 0, I = p.length; S < I; S++)
                        b.push(p[S], p[++S], m, v, y, g)
                }
                if (e.lineWidth) {
                    var P = e.points;
                    e.points = p,
                    (0,
                    a.default)(e, t, n),
                    e.points = P
                }
            }
            ;
            var s = r(e("earcut"))
              , a = r(e("./buildLine"))
              , l = e("../../../utils")
        }
        , {
            "../../../utils": 124,
            "./buildLine": 61,
            earcut: 2
        }],
        65: [function(e, t, n) {
            function r(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0,
            n.autoDetectRenderer = n.Application = n.Filter = n.SpriteMaskFilter = n.Quad = n.RenderTarget = n.ObjectRenderer = n.WebGLManager = n.Shader = n.CanvasRenderTarget = n.TextureUvs = n.VideoBaseTexture = n.BaseRenderTexture = n.RenderTexture = n.BaseTexture = n.Texture = n.Spritesheet = n.CanvasGraphicsRenderer = n.GraphicsRenderer = n.GraphicsData = n.Graphics = n.TextMetrics = n.TextStyle = n.Text = n.SpriteRenderer = n.CanvasTinter = n.CanvasSpriteRenderer = n.Sprite = n.TransformBase = n.TransformStatic = n.Transform = n.Container = n.DisplayObject = n.Bounds = n.glCore = n.WebGLRenderer = n.CanvasRenderer = n.ticker = n.utils = n.settings = void 0;
            var o = e("./const");
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(n, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var s = e("./math");
            Object.keys(s).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(n, e, {
                    enumerable: !0,
                    get: function() {
                        return s[e]
                    }
                })
            });
            var a = e("pixi-gl-core");
            Object.defineProperty(n, "glCore", {
                enumerable: !0,
                get: function() {
                    return i(a).default
                }
            });
            var l = e("./display/Bounds");
            Object.defineProperty(n, "Bounds", {
                enumerable: !0,
                get: function() {
                    return i(l).default
                }
            });
            var u = e("./display/DisplayObject");
            Object.defineProperty(n, "DisplayObject", {
                enumerable: !0,
                get: function() {
                    return i(u).default
                }
            });
            var c = e("./display/Container");
            Object.defineProperty(n, "Container", {
                enumerable: !0,
                get: function() {
                    return i(c).default
                }
            });
            var h = e("./display/Transform");
            Object.defineProperty(n, "Transform", {
                enumerable: !0,
                get: function() {
                    return i(h).default
                }
            });
            var d = e("./display/TransformStatic");
            Object.defineProperty(n, "TransformStatic", {
                enumerable: !0,
                get: function() {
                    return i(d).default
                }
            });
            var p = e("./display/TransformBase");
            Object.defineProperty(n, "TransformBase", {
                enumerable: !0,
                get: function() {
                    return i(p).default
                }
            });
            var f = e("./sprites/Sprite");
            Object.defineProperty(n, "Sprite", {
                enumerable: !0,
                get: function() {
                    return i(f).default
                }
            });
            var g = e("./sprites/canvas/CanvasSpriteRenderer");
            Object.defineProperty(n, "CanvasSpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return i(g).default
                }
            });
            var m = e("./sprites/canvas/CanvasTinter");
            Object.defineProperty(n, "CanvasTinter", {
                enumerable: !0,
                get: function() {
                    return i(m).default
                }
            });
            var v = e("./sprites/webgl/SpriteRenderer");
            Object.defineProperty(n, "SpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return i(v).default
                }
            });
            var y = e("./text/Text");
            Object.defineProperty(n, "Text", {
                enumerable: !0,
                get: function() {
                    return i(y).default
                }
            });
            var b = e("./text/TextStyle");
            Object.defineProperty(n, "TextStyle", {
                enumerable: !0,
                get: function() {
                    return i(b).default
                }
            });
            var _ = e("./text/TextMetrics");
            Object.defineProperty(n, "TextMetrics", {
                enumerable: !0,
                get: function() {
                    return i(_).default
                }
            });
            var x = e("./graphics/Graphics");
            Object.defineProperty(n, "Graphics", {
                enumerable: !0,
                get: function() {
                    return i(x).default
                }
            });
            var w = e("./graphics/GraphicsData");
            Object.defineProperty(n, "GraphicsData", {
                enumerable: !0,
                get: function() {
                    return i(w).default
                }
            });
            var T = e("./graphics/webgl/GraphicsRenderer");
            Object.defineProperty(n, "GraphicsRenderer", {
                enumerable: !0,
                get: function() {
                    return i(T).default
                }
            });
            var E = e("./graphics/canvas/CanvasGraphicsRenderer");
            Object.defineProperty(n, "CanvasGraphicsRenderer", {
                enumerable: !0,
                get: function() {
                    return i(E).default
                }
            });
            var S = e("./textures/Spritesheet");
            Object.defineProperty(n, "Spritesheet", {
                enumerable: !0,
                get: function() {
                    return i(S).default
                }
            });
            var I = e("./textures/Texture");
            Object.defineProperty(n, "Texture", {
                enumerable: !0,
                get: function() {
                    return i(I).default
                }
            });
            var P = e("./textures/BaseTexture");
            Object.defineProperty(n, "BaseTexture", {
                enumerable: !0,
                get: function() {
                    return i(P).default
                }
            });
            var M = e("./textures/RenderTexture");
            Object.defineProperty(n, "RenderTexture", {
                enumerable: !0,
                get: function() {
                    return i(M).default
                }
            });
            var A = e("./textures/BaseRenderTexture");
            Object.defineProperty(n, "BaseRenderTexture", {
                enumerable: !0,
                get: function() {
                    return i(A).default
                }
            });
            var O = e("./textures/VideoBaseTexture");
            Object.defineProperty(n, "VideoBaseTexture", {
                enumerable: !0,
                get: function() {
                    return i(O).default
                }
            });
            var C = e("./textures/TextureUvs");
            Object.defineProperty(n, "TextureUvs", {
                enumerable: !0,
                get: function() {
                    return i(C).default
                }
            });
            var R = e("./renderers/canvas/utils/CanvasRenderTarget");
            Object.defineProperty(n, "CanvasRenderTarget", {
                enumerable: !0,
                get: function() {
                    return i(R).default
                }
            });
            var D = e("./Shader");
            Object.defineProperty(n, "Shader", {
                enumerable: !0,
                get: function() {
                    return i(D).default
                }
            });
            var k = e("./renderers/webgl/managers/WebGLManager");
            Object.defineProperty(n, "WebGLManager", {
                enumerable: !0,
                get: function() {
                    return i(k).default
                }
            });
            var L = e("./renderers/webgl/utils/ObjectRenderer");
            Object.defineProperty(n, "ObjectRenderer", {
                enumerable: !0,
                get: function() {
                    return i(L).default
                }
            });
            var N = e("./renderers/webgl/utils/RenderTarget");
            Object.defineProperty(n, "RenderTarget", {
                enumerable: !0,
                get: function() {
                    return i(N).default
                }
            });
            var U = e("./renderers/webgl/utils/Quad");
            Object.defineProperty(n, "Quad", {
                enumerable: !0,
                get: function() {
                    return i(U).default
                }
            });
            var F = e("./renderers/webgl/filters/spriteMask/SpriteMaskFilter");
            Object.defineProperty(n, "SpriteMaskFilter", {
                enumerable: !0,
                get: function() {
                    return i(F).default
                }
            });
            var B = e("./renderers/webgl/filters/Filter");
            Object.defineProperty(n, "Filter", {
                enumerable: !0,
                get: function() {
                    return i(B).default
                }
            });
            var j = e("./Application");
            Object.defineProperty(n, "Application", {
                enumerable: !0,
                get: function() {
                    return i(j).default
                }
            });
            var G = e("./autoDetectRenderer");
            Object.defineProperty(n, "autoDetectRenderer", {
                enumerable: !0,
                get: function() {
                    return G.autoDetectRenderer
                }
            });
            var X = r(e("./utils"))
              , H = r(e("./ticker"))
              , Y = i(e("./settings"))
              , W = i(e("./renderers/canvas/CanvasRenderer"))
              , V = i(e("./renderers/webgl/WebGLRenderer"));
            n.settings = Y.default,
            n.utils = X,
            n.ticker = H,
            n.CanvasRenderer = W.default,
            n.WebGLRenderer = V.default
        }
        , {
            "./Application": 43,
            "./Shader": 44,
            "./autoDetectRenderer": 45,
            "./const": 46,
            "./display/Bounds": 47,
            "./display/Container": 48,
            "./display/DisplayObject": 49,
            "./display/Transform": 50,
            "./display/TransformBase": 51,
            "./display/TransformStatic": 52,
            "./graphics/Graphics": 53,
            "./graphics/GraphicsData": 54,
            "./graphics/canvas/CanvasGraphicsRenderer": 55,
            "./graphics/webgl/GraphicsRenderer": 57,
            "./math": 70,
            "./renderers/canvas/CanvasRenderer": 77,
            "./renderers/canvas/utils/CanvasRenderTarget": 79,
            "./renderers/webgl/WebGLRenderer": 84,
            "./renderers/webgl/filters/Filter": 86,
            "./renderers/webgl/filters/spriteMask/SpriteMaskFilter": 89,
            "./renderers/webgl/managers/WebGLManager": 93,
            "./renderers/webgl/utils/ObjectRenderer": 94,
            "./renderers/webgl/utils/Quad": 95,
            "./renderers/webgl/utils/RenderTarget": 96,
            "./settings": 101,
            "./sprites/Sprite": 102,
            "./sprites/canvas/CanvasSpriteRenderer": 103,
            "./sprites/canvas/CanvasTinter": 104,
            "./sprites/webgl/SpriteRenderer": 106,
            "./text/Text": 108,
            "./text/TextMetrics": 109,
            "./text/TextStyle": 110,
            "./textures/BaseRenderTexture": 111,
            "./textures/BaseTexture": 112,
            "./textures/RenderTexture": 113,
            "./textures/Spritesheet": 114,
            "./textures/Texture": 115,
            "./textures/TextureUvs": 116,
            "./textures/VideoBaseTexture": 117,
            "./ticker": 120,
            "./utils": 124,
            "pixi-gl-core": 12
        }],
        66: [function(e, t, n) {
            function r(e) {
                return e < 0 ? -1 : e > 0 ? 1 : 0
            }
            n.__esModule = !0;
            var i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./Matrix"))
              , o = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1]
              , s = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1]
              , a = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1]
              , l = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1]
              , u = []
              , c = [];
            !function() {
                for (var e = 0; e < 16; e++) {
                    var t = [];
                    c.push(t);
                    for (var n = 0; n < 16; n++)
                        for (var h = r(o[e] * o[n] + a[e] * s[n]), d = r(s[e] * o[n] + l[e] * s[n]), p = r(o[e] * a[n] + a[e] * l[n]), f = r(s[e] * a[n] + l[e] * l[n]), g = 0; g < 16; g++)
                            if (o[g] === h && s[g] === d && a[g] === p && l[g] === f) {
                                t.push(g);
                                break
                            }
                }
                for (var m = 0; m < 16; m++) {
                    var v = new i.default;
                    v.set(o[m], s[m], a[m], l[m], 0, 0),
                    u.push(v)
                }
            }();
            var h = {
                E: 0,
                SE: 1,
                S: 2,
                SW: 3,
                W: 4,
                NW: 5,
                N: 6,
                NE: 7,
                MIRROR_VERTICAL: 8,
                MIRROR_HORIZONTAL: 12,
                uX: function(e) {
                    return o[e]
                },
                uY: function(e) {
                    return s[e]
                },
                vX: function(e) {
                    return a[e]
                },
                vY: function(e) {
                    return l[e]
                },
                inv: function(e) {
                    return 8 & e ? 15 & e : 7 & -e
                },
                add: function(e, t) {
                    return c[e][t]
                },
                sub: function(e, t) {
                    return c[e][h.inv(t)]
                },
                rotate180: function(e) {
                    return 4 ^ e
                },
                isSwapWidthHeight: function(e) {
                    return 2 == (3 & e)
                },
                byDirection: function(e, t) {
                    return 2 * Math.abs(e) <= Math.abs(t) ? t >= 0 ? h.S : h.N : 2 * Math.abs(t) <= Math.abs(e) ? e > 0 ? h.E : h.W : t > 0 ? e > 0 ? h.SE : h.SW : e > 0 ? h.NE : h.NW
                },
                matrixAppendRotationInv: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                      , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                      , i = u[h.inv(t)];
                    i.tx = n,
                    i.ty = r,
                    e.append(i)
                }
            };
            n.default = h
        }
        , {
            "./Matrix": 67
        }],
        67: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./Point"))
              , o = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                      , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1
                      , o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0
                      , s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.a = t,
                    this.b = n,
                    this.c = r,
                    this.d = i,
                    this.tx = o,
                    this.ty = s,
                    this.array = null
                }
                return e.prototype.fromArray = function(e) {
                    this.a = e[0],
                    this.b = e[1],
                    this.c = e[3],
                    this.d = e[4],
                    this.tx = e[2],
                    this.ty = e[5]
                }
                ,
                e.prototype.set = function(e, t, n, r, i, o) {
                    return this.a = e,
                    this.b = t,
                    this.c = n,
                    this.d = r,
                    this.tx = i,
                    this.ty = o,
                    this
                }
                ,
                e.prototype.toArray = function(e, t) {
                    this.array || (this.array = new Float32Array(9));
                    var n = t || this.array;
                    return e ? (n[0] = this.a,
                    n[1] = this.b,
                    n[2] = 0,
                    n[3] = this.c,
                    n[4] = this.d,
                    n[5] = 0,
                    n[6] = this.tx,
                    n[7] = this.ty,
                    n[8] = 1) : (n[0] = this.a,
                    n[1] = this.c,
                    n[2] = this.tx,
                    n[3] = this.b,
                    n[4] = this.d,
                    n[5] = this.ty,
                    n[6] = 0,
                    n[7] = 0,
                    n[8] = 1),
                    n
                }
                ,
                e.prototype.apply = function(e, t) {
                    t = t || new i.default;
                    var n = e.x
                      , r = e.y;
                    return t.x = this.a * n + this.c * r + this.tx,
                    t.y = this.b * n + this.d * r + this.ty,
                    t
                }
                ,
                e.prototype.applyInverse = function(e, t) {
                    t = t || new i.default;
                    var n = 1 / (this.a * this.d + this.c * -this.b)
                      , r = e.x
                      , o = e.y;
                    return t.x = this.d * n * r + -this.c * n * o + (this.ty * this.c - this.tx * this.d) * n,
                    t.y = this.a * n * o + -this.b * n * r + (-this.ty * this.a + this.tx * this.b) * n,
                    t
                }
                ,
                e.prototype.translate = function(e, t) {
                    return this.tx += e,
                    this.ty += t,
                    this
                }
                ,
                e.prototype.scale = function(e, t) {
                    return this.a *= e,
                    this.d *= t,
                    this.c *= e,
                    this.b *= t,
                    this.tx *= e,
                    this.ty *= t,
                    this
                }
                ,
                e.prototype.rotate = function(e) {
                    var t = Math.cos(e)
                      , n = Math.sin(e)
                      , r = this.a
                      , i = this.c
                      , o = this.tx;
                    return this.a = r * t - this.b * n,
                    this.b = r * n + this.b * t,
                    this.c = i * t - this.d * n,
                    this.d = i * n + this.d * t,
                    this.tx = o * t - this.ty * n,
                    this.ty = o * n + this.ty * t,
                    this
                }
                ,
                e.prototype.append = function(e) {
                    var t = this.a
                      , n = this.b
                      , r = this.c
                      , i = this.d;
                    return this.a = e.a * t + e.b * r,
                    this.b = e.a * n + e.b * i,
                    this.c = e.c * t + e.d * r,
                    this.d = e.c * n + e.d * i,
                    this.tx = e.tx * t + e.ty * r + this.tx,
                    this.ty = e.tx * n + e.ty * i + this.ty,
                    this
                }
                ,
                e.prototype.setTransform = function(e, t, n, r, i, o, s, a, l) {
                    var u = Math.sin(s)
                      , c = Math.cos(s)
                      , h = Math.cos(l)
                      , d = Math.sin(l)
                      , p = -Math.sin(a)
                      , f = Math.cos(a)
                      , g = c * i
                      , m = u * i
                      , v = -u * o
                      , y = c * o;
                    return this.a = h * g + d * v,
                    this.b = h * m + d * y,
                    this.c = p * g + f * v,
                    this.d = p * m + f * y,
                    this.tx = e + (n * g + r * v),
                    this.ty = t + (n * m + r * y),
                    this
                }
                ,
                e.prototype.prepend = function(e) {
                    var t = this.tx;
                    if (1 !== e.a || 0 !== e.b || 0 !== e.c || 1 !== e.d) {
                        var n = this.a
                          , r = this.c;
                        this.a = n * e.a + this.b * e.c,
                        this.b = n * e.b + this.b * e.d,
                        this.c = r * e.a + this.d * e.c,
                        this.d = r * e.b + this.d * e.d
                    }
                    return this.tx = t * e.a + this.ty * e.c + e.tx,
                    this.ty = t * e.b + this.ty * e.d + e.ty,
                    this
                }
                ,
                e.prototype.decompose = function(e) {
                    var t = this.a
                      , n = this.b
                      , r = this.c
                      , i = this.d
                      , o = -Math.atan2(-r, i)
                      , s = Math.atan2(n, t);
                    return Math.abs(o + s) < 1e-5 ? (e.rotation = s,
                    t < 0 && i >= 0 && (e.rotation += e.rotation <= 0 ? Math.PI : -Math.PI),
                    e.skew.x = e.skew.y = 0) : (e.skew.x = o,
                    e.skew.y = s),
                    e.scale.x = Math.sqrt(t * t + n * n),
                    e.scale.y = Math.sqrt(r * r + i * i),
                    e.position.x = this.tx,
                    e.position.y = this.ty,
                    e
                }
                ,
                e.prototype.invert = function() {
                    var e = this.a
                      , t = this.b
                      , n = this.c
                      , r = this.d
                      , i = this.tx
                      , o = e * r - t * n;
                    return this.a = r / o,
                    this.b = -t / o,
                    this.c = -n / o,
                    this.d = e / o,
                    this.tx = (n * this.ty - r * i) / o,
                    this.ty = -(e * this.ty - t * i) / o,
                    this
                }
                ,
                e.prototype.identity = function() {
                    return this.a = 1,
                    this.b = 0,
                    this.c = 0,
                    this.d = 1,
                    this.tx = 0,
                    this.ty = 0,
                    this
                }
                ,
                e.prototype.clone = function() {
                    var t = new e;
                    return t.a = this.a,
                    t.b = this.b,
                    t.c = this.c,
                    t.d = this.d,
                    t.tx = this.tx,
                    t.ty = this.ty,
                    t
                }
                ,
                e.prototype.copy = function(e) {
                    return e.a = this.a,
                    e.b = this.b,
                    e.c = this.c,
                    e.d = this.d,
                    e.tx = this.tx,
                    e.ty = this.ty,
                    e
                }
                ,
                r(e, null, [{
                    key: "IDENTITY",
                    get: function() {
                        return new e
                    }
                }, {
                    key: "TEMP_MATRIX",
                    get: function() {
                        return new e
                    }
                }]),
                e
            }();
            n.default = o
        }
        , {
            "./Point": 69
        }],
        68: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function() {
                function e(t, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                      , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this._x = r,
                    this._y = i,
                    this.cb = t,
                    this.scope = n
                }
                return e.prototype.set = function(e, t) {
                    var n = e || 0
                      , r = t || (0 !== t ? n : 0);
                    this._x === n && this._y === r || (this._x = n,
                    this._y = r,
                    this.cb.call(this.scope))
                }
                ,
                e.prototype.copy = function(e) {
                    this._x === e.x && this._y === e.y || (this._x = e.x,
                    this._y = e.y,
                    this.cb.call(this.scope))
                }
                ,
                r(e, [{
                    key: "x",
                    get: function() {
                        return this._x
                    },
                    set: function(e) {
                        this._x !== e && (this._x = e,
                        this.cb.call(this.scope))
                    }
                }, {
                    key: "y",
                    get: function() {
                        return this._y
                    },
                    set: function(e) {
                        this._y !== e && (this._y = e,
                        this.cb.call(this.scope))
                    }
                }]),
                e
            }();
            n.default = i
        }
        , {}],
        69: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.x = t,
                    this.y = n
                }
                return e.prototype.clone = function() {
                    return new e(this.x,this.y)
                }
                ,
                e.prototype.copy = function(e) {
                    this.set(e.x, e.y)
                }
                ,
                e.prototype.equals = function(e) {
                    return e.x === this.x && e.y === this.y
                }
                ,
                e.prototype.set = function(e, t) {
                    this.x = e || 0,
                    this.y = t || (0 !== t ? this.x : 0)
                }
                ,
                e
            }();
            n.default = r
        }
        , {}],
        70: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("./Point");
            Object.defineProperty(n, "Point", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./ObservablePoint");
            Object.defineProperty(n, "ObservablePoint", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            });
            var s = e("./Matrix");
            Object.defineProperty(n, "Matrix", {
                enumerable: !0,
                get: function() {
                    return r(s).default
                }
            });
            var a = e("./GroupD8");
            Object.defineProperty(n, "GroupD8", {
                enumerable: !0,
                get: function() {
                    return r(a).default
                }
            });
            var l = e("./shapes/Circle");
            Object.defineProperty(n, "Circle", {
                enumerable: !0,
                get: function() {
                    return r(l).default
                }
            });
            var u = e("./shapes/Ellipse");
            Object.defineProperty(n, "Ellipse", {
                enumerable: !0,
                get: function() {
                    return r(u).default
                }
            });
            var c = e("./shapes/Polygon");
            Object.defineProperty(n, "Polygon", {
                enumerable: !0,
                get: function() {
                    return r(c).default
                }
            });
            var h = e("./shapes/Rectangle");
            Object.defineProperty(n, "Rectangle", {
                enumerable: !0,
                get: function() {
                    return r(h).default
                }
            });
            var d = e("./shapes/RoundedRectangle");
            Object.defineProperty(n, "RoundedRectangle", {
                enumerable: !0,
                get: function() {
                    return r(d).default
                }
            })
        }
        , {
            "./GroupD8": 66,
            "./Matrix": 67,
            "./ObservablePoint": 68,
            "./Point": 69,
            "./shapes/Circle": 71,
            "./shapes/Ellipse": 72,
            "./shapes/Polygon": 73,
            "./shapes/Rectangle": 74,
            "./shapes/RoundedRectangle": 75
        }],
        71: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./Rectangle"))
              , i = e("../../const")
              , o = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.x = t,
                    this.y = n,
                    this.radius = r,
                    this.type = i.SHAPES.CIRC
                }
                return e.prototype.clone = function() {
                    return new e(this.x,this.y,this.radius)
                }
                ,
                e.prototype.contains = function(e, t) {
                    if (this.radius <= 0)
                        return !1;
                    var n = this.radius * this.radius
                      , r = this.x - e
                      , i = this.y - t;
                    return r *= r,
                    i *= i,
                    r + i <= n
                }
                ,
                e.prototype.getBounds = function() {
                    return new r.default(this.x - this.radius,this.y - this.radius,2 * this.radius,2 * this.radius)
                }
                ,
                e
            }();
            n.default = o
        }
        , {
            "../../const": 46,
            "./Rectangle": 74
        }],
        72: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./Rectangle"))
              , i = e("../../const")
              , o = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                      , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.x = t,
                    this.y = n,
                    this.width = r,
                    this.height = o,
                    this.type = i.SHAPES.ELIP
                }
                return e.prototype.clone = function() {
                    return new e(this.x,this.y,this.width,this.height)
                }
                ,
                e.prototype.contains = function(e, t) {
                    if (this.width <= 0 || this.height <= 0)
                        return !1;
                    var n = (e - this.x) / this.width
                      , r = (t - this.y) / this.height;
                    return n *= n,
                    r *= r,
                    n + r <= 1
                }
                ,
                e.prototype.getBounds = function() {
                    return new r.default(this.x - this.width,this.y - this.height,this.width,this.height)
                }
                ,
                e
            }();
            n.default = o
        }
        , {
            "../../const": 46,
            "./Rectangle": 74
        }],
        73: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../Point"))
              , i = e("../../const")
              , o = function() {
                function e() {
                    for (var t = arguments.length, n = Array(t), o = 0; o < t; o++)
                        n[o] = arguments[o];
                    if (function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    Array.isArray(n[0]) && (n = n[0]),
                    n[0]instanceof r.default) {
                        for (var s = [], a = 0, l = n.length; a < l; a++)
                            s.push(n[a].x, n[a].y);
                        n = s
                    }
                    this.closed = !0,
                    this.points = n,
                    this.type = i.SHAPES.POLY
                }
                return e.prototype.clone = function() {
                    return new e(this.points.slice())
                }
                ,
                e.prototype.close = function() {
                    var e = this.points;
                    e[0] === e[e.length - 2] && e[1] === e[e.length - 1] || e.push(e[0], e[1])
                }
                ,
                e.prototype.contains = function(e, t) {
                    for (var n = !1, r = this.points.length / 2, i = 0, o = r - 1; i < r; o = i++) {
                        var s = this.points[2 * i]
                          , a = this.points[2 * i + 1]
                          , l = this.points[2 * o]
                          , u = this.points[2 * o + 1];
                        a > t != u > t && e < (t - a) / (u - a) * (l - s) + s && (n = !n)
                    }
                    return n
                }
                ,
                e
            }();
            n.default = o
        }
        , {
            "../../const": 46,
            "../Point": 69
        }],
        74: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = e("../../const")
              , o = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                      , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.x = Number(t),
                    this.y = Number(n),
                    this.width = Number(r),
                    this.height = Number(o),
                    this.type = i.SHAPES.RECT
                }
                return e.prototype.clone = function() {
                    return new e(this.x,this.y,this.width,this.height)
                }
                ,
                e.prototype.copy = function(e) {
                    return this.x = e.x,
                    this.y = e.y,
                    this.width = e.width,
                    this.height = e.height,
                    this
                }
                ,
                e.prototype.contains = function(e, t) {
                    return !(this.width <= 0 || this.height <= 0) && (e >= this.x && e < this.x + this.width && t >= this.y && t < this.y + this.height)
                }
                ,
                e.prototype.pad = function(e, t) {
                    e = e || 0,
                    t = t || (0 !== t ? e : 0),
                    this.x -= e,
                    this.y -= t,
                    this.width += 2 * e,
                    this.height += 2 * t
                }
                ,
                e.prototype.fit = function(e) {
                    this.x < e.x && (this.width += this.x,
                    this.width < 0 && (this.width = 0),
                    this.x = e.x),
                    this.y < e.y && (this.height += this.y,
                    this.height < 0 && (this.height = 0),
                    this.y = e.y),
                    this.x + this.width > e.x + e.width && (this.width = e.width - this.x,
                    this.width < 0 && (this.width = 0)),
                    this.y + this.height > e.y + e.height && (this.height = e.height - this.y,
                    this.height < 0 && (this.height = 0))
                }
                ,
                e.prototype.enlarge = function(e) {
                    var t = Math.min(this.x, e.x)
                      , n = Math.max(this.x + this.width, e.x + e.width)
                      , r = Math.min(this.y, e.y)
                      , i = Math.max(this.y + this.height, e.y + e.height);
                    this.x = t,
                    this.width = n - t,
                    this.y = r,
                    this.height = i - r
                }
                ,
                r(e, [{
                    key: "left",
                    get: function() {
                        return this.x
                    }
                }, {
                    key: "right",
                    get: function() {
                        return this.x + this.width
                    }
                }, {
                    key: "top",
                    get: function() {
                        return this.y
                    }
                }, {
                    key: "bottom",
                    get: function() {
                        return this.y + this.height
                    }
                }], [{
                    key: "EMPTY",
                    get: function() {
                        return new e(0,0,0,0)
                    }
                }]),
                e
            }();
            n.default = o
        }
        , {
            "../../const": 46
        }],
        75: [function(e, t, n) {
            n.__esModule = !0;
            var r = e("../../const")
              , i = function() {
                function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                      , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                      , s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 20;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.x = t,
                    this.y = n,
                    this.width = i,
                    this.height = o,
                    this.radius = s,
                    this.type = r.SHAPES.RREC
                }
                return e.prototype.clone = function() {
                    return new e(this.x,this.y,this.width,this.height,this.radius)
                }
                ,
                e.prototype.contains = function(e, t) {
                    if (this.width <= 0 || this.height <= 0)
                        return !1;
                    if (e >= this.x && e <= this.x + this.width && t >= this.y && t <= this.y + this.height) {
                        if (t >= this.y + this.radius && t <= this.y + this.height - this.radius || e >= this.x + this.radius && e <= this.x + this.width - this.radius)
                            return !0;
                        var n = e - (this.x + this.radius)
                          , r = t - (this.y + this.radius)
                          , i = this.radius * this.radius;
                        if (n * n + r * r <= i)
                            return !0;
                        if ((n = e - (this.x + this.width - this.radius)) * n + r * r <= i)
                            return !0;
                        if (r = t - (this.y + this.height - this.radius),
                        n * n + r * r <= i)
                            return !0;
                        if ((n = e - (this.x + this.radius)) * n + r * r <= i)
                            return !0
                    }
                    return !1
                }
                ,
                e
            }();
            n.default = i
        }
        , {
            "../../const": 46
        }],
        76: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = e("../utils")
              , s = e("../math")
              , a = e("../const")
              , l = r(e("../settings"))
              , u = r(e("../display/Container"))
              , c = r(e("../textures/RenderTexture"))
              , h = r(e("eventemitter3"))
              , d = new s.Matrix
              , p = function(e) {
                function t(n, r, i, c) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var h = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return (0,
                    o.sayHello)(n),
                    "number" == typeof r && (r = Object.assign({
                        width: r,
                        height: i || l.default.RENDER_OPTIONS.height
                    }, c)),
                    r = Object.assign({}, l.default.RENDER_OPTIONS, r),
                    h.options = r,
                    h.type = a.RENDERER_TYPE.UNKNOWN,
                    h.screen = new s.Rectangle(0,0,r.width,r.height),
                    h.view = r.view || document.createElement("canvas"),
                    h.resolution = r.resolution || l.default.RESOLUTION,
                    h.transparent = r.transparent,
                    h.autoResize = r.autoResize || !1,
                    h.blendModes = null,
                    h.preserveDrawingBuffer = r.preserveDrawingBuffer,
                    h.clearBeforeRender = r.clearBeforeRender,
                    h.roundPixels = r.roundPixels,
                    h._backgroundColor = 0,
                    h._backgroundColorRgba = [0, 0, 0, 0],
                    h._backgroundColorString = "#000000",
                    h.backgroundColor = r.backgroundColor || h._backgroundColor,
                    h._tempDisplayObjectParent = new u.default,
                    h._lastObjectRendered = h._tempDisplayObjectParent,
                    h
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.resize = function(e, t) {
                    this.screen.width = e,
                    this.screen.height = t,
                    this.view.width = e * this.resolution,
                    this.view.height = t * this.resolution,
                    this.autoResize && (this.view.style.width = e + "px",
                    this.view.style.height = t + "px")
                }
                ,
                t.prototype.generateTexture = function(e, t, n) {
                    var r = e.getLocalBounds()
                      , i = c.default.create(0 | r.width, 0 | r.height, t, n);
                    return d.tx = -r.x,
                    d.ty = -r.y,
                    this.render(e, i, !1, d, !0),
                    i
                }
                ,
                t.prototype.destroy = function(e) {
                    e && this.view.parentNode && this.view.parentNode.removeChild(this.view),
                    this.type = a.RENDERER_TYPE.UNKNOWN,
                    this.view = null,
                    this.screen = null,
                    this.resolution = 0,
                    this.transparent = !1,
                    this.autoResize = !1,
                    this.blendModes = null,
                    this.options = null,
                    this.preserveDrawingBuffer = !1,
                    this.clearBeforeRender = !1,
                    this.roundPixels = !1,
                    this._backgroundColor = 0,
                    this._backgroundColorRgba = null,
                    this._backgroundColorString = null,
                    this._tempDisplayObjectParent = null,
                    this._lastObjectRendered = null
                }
                ,
                i(t, [{
                    key: "width",
                    get: function() {
                        return this.view.width
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.view.height
                    }
                }, {
                    key: "backgroundColor",
                    get: function() {
                        return this._backgroundColor
                    },
                    set: function(e) {
                        this._backgroundColor = e,
                        this._backgroundColorString = (0,
                        o.hex2string)(e),
                        (0,
                        o.hex2rgb)(e, this._backgroundColorRgba)
                    }
                }]),
                t
            }(h.default);
            n.default = p
        }
        , {
            "../const": 46,
            "../display/Container": 48,
            "../math": 70,
            "../settings": 101,
            "../textures/RenderTexture": 113,
            "../utils": 124,
            eventemitter3: 3
        }],
        77: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("../SystemRenderer"))
              , o = r(e("./utils/CanvasMaskManager"))
              , s = r(e("./utils/CanvasRenderTarget"))
              , a = r(e("./utils/mapCanvasBlendModesToPixi"))
              , l = e("../../utils")
              , u = e("../../const")
              , c = r(e("../../settings"))
              , h = function(e) {
                function t(n, r, i) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var s = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, "Canvas", n, r, i));
                    return s.type = u.RENDERER_TYPE.CANVAS,
                    s.rootContext = s.view.getContext("2d", {
                        alpha: s.transparent
                    }),
                    s.context = s.rootContext,
                    s.refresh = !0,
                    s.maskManager = new o.default(s),
                    s.smoothProperty = "imageSmoothingEnabled",
                    s.rootContext.imageSmoothingEnabled || (s.rootContext.webkitImageSmoothingEnabled ? s.smoothProperty = "webkitImageSmoothingEnabled" : s.rootContext.mozImageSmoothingEnabled ? s.smoothProperty = "mozImageSmoothingEnabled" : s.rootContext.oImageSmoothingEnabled ? s.smoothProperty = "oImageSmoothingEnabled" : s.rootContext.msImageSmoothingEnabled && (s.smoothProperty = "msImageSmoothingEnabled")),
                    s.initPlugins(),
                    s.blendModes = (0,
                    a.default)(),
                    s._activeBlendMode = null,
                    s.renderingToScreen = !1,
                    s.resize(s.options.width, s.options.height),
                    s
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.render = function(e, t, n, r, i) {
                    if (this.view) {
                        this.renderingToScreen = !t,
                        this.emit("prerender");
                        var o = this.resolution;
                        t ? ((t = t.baseTexture || t)._canvasRenderTarget || (t._canvasRenderTarget = new s.default(t.width,t.height,t.resolution),
                        t.source = t._canvasRenderTarget.canvas,
                        t.valid = !0),
                        this.context = t._canvasRenderTarget.context,
                        this.resolution = t._canvasRenderTarget.resolution) : this.context = this.rootContext;
                        var a = this.context;
                        if (t || (this._lastObjectRendered = e),
                        !i) {
                            var l = e.parent
                              , c = this._tempDisplayObjectParent.transform.worldTransform;
                            r ? (r.copy(c),
                            this._tempDisplayObjectParent.transform._worldID = -1) : c.identity(),
                            e.parent = this._tempDisplayObjectParent,
                            e.updateTransform(),
                            e.parent = l
                        }
                        a.setTransform(1, 0, 0, 1, 0, 0),
                        a.globalAlpha = 1,
                        this._activeBlendMode = u.BLEND_MODES.NORMAL,
                        a.globalCompositeOperation = this.blendModes[u.BLEND_MODES.NORMAL],
                        navigator.isCocoonJS && this.view.screencanvas && (a.fillStyle = "black",
                        a.clear()),
                        (void 0 !== n ? n : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? a.clearRect(0, 0, this.width, this.height) : (a.fillStyle = this._backgroundColorString,
                        a.fillRect(0, 0, this.width, this.height)));
                        var h = this.context;
                        this.context = a,
                        e.renderCanvas(this),
                        this.context = h,
                        this.resolution = o,
                        this.emit("postrender")
                    }
                }
                ,
                t.prototype.clear = function(e) {
                    var t = this.context;
                    e = e || this._backgroundColorString,
                    !this.transparent && e ? (t.fillStyle = e,
                    t.fillRect(0, 0, this.width, this.height)) : t.clearRect(0, 0, this.width, this.height)
                }
                ,
                t.prototype.setBlendMode = function(e) {
                    this._activeBlendMode !== e && (this._activeBlendMode = e,
                    this.context.globalCompositeOperation = this.blendModes[e])
                }
                ,
                t.prototype.destroy = function(t) {
                    this.destroyPlugins(),
                    e.prototype.destroy.call(this, t),
                    this.context = null,
                    this.refresh = !0,
                    this.maskManager.destroy(),
                    this.maskManager = null,
                    this.smoothProperty = null
                }
                ,
                t.prototype.resize = function(t, n) {
                    e.prototype.resize.call(this, t, n),
                    this.smoothProperty && (this.rootContext[this.smoothProperty] = c.default.SCALE_MODE === u.SCALE_MODES.LINEAR)
                }
                ,
                t.prototype.invalidateBlendMode = function() {
                    this._activeBlendMode = this.blendModes.indexOf(this.context.globalCompositeOperation)
                }
                ,
                t
            }(i.default);
            n.default = h,
            l.pluginTarget.mixin(h)
        }
        , {
            "../../const": 46,
            "../../settings": 101,
            "../../utils": 124,
            "../SystemRenderer": 76,
            "./utils/CanvasMaskManager": 78,
            "./utils/CanvasRenderTarget": 79,
            "./utils/mapCanvasBlendModesToPixi": 81
        }],
        78: [function(e, t, n) {
            n.__esModule = !0;
            var r = e("../../../const")
              , i = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t
                }
                return e.prototype.pushMask = function(e) {
                    var t = this.renderer;
                    t.context.save();
                    var n = e.alpha
                      , r = e.transform.worldTransform
                      , i = t.resolution;
                    t.context.setTransform(r.a * i, r.b * i, r.c * i, r.d * i, r.tx * i, r.ty * i),
                    e._texture || (this.renderGraphicsShape(e),
                    t.context.clip()),
                    e.worldAlpha = n
                }
                ,
                e.prototype.renderGraphicsShape = function(e) {
                    var t = this.renderer.context
                      , n = e.graphicsData.length;
                    if (0 !== n) {
                        t.beginPath();
                        for (var i = 0; i < n; i++) {
                            var o = e.graphicsData[i]
                              , s = o.shape;
                            if (o.type === r.SHAPES.POLY) {
                                var a = s.points;
                                t.moveTo(a[0], a[1]);
                                for (var l = 1; l < a.length / 2; l++)
                                    t.lineTo(a[2 * l], a[2 * l + 1]);
                                a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && t.closePath()
                            } else if (o.type === r.SHAPES.RECT)
                                t.rect(s.x, s.y, s.width, s.height),
                                t.closePath();
                            else if (o.type === r.SHAPES.CIRC)
                                t.arc(s.x, s.y, s.radius, 0, 2 * Math.PI),
                                t.closePath();
                            else if (o.type === r.SHAPES.ELIP) {
                                var u = 2 * s.width
                                  , c = 2 * s.height
                                  , h = s.x - u / 2
                                  , d = s.y - c / 2
                                  , p = u / 2 * .5522848
                                  , f = c / 2 * .5522848
                                  , g = h + u
                                  , m = d + c
                                  , v = h + u / 2
                                  , y = d + c / 2;
                                t.moveTo(h, y),
                                t.bezierCurveTo(h, y - f, v - p, d, v, d),
                                t.bezierCurveTo(v + p, d, g, y - f, g, y),
                                t.bezierCurveTo(g, y + f, v + p, m, v, m),
                                t.bezierCurveTo(v - p, m, h, y + f, h, y),
                                t.closePath()
                            } else if (o.type === r.SHAPES.RREC) {
                                var b = s.x
                                  , _ = s.y
                                  , x = s.width
                                  , w = s.height
                                  , T = s.radius
                                  , E = Math.min(x, w) / 2 | 0;
                                T = T > E ? E : T,
                                t.moveTo(b, _ + T),
                                t.lineTo(b, _ + w - T),
                                t.quadraticCurveTo(b, _ + w, b + T, _ + w),
                                t.lineTo(b + x - T, _ + w),
                                t.quadraticCurveTo(b + x, _ + w, b + x, _ + w - T),
                                t.lineTo(b + x, _ + T),
                                t.quadraticCurveTo(b + x, _, b + x - T, _),
                                t.lineTo(b + T, _),
                                t.quadraticCurveTo(b, _, b, _ + T),
                                t.closePath()
                            }
                        }
                    }
                }
                ,
                e.prototype.popMask = function(e) {
                    e.context.restore(),
                    e.invalidateBlendMode()
                }
                ,
                e.prototype.destroy = function() {}
                ,
                e
            }();
            n.default = i
        }
        , {
            "../../../const": 46
        }],
        79: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../../../settings"))
              , o = function() {
                function e(t, n, r) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.canvas = document.createElement("canvas"),
                    this.context = this.canvas.getContext("2d"),
                    this.resolution = r || i.default.RESOLUTION,
                    this.resize(t, n)
                }
                return e.prototype.clear = function() {
                    this.context.setTransform(1, 0, 0, 1, 0, 0),
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                }
                ,
                e.prototype.resize = function(e, t) {
                    this.canvas.width = e * this.resolution,
                    this.canvas.height = t * this.resolution
                }
                ,
                e.prototype.destroy = function() {
                    this.context = null,
                    this.canvas = null
                }
                ,
                r(e, [{
                    key: "width",
                    get: function() {
                        return this.canvas.width
                    },
                    set: function(e) {
                        this.canvas.width = e
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.canvas.height
                    },
                    set: function(e) {
                        this.canvas.height = e
                    }
                }]),
                e
            }();
            n.default = o
        }
        , {
            "../../../settings": 101
        }],
        80: [function(e, t, n) {
            function r(e) {
                var t = document.createElement("canvas");
                t.width = 6,
                t.height = 1;
                var n = t.getContext("2d");
                return n.fillStyle = e,
                n.fillRect(0, 0, 6, 1),
                t
            }
            n.__esModule = !0,
            n.default = function() {
                if ("undefined" == typeof document)
                    return !1;
                var e = r("#ff00ff")
                  , t = r("#ffff00")
                  , n = document.createElement("canvas");
                n.width = 6,
                n.height = 1;
                var i = n.getContext("2d");
                i.globalCompositeOperation = "multiply",
                i.drawImage(e, 0, 0),
                i.drawImage(t, 2, 0);
                var o = i.getImageData(2, 0, 1, 1);
                if (!o)
                    return !1;
                var s = o.data;
                return 255 === s[0] && 0 === s[1] && 0 === s[2]
            }
        }
        , {}],
        81: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return (0,
                i.default)() ? (e[r.BLEND_MODES.NORMAL] = "source-over",
                e[r.BLEND_MODES.ADD] = "lighter",
                e[r.BLEND_MODES.MULTIPLY] = "multiply",
                e[r.BLEND_MODES.SCREEN] = "screen",
                e[r.BLEND_MODES.OVERLAY] = "overlay",
                e[r.BLEND_MODES.DARKEN] = "darken",
                e[r.BLEND_MODES.LIGHTEN] = "lighten",
                e[r.BLEND_MODES.COLOR_DODGE] = "color-dodge",
                e[r.BLEND_MODES.COLOR_BURN] = "color-burn",
                e[r.BLEND_MODES.HARD_LIGHT] = "hard-light",
                e[r.BLEND_MODES.SOFT_LIGHT] = "soft-light",
                e[r.BLEND_MODES.DIFFERENCE] = "difference",
                e[r.BLEND_MODES.EXCLUSION] = "exclusion",
                e[r.BLEND_MODES.HUE] = "hue",
                e[r.BLEND_MODES.SATURATION] = "saturate",
                e[r.BLEND_MODES.COLOR] = "color",
                e[r.BLEND_MODES.LUMINOSITY] = "luminosity") : (e[r.BLEND_MODES.NORMAL] = "source-over",
                e[r.BLEND_MODES.ADD] = "lighter",
                e[r.BLEND_MODES.MULTIPLY] = "source-over",
                e[r.BLEND_MODES.SCREEN] = "source-over",
                e[r.BLEND_MODES.OVERLAY] = "source-over",
                e[r.BLEND_MODES.DARKEN] = "source-over",
                e[r.BLEND_MODES.LIGHTEN] = "source-over",
                e[r.BLEND_MODES.COLOR_DODGE] = "source-over",
                e[r.BLEND_MODES.COLOR_BURN] = "source-over",
                e[r.BLEND_MODES.HARD_LIGHT] = "source-over",
                e[r.BLEND_MODES.SOFT_LIGHT] = "source-over",
                e[r.BLEND_MODES.DIFFERENCE] = "source-over",
                e[r.BLEND_MODES.EXCLUSION] = "source-over",
                e[r.BLEND_MODES.HUE] = "source-over",
                e[r.BLEND_MODES.SATURATION] = "source-over",
                e[r.BLEND_MODES.COLOR] = "source-over",
                e[r.BLEND_MODES.LUMINOSITY] = "source-over"),
                e[r.BLEND_MODES.NORMAL_NPM] = e[r.BLEND_MODES.NORMAL],
                e[r.BLEND_MODES.ADD_NPM] = e[r.BLEND_MODES.ADD],
                e[r.BLEND_MODES.SCREEN_NPM] = e[r.BLEND_MODES.SCREEN],
                e
            }
            ;
            var r = e("../../../const")
              , i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./canUseNewCanvasBlendModes"))
        }
        , {
            "../../../const": 46,
            "./canUseNewCanvasBlendModes": 80
        }],
        82: [function(e, t, n) {
            n.__esModule = !0;
            var r = e("../../const")
              , i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../../settings"))
              , o = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t,
                    this.count = 0,
                    this.checkCount = 0,
                    this.maxIdle = i.default.GC_MAX_IDLE,
                    this.checkCountMax = i.default.GC_MAX_CHECK_COUNT,
                    this.mode = i.default.GC_MODE
                }
                return e.prototype.update = function() {
                    this.count++,
                    this.mode !== r.GC_MODES.MANUAL && (this.checkCount++,
                    this.checkCount > this.checkCountMax && (this.checkCount = 0,
                    this.run()))
                }
                ,
                e.prototype.run = function() {
                    for (var e = this.renderer.textureManager, t = e._managedTextures, n = !1, r = 0; r < t.length; r++) {
                        var i = t[r];
                        !i._glRenderTargets && this.count - i.touched > this.maxIdle && (e.destroyTexture(i, !0),
                        t[r] = null,
                        n = !0)
                    }
                    if (n) {
                        for (var o = 0, s = 0; s < t.length; s++)
                            null !== t[s] && (t[o++] = t[s]);
                        t.length = o
                    }
                }
                ,
                e.prototype.unload = function(e) {
                    var t = this.renderer.textureManager;
                    e._texture && e._texture._glRenderTargets && t.destroyTexture(e._texture, !0);
                    for (var n = e.children.length - 1; n >= 0; n--)
                        this.unload(e.children[n])
                }
                ,
                e
            }();
            n.default = o
        }
        , {
            "../../const": 46,
            "../../settings": 101
        }],
        83: [function(e, t, n) {
            n.__esModule = !0;
            var r = e("pixi-gl-core")
              , i = e("../../const")
              , o = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./utils/RenderTarget"))
              , s = e("../../utils")
              , a = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t,
                    this.gl = t.gl,
                    this._managedTextures = []
                }
                return e.prototype.bindTexture = function() {}
                ,
                e.prototype.getTexture = function() {}
                ,
                e.prototype.updateTexture = function(e, t) {
                    var n = this.gl
                      , s = !!e._glRenderTargets;
                    if (!e.hasLoaded)
                        return null;
                    var a = this.renderer.boundTextures;
                    if (void 0 === t) {
                        t = 0;
                        for (var l = 0; l < a.length; ++l)
                            if (a[l] === e) {
                                t = l;
                                break
                            }
                    }
                    a[t] = e,
                    n.activeTexture(n.TEXTURE0 + t);
                    var u = e._glTextures[this.renderer.CONTEXT_UID];
                    if (u)
                        s ? e._glRenderTargets[this.renderer.CONTEXT_UID].resize(e.width, e.height) : u.upload(e.source);
                    else {
                        if (s) {
                            var c = new o.default(this.gl,e.width,e.height,e.scaleMode,e.resolution);
                            c.resize(e.width, e.height),
                            e._glRenderTargets[this.renderer.CONTEXT_UID] = c,
                            u = c.texture
                        } else
                            (u = new r.GLTexture(this.gl,null,null,null,null)).bind(t),
                            u.premultiplyAlpha = !0,
                            u.upload(e.source);
                        e._glTextures[this.renderer.CONTEXT_UID] = u,
                        e.on("update", this.updateTexture, this),
                        e.on("dispose", this.destroyTexture, this),
                        this._managedTextures.push(e),
                        e.isPowerOfTwo ? (e.mipmap && u.enableMipmap(),
                        e.wrapMode === i.WRAP_MODES.CLAMP ? u.enableWrapClamp() : e.wrapMode === i.WRAP_MODES.REPEAT ? u.enableWrapRepeat() : u.enableWrapMirrorRepeat()) : u.enableWrapClamp(),
                        e.scaleMode === i.SCALE_MODES.NEAREST ? u.enableNearestScaling() : u.enableLinearScaling()
                    }
                    return u
                }
                ,
                e.prototype.destroyTexture = function(e, t) {
                    if ((e = e.baseTexture || e).hasLoaded) {
                        var n = this.renderer.CONTEXT_UID
                          , r = e._glTextures
                          , i = e._glRenderTargets;
                        if (r[n] && (this.renderer.unbindTexture(e),
                        r[n].destroy(),
                        e.off("update", this.updateTexture, this),
                        e.off("dispose", this.destroyTexture, this),
                        delete r[n],
                        !t)) {
                            var o = this._managedTextures.indexOf(e);
                            -1 !== o && (0,
                            s.removeItems)(this._managedTextures, o, 1)
                        }
                        i && i[n] && (i[n].destroy(),
                        delete i[n])
                    }
                }
                ,
                e.prototype.removeAll = function() {
                    for (var e = 0; e < this._managedTextures.length; ++e) {
                        var t = this._managedTextures[e];
                        t._glTextures[this.renderer.CONTEXT_UID] && delete t._glTextures[this.renderer.CONTEXT_UID]
                    }
                }
                ,
                e.prototype.destroy = function() {
                    for (var e = 0; e < this._managedTextures.length; ++e) {
                        var t = this._managedTextures[e];
                        this.destroyTexture(t, !0),
                        t.off("update", this.updateTexture, this),
                        t.off("dispose", this.destroyTexture, this)
                    }
                    this._managedTextures = null
                }
                ,
                e
            }();
            n.default = a
        }
        , {
            "../../const": 46,
            "../../utils": 124,
            "./utils/RenderTarget": 96,
            "pixi-gl-core": 12
        }],
        84: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("../SystemRenderer"))
              , o = r(e("./managers/MaskManager"))
              , s = r(e("./managers/StencilManager"))
              , a = r(e("./managers/FilterManager"))
              , l = r(e("./utils/RenderTarget"))
              , u = r(e("./utils/ObjectRenderer"))
              , c = r(e("./TextureManager"))
              , h = r(e("../../textures/BaseTexture"))
              , d = r(e("./TextureGarbageCollector"))
              , p = r(e("./WebGLState"))
              , f = r(e("./utils/mapWebGLDrawModesToPixi"))
              , g = r(e("./utils/validateContext"))
              , m = e("../../utils")
              , v = r(e("pixi-gl-core"))
              , y = e("../../const")
              , b = 0
              , _ = function(e) {
                function t(n, r, i) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var a = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, "WebGL", n, r, i));
                    return a.legacy = a.options.legacy,
                    a.legacy && (v.default.VertexArrayObject.FORCE_NATIVE = !0),
                    a.type = y.RENDERER_TYPE.WEBGL,
                    a.handleContextLost = a.handleContextLost.bind(a),
                    a.handleContextRestored = a.handleContextRestored.bind(a),
                    a.view.addEventListener("webglcontextlost", a.handleContextLost, !1),
                    a.view.addEventListener("webglcontextrestored", a.handleContextRestored, !1),
                    a._contextOptions = {
                        alpha: a.transparent,
                        antialias: a.options.antialias,
                        premultipliedAlpha: a.transparent && "notMultiplied" !== a.transparent,
                        stencil: !0,
                        preserveDrawingBuffer: a.options.preserveDrawingBuffer,
                        powerPreference: a.options.powerPreference
                    },
                    a._backgroundColorRgba[3] = a.transparent ? 0 : 1,
                    a.maskManager = new o.default(a),
                    a.stencilManager = new s.default(a),
                    a.emptyRenderer = new u.default(a),
                    a.currentRenderer = a.emptyRenderer,
                    a.textureManager = null,
                    a.filterManager = null,
                    a.initPlugins(),
                    a.options.context && (0,
                    g.default)(a.options.context),
                    a.gl = a.options.context || v.default.createContext(a.view, a._contextOptions),
                    a.CONTEXT_UID = b++,
                    a.state = new p.default(a.gl),
                    a.renderingToScreen = !0,
                    a.boundTextures = null,
                    a._activeShader = null,
                    a._activeVao = null,
                    a._activeRenderTarget = null,
                    a._initContext(),
                    a.drawModes = (0,
                    f.default)(a.gl),
                    a._nextTextureLocation = 0,
                    a.setBlendMode(0),
                    a
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype._initContext = function() {
                    var e = this.gl;
                    e.isContextLost() && e.getExtension("WEBGL_lose_context") && e.getExtension("WEBGL_lose_context").restoreContext();
                    var t = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
                    this._activeShader = null,
                    this._activeVao = null,
                    this.boundTextures = new Array(t),
                    this.emptyTextures = new Array(t),
                    this.textureManager = new c.default(this),
                    this.filterManager = new a.default(this),
                    this.textureGC = new d.default(this),
                    this.state.resetToDefault(),
                    this.rootRenderTarget = new l.default(e,this.width,this.height,null,this.resolution,!0),
                    this.rootRenderTarget.clearColor = this._backgroundColorRgba,
                    this.bindRenderTarget(this.rootRenderTarget);
                    var n = new v.default.GLTexture.fromData(e,null,1,1)
                      , r = {
                        _glTextures: {}
                    };
                    r._glTextures[this.CONTEXT_UID] = {};
                    for (var i = 0; i < t; i++) {
                        var o = new h.default;
                        o._glTextures[this.CONTEXT_UID] = n,
                        this.boundTextures[i] = r,
                        this.emptyTextures[i] = o,
                        this.bindTexture(null, i)
                    }
                    this.emit("context", e),
                    this.resize(this.screen.width, this.screen.height)
                }
                ,
                t.prototype.render = function(e, t, n, r, i) {
                    if (this.renderingToScreen = !t,
                    this.emit("prerender"),
                    this.gl && !this.gl.isContextLost()) {
                        if (this._nextTextureLocation = 0,
                        t || (this._lastObjectRendered = e),
                        !i) {
                            var o = e.parent;
                            e.parent = this._tempDisplayObjectParent,
                            e.updateTransform(),
                            e.parent = o
                        }
                        this.bindRenderTexture(t, r),
                        this.currentRenderer.start(),
                        (void 0 !== n ? n : this.clearBeforeRender) && this._activeRenderTarget.clear(),
                        e.renderWebGL(this),
                        this.currentRenderer.flush(),
                        this.textureGC.update(),
                        this.emit("postrender")
                    }
                }
                ,
                t.prototype.setObjectRenderer = function(e) {
                    this.currentRenderer !== e && (this.currentRenderer.stop(),
                    this.currentRenderer = e,
                    this.currentRenderer.start())
                }
                ,
                t.prototype.flush = function() {
                    this.setObjectRenderer(this.emptyRenderer)
                }
                ,
                t.prototype.resize = function(e, t) {
                    i.default.prototype.resize.call(this, e, t),
                    this.rootRenderTarget.resize(e, t),
                    this._activeRenderTarget === this.rootRenderTarget && (this.rootRenderTarget.activate(),
                    this._activeShader && (this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(!0)))
                }
                ,
                t.prototype.setBlendMode = function(e) {
                    this.state.setBlendMode(e)
                }
                ,
                t.prototype.clear = function(e) {
                    this._activeRenderTarget.clear(e)
                }
                ,
                t.prototype.setTransform = function(e) {
                    this._activeRenderTarget.transform = e
                }
                ,
                t.prototype.clearRenderTexture = function(e, t) {
                    var n = e.baseTexture._glRenderTargets[this.CONTEXT_UID];
                    return n && n.clear(t),
                    this
                }
                ,
                t.prototype.bindRenderTexture = function(e, t) {
                    var n = void 0;
                    if (e) {
                        var r = e.baseTexture;
                        r._glRenderTargets[this.CONTEXT_UID] || this.textureManager.updateTexture(r, 0),
                        this.unbindTexture(r),
                        (n = r._glRenderTargets[this.CONTEXT_UID]).setFrame(e.frame)
                    } else
                        n = this.rootRenderTarget;
                    return n.transform = t,
                    this.bindRenderTarget(n),
                    this
                }
                ,
                t.prototype.bindRenderTarget = function(e) {
                    return e !== this._activeRenderTarget && (this._activeRenderTarget = e,
                    e.activate(),
                    this._activeShader && (this._activeShader.uniforms.projectionMatrix = e.projectionMatrix.toArray(!0)),
                    this.stencilManager.setMaskStack(e.stencilMaskStack)),
                    this
                }
                ,
                t.prototype.bindShader = function(e, t) {
                    return this._activeShader !== e && (this._activeShader = e,
                    e.bind(),
                    !1 !== t && (e.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(!0))),
                    this
                }
                ,
                t.prototype.bindTexture = function(e, t, n) {
                    if (e = e || this.emptyTextures[t],
                    e = e.baseTexture || e,
                    e.touched = this.textureGC.count,
                    n)
                        t = t || 0;
                    else {
                        for (var r = 0; r < this.boundTextures.length; r++)
                            if (this.boundTextures[r] === e)
                                return r;
                        void 0 === t && (this._nextTextureLocation++,
                        this._nextTextureLocation %= this.boundTextures.length,
                        t = this.boundTextures.length - this._nextTextureLocation - 1)
                    }
                    var i = this.gl
                      , o = e._glTextures[this.CONTEXT_UID];
                    return o ? (this.boundTextures[t] = e,
                    i.activeTexture(i.TEXTURE0 + t),
                    i.bindTexture(i.TEXTURE_2D, o.texture)) : this.textureManager.updateTexture(e, t),
                    t
                }
                ,
                t.prototype.unbindTexture = function(e) {
                    var t = this.gl;
                    e = e.baseTexture || e;
                    for (var n = 0; n < this.boundTextures.length; n++)
                        this.boundTextures[n] === e && (this.boundTextures[n] = this.emptyTextures[n],
                        t.activeTexture(t.TEXTURE0 + n),
                        t.bindTexture(t.TEXTURE_2D, this.emptyTextures[n]._glTextures[this.CONTEXT_UID].texture));
                    return this
                }
                ,
                t.prototype.createVao = function() {
                    return new v.default.VertexArrayObject(this.gl,this.state.attribState)
                }
                ,
                t.prototype.bindVao = function(e) {
                    return this._activeVao === e ? this : (e ? e.bind() : this._activeVao && this._activeVao.unbind(),
                    this._activeVao = e,
                    this)
                }
                ,
                t.prototype.reset = function() {
                    return this.setObjectRenderer(this.emptyRenderer),
                    this._activeShader = null,
                    this._activeRenderTarget = this.rootRenderTarget,
                    this.rootRenderTarget.activate(),
                    this.state.resetToDefault(),
                    this
                }
                ,
                t.prototype.handleContextLost = function(e) {
                    e.preventDefault()
                }
                ,
                t.prototype.handleContextRestored = function() {
                    this.textureManager.removeAll(),
                    this.filterManager.destroy(!0),
                    this._initContext()
                }
                ,
                t.prototype.destroy = function(t) {
                    this.destroyPlugins(),
                    this.view.removeEventListener("webglcontextlost", this.handleContextLost),
                    this.view.removeEventListener("webglcontextrestored", this.handleContextRestored),
                    this.textureManager.destroy(),
                    e.prototype.destroy.call(this, t),
                    this.uid = 0,
                    this.maskManager.destroy(),
                    this.stencilManager.destroy(),
                    this.filterManager.destroy(),
                    this.maskManager = null,
                    this.filterManager = null,
                    this.textureManager = null,
                    this.currentRenderer = null,
                    this.handleContextLost = null,
                    this.handleContextRestored = null,
                    this._contextOptions = null,
                    this.gl.useProgram(null),
                    this.gl.getExtension("WEBGL_lose_context") && this.gl.getExtension("WEBGL_lose_context").loseContext(),
                    this.gl = null
                }
                ,
                t
            }(i.default);
            n.default = _,
            m.pluginTarget.mixin(_)
        }
        , {
            "../../const": 46,
            "../../textures/BaseTexture": 112,
            "../../utils": 124,
            "../SystemRenderer": 76,
            "./TextureGarbageCollector": 82,
            "./TextureManager": 83,
            "./WebGLState": 85,
            "./managers/FilterManager": 90,
            "./managers/MaskManager": 91,
            "./managers/StencilManager": 92,
            "./utils/ObjectRenderer": 94,
            "./utils/RenderTarget": 96,
            "./utils/mapWebGLDrawModesToPixi": 99,
            "./utils/validateContext": 100,
            "pixi-gl-core": 12
        }],
        85: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./utils/mapWebGLBlendModesToPixi"))
              , i = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.activeState = new Uint8Array(16),
                    this.defaultState = new Uint8Array(16),
                    this.defaultState[0] = 1,
                    this.stackIndex = 0,
                    this.stack = [],
                    this.gl = t,
                    this.maxAttribs = t.getParameter(t.MAX_VERTEX_ATTRIBS),
                    this.attribState = {
                        tempAttribState: new Array(this.maxAttribs),
                        attribState: new Array(this.maxAttribs)
                    },
                    this.blendModes = (0,
                    r.default)(t),
                    this.nativeVaoExtension = t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object")
                }
                return e.prototype.push = function() {
                    var e = this.stack[this.stackIndex];
                    e || (e = this.stack[this.stackIndex] = new Uint8Array(16)),
                    ++this.stackIndex;
                    for (var t = 0; t < this.activeState.length; t++)
                        e[t] = this.activeState[t]
                }
                ,
                e.prototype.pop = function() {
                    var e = this.stack[--this.stackIndex];
                    this.setState(e)
                }
                ,
                e.prototype.setState = function(e) {
                    this.setBlend(e[0]),
                    this.setDepthTest(e[1]),
                    this.setFrontFace(e[2]),
                    this.setCullFace(e[3]),
                    this.setBlendMode(e[4])
                }
                ,
                e.prototype.setBlend = function(e) {
                    e = e ? 1 : 0,
                    this.activeState[0] !== e && (this.activeState[0] = e,
                    this.gl[e ? "enable" : "disable"](this.gl.BLEND))
                }
                ,
                e.prototype.setBlendMode = function(e) {
                    if (e !== this.activeState[4]) {
                        this.activeState[4] = e;
                        var t = this.blendModes[e];
                        2 === t.length ? this.gl.blendFunc(t[0], t[1]) : this.gl.blendFuncSeparate(t[0], t[1], t[2], t[3])
                    }
                }
                ,
                e.prototype.setDepthTest = function(e) {
                    e = e ? 1 : 0,
                    this.activeState[1] !== e && (this.activeState[1] = e,
                    this.gl[e ? "enable" : "disable"](this.gl.DEPTH_TEST))
                }
                ,
                e.prototype.setCullFace = function(e) {
                    e = e ? 1 : 0,
                    this.activeState[3] !== e && (this.activeState[3] = e,
                    this.gl[e ? "enable" : "disable"](this.gl.CULL_FACE))
                }
                ,
                e.prototype.setFrontFace = function(e) {
                    e = e ? 1 : 0,
                    this.activeState[2] !== e && (this.activeState[2] = e,
                    this.gl.frontFace(this.gl[e ? "CW" : "CCW"]))
                }
                ,
                e.prototype.resetAttributes = function() {
                    for (var e = 0; e < this.attribState.tempAttribState.length; e++)
                        this.attribState.tempAttribState[e] = 0;
                    for (var t = 0; t < this.attribState.attribState.length; t++)
                        this.attribState.attribState[t] = 0;
                    for (var n = 1; n < this.maxAttribs; n++)
                        this.gl.disableVertexAttribArray(n)
                }
                ,
                e.prototype.resetToDefault = function() {
                    this.nativeVaoExtension && this.nativeVaoExtension.bindVertexArrayOES(null),
                    this.resetAttributes();
                    for (var e = 0; e < this.activeState.length; ++e)
                        this.activeState[e] = 32;
                    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1),
                    this.setState(this.defaultState)
                }
                ,
                e
            }();
            n.default = i
        }
        , {
            "./utils/mapWebGLBlendModesToPixi": 98
        }],
        86: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = r(e("./extractUniformsFromSrc"))
              , s = e("../../../utils")
              , a = e("../../../const")
              , l = r(e("../../../settings"))
              , u = {}
              , c = function() {
                function e(t, n, r) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.vertexSrc = t || e.defaultVertexSrc,
                    this.fragmentSrc = n || e.defaultFragmentSrc,
                    this._blendMode = a.BLEND_MODES.NORMAL,
                    this.uniformData = r || (0,
                    o.default)(this.vertexSrc, this.fragmentSrc, "projectionMatrix|uSampler"),
                    this.uniforms = {};
                    for (var i in this.uniformData)
                        this.uniforms[i] = this.uniformData[i].value,
                        this.uniformData[i].type && (this.uniformData[i].type = this.uniformData[i].type.toLowerCase());
                    this.glShaders = {},
                    u[this.vertexSrc + this.fragmentSrc] || (u[this.vertexSrc + this.fragmentSrc] = (0,
                    s.uid)()),
                    this.glShaderKey = u[this.vertexSrc + this.fragmentSrc],
                    this.padding = 4,
                    this.resolution = l.default.RESOLUTION,
                    this.enabled = !0,
                    this.autoFit = !0
                }
                return e.prototype.apply = function(e, t, n, r, i) {
                    e.applyFilter(this, t, n, r)
                }
                ,
                i(e, [{
                    key: "blendMode",
                    get: function() {
                        return this._blendMode
                    },
                    set: function(e) {
                        this._blendMode = e
                    }
                }], [{
                    key: "defaultVertexSrc",
                    get: function() {
                        return ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}"].join("\n")
                    }
                }, {
                    key: "defaultFragmentSrc",
                    get: function() {
                        return ["varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}"].join("\n")
                    }
                }]),
                e
            }();
            n.default = c
        }
        , {
            "../../../const": 46,
            "../../../settings": 101,
            "../../../utils": 124,
            "./extractUniformsFromSrc": 87
        }],
        87: [function(e, t, n) {
            function r(e) {
                for (var t = new RegExp("^(projectionMatrix|uSampler|filterArea|filterClamp)$"), n = {}, r = void 0, o = e.replace(/\s+/g, " ").split(/\s*;\s*/), s = 0; s < o.length; s++) {
                    var a = o[s].trim();
                    if (a.indexOf("uniform") > -1) {
                        var l = a.split(" ")
                          , u = l[1]
                          , c = l[2]
                          , h = 1;
                        c.indexOf("[") > -1 && (c = (r = c.split(/\[|]/))[0],
                        h *= Number(r[1])),
                        c.match(t) || (n[c] = {
                            value: i(u, h),
                            name: c,
                            type: u
                        })
                    }
                }
                return n
            }
            n.__esModule = !0,
            n.default = function(e, t, n) {
                var i = r(e)
                  , o = r(t);
                return Object.assign(i, o)
            }
            ;
            var i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("pixi-gl-core")).default.shader.defaultValue
        }
        , {
            "pixi-gl-core": 12
        }],
        88: [function(e, t, n) {
            n.__esModule = !0,
            n.calculateScreenSpaceMatrix = function(e, t, n) {
                var r = e.identity();
                return r.translate(t.x / n.width, t.y / n.height),
                r.scale(n.width, n.height),
                r
            }
            ,
            n.calculateNormalizedScreenSpaceMatrix = function(e, t, n) {
                var r = e.identity();
                r.translate(t.x / n.width, t.y / n.height);
                var i = n.width / t.width
                  , o = n.height / t.height;
                return r.scale(i, o),
                r
            }
            ,
            n.calculateSpriteMatrix = function(e, t, n, i) {
                var o = i._texture.baseTexture
                  , s = e.set(n.width, 0, 0, n.height, t.x, t.y)
                  , a = i.worldTransform.copy(r.Matrix.TEMP_MATRIX);
                return a.invert(),
                s.prepend(a),
                s.scale(1 / o.width, 1 / o.height),
                s.translate(i.anchor.x, i.anchor.y),
                s
            }
            ;
            var r = e("../../../math")
        }
        , {
            "../../../math": 70
        }],
        89: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../Filter"))
              , i = e("../../../../math")
              , o = (e("path"),
            function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = new i.Matrix
                      , o = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n\n    original *= (masky.r * masky.a * alpha * clip);\n\n    gl_FragColor = original;\n}\n"));
                    return n.renderable = !1,
                    o.maskSprite = n,
                    o.maskMatrix = r,
                    o
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.apply = function(e, t, n) {
                    var r = this.maskSprite;
                    this.uniforms.mask = r._texture,
                    this.uniforms.otherMatrix = e.calculateSpriteMatrix(this.maskMatrix, r),
                    this.uniforms.alpha = r.worldAlpha,
                    e.applyFilter(this, t, n)
                }
                ,
                t
            }(r.default));
            n.default = o
        }
        , {
            "../../../../math": 70,
            "../Filter": 86,
            path: 23
        }],
        90: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            n.__esModule = !0;
            var o = r(e("./WebGLManager"))
              , s = r(e("../utils/RenderTarget"))
              , a = r(e("../utils/Quad"))
              , l = e("../../../math")
              , u = r(e("../../../Shader"))
              , c = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../filters/filterTransforms"))
              , h = r(e("bit-twiddle"))
              , d = function e() {
                i(this, e),
                this.renderTarget = null,
                this.sourceFrame = new l.Rectangle,
                this.destinationFrame = new l.Rectangle,
                this.filters = [],
                this.target = null,
                this.resolution = 1
            }
              , p = function(e) {
                function t(n) {
                    i(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.gl = r.renderer.gl,
                    r.quad = new a.default(r.gl,n.state.attribState),
                    r.shaderCache = {},
                    r.pool = {},
                    r.filterData = null,
                    r.managedFilters = [],
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.pushFilter = function(e, t) {
                    var n = this.renderer
                      , r = this.filterData;
                    if (!r) {
                        r = this.renderer._activeRenderTarget.filterStack;
                        var i = new d;
                        i.sourceFrame = i.destinationFrame = this.renderer._activeRenderTarget.size,
                        i.renderTarget = n._activeRenderTarget,
                        this.renderer._activeRenderTarget.filterData = r = {
                            index: 0,
                            stack: [i]
                        },
                        this.filterData = r
                    }
                    var o = r.stack[++r.index];
                    o || (o = r.stack[r.index] = new d);
                    var s = t[0].resolution
                      , a = 0 | t[0].padding
                      , l = e.filterArea || e.getBounds(!0)
                      , u = o.sourceFrame
                      , c = o.destinationFrame;
                    u.x = (l.x * s | 0) / s,
                    u.y = (l.y * s | 0) / s,
                    u.width = (l.width * s | 0) / s,
                    u.height = (l.height * s | 0) / s,
                    r.stack[0].renderTarget.transform || t[0].autoFit && u.fit(r.stack[0].destinationFrame),
                    u.pad(a),
                    c.width = u.width,
                    c.height = u.height;
                    var h = this.getPotRenderTarget(n.gl, u.width, u.height, s);
                    o.target = e,
                    o.filters = t,
                    o.resolution = s,
                    o.renderTarget = h,
                    h.setFrame(c, u),
                    n.bindRenderTarget(h),
                    h.clear()
                }
                ,
                t.prototype.popFilter = function() {
                    var e = this.filterData
                      , t = e.stack[e.index - 1]
                      , n = e.stack[e.index];
                    this.quad.map(n.renderTarget.size, n.sourceFrame).upload();
                    var r = n.filters;
                    if (1 === r.length)
                        r[0].apply(this, n.renderTarget, t.renderTarget, !1, n),
                        this.freePotRenderTarget(n.renderTarget);
                    else {
                        var i = n.renderTarget
                          , o = this.getPotRenderTarget(this.renderer.gl, n.sourceFrame.width, n.sourceFrame.height, n.resolution);
                        o.setFrame(n.destinationFrame, n.sourceFrame),
                        o.clear();
                        var s = 0;
                        for (s = 0; s < r.length - 1; ++s) {
                            r[s].apply(this, i, o, !0, n);
                            var a = i;
                            i = o,
                            o = a
                        }
                        r[s].apply(this, i, t.renderTarget, !1, n),
                        this.freePotRenderTarget(i),
                        this.freePotRenderTarget(o)
                    }
                    e.index--,
                    0 === e.index && (this.filterData = null)
                }
                ,
                t.prototype.applyFilter = function(e, t, n, r) {
                    var i = this.renderer
                      , o = i.gl
                      , s = e.glShaders[i.CONTEXT_UID];
                    s || (e.glShaderKey ? (s = this.shaderCache[e.glShaderKey]) || (s = new u.default(this.gl,e.vertexSrc,e.fragmentSrc),
                    e.glShaders[i.CONTEXT_UID] = this.shaderCache[e.glShaderKey] = s) : s = e.glShaders[i.CONTEXT_UID] = new u.default(this.gl,e.vertexSrc,e.fragmentSrc),
                    this.managedFilters.push(e),
                    i.bindVao(null),
                    this.quad.initVao(s)),
                    i.bindVao(this.quad.vao),
                    i.bindRenderTarget(n),
                    r && (o.disable(o.SCISSOR_TEST),
                    i.clear(),
                    o.enable(o.SCISSOR_TEST)),
                    n === i.maskManager.scissorRenderTarget && i.maskManager.pushScissorMask(null, i.maskManager.scissorData),
                    i.bindShader(s);
                    var a = this.renderer.emptyTextures[0];
                    this.renderer.boundTextures[0] = a,
                    this.syncUniforms(s, e),
                    i.state.setBlendMode(e.blendMode),
                    o.activeTexture(o.TEXTURE0),
                    o.bindTexture(o.TEXTURE_2D, t.texture.texture),
                    this.quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0),
                    o.bindTexture(o.TEXTURE_2D, a._glTextures[this.renderer.CONTEXT_UID].texture)
                }
                ,
                t.prototype.syncUniforms = function(e, t) {
                    var n = t.uniformData
                      , r = t.uniforms
                      , i = 1
                      , o = void 0;
                    if (e.uniforms.filterArea) {
                        o = this.filterData.stack[this.filterData.index];
                        var s = e.uniforms.filterArea;
                        s[0] = o.renderTarget.size.width,
                        s[1] = o.renderTarget.size.height,
                        s[2] = o.sourceFrame.x,
                        s[3] = o.sourceFrame.y,
                        e.uniforms.filterArea = s
                    }
                    if (e.uniforms.filterClamp) {
                        o = o || this.filterData.stack[this.filterData.index];
                        var a = e.uniforms.filterClamp;
                        a[0] = 0,
                        a[1] = 0,
                        a[2] = (o.sourceFrame.width - 1) / o.renderTarget.size.width,
                        a[3] = (o.sourceFrame.height - 1) / o.renderTarget.size.height,
                        e.uniforms.filterClamp = a
                    }
                    for (var l in n) {
                        var u = n[l].type;
                        if ("sampler2d" === u && 0 !== r[l]) {
                            if (r[l].baseTexture)
                                e.uniforms[l] = this.renderer.bindTexture(r[l].baseTexture, i);
                            else {
                                e.uniforms[l] = i;
                                var c = this.renderer.gl;
                                this.renderer.boundTextures[i] = this.renderer.emptyTextures[i],
                                c.activeTexture(c.TEXTURE0 + i),
                                r[l].texture.bind()
                            }
                            i++
                        } else if ("mat3" === u)
                            void 0 !== r[l].a ? e.uniforms[l] = r[l].toArray(!0) : e.uniforms[l] = r[l];
                        else if ("vec2" === u)
                            if (void 0 !== r[l].x) {
                                var h = e.uniforms[l] || new Float32Array(2);
                                h[0] = r[l].x,
                                h[1] = r[l].y,
                                e.uniforms[l] = h
                            } else
                                e.uniforms[l] = r[l];
                        else
                            "float" === u ? e.uniforms.data[l].value !== n[l] && (e.uniforms[l] = r[l]) : e.uniforms[l] = r[l]
                    }
                }
                ,
                t.prototype.getRenderTarget = function(e, t) {
                    var n = this.filterData.stack[this.filterData.index]
                      , r = this.getPotRenderTarget(this.renderer.gl, n.sourceFrame.width, n.sourceFrame.height, t || n.resolution);
                    return r.setFrame(n.destinationFrame, n.sourceFrame),
                    r
                }
                ,
                t.prototype.returnRenderTarget = function(e) {
                    this.freePotRenderTarget(e)
                }
                ,
                t.prototype.calculateScreenSpaceMatrix = function(e) {
                    var t = this.filterData.stack[this.filterData.index];
                    return c.calculateScreenSpaceMatrix(e, t.sourceFrame, t.renderTarget.size)
                }
                ,
                t.prototype.calculateNormalizedScreenSpaceMatrix = function(e) {
                    var t = this.filterData.stack[this.filterData.index];
                    return c.calculateNormalizedScreenSpaceMatrix(e, t.sourceFrame, t.renderTarget.size, t.destinationFrame)
                }
                ,
                t.prototype.calculateSpriteMatrix = function(e, t) {
                    var n = this.filterData.stack[this.filterData.index];
                    return c.calculateSpriteMatrix(e, n.sourceFrame, n.renderTarget.size, t)
                }
                ,
                t.prototype.destroy = function() {
                    for (var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this.renderer, n = this.managedFilters, r = 0; r < n.length; r++)
                        e || n[r].glShaders[t.CONTEXT_UID].destroy(),
                        delete n[r].glShaders[t.CONTEXT_UID];
                    this.shaderCache = {},
                    e ? this.pool = {} : this.emptyPool()
                }
                ,
                t.prototype.getPotRenderTarget = function(e, t, n, r) {
                    var i = (65535 & (t = h.default.nextPow2(t * r))) << 16 | 65535 & (n = h.default.nextPow2(n * r));
                    this.pool[i] || (this.pool[i] = []);
                    var o = this.pool[i].pop();
                    if (!o) {
                        var a = this.renderer.boundTextures[0];
                        e.activeTexture(e.TEXTURE0),
                        o = new s.default(e,t,n,null,1),
                        e.bindTexture(e.TEXTURE_2D, a._glTextures[this.renderer.CONTEXT_UID].texture)
                    }
                    return o.resolution = r,
                    o.defaultFrame.width = o.size.width = t / r,
                    o.defaultFrame.height = o.size.height = n / r,
                    o
                }
                ,
                t.prototype.emptyPool = function() {
                    for (var e in this.pool) {
                        var t = this.pool[e];
                        if (t)
                            for (var n = 0; n < t.length; n++)
                                t[n].destroy(!0)
                    }
                    this.pool = {}
                }
                ,
                t.prototype.freePotRenderTarget = function(e) {
                    var t = (65535 & e.size.width * e.resolution) << 16 | 65535 & e.size.height * e.resolution;
                    this.pool[t].push(e)
                }
                ,
                t
            }(o.default);
            n.default = p
        }
        , {
            "../../../Shader": 44,
            "../../../math": 70,
            "../filters/filterTransforms": 88,
            "../utils/Quad": 95,
            "../utils/RenderTarget": 96,
            "./WebGLManager": 93,
            "bit-twiddle": 1
        }],
        91: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("./WebGLManager"))
              , o = r(e("../filters/spriteMask/SpriteMaskFilter"))
              , s = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.scissor = !1,
                    r.scissorData = null,
                    r.scissorRenderTarget = null,
                    r.enableScissor = !0,
                    r.alphaMaskPool = [],
                    r.alphaMaskIndex = 0,
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.pushMask = function(e, t) {
                    if (t.texture)
                        this.pushSpriteMask(e, t);
                    else if (this.enableScissor && !this.scissor && this.renderer._activeRenderTarget.root && !this.renderer.stencilManager.stencilMaskStack.length && t.isFastRect()) {
                        var n = t.worldTransform
                          , r = Math.atan2(n.b, n.a);
                        (r = Math.round(r * (180 / Math.PI))) % 90 ? this.pushStencilMask(t) : this.pushScissorMask(e, t)
                    } else
                        this.pushStencilMask(t)
                }
                ,
                t.prototype.popMask = function(e, t) {
                    t.texture ? this.popSpriteMask(e, t) : this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length ? this.popScissorMask(e, t) : this.popStencilMask(e, t)
                }
                ,
                t.prototype.pushSpriteMask = function(e, t) {
                    var n = this.alphaMaskPool[this.alphaMaskIndex];
                    n || (n = this.alphaMaskPool[this.alphaMaskIndex] = [new o.default(t)]),
                    n[0].resolution = this.renderer.resolution,
                    n[0].maskSprite = t,
                    e.filterArea = t.getBounds(!0),
                    this.renderer.filterManager.pushFilter(e, n),
                    this.alphaMaskIndex++
                }
                ,
                t.prototype.popSpriteMask = function() {
                    this.renderer.filterManager.popFilter(),
                    this.alphaMaskIndex--
                }
                ,
                t.prototype.pushStencilMask = function(e) {
                    this.renderer.currentRenderer.stop(),
                    this.renderer.stencilManager.pushStencil(e)
                }
                ,
                t.prototype.popStencilMask = function() {
                    this.renderer.currentRenderer.stop(),
                    this.renderer.stencilManager.popStencil()
                }
                ,
                t.prototype.pushScissorMask = function(e, t) {
                    t.renderable = !0;
                    var n = this.renderer._activeRenderTarget
                      , r = t.getBounds();
                    r.fit(n.size),
                    t.renderable = !1,
                    this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
                    var i = this.renderer.resolution;
                    this.renderer.gl.scissor(r.x * i, (n.root ? n.size.height - r.y - r.height : r.y) * i, r.width * i, r.height * i),
                    this.scissorRenderTarget = n,
                    this.scissorData = t,
                    this.scissor = !0
                }
                ,
                t.prototype.popScissorMask = function() {
                    this.scissorRenderTarget = null,
                    this.scissorData = null,
                    this.scissor = !1;
                    var e = this.renderer.gl;
                    e.disable(e.SCISSOR_TEST)
                }
                ,
                t
            }(i.default);
            n.default = s
        }
        , {
            "../filters/spriteMask/SpriteMaskFilter": 89,
            "./WebGLManager": 93
        }],
        92: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./WebGLManager"))
              , i = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.stencilMaskStack = null,
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.setMaskStack = function(e) {
                    this.stencilMaskStack = e;
                    var t = this.renderer.gl;
                    0 === e.length ? t.disable(t.STENCIL_TEST) : t.enable(t.STENCIL_TEST)
                }
                ,
                t.prototype.pushStencil = function(e) {
                    this.renderer.setObjectRenderer(this.renderer.plugins.graphics),
                    this.renderer._activeRenderTarget.attachStencilBuffer();
                    var t = this.renderer.gl
                      , n = this.stencilMaskStack.length;
                    0 === n && t.enable(t.STENCIL_TEST),
                    this.stencilMaskStack.push(e),
                    t.colorMask(!1, !1, !1, !1),
                    t.stencilFunc(t.EQUAL, n, this._getBitwiseMask()),
                    t.stencilOp(t.KEEP, t.KEEP, t.INCR),
                    this.renderer.plugins.graphics.render(e),
                    this._useCurrent()
                }
                ,
                t.prototype.popStencil = function() {
                    this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
                    var e = this.renderer.gl
                      , t = this.stencilMaskStack.pop();
                    0 === this.stencilMaskStack.length ? (e.disable(e.STENCIL_TEST),
                    e.clear(e.STENCIL_BUFFER_BIT),
                    e.clearStencil(0)) : (e.colorMask(!1, !1, !1, !1),
                    e.stencilOp(e.KEEP, e.KEEP, e.DECR),
                    this.renderer.plugins.graphics.render(t),
                    this._useCurrent())
                }
                ,
                t.prototype._useCurrent = function() {
                    var e = this.renderer.gl;
                    e.colorMask(!0, !0, !0, !0),
                    e.stencilFunc(e.EQUAL, this.stencilMaskStack.length, this._getBitwiseMask()),
                    e.stencilOp(e.KEEP, e.KEEP, e.KEEP)
                }
                ,
                t.prototype._getBitwiseMask = function() {
                    return (1 << this.stencilMaskStack.length) - 1
                }
                ,
                t.prototype.destroy = function() {
                    r.default.prototype.destroy.call(this),
                    this.stencilMaskStack.stencilStack = null
                }
                ,
                t
            }(r.default);
            n.default = i
        }
        , {
            "./WebGLManager": 93
        }],
        93: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t,
                    this.renderer.on("context", this.onContextChange, this)
                }
                return e.prototype.onContextChange = function() {}
                ,
                e.prototype.destroy = function() {
                    this.renderer.off("context", this.onContextChange, this),
                    this.renderer = null
                }
                ,
                e
            }();
            n.default = r
        }
        , {}],
        94: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                function t() {
                    return function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.apply(this, arguments))
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.start = function() {}
                ,
                t.prototype.stop = function() {
                    this.flush()
                }
                ,
                t.prototype.flush = function() {}
                ,
                t.prototype.render = function(e) {}
                ,
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../managers/WebGLManager")).default);
            n.default = r
        }
        , {
            "../managers/WebGLManager": 93
        }],
        95: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("pixi-gl-core"))
              , o = r(e("../../../utils/createIndicesForQuads"))
              , s = function() {
                function e(t, n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.gl = t,
                    this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
                    this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                    this.interleaved = new Float32Array(16);
                    for (var r = 0; r < 4; r++)
                        this.interleaved[4 * r] = this.vertices[2 * r],
                        this.interleaved[4 * r + 1] = this.vertices[2 * r + 1],
                        this.interleaved[4 * r + 2] = this.uvs[2 * r],
                        this.interleaved[4 * r + 3] = this.uvs[2 * r + 1];
                    this.indices = (0,
                    o.default)(1),
                    this.vertexBuffer = i.default.GLBuffer.createVertexBuffer(t, this.interleaved, t.STATIC_DRAW),
                    this.indexBuffer = i.default.GLBuffer.createIndexBuffer(t, this.indices, t.STATIC_DRAW),
                    this.vao = new i.default.VertexArrayObject(t,n)
                }
                return e.prototype.initVao = function(e) {
                    this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, e.attributes.aVertexPosition, this.gl.FLOAT, !1, 16, 0).addAttribute(this.vertexBuffer, e.attributes.aTextureCoord, this.gl.FLOAT, !1, 16, 8)
                }
                ,
                e.prototype.map = function(e, t) {
                    var n = 0
                      , r = 0;
                    return this.uvs[0] = n,
                    this.uvs[1] = r,
                    this.uvs[2] = n + t.width / e.width,
                    this.uvs[3] = r,
                    this.uvs[4] = n + t.width / e.width,
                    this.uvs[5] = r + t.height / e.height,
                    this.uvs[6] = n,
                    this.uvs[7] = r + t.height / e.height,
                    n = t.x,
                    r = t.y,
                    this.vertices[0] = n,
                    this.vertices[1] = r,
                    this.vertices[2] = n + t.width,
                    this.vertices[3] = r,
                    this.vertices[4] = n + t.width,
                    this.vertices[5] = r + t.height,
                    this.vertices[6] = n,
                    this.vertices[7] = r + t.height,
                    this
                }
                ,
                e.prototype.upload = function() {
                    for (var e = 0; e < 4; e++)
                        this.interleaved[4 * e] = this.vertices[2 * e],
                        this.interleaved[4 * e + 1] = this.vertices[2 * e + 1],
                        this.interleaved[4 * e + 2] = this.uvs[2 * e],
                        this.interleaved[4 * e + 3] = this.uvs[2 * e + 1];
                    return this.vertexBuffer.upload(this.interleaved),
                    this
                }
                ,
                e.prototype.destroy = function() {
                    var e = this.gl;
                    e.deleteBuffer(this.vertexBuffer),
                    e.deleteBuffer(this.indexBuffer)
                }
                ,
                e
            }();
            n.default = s
        }
        , {
            "../../../utils/createIndicesForQuads": 122,
            "pixi-gl-core": 12
        }],
        96: [function(e, t, n) {
            n.__esModule = !0;
            var r = e("../../../math")
              , i = e("../../../const")
              , o = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../../../settings"))
              , s = e("pixi-gl-core")
              , a = function() {
                function e(t, n, a, l, u, c) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.gl = t,
                    this.frameBuffer = null,
                    this.texture = null,
                    this.clearColor = [0, 0, 0, 0],
                    this.size = new r.Rectangle(0,0,1,1),
                    this.resolution = u || o.default.RESOLUTION,
                    this.projectionMatrix = new r.Matrix,
                    this.transform = null,
                    this.frame = null,
                    this.defaultFrame = new r.Rectangle,
                    this.destinationFrame = null,
                    this.sourceFrame = null,
                    this.stencilBuffer = null,
                    this.stencilMaskStack = [],
                    this.filterData = null,
                    this.scaleMode = void 0 !== l ? l : o.default.SCALE_MODE,
                    this.root = c,
                    this.root ? (this.frameBuffer = new s.GLFramebuffer(t,100,100),
                    this.frameBuffer.framebuffer = null) : (this.frameBuffer = s.GLFramebuffer.createRGBA(t, 100, 100),
                    this.scaleMode === i.SCALE_MODES.NEAREST ? this.frameBuffer.texture.enableNearestScaling() : this.frameBuffer.texture.enableLinearScaling(),
                    this.texture = this.frameBuffer.texture),
                    this.setFrame(),
                    this.resize(n, a)
                }
                return e.prototype.clear = function(e) {
                    var t = e || this.clearColor;
                    this.frameBuffer.clear(t[0], t[1], t[2], t[3])
                }
                ,
                e.prototype.attachStencilBuffer = function() {
                    this.root || this.frameBuffer.enableStencil()
                }
                ,
                e.prototype.setFrame = function(e, t) {
                    this.destinationFrame = e || this.destinationFrame || this.defaultFrame,
                    this.sourceFrame = t || this.sourceFrame || this.destinationFrame
                }
                ,
                e.prototype.activate = function() {
                    var e = this.gl;
                    this.frameBuffer.bind(),
                    this.calculateProjection(this.destinationFrame, this.sourceFrame),
                    this.transform && this.projectionMatrix.append(this.transform),
                    this.destinationFrame !== this.sourceFrame ? (e.enable(e.SCISSOR_TEST),
                    e.scissor(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)) : e.disable(e.SCISSOR_TEST),
                    e.viewport(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)
                }
                ,
                e.prototype.calculateProjection = function(e, t) {
                    var n = this.projectionMatrix;
                    t = t || e,
                    n.identity(),
                    this.root ? (n.a = 1 / e.width * 2,
                    n.d = -1 / e.height * 2,
                    n.tx = -1 - t.x * n.a,
                    n.ty = 1 - t.y * n.d) : (n.a = 1 / e.width * 2,
                    n.d = 1 / e.height * 2,
                    n.tx = -1 - t.x * n.a,
                    n.ty = -1 - t.y * n.d)
                }
                ,
                e.prototype.resize = function(e, t) {
                    if (e |= 0,
                    t |= 0,
                    this.size.width !== e || this.size.height !== t) {
                        this.size.width = e,
                        this.size.height = t,
                        this.defaultFrame.width = e,
                        this.defaultFrame.height = t,
                        this.frameBuffer.resize(e * this.resolution, t * this.resolution);
                        var n = this.frame || this.size;
                        this.calculateProjection(n)
                    }
                }
                ,
                e.prototype.destroy = function() {
                    this.frameBuffer.destroy(),
                    this.frameBuffer = null,
                    this.texture = null
                }
                ,
                e
            }();
            n.default = a
        }
        , {
            "../../../const": 46,
            "../../../math": 70,
            "../../../settings": 101,
            "pixi-gl-core": 12
        }],
        97: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e, t) {
                var n = !t;
                if (0 === e)
                    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
                if (n) {
                    var o = document.createElement("canvas");
                    o.width = 1,
                    o.height = 1,
                    t = r.default.createContext(o)
                }
                for (var s = t.createShader(t.FRAGMENT_SHADER); ; ) {
                    var a = i.replace(/%forloop%/gi, function(e) {
                        for (var t = "", n = 0; n < e; ++n)
                            n > 0 && (t += "\nelse "),
                            n < e - 1 && (t += "if(test == " + n + ".0){}");
                        return t
                    }(e));
                    if (t.shaderSource(s, a),
                    t.compileShader(s),
                    t.getShaderParameter(s, t.COMPILE_STATUS))
                        break;
                    e = e / 2 | 0
                }
                return n && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").loseContext(),
                e
            }
            ;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("pixi-gl-core"))
              , i = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n")
        }
        , {
            "pixi-gl-core": 12
        }],
        98: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                return t[r.BLEND_MODES.NORMAL] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.ADD] = [e.ONE, e.DST_ALPHA],
                t[r.BLEND_MODES.MULTIPLY] = [e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.SCREEN] = [e.ONE, e.ONE_MINUS_SRC_COLOR],
                t[r.BLEND_MODES.OVERLAY] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.DARKEN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.LIGHTEN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.COLOR_DODGE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.COLOR_BURN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.HARD_LIGHT] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.SOFT_LIGHT] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.DIFFERENCE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.EXCLUSION] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.HUE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.SATURATION] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.COLOR] = [e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.LUMINOSITY] = [e.ZERO, e.SRC_ALPHA],
                t[r.BLEND_MODES.NORMAL_NPM] = [e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA],
                t[r.BLEND_MODES.ADD_NPM] = [e.SRC_ALPHA, e.DST_ALPHA, e.ONE, e.DST_ALPHA],
                t[r.BLEND_MODES.SCREEN_NPM] = [e.SRC_ALPHA, e.ONE_MINUS_SRC_COLOR, e.ONE, e.ONE_MINUS_SRC_COLOR],
                t
            }
            ;
            var r = e("../../../const")
        }
        , {
            "../../../const": 46
        }],
        99: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return t[r.DRAW_MODES.POINTS] = e.POINTS,
                t[r.DRAW_MODES.LINES] = e.LINES,
                t[r.DRAW_MODES.LINE_LOOP] = e.LINE_LOOP,
                t[r.DRAW_MODES.LINE_STRIP] = e.LINE_STRIP,
                t[r.DRAW_MODES.TRIANGLES] = e.TRIANGLES,
                t[r.DRAW_MODES.TRIANGLE_STRIP] = e.TRIANGLE_STRIP,
                t[r.DRAW_MODES.TRIANGLE_FAN] = e.TRIANGLE_FAN,
                t
            }
            ;
            var r = e("../../../const")
        }
        , {
            "../../../const": 46
        }],
        100: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                e.getContextAttributes().stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly")
            }
        }
        , {}],
        101: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("./utils/maxRecommendedTextures"))
              , o = r(e("./utils/canUploadSameBuffer"));
            n.default = {
                TARGET_FPMS: .06,
                MIPMAP_TEXTURES: !0,
                RESOLUTION: 1,
                FILTER_RESOLUTION: 1,
                SPRITE_MAX_TEXTURES: (0,
                i.default)(32),
                SPRITE_BATCH_SIZE: 4096,
                RETINA_PREFIX: /@([0-9\.]+)x/,
                RENDER_OPTIONS: {
                    view: null,
                    antialias: !1,
                    forceFXAA: !1,
                    autoResize: !1,
                    transparent: !1,
                    backgroundColor: 0,
                    clearBeforeRender: !0,
                    preserveDrawingBuffer: !1,
                    roundPixels: !1,
                    width: 800,
                    height: 600,
                    legacy: !1
                },
                TRANSFORM_MODE: 0,
                GC_MODE: 0,
                GC_MAX_IDLE: 3600,
                GC_MAX_CHECK_COUNT: 600,
                WRAP_MODE: 0,
                SCALE_MODE: 0,
                PRECISION_VERTEX: "highp",
                PRECISION_FRAGMENT: "mediump",
                CAN_UPLOAD_SAME_BUFFER: (0,
                o.default)()
            }
        }
        , {
            "./utils/canUploadSameBuffer": 121,
            "./utils/maxRecommendedTextures": 126
        }],
        102: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = e("../math")
              , s = e("../utils")
              , a = e("../const")
              , l = r(e("../textures/Texture"))
              , u = r(e("../display/Container"))
              , c = new o.Point
              , h = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return r._anchor = new o.ObservablePoint(r._onAnchorUpdate,r),
                    r._texture = null,
                    r._width = 0,
                    r._height = 0,
                    r._tint = null,
                    r._tintRGB = null,
                    r.tint = 16777215,
                    r.blendMode = a.BLEND_MODES.NORMAL,
                    r.shader = null,
                    r.cachedTint = 16777215,
                    r.texture = n || l.default.EMPTY,
                    r.vertexData = new Float32Array(8),
                    r.vertexTrimmedData = null,
                    r._transformID = -1,
                    r._textureID = -1,
                    r._transformTrimmedID = -1,
                    r._textureTrimmedID = -1,
                    r.pluginName = "sprite",
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype._onTextureUpdate = function() {
                    this._textureID = -1,
                    this._textureTrimmedID = -1,
                    this.cachedTint = 16777215,
                    this._width && (this.scale.x = (0,
                    s.sign)(this.scale.x) * this._width / this._texture.orig.width),
                    this._height && (this.scale.y = (0,
                    s.sign)(this.scale.y) * this._height / this._texture.orig.height)
                }
                ,
                t.prototype._onAnchorUpdate = function() {
                    this._transformID = -1,
                    this._transformTrimmedID = -1
                }
                ,
                t.prototype.calculateVertices = function() {
                    if (this._transformID !== this.transform._worldID || this._textureID !== this._texture._updateID) {
                        this._transformID = this.transform._worldID,
                        this._textureID = this._texture._updateID;
                        var e = this._texture
                          , t = this.transform.worldTransform
                          , n = t.a
                          , r = t.b
                          , i = t.c
                          , o = t.d
                          , s = t.tx
                          , a = t.ty
                          , l = this.vertexData
                          , u = e.trim
                          , c = e.orig
                          , h = this._anchor
                          , d = 0
                          , p = 0
                          , f = 0
                          , g = 0;
                        u ? (d = (p = u.x - h._x * c.width) + u.width,
                        f = (g = u.y - h._y * c.height) + u.height) : (d = (p = -h._x * c.width) + c.width,
                        f = (g = -h._y * c.height) + c.height),
                        l[0] = n * p + i * g + s,
                        l[1] = o * g + r * p + a,
                        l[2] = n * d + i * g + s,
                        l[3] = o * g + r * d + a,
                        l[4] = n * d + i * f + s,
                        l[5] = o * f + r * d + a,
                        l[6] = n * p + i * f + s,
                        l[7] = o * f + r * p + a
                    }
                }
                ,
                t.prototype.calculateTrimmedVertices = function() {
                    if (this.vertexTrimmedData) {
                        if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID)
                            return
                    } else
                        this.vertexTrimmedData = new Float32Array(8);
                    this._transformTrimmedID = this.transform._worldID,
                    this._textureTrimmedID = this._texture._updateID;
                    var e = this._texture
                      , t = this.vertexTrimmedData
                      , n = e.orig
                      , r = this._anchor
                      , i = this.transform.worldTransform
                      , o = i.a
                      , s = i.b
                      , a = i.c
                      , l = i.d
                      , u = i.tx
                      , c = i.ty
                      , h = -r._x * n.width
                      , d = h + n.width
                      , p = -r._y * n.height
                      , f = p + n.height;
                    t[0] = o * h + a * p + u,
                    t[1] = l * p + s * h + c,
                    t[2] = o * d + a * p + u,
                    t[3] = l * p + s * d + c,
                    t[4] = o * d + a * f + u,
                    t[5] = l * f + s * d + c,
                    t[6] = o * h + a * f + u,
                    t[7] = l * f + s * h + c
                }
                ,
                t.prototype._renderWebGL = function(e) {
                    this.calculateVertices(),
                    e.setObjectRenderer(e.plugins[this.pluginName]),
                    e.plugins[this.pluginName].render(this)
                }
                ,
                t.prototype._renderCanvas = function(e) {
                    e.plugins[this.pluginName].render(this)
                }
                ,
                t.prototype._calculateBounds = function() {
                    var e = this._texture.trim
                      , t = this._texture.orig;
                    !e || e.width === t.width && e.height === t.height ? (this.calculateVertices(),
                    this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(),
                    this._bounds.addQuad(this.vertexTrimmedData))
                }
                ,
                t.prototype.getLocalBounds = function(t) {
                    return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x,
                    this._bounds.minY = this._texture.orig.height * -this._anchor._y,
                    this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x),
                    this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y),
                    t || (this._localBoundsRect || (this._localBoundsRect = new o.Rectangle),
                    t = this._localBoundsRect),
                    this._bounds.getRectangle(t)) : e.prototype.getLocalBounds.call(this, t)
                }
                ,
                t.prototype.containsPoint = function(e) {
                    this.worldTransform.applyInverse(e, c);
                    var t = this._texture.orig.width
                      , n = this._texture.orig.height
                      , r = -t * this.anchor.x
                      , i = 0;
                    return c.x >= r && c.x < r + t && (i = -n * this.anchor.y,
                    c.y >= i && c.y < i + n)
                }
                ,
                t.prototype.destroy = function(t) {
                    e.prototype.destroy.call(this, t),
                    this._anchor = null;
                    if ("boolean" == typeof t ? t : t && t.texture) {
                        var n = "boolean" == typeof t ? t : t && t.baseTexture;
                        this._texture.destroy(!!n)
                    }
                    this._texture = null,
                    this.shader = null
                }
                ,
                t.from = function(e) {
                    return new t(l.default.from(e))
                }
                ,
                t.fromFrame = function(e) {
                    var n = s.TextureCache[e];
                    if (!n)
                        throw new Error('The frameId "' + e + '" does not exist in the texture cache');
                    return new t(n)
                }
                ,
                t.fromImage = function(e, n, r) {
                    return new t(l.default.fromImage(e, n, r))
                }
                ,
                i(t, [{
                    key: "width",
                    get: function() {
                        return Math.abs(this.scale.x) * this._texture.orig.width
                    },
                    set: function(e) {
                        var t = (0,
                        s.sign)(this.scale.x) || 1;
                        this.scale.x = t * e / this._texture.orig.width,
                        this._width = e
                    }
                }, {
                    key: "height",
                    get: function() {
                        return Math.abs(this.scale.y) * this._texture.orig.height
                    },
                    set: function(e) {
                        var t = (0,
                        s.sign)(this.scale.y) || 1;
                        this.scale.y = t * e / this._texture.orig.height,
                        this._height = e
                    }
                }, {
                    key: "anchor",
                    get: function() {
                        return this._anchor
                    },
                    set: function(e) {
                        this._anchor.copy(e)
                    }
                }, {
                    key: "tint",
                    get: function() {
                        return this._tint
                    },
                    set: function(e) {
                        this._tint = e,
                        this._tintRGB = (e >> 16) + (65280 & e) + ((255 & e) << 16)
                    }
                }, {
                    key: "texture",
                    get: function() {
                        return this._texture
                    },
                    set: function(e) {
                        this._texture !== e && (this._texture = e,
                        this.cachedTint = 16777215,
                        this._textureID = -1,
                        this._textureTrimmedID = -1,
                        e && (e.baseTexture.hasLoaded ? this._onTextureUpdate() : e.once("update", this._onTextureUpdate, this)))
                    }
                }]),
                t
            }(u.default);
            n.default = h
        }
        , {
            "../const": 46,
            "../display/Container": 48,
            "../math": 70,
            "../textures/Texture": 115,
            "../utils": 124
        }],
        103: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("../../renderers/canvas/CanvasRenderer"))
              , o = e("../../const")
              , s = e("../../math")
              , a = r(e("./CanvasTinter"))
              , l = new s.Matrix
              , u = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t
                }
                return e.prototype.render = function(e) {
                    var t = e._texture
                      , n = this.renderer
                      , r = t._frame.width
                      , i = t._frame.height
                      , u = e.transform.worldTransform
                      , c = 0
                      , h = 0;
                    if (!(t.orig.width <= 0 || t.orig.height <= 0) && t.baseTexture.source && (n.setBlendMode(e.blendMode),
                    t.valid)) {
                        n.context.globalAlpha = e.worldAlpha;
                        var d = t.baseTexture.scaleMode === o.SCALE_MODES.LINEAR;
                        n.smoothProperty && n.context[n.smoothProperty] !== d && (n.context[n.smoothProperty] = d),
                        t.trim ? (c = t.trim.width / 2 + t.trim.x - e.anchor.x * t.orig.width,
                        h = t.trim.height / 2 + t.trim.y - e.anchor.y * t.orig.height) : (c = (.5 - e.anchor.x) * t.orig.width,
                        h = (.5 - e.anchor.y) * t.orig.height),
                        t.rotate && (u.copy(l),
                        u = l,
                        s.GroupD8.matrixAppendRotationInv(u, t.rotate, c, h),
                        c = 0,
                        h = 0),
                        c -= r / 2,
                        h -= i / 2,
                        n.roundPixels ? (n.context.setTransform(u.a, u.b, u.c, u.d, u.tx * n.resolution | 0, u.ty * n.resolution | 0),
                        c |= 0,
                        h |= 0) : n.context.setTransform(u.a, u.b, u.c, u.d, u.tx * n.resolution, u.ty * n.resolution);
                        var p = t.baseTexture.resolution;
                        16777215 !== e.tint ? (e.cachedTint === e.tint && e.tintedTexture.tintId === e._texture._updateID || (e.cachedTint = e.tint,
                        e.tintedTexture = a.default.getTintedTexture(e, e.tint)),
                        n.context.drawImage(e.tintedTexture, 0, 0, r * p, i * p, c * n.resolution, h * n.resolution, r * n.resolution, i * n.resolution)) : n.context.drawImage(t.baseTexture.source, t._frame.x * p, t._frame.y * p, r * p, i * p, c * n.resolution, h * n.resolution, r * n.resolution, i * n.resolution)
                    }
                }
                ,
                e.prototype.destroy = function() {
                    this.renderer = null
                }
                ,
                e
            }();
            n.default = u,
            i.default.registerPlugin("sprite", u)
        }
        , {
            "../../const": 46,
            "../../math": 70,
            "../../renderers/canvas/CanvasRenderer": 77,
            "./CanvasTinter": 104
        }],
        104: [function(e, t, n) {
            n.__esModule = !0;
            var r = e("../../utils")
              , i = {
                getTintedTexture: function(e, t) {
                    var n = e._texture
                      , r = "#" + ("00000" + (0 | (t = i.roundColor(t))).toString(16)).substr(-6);
                    n.tintCache = n.tintCache || {};
                    var o = n.tintCache[r]
                      , s = void 0;
                    if (o) {
                        if (o.tintId === n._updateID)
                            return n.tintCache[r];
                        s = n.tintCache[r]
                    } else
                        s = i.canvas || document.createElement("canvas");
                    if (i.tintMethod(n, t, s),
                    s.tintId = n._updateID,
                    i.convertTintToImage) {
                        var a = new Image;
                        a.src = s.toDataURL(),
                        n.tintCache[r] = a
                    } else
                        n.tintCache[r] = s,
                        i.canvas = null;
                    return s
                },
                tintWithMultiply: function(e, t, n) {
                    var r = n.getContext("2d")
                      , i = e._frame.clone()
                      , o = e.baseTexture.resolution;
                    i.x *= o,
                    i.y *= o,
                    i.width *= o,
                    i.height *= o,
                    n.width = Math.ceil(i.width),
                    n.height = Math.ceil(i.height),
                    r.save(),
                    r.fillStyle = "#" + ("00000" + (0 | t).toString(16)).substr(-6),
                    r.fillRect(0, 0, i.width, i.height),
                    r.globalCompositeOperation = "multiply",
                    r.drawImage(e.baseTexture.source, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height),
                    r.globalCompositeOperation = "destination-atop",
                    r.drawImage(e.baseTexture.source, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height),
                    r.restore()
                },
                tintWithOverlay: function(e, t, n) {
                    var r = n.getContext("2d")
                      , i = e._frame.clone()
                      , o = e.baseTexture.resolution;
                    i.x *= o,
                    i.y *= o,
                    i.width *= o,
                    i.height *= o,
                    n.width = Math.ceil(i.width),
                    n.height = Math.ceil(i.height),
                    r.save(),
                    r.globalCompositeOperation = "copy",
                    r.fillStyle = "#" + ("00000" + (0 | t).toString(16)).substr(-6),
                    r.fillRect(0, 0, i.width, i.height),
                    r.globalCompositeOperation = "destination-atop",
                    r.drawImage(e.baseTexture.source, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height),
                    r.restore()
                },
                tintWithPerPixel: function(e, t, n) {
                    var i = n.getContext("2d")
                      , o = e._frame.clone()
                      , s = e.baseTexture.resolution;
                    o.x *= s,
                    o.y *= s,
                    o.width *= s,
                    o.height *= s,
                    n.width = Math.ceil(o.width),
                    n.height = Math.ceil(o.height),
                    i.save(),
                    i.globalCompositeOperation = "copy",
                    i.drawImage(e.baseTexture.source, o.x, o.y, o.width, o.height, 0, 0, o.width, o.height),
                    i.restore();
                    for (var a = (0,
                    r.hex2rgb)(t), l = a[0], u = a[1], c = a[2], h = i.getImageData(0, 0, o.width, o.height), d = h.data, p = 0; p < d.length; p += 4)
                        d[p + 0] *= l,
                        d[p + 1] *= u,
                        d[p + 2] *= c;
                    i.putImageData(h, 0, 0)
                },
                roundColor: function(e) {
                    var t = i.cacheStepsPerColorChannel
                      , n = (0,
                    r.hex2rgb)(e);
                    return n[0] = Math.min(255, n[0] / t * t),
                    n[1] = Math.min(255, n[1] / t * t),
                    n[2] = Math.min(255, n[2] / t * t),
                    (0,
                    r.rgb2hex)(n)
                },
                cacheStepsPerColorChannel: 8,
                convertTintToImage: !1,
                canUseMultiply: (0,
                function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(e("../../renderers/canvas/utils/canUseNewCanvasBlendModes")).default)(),
                tintMethod: 0
            };
            i.tintMethod = i.canUseMultiply ? i.tintWithMultiply : i.tintWithPerPixel,
            n.default = i
        }
        , {
            "../../renderers/canvas/utils/canUseNewCanvasBlendModes": 80,
            "../../utils": 124
        }],
        105: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.vertices = new ArrayBuffer(t),
                    this.float32View = new Float32Array(this.vertices),
                    this.uint32View = new Uint32Array(this.vertices)
                }
                return e.prototype.destroy = function() {
                    this.vertices = null,
                    this.positions = null,
                    this.uvs = null,
                    this.colors = null
                }
                ,
                e
            }();
            n.default = r
        }
        , {}],
        106: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("../../renderers/webgl/utils/ObjectRenderer"))
              , o = r(e("../../renderers/webgl/WebGLRenderer"))
              , s = r(e("../../utils/createIndicesForQuads"))
              , a = r(e("./generateMultiTextureShader"))
              , l = r(e("../../renderers/webgl/utils/checkMaxIfStatmentsInShader"))
              , u = r(e("./BatchBuffer"))
              , c = r(e("../../settings"))
              , h = e("../../utils")
              , d = r(e("pixi-gl-core"))
              , p = r(e("bit-twiddle"))
              , f = 0
              , g = 0
              , m = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    r.vertSize = 5,
                    r.vertByteSize = 4 * r.vertSize,
                    r.size = c.default.SPRITE_BATCH_SIZE,
                    r.buffers = [];
                    for (var i = 1; i <= p.default.nextPow2(r.size); i *= 2)
                        r.buffers.push(new u.default(4 * i * r.vertByteSize));
                    r.indices = (0,
                    s.default)(r.size),
                    r.shader = null,
                    r.currentIndex = 0,
                    r.groups = [];
                    for (var o = 0; o < r.size; o++)
                        r.groups[o] = {
                            textures: [],
                            textureCount: 0,
                            ids: [],
                            size: 0,
                            start: 0,
                            blend: 0
                        };
                    return r.sprites = [],
                    r.vertexBuffers = [],
                    r.vaos = [],
                    r.vaoMax = 2,
                    r.vertexCount = 0,
                    r.renderer.on("prerender", r.onPrerender, r),
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.onContextChange = function() {
                    var e = this.renderer.gl;
                    this.renderer.legacy ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), c.default.SPRITE_MAX_TEXTURES),
                    this.MAX_TEXTURES = (0,
                    l.default)(this.MAX_TEXTURES, e)),
                    this.shader = (0,
                    a.default)(e, this.MAX_TEXTURES),
                    this.indexBuffer = d.default.GLBuffer.createIndexBuffer(e, this.indices, e.STATIC_DRAW),
                    this.renderer.bindVao(null);
                    for (var t = this.shader.attributes, n = 0; n < this.vaoMax; n++) {
                        var r = this.vertexBuffers[n] = d.default.GLBuffer.createVertexBuffer(e, null, e.STREAM_DRAW)
                          , i = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(r, t.aVertexPosition, e.FLOAT, !1, this.vertByteSize, 0).addAttribute(r, t.aTextureCoord, e.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(r, t.aColor, e.UNSIGNED_BYTE, !0, this.vertByteSize, 12);
                        t.aTextureId && i.addAttribute(r, t.aTextureId, e.FLOAT, !1, this.vertByteSize, 16),
                        this.vaos[n] = i
                    }
                    this.vao = this.vaos[0],
                    this.currentBlendMode = 99999,
                    this.boundTextures = new Array(this.MAX_TEXTURES)
                }
                ,
                t.prototype.onPrerender = function() {
                    this.vertexCount = 0
                }
                ,
                t.prototype.render = function(e) {
                    this.currentIndex >= this.size && this.flush(),
                    e._texture._uvs && (this.sprites[this.currentIndex++] = e)
                }
                ,
                t.prototype.flush = function() {
                    if (0 !== this.currentIndex) {
                        var e = this.renderer.gl
                          , t = this.MAX_TEXTURES
                          , n = p.default.nextPow2(this.currentIndex)
                          , r = p.default.log2(n)
                          , i = this.buffers[r]
                          , o = this.sprites
                          , s = this.groups
                          , a = i.float32View
                          , l = i.uint32View
                          , u = this.boundTextures
                          , m = this.renderer.boundTextures
                          , v = this.renderer.textureGC.count
                          , y = 0
                          , b = void 0
                          , _ = void 0
                          , x = 1
                          , w = 0
                          , T = s[0]
                          , E = void 0
                          , S = void 0
                          , I = h.premultiplyBlendMode[o[0]._texture.baseTexture.premultipliedAlpha ? 1 : 0][o[0].blendMode];
                        T.textureCount = 0,
                        T.start = 0,
                        T.blend = I,
                        f++;
                        var P = void 0;
                        for (P = 0; P < t; ++P)
                            u[P] = m[P],
                            u[P]._virtalBoundId = P;
                        for (P = 0; P < this.currentIndex; ++P) {
                            var M = o[P];
                            b = M._texture.baseTexture;
                            var A = h.premultiplyBlendMode[Number(b.premultipliedAlpha)][M.blendMode];
                            if (I !== A && (I = A,
                            _ = null,
                            w = t,
                            f++),
                            _ !== b && (_ = b,
                            b._enabled !== f)) {
                                if (w === t && (f++,
                                T.size = P - T.start,
                                w = 0,
                                (T = s[x++]).blend = I,
                                T.textureCount = 0,
                                T.start = P),
                                b.touched = v,
                                -1 === b._virtalBoundId)
                                    for (var O = 0; O < t; ++O) {
                                        var C = (O + g) % t
                                          , R = u[C];
                                        if (R._enabled !== f) {
                                            g++,
                                            R._virtalBoundId = -1,
                                            b._virtalBoundId = C,
                                            u[C] = b;
                                            break
                                        }
                                    }
                                b._enabled = f,
                                T.textureCount++,
                                T.ids[w] = b._virtalBoundId,
                                T.textures[w++] = b
                            }
                            if (E = M.vertexData,
                            S = M._texture._uvs.uvsUint32,
                            this.renderer.roundPixels) {
                                var D = this.renderer.resolution;
                                a[y] = (E[0] * D | 0) / D,
                                a[y + 1] = (E[1] * D | 0) / D,
                                a[y + 5] = (E[2] * D | 0) / D,
                                a[y + 6] = (E[3] * D | 0) / D,
                                a[y + 10] = (E[4] * D | 0) / D,
                                a[y + 11] = (E[5] * D | 0) / D,
                                a[y + 15] = (E[6] * D | 0) / D,
                                a[y + 16] = (E[7] * D | 0) / D
                            } else
                                a[y] = E[0],
                                a[y + 1] = E[1],
                                a[y + 5] = E[2],
                                a[y + 6] = E[3],
                                a[y + 10] = E[4],
                                a[y + 11] = E[5],
                                a[y + 15] = E[6],
                                a[y + 16] = E[7];
                            l[y + 2] = S[0],
                            l[y + 7] = S[1],
                            l[y + 12] = S[2],
                            l[y + 17] = S[3];
                            var k = Math.min(M.worldAlpha, 1)
                              , L = k < 1 && b.premultipliedAlpha ? (0,
                            h.premultiplyTint)(M._tintRGB, k) : M._tintRGB + (255 * k << 24);
                            l[y + 3] = l[y + 8] = l[y + 13] = l[y + 18] = L,
                            a[y + 4] = a[y + 9] = a[y + 14] = a[y + 19] = b._virtalBoundId,
                            y += 20
                        }
                        if (T.size = P - T.start,
                        c.default.CAN_UPLOAD_SAME_BUFFER)
                            this.vertexBuffers[this.vertexCount].upload(i.vertices, 0, !0);
                        else {
                            if (this.vaoMax <= this.vertexCount) {
                                this.vaoMax++;
                                var N = this.shader.attributes
                                  , U = this.vertexBuffers[this.vertexCount] = d.default.GLBuffer.createVertexBuffer(e, null, e.STREAM_DRAW)
                                  , F = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(U, N.aVertexPosition, e.FLOAT, !1, this.vertByteSize, 0).addAttribute(U, N.aTextureCoord, e.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(U, N.aColor, e.UNSIGNED_BYTE, !0, this.vertByteSize, 12);
                                N.aTextureId && F.addAttribute(U, N.aTextureId, e.FLOAT, !1, this.vertByteSize, 16),
                                this.vaos[this.vertexCount] = F
                            }
                            this.renderer.bindVao(this.vaos[this.vertexCount]),
                            this.vertexBuffers[this.vertexCount].upload(i.vertices, 0, !1),
                            this.vertexCount++
                        }
                        for (P = 0; P < t; ++P)
                            m[P]._virtalBoundId = -1;
                        for (P = 0; P < x; ++P) {
                            for (var B = s[P], j = B.textureCount, G = 0; G < j; G++)
                                _ = B.textures[G],
                                m[B.ids[G]] !== _ && this.renderer.bindTexture(_, B.ids[G], !0),
                                _._virtalBoundId = -1;
                            this.renderer.state.setBlendMode(B.blend),
                            e.drawElements(e.TRIANGLES, 6 * B.size, e.UNSIGNED_SHORT, 6 * B.start * 2)
                        }
                        this.currentIndex = 0
                    }
                }
                ,
                t.prototype.start = function() {
                    this.renderer.bindShader(this.shader),
                    c.default.CAN_UPLOAD_SAME_BUFFER && (this.renderer.bindVao(this.vaos[this.vertexCount]),
                    this.vertexBuffers[this.vertexCount].bind())
                }
                ,
                t.prototype.stop = function() {
                    this.flush()
                }
                ,
                t.prototype.destroy = function() {
                    for (var t = 0; t < this.vaoMax; t++)
                        this.vertexBuffers[t] && this.vertexBuffers[t].destroy(),
                        this.vaos[t] && this.vaos[t].destroy();
                    this.indexBuffer && this.indexBuffer.destroy(),
                    this.renderer.off("prerender", this.onPrerender, this),
                    e.prototype.destroy.call(this),
                    this.shader && (this.shader.destroy(),
                    this.shader = null),
                    this.vertexBuffers = null,
                    this.vaos = null,
                    this.indexBuffer = null,
                    this.indices = null,
                    this.sprites = null;
                    for (var n = 0; n < this.buffers.length; ++n)
                        this.buffers[n].destroy()
                }
                ,
                t
            }(i.default);
            n.default = m,
            o.default.registerPlugin("sprite", m)
        }
        , {
            "../../renderers/webgl/WebGLRenderer": 84,
            "../../renderers/webgl/utils/ObjectRenderer": 94,
            "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 97,
            "../../settings": 101,
            "../../utils": 124,
            "../../utils/createIndicesForQuads": 122,
            "./BatchBuffer": 105,
            "./generateMultiTextureShader": 107,
            "bit-twiddle": 1,
            "pixi-gl-core": 12
        }],
        107: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e, t) {
                var n = i;
                n = (n = n.replace(/%count%/gi, t)).replace(/%forloop%/gi, function(e) {
                    var t = "";
                    t += "\n",
                    t += "\n";
                    for (var n = 0; n < e; n++)
                        n > 0 && (t += "\nelse "),
                        n < e - 1 && (t += "if(textureId == " + n + ".0)"),
                        t += "\n{",
                        t += "\n\tcolor = texture2D(uSamplers[" + n + "], vTextureCoord, -1.0);",
                        t += "\n}";
                    return t += "\n",
                    t += "\n"
                }(t));
                for (var o = new r.default(e,"precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor;\n}\n",n), s = [], a = 0; a < t; a++)
                    s[a] = a;
                return o.bind(),
                o.uniforms.uSamplers = s,
                o
            }
            ;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../../Shader"))
              , i = (e("path"),
            ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}"].join("\n"))
        }
        , {
            "../../Shader": 44,
            path: 23
        }],
        108: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = r(e("../sprites/Sprite"))
              , s = r(e("../textures/Texture"))
              , a = e("../math")
              , l = e("../utils")
              , u = e("../const")
              , c = r(e("../settings"))
              , h = r(e("./TextStyle"))
              , d = r(e("./TextMetrics"))
              , p = r(e("../utils/trimCanvas"))
              , f = {
                texture: !0,
                children: !1,
                baseTexture: !0
            }
              , g = function(e) {
                function t(n, r, i) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    (i = i || document.createElement("canvas")).width = 3,
                    i.height = 3;
                    var o = s.default.fromCanvas(i, c.default.SCALE_MODE, "text");
                    o.orig = new a.Rectangle,
                    o.trim = new a.Rectangle;
                    var l = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, o));
                    return s.default.addToCache(l._texture, l._texture.baseTexture.textureCacheIds[0]),
                    l.canvas = i,
                    l.context = l.canvas.getContext("2d"),
                    l.resolution = c.default.RESOLUTION,
                    l._text = null,
                    l._style = null,
                    l._styleListener = null,
                    l._font = "",
                    l.text = n,
                    l.style = r,
                    l.localStyleID = -1,
                    l
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.updateText = function(e) {
                    var t = this._style;
                    if (this.localStyleID !== t.styleID && (this.dirty = !0,
                    this.localStyleID = t.styleID),
                    this.dirty || !e) {
                        this._font = this._style.toFontString();
                        var n = this.context
                          , r = d.default.measureText(this._text, this._style, this._style.wordWrap, this.canvas)
                          , i = r.width
                          , o = r.height
                          , s = r.lines
                          , a = r.lineHeight
                          , l = r.lineWidths
                          , u = r.maxLineWidth
                          , c = r.fontProperties;
                        this.canvas.width = Math.ceil((i + 2 * t.padding) * this.resolution),
                        this.canvas.height = Math.ceil((o + 2 * t.padding) * this.resolution),
                        n.scale(this.resolution, this.resolution),
                        n.clearRect(0, 0, this.canvas.width, this.canvas.height),
                        n.font = this._font,
                        n.strokeStyle = t.stroke,
                        n.lineWidth = t.strokeThickness,
                        n.textBaseline = t.textBaseline,
                        n.lineJoin = t.lineJoin,
                        n.miterLimit = t.miterLimit;
                        var h = void 0
                          , p = void 0;
                        if (t.dropShadow) {
                            n.fillStyle = t.dropShadowColor,
                            n.globalAlpha = t.dropShadowAlpha,
                            n.shadowBlur = t.dropShadowBlur,
                            t.dropShadowBlur > 0 && (n.shadowColor = t.dropShadowColor);
                            for (var f = Math.cos(t.dropShadowAngle) * t.dropShadowDistance, g = Math.sin(t.dropShadowAngle) * t.dropShadowDistance, m = 0; m < s.length; m++)
                                h = t.strokeThickness / 2,
                                p = t.strokeThickness / 2 + m * a + c.ascent,
                                "right" === t.align ? h += u - l[m] : "center" === t.align && (h += (u - l[m]) / 2),
                                t.fill && (this.drawLetterSpacing(s[m], h + f + t.padding, p + g + t.padding),
                                t.stroke && t.strokeThickness && (n.strokeStyle = t.dropShadowColor,
                                this.drawLetterSpacing(s[m], h + f + t.padding, p + g + t.padding, !0),
                                n.strokeStyle = t.stroke))
                        }
                        n.shadowBlur = 0,
                        n.globalAlpha = 1,
                        n.fillStyle = this._generateFillStyle(t, s);
                        for (var v = 0; v < s.length; v++)
                            h = t.strokeThickness / 2,
                            p = t.strokeThickness / 2 + v * a + c.ascent,
                            "right" === t.align ? h += u - l[v] : "center" === t.align && (h += (u - l[v]) / 2),
                            t.stroke && t.strokeThickness && this.drawLetterSpacing(s[v], h + t.padding, p + t.padding, !0),
                            t.fill && this.drawLetterSpacing(s[v], h + t.padding, p + t.padding);
                        this.updateTexture()
                    }
                }
                ,
                t.prototype.drawLetterSpacing = function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
                      , i = this._style.letterSpacing;
                    if (0 !== i)
                        for (var o = String.prototype.split.call(e, ""), s = t, a = 0, l = ""; a < e.length; )
                            l = o[a++],
                            r ? this.context.strokeText(l, s, n) : this.context.fillText(l, s, n),
                            s += this.context.measureText(l).width + i;
                    else
                        r ? this.context.strokeText(e, t, n) : this.context.fillText(e, t, n)
                }
                ,
                t.prototype.updateTexture = function() {
                    var e = this.canvas;
                    if (this._style.trim) {
                        var t = (0,
                        p.default)(e);
                        e.width = t.width,
                        e.height = t.height,
                        this.context.putImageData(t.data, 0, 0)
                    }
                    var n = this._texture
                      , r = this._style
                      , i = r.trim ? 0 : r.padding
                      , o = n.baseTexture;
                    o.hasLoaded = !0,
                    o.resolution = this.resolution,
                    o.realWidth = e.width,
                    o.realHeight = e.height,
                    o.width = e.width / this.resolution,
                    o.height = e.height / this.resolution,
                    n.trim.width = n._frame.width = e.width / this.resolution,
                    n.trim.height = n._frame.height = e.height / this.resolution,
                    n.trim.x = -i,
                    n.trim.y = -i,
                    n.orig.width = n._frame.width - 2 * i,
                    n.orig.height = n._frame.height - 2 * i,
                    this._onTextureUpdate(),
                    o.emit("update", o),
                    this.dirty = !1
                }
                ,
                t.prototype.renderWebGL = function(t) {
                    this.resolution !== t.resolution && (this.resolution = t.resolution,
                    this.dirty = !0),
                    this.updateText(!0),
                    e.prototype.renderWebGL.call(this, t)
                }
                ,
                t.prototype._renderCanvas = function(t) {
                    this.resolution !== t.resolution && (this.resolution = t.resolution,
                    this.dirty = !0),
                    this.updateText(!0),
                    e.prototype._renderCanvas.call(this, t)
                }
                ,
                t.prototype.getLocalBounds = function(t) {
                    return this.updateText(!0),
                    e.prototype.getLocalBounds.call(this, t)
                }
                ,
                t.prototype._calculateBounds = function() {
                    this.updateText(!0),
                    this.calculateVertices(),
                    this._bounds.addQuad(this.vertexData)
                }
                ,
                t.prototype._onStyleChange = function() {
                    this.dirty = !0
                }
                ,
                t.prototype._generateFillStyle = function(e, t) {
                    if (!Array.isArray(e.fill))
                        return e.fill;
                    if (navigator.isCocoonJS)
                        return e.fill[0];
                    var n = void 0
                      , r = void 0
                      , i = void 0
                      , o = void 0
                      , s = this.canvas.width / this.resolution
                      , a = this.canvas.height / this.resolution
                      , l = e.fill.slice()
                      , c = e.fillGradientStops.slice();
                    if (!c.length)
                        for (var h = l.length + 1, d = 1; d < h; ++d)
                            c.push(d / h);
                    if (l.unshift(e.fill[0]),
                    c.unshift(0),
                    l.push(e.fill[e.fill.length - 1]),
                    c.push(1),
                    e.fillGradientType === u.TEXT_GRADIENT.LINEAR_VERTICAL) {
                        n = this.context.createLinearGradient(s / 2, 0, s / 2, a),
                        r = (l.length + 1) * t.length,
                        i = 0;
                        for (var p = 0; p < t.length; p++) {
                            i += 1;
                            for (var f = 0; f < l.length; f++)
                                o = "number" == typeof c[f] ? c[f] / t.length + p / t.length : i / r,
                                n.addColorStop(o, l[f]),
                                i++
                        }
                    } else {
                        n = this.context.createLinearGradient(0, a / 2, s, a / 2),
                        r = l.length + 1,
                        i = 1;
                        for (var g = 0; g < l.length; g++)
                            o = "number" == typeof c[g] ? c[g] : i / r,
                            n.addColorStop(o, l[g]),
                            i++
                    }
                    return n
                }
                ,
                t.prototype.destroy = function(t) {
                    "boolean" == typeof t && (t = {
                        children: t
                    }),
                    t = Object.assign({}, f, t),
                    e.prototype.destroy.call(this, t),
                    this.context = null,
                    this.canvas = null,
                    this._style = null
                }
                ,
                i(t, [{
                    key: "width",
                    get: function() {
                        return this.updateText(!0),
                        Math.abs(this.scale.x) * this._texture.orig.width
                    },
                    set: function(e) {
                        this.updateText(!0);
                        var t = (0,
                        l.sign)(this.scale.x) || 1;
                        this.scale.x = t * e / this._texture.orig.width,
                        this._width = e
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.updateText(!0),
                        Math.abs(this.scale.y) * this._texture.orig.height
                    },
                    set: function(e) {
                        this.updateText(!0);
                        var t = (0,
                        l.sign)(this.scale.y) || 1;
                        this.scale.y = t * e / this._texture.orig.height,
                        this._height = e
                    }
                }, {
                    key: "style",
                    get: function() {
                        return this._style
                    },
                    set: function(e) {
                        (e = e || {})instanceof h.default ? this._style = e : this._style = new h.default(e),
                        this.localStyleID = -1,
                        this.dirty = !0
                    }
                }, {
                    key: "text",
                    get: function() {
                        return this._text
                    },
                    set: function(e) {
                        e = String("" === e || null === e || void 0 === e ? " " : e),
                        this._text !== e && (this._text = e,
                        this.dirty = !0)
                    }
                }]),
                t
            }(o.default);
            n.default = g
        }
        , {
            "../const": 46,
            "../math": 70,
            "../settings": 101,
            "../sprites/Sprite": 102,
            "../textures/Texture": 115,
            "../utils": 124,
            "../utils/trimCanvas": 129,
            "./TextMetrics": 109,
            "./TextStyle": 110
        }],
        109: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(t, n, r, i, o, s, a, l, u) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.text = t,
                    this.style = n,
                    this.width = r,
                    this.height = i,
                    this.lines = o,
                    this.lineWidths = s,
                    this.lineHeight = a,
                    this.maxLineWidth = l,
                    this.fontProperties = u
                }
                return e.measureText = function(t, n, r) {
                    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e._canvas;
                    r = r || n.wordWrap;
                    var o = n.toFontString()
                      , s = e.measureFont(o)
                      , a = i.getContext("2d");
                    a.font = o;
                    for (var l = (r ? e.wordWrap(t, n, i) : t).split(/(?:\r\n|\r|\n)/), u = new Array(l.length), c = 0, h = 0; h < l.length; h++) {
                        var d = a.measureText(l[h]).width + (l[h].length - 1) * n.letterSpacing;
                        u[h] = d,
                        c = Math.max(c, d)
                    }
                    var p = c + n.strokeThickness;
                    n.dropShadow && (p += n.dropShadowDistance);
                    var f = n.lineHeight || s.fontSize + n.strokeThickness
                      , g = Math.max(f, s.fontSize + n.strokeThickness) + (l.length - 1) * (f + n.leading);
                    return n.dropShadow && (g += n.dropShadowDistance),
                    new e(t,n,p,g,l,u,f + n.leading,c,s)
                }
                ,
                e.wordWrap = function(t, n) {
                    for (var r = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e._canvas).getContext("2d"), i = "", o = t.split("\n"), s = n.wordWrapWidth, a = {}, l = 0; l < o.length; l++) {
                        for (var u = s, c = o[l].split(" "), h = 0; h < c.length; h++) {
                            var d = r.measureText(c[h]).width;
                            if (n.breakWords && d > s)
                                for (var p = c[h].split(""), f = 0; f < p.length; f++) {
                                    var g = p[f]
                                      , m = a[g];
                                    void 0 === m && (m = r.measureText(g).width,
                                    a[g] = m),
                                    m > u ? (i += "\n" + g,
                                    u = s - m) : (0 === f && (i += " "),
                                    i += g,
                                    u -= m)
                                }
                            else {
                                var v = d + r.measureText(" ").width;
                                0 === h || v > u ? (h > 0 && (i += "\n"),
                                i += c[h],
                                u = s - d) : (u -= v,
                                i += " " + c[h])
                            }
                        }
                        l < o.length - 1 && (i += "\n")
                    }
                    return i
                }
                ,
                e.measureFont = function(t) {
                    if (e._fonts[t])
                        return e._fonts[t];
                    var n = {}
                      , r = e._canvas
                      , i = e._context;
                    i.font = t;
                    var o = Math.ceil(i.measureText("|MÉq").width)
                      , s = Math.ceil(i.measureText("M").width)
                      , a = 2 * s;
                    s = 1.4 * s | 0,
                    r.width = o,
                    r.height = a,
                    i.fillStyle = "#f00",
                    i.fillRect(0, 0, o, a),
                    i.font = t,
                    i.textBaseline = "alphabetic",
                    i.fillStyle = "#000",
                    i.fillText("|MÉq", 0, s);
                    var l = i.getImageData(0, 0, o, a).data
                      , u = l.length
                      , c = 4 * o
                      , h = 0
                      , d = 0
                      , p = !1;
                    for (h = 0; h < s; ++h) {
                        for (var f = 0; f < c; f += 4)
                            if (255 !== l[d + f]) {
                                p = !0;
                                break
                            }
                        if (p)
                            break;
                        d += c
                    }
                    for (n.ascent = s - h,
                    d = u - c,
                    p = !1,
                    h = a; h > s; --h) {
                        for (var g = 0; g < c; g += 4)
                            if (255 !== l[d + g]) {
                                p = !0;
                                break
                            }
                        if (p)
                            break;
                        d -= c
                    }
                    return n.descent = h - s,
                    n.fontSize = n.ascent + n.descent,
                    e._fonts[t] = n,
                    n
                }
                ,
                e
            }();
            n.default = r;
            var i = document.createElement("canvas");
            i.width = i.height = 10,
            r._canvas = i,
            r._context = i.getContext("2d"),
            r._fonts = {}
        }
        , {}],
        110: [function(e, t, n) {
            function r(e) {
                return "number" == typeof e ? (0,
                a.hex2string)(e) : ("string" == typeof e && 0 === e.indexOf("0x") && (e = e.replace("0x", "#")),
                e)
            }
            function i(e) {
                if (Array.isArray(e)) {
                    for (var t = 0; t < e.length; ++t)
                        e[t] = r(e[t]);
                    return e
                }
                return r(e)
            }
            n.__esModule = !0;
            var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , s = e("../const")
              , a = e("../utils")
              , l = {
                align: "left",
                breakWords: !1,
                dropShadow: !1,
                dropShadowAlpha: 1,
                dropShadowAngle: Math.PI / 6,
                dropShadowBlur: 0,
                dropShadowColor: "black",
                dropShadowDistance: 5,
                fill: "black",
                fillGradientType: s.TEXT_GRADIENT.LINEAR_VERTICAL,
                fillGradientStops: [],
                fontFamily: "Arial",
                fontSize: 26,
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: "normal",
                letterSpacing: 0,
                lineHeight: 0,
                lineJoin: "miter",
                miterLimit: 10,
                padding: 0,
                stroke: "black",
                strokeThickness: 0,
                textBaseline: "alphabetic",
                trim: !1,
                wordWrap: !1,
                wordWrapWidth: 100,
                leading: 0
            }
              , u = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.styleID = 0,
                    Object.assign(this, l, t)
                }
                return e.prototype.clone = function() {
                    var t = {};
                    for (var n in l)
                        t[n] = this[n];
                    return new e(t)
                }
                ,
                e.prototype.reset = function() {
                    Object.assign(this, l)
                }
                ,
                e.prototype.toFontString = function() {
                    var e = "number" == typeof this.fontSize ? this.fontSize + "px" : this.fontSize
                      , t = this.fontFamily;
                    Array.isArray(this.fontFamily) || (t = this.fontFamily.split(","));
                    for (var n = t.length - 1; n >= 0; n--) {
                        var r = t[n].trim();
                        /([\"\'])[^\'\"]+\1/.test(r) || (r = '"' + r + '"'),
                        t[n] = r
                    }
                    return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + e + " " + t.join(",")
                }
                ,
                o(e, [{
                    key: "align",
                    get: function() {
                        return this._align
                    },
                    set: function(e) {
                        this._align !== e && (this._align = e,
                        this.styleID++)
                    }
                }, {
                    key: "breakWords",
                    get: function() {
                        return this._breakWords
                    },
                    set: function(e) {
                        this._breakWords !== e && (this._breakWords = e,
                        this.styleID++)
                    }
                }, {
                    key: "dropShadow",
                    get: function() {
                        return this._dropShadow
                    },
                    set: function(e) {
                        this._dropShadow !== e && (this._dropShadow = e,
                        this.styleID++)
                    }
                }, {
                    key: "dropShadowAlpha",
                    get: function() {
                        return this._dropShadowAlpha
                    },
                    set: function(e) {
                        this._dropShadowAlpha !== e && (this._dropShadowAlpha = e,
                        this.styleID++)
                    }
                }, {
                    key: "dropShadowAngle",
                    get: function() {
                        return this._dropShadowAngle
                    },
                    set: function(e) {
                        this._dropShadowAngle !== e && (this._dropShadowAngle = e,
                        this.styleID++)
                    }
                }, {
                    key: "dropShadowBlur",
                    get: function() {
                        return this._dropShadowBlur
                    },
                    set: function(e) {
                        this._dropShadowBlur !== e && (this._dropShadowBlur = e,
                        this.styleID++)
                    }
                }, {
                    key: "dropShadowColor",
                    get: function() {
                        return this._dropShadowColor
                    },
                    set: function(e) {
                        var t = i(e);
                        this._dropShadowColor !== t && (this._dropShadowColor = t,
                        this.styleID++)
                    }
                }, {
                    key: "dropShadowDistance",
                    get: function() {
                        return this._dropShadowDistance
                    },
                    set: function(e) {
                        this._dropShadowDistance !== e && (this._dropShadowDistance = e,
                        this.styleID++)
                    }
                }, {
                    key: "fill",
                    get: function() {
                        return this._fill
                    },
                    set: function(e) {
                        var t = i(e);
                        this._fill !== t && (this._fill = t,
                        this.styleID++)
                    }
                }, {
                    key: "fillGradientType",
                    get: function() {
                        return this._fillGradientType
                    },
                    set: function(e) {
                        this._fillGradientType !== e && (this._fillGradientType = e,
                        this.styleID++)
                    }
                }, {
                    key: "fillGradientStops",
                    get: function() {
                        return this._fillGradientStops
                    },
                    set: function(e) {
                        (function(e, t) {
                            if (!Array.isArray(e) || !Array.isArray(t))
                                return !1;
                            if (e.length !== t.length)
                                return !1;
                            for (var n = 0; n < e.length; ++n)
                                if (e[n] !== t[n])
                                    return !1;
                            return !0
                        }
                        )(this._fillGradientStops, e) || (this._fillGradientStops = e,
                        this.styleID++)
                    }
                }, {
                    key: "fontFamily",
                    get: function() {
                        return this._fontFamily
                    },
                    set: function(e) {
                        this.fontFamily !== e && (this._fontFamily = e,
                        this.styleID++)
                    }
                }, {
                    key: "fontSize",
                    get: function() {
                        return this._fontSize
                    },
                    set: function(e) {
                        this._fontSize !== e && (this._fontSize = e,
                        this.styleID++)
                    }
                }, {
                    key: "fontStyle",
                    get: function() {
                        return this._fontStyle
                    },
                    set: function(e) {
                        this._fontStyle !== e && (this._fontStyle = e,
                        this.styleID++)
                    }
                }, {
                    key: "fontVariant",
                    get: function() {
                        return this._fontVariant
                    },
                    set: function(e) {
                        this._fontVariant !== e && (this._fontVariant = e,
                        this.styleID++)
                    }
                }, {
                    key: "fontWeight",
                    get: function() {
                        return this._fontWeight
                    },
                    set: function(e) {
                        this._fontWeight !== e && (this._fontWeight = e,
                        this.styleID++)
                    }
                }, {
                    key: "letterSpacing",
                    get: function() {
                        return this._letterSpacing
                    },
                    set: function(e) {
                        this._letterSpacing !== e && (this._letterSpacing = e,
                        this.styleID++)
                    }
                }, {
                    key: "lineHeight",
                    get: function() {
                        return this._lineHeight
                    },
                    set: function(e) {
                        this._lineHeight !== e && (this._lineHeight = e,
                        this.styleID++)
                    }
                }, {
                    key: "leading",
                    get: function() {
                        return this._leading
                    },
                    set: function(e) {
                        this._leading !== e && (this._leading = e,
                        this.styleID++)
                    }
                }, {
                    key: "lineJoin",
                    get: function() {
                        return this._lineJoin
                    },
                    set: function(e) {
                        this._lineJoin !== e && (this._lineJoin = e,
                        this.styleID++)
                    }
                }, {
                    key: "miterLimit",
                    get: function() {
                        return this._miterLimit
                    },
                    set: function(e) {
                        this._miterLimit !== e && (this._miterLimit = e,
                        this.styleID++)
                    }
                }, {
                    key: "padding",
                    get: function() {
                        return this._padding
                    },
                    set: function(e) {
                        this._padding !== e && (this._padding = e,
                        this.styleID++)
                    }
                }, {
                    key: "stroke",
                    get: function() {
                        return this._stroke
                    },
                    set: function(e) {
                        var t = i(e);
                        this._stroke !== t && (this._stroke = t,
                        this.styleID++)
                    }
                }, {
                    key: "strokeThickness",
                    get: function() {
                        return this._strokeThickness
                    },
                    set: function(e) {
                        this._strokeThickness !== e && (this._strokeThickness = e,
                        this.styleID++)
                    }
                }, {
                    key: "textBaseline",
                    get: function() {
                        return this._textBaseline
                    },
                    set: function(e) {
                        this._textBaseline !== e && (this._textBaseline = e,
                        this.styleID++)
                    }
                }, {
                    key: "trim",
                    get: function() {
                        return this._trim
                    },
                    set: function(e) {
                        this._trim !== e && (this._trim = e,
                        this.styleID++)
                    }
                }, {
                    key: "wordWrap",
                    get: function() {
                        return this._wordWrap
                    },
                    set: function(e) {
                        this._wordWrap !== e && (this._wordWrap = e,
                        this.styleID++)
                    }
                }, {
                    key: "wordWrapWidth",
                    get: function() {
                        return this._wordWrapWidth
                    },
                    set: function(e) {
                        this._wordWrapWidth !== e && (this._wordWrapWidth = e,
                        this.styleID++)
                    }
                }]),
                e
            }();
            n.default = u
        }
        , {
            "../const": 46,
            "../utils": 124
        }],
        111: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("./BaseTexture"))
              , o = r(e("../settings"))
              , s = function(e) {
                function t() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100
                      , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100
                      , i = arguments[2]
                      , s = arguments[3];
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var a = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, null, i));
                    return a.resolution = s || o.default.RESOLUTION,
                    a.width = n,
                    a.height = r,
                    a.realWidth = a.width * a.resolution,
                    a.realHeight = a.height * a.resolution,
                    a.scaleMode = void 0 !== i ? i : o.default.SCALE_MODE,
                    a.hasLoaded = !0,
                    a._glRenderTargets = {},
                    a._canvasRenderTarget = null,
                    a.valid = !1,
                    a
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.resize = function(e, t) {
                    e === this.width && t === this.height || (this.valid = e > 0 && t > 0,
                    this.width = e,
                    this.height = t,
                    this.realWidth = this.width * this.resolution,
                    this.realHeight = this.height * this.resolution,
                    this.valid && this.emit("update", this))
                }
                ,
                t.prototype.destroy = function() {
                    e.prototype.destroy.call(this, !0),
                    this.renderer = null
                }
                ,
                t
            }(i.default);
            n.default = s
        }
        , {
            "../settings": 101,
            "./BaseTexture": 112
        }],
        112: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("../utils")
              , o = r(e("../settings"))
              , s = r(e("eventemitter3"))
              , a = r(e("../utils/determineCrossOrigin"))
              , l = r(e("bit-twiddle"))
              , u = function(e) {
                function t(n, r, s) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var a = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return a.uid = (0,
                    i.uid)(),
                    a.touched = 0,
                    a.resolution = s || o.default.RESOLUTION,
                    a.width = 100,
                    a.height = 100,
                    a.realWidth = 100,
                    a.realHeight = 100,
                    a.scaleMode = void 0 !== r ? r : o.default.SCALE_MODE,
                    a.hasLoaded = !1,
                    a.isLoading = !1,
                    a.source = null,
                    a.origSource = null,
                    a.imageType = null,
                    a.sourceScale = 1,
                    a.premultipliedAlpha = !0,
                    a.imageUrl = null,
                    a.isPowerOfTwo = !1,
                    a.mipmap = o.default.MIPMAP_TEXTURES,
                    a.wrapMode = o.default.WRAP_MODE,
                    a._glTextures = {},
                    a._enabled = 0,
                    a._virtalBoundId = -1,
                    a._destroyed = !1,
                    a.textureCacheIds = [],
                    n && a.loadSource(n),
                    a
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.update = function(e) {
                    "svg" !== this.imageType && (this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width,
                    this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height,
                    this._updateDimensions()),
                    e || this.emit("update", this)
                }
                ,
                t.prototype._updateDimensions = function() {
                    this.width = this.realWidth / this.resolution,
                    this.height = this.realHeight / this.resolution,
                    this.isPowerOfTwo = l.default.isPow2(this.realWidth) && l.default.isPow2(this.realHeight)
                }
                ,
                t.prototype.loadSource = function(e) {
                    var t = this.isLoading;
                    this.hasLoaded = !1,
                    this.isLoading = !1,
                    t && this.source && (this.source.onload = null,
                    this.source.onerror = null);
                    var n = !this.source;
                    if (this.source = e,
                    (e.src && e.complete || e.getContext) && e.width && e.height) {
                        this._updateImageType(),
                        "svg" === this.imageType && this._loadSvgSource();
                        var r = this;
                        n && (window.createImageBitmap && !e.getContext ? (r.hasLoaded = !0,
                        r.update(!0),
                        window.createImageBitmap(e).then(function(e) {
                            r.source = e,
                            r.emit("loaded", r)
                        })) : (this._sourceLoaded(),
                        r.emit("loaded", r)))
                    } else if (!e.getContext) {
                        this.isLoading = !0;
                        r = this;
                        if (e.onload = function() {
                            r._updateImageType(),
                            e.onload = null,
                            e.onerror = null,
                            r.isLoading && (r.isLoading = !1,
                            "svg" !== r.imageType ? window.createImageBitmap ? (r.hasLoaded = !0,
                            r.update(!0),
                            window.createImageBitmap(e).then(function(e) {
                                r.source = e,
                                r.emit("loaded", r)
                            })) : (r._sourceLoaded(),
                            r.emit("loaded", r)) : r._loadSvgSource())
                        }
                        ,
                        e.onerror = function() {
                            e.onload = null,
                            e.onerror = null,
                            r.isLoading && (r.isLoading = !1,
                            r.emit("error", r))
                        }
                        ,
                        e.complete && e.src) {
                            if (e.onload = null,
                            e.onerror = null,
                            "svg" === r.imageType)
                                return void r._loadSvgSource();
                            this.isLoading = !1,
                            e.width && e.height ? t && (window.createImageBitmap ? (r.hasLoaded = !0,
                            r.update(!0),
                            window.createImageBitmap(e).then(function(e) {
                                r.source = e,
                                r.emit("loaded", r)
                            })) : (this._sourceLoaded(),
                            r.emit("loaded", r))) : t && this.emit("error", this)
                        }
                    }
                }
                ,
                t.prototype._updateImageType = function() {
                    if (this.imageUrl) {
                        var e = (0,
                        i.decomposeDataUri)(this.imageUrl)
                          , t = void 0;
                        if (e && "image" === e.mediaType) {
                            var n = e.subType.split("+")[0];
                            if (!(t = (0,
                            i.getUrlFileExtension)("." + n)))
                                throw new Error("Invalid image type in data URI.")
                        } else
                            (t = (0,
                            i.getUrlFileExtension)(this.imageUrl)) || (t = "png");
                        this.imageType = t
                    }
                }
                ,
                t.prototype._loadSvgSource = function() {
                    if ("svg" === this.imageType) {
                        var e = (0,
                        i.decomposeDataUri)(this.imageUrl);
                        e ? this._loadSvgSourceUsingDataUri(e) : this._loadSvgSourceUsingXhr()
                    }
                }
                ,
                t.prototype._loadSvgSourceUsingDataUri = function(e) {
                    var t = void 0;
                    if ("base64" === e.encoding) {
                        if (!atob)
                            throw new Error("Your browser doesn't support base64 conversions.");
                        t = atob(e.data)
                    } else
                        t = e.data;
                    this._loadSvgSourceUsingString(t)
                }
                ,
                t.prototype._loadSvgSourceUsingXhr = function() {
                    var e = this
                      , t = new XMLHttpRequest;
                    t.onload = function() {
                        if (t.readyState !== t.DONE || 200 !== t.status)
                            throw new Error("Failed to load SVG using XHR.");
                        e._loadSvgSourceUsingString(t.response)
                    }
                    ,
                    t.onerror = function() {
                        return e.emit("error", e)
                    }
                    ,
                    t.open("GET", this.imageUrl, !0),
                    t.send()
                }
                ,
                t.prototype._loadSvgSourceUsingString = function(e) {
                    var n = (0,
                    i.getSvgSize)(e)
                      , r = n.width
                      , o = n.height;
                    if (!r || !o)
                        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                    this.realWidth = Math.round(r * this.sourceScale),
                    this.realHeight = Math.round(o * this.sourceScale),
                    this._updateDimensions();
                    var s = document.createElement("canvas");
                    s.width = this.realWidth,
                    s.height = this.realHeight,
                    s._pixiId = "canvas_" + (0,
                    i.uid)(),
                    s.getContext("2d").drawImage(this.source, 0, 0, r, o, 0, 0, this.realWidth, this.realHeight),
                    this.origSource = this.source,
                    this.source = s,
                    t.addToCache(this, s._pixiId),
                    this.isLoading = !1,
                    this._sourceLoaded(),
                    this.emit("loaded", this)
                }
                ,
                t.prototype._sourceLoaded = function() {
                    this.hasLoaded = !0,
                    this.update()
                }
                ,
                t.prototype.destroy = function() {
                    this.imageUrl && (delete i.TextureCache[this.imageUrl],
                    this.imageUrl = null,
                    navigator.isCocoonJS || (this.source.src = "")),
                    this.source = null,
                    this.dispose(),
                    t.removeFromCache(this),
                    this.textureCacheIds = null,
                    this._destroyed = !0
                }
                ,
                t.prototype.dispose = function() {
                    this.emit("dispose", this)
                }
                ,
                t.prototype.updateSourceImage = function(e) {
                    this.source.src = e,
                    this.loadSource(this.source)
                }
                ,
                t.fromImage = function(e, n, r, o) {
                    var s = i.BaseTextureCache[e];
                    if (!s) {
                        var l = new Image;
                        void 0 === n && 0 !== e.indexOf("data:") ? l.crossOrigin = (0,
                        a.default)(e) : n && (l.crossOrigin = "string" == typeof n ? n : "anonymous"),
                        (s = new t(l,r)).imageUrl = e,
                        o && (s.sourceScale = o),
                        s.resolution = (0,
                        i.getResolutionOfUrl)(e),
                        l.src = e,
                        t.addToCache(s, e)
                    }
                    return s
                }
                ,
                t.fromCanvas = function(e, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "canvas";
                    e._pixiId || (e._pixiId = r + "_" + (0,
                    i.uid)());
                    var o = i.BaseTextureCache[e._pixiId];
                    return o || (o = new t(e,n),
                    t.addToCache(o, e._pixiId)),
                    o
                }
                ,
                t.from = function(e, n, r) {
                    if ("string" == typeof e)
                        return t.fromImage(e, void 0, n, r);
                    if (e instanceof HTMLImageElement) {
                        var o = e.src
                          , s = i.BaseTextureCache[o];
                        return s || ((s = new t(e,n)).imageUrl = o,
                        r && (s.sourceScale = r),
                        s.resolution = (0,
                        i.getResolutionOfUrl)(o),
                        t.addToCache(s, o)),
                        s
                    }
                    return e instanceof HTMLCanvasElement ? t.fromCanvas(e, n) : e
                }
                ,
                t.addToCache = function(e, t) {
                    t && (-1 === e.textureCacheIds.indexOf(t) && e.textureCacheIds.push(t),
                    i.BaseTextureCache[t] && console.warn("BaseTexture added to the cache with an id [" + t + "] that already had an entry"),
                    i.BaseTextureCache[t] = e)
                }
                ,
                t.removeFromCache = function(e) {
                    if ("string" == typeof e) {
                        var t = i.BaseTextureCache[e];
                        if (t) {
                            var n = t.textureCacheIds.indexOf(e);
                            return n > -1 && t.textureCacheIds.splice(n, 1),
                            delete i.BaseTextureCache[e],
                            t
                        }
                    } else if (e && e.textureCacheIds) {
                        for (var r = 0; r < e.textureCacheIds.length; ++r)
                            delete i.BaseTextureCache[e.textureCacheIds[r]];
                        return e.textureCacheIds.length = 0,
                        e
                    }
                    return null
                }
                ,
                t
            }(s.default);
            n.default = u
        }
        , {
            "../settings": 101,
            "../utils": 124,
            "../utils/determineCrossOrigin": 123,
            "bit-twiddle": 1,
            eventemitter3: 3
        }],
        113: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("./BaseRenderTexture"))
              , o = function(e) {
                function t(n, r) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var o = null;
                    if (!(n instanceof i.default)) {
                        var s = arguments[1]
                          , a = arguments[2]
                          , l = arguments[3]
                          , u = arguments[4];
                        console.warn("Please use RenderTexture.create(" + s + ", " + a + ") instead of the ctor directly."),
                        o = arguments[0],
                        r = null,
                        n = new i.default(s,a,l,u)
                    }
                    var c = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n, r));
                    return c.legacyRenderer = o,
                    c.valid = !0,
                    c._updateUvs(),
                    c
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.resize = function(e, t, n) {
                    this.valid = e > 0 && t > 0,
                    this._frame.width = this.orig.width = e,
                    this._frame.height = this.orig.height = t,
                    n || this.baseTexture.resize(e, t),
                    this._updateUvs()
                }
                ,
                t.create = function(e, n, r, o) {
                    return new t(new i.default(e,n,r,o))
                }
                ,
                t
            }(r(e("./Texture")).default);
            n.default = o
        }
        , {
            "./BaseRenderTexture": 111,
            "./Texture": 115
        }],
        114: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = e("../")
              , o = e("../utils")
              , s = function() {
                function e(t, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.baseTexture = t,
                    this.textures = {},
                    this.data = n,
                    this.resolution = this._updateResolution(r || this.baseTexture.imageUrl),
                    this._frames = this.data.frames,
                    this._frameKeys = Object.keys(this._frames),
                    this._batchIndex = 0,
                    this._callback = null
                }
                return r(e, null, [{
                    key: "BATCH_SIZE",
                    get: function() {
                        return 1e3
                    }
                }]),
                e.prototype._updateResolution = function(e) {
                    var t = this.data.meta.scale
                      , n = (0,
                    o.getResolutionOfUrl)(e, null);
                    return null === n && (n = void 0 !== t ? parseFloat(t) : 1),
                    1 !== n && (this.baseTexture.resolution = n,
                    this.baseTexture.update()),
                    n
                }
                ,
                e.prototype.parse = function(t) {
                    this._batchIndex = 0,
                    this._callback = t,
                    this._frameKeys.length <= e.BATCH_SIZE ? (this._processFrames(0),
                    this._parseComplete()) : this._nextBatch()
                }
                ,
                e.prototype._processFrames = function(t) {
                    for (var n = t, r = e.BATCH_SIZE, o = this.baseTexture.sourceScale; n - t < r && n < this._frameKeys.length; ) {
                        var s = this._frameKeys[n]
                          , a = this._frames[s].frame;
                        if (a) {
                            var l = null
                              , u = null
                              , c = new i.Rectangle(0,0,Math.floor(this._frames[s].sourceSize.w * o) / this.resolution,Math.floor(this._frames[s].sourceSize.h * o) / this.resolution);
                            l = this._frames[s].rotated ? new i.Rectangle(Math.floor(a.x * o) / this.resolution,Math.floor(a.y * o) / this.resolution,Math.floor(a.h * o) / this.resolution,Math.floor(a.w * o) / this.resolution) : new i.Rectangle(Math.floor(a.x * o) / this.resolution,Math.floor(a.y * o) / this.resolution,Math.floor(a.w * o) / this.resolution,Math.floor(a.h * o) / this.resolution),
                            this._frames[s].trimmed && (u = new i.Rectangle(Math.floor(this._frames[s].spriteSourceSize.x * o) / this.resolution,Math.floor(this._frames[s].spriteSourceSize.y * o) / this.resolution,Math.floor(a.w * o) / this.resolution,Math.floor(a.h * o) / this.resolution)),
                            this.textures[s] = new i.Texture(this.baseTexture,l,c,u,this._frames[s].rotated ? 2 : 0),
                            i.Texture.addToCache(this.textures[s], s)
                        }
                        n++
                    }
                }
                ,
                e.prototype._parseComplete = function() {
                    var e = this._callback;
                    this._callback = null,
                    this._batchIndex = 0,
                    e.call(this, this.textures)
                }
                ,
                e.prototype._nextBatch = function() {
                    var t = this;
                    this._processFrames(this._batchIndex * e.BATCH_SIZE),
                    this._batchIndex++,
                    setTimeout(function() {
                        t._batchIndex * e.BATCH_SIZE < t._frameKeys.length ? t._nextBatch() : t._parseComplete()
                    }, 0)
                }
                ,
                e.prototype.destroy = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    for (var t in this.textures)
                        this.textures[t].destroy();
                    this._frames = null,
                    this._frameKeys = null,
                    this.data = null,
                    this.textures = null,
                    e && this.baseTexture.destroy(),
                    this.baseTexture = null
                }
                ,
                e
            }();
            n.default = s
        }
        , {
            "../": 65,
            "../utils": 124
        }],
        115: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function i(e) {
                e.destroy = function() {}
                ,
                e.on = function() {}
                ,
                e.once = function() {}
                ,
                e.emit = function() {}
            }
            n.__esModule = !0;
            var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , s = r(e("./BaseTexture"))
              , a = r(e("./VideoBaseTexture"))
              , l = r(e("./TextureUvs"))
              , u = r(e("eventemitter3"))
              , c = e("../math")
              , h = e("../utils")
              , d = r(e("../settings"))
              , p = function(e) {
                function t(n, r, i, o, s) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var a = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    if (a.noFrame = !1,
                    r || (a.noFrame = !0,
                    r = new c.Rectangle(0,0,1,1)),
                    n instanceof t && (n = n.baseTexture),
                    a.baseTexture = n,
                    a._frame = r,
                    a.trim = o,
                    a.valid = !1,
                    a.requiresUpdate = !1,
                    a._uvs = null,
                    a.orig = i || r,
                    a._rotate = Number(s || 0),
                    !0 === s)
                        a._rotate = 2;
                    else if (a._rotate % 2 != 0)
                        throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
                    return n.hasLoaded ? (a.noFrame && (r = new c.Rectangle(0,0,n.width,n.height),
                    n.on("update", a.onBaseTextureUpdated, a)),
                    a.frame = r) : n.once("loaded", a.onBaseTextureLoaded, a),
                    a._updateID = 0,
                    a.transform = null,
                    a.textureCacheIds = [],
                    a
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.update = function() {
                    this.baseTexture.update()
                }
                ,
                t.prototype.onBaseTextureLoaded = function(e) {
                    this._updateID++,
                    this.noFrame ? this.frame = new c.Rectangle(0,0,e.width,e.height) : this.frame = this._frame,
                    this.baseTexture.on("update", this.onBaseTextureUpdated, this),
                    this.emit("update", this)
                }
                ,
                t.prototype.onBaseTextureUpdated = function(e) {
                    this._updateID++,
                    this._frame.width = e.width,
                    this._frame.height = e.height,
                    this.emit("update", this)
                }
                ,
                t.prototype.destroy = function(e) {
                    this.baseTexture && (e && (h.TextureCache[this.baseTexture.imageUrl] && t.removeFromCache(this.baseTexture.imageUrl),
                    this.baseTexture.destroy()),
                    this.baseTexture.off("update", this.onBaseTextureUpdated, this),
                    this.baseTexture.off("loaded", this.onBaseTextureLoaded, this),
                    this.baseTexture = null),
                    this._frame = null,
                    this._uvs = null,
                    this.trim = null,
                    this.orig = null,
                    this.valid = !1,
                    t.removeFromCache(this),
                    this.textureCacheIds = null
                }
                ,
                t.prototype.clone = function() {
                    return new t(this.baseTexture,this.frame,this.orig,this.trim,this.rotate)
                }
                ,
                t.prototype._updateUvs = function() {
                    this._uvs || (this._uvs = new l.default),
                    this._uvs.set(this._frame, this.baseTexture, this.rotate),
                    this._updateID++
                }
                ,
                t.fromImage = function(e, n, r, i) {
                    var o = h.TextureCache[e];
                    return o || (o = new t(s.default.fromImage(e, n, r, i)),
                    t.addToCache(o, e)),
                    o
                }
                ,
                t.fromFrame = function(e) {
                    var t = h.TextureCache[e];
                    if (!t)
                        throw new Error('The frameId "' + e + '" does not exist in the texture cache');
                    return t
                }
                ,
                t.fromCanvas = function(e, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "canvas";
                    return new t(s.default.fromCanvas(e, n, r))
                }
                ,
                t.fromVideo = function(e, n) {
                    return "string" == typeof e ? t.fromVideoUrl(e, n) : new t(a.default.fromVideo(e, n))
                }
                ,
                t.fromVideoUrl = function(e, n) {
                    return new t(a.default.fromUrl(e, n))
                }
                ,
                t.from = function(e) {
                    if ("string" == typeof e) {
                        var n = h.TextureCache[e];
                        if (!n) {
                            return null !== e.match(/\.(mp4|webm|ogg|h264|avi|mov)$/) ? t.fromVideoUrl(e) : t.fromImage(e)
                        }
                        return n
                    }
                    return e instanceof HTMLImageElement ? new t(s.default.from(e)) : e instanceof HTMLCanvasElement ? t.fromCanvas(e, d.default.SCALE_MODE, "HTMLCanvasElement") : e instanceof HTMLVideoElement ? t.fromVideo(e) : e instanceof s.default ? new t(e) : e
                }
                ,
                t.fromLoader = function(e, n, r) {
                    var i = new s.default(e,void 0,(0,
                    h.getResolutionOfUrl)(n))
                      , o = new t(i);
                    return i.imageUrl = n,
                    r || (r = n),
                    s.default.addToCache(o.baseTexture, r),
                    t.addToCache(o, r),
                    r !== n && (s.default.addToCache(o.baseTexture, n),
                    t.addToCache(o, n)),
                    o
                }
                ,
                t.addToCache = function(e, t) {
                    t && (-1 === e.textureCacheIds.indexOf(t) && e.textureCacheIds.push(t),
                    h.TextureCache[t] && console.warn("Texture added to the cache with an id [" + t + "] that already had an entry"),
                    h.TextureCache[t] = e)
                }
                ,
                t.removeFromCache = function(e) {
                    if ("string" == typeof e) {
                        var t = h.TextureCache[e];
                        if (t) {
                            var n = t.textureCacheIds.indexOf(e);
                            return n > -1 && t.textureCacheIds.splice(n, 1),
                            delete h.TextureCache[e],
                            t
                        }
                    } else if (e && e.textureCacheIds) {
                        for (var r = 0; r < e.textureCacheIds.length; ++r)
                            h.TextureCache[e.textureCacheIds[r]] === e && delete h.TextureCache[e.textureCacheIds[r]];
                        return e.textureCacheIds.length = 0,
                        e
                    }
                    return null
                }
                ,
                o(t, [{
                    key: "frame",
                    get: function() {
                        return this._frame
                    },
                    set: function(e) {
                        this._frame = e,
                        this.noFrame = !1;
                        var t = e.x
                          , n = e.y
                          , r = e.width
                          , i = e.height
                          , o = t + r > this.baseTexture.width
                          , s = n + i > this.baseTexture.height;
                        if (o || s) {
                            var a = o && s ? "and" : "or"
                              , l = "X: " + t + " + " + r + " = " + (t + r) + " > " + this.baseTexture.width
                              , u = "Y: " + n + " + " + i + " = " + (n + i) + " > " + this.baseTexture.height;
                            throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + l + " " + a + " " + u)
                        }
                        this.valid = r && i && this.baseTexture.hasLoaded,
                        this.trim || this.rotate || (this.orig = e),
                        this.valid && this._updateUvs()
                    }
                }, {
                    key: "rotate",
                    get: function() {
                        return this._rotate
                    },
                    set: function(e) {
                        this._rotate = e,
                        this.valid && this._updateUvs()
                    }
                }, {
                    key: "width",
                    get: function() {
                        return this.orig.width
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this.orig.height
                    }
                }]),
                t
            }(u.default);
            n.default = p,
            p.EMPTY = new p(new s.default),
            i(p.EMPTY),
            i(p.EMPTY.baseTexture),
            p.WHITE = function() {
                var e = document.createElement("canvas");
                e.width = 10,
                e.height = 10;
                var t = e.getContext("2d");
                return t.fillStyle = "white",
                t.fillRect(0, 0, 10, 10),
                new p(new s.default(e))
            }(),
            i(p.WHITE),
            i(p.WHITE.baseTexture)
        }
        , {
            "../math": 70,
            "../settings": 101,
            "../utils": 124,
            "./BaseTexture": 112,
            "./TextureUvs": 116,
            "./VideoBaseTexture": 117,
            eventemitter3: 3
        }],
        116: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../math/GroupD8"))
              , i = function() {
                function e() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.x0 = 0,
                    this.y0 = 0,
                    this.x1 = 1,
                    this.y1 = 0,
                    this.x2 = 1,
                    this.y2 = 1,
                    this.x3 = 0,
                    this.y3 = 1,
                    this.uvsUint32 = new Uint32Array(4)
                }
                return e.prototype.set = function(e, t, n) {
                    var i = t.width
                      , o = t.height;
                    if (n) {
                        var s = e.width / 2 / i
                          , a = e.height / 2 / o
                          , l = e.x / i + s
                          , u = e.y / o + a;
                        n = r.default.add(n, r.default.NW),
                        this.x0 = l + s * r.default.uX(n),
                        this.y0 = u + a * r.default.uY(n),
                        n = r.default.add(n, 2),
                        this.x1 = l + s * r.default.uX(n),
                        this.y1 = u + a * r.default.uY(n),
                        n = r.default.add(n, 2),
                        this.x2 = l + s * r.default.uX(n),
                        this.y2 = u + a * r.default.uY(n),
                        n = r.default.add(n, 2),
                        this.x3 = l + s * r.default.uX(n),
                        this.y3 = u + a * r.default.uY(n)
                    } else
                        this.x0 = e.x / i,
                        this.y0 = e.y / o,
                        this.x1 = (e.x + e.width) / i,
                        this.y1 = e.y / o,
                        this.x2 = (e.x + e.width) / i,
                        this.y2 = (e.y + e.height) / o,
                        this.x3 = e.x / i,
                        this.y3 = (e.y + e.height) / o;
                    this.uvsUint32[0] = (65535 * this.y0 & 65535) << 16 | 65535 * this.x0 & 65535,
                    this.uvsUint32[1] = (65535 * this.y1 & 65535) << 16 | 65535 * this.x1 & 65535,
                    this.uvsUint32[2] = (65535 * this.y2 & 65535) << 16 | 65535 * this.x2 & 65535,
                    this.uvsUint32[3] = (65535 * this.y3 & 65535) << 16 | 65535 * this.x3 & 65535
                }
                ,
                e
            }();
            n.default = i
        }
        , {
            "../math/GroupD8": 66
        }],
        117: [function(e, t, n) {
            function r(e, t) {
                t || (t = "video/" + e.substr(e.lastIndexOf(".") + 1));
                var n = document.createElement("source");
                return n.src = e,
                n.type = t,
                n
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./BaseTexture"))
              , s = e("../utils")
              , a = e("../ticker")
              , l = e("../const")
              , u = function(e) {
                function t(n, r) {
                    if (function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    !n)
                        throw new Error("No video source element specified.");
                    (n.readyState === n.HAVE_ENOUGH_DATA || n.readyState === n.HAVE_FUTURE_DATA) && n.width && n.height && (n.complete = !0);
                    var i = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n, r));
                    return i.width = n.videoWidth,
                    i.height = n.videoHeight,
                    i._autoUpdate = !0,
                    i._isAutoUpdating = !1,
                    i.autoPlay = !0,
                    i.update = i.update.bind(i),
                    i._onCanPlay = i._onCanPlay.bind(i),
                    n.addEventListener("play", i._onPlayStart.bind(i)),
                    n.addEventListener("pause", i._onPlayStop.bind(i)),
                    i.hasLoaded = !1,
                    i.__loaded = !1,
                    i._isSourceReady() ? i._onCanPlay() : (n.addEventListener("canplay", i._onCanPlay),
                    n.addEventListener("canplaythrough", i._onCanPlay)),
                    i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype._isSourcePlaying = function() {
                    var e = this.source;
                    return e.currentTime > 0 && !1 === e.paused && !1 === e.ended && e.readyState > 2
                }
                ,
                t.prototype._isSourceReady = function() {
                    return 3 === this.source.readyState || 4 === this.source.readyState
                }
                ,
                t.prototype._onPlayStart = function() {
                    this.hasLoaded || this._onCanPlay(),
                    !this._isAutoUpdating && this.autoUpdate && (a.shared.add(this.update, this, l.UPDATE_PRIORITY.HIGH),
                    this._isAutoUpdating = !0)
                }
                ,
                t.prototype._onPlayStop = function() {
                    this._isAutoUpdating && (a.shared.remove(this.update, this),
                    this._isAutoUpdating = !1)
                }
                ,
                t.prototype._onCanPlay = function() {
                    this.hasLoaded = !0,
                    this.source && (this.source.removeEventListener("canplay", this._onCanPlay),
                    this.source.removeEventListener("canplaythrough", this._onCanPlay),
                    this.width = this.source.videoWidth,
                    this.height = this.source.videoHeight,
                    this.__loaded || (this.__loaded = !0,
                    this.emit("loaded", this)),
                    this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.source.play())
                }
                ,
                t.prototype.destroy = function() {
                    this._isAutoUpdating && a.shared.remove(this.update, this),
                    this.source && this.source._pixiId && (o.default.removeFromCache(this.source._pixiId),
                    delete this.source._pixiId),
                    e.prototype.destroy.call(this)
                }
                ,
                t.fromVideo = function(e, n) {
                    e._pixiId || (e._pixiId = "video_" + (0,
                    s.uid)());
                    var r = s.BaseTextureCache[e._pixiId];
                    return r || (r = new t(e,n),
                    o.default.addToCache(r, e._pixiId)),
                    r
                }
                ,
                t.fromUrl = function(e, n) {
                    var i = document.createElement("video");
                    if (i.setAttribute("webkit-playsinline", ""),
                    i.setAttribute("playsinline", ""),
                    Array.isArray(e))
                        for (var o = 0; o < e.length; ++o)
                            i.appendChild(r(e[o].src || e[o], e[o].mime));
                    else
                        i.appendChild(r(e.src || e, e.mime));
                    return i.load(),
                    t.fromVideo(i, n)
                }
                ,
                i(t, [{
                    key: "autoUpdate",
                    get: function() {
                        return this._autoUpdate
                    },
                    set: function(e) {
                        e !== this._autoUpdate && (this._autoUpdate = e,
                        !this._autoUpdate && this._isAutoUpdating ? (a.shared.remove(this.update, this),
                        this._isAutoUpdating = !1) : this._autoUpdate && !this._isAutoUpdating && (a.shared.add(this.update, this, l.UPDATE_PRIORITY.HIGH),
                        this._isAutoUpdating = !0))
                    }
                }]),
                t
            }(o.default);
            n.default = u,
            u.fromUrls = u.fromUrl
        }
        , {
            "../const": 46,
            "../ticker": 120,
            "../utils": 124,
            "./BaseTexture": 112
        }],
        118: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = r(e("../settings"))
              , s = e("../const")
              , a = r(e("./TickerListener"))
              , l = function() {
                function e() {
                    var t = this;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this._head = new a.default(null,null,1 / 0),
                    this._requestId = null,
                    this._maxElapsedMS = 100,
                    this.autoStart = !1,
                    this.deltaTime = 1,
                    this.elapsedMS = 1 / o.default.TARGET_FPMS,
                    this.lastTime = -1,
                    this.speed = 1,
                    this.started = !1,
                    this._tick = function(e) {
                        t._requestId = null,
                        t.started && (t.update(e),
                        t.started && null === t._requestId && t._head.next && (t._requestId = requestAnimationFrame(t._tick)))
                    }
                }
                return e.prototype._requestIfNeeded = function() {
                    null === this._requestId && this._head.next && (this.lastTime = performance.now(),
                    this._requestId = requestAnimationFrame(this._tick))
                }
                ,
                e.prototype._cancelIfNeeded = function() {
                    null !== this._requestId && (cancelAnimationFrame(this._requestId),
                    this._requestId = null)
                }
                ,
                e.prototype._startIfPossible = function() {
                    this.started ? this._requestIfNeeded() : this.autoStart && this.start()
                }
                ,
                e.prototype.add = function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s.UPDATE_PRIORITY.NORMAL;
                    return this._addListener(new a.default(e,t,n))
                }
                ,
                e.prototype.addOnce = function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s.UPDATE_PRIORITY.NORMAL;
                    return this._addListener(new a.default(e,t,n,!0))
                }
                ,
                e.prototype._addListener = function(e) {
                    var t = this._head.next
                      , n = this._head;
                    if (t) {
                        for (; t; ) {
                            if (e.priority > t.priority) {
                                e.connect(n);
                                break
                            }
                            n = t,
                            t = t.next
                        }
                        e.previous || e.connect(n)
                    } else
                        e.connect(n);
                    return this._startIfPossible(),
                    this
                }
                ,
                e.prototype.remove = function(e, t) {
                    for (var n = this._head.next; n; )
                        n = n.match(e, t) ? n.destroy() : n.next;
                    return this._head.next || this._cancelIfNeeded(),
                    this
                }
                ,
                e.prototype.start = function() {
                    this.started || (this.started = !0,
                    this._requestIfNeeded())
                }
                ,
                e.prototype.stop = function() {
                    this.started && (this.started = !1,
                    this._cancelIfNeeded())
                }
                ,
                e.prototype.destroy = function() {
                    this.stop();
                    for (var e = this._head.next; e; )
                        e = e.destroy(!0);
                    this._head.destroy(),
                    this._head = null
                }
                ,
                e.prototype.update = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : performance.now()
                      , t = void 0;
                    if (e > this.lastTime) {
                        (t = this.elapsedMS = e - this.lastTime) > this._maxElapsedMS && (t = this._maxElapsedMS),
                        this.deltaTime = t * o.default.TARGET_FPMS * this.speed;
                        for (var n = this._head, r = n.next; r; )
                            r = r.emit(this.deltaTime);
                        n.next || this._cancelIfNeeded()
                    } else
                        this.deltaTime = this.elapsedMS = 0;
                    this.lastTime = e
                }
                ,
                i(e, [{
                    key: "FPS",
                    get: function() {
                        return 1e3 / this.elapsedMS
                    }
                }, {
                    key: "minFPS",
                    get: function() {
                        return 1e3 / this._maxElapsedMS
                    },
                    set: function(e) {
                        var t = Math.min(Math.max(0, e) / 1e3, o.default.TARGET_FPMS);
                        this._maxElapsedMS = 1 / t
                    }
                }]),
                e
            }();
            n.default = l
        }
        , {
            "../const": 46,
            "../settings": 101,
            "./TickerListener": 119
        }],
        119: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
                      , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                      , i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.fn = t,
                    this.context = n,
                    this.priority = r,
                    this.once = i,
                    this.next = null,
                    this.previous = null,
                    this._destroyed = !1
                }
                return e.prototype.match = function(e, t) {
                    return t = t || null,
                    this.fn === e && this.context === t
                }
                ,
                e.prototype.emit = function(e) {
                    this.fn && (this.context ? this.fn.call(this.context, e) : this.fn(e));
                    var t = this.next;
                    return this.once && this.destroy(!0),
                    this._destroyed && (this.next = null),
                    t
                }
                ,
                e.prototype.connect = function(e) {
                    this.previous = e,
                    e.next && (e.next.previous = this),
                    this.next = e.next,
                    e.next = this
                }
                ,
                e.prototype.destroy = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this._destroyed = !0,
                    this.fn = null,
                    this.context = null,
                    this.previous && (this.previous.next = this.next),
                    this.next && (this.next.previous = this.previous);
                    var t = this.previous;
                    return this.next = e ? null : t,
                    this.previous = null,
                    t
                }
                ,
                e
            }();
            n.default = r
        }
        , {}],
        120: [function(e, t, n) {
            n.__esModule = !0,
            n.Ticker = n.shared = void 0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./Ticker"))
              , i = new r.default;
            i.autoStart = !0,
            i.destroy = function() {}
            ,
            n.shared = i,
            n.Ticker = r.default
        }
        , {
            "./Ticker": 118
        }],
        121: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function() {
                return !(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))
            }
        }
        , {}],
        122: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                for (var t = 6 * e, n = new Uint16Array(t), r = 0, i = 0; r < t; r += 6,
                i += 4)
                    n[r + 0] = i + 0,
                    n[r + 1] = i + 1,
                    n[r + 2] = i + 2,
                    n[r + 3] = i + 0,
                    n[r + 4] = i + 2,
                    n[r + 5] = i + 3;
                return n
            }
        }
        , {}],
        123: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location;
                if (0 === e.indexOf("data:"))
                    return "";
                t = t || window.location,
                i || (i = document.createElement("a")),
                i.href = e;
                var n = !(e = r.default.parse(i.href)).port && "" === t.port || e.port === t.port;
                return e.hostname === t.hostname && n && e.protocol === t.protocol ? "" : "anonymous"
            }
            ;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("url"))
              , i = void 0
        }
        , {
            url: 29
        }],
        124: [function(e, t, n) {
            function r(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0,
            n.premultiplyBlendMode = n.BaseTextureCache = n.TextureCache = n.mixins = n.pluginTarget = n.EventEmitter = n.removeItems = n.isMobile = void 0,
            n.uid = function() {
                return ++p
            }
            ,
            n.hex2rgb = function(e, t) {
                return t = t || [],
                t[0] = (e >> 16 & 255) / 255,
                t[1] = (e >> 8 & 255) / 255,
                t[2] = (255 & e) / 255,
                t
            }
            ,
            n.hex2string = function(e) {
                return e = e.toString(16),
                "#" + (e = "000000".substr(0, 6 - e.length) + e)
            }
            ,
            n.rgb2hex = function(e) {
                return (255 * e[0] << 16) + (255 * e[1] << 8) + (255 * e[2] | 0)
            }
            ,
            n.getResolutionOfUrl = function(e, t) {
                var n = s.default.RETINA_PREFIX.exec(e);
                return n ? parseFloat(n[1]) : void 0 !== t ? t : 1
            }
            ,
            n.decomposeDataUri = function(e) {
                var t = o.DATA_URI.exec(e);
                if (t)
                    return {
                        mediaType: t[1] ? t[1].toLowerCase() : void 0,
                        subType: t[2] ? t[2].toLowerCase() : void 0,
                        encoding: t[3] ? t[3].toLowerCase() : void 0,
                        data: t[4]
                    }
            }
            ,
            n.getUrlFileExtension = function(e) {
                var t = o.URL_FILE_EXTENSION.exec(e);
                if (t)
                    return t[1].toLowerCase()
            }
            ,
            n.getSvgSize = function(e) {
                var t = o.SVG_SIZE.exec(e)
                  , n = {};
                return t && (n[t[1]] = Math.round(parseFloat(t[3])),
                n[t[5]] = Math.round(parseFloat(t[7]))),
                n
            }
            ,
            n.skipHello = function() {
                f = !0
            }
            ,
            n.sayHello = function(e) {
                if (!f) {
                    if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                        var t = ["\n %c %c %c PixiJS " + o.VERSION + " - ✰ " + e + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                        window.console.log.apply(console, t)
                    } else
                        window.console && window.console.log("PixiJS " + o.VERSION + " - " + e + " - http://www.pixijs.com/");
                    f = !0
                }
            }
            ,
            n.isWebGLSupported = function() {
                var e = {
                    stencil: !0,
                    failIfMajorPerformanceCaveat: !0
                };
                try {
                    if (!window.WebGLRenderingContext)
                        return !1;
                    var t = document.createElement("canvas")
                      , n = t.getContext("webgl", e) || t.getContext("experimental-webgl", e)
                      , r = !(!n || !n.getContextAttributes().stencil);
                    if (n) {
                        var i = n.getExtension("WEBGL_lose_context");
                        i && i.loseContext()
                    }
                    return n = null,
                    r
                } catch (e) {
                    return !1
                }
            }
            ,
            n.sign = function(e) {
                return 0 === e ? 0 : e < 0 ? -1 : 1
            }
            ,
            n.destroyTextureCache = function() {
                var e = void 0;
                for (e in g)
                    g[e].destroy();
                for (e in m)
                    m[e].destroy()
            }
            ,
            n.clearTextureCache = function() {
                var e = void 0;
                for (e in g)
                    delete g[e];
                for (e in m)
                    delete m[e]
            }
            ,
            n.correctBlendMode = function(e, t) {
                return v[t ? 1 : 0][e]
            }
            ,
            n.premultiplyTint = function(e, t) {
                if (1 === t)
                    return (255 * t << 24) + e;
                if (0 === t)
                    return 0;
                var n = e >> 16 & 255
                  , r = e >> 8 & 255
                  , i = 255 & e;
                return n = n * t + .5 | 0,
                r = r * t + .5 | 0,
                i = i * t + .5 | 0,
                (255 * t << 24) + (n << 16) + (r << 8) + i
            }
            ,
            n.premultiplyRgba = function(e, t, n, r) {
                return n = n || new Float32Array(4),
                r || void 0 === r ? (n[0] = e[0] * t,
                n[1] = e[1] * t,
                n[2] = e[2] * t) : (n[0] = e[0],
                n[1] = e[1],
                n[2] = e[2]),
                n[3] = t,
                n
            }
            ,
            n.premultiplyTintToRgba = function(e, t, n, r) {
                return n = n || new Float32Array(4),
                n[0] = (e >> 16 & 255) / 255,
                n[1] = (e >> 8 & 255) / 255,
                n[2] = (255 & e) / 255,
                (r || void 0 === r) && (n[0] *= t,
                n[1] *= t,
                n[2] *= t),
                n[3] = t,
                n
            }
            ;
            var o = e("../const")
              , s = i(e("../settings"))
              , a = i(e("eventemitter3"))
              , l = i(e("./pluginTarget"))
              , u = r(e("./mixin"))
              , c = r(e("ismobilejs"))
              , h = i(e("remove-array-items"))
              , d = i(e("./mapPremultipliedBlendModes"))
              , p = 0
              , f = !1;
            n.isMobile = c,
            n.removeItems = h.default,
            n.EventEmitter = a.default,
            n.pluginTarget = l.default,
            n.mixins = u;
            var g = n.TextureCache = Object.create(null)
              , m = n.BaseTextureCache = Object.create(null)
              , v = n.premultiplyBlendMode = (0,
            d.default)()
        }
        , {
            "../const": 46,
            "../settings": 101,
            "./mapPremultipliedBlendModes": 125,
            "./mixin": 127,
            "./pluginTarget": 128,
            eventemitter3: 3,
            ismobilejs: 4,
            "remove-array-items": 31
        }],
        125: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function() {
                for (var e = [], t = [], n = 0; n < 32; n++)
                    e[n] = n,
                    t[n] = n;
                e[r.BLEND_MODES.NORMAL_NPM] = r.BLEND_MODES.NORMAL,
                e[r.BLEND_MODES.ADD_NPM] = r.BLEND_MODES.ADD,
                e[r.BLEND_MODES.SCREEN_NPM] = r.BLEND_MODES.SCREEN,
                t[r.BLEND_MODES.NORMAL] = r.BLEND_MODES.NORMAL_NPM,
                t[r.BLEND_MODES.ADD] = r.BLEND_MODES.ADD_NPM,
                t[r.BLEND_MODES.SCREEN] = r.BLEND_MODES.SCREEN_NPM;
                var i = [];
                return i.push(t),
                i.push(e),
                i
            }
            ;
            var r = e("../const")
        }
        , {
            "../const": 46
        }],
        126: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                return r.default.tablet || r.default.phone ? 4 : e
            }
            ;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("ismobilejs"))
        }
        , {
            ismobilejs: 4
        }],
        127: [function(e, t, n) {
            function r(e, t) {
                if (e && t)
                    for (var n = Object.keys(t), r = 0; r < n.length; ++r) {
                        var i = n[r];
                        Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i))
                    }
            }
            n.__esModule = !0,
            n.mixin = r,
            n.delayMixin = function(e, t) {
                i.push(e, t)
            }
            ,
            n.performMixins = function() {
                for (var e = 0; e < i.length; e += 2)
                    r(i[e], i[e + 1]);
                i.length = 0
            }
            ;
            var i = []
        }
        , {}],
        128: [function(e, t, n) {
            n.__esModule = !0,
            n.default = {
                mixin: function(e) {
                    !function(e) {
                        e.__plugins = {},
                        e.registerPlugin = function(t, n) {
                            e.__plugins[t] = n
                        }
                        ,
                        e.prototype.initPlugins = function() {
                            this.plugins = this.plugins || {};
                            for (var t in e.__plugins)
                                this.plugins[t] = new e.__plugins[t](this)
                        }
                        ,
                        e.prototype.destroyPlugins = function() {
                            for (var e in this.plugins)
                                this.plugins[e].destroy(),
                                this.plugins[e] = null;
                            this.plugins = null
                        }
                    }(e)
                }
            }
        }
        , {}],
        129: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                var t = e.width
                  , n = e.height
                  , r = e.getContext("2d")
                  , i = r.getImageData(0, 0, t, n).data
                  , o = i.length
                  , s = {
                    top: null,
                    left: null,
                    right: null,
                    bottom: null
                }
                  , a = void 0
                  , l = void 0
                  , u = void 0;
                for (a = 0; a < o; a += 4)
                    0 !== i[a + 3] && (l = a / 4 % t,
                    u = ~~(a / 4 / t),
                    null === s.top && (s.top = u),
                    null === s.left ? s.left = l : l < s.left && (s.left = l),
                    null === s.right ? s.right = l + 1 : s.right < l && (s.right = l + 1),
                    null === s.bottom ? s.bottom = u : s.bottom < u && (s.bottom = u));
                return t = s.right - s.left,
                {
                    height: n = s.bottom - s.top + 1,
                    width: t,
                    data: r.getImageData(s.left, s.top, t, n)
                }
            }
        }
        , {}],
        130: [function(e, t, n) {
            function r(e) {
                var t = (new Error).stack;
                void 0 === t ? console.warn("Deprecation Warning: ", e) : (t = t.split("\n").splice(3).join("\n"),
                console.groupCollapsed ? (console.groupCollapsed("%cDeprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", e),
                console.warn(t),
                console.groupEnd()) : (console.warn("Deprecation Warning: ", e),
                console.warn(t)))
            }
            n.__esModule = !0,
            n.default = function(e) {
                var t = e.mesh
                  , n = e.particles
                  , i = e.extras
                  , o = e.filters
                  , s = e.prepare
                  , a = e.loaders
                  , l = e.interaction;
                Object.defineProperties(e, {
                    SpriteBatch: {
                        get: function() {
                            throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
                        }
                    },
                    AssetLoader: {
                        get: function() {
                            throw new ReferenceError("The loader system was overhauled in PixiJS v3, please see the new PIXI.loaders.Loader class.")
                        }
                    },
                    Stage: {
                        get: function() {
                            return r("You do not need to use a PIXI Stage any more, you can simply render any container."),
                            e.Container
                        }
                    },
                    DisplayObjectContainer: {
                        get: function() {
                            return r("DisplayObjectContainer has been shortened to Container, please use Container from now on."),
                            e.Container
                        }
                    },
                    Strip: {
                        get: function() {
                            return r("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."),
                            t.Mesh
                        }
                    },
                    Rope: {
                        get: function() {
                            return r("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."),
                            t.Rope
                        }
                    },
                    ParticleContainer: {
                        get: function() {
                            return r("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."),
                            n.ParticleContainer
                        }
                    },
                    MovieClip: {
                        get: function() {
                            return r("The MovieClip class has been moved to extras.AnimatedSprite, please use extras.AnimatedSprite."),
                            i.AnimatedSprite
                        }
                    },
                    TilingSprite: {
                        get: function() {
                            return r("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."),
                            i.TilingSprite
                        }
                    },
                    BitmapText: {
                        get: function() {
                            return r("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."),
                            i.BitmapText
                        }
                    },
                    blendModes: {
                        get: function() {
                            return r("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."),
                            e.BLEND_MODES
                        }
                    },
                    scaleModes: {
                        get: function() {
                            return r("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."),
                            e.SCALE_MODES
                        }
                    },
                    BaseTextureCache: {
                        get: function() {
                            return r("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."),
                            e.utils.BaseTextureCache
                        }
                    },
                    TextureCache: {
                        get: function() {
                            return r("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."),
                            e.utils.TextureCache
                        }
                    },
                    math: {
                        get: function() {
                            return r("The math namespace is deprecated, please access members already accessible on PIXI."),
                            e
                        }
                    },
                    AbstractFilter: {
                        get: function() {
                            return r("AstractFilter has been renamed to Filter, please use PIXI.Filter"),
                            e.Filter
                        }
                    },
                    TransformManual: {
                        get: function() {
                            return r("TransformManual has been renamed to TransformBase, please update your pixi-spine"),
                            e.TransformBase
                        }
                    },
                    TARGET_FPMS: {
                        get: function() {
                            return r("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"),
                            e.settings.TARGET_FPMS
                        },
                        set: function(t) {
                            r("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"),
                            e.settings.TARGET_FPMS = t
                        }
                    },
                    FILTER_RESOLUTION: {
                        get: function() {
                            return r("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"),
                            e.settings.FILTER_RESOLUTION
                        },
                        set: function(t) {
                            r("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"),
                            e.settings.FILTER_RESOLUTION = t
                        }
                    },
                    RESOLUTION: {
                        get: function() {
                            return r("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"),
                            e.settings.RESOLUTION
                        },
                        set: function(t) {
                            r("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"),
                            e.settings.RESOLUTION = t
                        }
                    },
                    MIPMAP_TEXTURES: {
                        get: function() {
                            return r("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"),
                            e.settings.MIPMAP_TEXTURES
                        },
                        set: function(t) {
                            r("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"),
                            e.settings.MIPMAP_TEXTURES = t
                        }
                    },
                    SPRITE_BATCH_SIZE: {
                        get: function() {
                            return r("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"),
                            e.settings.SPRITE_BATCH_SIZE
                        },
                        set: function(t) {
                            r("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"),
                            e.settings.SPRITE_BATCH_SIZE = t
                        }
                    },
                    SPRITE_MAX_TEXTURES: {
                        get: function() {
                            return r("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"),
                            e.settings.SPRITE_MAX_TEXTURES
                        },
                        set: function(t) {
                            r("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"),
                            e.settings.SPRITE_MAX_TEXTURES = t
                        }
                    },
                    RETINA_PREFIX: {
                        get: function() {
                            return r("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"),
                            e.settings.RETINA_PREFIX
                        },
                        set: function(t) {
                            r("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"),
                            e.settings.RETINA_PREFIX = t
                        }
                    },
                    DEFAULT_RENDER_OPTIONS: {
                        get: function() {
                            return r("PIXI.DEFAULT_RENDER_OPTIONS has been deprecated, please use PIXI.settings.DEFAULT_RENDER_OPTIONS"),
                            e.settings.RENDER_OPTIONS
                        }
                    }
                });
                for (var u = [{
                    parent: "TRANSFORM_MODE",
                    target: "TRANSFORM_MODE"
                }, {
                    parent: "GC_MODES",
                    target: "GC_MODE"
                }, {
                    parent: "WRAP_MODES",
                    target: "WRAP_MODE"
                }, {
                    parent: "SCALE_MODES",
                    target: "SCALE_MODE"
                }, {
                    parent: "PRECISION",
                    target: "PRECISION_FRAGMENT"
                }], c = function(t) {
                    var n = u[t];
                    Object.defineProperty(e[n.parent], "DEFAULT", {
                        get: function() {
                            return r("PIXI." + n.parent + ".DEFAULT has been deprecated, please use PIXI.settings." + n.target),
                            e.settings[n.target]
                        },
                        set: function(t) {
                            r("PIXI." + n.parent + ".DEFAULT has been deprecated, please use PIXI.settings." + n.target),
                            e.settings[n.target] = t
                        }
                    })
                }, h = 0; h < u.length; h++)
                    c(h);
                Object.defineProperties(e.settings, {
                    PRECISION: {
                        get: function() {
                            return r("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"),
                            e.settings.PRECISION_FRAGMENT
                        },
                        set: function(t) {
                            r("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"),
                            e.settings.PRECISION_FRAGMENT = t
                        }
                    }
                }),
                i.AnimatedSprite && Object.defineProperties(i, {
                    MovieClip: {
                        get: function() {
                            return r("The MovieClip class has been renamed to AnimatedSprite, please use AnimatedSprite from now on."),
                            i.AnimatedSprite
                        }
                    }
                }),
                e.DisplayObject.prototype.generateTexture = function(e, t, n) {
                    return r("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"),
                    e.generateTexture(this, t, n)
                }
                ,
                e.Graphics.prototype.generateTexture = function(e, t) {
                    return r("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"),
                    this.generateCanvasTexture(e, t)
                }
                ,
                e.RenderTexture.prototype.render = function(e, t, n, i) {
                    this.legacyRenderer.render(e, this, n, t, !i),
                    r("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)")
                }
                ,
                e.RenderTexture.prototype.getImage = function(e) {
                    return r("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"),
                    this.legacyRenderer.extract.image(e)
                }
                ,
                e.RenderTexture.prototype.getBase64 = function(e) {
                    return r("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"),
                    this.legacyRenderer.extract.base64(e)
                }
                ,
                e.RenderTexture.prototype.getCanvas = function(e) {
                    return r("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"),
                    this.legacyRenderer.extract.canvas(e)
                }
                ,
                e.RenderTexture.prototype.getPixels = function(e) {
                    return r("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"),
                    this.legacyRenderer.pixels(e)
                }
                ,
                e.Sprite.prototype.setTexture = function(e) {
                    this.texture = e,
                    r("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")
                }
                ,
                i.BitmapText && (i.BitmapText.prototype.setText = function(e) {
                    this.text = e,
                    r("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")
                }
                ),
                e.Text.prototype.setText = function(e) {
                    this.text = e,
                    r("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")
                }
                ,
                e.Text.calculateFontProperties = function(t) {
                    return r("Text.calculateFontProperties is now deprecated, please use the TextMetrics.measureFont"),
                    e.TextMetrics.measureFont(t)
                }
                ,
                Object.defineProperties(e.Text, {
                    fontPropertiesCache: {
                        get: function() {
                            return r("Text.fontPropertiesCache is deprecated"),
                            e.TextMetrics._fonts
                        }
                    },
                    fontPropertiesCanvas: {
                        get: function() {
                            return r("Text.fontPropertiesCanvas is deprecated"),
                            e.TextMetrics._canvas
                        }
                    },
                    fontPropertiesContext: {
                        get: function() {
                            return r("Text.fontPropertiesContext is deprecated"),
                            e.TextMetrics._context
                        }
                    }
                }),
                e.Text.prototype.setStyle = function(e) {
                    this.style = e,
                    r("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")
                }
                ,
                e.Text.prototype.determineFontProperties = function(t) {
                    return r("determineFontProperties is now deprecated, please use TextMetrics.measureFont method"),
                    e.TextMetrics.measureFont(t)
                }
                ,
                e.Text.getFontStyle = function(t) {
                    return r("getFontStyle is now deprecated, please use TextStyle.toFontString() instead"),
                    (t = t || {})instanceof e.TextStyle || (t = new e.TextStyle(t)),
                    t.toFontString()
                }
                ,
                Object.defineProperties(e.TextStyle.prototype, {
                    font: {
                        get: function() {
                            r("text style property 'font' is now deprecated, please use the 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant' and 'fontWeight' properties from now on");
                            var e = "number" == typeof this._fontSize ? this._fontSize + "px" : this._fontSize;
                            return this._fontStyle + " " + this._fontVariant + " " + this._fontWeight + " " + e + " " + this._fontFamily
                        },
                        set: function(e) {
                            r("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"),
                            e.indexOf("italic") > 1 ? this._fontStyle = "italic" : e.indexOf("oblique") > -1 ? this._fontStyle = "oblique" : this._fontStyle = "normal",
                            e.indexOf("small-caps") > -1 ? this._fontVariant = "small-caps" : this._fontVariant = "normal";
                            var t = e.split(" ")
                              , n = -1;
                            this._fontSize = 26;
                            for (var i = 0; i < t.length; ++i)
                                if (t[i].match(/(px|pt|em|%)/)) {
                                    n = i,
                                    this._fontSize = t[i];
                                    break
                                }
                            this._fontWeight = "normal";
                            for (var o = 0; o < n; ++o)
                                if (t[o].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
                                    this._fontWeight = t[o];
                                    break
                                }
                            if (n > -1 && n < t.length - 1) {
                                this._fontFamily = "";
                                for (var s = n + 1; s < t.length; ++s)
                                    this._fontFamily += t[s] + " ";
                                this._fontFamily = this._fontFamily.slice(0, -1)
                            } else
                                this._fontFamily = "Arial";
                            this.styleID++
                        }
                    }
                }),
                e.Texture.prototype.setFrame = function(e) {
                    this.frame = e,
                    r("setFrame is now deprecated, please use the frame property, e.g: myTexture.frame = frame;")
                }
                ,
                e.Texture.addTextureToCache = function(t, n) {
                    e.Texture.addToCache(t, n),
                    r("Texture.addTextureToCache is deprecated, please use Texture.addToCache from now on.")
                }
                ,
                e.Texture.removeTextureFromCache = function(t) {
                    return r("Texture.removeTextureFromCache is deprecated, please use Texture.removeFromCache from now on. Be aware that Texture.removeFromCache does not automatically its BaseTexture from the BaseTextureCache. For that, use BaseTexture.removeFromCache"),
                    e.BaseTexture.removeFromCache(t),
                    e.Texture.removeFromCache(t)
                }
                ,
                Object.defineProperties(o, {
                    AbstractFilter: {
                        get: function() {
                            return r("AstractFilter has been renamed to Filter, please use PIXI.Filter"),
                            e.AbstractFilter
                        }
                    },
                    SpriteMaskFilter: {
                        get: function() {
                            return r("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."),
                            e.SpriteMaskFilter
                        }
                    }
                }),
                e.utils.uuid = function() {
                    return r("utils.uuid() is deprecated, please use utils.uid() from now on."),
                    e.utils.uid()
                }
                ,
                e.utils.canUseNewCanvasBlendModes = function() {
                    return r("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"),
                    e.CanvasTinter.canUseMultiply
                }
                ;
                var d = !0;
                if (Object.defineProperty(e.utils, "_saidHello", {
                    set: function(e) {
                        e && (r("PIXI.utils._saidHello is deprecated, please use PIXI.utils.skipHello()"),
                        this.skipHello()),
                        d = e
                    },
                    get: function() {
                        return d
                    }
                }),
                s.BasePrepare && (s.BasePrepare.prototype.register = function(e, t) {
                    return r("renderer.plugins.prepare.register is now deprecated, please use renderer.plugins.prepare.registerFindHook & renderer.plugins.prepare.registerUploadHook"),
                    e && this.registerFindHook(e),
                    t && this.registerUploadHook(t),
                    this
                }
                ),
                s.canvas && Object.defineProperty(s.canvas, "UPLOADS_PER_FRAME", {
                    set: function() {
                        r("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer")
                    },
                    get: function() {
                        return r("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"),
                        NaN
                    }
                }),
                s.webgl && Object.defineProperty(s.webgl, "UPLOADS_PER_FRAME", {
                    set: function() {
                        r("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer")
                    },
                    get: function() {
                        return r("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"),
                        NaN
                    }
                }),
                a.Loader) {
                    var p = a.Resource
                      , f = a.Loader;
                    Object.defineProperties(p.prototype, {
                        isJson: {
                            get: function() {
                                return r("The isJson property is deprecated, please use `resource.type === Resource.TYPE.JSON`."),
                                this.type === p.TYPE.JSON
                            }
                        },
                        isXml: {
                            get: function() {
                                return r("The isXml property is deprecated, please use `resource.type === Resource.TYPE.XML`."),
                                this.type === p.TYPE.XML
                            }
                        },
                        isImage: {
                            get: function() {
                                return r("The isImage property is deprecated, please use `resource.type === Resource.TYPE.IMAGE`."),
                                this.type === p.TYPE.IMAGE
                            }
                        },
                        isAudio: {
                            get: function() {
                                return r("The isAudio property is deprecated, please use `resource.type === Resource.TYPE.AUDIO`."),
                                this.type === p.TYPE.AUDIO
                            }
                        },
                        isVideo: {
                            get: function() {
                                return r("The isVideo property is deprecated, please use `resource.type === Resource.TYPE.VIDEO`."),
                                this.type === p.TYPE.VIDEO
                            }
                        }
                    }),
                    Object.defineProperties(f.prototype, {
                        before: {
                            get: function() {
                                return r("The before() method is deprecated, please use pre()."),
                                this.pre
                            }
                        },
                        after: {
                            get: function() {
                                return r("The after() method is deprecated, please use use()."),
                                this.use
                            }
                        }
                    })
                }
                l.interactiveTarget && Object.defineProperty(l.interactiveTarget, "defaultCursor", {
                    set: function(e) {
                        r("Property defaultCursor has been replaced with 'cursor'. "),
                        this.cursor = e
                    },
                    get: function() {
                        return r("Property defaultCursor has been replaced with 'cursor'. "),
                        this.cursor
                    }
                }),
                l.InteractionManager && (Object.defineProperty(l.InteractionManager, "defaultCursorStyle", {
                    set: function(e) {
                        r("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "),
                        this.cursorStyles.default = e
                    },
                    get: function() {
                        return r("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "),
                        this.cursorStyles.default
                    }
                }),
                Object.defineProperty(l.InteractionManager, "currentCursorStyle", {
                    set: function(e) {
                        r("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."),
                        this.currentCursorMode = e
                    },
                    get: function() {
                        return r("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."),
                        this.currentCursorMode
                    }
                }))
            }
        }
        , {}],
        131: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , i = new r.Rectangle
              , o = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t,
                    t.extract = this
                }
                return e.prototype.image = function(e) {
                    var t = new Image;
                    return t.src = this.base64(e),
                    t
                }
                ,
                e.prototype.base64 = function(e) {
                    return this.canvas(e).toDataURL()
                }
                ,
                e.prototype.canvas = function(e) {
                    var t = this.renderer
                      , n = void 0
                      , o = void 0
                      , s = void 0
                      , a = void 0;
                    e && (a = e instanceof r.RenderTexture ? e : t.generateTexture(e)),
                    a ? (n = a.baseTexture._canvasRenderTarget.context,
                    o = a.baseTexture._canvasRenderTarget.resolution,
                    s = a.frame) : (n = t.rootContext,
                    (s = i).width = this.renderer.width,
                    s.height = this.renderer.height);
                    var l = s.width * o
                      , u = s.height * o
                      , c = new r.CanvasRenderTarget(l,u)
                      , h = n.getImageData(s.x * o, s.y * o, l, u);
                    return c.context.putImageData(h, 0, 0),
                    c.canvas
                }
                ,
                e.prototype.pixels = function(e) {
                    var t = this.renderer
                      , n = void 0
                      , o = void 0
                      , s = void 0
                      , a = void 0;
                    return e && (a = e instanceof r.RenderTexture ? e : t.generateTexture(e)),
                    a ? (n = a.baseTexture._canvasRenderTarget.context,
                    o = a.baseTexture._canvasRenderTarget.resolution,
                    s = a.frame) : (n = t.rootContext,
                    (s = i).width = t.width,
                    s.height = t.height),
                    n.getImageData(0, 0, s.width * o, s.height * o).data
                }
                ,
                e.prototype.destroy = function() {
                    this.renderer.extract = null,
                    this.renderer = null
                }
                ,
                e
            }();
            n.default = o,
            r.CanvasRenderer.registerPlugin("extract", o)
        }
        , {
            "../../core": 65
        }],
        132: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("./webgl/WebGLExtract");
            Object.defineProperty(n, "webgl", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./canvas/CanvasExtract");
            Object.defineProperty(n, "canvas", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            })
        }
        , {
            "./canvas/CanvasExtract": 131,
            "./webgl/WebGLExtract": 133
        }],
        133: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , i = new r.Rectangle
              , o = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t,
                    t.extract = this
                }
                return e.prototype.image = function(e) {
                    var t = new Image;
                    return t.src = this.base64(e),
                    t
                }
                ,
                e.prototype.base64 = function(e) {
                    return this.canvas(e).toDataURL()
                }
                ,
                e.prototype.canvas = function(e) {
                    var t = this.renderer
                      , n = void 0
                      , o = void 0
                      , s = void 0
                      , a = !1
                      , l = void 0;
                    e && (l = e instanceof r.RenderTexture ? e : this.renderer.generateTexture(e)),
                    l ? (o = (n = l.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]).resolution,
                    s = l.frame,
                    a = !1) : (o = (n = this.renderer.rootRenderTarget).resolution,
                    a = !0,
                    (s = i).width = n.size.width,
                    s.height = n.size.height);
                    var u = s.width * o
                      , c = s.height * o
                      , h = new r.CanvasRenderTarget(u,c);
                    if (n) {
                        t.bindRenderTarget(n);
                        var d = new Uint8Array(4 * u * c)
                          , p = t.gl;
                        p.readPixels(s.x * o, s.y * o, u, c, p.RGBA, p.UNSIGNED_BYTE, d);
                        var f = h.context.getImageData(0, 0, u, c);
                        f.data.set(d),
                        h.context.putImageData(f, 0, 0),
                        a && (h.context.scale(1, -1),
                        h.context.drawImage(h.canvas, 0, -c))
                    }
                    return h.canvas
                }
                ,
                e.prototype.pixels = function(e) {
                    var t = this.renderer
                      , n = void 0
                      , o = void 0
                      , s = void 0
                      , a = void 0;
                    e && (a = e instanceof r.RenderTexture ? e : this.renderer.generateTexture(e)),
                    a ? (o = (n = a.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]).resolution,
                    s = a.frame) : (o = (n = this.renderer.rootRenderTarget).resolution,
                    (s = i).width = n.size.width,
                    s.height = n.size.height);
                    var l = s.width * o
                      , u = s.height * o
                      , c = new Uint8Array(4 * l * u);
                    if (n) {
                        t.bindRenderTarget(n);
                        var h = t.gl;
                        h.readPixels(s.x * o, s.y * o, l, u, h.RGBA, h.UNSIGNED_BYTE, c)
                    }
                    return c
                }
                ,
                e.prototype.destroy = function() {
                    this.renderer.extract = null,
                    this.renderer = null
                }
                ,
                e
            }();
            n.default = o,
            r.WebGLRenderer.registerPlugin("extract", o)
        }
        , {
            "../../core": 65
        }],
        134: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , o = function(e) {
                function t(n, r) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var o = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n[0]instanceof i.Texture ? n[0] : n[0].texture));
                    return o._textures = null,
                    o._durations = null,
                    o.textures = n,
                    o._autoUpdate = !1 !== r,
                    o.animationSpeed = 1,
                    o.loop = !0,
                    o.onComplete = null,
                    o.onFrameChange = null,
                    o.onLoop = null,
                    o._currentTime = 0,
                    o.playing = !1,
                    o
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.stop = function() {
                    this.playing && (this.playing = !1,
                    this._autoUpdate && i.ticker.shared.remove(this.update, this))
                }
                ,
                t.prototype.play = function() {
                    this.playing || (this.playing = !0,
                    this._autoUpdate && i.ticker.shared.add(this.update, this, i.UPDATE_PRIORITY.HIGH))
                }
                ,
                t.prototype.gotoAndStop = function(e) {
                    this.stop();
                    var t = this.currentFrame;
                    this._currentTime = e,
                    t !== this.currentFrame && this.updateTexture()
                }
                ,
                t.prototype.gotoAndPlay = function(e) {
                    var t = this.currentFrame;
                    this._currentTime = e,
                    t !== this.currentFrame && this.updateTexture(),
                    this.play()
                }
                ,
                t.prototype.update = function(e) {
                    var t = this.animationSpeed * e
                      , n = this.currentFrame;
                    if (null !== this._durations) {
                        var r = this._currentTime % 1 * this._durations[this.currentFrame];
                        for (r += t / 60 * 1e3; r < 0; )
                            this._currentTime--,
                            r += this._durations[this.currentFrame];
                        var i = Math.sign(this.animationSpeed * e);
                        for (this._currentTime = Math.floor(this._currentTime); r >= this._durations[this.currentFrame]; )
                            r -= this._durations[this.currentFrame] * i,
                            this._currentTime += i;
                        this._currentTime += r / this._durations[this.currentFrame]
                    } else
                        this._currentTime += t;
                    this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0),
                    this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1),
                    this.onComplete && this.onComplete()) : n !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < n ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > n && this.onLoop()),
                    this.updateTexture())
                }
                ,
                t.prototype.updateTexture = function() {
                    this._texture = this._textures[this.currentFrame],
                    this._textureID = -1,
                    this.cachedTint = 16777215,
                    this.onFrameChange && this.onFrameChange(this.currentFrame)
                }
                ,
                t.prototype.destroy = function(t) {
                    this.stop(),
                    e.prototype.destroy.call(this, t)
                }
                ,
                t.fromFrames = function(e) {
                    for (var n = [], r = 0; r < e.length; ++r)
                        n.push(i.Texture.fromFrame(e[r]));
                    return new t(n)
                }
                ,
                t.fromImages = function(e) {
                    for (var n = [], r = 0; r < e.length; ++r)
                        n.push(i.Texture.fromImage(e[r]));
                    return new t(n)
                }
                ,
                r(t, [{
                    key: "totalFrames",
                    get: function() {
                        return this._textures.length
                    }
                }, {
                    key: "textures",
                    get: function() {
                        return this._textures
                    },
                    set: function(e) {
                        if (e[0]instanceof i.Texture)
                            this._textures = e,
                            this._durations = null;
                        else {
                            this._textures = [],
                            this._durations = [];
                            for (var t = 0; t < e.length; t++)
                                this._textures.push(e[t].texture),
                                this._durations.push(e[t].time)
                        }
                        this.gotoAndStop(0),
                        this.updateTexture()
                    }
                }, {
                    key: "currentFrame",
                    get: function() {
                        var e = Math.floor(this._currentTime) % this._textures.length;
                        return e < 0 && (e += this._textures.length),
                        e
                    }
                }]),
                t
            }(i.Sprite);
            n.default = o
        }
        , {
            "../core": 65
        }],
        135: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , s = r(e("../core/math/ObservablePoint"))
              , a = r(e("../core/settings"))
              , l = function(e) {
                function t(n) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return i._textWidth = 0,
                    i._textHeight = 0,
                    i._glyphs = [],
                    i._font = {
                        tint: void 0 !== r.tint ? r.tint : 16777215,
                        align: r.align || "left",
                        name: null,
                        size: 0
                    },
                    i.font = r.font,
                    i._text = n,
                    i._maxWidth = 0,
                    i._maxLineHeight = 0,
                    i._anchor = new s.default(function() {
                        i.dirty = !0
                    }
                    ,i,0,0),
                    i.dirty = !1,
                    i.updateText(),
                    i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.updateText = function() {
                    for (var e = t.fonts[this._font.name], n = this._font.size / e.size, r = new o.Point, i = [], s = [], a = null, l = 0, u = 0, c = 0, h = -1, d = 0, p = 0, f = 0, g = 0; g < this.text.length; g++) {
                        var m = this.text.charCodeAt(g);
                        if (/(\s)/.test(this.text.charAt(g)) && (h = g,
                        d = l),
                        /(?:\r\n|\r|\n)/.test(this.text.charAt(g)))
                            s.push(l),
                            u = Math.max(u, l),
                            c++,
                            r.x = 0,
                            r.y += e.lineHeight,
                            a = null;
                        else if (-1 !== h && this._maxWidth > 0 && r.x * n > this._maxWidth)
                            o.utils.removeItems(i, h - p, g - h),
                            g = h,
                            h = -1,
                            ++p,
                            s.push(d),
                            u = Math.max(u, d),
                            c++,
                            r.x = 0,
                            r.y += e.lineHeight,
                            a = null;
                        else {
                            var v = e.chars[m];
                            v && (a && v.kerning[a] && (r.x += v.kerning[a]),
                            i.push({
                                texture: v.texture,
                                line: c,
                                charCode: m,
                                position: new o.Point(r.x + v.xOffset,r.y + v.yOffset)
                            }),
                            l = r.x + (v.texture.width + v.xOffset),
                            r.x += v.xAdvance,
                            f = Math.max(f, v.yOffset + v.texture.height),
                            a = m)
                        }
                    }
                    s.push(l),
                    u = Math.max(u, l);
                    for (var y = [], b = 0; b <= c; b++) {
                        var _ = 0;
                        "right" === this._font.align ? _ = u - s[b] : "center" === this._font.align && (_ = (u - s[b]) / 2),
                        y.push(_)
                    }
                    for (var x = i.length, w = this.tint, T = 0; T < x; T++) {
                        var E = this._glyphs[T];
                        E ? E.texture = i[T].texture : (E = new o.Sprite(i[T].texture),
                        this._glyphs.push(E)),
                        E.position.x = (i[T].position.x + y[i[T].line]) * n,
                        E.position.y = i[T].position.y * n,
                        E.scale.x = E.scale.y = n,
                        E.tint = w,
                        E.parent || this.addChild(E)
                    }
                    for (var S = x; S < this._glyphs.length; ++S)
                        this.removeChild(this._glyphs[S]);
                    if (this._textWidth = u * n,
                    this._textHeight = (r.y + e.lineHeight) * n,
                    0 !== this.anchor.x || 0 !== this.anchor.y)
                        for (var I = 0; I < x; I++)
                            this._glyphs[I].x -= this._textWidth * this.anchor.x,
                            this._glyphs[I].y -= this._textHeight * this.anchor.y;
                    this._maxLineHeight = f * n
                }
                ,
                t.prototype.updateTransform = function() {
                    this.validate(),
                    this.containerUpdateTransform()
                }
                ,
                t.prototype.getLocalBounds = function() {
                    return this.validate(),
                    e.prototype.getLocalBounds.call(this)
                }
                ,
                t.prototype.validate = function() {
                    this.dirty && (this.updateText(),
                    this.dirty = !1)
                }
                ,
                t.registerFont = function(e, n) {
                    var r = {}
                      , i = e.getElementsByTagName("info")[0]
                      , s = e.getElementsByTagName("common")[0]
                      , l = n.baseTexture.resolution || a.default.RESOLUTION;
                    r.font = i.getAttribute("face"),
                    r.size = parseInt(i.getAttribute("size"), 10),
                    r.lineHeight = parseInt(s.getAttribute("lineHeight"), 10) / l,
                    r.chars = {};
                    for (var u = e.getElementsByTagName("char"), c = 0; c < u.length; c++) {
                        var h = u[c]
                          , d = parseInt(h.getAttribute("id"), 10)
                          , p = new o.Rectangle(parseInt(h.getAttribute("x"), 10) / l + n.frame.x / l,parseInt(h.getAttribute("y"), 10) / l + n.frame.y / l,parseInt(h.getAttribute("width"), 10) / l,parseInt(h.getAttribute("height"), 10) / l);
                        r.chars[d] = {
                            xOffset: parseInt(h.getAttribute("xoffset"), 10) / l,
                            yOffset: parseInt(h.getAttribute("yoffset"), 10) / l,
                            xAdvance: parseInt(h.getAttribute("xadvance"), 10) / l,
                            kerning: {},
                            texture: new o.Texture(n.baseTexture,p)
                        }
                    }
                    for (var f = e.getElementsByTagName("kerning"), g = 0; g < f.length; g++) {
                        var m = f[g]
                          , v = parseInt(m.getAttribute("first"), 10) / l
                          , y = parseInt(m.getAttribute("second"), 10) / l
                          , b = parseInt(m.getAttribute("amount"), 10) / l;
                        r.chars[y] && (r.chars[y].kerning[v] = b)
                    }
                    return t.fonts[r.font] = r,
                    r
                }
                ,
                i(t, [{
                    key: "tint",
                    get: function() {
                        return this._font.tint
                    },
                    set: function(e) {
                        this._font.tint = "number" == typeof e && e >= 0 ? e : 16777215,
                        this.dirty = !0
                    }
                }, {
                    key: "align",
                    get: function() {
                        return this._font.align
                    },
                    set: function(e) {
                        this._font.align = e || "left",
                        this.dirty = !0
                    }
                }, {
                    key: "anchor",
                    get: function() {
                        return this._anchor
                    },
                    set: function(e) {
                        "number" == typeof e ? this._anchor.set(e) : this._anchor.copy(e)
                    }
                }, {
                    key: "font",
                    get: function() {
                        return this._font
                    },
                    set: function(e) {
                        e && ("string" == typeof e ? (e = e.split(" "),
                        this._font.name = 1 === e.length ? e[0] : e.slice(1).join(" "),
                        this._font.size = e.length >= 2 ? parseInt(e[0], 10) : t.fonts[this._font.name].size) : (this._font.name = e.name,
                        this._font.size = "number" == typeof e.size ? e.size : parseInt(e.size, 10)),
                        this.dirty = !0)
                    }
                }, {
                    key: "text",
                    get: function() {
                        return this._text
                    },
                    set: function(e) {
                        e = e.toString() || " ",
                        this._text !== e && (this._text = e,
                        this.dirty = !0)
                    }
                }, {
                    key: "maxWidth",
                    get: function() {
                        return this._maxWidth
                    },
                    set: function(e) {
                        this._maxWidth !== e && (this._maxWidth = e,
                        this.dirty = !0)
                    }
                }, {
                    key: "maxLineHeight",
                    get: function() {
                        return this.validate(),
                        this._maxLineHeight
                    }
                }, {
                    key: "textWidth",
                    get: function() {
                        return this.validate(),
                        this._textWidth
                    }
                }, {
                    key: "textHeight",
                    get: function() {
                        return this.validate(),
                        this._textHeight
                    }
                }]),
                t
            }(o.Container);
            n.default = l,
            l.fonts = {}
        }
        , {
            "../core": 65,
            "../core/math/ObservablePoint": 68,
            "../core/settings": 101
        }],
        136: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../core/math/Matrix"))
              , o = new i.default
              , s = function() {
                function e(t, n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this._texture = t,
                    this.mapCoord = new i.default,
                    this.uClampFrame = new Float32Array(4),
                    this.uClampOffset = new Float32Array(2),
                    this._lastTextureID = -1,
                    this.clampOffset = 0,
                    this.clampMargin = void 0 === n ? .5 : n
                }
                return e.prototype.multiplyUvs = function(e, t) {
                    void 0 === t && (t = e);
                    for (var n = this.mapCoord, r = 0; r < e.length; r += 2) {
                        var i = e[r]
                          , o = e[r + 1];
                        t[r] = i * n.a + o * n.c + n.tx,
                        t[r + 1] = i * n.b + o * n.d + n.ty
                    }
                    return t
                }
                ,
                e.prototype.update = function(e) {
                    var t = this._texture;
                    if (!t || !t.valid)
                        return !1;
                    if (!e && this._lastTextureID === t._updateID)
                        return !1;
                    this._lastTextureID = t._updateID;
                    var n = t._uvs;
                    this.mapCoord.set(n.x1 - n.x0, n.y1 - n.y0, n.x3 - n.x0, n.y3 - n.y0, n.x0, n.y0);
                    var r = t.orig
                      , i = t.trim;
                    i && (o.set(r.width / i.width, 0, 0, r.height / i.height, -i.x / i.width, -i.y / i.height),
                    this.mapCoord.append(o));
                    var s = t.baseTexture
                      , a = this.uClampFrame
                      , l = this.clampMargin / s.resolution
                      , u = this.clampOffset;
                    return a[0] = (t._frame.x + l + u) / s.width,
                    a[1] = (t._frame.y + l + u) / s.height,
                    a[2] = (t._frame.x + t._frame.width - l + u) / s.width,
                    a[3] = (t._frame.y + t._frame.height - l + u) / s.height,
                    this.uClampOffset[0] = u / s.realWidth,
                    this.uClampOffset[1] = u / s.realHeight,
                    !0
                }
                ,
                r(e, [{
                    key: "texture",
                    get: function() {
                        return this._texture
                    },
                    set: function(e) {
                        this._texture = e,
                        this._lastTextureID = -1
                    }
                }]),
                e
            }();
            n.default = s
        }
        , {
            "../core/math/Matrix": 67
        }],
        137: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , s = r(e("../core/sprites/canvas/CanvasTinter"))
              , a = r(e("./TextureTransform"))
              , l = new o.Point
              , u = function(e) {
                function t(n) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100
                      , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var s = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return s.tileTransform = new o.TransformStatic,
                    s._width = r,
                    s._height = i,
                    s._canvasPattern = null,
                    s.uvTransform = n.transform || new a.default(n),
                    s.pluginName = "tilingSprite",
                    s.uvRespectAnchor = !1,
                    s
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype._onTextureUpdate = function() {
                    this.uvTransform && (this.uvTransform.texture = this._texture),
                    this.cachedTint = 16777215
                }
                ,
                t.prototype._renderWebGL = function(e) {
                    var t = this._texture;
                    t && t.valid && (this.tileTransform.updateLocalTransform(),
                    this.uvTransform.update(),
                    e.setObjectRenderer(e.plugins[this.pluginName]),
                    e.plugins[this.pluginName].render(this))
                }
                ,
                t.prototype._renderCanvas = function(e) {
                    var t = this._texture;
                    if (t.baseTexture.hasLoaded) {
                        var n = e.context
                          , r = this.worldTransform
                          , i = e.resolution
                          , a = t.baseTexture
                          , l = a.resolution
                          , u = this.tilePosition.x / this.tileScale.x % t._frame.width * l
                          , c = this.tilePosition.y / this.tileScale.y % t._frame.height * l;
                        if (this._textureID !== this._texture._updateID || this.cachedTint !== this.tint) {
                            this._textureID = this._texture._updateID;
                            var h = new o.CanvasRenderTarget(t._frame.width,t._frame.height,l);
                            16777215 !== this.tint ? (this.tintedTexture = s.default.getTintedTexture(this, this.tint),
                            h.context.drawImage(this.tintedTexture, 0, 0)) : h.context.drawImage(a.source, -t._frame.x * l, -t._frame.y * l),
                            this.cachedTint = this.tint,
                            this._canvasPattern = h.context.createPattern(h.canvas, "repeat")
                        }
                        n.globalAlpha = this.worldAlpha,
                        n.setTransform(r.a * i, r.b * i, r.c * i, r.d * i, r.tx * i, r.ty * i),
                        e.setBlendMode(this.blendMode),
                        n.fillStyle = this._canvasPattern,
                        n.scale(this.tileScale.x / l, this.tileScale.y / l);
                        var d = this.anchor.x * -this._width
                          , p = this.anchor.y * -this._height;
                        this.uvRespectAnchor ? (n.translate(u, c),
                        n.fillRect(-u + d, -c + p, this._width / this.tileScale.x * l, this._height / this.tileScale.y * l)) : (n.translate(u + d, c + p),
                        n.fillRect(-u, -c, this._width / this.tileScale.x * l, this._height / this.tileScale.y * l))
                    }
                }
                ,
                t.prototype._calculateBounds = function() {
                    var e = this._width * -this._anchor._x
                      , t = this._height * -this._anchor._y
                      , n = this._width * (1 - this._anchor._x)
                      , r = this._height * (1 - this._anchor._y);
                    this._bounds.addFrame(this.transform, e, t, n, r)
                }
                ,
                t.prototype.getLocalBounds = function(t) {
                    return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x,
                    this._bounds.minY = this._height * -this._anchor._y,
                    this._bounds.maxX = this._width * (1 - this._anchor._x),
                    this._bounds.maxY = this._height * (1 - this._anchor._x),
                    t || (this._localBoundsRect || (this._localBoundsRect = new o.Rectangle),
                    t = this._localBoundsRect),
                    this._bounds.getRectangle(t)) : e.prototype.getLocalBounds.call(this, t)
                }
                ,
                t.prototype.containsPoint = function(e) {
                    this.worldTransform.applyInverse(e, l);
                    var t = this._width
                      , n = this._height
                      , r = -t * this.anchor._x;
                    if (l.x >= r && l.x < r + t) {
                        var i = -n * this.anchor._y;
                        if (l.y >= i && l.y < i + n)
                            return !0
                    }
                    return !1
                }
                ,
                t.prototype.destroy = function(t) {
                    e.prototype.destroy.call(this, t),
                    this.tileTransform = null,
                    this.uvTransform = null
                }
                ,
                t.from = function(e, n, r) {
                    return new t(o.Texture.from(e),n,r)
                }
                ,
                t.fromFrame = function(e, n, r) {
                    var i = o.utils.TextureCache[e];
                    if (!i)
                        throw new Error('The frameId "' + e + '" does not exist in the texture cache ' + this);
                    return new t(i,n,r)
                }
                ,
                t.fromImage = function(e, n, r, i, s) {
                    return new t(o.Texture.fromImage(e, i, s),n,r)
                }
                ,
                i(t, [{
                    key: "clampMargin",
                    get: function() {
                        return this.uvTransform.clampMargin
                    },
                    set: function(e) {
                        this.uvTransform.clampMargin = e,
                        this.uvTransform.update(!0)
                    }
                }, {
                    key: "tileScale",
                    get: function() {
                        return this.tileTransform.scale
                    },
                    set: function(e) {
                        this.tileTransform.scale.copy(e)
                    }
                }, {
                    key: "tilePosition",
                    get: function() {
                        return this.tileTransform.position
                    },
                    set: function(e) {
                        this.tileTransform.position.copy(e)
                    }
                }, {
                    key: "width",
                    get: function() {
                        return this._width
                    },
                    set: function(e) {
                        this._width = e
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this._height
                    },
                    set: function(e) {
                        this._height = e
                    }
                }]),
                t
            }(o.Sprite);
            n.default = u
        }
        , {
            "../core": 65,
            "../core/sprites/canvas/CanvasTinter": 104,
            "./TextureTransform": 136
        }],
        138: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , o = r(e("../core/textures/Texture"))
              , s = r(e("../core/textures/BaseTexture"))
              , a = e("../core/utils")
              , l = i.DisplayObject
              , u = new i.Matrix;
            l.prototype._cacheAsBitmap = !1,
            l.prototype._cacheData = !1;
            var c = function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.textureCacheId = null,
                this.originalRenderWebGL = null,
                this.originalRenderCanvas = null,
                this.originalCalculateBounds = null,
                this.originalGetLocalBounds = null,
                this.originalUpdateTransform = null,
                this.originalHitTest = null,
                this.originalDestroy = null,
                this.originalMask = null,
                this.originalFilterArea = null,
                this.sprite = null
            };
            Object.defineProperties(l.prototype, {
                cacheAsBitmap: {
                    get: function() {
                        return this._cacheAsBitmap
                    },
                    set: function(e) {
                        if (this._cacheAsBitmap !== e) {
                            this._cacheAsBitmap = e;
                            var t = void 0;
                            e ? (this._cacheData || (this._cacheData = new c),
                            (t = this._cacheData).originalRenderWebGL = this.renderWebGL,
                            t.originalRenderCanvas = this.renderCanvas,
                            t.originalUpdateTransform = this.updateTransform,
                            t.originalCalculateBounds = this._calculateBounds,
                            t.originalGetLocalBounds = this.getLocalBounds,
                            t.originalDestroy = this.destroy,
                            t.originalContainsPoint = this.containsPoint,
                            t.originalMask = this._mask,
                            t.originalFilterArea = this.filterArea,
                            this.renderWebGL = this._renderCachedWebGL,
                            this.renderCanvas = this._renderCachedCanvas,
                            this.destroy = this._cacheAsBitmapDestroy) : ((t = this._cacheData).sprite && this._destroyCachedDisplayObject(),
                            this.renderWebGL = t.originalRenderWebGL,
                            this.renderCanvas = t.originalRenderCanvas,
                            this._calculateBounds = t.originalCalculateBounds,
                            this.getLocalBounds = t.originalGetLocalBounds,
                            this.destroy = t.originalDestroy,
                            this.updateTransform = t.originalUpdateTransform,
                            this.containsPoint = t.originalContainsPoint,
                            this._mask = t.originalMask,
                            this.filterArea = t.originalFilterArea)
                        }
                    }
                }
            }),
            l.prototype._renderCachedWebGL = function(e) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(e),
                this._cacheData.sprite._transformID = -1,
                this._cacheData.sprite.worldAlpha = this.worldAlpha,
                this._cacheData.sprite._renderWebGL(e))
            }
            ,
            l.prototype._initCachedDisplayObject = function(e) {
                if (!this._cacheData || !this._cacheData.sprite) {
                    var t = this.alpha;
                    this.alpha = 1,
                    e.currentRenderer.flush();
                    var n = this.getLocalBounds().clone();
                    if (this._filters) {
                        var r = this._filters[0].padding;
                        n.pad(r)
                    }
                    var l = e._activeRenderTarget
                      , c = e.filterManager.filterStack
                      , h = i.RenderTexture.create(0 | n.width, 0 | n.height)
                      , d = "cacheAsBitmap_" + (0,
                    a.uid)();
                    this._cacheData.textureCacheId = d,
                    s.default.addToCache(h.baseTexture, d),
                    o.default.addToCache(h, d);
                    var p = u;
                    p.tx = -n.x,
                    p.ty = -n.y,
                    this.transform.worldTransform.identity(),
                    this.renderWebGL = this._cacheData.originalRenderWebGL,
                    e.render(this, h, !0, p, !0),
                    e.bindRenderTarget(l),
                    e.filterManager.filterStack = c,
                    this.renderWebGL = this._renderCachedWebGL,
                    this.updateTransform = this.displayObjectUpdateTransform,
                    this._mask = null,
                    this.filterArea = null;
                    var f = new i.Sprite(h);
                    f.transform.worldTransform = this.transform.worldTransform,
                    f.anchor.x = -n.x / n.width,
                    f.anchor.y = -n.y / n.height,
                    f.alpha = t,
                    f._bounds = this._bounds,
                    this._calculateBounds = this._calculateCachedBounds,
                    this.getLocalBounds = this._getCachedLocalBounds,
                    this._cacheData.sprite = f,
                    this.transform._parentID = -1,
                    this.parent ? this.updateTransform() : (this.parent = e._tempDisplayObjectParent,
                    this.updateTransform(),
                    this.parent = null),
                    this.containsPoint = f.containsPoint.bind(f)
                }
            }
            ,
            l.prototype._renderCachedCanvas = function(e) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(e),
                this._cacheData.sprite.worldAlpha = this.worldAlpha,
                this._cacheData.sprite.renderCanvas(e))
            }
            ,
            l.prototype._initCachedDisplayObjectCanvas = function(e) {
                if (!this._cacheData || !this._cacheData.sprite) {
                    var t = this.getLocalBounds()
                      , n = this.alpha;
                    this.alpha = 1;
                    var r = e.context
                      , l = i.RenderTexture.create(0 | t.width, 0 | t.height)
                      , c = "cacheAsBitmap_" + (0,
                    a.uid)();
                    this._cacheData.textureCacheId = c,
                    s.default.addToCache(l.baseTexture, c),
                    o.default.addToCache(l, c);
                    var h = u;
                    this.transform.localTransform.copy(h),
                    h.invert(),
                    h.tx -= t.x,
                    h.ty -= t.y,
                    this.renderCanvas = this._cacheData.originalRenderCanvas,
                    e.render(this, l, !0, h, !1),
                    e.context = r,
                    this.renderCanvas = this._renderCachedCanvas,
                    this._calculateBounds = this._calculateCachedBounds,
                    this._mask = null,
                    this.filterArea = null;
                    var d = new i.Sprite(l);
                    d.transform.worldTransform = this.transform.worldTransform,
                    d.anchor.x = -t.x / t.width,
                    d.anchor.y = -t.y / t.height,
                    d._bounds = this._bounds,
                    d.alpha = n,
                    this.parent ? this.updateTransform() : (this.parent = e._tempDisplayObjectParent,
                    this.updateTransform(),
                    this.parent = null),
                    this.updateTransform = this.displayObjectUpdateTransform,
                    this._cacheData.sprite = d,
                    this.containsPoint = d.containsPoint.bind(d)
                }
            }
            ,
            l.prototype._calculateCachedBounds = function() {
                this._cacheData.sprite._calculateBounds()
            }
            ,
            l.prototype._getCachedLocalBounds = function() {
                return this._cacheData.sprite.getLocalBounds()
            }
            ,
            l.prototype._destroyCachedDisplayObject = function() {
                this._cacheData.sprite._texture.destroy(!0),
                this._cacheData.sprite = null,
                s.default.removeFromCache(this._cacheData.textureCacheId),
                o.default.removeFromCache(this._cacheData.textureCacheId),
                this._cacheData.textureCacheId = null
            }
            ,
            l.prototype._cacheAsBitmapDestroy = function(e) {
                this.cacheAsBitmap = !1,
                this.destroy(e)
            }
        }
        , {
            "../core": 65,
            "../core/textures/BaseTexture": 112,
            "../core/textures/Texture": 115,
            "../core/utils": 124
        }],
        139: [function(e, t, n) {
            var r = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"));
            r.DisplayObject.prototype.name = null,
            r.Container.prototype.getChildByName = function(e) {
                for (var t = 0; t < this.children.length; t++)
                    if (this.children[t].name === e)
                        return this.children[t];
                return null
            }
        }
        , {
            "../core": 65
        }],
        140: [function(e, t, n) {
            var r = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"));
            r.DisplayObject.prototype.getGlobalPosition = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new r.Point
                  , t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return this.parent ? this.parent.toGlobal(this.position, e, t) : (e.x = this.position.x,
                e.y = this.position.y),
                e
            }
        }
        , {
            "../core": 65
        }],
        141: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0,
            n.BitmapText = n.TilingSpriteRenderer = n.TilingSprite = n.TextureTransform = n.AnimatedSprite = void 0;
            var i = e("./AnimatedSprite");
            Object.defineProperty(n, "AnimatedSprite", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./TextureTransform");
            Object.defineProperty(n, "TextureTransform", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            });
            var s = e("./TilingSprite");
            Object.defineProperty(n, "TilingSprite", {
                enumerable: !0,
                get: function() {
                    return r(s).default
                }
            });
            var a = e("./webgl/TilingSpriteRenderer");
            Object.defineProperty(n, "TilingSpriteRenderer", {
                enumerable: !0,
                get: function() {
                    return r(a).default
                }
            });
            var l = e("./BitmapText");
            Object.defineProperty(n, "BitmapText", {
                enumerable: !0,
                get: function() {
                    return r(l).default
                }
            }),
            e("./cacheAsBitmap"),
            e("./getChildByName"),
            e("./getGlobalPosition")
        }
        , {
            "./AnimatedSprite": 134,
            "./BitmapText": 135,
            "./TextureTransform": 136,
            "./TilingSprite": 137,
            "./cacheAsBitmap": 138,
            "./getChildByName": 139,
            "./getGlobalPosition": 140,
            "./webgl/TilingSpriteRenderer": 142
        }],
        142: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , i = e("../../core/const")
              , o = (e("path"),
            new r.Matrix)
              , s = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.shader = null,
                    r.simpleShader = null,
                    r.quad = null,
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.onContextChange = function() {
                    var e = this.renderer.gl;
                    this.shader = new r.Shader(e,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n","varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 sample = texture2D(uSampler, coord);\n    gl_FragColor = sample * uColor;\n}\n"),
                    this.simpleShader = new r.Shader(e,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n","varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample * uColor;\n}\n"),
                    this.renderer.bindVao(null),
                    this.quad = new r.Quad(e,this.renderer.state.attribState),
                    this.quad.initVao(this.shader)
                }
                ,
                t.prototype.render = function(e) {
                    var t = this.renderer
                      , n = this.quad;
                    t.bindVao(n.vao);
                    var s = n.vertices;
                    s[0] = s[6] = e._width * -e.anchor.x,
                    s[1] = s[3] = e._height * -e.anchor.y,
                    s[2] = s[4] = e._width * (1 - e.anchor.x),
                    s[5] = s[7] = e._height * (1 - e.anchor.y),
                    e.uvRespectAnchor && ((s = n.uvs)[0] = s[6] = -e.anchor.x,
                    s[1] = s[3] = -e.anchor.y,
                    s[2] = s[4] = 1 - e.anchor.x,
                    s[5] = s[7] = 1 - e.anchor.y),
                    n.upload();
                    var a = e._texture
                      , l = a.baseTexture
                      , u = e.tileTransform.localTransform
                      , c = e.uvTransform
                      , h = l.isPowerOfTwo && a.frame.width === l.width && a.frame.height === l.height;
                    h && (l._glTextures[t.CONTEXT_UID] ? h = l.wrapMode !== i.WRAP_MODES.CLAMP : l.wrapMode === i.WRAP_MODES.CLAMP && (l.wrapMode = i.WRAP_MODES.REPEAT));
                    var d = h ? this.simpleShader : this.shader;
                    t.bindShader(d);
                    var p = a.width
                      , f = a.height
                      , g = e._width
                      , m = e._height;
                    o.set(u.a * p / g, u.b * p / m, u.c * f / g, u.d * f / m, u.tx / g, u.ty / m),
                    o.invert(),
                    h ? o.prepend(c.mapCoord) : (d.uniforms.uMapCoord = c.mapCoord.toArray(!0),
                    d.uniforms.uClampFrame = c.uClampFrame,
                    d.uniforms.uClampOffset = c.uClampOffset),
                    d.uniforms.uTransform = o.toArray(!0),
                    d.uniforms.uColor = r.utils.premultiplyTintToRgba(e.tint, e.worldAlpha, d.uniforms.uColor, l.premultipliedAlpha),
                    d.uniforms.translationMatrix = e.transform.worldTransform.toArray(!0),
                    d.uniforms.uSampler = t.bindTexture(a),
                    t.setBlendMode(r.utils.correctBlendMode(e.blendMode, l.premultipliedAlpha)),
                    n.vao.draw(this.renderer.gl.TRIANGLES, 6, 0)
                }
                ,
                t
            }(r.ObjectRenderer);
            n.default = s,
            r.WebGLRenderer.registerPlugin("tilingSprite", s)
        }
        , {
            "../../core": 65,
            "../../core/const": 46,
            path: 23
        }],
        143: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , s = r(e("./BlurXFilter"))
              , a = r(e("./BlurYFilter"))
              , l = function(e) {
                function t(n, r, i, l) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var u = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return u.blurXFilter = new s.default(n,r,i,l),
                    u.blurYFilter = new a.default(n,r,i,l),
                    u.padding = 0,
                    u.resolution = i || o.settings.RESOLUTION,
                    u.quality = r || 4,
                    u.blur = n || 8,
                    u
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.apply = function(e, t, n) {
                    var r = e.getRenderTarget(!0);
                    this.blurXFilter.apply(e, t, r, !0),
                    this.blurYFilter.apply(e, r, n, !1),
                    e.returnRenderTarget(r)
                }
                ,
                i(t, [{
                    key: "blur",
                    get: function() {
                        return this.blurXFilter.blur
                    },
                    set: function(e) {
                        this.blurXFilter.blur = this.blurYFilter.blur = e,
                        this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
                    }
                }, {
                    key: "quality",
                    get: function() {
                        return this.blurXFilter.quality
                    },
                    set: function(e) {
                        this.blurXFilter.quality = this.blurYFilter.quality = e
                    }
                }, {
                    key: "blurX",
                    get: function() {
                        return this.blurXFilter.blur
                    },
                    set: function(e) {
                        this.blurXFilter.blur = e,
                        this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
                    }
                }, {
                    key: "blurY",
                    get: function() {
                        return this.blurYFilter.blur
                    },
                    set: function(e) {
                        this.blurYFilter.blur = e,
                        this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
                    }
                }, {
                    key: "blendMode",
                    get: function() {
                        return this.blurYFilter._blendMode
                    },
                    set: function(e) {
                        this.blurYFilter._blendMode = e
                    }
                }]),
                t
            }(o.Filter);
            n.default = l
        }
        , {
            "../../core": 65,
            "./BlurXFilter": 144,
            "./BlurYFilter": 145
        }],
        144: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , s = r(e("./generateBlurVertSource"))
              , a = r(e("./generateBlurFragSource"))
              , l = r(e("./getMaxBlurKernelSize"))
              , u = function(e) {
                function t(n, r, i, l) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    l = l || 5;
                    var u = (0,
                    s.default)(l, !0)
                      , c = (0,
                    a.default)(l)
                      , h = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, u, c));
                    return h.resolution = i || o.settings.RESOLUTION,
                    h._quality = 0,
                    h.quality = r || 4,
                    h.strength = n || 8,
                    h.firstRun = !0,
                    h
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.apply = function(e, t, n, r) {
                    if (this.firstRun) {
                        var i = e.renderer.gl
                          , o = (0,
                        l.default)(i);
                        this.vertexSrc = (0,
                        s.default)(o, !0),
                        this.fragmentSrc = (0,
                        a.default)(o),
                        this.firstRun = !1
                    }
                    if (this.uniforms.strength = 1 / n.size.width * (n.size.width / t.size.width),
                    this.uniforms.strength *= this.strength,
                    this.uniforms.strength /= this.passes,
                    1 === this.passes)
                        e.applyFilter(this, t, n, r);
                    else {
                        for (var u = e.getRenderTarget(!0), c = t, h = u, d = 0; d < this.passes - 1; d++) {
                            e.applyFilter(this, c, h, !0);
                            var p = h;
                            h = c,
                            c = p
                        }
                        e.applyFilter(this, c, n, r),
                        e.returnRenderTarget(u)
                    }
                }
                ,
                i(t, [{
                    key: "blur",
                    get: function() {
                        return this.strength
                    },
                    set: function(e) {
                        this.padding = 2 * Math.abs(e),
                        this.strength = e
                    }
                }, {
                    key: "quality",
                    get: function() {
                        return this._quality
                    },
                    set: function(e) {
                        this._quality = e,
                        this.passes = e
                    }
                }]),
                t
            }(o.Filter);
            n.default = u
        }
        , {
            "../../core": 65,
            "./generateBlurFragSource": 146,
            "./generateBlurVertSource": 147,
            "./getMaxBlurKernelSize": 148
        }],
        145: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , o = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , s = r(e("./generateBlurVertSource"))
              , a = r(e("./generateBlurFragSource"))
              , l = r(e("./getMaxBlurKernelSize"))
              , u = function(e) {
                function t(n, r, i, l) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    l = l || 5;
                    var u = (0,
                    s.default)(l, !1)
                      , c = (0,
                    a.default)(l)
                      , h = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, u, c));
                    return h.resolution = i || o.settings.RESOLUTION,
                    h._quality = 0,
                    h.quality = r || 4,
                    h.strength = n || 8,
                    h.firstRun = !0,
                    h
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.apply = function(e, t, n, r) {
                    if (this.firstRun) {
                        var i = e.renderer.gl
                          , o = (0,
                        l.default)(i);
                        this.vertexSrc = (0,
                        s.default)(o, !1),
                        this.fragmentSrc = (0,
                        a.default)(o),
                        this.firstRun = !1
                    }
                    if (this.uniforms.strength = 1 / n.size.height * (n.size.height / t.size.height),
                    this.uniforms.strength *= this.strength,
                    this.uniforms.strength /= this.passes,
                    1 === this.passes)
                        e.applyFilter(this, t, n, r);
                    else {
                        for (var u = e.getRenderTarget(!0), c = t, h = u, d = 0; d < this.passes - 1; d++) {
                            e.applyFilter(this, c, h, !0);
                            var p = h;
                            h = c,
                            c = p
                        }
                        e.applyFilter(this, c, n, r),
                        e.returnRenderTarget(u)
                    }
                }
                ,
                i(t, [{
                    key: "blur",
                    get: function() {
                        return this.strength
                    },
                    set: function(e) {
                        this.padding = 2 * Math.abs(e),
                        this.strength = e
                    }
                }, {
                    key: "quality",
                    get: function() {
                        return this._quality
                    },
                    set: function(e) {
                        this._quality = e,
                        this.passes = e
                    }
                }]),
                t
            }(o.Filter);
            n.default = u
        }
        , {
            "../../core": 65,
            "./generateBlurFragSource": 146,
            "./generateBlurVertSource": 147,
            "./getMaxBlurKernelSize": 148
        }],
        146: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                for (var t = r[e], n = t.length, o = i, s = "", a = void 0, l = 0; l < e; l++) {
                    var u = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%", l);
                    a = l,
                    l >= n && (a = e - l - 1),
                    s += u = u.replace("%value%", t[a]),
                    s += "\n"
                }
                return o = o.replace("%blur%", s),
                o = o.replace("%size%", e)
            }
            ;
            var r = {
                5: [.153388, .221461, .250301],
                7: [.071303, .131514, .189879, .214607],
                9: [.028532, .067234, .124009, .179044, .20236],
                11: [.0093, .028002, .065984, .121703, .175713, .198596],
                13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641],
                15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448]
            }
              , i = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "    gl_FragColor = vec4(0.0);", "    %blur%", "}"].join("\n")
        }
        , {}],
        147: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e, t) {
                var n = Math.ceil(e / 2)
                  , i = r
                  , o = ""
                  , s = void 0;
                s = t ? "vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";
                for (var a = 0; a < e; a++) {
                    var l = s.replace("%index%", a);
                    o += l = l.replace("%sampleIndex%", a - (n - 1) + ".0"),
                    o += "\n"
                }
                return i = i.replace("%blur%", o),
                i = i.replace("%size%", e)
            }
            ;
            var r = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float strength;", "uniform mat3 projectionMatrix;", "varying vec2 vBlurTexCoords[%size%];", "void main(void)", "{", "gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);", "%blur%", "}"].join("\n")
        }
        , {}],
        148: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function(e) {
                for (var t = e.getParameter(e.MAX_VARYING_VECTORS), n = 15; n > t; )
                    n -= 2;
                return n
            }
        }
        , {}],
        149: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , o = (e("path"),
            function(e) {
                function t() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n"));
                    return n.uniforms.m = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
                    n.alpha = 1,
                    n
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype._loadMatrix = function(e) {
                    var t = e;
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1] && (this._multiply(t, this.uniforms.m, e),
                    t = this._colorMatrix(t)),
                    this.uniforms.m = t
                }
                ,
                t.prototype._multiply = function(e, t, n) {
                    return e[0] = t[0] * n[0] + t[1] * n[5] + t[2] * n[10] + t[3] * n[15],
                    e[1] = t[0] * n[1] + t[1] * n[6] + t[2] * n[11] + t[3] * n[16],
                    e[2] = t[0] * n[2] + t[1] * n[7] + t[2] * n[12] + t[3] * n[17],
                    e[3] = t[0] * n[3] + t[1] * n[8] + t[2] * n[13] + t[3] * n[18],
                    e[4] = t[0] * n[4] + t[1] * n[9] + t[2] * n[14] + t[3] * n[19] + t[4],
                    e[5] = t[5] * n[0] + t[6] * n[5] + t[7] * n[10] + t[8] * n[15],
                    e[6] = t[5] * n[1] + t[6] * n[6] + t[7] * n[11] + t[8] * n[16],
                    e[7] = t[5] * n[2] + t[6] * n[7] + t[7] * n[12] + t[8] * n[17],
                    e[8] = t[5] * n[3] + t[6] * n[8] + t[7] * n[13] + t[8] * n[18],
                    e[9] = t[5] * n[4] + t[6] * n[9] + t[7] * n[14] + t[8] * n[19] + t[9],
                    e[10] = t[10] * n[0] + t[11] * n[5] + t[12] * n[10] + t[13] * n[15],
                    e[11] = t[10] * n[1] + t[11] * n[6] + t[12] * n[11] + t[13] * n[16],
                    e[12] = t[10] * n[2] + t[11] * n[7] + t[12] * n[12] + t[13] * n[17],
                    e[13] = t[10] * n[3] + t[11] * n[8] + t[12] * n[13] + t[13] * n[18],
                    e[14] = t[10] * n[4] + t[11] * n[9] + t[12] * n[14] + t[13] * n[19] + t[14],
                    e[15] = t[15] * n[0] + t[16] * n[5] + t[17] * n[10] + t[18] * n[15],
                    e[16] = t[15] * n[1] + t[16] * n[6] + t[17] * n[11] + t[18] * n[16],
                    e[17] = t[15] * n[2] + t[16] * n[7] + t[17] * n[12] + t[18] * n[17],
                    e[18] = t[15] * n[3] + t[16] * n[8] + t[17] * n[13] + t[18] * n[18],
                    e[19] = t[15] * n[4] + t[16] * n[9] + t[17] * n[14] + t[18] * n[19] + t[19],
                    e
                }
                ,
                t.prototype._colorMatrix = function(e) {
                    var t = new Float32Array(e);
                    return t[4] /= 255,
                    t[9] /= 255,
                    t[14] /= 255,
                    t[19] /= 255,
                    t
                }
                ,
                t.prototype.brightness = function(e, t) {
                    var n = [e, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 1, 0];
                    this._loadMatrix(n, t)
                }
                ,
                t.prototype.greyscale = function(e, t) {
                    var n = [e, e, e, 0, 0, e, e, e, 0, 0, e, e, e, 0, 0, 0, 0, 0, 1, 0];
                    this._loadMatrix(n, t)
                }
                ,
                t.prototype.blackAndWhite = function(e) {
                    this._loadMatrix([.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.hue = function(e, t) {
                    e = (e || 0) / 180 * Math.PI;
                    var n = Math.cos(e)
                      , r = Math.sin(e)
                      , i = (0,
                    Math.sqrt)(1 / 3)
                      , o = [n + 1 / 3 * (1 - n), 1 / 3 * (1 - n) - i * r, 1 / 3 * (1 - n) + i * r, 0, 0, 1 / 3 * (1 - n) + i * r, n + 1 / 3 * (1 - n), 1 / 3 * (1 - n) - i * r, 0, 0, 1 / 3 * (1 - n) - i * r, 1 / 3 * (1 - n) + i * r, n + 1 / 3 * (1 - n), 0, 0, 0, 0, 0, 1, 0];
                    this._loadMatrix(o, t)
                }
                ,
                t.prototype.contrast = function(e, t) {
                    var n = (e || 0) + 1
                      , r = -.5 * (n - 1)
                      , i = [n, 0, 0, 0, r, 0, n, 0, 0, r, 0, 0, n, 0, r, 0, 0, 0, 1, 0];
                    this._loadMatrix(i, t)
                }
                ,
                t.prototype.saturate = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , t = arguments[1]
                      , n = 2 * e / 3 + 1
                      , r = -.5 * (n - 1)
                      , i = [n, r, r, 0, 0, r, n, r, 0, 0, r, r, n, 0, 0, 0, 0, 0, 1, 0];
                    this._loadMatrix(i, t)
                }
                ,
                t.prototype.desaturate = function() {
                    this.saturate(-1)
                }
                ,
                t.prototype.negative = function(e) {
                    this._loadMatrix([0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.sepia = function(e) {
                    this._loadMatrix([.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.technicolor = function(e) {
                    this._loadMatrix([1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.polaroid = function(e) {
                    this._loadMatrix([1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.toBGR = function(e) {
                    this._loadMatrix([0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.kodachrome = function(e) {
                    this._loadMatrix([1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.browni = function(e) {
                    this._loadMatrix([.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.vintage = function(e) {
                    this._loadMatrix([.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.colorTone = function(e, t, n, r, i) {
                    e = e || .2,
                    t = t || .15;
                    var o = ((n = n || 16770432) >> 16 & 255) / 255
                      , s = (n >> 8 & 255) / 255
                      , a = (255 & n) / 255
                      , l = ((r = r || 3375104) >> 16 & 255) / 255
                      , u = (r >> 8 & 255) / 255
                      , c = (255 & r) / 255
                      , h = [.3, .59, .11, 0, 0, o, s, a, e, 0, l, u, c, t, 0, o - l, s - u, a - c, 0, 0];
                    this._loadMatrix(h, i)
                }
                ,
                t.prototype.night = function(e, t) {
                    var n = [-2 * (e = e || .1), -e, 0, 0, 0, -e, 0, e, 0, 0, 0, e, 2 * e, 0, 0, 0, 0, 0, 1, 0];
                    this._loadMatrix(n, t)
                }
                ,
                t.prototype.predator = function(e, t) {
                    var n = [11.224130630493164 * e, -4.794486999511719 * e, -2.8746118545532227 * e, 0 * e, .40342438220977783 * e, -3.6330697536468506 * e, 9.193157196044922 * e, -2.951810836791992 * e, 0 * e, -1.316135048866272 * e, -3.2184197902679443 * e, -4.2375030517578125 * e, 7.476448059082031 * e, 0 * e, .8044459223747253 * e, 0, 0, 0, 1, 0];
                    this._loadMatrix(n, t)
                }
                ,
                t.prototype.lsd = function(e) {
                    this._loadMatrix([2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0], e)
                }
                ,
                t.prototype.reset = function() {
                    this._loadMatrix([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], !1)
                }
                ,
                r(t, [{
                    key: "matrix",
                    get: function() {
                        return this.uniforms.m
                    },
                    set: function(e) {
                        this.uniforms.m = e
                    }
                }, {
                    key: "alpha",
                    get: function() {
                        return this.uniforms.uAlpha
                    },
                    set: function(e) {
                        this.uniforms.uAlpha = e
                    }
                }]),
                t
            }(i.Filter));
            n.default = o,
            o.prototype.grayscale = o.prototype.greyscale
        }
        , {
            "../../core": 65,
            path: 23
        }],
        150: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , o = (e("path"),
            function(e) {
                function t(n, r) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var o = new i.Matrix;
                    n.renderable = !1;
                    var s = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}", "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"));
                    return s.maskSprite = n,
                    s.maskMatrix = o,
                    s.uniforms.mapSampler = n._texture,
                    s.uniforms.filterMatrix = o,
                    s.uniforms.scale = {
                        x: 1,
                        y: 1
                    },
                    null !== r && void 0 !== r || (r = 20),
                    s.scale = new i.Point(r,r),
                    s
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.apply = function(e, t, n) {
                    var r = 1 / n.destinationFrame.width * (n.size.width / t.size.width);
                    this.uniforms.filterMatrix = e.calculateSpriteMatrix(this.maskMatrix, this.maskSprite),
                    this.uniforms.scale.x = this.scale.x * r,
                    this.uniforms.scale.y = this.scale.y * r,
                    e.applyFilter(this, t, n)
                }
                ,
                r(t, [{
                    key: "map",
                    get: function() {
                        return this.uniforms.mapSampler
                    },
                    set: function(e) {
                        this.uniforms.mapSampler = e
                    }
                }]),
                t
            }(i.Filter));
            n.default = o
        }
        , {
            "../../core": 65,
            path: 23
        }],
        151: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , i = (e("path"),
            function(e) {
                function t() {
                    return function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, "\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}", 'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n      vec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n'))
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t
            }(r.Filter));
            n.default = i
        }
        , {
            "../../core": 65,
            path: 23
        }],
        152: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("./fxaa/FXAAFilter");
            Object.defineProperty(n, "FXAAFilter", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./noise/NoiseFilter");
            Object.defineProperty(n, "NoiseFilter", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            });
            var s = e("./displacement/DisplacementFilter");
            Object.defineProperty(n, "DisplacementFilter", {
                enumerable: !0,
                get: function() {
                    return r(s).default
                }
            });
            var a = e("./blur/BlurFilter");
            Object.defineProperty(n, "BlurFilter", {
                enumerable: !0,
                get: function() {
                    return r(a).default
                }
            });
            var l = e("./blur/BlurXFilter");
            Object.defineProperty(n, "BlurXFilter", {
                enumerable: !0,
                get: function() {
                    return r(l).default
                }
            });
            var u = e("./blur/BlurYFilter");
            Object.defineProperty(n, "BlurYFilter", {
                enumerable: !0,
                get: function() {
                    return r(u).default
                }
            });
            var c = e("./colormatrix/ColorMatrixFilter");
            Object.defineProperty(n, "ColorMatrixFilter", {
                enumerable: !0,
                get: function() {
                    return r(c).default
                }
            });
            var h = e("./void/VoidFilter");
            Object.defineProperty(n, "VoidFilter", {
                enumerable: !0,
                get: function() {
                    return r(h).default
                }
            })
        }
        , {
            "./blur/BlurFilter": 143,
            "./blur/BlurXFilter": 144,
            "./blur/BlurYFilter": 145,
            "./colormatrix/ColorMatrixFilter": 149,
            "./displacement/DisplacementFilter": 150,
            "./fxaa/FXAAFilter": 151,
            "./noise/NoiseFilter": 153,
            "./void/VoidFilter": 154
        }],
        153: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , o = (e("path"),
            function(e) {
                function t() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .5
                      , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Math.random();
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n"));
                    return i.noise = n,
                    i.seed = r,
                    i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                r(t, [{
                    key: "noise",
                    get: function() {
                        return this.uniforms.uNoise
                    },
                    set: function(e) {
                        this.uniforms.uNoise = e
                    }
                }, {
                    key: "seed",
                    get: function() {
                        return this.uniforms.uSeed
                    },
                    set: function(e) {
                        this.uniforms.uSeed = e
                    }
                }]),
                t
            }(i.Filter));
            n.default = o
        }
        , {
            "../../core": 65,
            path: 23
        }],
        154: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , i = (e("path"),
            function(e) {
                function t() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"));
                    return n.glShaderKey = "void",
                    n
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t
            }(r.Filter));
            n.default = i
        }
        , {
            "../../core": 65,
            path: 23
        }],
        155: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , o = function() {
                function e() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.global = new i.Point,
                    this.target = null,
                    this.originalEvent = null,
                    this.identifier = null,
                    this.isPrimary = !1,
                    this.button = 0,
                    this.buttons = 0,
                    this.width = 0,
                    this.height = 0,
                    this.tiltX = 0,
                    this.tiltY = 0,
                    this.pointerType = null,
                    this.pressure = 0,
                    this.rotationAngle = 0,
                    this.twist = 0,
                    this.tangentialPressure = 0
                }
                return e.prototype.getLocalPosition = function(e, t, n) {
                    return e.worldTransform.applyInverse(n || this.global, t)
                }
                ,
                e.prototype._copyEvent = function(e) {
                    e.isPrimary && (this.isPrimary = !0),
                    this.button = e.button,
                    this.buttons = e.buttons,
                    this.width = e.width,
                    this.height = e.height,
                    this.tiltX = e.tiltX,
                    this.tiltY = e.tiltY,
                    this.pointerType = e.pointerType,
                    this.pressure = e.pressure,
                    this.rotationAngle = e.rotationAngle,
                    this.twist = e.twist || 0,
                    this.tangentialPressure = e.tangentialPressure || 0
                }
                ,
                e.prototype._reset = function() {
                    this.isPrimary = !1
                }
                ,
                r(e, [{
                    key: "pointerId",
                    get: function() {
                        return this.identifier
                    }
                }]),
                e
            }();
            n.default = o
        }
        , {
            "../core": 65
        }],
        156: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.stopped = !1,
                    this.target = null,
                    this.currentTarget = null,
                    this.type = null,
                    this.data = null
                }
                return e.prototype.stopPropagation = function() {
                    this.stopped = !0
                }
                ,
                e.prototype._reset = function() {
                    this.stopped = !1,
                    this.currentTarget = null,
                    this.target = null
                }
                ,
                e
            }();
            n.default = r
        }
        , {}],
        157: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
              , o = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , s = r(e("./InteractionData"))
              , a = r(e("./InteractionEvent"))
              , l = r(e("./InteractionTrackingData"))
              , u = r(e("eventemitter3"))
              , c = r(e("./interactiveTarget"));
            o.utils.mixins.delayMixin(o.DisplayObject.prototype, c.default);
            var h = "MOUSE"
              , d = {
                target: null,
                data: {
                    global: null
                }
            }
              , p = function(e) {
                function t(n, r) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return r = r || {},
                    i.renderer = n,
                    i.autoPreventDefault = void 0 === r.autoPreventDefault || r.autoPreventDefault,
                    i.interactionFrequency = r.interactionFrequency || 10,
                    i.mouse = new s.default,
                    i.mouse.identifier = h,
                    i.mouse.global.set(-999999),
                    i.activeInteractionData = {},
                    i.activeInteractionData[h] = i.mouse,
                    i.interactionDataPool = [],
                    i.eventData = new a.default,
                    i.interactionDOMElement = null,
                    i.moveWhenInside = !1,
                    i.eventsAdded = !1,
                    i.mouseOverRenderer = !1,
                    i.supportsTouchEvents = "ontouchstart"in window,
                    i.supportsPointerEvents = !!window.PointerEvent,
                    i.onPointerUp = i.onPointerUp.bind(i),
                    i.processPointerUp = i.processPointerUp.bind(i),
                    i.onPointerCancel = i.onPointerCancel.bind(i),
                    i.processPointerCancel = i.processPointerCancel.bind(i),
                    i.onPointerDown = i.onPointerDown.bind(i),
                    i.processPointerDown = i.processPointerDown.bind(i),
                    i.onPointerMove = i.onPointerMove.bind(i),
                    i.processPointerMove = i.processPointerMove.bind(i),
                    i.onPointerOut = i.onPointerOut.bind(i),
                    i.processPointerOverOut = i.processPointerOverOut.bind(i),
                    i.onPointerOver = i.onPointerOver.bind(i),
                    i.cursorStyles = {
                        default: "inherit",
                        pointer: "pointer"
                    },
                    i.currentCursorMode = null,
                    i.cursor = null,
                    i._tempPoint = new o.Point,
                    i.resolution = 1,
                    i.setTargetElement(i.renderer.view, i.renderer.resolution),
                    i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.hitTest = function(e, t) {
                    return d.target = null,
                    d.data.global = e,
                    t || (t = this.renderer._lastObjectRendered),
                    this.processInteractive(d, t, null, !0),
                    d.target
                }
                ,
                t.prototype.setTargetElement = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    this.removeEvents(),
                    this.interactionDOMElement = e,
                    this.resolution = t,
                    this.addEvents()
                }
                ,
                t.prototype.addEvents = function() {
                    this.interactionDOMElement && (o.ticker.shared.add(this.update, this, o.UPDATE_PRIORITY.INTERACTION),
                    window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "none",
                    this.interactionDOMElement.style["-ms-touch-action"] = "none") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = "none"),
                    this.supportsPointerEvents ? (window.document.addEventListener("pointermove", this.onPointerMove, !0),
                    this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0),
                    this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, !0),
                    this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0),
                    window.addEventListener("pointercancel", this.onPointerCancel, !0),
                    window.addEventListener("pointerup", this.onPointerUp, !0)) : (window.document.addEventListener("mousemove", this.onPointerMove, !0),
                    this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0),
                    this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0),
                    this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0),
                    window.addEventListener("mouseup", this.onPointerUp, !0)),
                    this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0),
                    this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, !0),
                    this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0),
                    this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)),
                    this.eventsAdded = !0)
                }
                ,
                t.prototype.removeEvents = function() {
                    this.interactionDOMElement && (o.ticker.shared.remove(this.update, this),
                    window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "",
                    this.interactionDOMElement.style["-ms-touch-action"] = "") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = ""),
                    this.supportsPointerEvents ? (window.document.removeEventListener("pointermove", this.onPointerMove, !0),
                    this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0),
                    this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, !0),
                    this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0),
                    window.removeEventListener("pointercancel", this.onPointerCancel, !0),
                    window.removeEventListener("pointerup", this.onPointerUp, !0)) : (window.document.removeEventListener("mousemove", this.onPointerMove, !0),
                    this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0),
                    this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0),
                    this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0),
                    window.removeEventListener("mouseup", this.onPointerUp, !0)),
                    this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0),
                    this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, !0),
                    this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0),
                    this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)),
                    this.interactionDOMElement = null,
                    this.eventsAdded = !1)
                }
                ,
                t.prototype.update = function(e) {
                    if (this._deltaTime += e,
                    !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0,
                    this.interactionDOMElement))
                        if (this.didMove)
                            this.didMove = !1;
                        else {
                            this.cursor = null;
                            for (var t in this.activeInteractionData)
                                if (this.activeInteractionData.hasOwnProperty(t)) {
                                    var n = this.activeInteractionData[t];
                                    if (n.originalEvent && "touch" !== n.pointerType) {
                                        var r = this.configureInteractionEventForDOMEvent(this.eventData, n.originalEvent, n);
                                        this.processInteractive(r, this.renderer._lastObjectRendered, this.processPointerOverOut, !0)
                                    }
                                }
                            this.setCursorMode(this.cursor)
                        }
                }
                ,
                t.prototype.setCursorMode = function(e) {
                    if (e = e || "default",
                    this.currentCursorMode !== e) {
                        this.currentCursorMode = e;
                        var t = this.cursorStyles[e];
                        if (t)
                            switch (void 0 === t ? "undefined" : i(t)) {
                            case "string":
                                this.interactionDOMElement.style.cursor = t;
                                break;
                            case "function":
                                t(e);
                                break;
                            case "object":
                                Object.assign(this.interactionDOMElement.style, t)
                            }
                        else
                            "string" != typeof e || Object.prototype.hasOwnProperty.call(this.cursorStyles, e) || (this.interactionDOMElement.style.cursor = e)
                    }
                }
                ,
                t.prototype.dispatchEvent = function(e, t, n) {
                    n.stopped || (n.currentTarget = e,
                    n.type = t,
                    e.emit(t, n),
                    e[t] && e[t](n))
                }
                ,
                t.prototype.mapPositionToPoint = function(e, t, n) {
                    var r = void 0;
                    r = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                    var i = navigator.isCocoonJS ? this.resolution : 1 / this.resolution;
                    e.x = (t - r.left) * (this.interactionDOMElement.width / r.width) * i,
                    e.y = (n - r.top) * (this.interactionDOMElement.height / r.height) * i
                }
                ,
                t.prototype.processInteractive = function(e, t, n, r, i) {
                    if (!t || !t.visible)
                        return !1;
                    var o = e.data.global
                      , s = !1
                      , a = i = t.interactive || i;
                    if (t.hitArea ? a = !1 : r && t._mask && (t._mask.containsPoint(o) || (r = !1)),
                    t.interactiveChildren && t.children)
                        for (var l = t.children, u = l.length - 1; u >= 0; u--) {
                            var c = l[u]
                              , h = this.processInteractive(e, c, n, r, a);
                            if (h) {
                                if (!c.parent)
                                    continue;
                                a = !1,
                                h && (e.target && (r = !1),
                                s = !0)
                            }
                        }
                    return i && (r && !e.target && (t.hitArea ? (t.worldTransform.applyInverse(o, this._tempPoint),
                    t.hitArea.contains(this._tempPoint.x, this._tempPoint.y) && (s = !0)) : t.containsPoint && t.containsPoint(o) && (s = !0)),
                    t.interactive && (s && !e.target && (e.target = t),
                    n && n(e, t, !!s))),
                    s
                }
                ,
                t.prototype.onPointerDown = function(e) {
                    if (!this.supportsTouchEvents || "touch" !== e.pointerType) {
                        var t = this.normalizeToPointerData(e);
                        this.autoPreventDefault && t[0].isNormalized && e.preventDefault();
                        for (var n = t.length, r = 0; r < n; r++) {
                            var i = t[r]
                              , o = this.getInteractionDataForPointerId(i)
                              , s = this.configureInteractionEventForDOMEvent(this.eventData, i, o);
                            if (s.data.originalEvent = e,
                            this.processInteractive(s, this.renderer._lastObjectRendered, this.processPointerDown, !0),
                            this.emit("pointerdown", s),
                            "touch" === i.pointerType)
                                this.emit("touchstart", s);
                            else if ("mouse" === i.pointerType || "pen" === i.pointerType) {
                                var a = 2 === i.button;
                                this.emit(a ? "rightdown" : "mousedown", this.eventData)
                            }
                        }
                    }
                }
                ,
                t.prototype.processPointerDown = function(e, t, n) {
                    var r = e.data
                      , i = e.data.identifier;
                    if (n)
                        if (t.trackedPointers[i] || (t.trackedPointers[i] = new l.default(i)),
                        this.dispatchEvent(t, "pointerdown", e),
                        "touch" === r.pointerType)
                            this.dispatchEvent(t, "touchstart", e);
                        else if ("mouse" === r.pointerType || "pen" === r.pointerType) {
                            var o = 2 === r.button;
                            o ? t.trackedPointers[i].rightDown = !0 : t.trackedPointers[i].leftDown = !0,
                            this.dispatchEvent(t, o ? "rightdown" : "mousedown", e)
                        }
                }
                ,
                t.prototype.onPointerComplete = function(e, t, n) {
                    for (var r = this.normalizeToPointerData(e), i = r.length, o = e.target !== this.interactionDOMElement ? "outside" : "", s = 0; s < i; s++) {
                        var a = r[s]
                          , l = this.getInteractionDataForPointerId(a)
                          , u = this.configureInteractionEventForDOMEvent(this.eventData, a, l);
                        if (u.data.originalEvent = e,
                        this.processInteractive(u, this.renderer._lastObjectRendered, n, t || !o),
                        this.emit(t ? "pointercancel" : "pointerup" + o, u),
                        "mouse" === a.pointerType || "pen" === a.pointerType) {
                            var c = 2 === a.button;
                            this.emit(c ? "rightup" + o : "mouseup" + o, u)
                        } else
                            "touch" === a.pointerType && (this.emit(t ? "touchcancel" : "touchend" + o, u),
                            this.releaseInteractionDataForPointerId(a.pointerId, l))
                    }
                }
                ,
                t.prototype.onPointerCancel = function(e) {
                    this.supportsTouchEvents && "touch" === e.pointerType || this.onPointerComplete(e, !0, this.processPointerCancel)
                }
                ,
                t.prototype.processPointerCancel = function(e, t) {
                    var n = e.data
                      , r = e.data.identifier;
                    void 0 !== t.trackedPointers[r] && (delete t.trackedPointers[r],
                    this.dispatchEvent(t, "pointercancel", e),
                    "touch" === n.pointerType && this.dispatchEvent(t, "touchcancel", e))
                }
                ,
                t.prototype.onPointerUp = function(e) {
                    this.supportsTouchEvents && "touch" === e.pointerType || this.onPointerComplete(e, !1, this.processPointerUp)
                }
                ,
                t.prototype.processPointerUp = function(e, t, n) {
                    var r = e.data
                      , i = e.data.identifier
                      , o = t.trackedPointers[i]
                      , s = "touch" === r.pointerType;
                    if ("mouse" === r.pointerType || "pen" === r.pointerType) {
                        var a = 2 === r.button
                          , u = l.default.FLAGS
                          , c = a ? u.RIGHT_DOWN : u.LEFT_DOWN
                          , h = void 0 !== o && o.flags & c;
                        n ? (this.dispatchEvent(t, a ? "rightup" : "mouseup", e),
                        h && this.dispatchEvent(t, a ? "rightclick" : "click", e)) : h && this.dispatchEvent(t, a ? "rightupoutside" : "mouseupoutside", e),
                        o && (a ? o.rightDown = !1 : o.leftDown = !1)
                    }
                    n ? (this.dispatchEvent(t, "pointerup", e),
                    s && this.dispatchEvent(t, "touchend", e),
                    o && (this.dispatchEvent(t, "pointertap", e),
                    s && (this.dispatchEvent(t, "tap", e),
                    o.over = !1))) : o && (this.dispatchEvent(t, "pointerupoutside", e),
                    s && this.dispatchEvent(t, "touchendoutside", e)),
                    o && o.none && delete t.trackedPointers[i]
                }
                ,
                t.prototype.onPointerMove = function(e) {
                    if (!this.supportsTouchEvents || "touch" !== e.pointerType) {
                        var t = this.normalizeToPointerData(e);
                        "mouse" === t[0].pointerType && (this.didMove = !0,
                        this.cursor = null);
                        for (var n = t.length, r = 0; r < n; r++) {
                            var i = t[r]
                              , o = this.getInteractionDataForPointerId(i)
                              , s = this.configureInteractionEventForDOMEvent(this.eventData, i, o);
                            s.data.originalEvent = e;
                            var a = "touch" !== i.pointerType || this.moveWhenInside;
                            this.processInteractive(s, this.renderer._lastObjectRendered, this.processPointerMove, a),
                            this.emit("pointermove", s),
                            "touch" === i.pointerType && this.emit("touchmove", s),
                            "mouse" !== i.pointerType && "pen" !== i.pointerType || this.emit("mousemove", s)
                        }
                        "mouse" === t[0].pointerType && this.setCursorMode(this.cursor)
                    }
                }
                ,
                t.prototype.processPointerMove = function(e, t, n) {
                    var r = e.data
                      , i = "touch" === r.pointerType
                      , o = "mouse" === r.pointerType || "pen" === r.pointerType;
                    o && this.processPointerOverOut(e, t, n),
                    this.moveWhenInside && !n || (this.dispatchEvent(t, "pointermove", e),
                    i && this.dispatchEvent(t, "touchmove", e),
                    o && this.dispatchEvent(t, "mousemove", e))
                }
                ,
                t.prototype.onPointerOut = function(e) {
                    if (!this.supportsTouchEvents || "touch" !== e.pointerType) {
                        var t = this.normalizeToPointerData(e)[0];
                        "mouse" === t.pointerType && (this.mouseOverRenderer = !1,
                        this.setCursorMode(null));
                        var n = this.getInteractionDataForPointerId(t)
                          , r = this.configureInteractionEventForDOMEvent(this.eventData, t, n);
                        r.data.originalEvent = t,
                        this.processInteractive(r, this.renderer._lastObjectRendered, this.processPointerOverOut, !1),
                        this.emit("pointerout", r),
                        "mouse" === t.pointerType || "pen" === t.pointerType ? this.emit("mouseout", r) : this.releaseInteractionDataForPointerId(n.identifier)
                    }
                }
                ,
                t.prototype.processPointerOverOut = function(e, t, n) {
                    var r = e.data
                      , i = e.data.identifier
                      , o = "mouse" === r.pointerType || "pen" === r.pointerType
                      , s = t.trackedPointers[i];
                    n && !s && (s = t.trackedPointers[i] = new l.default(i)),
                    void 0 !== s && (n && this.mouseOverRenderer ? (s.over || (s.over = !0,
                    this.dispatchEvent(t, "pointerover", e),
                    o && this.dispatchEvent(t, "mouseover", e)),
                    o && null === this.cursor && (this.cursor = t.cursor)) : s.over && (s.over = !1,
                    this.dispatchEvent(t, "pointerout", this.eventData),
                    o && this.dispatchEvent(t, "mouseout", e),
                    s.none && delete t.trackedPointers[i]))
                }
                ,
                t.prototype.onPointerOver = function(e) {
                    var t = this.normalizeToPointerData(e)[0]
                      , n = this.getInteractionDataForPointerId(t)
                      , r = this.configureInteractionEventForDOMEvent(this.eventData, t, n);
                    r.data.originalEvent = t,
                    "mouse" === t.pointerType && (this.mouseOverRenderer = !0),
                    this.emit("pointerover", r),
                    "mouse" !== t.pointerType && "pen" !== t.pointerType || this.emit("mouseover", r)
                }
                ,
                t.prototype.getInteractionDataForPointerId = function(e) {
                    var t = e.pointerId
                      , n = void 0;
                    return t === h || "mouse" === e.pointerType ? n = this.mouse : this.activeInteractionData[t] ? n = this.activeInteractionData[t] : ((n = this.interactionDataPool.pop() || new s.default).identifier = t,
                    this.activeInteractionData[t] = n),
                    n._copyEvent(e),
                    n
                }
                ,
                t.prototype.releaseInteractionDataForPointerId = function(e) {
                    var t = this.activeInteractionData[e];
                    t && (delete this.activeInteractionData[e],
                    t._reset(),
                    this.interactionDataPool.push(t))
                }
                ,
                t.prototype.configureInteractionEventForDOMEvent = function(e, t, n) {
                    return e.data = n,
                    this.mapPositionToPoint(n.global, t.clientX, t.clientY),
                    navigator.isCocoonJS && "touch" === t.pointerType && (n.global.x = n.global.x / this.resolution,
                    n.global.y = n.global.y / this.resolution),
                    "touch" === t.pointerType && (t.globalX = n.global.x,
                    t.globalY = n.global.y),
                    n.originalEvent = t,
                    e._reset(),
                    e
                }
                ,
                t.prototype.normalizeToPointerData = function(e) {
                    var t = [];
                    if (this.supportsTouchEvents && e instanceof TouchEvent)
                        for (var n = 0, r = e.changedTouches.length; n < r; n++) {
                            var i = e.changedTouches[n];
                            void 0 === i.button && (i.button = e.touches.length ? 1 : 0),
                            void 0 === i.buttons && (i.buttons = e.touches.length ? 1 : 0),
                            void 0 === i.isPrimary && (i.isPrimary = 1 === e.touches.length && "touchstart" === e.type),
                            void 0 === i.width && (i.width = i.radiusX || 1),
                            void 0 === i.height && (i.height = i.radiusY || 1),
                            void 0 === i.tiltX && (i.tiltX = 0),
                            void 0 === i.tiltY && (i.tiltY = 0),
                            void 0 === i.pointerType && (i.pointerType = "touch"),
                            void 0 === i.pointerId && (i.pointerId = i.identifier || 0),
                            void 0 === i.pressure && (i.pressure = i.force || .5),
                            i.twist = 0,
                            i.tangentialPressure = 0,
                            void 0 === i.layerX && (i.layerX = i.offsetX = i.clientX),
                            void 0 === i.layerY && (i.layerY = i.offsetY = i.clientY),
                            i.isNormalized = !0,
                            t.push(i)
                        }
                    else
                        !(e instanceof MouseEvent) || this.supportsPointerEvents && e instanceof window.PointerEvent ? t.push(e) : (void 0 === e.isPrimary && (e.isPrimary = !0),
                        void 0 === e.width && (e.width = 1),
                        void 0 === e.height && (e.height = 1),
                        void 0 === e.tiltX && (e.tiltX = 0),
                        void 0 === e.tiltY && (e.tiltY = 0),
                        void 0 === e.pointerType && (e.pointerType = "mouse"),
                        void 0 === e.pointerId && (e.pointerId = h),
                        void 0 === e.pressure && (e.pressure = .5),
                        e.twist = 0,
                        e.tangentialPressure = 0,
                        e.isNormalized = !0,
                        t.push(e));
                    return t
                }
                ,
                t.prototype.destroy = function() {
                    this.removeEvents(),
                    this.removeAllListeners(),
                    this.renderer = null,
                    this.mouse = null,
                    this.eventData = null,
                    this.interactionDOMElement = null,
                    this.onPointerDown = null,
                    this.processPointerDown = null,
                    this.onPointerUp = null,
                    this.processPointerUp = null,
                    this.onPointerCancel = null,
                    this.processPointerCancel = null,
                    this.onPointerMove = null,
                    this.processPointerMove = null,
                    this.onPointerOut = null,
                    this.processPointerOverOut = null,
                    this.onPointerOver = null,
                    this._tempPoint = null
                }
                ,
                t
            }(u.default);
            n.default = p,
            o.WebGLRenderer.registerPlugin("interaction", p),
            o.CanvasRenderer.registerPlugin("interaction", p)
        }
        , {
            "../core": 65,
            "./InteractionData": 155,
            "./InteractionEvent": 156,
            "./InteractionTrackingData": 158,
            "./interactiveTarget": 160,
            eventemitter3: 3
        }],
        158: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this._pointerId = t,
                    this._flags = e.FLAGS.NONE
                }
                return e.prototype._doSet = function(e, t) {
                    this._flags = t ? this._flags | e : this._flags & ~e
                }
                ,
                r(e, [{
                    key: "pointerId",
                    get: function() {
                        return this._pointerId
                    }
                }, {
                    key: "flags",
                    get: function() {
                        return this._flags
                    },
                    set: function(e) {
                        this._flags = e
                    }
                }, {
                    key: "none",
                    get: function() {
                        return this._flags === this.constructor.FLAGS.NONE
                    }
                }, {
                    key: "over",
                    get: function() {
                        return 0 != (this._flags & this.constructor.FLAGS.OVER)
                    },
                    set: function(e) {
                        this._doSet(this.constructor.FLAGS.OVER, e)
                    }
                }, {
                    key: "rightDown",
                    get: function() {
                        return 0 != (this._flags & this.constructor.FLAGS.RIGHT_DOWN)
                    },
                    set: function(e) {
                        this._doSet(this.constructor.FLAGS.RIGHT_DOWN, e)
                    }
                }, {
                    key: "leftDown",
                    get: function() {
                        return 0 != (this._flags & this.constructor.FLAGS.LEFT_DOWN)
                    },
                    set: function(e) {
                        this._doSet(this.constructor.FLAGS.LEFT_DOWN, e)
                    }
                }]),
                e
            }();
            n.default = i,
            i.FLAGS = Object.freeze({
                NONE: 0,
                OVER: 1,
                LEFT_DOWN: 2,
                RIGHT_DOWN: 4
            })
        }
        , {}],
        159: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("./InteractionData");
            Object.defineProperty(n, "InteractionData", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./InteractionManager");
            Object.defineProperty(n, "InteractionManager", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            });
            var s = e("./interactiveTarget");
            Object.defineProperty(n, "interactiveTarget", {
                enumerable: !0,
                get: function() {
                    return r(s).default
                }
            });
            var a = e("./InteractionTrackingData");
            Object.defineProperty(n, "InteractionTrackingData", {
                enumerable: !0,
                get: function() {
                    return r(a).default
                }
            });
            var l = e("./InteractionEvent");
            Object.defineProperty(n, "InteractionEvent", {
                enumerable: !0,
                get: function() {
                    return r(l).default
                }
            })
        }
        , {
            "./InteractionData": 155,
            "./InteractionEvent": 156,
            "./InteractionManager": 157,
            "./InteractionTrackingData": 158,
            "./interactiveTarget": 160
        }],
        160: [function(e, t, n) {
            n.__esModule = !0,
            n.default = {
                interactive: !1,
                interactiveChildren: !0,
                hitArea: null,
                get buttonMode() {
                    return "pointer" === this.cursor
                },
                set buttonMode(e) {
                    e ? this.cursor = "pointer" : "pointer" === this.cursor && (this.cursor = null)
                },
                cursor: null,
                get trackedPointers() {
                    return void 0 === this._trackedPointers && (this._trackedPointers = {}),
                    this._trackedPointers
                },
                _trackedPointers: void 0
            }
        }
        , {}],
        161: [function(e, t, n) {
            function r(e, t) {
                e.bitmapFont = a.BitmapText.registerFont(e.data, t)
            }
            n.__esModule = !0,
            n.parse = r,
            n.default = function() {
                return function(e, t) {
                    if (e.data && e.type === s.Resource.TYPE.XML)
                        if (0 !== e.data.getElementsByTagName("page").length && 0 !== e.data.getElementsByTagName("info").length && null !== e.data.getElementsByTagName("info")[0].getAttribute("face")) {
                            var n = e.isDataUrl ? "" : i.dirname(e.url);
                            e.isDataUrl && ("." === n && (n = ""),
                            this.baseUrl && n && "/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (n += "/")),
                            (n = n.replace(this.baseUrl, "")) && "/" !== n.charAt(n.length - 1) && (n += "/");
                            var a = n + e.data.getElementsByTagName("page")[0].getAttribute("file");
                            if (o.utils.TextureCache[a])
                                r(e, o.utils.TextureCache[a]),
                                t();
                            else {
                                var l = {
                                    crossOrigin: e.crossOrigin,
                                    loadType: s.Resource.LOAD_TYPE.IMAGE,
                                    metadata: e.metadata.imageMetadata,
                                    parentResource: e
                                };
                                this.add(e.name + "_image", a, l, function(n) {
                                    r(e, n.texture),
                                    t()
                                })
                            }
                        } else
                            t();
                    else
                        t()
                }
            }
            ;
            var i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("path"))
              , o = e("../core")
              , s = e("resource-loader")
              , a = e("../extras")
        }
        , {
            "../core": 65,
            "../extras": 141,
            path: 23,
            "resource-loader": 36
        }],
        162: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0,
            n.shared = n.Resource = n.textureParser = n.getResourcePath = n.spritesheetParser = n.parseBitmapFontData = n.bitmapFontParser = n.Loader = void 0;
            var i = e("./bitmapFontParser");
            Object.defineProperty(n, "bitmapFontParser", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            }),
            Object.defineProperty(n, "parseBitmapFontData", {
                enumerable: !0,
                get: function() {
                    return i.parse
                }
            });
            var o = e("./spritesheetParser");
            Object.defineProperty(n, "spritesheetParser", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            }),
            Object.defineProperty(n, "getResourcePath", {
                enumerable: !0,
                get: function() {
                    return o.getResourcePath
                }
            });
            var s = e("./textureParser");
            Object.defineProperty(n, "textureParser", {
                enumerable: !0,
                get: function() {
                    return r(s).default
                }
            });
            var a = e("resource-loader");
            Object.defineProperty(n, "Resource", {
                enumerable: !0,
                get: function() {
                    return a.Resource
                }
            });
            var l = r(e("../core/Application"))
              , u = r(e("./loader"));
            n.Loader = u.default;
            var c = new u.default;
            c.destroy = function() {}
            ,
            n.shared = c;
            var h = l.default.prototype;
            h._loader = null,
            Object.defineProperty(h, "loader", {
                get: function() {
                    if (!this._loader) {
                        var e = this._options.sharedLoader;
                        this._loader = e ? c : new u.default
                    }
                    return this._loader
                }
            }),
            h._parentDestroy = h.destroy,
            h.destroy = function(e) {
                this._loader && (this._loader.destroy(),
                this._loader = null),
                this._parentDestroy(e)
            }
        }
        , {
            "../core/Application": 43,
            "./bitmapFontParser": 161,
            "./loader": 163,
            "./spritesheetParser": 164,
            "./textureParser": 165,
            "resource-loader": 36
        }],
        163: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("resource-loader"))
              , o = e("resource-loader/lib/middlewares/parsing/blob")
              , s = r(e("eventemitter3"))
              , a = r(e("./textureParser"))
              , l = r(e("./spritesheetParser"))
              , u = r(e("./bitmapFontParser"))
              , c = function(e) {
                function t(n, r) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n, r));
                    s.default.call(i);
                    for (var o = 0; o < t._pixiMiddleware.length; ++o)
                        i.use(t._pixiMiddleware[o]());
                    return i.onStart.add(function(e) {
                        return i.emit("start", e)
                    }),
                    i.onProgress.add(function(e, t) {
                        return i.emit("progress", e, t)
                    }),
                    i.onError.add(function(e, t, n) {
                        return i.emit("error", e, t, n)
                    }),
                    i.onLoad.add(function(e, t) {
                        return i.emit("load", e, t)
                    }),
                    i.onComplete.add(function(e, t) {
                        return i.emit("complete", e, t)
                    }),
                    i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.addPixiMiddleware = function(e) {
                    t._pixiMiddleware.push(e)
                }
                ,
                t.prototype.destroy = function() {
                    this.removeAllListeners(),
                    this.reset()
                }
                ,
                t
            }(i.default);
            n.default = c;
            for (var h in s.default.prototype)
                c.prototype[h] = s.default.prototype[h];
            c._pixiMiddleware = [o.blobMiddlewareFactory, a.default, l.default, u.default];
            var d = i.default.Resource;
            d.setExtensionXhrType("fnt", d.XHR_RESPONSE_TYPE.DOCUMENT)
        }
        , {
            "./bitmapFontParser": 161,
            "./spritesheetParser": 164,
            "./textureParser": 165,
            eventemitter3: 3,
            "resource-loader": 36,
            "resource-loader/lib/middlewares/parsing/blob": 37
        }],
        164: [function(e, t, n) {
            function r(e, t) {
                return e.isDataUrl ? e.data.meta.image : o.default.resolve(e.url.replace(t, ""), e.data.meta.image)
            }
            n.__esModule = !0,
            n.default = function() {
                return function(e, t) {
                    var n = e.name + "_image";
                    if (e.data && e.type === i.Resource.TYPE.JSON && e.data.frames && !this.resources[n]) {
                        var o = {
                            crossOrigin: e.crossOrigin,
                            loadType: i.Resource.LOAD_TYPE.IMAGE,
                            metadata: e.metadata.imageMetadata,
                            parentResource: e
                        }
                          , a = r(e, this.baseUrl);
                        this.add(n, a, o, function(n) {
                            var r = new s.Spritesheet(n.texture.baseTexture,e.data,e.url);
                            r.parse(function() {
                                e.spritesheet = r,
                                e.textures = r.textures,
                                t()
                            })
                        })
                    } else
                        t()
                }
            }
            ,
            n.getResourcePath = r;
            var i = e("resource-loader")
              , o = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("url"))
              , s = e("../core")
        }
        , {
            "../core": 65,
            "resource-loader": 36,
            url: 29
        }],
        165: [function(e, t, n) {
            n.__esModule = !0,
            n.default = function() {
                return function(e, t) {
                    e.data && e.type === r.Resource.TYPE.IMAGE && (e.texture = i.default.fromLoader(e.data, e.url, e.name)),
                    t()
                }
            }
            ;
            var r = e("resource-loader")
              , i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../core/textures/Texture"))
        }
        , {
            "../core/textures/Texture": 115,
            "resource-loader": 36
        }],
        166: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , o = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../extras/TextureTransform"))
              , s = new i.Point
              , a = new i.Polygon
              , l = function(e) {
                function t(n, r, s, a, l) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var u = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return u._texture = n,
                    u.uvs = s || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                    u.vertices = r || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]),
                    u.indices = a || new Uint16Array([0, 1, 3, 2]),
                    u.dirty = 0,
                    u.indexDirty = 0,
                    u.blendMode = i.BLEND_MODES.NORMAL,
                    u.canvasPadding = 0,
                    u.drawMode = l || t.DRAW_MODES.TRIANGLE_MESH,
                    u.shader = null,
                    u.tintRgb = new Float32Array([1, 1, 1]),
                    u._glDatas = {},
                    u._uvTransform = new o.default(n),
                    u.uploadUvTransform = !1,
                    u.pluginName = "mesh",
                    u
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype._renderWebGL = function(e) {
                    this.refresh(),
                    e.setObjectRenderer(e.plugins[this.pluginName]),
                    e.plugins[this.pluginName].render(this)
                }
                ,
                t.prototype._renderCanvas = function(e) {
                    this.refresh(),
                    e.plugins[this.pluginName].render(this)
                }
                ,
                t.prototype._onTextureUpdate = function() {
                    this._uvTransform.texture = this._texture,
                    this.refresh()
                }
                ,
                t.prototype.multiplyUvs = function() {
                    this.uploadUvTransform || this._uvTransform.multiplyUvs(this.uvs)
                }
                ,
                t.prototype.refresh = function(e) {
                    this._uvTransform.update(e) && this._refresh()
                }
                ,
                t.prototype._refresh = function() {}
                ,
                t.prototype._calculateBounds = function() {
                    this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length)
                }
                ,
                t.prototype.containsPoint = function(e) {
                    if (!this.getBounds().contains(e.x, e.y))
                        return !1;
                    this.worldTransform.applyInverse(e, s);
                    for (var n = this.vertices, r = a.points, i = this.indices, o = this.indices.length, l = this.drawMode === t.DRAW_MODES.TRIANGLES ? 3 : 1, u = 0; u + 2 < o; u += l) {
                        var c = 2 * i[u]
                          , h = 2 * i[u + 1]
                          , d = 2 * i[u + 2];
                        if (r[0] = n[c],
                        r[1] = n[c + 1],
                        r[2] = n[h],
                        r[3] = n[h + 1],
                        r[4] = n[d],
                        r[5] = n[d + 1],
                        a.contains(s.x, s.y))
                            return !0
                    }
                    return !1
                }
                ,
                r(t, [{
                    key: "texture",
                    get: function() {
                        return this._texture
                    },
                    set: function(e) {
                        this._texture !== e && (this._texture = e,
                        e && (e.baseTexture.hasLoaded ? this._onTextureUpdate() : e.once("update", this._onTextureUpdate, this)))
                    }
                }, {
                    key: "tint",
                    get: function() {
                        return i.utils.rgb2hex(this.tintRgb)
                    },
                    set: function(e) {
                        this.tintRgb = i.utils.hex2rgb(e, this.tintRgb)
                    }
                }]),
                t
            }(i.Container);
            n.default = l,
            l.DRAW_MODES = {
                TRIANGLE_MESH: 0,
                TRIANGLES: 1
            }
        }
        , {
            "../core": 65,
            "../extras/TextureTransform": 136
        }],
        167: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = 10
              , o = function(e) {
                function t(n, r, o, s, a) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var l = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n, 4, 4));
                    return l._origWidth = n.orig.width,
                    l._origHeight = n.orig.height,
                    l._width = l._origWidth,
                    l._height = l._origHeight,
                    l.leftWidth = void 0 !== r ? r : i,
                    l.rightWidth = void 0 !== s ? s : i,
                    l.topHeight = void 0 !== o ? o : i,
                    l.bottomHeight = void 0 !== a ? a : i,
                    l.refresh(!0),
                    l
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.updateHorizontalVertices = function() {
                    var e = this.vertices;
                    e[9] = e[11] = e[13] = e[15] = this._topHeight,
                    e[17] = e[19] = e[21] = e[23] = this._height - this._bottomHeight,
                    e[25] = e[27] = e[29] = e[31] = this._height
                }
                ,
                t.prototype.updateVerticalVertices = function() {
                    var e = this.vertices;
                    e[2] = e[10] = e[18] = e[26] = this._leftWidth,
                    e[4] = e[12] = e[20] = e[28] = this._width - this._rightWidth,
                    e[6] = e[14] = e[22] = e[30] = this._width
                }
                ,
                t.prototype._renderCanvas = function(e) {
                    var t = e.context;
                    t.globalAlpha = this.worldAlpha;
                    var n = this.worldTransform
                      , r = e.resolution;
                    e.roundPixels ? t.setTransform(n.a * r, n.b * r, n.c * r, n.d * r, n.tx * r | 0, n.ty * r | 0) : t.setTransform(n.a * r, n.b * r, n.c * r, n.d * r, n.tx * r, n.ty * r);
                    var i = this._texture.baseTexture
                      , o = i.source
                      , s = i.width
                      , a = i.height;
                    this.drawSegment(t, o, s, a, 0, 1, 10, 11),
                    this.drawSegment(t, o, s, a, 2, 3, 12, 13),
                    this.drawSegment(t, o, s, a, 4, 5, 14, 15),
                    this.drawSegment(t, o, s, a, 8, 9, 18, 19),
                    this.drawSegment(t, o, s, a, 10, 11, 20, 21),
                    this.drawSegment(t, o, s, a, 12, 13, 22, 23),
                    this.drawSegment(t, o, s, a, 16, 17, 26, 27),
                    this.drawSegment(t, o, s, a, 18, 19, 28, 29),
                    this.drawSegment(t, o, s, a, 20, 21, 30, 31)
                }
                ,
                t.prototype.drawSegment = function(e, t, n, r, i, o, s, a) {
                    var l = this.uvs
                      , u = this.vertices
                      , c = (l[s] - l[i]) * n
                      , h = (l[a] - l[o]) * r
                      , d = u[s] - u[i]
                      , p = u[a] - u[o];
                    c < 1 && (c = 1),
                    h < 1 && (h = 1),
                    d < 1 && (d = 1),
                    p < 1 && (p = 1),
                    e.drawImage(t, l[i] * n, l[o] * r, c, h, u[i], u[o], d, p)
                }
                ,
                t.prototype._refresh = function() {
                    e.prototype._refresh.call(this);
                    var t = this.uvs
                      , n = this._texture;
                    this._origWidth = n.orig.width,
                    this._origHeight = n.orig.height;
                    var r = 1 / this._origWidth
                      , i = 1 / this._origHeight;
                    t[0] = t[8] = t[16] = t[24] = 0,
                    t[1] = t[3] = t[5] = t[7] = 0,
                    t[6] = t[14] = t[22] = t[30] = 1,
                    t[25] = t[27] = t[29] = t[31] = 1,
                    t[2] = t[10] = t[18] = t[26] = r * this._leftWidth,
                    t[4] = t[12] = t[20] = t[28] = 1 - r * this._rightWidth,
                    t[9] = t[11] = t[13] = t[15] = i * this._topHeight,
                    t[17] = t[19] = t[21] = t[23] = 1 - i * this._bottomHeight,
                    this.updateHorizontalVertices(),
                    this.updateVerticalVertices(),
                    this.dirty++,
                    this.multiplyUvs()
                }
                ,
                r(t, [{
                    key: "width",
                    get: function() {
                        return this._width
                    },
                    set: function(e) {
                        this._width = e,
                        this._refresh()
                    }
                }, {
                    key: "height",
                    get: function() {
                        return this._height
                    },
                    set: function(e) {
                        this._height = e,
                        this._refresh()
                    }
                }, {
                    key: "leftWidth",
                    get: function() {
                        return this._leftWidth
                    },
                    set: function(e) {
                        this._leftWidth = e,
                        this._refresh()
                    }
                }, {
                    key: "rightWidth",
                    get: function() {
                        return this._rightWidth
                    },
                    set: function(e) {
                        this._rightWidth = e,
                        this._refresh()
                    }
                }, {
                    key: "topHeight",
                    get: function() {
                        return this._topHeight
                    },
                    set: function(e) {
                        this._topHeight = e,
                        this._refresh()
                    }
                }, {
                    key: "bottomHeight",
                    get: function() {
                        return this._bottomHeight
                    },
                    set: function(e) {
                        this._bottomHeight = e,
                        this._refresh()
                    }
                }]),
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./Plane")).default);
            n.default = o
        }
        , {
            "./Plane": 168
        }],
        168: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./Mesh"))
              , i = function(e) {
                function t(n, i, o) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var s = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return s._ready = !0,
                    s.verticesX = i || 10,
                    s.verticesY = o || 10,
                    s.drawMode = r.default.DRAW_MODES.TRIANGLES,
                    s.refresh(),
                    s
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype._refresh = function() {
                    for (var e = this._texture, t = this.verticesX * this.verticesY, n = [], r = [], i = [], o = this.verticesX - 1, s = this.verticesY - 1, a = e.width / o, l = e.height / s, u = 0; u < t; u++) {
                        var c = u % this.verticesX
                          , h = u / this.verticesX | 0;
                        n.push(c * a, h * l),
                        r.push(c / o, h / s)
                    }
                    for (var d = o * s, p = 0; p < d; p++) {
                        var f = p % o
                          , g = p / o | 0
                          , m = g * this.verticesX + f
                          , v = g * this.verticesX + f + 1
                          , y = (g + 1) * this.verticesX + f
                          , b = (g + 1) * this.verticesX + f + 1;
                        i.push(m, v, y),
                        i.push(v, b, y)
                    }
                    this.vertices = new Float32Array(n),
                    this.uvs = new Float32Array(r),
                    this.colors = new Float32Array([]),
                    this.indices = new Uint16Array(i),
                    this.indexDirty++,
                    this.multiplyUvs()
                }
                ,
                t.prototype._onTextureUpdate = function() {
                    r.default.prototype._onTextureUpdate.call(this),
                    this._ready && this.refresh()
                }
                ,
                t
            }(r.default);
            n.default = i
        }
        , {
            "./Mesh": 166
        }],
        169: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                function t(n, r) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return i.points = r,
                    i.vertices = new Float32Array(4 * r.length),
                    i.uvs = new Float32Array(4 * r.length),
                    i.colors = new Float32Array(2 * r.length),
                    i.indices = new Uint16Array(2 * r.length),
                    i.autoUpdate = !0,
                    i.refresh(),
                    i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype._refresh = function() {
                    var e = this.points;
                    if (!(e.length < 1) && this._texture._uvs) {
                        this.vertices.length / 4 !== e.length && (this.vertices = new Float32Array(4 * e.length),
                        this.uvs = new Float32Array(4 * e.length),
                        this.colors = new Float32Array(2 * e.length),
                        this.indices = new Uint16Array(2 * e.length));
                        var t = this.uvs
                          , n = this.indices
                          , r = this.colors;
                        t[0] = 0,
                        t[1] = 0,
                        t[2] = 0,
                        t[3] = 1,
                        r[0] = 1,
                        r[1] = 1,
                        n[0] = 0,
                        n[1] = 1;
                        for (var i = e.length, o = 1; o < i; o++) {
                            var s = 4 * o
                              , a = o / (i - 1);
                            t[s] = a,
                            t[s + 1] = 0,
                            t[s + 2] = a,
                            t[s + 3] = 1,
                            r[s = 2 * o] = 1,
                            r[s + 1] = 1,
                            n[s = 2 * o] = s,
                            n[s + 1] = s + 1
                        }
                        this.dirty++,
                        this.indexDirty++,
                        this.multiplyUvs(),
                        this.refreshVertices()
                    }
                }
                ,
                t.prototype.refreshVertices = function() {
                    var e = this.points;
                    if (!(e.length < 1))
                        for (var t = e[0], n = void 0, r = 0, i = 0, o = this.vertices, s = e.length, a = 0; a < s; a++) {
                            var l = e[a]
                              , u = 4 * a;
                            i = -((n = a < e.length - 1 ? e[a + 1] : l).x - t.x),
                            r = n.y - t.y;
                            var c = 10 * (1 - a / (s - 1));
                            c > 1 && (c = 1);
                            var h = Math.sqrt(r * r + i * i)
                              , d = this._texture.height / 2;
                            r /= h,
                            i /= h,
                            r *= d,
                            i *= d,
                            o[u] = l.x + r,
                            o[u + 1] = l.y + i,
                            o[u + 2] = l.x - r,
                            o[u + 3] = l.y - i,
                            t = l
                        }
                }
                ,
                t.prototype.updateTransform = function() {
                    this.autoUpdate && this.refreshVertices(),
                    this.containerUpdateTransform()
                }
                ,
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./Mesh")).default);
            n.default = r
        }
        , {
            "./Mesh": 166
        }],
        170: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../Mesh"))
              , o = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.renderer = t
                }
                return e.prototype.render = function(e) {
                    var t = this.renderer
                      , n = t.context
                      , r = e.worldTransform
                      , o = t.resolution;
                    t.roundPixels ? n.setTransform(r.a * o, r.b * o, r.c * o, r.d * o, r.tx * o | 0, r.ty * o | 0) : n.setTransform(r.a * o, r.b * o, r.c * o, r.d * o, r.tx * o, r.ty * o),
                    t.setBlendMode(e.blendMode),
                    e.drawMode === i.default.DRAW_MODES.TRIANGLE_MESH ? this._renderTriangleMesh(e) : this._renderTriangles(e)
                }
                ,
                e.prototype._renderTriangleMesh = function(e) {
                    for (var t = e.vertices.length / 2, n = 0; n < t - 2; n++) {
                        var r = 2 * n;
                        this._renderDrawTriangle(e, r, r + 2, r + 4)
                    }
                }
                ,
                e.prototype._renderTriangles = function(e) {
                    for (var t = e.indices, n = t.length, r = 0; r < n; r += 3) {
                        var i = 2 * t[r]
                          , o = 2 * t[r + 1]
                          , s = 2 * t[r + 2];
                        this._renderDrawTriangle(e, i, o, s)
                    }
                }
                ,
                e.prototype._renderDrawTriangle = function(e, t, n, r) {
                    var i = this.renderer.context
                      , o = e.uvs
                      , s = e.vertices
                      , a = e._texture;
                    if (a.valid) {
                        var l = a.baseTexture
                          , u = l.source
                          , c = l.width
                          , h = l.height
                          , d = void 0
                          , p = void 0
                          , f = void 0
                          , g = void 0
                          , m = void 0
                          , v = void 0;
                        if (e.uploadUvTransform) {
                            var y = e._uvTransform.mapCoord;
                            d = (o[t] * y.a + o[t + 1] * y.c + y.tx) * l.width,
                            p = (o[n] * y.a + o[n + 1] * y.c + y.tx) * l.width,
                            f = (o[r] * y.a + o[r + 1] * y.c + y.tx) * l.width,
                            g = (o[t] * y.b + o[t + 1] * y.d + y.ty) * l.height,
                            m = (o[n] * y.b + o[n + 1] * y.d + y.ty) * l.height,
                            v = (o[r] * y.b + o[r + 1] * y.d + y.ty) * l.height
                        } else
                            d = o[t] * l.width,
                            p = o[n] * l.width,
                            f = o[r] * l.width,
                            g = o[t + 1] * l.height,
                            m = o[n + 1] * l.height,
                            v = o[r + 1] * l.height;
                        var b = s[t]
                          , _ = s[n]
                          , x = s[r]
                          , w = s[t + 1]
                          , T = s[n + 1]
                          , E = s[r + 1];
                        if (e.canvasPadding > 0) {
                            var S = e.canvasPadding / e.worldTransform.a
                              , I = e.canvasPadding / e.worldTransform.d
                              , P = (b + _ + x) / 3
                              , M = (w + T + E) / 3
                              , A = b - P
                              , O = w - M
                              , C = Math.sqrt(A * A + O * O);
                            b = P + A / C * (C + S),
                            w = M + O / C * (C + I),
                            O = T - M,
                            _ = P + (A = _ - P) / (C = Math.sqrt(A * A + O * O)) * (C + S),
                            T = M + O / C * (C + I),
                            O = E - M,
                            x = P + (A = x - P) / (C = Math.sqrt(A * A + O * O)) * (C + S),
                            E = M + O / C * (C + I)
                        }
                        i.save(),
                        i.beginPath(),
                        i.moveTo(b, w),
                        i.lineTo(_, T),
                        i.lineTo(x, E),
                        i.closePath(),
                        i.clip();
                        var R = d * m + g * f + p * v - m * f - g * p - d * v
                          , D = b * m + g * x + _ * v - m * x - g * _ - b * v
                          , k = d * _ + b * f + p * x - _ * f - b * p - d * x
                          , L = d * m * x + g * _ * f + b * p * v - b * m * f - g * p * x - d * _ * v
                          , N = w * m + g * E + T * v - m * E - g * T - w * v
                          , U = d * T + w * f + p * E - T * f - w * p - d * E
                          , F = d * m * E + g * T * f + w * p * v - w * m * f - g * p * E - d * T * v;
                        i.transform(D / R, N / R, k / R, U / R, L / R, F / R),
                        i.drawImage(u, 0, 0, c * l.resolution, h * l.resolution, 0, 0, c, h),
                        i.restore(),
                        this.renderer.invalidateBlendMode()
                    }
                }
                ,
                e.prototype.renderMeshFlat = function(e) {
                    var t = this.renderer.context
                      , n = e.vertices
                      , r = n.length / 2;
                    t.beginPath();
                    for (var i = 1; i < r - 2; ++i) {
                        var o = 2 * i
                          , s = n[o]
                          , a = n[o + 1]
                          , l = n[o + 2]
                          , u = n[o + 3]
                          , c = n[o + 4]
                          , h = n[o + 5];
                        t.moveTo(s, a),
                        t.lineTo(l, u),
                        t.lineTo(c, h)
                    }
                    t.fillStyle = "#FF0000",
                    t.fill(),
                    t.closePath()
                }
                ,
                e.prototype.destroy = function() {
                    this.renderer = null
                }
                ,
                e
            }();
            n.default = o,
            r.CanvasRenderer.registerPlugin("mesh", o)
        }
        , {
            "../../core": 65,
            "../Mesh": 166
        }],
        171: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("./Mesh");
            Object.defineProperty(n, "Mesh", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./webgl/MeshRenderer");
            Object.defineProperty(n, "MeshRenderer", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            });
            var s = e("./canvas/CanvasMeshRenderer");
            Object.defineProperty(n, "CanvasMeshRenderer", {
                enumerable: !0,
                get: function() {
                    return r(s).default
                }
            });
            var a = e("./Plane");
            Object.defineProperty(n, "Plane", {
                enumerable: !0,
                get: function() {
                    return r(a).default
                }
            });
            var l = e("./NineSlicePlane");
            Object.defineProperty(n, "NineSlicePlane", {
                enumerable: !0,
                get: function() {
                    return r(l).default
                }
            });
            var u = e("./Rope");
            Object.defineProperty(n, "Rope", {
                enumerable: !0,
                get: function() {
                    return r(u).default
                }
            })
        }
        , {
            "./Mesh": 166,
            "./NineSlicePlane": 167,
            "./Plane": 168,
            "./Rope": 169,
            "./canvas/CanvasMeshRenderer": 170,
            "./webgl/MeshRenderer": 172
        }],
        172: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , o = r(e("pixi-gl-core"))
              , s = r(e("../Mesh"))
              , a = (e("path"),
            i.Matrix.IDENTITY)
              , l = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.shader = null,
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.onContextChange = function() {
                    var e = this.renderer.gl;
                    this.shader = new i.Shader(e,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n","varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n")
                }
                ,
                t.prototype.render = function(e) {
                    var t = this.renderer
                      , n = t.gl
                      , r = e._texture;
                    if (r.valid) {
                        var l = e._glDatas[t.CONTEXT_UID];
                        l || (t.bindVao(null),
                        (l = {
                            shader: this.shader,
                            vertexBuffer: o.default.GLBuffer.createVertexBuffer(n, e.vertices, n.STREAM_DRAW),
                            uvBuffer: o.default.GLBuffer.createVertexBuffer(n, e.uvs, n.STREAM_DRAW),
                            indexBuffer: o.default.GLBuffer.createIndexBuffer(n, e.indices, n.STATIC_DRAW),
                            vao: null,
                            dirty: e.dirty,
                            indexDirty: e.indexDirty
                        }).vao = new o.default.VertexArrayObject(n).addIndex(l.indexBuffer).addAttribute(l.vertexBuffer, l.shader.attributes.aVertexPosition, n.FLOAT, !1, 8, 0).addAttribute(l.uvBuffer, l.shader.attributes.aTextureCoord, n.FLOAT, !1, 8, 0),
                        e._glDatas[t.CONTEXT_UID] = l),
                        t.bindVao(l.vao),
                        e.dirty !== l.dirty && (l.dirty = e.dirty,
                        l.uvBuffer.upload(e.uvs)),
                        e.indexDirty !== l.indexDirty && (l.indexDirty = e.indexDirty,
                        l.indexBuffer.upload(e.indices)),
                        l.vertexBuffer.upload(e.vertices),
                        t.bindShader(l.shader),
                        l.shader.uniforms.uSampler = t.bindTexture(r),
                        t.state.setBlendMode(i.utils.correctBlendMode(e.blendMode, r.baseTexture.premultipliedAlpha)),
                        l.shader.uniforms.uTransform && (e.uploadUvTransform ? l.shader.uniforms.uTransform = e._uvTransform.mapCoord.toArray(!0) : l.shader.uniforms.uTransform = a.toArray(!0)),
                        l.shader.uniforms.translationMatrix = e.worldTransform.toArray(!0),
                        l.shader.uniforms.uColor = i.utils.premultiplyRgba(e.tintRgb, e.worldAlpha, l.shader.uniforms.uColor, r.baseTexture.premultipliedAlpha);
                        var u = e.drawMode === s.default.DRAW_MODES.TRIANGLE_MESH ? n.TRIANGLE_STRIP : n.TRIANGLES;
                        l.vao.draw(u, e.indices.length, 0)
                    }
                }
                ,
                t
            }(i.ObjectRenderer);
            n.default = l,
            i.WebGLRenderer.registerPlugin("mesh", l)
        }
        , {
            "../../core": 65,
            "../Mesh": 166,
            path: 23,
            "pixi-gl-core": 12
        }],
        173: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , o = e("../core/utils")
              , s = function(e) {
                function t() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1500
                      , r = arguments[1]
                      , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 16384
                      , s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var a = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this));
                    return o > 16384 && (o = 16384),
                    o > n && (o = n),
                    a._properties = [!1, !0, !1, !1, !1],
                    a._maxSize = n,
                    a._batchSize = o,
                    a._glBuffers = {},
                    a._bufferToUpdate = 0,
                    a.interactiveChildren = !1,
                    a.blendMode = i.BLEND_MODES.NORMAL,
                    a.autoResize = s,
                    a.roundPixels = !0,
                    a.baseTexture = null,
                    a.setProperties(r),
                    a._tint = 0,
                    a.tintRgb = new Float32Array(4),
                    a.tint = 16777215,
                    a
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.setProperties = function(e) {
                    e && (this._properties[0] = "scale"in e ? !!e.scale : this._properties[0],
                    this._properties[1] = "position"in e ? !!e.position : this._properties[1],
                    this._properties[2] = "rotation"in e ? !!e.rotation : this._properties[2],
                    this._properties[3] = "uvs"in e ? !!e.uvs : this._properties[3],
                    this._properties[4] = "alpha"in e || "tint"in e ? !!e.alpha || !!e.tint : this._properties[4])
                }
                ,
                t.prototype.updateTransform = function() {
                    this.displayObjectUpdateTransform()
                }
                ,
                t.prototype.renderWebGL = function(e) {
                    var t = this;
                    this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture,
                    this.baseTexture.hasLoaded || this.baseTexture.once("update", function() {
                        return t.onChildrenChange(0)
                    })),
                    e.setObjectRenderer(e.plugins.particle),
                    e.plugins.particle.render(this))
                }
                ,
                t.prototype.onChildrenChange = function(e) {
                    var t = Math.floor(e / this._batchSize);
                    t < this._bufferToUpdate && (this._bufferToUpdate = t)
                }
                ,
                t.prototype.renderCanvas = function(e) {
                    if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
                        var t = e.context
                          , n = this.worldTransform
                          , r = !0
                          , i = 0
                          , o = 0
                          , s = 0
                          , a = 0;
                        e.setBlendMode(this.blendMode),
                        t.globalAlpha = this.worldAlpha,
                        this.displayObjectUpdateTransform();
                        for (var l = 0; l < this.children.length; ++l) {
                            var u = this.children[l];
                            if (u.visible) {
                                var c = u._texture.frame;
                                if (t.globalAlpha = this.worldAlpha * u.alpha,
                                u.rotation % (2 * Math.PI) == 0)
                                    r && (t.setTransform(n.a, n.b, n.c, n.d, n.tx * e.resolution, n.ty * e.resolution),
                                    r = !1),
                                    i = u.anchor.x * (-c.width * u.scale.x) + u.position.x + .5,
                                    o = u.anchor.y * (-c.height * u.scale.y) + u.position.y + .5,
                                    s = c.width * u.scale.x,
                                    a = c.height * u.scale.y;
                                else {
                                    r || (r = !0),
                                    u.displayObjectUpdateTransform();
                                    var h = u.worldTransform;
                                    e.roundPixels ? t.setTransform(h.a, h.b, h.c, h.d, h.tx * e.resolution | 0, h.ty * e.resolution | 0) : t.setTransform(h.a, h.b, h.c, h.d, h.tx * e.resolution, h.ty * e.resolution),
                                    i = u.anchor.x * -c.width + .5,
                                    o = u.anchor.y * -c.height + .5,
                                    s = c.width,
                                    a = c.height
                                }
                                var d = u._texture.baseTexture.resolution;
                                t.drawImage(u._texture.baseTexture.source, c.x * d, c.y * d, c.width * d, c.height * d, i * e.resolution, o * e.resolution, s * e.resolution, a * e.resolution)
                            }
                        }
                    }
                }
                ,
                t.prototype.destroy = function(t) {
                    if (e.prototype.destroy.call(this, t),
                    this._buffers)
                        for (var n = 0; n < this._buffers.length; ++n)
                            this._buffers[n].destroy();
                    this._properties = null,
                    this._buffers = null
                }
                ,
                r(t, [{
                    key: "tint",
                    get: function() {
                        return this._tint
                    },
                    set: function(e) {
                        this._tint = e,
                        (0,
                        o.hex2rgb)(e, this.tintRgb)
                    }
                }]),
                t
            }(i.Container);
            n.default = s
        }
        , {
            "../core": 65,
            "../core/utils": 124
        }],
        174: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("./ParticleContainer");
            Object.defineProperty(n, "ParticleContainer", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./webgl/ParticleRenderer");
            Object.defineProperty(n, "ParticleRenderer", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            })
        }
        , {
            "./ParticleContainer": 173,
            "./webgl/ParticleRenderer": 176
        }],
        175: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = r(e("pixi-gl-core"))
              , o = r(e("../../core/utils/createIndicesForQuads"))
              , s = function() {
                function e(t, n, r, i) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.gl = t,
                    this.size = i,
                    this.dynamicProperties = [],
                    this.staticProperties = [];
                    for (var o = 0; o < n.length; ++o) {
                        var s = n[o];
                        s = {
                            attribute: s.attribute,
                            size: s.size,
                            uploadFunction: s.uploadFunction,
                            unsignedByte: s.unsignedByte,
                            offset: s.offset
                        },
                        r[o] ? this.dynamicProperties.push(s) : this.staticProperties.push(s)
                    }
                    this.staticStride = 0,
                    this.staticBuffer = null,
                    this.staticData = null,
                    this.staticDataUint32 = null,
                    this.dynamicStride = 0,
                    this.dynamicBuffer = null,
                    this.dynamicData = null,
                    this.dynamicDataUint32 = null,
                    this.initBuffers()
                }
                return e.prototype.initBuffers = function() {
                    var e = this.gl
                      , t = 0;
                    this.indices = (0,
                    o.default)(this.size),
                    this.indexBuffer = i.default.GLBuffer.createIndexBuffer(e, this.indices, e.STATIC_DRAW),
                    this.dynamicStride = 0;
                    for (var n = 0; n < this.dynamicProperties.length; ++n) {
                        var r = this.dynamicProperties[n];
                        r.offset = t,
                        t += r.size,
                        this.dynamicStride += r.size
                    }
                    var s = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
                    this.dynamicData = new Float32Array(s),
                    this.dynamicDataUint32 = new Uint32Array(s),
                    this.dynamicBuffer = i.default.GLBuffer.createVertexBuffer(e, s, e.STREAM_DRAW);
                    var a = 0;
                    this.staticStride = 0;
                    for (var l = 0; l < this.staticProperties.length; ++l) {
                        var u = this.staticProperties[l];
                        u.offset = a,
                        a += u.size,
                        this.staticStride += u.size
                    }
                    var c = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
                    this.staticData = new Float32Array(c),
                    this.staticDataUint32 = new Uint32Array(c),
                    this.staticBuffer = i.default.GLBuffer.createVertexBuffer(e, c, e.STATIC_DRAW),
                    this.vao = new i.default.VertexArrayObject(e).addIndex(this.indexBuffer);
                    for (var h = 0; h < this.dynamicProperties.length; ++h) {
                        var d = this.dynamicProperties[h];
                        d.unsignedByte ? this.vao.addAttribute(this.dynamicBuffer, d.attribute, e.UNSIGNED_BYTE, !0, 4 * this.dynamicStride, 4 * d.offset) : this.vao.addAttribute(this.dynamicBuffer, d.attribute, e.FLOAT, !1, 4 * this.dynamicStride, 4 * d.offset)
                    }
                    for (var p = 0; p < this.staticProperties.length; ++p) {
                        var f = this.staticProperties[p];
                        f.unsignedByte ? this.vao.addAttribute(this.staticBuffer, f.attribute, e.UNSIGNED_BYTE, !0, 4 * this.staticStride, 4 * f.offset) : this.vao.addAttribute(this.staticBuffer, f.attribute, e.FLOAT, !1, 4 * this.staticStride, 4 * f.offset)
                    }
                }
                ,
                e.prototype.uploadDynamic = function(e, t, n) {
                    for (var r = 0; r < this.dynamicProperties.length; r++) {
                        var i = this.dynamicProperties[r];
                        i.uploadFunction(e, t, n, i.unsignedByte ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, i.offset)
                    }
                    this.dynamicBuffer.upload()
                }
                ,
                e.prototype.uploadStatic = function(e, t, n) {
                    for (var r = 0; r < this.staticProperties.length; r++) {
                        var i = this.staticProperties[r];
                        i.uploadFunction(e, t, n, i.unsignedByte ? this.staticDataUint32 : this.staticData, this.staticStride, i.offset)
                    }
                    this.staticBuffer.upload()
                }
                ,
                e.prototype.destroy = function() {
                    this.dynamicProperties = null,
                    this.dynamicData = null,
                    this.dynamicBuffer.destroy(),
                    this.staticProperties = null,
                    this.staticData = null,
                    this.staticBuffer.destroy()
                }
                ,
                e
            }();
            n.default = s
        }
        , {
            "../../core/utils/createIndicesForQuads": 122,
            "pixi-gl-core": 12
        }],
        176: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , o = r(e("./ParticleShader"))
              , s = r(e("./ParticleBuffer"))
              , a = e("../../core/utils")
              , l = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var r = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return r.shader = null,
                    r.indexBuffer = null,
                    r.properties = null,
                    r.tempMatrix = new i.Matrix,
                    r.CONTEXT_UID = 0,
                    r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.onContextChange = function() {
                    var e = this.renderer.gl;
                    this.CONTEXT_UID = this.renderer.CONTEXT_UID,
                    this.shader = new o.default(e),
                    this.properties = [{
                        attribute: this.shader.attributes.aVertexPosition,
                        size: 2,
                        uploadFunction: this.uploadVertices,
                        offset: 0
                    }, {
                        attribute: this.shader.attributes.aPositionCoord,
                        size: 2,
                        uploadFunction: this.uploadPosition,
                        offset: 0
                    }, {
                        attribute: this.shader.attributes.aRotation,
                        size: 1,
                        uploadFunction: this.uploadRotation,
                        offset: 0
                    }, {
                        attribute: this.shader.attributes.aTextureCoord,
                        size: 2,
                        uploadFunction: this.uploadUvs,
                        offset: 0
                    }, {
                        attribute: this.shader.attributes.aColor,
                        size: 1,
                        unsignedByte: !0,
                        uploadFunction: this.uploadTint,
                        offset: 0
                    }]
                }
                ,
                t.prototype.start = function() {
                    this.renderer.bindShader(this.shader)
                }
                ,
                t.prototype.render = function(e) {
                    var t = e.children
                      , n = e._maxSize
                      , r = e._batchSize
                      , o = this.renderer
                      , s = t.length;
                    if (0 !== s) {
                        s > n && (s = n);
                        var a = e._glBuffers[o.CONTEXT_UID];
                        a || (a = e._glBuffers[o.CONTEXT_UID] = this.generateBuffers(e));
                        var l = t[0]._texture.baseTexture;
                        this.renderer.setBlendMode(i.utils.correctBlendMode(e.blendMode, l.premultipliedAlpha));
                        var u = o.gl
                          , c = e.worldTransform.copy(this.tempMatrix);
                        c.prepend(o._activeRenderTarget.projectionMatrix),
                        this.shader.uniforms.projectionMatrix = c.toArray(!0),
                        this.shader.uniforms.uColor = i.utils.premultiplyRgba(e.tintRgb, e.worldAlpha, this.shader.uniforms.uColor, l.premultipliedAlpha),
                        this.shader.uniforms.uSampler = o.bindTexture(l);
                        for (var h = 0, d = 0; h < s; h += r,
                        d += 1) {
                            var p = s - h;
                            if (p > r && (p = r),
                            d >= a.length) {
                                if (!e.autoResize)
                                    break;
                                a.push(this._generateOneMoreBuffer(e))
                            }
                            var f = a[d];
                            f.uploadDynamic(t, h, p),
                            e._bufferToUpdate === d && (f.uploadStatic(t, h, p),
                            e._bufferToUpdate = d + 1),
                            o.bindVao(f.vao),
                            f.vao.draw(u.TRIANGLES, 6 * p)
                        }
                    }
                }
                ,
                t.prototype.generateBuffers = function(e) {
                    for (var t = this.renderer.gl, n = [], r = e._maxSize, i = e._batchSize, o = e._properties, a = 0; a < r; a += i)
                        n.push(new s.default(t,this.properties,o,i));
                    return n
                }
                ,
                t.prototype._generateOneMoreBuffer = function(e) {
                    var t = this.renderer.gl
                      , n = e._batchSize
                      , r = e._properties;
                    return new s.default(t,this.properties,r,n)
                }
                ,
                t.prototype.uploadVertices = function(e, t, n, r, i, o) {
                    for (var s = 0, a = 0, l = 0, u = 0, c = 0; c < n; ++c) {
                        var h = e[t + c]
                          , d = h._texture
                          , p = h.scale.x
                          , f = h.scale.y
                          , g = d.trim
                          , m = d.orig;
                        g ? (s = (a = g.x - h.anchor.x * m.width) + g.width,
                        l = (u = g.y - h.anchor.y * m.height) + g.height) : (s = m.width * (1 - h.anchor.x),
                        a = m.width * -h.anchor.x,
                        l = m.height * (1 - h.anchor.y),
                        u = m.height * -h.anchor.y),
                        r[o] = a * p,
                        r[o + 1] = u * f,
                        r[o + i] = s * p,
                        r[o + i + 1] = u * f,
                        r[o + 2 * i] = s * p,
                        r[o + 2 * i + 1] = l * f,
                        r[o + 3 * i] = a * p,
                        r[o + 3 * i + 1] = l * f,
                        o += 4 * i
                    }
                }
                ,
                t.prototype.uploadPosition = function(e, t, n, r, i, o) {
                    for (var s = 0; s < n; s++) {
                        var a = e[t + s].position;
                        r[o] = a.x,
                        r[o + 1] = a.y,
                        r[o + i] = a.x,
                        r[o + i + 1] = a.y,
                        r[o + 2 * i] = a.x,
                        r[o + 2 * i + 1] = a.y,
                        r[o + 3 * i] = a.x,
                        r[o + 3 * i + 1] = a.y,
                        o += 4 * i
                    }
                }
                ,
                t.prototype.uploadRotation = function(e, t, n, r, i, o) {
                    for (var s = 0; s < n; s++) {
                        var a = e[t + s].rotation;
                        r[o] = a,
                        r[o + i] = a,
                        r[o + 2 * i] = a,
                        r[o + 3 * i] = a,
                        o += 4 * i
                    }
                }
                ,
                t.prototype.uploadUvs = function(e, t, n, r, i, o) {
                    for (var s = 0; s < n; ++s) {
                        var a = e[t + s]._texture._uvs;
                        a ? (r[o] = a.x0,
                        r[o + 1] = a.y0,
                        r[o + i] = a.x1,
                        r[o + i + 1] = a.y1,
                        r[o + 2 * i] = a.x2,
                        r[o + 2 * i + 1] = a.y2,
                        r[o + 3 * i] = a.x3,
                        r[o + 3 * i + 1] = a.y3,
                        o += 4 * i) : (r[o] = 0,
                        r[o + 1] = 0,
                        r[o + i] = 0,
                        r[o + i + 1] = 0,
                        r[o + 2 * i] = 0,
                        r[o + 2 * i + 1] = 0,
                        r[o + 3 * i] = 0,
                        r[o + 3 * i + 1] = 0,
                        o += 4 * i)
                    }
                }
                ,
                t.prototype.uploadTint = function(e, t, n, r, i, o) {
                    for (var s = 0; s < n; ++s) {
                        var l = e[t + s]
                          , u = l._texture.baseTexture.premultipliedAlpha
                          , c = l.alpha
                          , h = c < 1 && u ? (0,
                        a.premultiplyTint)(l._tintRGB, c) : l._tintRGB + (255 * c << 24);
                        r[o] = h,
                        r[o + i] = h,
                        r[o + 2 * i] = h,
                        r[o + 3 * i] = h,
                        o += 4 * i
                    }
                }
                ,
                t.prototype.destroy = function() {
                    this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer),
                    e.prototype.destroy.call(this),
                    this.shader.destroy(),
                    this.indices = null,
                    this.tempMatrix = null
                }
                ,
                t
            }(i.ObjectRenderer);
            n.default = l,
            i.WebGLRenderer.registerPlugin("particle", l)
        }
        , {
            "../../core": 65,
            "../../core/utils": 124,
            "./ParticleBuffer": 175,
            "./ParticleShader": 177
        }],
        177: [function(e, t, n) {
            n.__esModule = !0;
            var r = function(e) {
                function t(n) {
                    return function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "uniform vec4 uColor;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor * uColor;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor;", "  if (color.a == 0.0) discard;", "  gl_FragColor = color;", "}"].join("\n")))
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../../core/Shader")).default);
            n.default = r
        }
        , {
            "../../core/Shader": 44
        }],
        178: [function(e, t, n) {
            Math.sign || (Math.sign = function(e) {
                return 0 === (e = Number(e)) || isNaN(e) ? e : e > 0 ? 1 : -1
            }
            )
        }
        , {}],
        179: [function(e, t, n) {
            var r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("object-assign"));
            Object.assign || (Object.assign = r.default)
        }
        , {
            "object-assign": 5
        }],
        180: [function(e, t, n) {
            e("./Object.assign"),
            e("./requestAnimationFrame"),
            e("./Math.sign"),
            window.ArrayBuffer || (window.ArrayBuffer = Array),
            window.Float32Array || (window.Float32Array = Array),
            window.Uint32Array || (window.Uint32Array = Array),
            window.Uint16Array || (window.Uint16Array = Array)
        }
        , {
            "./Math.sign": 178,
            "./Object.assign": 179,
            "./requestAnimationFrame": 181
        }],
        181: [function(e, t, n) {
            (function(e) {
                if (Date.now && Date.prototype.getTime || (Date.now = function() {
                    return (new Date).getTime()
                }
                ),
                !e.performance || !e.performance.now) {
                    var t = Date.now();
                    e.performance || (e.performance = {}),
                    e.performance.now = function() {
                        return Date.now() - t
                    }
                }
                for (var n = Date.now(), r = ["ms", "moz", "webkit", "o"], i = 0; i < r.length && !e.requestAnimationFrame; ++i) {
                    var o = r[i];
                    e.requestAnimationFrame = e[o + "RequestAnimationFrame"],
                    e.cancelAnimationFrame = e[o + "CancelAnimationFrame"] || e[o + "CancelRequestAnimationFrame"]
                }
                e.requestAnimationFrame || (e.requestAnimationFrame = function(e) {
                    if ("function" != typeof e)
                        throw new TypeError(e + "is not a function");
                    var t = Date.now()
                      , r = 16 + n - t;
                    return r < 0 && (r = 0),
                    n = t,
                    setTimeout(function() {
                        n = Date.now(),
                        e(performance.now())
                    }, r)
                }
                ),
                e.cancelAnimationFrame || (e.cancelAnimationFrame = function(e) {
                    return clearTimeout(e)
                }
                )
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {}],
        182: [function(e, t, n) {
            function r(e, t) {
                var n = !1;
                if (e && e._textures && e._textures.length)
                    for (var r = 0; r < e._textures.length; r++)
                        if (e._textures[r]instanceof c.Texture) {
                            var i = e._textures[r].baseTexture;
                            -1 === t.indexOf(i) && (t.push(i),
                            n = !0)
                        }
                return n
            }
            function i(e, t) {
                return e instanceof c.BaseTexture && (-1 === t.indexOf(e) && t.push(e),
                !0)
            }
            function o(e, t) {
                if (e._texture && e._texture instanceof c.Texture) {
                    var n = e._texture.baseTexture;
                    return -1 === t.indexOf(n) && t.push(n),
                    !0
                }
                return !1
            }
            function s(e, t) {
                return t instanceof c.Text && (t.updateText(!0),
                !0)
            }
            function a(e, t) {
                if (t instanceof c.TextStyle) {
                    var n = t.toFontString();
                    return c.TextMetrics.measureFont(n),
                    !0
                }
                return !1
            }
            function l(e, t) {
                if (e instanceof c.Text) {
                    -1 === t.indexOf(e.style) && t.push(e.style),
                    -1 === t.indexOf(e) && t.push(e);
                    var n = e._texture.baseTexture;
                    return -1 === t.indexOf(n) && t.push(n),
                    !0
                }
                return !1
            }
            function u(e, t) {
                return e instanceof c.TextStyle && (-1 === t.indexOf(e) && t.push(e),
                !0)
            }
            n.__esModule = !0;
            var c = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../core"))
              , h = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("./limiters/CountLimiter"))
              , d = c.ticker.shared;
            c.settings.UPLOADS_PER_FRAME = 4;
            var p = function() {
                function e(t) {
                    var n = this;
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.limiter = new h.default(c.settings.UPLOADS_PER_FRAME),
                    this.renderer = t,
                    this.uploadHookHelper = null,
                    this.queue = [],
                    this.addHooks = [],
                    this.uploadHooks = [],
                    this.completes = [],
                    this.ticking = !1,
                    this.delayedTick = function() {
                        n.queue && n.prepareItems()
                    }
                    ,
                    this.registerFindHook(l),
                    this.registerFindHook(u),
                    this.registerFindHook(r),
                    this.registerFindHook(i),
                    this.registerFindHook(o),
                    this.registerUploadHook(s),
                    this.registerUploadHook(a)
                }
                return e.prototype.upload = function(e, t) {
                    "function" == typeof e && (t = e,
                    e = null),
                    e && this.add(e),
                    this.queue.length ? (t && this.completes.push(t),
                    this.ticking || (this.ticking = !0,
                    d.addOnce(this.tick, this, c.UPDATE_PRIORITY.UTILITY))) : t && t()
                }
                ,
                e.prototype.tick = function() {
                    setTimeout(this.delayedTick, 0)
                }
                ,
                e.prototype.prepareItems = function() {
                    for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
                        var e = this.queue[0]
                          , t = !1;
                        if (e && !e._destroyed)
                            for (var n = 0, r = this.uploadHooks.length; n < r; n++)
                                if (this.uploadHooks[n](this.uploadHookHelper, e)) {
                                    this.queue.shift(),
                                    t = !0;
                                    break
                                }
                        t || this.queue.shift()
                    }
                    if (this.queue.length)
                        d.addOnce(this.tick, this, c.UPDATE_PRIORITY.UTILITY);
                    else {
                        this.ticking = !1;
                        var i = this.completes.slice(0);
                        this.completes.length = 0;
                        for (var o = 0, s = i.length; o < s; o++)
                            i[o]()
                    }
                }
                ,
                e.prototype.registerFindHook = function(e) {
                    return e && this.addHooks.push(e),
                    this
                }
                ,
                e.prototype.registerUploadHook = function(e) {
                    return e && this.uploadHooks.push(e),
                    this
                }
                ,
                e.prototype.add = function(e) {
                    for (var t = 0, n = this.addHooks.length; t < n && !this.addHooks[t](e, this.queue); t++)
                        ;
                    if (e instanceof c.Container)
                        for (var r = e.children.length - 1; r >= 0; r--)
                            this.add(e.children[r]);
                    return this
                }
                ,
                e.prototype.destroy = function() {
                    this.ticking && d.remove(this.tick, this),
                    this.ticking = !1,
                    this.addHooks = null,
                    this.uploadHooks = null,
                    this.renderer = null,
                    this.completes = null,
                    this.queue = null,
                    this.limiter = null,
                    this.uploadHookHelper = null
                }
                ,
                e
            }();
            n.default = p
        }
        , {
            "../core": 65,
            "./limiters/CountLimiter": 185
        }],
        183: [function(e, t, n) {
            function r(e, t) {
                if (t instanceof i.BaseTexture) {
                    var n = t.source
                      , r = 0 === n.width ? e.canvas.width : Math.min(e.canvas.width, n.width)
                      , o = 0 === n.height ? e.canvas.height : Math.min(e.canvas.height, n.height);
                    return e.ctx.drawImage(n, 0, 0, r, o, 0, 0, e.canvas.width, e.canvas.height),
                    !0
                }
                return !1
            }
            n.__esModule = !0;
            var i = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , o = 16
              , s = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var i = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return i.uploadHookHelper = i,
                    i.canvas = document.createElement("canvas"),
                    i.canvas.width = o,
                    i.canvas.height = o,
                    i.ctx = i.canvas.getContext("2d"),
                    i.registerUploadHook(r),
                    i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t.prototype.destroy = function() {
                    e.prototype.destroy.call(this),
                    this.ctx = null,
                    this.canvas = null
                }
                ,
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../BasePrepare")).default);
            n.default = s,
            i.CanvasRenderer.registerPlugin("prepare", s)
        }
        , {
            "../../core": 65,
            "../BasePrepare": 182
        }],
        184: [function(e, t, n) {
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n.__esModule = !0;
            var i = e("./webgl/WebGLPrepare");
            Object.defineProperty(n, "webgl", {
                enumerable: !0,
                get: function() {
                    return r(i).default
                }
            });
            var o = e("./canvas/CanvasPrepare");
            Object.defineProperty(n, "canvas", {
                enumerable: !0,
                get: function() {
                    return r(o).default
                }
            });
            var s = e("./BasePrepare");
            Object.defineProperty(n, "BasePrepare", {
                enumerable: !0,
                get: function() {
                    return r(s).default
                }
            });
            var a = e("./limiters/CountLimiter");
            Object.defineProperty(n, "CountLimiter", {
                enumerable: !0,
                get: function() {
                    return r(a).default
                }
            });
            var l = e("./limiters/TimeLimiter");
            Object.defineProperty(n, "TimeLimiter", {
                enumerable: !0,
                get: function() {
                    return r(l).default
                }
            })
        }
        , {
            "./BasePrepare": 182,
            "./canvas/CanvasPrepare": 183,
            "./limiters/CountLimiter": 185,
            "./limiters/TimeLimiter": 186,
            "./webgl/WebGLPrepare": 187
        }],
        185: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.maxItemsPerFrame = t,
                    this.itemsLeft = 0
                }
                return e.prototype.beginFrame = function() {
                    this.itemsLeft = this.maxItemsPerFrame
                }
                ,
                e.prototype.allowedToUpload = function() {
                    return this.itemsLeft-- > 0
                }
                ,
                e
            }();
            n.default = r
        }
        , {}],
        186: [function(e, t, n) {
            n.__esModule = !0;
            var r = function() {
                function e(t) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.maxMilliseconds = t,
                    this.frameStart = 0
                }
                return e.prototype.beginFrame = function() {
                    this.frameStart = Date.now()
                }
                ,
                e.prototype.allowedToUpload = function() {
                    return Date.now() - this.frameStart < this.maxMilliseconds
                }
                ,
                e
            }();
            n.default = r
        }
        , {}],
        187: [function(e, t, n) {
            function r(e, t) {
                return t instanceof s.BaseTexture && (t._glTextures[e.CONTEXT_UID] || e.textureManager.updateTexture(t),
                !0)
            }
            function i(e, t) {
                return t instanceof s.Graphics && ((t.dirty || t.clearDirty || !t._webGL[e.plugins.graphics.CONTEXT_UID]) && e.plugins.graphics.updateGraphics(t),
                !0)
            }
            function o(e, t) {
                return e instanceof s.Graphics && (t.push(e),
                !0)
            }
            n.__esModule = !0;
            var s = function(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }(e("../../core"))
              , a = function(e) {
                function t(n) {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var s = function(e, t) {
                        if (!e)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.call(this, n));
                    return s.uploadHookHelper = s.renderer,
                    s.registerFindHook(o),
                    s.registerUploadHook(r),
                    s.registerUploadHook(i),
                    s
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, e),
                t
            }(function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(e("../BasePrepare")).default);
            n.default = a,
            s.WebGLRenderer.registerPlugin("prepare", a)
        }
        , {
            "../../core": 65,
            "../BasePrepare": 182
        }],
        188: [function(e, t, n) {
            (function(t) {
                function r(e) {
                    if (e && e.__esModule)
                        return e;
                    var t = {};
                    if (null != e)
                        for (var n in e)
                            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e,
                    t
                }
                n.__esModule = !0,
                n.loader = n.prepare = n.particles = n.mesh = n.loaders = n.interaction = n.filters = n.extras = n.extract = n.accessibility = void 0;
                var i = e("./polyfill");
                Object.keys(i).forEach(function(e) {
                    "default" !== e && "__esModule" !== e && Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function() {
                            return i[e]
                        }
                    })
                });
                var o = e("./core");
                Object.keys(o).forEach(function(e) {
                    "default" !== e && "__esModule" !== e && Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function() {
                            return o[e]
                        }
                    })
                });
                var s = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(e("./deprecation"))
                  , a = r(e("./accessibility"))
                  , l = r(e("./extract"))
                  , u = r(e("./extras"))
                  , c = r(e("./filters"))
                  , h = r(e("./interaction"))
                  , d = r(e("./loaders"))
                  , p = r(e("./mesh"))
                  , f = r(e("./particles"))
                  , g = r(e("./prepare"));
                o.utils.mixins.performMixins();
                var m = d.shared || null;
                n.accessibility = a,
                n.extract = l,
                n.extras = u,
                n.filters = c,
                n.interaction = h,
                n.loaders = d,
                n.mesh = p,
                n.particles = f,
                n.prepare = g,
                n.loader = m,
                "function" == typeof s.default && (0,
                s.default)(n),
                t.PIXI = n
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {
            "./accessibility": 42,
            "./core": 65,
            "./deprecation": 130,
            "./extract": 132,
            "./extras": 141,
            "./filters": 152,
            "./interaction": 159,
            "./loaders": 162,
            "./mesh": 171,
            "./particles": 174,
            "./polyfill": 180,
            "./prepare": 184
        }]
    }, {}, [188])(188)
});
