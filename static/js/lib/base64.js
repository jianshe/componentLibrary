//base64
(function() {
    var e = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"],
        t = function(e) {
            var t = new Array;
            while (e > 0) {
                var n = e % 2;
                e = Math.floor(e / 2), t.push(n)
            }
            return t.reverse(), t
        },
        n = function(e) {
            var t = 0,
                n = 0;
            for (var r = e.length - 1; r >= 0; --r) {
                var i = e[r];
                i == 1 && (t += Math.pow(2, n)), ++n
            }
            return t
        },
        r = function(e, t) {
            var n = 8 - (e + 1) + (e - 1) * 6,
                r = t.length,
                i = n - r;
            while (--i >= 0) t.unshift(0);
            var s = [],
                o = e;
            while (--o >= 0) s.push(1);
            s.push(0);
            var u = 0,
                a = 8 - (e + 1);
            for (; u < a; ++u) s.push(t[u]);
            for (var f = 0; f < e - 1; ++f) {
                s.push(1), s.push(0);
                var l = 6;
                while (--l >= 0) s.push(t[u++])
            }
            return s
        },
        i = {
            encoder: function(i) {
                var s = [],
                    o = [];
                for (var u = 0, a = i.length; u < a; ++u) {
                    var f = i.charCodeAt(u),
                        l = t(f);
                    if (f < 128) {
                        var c = 8 - l.length;
                        while (--c >= 0) l.unshift(0);
                        o = o.concat(l)
                    } else f >= 128 && f <= 2047 ? o = o.concat(r(2, l)) : f >= 2048 && f <= 65535 ? o = o.concat(r(3, l)) : f >= 65536 && f <= 2097151 ? o = o.concat(r(4, l)) : f >= 2097152 && f <= 67108863 ? o = o.concat(r(5, l)) : f >= 4e6 && f <= 2147483647 && (o = o.concat(r(6, l)))
                }
                var h = 0;
                for (var u = 0, a = o.length; u < a; u += 6) {
                    var p = u + 6 - a;
                    p == 2 ? h = 2 : p == 4 && (h = 4);
                    var d = h;
                    while (--d >= 0) o.push(0);
                    s.push(n(o.slice(u, u + 6)))
                }
                var v = "";
                for (var u = 0, a = s.length; u < a; ++u) v += e[s[u]];
                for (var u = 0, a = h / 2; u < a; ++u) v += "=";
                return v
            },
            decoder: function(r) {
                var i = r.length,
                    s = 0;
                r.charAt(i - 1) == "=" && (r.charAt(i - 2) == "=" ? (s = 4, r = r.substring(0, i - 2)) : (s = 2, r = r.substring(0, i - 1)));
                var o = [];
                for (var u = 0, a = r.length; u < a; ++u) {
                    var f = r.charAt(u);
                    for (var l = 0, c = e.length; l < c; ++l)
                        if (f == e[l]) {
                            var h = t(l),
                                p = h.length;
                            if (6 - p > 0)
                                for (var d = 6 - p; d > 0; --d) h.unshift(0);
                            o = o.concat(h);
                            break
                        }
                }
                s > 0 && (o = o.slice(0, o.length - s));
                var v = [],
                    m = [];
                for (var u = 0, a = o.length; u < a;)
                    if (o[u] == 0) v = v.concat(n(o.slice(u, u + 8))), u += 8;
                    else {
                        var g = 0;
                        while (u < a) {
                            if (o[u] != 1) break;
                            ++g, ++u
                        }
                        m = m.concat(o.slice(u + 1, u + 8 - g)), u += 8 - g;
                        while (g > 1) m = m.concat(o.slice(u + 2, u + 8)), u += 8, --g;
                        v = v.concat(n(m)), m = []
                    }
                return v
            }
        };
    window.BASE64 = i
})();