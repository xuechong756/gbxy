window.__require = function e(t, i, n) {
    function s(a, r) {
        if (!i[a]) {
            if (!t[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1],
                !t[c]) {
                    var l = "function" == typeof __require && __require;
                    if (!r && l)
                        return l(c, !0);
                    if (o)
                        return o(c, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var u = i[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                return s(t[a][1][e] || e)
            }, u, u.exports, e, t, i, n)
        }
        return i[a].exports
    }
    for (var o = "function" == typeof __require && __require, a = 0; a < n.length; a++)
        s(n[a]);
    return s
}({
    1: [function(e, t, i) {
        "use strict";
        var n = {
            cipher: function(e, t) {
                for (var i = t.length / 4 - 1, s = [[], [], [], []], o = 0; o < 16; o++)
                    s[o % 4][Math.floor(o / 4)] = e[o];
                s = n.addRoundKey(s, t, 0, 4);
                for (var a = 1; a < i; a++)
                    s = n.subBytes(s, 4),
                    s = n.shiftRows(s, 4),
                    s = n.mixColumns(s, 4),
                    s = n.addRoundKey(s, t, a, 4);
                s = n.subBytes(s, 4),
                s = n.shiftRows(s, 4),
                s = n.addRoundKey(s, t, i, 4);
                var r = new Array(16);
                for (o = 0; o < 16; o++)
                    r[o] = s[o % 4][Math.floor(o / 4)];
                return r
            },
            keyExpansion: function(e) {
                for (var t = e.length / 4, i = t + 6, s = new Array(4 * (i + 1)), o = new Array(4), a = 0; a < t; a++) {
                    var r = [e[4 * a], e[4 * a + 1], e[4 * a + 2], e[4 * a + 3]];
                    s[a] = r
                }
                for (a = t; a < 4 * (i + 1); a++) {
                    s[a] = new Array(4);
                    for (var c = 0; c < 4; c++)
                        o[c] = s[a - 1][c];
                    if (a % t == 0) {
                        o = n.subWord(n.rotWord(o));
                        for (c = 0; c < 4; c++)
                            o[c] ^= n.rCon[a / t][c]
                    } else
                        t > 6 && a % t == 4 && (o = n.subWord(o));
                    for (c = 0; c < 4; c++)
                        s[a][c] = s[a - t][c] ^ o[c]
                }
                return s
            },
            subBytes: function(e, t) {
                for (var i = 0; i < 4; i++)
                    for (var s = 0; s < t; s++)
                        e[i][s] = n.sBox[e[i][s]];
                return e
            },
            shiftRows: function(e, t) {
                for (var i = new Array(4), n = 1; n < 4; n++) {
                    for (var s = 0; s < 4; s++)
                        i[s] = e[n][(s + n) % t];
                    for (s = 0; s < 4; s++)
                        e[n][s] = i[s]
                }
                return e
            },
            mixColumns: function(e, t) {
                for (var i = 0; i < 4; i++) {
                    for (var n = new Array(4), s = new Array(4), o = 0; o < 4; o++)
                        n[o] = e[o][i],
                        s[o] = 128 & e[o][i] ? e[o][i] << 1 ^ 283 : e[o][i] << 1;
                    e[0][i] = s[0] ^ n[1] ^ s[1] ^ n[2] ^ n[3],
                    e[1][i] = n[0] ^ s[1] ^ n[2] ^ s[2] ^ n[3],
                    e[2][i] = n[0] ^ n[1] ^ s[2] ^ n[3] ^ s[3],
                    e[3][i] = n[0] ^ s[0] ^ n[1] ^ n[2] ^ s[3]
                }
                return e
            },
            addRoundKey: function(e, t, i, n) {
                for (var s = 0; s < 4; s++)
                    for (var o = 0; o < n; o++)
                        e[s][o] ^= t[4 * i + o][s];
                return e
            },
            subWord: function(e) {
                for (var t = 0; t < 4; t++)
                    e[t] = n.sBox[e[t]];
                return e
            },
            rotWord: function(e) {
                for (var t = e[0], i = 0; i < 3; i++)
                    e[i] = e[i + 1];
                return e[3] = t,
                e
            },
            sBox: [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
            rCon: [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [8, 0, 0, 0], [16, 0, 0, 0], [32, 0, 0, 0], [64, 0, 0, 0], [128, 0, 0, 0], [27, 0, 0, 0], [54, 0, 0, 0]]
        };
        void 0 !== t && t.exports && (t.exports = n),
        "function" == typeof define && define.amd && define([], function() {
            return n
        })
    }
    , {}],
    2: [function(e, t, i) {
        (function(n) {
            (function(e, n) {
                void 0 !== i && void 0 !== t ? t.exports = n() : "function" == typeof define && "object" == typeof define.amd ? define(n) : "function" == typeof define && "object" == typeof define.petal ? define("encryptjs", [], n) : this.encryptjs = n()
            }
            )(0, function(i) {
                "use strict";
                if ((i = {
                    version: "1.0.0"
                }).init = function() {
                    console.log("--------------------Applying Encryption Algorithm------------------ ")
                }
                ,
                void 0 !== t && t.exports)
                    var s = e("./algo");
                return i.encrypt = function(e, t, i) {
                    if (128 != i && 192 != i && 256 != i)
                        return "";
                    e = String(e).utf8Encode(),
                    t = String(t).utf8Encode();
                    for (var n = i / 8, o = new Array(n), a = 0; a < n; a++)
                        o[a] = isNaN(t.charCodeAt(a)) ? 0 : t.charCodeAt(a);
                    var r = s.cipher(o, s.keyExpansion(o));
                    r = r.concat(r.slice(0, n - 16));
                    var c = new Array(16)
                      , l = (new Date).getTime()
                      , u = l % 1e3
                      , h = Math.floor(l / 1e3)
                      , d = Math.floor(65535 * Math.random());
                    for (a = 0; a < 2; a++)
                        c[a] = u >>> 8 * a & 255;
                    for (a = 0; a < 2; a++)
                        c[a + 2] = d >>> 8 * a & 255;
                    for (a = 0; a < 4; a++)
                        c[a + 4] = h >>> 8 * a & 255;
                    var f = "";
                    for (a = 0; a < 8; a++)
                        f += String.fromCharCode(c[a]);
                    for (var m = s.keyExpansion(r), g = Math.ceil(e.length / 16), p = new Array(g), y = 0; y < g; y++) {
                        for (var v = 0; v < 4; v++)
                            c[15 - v] = y >>> 8 * v & 255;
                        for (v = 0; v < 4; v++)
                            c[15 - v - 4] = y / 4294967296 >>> 8 * v;
                        var _ = s.cipher(c, m)
                          , k = y < g - 1 ? 16 : (e.length - 1) % 16 + 1
                          , w = new Array(k);
                        for (a = 0; a < k; a++)
                            w[a] = _[a] ^ e.charCodeAt(16 * y + a),
                            w[a] = String.fromCharCode(w[a]);
                        p[y] = w.join("")
                    }
                    var b = f + p.join("");
                    return b = b.base64Encode()
                }
                ,
                i.decrypt = function(e, t, i) {
                    if (128 != i && 192 != i && 256 != i)
                        return "";
                    e = String(e).base64Decode(),
                    t = String(t).utf8Encode();
                    for (var n = i / 8, o = new Array(n), a = 0; a < n; a++)
                        o[a] = isNaN(t.charCodeAt(a)) ? 0 : t.charCodeAt(a);
                    var r = s.cipher(o, s.keyExpansion(o));
                    r = r.concat(r.slice(0, n - 16));
                    var c = new Array(8)
                      , l = e.slice(0, 8);
                    for (a = 0; a < 8; a++)
                        c[a] = l.charCodeAt(a);
                    for (var u = s.keyExpansion(r), h = Math.ceil((e.length - 8) / 16), d = new Array(h), f = 0; f < h; f++)
                        d[f] = e.slice(8 + 16 * f, 8 + 16 * f + 16);
                    e = d;
                    var m = new Array(e.length);
                    for (f = 0; f < h; f++) {
                        for (var g = 0; g < 4; g++)
                            c[15 - g] = f >>> 8 * g & 255;
                        for (g = 0; g < 4; g++)
                            c[15 - g - 4] = (f + 1) / 4294967296 - 1 >>> 8 * g & 255;
                        var p = s.cipher(c, u)
                          , y = new Array(e[f].length);
                        for (a = 0; a < e[f].length; a++)
                            y[a] = p[a] ^ e[f].charCodeAt(a),
                            y[a] = String.fromCharCode(y[a]);
                        m[f] = y.join("")
                    }
                    var v = m.join("");
                    return v = v.utf8Decode()
                }
                ,
                void 0 === String.prototype.utf8Encode && (String.prototype.utf8Encode = function() {
                    return unescape(encodeURIComponent(this))
                }
                ),
                void 0 === String.prototype.utf8Decode && (String.prototype.utf8Decode = function() {
                    try {
                        return decodeURIComponent(escape(this))
                    } catch (e) {
                        return this
                    }
                }
                ),
                void 0 === String.prototype.base64Encode && (String.prototype.base64Encode = function() {
                    if ("undefined" != typeof btoa)
                        return btoa(this);
                    if (void 0 !== n)
                        return new n(this,"utf8").toString("base64");
                    throw new Error("No Base64 Encode")
                }
                ),
                void 0 === String.prototype.base64Decode && (String.prototype.base64Decode = function() {
                    if ("undefined" != typeof atob)
                        return atob(this);
                    if (void 0 !== n)
                        return new n(this,"base64").toString("utf8");
                    throw new Error("No Base64 Decode")
                }
                ),
                i.init(),
                i
            })
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "./algo": 1,
        buffer: 6
    }],
    3: [function(e, t, i) {
        (function(e) {
            !function(n) {
                var s = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                  , o = 10;
                function a() {
                    this._events = {},
                    this._conf && r.call(this, this._conf)
                }
                function r(e) {
                    e ? (this._conf = e,
                    e.delimiter && (this.delimiter = e.delimiter),
                    this._maxListeners = e.maxListeners !== n ? e.maxListeners : o,
                    e.wildcard && (this.wildcard = e.wildcard),
                    e.newListener && (this._newListener = e.newListener),
                    e.removeListener && (this._removeListener = e.removeListener),
                    e.verboseMemoryLeak && (this.verboseMemoryLeak = e.verboseMemoryLeak),
                    this.wildcard && (this.listenerTree = {})) : this._maxListeners = o
                }
                function c(t, i) {
                    var n = "(node) warning: possible EventEmitter memory leak detected. " + t + " listeners added. Use emitter.setMaxListeners() to increase limit.";
                    if (this.verboseMemoryLeak && (n += " Event name: " + i + "."),
                    void 0 !== e && e.emitWarning) {
                        var s = new Error(n);
                        s.name = "MaxListenersExceededWarning",
                        s.emitter = this,
                        s.count = t,
                        e.emitWarning(s)
                    } else
                        console.error(n),
                        console.trace && console.trace()
                }
                function l(e) {
                    this._events = {},
                    this._newListener = !1,
                    this._removeListener = !1,
                    this.verboseMemoryLeak = !1,
                    r.call(this, e)
                }
                function u(e, t, i, n) {
                    if (!i)
                        return [];
                    var s, o, a, r, c, l, h, d = [], f = t.length, m = t[n], g = t[n + 1];
                    if (n === f && i._listeners) {
                        if ("function" == typeof i._listeners)
                            return e && e.push(i._listeners),
                            [i];
                        for (s = 0,
                        o = i._listeners.length; s < o; s++)
                            e && e.push(i._listeners[s]);
                        return [i]
                    }
                    if ("*" === m || "**" === m || i[m]) {
                        if ("*" === m) {
                            for (a in i)
                                "_listeners" !== a && i.hasOwnProperty(a) && (d = d.concat(u(e, t, i[a], n + 1)));
                            return d
                        }
                        if ("**" === m) {
                            for (a in (h = n + 1 === f || n + 2 === f && "*" === g) && i._listeners && (d = d.concat(u(e, t, i, f))),
                            i)
                                "_listeners" !== a && i.hasOwnProperty(a) && ("*" === a || "**" === a ? (i[a]._listeners && !h && (d = d.concat(u(e, t, i[a], f))),
                                d = d.concat(u(e, t, i[a], n))) : d = a === g ? d.concat(u(e, t, i[a], n + 2)) : d.concat(u(e, t, i[a], n)));
                            return d
                        }
                        d = d.concat(u(e, t, i[m], n + 1))
                    }
                    if ((r = i["*"]) && u(e, t, r, n + 1),
                    c = i["**"])
                        if (n < f)
                            for (a in c._listeners && u(e, t, c, f),
                            c)
                                "_listeners" !== a && c.hasOwnProperty(a) && (a === g ? u(e, t, c[a], n + 2) : a === m ? u(e, t, c[a], n + 1) : ((l = {})[a] = c[a],
                                u(e, t, {
                                    "**": l
                                }, n + 1)));
                        else
                            c._listeners ? u(e, t, c, f) : c["*"] && c["*"]._listeners && u(e, t, c["*"], f);
                    return d
                }
                function h(e, t) {
                    for (var i = 0, s = (e = "string" == typeof e ? e.split(this.delimiter) : e.slice()).length; i + 1 < s; i++)
                        if ("**" === e[i] && "**" === e[i + 1])
                            return;
                    for (var o = this.listenerTree, a = e.shift(); a !== n; ) {
                        if (o[a] || (o[a] = {}),
                        o = o[a],
                        0 === e.length)
                            return o._listeners ? ("function" == typeof o._listeners && (o._listeners = [o._listeners]),
                            o._listeners.push(t),
                            !o._listeners.warned && this._maxListeners > 0 && o._listeners.length > this._maxListeners && (o._listeners.warned = !0,
                            c.call(this, o._listeners.length, a))) : o._listeners = t,
                            !0;
                        a = e.shift()
                    }
                    return !0
                }
                l.EventEmitter2 = l,
                l.prototype.delimiter = ".",
                l.prototype.setMaxListeners = function(e) {
                    e !== n && (this._maxListeners = e,
                    this._conf || (this._conf = {}),
                    this._conf.maxListeners = e)
                }
                ,
                l.prototype.event = "",
                l.prototype.once = function(e, t) {
                    return this._once(e, t, !1)
                }
                ,
                l.prototype.prependOnceListener = function(e, t) {
                    return this._once(e, t, !0)
                }
                ,
                l.prototype._once = function(e, t, i) {
                    return this._many(e, 1, t, i),
                    this
                }
                ,
                l.prototype.many = function(e, t, i) {
                    return this._many(e, t, i, !1)
                }
                ,
                l.prototype.prependMany = function(e, t, i) {
                    return this._many(e, t, i, !0)
                }
                ,
                l.prototype._many = function(e, t, i, n) {
                    var s = this;
                    if ("function" != typeof i)
                        throw new Error("many only accepts instances of Function");
                    function o() {
                        return 0 == --t && s.off(e, o),
                        i.apply(this, arguments)
                    }
                    return o._origin = i,
                    this._on(e, o, n),
                    s
                }
                ,
                l.prototype.emit = function() {
                    this._events || a.call(this);
                    var e = arguments[0];
                    if ("newListener" === e && !this._newListener && !this._events.newListener)
                        return !1;
                    var t, i, n, s, o, r = arguments.length;
                    if (this._all && this._all.length) {
                        if (o = this._all.slice(),
                        r > 3)
                            for (t = new Array(r),
                            s = 0; s < r; s++)
                                t[s] = arguments[s];
                        for (n = 0,
                        i = o.length; n < i; n++)
                            switch (this.event = e,
                            r) {
                            case 1:
                                o[n].call(this, e);
                                break;
                            case 2:
                                o[n].call(this, e, arguments[1]);
                                break;
                            case 3:
                                o[n].call(this, e, arguments[1], arguments[2]);
                                break;
                            default:
                                o[n].apply(this, t)
                            }
                    }
                    if (this.wildcard) {
                        o = [];
                        var c = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                        u.call(this, o, c, this.listenerTree, 0)
                    } else {
                        if ("function" == typeof (o = this._events[e])) {
                            switch (this.event = e,
                            r) {
                            case 1:
                                o.call(this);
                                break;
                            case 2:
                                o.call(this, arguments[1]);
                                break;
                            case 3:
                                o.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                for (t = new Array(r - 1),
                                s = 1; s < r; s++)
                                    t[s - 1] = arguments[s];
                                o.apply(this, t)
                            }
                            return !0
                        }
                        o && (o = o.slice())
                    }
                    if (o && o.length) {
                        if (r > 3)
                            for (t = new Array(r - 1),
                            s = 1; s < r; s++)
                                t[s - 1] = arguments[s];
                        for (n = 0,
                        i = o.length; n < i; n++)
                            switch (this.event = e,
                            r) {
                            case 1:
                                o[n].call(this);
                                break;
                            case 2:
                                o[n].call(this, arguments[1]);
                                break;
                            case 3:
                                o[n].call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                o[n].apply(this, t)
                            }
                        return !0
                    }
                    if (!this._all && "error" === e)
                        throw arguments[1]instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
                    return !!this._all
                }
                ,
                l.prototype.emitAsync = function() {
                    this._events || a.call(this);
                    var e = arguments[0];
                    if ("newListener" === e && !this._newListener && !this._events.newListener)
                        return Promise.resolve([!1]);
                    var t, i, n, s, o, r = [], c = arguments.length;
                    if (this._all) {
                        if (c > 3)
                            for (t = new Array(c),
                            s = 1; s < c; s++)
                                t[s] = arguments[s];
                        for (n = 0,
                        i = this._all.length; n < i; n++)
                            switch (this.event = e,
                            c) {
                            case 1:
                                r.push(this._all[n].call(this, e));
                                break;
                            case 2:
                                r.push(this._all[n].call(this, e, arguments[1]));
                                break;
                            case 3:
                                r.push(this._all[n].call(this, e, arguments[1], arguments[2]));
                                break;
                            default:
                                r.push(this._all[n].apply(this, t))
                            }
                    }
                    if (this.wildcard) {
                        o = [];
                        var l = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                        u.call(this, o, l, this.listenerTree, 0)
                    } else
                        o = this._events[e];
                    if ("function" == typeof o)
                        switch (this.event = e,
                        c) {
                        case 1:
                            r.push(o.call(this));
                            break;
                        case 2:
                            r.push(o.call(this, arguments[1]));
                            break;
                        case 3:
                            r.push(o.call(this, arguments[1], arguments[2]));
                            break;
                        default:
                            for (t = new Array(c - 1),
                            s = 1; s < c; s++)
                                t[s - 1] = arguments[s];
                            r.push(o.apply(this, t))
                        }
                    else if (o && o.length) {
                        if (o = o.slice(),
                        c > 3)
                            for (t = new Array(c - 1),
                            s = 1; s < c; s++)
                                t[s - 1] = arguments[s];
                        for (n = 0,
                        i = o.length; n < i; n++)
                            switch (this.event = e,
                            c) {
                            case 1:
                                r.push(o[n].call(this));
                                break;
                            case 2:
                                r.push(o[n].call(this, arguments[1]));
                                break;
                            case 3:
                                r.push(o[n].call(this, arguments[1], arguments[2]));
                                break;
                            default:
                                r.push(o[n].apply(this, t))
                            }
                    } else if (!this._all && "error" === e)
                        return arguments[1]instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
                    return Promise.all(r)
                }
                ,
                l.prototype.on = function(e, t) {
                    return this._on(e, t, !1)
                }
                ,
                l.prototype.prependListener = function(e, t) {
                    return this._on(e, t, !0)
                }
                ,
                l.prototype.onAny = function(e) {
                    return this._onAny(e, !1)
                }
                ,
                l.prototype.prependAny = function(e) {
                    return this._onAny(e, !0)
                }
                ,
                l.prototype.addListener = l.prototype.on,
                l.prototype._onAny = function(e, t) {
                    if ("function" != typeof e)
                        throw new Error("onAny only accepts instances of Function");
                    return this._all || (this._all = []),
                    t ? this._all.unshift(e) : this._all.push(e),
                    this
                }
                ,
                l.prototype._on = function(e, t, i) {
                    if ("function" == typeof e)
                        return this._onAny(e, t),
                        this;
                    if ("function" != typeof t)
                        throw new Error("on only accepts instances of Function");
                    return this._events || a.call(this),
                    this._newListener && this.emit("newListener", e, t),
                    this.wildcard ? (h.call(this, e, t),
                    this) : (this._events[e] ? ("function" == typeof this._events[e] && (this._events[e] = [this._events[e]]),
                    i ? this._events[e].unshift(t) : this._events[e].push(t),
                    !this._events[e].warned && this._maxListeners > 0 && this._events[e].length > this._maxListeners && (this._events[e].warned = !0,
                    c.call(this, this._events[e].length, e))) : this._events[e] = t,
                    this)
                }
                ,
                l.prototype.off = function(e, t) {
                    if ("function" != typeof t)
                        throw new Error("removeListener only takes instances of Function");
                    var i, o = [];
                    if (this.wildcard) {
                        var a = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                        o = u.call(this, null, a, this.listenerTree, 0)
                    } else {
                        if (!this._events[e])
                            return this;
                        i = this._events[e],
                        o.push({
                            _listeners: i
                        })
                    }
                    for (var r = 0; r < o.length; r++) {
                        var c = o[r];
                        if (i = c._listeners,
                        s(i)) {
                            for (var l = -1, h = 0, d = i.length; h < d; h++)
                                if (i[h] === t || i[h].listener && i[h].listener === t || i[h]._origin && i[h]._origin === t) {
                                    l = h;
                                    break
                                }
                            if (l < 0)
                                continue;
                            return this.wildcard ? c._listeners.splice(l, 1) : this._events[e].splice(l, 1),
                            0 === i.length && (this.wildcard ? delete c._listeners : delete this._events[e]),
                            this._removeListener && this.emit("removeListener", e, t),
                            this
                        }
                        (i === t || i.listener && i.listener === t || i._origin && i._origin === t) && (this.wildcard ? delete c._listeners : delete this._events[e],
                        this._removeListener && this.emit("removeListener", e, t))
                    }
                    return function e(t) {
                        if (t !== n) {
                            var i = Object.keys(t);
                            for (var s in i) {
                                var o = i[s]
                                  , a = t[o];
                                a instanceof Function || "object" != typeof a || null === a || (Object.keys(a).length > 0 && e(t[o]),
                                0 === Object.keys(a).length && delete t[o])
                            }
                        }
                    }(this.listenerTree),
                    this
                }
                ,
                l.prototype.offAny = function(e) {
                    var t, i = 0, n = 0;
                    if (e && this._all && this._all.length > 0) {
                        for (i = 0,
                        n = (t = this._all).length; i < n; i++)
                            if (e === t[i])
                                return t.splice(i, 1),
                                this._removeListener && this.emit("removeListenerAny", e),
                                this
                    } else {
                        if (t = this._all,
                        this._removeListener)
                            for (i = 0,
                            n = t.length; i < n; i++)
                                this.emit("removeListenerAny", t[i]);
                        this._all = []
                    }
                    return this
                }
                ,
                l.prototype.removeListener = l.prototype.off,
                l.prototype.removeAllListeners = function(e) {
                    if (e === n)
                        return !this._events || a.call(this),
                        this;
                    if (this.wildcard)
                        for (var t = "string" == typeof e ? e.split(this.delimiter) : e.slice(), i = u.call(this, null, t, this.listenerTree, 0), s = 0; s < i.length; s++) {
                            i[s]._listeners = null
                        }
                    else
                        this._events && (this._events[e] = null);
                    return this
                }
                ,
                l.prototype.listeners = function(e) {
                    if (this.wildcard) {
                        var t = []
                          , i = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                        return u.call(this, t, i, this.listenerTree, 0),
                        t
                    }
                    return this._events || a.call(this),
                    this._events[e] || (this._events[e] = []),
                    s(this._events[e]) || (this._events[e] = [this._events[e]]),
                    this._events[e]
                }
                ,
                l.prototype.eventNames = function() {
                    return Object.keys(this._events)
                }
                ,
                l.prototype.listenerCount = function(e) {
                    return this.listeners(e).length
                }
                ,
                l.prototype.listenersAny = function() {
                    return this._all ? this._all : []
                }
                ,
                "function" == typeof define && define.amd ? define(function() {
                    return l
                }) : "object" == typeof i ? t.exports = l : window.EventEmitter2 = l
            }()
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 9
    }],
    4: [function(e, t, i) {
        (function(e, n) {
            "object" == typeof i && void 0 !== t ? t.exports = n() : "function" == typeof define && define.amd ? define(n) : e.moment = n()
        }
        )(this, function() {
            "use strict";
            var i, n;
            function s() {
                return i.apply(null, arguments)
            }
            function o(e) {
                return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
            }
            function a(e) {
                return null != e && "[object Object]" === Object.prototype.toString.call(e)
            }
            function r(e) {
                if (Object.getOwnPropertyNames)
                    return 0 === Object.getOwnPropertyNames(e).length;
                var t;
                for (t in e)
                    if (e.hasOwnProperty(t))
                        return !1;
                return !0
            }
            function c(e) {
                return void 0 === e
            }
            function l(e) {
                return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
            }
            function u(e) {
                return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
            }
            function h(e, t) {
                var i, n = [];
                for (i = 0; i < e.length; ++i)
                    n.push(t(e[i], i));
                return n
            }
            function d(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            function f(e, t) {
                for (var i in t)
                    d(t, i) && (e[i] = t[i]);
                return d(t, "toString") && (e.toString = t.toString),
                d(t, "valueOf") && (e.valueOf = t.valueOf),
                e
            }
            function m(e, t, i, n) {
                return Qt(e, t, i, n, !0).utc()
            }
            function g(e) {
                return null == e._pf && (e._pf = {
                    empty: !1,
                    unusedTokens: [],
                    unusedInput: [],
                    overflow: -2,
                    charsLeftOver: 0,
                    nullInput: !1,
                    invalidMonth: null,
                    invalidFormat: !1,
                    userInvalidated: !1,
                    iso: !1,
                    parsedDateParts: [],
                    meridiem: null,
                    rfc2822: !1,
                    weekdayMismatch: !1
                }),
                e._pf
            }
            function p(e) {
                if (null == e._isValid) {
                    var t = g(e)
                      , i = n.call(t.parsedDateParts, function(e) {
                        return null != e
                    })
                      , s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && i);
                    if (e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour),
                    null != Object.isFrozen && Object.isFrozen(e))
                        return s;
                    e._isValid = s
                }
                return e._isValid
            }
            function y(e) {
                var t = m(NaN);
                return null != e ? f(g(t), e) : g(t).userInvalidated = !0,
                t
            }
            n = Array.prototype.some ? Array.prototype.some : function(e) {
                for (var t = Object(this), i = t.length >>> 0, n = 0; n < i; n++)
                    if (n in t && e.call(this, t[n], n, t))
                        return !0;
                return !1
            }
            ;
            var v = s.momentProperties = [];
            function _(e, t) {
                var i, n, s;
                if (c(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
                c(t._i) || (e._i = t._i),
                c(t._f) || (e._f = t._f),
                c(t._l) || (e._l = t._l),
                c(t._strict) || (e._strict = t._strict),
                c(t._tzm) || (e._tzm = t._tzm),
                c(t._isUTC) || (e._isUTC = t._isUTC),
                c(t._offset) || (e._offset = t._offset),
                c(t._pf) || (e._pf = g(t)),
                c(t._locale) || (e._locale = t._locale),
                v.length > 0)
                    for (i = 0; i < v.length; i++)
                        c(s = t[n = v[i]]) || (e[n] = s);
                return e
            }
            var k = !1;
            function w(e) {
                _(this, e),
                this._d = new Date(null != e._d ? e._d.getTime() : NaN),
                this.isValid() || (this._d = new Date(NaN)),
                !1 === k && (k = !0,
                s.updateOffset(this),
                k = !1)
            }
            function b(e) {
                return e instanceof w || null != e && null != e._isAMomentObject
            }
            function S(e) {
                return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
            }
            function C(e) {
                var t = +e
                  , i = 0;
                return 0 !== t && isFinite(t) && (i = S(t)),
                i
            }
            function B(e, t, i) {
                var n, s = Math.min(e.length, t.length), o = Math.abs(e.length - t.length), a = 0;
                for (n = 0; n < s; n++)
                    (i && e[n] !== t[n] || !i && C(e[n]) !== C(t[n])) && a++;
                return a + o
            }
            function M(e) {
                !1 === s.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
            }
            function D(e, t) {
                var i = !0;
                return f(function() {
                    if (null != s.deprecationHandler && s.deprecationHandler(null, e),
                    i) {
                        for (var n, o = [], a = 0; a < arguments.length; a++) {
                            if (n = "",
                            "object" == typeof arguments[a]) {
                                for (var r in n += "\n[" + a + "] ",
                                arguments[0])
                                    n += r + ": " + arguments[0][r] + ", ";
                                n = n.slice(0, -2)
                            } else
                                n = arguments[a];
                            o.push(n)
                        }
                        M(e + "\nArguments: " + Array.prototype.slice.call(o).join("") + "\n" + (new Error).stack),
                        i = !1
                    }
                    return t.apply(this, arguments)
                }, t)
            }
            var T, L = {};
            function N(e, t) {
                null != s.deprecationHandler && s.deprecationHandler(e, t),
                L[e] || (M(t),
                L[e] = !0)
            }
            function P(e) {
                return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
            }
            function I(e, t) {
                var i, n = f({}, e);
                for (i in t)
                    d(t, i) && (a(e[i]) && a(t[i]) ? (n[i] = {},
                    f(n[i], e[i]),
                    f(n[i], t[i])) : null != t[i] ? n[i] = t[i] : delete n[i]);
                for (i in e)
                    d(e, i) && !d(t, i) && a(e[i]) && (n[i] = f({}, n[i]));
                return n
            }
            function x(e) {
                null != e && this.set(e)
            }
            s.suppressDeprecationWarnings = !1,
            s.deprecationHandler = null,
            T = Object.keys ? Object.keys : function(e) {
                var t, i = [];
                for (t in e)
                    d(e, t) && i.push(t);
                return i
            }
            ;
            var R = {};
            function A(e, t) {
                var i = e.toLowerCase();
                R[i] = R[i + "s"] = R[t] = e
            }
            function F(e) {
                return "string" == typeof e ? R[e] || R[e.toLowerCase()] : void 0
            }
            function O(e) {
                var t, i, n = {};
                for (i in e)
                    d(e, i) && (t = F(i)) && (n[t] = e[i]);
                return n
            }
            var Y = {};
            function E(e, t) {
                Y[e] = t
            }
            function H(e) {
                var t = [];
                for (var i in e)
                    t.push({
                        unit: i,
                        priority: Y[i]
                    });
                return t.sort(function(e, t) {
                    return e.priority - t.priority
                }),
                t
            }
            function G(e, t, i) {
                var n = "" + Math.abs(e)
                  , s = t - n.length;
                return (e >= 0 ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n
            }
            var U = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g
              , W = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g
              , z = {}
              , j = {};
            function V(e, t, i, n) {
                var s = n;
                "string" == typeof n && (s = function() {
                    return this[n]()
                }
                ),
                e && (j[e] = s),
                t && (j[t[0]] = function() {
                    return G(s.apply(this, arguments), t[1], t[2])
                }
                ),
                i && (j[i] = function() {
                    return this.localeData().ordinal(s.apply(this, arguments), e)
                }
                )
            }
            function J(e) {
                return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
            }
            function Z(e) {
                var t, i, n = e.match(U);
                for (t = 0,
                i = n.length; t < i; t++)
                    j[n[t]] ? n[t] = j[n[t]] : n[t] = J(n[t]);
                return function(t) {
                    var s, o = "";
                    for (s = 0; s < i; s++)
                        o += P(n[s]) ? n[s].call(t, e) : n[s];
                    return o
                }
            }
            function X(e, t) {
                return e.isValid() ? (t = q(t, e.localeData()),
                z[t] = z[t] || Z(t),
                z[t](e)) : e.localeData().invalidDate()
            }
            function q(e, t) {
                var i = 5;
                function n(e) {
                    return t.longDateFormat(e) || e
                }
                for (W.lastIndex = 0; i >= 0 && W.test(e); )
                    e = e.replace(W, n),
                    W.lastIndex = 0,
                    i -= 1;
                return e
            }
            var K = /\d/
              , $ = /\d\d/
              , Q = /\d{3}/
              , ee = /\d{4}/
              , te = /[+-]?\d{6}/
              , ie = /\d\d?/
              , ne = /\d\d\d\d?/
              , se = /\d\d\d\d\d\d?/
              , oe = /\d{1,3}/
              , ae = /\d{1,4}/
              , re = /[+-]?\d{1,6}/
              , ce = /\d+/
              , le = /[+-]?\d+/
              , ue = /Z|[+-]\d\d:?\d\d/gi
              , he = /Z|[+-]\d\d(?::?\d\d)?/gi
              , de = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i
              , fe = {};
            function me(e, t, i) {
                fe[e] = P(t) ? t : function(e, n) {
                    return e && i ? i : t
                }
            }
            function ge(e, t) {
                return d(fe, e) ? fe[e](t._strict, t._locale) : new RegExp(pe(e))
            }
            function pe(e) {
                return ye(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, i, n, s) {
                    return t || i || n || s
                }))
            }
            function ye(e) {
                return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
            }
            var ve = {};
            function _e(e, t) {
                var i, n = t;
                for ("string" == typeof e && (e = [e]),
                l(t) && (n = function(e, i) {
                    i[t] = C(e)
                }
                ),
                i = 0; i < e.length; i++)
                    ve[e[i]] = n
            }
            function ke(e, t) {
                _e(e, function(e, i, n, s) {
                    n._w = n._w || {},
                    t(e, n._w, n, s)
                })
            }
            function we(e, t, i) {
                null != t && d(ve, e) && ve[e](t, i._a, i, e)
            }
            var be = 0
              , Se = 1
              , Ce = 2
              , Be = 3
              , Me = 4
              , De = 5
              , Te = 6
              , Le = 7
              , Ne = 8;
            function Pe(e) {
                return Ie(e) ? 366 : 365
            }
            function Ie(e) {
                return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
            }
            V("Y", 0, 0, function() {
                var e = this.year();
                return e <= 9999 ? "" + e : "+" + e
            }),
            V(0, ["YY", 2], 0, function() {
                return this.year() % 100
            }),
            V(0, ["YYYY", 4], 0, "year"),
            V(0, ["YYYYY", 5], 0, "year"),
            V(0, ["YYYYYY", 6, !0], 0, "year"),
            A("year", "y"),
            E("year", 1),
            me("Y", le),
            me("YY", ie, $),
            me("YYYY", ae, ee),
            me("YYYYY", re, te),
            me("YYYYYY", re, te),
            _e(["YYYYY", "YYYYYY"], be),
            _e("YYYY", function(e, t) {
                t[be] = 2 === e.length ? s.parseTwoDigitYear(e) : C(e)
            }),
            _e("YY", function(e, t) {
                t[be] = s.parseTwoDigitYear(e)
            }),
            _e("Y", function(e, t) {
                t[be] = parseInt(e, 10)
            }),
            s.parseTwoDigitYear = function(e) {
                return C(e) + (C(e) > 68 ? 1900 : 2e3)
            }
            ;
            var xe, Re = Ae("FullYear", !0);
            function Ae(e, t) {
                return function(i) {
                    return null != i ? (Oe(this, e, i),
                    s.updateOffset(this, t),
                    this) : Fe(this, e)
                }
            }
            function Fe(e, t) {
                return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
            }
            function Oe(e, t, i) {
                e.isValid() && !isNaN(i) && ("FullYear" === t && Ie(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](i, e.month(), Ee(i, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](i))
            }
            function Ye(e, t) {
                return (e % t + t) % t
            }
            function Ee(e, t) {
                if (isNaN(e) || isNaN(t))
                    return NaN;
                var i = Ye(t, 12);
                return e += (t - i) / 12,
                1 === i ? Ie(e) ? 29 : 28 : 31 - i % 7 % 2
            }
            xe = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
                var t;
                for (t = 0; t < this.length; ++t)
                    if (this[t] === e)
                        return t;
                return -1
            }
            ,
            V("M", ["MM", 2], "Mo", function() {
                return this.month() + 1
            }),
            V("MMM", 0, 0, function(e) {
                return this.localeData().monthsShort(this, e)
            }),
            V("MMMM", 0, 0, function(e) {
                return this.localeData().months(this, e)
            }),
            A("month", "M"),
            E("month", 8),
            me("M", ie),
            me("MM", ie, $),
            me("MMM", function(e, t) {
                return t.monthsShortRegex(e)
            }),
            me("MMMM", function(e, t) {
                return t.monthsRegex(e)
            }),
            _e(["M", "MM"], function(e, t) {
                t[Se] = C(e) - 1
            }),
            _e(["MMM", "MMMM"], function(e, t, i, n) {
                var s = i._locale.monthsParse(e, n, i._strict);
                null != s ? t[Se] = s : g(i).invalidMonth = e
            });
            var He = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/
              , Ge = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
            var Ue = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
            function We(e, t, i) {
                var n, s, o, a = e.toLocaleLowerCase();
                if (!this._monthsParse)
                    for (this._monthsParse = [],
                    this._longMonthsParse = [],
                    this._shortMonthsParse = [],
                    n = 0; n < 12; ++n)
                        o = m([2e3, n]),
                        this._shortMonthsParse[n] = this.monthsShort(o, "").toLocaleLowerCase(),
                        this._longMonthsParse[n] = this.months(o, "").toLocaleLowerCase();
                return i ? "MMM" === t ? -1 !== (s = xe.call(this._shortMonthsParse, a)) ? s : null : -1 !== (s = xe.call(this._longMonthsParse, a)) ? s : null : "MMM" === t ? -1 !== (s = xe.call(this._shortMonthsParse, a)) ? s : -1 !== (s = xe.call(this._longMonthsParse, a)) ? s : null : -1 !== (s = xe.call(this._longMonthsParse, a)) ? s : -1 !== (s = xe.call(this._shortMonthsParse, a)) ? s : null
            }
            function ze(e, t) {
                var i;
                if (!e.isValid())
                    return e;
                if ("string" == typeof t)
                    if (/^\d+$/.test(t))
                        t = C(t);
                    else if (!l(t = e.localeData().monthsParse(t)))
                        return e;
                return i = Math.min(e.date(), Ee(e.year(), t)),
                e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, i),
                e
            }
            function je(e) {
                return null != e ? (ze(this, e),
                s.updateOffset(this, !0),
                this) : Fe(this, "Month")
            }
            var Ve = de;
            var Je = de;
            function Ze() {
                function e(e, t) {
                    return t.length - e.length
                }
                var t, i, n = [], s = [], o = [];
                for (t = 0; t < 12; t++)
                    i = m([2e3, t]),
                    n.push(this.monthsShort(i, "")),
                    s.push(this.months(i, "")),
                    o.push(this.months(i, "")),
                    o.push(this.monthsShort(i, ""));
                for (n.sort(e),
                s.sort(e),
                o.sort(e),
                t = 0; t < 12; t++)
                    n[t] = ye(n[t]),
                    s[t] = ye(s[t]);
                for (t = 0; t < 24; t++)
                    o[t] = ye(o[t]);
                this._monthsRegex = new RegExp("^(" + o.join("|") + ")","i"),
                this._monthsShortRegex = this._monthsRegex,
                this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")","i"),
                this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")","i")
            }
            function Xe(e, t, i, n, s, o, a) {
                var r = new Date(e,t,i,n,s,o,a);
                return e < 100 && e >= 0 && isFinite(r.getFullYear()) && r.setFullYear(e),
                r
            }
            function qe(e) {
                var t = new Date(Date.UTC.apply(null, arguments));
                return e < 100 && e >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e),
                t
            }
            function Ke(e, t, i) {
                var n = 7 + t - i;
                return -((7 + qe(e, 0, n).getUTCDay() - t) % 7) + n - 1
            }
            function $e(e, t, i, n, s) {
                var o, a, r = 1 + 7 * (t - 1) + (7 + i - n) % 7 + Ke(e, n, s);
                return r <= 0 ? a = Pe(o = e - 1) + r : r > Pe(e) ? (o = e + 1,
                a = r - Pe(e)) : (o = e,
                a = r),
                {
                    year: o,
                    dayOfYear: a
                }
            }
            function Qe(e, t, i) {
                var n, s, o = Ke(e.year(), t, i), a = Math.floor((e.dayOfYear() - o - 1) / 7) + 1;
                return a < 1 ? n = a + et(s = e.year() - 1, t, i) : a > et(e.year(), t, i) ? (n = a - et(e.year(), t, i),
                s = e.year() + 1) : (s = e.year(),
                n = a),
                {
                    week: n,
                    year: s
                }
            }
            function et(e, t, i) {
                var n = Ke(e, t, i)
                  , s = Ke(e + 1, t, i);
                return (Pe(e) - n + s) / 7
            }
            V("w", ["ww", 2], "wo", "week"),
            V("W", ["WW", 2], "Wo", "isoWeek"),
            A("week", "w"),
            A("isoWeek", "W"),
            E("week", 5),
            E("isoWeek", 5),
            me("w", ie),
            me("ww", ie, $),
            me("W", ie),
            me("WW", ie, $),
            ke(["w", "ww", "W", "WW"], function(e, t, i, n) {
                t[n.substr(0, 1)] = C(e)
            });
            function tt(e, t) {
                return "string" != typeof e ? e : isNaN(e) ? "number" == typeof (e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10)
            }
            function it(e, t) {
                return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
            }
            V("d", 0, "do", "day"),
            V("dd", 0, 0, function(e) {
                return this.localeData().weekdaysMin(this, e)
            }),
            V("ddd", 0, 0, function(e) {
                return this.localeData().weekdaysShort(this, e)
            }),
            V("dddd", 0, 0, function(e) {
                return this.localeData().weekdays(this, e)
            }),
            V("e", 0, 0, "weekday"),
            V("E", 0, 0, "isoWeekday"),
            A("day", "d"),
            A("weekday", "e"),
            A("isoWeekday", "E"),
            E("day", 11),
            E("weekday", 11),
            E("isoWeekday", 11),
            me("d", ie),
            me("e", ie),
            me("E", ie),
            me("dd", function(e, t) {
                return t.weekdaysMinRegex(e)
            }),
            me("ddd", function(e, t) {
                return t.weekdaysShortRegex(e)
            }),
            me("dddd", function(e, t) {
                return t.weekdaysRegex(e)
            }),
            ke(["dd", "ddd", "dddd"], function(e, t, i, n) {
                var s = i._locale.weekdaysParse(e, n, i._strict);
                null != s ? t.d = s : g(i).invalidWeekday = e
            }),
            ke(["d", "e", "E"], function(e, t, i, n) {
                t[n] = C(e)
            });
            var nt = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
            var st = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
            var ot = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
            function at(e, t, i) {
                var n, s, o, a = e.toLocaleLowerCase();
                if (!this._weekdaysParse)
                    for (this._weekdaysParse = [],
                    this._shortWeekdaysParse = [],
                    this._minWeekdaysParse = [],
                    n = 0; n < 7; ++n)
                        o = m([2e3, 1]).day(n),
                        this._minWeekdaysParse[n] = this.weekdaysMin(o, "").toLocaleLowerCase(),
                        this._shortWeekdaysParse[n] = this.weekdaysShort(o, "").toLocaleLowerCase(),
                        this._weekdaysParse[n] = this.weekdays(o, "").toLocaleLowerCase();
                return i ? "dddd" === t ? -1 !== (s = xe.call(this._weekdaysParse, a)) ? s : null : "ddd" === t ? -1 !== (s = xe.call(this._shortWeekdaysParse, a)) ? s : null : -1 !== (s = xe.call(this._minWeekdaysParse, a)) ? s : null : "dddd" === t ? -1 !== (s = xe.call(this._weekdaysParse, a)) ? s : -1 !== (s = xe.call(this._shortWeekdaysParse, a)) ? s : -1 !== (s = xe.call(this._minWeekdaysParse, a)) ? s : null : "ddd" === t ? -1 !== (s = xe.call(this._shortWeekdaysParse, a)) ? s : -1 !== (s = xe.call(this._weekdaysParse, a)) ? s : -1 !== (s = xe.call(this._minWeekdaysParse, a)) ? s : null : -1 !== (s = xe.call(this._minWeekdaysParse, a)) ? s : -1 !== (s = xe.call(this._weekdaysParse, a)) ? s : -1 !== (s = xe.call(this._shortWeekdaysParse, a)) ? s : null
            }
            var rt = de;
            var ct = de;
            var lt = de;
            function ut() {
                function e(e, t) {
                    return t.length - e.length
                }
                var t, i, n, s, o, a = [], r = [], c = [], l = [];
                for (t = 0; t < 7; t++)
                    i = m([2e3, 1]).day(t),
                    n = this.weekdaysMin(i, ""),
                    s = this.weekdaysShort(i, ""),
                    o = this.weekdays(i, ""),
                    a.push(n),
                    r.push(s),
                    c.push(o),
                    l.push(n),
                    l.push(s),
                    l.push(o);
                for (a.sort(e),
                r.sort(e),
                c.sort(e),
                l.sort(e),
                t = 0; t < 7; t++)
                    r[t] = ye(r[t]),
                    c[t] = ye(c[t]),
                    l[t] = ye(l[t]);
                this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")","i"),
                this._weekdaysShortRegex = this._weekdaysRegex,
                this._weekdaysMinRegex = this._weekdaysRegex,
                this._weekdaysStrictRegex = new RegExp("^(" + c.join("|") + ")","i"),
                this._weekdaysShortStrictRegex = new RegExp("^(" + r.join("|") + ")","i"),
                this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")","i")
            }
            function ht() {
                return this.hours() % 12 || 12
            }
            function dt(e, t) {
                V(e, 0, 0, function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), t)
                })
            }
            function ft(e, t) {
                return t._meridiemParse
            }
            V("H", ["HH", 2], 0, "hour"),
            V("h", ["hh", 2], 0, ht),
            V("k", ["kk", 2], 0, function() {
                return this.hours() || 24
            }),
            V("hmm", 0, 0, function() {
                return "" + ht.apply(this) + G(this.minutes(), 2)
            }),
            V("hmmss", 0, 0, function() {
                return "" + ht.apply(this) + G(this.minutes(), 2) + G(this.seconds(), 2)
            }),
            V("Hmm", 0, 0, function() {
                return "" + this.hours() + G(this.minutes(), 2)
            }),
            V("Hmmss", 0, 0, function() {
                return "" + this.hours() + G(this.minutes(), 2) + G(this.seconds(), 2)
            }),
            dt("a", !0),
            dt("A", !1),
            A("hour", "h"),
            E("hour", 13),
            me("a", ft),
            me("A", ft),
            me("H", ie),
            me("h", ie),
            me("k", ie),
            me("HH", ie, $),
            me("hh", ie, $),
            me("kk", ie, $),
            me("hmm", ne),
            me("hmmss", se),
            me("Hmm", ne),
            me("Hmmss", se),
            _e(["H", "HH"], Be),
            _e(["k", "kk"], function(e, t, i) {
                var n = C(e);
                t[Be] = 24 === n ? 0 : n
            }),
            _e(["a", "A"], function(e, t, i) {
                i._isPm = i._locale.isPM(e),
                i._meridiem = e
            }),
            _e(["h", "hh"], function(e, t, i) {
                t[Be] = C(e),
                g(i).bigHour = !0
            }),
            _e("hmm", function(e, t, i) {
                var n = e.length - 2;
                t[Be] = C(e.substr(0, n)),
                t[Me] = C(e.substr(n)),
                g(i).bigHour = !0
            }),
            _e("hmmss", function(e, t, i) {
                var n = e.length - 4
                  , s = e.length - 2;
                t[Be] = C(e.substr(0, n)),
                t[Me] = C(e.substr(n, 2)),
                t[De] = C(e.substr(s)),
                g(i).bigHour = !0
            }),
            _e("Hmm", function(e, t, i) {
                var n = e.length - 2;
                t[Be] = C(e.substr(0, n)),
                t[Me] = C(e.substr(n))
            }),
            _e("Hmmss", function(e, t, i) {
                var n = e.length - 4
                  , s = e.length - 2;
                t[Be] = C(e.substr(0, n)),
                t[Me] = C(e.substr(n, 2)),
                t[De] = C(e.substr(s))
            });
            var mt, gt = Ae("Hours", !0), pt = {
                calendar: {
                    sameDay: "[Today at] LT",
                    nextDay: "[Tomorrow at] LT",
                    nextWeek: "dddd [at] LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[Last] dddd [at] LT",
                    sameElse: "L"
                },
                longDateFormat: {
                    LTS: "h:mm:ss A",
                    LT: "h:mm A",
                    L: "MM/DD/YYYY",
                    LL: "MMMM D, YYYY",
                    LLL: "MMMM D, YYYY h:mm A",
                    LLLL: "dddd, MMMM D, YYYY h:mm A"
                },
                invalidDate: "Invalid date",
                ordinal: "%d",
                dayOfMonthOrdinalParse: /\d{1,2}/,
                relativeTime: {
                    future: "in %s",
                    past: "%s ago",
                    s: "a few seconds",
                    ss: "%d seconds",
                    m: "a minute",
                    mm: "%d minutes",
                    h: "an hour",
                    hh: "%d hours",
                    d: "a day",
                    dd: "%d days",
                    M: "a month",
                    MM: "%d months",
                    y: "a year",
                    yy: "%d years"
                },
                months: Ge,
                monthsShort: Ue,
                week: {
                    dow: 0,
                    doy: 6
                },
                weekdays: nt,
                weekdaysMin: ot,
                weekdaysShort: st,
                meridiemParse: /[ap]\.?m?\.?/i
            }, yt = {}, vt = {};
            function _t(e) {
                return e ? e.toLowerCase().replace("_", "-") : e
            }
            function kt(e) {
                for (var t, i, n, s, o = 0; o < e.length; ) {
                    for (t = (s = _t(e[o]).split("-")).length,
                    i = (i = _t(e[o + 1])) ? i.split("-") : null; t > 0; ) {
                        if (n = wt(s.slice(0, t).join("-")))
                            return n;
                        if (i && i.length >= t && B(s, i, !0) >= t - 1)
                            break;
                        t--
                    }
                    o++
                }
                return mt
            }
            function wt(i) {
                var n = null;
                if (!yt[i] && void 0 !== t && t && t.exports)
                    try {
                        n = mt._abbr,
                        e("./locale/" + i),
                        bt(n)
                    } catch (e) {}
                return yt[i]
            }
            function bt(e, t) {
                var i;
                return e && ((i = c(t) ? Ct(e) : St(e, t)) ? mt = i : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")),
                mt._abbr
            }
            function St(e, t) {
                if (null !== t) {
                    var i, n = pt;
                    if (t.abbr = e,
                    null != yt[e])
                        N("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),
                        n = yt[e]._config;
                    else if (null != t.parentLocale)
                        if (null != yt[t.parentLocale])
                            n = yt[t.parentLocale]._config;
                        else {
                            if (null == (i = wt(t.parentLocale)))
                                return vt[t.parentLocale] || (vt[t.parentLocale] = []),
                                vt[t.parentLocale].push({
                                    name: e,
                                    config: t
                                }),
                                null;
                            n = i._config
                        }
                    return yt[e] = new x(I(n, t)),
                    vt[e] && vt[e].forEach(function(e) {
                        St(e.name, e.config)
                    }),
                    bt(e),
                    yt[e]
                }
                return delete yt[e],
                null
            }
            function Ct(e) {
                var t;
                if (e && e._locale && e._locale._abbr && (e = e._locale._abbr),
                !e)
                    return mt;
                if (!o(e)) {
                    if (t = wt(e))
                        return t;
                    e = [e]
                }
                return kt(e)
            }
            function Bt(e) {
                var t, i = e._a;
                return i && -2 === g(e).overflow && (t = i[Se] < 0 || i[Se] > 11 ? Se : i[Ce] < 1 || i[Ce] > Ee(i[be], i[Se]) ? Ce : i[Be] < 0 || i[Be] > 24 || 24 === i[Be] && (0 !== i[Me] || 0 !== i[De] || 0 !== i[Te]) ? Be : i[Me] < 0 || i[Me] > 59 ? Me : i[De] < 0 || i[De] > 59 ? De : i[Te] < 0 || i[Te] > 999 ? Te : -1,
                g(e)._overflowDayOfYear && (t < be || t > Ce) && (t = Ce),
                g(e)._overflowWeeks && -1 === t && (t = Le),
                g(e)._overflowWeekday && -1 === t && (t = Ne),
                g(e).overflow = t),
                e
            }
            function Mt(e, t, i) {
                return null != e ? e : null != t ? t : i
            }
            function Dt(e) {
                var t = new Date(s.now());
                return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
            }
            function Tt(e) {
                var t, i, n, s, o, a = [];
                if (!e._d) {
                    for (n = Dt(e),
                    e._w && null == e._a[Ce] && null == e._a[Se] && Lt(e),
                    null != e._dayOfYear && (o = Mt(e._a[be], n[be]),
                    (e._dayOfYear > Pe(o) || 0 === e._dayOfYear) && (g(e)._overflowDayOfYear = !0),
                    i = qe(o, 0, e._dayOfYear),
                    e._a[Se] = i.getUTCMonth(),
                    e._a[Ce] = i.getUTCDate()),
                    t = 0; t < 3 && null == e._a[t]; ++t)
                        e._a[t] = a[t] = n[t];
                    for (; t < 7; t++)
                        e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
                    24 === e._a[Be] && 0 === e._a[Me] && 0 === e._a[De] && 0 === e._a[Te] && (e._nextDay = !0,
                    e._a[Be] = 0),
                    e._d = (e._useUTC ? qe : Xe).apply(null, a),
                    s = e._useUTC ? e._d.getUTCDay() : e._d.getDay(),
                    null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
                    e._nextDay && (e._a[Be] = 24),
                    e._w && void 0 !== e._w.d && e._w.d !== s && (g(e).weekdayMismatch = !0)
                }
            }
            function Lt(e) {
                var t, i, n, s, o, a, r, c;
                if (null != (t = e._w).GG || null != t.W || null != t.E)
                    o = 1,
                    a = 4,
                    i = Mt(t.GG, e._a[be], Qe(ei(), 1, 4).year),
                    n = Mt(t.W, 1),
                    ((s = Mt(t.E, 1)) < 1 || s > 7) && (c = !0);
                else {
                    o = e._locale._week.dow,
                    a = e._locale._week.doy;
                    var l = Qe(ei(), o, a);
                    i = Mt(t.gg, e._a[be], l.year),
                    n = Mt(t.w, l.week),
                    null != t.d ? ((s = t.d) < 0 || s > 6) && (c = !0) : null != t.e ? (s = t.e + o,
                    (t.e < 0 || t.e > 6) && (c = !0)) : s = o
                }
                n < 1 || n > et(i, o, a) ? g(e)._overflowWeeks = !0 : null != c ? g(e)._overflowWeekday = !0 : (r = $e(i, n, s, o, a),
                e._a[be] = r.year,
                e._dayOfYear = r.dayOfYear)
            }
            var Nt = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
              , Pt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
              , It = /Z|[+-]\d\d(?::?\d\d)?/
              , xt = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]]
              , Rt = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]]
              , At = /^\/?Date\((\-?\d+)/i;
            function Ft(e) {
                var t, i, n, s, o, a, r = e._i, c = Nt.exec(r) || Pt.exec(r);
                if (c) {
                    for (g(e).iso = !0,
                    t = 0,
                    i = xt.length; t < i; t++)
                        if (xt[t][1].exec(c[1])) {
                            s = xt[t][0],
                            n = !1 !== xt[t][2];
                            break
                        }
                    if (null == s)
                        return void (e._isValid = !1);
                    if (c[3]) {
                        for (t = 0,
                        i = Rt.length; t < i; t++)
                            if (Rt[t][1].exec(c[3])) {
                                o = (c[2] || " ") + Rt[t][0];
                                break
                            }
                        if (null == o)
                            return void (e._isValid = !1)
                    }
                    if (!n && null != o)
                        return void (e._isValid = !1);
                    if (c[4]) {
                        if (!It.exec(c[4]))
                            return void (e._isValid = !1);
                        a = "Z"
                    }
                    e._f = s + (o || "") + (a || ""),
                    Vt(e)
                } else
                    e._isValid = !1
            }
            var Ot = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
            function Yt(e, t, i, n, s, o) {
                var a = [Et(e), Ue.indexOf(t), parseInt(i, 10), parseInt(n, 10), parseInt(s, 10)];
                return o && a.push(parseInt(o, 10)),
                a
            }
            function Et(e) {
                var t = parseInt(e, 10);
                return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t
            }
            function Ht(e) {
                return e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            }
            function Gt(e, t, i) {
                if (e && st.indexOf(e) !== new Date(t[0],t[1],t[2]).getDay())
                    return g(i).weekdayMismatch = !0,
                    i._isValid = !1,
                    !1;
                return !0
            }
            var Ut = {
                UT: 0,
                GMT: 0,
                EDT: -240,
                EST: -300,
                CDT: -300,
                CST: -360,
                MDT: -360,
                MST: -420,
                PDT: -420,
                PST: -480
            };
            function Wt(e, t, i) {
                if (e)
                    return Ut[e];
                if (t)
                    return 0;
                var n = parseInt(i, 10)
                  , s = n % 100;
                return 60 * ((n - s) / 100) + s
            }
            function zt(e) {
                var t = Ot.exec(Ht(e._i));
                if (t) {
                    var i = Yt(t[4], t[3], t[2], t[5], t[6], t[7]);
                    if (!Gt(t[1], i, e))
                        return;
                    e._a = i,
                    e._tzm = Wt(t[8], t[9], t[10]),
                    e._d = qe.apply(null, e._a),
                    e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
                    g(e).rfc2822 = !0
                } else
                    e._isValid = !1
            }
            function jt(e) {
                var t = At.exec(e._i);
                null === t ? (Ft(e),
                !1 === e._isValid && (delete e._isValid,
                zt(e),
                !1 === e._isValid && (delete e._isValid,
                s.createFromInputFallback(e)))) : e._d = new Date(+t[1])
            }
            function Vt(e) {
                if (e._f !== s.ISO_8601)
                    if (e._f !== s.RFC_2822) {
                        e._a = [],
                        g(e).empty = !0;
                        var t, i, n, o, a, r = "" + e._i, c = r.length, l = 0;
                        for (n = q(e._f, e._locale).match(U) || [],
                        t = 0; t < n.length; t++)
                            o = n[t],
                            (i = (r.match(ge(o, e)) || [])[0]) && ((a = r.substr(0, r.indexOf(i))).length > 0 && g(e).unusedInput.push(a),
                            r = r.slice(r.indexOf(i) + i.length),
                            l += i.length),
                            j[o] ? (i ? g(e).empty = !1 : g(e).unusedTokens.push(o),
                            we(o, i, e)) : e._strict && !i && g(e).unusedTokens.push(o);
                        g(e).charsLeftOver = c - l,
                        r.length > 0 && g(e).unusedInput.push(r),
                        e._a[Be] <= 12 && !0 === g(e).bigHour && e._a[Be] > 0 && (g(e).bigHour = void 0),
                        g(e).parsedDateParts = e._a.slice(0),
                        g(e).meridiem = e._meridiem,
                        e._a[Be] = Jt(e._locale, e._a[Be], e._meridiem),
                        Tt(e),
                        Bt(e)
                    } else
                        zt(e);
                else
                    Ft(e)
            }
            function Jt(e, t, i) {
                var n;
                return null == i ? t : null != e.meridiemHour ? e.meridiemHour(t, i) : null != e.isPM ? ((n = e.isPM(i)) && t < 12 && (t += 12),
                n || 12 !== t || (t = 0),
                t) : t
            }
            function Zt(e) {
                var t, i, n, s, o;
                if (0 === e._f.length)
                    return g(e).invalidFormat = !0,
                    void (e._d = new Date(NaN));
                for (s = 0; s < e._f.length; s++)
                    o = 0,
                    t = _({}, e),
                    null != e._useUTC && (t._useUTC = e._useUTC),
                    t._f = e._f[s],
                    Vt(t),
                    p(t) && (o += g(t).charsLeftOver,
                    o += 10 * g(t).unusedTokens.length,
                    g(t).score = o,
                    (null == n || o < n) && (n = o,
                    i = t));
                f(e, i || t)
            }
            function Xt(e) {
                if (!e._d) {
                    var t = O(e._i);
                    e._a = h([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
                        return e && parseInt(e, 10)
                    }),
                    Tt(e)
                }
            }
            function qt(e) {
                var t = new w(Bt(Kt(e)));
                return t._nextDay && (t.add(1, "d"),
                t._nextDay = void 0),
                t
            }
            function Kt(e) {
                var t = e._i
                  , i = e._f;
                return e._locale = e._locale || Ct(e._l),
                null === t || void 0 === i && "" === t ? y({
                    nullInput: !0
                }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)),
                b(t) ? new w(Bt(t)) : (u(t) ? e._d = t : o(i) ? Zt(e) : i ? Vt(e) : $t(e),
                p(e) || (e._d = null),
                e))
            }
            function $t(e) {
                var t = e._i;
                c(t) ? e._d = new Date(s.now()) : u(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? jt(e) : o(t) ? (e._a = h(t.slice(0), function(e) {
                    return parseInt(e, 10)
                }),
                Tt(e)) : a(t) ? Xt(e) : l(t) ? e._d = new Date(t) : s.createFromInputFallback(e)
            }
            function Qt(e, t, i, n, s) {
                var c = {};
                return !0 !== i && !1 !== i || (n = i,
                i = void 0),
                (a(e) && r(e) || o(e) && 0 === e.length) && (e = void 0),
                c._isAMomentObject = !0,
                c._useUTC = c._isUTC = s,
                c._l = i,
                c._i = e,
                c._f = t,
                c._strict = n,
                qt(c)
            }
            function ei(e, t, i, n) {
                return Qt(e, t, i, n, !1)
            }
            s.createFromInputFallback = D("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
                e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
            }),
            s.ISO_8601 = function() {}
            ,
            s.RFC_2822 = function() {}
            ;
            var ti = D("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                var e = ei.apply(null, arguments);
                return this.isValid() && e.isValid() ? e < this ? this : e : y()
            })
              , ii = D("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                var e = ei.apply(null, arguments);
                return this.isValid() && e.isValid() ? e > this ? this : e : y()
            });
            function ni(e, t) {
                var i, n;
                if (1 === t.length && o(t[0]) && (t = t[0]),
                !t.length)
                    return ei();
                for (i = t[0],
                n = 1; n < t.length; ++n)
                    t[n].isValid() && !t[n][e](i) || (i = t[n]);
                return i
            }
            var si = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
            function oi(e) {
                for (var t in e)
                    if (-1 === xe.call(si, t) || null != e[t] && isNaN(e[t]))
                        return !1;
                for (var i = !1, n = 0; n < si.length; ++n)
                    if (e[si[n]]) {
                        if (i)
                            return !1;
                        parseFloat(e[si[n]]) !== C(e[si[n]]) && (i = !0)
                    }
                return !0
            }
            function ai(e) {
                var t = O(e)
                  , i = t.year || 0
                  , n = t.quarter || 0
                  , s = t.month || 0
                  , o = t.week || 0
                  , a = t.day || 0
                  , r = t.hour || 0
                  , c = t.minute || 0
                  , l = t.second || 0
                  , u = t.millisecond || 0;
                this._isValid = oi(t),
                this._milliseconds = +u + 1e3 * l + 6e4 * c + 1e3 * r * 60 * 60,
                this._days = +a + 7 * o,
                this._months = +s + 3 * n + 12 * i,
                this._data = {},
                this._locale = Ct(),
                this._bubble()
            }
            function ri(e) {
                return e instanceof ai
            }
            function ci(e) {
                return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
            }
            function li(e, t) {
                V(e, 0, 0, function() {
                    var e = this.utcOffset()
                      , i = "+";
                    return e < 0 && (e = -e,
                    i = "-"),
                    i + G(~~(e / 60), 2) + t + G(~~e % 60, 2)
                })
            }
            li("Z", ":"),
            li("ZZ", ""),
            me("Z", he),
            me("ZZ", he),
            _e(["Z", "ZZ"], function(e, t, i) {
                i._useUTC = !0,
                i._tzm = hi(he, e)
            });
            var ui = /([\+\-]|\d\d)/gi;
            function hi(e, t) {
                var i = (t || "").match(e);
                if (null === i)
                    return null;
                var n = ((i[i.length - 1] || []) + "").match(ui) || ["-", 0, 0]
                  , s = 60 * n[1] + C(n[2]);
                return 0 === s ? 0 : "+" === n[0] ? s : -s
            }
            function di(e, t) {
                var i, n;
                return t._isUTC ? (i = t.clone(),
                n = (b(e) || u(e) ? e.valueOf() : ei(e).valueOf()) - i.valueOf(),
                i._d.setTime(i._d.valueOf() + n),
                s.updateOffset(i, !1),
                i) : ei(e).local()
            }
            function fi(e) {
                return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
            }
            function mi() {
                return !!this.isValid() && (this._isUTC && 0 === this._offset)
            }
            s.updateOffset = function() {}
            ;
            var gi = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/
              , pi = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
            function yi(e, t) {
                var i, n, s, o = e, a = null;
                return ri(e) ? o = {
                    ms: e._milliseconds,
                    d: e._days,
                    M: e._months
                } : l(e) ? (o = {},
                t ? o[t] = e : o.milliseconds = e) : (a = gi.exec(e)) ? (i = "-" === a[1] ? -1 : 1,
                o = {
                    y: 0,
                    d: C(a[Ce]) * i,
                    h: C(a[Be]) * i,
                    m: C(a[Me]) * i,
                    s: C(a[De]) * i,
                    ms: C(ci(1e3 * a[Te])) * i
                }) : (a = pi.exec(e)) ? (i = "-" === a[1] ? -1 : (a[1],
                1),
                o = {
                    y: vi(a[2], i),
                    M: vi(a[3], i),
                    w: vi(a[4], i),
                    d: vi(a[5], i),
                    h: vi(a[6], i),
                    m: vi(a[7], i),
                    s: vi(a[8], i)
                }) : null == o ? o = {} : "object" == typeof o && ("from"in o || "to"in o) && (s = ki(ei(o.from), ei(o.to)),
                (o = {}).ms = s.milliseconds,
                o.M = s.months),
                n = new ai(o),
                ri(e) && d(e, "_locale") && (n._locale = e._locale),
                n
            }
            function vi(e, t) {
                var i = e && parseFloat(e.replace(",", "."));
                return (isNaN(i) ? 0 : i) * t
            }
            function _i(e, t) {
                var i = {
                    milliseconds: 0,
                    months: 0
                };
                return i.months = t.month() - e.month() + 12 * (t.year() - e.year()),
                e.clone().add(i.months, "M").isAfter(t) && --i.months,
                i.milliseconds = +t - +e.clone().add(i.months, "M"),
                i
            }
            function ki(e, t) {
                var i;
                return e.isValid() && t.isValid() ? (t = di(t, e),
                e.isBefore(t) ? i = _i(e, t) : ((i = _i(t, e)).milliseconds = -i.milliseconds,
                i.months = -i.months),
                i) : {
                    milliseconds: 0,
                    months: 0
                }
            }
            function wi(e, t) {
                return function(i, n) {
                    var s;
                    return null === n || isNaN(+n) || (N(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),
                    s = i,
                    i = n,
                    n = s),
                    bi(this, yi(i = "string" == typeof i ? +i : i, n), e),
                    this
                }
            }
            function bi(e, t, i, n) {
                var o = t._milliseconds
                  , a = ci(t._days)
                  , r = ci(t._months);
                e.isValid() && (n = null == n || n,
                r && ze(e, Fe(e, "Month") + r * i),
                a && Oe(e, "Date", Fe(e, "Date") + a * i),
                o && e._d.setTime(e._d.valueOf() + o * i),
                n && s.updateOffset(e, a || r))
            }
            yi.fn = ai.prototype,
            yi.invalid = function() {
                return yi(NaN)
            }
            ;
            var Si = wi(1, "add")
              , Ci = wi(-1, "subtract");
            function Bi(e, t) {
                var i = 12 * (t.year() - e.year()) + (t.month() - e.month())
                  , n = e.clone().add(i, "months");
                return -(i + (t - n < 0 ? (t - n) / (n - e.clone().add(i - 1, "months")) : (t - n) / (e.clone().add(i + 1, "months") - n))) || 0
            }
            function Mi(e) {
                var t;
                return void 0 === e ? this._locale._abbr : (null != (t = Ct(e)) && (this._locale = t),
                this)
            }
            s.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
            s.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
            var Di = D("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
                return void 0 === e ? this.localeData() : this.locale(e)
            });
            function Ti() {
                return this._locale
            }
            function Li(e, t) {
                V(0, [e, e.length], 0, t)
            }
            function Ni(e, t, i, n, s) {
                var o;
                return null == e ? Qe(this, n, s).year : (t > (o = et(e, n, s)) && (t = o),
                Pi.call(this, e, t, i, n, s))
            }
            function Pi(e, t, i, n, s) {
                var o = $e(e, t, i, n, s)
                  , a = qe(o.year, 0, o.dayOfYear);
                return this.year(a.getUTCFullYear()),
                this.month(a.getUTCMonth()),
                this.date(a.getUTCDate()),
                this
            }
            V(0, ["gg", 2], 0, function() {
                return this.weekYear() % 100
            }),
            V(0, ["GG", 2], 0, function() {
                return this.isoWeekYear() % 100
            }),
            Li("gggg", "weekYear"),
            Li("ggggg", "weekYear"),
            Li("GGGG", "isoWeekYear"),
            Li("GGGGG", "isoWeekYear"),
            A("weekYear", "gg"),
            A("isoWeekYear", "GG"),
            E("weekYear", 1),
            E("isoWeekYear", 1),
            me("G", le),
            me("g", le),
            me("GG", ie, $),
            me("gg", ie, $),
            me("GGGG", ae, ee),
            me("gggg", ae, ee),
            me("GGGGG", re, te),
            me("ggggg", re, te),
            ke(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, i, n) {
                t[n.substr(0, 2)] = C(e)
            }),
            ke(["gg", "GG"], function(e, t, i, n) {
                t[n] = s.parseTwoDigitYear(e)
            }),
            V("Q", 0, "Qo", "quarter"),
            A("quarter", "Q"),
            E("quarter", 7),
            me("Q", K),
            _e("Q", function(e, t) {
                t[Se] = 3 * (C(e) - 1)
            }),
            V("D", ["DD", 2], "Do", "date"),
            A("date", "D"),
            E("date", 9),
            me("D", ie),
            me("DD", ie, $),
            me("Do", function(e, t) {
                return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
            }),
            _e(["D", "DD"], Ce),
            _e("Do", function(e, t) {
                t[Ce] = C(e.match(ie)[0])
            });
            var Ii = Ae("Date", !0);
            V("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
            A("dayOfYear", "DDD"),
            E("dayOfYear", 4),
            me("DDD", oe),
            me("DDDD", Q),
            _e(["DDD", "DDDD"], function(e, t, i) {
                i._dayOfYear = C(e)
            }),
            V("m", ["mm", 2], 0, "minute"),
            A("minute", "m"),
            E("minute", 14),
            me("m", ie),
            me("mm", ie, $),
            _e(["m", "mm"], Me);
            var xi = Ae("Minutes", !1);
            V("s", ["ss", 2], 0, "second"),
            A("second", "s"),
            E("second", 15),
            me("s", ie),
            me("ss", ie, $),
            _e(["s", "ss"], De);
            var Ri, Ai = Ae("Seconds", !1);
            for (V("S", 0, 0, function() {
                return ~~(this.millisecond() / 100)
            }),
            V(0, ["SS", 2], 0, function() {
                return ~~(this.millisecond() / 10)
            }),
            V(0, ["SSS", 3], 0, "millisecond"),
            V(0, ["SSSS", 4], 0, function() {
                return 10 * this.millisecond()
            }),
            V(0, ["SSSSS", 5], 0, function() {
                return 100 * this.millisecond()
            }),
            V(0, ["SSSSSS", 6], 0, function() {
                return 1e3 * this.millisecond()
            }),
            V(0, ["SSSSSSS", 7], 0, function() {
                return 1e4 * this.millisecond()
            }),
            V(0, ["SSSSSSSS", 8], 0, function() {
                return 1e5 * this.millisecond()
            }),
            V(0, ["SSSSSSSSS", 9], 0, function() {
                return 1e6 * this.millisecond()
            }),
            A("millisecond", "ms"),
            E("millisecond", 16),
            me("S", oe, K),
            me("SS", oe, $),
            me("SSS", oe, Q),
            Ri = "SSSS"; Ri.length <= 9; Ri += "S")
                me(Ri, ce);
            function Fi(e, t) {
                t[Te] = C(1e3 * ("0." + e))
            }
            for (Ri = "S"; Ri.length <= 9; Ri += "S")
                _e(Ri, Fi);
            var Oi = Ae("Milliseconds", !1);
            V("z", 0, 0, "zoneAbbr"),
            V("zz", 0, 0, "zoneName");
            var Yi = w.prototype;
            function Ei(e) {
                return e
            }
            Yi.add = Si,
            Yi.calendar = function(e, t) {
                var i = e || ei()
                  , n = di(i, this).startOf("day")
                  , o = s.calendarFormat(this, n) || "sameElse"
                  , a = t && (P(t[o]) ? t[o].call(this, i) : t[o]);
                return this.format(a || this.localeData().calendar(o, this, ei(i)))
            }
            ,
            Yi.clone = function() {
                return new w(this)
            }
            ,
            Yi.diff = function(e, t, i) {
                var n, s, o;
                if (!this.isValid())
                    return NaN;
                if (!(n = di(e, this)).isValid())
                    return NaN;
                switch (s = 6e4 * (n.utcOffset() - this.utcOffset()),
                t = F(t)) {
                case "year":
                    o = Bi(this, n) / 12;
                    break;
                case "month":
                    o = Bi(this, n);
                    break;
                case "quarter":
                    o = Bi(this, n) / 3;
                    break;
                case "second":
                    o = (this - n) / 1e3;
                    break;
                case "minute":
                    o = (this - n) / 6e4;
                    break;
                case "hour":
                    o = (this - n) / 36e5;
                    break;
                case "day":
                    o = (this - n - s) / 864e5;
                    break;
                case "week":
                    o = (this - n - s) / 6048e5;
                    break;
                default:
                    o = this - n
                }
                return i ? o : S(o)
            }
            ,
            Yi.endOf = function(e) {
                return void 0 === (e = F(e)) || "millisecond" === e ? this : ("date" === e && (e = "day"),
                this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"))
            }
            ,
            Yi.format = function(e) {
                e || (e = this.isUtc() ? s.defaultFormatUtc : s.defaultFormat);
                var t = X(this, e);
                return this.localeData().postformat(t)
            }
            ,
            Yi.from = function(e, t) {
                return this.isValid() && (b(e) && e.isValid() || ei(e).isValid()) ? yi({
                    to: this,
                    from: e
                }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
            }
            ,
            Yi.fromNow = function(e) {
                return this.from(ei(), e)
            }
            ,
            Yi.to = function(e, t) {
                return this.isValid() && (b(e) && e.isValid() || ei(e).isValid()) ? yi({
                    from: this,
                    to: e
                }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
            }
            ,
            Yi.toNow = function(e) {
                return this.to(ei(), e)
            }
            ,
            Yi.get = function(e) {
                return P(this[e = F(e)]) ? this[e]() : this
            }
            ,
            Yi.invalidAt = function() {
                return g(this).overflow
            }
            ,
            Yi.isAfter = function(e, t) {
                var i = b(e) ? e : ei(e);
                return !(!this.isValid() || !i.isValid()) && ("millisecond" === (t = F(c(t) ? "millisecond" : t)) ? this.valueOf() > i.valueOf() : i.valueOf() < this.clone().startOf(t).valueOf())
            }
            ,
            Yi.isBefore = function(e, t) {
                var i = b(e) ? e : ei(e);
                return !(!this.isValid() || !i.isValid()) && ("millisecond" === (t = F(c(t) ? "millisecond" : t)) ? this.valueOf() < i.valueOf() : this.clone().endOf(t).valueOf() < i.valueOf())
            }
            ,
            Yi.isBetween = function(e, t, i, n) {
                return ("(" === (n = n || "()")[0] ? this.isAfter(e, i) : !this.isBefore(e, i)) && (")" === n[1] ? this.isBefore(t, i) : !this.isAfter(t, i))
            }
            ,
            Yi.isSame = function(e, t) {
                var i, n = b(e) ? e : ei(e);
                return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = F(t || "millisecond")) ? this.valueOf() === n.valueOf() : (i = n.valueOf(),
                this.clone().startOf(t).valueOf() <= i && i <= this.clone().endOf(t).valueOf()))
            }
            ,
            Yi.isSameOrAfter = function(e, t) {
                return this.isSame(e, t) || this.isAfter(e, t)
            }
            ,
            Yi.isSameOrBefore = function(e, t) {
                return this.isSame(e, t) || this.isBefore(e, t)
            }
            ,
            Yi.isValid = function() {
                return p(this)
            }
            ,
            Yi.lang = Di,
            Yi.locale = Mi,
            Yi.localeData = Ti,
            Yi.max = ii,
            Yi.min = ti,
            Yi.parsingFlags = function() {
                return f({}, g(this))
            }
            ,
            Yi.set = function(e, t) {
                if ("object" == typeof e)
                    for (var i = H(e = O(e)), n = 0; n < i.length; n++)
                        this[i[n].unit](e[i[n].unit]);
                else if (P(this[e = F(e)]))
                    return this[e](t);
                return this
            }
            ,
            Yi.startOf = function(e) {
                switch (e = F(e)) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                case "date":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
                }
                return "week" === e && this.weekday(0),
                "isoWeek" === e && this.isoWeekday(1),
                "quarter" === e && this.month(3 * Math.floor(this.month() / 3)),
                this
            }
            ,
            Yi.subtract = Ci,
            Yi.toArray = function() {
                var e = this;
                return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
            }
            ,
            Yi.toObject = function() {
                var e = this;
                return {
                    years: e.year(),
                    months: e.month(),
                    date: e.date(),
                    hours: e.hours(),
                    minutes: e.minutes(),
                    seconds: e.seconds(),
                    milliseconds: e.milliseconds()
                }
            }
            ,
            Yi.toDate = function() {
                return new Date(this.valueOf())
            }
            ,
            Yi.toISOString = function(e) {
                if (!this.isValid())
                    return null;
                var t = !0 !== e
                  , i = t ? this.clone().utc() : this;
                return i.year() < 0 || i.year() > 9999 ? X(i, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : P(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", X(i, "Z")) : X(i, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
            }
            ,
            Yi.inspect = function() {
                if (!this.isValid())
                    return "moment.invalid(/* " + this._i + " */)";
                var e = "moment"
                  , t = "";
                this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone",
                t = "Z");
                var i = "[" + e + '("]'
                  , n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"
                  , s = t + '[")]';
                return this.format(i + n + "-MM-DD[T]HH:mm:ss.SSS" + s)
            }
            ,
            Yi.toJSON = function() {
                return this.isValid() ? this.toISOString() : null
            }
            ,
            Yi.toString = function() {
                return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            }
            ,
            Yi.unix = function() {
                return Math.floor(this.valueOf() / 1e3)
            }
            ,
            Yi.valueOf = function() {
                return this._d.valueOf() - 6e4 * (this._offset || 0)
            }
            ,
            Yi.creationData = function() {
                return {
                    input: this._i,
                    format: this._f,
                    locale: this._locale,
                    isUTC: this._isUTC,
                    strict: this._strict
                }
            }
            ,
            Yi.year = Re,
            Yi.isLeapYear = function() {
                return Ie(this.year())
            }
            ,
            Yi.weekYear = function(e) {
                return Ni.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
            }
            ,
            Yi.isoWeekYear = function(e) {
                return Ni.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
            }
            ,
            Yi.quarter = Yi.quarters = function(e) {
                return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
            }
            ,
            Yi.month = je,
            Yi.daysInMonth = function() {
                return Ee(this.year(), this.month())
            }
            ,
            Yi.week = Yi.weeks = function(e) {
                var t = this.localeData().week(this);
                return null == e ? t : this.add(7 * (e - t), "d")
            }
            ,
            Yi.isoWeek = Yi.isoWeeks = function(e) {
                var t = Qe(this, 1, 4).week;
                return null == e ? t : this.add(7 * (e - t), "d")
            }
            ,
            Yi.weeksInYear = function() {
                var e = this.localeData()._week;
                return et(this.year(), e.dow, e.doy)
            }
            ,
            Yi.isoWeeksInYear = function() {
                return et(this.year(), 1, 4)
            }
            ,
            Yi.date = Ii,
            Yi.day = Yi.days = function(e) {
                if (!this.isValid())
                    return null != e ? this : NaN;
                var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != e ? (e = tt(e, this.localeData()),
                this.add(e - t, "d")) : t
            }
            ,
            Yi.weekday = function(e) {
                if (!this.isValid())
                    return null != e ? this : NaN;
                var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
                return null == e ? t : this.add(e - t, "d")
            }
            ,
            Yi.isoWeekday = function(e) {
                if (!this.isValid())
                    return null != e ? this : NaN;
                if (null != e) {
                    var t = it(e, this.localeData());
                    return this.day(this.day() % 7 ? t : t - 7)
                }
                return this.day() || 7
            }
            ,
            Yi.dayOfYear = function(e) {
                var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                return null == e ? t : this.add(e - t, "d")
            }
            ,
            Yi.hour = Yi.hours = gt,
            Yi.minute = Yi.minutes = xi,
            Yi.second = Yi.seconds = Ai,
            Yi.millisecond = Yi.milliseconds = Oi,
            Yi.utcOffset = function(e, t, i) {
                var n, o = this._offset || 0;
                if (!this.isValid())
                    return null != e ? this : NaN;
                if (null != e) {
                    if ("string" == typeof e) {
                        if (null === (e = hi(he, e)))
                            return this
                    } else
                        Math.abs(e) < 16 && !i && (e *= 60);
                    return !this._isUTC && t && (n = fi(this)),
                    this._offset = e,
                    this._isUTC = !0,
                    null != n && this.add(n, "m"),
                    o !== e && (!t || this._changeInProgress ? bi(this, yi(e - o, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
                    s.updateOffset(this, !0),
                    this._changeInProgress = null)),
                    this
                }
                return this._isUTC ? o : fi(this)
            }
            ,
            Yi.utc = function(e) {
                return this.utcOffset(0, e)
            }
            ,
            Yi.local = function(e) {
                return this._isUTC && (this.utcOffset(0, e),
                this._isUTC = !1,
                e && this.subtract(fi(this), "m")),
                this
            }
            ,
            Yi.parseZone = function() {
                if (null != this._tzm)
                    this.utcOffset(this._tzm, !1, !0);
                else if ("string" == typeof this._i) {
                    var e = hi(ue, this._i);
                    null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
                }
                return this
            }
            ,
            Yi.hasAlignedHourOffset = function(e) {
                return !!this.isValid() && (e = e ? ei(e).utcOffset() : 0,
                (this.utcOffset() - e) % 60 == 0)
            }
            ,
            Yi.isDST = function() {
                return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
            }
            ,
            Yi.isLocal = function() {
                return !!this.isValid() && !this._isUTC
            }
            ,
            Yi.isUtcOffset = function() {
                return !!this.isValid() && this._isUTC
            }
            ,
            Yi.isUtc = mi,
            Yi.isUTC = mi,
            Yi.zoneAbbr = function() {
                return this._isUTC ? "UTC" : ""
            }
            ,
            Yi.zoneName = function() {
                return this._isUTC ? "Coordinated Universal Time" : ""
            }
            ,
            Yi.dates = D("dates accessor is deprecated. Use date instead.", Ii),
            Yi.months = D("months accessor is deprecated. Use month instead", je),
            Yi.years = D("years accessor is deprecated. Use year instead", Re),
            Yi.zone = D("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
                return null != e ? ("string" != typeof e && (e = -e),
                this.utcOffset(e, t),
                this) : -this.utcOffset()
            }),
            Yi.isDSTShifted = D("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
                if (!c(this._isDSTShifted))
                    return this._isDSTShifted;
                var e = {};
                if (_(e, this),
                (e = Kt(e))._a) {
                    var t = e._isUTC ? m(e._a) : ei(e._a);
                    this._isDSTShifted = this.isValid() && B(e._a, t.toArray()) > 0
                } else
                    this._isDSTShifted = !1;
                return this._isDSTShifted
            });
            var Hi = x.prototype;
            function Gi(e, t, i, n) {
                var s = Ct()
                  , o = m().set(n, t);
                return s[i](o, e)
            }
            function Ui(e, t, i) {
                if (l(e) && (t = e,
                e = void 0),
                e = e || "",
                null != t)
                    return Gi(e, t, i, "month");
                var n, s = [];
                for (n = 0; n < 12; n++)
                    s[n] = Gi(e, n, i, "month");
                return s
            }
            function Wi(e, t, i, n) {
                "boolean" == typeof e ? (l(t) && (i = t,
                t = void 0),
                t = t || "") : (i = t = e,
                e = !1,
                l(t) && (i = t,
                t = void 0),
                t = t || "");
                var s, o = Ct(), a = e ? o._week.dow : 0;
                if (null != i)
                    return Gi(t, (i + a) % 7, n, "day");
                var r = [];
                for (s = 0; s < 7; s++)
                    r[s] = Gi(t, (s + a) % 7, n, "day");
                return r
            }
            Hi.calendar = function(e, t, i) {
                var n = this._calendar[e] || this._calendar.sameElse;
                return P(n) ? n.call(t, i) : n
            }
            ,
            Hi.longDateFormat = function(e) {
                var t = this._longDateFormat[e]
                  , i = this._longDateFormat[e.toUpperCase()];
                return t || !i ? t : (this._longDateFormat[e] = i.replace(/MMMM|MM|DD|dddd/g, function(e) {
                    return e.slice(1)
                }),
                this._longDateFormat[e])
            }
            ,
            Hi.invalidDate = function() {
                return this._invalidDate
            }
            ,
            Hi.ordinal = function(e) {
                return this._ordinal.replace("%d", e)
            }
            ,
            Hi.preparse = Ei,
            Hi.postformat = Ei,
            Hi.relativeTime = function(e, t, i, n) {
                var s = this._relativeTime[i];
                return P(s) ? s(e, t, i, n) : s.replace(/%d/i, e)
            }
            ,
            Hi.pastFuture = function(e, t) {
                var i = this._relativeTime[e > 0 ? "future" : "past"];
                return P(i) ? i(t) : i.replace(/%s/i, t)
            }
            ,
            Hi.set = function(e) {
                var t, i;
                for (i in e)
                    P(t = e[i]) ? this[i] = t : this["_" + i] = t;
                this._config = e,
                this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
            }
            ,
            Hi.months = function(e, t) {
                return e ? o(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || He).test(t) ? "format" : "standalone"][e.month()] : o(this._months) ? this._months : this._months.standalone
            }
            ,
            Hi.monthsShort = function(e, t) {
                return e ? o(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[He.test(t) ? "format" : "standalone"][e.month()] : o(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
            }
            ,
            Hi.monthsParse = function(e, t, i) {
                var n, s, o;
                if (this._monthsParseExact)
                    return We.call(this, e, t, i);
                for (this._monthsParse || (this._monthsParse = [],
                this._longMonthsParse = [],
                this._shortMonthsParse = []),
                n = 0; n < 12; n++) {
                    if (s = m([2e3, n]),
                    i && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp("^" + this.months(s, "").replace(".", "") + "$","i"),
                    this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$","i")),
                    i || this._monthsParse[n] || (o = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""),
                    this._monthsParse[n] = new RegExp(o.replace(".", ""),"i")),
                    i && "MMMM" === t && this._longMonthsParse[n].test(e))
                        return n;
                    if (i && "MMM" === t && this._shortMonthsParse[n].test(e))
                        return n;
                    if (!i && this._monthsParse[n].test(e))
                        return n
                }
            }
            ,
            Hi.monthsRegex = function(e) {
                return this._monthsParseExact ? (d(this, "_monthsRegex") || Ze.call(this),
                e ? this._monthsStrictRegex : this._monthsRegex) : (d(this, "_monthsRegex") || (this._monthsRegex = Je),
                this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
            }
            ,
            Hi.monthsShortRegex = function(e) {
                return this._monthsParseExact ? (d(this, "_monthsRegex") || Ze.call(this),
                e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (d(this, "_monthsShortRegex") || (this._monthsShortRegex = Ve),
                this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
            }
            ,
            Hi.week = function(e) {
                return Qe(e, this._week.dow, this._week.doy).week
            }
            ,
            Hi.firstDayOfYear = function() {
                return this._week.doy
            }
            ,
            Hi.firstDayOfWeek = function() {
                return this._week.dow
            }
            ,
            Hi.weekdays = function(e, t) {
                return e ? o(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : o(this._weekdays) ? this._weekdays : this._weekdays.standalone
            }
            ,
            Hi.weekdaysMin = function(e) {
                return e ? this._weekdaysMin[e.day()] : this._weekdaysMin
            }
            ,
            Hi.weekdaysShort = function(e) {
                return e ? this._weekdaysShort[e.day()] : this._weekdaysShort
            }
            ,
            Hi.weekdaysParse = function(e, t, i) {
                var n, s, o;
                if (this._weekdaysParseExact)
                    return at.call(this, e, t, i);
                for (this._weekdaysParse || (this._weekdaysParse = [],
                this._minWeekdaysParse = [],
                this._shortWeekdaysParse = [],
                this._fullWeekdaysParse = []),
                n = 0; n < 7; n++) {
                    if (s = m([2e3, 1]).day(n),
                    i && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(s, "").replace(".", "\\.?") + "$","i"),
                    this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(s, "").replace(".", "\\.?") + "$","i"),
                    this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(s, "").replace(".", "\\.?") + "$","i")),
                    this._weekdaysParse[n] || (o = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""),
                    this._weekdaysParse[n] = new RegExp(o.replace(".", ""),"i")),
                    i && "dddd" === t && this._fullWeekdaysParse[n].test(e))
                        return n;
                    if (i && "ddd" === t && this._shortWeekdaysParse[n].test(e))
                        return n;
                    if (i && "dd" === t && this._minWeekdaysParse[n].test(e))
                        return n;
                    if (!i && this._weekdaysParse[n].test(e))
                        return n
                }
            }
            ,
            Hi.weekdaysRegex = function(e) {
                return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || ut.call(this),
                e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (d(this, "_weekdaysRegex") || (this._weekdaysRegex = rt),
                this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
            }
            ,
            Hi.weekdaysShortRegex = function(e) {
                return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || ut.call(this),
                e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (d(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = ct),
                this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
            }
            ,
            Hi.weekdaysMinRegex = function(e) {
                return this._weekdaysParseExact ? (d(this, "_weekdaysRegex") || ut.call(this),
                e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (d(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = lt),
                this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
            }
            ,
            Hi.isPM = function(e) {
                return "p" === (e + "").toLowerCase().charAt(0)
            }
            ,
            Hi.meridiem = function(e, t, i) {
                return e > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
            }
            ,
            bt("en", {
                dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                ordinal: function(e) {
                    var t = e % 10;
                    return e + (1 === C(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
                }
            }),
            s.lang = D("moment.lang is deprecated. Use moment.locale instead.", bt),
            s.langData = D("moment.langData is deprecated. Use moment.localeData instead.", Ct);
            var zi = Math.abs;
            function ji(e, t, i, n) {
                var s = yi(t, i);
                return e._milliseconds += n * s._milliseconds,
                e._days += n * s._days,
                e._months += n * s._months,
                e._bubble()
            }
            function Vi(e) {
                return e < 0 ? Math.floor(e) : Math.ceil(e)
            }
            function Ji(e) {
                return 4800 * e / 146097
            }
            function Zi(e) {
                return 146097 * e / 4800
            }
            function Xi(e) {
                return function() {
                    return this.as(e)
                }
            }
            var qi = Xi("ms")
              , Ki = Xi("s")
              , $i = Xi("m")
              , Qi = Xi("h")
              , en = Xi("d")
              , tn = Xi("w")
              , nn = Xi("M")
              , sn = Xi("y");
            function on(e) {
                return function() {
                    return this.isValid() ? this._data[e] : NaN
                }
            }
            var an = on("milliseconds")
              , rn = on("seconds")
              , cn = on("minutes")
              , ln = on("hours")
              , un = on("days")
              , hn = on("months")
              , dn = on("years");
            var fn = Math.round
              , mn = {
                ss: 44,
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            };
            function gn(e, t, i, n, s) {
                return s.relativeTime(t || 1, !!i, e, n)
            }
            function pn(e, t, i) {
                var n = yi(e).abs()
                  , s = fn(n.as("s"))
                  , o = fn(n.as("m"))
                  , a = fn(n.as("h"))
                  , r = fn(n.as("d"))
                  , c = fn(n.as("M"))
                  , l = fn(n.as("y"))
                  , u = s <= mn.ss && ["s", s] || s < mn.s && ["ss", s] || o <= 1 && ["m"] || o < mn.m && ["mm", o] || a <= 1 && ["h"] || a < mn.h && ["hh", a] || r <= 1 && ["d"] || r < mn.d && ["dd", r] || c <= 1 && ["M"] || c < mn.M && ["MM", c] || l <= 1 && ["y"] || ["yy", l];
                return u[2] = t,
                u[3] = +e > 0,
                u[4] = i,
                gn.apply(null, u)
            }
            var yn = Math.abs;
            function vn(e) {
                return (e > 0) - (e < 0) || +e
            }
            function _n() {
                if (!this.isValid())
                    return this.localeData().invalidDate();
                var e, t, i = yn(this._milliseconds) / 1e3, n = yn(this._days), s = yn(this._months);
                t = S((e = S(i / 60)) / 60),
                i %= 60,
                e %= 60;
                var o = S(s / 12)
                  , a = s %= 12
                  , r = n
                  , c = t
                  , l = e
                  , u = i ? i.toFixed(3).replace(/\.?0+$/, "") : ""
                  , h = this.asSeconds();
                if (!h)
                    return "P0D";
                var d = h < 0 ? "-" : ""
                  , f = vn(this._months) !== vn(h) ? "-" : ""
                  , m = vn(this._days) !== vn(h) ? "-" : ""
                  , g = vn(this._milliseconds) !== vn(h) ? "-" : "";
                return d + "P" + (o ? f + o + "Y" : "") + (a ? f + a + "M" : "") + (r ? m + r + "D" : "") + (c || l || u ? "T" : "") + (c ? g + c + "H" : "") + (l ? g + l + "M" : "") + (u ? g + u + "S" : "")
            }
            var kn = ai.prototype;
            return kn.isValid = function() {
                return this._isValid
            }
            ,
            kn.abs = function() {
                var e = this._data;
                return this._milliseconds = zi(this._milliseconds),
                this._days = zi(this._days),
                this._months = zi(this._months),
                e.milliseconds = zi(e.milliseconds),
                e.seconds = zi(e.seconds),
                e.minutes = zi(e.minutes),
                e.hours = zi(e.hours),
                e.months = zi(e.months),
                e.years = zi(e.years),
                this
            }
            ,
            kn.add = function(e, t) {
                return ji(this, e, t, 1)
            }
            ,
            kn.subtract = function(e, t) {
                return ji(this, e, t, -1)
            }
            ,
            kn.as = function(e) {
                if (!this.isValid())
                    return NaN;
                var t, i, n = this._milliseconds;
                if ("month" === (e = F(e)) || "year" === e)
                    return t = this._days + n / 864e5,
                    i = this._months + Ji(t),
                    "month" === e ? i : i / 12;
                switch (t = this._days + Math.round(Zi(this._months)),
                e) {
                case "week":
                    return t / 7 + n / 6048e5;
                case "day":
                    return t + n / 864e5;
                case "hour":
                    return 24 * t + n / 36e5;
                case "minute":
                    return 1440 * t + n / 6e4;
                case "second":
                    return 86400 * t + n / 1e3;
                case "millisecond":
                    return Math.floor(864e5 * t) + n;
                default:
                    throw new Error("Unknown unit " + e)
                }
            }
            ,
            kn.asMilliseconds = qi,
            kn.asSeconds = Ki,
            kn.asMinutes = $i,
            kn.asHours = Qi,
            kn.asDays = en,
            kn.asWeeks = tn,
            kn.asMonths = nn,
            kn.asYears = sn,
            kn.valueOf = function() {
                return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * C(this._months / 12) : NaN
            }
            ,
            kn._bubble = function() {
                var e, t, i, n, s, o = this._milliseconds, a = this._days, r = this._months, c = this._data;
                return o >= 0 && a >= 0 && r >= 0 || o <= 0 && a <= 0 && r <= 0 || (o += 864e5 * Vi(Zi(r) + a),
                a = 0,
                r = 0),
                c.milliseconds = o % 1e3,
                e = S(o / 1e3),
                c.seconds = e % 60,
                t = S(e / 60),
                c.minutes = t % 60,
                i = S(t / 60),
                c.hours = i % 24,
                r += s = S(Ji(a += S(i / 24))),
                a -= Vi(Zi(s)),
                n = S(r / 12),
                r %= 12,
                c.days = a,
                c.months = r,
                c.years = n,
                this
            }
            ,
            kn.clone = function() {
                return yi(this)
            }
            ,
            kn.get = function(e) {
                return e = F(e),
                this.isValid() ? this[e + "s"]() : NaN
            }
            ,
            kn.milliseconds = an,
            kn.seconds = rn,
            kn.minutes = cn,
            kn.hours = ln,
            kn.days = un,
            kn.weeks = function() {
                return S(this.days() / 7)
            }
            ,
            kn.months = hn,
            kn.years = dn,
            kn.humanize = function(e) {
                if (!this.isValid())
                    return this.localeData().invalidDate();
                var t = this.localeData()
                  , i = pn(this, !e, t);
                return e && (i = t.pastFuture(+this, i)),
                t.postformat(i)
            }
            ,
            kn.toISOString = _n,
            kn.toString = _n,
            kn.toJSON = _n,
            kn.locale = Mi,
            kn.localeData = Ti,
            kn.toIsoString = D("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", _n),
            kn.lang = Di,
            V("X", 0, 0, "unix"),
            V("x", 0, 0, "valueOf"),
            me("x", le),
            me("X", /[+-]?\d+(\.\d{1,3})?/),
            _e("X", function(e, t, i) {
                i._d = new Date(1e3 * parseFloat(e, 10))
            }),
            _e("x", function(e, t, i) {
                i._d = new Date(C(e))
            }),
            s.version = "2.22.2",
            function(e) {
                i = e
            }(ei),
            s.fn = Yi,
            s.min = function() {
                return ni("isBefore", [].slice.call(arguments, 0))
            }
            ,
            s.max = function() {
                return ni("isAfter", [].slice.call(arguments, 0))
            }
            ,
            s.now = function() {
                return Date.now ? Date.now() : +new Date
            }
            ,
            s.utc = m,
            s.unix = function(e) {
                return ei(1e3 * e)
            }
            ,
            s.months = function(e, t) {
                return Ui(e, t, "months")
            }
            ,
            s.isDate = u,
            s.locale = bt,
            s.invalid = y,
            s.duration = yi,
            s.isMoment = b,
            s.weekdays = function(e, t, i) {
                return Wi(e, t, i, "weekdays")
            }
            ,
            s.parseZone = function() {
                return ei.apply(null, arguments).parseZone()
            }
            ,
            s.localeData = Ct,
            s.isDuration = ri,
            s.monthsShort = function(e, t) {
                return Ui(e, t, "monthsShort")
            }
            ,
            s.weekdaysMin = function(e, t, i) {
                return Wi(e, t, i, "weekdaysMin")
            }
            ,
            s.defineLocale = St,
            s.updateLocale = function(e, t) {
                if (null != t) {
                    var i, n, s = pt;
                    null != (n = wt(e)) && (s = n._config),
                    (i = new x(t = I(s, t))).parentLocale = yt[e],
                    yt[e] = i,
                    bt(e)
                } else
                    null != yt[e] && (null != yt[e].parentLocale ? yt[e] = yt[e].parentLocale : null != yt[e] && delete yt[e]);
                return yt[e]
            }
            ,
            s.locales = function() {
                return T(yt)
            }
            ,
            s.weekdaysShort = function(e, t, i) {
                return Wi(e, t, i, "weekdaysShort")
            }
            ,
            s.normalizeUnits = F,
            s.relativeTimeRounding = function(e) {
                return void 0 === e ? fn : "function" == typeof e && (fn = e,
                !0)
            }
            ,
            s.relativeTimeThreshold = function(e, t) {
                return void 0 !== mn[e] && (void 0 === t ? mn[e] : (mn[e] = t,
                "s" === e && (mn.ss = t - 1),
                !0))
            }
            ,
            s.calendarFormat = function(e, t) {
                var i = e.diff(t, "days", !0);
                return i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse"
            }
            ,
            s.prototype = Yi,
            s.HTML5_FMT = {
                DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
                DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
                DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
                DATE: "YYYY-MM-DD",
                TIME: "HH:mm",
                TIME_SECONDS: "HH:mm:ss",
                TIME_MS: "HH:mm:ss.SSS",
                WEEK: "YYYY-[W]WW",
                MONTH: "YYYY-MM"
            },
            s
        })
    }
    , {}],
    5: [function(e, t, i) {
        "use strict";
        i.byteLength = function(e) {
            var t = l(e)
              , i = t[0]
              , n = t[1];
            return 3 * (i + n) / 4 - n
        }
        ,
        i.toByteArray = function(e) {
            var t, i, n = l(e), a = n[0], r = n[1], c = new o(u(e, a, r)), h = 0, d = r > 0 ? a - 4 : a;
            for (i = 0; i < d; i += 4)
                t = s[e.charCodeAt(i)] << 18 | s[e.charCodeAt(i + 1)] << 12 | s[e.charCodeAt(i + 2)] << 6 | s[e.charCodeAt(i + 3)],
                c[h++] = t >> 16 & 255,
                c[h++] = t >> 8 & 255,
                c[h++] = 255 & t;
            2 === r && (t = s[e.charCodeAt(i)] << 2 | s[e.charCodeAt(i + 1)] >> 4,
            c[h++] = 255 & t);
            1 === r && (t = s[e.charCodeAt(i)] << 10 | s[e.charCodeAt(i + 1)] << 4 | s[e.charCodeAt(i + 2)] >> 2,
            c[h++] = t >> 8 & 255,
            c[h++] = 255 & t);
            return c
        }
        ,
        i.fromByteArray = function(e) {
            for (var t, i = e.length, s = i % 3, o = [], a = 0, r = i - s; a < r; a += 16383)
                o.push(d(e, a, a + 16383 > r ? r : a + 16383));
            1 === s ? (t = e[i - 1],
            o.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === s && (t = (e[i - 2] << 8) + e[i - 1],
            o.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
            return o.join("")
        }
        ;
        for (var n = [], s = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = 0, c = a.length; r < c; ++r)
            n[r] = a[r],
            s[a.charCodeAt(r)] = r;
        function l(e) {
            var t = e.length;
            if (t % 4 > 0)
                throw new Error("Invalid string. Length must be a multiple of 4");
            var i = e.indexOf("=");
            return -1 === i && (i = t),
            [i, i === t ? 0 : 4 - i % 4]
        }
        function u(e, t, i) {
            return 3 * (t + i) / 4 - i
        }
        function h(e) {
            return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[63 & e]
        }
        function d(e, t, i) {
            for (var n, s = [], o = t; o < i; o += 3)
                n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]),
                s.push(h(n));
            return s.join("")
        }
        s["-".charCodeAt(0)] = 62,
        s["_".charCodeAt(0)] = 63
    }
    , {}],
    6: [function(e, t, i) {
        (function(t) {
            "use strict";
            var n = e("base64-js")
              , s = e("ieee754")
              , o = e("isarray");
            function a() {
                return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }
            function r(e, t) {
                if (a() < t)
                    throw new RangeError("Invalid typed array length");
                return c.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = c.prototype : (null === e && (e = new c(t)),
                e.length = t),
                e
            }
            function c(e, t, i) {
                if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c))
                    return new c(e,t,i);
                if ("number" == typeof e) {
                    if ("string" == typeof t)
                        throw new Error("If encoding is specified then the first argument must be a string");
                    return d(this, e)
                }
                return l(this, e, t, i)
            }
            function l(e, t, i, n) {
                if ("number" == typeof t)
                    throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? g(e, t, i, n) : "string" == typeof t ? f(e, t, i) : p(e, t)
            }
            function u(e) {
                if ("number" != typeof e)
                    throw new TypeError('"size" argument must be a number');
                if (e < 0)
                    throw new RangeError('"size" argument must not be negative')
            }
            function h(e, t, i, n) {
                return u(t),
                t <= 0 ? r(e, t) : void 0 !== i ? "string" == typeof n ? r(e, t).fill(i, n) : r(e, t).fill(i) : r(e, t)
            }
            function d(e, t) {
                if (u(t),
                e = r(e, t < 0 ? 0 : 0 | y(t)),
                !c.TYPED_ARRAY_SUPPORT)
                    for (var i = 0; i < t; ++i)
                        e[i] = 0;
                return e
            }
            function f(e, t, i) {
                if ("string" == typeof i && "" !== i || (i = "utf8"),
                !c.isEncoding(i))
                    throw new TypeError('"encoding" must be a valid string encoding');
                var n = 0 | v(t, i)
                  , s = (e = r(e, n)).write(t, i);
                return s !== n && (e = e.slice(0, s)),
                e
            }
            function m(e, t) {
                var i = t.length < 0 ? 0 : 0 | y(t.length);
                e = r(e, i);
                for (var n = 0; n < i; n += 1)
                    e[n] = 255 & t[n];
                return e
            }
            function g(e, t, i, n) {
                if (t.byteLength,
                i < 0 || t.byteLength < i)
                    throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < i + (n || 0))
                    throw new RangeError("'length' is out of bounds");
                return t = void 0 === i && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t,i) : new Uint8Array(t,i,n),
                c.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = c.prototype : e = m(e, t),
                e
            }
            function p(e, t) {
                if (c.isBuffer(t)) {
                    var i = 0 | y(t.length);
                    return 0 === (e = r(e, i)).length ? e : (t.copy(e, 0, 0, i),
                    e)
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length"in t)
                        return "number" != typeof t.length || Q(t.length) ? r(e, 0) : m(e, t);
                    if ("Buffer" === t.type && o(t.data))
                        return m(e, t.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }
            function y(e) {
                if (e >= a())
                    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
                return 0 | e
            }
            function v(e, t) {
                if (c.isBuffer(e))
                    return e.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
                    return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var i = e.length;
                if (0 === i)
                    return 0;
                for (var n = !1; ; )
                    switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return i;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return Z(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * i;
                    case "hex":
                        return i >>> 1;
                    case "base64":
                        return K(e).length;
                    default:
                        if (n)
                            return Z(e).length;
                        t = ("" + t).toLowerCase(),
                        n = !0
                    }
            }
            function _(e, t, i) {
                var n = !1;
                if ((void 0 === t || t < 0) && (t = 0),
                t > this.length)
                    return "";
                if ((void 0 === i || i > this.length) && (i = this.length),
                i <= 0)
                    return "";
                if ((i >>>= 0) <= (t >>>= 0))
                    return "";
                for (e || (e = "utf8"); ; )
                    switch (e) {
                    case "hex":
                        return A(this, t, i);
                    case "utf8":
                    case "utf-8":
                        return N(this, t, i);
                    case "ascii":
                        return x(this, t, i);
                    case "latin1":
                    case "binary":
                        return R(this, t, i);
                    case "base64":
                        return L(this, t, i);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return F(this, t, i);
                    default:
                        if (n)
                            throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(),
                        n = !0
                    }
            }
            function k(e, t, i) {
                var n = e[t];
                e[t] = e[i],
                e[i] = n
            }
            function w(e, t, i, n, s) {
                if (0 === e.length)
                    return -1;
                if ("string" == typeof i ? (n = i,
                i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648),
                i = +i,
                isNaN(i) && (i = s ? 0 : e.length - 1),
                i < 0 && (i = e.length + i),
                i >= e.length) {
                    if (s)
                        return -1;
                    i = e.length - 1
                } else if (i < 0) {
                    if (!s)
                        return -1;
                    i = 0
                }
                if ("string" == typeof t && (t = c.from(t, n)),
                c.isBuffer(t))
                    return 0 === t.length ? -1 : b(e, t, i, n, s);
                if ("number" == typeof t)
                    return t &= 255,
                    c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(e, t, i) : Uint8Array.prototype.lastIndexOf.call(e, t, i) : b(e, [t], i, n, s);
                throw new TypeError("val must be string, number or Buffer")
            }
            function b(e, t, i, n, s) {
                var o, a = 1, r = e.length, c = t.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (e.length < 2 || t.length < 2)
                        return -1;
                    a = 2,
                    r /= 2,
                    c /= 2,
                    i /= 2
                }
                function l(e, t) {
                    return 1 === a ? e[t] : e.readUInt16BE(t * a)
                }
                if (s) {
                    var u = -1;
                    for (o = i; o < r; o++)
                        if (l(e, o) === l(t, -1 === u ? 0 : o - u)) {
                            if (-1 === u && (u = o),
                            o - u + 1 === c)
                                return u * a
                        } else
                            -1 !== u && (o -= o - u),
                            u = -1
                } else
                    for (i + c > r && (i = r - c),
                    o = i; o >= 0; o--) {
                        for (var h = !0, d = 0; d < c; d++)
                            if (l(e, o + d) !== l(t, d)) {
                                h = !1;
                                break
                            }
                        if (h)
                            return o
                    }
                return -1
            }
            function S(e, t, i, n) {
                i = Number(i) || 0;
                var s = e.length - i;
                n ? (n = Number(n)) > s && (n = s) : n = s;
                var o = t.length;
                if (o % 2 != 0)
                    throw new TypeError("Invalid hex string");
                n > o / 2 && (n = o / 2);
                for (var a = 0; a < n; ++a) {
                    var r = parseInt(t.substr(2 * a, 2), 16);
                    if (isNaN(r))
                        return a;
                    e[i + a] = r
                }
                return a
            }
            function C(e, t, i, n) {
                return $(Z(t, e.length - i), e, i, n)
            }
            function B(e, t, i, n) {
                return $(X(t), e, i, n)
            }
            function M(e, t, i, n) {
                return B(e, t, i, n)
            }
            function D(e, t, i, n) {
                return $(K(t), e, i, n)
            }
            function T(e, t, i, n) {
                return $(q(t, e.length - i), e, i, n)
            }
            function L(e, t, i) {
                return 0 === t && i === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, i))
            }
            function N(e, t, i) {
                i = Math.min(e.length, i);
                for (var n = [], s = t; s < i; ) {
                    var o, a, r, c, l = e[s], u = null, h = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
                    if (s + h <= i)
                        switch (h) {
                        case 1:
                            l < 128 && (u = l);
                            break;
                        case 2:
                            128 == (192 & (o = e[s + 1])) && (c = (31 & l) << 6 | 63 & o) > 127 && (u = c);
                            break;
                        case 3:
                            o = e[s + 1],
                            a = e[s + 2],
                            128 == (192 & o) && 128 == (192 & a) && (c = (15 & l) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (c < 55296 || c > 57343) && (u = c);
                            break;
                        case 4:
                            o = e[s + 1],
                            a = e[s + 2],
                            r = e[s + 3],
                            128 == (192 & o) && 128 == (192 & a) && 128 == (192 & r) && (c = (15 & l) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & r) > 65535 && c < 1114112 && (u = c)
                        }
                    null === u ? (u = 65533,
                    h = 1) : u > 65535 && (u -= 65536,
                    n.push(u >>> 10 & 1023 | 55296),
                    u = 56320 | 1023 & u),
                    n.push(u),
                    s += h
                }
                return I(n)
            }
            i.Buffer = c,
            i.SlowBuffer = function(e) {
                +e != e && (e = 0);
                return c.alloc(+e)
            }
            ,
            i.INSPECT_MAX_BYTES = 50,
            c.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    },
                    42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                } catch (e) {
                    return !1
                }
            }(),
            i.kMaxLength = a(),
            c.poolSize = 8192,
            c._augment = function(e) {
                return e.__proto__ = c.prototype,
                e
            }
            ,
            c.from = function(e, t, i) {
                return l(null, e, t, i)
            }
            ,
            c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype,
            c.__proto__ = Uint8Array,
            "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
                value: null,
                configurable: !0
            })),
            c.alloc = function(e, t, i) {
                return h(null, e, t, i)
            }
            ,
            c.allocUnsafe = function(e) {
                return d(null, e)
            }
            ,
            c.allocUnsafeSlow = function(e) {
                return d(null, e)
            }
            ,
            c.isBuffer = function(e) {
                return !(null == e || !e._isBuffer)
            }
            ,
            c.compare = function(e, t) {
                if (!c.isBuffer(e) || !c.isBuffer(t))
                    throw new TypeError("Arguments must be Buffers");
                if (e === t)
                    return 0;
                for (var i = e.length, n = t.length, s = 0, o = Math.min(i, n); s < o; ++s)
                    if (e[s] !== t[s]) {
                        i = e[s],
                        n = t[s];
                        break
                    }
                return i < n ? -1 : n < i ? 1 : 0
            }
            ,
            c.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
                }
            }
            ,
            c.concat = function(e, t) {
                if (!o(e))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length)
                    return c.alloc(0);
                var i;
                if (void 0 === t)
                    for (t = 0,
                    i = 0; i < e.length; ++i)
                        t += e[i].length;
                var n = c.allocUnsafe(t)
                  , s = 0;
                for (i = 0; i < e.length; ++i) {
                    var a = e[i];
                    if (!c.isBuffer(a))
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    a.copy(n, s),
                    s += a.length
                }
                return n
            }
            ,
            c.byteLength = v,
            c.prototype._isBuffer = !0,
            c.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 != 0)
                    throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2)
                    k(this, t, t + 1);
                return this
            }
            ,
            c.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 != 0)
                    throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4)
                    k(this, t, t + 3),
                    k(this, t + 1, t + 2);
                return this
            }
            ,
            c.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 != 0)
                    throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8)
                    k(this, t, t + 7),
                    k(this, t + 1, t + 6),
                    k(this, t + 2, t + 5),
                    k(this, t + 3, t + 4);
                return this
            }
            ,
            c.prototype.toString = function() {
                var e = 0 | this.length;
                return 0 === e ? "" : 0 === arguments.length ? N(this, 0, e) : _.apply(this, arguments)
            }
            ,
            c.prototype.equals = function(e) {
                if (!c.isBuffer(e))
                    throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === c.compare(this, e)
            }
            ,
            c.prototype.inspect = function() {
                var e = ""
                  , t = i.INSPECT_MAX_BYTES;
                return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "),
                this.length > t && (e += " ... ")),
                "<Buffer " + e + ">"
            }
            ,
            c.prototype.compare = function(e, t, i, n, s) {
                if (!c.isBuffer(e))
                    throw new TypeError("Argument must be a Buffer");
                if (void 0 === t && (t = 0),
                void 0 === i && (i = e ? e.length : 0),
                void 0 === n && (n = 0),
                void 0 === s && (s = this.length),
                t < 0 || i > e.length || n < 0 || s > this.length)
                    throw new RangeError("out of range index");
                if (n >= s && t >= i)
                    return 0;
                if (n >= s)
                    return -1;
                if (t >= i)
                    return 1;
                if (t >>>= 0,
                i >>>= 0,
                n >>>= 0,
                s >>>= 0,
                this === e)
                    return 0;
                for (var o = s - n, a = i - t, r = Math.min(o, a), l = this.slice(n, s), u = e.slice(t, i), h = 0; h < r; ++h)
                    if (l[h] !== u[h]) {
                        o = l[h],
                        a = u[h];
                        break
                    }
                return o < a ? -1 : a < o ? 1 : 0
            }
            ,
            c.prototype.includes = function(e, t, i) {
                return -1 !== this.indexOf(e, t, i)
            }
            ,
            c.prototype.indexOf = function(e, t, i) {
                return w(this, e, t, i, !0)
            }
            ,
            c.prototype.lastIndexOf = function(e, t, i) {
                return w(this, e, t, i, !1)
            }
            ,
            c.prototype.write = function(e, t, i, n) {
                if (void 0 === t)
                    n = "utf8",
                    i = this.length,
                    t = 0;
                else if (void 0 === i && "string" == typeof t)
                    n = t,
                    i = this.length,
                    t = 0;
                else {
                    if (!isFinite(t))
                        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t |= 0,
                    isFinite(i) ? (i |= 0,
                    void 0 === n && (n = "utf8")) : (n = i,
                    i = void 0)
                }
                var s = this.length - t;
                if ((void 0 === i || i > s) && (i = s),
                e.length > 0 && (i < 0 || t < 0) || t > this.length)
                    throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var o = !1; ; )
                    switch (n) {
                    case "hex":
                        return S(this, e, t, i);
                    case "utf8":
                    case "utf-8":
                        return C(this, e, t, i);
                    case "ascii":
                        return B(this, e, t, i);
                    case "latin1":
                    case "binary":
                        return M(this, e, t, i);
                    case "base64":
                        return D(this, e, t, i);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return T(this, e, t, i);
                    default:
                        if (o)
                            throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(),
                        o = !0
                    }
            }
            ,
            c.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }
            ;
            var P = 4096;
            function I(e) {
                var t = e.length;
                if (t <= P)
                    return String.fromCharCode.apply(String, e);
                for (var i = "", n = 0; n < t; )
                    i += String.fromCharCode.apply(String, e.slice(n, n += P));
                return i
            }
            function x(e, t, i) {
                var n = "";
                i = Math.min(e.length, i);
                for (var s = t; s < i; ++s)
                    n += String.fromCharCode(127 & e[s]);
                return n
            }
            function R(e, t, i) {
                var n = "";
                i = Math.min(e.length, i);
                for (var s = t; s < i; ++s)
                    n += String.fromCharCode(e[s]);
                return n
            }
            function A(e, t, i) {
                var n = e.length;
                (!t || t < 0) && (t = 0),
                (!i || i < 0 || i > n) && (i = n);
                for (var s = "", o = t; o < i; ++o)
                    s += J(e[o]);
                return s
            }
            function F(e, t, i) {
                for (var n = e.slice(t, i), s = "", o = 0; o < n.length; o += 2)
                    s += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return s
            }
            function O(e, t, i) {
                if (e % 1 != 0 || e < 0)
                    throw new RangeError("offset is not uint");
                if (e + t > i)
                    throw new RangeError("Trying to access beyond buffer length")
            }
            function Y(e, t, i, n, s, o) {
                if (!c.isBuffer(e))
                    throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > s || t < o)
                    throw new RangeError('"value" argument is out of bounds');
                if (i + n > e.length)
                    throw new RangeError("Index out of range")
            }
            function E(e, t, i, n) {
                t < 0 && (t = 65535 + t + 1);
                for (var s = 0, o = Math.min(e.length - i, 2); s < o; ++s)
                    e[i + s] = (t & 255 << 8 * (n ? s : 1 - s)) >>> 8 * (n ? s : 1 - s)
            }
            function H(e, t, i, n) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var s = 0, o = Math.min(e.length - i, 4); s < o; ++s)
                    e[i + s] = t >>> 8 * (n ? s : 3 - s) & 255
            }
            function G(e, t, i, n, s, o) {
                if (i + n > e.length)
                    throw new RangeError("Index out of range");
                if (i < 0)
                    throw new RangeError("Index out of range")
            }
            function U(e, t, i, n, o) {
                return o || G(e, 0, i, 4),
                s.write(e, t, i, n, 23, 4),
                i + 4
            }
            function W(e, t, i, n, o) {
                return o || G(e, 0, i, 8),
                s.write(e, t, i, n, 52, 8),
                i + 8
            }
            c.prototype.slice = function(e, t) {
                var i, n = this.length;
                if (e = ~~e,
                t = void 0 === t ? n : ~~t,
                e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
                t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
                t < e && (t = e),
                c.TYPED_ARRAY_SUPPORT)
                    (i = this.subarray(e, t)).__proto__ = c.prototype;
                else {
                    var s = t - e;
                    i = new c(s,void 0);
                    for (var o = 0; o < s; ++o)
                        i[o] = this[o + e]
                }
                return i
            }
            ,
            c.prototype.readUIntLE = function(e, t, i) {
                e |= 0,
                t |= 0,
                i || O(e, t, this.length);
                for (var n = this[e], s = 1, o = 0; ++o < t && (s *= 256); )
                    n += this[e + o] * s;
                return n
            }
            ,
            c.prototype.readUIntBE = function(e, t, i) {
                e |= 0,
                t |= 0,
                i || O(e, t, this.length);
                for (var n = this[e + --t], s = 1; t > 0 && (s *= 256); )
                    n += this[e + --t] * s;
                return n
            }
            ,
            c.prototype.readUInt8 = function(e, t) {
                return t || O(e, 1, this.length),
                this[e]
            }
            ,
            c.prototype.readUInt16LE = function(e, t) {
                return t || O(e, 2, this.length),
                this[e] | this[e + 1] << 8
            }
            ,
            c.prototype.readUInt16BE = function(e, t) {
                return t || O(e, 2, this.length),
                this[e] << 8 | this[e + 1]
            }
            ,
            c.prototype.readUInt32LE = function(e, t) {
                return t || O(e, 4, this.length),
                (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }
            ,
            c.prototype.readUInt32BE = function(e, t) {
                return t || O(e, 4, this.length),
                16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }
            ,
            c.prototype.readIntLE = function(e, t, i) {
                e |= 0,
                t |= 0,
                i || O(e, t, this.length);
                for (var n = this[e], s = 1, o = 0; ++o < t && (s *= 256); )
                    n += this[e + o] * s;
                return n >= (s *= 128) && (n -= Math.pow(2, 8 * t)),
                n
            }
            ,
            c.prototype.readIntBE = function(e, t, i) {
                e |= 0,
                t |= 0,
                i || O(e, t, this.length);
                for (var n = t, s = 1, o = this[e + --n]; n > 0 && (s *= 256); )
                    o += this[e + --n] * s;
                return o >= (s *= 128) && (o -= Math.pow(2, 8 * t)),
                o
            }
            ,
            c.prototype.readInt8 = function(e, t) {
                return t || O(e, 1, this.length),
                128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }
            ,
            c.prototype.readInt16LE = function(e, t) {
                t || O(e, 2, this.length);
                var i = this[e] | this[e + 1] << 8;
                return 32768 & i ? 4294901760 | i : i
            }
            ,
            c.prototype.readInt16BE = function(e, t) {
                t || O(e, 2, this.length);
                var i = this[e + 1] | this[e] << 8;
                return 32768 & i ? 4294901760 | i : i
            }
            ,
            c.prototype.readInt32LE = function(e, t) {
                return t || O(e, 4, this.length),
                this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }
            ,
            c.prototype.readInt32BE = function(e, t) {
                return t || O(e, 4, this.length),
                this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }
            ,
            c.prototype.readFloatLE = function(e, t) {
                return t || O(e, 4, this.length),
                s.read(this, e, !0, 23, 4)
            }
            ,
            c.prototype.readFloatBE = function(e, t) {
                return t || O(e, 4, this.length),
                s.read(this, e, !1, 23, 4)
            }
            ,
            c.prototype.readDoubleLE = function(e, t) {
                return t || O(e, 8, this.length),
                s.read(this, e, !0, 52, 8)
            }
            ,
            c.prototype.readDoubleBE = function(e, t) {
                return t || O(e, 8, this.length),
                s.read(this, e, !1, 52, 8)
            }
            ,
            c.prototype.writeUIntLE = function(e, t, i, n) {
                (e = +e,
                t |= 0,
                i |= 0,
                n) || Y(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
                var s = 1
                  , o = 0;
                for (this[t] = 255 & e; ++o < i && (s *= 256); )
                    this[t + o] = e / s & 255;
                return t + i
            }
            ,
            c.prototype.writeUIntBE = function(e, t, i, n) {
                (e = +e,
                t |= 0,
                i |= 0,
                n) || Y(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
                var s = i - 1
                  , o = 1;
                for (this[t + s] = 255 & e; --s >= 0 && (o *= 256); )
                    this[t + s] = e / o & 255;
                return t + i
            }
            ,
            c.prototype.writeUInt8 = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 1, 255, 0),
                c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                this[t] = 255 & e,
                t + 1
            }
            ,
            c.prototype.writeUInt16LE = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 2, 65535, 0),
                c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                this[t + 1] = e >>> 8) : E(this, e, t, !0),
                t + 2
            }
            ,
            c.prototype.writeUInt16BE = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 2, 65535, 0),
                c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
                this[t + 1] = 255 & e) : E(this, e, t, !1),
                t + 2
            }
            ,
            c.prototype.writeUInt32LE = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 4, 4294967295, 0),
                c.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24,
                this[t + 2] = e >>> 16,
                this[t + 1] = e >>> 8,
                this[t] = 255 & e) : H(this, e, t, !0),
                t + 4
            }
            ,
            c.prototype.writeUInt32BE = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 4, 4294967295, 0),
                c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
                this[t + 1] = e >>> 16,
                this[t + 2] = e >>> 8,
                this[t + 3] = 255 & e) : H(this, e, t, !1),
                t + 4
            }
            ,
            c.prototype.writeIntLE = function(e, t, i, n) {
                if (e = +e,
                t |= 0,
                !n) {
                    var s = Math.pow(2, 8 * i - 1);
                    Y(this, e, t, i, s - 1, -s)
                }
                var o = 0
                  , a = 1
                  , r = 0;
                for (this[t] = 255 & e; ++o < i && (a *= 256); )
                    e < 0 && 0 === r && 0 !== this[t + o - 1] && (r = 1),
                    this[t + o] = (e / a >> 0) - r & 255;
                return t + i
            }
            ,
            c.prototype.writeIntBE = function(e, t, i, n) {
                if (e = +e,
                t |= 0,
                !n) {
                    var s = Math.pow(2, 8 * i - 1);
                    Y(this, e, t, i, s - 1, -s)
                }
                var o = i - 1
                  , a = 1
                  , r = 0;
                for (this[t + o] = 255 & e; --o >= 0 && (a *= 256); )
                    e < 0 && 0 === r && 0 !== this[t + o + 1] && (r = 1),
                    this[t + o] = (e / a >> 0) - r & 255;
                return t + i
            }
            ,
            c.prototype.writeInt8 = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 1, 127, -128),
                c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                e < 0 && (e = 255 + e + 1),
                this[t] = 255 & e,
                t + 1
            }
            ,
            c.prototype.writeInt16LE = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 2, 32767, -32768),
                c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                this[t + 1] = e >>> 8) : E(this, e, t, !0),
                t + 2
            }
            ,
            c.prototype.writeInt16BE = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 2, 32767, -32768),
                c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
                this[t + 1] = 255 & e) : E(this, e, t, !1),
                t + 2
            }
            ,
            c.prototype.writeInt32LE = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 4, 2147483647, -2147483648),
                c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                this[t + 1] = e >>> 8,
                this[t + 2] = e >>> 16,
                this[t + 3] = e >>> 24) : H(this, e, t, !0),
                t + 4
            }
            ,
            c.prototype.writeInt32BE = function(e, t, i) {
                return e = +e,
                t |= 0,
                i || Y(this, e, t, 4, 2147483647, -2147483648),
                e < 0 && (e = 4294967295 + e + 1),
                c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
                this[t + 1] = e >>> 16,
                this[t + 2] = e >>> 8,
                this[t + 3] = 255 & e) : H(this, e, t, !1),
                t + 4
            }
            ,
            c.prototype.writeFloatLE = function(e, t, i) {
                return U(this, e, t, !0, i)
            }
            ,
            c.prototype.writeFloatBE = function(e, t, i) {
                return U(this, e, t, !1, i)
            }
            ,
            c.prototype.writeDoubleLE = function(e, t, i) {
                return W(this, e, t, !0, i)
            }
            ,
            c.prototype.writeDoubleBE = function(e, t, i) {
                return W(this, e, t, !1, i)
            }
            ,
            c.prototype.copy = function(e, t, i, n) {
                if (i || (i = 0),
                n || 0 === n || (n = this.length),
                t >= e.length && (t = e.length),
                t || (t = 0),
                n > 0 && n < i && (n = i),
                n === i)
                    return 0;
                if (0 === e.length || 0 === this.length)
                    return 0;
                if (t < 0)
                    throw new RangeError("targetStart out of bounds");
                if (i < 0 || i >= this.length)
                    throw new RangeError("sourceStart out of bounds");
                if (n < 0)
                    throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length),
                e.length - t < n - i && (n = e.length - t + i);
                var s, o = n - i;
                if (this === e && i < t && t < n)
                    for (s = o - 1; s >= 0; --s)
                        e[s + t] = this[s + i];
                else if (o < 1e3 || !c.TYPED_ARRAY_SUPPORT)
                    for (s = 0; s < o; ++s)
                        e[s + t] = this[s + i];
                else
                    Uint8Array.prototype.set.call(e, this.subarray(i, i + o), t);
                return o
            }
            ,
            c.prototype.fill = function(e, t, i, n) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (n = t,
                    t = 0,
                    i = this.length) : "string" == typeof i && (n = i,
                    i = this.length),
                    1 === e.length) {
                        var s = e.charCodeAt(0);
                        s < 256 && (e = s)
                    }
                    if (void 0 !== n && "string" != typeof n)
                        throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !c.isEncoding(n))
                        throw new TypeError("Unknown encoding: " + n)
                } else
                    "number" == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < i)
                    throw new RangeError("Out of range index");
                if (i <= t)
                    return this;
                var o;
                if (t >>>= 0,
                i = void 0 === i ? this.length : i >>> 0,
                e || (e = 0),
                "number" == typeof e)
                    for (o = t; o < i; ++o)
                        this[o] = e;
                else {
                    var a = c.isBuffer(e) ? e : Z(new c(e,n).toString())
                      , r = a.length;
                    for (o = 0; o < i - t; ++o)
                        this[o + t] = a[o % r]
                }
                return this
            }
            ;
            var z = /[^+\/0-9A-Za-z-_]/g;
            function j(e) {
                if ((e = V(e).replace(z, "")).length < 2)
                    return "";
                for (; e.length % 4 != 0; )
                    e += "=";
                return e
            }
            function V(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }
            function J(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }
            function Z(e, t) {
                var i;
                t = t || 1 / 0;
                for (var n = e.length, s = null, o = [], a = 0; a < n; ++a) {
                    if ((i = e.charCodeAt(a)) > 55295 && i < 57344) {
                        if (!s) {
                            if (i > 56319) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            if (a + 1 === n) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            s = i;
                            continue
                        }
                        if (i < 56320) {
                            (t -= 3) > -1 && o.push(239, 191, 189),
                            s = i;
                            continue
                        }
                        i = 65536 + (s - 55296 << 10 | i - 56320)
                    } else
                        s && (t -= 3) > -1 && o.push(239, 191, 189);
                    if (s = null,
                    i < 128) {
                        if ((t -= 1) < 0)
                            break;
                        o.push(i)
                    } else if (i < 2048) {
                        if ((t -= 2) < 0)
                            break;
                        o.push(i >> 6 | 192, 63 & i | 128)
                    } else if (i < 65536) {
                        if ((t -= 3) < 0)
                            break;
                        o.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                    } else {
                        if (!(i < 1114112))
                            throw new Error("Invalid code point");
                        if ((t -= 4) < 0)
                            break;
                        o.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                    }
                }
                return o
            }
            function X(e) {
                for (var t = [], i = 0; i < e.length; ++i)
                    t.push(255 & e.charCodeAt(i));
                return t
            }
            function q(e, t) {
                for (var i, n, s, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
                    n = (i = e.charCodeAt(a)) >> 8,
                    s = i % 256,
                    o.push(s),
                    o.push(n);
                return o
            }
            function K(e) {
                return n.toByteArray(j(e))
            }
            function $(e, t, i, n) {
                for (var s = 0; s < n && !(s + i >= t.length || s >= e.length); ++s)
                    t[s + i] = e[s];
                return s
            }
            function Q(e) {
                return e != e
            }
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "base64-js": 5,
        ieee754: 8,
        isarray: 7
    }],
    7: [function(e, t, i) {
        var n = {}.toString;
        t.exports = Array.isArray || function(e) {
            return "[object Array]" == n.call(e)
        }
    }
    , {}],
    8: [function(e, t, i) {
        i.read = function(e, t, i, n, s) {
            var o, a, r = 8 * s - n - 1, c = (1 << r) - 1, l = c >> 1, u = -7, h = i ? s - 1 : 0, d = i ? -1 : 1, f = e[t + h];
            for (h += d,
            o = f & (1 << -u) - 1,
            f >>= -u,
            u += r; u > 0; o = 256 * o + e[t + h],
            h += d,
            u -= 8)
                ;
            for (a = o & (1 << -u) - 1,
            o >>= -u,
            u += n; u > 0; a = 256 * a + e[t + h],
            h += d,
            u -= 8)
                ;
            if (0 === o)
                o = 1 - l;
            else {
                if (o === c)
                    return a ? NaN : 1 / 0 * (f ? -1 : 1);
                a += Math.pow(2, n),
                o -= l
            }
            return (f ? -1 : 1) * a * Math.pow(2, o - n)
        }
        ,
        i.write = function(e, t, i, n, s, o) {
            var a, r, c, l = 8 * o - s - 1, u = (1 << l) - 1, h = u >> 1, d = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = n ? 0 : o - 1, m = n ? 1 : -1, g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t),
            isNaN(t) || t === 1 / 0 ? (r = isNaN(t) ? 1 : 0,
            a = u) : (a = Math.floor(Math.log(t) / Math.LN2),
            t * (c = Math.pow(2, -a)) < 1 && (a--,
            c *= 2),
            (t += a + h >= 1 ? d / c : d * Math.pow(2, 1 - h)) * c >= 2 && (a++,
            c /= 2),
            a + h >= u ? (r = 0,
            a = u) : a + h >= 1 ? (r = (t * c - 1) * Math.pow(2, s),
            a += h) : (r = t * Math.pow(2, h - 1) * Math.pow(2, s),
            a = 0)); s >= 8; e[i + f] = 255 & r,
            f += m,
            r /= 256,
            s -= 8)
                ;
            for (a = a << s | r,
            l += s; l > 0; e[i + f] = 255 & a,
            f += m,
            a /= 256,
            l -= 8)
                ;
            e[i + f - m] |= 128 * g
        }
    }
    , {}],
    9: [function(e, t, i) {
        var n, s, o = t.exports = {};
        function a() {
            throw new Error("setTimeout has not been defined")
        }
        function r() {
            throw new Error("clearTimeout has not been defined")
        }
        function c(e) {
            if (n === setTimeout)
                return setTimeout(e, 0);
            if ((n === a || !n) && setTimeout)
                return n = setTimeout,
                setTimeout(e, 0);
            try {
                return n(e, 0)
            } catch (t) {
                try {
                    return n.call(null, e, 0)
                } catch (t) {
                    return n.call(this, e, 0)
                }
            }
        }
        function l(e) {
            if (s === clearTimeout)
                return clearTimeout(e);
            if ((s === r || !s) && clearTimeout)
                return s = clearTimeout,
                clearTimeout(e);
            try {
                return s(e)
            } catch (t) {
                try {
                    return s.call(null, e)
                } catch (t) {
                    return s.call(this, e)
                }
            }
        }
        (function() {
            try {
                n = "function" == typeof setTimeout ? setTimeout : a
            } catch (e) {
                n = a
            }
            try {
                s = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (e) {
                s = r
            }
        }
        )();
        var u, h = [], d = !1, f = -1;
        function m() {
            d && u && (d = !1,
            u.length ? h = u.concat(h) : f = -1,
            h.length && g())
        }
        function g() {
            if (!d) {
                var e = c(m);
                d = !0;
                for (var t = h.length; t; ) {
                    for (u = h,
                    h = []; ++f < t; )
                        u && u[f].run();
                    f = -1,
                    t = h.length
                }
                u = null,
                d = !1,
                l(e)
            }
        }
        function p(e, t) {
            this.fun = e,
            this.array = t
        }
        function y() {}
        o.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++)
                    t[i - 1] = arguments[i];
            h.push(new p(e,t)),
            1 !== h.length || d || c(g)
        }
        ,
        p.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        o.title = "browser",
        o.browser = !0,
        o.env = {},
        o.argv = [],
        o.version = "",
        o.versions = {},
        o.on = y,
        o.addListener = y,
        o.once = y,
        o.off = y,
        o.removeListener = y,
        o.removeAllListeners = y,
        o.emit = y,
        o.prependListener = y,
        o.prependOnceListener = y,
        o.listeners = function(e) {
            return []
        }
        ,
        o.binding = function(e) {
            throw new Error("process.binding is not supported")
        }
        ,
        o.cwd = function() {
            return "/"
        }
        ,
        o.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }
        ,
        o.umask = function() {
            return 0
        }
    }
    , {}],
    LanguageData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var n = e("polyglot.min")
          , s = null;
        function o(e) {
            return window.i18n.languages[e]
        }
        function a(e) {
            e && (s ? s.replace(e) : s = new n({
                phrases: e,
                allowMissing: !0
            }))
        }
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }),
        t.exports = {
            init: function(e) {
                if (e !== window.i18n.curLang) {
                    var t = o(e) || {};
                    window.i18n.curLang = e,
                    a(t),
                    this.inst = s
                }
            },
            t: function(e, t) {
                if (s)
                    return s.t(e, t)
            },
            inst: s,
            updateSceneRenderers: function() {
                for (var e = cc.director.getScene().children, t = [], i = 0; i < e.length; ++i) {
                    var n = e[i].getComponentsInChildren("LocalizedLabel");
                    Array.prototype.push.apply(t, n)
                }
                for (var s = 0; s < t.length; ++s) {
                    var o = t[s];
                    o.node.active && o.updateLabel()
                }
                for (var a = [], r = 0; r < e.length; ++r) {
                    var c = e[r].getComponentsInChildren("LocalizedSprite");
                    Array.prototype.push.apply(a, c)
                }
                for (var l = 0; l < a.length; ++l) {
                    var u = a[l];
                    u.node.active && u.updateSprite(window.i18n.curLang)
                }
            }
        },
        cc._RF.pop()
    }
    , {
        "polyglot.min": "polyglot.min"
    }],
    LocalizedLabel: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var n = e("LanguageData");
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
                        this._dataID !== e && (this._dataID = e,
                        this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function() {
                n.inst || n.init(),
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Label);
                if (e)
                    return this.label = e,
                    void this.updateLabel()
            },
            updateLabel: function() {
                this.label ? n.t(this.dataID) && (this.label.string = n.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var n = e("SpriteFrameSet");
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
                    type: n
                }
            },
            onLoad: function() {
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Sprite);
                if (e)
                    return this.sprite = e,
                    void this.updateSprite(window.i18n.curLang)
            },
            getSpriteFrameByLang: function(e) {
                for (var t = 0; t < this.spriteFrameSet.length; ++t)
                    if (this.spriteFrameSet[t].language === e)
                        return this.spriteFrameSet[t].spriteFrame
            },
            updateSprite: function(e) {
                if (this.sprite) {
                    var t = this.getSpriteFrameByLang(e);
                    !t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame),
                    this.sprite.spriteFrame = t
                } else
                    cc.error("Failed to update localized sprite, sprite component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    SpriteFrameSet: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var n = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        t.exports = n,
        cc._RF.pop()
    }
    , {}],
    bodyBase: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "aa793lCGdNA05K3LJZ10MlE", "bodyBase");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {},
            start: function() {},
            collision: function(e) {
                this.destroyAway()
            },
            onCollisionEnter: function(e, t) {
                var i = e.node.ATT || 0;
                if ("heroBullet" === e.node.group) {
                    if (cc.dm.gameData.heroBullets.length > 1) {
                        for (var s in cc.dm.gameData.heroBullets.splice(e.node.index, 1),
                        e.node.getComponent("bulletHero").offEvent(),
                        cc.dm.gameData.heroBullets)
                            cc.dm.gameData.heroBullets[s].index = s;
                        return
                    }
                    i = 1
                }
                cc.gm.emit(n.collisionBody, {
                    ATT: i
                })
            },
            onDestroy: function() {}
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    bulletBase: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a090bMzbTROB6ZNC79ah0jx", "bulletBase");
        var n = e("enums").Event_Name
          , s = "x"
          , o = "y";
        t.exports = cc.Class({
            extends: cc.Component,
            properties: {
                speed: 10
            },
            onLoad: function() {
                this.kind = 1,
                this.spFrame = "",
                this.speedBase = 8,
                this.scaleBase = 1,
                this.scaleOver = 1,
                this.rotation = 60,
                this.node.ATT = 1,
                this.speedx = 0,
                this.speedy = 0,
                this.speedx_pool = this.speedx,
                this.speedy_pool = this.speedy,
                this.canChangeX = !0,
                this.canChangeY = !0,
                this.lastCollisionBody = !1,
                this.startGame = !1
            },
            init: function(e) {
                e.speed && (this.speed = e.speed),
                e.rotation && (this.rotation = e.rotation),
                this.speedx = this.getSpeedX(),
                this.speedy = this.getSpeedY(),
                this.speedx_pool = this.speedx,
                this.speedy_pool = this.speedy,
                this.canChangeX = !0,
                this.canChangeY = !0,
                this.lastCollisionBody = !1,
                this.node.ATT = e.ATT
            },
            initNodeAction: function(e) {
                var t = this;
                this.hero = e,
                this.startGame || (this.startAction = this.node.runAction(cc.sequence(cc.callFunc(function() {
                    cc.dm.gameData.gameStart || (t.node.x = t.hero ? t.hero.x : t.node.x)
                }), cc.delayTime(.01)).repeatForever()))
            },
            start: function() {},
            onCollisionEnter: function(e, t) {
                var i = e.node;
                switch (i.group) {
                case "wall":
                    this.collisionToWall(i);
                    break;
                case "hero":
                    this.collisionToHero(e, t),
                    cc.gm.emit(n.finishTask, 3);
                    break;
                case "body":
                    this.collisionToBody(i);
                    break;
                case "masterAndStone":
                    this.collisionToMaster(e, t)
                }
            },
            collisionToWall: function(e) {
                switch (e.name) {
                case "left":
                    this.collisionChange(s);
                    break;
                case "up":
                    this.lastCollisionBody = !1,
                    this.collisionChange(o);
                    break;
                case "right":
                    this.collisionChange(s)
                }
            },
            collisionToHero: function(e, t) {
                this.lastCollisionBody || (this.setBolletRotation(e, t),
                this.collisionChange(o))
            },
            collisionToBody: function(e) {
                this.lastCollisionBody = !0,
                this.collisionChange(o)
            },
            collisionToMaster: function(e, t) {
                this.lastCollisionBody = !1;
                var i = t.node.x
                  , n = t.node.y
                  , a = e.node.x
                  , r = e.node.y
                  , c = t.world.aabb.width
                  , l = t.world.aabb.height
                  , u = e.world.aabb.width
                  , h = e.world.aabb.height
                  , d = s
                  , f = a - i
                  , m = r - n
                  , g = (u + c) / 2
                  , p = (h + l) / 2;
                this.speedx_pool > 0 ? this.speedy_pool > 0 ? f - g > 0 ? f - g > m - p && (d = o) : f < 0 && m > 0 ? d = o : c + u / 2 - (f + c / 2) > l + h / 2 - (m + l / 2) && (d = o) : f - g > 0 ? f - g > -m - p && (d = o) : (f < 0 && m < 0 && (d = o),
                c + u / 2 - (f + c / 2) > l + h / 2 - (l / 2 - m) && (d = o)) : this.speedy_pool > 0 ? -f - g > 0 ? -f - g > m - p && (d = o) : f > 0 && m > 0 ? d = o : c + u / 2 - (c / 2 - f) > l + h / 2 - (m + l / 2) && (d = o) : -f - g > 0 ? -f - g > -m - p && (d = o) : f > 0 && m < 0 ? d = o : c + u / 2 - (c / 2 - f) > l + h / 2 - (l / 2 - m) && (d = o),
                this.collisionChange(d),
                this.addRotationAtcollision()
            },
            collisionChange: function(e) {
                switch (e) {
                case "x":
                    if (!this.canChangeX)
                        break;
                    this.speedx = -this.speedx,
                    this.canChangeX = !1;
                    break;
                case "y":
                    if (!this.canChangeY)
                        break;
                    this.speedy = -this.speedy,
                    this.canChangeY = !1
                }
                this.rotation = this.getRotationBySpeed()
            },
            getSpeedX: function() {
                return Math.sin(2 * Math.PI / 360 * this.rotation) * this.speed
            },
            getSpeedY: function() {
                return Math.cos(2 * Math.PI / 360 * this.rotation) * this.speed
            },
            changeSpeed: function() {
                this.speedx = this.getSpeedX(),
                this.speedy = this.getSpeedY(),
                this.speedx_pool = this.speedx,
                this.speedy_pool = this.speedy
            },
            getRotationBySpeed: function() {
                var e = 180 * Math.atan(this.speedy / this.speedx) / Math.PI;
                return this.speedx > 0 ? this.rotation = 90 - e : this.rotation = -90 - e,
                this.rotation
            },
            setBolletRotation: function(e, t) {
                var i = (t.world.aabb.x - e.world.aabb.x) / e.node.width;
                i > .5 ? (this.speedx += (.9 * this.speed - .2 * this.speedx) * (i - .5),
                this.speedx = Math.min(this.speedx, .9 * this.speed)) : (this.speedx -= (.9 * this.speed + .2 * this.speedx) * (.5 - i),
                this.speedx = Math.max(this.speedx, .9 * -this.speed));
                var n = Math.sqrt(this.speed * this.speed - this.speedx * this.speedx);
                this.speedy = this.speedy > 0 ? n : -n
            },
            addRotationAtcollision: function() {
                this.rotation += Math.floor(10 * Math.random() - 5),
                this.speedx = this.getSpeedX(),
                this.speedy = this.getSpeedY()
            },
            destroyAway: function() {
                this.node.active = !1,
                this.node.removeFromParent()
            },
            onDestroy: function() {},
            addStatePic: function(e) {
                console.log("addStatePic = ", e)
            },
            delStatePic: function(e) {
                console.log("delStatePic = ", e)
            },
            update: function(e) {
                this.startGame && cc.dm.gameData.gameOver && (this.startGame = !1,
                this.node.getChildByName("sp").stopAllActions());
                if (!cc.dm.gameData.gameOver && !cc.dm.gameData.gamepause && cc.dm.gameData.gameStart) {
                    if (cc.dm.gameData.gameStart && !this.startGame)
                        this.startGame = !0,
                        this.node.getChildByName("sp").runAction(cc.rotateBy(1, 720).repeatForever()),
                        this.node.stopAction(this.startAction);
                    this.node.x <= -this.node.parent.width / 2 && (this.speedx = Math.abs(this.speedx)),
                    this.node.x >= this.node.parent.width / 2 && (this.speedx = -Math.abs(this.speedx)),
                    this.node.x += this.speedx,
                    this.node.y += this.speedy,
                    this.canChangeX = !0,
                    this.canChangeY = !0,
                    this.speedx_pool = this.speedx,
                    this.speedy_pool = this.speedy
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    bulletHero: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "69775VNCepD/7iWEKSfcYM0", "bulletHero");
        var n = e("bulletBase")
          , s = e("enums").Event_Name
          , o = e("stateManager");
        t.exports = cc.Class({
            extends: n,
            properties: {},
            onLoad: function() {
                n.prototype.onLoad.call(this),
                cc.gm.on(s.stateChange, this.stateChange.bind(this), this.node.uuid)
            },
            init: function(e) {
                n.prototype.init.call(this, e),
                console.log("this.speed =", this.speed),
                console.log("this.rotation = ", this.rotation),
                console.log("opt.state = ", e.states)
            },
            start: function() {},
            stateChange: function(e) {
                o.changeState(e, this, "bulletHero")
            },
            addStatePic: function(e) {},
            delStatePic: function(e) {},
            unuse: function() {},
            reuse: function(e) {
                cc.gm.on(s.stateChange, this.stateChange.bind(this), this.node.uuid),
                this.heroBulletPool = e,
                this.kind = 1,
                this.spFrame = "",
                this.speedBase = 8,
                this.scaleBase = 1,
                this.scaleOver = 1,
                this.rotation = 60,
                this.node.ATT = 1,
                this.speedx = 0,
                this.speedy = 0,
                this.speedx_pool = this.speedx,
                this.speedy_pool = this.speedy,
                this.canChangeX = !0,
                this.canChangeY = !0,
                this.lastCollisionBody = !1,
                this.startGame = !1
            },
            onCollisionEnter: function(e, t) {
                n.prototype.onCollisionEnter.call(this, e, t)
            },
            offEvent: function() {
                cc.gm.off(s.stateChange, this.node.uuid),
                this.heroBulletPool.put(this.node)
            },
            onDestroy: function() {
                console.log("remove bullet \uff01\uff01\uff01\uff01\uff01\uff01"),
                cc.gm.off(s.stateChange, this.node.uuid)
            },
            update: function(e) {
                n.prototype.update.call(this)
            }
        }),
        cc._RF.pop()
    }
    , {
        bulletBase: "bulletBase",
        enums: "enums",
        stateManager: "stateManager"
    }],
    chestBase: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "20a74fOUr9GT6aBf2VgdZ4x", "chestBase");
        var n = e("enums")
          , s = n.Event_Name
          , o = n.ChestKind;
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.kind = 1,
                this.spFrame = "",
                this.row = 0,
                this.col = 0,
                this.label = this.node.getChildByName("New Label").getComponent(cc.Label)
            },
            init: function(e) {
                this.kind = e.kind,
                this.spFrame = e.spFrame,
                this.row = e.row,
                this.col = e.col,
                this.offX = e.offX,
                this.offY = e.offY,
                this.label.string = this.kind === o.gold ? "\u91d1\u5b9d\u7bb1" : this.kind === o.silver ? "\u94f6\u5b9d\u7bb1" : "\u94dc\u5b9d\u7bb1",
                cc.gm.emit(s.setPosByRowCol, {
                    node: this.node,
                    row: this.row,
                    col: this.col,
                    offX: this.offX,
                    offY: this.offY
                })
            },
            start: function() {},
            onCollisionEnter: function(e, t) {
                !1 !== this.node.active && (this.destroyAway(),
                cc.gm.emit(s.breakChest, {
                    kind: this.kind,
                    pos: {
                        x: this.node.x,
                        y: this.node.y
                    }
                }))
            },
            destroyAway: function() {
                this.node.active = !1,
                this.node.removeFromParent()
            },
            onDestroy: function() {}
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    clickEffectComp: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4d941+EKL5MDKgjCBO14eMI", "clickEffectComp"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.node.on("click", function() {
                    cc.gm.playMusicEffect("sound/click")
                })
            },
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    codes: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "6d464bNnzJP0pUB6A6stbLC", "codes"),
        t.exports = {
            OK: 0,
            FALSE: 1
        },
        cc._RF.pop()
    }
    , {}],
    commonData: [function(e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        cc._RF.push(t, "edab3KmXVtAIro7iabb3WWI", "commonData"),
        t.exports = function(e) {
            for (var t in l.prototype)
                e.__proto__[t] = l.prototype[t]
        }
        ;
        var s = e("enums")
          , o = s.userDataKey
          , a = s.Event_Name
          , r = s.powerTime
          , c = s.magicTime
          , l = function e() {
            n(this, e)
        };
        l.prototype.hello = function(e, t) {
            console.log("loginData = ", e),
            console.log("loginData = ", t),
            console.log("this = ", this),
            this.abc = 2
        }
        ,
        l.prototype.powerBack = function() {
            var e = this;
            this.poeweBackTimeOut || (this.poeweBackTimeOut = setTimeout(function() {
                e.poeweBackTimeOut = null,
                e.userBase.power < e.userBase.powerMax && (e.userBase.power++,
                e.userBase.powerDate = Date.now(),
                cc.gm.emit(a.changePowerAndMagic, {}),
                e.userBase.power < e.userBase.powerMax ? e.powerBack() : delete e.userBase.powerDate,
                e.setItem(o.userBase, JSON.stringify(e.userBase)))
            }, 1e3 * r))
        }
        ,
        l.prototype.magicBack = function() {
            var e = this;
            this.magicBackTimeOut || (this.magicBackTimeOut = setTimeout(function() {
                e.magicBackTimeOut = null,
                e.userBase.magic < e.userBase.magicMax && (e.userBase.magic++,
                e.userBase.magicDate = Date.now(),
                console.log("changePowerAndMagic this.userBase.magic = ", e.userBase.magic),
                cc.gm.emit(a.changePowerAndMagic, {}),
                console.log("changePowerAndMagic emit!!!"),
                e.userBase.magic < e.userBase.magicMax ? e.magicBack() : delete e.userBase.magicDate,
                e.setItem(o.userBase, JSON.stringify(e.userBase)))
            }, 1e3 * c))
        }
        ,
        l.prototype.changePowerAndMagic = function(e) {
            var t = e.power
              , i = e.magic;
            this.userBase.power += t || 0,
            this.userBase.magic += i || 0,
            (t || i) && this.setItem(o.userBase, JSON.stringify(this.userBase))
        }
        ,
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    dead: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4d4edaezChAsa3fcVOv7Mt4", "dead"),
        cc.Class({
            extends: cc.Component,
            properties: {
                deadSp: {
                    default: null,
                    type: cc.Node
                },
                deadAnimNode: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
                this.deadAnimNode.getComponent(cc.Animation).on("finished", this.onFinished, this)
            },
            initSp: function(e) {
                var t = this;
                e ? (this.deadSp.active = !0,
                this.deadSp.getComponent(cc.Sprite).spriteFrame = e,
                this.deadSp.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
                    t.deadSp.active = !1,
                    t.deadAnimNode.active = !0,
                    t.deadAnimNode.getComponent(cc.Animation).play()
                })))) : (this.deadSp.active = !1,
                this.deadAnimNode.active = !0,
                this.deadAnimNode.getComponent(cc.Animation).play())
            },
            start: function() {},
            unuse: function() {
                this.deadAnimNode.getComponent(cc.Animation).off("finished", this.onFinished, this)
            },
            reuse: function(e) {
                this.deadPool = e,
                this.deadSp.active = !1,
                this.deadAnimNode.active = !1,
                this.deadAnimNode.getComponent(cc.Animation).on("finished", this.onFinished, this)
            },
            onFinished: function() {
                this.deadPool.put(this.node)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    dm: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c822deQRMpFd4f93gWAtxFH", "dm");
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i),
                n && e(t, n),
                t
            }
        }();
        function s(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        e("encryptjs");
        var o = e("enums")
          , a = (o.SessionKey,
        o.SkillType,
        function() {
            function t() {
                s(this, t),
                e("commonData")(this),
                e("loginData")(this),
                e("hallData")(this),
                e("gameData")(this),
                e("endData")(this),
                this.userBase = null
            }
            return n(t, [{
                key: "setItem",
                value: function(e, t) {
                    void 0 !== t && null !== t ? (cc.sys.localStorage.setItem(e, t),
                    console.log("setItem key = ", e)) : console.log("gameManager.setItem value is null")
                }
            }, {
                key: "getItem",
                value: function(e) {
                    return cc.sys.localStorage.getItem(e)
                }
            }, {
                key: "removeItem",
                value: function(e) {
                    cc.sys.localStorage.removeItem(e)
                }
            }, {
                key: "parseJsonNumber",
                value: function(e) {
                    for (var t in e) {
                        var i = e[t];
                        for (var n in i)
                            try {
                                i[n] = isNaN(Number(i[n])) ? i[n] : Number(i[n])
                            } catch (e) {}
                    }
                }
            }, {
                key: "format",
                value: function(e) {
                    if (arguments.length > 1)
                        for (var t = 1; t < arguments.length; t++)
                            e = e.replace("%s", arguments[t]);
                    return e
                }
            }, {
                key: "getFormatNumber",
                value: function(e) {
                    return e / 1e6 > 1 ? parseFloat(e / 1e6).toFixed(2) + "M" : e / 1e3 > 1 ? parseFloat(e / 1e3).toFixed(2) + "K" : e.toString()
                }
            }]),
            t
        }());
        t.exports = a,
        cc._RF.pop()
    }
    , {
        commonData: "commonData",
        encryptjs: 2,
        endData: "endData",
        enums: "enums",
        gameData: "gameData",
        hallData: "hallData",
        loginData: "loginData"
    }],
    endData: [function(e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        cc._RF.push(t, "612128SbENG2LHeIFp9c1Ru", "endData"),
        t.exports = function(e) {
            for (var t in s.prototype)
                e.__proto__[t] = s.prototype[t]
        }
        ;
        var s = function e() {
            n(this, e)
        };
        cc._RF.pop()
    }
    , {}],
    endGame: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5367eBd+D9DUq3/kwc++Cel", "endGame");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                stars: {
                    default: [],
                    type: [cc.Node]
                },
                win: {
                    default: null,
                    type: cc.Node
                },
                lose: {
                    default: null,
                    type: cc.Node
                },
                level: {
                    default: null,
                    type: cc.Label
                },
                coinLab: {
                    default: null,
                    type: cc.Label
                },
                powerLab: {
                    default: null,
                    type: cc.Label
                },
                levelLab: {
                    default: null,
                    type: cc.Label
                },
                levelSp: {
                    default: null,
                    type: cc.Sprite
                },
                levelNum: {
                    default: null,
                    type: cc.Label
                },
                doubleBtnNode: {
                    default: null,
                    type: cc.Node
                },
                addTimeBtnNode: {
                    default: null,
                    type: cc.Node
                },
                reGameBtnNode: {
                    default: null,
                    type: cc.Node
                },
                reGameMoneyBtnNode: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {},
            init: function(e, t) {
                var i = this;
                this.win.active = e,
                this.lose.active = !e,
                this.level.string = "d" + cc.dm.wantToLevel + "g";
                var s = cc.dm.gameRole.HP >= 3 ? 3 : cc.dm.gameRole.HP;
                if (e) {
                    for (var o = [.1, .6, 1.1], a = function(e) {
                        e < s ? i.node.runAction(cc.sequence(cc.delayTime(o[e]), cc.callFunc(function() {
                            i.stars[e].active = !0,
                            i.stars[e].getComponent(cc.Animation).play(),
                            cc.gm.playMusicEffect("sound/winStar")
                        }))) : i.stars[e].active = !1
                    }, r = 0; r < this.stars.length; r++)
                        a(r);
                    this.doubleBtnNode.getComponent(cc.Button).interactable = !cc.dm.gameCfg.double,
                    this.setWinLab(),
                    cc.gm.emit(n.finishTask, 2)
                } else {
                    cc.gm.playMusicEffect("sound/lose");
                    for (r = 0; r < this.stars.length; r++)
                        this.stars[r].active = !1;
                    this.addTimeBtnNode.active = t,
                    this.reGameBtnNode.active = !t && !cc.dm.gameCfg.reGame,
                    this.reGameMoneyBtnNode.active = !t && cc.dm.gameCfg.reGame,
                    this.addTimeBtnNode.getComponent(cc.Button).interactable = !cc.dm.gameCfg.addTime,
                    this.reGameBtnNode.getComponent(cc.Button).interactable = !cc.dm.gameCfg.reGame,
                    this.reGameMoneyBtnNode.getComponent(cc.Button).interactable = cc.dm.userBase.money >= 50
                }
            },
            start: function() {
				var lose = cc.find("lose", this.node);
				var doubleWin = cc.find("win/double", this.node);
				//埋点 激励用完隐藏 不用定时
				//lose.children[4].active = 0;
				//doubleWin.active = 0;
				
				
				//埋点 上报分数
				console.log("score:" + cc.dm.wantToLevel);
			},
            setWinLab: function() {
                var e = cc.dm.userBase
                  , t = e.wantExp;
                this.coinLab.string = "x" + cc.dm.gameCfg.gameRule.goldreward,
                this.powerLab.string = "x" + cc.dm.awardPower,
                this.levelLab.string = "\u5f53\u524d\u7b49\u7ea7:" + cc.dm.userBase.userLevel,
                this.levelSp.fillRange = parseFloat(e.userEXP / t),
                this.levelNum.string = e.userEXP + " / " + t
            },
            closeBtnCallBack: function() {
                cc.gm.loadScene("hallScene")
            },
            nextBtnCallBack: function(e) {
                var t = e.target;
                t.getComponent(cc.Button).interactable = !1,
                cc.gm.showLoading(),
                cc.dm.setGameCfg(1, function() {
                    cc.gm.hideLoading(),
                    t.getComponent(cc.Button).interactable = !0,
                    cc.dm.gameCfg.map ? cc.dm.userBase.power >= cc.dm.gameCfg.gameRule.cost ? (cc.dm.costPower(),
                    cc.gm.loadScene("gameScene")) : (console.log("no power !!!!!"),
                    cc.gm.showMsg("\u4f53\u529b\u4e0d\u8db3")) : cc.gm.showMsg("\u656c\u8bf7\u671f\u5f85\u540e\u7eed\u5173\u5361")
                })
            },
            reGameBtnCallBack: function(e) {
                var t = e.target;
                t.getComponent(cc.Button).interactable = !1,
                cc.gm.showLoading(),
                cc.dm.setGameCfg(0, function() {
                    cc.gm.hideLoading(),
                    t.getComponent(cc.Button).interactable = !0,
                    cc.dm.gameCfg.map ? cc.dm.userBase.power >= cc.dm.gameCfg.gameRule.cost ? (cc.dm.costPower(),
                    cc.gm.loadScene("gameScene")) : (console.log("no power !!!!!"),
                    cc.gm.showMsg("\u4f53\u529b\u4e0d\u8db3")) : cc.gm.showMsg("\u656c\u8bf7\u671f\u5f85\u540e\u7eed\u5173\u5361")
                })
            },
            addTimeBtnCallBack: function(e) {
                var t = this;
                cc.dm.gameCfg.addTime || cc.nm.showView("adunit-0838d2f1a54e3f26", function() {
                    t.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
                        cc.dm.gameCfg.addTime = !0,
                        cc.gm.emit(n.reGame, {
                            time: 30
                        }),
                        t.node.removeFromParent()
                    })))
                })
            },
            addLifeBtnCallBack: function(e) {
                var t = this;
                cc.dm.gameCfg.reGame || cc.nm.showView("adunit-875837230a59cf89", function() {
                    t.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
                        cc.dm.gameCfg.reGame = !0,
                        cc.gm.emit(n.reGame, {
                            life: 1
                        }),
                        t.node.removeFromParent()
                    })))
                })
            },
            doubleBtnCallBack: function(e) {
                var t = this;
                cc.dm.gameCfg.double || cc.nm.showView("adunit-fdfc7c2bac1e6b17", function() {
                    t.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
                        cc.dm.gameCfg.double = !0,
                        t.doubleBtnNode.getComponent(cc.Button).interactable = !cc.dm.gameCfg.double,
                        cc.dm.getLevelDouble(),
                        t.coinLab.string = "x" + 2 * cc.dm.gameCfg.gameRule.goldreward,
                        t.powerLab.string = "x" + 2 * cc.dm.awardPower
                    })))
                })
            },
            shareBtnCallBack: function(e) {
                cc.nm.share(function(e) {
                    e ? console.log("share ok") : (console.log("share false"),
                    cc.gm.showMsg("\u5206\u4eab\u5931\u8d25"))
                })
            },
            reGameMoneyBtnCallBack: function() {
                cc.dm.reGameByMoney(),
                cc.gm.emit(n.reGame, {
                    life: 1
                }),
                this.node.removeFromParent()
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    endScene: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "27c0dCGuRJDMJcLM5KEKUQS", "endScene"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    enums: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "8f74axgcCNG1Z5lQ4Xdhh1/", "enums"),
        t.exports = {
            SessionKey: "huaXiaLM",
            powerTime: 300,
            magicTime: 30,
            Event_Name: {
                setPosByRowCol: "setPosByRowCol",
                breakStone: "breakStone",
                breakChest: "breakChest",
                breakMaster: "breakMaster",
                breakItem: "breakItem",
                collisionBody: "collisionBody",
                makeMasterBullet: "makeMasterBullet",
                canUseSkill: "canUseSkill",
                changeHeroDir: "changeHeroDir",
                stopHero: "stopHero",
                useSkill: "useSkill",
                stateChange: "stateChange",
                changeCD: "changeCD",
                reGame: "reGame",
                eventFenShen: "eventFenShen",
                eventHuiFu: "eventHuiFu",
                updateUserInfoInHall: "updateUserInfoInHall",
                showChooseHeroLayer: "showChooseHeroLayer",
                loadGameScene: "loadGameScene",
                finishTask: "finishTask",
                changePowerAndMagic: "changePowerAndMagic"
            },
            HeroDir: {
                left: "left",
                right: "right"
            },
            EnermyType: {},
            ChestKind: {
                gold: "gold",
                silver: "silver",
                cuprum: "cuprum"
            },
            SkillType: {
                fenlie: "fenlie",
                baopo: "baopo",
                chuantou: "chuantou"
            },
            userDataKey: {
                userBase: "userBase",
                userSkill: "userSkill",
                userShop: "userShop",
                userLoginTask: "userLoginTask",
                userDayTask: "userDayTask",
                levelMap: "levelMap",
                dayPrizeInfo: "dayPrizeInfo"
            },
            bgName: {
                background_0: 0,
                background_1: 1,
                background_2: 2,
                background_3: 3,
                background_4: 4,
                background_5: 5
            }
        },
        cc._RF.pop()
    }
    , {}],
    gameData: [function(e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        cc._RF.push(t, "79f2aFy4OdIkIHsUfo+73Jd", "gameData"),
        t.exports = function(e) {
            for (var t in o.prototype)
                e.__proto__[t] = o.prototype[t]
        }
        ;
        var s = e("enums").userDataKey
          , o = function e() {
            n(this, e)
        };
        o.prototype.initGameData = function(e, t) {}
        ,
        o.prototype.collisionBody = function(e) {
            e.ATT > 0 && (this.gameRole.HP -= 1)
        }
        ,
        o.prototype.breakStone = function(e) {
            this.gameCfg.score = this.gameCfg.score || 0,
            this.gameCfg.score += e.score
        }
        ,
        o.prototype.breakMaster = function(e) {
            this.gameCfg.score = this.gameCfg.score || 0,
            this.gameCfg.score += e.score
        }
        ,
        o.prototype.gameOver = function(e) {
            if (this.gameDouble = {},
            e) {
                this.wantToLevel > this.userBase.level && (this.userBase.level += 1),
                this.userBase.coin += this.gameCfg.gameRule.goldreward,
                this.userBase.userEXP += this.gameCfg.gameRule.cost,
                this.awardPower = 0;
                var t = this.gameRole.HP >= 3 ? 3 : this.gameRole.HP;
                if (!(this.levelMap[this.wantToLevel] && this.levelMap[this.wantToLevel] >= t)) {
                    this.levelMap[this.wantToLevel] = this.levelMap[this.wantToLevel] || 0;
                    var i = [this.gameCfg.gameRule.osreward, this.gameCfg.gameRule.twsreward, this.gameCfg.gameRule.thsreward];
                    if (t > this.levelMap[this.wantToLevel])
                        for (var n = this.levelMap[this.wantToLevel]; n < t; n++)
                            this.awardPower += i[n];
                    this.levelMap[this.wantToLevel] = t,
                    this.userBase.power += this.awardPower,
                    this.setItem(s.levelMap, JSON.stringify(this.levelMap))
                }
                this.gameDouble.coin = this.gameCfg.gameRule.goldreward,
                this.gameDouble.power = this.awardPower,
                this._checkUpLevel()
            }
            this._initPowerAndMagic()
        }
        ,
        o.prototype.getLevelDouble = function() {
            console.log("this.gameDouble = ", this.gameDouble),
            this.userBase.coin += this.gameDouble.coin || 0,
            this.userBase.power += this.gameDouble.power || 0;
            var e = "\u83b7\u5f97\u53cc\u500d\u5956\u52b1 ";
            this.gameDouble.coin > 0 && (e += "\u91d1\u5e01+" + 2 * this.gameDouble.coin),
            this.gameDouble.power > 0 && (e += "\u4f53\u529b+" + 2 * this.gameDouble.power),
            cc.gm.showMsg(e),
            this.setItem(s.userBase, JSON.stringify(this.userBase))
        }
        ,
        o.prototype.reGameByMoney = function() {
            this.userBase.money -= 50,
            cc.gm.showMsg("\u5143\u5b9d-50"),
            this.setItem(s.userBase, JSON.stringify(this.userBase))
        }
        ,
        o.prototype.setGameCfg = function(e, t) {
            var i = this;
            cc.dm.gameRole.HP = this.userBase.life,
            cc.dm.gameRole.HPMax = this.userBase.life,
            cc.dm.gameRole.ATT = 1,
            this.wantToLevel += e,
            this.gameCfg.level = this.wantToLevel,
            this.gameCfg.score = 0,
            this.gameCfg.addTime = !1,
            this.gameCfg.reGame = !1,
            this.gameCfg.double = !1,
            this.gameCfg.gameRule = this.gameCfg.raid[this.wantToLevel - 1],
            cc.loader.loadRes("common/JSON/guanka/" + cc.dm.gameCfg.gameRule.map, function(e, n) {
                i.gameCfg.map = n.json,
                i.parseJsonNumber(cc.dm.gameCfg.map),
                cc.loader.releaseResDir("common/JSON/chestItem"),
                t(),
                console.log("this.gameCfg = ", i.gameCfg)
            })
        }
        ,
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    gameManager: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "ee8afI5IcdGoJTVzhF/A7N5", "gameManager");
        var n = e("enums")
          , s = n.Event_Name
          , o = n.bgName
          , a = cc.Class({
            name: "master",
            properties: {
                "-1": cc.Prefab,
                1: cc.Prefab,
                2: cc.Prefab,
                3: cc.Prefab,
                4: cc.Prefab,
                5: cc.Prefab,
                6: cc.Prefab,
                7: cc.Prefab,
                8: cc.Prefab,
                10000: cc.Prefab,
                10001: cc.Prefab,
                10002: cc.Prefab,
                10003: cc.Prefab,
                10004: cc.Prefab,
                10005: cc.Prefab,
                10006: cc.Prefab,
                10007: cc.Prefab,
                10008: cc.Prefab,
                10009: cc.Prefab,
                10010: cc.Prefab
            }
        })
          , r = e("stateManager");
        cc.Class({
            extends: cc.Component,
            properties: {
                heroBullet: {
                    default: null,
                    type: cc.Prefab
                },
                master: {
                    default: null,
                    type: a
                },
                item: {
                    default: null,
                    type: cc.Prefab
                },
                bulletNode: {
                    default: null,
                    type: cc.Node
                },
                masterLayer: {
                    default: null,
                    type: cc.Node
                },
                bulletAndItemLayer: {
                    default: null,
                    type: cc.Node
                },
                skillPrefab: {
                    default: null,
                    type: cc.Prefab
                },
                heroNode: {
                    default: null,
                    type: cc.Node
                },
                scoreLab: {
                    default: null,
                    type: cc.Label
                },
                levelLab: {
                    default: null,
                    type: cc.Label
                },
                lifeNodes: {
                    default: [],
                    type: [cc.Node]
                },
                timeNode: {
                    default: null,
                    type: cc.Node
                },
                magicPoolSp: {
                    default: null,
                    type: cc.Sprite
                },
                magicPoolLab: {
                    default: null,
                    type: cc.Label
                },
                scoreAnimLabel: {
                    default: null,
                    type: cc.Node
                },
                skillPanel: {
                    default: null,
                    type: cc.Node
                },
                deadPrefab: {
                    default: null,
                    type: cc.Prefab
                },
                itemPrefab: {
                    default: null,
                    type: cc.Prefab
                },
                skillFontPrefab: {
                    default: null,
                    type: cc.Prefab
                },
                bgArr: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                hartActionNode: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
                this.startPos = {
                    x: -this.masterLayer.width / 2 + 12,
                    y: .375 * this.masterLayer.height
                },
                this.spBody = {
                    width: 68,
                    height: 68
                },
                this.initEvents(),
                this.map = cc.dm.gameCfg.map.map,
                cc.dm.gameData = {},
                cc.dm.gameData.heroBullets = [],
                cc.dm.gameData.score = 0,
                cc.dm.gameData.gameStart = !1,
                cc.dm.gameData.gamepause = !1,
                cc.dm.gameData.gameOver = !1,
                console.log("this.map = ", this.map),
                console.log("this.gameData = ", cc.dm.gameData),
                this.initUserInfo(),
                this.initGame()
            },
            start: function() {},
            initEvents: function() {
                cc.gm.on(s.setPosByRowCol, this.setPosByRowCol.bind(this), this.node.uuid),
                cc.gm.on(s.breakChest, this.breakChest.bind(this), this.node.uuid),
                cc.gm.on(s.breakStone, this.breakStone.bind(this), this.node.uuid),
                cc.gm.on(s.breakMaster, this.breakMaster.bind(this), this.node.uuid),
                cc.gm.on(s.breakItem, this.breakItem.bind(this), this.node.uuid),
                cc.gm.on(s.collisionBody, this.collisionBody.bind(this), this.node.uuid),
                cc.gm.on(s.makeMasterBullet, this.makeMasterBullet.bind(this), this.node.uuid),
                cc.gm.on(s.changePowerAndMagic, this.changePowerAndMagic.bind(this), this.node.uuid),
                cc.gm.on(s.stateChange, this.stateChange.bind(this), this.node.uuid),
                cc.gm.on(s.reGame, this.reGame.bind(this), this.node.uuid),
                cc.gm.on(s.eventHuiFu, this.eventHuiFu.bind(this), this.node.uuid),
                cc.gm.on(s.eventFenShen, this.eventFenShen.bind(this), this.node.uuid)
            },
            getMasterInfoById: function(e) {
                var t = null;
                for (var i in cc.dm.gameCfg.block)
                    if (cc.dm.gameCfg.block[i].ID == e) {
                        t = cc.dm.gameCfg.block[i];
                        break
                    }
                return t
            },
            getMasterId: function(e) {
                return (e = parseInt(e)) / 1e4 >= 1 ? e.toString() : e > 0 ? parseInt(e / 1e3).toString() : e.toString()
            },
            initGame: function() {
                for (var e = 0; e < this.map.length; e++)
                    for (var t = this.map[e], i = 0; i < t.length; i++) {
                        var n = this.map[e][i];
                        if (n) {
                            var s = this.getMasterInfoById(n);
                            s.row = e,
                            s.col = i,
                            s.masterId = this.getMasterId(n);
                            var a = cc.instantiate(this.master[s.masterId]);
                            "-1" === s.masterId ? this.bulletAndItemLayer.addChild(a) : this.masterLayer.addChild(a),
                            a.getComponent("masterBase").init(s)
                        }
                    }
                this.levelLab.string = "d" + cc.dm.wantToLevel + "g",
                this.scoreLab.string = "DF:" + cc.dm.gameCfg.score,
                this.magicPoolSp.fillRange = cc.dm.userBase.magic / cc.dm.userBase.magicMax,
                this.magicPoolLab.string = cc.dm.userBase.magic + "/" + cc.dm.userBase.magicMax,
                this.initTime(),
                this.initSkillPanel(),
                this.scorePool = new cc.NodePool;
                for (var c = 0; c < 5; ++c) {
                    var l = cc.instantiate(this.scoreAnimLabel);
                    this.scorePool.put(l)
                }
                this.deadPool = new cc.NodePool("dead");
                for (var u = 0; u < 5; ++u) {
                    var h = cc.instantiate(this.deadPrefab);
                    h.getComponent("dead").deadPool = this.deadPool,
                    this.deadPool.put(h)
                }
                this.skillPool = new cc.NodePool("itemBase");
                for (var d = 0; d < 5; ++d) {
                    var f = cc.instantiate(this.itemPrefab);
                    f.getComponent("itemBase").skillPool = this.skillPool,
                    this.skillPool.put(f)
                }
                this.skillFontPool = new cc.NodePool("skillFont");
                for (var m = 0; m < 5; ++m) {
                    var g = cc.instantiate(this.skillFontPrefab);
                    g.getComponent("skillFont").skillFontPool = this.skillFontPool,
                    this.skillFontPool.put(g)
                }
                this.heroBulletPool = new cc.NodePool("bulletHero");
                for (var p = 0; p < 5; ++p) {
                    var y = cc.instantiate(this.heroBullet);
                    y.getComponent("bulletHero").heroBulletPool = this.heroBulletPool,
                    this.heroBulletPool.put(y)
                }
                this.bulletNode.getComponent("bulletHero").heroBulletPool = this.heroBulletPool,
                this.bulletNode.getComponent("bulletHero").initNodeAction(this.heroNode),
                cc.find("Canvas/game/bg").getComponent(cc.Sprite).spriteFrame = this.bgArr[o[cc.dm.gameCfg.gameRule.background]],
                r.clearTimeOut()
            },
            initUserInfo: function() {
                for (var e = 0; e < this.lifeNodes.length; e++)
                    e < cc.dm.gameRole.HPMax ? this.lifeNodes[e].active = !0 : this.lifeNodes[e].active = !1
            },
            getTime: function(e) {
                var t = Math.floor(e)
                  , i = Math.floor(t / 60)
                  , n = Math.floor(t % 60);
                return (i = i < 0 ? 0 : i) + ":" + ((n = n < 0 ? 0 : n) < 10 ? "0" + n : n)
            },
            initTime: function() {
                var e = this
                  , t = this.timeNode.getComponent(cc.Sprite)
                  , i = this.timeNode.parent.getChildByName("timeLab").getComponent(cc.Label);
                if (t.fillRange = 1,
                i.string = this.getTime(cc.dm.gameCfg.gameRule.time * t.fillRange),
                cc.dm.gameCfg.gameRule.time > 0) {
                    var n = parseFloat(.5 / cc.dm.gameCfg.gameRule.time)
                      , s = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
                        cc.dm.gameData.gameStart && (cc.dm.gameData.gamepause || cc.dm.gameData.gameOver || (t.fillRange -= n,
                        i.string = e.getTime(cc.dm.gameCfg.gameRule.time * t.fillRange),
                        t.fillRange <= 0 && (cc.gm.showMsg("\u65f6\u95f4\u5230"),
                        e.gameOver(!1, !0),
                        e.node.stopAction(s))))
                    })).repeatForever();
                    this.node.runAction(s)
                }
            },
            initSkillPanel: function() {
                for (var e in this.skillPanel.removeAllChildren(),
                cc.dm.gameRole.skill) {
                    var t = cc.dm.gameRole.skill[e]
                      , i = cc.instantiate(this.skillPrefab);
                    this.skillPanel.addChild(i),
                    i.getComponent("skillBtn").initSkillNode(t)
                }
            },
            refreshUserHp: function() {
                for (var e = 0; e < this.lifeNodes.length; e++)
                    e < cc.dm.gameRole.HPMax ? this.lifeNodes[e].active = !0 : this.lifeNodes[e].active = !1,
                    e < cc.dm.gameRole.HP ? this.lifeNodes[e].getChildByName("hart").active = !0 : this.lifeNodes[e].getChildByName("hart").active = !1
            },
            beganGame: function(e) {
                var t = e.target.parent;
                t && t.removeFromParent(!0),
                cc.dm.gameData.gameOver || cc.dm.gameData.gameStart || cc.dm.gameData.gamepause || (cc.dm.gameData.gameStart = !0,
                this.updateSkillBtn(),
                this.bulletNode.getComponent("bulletHero").init({
                    speed: 16,
                    ATT: 1,
                    rotation: 100 * Math.random() - 50,
                    states: {},
                    hero: this.heroNode
                }),
                cc.dm.gameData.heroBullets.push(this.bulletNode))
            },
            createBullet: function(e, t, i, n) {
                var s = this.heroBulletPool.get(this.heroBulletPool);
                s || (console.log("\u521b\u5efa\u4e00\u4e2a\u5b50\u5f39"),
                (s = cc.instantiate(this.heroBullet)).getComponent("bulletHero").heroBulletPool = this.heroBulletPool),
                this.bulletAndItemLayer.addChild(s),
                s.x = t,
                s.y = i,
                s.index = cc.dm.gameData.heroBullets.length,
                s.getComponent("bulletHero").init({
                    speed: 16,
                    ATT: 1,
                    rotation: e,
                    states: n
                }),
                cc.dm.gameData.heroBullets.push(s),
                console.log("cc.dm.gameData.heroBullets = ", cc.dm.gameData.heroBullets)
            },
            updateSkillBtn: function() {
                for (var e in this.skillPanel.children)
                    this.skillPanel.children[e].getComponent("skillBtn").checkCanTouch()
            },
            onDestroy: function() {
                cc.gm.removeAllListeners(),
                this.startGameTimeOut && (clearTimeout(this.startGameTimeOut),
                this.startGameTimeOut = null),
                console.log("destory!!!!!"),
                r.clearTimeOut(),
                cc.dm.gameData.heroBullets = []
            },
            setPosByRowCol: function(e) {
                e.node.x = this.startPos.x + e.col * this.spBody.width + this.spBody.width / 2 + e.offX,
                e.node.y = this.startPos.y - e.row * this.spBody.height - this.spBody.height / 2 - e.offY
            },
            breakChest: function(e) {
                console.log("breakChest = ", e);
                var t = this.itemsData[e.kind]
                  , i = Math.floor(Math.random() * t.length)
                  , n = cc.instantiate(this.item);
                n.x = e.pos.x,
                n.y = e.pos.y,
                this.bulletAndItemLayer.addChild(n),
                n.getComponent("itemBase").init(t[i]),
                this.checkGameOver()
            },
            breakStone: function(e) {
                console.log("breakStone = ", e),
                this.scoreLab.string = "DF:" + cc.dm.gameCfg.score,
                this.checkGameOver()
            },
            breakMaster: function(e) {
                var t = this;
                console.log("breakMaster = ", e),
                this.scoreLab.string = "DF:" + cc.dm.gameCfg.score;
                var i = this.scorePool.get();
                i || (console.log("\u521b\u5efa\u4e00\u4e2a\u5206\u6570\u5b57"),
                i = cc.instantiate(this.scoreAnimLabel)),
                i.x = e.pos.x,
                i.y = e.pos.y + e.off.y,
                i.scale = 1,
                i.opacity = 255,
                i.active = !0,
                i.getComponent(cc.Label).string = "+" + e.score,
                this.bulletAndItemLayer.addChild(i),
                i.runAction(cc.sequence(cc.delayTime(.4), cc.fadeOut(.2))),
                i.runAction(cc.moveBy(.6, 0, 50)),
                i.runAction(cc.sequence(cc.delayTime(.7), cc.callFunc(function() {
                    t.scorePool.put(i)
                })));
                var n = this.deadPool.get(this.deadPool);
                if (n || (console.log("\u521b\u5efa\u4e00\u4e2a\u6d88\u5931\u52a8\u753b"),
                (n = cc.instantiate(this.deadPrefab)).getComponent("dead").deadPool = this.deadPool),
                n.x = e.pos.x,
                n.y = e.pos.y,
                n.getComponent("dead").initSp(e.dieSp),
                this.bulletAndItemLayer.addChild(n),
                e.dropId > 0) {
                    var s = this.skillPool.get(this.skillPool);
                    s || (console.log("\u521b\u5efa\u4e00\u4e2a\u6389\u843d\u9053\u5177"),
                    (s = cc.instantiate(this.itemPrefab)).getComponent("itemBase").skillPool = this.skillPool),
                    s.x = e.pos.x,
                    s.y = e.pos.y,
                    s.getComponent("itemBase").init(e.dropId),
                    this.bulletAndItemLayer.addChild(s)
                }
                this.checkGameOver()
            },
            breakItem: function(e) {
                console.log("breakItem = ", e),
                cc.gm.emit(s.stateChange, e.skillInfo)
            },
            stateChange: function(e) {
                var t = this.skillFontPool.get(this.skillFontPool);
                t || (console.log("\u521b\u5efa\u4e00\u4e2a\u6280\u80fd\u5b57"),
                (t = cc.instantiate(this.skillFontPrefab)).getComponent("skillFont").skillFontPool = this.skillFontPool);
                var i = this.node.getComponent("gameScene").hero;
                t.x = i.x,
                t.y = i.y + 30,
                t.getComponent("skillFont").init(e),
                this.bulletAndItemLayer.addChild(t)
            },
            collisionBody: function(e) {
                console.log("collisionBody = ", e),
                e.ATT > 0 && (cc.nm.vibrateShort(),
                this.hartAction(!1)),
                this.checkGameOver()
            },
            makeMasterBullet: function(e) {
                console.log("makeMasterBullet = ", e);
                var t = cc.instantiate(this.masterBullet);
                t.x = e.pos.x,
                t.y = e.pos.y,
                this.bulletAndItemLayer.addChild(t),
                t.getComponent("bulletMaster").init(e)
            },
            changePowerAndMagic: function() {
                console.log("changePowerAndMagic!!!!"),
                this.magicPoolSp.fillRange = cc.dm.userBase.magic / cc.dm.userBase.magicMax,
                this.magicPoolLab.string = cc.dm.userBase.magic + "/" + cc.dm.userBase.magicMax,
                this.updateSkillBtn()
            },
            checkGameOver: function() {
                this.refreshUserHp(),
                this.masterLayer.childrenCount <= 0 && (console.log("gameWin!!!!!"),
                this.gameOver(!0)),
                cc.dm.gameRole.HP <= 0 && (console.log("gameFalse!!!!!"),
                this.gameOver(!1))
            },
            hartAction: function(e) {
                var t = this
                  , i = this.hartActionNode.getChildByName("jia")
                  , n = this.hartActionNode.getChildByName("jian");
                this.hartActionNode.active = !0,
                this.hartActionNode.stopAllActions(),
                i.active = e,
                n.active = !e,
                this.hartActionNode.x = 0,
                this.hartActionNode.y = 0,
                this.hartActionNode.scale = .2,
                this.hartActionNode.opacity = 30,
                this.hartActionNode.runAction(cc.scaleTo(.5, 1)),
                this.hartActionNode.runAction(cc.moveBy(1.2, 0, 20)),
                this.hartActionNode.runAction(cc.sequence(cc.fadeIn(.3), cc.delayTime(.5), cc.fadeOut(.4), cc.callFunc(function() {
                    t.hartActionNode.active = !1
                })))
            },
            addHp: function() {
                this.refreshUserHp(),
                this.hartAction(!0)
            },
            eventHuiFu: function(e) {
                this.addHp()
            },
            eventFenShen: function(e) {
                for (var t = cc.dm.gameData.heroBullets.length; t < e.num; t++)
                    this.createBullet(100 * Math.random() - 50, e.pos.x, e.pos.y, {})
            },
            gameOver: function(e, t) {
                var i = this;
                cc.dm.gameData.gameOver = !0,
                cc.dm.gameData.gameStart = !1,
                cc.dm.gameOver(e),
                cc.gm.showLoading(),
                cc.loader.loadRes("game/prefabs/endGame", function(n, s) {
                    cc.gm.hideLoading();
                    var o = cc.instantiate(s);
                    i.node.addChild(o),
                    o.getComponent("endGame").init(e, t)
                })
            },
            reGame: function(e) {
                var t = this;
                if (cc.dm.gameData.gameOver = !1,
                cc.dm.gameData.gameStart = !0,
                e.time) {
                    var i = this.timeNode.getComponent(cc.Sprite)
                      , n = this.timeNode.parent.getChildByName("timeLab").getComponent(cc.Label);
                    i.fillRange = 1,
                    n.string = this.getTime(e.time * i.fillRange);
                    var s = parseFloat(.5 / cc.dm.gameCfg.gameRule.time)
                      , o = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
                        cc.dm.gameData.gameStart && (cc.dm.gameData.gamepause || cc.dm.gameData.gameOver || (i.fillRange -= s,
                        n.string = t.getTime(e.time * i.fillRange),
                        i.fillRange <= 0 && (cc.gm.showMsg("\u65f6\u95f4\u5230"),
                        t.gameOver(!1, !0),
                        t.node.stopAction(o))))
                    })).repeatForever();
                    this.node.runAction(o)
                } else
                    e.life && (cc.dm.gameRole.HP += e.life,
                    cc.dm.gameRole.HP = cc.dm.gameRole.HP > cc.dm.gameRole.HPMax ? cc.dm.gameRole.HPMax : cc.dm.gameRole.HP,
                    this.addHp())
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums",
        stateManager: "stateManager"
    }],
    gameScene: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "20ab76tM1NIj5PCIgBC5PRc", "gameScene");
        var n = e("enums")
          , s = n.Event_Name
          , o = n.HeroDir;
        cc.Class({
            extends: cc.Component,
            properties: {
                hero: {
                    default: null,
                    type: cc.Node
                },
                yindao: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
                cc.game.setFrameRate(30),
                cc.director.getCollisionManager().enabled = !0,
                this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart.bind(this)),
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove.bind(this)),
                this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this)),
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel.bind(this)),
                this.gmLayerWidth = this.node.getChildByName("game").width,
                this.yindaoNum = cc.dm.getItem("yindao") || 0,
                1 === cc.dm.wantToLevel && (this.yindaoNum || (this.yindao.active = !0))
            },
            start: function() {},
            touchStart: function(e) {
                var t = e.getLocationInView();
                t.y < 100 || (cc.gm.emit(s.changeHeroDir, t.x),
                this.startPos = t)
            },
            touchMove: function(e) {
                var t = e.getLocationInView();
                if (t && !(t.y < 100) && this.startPos) {
                    o.left;
                    t.x - this.startPos.x > 15 && (o.right,
                    cc.gm.emit(s.changeHeroDir, t.x),
                    this.startPos = t),
                    t.x - this.startPos.x < -15 && (o.left,
                    cc.gm.emit(s.changeHeroDir, t.x),
                    this.startPos = t)
                }
            },
            touchEnd: function() {
                cc.gm.emit(s.stopHero)
            },
            touchCancel: function() {
                cc.gm.emit(s.stopHero)
            },
            settingBtnCallBack: function() {
                cc.dm.gameData.gamepause = !0,
                this.node.getChildByName("setting").active = !0
            },
            continueBtnCallBack: function() {
                this.yindao.getChildByName("bg1").active = !1,
                this.yindao.getChildByName("bg2").active = !0
            },
            startBtnCallBack: function() {
                this.yindao.active = !1,
                cc.dm.setItem("yindao", 1)
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    gm: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "db9b1QZMtZC45YHAZ+P/Xyr", "gm");
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i),
                n && e(t, n),
                t
            }
        }();
        function s(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++)
                    i[t] = e[t];
                return i
            }
            return Array.from(e)
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var a = e("eventemitter2")
          , r = e("dm")
          , c = function() {
            function e() {
                o(this, e),
                this.eventManager = new a.EventEmitter2({
                    maxListeners: 50
                }),
                cc.dm = new r,
                this.listeners = {}
            }
            return n(e, [{
                key: "on",
                value: function(e, t, i) {
                    var n = function() {
                        t.apply(void 0, arguments)
                    };
                    i && (this.listeners[e] = this.listeners[e] || {},
                    this.listeners[e][i] = n),
                    this.eventManager.on(e, n)
                }
            }, {
                key: "emit",
                value: function() {
                    var e;
                    if (cc.dm[arguments[0]]) {
                        var t, i = [].concat(Array.prototype.slice.call(arguments)).slice(1);
                        (t = cc.dm)[arguments[0]].apply(t, s(i))
                    }
                    (e = this.eventManager).emit.apply(e, arguments)
                }
            }, {
                key: "off",
                value: function(e, t) {
                    t ? this.listeners[e] ? (this.eventManager.off(e, this.listeners[e][t]),
                    this.listeners[e][t] = null,
                    0 === Object.keys(this.listeners[e]).length && (this.listeners[e] = null)) : console.log("event has removed") : (console.log("removeAllListener in %s event", e),
                    this.eventManager.removeAllListeners(e),
                    this.listeners[e] = null)
                }
            }, {
                key: "removeAllListeners",
                value: function() {
                    var e;
                    (e = this.eventManager).removeAllListeners.apply(e, arguments),
                    arguments[0] ? this.listeners[arguments[0]] = null : this.listeners = {}
                }
            }, {
                key: "loadScene",
                value: function(e) {
                    cc.director.loadScene(e)
                }
            }, {
                key: "runComeInAction",
                value: function(e) {
                    e.opacity = 100,
                    e.runAction(cc.fadeIn(.5))
                }
            }, {
                key: "playMusicBG",
                value: function(e) {
                    1 === cc.dm.music && cc.loader.loadRes(e, function(e, t) {
                        cc.audioEngine.playMusic(t, !0)
                    })
                }
            }, {
                key: "setMusicVolume",
                value: function(e, t) {
                    cc.dm.music = e,
                    cc.dm.setItem("music", e),
                    1 === cc.dm.music ? t || cc.gm.playMusicBG("sound/bg") : cc.audioEngine.stopMusic()
                }
            }, {
                key: "playMusicEffect",
                value: function(e) {
                    1 == cc.dm.effect && cc.loader.loadRes(e, function(e, t) {
                        cc.audioEngine.playEffect(t)
                    })
                }
            }, {
                key: "setEffectVolume",
                value: function(e) {
                    cc.dm.effect = e,
                    cc.dm.setItem("effect", e)
                }
            }, {
                key: "initMusic",
                value: function() {
                    cc.dm.music = cc.dm.getItem("music"),
                    console.log("cc.dm.music = ", cc.dm.music),
                    null !== cc.dm.music && void 0 !== cc.dm.music && "" !== cc.dm.music || (cc.dm.music = 1);
                    try {
                        cc.dm.music = isNaN(cc.dm.music) ? cc.dm.music : Number(cc.dm.music)
                    } catch (e) {}
                    console.log("cc.dm.music = ", cc.dm.music),
                    this.setMusicVolume(cc.dm.music, !0),
                    cc.dm.effect = cc.dm.getItem("effect"),
                    null !== cc.dm.effect && void 0 !== cc.dm.effect && "" !== cc.dm.effect || (cc.dm.effect = 1);
                    try {
                        cc.dm.effect = isNaN(cc.dm.effect) ? cc.dm.effect : Number(cc.dm.effect)
                    } catch (e) {}
                    this.setEffectVolume(cc.dm.effect)
                }
            }, {
                key: "showLoading",
                value: function() {
                    var e = this
                      , t = cc.find("Canvas");
                    if (this.loadingPrefab) {
                        var i = t.getChildByName("loading");
                        if (i)
                            i.getComponent("loading").show();
                        else {
                            var n = cc.instantiate(this.loadingPrefab);
                            n.name = "loading",
                            t.addChild(n, 100)
                        }
                    } else
                        cc.loader.loadRes("common/prefabs/loading", function(i, n) {
                            e.loadingPrefab = n;
                            var s = cc.find("Canvas").getChildByName("loading");
                            if (s)
                                s.getComponent("loading").show();
                            else {
                                var o = cc.instantiate(n);
                                o.name = "loading",
                                t.addChild(o, 100)
                            }
                        })
                }
            }, {
                key: "hideLoading",
                value: function() {
                    var e = cc.find("Canvas").getChildByName("loading");
                    e && e.getComponent("loading").hide()
                }
            }, {
                key: "showMsg",
                value: function(e, t, i) {
                    var n = this;
                    if (this.msgLayerPrefab) {
                        var s = cc.instantiate(this.msgLayerPrefab);
                        s.getComponent("msgLayer").initMsg(e),
                        cc.find("Canvas").addChild(s, 90)
                    } else
                        cc.loader.loadRes("common/prefabs/msgLayer", function(t, i) {
                            n.msgLayerPrefab = i;
                            var s = cc.instantiate(i);
                            s.getComponent("msgLayer").initMsg(e),
                            cc.find("Canvas").addChild(s, 90)
                        })
                }
            }, {
                key: "showLevelUp",
                value: function(e) {
                    var t = this;
                    if (console.log("showLevelUp msg = ", e),
                    this.levelUpPrefab) {
                        var i = cc.instantiate(this.levelUpPrefab);
                        i.getComponent("levelUp").initItems(e),
                        cc.find("Canvas").addChild(i, 80)
                    } else
                        cc.gm.showLoading(),
                        cc.loader.loadRes("game/prefabs/levelUp", function(i, n) {
                            cc.gm.hideLoading(),
                            t.levelUpPrefab = n;
                            var s = cc.instantiate(n);
                            s.getComponent("levelUp").initItems(e),
                            cc.find("Canvas").addChild(s, 80)
                        })
                }
            }]),
            e
        }();
        t.exports = c,
        cc._RF.pop()
    }
    , {
        dm: "dm",
        eventemitter2: 3
    }],
    hallData: [function(e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        cc._RF.push(t, "10d50zSDqhAIZjkseXj+XPC", "hallData"),
        t.exports = function(e) {
            for (var t in a.prototype)
                e.__proto__[t] = a.prototype[t]
        }
        ;
        var s = e("enums").userDataKey
          , o = e("moment")
          , a = function e() {
            n(this, e)
        };
        a.prototype.initHallData = function() {
            this.wantToLevel = 0,
            this._checkUpLevel(),
            this._initSkill(),
            this._initLevelMap(),
            this._initShop(),
            this._initLoginTask(),
            this._initDayTask(),
            this._initPowerAndMagic(),
            this._initPrize()
        }
        ,
        a.prototype._checkUpLevel = function() {
            for (var e = this.userBase.userEXP, t = this.userBase.userLevel, i = this.levelUp, n = 0; n < i.length; n++) {
                if (i[n].roleup_level === t) {
                    for (var o = n; o < i.length; o++) {
                        if (!(e >= i[o].total_exp)) {
                            this.userBase.wantExp = i[o].total_exp;
                            break
                        }
                        this.userBase.userLevel = i[o].roleup_level + 1,
                        this.userBase.powerMax += i[o].roleup_powerup || 0,
                        this.userBase.magicMax += i[o].roleup_energyup || 0,
                        this.userBase.power += i[o].roleup_powerback || 0;
                        var a = [{
                            name: "\u7b49\u7ea7",
                            before: this.userBase.userLevel - 1,
                            after: this.userBase.userLevel
                        }];
                        if (i[o].roleup_powerup > 0) {
                            var r = {
                                name: "\u4f53\u529b\u4e0a\u9650",
                                before: this.userBase.powerMax - i[o].roleup_powerup,
                                after: this.userBase.powerMax
                            };
                            a.push(r)
                        }
                        if (i[o].roleup_energyup > 0) {
                            var c = {
                                name: "\u9b54\u529b\u4e0a\u9650",
                                before: this.userBase.magicMax - i[o].roleup_energyup,
                                after: this.userBase.magicMax
                            };
                            a.push(c)
                        }
                        if (i[o].roleup_powerback > 0) {
                            var l = {
                                name: "\u4f53\u529b",
                                before: this.userBase.power - i[o].roleup_powerback,
                                after: this.userBase.power
                            };
                            a.push(l)
                        }
                        cc.gm.showLevelUp(a)
                    }
                    break
                }
            }
            this.setItem(s.userBase, JSON.stringify(this.userBase))
        }
        ,
        a.prototype.updateUserInfoInHall = function(e) {
            if (0 !== Object.keys(e).length) {
                for (var t in e)
                    this.userBase[t] += e[t],
                    "userEXP" === t && this._checkUpLevel();
                this.setItem(s.userBase, JSON.stringify(this.userBase))
            }
        }
        ,
        a.prototype._initSkill = function() {
            if (this.userSkill = this.getItem(s.userSkill),
            this.userSkill)
                this.userSkill = JSON.parse(this.userSkill);
            else {
                this.userSkill = {};
                for (var e = 0; e < this.skill.length; e++) {
                    var t = this.skill[e]
                      , i = parseInt(t.skill_ID / 100);
                    !this.userSkill[i] && t.skill_energy && (this.userSkill[i] = t)
                }
                this.setItem(s.userSkill, JSON.stringify(this.userSkill))
            }
        }
        ;
        var r = {
            1: "coin",
            2: "money"
        };
        a.prototype.updateskillInHall = function(e) {
            var t = r[e.skill_costtype];
            if (this.userBase[t] < e.skill_cost)
                console.log("has no money :" + t + " :user " + this.userBase[t] + " :need  " + e.skill_cost),
                "coin" === t ? cc.gm.showMsg("\u91d1\u5e01\u4e0d\u8db3") : cc.gm.showMsg("\u5143\u5b9d\u4e0d\u8db3");
            else {
                for (var i = 0; i < this.skill.length; i++) {
                    var n = this.skill[i];
                    if (n.skill_ID === e.next_skill_ID) {
                        var o = parseInt(n.skill_ID / 100);
                        this.userSkill[o] = n;
                        break
                    }
                }
                this.userBase[t] -= e.skill_cost,
                this.setItem(s.userSkill, JSON.stringify(this.userSkill)),
                this.setItem(s.userBase, JSON.stringify(this.userBase))
            }
        }
        ,
        a.prototype._initShop = function() {
            if (this.userShop = this.getItem(s.userShop),
            this.userShop)
                this.userShop = JSON.parse(this.userShop);
            else {
                this.userShop = {};
                for (var e = 0; e < this.shop.length; e++) {
                    var t = this.shop[e]
                      , i = t.shop_ID;
                    this.userShop[i] || (this.userShop[i] = t,
                    0 === this.userShop[i].shop_limit_total && delete this.userShop[i].shop_limit_total,
                    0 === this.userShop[i].shop_limit && delete this.userShop[i].shop_limit)
                }
                this.userShop.time = o().format("YYYYMMDD"),
                this.setItem(s.userShop, JSON.stringify(this.userShop))
            }
            var n = o(o.now());
            if (!o(n).isSame(this.userShop.time, "day")) {
                for (var a = 0; a < this.shop.length; a++) {
                    var r = this.shop[a]
                      , c = r.shop_ID;
                    r.shop_limit && (this.userShop[c].shop_limit = r.shop_limit)
                }
                this.userShop.time = o().format("YYYYMMDD"),
                this.setItem(s.userShop, JSON.stringify(this.userShop))
            }
            console.log("userShop = ", this.userShop)
        }
        ;
        var c = {
            0: "coin",
            1: "money",
            2: "guanggao"
        };
        a.prototype.buyShopItem = function(e) {
            var t = c[e.shop_costtype]
              , i = this.userShop[e.shop_ID].shop_limit || 0
              , n = this.userShop[e.shop_ID].shop_limit_total || 0;
            if (t === c[2]) {
                if (i <= 0 && n <= 0)
                    return console.log("has no times"),
                    void cc.gm.showMsg("\u5269\u4f59\u6b21\u6570\u4e0d\u8db3");
                cc.gm.showMsg("\u8d2d\u4e70\u6210\u529f"),
                this._buyShopSuccess(e, t, !0)
            } else {
                if (this.userBase[t] < e.shop_cost)
                    return console.log("has no money :" + t + " :user " + this.userBase[t] + " :need  " + e.shop_cost),
                    void ("coin" === t ? cc.gm.showMsg("\u91d1\u5e01\u4e0d\u8db3") : cc.gm.showMsg("\u5143\u5b9d\u4e0d\u8db3"));
                if (i <= 0 && n <= 0)
                    return console.log("has no times"),
                    void cc.gm.showMsg("\u5269\u4f59\u6b21\u6570\u4e0d\u8db3");
                cc.gm.showMsg("\u8d2d\u4e70\u6210\u529f"),
                this._buyShopSuccess(e, t, !1)
            }
        }
        ,
        a.prototype._buyShopSuccess = function(e, t, i) {
            switch (this.userShop[e.shop_ID].shop_limit && this.userShop[e.shop_ID].shop_limit--,
            this.userShop[e.shop_ID].shop_limit_total && this.userShop[e.shop_ID].shop_limit_total--,
            e.shop_type) {
            case 0:
                this.userBase.coin += e.shop_num;
                break;
            case 1:
                this.userBase.power += e.shop_num;
                break;
            case 2:
                this.userBase.magic += e.shop_num;
                break;
            case 3:
                this.userBase.money += e.shop_num;
                break;
            case 4:
                this.userBase.powerMax += e.shop_num;
                break;
            case 5:
                this.userBase.magicMax += e.shop_num;
                break;
            case 6:
                this.userBase.life += e.shop_num
            }
            i || (this.userBase[t] -= e.shop_cost),
            this.setItem(s.userBase, JSON.stringify(this.userBase)),
            this.setItem(s.userShop, JSON.stringify(this.userShop))
        }
        ,
        a.prototype._initLoginTask = function() {
            if (this.userLoginTask = this.getItem(s.userLoginTask),
            this.userLoginTask)
                this.userLoginTask = JSON.parse(this.userLoginTask);
            else {
                this.userLoginTask = {};
                for (var e = 0; e < this.login.length; e++) {
                    var t = this.login[e];
                    this.userLoginTask[t.sign_ID] = t,
                    this.userLoginTask[t.sign_ID].hasGetOver = !1
                }
                this.userLoginTask.getDate = 0,
                this.userLoginTask.getNum = 0,
                this.setItem(s.userLoginTask, JSON.stringify(this.userLoginTask))
            }
            var i = o.now();
            if (7 === this.userLoginTask.getNum && !o(i).isSame(this.userLoginTask.getDate, "day")) {
                for (var n = 0; n < this.login.length; n++) {
                    var a = this.login[n];
                    this.userLoginTask[a.sign_ID] = a,
                    this.userLoginTask[a.sign_ID].hasGetOver = !1
                }
                this.userLoginTask.getDate = 0,
                this.userLoginTask.getNum = 0,
                this.setItem(s.userLoginTask, JSON.stringify(this.userLoginTask))
            }
            console.log("this.userLoginTask = ", this.userLoginTask)
        }
        ;
        var l = {
            "\u91d1\u5e01": "coin",
            "\u4f53\u529b": "power",
            "\u5143\u5b9d": "money",
            "\u6cd5\u529b": "magic"
        };
        a.prototype.getLoginPrize = function(e, t) {
            if (this.userLoginTask[e.sign_ID].hasGetOver)
                return console.log("has get prize getLoginPrize ", e.sign_ID),
                void cc.gm.showMsg("\u5df2\u9886\u53d6");
            this.userLoginTask.getDate = o(o.now()).format("YYYYMMDD"),
            this.userLoginTask.getNum += 1,
            this.userLoginTask[e.sign_ID].hasGetOver = !0,
            this.userBase[l[e.sign_reward]] += e.sign_rewardnum * (t ? 2 : 1),
            cc.gm.showMsg(e.sign_reward + "+" + e.sign_rewardnum * (t ? 2 : 1)),
            this.setItem(s.userLoginTask, JSON.stringify(this.userLoginTask)),
            this.setItem(s.userBase, JSON.stringify(this.userBase))
        }
        ,
        a.prototype._initDayTask = function() {
            this.userDayTask = this.getItem(s.userDayTask);
            for (var e = [], t = 0; t < this.task.length; t++) {
                var i = this.task[t];
                1 === i.task_type && e.push(i)
            }
            if (this.userDayTask) {
                this.userDayTask = JSON.parse(this.userDayTask);
                for (var n = 0; n < this.task.length; n++) {
                    var a = this.task[n];
                    if (2 === a.task_type) {
                        for (var r = this.getLevelAndStarNum(a.task_aimnum).levels, c = 0, l = r[0]; l <= r[1]; l++)
                            c += this.levelMap[l.toString()] || 0;
                        this.userDayTask[a.task_ID].finishNum = c
                    }
                }
            } else {
                this.userDayTask = {};
                for (var u = 0; u < this.task.length; u++) {
                    var h = this.task[u];
                    2 === h.task_type && (this.userDayTask[h.task_ID] = h,
                    this.userDayTask[h.task_ID].hasGet = !1,
                    this.userDayTask[h.task_ID].doubleGet = !1,
                    this.userDayTask[h.task_ID].finishNum = this.userDayTask[h.task_ID].finishNum || 0)
                }
                var d = e[Math.floor(Math.random() * e.length)];
                this.userDayTask[d.task_ID] = d,
                this.userDayTask[d.task_ID].hasGet = !1,
                this.userDayTask[d.task_ID].doubleGet = !1,
                this.userDayTask[d.task_ID].finishNum = 0,
                this.userDayTask.refreshDate = o(o.now()).format("YYYYMMDD"),
                this.setItem(s.userDayTask, JSON.stringify(this.userDayTask))
            }
            var f = o.now()
              , m = !1;
            if (o(f).isSame(this.userDayTask.refreshDate, "day") || (m = !0),
            m) {
                for (var g in this.userDayTask) {
                    1 === this.userDayTask[g].task_type && delete this.userDayTask[g]
                }
                var p = e[Math.floor(Math.random() * e.length)];
                this.userDayTask[p.task_ID] = p,
                this.userDayTask[p.task_ID].hasGet = !1,
                this.userDayTask[p.task_ID].doubleGet = !1,
                this.userDayTask[p.task_ID].finishNum = 0,
                this.userDayTask.refreshDate = o(o.now()).format("YYYYMMDD"),
                this.setItem(s.userDayTask, JSON.stringify(this.userDayTask))
            }
            console.log("this.userDayTask = ", this.userDayTask)
        }
        ,
        a.prototype.finishTask = function(e) {
            this.userDayTask[e] && 1 === this.userDayTask[e].task_type && this.userDayTask[e].finishNum < this.userDayTask[e].task_aimnum && (this.userDayTask[e].finishNum++,
            this.setItem(s.userDayTask, JSON.stringify(this.userDayTask)))
        }
        ,
        a.prototype.getDayTaskAward = function(e) {
            this.userDayTask[e].hasGet ? cc.gm.showMsg("\u5df2\u7ecf\u9886\u53d6") : (this.userDayTask[e].hasGet = !0,
            this.setItem(s.userDayTask, JSON.stringify(this.userDayTask)),
            this.userBase.money += this.userDayTask[e].task_rewardnum,
            cc.gm.showMsg("\u5143\u5b9d+" + this.userDayTask[e].task_rewardnum),
            this.setItem(s.userBase, JSON.stringify(this.userBase)))
        }
        ,
        a.prototype.getDayTaskAwardDouble = function(e) {
            this.userDayTask[e].doubleGet ? cc.gm.showMsg("\u5df2\u7ecf\u9886\u53d6\u53cc\u500d\u5956\u52b1") : (this.userDayTask[e].doubleGet = !0,
            this.setItem(s.userDayTask, JSON.stringify(this.userDayTask)),
            this.userBase.money += this.userDayTask[e].task_rewardnum,
            cc.gm.showMsg("\u5143\u5b9d+" + this.userDayTask[e].task_rewardnum),
            this.setItem(s.userBase, JSON.stringify(this.userBase)))
        }
        ,
        a.prototype.getLevelAndStarNum = function(e) {
            var t = e.split(";");
            return {
                levels: t[0].split(","),
                starNum: t[1]
            }
        }
        ,
        a.prototype._initLevelMap = function() {
            this.levelMap = this.getItem(s.levelMap),
            this.levelMap ? this.levelMap = JSON.parse(this.levelMap) : (this.levelMap = {},
            this.setItem(s.levelMap, JSON.stringify(this.levelMap))),
            console.log("this.levelMap = ", this.levelMap)
        }
        ,
        a.prototype.loadGameScene = function(e) {
            this.wantToLevel = e,
            console.log("this.wantToLevel = ", this.wantToLevel);
            var t = {};
            for (var i in this.userSkill)
                this.userSkill[i].skill_level > 0 && (t[i] = this.userSkill[i]);
            cc.dm.gameRole = {
                HP: this.userBase.life,
                HPMax: this.userBase.life,
                ATT: 1,
                magic: this.userBase.magic,
                skill: t
            },
            console.log("cc.gameRole  = ", cc.dm.gameRole)
        }
        ,
        a.prototype.loadGameCfg = function(e) {
            var t = this;
            this.gameCfg ? e() : (this.gameCfg = {},
            cc.loader.loadResDir("common/JSON/gameCfg", function(i, n) {
                for (var s in n) {
                    var o = n[s];
                    t.gameCfg[o.name] = o.json,
                    t.parseJsonNumber(cc.dm.gameCfg[o.name])
                }
                cc.loader.releaseResDir("common/JSON/chestItem"),
                e(),
                console.log("this.gameCfg = ", t.gameCfg)
            }))
        }
        ,
        a.prototype.loadChestItem = function(e) {
            e()
        }
        ,
        a.prototype.loadGameMap = function(e) {
            var t = this;
            this.gameCfg.level = this.wantToLevel,
            this.gameCfg.gameRule = this.gameCfg.raid[this.wantToLevel - 1],
            this.gameCfg.score = 0,
            this.gameCfg.addTime = !1,
            this.gameCfg.reGame = !1,
            this.gameCfg.double = !1,
            cc.loader.loadRes("common/JSON/guanka/" + cc.dm.gameCfg.gameRule.map, function(i, n) {
                t.gameCfg.map = n.json,
                t.parseJsonNumber(cc.dm.gameCfg.map),
                cc.loader.releaseResDir("common/JSON/chestItem"),
                e(),
                console.log("this.gameCfg = ", t.gameCfg)
            })
        }
        ,
        a.prototype.costPower = function() {
            this.userBase.power -= this.gameCfg.gameRule.cost,
            this.setItem(s.userBase, JSON.stringify(this.userBase))
        }
        ,
        a.prototype._initPrize = function() {
            var e = [{
                coin: 100
            }, {
                coin: 300
            }, {
                coin: 500
            }, {
                money: 5
            }, {
                money: 10
            }, {
                money: 15,
                coin: 1e3
            }];
            this.prizeInfo = this.getItem(s.dayPrizeInfo),
            this.prizeInfo ? this.prizeInfo = JSON.parse(this.prizeInfo) : (this.prizeInfo = {
                times: 0,
                day: o(o.now()).format("YYYYMMDD"),
                total: e.length
            },
            this.setItem(s.dayPrizeInfo, JSON.stringify(this.prizeInfo)));
            var t = o.now()
              , i = !1;
            o(t).isSame(this.prizeInfo.day, "day") || (i = !0),
            i && (this.prizeInfo = {
                times: 0,
                day: o(o.now()).format("YYYYMMDD"),
                total: e.length
            },
            this.setItem(s.dayPrizeInfo, JSON.stringify(this.prizeInfo)))
        }
        ,
        a.prototype.addPrizeInHall = function() {
            var e = {
                coin: "\u91d1\u5e01",
                money: "\u5143\u5b9d"
            }
              , t = [{
                coin: 100
            }, {
                coin: 300
            }, {
                coin: 500
            }, {
                money: 5
            }, {
                money: 10
            }, {
                money: 15,
                coin: 1e3
            }];
            if (this.prizeInfo.times < t.length) {
                var i = "";
                for (var n in t[this.prizeInfo.times])
                    this.userBase[n] += t[this.prizeInfo.times][n],
                    i += e[n] + "+" + t[this.prizeInfo.times][n] + " ";
                cc.gm.showMsg(i),
                this.prizeInfo.times++,
                this.setItem(s.dayPrizeInfo, JSON.stringify(this.prizeInfo)),
                this.setItem(s.userBase, JSON.stringify(this.userBase))
            }
        }
        ,
        cc._RF.pop()
    }
    , {
        enums: "enums",
        moment: 4
    }],
    hallManager: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d7923pflqlPyrAKxk0P6VzI", "hallManager");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.initEvents()
            },
            start: function() {},
            initEvents: function() {
                cc.gm.on(n.loadGameScene, this.loadGameScene.bind(this), this.node.uuid)
            },
            onDestroy: function() {
                cc.gm.removeAllListeners()
            },
            loadGameScene: function(e) {
                var t = this;
                console.log("loadGameScene!!!"),
                cc.gm.showLoading(),
                cc.dm.loadGameCfg(function() {
                    cc.gm.hideLoading(),
                    t.showStartGameLayer(e)
                })
            },
            showStartGameLayer: function(e) {
                var t = this;
                this.startGameLayer ? (this.startGameLayer.active = !0,
                this.startGameLayer.getComponent("startGame").initGame(e)) : (cc.gm.showLoading(),
                cc.loader.loadRes("hall/prefabs/startGame", function(i, n) {
                    cc.gm.hideLoading();
                    var s = cc.instantiate(n);
                    t.node.addChild(s),
                    t.startGameLayer = s,
                    t.startGameLayer.getComponent("startGame").initGame(e)
                }))
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    hallScene: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1f789jL421I3K5QvR9iBpJO", "hallScene");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                levelMapLayout: {
                    default: null,
                    type: cc.Node
                },
                levelScrollView: {
                    default: null,
                    type: cc.ScrollView
                },
                levelMapItem: {
                    default: null,
                    type: cc.Prefab
                },
                prizeBtnNode: {
                    default: null,
                    type: cc.Node
                },
                shopRedDotNode: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
                this.roleLayer = null,
                cc.dm.initHallData(),
                this.initLevelMap(),
                this.initPrizeBtn(),
                this.shopRedDotNode.active = !cc.dm.shopRedDot
            },
            start: function() {},
            skillBtnCallBack: function() {
                var e = this;
                console.log("skillBtnCallBack"),
                this.skillLayer ? this.skillLayer.active = !0 : (cc.gm.showLoading(),
                cc.loader.loadRes("hall/prefabs/skill", function(t, i) {
                    cc.gm.hideLoading();
                    var n = cc.instantiate(i);
                    e.node.addChild(n),
                    e.skillLayer = n
                }))
            },
            shopBtnCallBack: function() {
                var e = this;
                console.log("shopBtnCallback"),
                this.shopLayer ? this.shopLayer.active = !0 : (cc.gm.showLoading(),
                cc.loader.loadRes("hall/prefabs/shop", function(t, i) {
                    cc.gm.hideLoading();
                    var n = cc.instantiate(i);
                    e.node.addChild(n),
                    e.shopLayer = n
                })),
                cc.dm.shopRedDot = !0,
                this.shopRedDotNode.active = !1
            },
            taskBtnCallBack: function() {
                var e = this;
                console.log("taskBtnCallBack"),
                this.taskLayer ? this.taskLayer.active = !0 : (cc.gm.showLoading(),
                cc.loader.loadRes("hall/prefabs/task", function(t, i) {
                    cc.gm.hideLoading();
                    var n = cc.instantiate(i);
                    e.node.addChild(n),
                    e.taskLayer = n
                }))
            },
            rankingListBtnCallBack: function() {
				//修改 
              /*  var e = this;
                console.log("rankingListBtnCallBack"),
                cc.dm.userBase.userLevel < 3 ? cc.gm.showMsg("\u6392\u884c\u699c3\u7ea7\u4ee5\u540e\u5f00\u653e") : this.rankingListLayer ? this.rankingListLayer.active = !0 : (cc.gm.showLoading(),
                cc.loader.loadRes("hall/prefabs/rankingList", function(t, i) {
                    cc.gm.hideLoading();
                    var n = cc.instantiate(i);
                    e.node.addChild(n),
                    e.rankingListLayer = n
                }))*/
				
				var e = this;
				if(cc.dm.userBase.userLevel < 3){
					cc.gm.showMsg("\u6392\u884c\u699c3\u7ea7\u4ee5\u540e\u5f00\u653e")
				}else{
					//埋点 显示排行榜
					console.log("show ranking");
				}
				
				console.log("show ranking");

            },
            settingBtnCallBack: function() {
                var e = this;
                console.log("settingBtnCallBack"),
                this.settingLayer ? this.settingLayer.active = !0 : (cc.gm.showLoading(),
                cc.loader.loadRes("hall/prefabs/setting", function(t, i) {
                    cc.gm.hideLoading();
                    var n = cc.instantiate(i);
                    e.node.addChild(n),
                    e.settingLayer = n
                }))
            },
            initLevelMap: function() {
                var e = this
                  , t = cc.dm.userBase.level
                  , i = parseInt(t / 13) + 1;
                this.levelMapLayout.removeAllChildren();
                for (var n = 0; n < i; n++) {
                    var s = cc.instantiate(this.levelMapItem);
                    this.levelMapLayout.addChild(s),
                    s.getComponent("levelMap").initLevelItem(n)
                }
                var o = t / (13 * i);
                this.scheduleOnce(function() {
                    e.levelScrollView.scrollTo(cc.v2(0, o), 0)
                }, .001)
            },
            getTime: function(e) {
                var t = Math.floor(e)
                  , i = Math.floor(t / 60)
                  , n = Math.floor(t % 60);
                return (i = i < 0 ? 0 : i) + ":" + ((n = n < 0 ? 0 : n) < 10 ? "0" + n : n)
            },
            initPrizeBtn: function() {
                var e = this;
                if (cc.dm.prizeInfo.times >= cc.dm.prizeInfo.total)
                    this.prizeBtnNode.active = !1;
                else {
                    var t = cc.dm.getItem("prizeTime")
                      , i = Date.now();
                    this.prizeBtnNode.getChildByName("prize").runAction(cc.sequence(cc.scaleTo(.5, 1.1), cc.scaleTo(.5, .8)).repeatForever());
                    var n = this.prizeBtnNode.getChildByName("disable")
                      , s = n.getChildByName("time").getComponent(cc.Label);
                    t && t - i > 0 ? (this.prizeBtnNode.getComponent(cc.Button).interactable = !1,
                    n.active = !0,
                    s.string = this.getTime((t - i) / 1e3),
                    clearInterval(this.timeOut),
                    this.timeOut = setInterval(function() {
                        var i = Date.now();
                        t - i > 0 ? s.string = e.getTime((t - i) / 1e3) : (clearInterval(e.timeOut),
                        e.timeOut = null,
                        e.prizeBtnNode.getComponent(cc.Button).interactable = !0,
                        n.active = !1)
                    }, 1e3)) : (this.prizeBtnNode.getComponent(cc.Button).interactable = !0,
                    n.active = !1)
                }
            },
            onDestroy: function() {
                this.timeOut && (clearInterval(this.timeOut),
                this.timeOut = null)
            },
            prizeBtnCallBack: function() {
                var e = this;
                cc.nm.showView("", function() {
                    var t = Date.now() + 6e5;
                    if (cc.dm.setItem("prizeTime", t),
                    cc.dm.addPrizeInHall(),
                    cc.gm.emit(n.updateUserInfoInHall, {}),
                    cc.dm.prizeInfo.times >= cc.dm.prizeInfo.total)
                        e.prizeBtnNode.active = !1;
                    else {
                        var i = e.prizeBtnNode.getChildByName("disable")
                          , s = i.getChildByName("time").getComponent(cc.Label);
                        e.prizeBtnNode.getComponent(cc.Button).interactable = !1,
                        i.active = !0,
                        s.string = e.getTime((t - Date.now()) / 1e3),
                        clearInterval(e.timeOut),
                        e.timeOut = setInterval(function() {
                            var n = Date.now();
                            t - n > 0 ? s.string = e.getTime((t - n) / 1e3) : (clearInterval(e.timeOut),
                            e.timeOut = null,
                            e.prizeBtnNode.getComponent(cc.Button).interactable = !0,
                            i.active = !1)
                        }, 1e3)
                    }
                })
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    heroBase: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "aa9a6LnI3VBIqE87OZZBG4+", "heroBase");
        var n = e("enums")
          , s = n.Event_Name
          , o = (n.HeroDir,
        e("stateManager"));
        cc.Class({
            extends: cc.Component,
            properties: {
                speed: 100
            },
            onLoad: function() {
                this.kind = 1,
                this.spFrame = "",
                this.speedBase = this.speed,
                this.scaleBase = 1,
                this.scaleOver = 1,
                this.moveToX = 0,
                this.visibleWidth = cc.view.getVisibleSize().width,
                cc.gm.on(s.changeHeroDir, this.changeHeroDir.bind(this), this.node.uuid),
                cc.gm.on(s.stopHero, this.stopHero.bind(this), this.node.uuid),
                cc.gm.on(s.stateChange, this.stateChange.bind(this), this.node.uuid),
                this.init()
            },
            init: function() {
                cc.dm.gameRole && (this.speed = 12,
                this.speedBase = this.speed),
                this.stopHero()
            },
            start: function() {},
            changeHeroDir: function(e) {
                this.moveToX = e
            },
            stopHero: function() {
                this.moveToX = this.node.x + this.visibleWidth / 2
            },
            onCollisionEnter: function(e, t) {},
            stateChange: function(e) {
                o.changeState(e, this, "hero")
            },
            addStatePic: function(e) {},
            delStatePic: function(e) {},
            onDestroy: function() {
                cc.gm.off(s.changeHeroDir, this.node.uuid),
                cc.gm.off(s.stopHero, this.node.uuid),
                cc.gm.off(s.stateChange, this.node.uuid)
            },
            update: function(e) {
                if (!cc.dm.gameData.gameOver && !cc.dm.gameData.gamepause && !this.isDingShen) {
                    var t = this.moveToX - this.visibleWidth / 2;
                    this.miluan ? t - this.node.x > this.speed ? this.node.x -= this.speed : t - this.node.x < -this.speed ? this.node.x += this.speed : this.node.x = t : t - this.node.x > this.speed ? this.node.x += this.speed : t - this.node.x < -this.speed ? this.node.x -= this.speed : this.node.x = t,
                    this.node.x + this.node.width / 2 >= this.visibleWidth / 2 && (this.node.x = this.visibleWidth / 2 - this.node.width / 2),
                    this.node.x - this.node.width / 2 <= -this.visibleWidth / 2 && (this.node.x = this.node.width / 2 - this.visibleWidth / 2)
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums",
        stateManager: "stateManager"
    }],
    itemBase: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0706b2GbCRFpKtSUmbvR0ZW", "itemBase");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                skillImg: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                skillSp: {
                    default: null,
                    type: cc.Sprite
                }
            },
            onLoad: function() {
                this.dead = !1
            },
            init: function(e) {
                this.id = e,
                this.speed = 10,
                console.log("this.id = ", this.id);
                for (var t = 0; t < cc.dm.skill.length; t++) {
                    var i = cc.dm.skill[t];
                    if (Number(this.id) === i.skill_ID) {
                        this.skillInfo = i;
                        break
                    }
                }
                var n = parseInt(this.id / 100) - 1;
                this.skillSp.spriteFrame = this.skillImg[n]
            },
            start: function() {},
            onCollisionEnter: function(e, t) {
                if (!1 !== this.node.active)
                    switch (e.node.group) {
                    case "hero":
                        this.collisionToHero();
                        break;
                    case "body":
                        this.collisionToBody()
                    }
            },
            collisionToHero: function() {
                cc.gm.emit(n.breakItem, {
                    skillInfo: this.skillInfo
                }),
                this.destroyAway()
            },
            collisionToBody: function() {
                this.destroyAway()
            },
            destroyAway: function() {
                this.dead = !0,
                this.node.active = !1,
                this.skillPool.put(this.node)
            },
            onDestroy: function() {},
            unuse: function() {},
            reuse: function(e) {
                this.skillPool = e,
                this.dead = !1,
                this.node.active = !0
            },
            update: function(e) {
                this.dead || cc.dm.gameData.gameOver || cc.dm.gameData.gameStart && (cc.dm.gameData.gamepause || (this.node.y -= this.speed))
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    levelItem: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7b88292f+hH4YHIxzkSd6M+", "levelItem");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                starFull: {
                    default: null,
                    type: cc.SpriteFrame
                },
                showLevel: {
                    default: null,
                    type: cc.Node
                },
                wantLevel: {
                    default: null,
                    type: cc.Node
                },
                stars: {
                    default: [],
                    type: [cc.Node]
                },
                levelLab: {
                    default: null,
                    type: cc.Label
                },
                wantLevelLab: {
                    default: null,
                    type: cc.Label
                },
                texiao: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
                this.level = 0
            },
            start: function() {},
            showNoLevel: function() {
                this.showLevel.active = !1,
                this.wantLevel.active = !1,
                this.texiao.active = !1
            },
            showWantLevel: function(e) {
                this.showLevel.active = !1,
                this.wantLevel.active = !0,
                this.level = e,
                this.texiao.active = !0,
                this.texiao.getComponent(cc.Animation).play("bgAnim"),
                this.wantLevelLab.string = e.toString(),
                this.wantLevel.runAction(cc.sequence(cc.scaleTo(.4, 1.05), cc.scaleTo(.4, .95)).repeatForever())
            },
            showShowLevel: function(e, t) {
                this.showLevel.active = !0,
                this.wantLevel.active = !1,
                this.texiao.active = !1,
                this.setStar(e),
                this.setLevel(t)
            },
            setStar: function(e) {
                for (var t = 0; t < e; t++)
                    this.stars[t].getComponent(cc.Sprite).spriteFrame = this.starFull
            },
            setLevel: function(e) {
                this.level = e,
                this.levelLab.string = e.toString()
            },
            startGameBtnCallBack: function() {
                console.log("startGameSendEmg = ", this.level),
                cc.gm.emit(n.loadGameScene, this.level)
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    levelMap: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "58a2a7bZ+1MJZod1biI1dAf", "levelMap"),
        cc.Class({
            extends: cc.Component,
            properties: {
                finger: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
                this.levelNum = 13
            },
            start: function() {},
            initLevelItem: function(e) {
                for (var t = cc.dm.userBase.level, i = 0; i < this.levelNum; i++) {
                    var n = this.node.getChildByName("levelItem_" + i);
                    if (n.id = e * this.levelNum + i,
                    n.id < t) {
                        var s = cc.dm.levelMap[n.id + 1];
                        n.getComponent("levelItem").showShowLevel(s, n.id + 1)
                    } else
                        n.id === t ? (n.getComponent("levelItem").showWantLevel(n.id + 1),
                        0 === n.id && (this.finger.active = !0,
                        this.finger.runAction(this.fingerAction()))) : n.getComponent("levelItem").showNoLevel()
                }
            },
            fingerAction: function() {
                return cc.sequence(cc.moveBy(.1, -10, -10), cc.moveBy(.2, 20, 20), cc.moveBy(.1, -10, -10)).repeatForever()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    levelUp: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "231ccStFF1MyZog1PrEgAQu", "levelUp"),
        cc.Class({
            extends: cc.Component,
            properties: {
                items: {
                    default: [],
                    type: [cc.Node]
                }
            },
            onLoad: function() {},
            start: function() {},
            onEnable: function() {
                var e = this;
                this.node.scale = .2,
                this.node.opacity = 1,
                this.node.runAction(cc.sequence(cc.delayTime(1.1), cc.fadeIn(.2))),
                this.node.runAction(cc.sequence(cc.delayTime(1), cc.scaleTo(.3, 1))),
                this.node.runAction(cc.sequence(cc.delayTime(6), cc.callFunc(function() {
                    e.closeBtnCallBack()
                })))
            },
            initItems: function(e) {
                for (var t = 0; t < this.items.length; t++)
                    e[t] ? (this.items[t].active = !0,
                    this.items[t].getChildByName("name").getComponent(cc.Label).string = e[t].name,
                    this.items[t].getChildByName("before").getComponent(cc.Label).string = e[t].before,
                    this.items[t].getChildByName("after").getComponent(cc.Label).string = e[t].after) : this.items[t].active = !1
            },
            closeBtnCallBack: function() {
                this.node.stopAllActions(),
                this.node.removeFromParent(!0)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    loading: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9caf9Q5LZRDG48HPp7HKiyw", "loading"),
        cc.Class({
            extends: cc.Component,
            properties: {
                loading: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
                var e = this
                  , t = cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                    e.loading.rotation += 30
                }));
                this.loading.runAction(t.repeatForever())
            },
            show: function() {
                this.node.active = !0
            },
            hide: function() {
                this.node.active = !1
            },
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    loginData: [function(e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        cc._RF.push(t, "fbc19817zdMuJHZdFo90ykS", "loginData"),
        t.exports = function(e) {
            for (var t in c.prototype)
                e.__proto__[t] = c.prototype[t]
        }
        ;
        var s = e("enums")
          , o = s.userDataKey
          , a = s.powerTime
          , r = s.magicTime
          , c = function e() {
            n(this, e)
        };
        c.prototype.initJsonCfg = function(e) {
            var t = this;
            cc.loader.loadResDir("common/JSON/local", function(i, n) {
                for (var s in n) {
                    var o = n[s];
                    console.log("initJsonCfg jsonName = ", o.name),
                    cc.dm[o.name] = o.json,
                    t.parseJsonNumber(cc.dm[o.name])
                }
                console.log("cc.dm = ", cc.dm),
                cc.loader.releaseResDir("common/JSON/local"),
                e()
            })
        }
        ,
        c.prototype.initUser = function() {
            this.userBase = this.getItem(o.userBase),
            this.userBase ? (this.userInit = null,
            this.userBase = JSON.parse(this.userBase),
            this.userBase._Id || (this.userBase._Id = Math.floor(8999999 * Math.random()) + 1e6,
            this.setItem(o.userBase, JSON.stringify(this.userBase)))) : (this.userBase = this.userInit[0],
            this.userBase._Id = Math.floor(8999999 * Math.random()) + 1e6,
            this.setItem(o.userBase, JSON.stringify(this.userBase))),
            console.log("this.userBase = ", this.userBase),
            this._initPowerAndMagic()
        }
        ,
        c.prototype._initPowerAndMagic = function() {
            var e = !1;
            if (this.userBase.power < this.userBase.powerMax)
                if (this.userBase.powerDate) {
                    var t = Date.now() - this.userBase.powerDate;
                    this.userBase.power += parseInt(t / 1e3 / a),
                    this.userBase.power = this.userBase.power > this.userBase.powerMax ? this.userBase.powerMax : this.userBase.power,
                    this.userBase.power < this.userBase.powerMax ? this.powerBack() : delete this.userBase.powerDate,
                    e = !0
                } else
                    this.powerBack();
            if (this.userBase.magic < this.userBase.magicMax)
                if (this.userBase.magicDate) {
                    var i = Date.now() - this.userBase.magicDate;
                    this.userBase.magic += parseInt(i / 1e3 / r),
                    this.userBase.magic = this.userBase.magic > this.userBase.magicMax ? this.userBase.magicMax : this.userBase.magic,
                    this.userBase.magic < this.userBase.magicMax ? this.magicBack() : delete this.userBase.magicDate,
                    e = !0
                } else
                    this.magicBack();
            e && this.setItem(o.userBase, JSON.stringify(this.userBase))
        }
        ,
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    loginScene: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "cc1b0g/SzZBP7Ax5JTw2neh", "loginScene");
        var n = e("gm");
        cc.Class({
            extends: cc.Component,
            properties: {
                updateSpeed: .002,
                startBtn: {
                    default: null,
                    type: cc.Node
                },
                loading: {
                    default: null,
                    type: cc.Sprite
                }
            },
            onLoad: function() {
                this.startBtn.active = !1,
                this.initManagers(function() {
                    cc.dm.initUser()
                })
            },
            start: function() {},
            showLogin: function() {
                var e = this;
                this.startBtn.active = !0,
                cc.nm.login(function(t) {
                    console.log("userInfo = ", t),
                    t && (cc.dm.userInfo = t),
                    e.loginBtnCallBack(),
                    cc.gm.playMusicBG("sound/bg")
                })
            },
            loginBtnCallBack: function() {
                cc.gm.loadScene("hallScene")
            },
            initManagers: function(t) {
                var i = this;
                cc.gm = new n,
                cc.nm = e("nativeManager"),
                cc.nm.initShare(),
                cc.dm.initJsonCfg(t),
                cc.gm.initMusic(),
                cc.game.setFrameRate(30),
                this.preloadOk = !1,
                cc.director.preloadScene("gameScene", function() {
                    cc.log("Next scene gameScene"),
                    i.preloadOk = !0,
                    cc.dm.loadGameCfg(function() {
                        i.gameCfgOk = !0
                    })
                });
                var s = cc.sequence(cc.delayTime(.01), cc.callFunc(function() {
                    i.loading.fillRange >= .3 && !i.preloadOk || i.loading.fillRange >= .8 && !i.gameCfgOk || (i.loading.fillRange += i.updateSpeed,
                    i.loading.fillRange >= 1 && (i.node.stopAction(s),
                    i.showLogin()))
                }));
                this.node.runAction(s.repeatForever())
            },
            onDestroy: function() {
                cc.gm.removeAllListeners()
            }
        }),
        cc._RF.pop()
    }
    , {
        gm: "gm",
        nativeManager: "nativeManager"
    }],
    masterBase: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2358eR/zCVJbIYO+ZaSnnPt", "masterBase");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                hp_2: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                hp_3: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                hp_4: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                bodySp: {
                    default: null,
                    type: cc.Node
                },
                hpSp: {
                    default: null,
                    type: cc.Node
                },
                dieSp: {
                    default: null,
                    type: cc.SpriteFrame
                }
            },
            onLoad: function() {
                this.id = 1,
                this.HP = 10,
                this.row = 0,
                this.col = 0,
                this.money = 10,
                this.score = 10,
                this.label = this.node.getChildByName("New Label").getComponent(cc.Label),
                this.label.node.active = !1
            },
            init: function(e) {
                this.id = e.ID,
                this.masterId = e.masterId,
                this.HP = e.hp,
                this.HPMax = e.hp,
                this.row = e.row,
                this.col = e.col,
                this.money = 0,
                this.score = e.goal,
                this.drop = e.drop,
                this.skill = e.skillID,
                this.label.string = "\u602a\u517d" + this.HP,
                parseInt(this.id) < 1e4 ? this.refreshSpByHp() : this.refreshBossByHp(),
                cc.gm.emit(n.setPosByRowCol, {
                    node: this.node,
                    row: this.row,
                    col: this.col,
                    offX: parseInt(this.id) < 1e4 ? 0 : 34,
                    offY: parseInt(this.id) < 1e4 ? 0 : 34
                }),
                this.startGame()
            },
            start: function() {},
            refreshSpByHp: function() {
                -1 != this.masterId && (1 === this.HPMax ? (this.bodySp.active = !0,
                this.hpSp.active = !1) : 2 === this.HPMax ? (this.bodySp.active = !1,
                this.hpSp.active = !0) : (this.bodySp.active = !0,
                this.hpSp.active = !0),
                this.HP > 1 ? (this.hpSp.active = !0,
                this.hpSp.getComponent(cc.Sprite).spriteFrame = this["hp_" + this.HPMax][this.HP - 2]) : (this.hpSp.active = !1,
                this.bodySp.active = !0))
            },
            refreshBossByHp: function() {
                this.node.getChildByName("hp").getChildByName("hp").getComponent(cc.Sprite).fillRange = this.HP / this.HPMax
            },
            startGame: function() {},
            onCollisionEnter: function(e, t) {
                if (!1 !== this.node.active && -1 != this.masterId) {
                    var i = e.node;
                    if (void 0 !== i.ATT && null !== i.Att) {
                        var n = i.ATT;
                        if (n <= 0)
                            return;
                        this.HP -= n,
                        this.label.string = "\u602a\u517d" + this.HP,
                        this.HP <= 0 ? this.breakMaster() : this.hit()
                    }
                }
            },
            breakMaster: function() {
                cc.gm.playMusicEffect("sound/hit"),
                this.destroyAway();
                var e = null;
                for (var t in cc.dm.gameCfg.drop)
                    cc.dm.gameCfg.drop[t].drop_ID === this.drop && (e = cc.dm.gameCfg.drop[t]);
                var i = this.getDropId(e);
                switch (console.log("dropId = ", i),
                cc.gm.emit(n.breakMaster, {
                    score: this.score,
                    pos: {
                        x: this.node.x,
                        y: this.node.y
                    },
                    off: {
                        x: 0,
                        y: this.node.height / 2
                    },
                    dieSp: this.dieSp,
                    dropId: i
                }),
                cc.gm.emit(n.finishTask, 1),
                this.masterId) {
                case "1":
                    cc.gm.emit(n.finishTask, 6);
                    break;
                case "2":
                    cc.gm.emit(n.finishTask, 7);
                    break;
                case "3":
                    cc.gm.emit(n.finishTask, 8);
                    break;
                case "4":
                    cc.gm.emit(n.finishTask, 9);
                    break;
                case "5":
                    cc.gm.emit(n.finishTask, 10)
                }
                this.skill && "" !== this.skill && this.showHitBuff()
            },
            hit: function() {
                cc.gm.playMusicEffect("sound/hit"),
                parseInt(this.id) < 1e4 ? this.refreshSpByHp() : this.refreshBossByHp(),
                this.skill && "" !== this.skill && this.showHitBuff()
            },
            showHitBuff: function() {
                console.log("master skill= ", this.skill);
                for (var e = this.skill.split(";"), t = Math.floor(Math.random() * e.length), i = 0; i < cc.dm.skill.length; i++) {
                    var s = cc.dm.skill[i];
                    if (Number(e[t]) === s.skill_ID) {
                        console.log("master skill= ", s),
                        cc.gm.emit(n.stateChange, s);
                        break
                    }
                }
            },
            getDropId: function(e) {
                if (!e)
                    return null;
                var t = e.drop.split(";")
                  , i = e.percent.split(";")
                  , n = 0;
                for (var s in i)
                    n += Number(i[s]);
                for (var o = Math.floor(Math.random() * n), a = 0; a < i.length; a++) {
                    var r = Number(i[a]);
                    if (!(o > r))
                        return t[a];
                    o -= r
                }
            },
            destroyAway: function() {
                this.node.active = !1,
                this.node.stopAllActions(),
                this.node.removeFromParent()
            },
            onDestroy: function() {}
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    msgLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "10036Z/PS5JP5fqZ41+Fr20", "msgLayer"),
        cc.Class({
            extends: cc.Component,
            properties: {
                moveNode: {
                    default: null,
                    type: cc.Node
                },
                msg: {
                    default: null,
                    type: cc.Label
                }
            },
            onLoad: function() {},
            initMsg: function(e) {
                var t = this;
                this.msg.string = e,
                this.moveNode.opacity = 30,
                this.moveNode.runAction(cc.sequence(cc.fadeIn(.1), cc.delayTime(.7), cc.fadeOut(.4), cc.callFunc(function() {
                    t.node.removeFromParent(!0)
                }))),
                this.moveNode.runAction(cc.sequence(cc.delayTime(.1), cc.moveBy(1.1, 0, 50)))
            },
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    musicButton: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5e7dbyZfJxOc4vjKg5PEHiJ", "musicButton"),
        cc._RF.pop()
    }
    , {}],
    nativeManager: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4a2d3gwvc1LSqjbkfk3K0T/", "nativeManager");
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i),
                n && e(t, n),
                t
            }
        }();
        function s(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var o = e("wechat")
          , a = function() {
            function e() {
                s(this, e)
            }
            return n(e, null, [{
                key: "setFrameRate",
                value: function(e) {
                    cc.sys.platform === cc.sys.WECHAT_GAME && o.setFrameRate(e)
                }
            }, {
                key: "initShare",
                value: function() {
                    cc.sys.platform === cc.sys.WECHAT_GAME && o.initShare()
                }
            }, {
                key: "login",
                value: function(e) {
                    console.log("nativeManager login"),
                    cc.sys.platform === cc.sys.WECHAT_GAME ? o.login(e) : e()
                }
            }, {
                key: "share",
                value: function(e) {
                   // cc.sys.platform === cc.sys.WECHAT_GAME ? o.share(e) : setTimeout(e, 2e3)
				   o.share(e);
                }
            }, {
                key: "vibrateShort",
                value: function() {
                    cc.sys.platform === cc.sys.WECHAT_GAME ? o.vibrateShort() : console.log("\u632f\u52a8\u5c4f\u5e55\uff01\uff01\uff01")
                }
            }, {
                key: "showView",
                value: function(e, t) {
					o.showView(e, t);
					
					//修改
                   /* cc.sys.platform === cc.sys.WECHAT_GAME ? o.showView(e, t) : e ? (console.log("\u89c2\u770b\u89c6\u9891 \u5e7f\u544a\u4f4d\u540d\u79f0 = ", e),
                    t()) : console.log("\u521d\u59cb\u5316\u6fc0\u52b1\u89c6\u9891\u7ec4\u4ef6")*/
                }
            }]),
            e
        }();
        t.exports = a,
        cc._RF.pop()
    }
    , {
        wechat: "wechat"
    }],
    "polyglot.min": [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        (function(e, s) {
            "function" == typeof define && define.amd ? define([], function() {
                return s(e)
            }) : "object" == (void 0 === i ? "undefined" : n(i)) ? t.exports = s(e) : e.Polyglot = s(e)
        }
        )(void 0, function(e) {
            function t(e) {
                e = e || {},
                this.phrases = {},
                this.extend(e.phrases || {}),
                this.currentLocale = e.locale || "en",
                this.allowMissing = !!e.allowMissing,
                this.warn = e.warn || l
            }
            function i(e) {
                var t, i, n, s = {};
                for (t in e)
                    if (e.hasOwnProperty(t))
                        for (n in i = e[t])
                            s[i[n]] = t;
                return s
            }
            function s(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }
            function o(e, t, i) {
                var n, o;
                return null != i && e ? n = s((o = e.split(h))[r(t, i)] || o[0]) : n = e,
                n
            }
            function a(e) {
                var t = i(f);
                return t[e] || t.en
            }
            function r(e, t) {
                return d[a(e)](t)
            }
            function c(e, t) {
                for (var i in t)
                    "_" !== i && t.hasOwnProperty(i) && (e = e.replace(new RegExp("%\\{" + i + "\\}","g"), t[i]));
                return e
            }
            function l(t) {
                e.console && e.console.warn && e.console.warn("WARNING: " + t)
            }
            function u(e) {
                var t = {};
                for (var i in e)
                    t[i] = e[i];
                return t
            }
            t.VERSION = "0.4.3",
            t.prototype.locale = function(e) {
                return e && (this.currentLocale = e),
                this.currentLocale
            }
            ,
            t.prototype.extend = function(e, t) {
                var i;
                for (var s in e)
                    e.hasOwnProperty(s) && (i = e[s],
                    t && (s = t + "." + s),
                    "object" == (void 0 === i ? "undefined" : n(i)) ? this.extend(i, s) : this.phrases[s] = i)
            }
            ,
            t.prototype.clear = function() {
                this.phrases = {}
            }
            ,
            t.prototype.replace = function(e) {
                this.clear(),
                this.extend(e)
            }
            ,
            t.prototype.t = function(e, t) {
                var i, n;
                return "number" == typeof (t = null == t ? {} : t) && (t = {
                    smart_count: t
                }),
                "string" == typeof this.phrases[e] ? i = this.phrases[e] : "string" == typeof t._ ? i = t._ : this.allowMissing ? i = e : (this.warn('Missing translation for key: "' + e + '"'),
                n = e),
                "string" == typeof i && (t = u(t),
                n = c(n = o(i, this.currentLocale, t.smart_count), t)),
                n
            }
            ,
            t.prototype.has = function(e) {
                return e in this.phrases
            }
            ;
            var h = "||||"
              , d = {
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
            }
              , f = {
                chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                french: ["fr", "tl", "pt-br"],
                russian: ["hr", "ru"],
                czech: ["cs"],
                polish: ["pl"],
                icelandic: ["is"]
            };
            return t
        }),
        cc._RF.pop()
    }
    , {}],
    rankingListComponent: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0906ab+0pRGup8Hnxt1bBsb", "rankingListComponent"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                cc.sys.platform === cc.sys.WECHAT_GAME && wx.getOpenDataContext().postMessage({
                    text: "showRank"
                })
            },
            btnClick: function() {
                var e = cc.dm.userBase.level
                  , t = cc.dm.userBase.userLevel
                  , i = 0;
                for (var n in cc.dm.levelMap)
                    i += cc.dm.levelMap[n];
                (console.log("level = " + e + " userLevel = " + t + " star = " + i),
                cc.sys.platform === cc.sys.WECHAT_GAME) && (this.postDataToWX({
                    star: i,
                    level: e,
                    userLevel: t
                }),
                wx.getOpenDataContext().postMessage({
                    text: "showRank"
                }))
            },
            postDataToWX: function(e) {
                var t = new Array;
                t.push({
                    key: "score",
                    value: e.star.toString()
                }),
                t.push({
                    key: "guanqia",
                    value: e.level.toString()
                }),
                t.push({
                    key: "dengji",
                    value: e.userLevel.toString()
                }),
                wx.setUserCloudStorage({
                    KVDataList: t,
                    success: function(e) {
                        console.log("wx.setUserCloudStorage success"),
                        console.log(e)
                    },
                    fail: function(e) {
                        console.log("wx.setUserCloudStorage fail"),
                        console.log(e)
                    }
                })
            },
            start: function() {
                this.tex = new cc.Texture2D
            },
            _updateSubDomainCanvas: function() {
                if (this.tex) {
                    var e = wx.getOpenDataContext().canvas;
                    this.tex.initWithElement(e),
                    this.tex.handleLoadedTexture(),
                    this.display.spriteFrame = new cc.SpriteFrame(this.tex)
                }
            },
            update: function(e) {}
        }),
        cc._RF.pop()
    }
    , {}],
    rankingList: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "8ef327B6B9PiK6lekM05heC", "rankingList"),
        cc.Class({
            extends: cc.Component,
            properties: {
                bg: {
                    default: null,
                    type: cc.Node
                },
                moveBg: {
                    default: null,
                    type: cc.Node
                }
            },
            start: function() {
                this.moveBg.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove.bind(this)),
                this.moveBg.on(cc.Node.EventType.TOUCH_START, this.touchMove.bind(this))
            },
            closeBtnCallBack: function() {
                this.node.active = !1
            },
            touchMove: function() {},
            shareBtnCallBack: function() {
                cc.nm.share(function(e) {
                    e ? console.log("share ok") : (console.log("share false"),
                    cc.gm.showMsg("\u5206\u4eab\u5931\u8d25"))
                })
            },
            update: function(e) {}
        }),
        cc._RF.pop()
    }
    , {}],
    settingInGame: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a16aaVrbnNA8oeBp3dQ56Z2", "settingInGame"),
        cc.Class({
            extends: cc.Component,
            properties: {
                musicBtn: {
                    default: null,
                    type: cc.Node
                },
                effectBtn: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {},
            start: function() {},
            onEnable: function() {
                this.initMusicBtn()
            },
            initMusicBtn: function() {
                console.log("cc.dm.music = ", cc.dm.music),
                this.musicBtn.getChildByName("off").active = 0 === cc.dm.music,
                this.musicBtn.getChildByName("on").active = 1 === cc.dm.music,
                this.effectBtn.getChildByName("off").active = 0 === cc.dm.effect,
                this.effectBtn.getChildByName("on").active = 1 === cc.dm.effect
            },
            musicBtnCallBack: function() {
                cc.dm.music = 1 === cc.dm.music ? 0 : 1,
                cc.gm.setMusicVolume(cc.dm.music),
                this.musicBtn.getChildByName("off").active = 0 === cc.dm.music,
                this.musicBtn.getChildByName("on").active = 1 === cc.dm.music
            },
            effectBtnCallBack: function() {
                cc.dm.effect = 1 === cc.dm.effect ? 0 : 1,
                cc.gm.setEffectVolume(cc.dm.effect),
                this.effectBtn.getChildByName("off").active = 0 === cc.dm.effect,
                this.effectBtn.getChildByName("on").active = 1 === cc.dm.effect
            },
            reGameBtnCallBack: function() {
                cc.gm.showLoading(),
                cc.dm.setGameCfg(0, function() {
                    cc.gm.hideLoading(),
                    cc.dm.gameCfg.map ? cc.dm.userBase.power >= cc.dm.gameCfg.gameRule.cost ? (cc.dm.costPower(),
                    cc.gm.loadScene("gameScene")) : (console.log("no power !!!!!"),
                    cc.gm.showMsg("\u4f53\u529b\u4e0d\u8db3")) : cc.gm.showMsg("\u656c\u8bf7\u671f\u5f85\u540e\u7eed\u5173\u5361")
                })
            },
            backHallBtnCallBack: function() {
                cc.gm.loadScene("hallScene")
            },
            closeBtnCallBack: function() {
                this.node.active = !1,
                cc.dm.gameData.gamepause = !1
            }
        }),
        cc._RF.pop()
    }
    , {}],
    setting: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "04159tH9WlD+5VeX9kvVYpC", "setting"),
        cc.Class({
            extends: cc.Component,
            properties: {
                musicBtn: {
                    default: null,
                    type: cc.Node
                },
                effectBtn: {
                    default: null,
                    type: cc.Node
                },
                idLab: {
                    default: null,
                    type: cc.Label
                },
                kefuLab: {
                    default: null,
                    type: cc.Label
                }
            },
            onLoad: function() {
                this.initMusicBtn(),
                this.idLab.string = "ID:" + cc.dm.userBase._Id
            },
            start: function() {},
            onEnable: function() {
                this.initMusicBtn()
            },
            initMusicBtn: function() {
                this.musicBtn.getChildByName("off").active = 0 === cc.dm.music,
                this.musicBtn.getChildByName("on").active = 1 === cc.dm.music,
                this.effectBtn.getChildByName("off").active = 0 === cc.dm.effect,
                this.effectBtn.getChildByName("on").active = 1 === cc.dm.effect
            },
            musicBtnCallBack: function() {
                cc.dm.music = 1 === cc.dm.music ? 0 : 1,
                cc.gm.setMusicVolume(cc.dm.music),
                this.musicBtn.getChildByName("off").active = 0 === cc.dm.music,
                this.musicBtn.getChildByName("on").active = 1 === cc.dm.music
            },
            effectBtnCallBack: function() {
                cc.dm.effect = 1 === cc.dm.effect ? 0 : 1,
                cc.gm.setEffectVolume(cc.dm.effect),
                this.effectBtn.getChildByName("off").active = 0 === cc.dm.effect,
                this.effectBtn.getChildByName("on").active = 1 === cc.dm.effect
            },
            closeBtnCallBack: function() {
                this.node.active = !1
            }
        }),
        cc._RF.pop()
    }
    , {}],
    shop: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f3f2f++pOdC35gt1tsdqajM", "shop");
        var n = {
            0: 2,
            1: 0,
            2: 1,
            3: 3,
            4: 0,
            5: 1,
            6: 4
        }
          , s = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                item: {
                    default: null,
                    type: cc.Node
                },
                layout: {
                    default: null,
                    type: cc.Node
                },
                itemSP: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                useSP: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
				btns:[]
            },
            onLoad: function() {
				var thisObj = this;
				thisObj.btns = [];
				//埋点 激励用完执行
				this.TimeCheckAd = setInterval(function(){
					var canPlay = true;
					for(var index = 0; index < thisObj.btns.length; index++){
						thisObj.btns[index].active = canPlay;
					}
				}, 500);
			},
			onDestroy:function(){
				clearInterval(this.TimeCheckAd);
			},
            onEnable: function() {
                this.initShopLayer()
            },
            initShopLayer: function() {
				var btns = [];
                for (var e in console.log("initShopLayer"),
                this.layout.removeAllChildren(),
                cc.dm.userShop) {
                    var t = cc.dm.userShop[e];
                    if (t.shop_name) {
                        var i = cc.instantiate(this.item);
                        i.active = !0,
                        i.shopInfo = t,
                        i.getChildByName("itemInfo").getComponent(cc.Label).string = "" + t.shop_name + t.shop_num,
                        i.getChildByName("times").getComponent(cc.Label).string = this._getTotalString(t),
                        i.getChildByName("itemImg").getComponent(cc.Sprite).spriteFrame = this.itemSP[n[t.shop_type]];
                        var s = i.getChildByName("buyBtn");
						if(2 == t.shop_costtype){
							btns.push(s);
						}
                        s.getChildByName("buyNum").getComponent(cc.Label).string = t.shop_cost,
                        s.getChildByName("buyImg").getComponent(cc.Sprite).spriteFrame = this.useSP[t.shop_costtype],
                        s.on("click", this.buyBtnCallBack.bind(this)),
                        this.layout.addChild(i)
                    }
                }
				this.btns = btns;
            },
            _getTotalString: function(e) {
                return void 0 !== e.shop_limit_total && null !== e.shop_limit_total ? "\u603b\u5171\u5269\u4f59" + e.shop_limit_total + "\u6b21" : "\u4eca\u65e5\u5269\u4f59" + e.shop_limit + "\u6b21"
            },
            start: function() {},
            buyBtnCallBack: function(e) {
                var t = this;
                console.log("buyItem = ", e.target.parent.shopInfo),
                2 === e.target.parent.shopInfo.shop_costtype ? cc.nm.showView("adunit-fdfc7c2bac1e6b17", function() {
                    cc.dm.buyShopItem(e.target.parent.shopInfo),
                    t.initShopLayer(),
                    cc.gm.emit(s.updateUserInfoInHall, {})
                }) : (cc.dm.buyShopItem(e.target.parent.shopInfo),
                this.initShopLayer(),
                cc.gm.emit(s.updateUserInfoInHall, {}))
            },
            closeBtnCallBack: function() {
                this.node.active = !1
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    skillBtn: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1e38fZjjJtAorgLpJwhlxtU", "skillBtn");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                cd: {
                    default: null,
                    type: cc.Sprite
                },
                skillSp: {
                    default: null,
                    type: cc.Sprite
                },
                skiiSpArr: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                costNumLab: {
                    default: null,
                    type: cc.Label
                }
            },
            onLoad: function() {
                this.canTouch = !1,
                this.cd.fillRange = 1,
                this.touchInfo = ""
            },
            start: function() {},
            initSkillNode: function(e) {
                this.skill = e;
                var t = parseInt(this.skill.skill_ID / 100) - 1;
                this.skillSp.spriteFrame = this.skiiSpArr[t],
                this.costNumLab.string = this.skill.skill_energy
            },
            skillBtnCallBack: function() {
                var e = this;
                if (this.canTouch) {
                    if (this.isCD)
                        console.log("isCd = true");
                    else if (cc.dm.gameData.gameStart && !cc.dm.gameData.gamepause) {
                        if (!this.checkCanTouchBySkillName())
                            return console.log("this. touchInfo = ", this.touchInfo),
                            void cc.gm.showMsg(this.touchInfo);
                        this.canTouch = !1,
                        this.cd.fillRange = 1;
                        var t = this.skill.skill_cd
                          , i = parseFloat(.5 / t);
                        this.isCD = !0;
                        var s = cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
                            e.cd.fillRange -= i,
                            e.cd.fillRange <= 0 && (e.node.stopAction(s),
                            e.isCD = !1,
                            e.checkCanTouch())
                        })).repeatForever();
                        this.node.runAction(s),
                        cc.gm.emit(n.changePowerAndMagic, {
                            magic: -this.skill.skill_energy
                        }),
                        cc.gm.emit(n.stateChange, this.skill)
                    }
                } else
                    console.log("canTOuch = false;")
            },
            checkCanTouch: function() {
                cc.dm.userBase.magic >= this.skill.skill_energy ? (this.canTouch = !0,
                this.isCD || (this.cd.fillRange = 0)) : (this.canTouch = !1,
                this.isCD || (this.cd.fillRange = 1))
            },
            checkCanTouchBySkillName: function() {
                return "\u5206\u8eab" !== this.skill.skill_name || (!(cc.dm.gameData.heroBullets.length >= this.skill.skill_effectpara) || (this.touchInfo = "\u91d1\u7b8d\u68d2\u4e2a\u6570\u5df2\u8fbe\u4e0a\u9650",
                !1))
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    skillFont: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "eb2c2JM/69GMppkk3Lhe32J", "skillFont"),
        cc.Class({
            extends: cc.Component,
            properties: {
                skillSp: {
                    default: null,
                    type: cc.Sprite
                },
                skillSpArr: {
                    default: [],
                    type: [cc.SpriteFrame]
                }
            },
            onLoad: function() {},
            init: function(e) {
                var t = this
                  , i = parseInt(e.skill_ID / 100) - 1;
                this.skillSp.spriteFrame = this.skillSpArr[i],
                this.node.runAction(cc.sequence(cc.moveBy(.3, 0, 30), cc.delayTime(.3), cc.callFunc(function() {
                    t.removeOut()
                })))
            },
            start: function() {},
            reuse: function(e) {
                this.skillFontPool = e
            },
            removeOut: function() {
                this.skillFontPool.put(this.node)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    skill: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "406a3N9gbdN8JGuIZm4kq5o", "skill");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                item: {
                    default: null,
                    type: cc.Node
                },
                layout: {
                    default: null,
                    type: cc.Node
                },
                skillSP: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                useSP: {
                    default: [],
                    type: [cc.SpriteFrame]
                }
            },
            onLoad: function() {},
            start: function() {},
            onEnable: function() {
                this.initSkill()
            },
            initSkill: function() {
                this.layout.removeAllChildren();
                var e = cc.dm.userSkill;
                for (var t in e) {
                    var i = e[t]
                      , n = cc.instantiate(this.item);
                    n.skill = i,
                    n.active = !0;
                    var s = parseInt(i.skill_ID / 100) - 1;
                    n.getChildByName("itemImg").getComponent(cc.Sprite).spriteFrame = this.skillSP[s],
                    n.getChildByName("name").getComponent(cc.Label).string = i.skill_name,
                    n.getChildByName("level").getComponent(cc.Label).string = "Lv:" + i.skill_level,
                    n.getChildByName("consume").getComponent(cc.Label).string = "\u6cd5\u529b\u6d88\u8017:" + i.skill_energy,
                    n.getChildByName("info").getComponent(cc.Label).string = cc.dm.format(i.skill_des, i.skill_effectpara || i.skill_time, i.skill_time);
                    var o = n.getChildByName("study")
                      , a = n.getChildByName("levelUp")
                      , r = n.getChildByName("lock");
                    cc.dm.userBase.userLevel < i.skill_lock ? (r.active = !0,
                    o.active = !1,
                    a.active = !1,
                    r.getChildByName("useNum").getComponent(cc.Label).string = "\u7b49\u7ea7" + i.skill_lock + "\u7ea7",
                    r.getChildByName("info").getComponent(cc.Label).string = 0 !== i.skill_level ? "\u53ef\u5347\u7ea7" : "\u53ef\u89e3\u9501") : i.skill_ID % 100 == 0 ? (o.active = !0,
                    r.active = !1,
                    a.active = !1,
                    o.getChildByName("sp").getComponent(cc.Sprite).spriteFrame = this.useSP[i.skill_costtype - 1],
                    o.getChildByName("useNum").getComponent(cc.Label).string = cc.dm.getFormatNumber(i.skill_cost).toString()) : i.skill_lock ? (a.active = !0,
                    o.active = !1,
                    r.active = !1,
                    a.getChildByName("sp").getComponent(cc.Sprite).spriteFrame = this.useSP[i.skill_costtype - 1],
                    a.getChildByName("useNum").getComponent(cc.Label).string = cc.dm.getFormatNumber(i.skill_cost).toString()) : (r.active = !0,
                    o.active = !1,
                    a.active = !1,
                    r.getChildByName("useNum").getComponent(cc.Label).string = "",
                    r.getChildByName("info").getComponent(cc.Label).string = "\u5df2\u6ee1\u7ea7"),
                    a.on("click", this.levelUpBtnCallBack.bind(this)),
                    o.on("click", this.studyBtnCallBack.bind(this)),
                    this.layout.addChild(n)
                }
            },
            closeBtnCallBack: function() {
                this.node.active = !1
            },
            studyBtnCallBack: function(e) {
                console.log("studyBtncallBack", e),
                cc.dm.updateskillInHall(e.target.parent.skill),
                this.initSkill(),
                cc.gm.emit(n.updateUserInfoInHall, {})
            },
            levelUpBtnCallBack: function(e) {
                console.log("levelUpBtnCallBack", e),
                cc.dm.updateskillInHall(e.target.parent.skill),
                this.initSkill(),
                cc.gm.emit(n.updateUserInfoInHall, {})
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    startGame: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b88e4Ik209M6LKfEojQzNJA", "startGame"),
        cc.Class({
            extends: cc.Component,
            properties: {
                stars: {
                    default: [],
                    type: [cc.Node]
                },
                levelInfo: {
                    default: null,
                    type: cc.Label
                },
                winInfo: {
                    default: null,
                    type: cc.Label
                }
            },
            onLoad: function() {},
            start: function() {},
            initGame: function(e) {
                console.log("startGame data = ", e);
                var t = cc.dm.levelMap[e.toString()] || 0;
                console.log("starNum= ", t);
                for (var i = 0; i < this.stars.length; i++)
                    this.stars[i].getChildByName("star").active = i < t;
                this.levelInfo.string = "d" + e + "g"
            },
            closeBtnCallBack: function() {
                this.node.active = !1
            },
            startGameBtnCallBack: function() {
                cc.gm.showLoading(),
                cc.dm.loadGameMap(function() {
                    cc.gm.hideLoading(),
                    cc.dm.userBase.power >= cc.dm.gameCfg.gameRule.cost ? (cc.dm.costPower(),
                    cc.gm.loadScene("gameScene")) : (cc.gm.showMsg("\u4f53\u529b\u4e0d\u8db3"),
                    console.log("no power !!!!!"))
                })
            }
        }),
        cc._RF.pop()
    }
    , {}],
    stateManager: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2c0f18nVmBBoad/0f23TkbR", "stateManager");
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i),
                n && e(t, n),
                t
            }
        }();
        function s(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var o = e("enums").Event_Name
          , a = function() {
            function e() {
                s(this, e)
            }
            return n(e, null, [{
                key: "changeState",
                value: function(e, t, i) {
                    switch (console.log("changeState  fenshen !!!!!!!"),
                    i) {
                    case "hero":
                        console.log("changeHeroState"),
                        this.changeFenShen(e, t),
                        this.changeDingShen(e, t),
                        this.changeZengChang(e, t),
                        this.changeSuoDuan(e, t),
                        this.changeMiLuan(e, t),
                        this.changeHuiFu(e, t);
                        break;
                    case "bulletHero":
                        console.log("changeBulletHeroState"),
                        this.changeJiXing(e, t),
                        this.changeHuanShen(e, t),
                        this.changeJiNu(e, t),
                        this.changeYiZhi(e, t),
                        this.changeSuoXiao(e, t),
                        this.changeJuHua(e, t)
                    }
                }
            }, {
                key: "changeFenShen",
                value: function(e, t) {
                    "\u5206\u8eab" === e.skill_name && (console.log("fenshen !!!!!!!"),
                    cc.dm.gameData.heroBullets.length >= e.skill_effectpara || cc.gm.emit(o.eventFenShen, {
                        num: e.skill_effectpara,
                        pos: {
                            x: t.node.x,
                            y: t.node.y + t.node.height / 2 + 40
                        }
                    }))
                }
            }, {
                key: "changeJiXing",
                value: function(e, t) {
                    if ("\u75be\u884c" === e.skill_name) {
                        var i = t.speedBase * e.skill_effectpara / 100
                          , n = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.speed -= i,
                            t.changeSpeed(),
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time));
                        t.speed += i,
                        t.addStatePic(e.skill_name),
                        t.changeSpeed(),
                        t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeHuanShen",
                value: function(e, t) {
                    if ("\u7f13\u8eab" === e.skill_name) {
                        var i = t.speedBase * e.skill_effectpara / 100
                          , n = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.speed += i,
                            t.changeSpeed(),
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time));
                        t.speed -= i,
                        t.addStatePic(e.skill_name),
                        t.changeSpeed(),
                        t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeDingShen",
                value: function(e, t) {
                    if ("\u5b9a\u8eab" === e.skill_name) {
                        var i = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.isDingShen = !1,
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(i, 1e3 * e.skill_time));
                        t.isDingShen = !0,
                        t.addStatePic(e.skill_name),
                        t["skill" + e.skill_efeectid] = setTimeout(i, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeJiNu",
                value: function(e, t) {
                    if ("\u6fc0\u6012" === e.skill_name) {
                        var i = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.node.ATT -= e.skill_effectpara,
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(i, 1e3 * e.skill_time));
                        t.node.ATT += e.skill_effectpara,
                        t.addStatePic(e.skill_name),
                        t["skill" + e.skill_efeectid] = setTimeout(i, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeYiZhi",
                value: function(e, t) {
                    if ("\u6291\u5236" === e.skill_name) {
                        var i = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.node.ATT += e.skill_effectpara,
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(i, 1e3 * e.skill_time));
                        t.node.ATT -= e.skill_effectpara,
                        t.addStatePic(e.skill_name),
                        t["skill" + e.skill_efeectid] = setTimeout(i, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeSuoXiao",
                value: function(e, t) {
                    if ("\u7f29\u5c0f" === e.skill_name) {
                        var i = t.scaleBase * e.skill_effectpara / 100
                          , n = function() {
                            console.log("callBack!!!!!"),
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.scaleOver += i,
                            t.node.runAction(cc.scaleTo(.05, t.scaleOver)),
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time));
                        console.log("suoxiao = ", t["skill" + e.skill_efeectid]),
                        t.scaleOver -= i,
                        t.node.runAction(cc.scaleTo(.05, t.scaleOver)),
                        t.addStatePic(e.skill_name),
                        t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeJuHua",
                value: function(e, t) {
                    if ("\u5de8\u5316" === e.skill_name) {
                        var i = t.scaleBase * e.skill_effectpara / 100
                          , n = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.scaleOver -= i,
                            t.node.runAction(cc.scaleTo(.05, t.scaleOver)),
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time));
                        t.scaleOver += i,
                        t.node.runAction(cc.scaleTo(.05, t.scaleOver)),
                        t.addStatePic(e.skill_name),
                        t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeZengChang",
                value: function(e, t) {
                    if ("\u589e\u957f" === e.skill_name) {
                        var i = t.scaleBase * e.skill_effectpara / 100
                          , n = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.scaleOver -= i,
                            t.node.runAction(cc.scaleTo(.05, t.scaleOver, 1)),
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time));
                        t.scaleOver += i,
                        t.node.runAction(cc.scaleTo(.05, t.scaleOver, 1)),
                        t.addStatePic(e.skill_name),
                        t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeSuoDuan",
                value: function(e, t) {
                    if ("\u7f29\u77ed" === e.skill_name) {
                        var i = t.scaleBase * e.skill_effectpara / 100
                          , n = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.scaleOver += i,
                            t.node.runAction(cc.scaleTo(.05, t.scaleOver, 1)),
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time));
                        t.scaleOver -= i,
                        t.node.runAction(cc.scaleTo(.05, t.scaleOver, 1)),
                        t.addStatePic(e.skill_name),
                        t["skill" + e.skill_efeectid] = setTimeout(n, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeMiLuan",
                value: function(e, t) {
                    if ("\u8ff7\u4e71" === e.skill_name) {
                        var i = function() {
                            t.node && (t["skill" + e.skill_efeectid] = null,
                            t.miluan = !1,
                            t.delStatePic(e.skill_name))
                        };
                        if (t["skill" + e.skill_efeectid])
                            return clearTimeout(t["skill" + e.skill_efeectid]),
                            void (t["skill" + e.skill_efeectid] = setTimeout(i, 1e3 * e.skill_time));
                        t.miluan = !0,
                        t.addStatePic(e.skill_name),
                        t["skill" + e.skill_efeectid] = setTimeout(i, 1e3 * e.skill_time)
                    }
                }
            }, {
                key: "changeHuiFu",
                value: function(e, t) {
                    "\u6062\u590d" === e.skill_name && (cc.dm.gameRole.HP += e.skill_effectpara,
                    cc.dm.gameRole.HP = cc.dm.gameRole.HP > cc.dm.gameRole.HPMax ? cc.dm.gameRole.HPMax : cc.dm.gameRole.HP,
                    cc.gm.emit(o.eventHuiFu, {}))
                }
            }, {
                key: "clearTimeOut",
                value: function() {
                    for (var e = 1; e <= 14; e++)
                        cc.dm["skill" + e] && (clearTimeout(cc.dm["skill" + e]),
                        cc.dm["skill" + e] = null)
                }
            }]),
            e
        }();
        t.exports = a,
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    stoneBase: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2e9f1ketnlI87jB5M1H+BjS", "stoneBase");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.collisionCount = 1,
                this.spFrame = "",
                this.row = 0,
                this.col = 0,
                this.money = 0,
                this.label = this.node.getChildByName("New Label").getComponent(cc.Label)
            },
            init: function(e) {
                this.collisionCount = e.collisionCount,
                this.spFrame = e.spFrame || "",
                this.row = e.row,
                this.col = e.col,
                this.money = e.money,
                this.offX = e.offX,
                this.offY = e.offY,
                this.label.string = "\u77f3\u5757+" + this.collisionCount,
                cc.gm.emit(n.setPosByRowCol, {
                    node: this.node,
                    row: this.row,
                    col: this.col,
                    offX: this.offX,
                    offY: this.offY
                })
            },
            start: function() {},
            onCollisionEnter: function(e, t) {
                !1 !== this.node.active && -1 !== this.collisionCount && (this.collisionCount--,
                this.label.string = "\u77f3\u5757+" + this.collisionCount,
                this.collisionCount <= 0 ? this.breakStone() : this.changeFrame())
            },
            changeFrame: function() {
                this.spFrame = ""
            },
            breakStone: function() {
                this.destroyAway(),
                cc.gm.emit(n.breakStone, {
                    money: this.money,
                    pos: {
                        x: this.node.x,
                        y: this.node.y + this.node.height
                    }
                })
            },
            destroyAway: function() {
                this.node.active = !1,
                this.node.removeFromParent()
            },
            onDestroy: function() {}
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    task: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5cf27/OPX5C84B0N6xt9Fbk", "task");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , s = e("enums").Event_Name
          , o = e("moment");
        cc.Class({
            extends: cc.Component,
            properties: {
                dayBtn: {
                    default: null,
                    type: cc.Node
                },
                loginBtn: {
                    default: null,
                    type: cc.Node
                },
                dayNode: {
                    default: null,
                    type: cc.Node
                },
                loginNode: {
                    default: null,
                    type: cc.Node
                },
                taskLayout: {
                    default: null,
                    type: cc.Node
                },
                taskItem: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {
				
				
			},
            onEnable: function() {
                this.refreshBtn(!0),
                this.initLoginLayer(),
                this.initTaskLayer()
            },
            start: function() {
				
				var doubleBtn = this.loginNode.getChildByName("doubleBtn");
				//埋点 激励用完隐藏。不用定时
				//doubleBtn.active = 0;
			},
            closeBtnCallBack: function() {
                this.node.active = !1
            },
            dayBtnCallBack: function() {
                this.refreshBtn(!1),
                this.initTaskLayer()
            },
            loginBtnCallBack: function() {
                this.refreshBtn(!0)
            },
            refreshBtn: function(e) {
                this.loginNode.active = e,
                this.loginBtn.getChildByName("off").active = !e,
                this.loginBtn.getChildByName("on").active = e,
                this.loginBtn.getComponent(cc.Button).interactable = !e,
                this.dayNode.active = !e,
                this.dayBtn.getChildByName("off").active = e,
                this.dayBtn.getChildByName("on").active = !e,
                this.dayBtn.getComponent(cc.Button).interactable = e
            },
            initLoginLayer: function() {
                var e = cc.dm.userLoginTask;
                e.getNum = e.getNum || 0,
                e.getDate = e.getDate || o("2017-08-08").format("YYYYMMDD");
                var t = this.loginNode.getChildByName("tasks")
                  , i = o.now();
                for (var s in e)
                    if ("object" === n(e[s])) {
                        var a = e[s]
                          , r = t.getChildByName("day_" + a.sign_ID);
                        r.getChildByName("hasGet").active = a.hasGetOver,
                        o(i).isSame(e.getDate, "day") && Number(a.sign_day) === Number(e.getNum) ? (r.getChildByName("today").active = !0,
                        this.loginItem = a) : o(i).isSame(e.getDate, "day") || Number(a.sign_day) !== Number(e.getNum) + 1 ? r.getChildByName("today").active = !1 : (r.getChildByName("today").active = !0,
                        this.loginItem = a);
                        var c = r.getChildByName("num");
                        c && (c.getComponent(cc.Label).string = "x" + a.sign_rewardnum)
                    }
				try{
					this.loginItem.hasGetOver && (this.loginNode.getChildByName("getBtn").getComponent(cc.Button).interactable = !1,
					this.loginNode.getChildByName("doubleBtn").getComponent(cc.Button).interactable = !1)
				}catch(err){}
            },
            getLoginPrizeBtnCallBack: function(e, t) {
                var i = this;
                console.log("eventData = ", t),
                console.log("this.loginItem = ", this.loginItem),
                t ? cc.nm.showView("adunit-fdfc7c2bac1e6b17", function() {
                    cc.dm.getLoginPrize(i.loginItem, t),
                    cc.gm.emit(s.updateUserInfoInHall, {}),
                    i.initLoginLayer(),
                    cc.gm.emit(s.finishTask, 5)
                }) : (cc.dm.getLoginPrize(this.loginItem, t),
                cc.gm.emit(s.updateUserInfoInHall, {}),
                this.initLoginLayer(),
                cc.gm.emit(s.finishTask, 5))
            },
            initTaskLayer: function() {
                this.taskLayout.removeAllChildren();
                var e = [];
                for (var t in cc.dm.userDayTask)
                    cc.dm.userDayTask[t].task_ID && e.push(cc.dm.userDayTask[t]);
                for (var i in e.sort(function(e, t) {
                    return e.doubleGet && t.doubleGet ? 0 : e.doubleGet || t.doubleGet ? e.doubleGet && !t.doubleGet ? 1 : !e.doubleGet && t.doubleGet ? -1 : 0 : 0
                }),
                e) {
                    var n = e[i]
                      , s = cc.instantiate(this.taskItem);
                    s.taskInfo = n,
                    s.active = !0,
                    this.taskLayout.addChild(s),
                    s.getChildByName("name").getComponent(cc.Label).string = n.task_name,
                    1 === n.task_type ? s.getChildByName("info").getComponent(cc.Label).string = cc.dm.format(n.task_des, n.task_aimnum) : 2 === n.task_type && (s.getChildByName("info").getComponent(cc.Label).string = n.task_des);
                    var o = s.getChildByName("itemBg");
                    if (1 === n.task_type)
                        o.getChildByName("num").getComponent(cc.Label).string = (n.finishNum || 0) + "/" + n.task_aimnum,
                        o.getChildByName("progress").getComponent(cc.Sprite).fillRange = (n.finishNum || 0) / n.task_aimnum,
                        o.getChildByName("icon_7").active = !1;
                    else if (2 === n.task_type) {
                        var a = cc.dm.getLevelAndStarNum(n.task_aimnum).starNum;
                        o.getChildByName("num").getComponent(cc.Label).string = (n.finishNum || 0) + "/" + a,
                        o.getChildByName("progress").getComponent(cc.Sprite).fillRange = (n.finishNum || 0) / a,
                        o.getChildByName("icon_7").active = !0
                    }
                    var r = s.getChildByName("getBtn");
                    r.getChildByName("num").getComponent(cc.Label).string = "x" + n.task_rewardnum,
                    r.getComponent(cc.Button).interactable = !n.hasGet,
                    r.on("click", this.getBtnCallBack.bind(this)),
                    o.getChildByName("progress").getComponent(cc.Sprite).fillRange < 1 && (r.getComponent(cc.Button).interactable = !1),
                    n.hasGet && (r.active = !1);
                    var c = s.getChildByName("doubleBtn");
                    c.getComponent(cc.Button).interactable = !n.doubleGet,
                    c.on("click", this.doubleBtnCallBack.bind(this)),
                    c.active = n.hasGet,
                    o.getChildByName("progress").getComponent(cc.Sprite).fillRange < 1 && (r.getComponent(cc.Button).interactable = !1),
                    s.getChildByName("name").getComponent(cc.Label).string = n.task_name
                }
            },
            getBtnCallBack: function(e) {
                if (e.target.parent.getChildByName("itemBg").getChildByName("progress").getComponent(cc.Sprite).fillRange < 1)
                    cc.gm.showMsg("\u4efb\u52a1\u8fd8\u6ca1\u6709\u5b8c\u6210\uff0c\u7ee7\u7eed\u52a0\u6cb9");
                else {
                    var t = e.target.parent.taskInfo;
                    console.log("btn taskInfo  = ", t),
                    cc.dm.getDayTaskAward(t.task_ID),
                    this.initTaskLayer()
                }
            },
            doubleBtnCallBack: function(e) {
                var t = this;
                e.target.parent.getChildByName("itemBg").getChildByName("progress").getComponent(cc.Sprite).fillRange < 1 ? cc.gm.showMsg("\u4efb\u52a1\u8fd8\u6ca1\u6709\u5b8c\u6210\uff0c\u7ee7\u7eed\u52a0\u6cb9") : cc.nm.showView("adunit-fdfc7c2bac1e6b17", function() {
                    var i = e.target.parent.taskInfo;
                    console.log("btn taskInfo  = ", i),
                    cc.dm.getDayTaskAwardDouble(i.task_ID),
                    t.initTaskLayer()
                })
            },
            testTaskFinish: function() {
                cc.gm.emit(s.finishTask, 2)
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums",
        moment: 4
    }],
    userInfo: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c052cWMBsxKsKXOJeajFmkP", "userInfo");
        var n = e("enums").Event_Name;
        cc.Class({
            extends: cc.Component,
            properties: {
                powerLab: {
                    default: null,
                    type: cc.Label
                },
                magicLab: {
                    default: null,
                    type: cc.Label
                },
                moneyLab: {
                    default: null,
                    type: cc.Label
                },
                coinLab: {
                    default: null,
                    type: cc.Label
                },
                userLevelLab: {
                    default: null,
                    type: cc.Label
                },
                expLab: {
                    default: null,
                    type: cc.Label
                },
                expProgress: {
                    default: null,
                    type: cc.ProgressBar
                },
                headImg: {
                    default: null,
                    type: cc.Sprite
                }
            },
            onLoad: function() {
                var e = this;
                if (cc.gm.on(n.updateUserInfoInHall, this.updateUserInfoInHall.bind(this), this.node.uuid),
                cc.gm.on(n.changePowerAndMagic, this.changePowerAndMagic.bind(this), this.node.uuid),
                this.initUserInfo(),
                cc.dm.userInfo) {
                    var t = cc.dm.userInfo.avatarUrl + "?aa=aa.jpg";
                    cc.loader.load(t, function(t, i) {
                        e.headImg.spriteFrame = new cc.SpriteFrame(i)
                    })
                }
            },
            initUserInfo: function() {
                var e = cc.dm.userBase
                  , t = e.wantExp;
                this.powerLab.string = e.power + "/" + e.powerMax,
                this.magicLab.string = e.magic + "/" + e.magicMax,
                this.moneyLab.string = "" + cc.dm.getFormatNumber(e.money),
                this.coinLab.string = "" + cc.dm.getFormatNumber(e.coin),
                this.userLevelLab.string = "\u7b49\u7ea7\uff1a" + e.userLevel,
                this.expLab.string = e.userEXP + "/" + t,
                this.expProgress.progress = parseFloat(e.userEXP / t)
            },
            updateUserInfoInHall: function(e) {
                this.initUserInfo()
            },
            changePowerAndMagic: function() {
                this.initUserInfo()
            },
            settingCallBack: function() {
                console.log("\u6253\u5f00\u8bbe\u7f6e\u754c\u9762"),
                cc.find("Canvas").getComponent("hallScene").settingBtnCallBack()
            },
            shopBtnCallBack: function() {
                console.log("\u6253\u5f00\u5546\u57ce\u754c\u9762"),
                cc.find("Canvas").getComponent("hallScene").shopBtnCallBack()
            },
            start: function() {},
            onDestroy: function() {
                cc.gm.off(n.updateUserInfoInHall, this.node.uuid),
                cc.gm.off(n.changePowerAndMagic, this.node.uuid)
            },
            testCoinBtnCallBack: function() {
                cc.gm.showMsg("\u91d1\u5e01+1000"),
                cc.gm.emit(n.updateUserInfoInHall, {
                    coin: 1e3
                })
            },
            testMoneyBtnCallBack: function() {
                cc.gm.showMsg("\u5143\u5b9d+1000"),
                cc.gm.emit(n.updateUserInfoInHall, {
                    money: 1e3
                })
            },
            testExpBtnCallBack: function() {
                cc.gm.showMsg("\u7ecf\u9a8c+6"),
                cc.gm.emit(n.updateUserInfoInHall, {
                    userEXP: 6
                })
            }
        }),
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }],
    wechat: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7a5bfWso05Jl7KXW9vMrOo+", "wechat");
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i),
                n && e(t, n),
                t
            }
        }();
        function s(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var o = e("enums").Event_Name
          , a = ["\u4e3a\u5e08\u575a\u6301\u4e0d\u4f4f\u5566\uff01\u5feb\u6765\u6551\u6211", "\u5996\u7cbe\uff01\u5403\u4ffa\u8001\u5b59\u4e00\u68d2\uff01", "\u6709\u4e2a\u87e0\u6843\u4f1a\u8001\u5b59\u8bf7\u4f60\u53c2\u52a0\u4e00\u4e0b", "\u6211\u5728\u4f17\u4ed9\u4e2d\u6392\u884c\u7b2c\u4e00\uff0c\u5feb\u6765\u770b\u770b\u4f60\u6392\u7b2c\u51e0", "\u4e00\u4e2a\u80fd\u6253\u7684\u90fd\u6ca1\u6709\uff0c\u4e0d\u670d\u6765\u6218\uff01"]
          , r = function() {
            function e() {
                s(this, e)
            }
            return n(e, null, [{
                key: "setFrameRate",
                value: function(e) {
                    wx.setPreferredFramesPerSecond(e)
                }
            }, {
                key: "initShare",
                value: function() {
                    wx.showShareMenu(),
                    wx.updateShareMenu({
                        withShareTicket: !0
                    }),
                    wx.onShareAppMessage(function(e) {
                        var t = Math.floor(5 * Math.random());
                        return {
                            title: a[t],
                            imageUrl: "https://blockhuaxia.com/res/tantan1/share_" + t + ".jpg",
                            success: function(e) {
                                console.log("\u8f6c\u53d1\u6210\u529f!!!"),
                                cc.gm.emit(o.finishTask, 4)
                            },
                            fail: function(e) {
                                console.log("\u8f6c\u53d1\u5931\u8d25!!!")
                            }
                        }
                    })
                }
            }, {
                key: "login",
                value: function(e) {
                    wx.getSetting({
                        success: function(t) {
                            if (console.log(t.authSetting),
                            t.authSetting["scope.userInfo"])
                                console.log("\u5df2\u6388\u6743"),
                                wx.getUserInfo({
                                    success: function(t) {
                                        console.log(t.userInfo),
                                        e(t.userInfo)
                                    }
                                });
                            else {
                                var i = wx.createUserInfoButton({
                                    type: "text",
                                    style: {
                                        left: 0,
                                        top: 0,
                                        width: 500,
                                        height: 1e3,
                                        lineHeight: 40,
                                        backgroundColor: "#ffffff00",
                                        color: "#ffffff00",
                                        textAlign: "center",
                                        fontSize: 16,
                                        borderRadius: 4
                                    }
                                });
                                i.onTap(function(t) {
                                    console.log("res === : ", t, "\u662f\u5426\u6388\u6743\uff1a ", t.errMsg),
                                    "getUserInfo:ok" == t.errMsg ? (console.log("\u786e\u8ba4\u6388\u6743"),
                                    console.log(t.userInfo),
                                    e(t.userInfo),
                                    i.destroy()) : console.log("\u62d2\u63a5\u6388\u6743")
                                })
                            }
                        }
                    })
                }
            }, {
                key: "share",
                value: function(e) {
					//埋点 分享 root share
					console.log("show root share");
					
                  /*  console.log("\u5fae\u4fe1\u5206\u4eab");
                    var t = Math.floor(5 * Math.random());
                    wx.shareAppMessage({
                        title: a[t],
                        imageUrl: "https://blockhuaxia.com/res/tantan1/share_" + t + ".jpg",
                        success: function(t) {
                            return console.log("\u5fae\u4fe1\u5206\u4eab\u6210\u529f!!!" + t),
                            e(!0),
                            !0
                        },
                        fail: function(t) {
                            return console.log("\u5fae\u4fe1\u5206\u4eab\u5931\u8d25!!!" + t),
                            e(!1),
                            !1
                        }
                    }),
                    setTimeout(function() {
                        cc.gm.emit(o.finishTask, 4)
                    }, 1e3)*/
                }
            }, {
                key: "vibrateShort",
                value: function(e) {
                    console.log("zhendong"),
                    wx.vibrateLong({
                        success: function(e) {
                            console.log("\u9707\u52a8\u6210\u529f")
                        },
                        fail: function(e) {
                            console.log("\u9707\u52a8\u5931\u8d25")
                        }
                    })
                }
            }, {
                key: "showView",
                value: function(e, t) {
					//埋点 root video。 完整播放完回调t();否则不回调
					console.log("show video");
					t();
					
					//修改
                  /*  var i = this
                      , n = wx.createRewardedVideoAd({
                        adUnitId: "adunit-fdfc7c2bac1e6b17"
                    });
                    if (cc.dm.videoCallBack = t,
                    e) {
                        n.load().then(function() {
                            return n.show()
                        }).catch(function(e) {
                            return console.log(e.errMsg)
                        });
                        n.onClose(function e(i) {
                            console.log("\u89c6\u9891\u64ad\u653e\u5b8c\u6bd5"),
                            i && i.isEnded || void 0 === i ? t() : cc.gm.showMsg("未能观看完整视频"),
                            n.offClose(e)
                        })
                    } else
                        n.onError(function(e) {
                            console.log("\u62c9\u53d6\u6fc0\u52b1\u89c6\u9891\u5931\u8d25", e),
                            e.errCode || (i.share(function() {}),
                            setTimeout(function() {
                                cc.dm.videoCallBack && cc.dm.videoCallBack()
                            }, 2e3))
                        })*/
                }
            }]),
            e
        }();
        t.exports = r,
        cc._RF.pop()
    }
    , {
        enums: "enums"
    }]
}, {}, ["LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "loading", "msgLayer", "endScene", "gameManager", "gameScene", "bodyBase", "bulletBase", "bulletHero", "chestBase", "dead", "endGame", "heroBase", "itemBase", "levelUp", "masterBase", "skillBtn", "skillFont", "stoneBase", "settingInGame", "stateManager", "hallManager", "hallScene", "levelItem", "levelMap", "rankingList", "setting", "shop", "skill", "startGame", "task", "rankingListComponent", "userInfo", "loginScene", "clickEffectComp", "musicButton", "codes", "enums", "commonData", "endData", "gameData", "hallData", "loginData", "dm", "gm", "nativeManager", "wechat"]);
