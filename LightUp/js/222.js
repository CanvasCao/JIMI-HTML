/**
 * Created by Administrator on 2016/5/12.
 */
(function() {
    var a, b, c, d, e, f, g, h, i, j, k, l;
    k = function(a, b) {
        var c;
        return a = a || window.location.search,
            b = b || window.location.hash,
            c = function(a, b) {
                var c;
                return a ? (c = {},
                    a.replace(b,
                        function(a, b, d, e) {
                            c[b] = e
                        }), c) : void 0
            },
        {
            search: c(a, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
            hash: c(b, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
        }
    },
        g = function(a) {
            var b, c, d;
            return d = new Date(a),
                a = +d,
                c = +new Date,
                b = d.getMonth() + 1,
                36e5 > c - a ? Math.floor((c - a) / 6e4) + "分钟前": 864e5 > c - a ? Math.floor((c - a) / 36e5) + "小时前": 31104e6 > c - a ? b + "月" + d.getDate() + "日": d.getFullYear() + "-" + b + "-" + d.getDate()
        },
        h = function(a) {
            return a.slice(0, 10)
        },
        a = function(a) {
            var b, c, d, e, f;
            if (!a.url) throw new Error("Need for url");
            if (c = a.dataType || "text", e = a.method || "GET", b = "", a.data) {
                for (d in a.data) b += "" + d + "=" + a.data[d] + "&";
                b = b.slice(0, b.length - 1)
            }
            f = new XMLHttpRequest,
                f.open(e, a.url, !0),
            "POST" === e.toUpperCase() && f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                f.onload = function() {
                    var b;
                    f.status >= 200 && f.status < 400 ? ("json" === c && (b = JSON.parse(f.responseText)), "function" == typeof a.success && a.success(b)) : "function" == typeof a.error && a.error()
                },
                f.send(b)
        },
        j = function(a, b, c) {
            var d;
            d = document.createElement("script"),
                d.src = a,
            c && (d.charset = c),
                d.onload = function() {
                    this.onload = this.onerror = null,
                        this.parentNode.removeChild(this),
                    b && b(!0)
                },
                d.onerror = function() {
                    this.onload = this.onerror = null,
                        this.parentNode.removeChild(this),
                    b && b(!1)
                },
                document.head.appendChild(d)
        },
        window.cancelRequestAnimFrame = function() {
            return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || clearTimeout
        } (),
        window.requestAnimFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                function(a, b) {
                    return window.setTimeout(a, 1e3 / 60)
                }
        } (),
        e = k().search.docid,
        b = k().search.boardid || null,
        c = "",
        f = function(a) {
            c ? a(c) : (j("http://comment.api.163.com/api/json/post/list/props/note/normal/" + b + "/" + e + "/0/500/2/0/1?jsoncallback=commentsCallback"), window.commentsCallback = function(b) {
                window.commentsCallback = null,
                    c = b,
                    a(b)
            })
        },
        i = function(a, b, c) {
            f(function(d) {
                var e, f;
                if (0 !== (null != d && null != (f = d.newPropsPosts) ? f.length: void 0)) return e = "",
                (null != d ? d.newPropsPosts: void 0) && d.newPropsPosts.forEach(function(c) {
                    var d;
                    if (d = c[1] || c[2] || c[3], d && a && "note" === d.ext.type && d.ext.value === a) {
                        if (b && d.pi !== b) return;
                        e += '<li class="clearfix">\n  <span class="avatar" style="background-image: url(' + d.timg + ');"></span>\n  <span class="light-btn" data-id="' + d.pi + '">' + d.v + '</span>\n  <div class="content">\n    <div class="name ellipsis">' + (d.n || d.nick || d.f) + '</div>\n    <div class="time">' + h(d.t) + '</div>\n    <div class="text">' + d.b + "</div>\n  </div>\n</li>"
                    }
                }),
                e.trim() || (e = '<li style="text-align: center; padding-bottom: .32rem">暂时没有评论</li>'),
                    c(e)
            })
        },
        l = function(a, b, c, d) {
            var e, f, g, h, i, j, k, l, m;
            if ("" !== a.textContent.trim() || a.classList.contains("native-img")) return f = a.querySelector(".count"),
                f ? (g = +f.dataset.light, e = +f.dataset.comments, (b || 0 === b) && (g += b), (c || 0 === c) && (e += c), m = "" + g + "点亮", e && (m += " / " + e + "评论"), f.dataset.light = g, f.dataset.comments = e, "0点亮" === m.replace(/\s/g, "") ? f.style.display = "none": "t" === a.className || "t js-native native-img" === a.className ? f.style.display = "none": d || (f.style.display = "block"), f.textContent = m) : (i = document.createElement("span"), h = +document.documentElement.dataset.width, j = a.offsetLeft, k = a.offsetWidth, j + 100 > h && (i.style.left = "" + ((h + k) / 2 - j - 100) + "px"), i.className = "count", i.dataset.light = b || 0, i.dataset.comments = c || 0, l = "" + (b || 0) + "点亮", c > 0 && (l += " / " + (c || 0) + "评论"), i.textContent = l, d && (i.style.display = "none"), a.appendChild(i)),
                i
        },
        function() {
            var c, d, h, j, m, n;
            return n = k().search,
                d = document.documentElement.style.fontSize.slice(0, -2),
                c = function(b) {
                    a({
                        dataType: "json",
                        url: "http://l.m.163.com/light/article/share/" + e + "/getData.html",
                        success: function(a) {
                            return b(a)
                        }
                    })
                },
                m = function() {
                    var a, b, d;
                    console.log(n),
                        console.log("text"),
                        document.body.classList.add("share-text"),
                        d = function() {
                            a && b && (document.querySelector(".m-content").innerHTML = "" + a + "<ul class='m-comments'>" + b + "</ul>", document.querySelector(".m-content").offsetWidth, document.body.classList.add("visible"))
                        },
                        a = "",
                        c(function(b) {
                            var c, e, f, g, h;
                            c = b.body.replace(/<!--.*?-->/g,
                                function(a) {
                                    return "<p>" + a + "</p>"
                                }),
                                e = n.position.split(","),
                                f = c.match(/<p[^>]*>.*?<\/p>/gi),
                                f = f[e[0]] || f[0],
                                f.replace(/[<p>|<\/p>]/g, "").trim(),
                                h = f.match(/(.*?)[？。！]/g) || [f],
                                g = h[e[1]] || h[0],
                                document.title = b.title,
                                function() {
                                    var a;
                                    return a = document.createElement("div"),
                                        a.innerHTML = g,
                                        a.style.display = "none",
                                        document.body.appendChild(a),
                                        document.body.offsetWidth,
                                        window.setShareData(b.title, a.textContent)
                                } (),
                                a = '<div class="text-wrap">\n  <div class="text-title">' + b.title + '</div>\n  <div class="text-content">' + g + "</div>\n</div>",
                                d()
                        }),
                        b = "",
                        i(n.position, n.pi || null,
                            function(a) {
                                b = a,
                                    d()
                            })
                },
                j = function() {
                    var a;
                    document.body.classList.add("share-image"),
                        console.log(n),
                        a = decodeURIComponent(n.imgsrc),
                        i(n.position, n.pi || null,
                            function(b) {
                                window.setShareData("分享图片", "亮点自寻", a),
                                    document.querySelector(".m-content").classList.add("hasbanner"),
                                    document.querySelector(".m-content").innerHTML = '<div class="m-title"><img src="' + a + '"></div>\n<ul class="m-comments">\n  ' + b + "    \n</ul>",
                                    document.body.classList.add("visible")
                            })
                },
                h = function() {
                    var d, h, i;
                    i = function(a) {
                        var b, c;
                        return b = "",
                            a && a.list && 0 !== a.length ? (null != (c = a.list) && c.forEach(function(a, c) {
                                var d;
                                return d = "",
                                3 > c && (d = '<div class="top-index">Top ' + (c + 1) + "</div>"),
                                    b += "<li>\n  " + d + '\n  <a href="back.html?docid=' + a.docid + '">\n    <div class="title">' + a.title + '</div>\n    <div class="share-count">' + a.shareCount + "人分享</div>\n  </a>\n</li>"
                            }), document.querySelector(".m-list ul").innerHTML = b, document.querySelector(".m-list>.title").textContent = a.topicname.slice(5), b) : void(document.querySelector(".m-list").style.display = "none")
                    },
                        h = function(a) {
                            var b, c, d, f, g, h, i, j, k, l, m, n, o;
                            if (!a || !a.list || 0 === a.length) return void document.querySelector(".m-content").classList.add("nobanner");
                            for (b = "", g = "", m = a.list, h = 0, k = m.length; k > h; h++) if (c = m[h], c.docid === e && (document.querySelector(".js-number").textContent = c.shareCount), c.docid === e && (null != (n = c.imageList) ? n.length: void 0) > 0) {
                                for (o = c.imageList, j = 0, l = o.length; l > j; j++) if (i = o[j], i.bodyImgsrc) {
                                    b = i.bodyImgsrc,
                                        g = i.bodyPixel.split("*");
                                    break
                                }
                                break
                            }
                            b ? (document.querySelector(".m-content").classList.add("hasbanner"), f = +document.documentElement.dataset.width, d = Math.floor(f * g[1] / g[0]), b = "http://s.cimg.163.com/i/" + b.replace("http://", "") + "." + f + "x" + d + ".75.auto.jpg", document.querySelector(".m-title").style.cssText = "height: " + d + "px; background-image: url(" + b + ")") : document.querySelector(".m-content").classList.add("nobanner")
                        },
                        d = function() {
                            var a, b, c, d, e;
                            a = [].slice.call(document.querySelectorAll(".m-container .body .native-img")),
                                b = [],
                                a.forEach(function(a) {
                                    b.push(a.offsetTop)
                                }),
                                console.log(b),
                                d = document.documentElement.clientHeight,
                                e = Date.now(),
                                c = function() {
                                    var c, e, f, g, h, i, j;
                                    for (h = document.body.scrollTop, g = {
                                        min: h - 400,
                                        max: h + d + 200
                                    },
                                             c = i = 0, j = b.length; j > i; c = ++i) f = b[c],
                                    f < g.max && f > g.min && (a[c].querySelector("img") || (e = document.createElement("img"), e.style.opacity = 0, e.onerror = function() {
                                        return this.parentNode.removeChild(this)
                                    },
                                        e.onload = function() {
                                            return this.style.opacity = 1
                                        },
                                        e.src = a[c].dataset.src, a[c].appendChild(e)))
                                },
                                c(),
                                document.addEventListener("scroll",
                                    function(a) {
                                        return Date.now() - e <= 200 ? void 0 : (e = Date.now(), c())
                                    },
                                    !1)
                        },
                        c(function(c) {
                            var j, m, o, p, q, r, s, t, u, v, w, x, y, z, A;
                            b = c.boardid,
                                document.title = c.title,
                                document.querySelector(".m-content .title").textContent = c.title,
                                console.log(c),
                                !c.reportlist && (null != (t = c.topicinfo) ? t.tid: void 0) ? a({
                                    dataType: "json",
                                    url: "http://l.m.163.com/light/topicArticle/list/" + c.topicinfo.tid + "/0-20.html",
                                    dataType: "json",
                                    success: function(a) {
                                        console.log(a),
                                            h(a)
                                    }
                                }) : (i(c.reportlist), h(c.reportlist)),
                                document.querySelector(".source-name").innerHTML = "<div>" + c.source || "<i></i></div>",
                                r = "",
                            c.sourceinfo && (r = '<div class="title">\n  <img src="' + ((null != (u = c.sourceinfo) ? u.icon: void 0) || "") + '" />\n  <div>\n    <div>' + ((null != (v = c.sourceinfo) ? v.name: void 0) || "") + '</div>\n    <div class="time">' + g((null != (w = c.sourceinfo) ? w.createtime: void 0) || Date.now()) + "</div>\n  </div>\n</div>", c.sourceinfo.wechatId && (r += "<div class='wechat'><span>微信</span> " + c.sourceinfo.wechatId + "</div>"), c.sourceinfo.weiboId && (r += "<div class='weibo'><span>微博帐号</span> " + c.sourceinfo.weiboId + "</div>"), c.sourceinfo.websiteUrl && (r += "<div class='website'><span>网站链接</span> " + c.sourceinfo.websiteUrl + "</div>")),
                                document.querySelector(".m-source").innerHTML = r,
                                n = k().search,
                                n.avatar || n.name ? (o = decodeURIComponent(n.name), o.length > 7 && (o = o.slice(0, 6) + "..."), s = "" + o + " 觉得这篇文章很赞，分享给你", q = ["微笑地", "温和地", "冷酷地", "平静地", "严肃地", "机智地", "激动地", "淡淡地", "哽咽地", "客观地", "亲切地", "活泼地", "亢奋地", "炸裂地", "轻松地", "高兴地", "高冷地", "神采飞扬地", "坚定不移地", "一本正经地", "若无其事地"], n.text && (s = "「" + decodeURIComponent(n.text) + "」 —— " + o + q[Math.floor(19 * Math.random())] + "评论道"), document.querySelector(".m-user").innerHTML = '<img src="' + decodeURIComponent(n.avatar) + '"/>\n<span>' + s + "</span>") : document.querySelector(".m-user").style.display = "none",
                                c.body = c.body.replace(/<p>(\s*)/g, "<p>"),
                                c.body = c.body.replace(/<p[^>]*>/gi,
                                    function(a) {
                                        return a.slice(0, a.length - 1) + ' class="t-p"><span class="t">'
                                    }),
                                c.body = c.body.replace(/<\/p>/g, "</p></span>"),
                                c.body = c.body.replace(/[。！？]/g,
                                    function(a, b) {
                                        return "" + a + "</span><span class='t'>"
                                    }),
                                c.body = c.body.replace(/[，。、：？！；）》]/g,
                                    function(a, b) {
                                        return "<em>" + a + "</em>"
                                    }),
                                p = document.documentElement.style.fontSize.slice(0, -2),
                                c.body = c.body.replace(/<!--IMG#(\d+)-->/g,
                                    function(a, b) {
                                        var d, e, f, g, h, i;
                                        return d = c.img[ + b],
                                            h = d.pixel.split("*"),
                                            e = "",
                                            f = ["e7e4de", "c4d1d4", "c1c5cb", "c2bec9", "b7c0ca", "d6d3d1", "d1c7bd"],
                                        d.alt && (e = "has-alt"),
                                            i = d.src,
                                            g = Math.round(6.5 * h[1] / h[0] * p),
                                        '<div class="image t-p ' + e + '">\n  <div class="t native-img" data-src="' + i + '" style="height: ' + g + "px; background-color: #" + f[Math.floor(Math.random() * f.length)] + ';">\n  </div>\n  <div class="alt">' + d.alt + "</div>\n</div>"
                                    }),
                                c.body = c.body.replace(/<!--item(\d+)-->/g,
                                    function(a, b) {
                                        var d, e;
                                        return d = c.itemlist[ + b],
                                            e = d.index,
                                        10 > e && (e = "0" + e),
                                        '<div class="list-item">\n  <span class="index">' + e + '</span><span class="slash">/</span>' + d.title + "\n</div>"
                                    }),
                                c.body = c.body.replace(/<!--item(\d+)-->/g,
                                    function(a, b) {
                                        var d;
                                        return d = c.itemlist[ + b],
                                        '<div class="list-item">\n  <div class="index">' + d.index + '</div>\n  <div class="title">' + d.title + "</div>\n</div>"
                                    }),
                            c.link && c.link.forEach(function(a) {
                                c.body = c.body.replace(a.ref, '<div class="link">\n  <a href="' + a.href + '">' + a.title + "</a>\n</div>")
                            }),
                                c.body = c.body.replace(/<!--VIDEO#(\d+)-->/g,
                                    function(a, b) {
                                        var d;
                                        return d = c.video[ + b],
                                            d.url_mp4.match(/.mp3/g) ? "": '<span class="video">\n  <img class="video-play" src="' + d.cover + '" data-url="' + d.url_mp4 + '"/>\n  <video src="' + d.url_mp4 + '" style="display:none; width: 0; height: 0;"></video>\n</span>'
                                    }),
                                c.source_url ? document.querySelector(".js-source-link").href = c.source_url: document.querySelector(".js-source-link").parentElement.style.display = "none",
                                document.querySelector(".body").innerHTML = c.body,
                                document.querySelector(".body").offsetWidth,
                            null != (x = document.querySelector(".t-p.image:last-child")) && x.classList.add("clearfix"),
                                d(),
                                function() {
                                    return f(function(a) {
                                        var b, c, d, e, f, g, h;
                                        if (a && a.newPropsPosts && 0 !== a.newPropsPosts.length) {
                                            b = a.newPropsPosts.map(function(a) {
                                                var b, c;
                                                return b = a[1] || a[2] || a[3],
                                                    "note" === (null != (c = b.ext) ? c.type: void 0) ? b.ext.value: null
                                            }),
                                                h = {},
                                                d = document.querySelectorAll(".t-p"),
                                                b.forEach(function(a) {
                                                    h[a] ? h[a]++:h[a] = 1
                                                }),
                                                console.log(h);
                                            for (e in h) {
                                                if (g = h[e], f = e.split(","), !e) return;
                                                if (c = d[f[0]].querySelectorAll(".t")[f[1]], !c) return;
                                                l(c, 0, g, !0)
                                            }
                                        }
                                    })
                                } (),
                                function() {
                                    var a, b;
                                    return a = window.localStorage.getItem(e),
                                        b = document.querySelectorAll(".t-p"),
                                    c.brightinfo && c.brightinfo.length > 0 && c.brightinfo.forEach(function(a, c) {
                                        var d, e, f;
                                        e = null != (f = b[a.paragraph]) ? f.querySelectorAll(".t")[a.sentence] : void 0,
                                        e && (d = l(e, a.brightnum), c > 2 || 0 === +a.brightnum ? null != d && (d.style.display = "none") : e.classList.add("other"))
                                    }),
                                        a ? a.split("|").forEach(function(a) {
                                            var c, d, e, f, g;
                                            d = a.split(","),
                                                e = null != (f = b[d[0]]) && null != (g = f.querySelectorAll(".t")) ? g[d[1]] : void 0,
                                            e && (e.classList.add("self"), c = e.querySelector(".count"), c ? c.style.display = "block": l(e, 1))
                                        }) : void 0
                                } (),
                            c.topicinfo && (document.querySelector(".m-topic").style.cssText = "background-image: url('" + (null != (y = c.topicinfo) ? y.cover: void 0) + "')", document.querySelector(".m-topic").innerHTML = '<div>\n  <div class="title">' + (null != (z = c.topicinfo) ? z.tname: void 0) + '</div>\n  <a class="link" href="./list.html?tid=' + (null != (A = c.topicinfo) ? A.tid: void 0) + '">点击进入</a>\n</div>'),
                                j = "",
                            c.attitudes.length > 0 && (m = c.attitudes.reduce(function(a, b) {
                                return {
                                    num: +a.num + +b.num
                                }
                            }), m = m.num, c.attitudes.forEach(function(a, b) {
                                var c, d;
                                p = document.documentElement.style.fontSize.slice(0, -2),
                                    d = 0,
                                0 !== m && (d = +a.num / m),
                                    c = 4.84,
                                    j += '<li class="emoji-item" data-id="' + a.id + '" ontouchstart="">\n  <svg width="' + Math.floor(2.3 * p) + '"  height="' + Math.floor(2.3 * p) + '">\n    <circle stroke-width="1" stroke="#ececec" cx="' + Math.floor(1.15 * p) + '" cy="' + Math.floor(1.15 * p) + '" r="' + Math.floor(1.09 * p) + '" fill="none"></circle>\n    <circle data-num="' + a.num + '" stroke-width="1" stroke="#ffb400" cx="' + Math.floor(1.15 * p) + '" cy="' + Math.floor(1.15 * p) + '" r="' + Math.floor(1.09 * p) + '" fill="none" stroke-dasharray="' + d * c * p + ' 3000"></circle>\n  </svg>\n  <div class="wrap">\n    <div class="count">' + a.num + '</div>\n    <div class="name">' + a.name + '</div>\n    <div class="holder"></div>\n    <div class="icon icon-attitude-' + a.id + '"></div>\n  </div>\n</li>'
                            }), document.querySelector(".emoji-list").dataset.length = m, document.querySelector(".emoji-list").innerHTML = j),
                                function() {
                                    var a, b;
                                    return a = c.digest,
                                    a || (b = document.createElement("div"), b.style.display = "none", b.innerHTML = c.body, document.body.appendChild(b), document.body.offsetWidth, a = b.querySelector(".t").textContent),
                                        window.setShareData(c.title, a)
                                } (),
                                document.body.classList.add("visible")
                        })
                },
                "text" === n.type ? m() : "image" === n.type ? j() : h()
        } (),
        d = !1,
        document.addEventListener("touchmove",
            function(a) {
                d === !0 && a.preventDefault()
            },
            !1),
        document.addEventListener("touchstart",
            function(a) {
                d === !0 && a.preventDefault()
            },
            !1),
        function() {
            var b, c, f, g, h, j, m, n, o, p, q, r;
            k().search.type || (c = document.querySelector(".m-container .body"), o = document.documentElement.style.fontSize.slice(0, -2), r = 0, j = null, m = null, f = function(a, b) {
                var c;
                return c = 0,
                    function() {
                        var d, e;
                        e = this,
                            d = arguments,
                        Date.now() - c < b || (c = Date.now(), a.apply(e, d))
                    }
            },
                p = function(a) {
                    a.stopPropagation()
                },
                n = function() {
                    var a, b, c;
                    null != (b = document.querySelector(".t.active")) && b.classList.remove("active"),
                    null != (c = document.querySelector(".t.hover")) && c.classList.remove("hover"),
                    j && (a = j.querySelector(".tip"), null != a && a.classList.remove("in"), setTimeout(function() {
                            var b;
                            return null != a && null != (b = a.parentElement) ? b.removeChild(a) : void 0
                        },
                        300))
                },
                g = function(a) {
                    a.target.classList.contains("t") && (null != m && m.classList.remove("hover"), a.target.querySelector(".tip") || a.target.classList.contains("hover") || !a.target.classList.contains("t") || (m = a.target, a.target.classList.add("hover")))
                },
                b = function(a, b) {
                    var c, d, e, f, g, h, i, k;
                    a.target.classList.contains("t") && 0 === a.target.querySelectorAll(".tip").length && (n(), g = document.createElement("span"), g.className = "tip", i = a.target.offsetLeft, k = a.target.offsetTop, h = a.target.offsetHeight, f = document.body.scrollTop, e = document.documentElement.clientHeight - .89 * o, c = "left: " + -(i - 1.8 * o) + "px;", c += "top: 50%; margin-top: -0.6rem;", g.style.cssText = c, d = "<span class='b light'>点亮</span><span class='b comment'>评论</span>", ("self" === b || a.target.classList.contains("self")) && (d = "<span class='b comment'>评论</span><span class='b unlight'>撤销</span>"), g.innerHTML = d, a.target.appendChild(g), setTimeout(function() {
                            return g.classList.add("in")
                        },
                        100), j = a.target, a.target.classList.remove("hover"), a.target.classList.add("active"))
                },
                h = function(b, c) {
                    var d, f, g;
                    return g = window.localStorage.getItem(e),
                        g ? (g = g.split("|"), g.indexOf(c) < 0 && (g.push(c), window.localStorage.setItem(e, g.join("|")))) : window.localStorage.setItem(e, c),
                        f = JSON.stringify({
                            docid: e,
                            paragraph: +c.split(",")[0],
                            sentence: +c.split(",")[1]
                        }),
                        a({
                            method: "POST",
                            url: "http://l.m.163.com/light/article/bright/addNum.html",
                            dataType: "JSON",
                            data: {
                                data: f
                            },
                            success: function(a) {
                                return console.log(a)
                            },
                            error: function(a) {
                                return console.log(a)
                            }
                        }),
                        b.classList.add("self"),
                        d = b.querySelector(".count"),
                    null != d && (d.style.display = "block"),
                        l(b, 1),
                        document.querySelector(".u-light-plus").classList.add("show"),
                        setTimeout(function() {
                                return document.querySelector(".u-light-plus").classList.remove("show")
                            },
                            2e3)
                },
                q = function(b, c) {
                    var d;
                    return (d = window.localStorage.getItem(e)) ? (d = d.split("|"), d.splice(d.indexOf(c), 1), b.classList.remove("self"), window.localStorage.setItem(e, d.join("|")), a({
                        method: "POST",
                        url: "http://l.m.163.com/light/article/bright/reduceNum.html",
                        dataType: "JSON",
                        data: {
                            data: JSON.stringify({
                                docid: e,
                                paragraph: +c.split(",")[0],
                                sentence: +c.split(",")[1]
                            })
                        },
                        success: function(a) {
                            return console.log(a)
                        },
                        error: function(a) {
                            return console.log(a)
                        }
                    }), l(b, -1)) : void 0
                },
                function() {
                    var a, d, e;
                    e = null,
                        a = null,
                        d = 0,
                        c.addEventListener("touchstart",
                            function(c) {
                                return c.target.classList.contains("b") || c.target.classList.contains("active") || n(),
                                    c.target.classList.contains("t") ? (a = c.target, d = Date.now(), e = setTimeout(function() {
                                            return b(c)
                                        },
                                        500)) : void 0
                            },
                            !1),
                        c.addEventListener("touchmove",
                            function(a) {
                                return clearTimeout(e)
                            },
                            !1),
                        c.addEventListener("touchend",
                            function(b) {
                                return b.target.classList.contains("t") && b.target === a && Date.now() - d < 500 && e ? clearTimeout(e) : void 0
                            },
                            !1)
                } (),
                function() {
                    var a, c, e, h, i, j, k;
                    h = document.querySelector(".m-light"),
                        c = document.querySelector(".m-content .body"),
                        j = {},
                        k = 0,
                        a = null,
                        h.addEventListener("touchmove",
                            function(a) {
                                a.preventDefault(),
                                    j.distX = a.changedTouches[0].pageX,
                                    j.distY = a.changedTouches[0].pageY
                            },
                            !1),
                        h.addEventListener("touchstart",
                            function(a) {
                                a.preventDefault(),
                                    d = !0,
                                    h.classList.add("active"),
                                    j.dirX = a.touches[0].pageX,
                                    j.dirY = a.touches[0].pageY,
                                    k = document.body.scrollTop,
                                    i()
                            },
                            !1),
                        h.addEventListener("touchend",
                            function(c) {
                                var e, f;
                                c.preventDefault(),
                                    d = !1,
                                    h.classList.remove("active"),
                                    window.cancelRequestAnimFrame(a),
                                    f = h.style.cssText,
                                    h.style.cssText += "pointer-events: none;",
                                    e = document.elementFromPoint(c.changedTouches[0].pageX, c.changedTouches[0].pageY - k),
                                    b({
                                        target: e
                                    }),
                                    j = {},
                                    setTimeout(function() {
                                            return h.style.cssText = "-webkit-transition: -webkit-transform .8s ease-in-out;-webkit-transform: translate3d(0,0,0);"
                                        },
                                        100)
                            },
                            !1),
                        h.addEventListener("webkitTransitionEnd",
                            function(a) {
                                return h.style.cssText = ""
                            },
                            !1),
                        e = f(function() {
                                var a, b;
                                if (j.distX) return a = h.style.cssText,
                                    h.style.cssText += "pointer-events: none;",
                                    b = document.elementFromPoint(j.distX, j.distY - k),
                                    g({
                                        target: b
                                    }),
                                    h.style.cssText = a
                            },
                            500),
                        i = function() {
                            h.style.cssText = "-webkit-transform: translate3d(" + (j.distX - j.dirX) + "px," + (j.distY - j.dirY) + "px,0);",
                                e(),
                                a = window.requestAnimFrame(i)
                        }
                } (),
                function() {
                    var a, d, e, f, g;
                    return d = function(a, b) {
                        var c;
                        return c = [].slice.call(a.parentElement.querySelectorAll(b)),
                            c.indexOf(a)
                    },
                        e = function(a) {
                            var b, c;
                            return b = d(a.parentElement, ".t-p"),
                                c = d(a, ".t"),
                            b + "," + c
                        },
                        a = document.querySelector(".light-comment"),
                        f = document.querySelector(".m-mask"),
                        g = function(b) {
                            i(b, null,
                                function(b) {
                                    "" === b && (b = '<li style="text-align: center; padding-bottom: .32rem">暂时没有评论</li>'),
                                        a.innerHTML = b,
                                        a.style.display = "block",
                                        f.style.display = "block",
                                        a.offsetWidth,
                                        f.classList.add("show"),
                                        a.classList.add("show")
                                })
                        },
                        c.addEventListener("click",
                            function(a) {
                                var b, c, d, f;
                                b = a.target.classList,
                                (b.contains("b") || b.contains("count")) && (f = null != j ? j.textContent.slice(0, -6) : void 0, d = a.target.parentElement.classList.contains("t") ? a.target.parentElement: j, c = e(d), n(), b.contains("light") ? h(d, c) : b.contains("share") ? console.log("分享") : b.contains("comment") ? (g(c), console.log("评论")) : b.contains("unlight") ? q(d, c) : b.contains("count") && g(c))
                            },
                            !1),
                        c.addEventListener("click",
                            function(a) {
                                var c;
                                return c = a.target.classList,
                                    !c.contains("t") || c.contains("active") || c.contains("image") ? void 0 : c.contains("self") ? b(a, "self") : c.contains("other") ? b(a, "other") : void 0
                            },
                            !1)
                } ())
        } (),
        document.querySelector(".m-content").addEventListener("click",
            function(a) {
                var b;
                if (a.target.classList.contains("video-play")) return b = a.target.parentNode.querySelector("video"),
                    b.style.display = "block",
                    b.play(),
                    b.webkitRequestFullscreen(),
                    b.onend = b.onpause = function() {
                        return b.style.display = "none"
                    },
                    document.onwebkitfullscreenchange = function() {
                        return b.style.display = "none"
                    }
            },
            !1),
        function() {
            var c;
            return c = function(c) {
                var d;
                c.target.classList.contains("light-btn") && (c.target.classList.contains("active") || (d = c.target.dataset.id, c.target.textContent = +c.target.textContent + 1, c.target.classList.add("active"), a({
                    method: "POST",
                    url: "http://comment.news.163.com/reply/upvote/" + b + "/" + d
                })))
            },
                document.querySelector(".m-content").addEventListener("click", c, !1),
                document.querySelector(".light-comment").addEventListener("click", c, !1)
        } (),
        function() {
            var b, c, d;
            k().search.boardid || (b = document.documentElement.style.fontSize.slice(0, -2), d = document.querySelector(".emoji-list-wrap"), c = function(a, b) {
                return a.classList.contains(b) ? a: a.parentElement ? c(a.parentElement, b) : null
            },
                d.addEventListener("click",
                    function(d) {
                        var f, g, h, i, j;
                        return j = c(d.target, "emoji-item"),
                            j && !j.classList.contains("voted") ? (j.classList.add("voted"), j.classList.add("active"), g = j.querySelector(".count"), i = +g.textContent + 1, g.textContent = i, j.querySelectorAll("circle")[1].setAttribute("data-num", i), h = +j.parentElement.dataset.length + 1, j.parentElement.dataset.length = h, f = [].slice.call(this.querySelectorAll("circle")), f.forEach(function(a, c) {
                                c % 2 !== 0 && (i = +a.getAttribute("data-num"), a.setAttribute("stroke-dasharray", "" + i / h * 4.84 * b + " 30000"))
                            }), a({
                                method: "post",
                                url: "http://l.m.163.com/light/addAttitude.html",
                                dataType: "json",
                                data: {
                                    data: JSON.stringify({
                                        docid: e,
                                        attitudes: +j.dataset.id
                                    })
                                },
                                success: function(a) {
                                    null != a.result == !0 && console.log("true")
                                }
                            })) : void 0
                    },
                    !1))
        } (),
        function() {
            var a, b, c, d, f, g, h, i, j, l, m, n, o, p, q, r;
            r = function(a, b) {
                var c, d;
                c = void 0,
                    d = void 0,
                    d = [];
                for (c in a) a.hasOwnProperty(c) && "undefined" != typeof b[c] ? d.push(b[c] = a[c]) : d.push(void 0);
                return d
            },
                o = function(a, b) {
                    var c, d;
                    d = [];
                    for (c in b) b.hasOwnProperty(c) && null != b[c] && d.push(c.toString() + "=" + encodeURIComponent(b[c].toString() || ""));
                    window.open(p[a] + d.join("&"))
                },
                a = function() {
                    var a, b, c, d, e;
                    b = k().search,
                        c = window.location.origin + location.pathname,
                        e = +b.w,
                        e ? (e++, c += "?w=" + e) : c += "?w=1";
                    for (a in b) d = b[a],
                    "w" !== a && "isappinstalled" !== a && "from" !== a && (c += "&" + a + "=" + d);
                    return c
                },
                i = {
                    lofter: {
                        from: "news",
                        title: "",
                        content: "",
                        sourceUrl: "",
                        charset: "utf8"
                    },
                    wb: {
                        url: "",
                        title: "",
                        pic: ""
                    },
                    renren: {
                        resourceUrl: "",
                        title: "",
                        description: "",
                        pic: ""
                    },
                    qq: {
                        url: "",
                        title: "",
                        summary: "",
                        pics: ""
                    },
                    yx: {
                        type: "webpage",
                        url: "",
                        title: "",
                        text: ""
                    },
                    youdao: {
                        title: "",
                        summary: ""
                    }
                },
                p = {
                    lofter: "http://www.lofter.com/sharetext/?",
                    yx: "http://open.yixin.im/share?",
                    wb: "http://service.weibo.com/share/share.php?",
                    qq: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
                    renren: "http://widget.renren.com/dialog/share?",
                    youdao: "http://note.youdao.com/memory?"
                },
                g = navigator.userAgent.match(/micromessenger/gi),
                f = navigator.userAgent.match(/weibo/gi),
                h = navigator.userAgent.match(/yixin/gi),
                c = navigator.userAgent.match(/qq/gi) && !navigator.userAgent.match(/qqbrowser/gi),
                d = navigator.userAgent.match(/qzone/gi),
                m = "",
                n = "",
                l = "http://img4.cache.netease.com/utf8/3g/lightstatic/images/icon.gif",
                window.setShareData = function(b, c, d) {
                    m = c,
                        n = b,
                    d && (l = d),
                        setTimeout(function() {
                                var b, c;
                                b = a() + "&f=wx",
                                    c = m,
                                g && window.WeixinJSBridge && (window.WeixinJSBridge.on("menu:share:appmessage",
                                    function(a) {
                                        return window.WeixinJSBridge.invoke("sendAppMessage", {
                                                img_url: l,
                                                link: b,
                                                desc: c,
                                                title: n
                                            },
                                            function() {
                                                var a, b;
                                                a = NTES.localParam().search.s || "light",
                                                    b = NTES.localParam().search.w || 1,
                                                "function" == typeof neteaseTracker && neteaseTracker(!1, "http://sps.163.com/func/?func=sharedone&spst=0&docid=" + e + "&spsw=" + b + "&spss=" + a + "&spsf=wx", "", "sps")
                                            })
                                    }), window.WeixinJSBridge.on("menu:share:timeline",
                                    function(a) {
                                        return window.WeixinJSBridge.invoke("shareTimeline", {
                                                img_url: l,
                                                img_width: "200",
                                                img_height: "200",
                                                link: b,
                                                desc: c,
                                                title: n
                                            },
                                            function() {
                                                var a, b;
                                                return a = k().search.s || "light",
                                                    b = k().search.w || 1,
                                                    "function" == typeof neteaseTracker ? neteaseTracker(!1, "http://sps.163.com/func/?func=sharedone&spst=0&docid=" + e + "&spsw=" + b + "&spss=" + a + "&spsf=wx", "", "sps") : void 0
                                            })
                                    }))
                            },
                            1e3)
                },
                q = document.querySelector(".wx-share"),
                j = document.querySelector(".share-list"),
            (g || f || c || d) && (j.querySelector(".item.wx").style.display = "inline-block", j.querySelector(".item.wb1").style.display = "inline-block", j.querySelector(".item.wb2").style.display = "none"),
                b = function() {
                    setTimeout(function() {
                            q.style.display = "none"
                        },
                        3e3)
                },
                j.addEventListener("click",
                    function(h) {
                        var j, p, s, t, u, v;
                        if (h.preventDefault(), s = h.target, p = m, t = n, s.classList.contains("item")) {
                            if (u = s.dataset.type, f && ("wx" === u || "wb" === u)) return q.style.display = "inline-block",
                                void b();
                            if (g && "wx" === u) return q.style.display = "inline-block",
                                void b();
                            if (c || d && "wb" !== u) return q.style.display = "inline-block",
                                void b();
                            s.dataset.type && r({
                                    title: t,
                                    userdesc: p,
                                    description: p,
                                    desc: p,
                                    info: p,
                                    text: p,
                                    content: p,
                                    summary: p,
                                    pic: l,
                                    pics: l
                                },
                                i[u]),
                                v = a(),
                                i.lofter.sourceUrl = v + "&f=lofter",
                                i.wb.url = v + "&f=wb",
                                i.renren.resourceUrl = v + "&f=renren",
                                i.qq.url = v + "&f=qq",
                                i.yx.url = v + "&f=yx",
                                i.youdao.url = v + "&f=youdao",
                                j = k().search.w || 1,
                            "function" == typeof neteaseTracker && neteaseTracker(!1, "http://sps.163.com/func/?func=sharedone&spss=light&spst=0&docid=" + e + "&spsw=" + j + "&spsf=" + u, "", "sps"),
                                o(u, i[u])
                        }
                        return ! 1
                    })
        } (),
        function() {
            var a;
            return a = function(a) {
                var b, c;
                c = a.target,
                    c.classList.remove("show"),
                    b = [].slice.call(document.querySelectorAll(".m-dialog")),
                    b.forEach(function(a) {
                        a.classList.remove("show")
                    }),
                    setTimeout(function() {
                            c.style.display = "none",
                                b.forEach(function(a) {
                                    return a.style.display = "none"
                                })
                        },
                        500)
            },
                document.querySelector(".m-mask").addEventListener("touchstart", a, !1),
                document.querySelector(".m-mask").addEventListener("click", a, !1)
        } (),
        function() {
            var a, b;
            if (!k().search.boardid) return b = document.querySelector(".m-source"),
                a = document.querySelector(".m-mask"),
                document.querySelector(".m-container").addEventListener("click",
                    function(c) {
                        return c.target.classList.contains("source-name") ? (b.style.display = "block", a.style.display = "block", b.offsetWidth, b.classList.add("show"), a.classList.add("show")) : void 0
                    },
                    !1)
        } ()
}).call(this);