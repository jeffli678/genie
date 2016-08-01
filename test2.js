(function () {
    var gapi = window.gapi = window.gapi || {};
    gapi._bs = new Date().getTime();
    (function () {
        var g = window,
            k = document,
            aa = g.location,
            ba = function () {},
            ca = /\[native code\]/,
            m = function (a, b, c) {
                return a[b] = a[b] || c
            },
            da = function (a) {
                for (var b = 0; b < this.length; b++)
                    if (this[b] === a) return b;
                return -1
            },
            ea = function (a) {
                a = a.sort();
                for (var b = [], c = void 0, d = 0; d < a.length; d++) {
                    var e = a[d];
                    e != c && b.push(e);
                    c = e
                }
                return b
            },
            n = function () {
                var a;
                if ((a = Object.create) && ca.test(a)) a = a(null);
                else {
                    a = {};
                    for (var b in a) a[b] = void 0
                }
                return a
            },
            q = m(g, "gapi", {});
        var r;
        r = m(g, "___jsl", n());
        m(r, "I", 0);
        m(r, "hel", 10);
        var x = function () {
                var a = aa.href,
                    b;
                if (r.dpo) b = r.h;
                else {
                    b = r.h;
                    var c = RegExp("([#].*&|[#])jsh=([^&#]*)", "g"),
                        d = RegExp("([?#].*&|[?#])jsh=([^&#]*)", "g");
                    if (a = a && (c.exec(a) || d.exec(a))) try {
                        b = decodeURIComponent(a[2])
                    } catch (e) {}
                }
                return b
            },
            fa = function (a) {
                var b = m(r, "PQ", []);
                r.PQ = [];
                var c = b.length;
                if (0 === c) a();
                else
                    for (var d = 0, e = function () {
                            ++d === c && a()
                        }, f = 0; f < c; f++) b[f](e)
            },
            B = function (a) {
                return m(m(r, "H", n()), a, n())
            };
        var C = m(r, "perf", n()),
            D = m(C, "g", n()),
            ga = m(C, "i", n());
        m(C, "r", []);
        n();
        n();
        var E = function (a, b, c) {
                var d = C.r;
                "function" === typeof d ? d(a, b, c) : d.push([a, b, c])
            },
            H = function (a, b, c) {
                b && 0 < b.length && (b = F(b), c && 0 < c.length && (b += "___" + F(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = m(ga, "_p", n()), m(b, c, n())[a] = (new Date).getTime(), E(a, "_p", c))
            },
            F = function (a) {
                return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/\,/g, "_")
            };
        var I = n(),
            J = [],
            K = function (a) {
                throw Error("Bad hint" + (a ? ": " + a : ""));
            };
        J.push(["jsl", function (a) {
            for (var b in a)
                if (Object.prototype.hasOwnProperty.call(a, b)) {
                    var c = a[b];
                    "object" == typeof c ? r[b] = m(r, b, []).concat(c) : m(r, b, c)
                }
            if (b = a.u) a = m(r, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1])
        }]);
        var ha = /^(\/[a-zA-Z0-9_\-]+)+$/,
            ia = /^[a-zA-Z0-9\-_\.,!]+$/,
            ja = /^gapi\.loaded_[0-9]+$/,
            ka = /^[a-zA-Z0-9,._-]+$/,
            oa = function (a, b, c, d) {
                var e = a.split(";"),
                    f = e.shift(),
                    l = I[f],
                    h = null;
                l ? h = l(e, b, c, d) : K("no hint processor for: " + f);
                h || K("failed to generate load url");
                b = h;
                c = b.match(la);
                (d = b.match(ma)) && 1 === d.length && na.test(b) && c && 1 === c.length || K("failed sanity: " + a);
                return h
            },
            qa = function (a, b, c, d) {
                a = pa(a);
                ja.test(c) || K("invalid_callback");
                b = L(b);
                d = d && d.length ? L(d) : null;
                var e = function (a) {
                    return encodeURIComponent(a).replace(/%2C/g,
                        ",")
                };
                return [encodeURIComponent(a.g).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.a ? "/am=" + e(a.a) : "", a.c ? "/rs=" + e(a.c) : "", a.f ? "/t=" + e(a.f) : "", "/cb=", e(c)].join("")
            },
            pa = function (a) {
                "/" !== a.charAt(0) && K("relative path");
                for (var b = a.substring(1).split("/"), c = []; b.length;) {
                    a = b.shift();
                    if (!a.length || 0 == a.indexOf(".")) K("empty/relative directory");
                    else if (0 < a.indexOf("=")) {
                        b.unshift(a);
                        break
                    }
                    c.push(a)
                }
                a = {};
                for (var d = 0, e = b.length; d < e; ++d) {
                    var f =
                        b[d].split("="),
                        l = decodeURIComponent(f[0]),
                        h = decodeURIComponent(f[1]);
                    2 == f.length && l && h && (a[l] = a[l] || h)
                }
                b = "/" + c.join("/");
                ha.test(b) || K("invalid_prefix");
                c = M(a, "k", !0);
                d = M(a, "am");
                e = M(a, "rs");
                a = M(a, "t");
                return {
                    g: b,
                    version: c,
                    a: d,
                    c: e,
                    f: a
                }
            },
            L = function (a) {
                for (var b = [], c = 0, d = a.length; c < d; ++c) {
                    var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
                    ka.test(e) && b.push(e)
                }
                return b.join(",")
            },
            M = function (a, b, c) {
                a = a[b];
                !a && c && K("missing: " + b);
                if (a) {
                    if (ia.test(a)) return a;
                    K("invalid: " + b)
                }
                return null
            },
            na = /^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
            ma = /\/cb=/g,
            la = /\/\//g,
            ra = /^\/[a-z_]+\//,
            sa = function () {
                var a = x();
                if (!a) throw Error("Bad hint");
                return a
            };
        I.m = function (a, b, c, d) {
            (a = a[0]) || K("missing_hint");
            return "https://apis.google.com" + qa(a, b, c, d)
        };
        var N = decodeURI("%73cript"),
            O = function (a, b) {
                for (var c = [], d = 0; d < a.length; ++d) {
                    var e = a[d];
                    e && 0 > da.call(b, e) && c.push(e)
                }
                return c
            },
            ta = function (a) {
                "loading" != k.readyState ? P(a) : k.write("<" + N + ' src="' + encodeURI(a) + '"></' + N + ">")
            },
            P = function (a) {
                Q(a)
            },
            Q = function (a) {
                var b = k.createElement(N);
                b.setAttribute("src", a);
                b.async = "true";
                (a = k.getElementsByTagName(N)[0]) ? a.parentNode.insertBefore(b, a): (k.head || k.body || k.documentElement).appendChild(b)
            },
            ua = function (a, b) {
                var c = b && b._c;
                if (c)
                    for (var d = 0; d < J.length; d++) {
                        var e =
                            J[d][0],
                            f = J[d][1];
                        f && Object.prototype.hasOwnProperty.call(c, e) && f(c[e], a, b)
                    }
            },
            va = function (a, b, c) {
                R(function () {
                    var c;
                    c = b === x() ? m(q, "_", n()) : n();
                    c = m(B(b), "_", c);
                    a(c)
                }, c)
            },
            T = function (a, b) {
                var c = b || {};
                "function" == typeof b && (c = {}, c.callback = b);
                ua(a, c);
                var d = a ? a.split(":") : [],
                    e = c.h || sa(),
                    f = m(r, "ah", n());
                if (f["::"] && d.length) {
                    for (var l = [], h = null; h = d.shift();) {
                        var p = h.split("."),
                            p = f[h] || f[p[1] && "ns:" + p[0] || ""] || e,
                            y = l.length && l[l.length - 1] || null,
                            z = y;
                        y && y.hint == p || (z = {
                            hint: p,
                            b: []
                        }, l.push(z));
                        z.b.push(h)
                    }
                    var A =
                        l.length;
                    if (1 < A) {
                        var w = c.callback;
                        w && (c.callback = function () {
                            0 == --A && w()
                        })
                    }
                    for (; d = l.shift();) S(d.b, c, d.hint)
                } else S(d || [], c, e)
            },
            S = function (a, b, c) {
                a = ea(a) || [];
                var d = b.callback,
                    e = b.config,
                    f = b.timeout,
                    l = b.ontimeout,
                    h = b.onerror,
                    p = void 0;
                "function" == typeof h && (p = h);
                var y = null,
                    z = !1;
                if (f && !l || !f && l) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
                var h = m(B(c), "r", []).sort(),
                    A = m(B(c), "L", []).sort(),
                    w = [].concat(h),
                    U = function (a, b) {
                        if (z) return 0;
                        g.clearTimeout(y);
                        A.push.apply(A,
                            t);
                        var d = ((q || {}).config || {}).update;
                        d ? d(e) : e && m(r, "cu", []).push(e);
                        if (b) {
                            H("me0", a, w);
                            try {
                                va(b, c, p)
                            } finally {
                                H("me1", a, w)
                            }
                        }
                        return 1
                    };
                0 < f && (y = g.setTimeout(function () {
                    z = !0;
                    l()
                }, f));
                var t = O(a, A);
                if (t.length) {
                    var t = O(a, h),
                        u = m(r, "CP", []),
                        v = u.length;
                    u[v] = function (a) {
                        if (!a) return 0;
                        H("ml1", t, w);
                        var b = function (b) {
                                u[v] = null;
                                U(t, a) && fa(function () {
                                    d && d();
                                    b()
                                })
                            },
                            c = function () {
                                var a = u[v + 1];
                                a && a()
                            };
                        0 < v && u[v - 1] ? u[v] = function () {
                            b(c)
                        } : b(c)
                    };
                    if (t.length) {
                        var G = "loaded_" + r.I++;
                        q[G] = function (a) {
                            u[v](a);
                            q[G] = null
                        };
                        a = oa(c,
                            t, "gapi." + G, h);
                        h.push.apply(h, t);
                        H("ml0", t, w);
                        b.sync || g.___gapisync ? ta(a) : P(a, b, G)
                    } else u[v](ba)
                } else U(t) && d && d()
            };
        var R = function (a, b) {
            if (r.hee && 0 < r.hel) try {
                return a()
            } catch (c) {
                b && b(c), r.hel--, T("debug_error", function () {
                    try {
                        window.___jsl.hefn(c)
                    } catch (a) {
                        throw c;
                    }
                })
            } else try {
                return a()
            } catch (c) {
                throw b && b(c), c;
            }
        };
        q.load = function (a, b) {
            return R(function () {
                return T(a, b)
            })
        };
        var wa = /^(\/\* JS \*\/ ){0,1}gapi.loaded_\d+\(/,
            V = function (a, b, c, d) {
                (d = d.before_eval_cb) && d();
                g.execScript ? g.execScript(b, "JavaScript") : c ? a.eval(b) : (a = a.document, c = a.createElement("script"), c.defer = !1, c.appendChild(a.createTextNode(b)), a.body.appendChild(c), a.body.removeChild(c))
            },
            xa = function (a, b, c, d) {
                var e = g.XMLHttpRequest;
                a = a.replace(/^https?:\/\/[^\/]+\//, "/");
                if (!ra.test(a)) throw "Bad URL " + a;
                var f = new e;
                f.open("GET", a, !0);
                f.onreadystatechange = function () {
                    if (4 === f.readyState)
                        if (200 === f.status) {
                            var e =
                                f.responseText,
                                h = b.src_cb;
                            h && h();
                            var p = !1;
                            window.GAPI_EVAL && (e += "\n//@ sourceURL=" + encodeURI(a), p = !0);
                            h = function () {
                                if (wa.test(e)) V(g, e, p, b);
                                else q[c](function () {
                                    V(this, e, p, b)
                                })
                            };
                            d ? d(h) : h()
                        } else throw "Error requesting " + a + ": " + f.statusText + "\nCurrent location: " + location.href;
                };
                f.send(null)
            };
        var W = "mousemove mouseover mousedown click touchstart keydown focus resize".split(" "),
            X = ["onmouseover", "onmousedown", "onkeydown", "onfocusin"],
            Y = function () {
                if (m(r, "LI", !1)) return !0;
                r.LI = !0;
                return !1
            },
            Z = 0,
            ya = function () {
                r.LE = !0;
                for (var a = r.LQ, b = 0; a && b < a.length; b++)(0, a[b])();
                r.LQ = null
            },
            za = function () {
                function a(a) {
                    for (var d = 0; d < W.length; d++) g[a + "EventListener"](W[d], b, !0)
                }
                if (!Y()) {
                    var b = function (b) {
                        "resize" == b.type && 2 > ++Z || (a("remove"), ya())
                    };
                    a("add")
                }
            },
            Aa = function () {
                function a(a) {
                    for (var d = 0; d < X.length; d++) k[a +
                        "Event"](X[d], b)
                }
                if (!Y()) {
                    var b = function (b) {
                        if (!("resize" == b.type && 2 > ++Z)) {
                            a("detach");
                            var d = k.createEventObject(b);
                            ya();
                            d.srcElement.fireEvent("on" + d.type, d);
                            b.cancelBubble = !0;
                            b.stopPropagation && b.stopPropagation()
                        }
                    };
                    a("attach")
                }
            },
            P = function (a, b, c) {
                var d = !0;
                g.XMLHttpRequest && !/\/widget\//.test(a) && g.JSON ? g.addEventListener ? za() : k.attachEvent && k.createEventObject ? Aa() : d = !1 : d = !1;
                d ? xa(a, b, c, function (a) {
                    r.LE ? a() : m(r, "LQ", []).push(a)
                }) : Q(a)
            };
        D.bs0 = window.gapi._bs || (new Date).getTime();
        E("bs0");
        D.bs1 = (new Date).getTime();
        E("bs1");
        delete window.gapi._bs;
    })();
    gapi.load("", {
        callback: window["gapi_onload"],
        _c: {
            "jsl": {
                "ci": {
                    "deviceType": "desktop",
                    "oauth-flow": {
                        "authUrl": "https://accounts.google.com/o/oauth2/auth",
                        "proxyUrl": "https://accounts.google.com/o/oauth2/postmessageRelay",
                        "disableOpt": true,
                        "idpIframeUrl": "https://accounts.google.com/o/oauth2/iframe",
                        "usegapi": false
                    },
                    "debug": {
                        "reportExceptionRate": 0.05,
                        "forceIm": false,
                        "rethrowException": false,
                        "host": "https://apis.google.com"
                    },
                    "lexps": [81, 97, 99, 122, 123, 30, 79, 127],
                    "enableMultilogin": true,
                    "googleapis.config": {
                        "auth": {
                            "useFirstPartyAuthV2": true
                        }
                    },
                    "isPlusUser": true,
                    "inline": {
                        "css": 1
                    },
                    "disableRealtimeCallback": false,
                    "drive_share": {
                        "skipInitCommand": true
                    },
                    "csi": {
                        "rate": 0.01
                    },
                    "report": {
                        "apiRate": {
                            "gapi\\.signin\\..*": 0.05,
                            "gapi\\.signin2\\..*": 0.05
                        },
                        "apis": ["iframes\\..*", "gadgets\\..*", "gapi\\.appcirclepicker\\..*", "gapi\\.auth\\..*", "gapi\\.client\\..*"],
                        "rate": 0.001,
                        "host": "https://apis.google.com"
                    },
                    "client": {
                        "headers": {
                            "request": ["Accept", "Accept-Language", "Authorization", "Cache-Control", "Content-Disposition", "Content-Encoding", "Content-Language", "Content-Length", "Content-MD5", "Content-Range", "Content-Type", "Date", "GData-Version", "Host", "If-Match", "If-Modified-Since", "If-None-Match", "If-Unmodified-Since", "Origin", "OriginToken", "Pragma", "Range", "Slug", "Transfer-Encoding", "Want-Digest", "X-ClientDetails", "X-GData-Client", "X-GData-Key", "X-Goog-AuthUser", "X-Goog-PageId", "X-Goog-Encode-Response-If-Executable", "X-Goog-Correlation-Id", "X-Goog-Request-Info", "X-Goog-Experiments", "x-goog-iam-authority-selector", "x-goog-iam-authorization-token", "X-Goog-Spatula", "X-Goog-Upload-Command", "X-Goog-Upload-Content-Disposition", "X-Goog-Upload-Content-Length", "X-Goog-Upload-Content-Type", "X-Goog-Upload-File-Name", "X-Goog-Upload-Offset", "X-Goog-Upload-Protocol", "X-Goog-Visitor-Id", "X-HTTP-Method-Override", "X-JavaScript-User-Agent", "X-Pan-Versionid", "X-Origin", "X-Referer", "X-Upload-Content-Length", "X-Upload-Content-Type", "X-Use-HTTP-Status-Code-Override", "X-Ios-Bundle-Identifier", "X-Android-Package", "X-YouTube-VVT", "X-YouTube-Page-CL", "X-YouTube-Page-Timestamp"],
                            "response": ["Digest", "Cache-Control", "Content-Disposition", "Content-Encoding", "Content-Language", "Content-Length", "Content-MD5", "Content-Range", "Content-Type", "Date", "ETag", "Expires", "Last-Modified", "Location", "Pragma", "Range", "Server", "Transfer-Encoding", "WWW-Authenticate", "Vary", "Unzipped-Content-MD5", "X-Goog-Generation", "X-Goog-Metageneration", "X-Goog-Safety-Content-Type", "X-Goog-Safety-Encoding", "X-Google-Trace", "X-Goog-Upload-Chunk-Granularity", "X-Goog-Upload-Control-URL", "X-Goog-Upload-Size-Received", "X-Goog-Upload-Status", "X-Goog-Upload-URL", "X-Goog-Diff-Download-Range", "X-Goog-Hash", "X-Goog-Updated-Authorization", "X-Server-Object-Version", "X-Guploader-Customer", "X-Guploader-Upload-Result", "X-Guploader-Uploadid", "X-Google-Gfe-Backend-Request-Cost"]
                        },
                        "rms": "migrated",
                        "cors": false
                    },
                    "isLoggedIn": true,
                    "signInDeprecation": {
                        "rate": 0.0
                    },
                    "include_granted_scopes": true,
                    "llang": "en",
                    "plus_layer": {
                        "isEnabled": false
                    },
                    "iframes": {
                        "youtube": {
                            "params": {
                                "location": ["search", "hash"]
                            },
                            "url": ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1",
                            "methods": ["scroll", "openwindow"]
                        },
                        "ytsubscribe": {
                            "url": "https://www.youtube.com/subscribe_embed?usegapi\u003d1"
                        },
                        "plus_circle": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"
                        },
                        "plus_share": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"
                        },
                        "rbr_s": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
                        },
                        "udc_webconsentflow": {
                            "params": {
                                "url": ""
                            },
                            "url": "https://www.google.com/settings/webconsent?usegapi\u003d1"
                        },
                        ":source:": "3p",
                        "blogger": {
                            "params": {
                                "location": ["search", "hash"]
                            },
                            "url": ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1",
                            "methods": ["scroll", "openwindow"]
                        },
                        "evwidget": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"
                        },
                        "partnersbadge": {
                            "url": "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"
                        },
                        ":socialhost:": "https://apis.google.com",
                        "shortlists": {
                            "url": ""
                        },
                        "hangout": {
                            "url": "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
                        },
                        "plus_followers": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"
                        },
                        "post": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"
                        },
                        ":gplus_url:": "https://plus.google.com",
                        "signin": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1",
                            "methods": ["onauth"]
                        },
                        "rbr_i": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
                        },
                        "share": {
                            "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"
                        },
                        "plusone": {
                            "params": {
                                "count": "",
                                "size": "",
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"
                        },
                        "comments": {
                            "params": {
                                "location": ["search", "hash"]
                            },
                            "url": ":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1",
                            "methods": ["scroll", "openwindow"]
                        },
                        ":im_socialhost:": "https://plus.googleapis.com",
                        "backdrop": {
                            "url": "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"
                        },
                        "visibility": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"
                        },
                        "autocomplete": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix:_/widget/render/autocomplete"
                        },
                        "additnow": {
                            "url": "https://apis.google.com/additnow/additnow.html?usegapi\u003d1",
                            "methods": ["launchurl"]
                        },
                        ":signuphost:": "https://plus.google.com",
                        "appcirclepicker": {
                            "url": ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
                        },
                        "follow": {
                            "url": ":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"
                        },
                        "community": {
                            "url": ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"
                        },
                        "sharetoclassroom": {
                            "url": "https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1"
                        },
                        "ytshare": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"
                        },
                        "plus": {
                            "url": ":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"
                        },
                        "family_creation": {
                            "params": {
                                "url": ""
                            },
                            "url": "https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"
                        },
                        "reportabuse": {
                            "params": {
                                "url": ""
                            },
                            "url": ":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi\u003d1"
                        },
                        "commentcount": {
                            "url": ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"
                        },
                        "configurator": {
                            "url": ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"
                        },
                        "zoomableimage": {
                            "url": "https://ssl.gstatic.com/microscope/embed/"
                        },
                        "savetowallet": {
                            "url": "https://clients5.google.com/s2w/o/savetowallet"
                        },
                        "person": {
                            "url": ":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"
                        },
                        "savetodrive": {
                            "url": "https://drive.google.com/savetodrivebutton?usegapi\u003d1",
                            "methods": ["save"]
                        },
                        "page": {
                            "url": ":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"
                        },
                        "card": {
                            "url": ":socialhost:/:session_prefix:_/hovercard/card"
                        }
                    }
                },
                "h": "m;/_/scs/apps-static/_/js/k\u003doz.gapi.en.S22nusZlDo0.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/rs\u003dAGLTcCPPYJO0HPLX4Qs96anU8U6e-L6Ciw",
                "u": "https://apis.google.com/u/0/se/0/_/+1/fastbutton?usegapi\u003d1\u0026size\u003dmedium\u0026origin\u003dhttp://d3tetris.herokuapp.com\u0026url\u003dhttp://d3tetris.herokuapp.com/\u0026gsrc\u003d3p\u0026ic\u003d1\u0026jsh\u003dm;/_/scs/apps-static/_/js/k%3Doz.gapi.en.ACDqVWAJQUs.O/m%3D__features__/am%3DAQ/rt%3Dj/d%3D1/rs%3DAGLTcCOL8sAJ3LQmm7TzjZddn6uxKp0HUA",
                "hee": true,
                "fp": "f478525f724cdb320988531393998458c8cc013d",
                "dpo": false
            },
            "fp": "f478525f724cdb320988531393998458c8cc013d",
            "annotation": ["interactivepost", "recobar", "signin2", "autocomplete", "profile"],
            "bimodal": ["signin", "share"]
        }
    });
    var s = 'GAPI_INTERACTIVE';
    window[s] = 'loading';
    var c = 0;

    function cb() {
        if (++c == 2) {
            window[s] = 'interactive';
            gapi.inline.ping('widget-interactive-' + window.name);
        }
    }
    gapi.load('googleapis.client,iframes-styles-bubble-internal,gapi.iframes.style.common,gapi.iframes.iframer', {
        'callback': function () {
            cb();
            var sw = window['__sw'];
            if (sw) {
                sw();
            }
            var sz = __sp();
            if (sz) {
                iframes.ready(sz, {
                    'canAutoClose': function () {
                        var f = window['__CAN_AUTOCLOSE_BUBBLE'];
                        return f ? f() : true;
                    },
                    'showSharebox': function () {
                        var f = window['__SHOW_SHAREBOX'];
                        return f ? f() : false;
                    }
                });
            }
        },
        'src_cb': cb,
        'before_eval_cb': function () {
            gapi.inline.tick('wje0', new Date().getTime());
        }
    });
    gapi.load('p1b,p1p', {
        'h': 'm;\/_\/scs\/apps-static\/_\/js\/k\x3doz.plusone.en.IRbgCF1y-8s.O\/m\x3dp1b,p1p\/rt\x3dj\/d\x3d1\/rs\x3dAGLTcCP6TIoExFP-ui2S7qXenDE6suWtaQ',
        'callback': function () {
            cb();
            gapi.inline.tick('wje1', new Date().getTime());
        },
        'src_cb': cb
    });
})();
gapi_sendRenderStart();