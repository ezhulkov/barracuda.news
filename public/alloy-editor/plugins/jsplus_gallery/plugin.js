(function () {
    function ad() {
        return "ckeditor";
    }

    function d(ax) {
        return ax.elementMode == 3;
    }

    function v(ax) {
        return ax.name.replace(/\[/, "_").replace(/\]/, "_");
    }

    function f(ax) {
        return ax.container.$;
    }

    function b(ax) {
        return ax.document.$;
    }

    function G(ax) {
        return ax.getSnapshot();
    }

    function J(ay, ax) {
        ay.loadSnapshot(ax);
    }

    function Q(ay) {
        if (ay.getSelection() == null) {
            return null;
        }
        var ax = ay.getSelection().getStartElement();
        if (ax && ax.$) {
            return ax.$;
        }
        return null;
    }

    function N() {
        return CKEDITOR.basePath;
    }

    function ao() {
        return e("jsplus_gallery");
    }

    function e(ax) {
        return CKEDITOR.plugins.getPath(ax);
    }

    function F() {
        return CKEDITOR.version.charAt(0) == "3" ? 3 : 4;
    }

    function B() {
        return "";
    }

    function o(az, ay) {
        if (F() == 3) {
            var ax = (ay.indexOf("jsplus_gallery_") == -1) ? ("jsplus_gallery_" + ay) : ay;
            if (typeof(az.lang[ax]) !== "undefined") {
                return az.lang[ax];
            } else {
                console.log("(v3) editor.lang['jsplus_gallery'] not defined");
            }
        } else {
            if (typeof(az.lang["jsplus_gallery"]) !== "undefined") {
                if (typeof(az.lang["jsplus_gallery"][ay]) !== "undefined") {
                    return az.lang["jsplus_gallery"][ay];
                } else {
                    console.log("editor.lang['jsplus_gallery']['" + ay + "'] not defined");
                }
            } else {
                console.log("editor.lang['jsplus_gallery'] not defined");
            }
        }
        return "";
    }

    function O(ay, ax) {
        return L(ay, "jsplus_gallery_" + ax);
    }

    function L(ay, ax) {
        var az = ay.config[ax];
        return az;
    }

    function n(ax, ay) {
        P("jsplus_gallery_" + ax, ay);
    }

    function P(ax, ay) {
        CKEDITOR.config[ax] = ay;
    }

    function ak(az, ay) {
        var ax = CKEDITOR.dom.element.createFromHtml(ay);
        if (ax.type == CKEDITOR.NODE_TEXT) {
            az.insertText(ay);
        } else {
            az.insertElement(ax);
        }
    }

    function k() {
        return "";
    }

    var K = 0;
    var y = 1;
    var E = 2;

    function i(ax, aA, ay) {
        var az = null;
        if (ay == K) {
            az = CKEDITOR.TRISTATE_DISABLED;
        } else {
            if (ay == y) {
                az = CKEDITOR.TRISTATE_OFF;
            } else {
                if (ay == E) {
                    az = CKEDITOR.TRISTATE_ON;
                }
            }
        }
        if (az != null && ax.ui && ax.ui.get(aA)) {
            ax.ui.get(aA).setState(az);
        }
    }

    function H(ax, ay) {
        ax.on("selectionChange", function (az) {
            ay(az.editor);
        });
    }

    function x(ay, ax, az) {
        if (ax == "beforeGetOutputHTML") {
            ay.on("toDataFormat", function (aA) {
                return az(ay, aA.data.dataValue);
            }, null, null, 4);
            return;
        }
        if (ax == "keyDown") {
            ay.on("key", (function () {
                var aB = ay;
                var aA = az;
                return function (aC) {
                    aA(aB, aC.data.keyCode, aC);
                };
            })());
            return;
        }
        ay.on(ax, (function () {
            var aA = ay;
            return function () {
                az(aA);
            };
        })());
    }

    function D(ax) {
        ax.cancel();
    }

    function p(aA, ax, aD, aB, aC, az, ay) {
        if (ay && ay != null && L(aA, ay) === true) {
            aD += "_bw";
        }
        aA.addCommand(ax, {exec: aC});
        aA.ui.addButton(ax, {
            title: o(aA, aB.replace(/^jsplus_/, "")),
            label: o(aA, aB.replace(/^jsplus_/, "")),
            icon: ao() + "icons/" + aD + ".png",
            command: ax
        });
    }

    function j(ax) {
        return ax.mode == "wysiwyg";
    }

    function Y(ay, ax, az) {
        if (!(ay in CKEDITOR.plugins.registered)) {
            CKEDITOR.plugins.add(ay, {
                icons: ay, lang: ax, init: function (aA) {
                    az(aA);
                }
            });
        }
    }

    function c() {
        JSDialog.Config.skin = null;
        JSDialog.Config.templateDialog = '<div class="jsdialog_plugin_jsplus_gallery jsdialog_dlg cke_dialog cke_ltr">' + '<div class="cke_dialog_body">' + '<div class="jsdialog_title cke_dialog_title">' + '<div class="jsdialog_title_text"></div>' + '<a class="jsdialog_x cke_dialog_close_button" href="javascript:void(0)" style="-webkit-user-select: none;">' + '<span class="cke_label">X</span>' + "</a>" + "</div>" + '<div class="jsdialog_content_wrap cke_dialog_contents">' + '<div class="jsdialog_content"></div>' + "</div>" + '<div class="cke_dialog_footer">' + '<div class="jsdialog_buttons cke_dialog_footer_buttons"></div>' + "</div>" + "</div>" + "</div>";
        JSDialog.Config.templateButton = '<a><span class="cke_dialog_ui_button"></span></a>';
        JSDialog.Config.templateBg = '<div class="jsdialog_plugin_jsplus_gallery jsdialog_bg"></div>';
        JSDialog.Config.classButton = "cke_dialog_ui_button";
        JSDialog.Config.classButtonOk = "cke_dialog_ui_button_ok";
        JSDialog.Config.contentBorders = [3, 1, 15, 1, 51];
        if (typeof CKEDITOR.skinName === "undefined") {
            CKEDITOR.skinName = CKEDITOR.skin.name;
        }
        CKEDITOR.skin.loadPart("dialog");
        s(document, ".jsdialog_plugin_jsplus_gallery.jsdialog_bg { background-color: white; opacity: 0.5; position: fixed; left: 0; top: 0; width: 100%; height: 3000px; z-index: 11111; display: none; }" + ".jsdialog_plugin_jsplus_gallery.jsdialog_dlg { font-family: Arial; padding: 0; position: fixed; z-index: 11112; background-color: white; border-radius: 5px; overflow:hidden; display: none; }" + ".jsdialog_plugin_jsplus_gallery.jsdialog_show { display: block; }" + ".jsdialog_plugin_jsplus_gallery .jsdialog_message_contents { font-size: 16px; padding: 10px 0 10px 7px; display: table; overflow: hidden; }" + ".jsdialog_plugin_jsplus_gallery .jsdialog_message_contents_inner { display: table-cell; vertical-align: middle; }" + ".jsdialog_plugin_jsplus_gallery .jsdialog_message_icon { padding-left: 100px; min-height: 64px; background-position: 10px 10px; background-repeat: no-repeat; box-sizing: content-box; }" + ".jsdialog_plugin_jsplus_gallery .jsdialog_message_icon_info { background-image: url(img/info.png); }" + ".jsdialog_plugin_jsplus_gallery .jsdialog_message_icon_warning { background-image: url(img/warning.png); }" + ".jsdialog_plugin_jsplus_gallery .jsdialog_message_icon_error { background-image: url(img/error.png); }" + ".jsdialog_plugin_jsplus_gallery .jsdialog_message_icon_confirm { background-image: url(img/confirm.png); }" + ".jsdialog_plugin_jsplus_gallery .cke_dialog_contents { margin-top: 0; border-top: none; }" + ".jsdialog_plugin_jsplus_gallery .cke_dialog_footer div { outline: none; }" + ".jsdialog_plugin_jsplus_gallery .cke_dialog_footer_buttons > .cke_dialog_ui_button { margin-right: 5px; }" + ".jsdialog_plugin_jsplus_gallery .cke_dialog_footer_buttons > .cke_dialog_ui_button:last-child { margin-right: 0; }" + ".jsdialog_plugin_jsplus_gallery .cke_dialog_title { cursor: default; }" + ".jsdialog_plugin_jsplus_gallery .cke_dialog_contents { padding: 0; }" + ".jsdialog_plugin_jsplus_gallery .cke_dialog_ui_button { padding: inherit; }" + ".jsdialog_plugin_jsplus_gallery .cke_dialog_ui_button:hover, .jsdialog_plugin_jsplus_gallery .cke_dialog_ui_button:focus { text-decoration: none; }");
    }

    (function () {
        var ax = window.jQuery;
        (function (az, ay) {
            if (typeof module === "object" && typeof module.exports === "object") {
                module.exports = az.document ? ay(az, true) : function (aA) {
                        if (!aA.document) {
                            throw new Error("jQuery requires a window with a document");
                        }
                        return ay(aA);
                    };
            } else {
                ay(az);
            }
        })(typeof window !== "undefined" ? window : this, function (ce, bT) {
            function cc(bt) {
                var bn = bt.length, cn = ca.type(bt);
                if (cn === "function" || ca.isWindow(bt)) {
                    return false;
                }
                if (bt.nodeType === 1 && bn) {
                    return true;
                }
                return cn === "array" || bn === 0 || typeof bn === "number" && bn > 0 && bn - 1 in bt;
            }

            function cx(bt, bn, cn) {
                if (ca.isFunction(bn)) {
                    return ca.grep(bt, function (dk, ct) {
                        return !!bn.call(dk, ct, dk) !== cn;
                    });
                }
                if (bn.nodeType) {
                    return ca.grep(bt, function (ct) {
                        return ct === bn !== cn;
                    });
                }
                if (typeof bn === "string") {
                    if (cT.test(bn)) {
                        return ca.filter(bn, bt, cn);
                    }
                    bn = ca.filter(bn, bt);
                }
                return ca.grep(bt, function (ct) {
                    return ca.inArray(ct, bn) >= 0 !== cn;
                });
            }

            function cY(bt, bn) {
                do {
                    bt = bt[bn];
                } while (bt && bt.nodeType !== 1);
                return bt;
            }

            function cl(bt) {
                var bn = cI[bt] = {};
                ca.each(bt.match(cD) || [], function (cn, ct) {
                    bn[ct] = true;
                });
                return bn;
            }

            function cC() {
                if (cv.addEventListener) {
                    cv.removeEventListener("DOMContentLoaded", cP, false);
                    ce.removeEventListener("load", cP, false);
                } else {
                    cv.detachEvent("onreadystatechange", cP);
                    ce.detachEvent("onload", cP);
                }
            }

            function cP() {
                if (cv.addEventListener || event.type === "load" || cv.readyState === "complete") {
                    cC();
                    ca.ready();
                }
            }

            function bX(ct, bt, dk) {
                if (dk === undefined && ct.nodeType === 1) {
                    var cn = "data-" + bt.replace(cN, "-$1").toLowerCase();
                    dk = ct.getAttribute(cn);
                    if (typeof dk === "string") {
                        try {
                            dk = dk === "true" ? true : dk === "false" ? false : dk === "null" ? null : +dk + "" === dk ? +dk : cR.test(dk) ? ca.parseJSON(dk) : dk;
                        } catch (bn) {
                        }
                        ca.data(ct, bt, dk);
                    } else {
                        dk = undefined;
                    }
                }
                return dk;
            }

            function cz(bt) {
                var bn;
                for (bn in bt) {
                    if (bn === "data" && ca.isEmptyObject(bt[bn])) {
                        continue;
                    }
                    if (bn !== "toJSON") {
                        return false;
                    }
                }
                return true;
            }

            function cu(dl, dp, bn, ct) {
                if (!ca.acceptData(dl)) {
                    return;
                }
                var dq, bt, dn = ca.expando, dm = dl.nodeType, dk = dm ? ca.cache : dl, cn = dm ? dl[dn] : dl[dn] && dn;
                if ((!cn || !dk[cn] || !ct && !dk[cn].data) && bn === undefined && typeof dp === "string") {
                    return;
                }
                if (!cn) {
                    if (dm) {
                        cn = dl[dn] = b1.pop() || ca.guid++;
                    } else {
                        cn = dn;
                    }
                }
                if (!dk[cn]) {
                    dk[cn] = dm ? {} : {toJSON: ca.noop};
                }
                if (typeof dp === "object" || typeof dp === "function") {
                    if (ct) {
                        dk[cn] = ca.extend(dk[cn], dp);
                    } else {
                        dk[cn].data = ca.extend(dk[cn].data, dp);
                    }
                }
                bt = dk[cn];
                if (!ct) {
                    if (!bt.data) {
                        bt.data = {};
                    }
                    bt = bt.data;
                }
                if (bn !== undefined) {
                    bt[ca.camelCase(dp)] = bn;
                }
                if (typeof dp === "string") {
                    dq = bt[dp];
                    if (dq == null) {
                        dq = bt[ca.camelCase(dp)];
                    }
                } else {
                    dq = bt;
                }
                return dq;
            }

            function bM(dl, cn, dn) {
                if (!ca.acceptData(dl)) {
                    return;
                }
                var dk, bt, ct = dl.nodeType, dm = ct ? ca.cache : dl, bn = ct ? dl[ca.expando] : ca.expando;
                if (!dm[bn]) {
                    return;
                }
                if (cn) {
                    dk = dn ? dm[bn] : dm[bn].data;
                    if (dk) {
                        if (!ca.isArray(cn)) {
                            if (cn in dk) {
                                cn = [cn];
                            } else {
                                cn = ca.camelCase(cn);
                                if (cn in dk) {
                                    cn = [cn];
                                } else {
                                    cn = cn.split(" ");
                                }
                            }
                        } else {
                            cn = cn.concat(ca.map(cn, ca.camelCase));
                        }
                        bt = cn.length;
                        while (bt--) {
                            delete dk[cn[bt]];
                        }
                        if (dn ? !cz(dk) : !ca.isEmptyObject(dk)) {
                            return;
                        }
                    }
                }
                if (!dn) {
                    delete dm[bn].data;
                    if (!cz(dm[bn])) {
                        return;
                    }
                }
                if (ct) {
                    ca.cleanData([dl], true);
                } else {
                    if (b5.deleteExpando || dm != dm.window) {
                        delete dm[bn];
                    } else {
                        dm[bn] = null;
                    }
                }
            }

            function bv() {
                return true;
            }

            function a3() {
                return false;
            }

            function cE() {
                try {
                    return cv.activeElement;
                } catch (bn) {
                }
            }

            function bo(bt) {
                var bn = aR.split("|"), cn = bt.createDocumentFragment();
                if (cn.createElement) {
                    while (bn.length) {
                        cn.createElement(bn.pop());
                    }
                }
                return cn;
            }

            function aF(dk, bt) {
                var dl, ct, bn = 0, cn = typeof dk.getElementsByTagName !== cX ? dk.getElementsByTagName(bt || "*") : typeof dk.querySelectorAll !== cX ? dk.querySelectorAll(bt || "*") : undefined;
                if (!cn) {
                    for (cn = [], dl = dk.childNodes || dk; (ct = dl[bn]) != null; bn++) {
                        if (!bt || ca.nodeName(ct, bt)) {
                            cn.push(ct);
                        } else {
                            ca.merge(cn, aF(ct, bt));
                        }
                    }
                }
                return bt === undefined || bt && ca.nodeName(dk, bt) ? ca.merge([dk], cn) : cn;
            }

            function aI(bn) {
                if (cM.test(bn.type)) {
                    bn.defaultChecked = bn.checked;
                }
            }

            function dg(bt, bn) {
                return ca.nodeName(bt, "table") && ca.nodeName(bn.nodeType !== 11 ? bn : bn.firstChild, "tr") ? bt.getElementsByTagName("tbody")[0] || bt.appendChild(bt.ownerDocument.createElement("tbody")) : bt;
            }

            function dh(bn) {
                bn.type = (ca.find.attr(bn, "type") !== null) + "/" + bn.type;
                return bn;
            }

            function c7(bt) {
                var bn = aN.exec(bt.type);
                if (bn) {
                    bt.type = bn[1];
                } else {
                    bt.removeAttribute("type");
                }
                return bt;
            }

            function bb(cn, bn) {
                var ct, bt = 0;
                for (; (ct = cn[bt]) != null; bt++) {
                    ca._data(ct, "globalEval", !bn || ca._data(bn[bt], "globalEval"));
                }
            }

            function aY(dl, cn) {
                if (cn.nodeType !== 1 || !ca.hasData(dl)) {
                    return;
                }
                var dn, dk, bt, ct = ca._data(dl), dm = ca._data(cn, ct), bn = ct.events;
                if (bn) {
                    delete dm.handle;
                    dm.events = {};
                    for (dn in bn) {
                        for (dk = 0, bt = bn[dn].length; dk < bt; dk++) {
                            ca.event.add(cn, dn, bn[dn][dk]);
                        }
                    }
                }
                if (dm.data) {
                    dm.data = ca.extend({}, dm.data);
                }
            }

            function aB(ct, bt) {
                var dk, cn, bn;
                if (bt.nodeType !== 1) {
                    return;
                }
                dk = bt.nodeName.toLowerCase();
                if (!b5.noCloneEvent && bt[ca.expando]) {
                    bn = ca._data(bt);
                    for (cn in bn.events) {
                        ca.removeEvent(bt, cn, bn.handle);
                    }
                    bt.removeAttribute(ca.expando);
                }
                if (dk === "script" && bt.text !== ct.text) {
                    dh(bt).text = ct.text;
                    c7(bt);
                } else {
                    if (dk === "object") {
                        if (bt.parentNode) {
                            bt.outerHTML = ct.outerHTML;
                        }
                        if (b5.html5Clone && ct.innerHTML && !ca.trim(bt.innerHTML)) {
                            bt.innerHTML = ct.innerHTML;
                        }
                    } else {
                        if (dk === "input" && cM.test(ct.type)) {
                            bt.defaultChecked = bt.checked = ct.checked;
                            if (bt.value !== ct.value) {
                                bt.value = ct.value;
                            }
                        } else {
                            if (dk === "option") {
                                bt.defaultSelected = bt.selected = ct.defaultSelected;
                            } else {
                                if (dk === "input" || dk === "textarea") {
                                    bt.defaultValue = ct.defaultValue;
                                }
                            }
                        }
                    }
                }
            }

            function a2(bt, dk) {
                var ct, bn = ca(dk.createElement(bt)).appendTo(dk.body), cn = ce.getDefaultComputedStyle && (ct = ce.getDefaultComputedStyle(bn[0])) ? ct.display : ca.css(bn[0], "display");
                bn.detach();
                return cn;
            }

            function bm(bt) {
                var bn = cv, cn = bi[bt];
                if (!cn) {
                    cn = a2(bt, bn);
                    if (cn === "none" || !cn) {
                        by = (by || ca("<iframe frameborder='0' width='0' height='0'/>")).appendTo(bn.documentElement);
                        bn = (by[0].contentWindow || by[0].contentDocument).document;
                        bn.write();
                        bn.close();
                        cn = a2(bt, bn);
                        by.detach();
                    }
                    bi[bt] = cn;
                }
                return cn;
            }

            function aJ(bt, bn) {
                return {
                    get: function () {
                        var cn = bt();
                        if (cn == null) {
                            return;
                        }
                        if (cn) {
                            delete this.get;
                            return;
                        }
                        return (this.get = bn).apply(this, arguments);
                    }
                };
            }

            function cf(ct, bt) {
                if (bt in ct) {
                    return bt;
                }
                var dk = bt.charAt(0).toUpperCase() + bt.slice(1), cn = bt, bn = bC.length;
                while (bn--) {
                    bt = bC[bn] + dk;
                    if (bt in ct) {
                        return bt;
                    }
                }
                return cn;
            }

            function cy(dl, cn) {
                var dn, dk, bt, ct = [], dm = 0, bn = dl.length;
                for (; dm < bn; dm++) {
                    dk = dl[dm];
                    if (!dk.style) {
                        continue;
                    }
                    ct[dm] = ca._data(dk, "olddisplay");
                    dn = dk.style.display;
                    if (cn) {
                        if (!ct[dm] && dn === "none") {
                            dk.style.display = "";
                        }
                        if (dk.style.display === "" && cs(dk)) {
                            ct[dm] = ca._data(dk, "olddisplay", bm(dk.nodeName));
                        }
                    } else {
                        bt = cs(dk);
                        if (dn && dn !== "none" || !bt) {
                            ca._data(dk, "olddisplay", bt ? dn : ca.css(dk, "display"));
                        }
                    }
                }
                for (dm = 0; dm < bn; dm++) {
                    dk = dl[dm];
                    if (!dk.style) {
                        continue;
                    }
                    if (!cn || dk.style.display === "none" || dk.style.display === "") {
                        dk.style.display = cn ? ct[dm] || "" : "none";
                    }
                }
                return dl;
            }

            function bZ(cn, bn, ct) {
                var bt = aE.exec(bn);
                return bt ? Math.max(0, bt[1] - (ct || 0)) + (bt[2] || "px") : bn;
            }

            function bG(dk, bt, dm, ct, bn) {
                var cn = dm === (ct ? "border" : "content") ? 4 : bt === "width" ? 1 : 0, dl = 0;
                for (; cn < 4; cn += 2) {
                    if (dm === "margin") {
                        dl += ca.css(dk, dm + cq[cn], true, bn);
                    }
                    if (ct) {
                        if (dm === "content") {
                            dl -= ca.css(dk, "padding" + cq[cn], true, bn);
                        }
                        if (dm !== "margin") {
                            dl -= ca.css(dk, "border" + cq[cn] + "Width", true, bn);
                        }
                    } else {
                        dl += ca.css(dk, "padding" + cq[cn], true, bn);
                        if (dm !== "padding") {
                            dl += ca.css(dk, "border" + cq[cn] + "Width", true, bn);
                        }
                    }
                }
                return dl;
            }

            function aM(dk, bt, dm) {
                var ct = true, bn = bt === "width" ? dk.offsetWidth : dk.offsetHeight, cn = aU(dk), dl = b5.boxSizing && ca.css(dk, "boxSizing", false, cn) === "border-box";
                if (bn <= 0 || bn == null) {
                    bn = c3(dk, bt, cn);
                    if (bn < 0 || bn == null) {
                        bn = dk.style[bt];
                    }
                    if (aQ.test(bn)) {
                        return bn;
                    }
                    ct = dl && (b5.boxSizingReliable() || bn === dk.style[bt]);
                    bn = parseFloat(bn) || 0;
                }
                return bn + bG(dk, bt, dm || (dl ? "border" : "content"), ct, cn) + "px";
            }

            function dc(ct, bt, dk, cn, bn) {
                return new dc.prototype.init(ct, bt, dk, cn, bn);
            }

            function cb() {
                setTimeout(function () {
                    bs = undefined;
                });
                return bs = ca.now();
            }

            function aX(ct, bt) {
                var dk, cn = {height: ct}, bn = 0;
                bt = bt ? 1 : 0;
                for (; bn < 4; bn += 2 - bt) {
                    dk = cq[bn];
                    cn["margin" + dk] = cn["padding" + dk] = ct;
                }
                if (bt) {
                    cn.opacity = cn.width = ct;
                }
                return cn;
            }

            function c2(dk, bt, dm) {
                var ct, bn = (bf[bt] || []).concat(bf["*"]), cn = 0, dl = bn.length;
                for (; cn < dl; cn++) {
                    if (ct = bn[cn].call(dm, bt, dk)) {
                        return ct;
                    }
                }
            }

            function bl(dp, dv, ct) {
                var bn, dl, dw, cn, du, ds, dn, dr, bt = this, dq = {}, dt = dp.style, dk = dp.nodeType && cs(dp), dm = ca._data(dp, "fxshow");
                if (!ct.queue) {
                    du = ca._queueHooks(dp, "fx");
                    if (du.unqueued == null) {
                        du.unqueued = 0;
                        ds = du.empty.fire;
                        du.empty.fire = function () {
                            if (!du.unqueued) {
                                ds();
                            }
                        };
                    }
                    du.unqueued++;
                    bt.always(function () {
                        bt.always(function () {
                            du.unqueued--;
                            if (!ca.queue(dp, "fx").length) {
                                du.empty.fire();
                            }
                        });
                    });
                }
                if (dp.nodeType === 1 && ("height" in dv || "width" in dv)) {
                    ct.overflow = [dt.overflow, dt.overflowX, dt.overflowY];
                    dn = ca.css(dp, "display");
                    dr = dn === "none" ? ca._data(dp, "olddisplay") || bm(dp.nodeName) : dn;
                    if (dr === "inline" && ca.css(dp, "float") === "none") {
                        if (!b5.inlineBlockNeedsLayout || bm(dp.nodeName) === "inline") {
                            dt.display = "inline-block";
                        } else {
                            dt.zoom = 1;
                        }
                    }
                }
                if (ct.overflow) {
                    dt.overflow = "hidden";
                    if (!b5.shrinkWrapBlocks()) {
                        bt.always(function () {
                            dt.overflow = ct.overflow[0];
                            dt.overflowX = ct.overflow[1];
                            dt.overflowY = ct.overflow[2];
                        });
                    }
                }
                for (bn in dv) {
                    dl = dv[bn];
                    if (bx.exec(dl)) {
                        delete dv[bn];
                        dw = dw || dl === "toggle";
                        if (dl === (dk ? "hide" : "show")) {
                            if (dl === "show" && dm && dm[bn] !== undefined) {
                                dk = true;
                            } else {
                                continue;
                            }
                        }
                        dq[bn] = dm && dm[bn] || ca.style(dp, bn);
                    } else {
                        dn = undefined;
                    }
                }
                if (!ca.isEmptyObject(dq)) {
                    if (dm) {
                        if ("hidden" in dm) {
                            dk = dm.hidden;
                        }
                    } else {
                        dm = ca._data(dp, "fxshow", {});
                    }
                    if (dw) {
                        dm.hidden = !dk;
                    }
                    if (dk) {
                        ca(dp).show();
                    } else {
                        bt.done(function () {
                            ca(dp).hide();
                        });
                    }
                    bt.done(function () {
                        var dx;
                        ca._removeData(dp, "fxshow");
                        for (dx in dq) {
                            ca.style(dp, dx, dq[dx]);
                        }
                    });
                    for (bn in dq) {
                        cn = c2(dk ? dm[bn] : 0, bn, bt);
                        if (!(bn in dm)) {
                            dm[bn] = cn.start;
                            if (dk) {
                                cn.end = cn.start;
                                cn.start = bn === "width" || bn === "height" ? 1 : 0;
                            }
                        }
                    }
                } else {
                    if ((dn === "none" ? bm(dp.nodeName) : dn) === "inline") {
                        dt.display = dn;
                    }
                }
            }

            function df(dk, bt) {
                var dm, ct, bn, cn, dl;
                for (dm in dk) {
                    ct = ca.camelCase(dm);
                    bn = bt[ct];
                    cn = dk[dm];
                    if (ca.isArray(cn)) {
                        bn = cn[1];
                        cn = dk[dm] = cn[0];
                    }
                    if (dm !== ct) {
                        dk[ct] = cn;
                        delete dk[dm];
                    }
                    dl = ca.cssHooks[ct];
                    if (dl && "expand" in dl) {
                        cn = dl.expand(cn);
                        delete dk[ct];
                        for (dm in cn) {
                            if (!(dm in dk)) {
                                dk[dm] = cn[dm];
                                bt[dm] = bn;
                            }
                        }
                    } else {
                        bt[ct] = bn;
                    }
                }
            }

            function bV(dm, dq, cn) {
                var bn, dk, dr = 0, bt = br.length, dp = ca.Deferred().always(function () {
                    delete dn.elem;
                }), dn = function () {
                    if (dk) {
                        return false;
                    }
                    var dt = bs || cb(), dx = Math.max(0, dl.startTime + dl.duration - dt), dv = dx / dl.duration || 0, du = 1 - dv, dw = 0, ds = dl.tweens.length;
                    for (; dw < ds; dw++) {
                        dl.tweens[dw].run(du);
                    }
                    dp.notifyWith(dm, [dl, du, dx]);
                    if (du < 1 && ds) {
                        return dx;
                    } else {
                        dp.resolveWith(dm, [dl]);
                        return false;
                    }
                }, dl = dp.promise({
                    elem: dm,
                    props: ca.extend({}, dq),
                    opts: ca.extend(true, {specialEasing: {}}, cn),
                    originalProperties: dq,
                    originalOptions: cn,
                    startTime: bs || cb(),
                    duration: cn.duration,
                    tweens: [],
                    createTween: function (ds, du) {
                        var dt = ca.Tween(dm, dl.opts, ds, du, dl.opts.specialEasing[ds] || dl.opts.easing);
                        dl.tweens.push(dt);
                        return dt;
                    },
                    stop: function (ds) {
                        var du = 0, dt = ds ? dl.tweens.length : 0;
                        if (dk) {
                            return this;
                        }
                        dk = true;
                        for (; du < dt; du++) {
                            dl.tweens[du].run(1);
                        }
                        if (ds) {
                            dp.resolveWith(dm, [dl, ds]);
                        } else {
                            dp.rejectWith(dm, [dl, ds]);
                        }
                        return this;
                    }
                }), ct = dl.props;
                df(ct, dl.opts.specialEasing);
                for (; dr < bt; dr++) {
                    bn = br[dr].call(dl, dm, ct, dl.opts);
                    if (bn) {
                        return bn;
                    }
                }
                ca.map(ct, c2, dl);
                if (ca.isFunction(dl.opts.start)) {
                    dl.opts.start.call(dm, dl);
                }
                ca.fx.timer(ca.extend(dn, {elem: dm, anim: dl, queue: dl.opts.queue}));
                return dl.progress(dl.opts.progress).done(dl.opts.done, dl.opts.complete).fail(dl.opts.fail).always(dl.opts.always);
            }

            function aC(bn) {
                return function (cn, dl) {
                    if (typeof cn !== "string") {
                        dl = cn;
                        cn = "*";
                    }
                    var dk, bt = 0, ct = cn.toLowerCase().match(cD) || [];
                    if (ca.isFunction(dl)) {
                        while (dk = ct[bt++]) {
                            if (dk.charAt(0) === "+") {
                                dk = dk.slice(1) || "*";
                                (bn[dk] = bn[dk] || []).unshift(dl);
                            } else {
                                (bn[dk] = bn[dk] || []).push(dl);
                            }
                        }
                    }
                };
            }

            function cL(dk, bt, dm, ct) {
                function dl(dp) {
                    var dn;
                    bn[dp] = true;
                    ca.each(dk[dp] || [], function (ds, dq) {
                        var dr = dq(bt, dm, ct);
                        if (typeof dr === "string" && !cn && !bn[dr]) {
                            bt.dataTypes.unshift(dr);
                            dl(dr);
                            return false;
                        } else {
                            if (cn) {
                                return !(dn = dr);
                            }
                        }
                    });
                    return dn;
                }

                var bn = {}, cn = dk === c5;
                return dl(bt.dataTypes[0]) || !bn["*"] && dl("*");
            }

            function bB(ct, bt) {
                var dk, cn, bn = ca.ajaxSettings.flatOptions || {};
                for (cn in bt) {
                    if (bt[cn] !== undefined) {
                        (bn[cn] ? ct : dk || (dk = {}))[cn] = bt[cn];
                    }
                }
                if (dk) {
                    ca.extend(true, ct, dk);
                }
                return ct;
            }

            function aG(dk, dn, cn) {
                var bn, ct, dp, bt, dm = dk.contents, dl = dk.dataTypes;
                while (dl[0] === "*") {
                    dl.shift();
                    if (ct === undefined) {
                        ct = dk.mimeType || dn.getResponseHeader("Content-Type");
                    }
                }
                if (ct) {
                    for (bt in dm) {
                        if (dm[bt] && dm[bt].test(ct)) {
                            dl.unshift(bt);
                            break;
                        }
                    }
                }
                if (dl[0] in cn) {
                    dp = dl[0];
                } else {
                    for (bt in cn) {
                        if (!dl[0] || dk.converters[bt + " " + dl[0]]) {
                            dp = bt;
                            break;
                        }
                        if (!bn) {
                            bn = bt;
                        }
                    }
                    dp = dp || bn;
                }
                if (dp) {
                    if (dp !== dl[0]) {
                        dl.unshift(dp);
                    }
                    return cn[dp];
                }
            }

            function cZ(dm, dr, cn, bn) {
                var dk, ds, bt, dq, dp, dl = {}, ct = dm.dataTypes.slice();
                if (ct[1]) {
                    for (bt in dm.converters) {
                        dl[bt.toLowerCase()] = dm.converters[bt];
                    }
                }
                ds = ct.shift();
                while (ds) {
                    if (dm.responseFields[ds]) {
                        cn[dm.responseFields[ds]] = dr;
                    }
                    if (!dp && bn && dm.dataFilter) {
                        dr = dm.dataFilter(dr, dm.dataType);
                    }
                    dp = ds;
                    ds = ct.shift();
                    if (ds) {
                        if (ds === "*") {
                            ds = dp;
                        } else {
                            if (dp !== "*" && dp !== ds) {
                                bt = dl[dp + " " + ds] || dl["* " + ds];
                                if (!bt) {
                                    for (dk in dl) {
                                        dq = dk.split(" ");
                                        if (dq[1] === ds) {
                                            bt = dl[dp + " " + dq[0]] || dl["* " + dq[0]];
                                            if (bt) {
                                                if (bt === true) {
                                                    bt = dl[dk];
                                                } else {
                                                    if (dl[dk] !== true) {
                                                        ds = dq[0];
                                                        ct.unshift(dq[1]);
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (bt !== true) {
                                    if (bt && dm["throws"]) {
                                        dr = bt(dr);
                                    } else {
                                        try {
                                            dr = bt(dr);
                                        } catch (dn) {
                                            return {
                                                state: "parsererror",
                                                error: bt ? dn : "No conversion from " + dp + " to " + ds
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return {state: "success", data: dr};
            }

            function b8(ct, bt, dk, cn) {
                var bn;
                if (ca.isArray(bt)) {
                    ca.each(bt, function (dm, dl) {
                        if (dk || bL.test(ct)) {
                            cn(ct, dl);
                        } else {
                            b8(ct + "[" + (typeof dl === "object" ? dm : "") + "]", dl, dk, cn);
                        }
                    });
                } else {
                    if (!dk && ca.type(bt) === "object") {
                        for (bn in bt) {
                            b8(ct + "[" + bn + "]", bt[bn], dk, cn);
                        }
                    } else {
                        cn(ct, bt);
                    }
                }
            }

            function bu() {
                try {
                    return new ce.XMLHttpRequest;
                } catch (bn) {
                }
            }

            function bh() {
                try {
                    return new ce.ActiveXObject("Microsoft.XMLHTTP");
                } catch (bn) {
                }
            }

            function aS(bn) {
                return ca.isWindow(bn) ? bn : bn.nodeType === 9 ? bn.defaultView || bn.parentWindow : false;
            }

            var b1 = [];
            var bW = b1.slice;
            var b9 = b1.concat;
            var bU = b1.push;
            var b0 = b1.indexOf;
            var bS = {};
            var cj = bS.toString;
            var cd = bS.hasOwnProperty;
            var b5 = {};
            var ch = "1.11.1", ca = function (bt, bn) {
                return new ca.fn.init(bt, bn);
            }, bY = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, cg = /^-ms-/, bR = /-([\da-z])/gi, b3 = function (bt, bn) {
                return bn.toUpperCase();
            };
            ca.fn = ca.prototype = {
                jquery: ch, constructor: ca, selector: "", length: 0, toArray: function () {
                    return bW.call(this);
                }, get: function (bn) {
                    return bn != null ? bn < 0 ? this[bn + this.length] : this[bn] : bW.call(this);
                }, pushStack: function (bt) {
                    var bn = ca.merge(this.constructor(), bt);
                    bn.prevObject = this;
                    bn.context = this.context;
                    return bn;
                }, each: function (bt, bn) {
                    return ca.each(this, bt, bn);
                }, map: function (bn) {
                    return this.pushStack(ca.map(this, function (bt, cn) {
                        return bn.call(bt, cn, bt);
                    }));
                }, slice: function () {
                    return this.pushStack(bW.apply(this, arguments));
                }, first: function () {
                    return this.eq(0);
                }, last: function () {
                    return this.eq(-1);
                }, eq: function (bt) {
                    var bn = this.length, cn = +bt + (bt < 0 ? bn : 0);
                    return this.pushStack(cn >= 0 && cn < bn ? [this[cn]] : []);
                }, end: function () {
                    return this.prevObject || this.constructor(null);
                }, push: bU, sort: b1.sort, splice: b1.splice
            };
            ca.extend = ca.fn.extend = function () {
                var dl, dp, cn, bn, ct, dq, bt = arguments[0] || {}, dn = 1, dm = arguments.length, dk = false;
                if (typeof bt === "boolean") {
                    dk = bt;
                    bt = arguments[dn] || {};
                    dn++;
                }
                if (typeof bt !== "object" && !ca.isFunction(bt)) {
                    bt = {};
                }
                if (dn === dm) {
                    bt = this;
                    dn--;
                }
                for (; dn < dm; dn++) {
                    if ((ct = arguments[dn]) != null) {
                        for (bn in ct) {
                            dl = bt[bn];
                            cn = ct[bn];
                            if (bt === cn) {
                                continue;
                            }
                            if (dk && cn && (ca.isPlainObject(cn) || (dp = ca.isArray(cn)))) {
                                if (dp) {
                                    dp = false;
                                    dq = dl && ca.isArray(dl) ? dl : [];
                                } else {
                                    dq = dl && ca.isPlainObject(dl) ? dl : {};
                                }
                                bt[bn] = ca.extend(dk, dq, cn);
                            } else {
                                if (cn !== undefined) {
                                    bt[bn] = cn;
                                }
                            }
                        }
                    }
                }
                return bt;
            };
            ca.extend({
                expando: "jQuery" + (ch + Math.random()).replace(/\D/g, ""),
                isReady: true,
                error: function (bn) {
                    throw new Error(bn);
                },
                noop: function () {
                },
                isFunction: function (bn) {
                    return ca.type(bn) === "function";
                },
                isArray: Array.isArray || function (bn) {
                    return ca.type(bn) === "array";
                },
                isWindow: function (bn) {
                    return bn != null && bn == bn.window;
                },
                isNumeric: function (bn) {
                    return !ca.isArray(bn) && bn - parseFloat(bn) >= 0;
                },
                isEmptyObject: function (bt) {
                    var bn;
                    for (bn in bt) {
                        return false;
                    }
                    return true;
                },
                isPlainObject: function (bt) {
                    var bn;
                    if (!bt || ca.type(bt) !== "object" || bt.nodeType || ca.isWindow(bt)) {
                        return false;
                    }
                    try {
                        if (bt.constructor && !cd.call(bt, "constructor") && !cd.call(bt.constructor.prototype, "isPrototypeOf")) {
                            return false;
                        }
                    } catch (cn) {
                        return false;
                    }
                    if (b5.ownLast) {
                        for (bn in bt) {
                            return cd.call(bt, bn);
                        }
                    }
                    for (bn in bt) {
                    }
                    return bn === undefined || cd.call(bt, bn);
                },
                type: function (bn) {
                    if (bn == null) {
                        return bn + "";
                    }
                    return typeof bn === "object" || typeof bn === "function" ? bS[cj.call(bn)] || "object" : typeof bn;
                },
                globalEval: function (bn) {
                    if (bn && ca.trim(bn)) {
                        (ce.execScript || function (bt) {
                            ce["eval"].call(ce, bt);
                        })(bn);
                    }
                },
                camelCase: function (bn) {
                    return bn.replace(cg, "ms-").replace(bR, b3);
                },
                nodeName: function (bt, bn) {
                    return bt.nodeName && bt.nodeName.toLowerCase() === bn.toLowerCase();
                },
                each: function (dk, bt, dm) {
                    var ct, bn = 0, cn = dk.length, dl = cc(dk);
                    if (dm) {
                        if (dl) {
                            for (; bn < cn; bn++) {
                                ct = bt.apply(dk[bn], dm);
                                if (ct === false) {
                                    break;
                                }
                            }
                        } else {
                            for (bn in dk) {
                                ct = bt.apply(dk[bn], dm);
                                if (ct === false) {
                                    break;
                                }
                            }
                        }
                    } else {
                        if (dl) {
                            for (; bn < cn; bn++) {
                                ct = bt.call(dk[bn], bn, dk[bn]);
                                if (ct === false) {
                                    break;
                                }
                            }
                        } else {
                            for (bn in dk) {
                                ct = bt.call(dk[bn], bn, dk[bn]);
                                if (ct === false) {
                                    break;
                                }
                            }
                        }
                    }
                    return dk;
                },
                trim: function (bn) {
                    return bn == null ? "" : (bn + "").replace(bY, "");
                },
                makeArray: function (bt, bn) {
                    var cn = bn || [];
                    if (bt != null) {
                        if (cc(Object(bt))) {
                            ca.merge(cn, typeof bt === "string" ? [bt] : bt);
                        } else {
                            bU.call(cn, bt);
                        }
                    }
                    return cn;
                },
                inArray: function (cn, bn, ct) {
                    var bt;
                    if (bn) {
                        if (b0) {
                            return b0.call(bn, cn, ct);
                        }
                        bt = bn.length;
                        ct = ct ? ct < 0 ? Math.max(0, bt + ct) : ct : 0;
                        for (; ct < bt; ct++) {
                            if (ct in bn && bn[ct] === cn) {
                                return ct;
                            }
                        }
                    }
                    return -1;
                },
                merge: function (ct, bt) {
                    var dk = +bt.length, cn = 0, bn = ct.length;
                    while (cn < dk) {
                        ct[bn++] = bt[cn++];
                    }
                    if (dk !== dk) {
                        while (bt[cn] !== undefined) {
                            ct[bn++] = bt[cn++];
                        }
                    }
                    ct.length = bn;
                    return ct;
                },
                grep: function (dl, cn, dn) {
                    var dk, bt = [], ct = 0, dm = dl.length, bn = !dn;
                    for (; ct < dm; ct++) {
                        dk = !cn(dl[ct], ct);
                        if (dk !== bn) {
                            bt.push(dl[ct]);
                        }
                    }
                    return bt;
                },
                map: function (dl, cn, dn) {
                    var dk, ct = 0, dm = dl.length, bt = cc(dl), bn = [];
                    if (bt) {
                        for (; ct < dm; ct++) {
                            dk = cn(dl[ct], ct, dn);
                            if (dk != null) {
                                bn.push(dk);
                            }
                        }
                    } else {
                        for (ct in dl) {
                            dk = cn(dl[ct], ct, dn);
                            if (dk != null) {
                                bn.push(dk);
                            }
                        }
                    }
                    return b9.apply([], bn);
                },
                guid: 1,
                proxy: function (ct, bt) {
                    var dk, bn, cn;
                    if (typeof bt === "string") {
                        cn = ct[bt];
                        bt = ct;
                        ct = cn;
                    }
                    if (!ca.isFunction(ct)) {
                        return undefined;
                    }
                    dk = bW.call(arguments, 2);
                    bn = function () {
                        return ct.apply(bt || this, dk.concat(bW.call(arguments)));
                    };
                    bn.guid = ct.guid = ct.guid || ca.guid++;
                    return bn;
                },
                now: function () {
                    return +(new Date);
                },
                support: b5
            });
            ca.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (bt, bn) {
                bS["[object " + bn + "]"] = bn.toLowerCase();
            });
            var bN = function (dO) {
                function er(eE, eK, bt, eB) {
                    var eL, eJ, eD, ct, eG, eF, eC, eH, et, eI;
                    if ((eK ? eK.ownerDocument || eK : ej) !== dD) {
                        dL(eK);
                    }
                    eK = eK || dD;
                    bt = bt || [];
                    if (!eE || typeof eE !== "string") {
                        return bt;
                    }
                    if ((ct = eK.nodeType) !== 1 && ct !== 9) {
                        return [];
                    }
                    if (dw && !eB) {
                        if (eL = dW.exec(eE)) {
                            if (eD = eL[1]) {
                                if (ct === 9) {
                                    eJ = eK.getElementById(eD);
                                    if (eJ && eJ.parentNode) {
                                        if (eJ.id === eD) {
                                            bt.push(eJ);
                                            return bt;
                                        }
                                    } else {
                                        return bt;
                                    }
                                } else {
                                    if (eK.ownerDocument && (eJ = eK.ownerDocument.getElementById(eD)) && dR(eK, eJ) && eJ.id === eD) {
                                        bt.push(eJ);
                                        return bt;
                                    }
                                }
                            } else {
                                if (eL[2]) {
                                    d8.apply(bt, eK.getElementsByTagName(eE));
                                    return bt;
                                } else {
                                    if ((eD = eL[3]) && dF.getElementsByClassName && eK.getElementsByClassName) {
                                        d8.apply(bt, eK.getElementsByClassName(eD));
                                        return bt;
                                    }
                                }
                            }
                        }
                        if (dF.qsa && (!dG || !dG.test(eE))) {
                            eH = eC = du;
                            et = eK;
                            eI = ct === 9 && eE;
                            if (ct === 1 && eK.nodeName.toLowerCase() !== "object") {
                                eF = dE(eE);
                                if (eC = eK.getAttribute("id")) {
                                    eH = eC.replace(d4, "\\$&");
                                } else {
                                    eK.setAttribute("id", eH);
                                }
                                eH = "[id='" + eH + "'] ";
                                eG = eF.length;
                                while (eG--) {
                                    eF[eG] = eH + eq(eF[eG]);
                                }
                                et = eA.test(eE) && cn(eK.parentNode) || eK;
                                eI = eF.join(",");
                            }
                            if (eI) {
                                try {
                                    d8.apply(bt, et.querySelectorAll(eI));
                                    return bt;
                                } catch (dt) {
                                } finally {
                                    if (!eC) {
                                        eK.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                    return dT(eE.replace(dq, "$1"), eK, bt, eB);
                }

                function dv() {
                    function bt(et, dt) {
                        if (ct.push(et + " ") > dA.cacheLength) {
                            delete bt[ct.shift()];
                        }
                        return bt[et + " "] = dt;
                    }

                    var ct = [];
                    return bt;
                }

                function dB(bt) {
                    bt[du] = true;
                    return bt;
                }

                function em(ct) {
                    var bt = dD.createElement("div");
                    try {
                        return !!ct(bt);
                    } catch (dt) {
                        return false;
                    } finally {
                        if (bt.parentNode) {
                            bt.parentNode.removeChild(bt);
                        }
                        bt = null;
                    }
                }

                function ev(dt, ct) {
                    var et = dt.split("|"), bt = dt.length;
                    while (bt--) {
                        dA.attrHandle[et[bt]] = ct;
                    }
                }

                function ew(dt, bt) {
                    var et = bt && dt, ct = et && dt.nodeType === 1 && bt.nodeType === 1 && (~bt.sourceIndex || eo) - (~dt.sourceIndex || eo);
                    if (ct) {
                        return ct;
                    }
                    if (et) {
                        while (et = et.nextSibling) {
                            if (et === bt) {
                                return -1;
                            }
                        }
                    }
                    return dt ? 1 : -1;
                }

                function dn(bt) {
                    return function (ct) {
                        var dt = ct.nodeName.toLowerCase();
                        return dt === "input" && ct.type === bt;
                    };
                }

                function dV(bt) {
                    return function (ct) {
                        var dt = ct.nodeName.toLowerCase();
                        return (dt === "input" || dt === "button") && ct.type === bt;
                    };
                }

                function dl(bt) {
                    return dB(function (ct) {
                        ct = +ct;
                        return dB(function (eD, eB) {
                            var dt, et = bt([], eD.length, ct), eC = et.length;
                            while (eC--) {
                                if (eD[dt = et[eC]]) {
                                    eD[dt] = !(eB[dt] = eD[dt]);
                                }
                            }
                        });
                    });
                }

                function cn(bt) {
                    return bt && typeof bt.getElementsByTagName !== ec && bt;
                }

                function dm() {
                }

                function eq(dt) {
                    var bt = 0, et = dt.length, ct = "";
                    for (; bt < et; bt++) {
                        ct += dt[bt].value;
                    }
                    return ct;
                }

                function ep(eB, ct, eC) {
                    var et = ct.dir, bt = eC && et === "parentNode", dt = ds++;
                    return ct.first ? function (eD, eF, eE) {
                            while (eD = eD[et]) {
                                if (eD.nodeType === 1 || bt) {
                                    return eB(eD, eF, eE);
                                }
                            }
                        } : function (eF, eI, eH) {
                            var eE, eD, eG = [d5, dt];
                            if (eH) {
                                while (eF = eF[et]) {
                                    if (eF.nodeType === 1 || bt) {
                                        if (eB(eF, eI, eH)) {
                                            return true;
                                        }
                                    }
                                }
                            } else {
                                while (eF = eF[et]) {
                                    if (eF.nodeType === 1 || bt) {
                                        eD = eF[du] || (eF[du] = {});
                                        if ((eE = eD[et]) && eE[0] === d5 && eE[1] === dt) {
                                            return eG[2] = eE[2];
                                        } else {
                                            eD[et] = eG;
                                            if (eG[2] = eB(eF, eI, eH)) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                        };
                }

                function es(bt) {
                    return bt.length > 1 ? function (dt, eB, et) {
                            var ct = bt.length;
                            while (ct--) {
                                if (!bt[ct](dt, eB, et)) {
                                    return false;
                                }
                            }
                            return true;
                        } : bt[0];
                }

                function dS(et, ct, eB) {
                    var dt = 0, bt = ct.length;
                    for (; dt < bt; dt++) {
                        er(et, ct[dt], eB);
                    }
                    return eB;
                }

                function bn(eC, eF, dt, bt, et) {
                    var eG, ct = [], eE = 0, eD = eC.length, eB = eF != null;
                    for (; eE < eD; eE++) {
                        if (eG = eC[eE]) {
                            if (!dt || dt(eG, bt, et)) {
                                ct.push(eG);
                                if (eB) {
                                    eF.push(eE);
                                }
                            }
                        }
                    }
                    return ct;
                }

                function dk(eB, ct, eC, et, bt, dt) {
                    if (et && !et[du]) {
                        et = dk(et);
                    }
                    if (bt && !bt[du]) {
                        bt = dk(bt, dt);
                    }
                    return dB(function (eP, eE, eO, eM) {
                        var eJ, eG, eL, eH = [], eD = [], eK = eE.length, eN = eP || dS(ct || "*", eO.nodeType ? [eO] : eO, []), eF = eB && (eP || !ct) ? bn(eN, eH, eB, eO, eM) : eN, eI = eC ? bt || (eP ? eB : eK || et) ? [] : eE : eF;
                        if (eC) {
                            eC(eF, eI, eO, eM);
                        }
                        if (et) {
                            eJ = bn(eI, eD);
                            et(eJ, [], eO, eM);
                            eG = eJ.length;
                            while (eG--) {
                                if (eL = eJ[eG]) {
                                    eI[eD[eG]] = !(eF[eD[eG]] = eL);
                                }
                            }
                        }
                        if (eP) {
                            if (bt || eB) {
                                if (bt) {
                                    eJ = [];
                                    eG = eI.length;
                                    while (eG--) {
                                        if (eL = eI[eG]) {
                                            eJ.push(eF[eG] = eL);
                                        }
                                    }
                                    bt(null, eI = [], eJ, eM);
                                }
                                eG = eI.length;
                                while (eG--) {
                                    if ((eL = eI[eG]) && (eJ = bt ? en.call(eP, eL) : eH[eG]) > -1) {
                                        eP[eJ] = !(eE[eJ] = eL);
                                    }
                                }
                            }
                        } else {
                            eI = bn(eI === eE ? eI.splice(eK, eI.length) : eI);
                            if (bt) {
                                bt(null, eE, eI, eM);
                            } else {
                                d8.apply(eE, eI);
                            }
                        }
                    });
                }

                function ez(eC) {
                    var eG, ct, et, eH = eC.length, bt = dA.relative[eC[0].type], eF = bt || dA.relative[" "], eE = bt ? 1 : 0, dt = ep(function (eI) {
                        return eI === eG;
                    }, eF, true), eD = ep(function (eI) {
                        return en.call(eG, eI) > -1;
                    }, eF, true), eB = [function (eJ, eK, eI) {
                        return !bt && (eI || eK !== dN) || ((eG = eK).nodeType ? dt(eJ, eK, eI) : eD(eJ, eK, eI));
                    }];
                    for (; eE < eH; eE++) {
                        if (ct = dA.relative[eC[eE].type]) {
                            eB = [ep(es(eB), ct)];
                        } else {
                            ct = dA.filter[eC[eE].type].apply(null, eC[eE].matches);
                            if (ct[du]) {
                                et = ++eE;
                                for (; et < eH; et++) {
                                    if (dA.relative[eC[et].type]) {
                                        break;
                                    }
                                }
                                return dk(eE > 1 && es(eB), eE > 1 && eq(eC.slice(0, eE - 1).concat({value: eC[eE - 2].type === " " ? "*" : ""})).replace(dq, "$1"), ct, eE < et && ez(eC.slice(eE, et)), et < eH && ez(eC = eC.slice(et)), et < eH && eq(eC));
                            }
                            eB.push(ct);
                        }
                    }
                    return es(eB);
                }

                function ey(et, ct) {
                    var eB = ct.length > 0, bt = et.length > 0, dt = function (eR, eC, eP, eM, eE) {
                        var eI, eF, eH, eO = 0, eD = "0", eG = eR && [], eK = [], eJ = dN, eN = eR || bt && dA.find["TAG"]("*", eE), eQ = d5 += eJ == null ? 1 : Math.random() || 0.1, eL = eN.length;
                        if (eE) {
                            dN = eC !== dD && eC;
                        }
                        for (; eD !== eL && (eI = eN[eD]) != null; eD++) {
                            if (bt && eI) {
                                eF = 0;
                                while (eH = et[eF++]) {
                                    if (eH(eI, eC, eP)) {
                                        eM.push(eI);
                                        break;
                                    }
                                }
                                if (eE) {
                                    d5 = eQ;
                                }
                            }
                            if (eB) {
                                if (eI = !eH && eI) {
                                    eO--;
                                }
                                if (eR) {
                                    eG.push(eI);
                                }
                            }
                        }
                        eO += eD;
                        if (eB && eD !== eO) {
                            eF = 0;
                            while (eH = ct[eF++]) {
                                eH(eG, eK, eC, eP);
                            }
                            if (eR) {
                                if (eO > 0) {
                                    while (eD--) {
                                        if (!(eG[eD] || eK[eD])) {
                                            eK[eD] = dU.call(eM);
                                        }
                                    }
                                }
                                eK = bn(eK);
                            }
                            d8.apply(eM, eK);
                            if (eE && !eR && eK.length > 0 && eO + ct.length > 1) {
                                er.uniqueSort(eM);
                            }
                        }
                        if (eE) {
                            d5 = eQ;
                            dN = eJ;
                        }
                        return eG;
                    };
                    return eB ? dB(dt) : dt;
                }

                var dy, dF, dA, dK, dz, dE, dx, dT, dN, dH, dQ, dL, dD, dP, dw, dG, dM, dr, dR, du = "sizzle" + -(new Date), ej = dO.document, d5 = 0, ds = 0, d3 = dv(), ea = dv(), el = dv(), dI = function (ct, bt) {
                    if (ct === bt) {
                        dQ = true;
                    }
                    return 0;
                }, ec = typeof undefined, eo = 1 << 31, d9 = {}.hasOwnProperty, eb = [], dU = eb.pop, ek = eb.push, d8 = eb.push, eg = eb.slice, en = eb.indexOf || function (ct) {
                        var bt = 0, dt = this.length;
                        for (; bt < dt; bt++) {
                            if (this[bt] === ct) {
                                return bt;
                            }
                        }
                        return -1;
                    }, dJ = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ei = "[\\x20\\t\\r\\n\\f]", ef = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", dC = ef.replace("w", "w#"), d6 = "\\[" + ei + "*(" + ef + ")(?:" + ei + "*([*^$|!~]?=)" + ei + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + dC + "))|)" + ei + "*\\]", d2 = ":(" + ef + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + d6 + ")*)|" + ".*" + ")\\)|)", dq = new RegExp("^" + ei + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ei + "+$", "g"), d0 = new RegExp("^" + ei + "*," + ei + "*"), dZ = new RegExp("^" + ei + "*([>+~]|" + ei + ")" + ei + "*"), d1 = new RegExp("=" + ei + "*([^\\]'\"]*?)" + ei + "*\\]", "g"), eu = new RegExp(d2), ee = new RegExp("^" + dC + "$"), ed = {
                    ID: new RegExp("^#(" + ef + ")"),
                    CLASS: new RegExp("^\\.(" + ef + ")"),
                    TAG: new RegExp("^(" + ef.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + d6),
                    PSEUDO: new RegExp("^" + d2),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ei + "*(even|odd|(([+-]|)(\\d*)n|)" + ei + "*(?:([+-]|)" + ei + "*(\\d+)|))" + ei + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + dJ + ")$", "i"),
                    needsContext: new RegExp("^" + ei + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ei + "*((?:-\\d)?\\d*)" + ei + "*\\)|)(?=[^-]|$)", "i")
                }, d7 = /^(?:input|select|textarea|button)$/i, eh = /^h\d$/i, dX = /^[^{]+\{\s*\[native \w/, dW = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, eA = /[+~]/, d4 = /'|\\/g, dY = new RegExp("\\\\([\\da-f]{1,6}" + ei + "?|(" + ei + ")|.)", "ig"), ex = function (dt, bt, et) {
                    var ct = "0x" + bt - 65536;
                    return ct !== ct || et ? bt : ct < 0 ? String.fromCharCode(ct + 65536) : String.fromCharCode(ct >> 10 | 55296, ct & 1023 | 56320);
                };
                try {
                    d8.apply(eb = eg.call(ej.childNodes), ej.childNodes);
                    eb[ej.childNodes.length].nodeType;
                } catch (dp) {
                    d8 = {
                        apply: eb.length ? function (ct, bt) {
                                ek.apply(ct, eg.call(bt));
                            } : function (dt, bt) {
                                var et = dt.length, ct = 0;
                                while (dt[et++] = bt[ct++]) {
                                }
                                dt.length = et - 1;
                            }
                    };
                }
                dF = er.support = {};
                dz = er.isXML = function (ct) {
                    var bt = ct && (ct.ownerDocument || ct).documentElement;
                    return bt ? bt.nodeName !== "HTML" : false;
                };
                dL = er.setDocument = function (dt) {
                    var ct, bt = dt ? dt.ownerDocument || dt : ej, et = bt.defaultView;
                    if (bt === dD || bt.nodeType !== 9 || !bt.documentElement) {
                        return dD;
                    }
                    dD = bt;
                    dP = bt.documentElement;
                    dw = !dz(bt);
                    if (et && et !== et.top) {
                        if (et.addEventListener) {
                            et.addEventListener("unload", function () {
                                dL();
                            }, false);
                        } else {
                            if (et.attachEvent) {
                                et.attachEvent("onunload", function () {
                                    dL();
                                });
                            }
                        }
                    }
                    dF.attributes = em(function (eB) {
                        eB.className = "i";
                        return !eB.getAttribute("className");
                    });
                    dF.getElementsByTagName = em(function (eB) {
                        eB.appendChild(bt.createComment(""));
                        return !eB.getElementsByTagName("*").length;
                    });
                    dF.getElementsByClassName = dX.test(bt.getElementsByClassName) && em(function (eB) {
                            eB.innerHTML = "<div class='a'></div><div class='a i'></div>";
                            eB.firstChild.className = "i";
                            return eB.getElementsByClassName("i").length === 2;
                        });
                    dF.getById = em(function (eB) {
                        dP.appendChild(eB).id = du;
                        return !bt.getElementsByName || !bt.getElementsByName(du).length;
                    });
                    if (dF.getById) {
                        dA.find["ID"] = function (eC, eB) {
                            if (typeof eB.getElementById !== ec && dw) {
                                var eD = eB.getElementById(eC);
                                return eD && eD.parentNode ? [eD] : [];
                            }
                        };
                        dA.filter["ID"] = function (eC) {
                            var eB = eC.replace(dY, ex);
                            return function (eD) {
                                return eD.getAttribute("id") === eB;
                            };
                        };
                    } else {
                        delete dA.find["ID"];
                        dA.filter["ID"] = function (eC) {
                            var eB = eC.replace(dY, ex);
                            return function (eD) {
                                var eE = typeof eD.getAttributeNode !== ec && eD.getAttributeNode("id");
                                return eE && eE.value === eB;
                            };
                        };
                    }
                    dA.find["TAG"] = dF.getElementsByTagName ? function (eC, eB) {
                            if (typeof eB.getElementsByTagName !== ec) {
                                return eB.getElementsByTagName(eC);
                            }
                        } : function (eF, eC) {
                            var eG, eE = [], eB = 0, eD = eC.getElementsByTagName(eF);
                            if (eF === "*") {
                                while (eG = eD[eB++]) {
                                    if (eG.nodeType === 1) {
                                        eE.push(eG);
                                    }
                                }
                                return eE;
                            }
                            return eD;
                        };
                    dA.find["CLASS"] = dF.getElementsByClassName && function (eC, eB) {
                            if (typeof eB.getElementsByClassName !== ec && dw) {
                                return eB.getElementsByClassName(eC);
                            }
                        };
                    dM = [];
                    dG = [];
                    if (dF.qsa = dX.test(bt.querySelectorAll)) {
                        em(function (eB) {
                            eB.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                            if (eB.querySelectorAll("[msallowclip^='']").length) {
                                dG.push("[*^$]=" + ei + "*(?:''|\"\")");
                            }
                            if (!eB.querySelectorAll("[selected]").length) {
                                dG.push("\\[" + ei + "*(?:value|" + dJ + ")");
                            }
                            if (!eB.querySelectorAll(":checked").length) {
                                dG.push(":checked");
                            }
                        });
                        em(function (eC) {
                            var eB = bt.createElement("input");
                            eB.setAttribute("type", "hidden");
                            eC.appendChild(eB).setAttribute("name", "D");
                            if (eC.querySelectorAll("[name=d]").length) {
                                dG.push("name" + ei + "*[*^$|!~]?=");
                            }
                            if (!eC.querySelectorAll(":enabled").length) {
                                dG.push(":enabled", ":disabled");
                            }
                            eC.querySelectorAll("*,:x");
                            dG.push(",.*:");
                        });
                    }
                    if (dF.matchesSelector = dX.test(dr = dP.matches || dP.webkitMatchesSelector || dP.mozMatchesSelector || dP.oMatchesSelector || dP.msMatchesSelector)) {
                        em(function (eB) {
                            dF.disconnectedMatch = dr.call(eB, "div");
                            dr.call(eB, "[s!='']:x");
                            dM.push("!=", d2);
                        });
                    }
                    dG = dG.length && new RegExp(dG.join("|"));
                    dM = dM.length && new RegExp(dM.join("|"));
                    ct = dX.test(dP.compareDocumentPosition);
                    dR = ct || dX.test(dP.contains) ? function (eD, eB) {
                            var eE = eD.nodeType === 9 ? eD.documentElement : eD, eC = eB && eB.parentNode;
                            return eD === eC || !!(eC && eC.nodeType === 1 && (eE.contains ? eE.contains(eC) : eD.compareDocumentPosition && eD.compareDocumentPosition(eC) & 16));
                        } : function (eC, eB) {
                            if (eB) {
                                while (eB = eB.parentNode) {
                                    if (eB === eC) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        };
                    dI = ct ? function (eD, eB) {
                            if (eD === eB) {
                                dQ = true;
                                return 0;
                            }
                            var eC = !eD.compareDocumentPosition - !eB.compareDocumentPosition;
                            if (eC) {
                                return eC;
                            }
                            eC = (eD.ownerDocument || eD) === (eB.ownerDocument || eB) ? eD.compareDocumentPosition(eB) : 1;
                            if (eC & 1 || !dF.sortDetached && eB.compareDocumentPosition(eD) === eC) {
                                if (eD === bt || eD.ownerDocument === ej && dR(ej, eD)) {
                                    return -1;
                                }
                                if (eB === bt || eB.ownerDocument === ej && dR(ej, eB)) {
                                    return 1;
                                }
                                return dH ? en.call(dH, eD) - en.call(dH, eB) : 0;
                            }
                            return eC & 4 ? -1 : 1;
                        } : function (eG, eD) {
                            if (eG === eD) {
                                dQ = true;
                                return 0;
                            }
                            var eI, eF = 0, eE = eG.parentNode, eH = eD.parentNode, eC = [eG], eB = [eD];
                            if (!eE || !eH) {
                                return eG === bt ? -1 : eD === bt ? 1 : eE ? -1 : eH ? 1 : dH ? en.call(dH, eG) - en.call(dH, eD) : 0;
                            } else {
                                if (eE === eH) {
                                    return ew(eG, eD);
                                }
                            }
                            eI = eG;
                            while (eI = eI.parentNode) {
                                eC.unshift(eI);
                            }
                            eI = eD;
                            while (eI = eI.parentNode) {
                                eB.unshift(eI);
                            }
                            while (eC[eF] === eB[eF]) {
                                eF++;
                            }
                            return eF ? ew(eC[eF], eB[eF]) : eC[eF] === ej ? -1 : eB[eF] === ej ? 1 : 0;
                        };
                    return bt;
                };
                er.matches = function (ct, bt) {
                    return er(ct, null, null, bt);
                };
                er.matchesSelector = function (et, ct) {
                    if ((et.ownerDocument || et) !== dD) {
                        dL(et);
                    }
                    ct = ct.replace(d1, "='$1']");
                    if (dF.matchesSelector && dw && (!dM || !dM.test(ct)) && (!dG || !dG.test(ct))) {
                        try {
                            var dt = dr.call(et, ct);
                            if (dt || dF.disconnectedMatch || et.document && et.document.nodeType !== 11) {
                                return dt;
                            }
                        } catch (bt) {
                        }
                    }
                    return er(ct, dD, null, [et]).length > 0;
                };
                er.contains = function (ct, bt) {
                    if ((ct.ownerDocument || ct) !== dD) {
                        dL(ct);
                    }
                    return dR(ct, bt);
                };
                er.attr = function (et, ct) {
                    if ((et.ownerDocument || et) !== dD) {
                        dL(et);
                    }
                    var bt = dA.attrHandle[ct.toLowerCase()], dt = bt && d9.call(dA.attrHandle, ct.toLowerCase()) ? bt(et, ct, !dw) : undefined;
                    return dt !== undefined ? dt : dF.attributes || !dw ? et.getAttribute(ct) : (dt = et.getAttributeNode(ct)) && dt.specified ? dt.value : null;
                };
                er.error = function (bt) {
                    throw new Error("Syntax error, unrecognized expression: " + bt);
                };
                er.uniqueSort = function (eB) {
                    var ct, et = [], bt = 0, dt = 0;
                    dQ = !dF.detectDuplicates;
                    dH = !dF.sortStable && eB.slice(0);
                    eB.sort(dI);
                    if (dQ) {
                        while (ct = eB[dt++]) {
                            if (ct === eB[dt]) {
                                bt = et.push(dt);
                            }
                        }
                        while (bt--) {
                            eB.splice(et[bt], 1);
                        }
                    }
                    dH = null;
                    return eB;
                };
                dK = er.getText = function (et) {
                    var bt, eB = "", dt = 0, ct = et.nodeType;
                    if (!ct) {
                        while (bt = et[dt++]) {
                            eB += dK(bt);
                        }
                    } else {
                        if (ct === 1 || ct === 9 || ct === 11) {
                            if (typeof et.textContent === "string") {
                                return et.textContent;
                            } else {
                                for (et = et.firstChild; et; et = et.nextSibling) {
                                    eB += dK(et);
                                }
                            }
                        } else {
                            if (ct === 3 || ct === 4) {
                                return et.nodeValue;
                            }
                        }
                    }
                    return eB;
                };
                dA = er.selectors = {
                    cacheLength: 50,
                    createPseudo: dB,
                    match: ed,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {dir: "parentNode", first: true},
                        " ": {dir: "parentNode"},
                        "+": {dir: "previousSibling", first: true},
                        "~": {dir: "previousSibling"}
                    },
                    preFilter: {
                        ATTR: function (bt) {
                            bt[1] = bt[1].replace(dY, ex);
                            bt[3] = (bt[3] || bt[4] || bt[5] || "").replace(dY, ex);
                            if (bt[2] === "~=") {
                                bt[3] = " " + bt[3] + " ";
                            }
                            return bt.slice(0, 4);
                        }, CHILD: function (bt) {
                            bt[1] = bt[1].toLowerCase();
                            if (bt[1].slice(0, 3) === "nth") {
                                if (!bt[3]) {
                                    er.error(bt[0]);
                                }
                                bt[4] = +(bt[4] ? bt[5] + (bt[6] || 1) : 2 * (bt[3] === "even" || bt[3] === "odd"));
                                bt[5] = +(bt[7] + bt[8] || bt[3] === "odd");
                            } else {
                                if (bt[3]) {
                                    er.error(bt[0]);
                                }
                            }
                            return bt;
                        }, PSEUDO: function (ct) {
                            var bt, dt = !ct[6] && ct[2];
                            if (ed["CHILD"].test(ct[0])) {
                                return null;
                            }
                            if (ct[3]) {
                                ct[2] = ct[4] || ct[5] || "";
                            } else {
                                if (dt && eu.test(dt) && (bt = dE(dt, true)) && (bt = dt.indexOf(")", dt.length - bt) - dt.length)) {
                                    ct[0] = ct[0].slice(0, bt);
                                    ct[2] = dt.slice(0, bt);
                                }
                            }
                            return ct.slice(0, 3);
                        }
                    },
                    filter: {
                        TAG: function (ct) {
                            var bt = ct.replace(dY, ex).toLowerCase();
                            return ct === "*" ? function () {
                                    return true;
                                } : function (dt) {
                                    return dt.nodeName && dt.nodeName.toLowerCase() === bt;
                                };
                        }, CLASS: function (ct) {
                            var bt = d3[ct + " "];
                            return bt || (bt = new RegExp("(^|" + ei + ")" + ct + "(" + ei + "|$)")) && d3(ct, function (dt) {
                                    return bt.test(typeof dt.className === "string" && dt.className || typeof dt.getAttribute !== ec && dt.getAttribute("class") || "");
                                });
                        }, ATTR: function (ct, bt, dt) {
                            return function (eB) {
                                var et = er.attr(eB, ct);
                                if (et == null) {
                                    return bt === "!=";
                                }
                                if (!bt) {
                                    return true;
                                }
                                et += "";
                                return bt === "=" ? et === dt : bt === "!=" ? et !== dt : bt === "^=" ? dt && et.indexOf(dt) === 0 : bt === "*=" ? dt && et.indexOf(dt) > -1 : bt === "$=" ? dt && et.slice(-dt.length) === dt : bt === "~=" ? (" " + et + " ").indexOf(dt) > -1 : bt === "|=" ? et === dt || et.slice(0, dt.length + 1) === dt + "-" : false;
                            };
                        }, CHILD: function (eC, dt, eE, eB, ct) {
                            var et = eC.slice(0, 3) !== "nth", eD = eC.slice(-4) !== "last", bt = dt === "of-type";
                            return eB === 1 && ct === 0 ? function (eF) {
                                    return !!eF.parentNode;
                                } : function (eR, eG, eP) {
                                    var eL, eI, eN, eJ, eF, eM, eQ = et !== eD ? "nextSibling" : "previousSibling", eH = eR.parentNode, eK = bt && eR.nodeName.toLowerCase(), eO = !eP && !bt;
                                    if (eH) {
                                        if (et) {
                                            while (eQ) {
                                                eN = eR;
                                                while (eN = eN[eQ]) {
                                                    if (bt ? eN.nodeName.toLowerCase() === eK : eN.nodeType === 1) {
                                                        return false;
                                                    }
                                                }
                                                eM = eQ = eC === "only" && !eM && "nextSibling";
                                            }
                                            return true;
                                        }
                                        eM = [eD ? eH.firstChild : eH.lastChild];
                                        if (eD && eO) {
                                            eI = eH[du] || (eH[du] = {});
                                            eL = eI[eC] || [];
                                            eF = eL[0] === d5 && eL[1];
                                            eJ = eL[0] === d5 && eL[2];
                                            eN = eF && eH.childNodes[eF];
                                            while (eN = ++eF && eN && eN[eQ] || (eJ = eF = 0) || eM.pop()) {
                                                if (eN.nodeType === 1 && ++eJ && eN === eR) {
                                                    eI[eC] = [d5, eF, eJ];
                                                    break;
                                                }
                                            }
                                        } else {
                                            if (eO && (eL = (eR[du] || (eR[du] = {}))[eC]) && eL[0] === d5) {
                                                eJ = eL[1];
                                            } else {
                                                while (eN = ++eF && eN && eN[eQ] || (eJ = eF = 0) || eM.pop()) {
                                                    if ((bt ? eN.nodeName.toLowerCase() === eK : eN.nodeType === 1) && ++eJ) {
                                                        if (eO) {
                                                            (eN[du] || (eN[du] = {}))[eC] = [d5, eJ];
                                                        }
                                                        if (eN === eR) {
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        eJ -= ct;
                                        return eJ === eB || eJ % eB === 0 && eJ / eB >= 0;
                                    }
                                };
                        }, PSEUDO: function (dt, ct) {
                            var et, bt = dA.pseudos[dt] || dA.setFilters[dt.toLowerCase()] || er.error("unsupported pseudo: " + dt);
                            if (bt[du]) {
                                return bt(ct);
                            }
                            if (bt.length > 1) {
                                et = [dt, dt, "", ct];
                                return dA.setFilters.hasOwnProperty(dt.toLowerCase()) ? dB(function (eD, eF) {
                                        var eC, eB = bt(eD, ct), eE = eB.length;
                                        while (eE--) {
                                            eC = en.call(eD, eB[eE]);
                                            eD[eC] = !(eF[eC] = eB[eE]);
                                        }
                                    }) : function (eB) {
                                        return bt(eB, 0, et);
                                    };
                            }
                            return bt;
                        }
                    },
                    pseudos: {
                        not: dB(function (dt) {
                            var bt = [], et = [], ct = dx(dt.replace(dq, "$1"));
                            return ct[du] ? dB(function (eF, eD, eH, eC) {
                                    var eE, eG = ct(eF, null, eC, []), eB = eF.length;
                                    while (eB--) {
                                        if (eE = eG[eB]) {
                                            eF[eB] = !(eD[eB] = eE);
                                        }
                                    }
                                }) : function (eD, eB, eC) {
                                    bt[0] = eD;
                                    ct(bt, null, eC, et);
                                    return !et.pop();
                                };
                        }), has: dB(function (bt) {
                            return function (ct) {
                                return er(bt, ct).length > 0;
                            };
                        }), contains: dB(function (bt) {
                            return function (ct) {
                                return (ct.textContent || ct.innerText || dK(ct)).indexOf(bt) > -1;
                            };
                        }), lang: dB(function (bt) {
                            if (!ee.test(bt || "")) {
                                er.error("unsupported lang: " + bt);
                            }
                            bt = bt.replace(dY, ex).toLowerCase();
                            return function (ct) {
                                var dt;
                                do {
                                    if (dt = dw ? ct.lang : ct.getAttribute("xml:lang") || ct.getAttribute("lang")) {
                                        dt = dt.toLowerCase();
                                        return dt === bt || dt.indexOf(bt + "-") === 0;
                                    }
                                } while ((ct = ct.parentNode) && ct.nodeType === 1);
                                return false;
                            };
                        }), target: function (bt) {
                            var ct = dO.location && dO.location.hash;
                            return ct && ct.slice(1) === bt.id;
                        }, root: function (bt) {
                            return bt === dP;
                        }, focus: function (bt) {
                            return bt === dD.activeElement && (!dD.hasFocus || dD.hasFocus()) && !!(bt.type || bt.href || ~bt.tabIndex);
                        }, enabled: function (bt) {
                            return bt.disabled === false;
                        }, disabled: function (bt) {
                            return bt.disabled === true;
                        }, checked: function (ct) {
                            var bt = ct.nodeName.toLowerCase();
                            return bt === "input" && !!ct.checked || bt === "option" && !!ct.selected;
                        }, selected: function (bt) {
                            if (bt.parentNode) {
                                bt.parentNode.selectedIndex;
                            }
                            return bt.selected === true;
                        }, empty: function (bt) {
                            for (bt = bt.firstChild; bt; bt = bt.nextSibling) {
                                if (bt.nodeType < 6) {
                                    return false;
                                }
                            }
                            return true;
                        }, parent: function (bt) {
                            return !dA.pseudos["empty"](bt);
                        }, header: function (bt) {
                            return eh.test(bt.nodeName);
                        }, input: function (bt) {
                            return d7.test(bt.nodeName);
                        }, button: function (ct) {
                            var bt = ct.nodeName.toLowerCase();
                            return bt === "input" && ct.type === "button" || bt === "button";
                        }, text: function (ct) {
                            var bt;
                            return ct.nodeName.toLowerCase() === "input" && ct.type === "text" && ((bt = ct.getAttribute("type")) == null || bt.toLowerCase() === "text");
                        }, first: dl(function () {
                            return [0];
                        }), last: dl(function (ct, bt) {
                            return [bt - 1];
                        }), eq: dl(function (ct, bt, dt) {
                            return [dt < 0 ? dt + bt : dt];
                        }), even: dl(function (ct, bt) {
                            var dt = 0;
                            for (; dt < bt; dt += 2) {
                                ct.push(dt);
                            }
                            return ct;
                        }), odd: dl(function (ct, bt) {
                            var dt = 1;
                            for (; dt < bt; dt += 2) {
                                ct.push(dt);
                            }
                            return ct;
                        }), lt: dl(function (dt, bt, et) {
                            var ct = et < 0 ? et + bt : et;
                            for (; --ct >= 0;) {
                                dt.push(ct);
                            }
                            return dt;
                        }), gt: dl(function (dt, bt, et) {
                            var ct = et < 0 ? et + bt : et;
                            for (; ++ct < bt;) {
                                dt.push(ct);
                            }
                            return dt;
                        })
                    }
                };
                dA.pseudos["nth"] = dA.pseudos["eq"];
                for (dy in {radio: true, checkbox: true, file: true, password: true, image: true}) {
                    dA.pseudos[dy] = dn(dy);
                }
                for (dy in {submit: true, reset: true}) {
                    dA.pseudos[dy] = dV(dy);
                }
                dm.prototype = dA.filters = dA.pseudos;
                dA.setFilters = new dm;
                dE = er.tokenize = function (eC, eF) {
                    var ct, et, eG, bt, eE, eD, eB, dt = ea[eC + " "];
                    if (dt) {
                        return eF ? 0 : dt.slice(0);
                    }
                    eE = eC;
                    eD = [];
                    eB = dA.preFilter;
                    while (eE) {
                        if (!ct || (et = d0.exec(eE))) {
                            if (et) {
                                eE = eE.slice(et[0].length) || eE;
                            }
                            eD.push(eG = []);
                        }
                        ct = false;
                        if (et = dZ.exec(eE)) {
                            ct = et.shift();
                            eG.push({value: ct, type: et[0].replace(dq, " ")});
                            eE = eE.slice(ct.length);
                        }
                        for (bt in dA.filter) {
                            if ((et = ed[bt].exec(eE)) && (!eB[bt] || (et = eB[bt](et)))) {
                                ct = et.shift();
                                eG.push({value: ct, type: bt, matches: et});
                                eE = eE.slice(ct.length);
                            }
                        }
                        if (!ct) {
                            break;
                        }
                    }
                    return eF ? eE.length : eE ? er.error(eC) : ea(eC, eD).slice(0);
                };
                dx = er.compile = function (eB, ct) {
                    var eC, et = [], bt = [], dt = el[eB + " "];
                    if (!dt) {
                        if (!ct) {
                            ct = dE(eB);
                        }
                        eC = ct.length;
                        while (eC--) {
                            dt = ez(ct[eC]);
                            if (dt[du]) {
                                et.push(dt);
                            } else {
                                bt.push(dt);
                            }
                        }
                        dt = el(eB, ey(bt, et));
                        dt.selector = eB;
                    }
                    return dt;
                };
                dT = er.select = function (eC, eG, dt, eH) {
                    var eF, eB, ct, eE, et, bt = typeof eC === "function" && eC, eD = !eH && dE(eC = bt.selector || eC);
                    dt = dt || [];
                    if (eD.length === 1) {
                        eB = eD[0] = eD[0].slice(0);
                        if (eB.length > 2 && (ct = eB[0]).type === "ID" && dF.getById && eG.nodeType === 9 && dw && dA.relative[eB[1].type]) {
                            eG = (dA.find["ID"](ct.matches[0].replace(dY, ex), eG) || [])[0];
                            if (!eG) {
                                return dt;
                            } else {
                                if (bt) {
                                    eG = eG.parentNode;
                                }
                            }
                            eC = eC.slice(eB.shift().value.length);
                        }
                        eF = ed["needsContext"].test(eC) ? 0 : eB.length;
                        while (eF--) {
                            ct = eB[eF];
                            if (dA.relative[eE = ct.type]) {
                                break;
                            }
                            if (et = dA.find[eE]) {
                                if (eH = et(ct.matches[0].replace(dY, ex), eA.test(eB[0].type) && cn(eG.parentNode) || eG)) {
                                    eB.splice(eF, 1);
                                    eC = eH.length && eq(eB);
                                    if (!eC) {
                                        d8.apply(dt, eH);
                                        return dt;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    (bt || dx(eC, eD))(eH, eG, !dw, dt, eA.test(eC) && cn(eG.parentNode) || eG);
                    return dt;
                };
                dF.sortStable = du.split("").sort(dI).join("") === du;
                dF.detectDuplicates = !!dQ;
                dL();
                dF.sortDetached = em(function (bt) {
                    return bt.compareDocumentPosition(dD.createElement("div")) & 1;
                });
                if (!em(function (bt) {
                        bt.innerHTML = "<a href='#'></a>";
                        return bt.firstChild.getAttribute("href") === "#";
                    })) {
                    ev("type|href|height|width", function (ct, bt, dt) {
                        if (!dt) {
                            return ct.getAttribute(bt, bt.toLowerCase() === "type" ? 1 : 2);
                        }
                    });
                }
                if (!dF.attributes || !em(function (bt) {
                        bt.innerHTML = "<input/>";
                        bt.firstChild.setAttribute("value", "");
                        return bt.firstChild.getAttribute("value") === "";
                    })) {
                    ev("value", function (ct, bt, dt) {
                        if (!dt && ct.nodeName.toLowerCase() === "input") {
                            return ct.defaultValue;
                        }
                    });
                }
                if (!em(function (bt) {
                        return bt.getAttribute("disabled") == null;
                    })) {
                    ev(dJ, function (dt, bt, et) {
                        var ct;
                        if (!et) {
                            return dt[bt] === true ? bt.toLowerCase() : (ct = dt.getAttributeNode(bt)) && ct.specified ? ct.value : null;
                        }
                    });
                }
                return er;
            }(ce);
            ca.find = bN;
            ca.expr = bN.selectors;
            ca.expr[":"] = ca.expr.pseudos;
            ca.unique = bN.uniqueSort;
            ca.text = bN.getText;
            ca.isXMLDoc = bN.isXML;
            ca.contains = bN.contains;
            var ci = ca.expr.match.needsContext;
            var bQ = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
            var cT = /^.[^:#\[\.,]*$/;
            ca.filter = function (cn, bn, ct) {
                var bt = bn[0];
                if (ct) {
                    cn = ":not(" + cn + ")";
                }
                return bn.length === 1 && bt.nodeType === 1 ? ca.find.matchesSelector(bt, cn) ? [bt] : [] : ca.find.matches(cn, ca.grep(bn, function (dk) {
                        return dk.nodeType === 1;
                    }));
            };
            ca.fn.extend({
                find: function (ct) {
                    var bt, dk = [], cn = this, bn = cn.length;
                    if (typeof ct !== "string") {
                        return this.pushStack(ca(ct).filter(function () {
                            for (bt = 0; bt < bn; bt++) {
                                if (ca.contains(cn[bt], this)) {
                                    return true;
                                }
                            }
                        }));
                    }
                    for (bt = 0; bt < bn; bt++) {
                        ca.find(ct, cn[bt], dk);
                    }
                    dk = this.pushStack(bn > 1 ? ca.unique(dk) : dk);
                    dk.selector = this.selector ? this.selector + " " + ct : ct;
                    return dk;
                }, filter: function (bn) {
                    return this.pushStack(cx(this, bn || [], false));
                }, not: function (bn) {
                    return this.pushStack(cx(this, bn || [], true));
                }, is: function (bn) {
                    return !!cx(this, typeof bn === "string" && ci.test(bn) ? ca(bn) : bn || [], false).length;
                }
            });
            var bP, cv = ce.document, cF = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, cW = ca.fn.init = function (cn, bn) {
                var ct, bt;
                if (!cn) {
                    return this;
                }
                if (typeof cn === "string") {
                    if (cn.charAt(0) === "<" && cn.charAt(cn.length - 1) === ">" && cn.length >= 3) {
                        ct = [null, cn, null];
                    } else {
                        ct = cF.exec(cn);
                    }
                    if (ct && (ct[1] || !bn)) {
                        if (ct[1]) {
                            bn = bn instanceof ca ? bn[0] : bn;
                            ca.merge(this, ca.parseHTML(ct[1], bn && bn.nodeType ? bn.ownerDocument || bn : cv, true));
                            if (bQ.test(ct[1]) && ca.isPlainObject(bn)) {
                                for (ct in bn) {
                                    if (ca.isFunction(this[ct])) {
                                        this[ct](bn[ct]);
                                    } else {
                                        this.attr(ct, bn[ct]);
                                    }
                                }
                            }
                            return this;
                        } else {
                            bt = cv.getElementById(ct[2]);
                            if (bt && bt.parentNode) {
                                if (bt.id !== ct[2]) {
                                    return bP.find(cn);
                                }
                                this.length = 1;
                                this[0] = bt;
                            }
                            this.context = cv;
                            this.selector = cn;
                            return this;
                        }
                    } else {
                        if (!bn || bn.jquery) {
                            return (bn || bP).find(cn);
                        } else {
                            return this.constructor(bn).find(cn);
                        }
                    }
                } else {
                    if (cn.nodeType) {
                        this.context = this[0] = cn;
                        this.length = 1;
                        return this;
                    } else {
                        if (ca.isFunction(cn)) {
                            return typeof bP.ready !== "undefined" ? bP.ready(cn) : cn(ca);
                        }
                    }
                }
                if (cn.selector !== undefined) {
                    this.selector = cn.selector;
                    this.context = cn.context;
                }
                return ca.makeArray(cn, this);
            };
            cW.prototype = ca.fn;
            bP = ca(cv);
            var b6 = /^(?:parents|prev(?:Until|All))/, cJ = {children: true, contents: true, next: true, prev: true};
            ca.extend({
                dir: function (ct, bt, dk) {
                    var cn = [], bn = ct[bt];
                    while (bn && bn.nodeType !== 9 && (dk === undefined || bn.nodeType !== 1 || !ca(bn).is(dk))) {
                        if (bn.nodeType === 1) {
                            cn.push(bn);
                        }
                        bn = bn[bt];
                    }
                    return cn;
                }, sibling: function (bt, bn) {
                    var cn = [];
                    for (; bt; bt = bt.nextSibling) {
                        if (bt.nodeType === 1 && bt !== bn) {
                            cn.push(bt);
                        }
                    }
                    return cn;
                }
            });
            ca.fn.extend({
                has: function (cn) {
                    var bn, ct = ca(cn, this), bt = ct.length;
                    return this.filter(function () {
                        for (bn = 0; bn < bt; bn++) {
                            if (ca.contains(this, ct[bn])) {
                                return true;
                            }
                        }
                    });
                }, closest: function (dk, bt) {
                    var dm, ct = 0, bn = this.length, cn = [], dl = ci.test(dk) || typeof dk !== "string" ? ca(dk, bt || this.context) : 0;
                    for (; ct < bn; ct++) {
                        for (dm = this[ct]; dm && dm !== bt; dm = dm.parentNode) {
                            if (dm.nodeType < 11 && (dl ? dl.index(dm) > -1 : dm.nodeType === 1 && ca.find.matchesSelector(dm, dk))) {
                                cn.push(dm);
                                break;
                            }
                        }
                    }
                    return this.pushStack(cn.length > 1 ? ca.unique(cn) : cn);
                }, index: function (bn) {
                    if (!bn) {
                        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                    }
                    if (typeof bn === "string") {
                        return ca.inArray(this[0], ca(bn));
                    }
                    return ca.inArray(bn.jquery ? bn[0] : bn, this);
                }, add: function (bt, bn) {
                    return this.pushStack(ca.unique(ca.merge(this.get(), ca(bt, bn))));
                }, addBack: function (bn) {
                    return this.add(bn == null ? this.prevObject : this.prevObject.filter(bn));
                }
            });
            ca.each({
                parent: function (bt) {
                    var bn = bt.parentNode;
                    return bn && bn.nodeType !== 11 ? bn : null;
                }, parents: function (bn) {
                    return ca.dir(bn, "parentNode");
                }, parentsUntil: function (bt, bn, cn) {
                    return ca.dir(bt, "parentNode", cn);
                }, next: function (bn) {
                    return cY(bn, "nextSibling");
                }, prev: function (bn) {
                    return cY(bn, "previousSibling");
                }, nextAll: function (bn) {
                    return ca.dir(bn, "nextSibling");
                }, prevAll: function (bn) {
                    return ca.dir(bn, "previousSibling");
                }, nextUntil: function (bt, bn, cn) {
                    return ca.dir(bt, "nextSibling", cn);
                }, prevUntil: function (bt, bn, cn) {
                    return ca.dir(bt, "previousSibling", cn);
                }, siblings: function (bn) {
                    return ca.sibling((bn.parentNode || {}).firstChild, bn);
                }, children: function (bn) {
                    return ca.sibling(bn.firstChild);
                }, contents: function (bn) {
                    return ca.nodeName(bn, "iframe") ? bn.contentDocument || bn.contentWindow.document : ca.merge([], bn.childNodes);
                }
            }, function (bt, bn) {
                ca.fn[bt] = function (dk, ct) {
                    var cn = ca.map(this, bn, dk);
                    if (bt.slice(-5) !== "Until") {
                        ct = dk;
                    }
                    if (ct && typeof ct === "string") {
                        cn = ca.filter(ct, cn);
                    }
                    if (this.length > 1) {
                        if (!cJ[bt]) {
                            cn = ca.unique(cn);
                        }
                        if (b6.test(bt)) {
                            cn = cn.reverse();
                        }
                    }
                    return this.pushStack(cn);
                };
            });
            var cD = /\S+/g;
            var cI = {};
            ca.Callbacks = function (dm) {
                dm = typeof dm === "string" ? cI[dm] || cl(dm) : ca.extend({}, dm);
                var dq, cn, bn, dk, dr, bt, dp = [], dn = !dm.once && [], dl = function (ds) {
                    cn = dm.memory && ds;
                    bn = true;
                    dr = bt || 0;
                    bt = 0;
                    dk = dp.length;
                    dq = true;
                    for (; dp && dr < dk; dr++) {
                        if (dp[dr].apply(ds[0], ds[1]) === false && dm.stopOnFalse) {
                            cn = false;
                            break;
                        }
                    }
                    dq = false;
                    if (dp) {
                        if (dn) {
                            if (dn.length) {
                                dl(dn.shift());
                            }
                        } else {
                            if (cn) {
                                dp = [];
                            } else {
                                ct.disable();
                            }
                        }
                    }
                }, ct = {
                    add: function () {
                        if (dp) {
                            var dt = dp.length;
                            (function ds(du) {
                                ca.each(du, function (dv, dx) {
                                    var dw = ca.type(dx);
                                    if (dw === "function") {
                                        if (!dm.unique || !ct.has(dx)) {
                                            dp.push(dx);
                                        }
                                    } else {
                                        if (dx && dx.length && dw !== "string") {
                                            ds(dx);
                                        }
                                    }
                                });
                            })(arguments);
                            if (dq) {
                                dk = dp.length;
                            } else {
                                if (cn) {
                                    bt = dt;
                                    dl(cn);
                                }
                            }
                        }
                        return this;
                    }, remove: function () {
                        if (dp) {
                            ca.each(arguments, function (dt, du) {
                                var ds;
                                while ((ds = ca.inArray(du, dp, ds)) > -1) {
                                    dp.splice(ds, 1);
                                    if (dq) {
                                        if (ds <= dk) {
                                            dk--;
                                        }
                                        if (ds <= dr) {
                                            dr--;
                                        }
                                    }
                                }
                            });
                        }
                        return this;
                    }, has: function (ds) {
                        return ds ? ca.inArray(ds, dp) > -1 : !!(dp && dp.length);
                    }, empty: function () {
                        dp = [];
                        dk = 0;
                        return this;
                    }, disable: function () {
                        dp = dn = cn = undefined;
                        return this;
                    }, disabled: function () {
                        return !dp;
                    }, lock: function () {
                        dn = undefined;
                        if (!cn) {
                            ct.disable();
                        }
                        return this;
                    }, locked: function () {
                        return !dn;
                    }, fireWith: function (ds, dt) {
                        if (dp && (!bn || dn)) {
                            dt = dt || [];
                            dt = [ds, dt.slice ? dt.slice() : dt];
                            if (dq) {
                                dn.push(dt);
                            } else {
                                dl(dt);
                            }
                        }
                        return this;
                    }, fire: function () {
                        ct.fireWith(this, arguments);
                        return this;
                    }, fired: function () {
                        return !!bn;
                    }
                };
                return ct;
            };
            ca.extend({
                Deferred: function (ct) {
                    var bt = [["resolve", "done", ca.Callbacks("once memory"), "resolved"], ["reject", "fail", ca.Callbacks("once memory"), "rejected"], ["notify", "progress", ca.Callbacks("memory")]], dk = "pending", cn = {
                        state: function () {
                            return dk;
                        }, always: function () {
                            bn.done(arguments).fail(arguments);
                            return this;
                        }, then: function () {
                            var dl = arguments;
                            return ca.Deferred(function (dm) {
                                ca.each(bt, function (dn, dp) {
                                    var dq = ca.isFunction(dl[dn]) && dl[dn];
                                    bn[dp[1]](function () {
                                        var dr = dq && dq.apply(this, arguments);
                                        if (dr && ca.isFunction(dr.promise)) {
                                            dr.promise().done(dm.resolve).fail(dm.reject).progress(dm.notify);
                                        } else {
                                            dm[dp[0] + "With"](this === cn ? dm.promise() : this, dq ? [dr] : arguments);
                                        }
                                    });
                                });
                                dl = null;
                            }).promise();
                        }, promise: function (dl) {
                            return dl != null ? ca.extend(dl, cn) : cn;
                        }
                    }, bn = {};
                    cn.pipe = cn.then;
                    ca.each(bt, function (dn, dm) {
                        var dp = dm[2], dl = dm[3];
                        cn[dm[1]] = dp.add;
                        if (dl) {
                            dp.add(function () {
                                dk = dl;
                            }, bt[dn ^ 1][2].disable, bt[2][2].lock);
                        }
                        bn[dm[0]] = function () {
                            bn[dm[0] + "With"](this === bn ? cn : this, arguments);
                            return this;
                        };
                        bn[dm[0] + "With"] = dp.fireWith;
                    });
                    cn.promise(bn);
                    if (ct) {
                        ct.call(bn, bn);
                    }
                    return bn;
                }, when: function (dl) {
                    var dp = 0, bt = bW.call(arguments), ct = bt.length, dq = ct !== 1 || dl && ca.isFunction(dl.promise) ? ct : 0, bn = dq === 1 ? dl : ca.Deferred(), dn = function (ds, dr, dt) {
                        return function (du) {
                            dr[ds] = this;
                            dt[ds] = arguments.length > 1 ? bW.call(arguments) : du;
                            if (dt === dm) {
                                bn.notifyWith(dr, dt);
                            } else {
                                if (!--dq) {
                                    bn.resolveWith(dr, dt);
                                }
                            }
                        };
                    }, dm, dk, cn;
                    if (ct > 1) {
                        dm = new Array(ct);
                        dk = new Array(ct);
                        cn = new Array(ct);
                        for (; dp < ct; dp++) {
                            if (bt[dp] && ca.isFunction(bt[dp].promise)) {
                                bt[dp].promise().done(dn(dp, cn, bt)).fail(bn.reject).progress(dn(dp, dk, dm));
                            } else {
                                --dq;
                            }
                        }
                    }
                    if (!dq) {
                        bn.resolveWith(cn, bt);
                    }
                    return bn.promise();
                }
            });
            var cU;
            ca.fn.ready = function (bn) {
                ca.ready.promise().done(bn);
                return this;
            };
            ca.extend({
                isReady: false, readyWait: 1, holdReady: function (bn) {
                    if (bn) {
                        ca.readyWait++;
                    } else {
                        ca.ready(true);
                    }
                }, ready: function (bn) {
                    if (bn === true ? --ca.readyWait : ca.isReady) {
                        return;
                    }
                    if (!cv.body) {
                        return setTimeout(ca.ready);
                    }
                    ca.isReady = true;
                    if (bn !== true && --ca.readyWait > 0) {
                        return;
                    }
                    cU.resolveWith(cv, [ca]);
                    if (ca.fn.triggerHandler) {
                        ca(cv).triggerHandler("ready");
                        ca(cv).off("ready");
                    }
                }
            });
            ca.ready.promise = function (bt) {
                if (!cU) {
                    cU = ca.Deferred();
                    if (cv.readyState === "complete") {
                        setTimeout(ca.ready);
                    } else {
                        if (cv.addEventListener) {
                            cv.addEventListener("DOMContentLoaded", cP, false);
                            ce.addEventListener("load", cP, false);
                        } else {
                            cv.attachEvent("onreadystatechange", cP);
                            ce.attachEvent("onload", cP);
                            var ct = false;
                            try {
                                ct = ce.frameElement == null && cv.documentElement;
                            } catch (cn) {
                            }
                            if (ct && ct.doScroll) {
                                (function bn() {
                                    if (!ca.isReady) {
                                        try {
                                            ct.doScroll("left");
                                        } catch (dk) {
                                            return setTimeout(bn, 50);
                                        }
                                        cC();
                                        ca.ready();
                                    }
                                })();
                            }
                        }
                    }
                }
                return cU.promise(bt);
            };
            var cX = typeof undefined;
            var b7;
            for (b7 in ca(b5)) {
                break;
            }
            b5.ownLast = b7 !== "0";
            b5.inlineBlockNeedsLayout = false;
            ca(function () {
                var cn, bn, ct, bt;
                ct = cv.getElementsByTagName("body")[0];
                if (!ct || !ct.style) {
                    return;
                }
                bn = cv.createElement("div");
                bt = cv.createElement("div");
                bt.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                ct.appendChild(bt).appendChild(bn);
                if (typeof bn.style.zoom !== cX) {
                    bn.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
                    b5.inlineBlockNeedsLayout = cn = bn.offsetWidth === 3;
                    if (cn) {
                        ct.style.zoom = 1;
                    }
                }
                ct.removeChild(bt);
            });
            (function () {
                var bt = cv.createElement("div");
                if (b5.deleteExpando == null) {
                    b5.deleteExpando = true;
                    try {
                        delete bt.test;
                    } catch (bn) {
                        b5.deleteExpando = false;
                    }
                }
                bt = null;
            })();
            ca.acceptData = function (bt) {
                var bn = ca.noData[(bt.nodeName + " ").toLowerCase()], cn = +bt.nodeType || 1;
                return cn !== 1 && cn !== 9 ? false : !bn || bn !== true && bt.getAttribute("classid") === bn;
            };
            var cR = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, cN = /([A-Z])/g;
            ca.extend({
                cache: {},
                noData: {"applet ": true, "embed ": true, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
                hasData: function (bn) {
                    bn = bn.nodeType ? ca.cache[bn[ca.expando]] : bn[ca.expando];
                    return !!bn && !cz(bn);
                },
                data: function (bt, bn, cn) {
                    return cu(bt, bn, cn);
                },
                removeData: function (bt, bn) {
                    return bM(bt, bn);
                },
                _data: function (bt, bn, cn) {
                    return cu(bt, bn, cn, true);
                },
                _removeData: function (bt, bn) {
                    return bM(bt, bn, true);
                }
            });
            ca.fn.extend({
                data: function (dk, bt) {
                    var dm, ct, bn, cn = this[0], dl = cn && cn.attributes;
                    if (dk === undefined) {
                        if (this.length) {
                            bn = ca.data(cn);
                            if (cn.nodeType === 1 && !ca._data(cn, "parsedAttrs")) {
                                dm = dl.length;
                                while (dm--) {
                                    if (dl[dm]) {
                                        ct = dl[dm].name;
                                        if (ct.indexOf("data-") === 0) {
                                            ct = ca.camelCase(ct.slice(5));
                                            bX(cn, ct, bn[ct]);
                                        }
                                    }
                                }
                                ca._data(cn, "parsedAttrs", true);
                            }
                        }
                        return bn;
                    }
                    if (typeof dk === "object") {
                        return this.each(function () {
                            ca.data(this, dk);
                        });
                    }
                    return arguments.length > 1 ? this.each(function () {
                            ca.data(this, dk, bt);
                        }) : cn ? bX(cn, dk, ca.data(cn, dk)) : undefined;
                }, removeData: function (bn) {
                    return this.each(function () {
                        ca.removeData(this, bn);
                    });
                }
            });
            ca.extend({
                queue: function (cn, bn, ct) {
                    var bt;
                    if (cn) {
                        bn = (bn || "fx") + "queue";
                        bt = ca._data(cn, bn);
                        if (ct) {
                            if (!bt || ca.isArray(ct)) {
                                bt = ca._data(cn, bn, ca.makeArray(ct));
                            } else {
                                bt.push(ct);
                            }
                        }
                        return bt || [];
                    }
                }, dequeue: function (dk, bt) {
                    bt = bt || "fx";
                    var dm = ca.queue(dk, bt), ct = dm.length, bn = dm.shift(), cn = ca._queueHooks(dk, bt), dl = function () {
                        ca.dequeue(dk, bt);
                    };
                    if (bn === "inprogress") {
                        bn = dm.shift();
                        ct--;
                    }
                    if (bn) {
                        if (bt === "fx") {
                            dm.unshift("inprogress");
                        }
                        delete cn.stop;
                        bn.call(dk, dl, cn);
                    }
                    if (!ct && cn) {
                        cn.empty.fire();
                    }
                }, _queueHooks: function (bt, bn) {
                    var cn = bn + "queueHooks";
                    return ca._data(bt, cn) || ca._data(bt, cn, {
                            empty: ca.Callbacks("once memory").add(function () {
                                ca._removeData(bt, bn + "queue");
                                ca._removeData(bt, cn);
                            })
                        });
                }
            });
            ca.fn.extend({
                queue: function (bt, bn) {
                    var cn = 2;
                    if (typeof bt !== "string") {
                        bn = bt;
                        bt = "fx";
                        cn--;
                    }
                    if (arguments.length < cn) {
                        return ca.queue(this[0], bt);
                    }
                    return bn === undefined ? this : this.each(function () {
                            var ct = ca.queue(this, bt, bn);
                            ca._queueHooks(this, bt);
                            if (bt === "fx" && ct[0] !== "inprogress") {
                                ca.dequeue(this, bt);
                            }
                        });
                }, dequeue: function (bn) {
                    return this.each(function () {
                        ca.dequeue(this, bn);
                    });
                }, clearQueue: function (bn) {
                    return this.queue(bn || "fx", []);
                }, promise: function (dl, cn) {
                    var dn, dk = 1, bt = ca.Deferred(), ct = this, dm = this.length, bn = function () {
                        if (!--dk) {
                            bt.resolveWith(ct, [ct]);
                        }
                    };
                    if (typeof dl !== "string") {
                        cn = dl;
                        dl = undefined;
                    }
                    dl = dl || "fx";
                    while (dm--) {
                        dn = ca._data(ct[dm], dl + "queueHooks");
                        if (dn && dn.empty) {
                            dk++;
                            dn.empty.add(bn);
                        }
                    }
                    bn();
                    return bt.promise(cn);
                }
            });
            var cr = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
            var cq = ["Top", "Right", "Bottom", "Left"];
            var cs = function (bt, bn) {
                bt = bn || bt;
                return ca.css(bt, "display") === "none" || !ca.contains(bt.ownerDocument, bt);
            };
            var c9 = ca.access = function (dl, dp, cn, bn, ct, dq, bt) {
                var dn = 0, dm = dl.length, dk = cn == null;
                if (ca.type(cn) === "object") {
                    ct = true;
                    for (dn in cn) {
                        ca.access(dl, dp, dn, cn[dn], true, dq, bt);
                    }
                } else {
                    if (bn !== undefined) {
                        ct = true;
                        if (!ca.isFunction(bn)) {
                            bt = true;
                        }
                        if (dk) {
                            if (bt) {
                                dp.call(dl, bn);
                                dp = null;
                            } else {
                                dk = dp;
                                dp = function (ds, dr, dt) {
                                    return dk.call(ca(ds), dt);
                                };
                            }
                        }
                        if (dp) {
                            for (; dn < dm; dn++) {
                                dp(dl[dn], cn, bt ? bn : bn.call(dl[dn], dn, dp(dl[dn], cn)));
                            }
                        }
                    }
                }
                return ct ? dl : dk ? dp.call(dl) : dm ? dp(dl[0], cn) : dq;
            };
            var cM = /^(?:checkbox|radio)$/i;
            (function () {
                var cn = cv.createElement("input"), bn = cv.createElement("div"), ct = cv.createDocumentFragment();
                bn.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                b5.leadingWhitespace = bn.firstChild.nodeType === 3;
                b5.tbody = !bn.getElementsByTagName("tbody").length;
                b5.htmlSerialize = !!bn.getElementsByTagName("link").length;
                b5.html5Clone = cv.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
                cn.type = "checkbox";
                cn.checked = true;
                ct.appendChild(cn);
                b5.appendChecked = cn.checked;
                bn.innerHTML = "<textarea>x</textarea>";
                b5.noCloneChecked = !!bn.cloneNode(true).lastChild.defaultValue;
                ct.appendChild(bn);
                bn.innerHTML = "<input type='radio' checked='checked' name='t'/>";
                b5.checkClone = bn.cloneNode(true).cloneNode(true).lastChild.checked;
                b5.noCloneEvent = true;
                if (bn.attachEvent) {
                    bn.attachEvent("onclick", function () {
                        b5.noCloneEvent = false;
                    });
                    bn.cloneNode(true).click();
                }
                if (b5.deleteExpando == null) {
                    b5.deleteExpando = true;
                    try {
                        delete bn.test;
                    } catch (bt) {
                        b5.deleteExpando = false;
                    }
                }
            })();
            (function () {
                var bn, cn, bt = cv.createElement("div");
                for (bn in {submit: true, change: true, focusin: true}) {
                    cn = "on" + bn;
                    if (!(b5[bn + "Bubbles"] = cn in ce)) {
                        bt.setAttribute(cn, "t");
                        b5[bn + "Bubbles"] = bt.attributes[cn].expando === false;
                    }
                }
                bt = null;
            })();
            var cK = /^(?:input|select|textarea)$/i, cA = /^key/, cQ = /^(?:mouse|pointer|contextmenu)|click/, cp = /^(?:focusinfocus|focusoutblur)$/, cm = /^([^.]*)(?:\.(.+)|)$/;
            ca.event = {
                global: {},
                add: function (dq, dw, ct, bn, dm) {
                    var dx, cn, dv, dt, dp, dl, ds, bt, dr, du, dk, dn = ca._data(dq);
                    if (!dn) {
                        return;
                    }
                    if (ct.handler) {
                        dt = ct;
                        ct = dt.handler;
                        dm = dt.selector;
                    }
                    if (!ct.guid) {
                        ct.guid = ca.guid++;
                    }
                    if (!(cn = dn.events)) {
                        cn = dn.events = {};
                    }
                    if (!(dl = dn.handle)) {
                        dl = dn.handle = function (dy) {
                            return typeof ca !== cX && (!dy || ca.event.triggered !== dy.type) ? ca.event.dispatch.apply(dl.elem, arguments) : undefined;
                        };
                        dl.elem = dq;
                    }
                    dw = (dw || "").match(cD) || [""];
                    dv = dw.length;
                    while (dv--) {
                        dx = cm.exec(dw[dv]) || [];
                        dr = dk = dx[1];
                        du = (dx[2] || "").split(".").sort();
                        if (!dr) {
                            continue;
                        }
                        dp = ca.event.special[dr] || {};
                        dr = (dm ? dp.delegateType : dp.bindType) || dr;
                        dp = ca.event.special[dr] || {};
                        ds = ca.extend({
                            type: dr,
                            origType: dk,
                            data: bn,
                            handler: ct,
                            guid: ct.guid,
                            selector: dm,
                            needsContext: dm && ca.expr.match.needsContext.test(dm),
                            namespace: du.join(".")
                        }, dt);
                        if (!(bt = cn[dr])) {
                            bt = cn[dr] = [];
                            bt.delegateCount = 0;
                            if (!dp.setup || dp.setup.call(dq, bn, du, dl) === false) {
                                if (dq.addEventListener) {
                                    dq.addEventListener(dr, dl, false);
                                } else {
                                    if (dq.attachEvent) {
                                        dq.attachEvent("on" + dr, dl);
                                    }
                                }
                            }
                        }
                        if (dp.add) {
                            dp.add.call(dq, ds);
                            if (!ds.handler.guid) {
                                ds.handler.guid = ct.guid;
                            }
                        }
                        if (dm) {
                            bt.splice(bt.delegateCount++, 0, ds);
                        } else {
                            bt.push(ds);
                        }
                        ca.event.global[dr] = true;
                    }
                    dq = null;
                },
                remove: function (dq, dw, ct, bn, dm) {
                    var dx, cn, dv, dt, dp, dl, ds, bt, dr, du, dk, dn = ca.hasData(dq) && ca._data(dq);
                    if (!dn || !(dl = dn.events)) {
                        return;
                    }
                    dw = (dw || "").match(cD) || [""];
                    dp = dw.length;
                    while (dp--) {
                        dv = cm.exec(dw[dp]) || [];
                        dr = dk = dv[1];
                        du = (dv[2] || "").split(".").sort();
                        if (!dr) {
                            for (dr in dl) {
                                ca.event.remove(dq, dr + dw[dp], ct, bn, true);
                            }
                            continue;
                        }
                        ds = ca.event.special[dr] || {};
                        dr = (bn ? ds.delegateType : ds.bindType) || dr;
                        bt = dl[dr] || [];
                        dv = dv[2] && new RegExp("(^|\\.)" + du.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        dt = dx = bt.length;
                        while (dx--) {
                            cn = bt[dx];
                            if ((dm || dk === cn.origType) && (!ct || ct.guid === cn.guid) && (!dv || dv.test(cn.namespace)) && (!bn || bn === cn.selector || bn === "**" && cn.selector)) {
                                bt.splice(dx, 1);
                                if (cn.selector) {
                                    bt.delegateCount--;
                                }
                                if (ds.remove) {
                                    ds.remove.call(dq, cn);
                                }
                            }
                        }
                        if (dt && !bt.length) {
                            if (!ds.teardown || ds.teardown.call(dq, du, dn.handle) === false) {
                                ca.removeEvent(dq, dr, dn.handle);
                            }
                            delete dl[dr];
                        }
                    }
                    if (ca.isEmptyObject(dl)) {
                        delete dn.handle;
                        ca._removeData(dq, "events");
                    }
                },
                trigger: function (du, ct, bn, dm) {
                    var dv, cn, dt, dr, dl, dq, bt, dp = [bn || cv], ds = cd.call(du, "type") ? du.type : du, dk = cd.call(du, "namespace") ? du.namespace.split(".") : [];
                    dt = dq = bn = bn || cv;
                    if (bn.nodeType === 3 || bn.nodeType === 8) {
                        return;
                    }
                    if (cp.test(ds + ca.event.triggered)) {
                        return;
                    }
                    if (ds.indexOf(".") >= 0) {
                        dk = ds.split(".");
                        ds = dk.shift();
                        dk.sort();
                    }
                    cn = ds.indexOf(":") < 0 && "on" + ds;
                    du = du[ca.expando] ? du : new ca.Event(ds, typeof du === "object" && du);
                    du.isTrigger = dm ? 2 : 3;
                    du.namespace = dk.join(".");
                    du.namespace_re = du.namespace ? new RegExp("(^|\\.)" + dk.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                    du.result = undefined;
                    if (!du.target) {
                        du.target = bn;
                    }
                    ct = ct == null ? [du] : ca.makeArray(ct, [du]);
                    dl = ca.event.special[ds] || {};
                    if (!dm && dl.trigger && dl.trigger.apply(bn, ct) === false) {
                        return;
                    }
                    if (!dm && !dl.noBubble && !ca.isWindow(bn)) {
                        dr = dl.delegateType || ds;
                        if (!cp.test(dr + ds)) {
                            dt = dt.parentNode;
                        }
                        for (; dt; dt = dt.parentNode) {
                            dp.push(dt);
                            dq = dt;
                        }
                        if (dq === (bn.ownerDocument || cv)) {
                            dp.push(dq.defaultView || dq.parentWindow || ce);
                        }
                    }
                    bt = 0;
                    while ((dt = dp[bt++]) && !du.isPropagationStopped()) {
                        du.type = bt > 1 ? dr : dl.bindType || ds;
                        dv = (ca._data(dt, "events") || {})[du.type] && ca._data(dt, "handle");
                        if (dv) {
                            dv.apply(dt, ct);
                        }
                        dv = cn && dt[cn];
                        if (dv && dv.apply && ca.acceptData(dt)) {
                            du.result = dv.apply(dt, ct);
                            if (du.result === false) {
                                du.preventDefault();
                            }
                        }
                    }
                    du.type = ds;
                    if (!dm && !du.isDefaultPrevented()) {
                        if ((!dl._default || dl._default.apply(dp.pop(), ct) === false) && ca.acceptData(bn)) {
                            if (cn && bn[ds] && !ca.isWindow(bn)) {
                                dq = bn[cn];
                                if (dq) {
                                    bn[cn] = null;
                                }
                                ca.event.triggered = ds;
                                try {
                                    bn[ds]();
                                } catch (dn) {
                                }
                                ca.event.triggered = undefined;
                                if (dq) {
                                    bn[cn] = dq;
                                }
                            }
                        }
                    }
                    return du.result;
                },
                dispatch: function (dl) {
                    dl = ca.event.fix(dl);
                    var dp, bt, ct, dq, bn, dn = [], dm = bW.call(arguments), dk = (ca._data(this, "events") || {})[dl.type] || [], cn = ca.event.special[dl.type] || {};
                    dm[0] = dl;
                    dl.delegateTarget = this;
                    if (cn.preDispatch && cn.preDispatch.call(this, dl) === false) {
                        return;
                    }
                    dn = ca.event.handlers.call(this, dl, dk);
                    dp = 0;
                    while ((dq = dn[dp++]) && !dl.isPropagationStopped()) {
                        dl.currentTarget = dq.elem;
                        bn = 0;
                        while ((ct = dq.handlers[bn++]) && !dl.isImmediatePropagationStopped()) {
                            if (!dl.namespace_re || dl.namespace_re.test(ct.namespace)) {
                                dl.handleObj = ct;
                                dl.data = ct.data;
                                bt = ((ca.event.special[ct.origType] || {}).handle || ct.handler).apply(dq.elem, dm);
                                if (bt !== undefined) {
                                    if ((dl.result = bt) === false) {
                                        dl.preventDefault();
                                        dl.stopPropagation();
                                    }
                                }
                            }
                        }
                    }
                    if (cn.postDispatch) {
                        cn.postDispatch.call(this, dl);
                    }
                    return dl.result;
                },
                handlers: function (dk, dn) {
                    var cn, bn, ct, dp, bt = [], dm = dn.delegateCount, dl = dk.target;
                    if (dm && dl.nodeType && (!dk.button || dk.type !== "click")) {
                        for (; dl != this; dl = dl.parentNode || this) {
                            if (dl.nodeType === 1 && (dl.disabled !== true || dk.type !== "click")) {
                                ct = [];
                                for (dp = 0; dp < dm; dp++) {
                                    bn = dn[dp];
                                    cn = bn.selector + " ";
                                    if (ct[cn] === undefined) {
                                        ct[cn] = bn.needsContext ? ca(cn, this).index(dl) >= 0 : ca.find(cn, this, null, [dl]).length;
                                    }
                                    if (ct[cn]) {
                                        ct.push(bn);
                                    }
                                }
                                if (ct.length) {
                                    bt.push({elem: dl, handlers: ct});
                                }
                            }
                        }
                    }
                    if (dm < dn.length) {
                        bt.push({elem: this, handlers: dn.slice(dm)});
                    }
                    return bt;
                },
                fix: function (dk) {
                    if (dk[ca.expando]) {
                        return dk;
                    }
                    var bt, dm, ct, bn = dk.type, cn = dk, dl = this.fixHooks[bn];
                    if (!dl) {
                        this.fixHooks[bn] = dl = cQ.test(bn) ? this.mouseHooks : cA.test(bn) ? this.keyHooks : {};
                    }
                    ct = dl.props ? this.props.concat(dl.props) : this.props;
                    dk = new ca.Event(cn);
                    bt = ct.length;
                    while (bt--) {
                        dm = ct[bt];
                        dk[dm] = cn[dm];
                    }
                    if (!dk.target) {
                        dk.target = cn.srcElement || cv;
                    }
                    if (dk.target.nodeType === 3) {
                        dk.target = dk.target.parentNode;
                    }
                    dk.metaKey = !!dk.metaKey;
                    return dl.filter ? dl.filter(dk, cn) : dk;
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "), filter: function (bt, bn) {
                        if (bt.which == null) {
                            bt.which = bn.charCode != null ? bn.charCode : bn.keyCode;
                        }
                        return bt;
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function (dk, bt) {
                        var dm, ct, bn, cn = bt.button, dl = bt.fromElement;
                        if (dk.pageX == null && bt.clientX != null) {
                            ct = dk.target.ownerDocument || cv;
                            bn = ct.documentElement;
                            dm = ct.body;
                            dk.pageX = bt.clientX + (bn && bn.scrollLeft || dm && dm.scrollLeft || 0) - (bn && bn.clientLeft || dm && dm.clientLeft || 0);
                            dk.pageY = bt.clientY + (bn && bn.scrollTop || dm && dm.scrollTop || 0) - (bn && bn.clientTop || dm && dm.clientTop || 0);
                        }
                        if (!dk.relatedTarget && dl) {
                            dk.relatedTarget = dl === dk.target ? bt.toElement : dl;
                        }
                        if (!dk.which && cn !== undefined) {
                            dk.which = cn & 1 ? 1 : cn & 2 ? 3 : cn & 4 ? 2 : 0;
                        }
                        return dk;
                    }
                },
                special: {
                    load: {noBubble: true}, focus: {
                        trigger: function () {
                            if (this !== cE() && this.focus) {
                                try {
                                    this.focus();
                                    return false;
                                } catch (bn) {
                                }
                            }
                        }, delegateType: "focusin"
                    }, blur: {
                        trigger: function () {
                            if (this === cE() && this.blur) {
                                this.blur();
                                return false;
                            }
                        }, delegateType: "focusout"
                    }, click: {
                        trigger: function () {
                            if (ca.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                                this.click();
                                return false;
                            }
                        }, _default: function (bn) {
                            return ca.nodeName(bn.target, "a");
                        }
                    }, beforeunload: {
                        postDispatch: function (bn) {
                            if (bn.result !== undefined && bn.originalEvent) {
                                bn.originalEvent.returnValue = bn.result;
                            }
                        }
                    }
                },
                simulate: function (ct, bt, dk, cn) {
                    var bn = ca.extend(new ca.Event, dk, {type: ct, isSimulated: true, originalEvent: {}});
                    if (cn) {
                        ca.event.trigger(bn, null, bt);
                    } else {
                        ca.event.dispatch.call(bt, bn);
                    }
                    if (bn.isDefaultPrevented()) {
                        dk.preventDefault();
                    }
                }
            };
            ca.removeEvent = cv.removeEventListener ? function (bt, bn, cn) {
                    if (bt.removeEventListener) {
                        bt.removeEventListener(bn, cn, false);
                    }
                } : function (cn, bn, ct) {
                    var bt = "on" + bn;
                    if (cn.detachEvent) {
                        if (typeof cn[bt] === cX) {
                            cn[bt] = null;
                        }
                        cn.detachEvent(bt, ct);
                    }
                };
            ca.Event = function (bt, bn) {
                if (!(this instanceof ca.Event)) {
                    return new ca.Event(bt, bn);
                }
                if (bt && bt.type) {
                    this.originalEvent = bt;
                    this.type = bt.type;
                    this.isDefaultPrevented = bt.defaultPrevented || bt.defaultPrevented === undefined && bt.returnValue === false ? bv : a3;
                } else {
                    this.type = bt;
                }
                if (bn) {
                    ca.extend(this, bn);
                }
                this.timeStamp = bt && bt.timeStamp || ca.now();
                this[ca.expando] = true;
            };
            ca.Event.prototype = {
                isDefaultPrevented: a3,
                isPropagationStopped: a3,
                isImmediatePropagationStopped: a3,
                preventDefault: function () {
                    var bn = this.originalEvent;
                    this.isDefaultPrevented = bv;
                    if (!bn) {
                        return;
                    }
                    if (bn.preventDefault) {
                        bn.preventDefault();
                    } else {
                        bn.returnValue = false;
                    }
                },
                stopPropagation: function () {
                    var bn = this.originalEvent;
                    this.isPropagationStopped = bv;
                    if (!bn) {
                        return;
                    }
                    if (bn.stopPropagation) {
                        bn.stopPropagation();
                    }
                    bn.cancelBubble = true;
                },
                stopImmediatePropagation: function () {
                    var bn = this.originalEvent;
                    this.isImmediatePropagationStopped = bv;
                    if (bn && bn.stopImmediatePropagation) {
                        bn.stopImmediatePropagation();
                    }
                    this.stopPropagation();
                }
            };
            ca.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function (bt, bn) {
                ca.event.special[bt] = {
                    delegateType: bn, bindType: bn, handle: function (dl) {
                        var dm, dk = this, cn = dl.relatedTarget, ct = dl.handleObj;
                        if (!cn || cn !== dk && !ca.contains(dk, cn)) {
                            dl.type = ct.origType;
                            dm = ct.handler.apply(this, arguments);
                            dl.type = bn;
                        }
                        return dm;
                    }
                };
            });
            if (!b5.submitBubbles) {
                ca.event.special.submit = {
                    setup: function () {
                        if (ca.nodeName(this, "form")) {
                            return false;
                        }
                        ca.event.add(this, "click._submit keypress._submit", function (bt) {
                            var bn = bt.target, cn = ca.nodeName(bn, "input") || ca.nodeName(bn, "button") ? bn.form : undefined;
                            if (cn && !ca._data(cn, "submitBubbles")) {
                                ca.event.add(cn, "submit._submit", function (ct) {
                                    ct._submit_bubble = true;
                                });
                                ca._data(cn, "submitBubbles", true);
                            }
                        });
                    }, postDispatch: function (bn) {
                        if (bn._submit_bubble) {
                            delete bn._submit_bubble;
                            if (this.parentNode && !bn.isTrigger) {
                                ca.event.simulate("submit", this.parentNode, bn, true);
                            }
                        }
                    }, teardown: function () {
                        if (ca.nodeName(this, "form")) {
                            return false;
                        }
                        ca.event.remove(this, "._submit");
                    }
                };
            }
            if (!b5.changeBubbles) {
                ca.event.special.change = {
                    setup: function () {
                        if (cK.test(this.nodeName)) {
                            if (this.type === "checkbox" || this.type === "radio") {
                                ca.event.add(this, "propertychange._change", function (bn) {
                                    if (bn.originalEvent.propertyName === "checked") {
                                        this._just_changed = true;
                                    }
                                });
                                ca.event.add(this, "click._change", function (bn) {
                                    if (this._just_changed && !bn.isTrigger) {
                                        this._just_changed = false;
                                    }
                                    ca.event.simulate("change", this, bn, true);
                                });
                            }
                            return false;
                        }
                        ca.event.add(this, "beforeactivate._change", function (bt) {
                            var bn = bt.target;
                            if (cK.test(bn.nodeName) && !ca._data(bn, "changeBubbles")) {
                                ca.event.add(bn, "change._change", function (cn) {
                                    if (this.parentNode && !cn.isSimulated && !cn.isTrigger) {
                                        ca.event.simulate("change", this.parentNode, cn, true);
                                    }
                                });
                                ca._data(bn, "changeBubbles", true);
                            }
                        });
                    }, handle: function (bt) {
                        var bn = bt.target;
                        if (this !== bn || bt.isSimulated || bt.isTrigger || bn.type !== "radio" && bn.type !== "checkbox") {
                            return bt.handleObj.handler.apply(this, arguments);
                        }
                    }, teardown: function () {
                        ca.event.remove(this, "._change");
                        return !cK.test(this.nodeName);
                    }
                };
            }
            if (!b5.focusinBubbles) {
                ca.each({focus: "focusin", blur: "focusout"}, function (bt, bn) {
                    var cn = function (ct) {
                        ca.event.simulate(bn, ct.target, ca.event.fix(ct), true);
                    };
                    ca.event.special[bn] = {
                        setup: function () {
                            var dk = this.ownerDocument || this, ct = ca._data(dk, bn);
                            if (!ct) {
                                dk.addEventListener(bt, cn, true);
                            }
                            ca._data(dk, bn, (ct || 0) + 1);
                        }, teardown: function () {
                            var dk = this.ownerDocument || this, ct = ca._data(dk, bn) - 1;
                            if (!ct) {
                                dk.removeEventListener(bt, cn, true);
                                ca._removeData(dk, bn);
                            } else {
                                ca._data(dk, bn, ct);
                            }
                        }
                    };
                });
            }
            ca.fn.extend({
                on: function (dk, bt, dm, ct, bn) {
                    var cn, dl;
                    if (typeof dk === "object") {
                        if (typeof bt !== "string") {
                            dm = dm || bt;
                            bt = undefined;
                        }
                        for (cn in dk) {
                            this.on(cn, bt, dm, dk[cn], bn);
                        }
                        return this;
                    }
                    if (dm == null && ct == null) {
                        ct = bt;
                        dm = bt = undefined;
                    } else {
                        if (ct == null) {
                            if (typeof bt === "string") {
                                ct = dm;
                                dm = undefined;
                            } else {
                                ct = dm;
                                dm = bt;
                                bt = undefined;
                            }
                        }
                    }
                    if (ct === false) {
                        ct = a3;
                    } else {
                        if (!ct) {
                            return this;
                        }
                    }
                    if (bn === 1) {
                        dl = ct;
                        ct = function (dn) {
                            ca().off(dn);
                            return dl.apply(this, arguments);
                        };
                        ct.guid = dl.guid || (dl.guid = ca.guid++);
                    }
                    return this.each(function () {
                        ca.event.add(this, dk, ct, dm, bt);
                    });
                }, one: function (cn, bn, ct, bt) {
                    return this.on(cn, bn, ct, bt, 1);
                }, off: function (ct, bt, dk) {
                    var cn, bn;
                    if (ct && ct.preventDefault && ct.handleObj) {
                        cn = ct.handleObj;
                        ca(ct.delegateTarget).off(cn.namespace ? cn.origType + "." + cn.namespace : cn.origType, cn.selector, cn.handler);
                        return this;
                    }
                    if (typeof ct === "object") {
                        for (bn in ct) {
                            this.off(bn, bt, ct[bn]);
                        }
                        return this;
                    }
                    if (bt === false || typeof bt === "function") {
                        dk = bt;
                        bt = undefined;
                    }
                    if (dk === false) {
                        dk = a3;
                    }
                    return this.each(function () {
                        ca.event.remove(this, ct, dk, bt);
                    });
                }, trigger: function (bt, bn) {
                    return this.each(function () {
                        ca.event.trigger(bt, bn, this);
                    });
                }, triggerHandler: function (bt, bn) {
                    var cn = this[0];
                    if (cn) {
                        return ca.event.trigger(bt, bn, cn, true);
                    }
                }
            });
            var aR = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", bc = / jQuery\d+="(?:null|\d+)"/g, b2 = new RegExp("<(?:" + aR + ")[\\s/>]", "i"), aV = /^\s+/, c1 = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bj = /<([\w:]+)/, dd = /<tbody/i, bO = /<|&#?\w+;/, aZ = /<(?:script|style|link)/i, bH = /checked\s*(?:[^=]|=\s*.checked.)/i, bE = /^$|\/(?:java|ecma)script/i, aN = /^true\/(.*)/, c4 = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, a8 = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: b5.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            }, c8 = bo(cv), co = c8.appendChild(cv.createElement("div"));
            a8.optgroup = a8.option;
            a8.tbody = a8.tfoot = a8.colgroup = a8.caption = a8.thead;
            a8.th = a8.td;
            ca.extend({
                clone: function (dk, dn, cn) {
                    var bn, ct, dp, bt, dm, dl = ca.contains(dk.ownerDocument, dk);
                    if (b5.html5Clone || ca.isXMLDoc(dk) || !b2.test("<" + dk.nodeName + ">")) {
                        dp = dk.cloneNode(true);
                    } else {
                        co.innerHTML = dk.outerHTML;
                        co.removeChild(dp = co.firstChild);
                    }
                    if ((!b5.noCloneEvent || !b5.noCloneChecked) && (dk.nodeType === 1 || dk.nodeType === 11) && !ca.isXMLDoc(dk)) {
                        bn = aF(dp);
                        dm = aF(dk);
                        for (bt = 0; (ct = dm[bt]) != null; ++bt) {
                            if (bn[bt]) {
                                aB(ct, bn[bt]);
                            }
                        }
                    }
                    if (dn) {
                        if (cn) {
                            dm = dm || aF(dk);
                            bn = bn || aF(dp);
                            for (bt = 0; (ct = dm[bt]) != null; bt++) {
                                aY(ct, bn[bt]);
                            }
                        } else {
                            aY(dk, dp);
                        }
                    }
                    bn = aF(dp, "script");
                    if (bn.length > 0) {
                        bb(bn, !dl && aF(dk, "script"));
                    }
                    bn = dm = ct = null;
                    return dp;
                }, buildFragment: function (dn, du, ct, bn) {
                    var dl, dv, cn, dt, dr, dm, dq, bt = dn.length, dp = bo(du), ds = [], dk = 0;
                    for (; dk < bt; dk++) {
                        dv = dn[dk];
                        if (dv || dv === 0) {
                            if (ca.type(dv) === "object") {
                                ca.merge(ds, dv.nodeType ? [dv] : dv);
                            } else {
                                if (!bO.test(dv)) {
                                    ds.push(du.createTextNode(dv));
                                } else {
                                    dt = dt || dp.appendChild(du.createElement("div"));
                                    dr = (bj.exec(dv) || ["", ""])[1].toLowerCase();
                                    dq = a8[dr] || a8._default;
                                    dt.innerHTML = dq[1] + dv.replace(c1, "<$1></$2>") + dq[2];
                                    dl = dq[0];
                                    while (dl--) {
                                        dt = dt.lastChild;
                                    }
                                    if (!b5.leadingWhitespace && aV.test(dv)) {
                                        ds.push(du.createTextNode(aV.exec(dv)[0]));
                                    }
                                    if (!b5.tbody) {
                                        dv = dr === "table" && !dd.test(dv) ? dt.firstChild : dq[1] === "<table>" && !dd.test(dv) ? dt : 0;
                                        dl = dv && dv.childNodes.length;
                                        while (dl--) {
                                            if (ca.nodeName(dm = dv.childNodes[dl], "tbody") && !dm.childNodes.length) {
                                                dv.removeChild(dm);
                                            }
                                        }
                                    }
                                    ca.merge(ds, dt.childNodes);
                                    dt.textContent = "";
                                    while (dt.firstChild) {
                                        dt.removeChild(dt.firstChild);
                                    }
                                    dt = dp.lastChild;
                                }
                            }
                        }
                    }
                    if (dt) {
                        dp.removeChild(dt);
                    }
                    if (!b5.appendChecked) {
                        ca.grep(aF(ds, "input"), aI);
                    }
                    dk = 0;
                    while (dv = ds[dk++]) {
                        if (bn && ca.inArray(dv, bn) !== -1) {
                            continue;
                        }
                        cn = ca.contains(dv.ownerDocument, dv);
                        dt = aF(dp.appendChild(dv), "script");
                        if (cn) {
                            bb(dt);
                        }
                        if (ct) {
                            dl = 0;
                            while (dv = dt[dl++]) {
                                if (bE.test(dv.type || "")) {
                                    ct.push(dv);
                                }
                            }
                        }
                    }
                    dt = null;
                    return dp;
                }, cleanData: function (dl, dq) {
                    var bn, ct, dr, cn, dp = 0, dn = ca.expando, dk = ca.cache, dm = b5.deleteExpando, bt = ca.event.special;
                    for (; (bn = dl[dp]) != null; dp++) {
                        if (dq || ca.acceptData(bn)) {
                            dr = bn[dn];
                            cn = dr && dk[dr];
                            if (cn) {
                                if (cn.events) {
                                    for (ct in cn.events) {
                                        if (bt[ct]) {
                                            ca.event.remove(bn, ct);
                                        } else {
                                            ca.removeEvent(bn, ct, cn.handle);
                                        }
                                    }
                                }
                                if (dk[dr]) {
                                    delete dk[dr];
                                    if (dm) {
                                        delete bn[dn];
                                    } else {
                                        if (typeof bn.removeAttribute !== cX) {
                                            bn.removeAttribute(dn);
                                        } else {
                                            bn[dn] = null;
                                        }
                                    }
                                    b1.push(dr);
                                }
                            }
                        }
                    }
                }
            });
            ca.fn.extend({
                text: function (bn) {
                    return c9(this, function (bt) {
                        return bt === undefined ? ca.text(this) : this.empty().append((this[0] && this[0].ownerDocument || cv).createTextNode(bt));
                    }, null, bn, arguments.length);
                }, append: function () {
                    return this.domManip(arguments, function (bt) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var bn = dg(this, bt);
                            bn.appendChild(bt);
                        }
                    });
                }, prepend: function () {
                    return this.domManip(arguments, function (bt) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var bn = dg(this, bt);
                            bn.insertBefore(bt, bn.firstChild);
                        }
                    });
                }, before: function () {
                    return this.domManip(arguments, function (bn) {
                        if (this.parentNode) {
                            this.parentNode.insertBefore(bn, this);
                        }
                    });
                }, after: function () {
                    return this.domManip(arguments, function (bn) {
                        if (this.parentNode) {
                            this.parentNode.insertBefore(bn, this.nextSibling);
                        }
                    });
                }, remove: function (ct, bt) {
                    var dk, cn = ct ? ca.filter(ct, this) : this, bn = 0;
                    for (; (dk = cn[bn]) != null; bn++) {
                        if (!bt && dk.nodeType === 1) {
                            ca.cleanData(aF(dk));
                        }
                        if (dk.parentNode) {
                            if (bt && ca.contains(dk.ownerDocument, dk)) {
                                bb(aF(dk, "script"));
                            }
                            dk.parentNode.removeChild(dk);
                        }
                    }
                    return this;
                }, empty: function () {
                    var bt, bn = 0;
                    for (; (bt = this[bn]) != null; bn++) {
                        if (bt.nodeType === 1) {
                            ca.cleanData(aF(bt, false));
                        }
                        while (bt.firstChild) {
                            bt.removeChild(bt.firstChild);
                        }
                        if (bt.options && ca.nodeName(bt, "select")) {
                            bt.options.length = 0;
                        }
                    }
                    return this;
                }, clone: function (bt, bn) {
                    bt = bt == null ? false : bt;
                    bn = bn == null ? bt : bn;
                    return this.map(function () {
                        return ca.clone(this, bt, bn);
                    });
                }, html: function (bn) {
                    return c9(this, function (dk) {
                        var cn = this[0] || {}, dl = 0, ct = this.length;
                        if (dk === undefined) {
                            return cn.nodeType === 1 ? cn.innerHTML.replace(bc, "") : undefined;
                        }
                        if (typeof dk === "string" && !aZ.test(dk) && (b5.htmlSerialize || !b2.test(dk)) && (b5.leadingWhitespace || !aV.test(dk)) && !a8[(bj.exec(dk) || ["", ""])[1].toLowerCase()]) {
                            dk = dk.replace(c1, "<$1></$2>");
                            try {
                                for (; dl < ct; dl++) {
                                    cn = this[dl] || {};
                                    if (cn.nodeType === 1) {
                                        ca.cleanData(aF(cn, false));
                                        cn.innerHTML = dk;
                                    }
                                }
                                cn = 0;
                            } catch (bt) {
                            }
                        }
                        if (cn) {
                            this.empty().append(dk);
                        }
                    }, null, bn, arguments.length);
                }, replaceWith: function () {
                    var bn = arguments[0];
                    this.domManip(arguments, function (bt) {
                        bn = this.parentNode;
                        ca.cleanData(aF(this));
                        if (bn) {
                            bn.replaceChild(bt, this);
                        }
                    });
                    return bn && (bn.length || bn.nodeType) ? this : this.remove();
                }, detach: function (bn) {
                    return this.remove(bn, true);
                }, domManip: function (dm, dt) {
                    dm = b9.apply([], dm);
                    var ct, bn, du, cn, ds, dq, dl = 0, dp = this.length, bt = this, dn = dp - 1, dr = dm[0], dk = ca.isFunction(dr);
                    if (dk || dp > 1 && typeof dr === "string" && !b5.checkClone && bH.test(dr)) {
                        return this.each(function (dw) {
                            var dv = bt.eq(dw);
                            if (dk) {
                                dm[0] = dr.call(this, dw, dv.html());
                            }
                            dv.domManip(dm, dt);
                        });
                    }
                    if (dp) {
                        dq = ca.buildFragment(dm, this[0].ownerDocument, false, this);
                        ct = dq.firstChild;
                        if (dq.childNodes.length === 1) {
                            dq = ct;
                        }
                        if (ct) {
                            cn = ca.map(aF(dq, "script"), dh);
                            du = cn.length;
                            for (; dl < dp; dl++) {
                                bn = dq;
                                if (dl !== dn) {
                                    bn = ca.clone(bn, true, true);
                                    if (du) {
                                        ca.merge(cn, aF(bn, "script"));
                                    }
                                }
                                dt.call(this[dl], bn, dl);
                            }
                            if (du) {
                                ds = cn[cn.length - 1].ownerDocument;
                                ca.map(cn, c7);
                                for (dl = 0; dl < du; dl++) {
                                    bn = cn[dl];
                                    if (bE.test(bn.type || "") && !ca._data(bn, "globalEval") && ca.contains(ds, bn)) {
                                        if (bn.src) {
                                            if (ca._evalUrl) {
                                                ca._evalUrl(bn.src);
                                            }
                                        } else {
                                            ca.globalEval((bn.text || bn.textContent || bn.innerHTML || "").replace(c4, ""));
                                        }
                                    }
                                }
                            }
                            dq = ct = null;
                        }
                    }
                    return this;
                }
            });
            ca.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (bt, bn) {
                ca.fn[bt] = function (dl) {
                    var dn, dk = 0, ct = [], dm = ca(dl), cn = dm.length - 1;
                    for (; dk <= cn; dk++) {
                        dn = dk === cn ? this : this.clone(true);
                        ca(dm[dk])[bn](dn);
                        bU.apply(ct, dn.get());
                    }
                    return this.pushStack(ct);
                };
            });
            var by, bi = {};
            (function () {
                var bn;
                b5.shrinkWrapBlocks = function () {
                    if (bn != null) {
                        return bn;
                    }
                    bn = false;
                    var bt, ct, cn;
                    ct = cv.getElementsByTagName("body")[0];
                    if (!ct || !ct.style) {
                        return;
                    }
                    bt = cv.createElement("div");
                    cn = cv.createElement("div");
                    cn.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                    ct.appendChild(cn).appendChild(bt);
                    if (typeof bt.style.zoom !== cX) {
                        bt.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;" + "padding:1px;width:1px;zoom:1";
                        bt.appendChild(cv.createElement("div")).style.width = "5px";
                        bn = bt.offsetWidth !== 3;
                    }
                    ct.removeChild(cn);
                    return bn;
                };
            })();
            var ay = /^margin/;
            var aQ = new RegExp("^(" + cr + ")(?!px)[a-z%]+$", "i");
            var aU, c3, a7 = /^(top|right|bottom|left)$/;
            if (ce.getComputedStyle) {
                aU = function (bn) {
                    return bn.ownerDocument.defaultView.getComputedStyle(bn, null);
                };
                c3 = function (dl, cn, dn) {
                    var dk, bt, ct, dm, bn = dl.style;
                    dn = dn || aU(dl);
                    dm = dn ? dn.getPropertyValue(cn) || dn[cn] : undefined;
                    if (dn) {
                        if (dm === "" && !ca.contains(dl.ownerDocument, dl)) {
                            dm = ca.style(dl, cn);
                        }
                        if (aQ.test(dm) && ay.test(cn)) {
                            dk = bn.width;
                            bt = bn.minWidth;
                            ct = bn.maxWidth;
                            bn.minWidth = bn.maxWidth = bn.width = dm;
                            dm = dn.width;
                            bn.width = dk;
                            bn.minWidth = bt;
                            bn.maxWidth = ct;
                        }
                    }
                    return dm === undefined ? dm : dm + "";
                };
            } else {
                if (cv.documentElement.currentStyle) {
                    aU = function (bn) {
                        return bn.currentStyle;
                    };
                    c3 = function (dl, cn, dn) {
                        var dk, bt, ct, dm, bn = dl.style;
                        dn = dn || aU(dl);
                        dm = dn ? dn[cn] : undefined;
                        if (dm == null && bn && bn[cn]) {
                            dm = bn[cn];
                        }
                        if (aQ.test(dm) && !a7.test(cn)) {
                            dk = bn.left;
                            bt = dl.runtimeStyle;
                            ct = bt && bt.left;
                            if (ct) {
                                bt.left = dl.currentStyle.left;
                            }
                            bn.left = cn === "fontSize" ? "1em" : dm;
                            dm = bn.pixelLeft + "px";
                            bn.left = dk;
                            if (ct) {
                                bt.left = ct;
                            }
                        }
                        return dm === undefined ? dm : dm + "" || "auto";
                    };
                }
            }
            (function () {
                function bn() {
                    var dq, ds, dr, dp;
                    ds = cv.getElementsByTagName("body")[0];
                    if (!ds || !ds.style) {
                        return;
                    }
                    dq = cv.createElement("div");
                    dr = cv.createElement("div");
                    dr.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                    ds.appendChild(dr).appendChild(dq);
                    dq.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
                    cn = dk = false;
                    bt = true;
                    if (ce.getComputedStyle) {
                        cn = (ce.getComputedStyle(dq, null) || {}).top !== "1%";
                        dk = (ce.getComputedStyle(dq, null) || {width: "4px"}).width === "4px";
                        dp = dq.appendChild(cv.createElement("div"));
                        dp.style.cssText = dq.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                        dp.style.marginRight = dp.style.width = "0";
                        dq.style.width = "1px";
                        bt = !parseFloat((ce.getComputedStyle(dp, null) || {}).marginRight);
                    }
                    dq.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                    dp = dq.getElementsByTagName("td");
                    dp[0].style.cssText = "margin:0;border:0;padding:0;display:none";
                    dm = dp[0].offsetHeight === 0;
                    if (dm) {
                        dp[0].style.display = "";
                        dp[1].style.display = "none";
                        dm = dp[0].offsetHeight === 0;
                    }
                    ds.removeChild(dr);
                }

                var ct, dn, dl, cn, dk, dm, bt;
                ct = cv.createElement("div");
                ct.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                dl = ct.getElementsByTagName("a")[0];
                dn = dl && dl.style;
                if (!dn) {
                    return;
                }
                dn.cssText = "float:left;opacity:.5";
                b5.opacity = dn.opacity === "0.5";
                b5.cssFloat = !!dn.cssFloat;
                ct.style.backgroundClip = "content-box";
                ct.cloneNode(true).style.backgroundClip = "";
                b5.clearCloneStyle = ct.style.backgroundClip === "content-box";
                b5.boxSizing = dn.boxSizing === "" || dn.MozBoxSizing === "" || dn.WebkitBoxSizing === "";
                ca.extend(b5, {
                    reliableHiddenOffsets: function () {
                        if (dm == null) {
                            bn();
                        }
                        return dm;
                    }, boxSizingReliable: function () {
                        if (dk == null) {
                            bn();
                        }
                        return dk;
                    }, pixelPosition: function () {
                        if (cn == null) {
                            bn();
                        }
                        return cn;
                    }, reliableMarginRight: function () {
                        if (bt == null) {
                            bn();
                        }
                        return bt;
                    }
                });
            })();
            ca.swap = function (dk, bt, dm, ct) {
                var bn, cn, dl = {};
                for (cn in bt) {
                    dl[cn] = dk.style[cn];
                    dk.style[cn] = bt[cn];
                }
                bn = dm.apply(dk, ct || []);
                for (cn in bt) {
                    dk.style[cn] = dl[cn];
                }
                return bn;
            };
            var aA = /alpha\([^)]*\)/i, cB = /opacity\s*=\s*([^)]*)/, bz = /^(none|table(?!-c[ea]).+)/, aE = new RegExp("^(" + cr + ")(.*)$", "i"), cS = new RegExp("^([+-])=(" + cr + ")", "i"), cV = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }, bK = {letterSpacing: "0", fontWeight: "400"}, bC = ["Webkit", "O", "Moz", "ms"];
            ca.extend({
                cssHooks: {
                    opacity: {
                        get: function (bt, bn) {
                            if (bn) {
                                var cn = c3(bt, "opacity");
                                return cn === "" ? "1" : cn;
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: true,
                    fillOpacity: true,
                    flexGrow: true,
                    flexShrink: true,
                    fontWeight: true,
                    lineHeight: true,
                    opacity: true,
                    order: true,
                    orphans: true,
                    widows: true,
                    zIndex: true,
                    zoom: true
                },
                cssProps: {"float": b5.cssFloat ? "cssFloat" : "styleFloat"},
                style: function (dl, dp, cn, bn) {
                    if (!dl || dl.nodeType === 3 || dl.nodeType === 8 || !dl.style) {
                        return;
                    }
                    var ct, dq, bt, dn = ca.camelCase(dp), dm = dl.style;
                    dp = ca.cssProps[dn] || (ca.cssProps[dn] = cf(dm, dn));
                    bt = ca.cssHooks[dp] || ca.cssHooks[dn];
                    if (cn !== undefined) {
                        dq = typeof cn;
                        if (dq === "string" && (ct = cS.exec(cn))) {
                            cn = (ct[1] + 1) * ct[2] + parseFloat(ca.css(dl, dp));
                            dq = "number";
                        }
                        if (cn == null || cn !== cn) {
                            return;
                        }
                        if (dq === "number" && !ca.cssNumber[dn]) {
                            cn += "px";
                        }
                        if (!b5.clearCloneStyle && cn === "" && dp.indexOf("background") === 0) {
                            dm[dp] = "inherit";
                        }
                        if (!bt || !("set" in bt) || (cn = bt.set(dl, cn, bn)) !== undefined) {
                            try {
                                dm[dp] = cn;
                            } catch (dk) {
                            }
                        }
                    } else {
                        if (bt && "get" in bt && (ct = bt.get(dl, false, bn)) !== undefined) {
                            return ct;
                        }
                        return dm[dp];
                    }
                },
                css: function (dl, cn, dn, dk) {
                    var bt, ct, dm, bn = ca.camelCase(cn);
                    cn = ca.cssProps[bn] || (ca.cssProps[bn] = cf(dl.style, bn));
                    dm = ca.cssHooks[cn] || ca.cssHooks[bn];
                    if (dm && "get" in dm) {
                        ct = dm.get(dl, true, dn);
                    }
                    if (ct === undefined) {
                        ct = c3(dl, cn, dk);
                    }
                    if (ct === "normal" && cn in bK) {
                        ct = bK[cn];
                    }
                    if (dn === "" || dn) {
                        bt = parseFloat(ct);
                        return dn === true || ca.isNumeric(bt) ? bt || 0 : ct;
                    }
                    return ct;
                }
            });
            ca.each(["height", "width"], function (bt, bn) {
                ca.cssHooks[bn] = {
                    get: function (ct, dk, cn) {
                        if (dk) {
                            return bz.test(ca.css(ct, "display")) && ct.offsetWidth === 0 ? ca.swap(ct, cV, function () {
                                    return aM(ct, bn, cn);
                                }) : aM(ct, bn, cn);
                        }
                    }, set: function (dk, dl, ct) {
                        var cn = ct && aU(dk);
                        return bZ(dk, dl, ct ? bG(dk, bn, ct, b5.boxSizing && ca.css(dk, "boxSizing", false, cn) === "border-box", cn) : 0);
                    }
                };
            });
            if (!b5.opacity) {
                ca.cssHooks.opacity = {
                    get: function (bt, bn) {
                        return cB.test((bn && bt.currentStyle ? bt.currentStyle.filter : bt.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : bn ? "1" : "";
                    }, set: function (dk, bt) {
                        var dl = dk.style, ct = dk.currentStyle, bn = ca.isNumeric(bt) ? "alpha(opacity=" + bt * 100 + ")" : "", cn = ct && ct.filter || dl.filter || "";
                        dl.zoom = 1;
                        if ((bt >= 1 || bt === "") && ca.trim(cn.replace(aA, "")) === "" && dl.removeAttribute) {
                            dl.removeAttribute("filter");
                            if (bt === "" || ct && !ct.filter) {
                                return;
                            }
                        }
                        dl.filter = aA.test(cn) ? cn.replace(aA, bn) : cn + " " + bn;
                    }
                };
            }
            ca.cssHooks.marginRight = aJ(b5.reliableMarginRight, function (bt, bn) {
                if (bn) {
                    return ca.swap(bt, {display: "inline-block"}, c3, [bt, "marginRight"]);
                }
            });
            ca.each({margin: "", padding: "", border: "Width"}, function (bt, bn) {
                ca.cssHooks[bt + bn] = {
                    expand: function (dl) {
                        var dk = 0, cn = {}, ct = typeof dl === "string" ? dl.split(" ") : [dl];
                        for (; dk < 4; dk++) {
                            cn[bt + cq[dk] + bn] = ct[dk] || ct[dk - 2] || ct[0];
                        }
                        return cn;
                    }
                };
                if (!ay.test(bt)) {
                    ca.cssHooks[bt + bn].set = bZ;
                }
            });
            ca.fn.extend({
                css: function (bt, bn) {
                    return c9(this, function (dm, ct, dp) {
                        var dl, cn, dk = {}, dn = 0;
                        if (ca.isArray(ct)) {
                            dl = aU(dm);
                            cn = ct.length;
                            for (; dn < cn; dn++) {
                                dk[ct[dn]] = ca.css(dm, ct[dn], false, dl);
                            }
                            return dk;
                        }
                        return dp !== undefined ? ca.style(dm, ct, dp) : ca.css(dm, ct);
                    }, bt, bn, arguments.length > 1);
                }, show: function () {
                    return cy(this, true);
                }, hide: function () {
                    return cy(this);
                }, toggle: function (bn) {
                    if (typeof bn === "boolean") {
                        return bn ? this.show() : this.hide();
                    }
                    return this.each(function () {
                        if (cs(this)) {
                            ca(this).show();
                        } else {
                            ca(this).hide();
                        }
                    });
                }
            });
            ca.Tween = dc;
            dc.prototype = {
                constructor: dc, init: function (dk, bt, dl, ct, bn, cn) {
                    this.elem = dk;
                    this.prop = dl;
                    this.easing = bn || "swing";
                    this.options = bt;
                    this.start = this.now = this.cur();
                    this.end = ct;
                    this.unit = cn || (ca.cssNumber[dl] ? "" : "px");
                }, cur: function () {
                    var bn = dc.propHooks[this.prop];
                    return bn && bn.get ? bn.get(this) : dc.propHooks._default.get(this);
                }, run: function (bt) {
                    var bn, cn = dc.propHooks[this.prop];
                    if (this.options.duration) {
                        this.pos = bn = ca.easing[this.easing](bt, this.options.duration * bt, 0, 1, this.options.duration);
                    } else {
                        this.pos = bn = bt;
                    }
                    this.now = (this.end - this.start) * bn + this.start;
                    if (this.options.step) {
                        this.options.step.call(this.elem, this.now, this);
                    }
                    if (cn && cn.set) {
                        cn.set(this);
                    } else {
                        dc.propHooks._default.set(this);
                    }
                    return this;
                }
            };
            dc.prototype.init.prototype = dc.prototype;
            dc.propHooks = {
                _default: {
                    get: function (bt) {
                        var bn;
                        if (bt.elem[bt.prop] != null && (!bt.elem.style || bt.elem.style[bt.prop] == null)) {
                            return bt.elem[bt.prop];
                        }
                        bn = ca.css(bt.elem, bt.prop, "");
                        return !bn || bn === "auto" ? 0 : bn;
                    }, set: function (bn) {
                        if (ca.fx.step[bn.prop]) {
                            ca.fx.step[bn.prop](bn);
                        } else {
                            if (bn.elem.style && (bn.elem.style[ca.cssProps[bn.prop]] != null || ca.cssHooks[bn.prop])) {
                                ca.style(bn.elem, bn.prop, bn.now + bn.unit);
                            } else {
                                bn.elem[bn.prop] = bn.now;
                            }
                        }
                    }
                }
            };
            dc.propHooks.scrollTop = dc.propHooks.scrollLeft = {
                set: function (bn) {
                    if (bn.elem.nodeType && bn.elem.parentNode) {
                        bn.elem[bn.prop] = bn.now;
                    }
                }
            };
            ca.easing = {
                linear: function (bn) {
                    return bn;
                }, swing: function (bn) {
                    return 0.5 - Math.cos(bn * Math.PI) / 2;
                }
            };
            ca.fx = dc.prototype.init;
            ca.fx.step = {};
            var bs, bg, bx = /^(?:toggle|show|hide)$/, a6 = new RegExp("^(?:([+-])=|)(" + cr + ")([a-z%]*)$", "i"), cO = /queueHooks$/, br = [bl], bf = {
                "*": [function (dk, dn) {
                    var cn = this.createTween(dk, dn), bn = cn.cur(), ct = a6.exec(dn), dp = ct && ct[3] || (ca.cssNumber[dk] ? "" : "px"), bt = (ca.cssNumber[dk] || dp !== "px" && +bn) && a6.exec(ca.css(cn.elem, dk)), dm = 1, dl = 20;
                    if (bt && bt[3] !== dp) {
                        dp = dp || bt[3];
                        ct = ct || [];
                        bt = +bn || 1;
                        do {
                            dm = dm || ".5";
                            bt = bt / dm;
                            ca.style(cn.elem, dk, bt + dp);
                        } while (dm !== (dm = cn.cur() / bn) && dm !== 1 && --dl);
                    }
                    if (ct) {
                        bt = cn.start = +bt || +bn || 0;
                        cn.unit = dp;
                        cn.end = ct[1] ? bt + (ct[1] + 1) * ct[2] : +ct[2];
                    }
                    return cn;
                }]
            };
            ca.Animation = ca.extend(bV, {
                tweener: function (ct, bt) {
                    if (ca.isFunction(ct)) {
                        bt = ct;
                        ct = ["*"];
                    } else {
                        ct = ct.split(" ");
                    }
                    var dk, cn = 0, bn = ct.length;
                    for (; cn < bn; cn++) {
                        dk = ct[cn];
                        bf[dk] = bf[dk] || [];
                        bf[dk].unshift(bt);
                    }
                }, prefilter: function (bt, bn) {
                    if (bn) {
                        br.unshift(bt);
                    } else {
                        br.push(bt);
                    }
                }
            });
            ca.speed = function (cn, bn, ct) {
                var bt = cn && typeof cn === "object" ? ca.extend({}, cn) : {
                        complete: ct || !ct && bn || ca.isFunction(cn) && cn,
                        duration: cn,
                        easing: ct && bn || bn && !ca.isFunction(bn) && bn
                    };
                bt.duration = ca.fx.off ? 0 : typeof bt.duration === "number" ? bt.duration : bt.duration in ca.fx.speeds ? ca.fx.speeds[bt.duration] : ca.fx.speeds._default;
                if (bt.queue == null || bt.queue === true) {
                    bt.queue = "fx";
                }
                bt.old = bt.complete;
                bt.complete = function () {
                    if (ca.isFunction(bt.old)) {
                        bt.old.call(this);
                    }
                    if (bt.queue) {
                        ca.dequeue(this, bt.queue);
                    }
                };
                return bt;
            };
            ca.fn.extend({
                fadeTo: function (cn, bn, ct, bt) {
                    return this.filter(cs).css("opacity", 0).show().end().animate({opacity: bn}, cn, ct, bt);
                }, animate: function (dk, bt, dm, ct) {
                    var bn = ca.isEmptyObject(dk), cn = ca.speed(bt, dm, ct), dl = function () {
                        var dn = bV(this, ca.extend({}, dk), cn);
                        if (bn || ca._data(this, "finish")) {
                            dn.stop(true);
                        }
                    };
                    dl.finish = dl;
                    return bn || cn.queue === false ? this.each(dl) : this.queue(cn.queue, dl);
                }, stop: function (cn, bn, ct) {
                    var bt = function (dl) {
                        var dk = dl.stop;
                        delete dl.stop;
                        dk(ct);
                    };
                    if (typeof cn !== "string") {
                        ct = bn;
                        bn = cn;
                        cn = undefined;
                    }
                    if (bn && cn !== false) {
                        this.queue(cn || "fx", []);
                    }
                    return this.each(function () {
                        var dl = true, dk = cn != null && cn + "queueHooks", dm = ca.timers, dn = ca._data(this);
                        if (dk) {
                            if (dn[dk] && dn[dk].stop) {
                                bt(dn[dk]);
                            }
                        } else {
                            for (dk in dn) {
                                if (dn[dk] && dn[dk].stop && cO.test(dk)) {
                                    bt(dn[dk]);
                                }
                            }
                        }
                        for (dk = dm.length; dk--;) {
                            if (dm[dk].elem === this && (cn == null || dm[dk].queue === cn)) {
                                dm[dk].anim.stop(ct);
                                dl = false;
                                dm.splice(dk, 1);
                            }
                        }
                        if (dl || !ct) {
                            ca.dequeue(this, cn);
                        }
                    });
                }, finish: function (bn) {
                    if (bn !== false) {
                        bn = bn || "fx";
                    }
                    return this.each(function () {
                        var cn, dm = ca._data(this), dk = dm[bn + "queue"], bt = dm[bn + "queueHooks"], ct = ca.timers, dl = dk ? dk.length : 0;
                        dm.finish = true;
                        ca.queue(this, bn, []);
                        if (bt && bt.stop) {
                            bt.stop.call(this, true);
                        }
                        for (cn = ct.length; cn--;) {
                            if (ct[cn].elem === this && ct[cn].queue === bn) {
                                ct[cn].anim.stop(true);
                                ct.splice(cn, 1);
                            }
                        }
                        for (cn = 0; cn < dl; cn++) {
                            if (dk[cn] && dk[cn].finish) {
                                dk[cn].finish.call(this);
                            }
                        }
                        delete dm.finish;
                    });
                }
            });
            ca.each(["toggle", "show", "hide"], function (bt, bn) {
                var cn = ca.fn[bn];
                ca.fn[bn] = function (dl, dk, ct) {
                    return dl == null || typeof dl === "boolean" ? cn.apply(this, arguments) : this.animate(aX(bn, true), dl, dk, ct);
                };
            });
            ca.each({
                slideDown: aX("show"),
                slideUp: aX("hide"),
                slideToggle: aX("toggle"),
                fadeIn: {opacity: "show"},
                fadeOut: {opacity: "hide"},
                fadeToggle: {opacity: "toggle"}
            }, function (bt, bn) {
                ca.fn[bt] = function (ct, dk, cn) {
                    return this.animate(bn, ct, dk, cn);
                };
            });
            ca.timers = [];
            ca.fx.tick = function () {
                var bt, bn = ca.timers, cn = 0;
                bs = ca.now();
                for (; cn < bn.length; cn++) {
                    bt = bn[cn];
                    if (!bt() && bn[cn] === bt) {
                        bn.splice(cn--, 1);
                    }
                }
                if (!bn.length) {
                    ca.fx.stop();
                }
                bs = undefined;
            };
            ca.fx.timer = function (bn) {
                ca.timers.push(bn);
                if (bn()) {
                    ca.fx.start();
                } else {
                    ca.timers.pop();
                }
            };
            ca.fx.interval = 13;
            ca.fx.start = function () {
                if (!bg) {
                    bg = setInterval(ca.fx.tick, ca.fx.interval);
                }
            };
            ca.fx.stop = function () {
                clearInterval(bg);
                bg = null;
            };
            ca.fx.speeds = {slow: 600, fast: 200, _default: 400};
            ca.fn.delay = function (bt, bn) {
                bt = ca.fx ? ca.fx.speeds[bt] || bt : bt;
                bn = bn || "fx";
                return this.queue(bn, function (cn, dk) {
                    var ct = setTimeout(cn, bt);
                    dk.stop = function () {
                        clearTimeout(ct);
                    };
                });
            };
            (function () {
                var ct, bt, dk, cn, bn;
                bt = cv.createElement("div");
                bt.setAttribute("className", "t");
                bt.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                cn = bt.getElementsByTagName("a")[0];
                dk = cv.createElement("select");
                bn = dk.appendChild(cv.createElement("option"));
                ct = bt.getElementsByTagName("input")[0];
                cn.style.cssText = "top:1px";
                b5.getSetAttribute = bt.className !== "t";
                b5.style = /top/.test(cn.getAttribute("style"));
                b5.hrefNormalized = cn.getAttribute("href") === "/a";
                b5.checkOn = !!ct.value;
                b5.optSelected = bn.selected;
                b5.enctype = !!cv.createElement("form").enctype;
                dk.disabled = true;
                b5.optDisabled = !bn.disabled;
                ct = cv.createElement("input");
                ct.setAttribute("value", "");
                b5.input = ct.getAttribute("value") === "";
                ct.value = "t";
                ct.setAttribute("type", "radio");
                b5.radioValue = ct.value === "t";
            })();
            var a1 = /\r/g;
            ca.fn.extend({
                val: function (ct) {
                    var bt, dk, cn, bn = this[0];
                    if (!arguments.length) {
                        if (bn) {
                            bt = ca.valHooks[bn.type] || ca.valHooks[bn.nodeName.toLowerCase()];
                            if (bt && "get" in bt && (dk = bt.get(bn, "value")) !== undefined) {
                                return dk;
                            }
                            dk = bn.value;
                            return typeof dk === "string" ? dk.replace(a1, "") : dk == null ? "" : dk;
                        }
                        return;
                    }
                    cn = ca.isFunction(ct);
                    return this.each(function (dm) {
                        var dl;
                        if (this.nodeType !== 1) {
                            return;
                        }
                        if (cn) {
                            dl = ct.call(this, dm, ca(this).val());
                        } else {
                            dl = ct;
                        }
                        if (dl == null) {
                            dl = "";
                        } else {
                            if (typeof dl === "number") {
                                dl += "";
                            } else {
                                if (ca.isArray(dl)) {
                                    dl = ca.map(dl, function (dn) {
                                        return dn == null ? "" : dn + "";
                                    });
                                }
                            }
                        }
                        bt = ca.valHooks[this.type] || ca.valHooks[this.nodeName.toLowerCase()];
                        if (!bt || !("set" in bt) || bt.set(this, dl, "value") === undefined) {
                            this.value = dl;
                        }
                    });
                }
            });
            ca.extend({
                valHooks: {
                    option: {
                        get: function (bt) {
                            var bn = ca.find.attr(bt, "value");
                            return bn != null ? bn : ca.trim(ca.text(bt));
                        }
                    }, select: {
                        get: function (dk) {
                            var dn, cn, bn = dk.options, ct = dk.selectedIndex, dp = dk.type === "select-one" || ct < 0, bt = dp ? null : [], dm = dp ? ct + 1 : bn.length, dl = ct < 0 ? dm : dp ? ct : 0;
                            for (; dl < dm; dl++) {
                                cn = bn[dl];
                                if ((cn.selected || dl === ct) && (b5.optDisabled ? !cn.disabled : cn.getAttribute("disabled") === null) && (!cn.parentNode.disabled || !ca.nodeName(cn.parentNode, "optgroup"))) {
                                    dn = ca(cn).val();
                                    if (dp) {
                                        return dn;
                                    }
                                    bt.push(dn);
                                }
                            }
                            return bt;
                        }, set: function (dl, cn) {
                            var dn, dk, bt = dl.options, ct = ca.makeArray(cn), dm = bt.length;
                            while (dm--) {
                                dk = bt[dm];
                                if (ca.inArray(ca.valHooks.option.get(dk), ct) >= 0) {
                                    try {
                                        dk.selected = dn = true;
                                    } catch (bn) {
                                        dk.scrollHeight;
                                    }
                                } else {
                                    dk.selected = false;
                                }
                            }
                            if (!dn) {
                                dl.selectedIndex = -1;
                            }
                            return bt;
                        }
                    }
                }
            });
            ca.each(["radio", "checkbox"], function () {
                ca.valHooks[this] = {
                    set: function (bt, bn) {
                        if (ca.isArray(bn)) {
                            return bt.checked = ca.inArray(ca(bt).val(), bn) >= 0;
                        }
                    }
                };
                if (!b5.checkOn) {
                    ca.valHooks[this].get = function (bn) {
                        return bn.getAttribute("value") === null ? "on" : bn.value;
                    };
                }
            });
            var bJ, bF, aP = ca.expr.attrHandle, c6 = /^(?:checked|selected)$/i, ba = b5.getSetAttribute, db = b5.input;
            ca.fn.extend({
                attr: function (bt, bn) {
                    return c9(this, ca.attr, bt, bn, arguments.length > 1);
                }, removeAttr: function (bn) {
                    return this.each(function () {
                        ca.removeAttr(this, bn);
                    });
                }
            });
            ca.extend({
                attr: function (dk, bt, dl) {
                    var ct, bn, cn = dk.nodeType;
                    if (!dk || cn === 3 || cn === 8 || cn === 2) {
                        return;
                    }
                    if (typeof dk.getAttribute === cX) {
                        return ca.prop(dk, bt, dl);
                    }
                    if (cn !== 1 || !ca.isXMLDoc(dk)) {
                        bt = bt.toLowerCase();
                        ct = ca.attrHooks[bt] || (ca.expr.match.bool.test(bt) ? bF : bJ);
                    }
                    if (dl !== undefined) {
                        if (dl === null) {
                            ca.removeAttr(dk, bt);
                        } else {
                            if (ct && "set" in ct && (bn = ct.set(dk, dl, bt)) !== undefined) {
                                return bn;
                            } else {
                                dk.setAttribute(bt, dl + "");
                                return dl;
                            }
                        }
                    } else {
                        if (ct && "get" in ct && (bn = ct.get(dk, bt)) !== null) {
                            return bn;
                        } else {
                            bn = ca.find.attr(dk, bt);
                            return bn == null ? undefined : bn;
                        }
                    }
                }, removeAttr: function (dk, bt) {
                    var dl, ct, bn = 0, cn = bt && bt.match(cD);
                    if (cn && dk.nodeType === 1) {
                        while (dl = cn[bn++]) {
                            ct = ca.propFix[dl] || dl;
                            if (ca.expr.match.bool.test(dl)) {
                                if (db && ba || !c6.test(dl)) {
                                    dk[ct] = false;
                                } else {
                                    dk[ca.camelCase("default-" + dl)] = dk[ct] = false;
                                }
                            } else {
                                ca.attr(dk, dl, "");
                            }
                            dk.removeAttribute(ba ? dl : ct);
                        }
                    }
                }, attrHooks: {
                    type: {
                        set: function (bt, bn) {
                            if (!b5.radioValue && bn === "radio" && ca.nodeName(bt, "input")) {
                                var cn = bt.value;
                                bt.setAttribute("type", bn);
                                if (cn) {
                                    bt.value = cn;
                                }
                                return bn;
                            }
                        }
                    }
                }
            });
            bF = {
                set: function (bt, bn, cn) {
                    if (bn === false) {
                        ca.removeAttr(bt, cn);
                    } else {
                        if (db && ba || !c6.test(cn)) {
                            bt.setAttribute(!ba && ca.propFix[cn] || cn, cn);
                        } else {
                            bt[ca.camelCase("default-" + cn)] = bt[cn] = true;
                        }
                    }
                    return cn;
                }
            };
            ca.each(ca.expr.match.bool.source.match(/\w+/g), function (bt, bn) {
                var cn = aP[bn] || ca.find.attr;
                aP[bn] = db && ba || !c6.test(bn) ? function (dn, dk, dm) {
                        var ct, dl;
                        if (!dm) {
                            dl = aP[dk];
                            aP[dk] = ct;
                            ct = cn(dn, dk, dm) != null ? dk.toLowerCase() : null;
                            aP[dk] = dl;
                        }
                        return ct;
                    } : function (dk, ct, dl) {
                        if (!dl) {
                            return dk[ca.camelCase("default-" + ct)] ? ct.toLowerCase() : null;
                        }
                    };
            });
            if (!db || !ba) {
                ca.attrHooks.value = {
                    set: function (bt, bn, cn) {
                        if (ca.nodeName(bt, "input")) {
                            bt.defaultValue = bn;
                        } else {
                            return bJ && bJ.set(bt, bn, cn);
                        }
                    }
                };
            }
            if (!ba) {
                bJ = {
                    set: function (cn, bn, ct) {
                        var bt = cn.getAttributeNode(ct);
                        if (!bt) {
                            cn.setAttributeNode(bt = cn.ownerDocument.createAttribute(ct));
                        }
                        bt.value = bn += "";
                        if (ct === "value" || bn === cn.getAttribute(ct)) {
                            return bn;
                        }
                    }
                };
                aP.id = aP.name = aP.coords = function (cn, bn, ct) {
                    var bt;
                    if (!ct) {
                        return (bt = cn.getAttributeNode(bn)) && bt.value !== "" ? bt.value : null;
                    }
                };
                ca.valHooks.button = {
                    get: function (bt, bn) {
                        var cn = bt.getAttributeNode(bn);
                        if (cn && cn.specified) {
                            return cn.value;
                        }
                    }, set: bJ.set
                };
                ca.attrHooks.contenteditable = {
                    set: function (bt, bn, cn) {
                        bJ.set(bt, bn === "" ? false : bn, cn);
                    }
                };
                ca.each(["width", "height"], function (bt, bn) {
                    ca.attrHooks[bn] = {
                        set: function (cn, ct) {
                            if (ct === "") {
                                cn.setAttribute(bn, "auto");
                                return ct;
                            }
                        }
                    };
                });
            }
            if (!b5.style) {
                ca.attrHooks.style = {
                    get: function (bn) {
                        return bn.style.cssText || undefined;
                    }, set: function (bt, bn) {
                        return bt.style.cssText = bn + "";
                    }
                };
            }
            var cw = /^(?:input|select|textarea|button|object)$/i, aH = /^(?:a|area)$/i;
            ca.fn.extend({
                prop: function (bt, bn) {
                    return c9(this, ca.prop, bt, bn, arguments.length > 1);
                }, removeProp: function (bn) {
                    bn = ca.propFix[bn] || bn;
                    return this.each(function () {
                        try {
                            this[bn] = undefined;
                            delete this[bn];
                        } catch (bt) {
                        }
                    });
                }
            });
            ca.extend({
                propFix: {"for": "htmlFor", "class": "className"}, prop: function (dk, bt, dm) {
                    var ct, bn, cn, dl = dk.nodeType;
                    if (!dk || dl === 3 || dl === 8 || dl === 2) {
                        return;
                    }
                    cn = dl !== 1 || !ca.isXMLDoc(dk);
                    if (cn) {
                        bt = ca.propFix[bt] || bt;
                        bn = ca.propHooks[bt];
                    }
                    if (dm !== undefined) {
                        return bn && "set" in bn && (ct = bn.set(dk, dm, bt)) !== undefined ? ct : dk[bt] = dm;
                    } else {
                        return bn && "get" in bn && (ct = bn.get(dk, bt)) !== null ? ct : dk[bt];
                    }
                }, propHooks: {
                    tabIndex: {
                        get: function (bt) {
                            var bn = ca.find.attr(bt, "tabindex");
                            return bn ? parseInt(bn, 10) : cw.test(bt.nodeName) || aH.test(bt.nodeName) && bt.href ? 0 : -1;
                        }
                    }
                }
            });
            if (!b5.hrefNormalized) {
                ca.each(["href", "src"], function (bt, bn) {
                    ca.propHooks[bn] = {
                        get: function (cn) {
                            return cn.getAttribute(bn, 4);
                        }
                    };
                });
            }
            if (!b5.optSelected) {
                ca.propHooks.selected = {
                    get: function (bt) {
                        var bn = bt.parentNode;
                        if (bn) {
                            bn.selectedIndex;
                            if (bn.parentNode) {
                                bn.parentNode.selectedIndex;
                            }
                        }
                        return null;
                    }
                };
            }
            ca.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                ca.propFix[this.toLowerCase()] = this;
            });
            if (!b5.enctype) {
                ca.propFix.enctype = "encoding";
            }
            var aK = /[\t\r\n\f]/g;
            ca.fn.extend({
                addClass: function (dl) {
                    var dp, cn, bn, ct, dq, bt, dn = 0, dm = this.length, dk = typeof dl === "string" && dl;
                    if (ca.isFunction(dl)) {
                        return this.each(function (dr) {
                            ca(this).addClass(dl.call(this, dr, this.className));
                        });
                    }
                    if (dk) {
                        dp = (dl || "").match(cD) || [];
                        for (; dn < dm; dn++) {
                            cn = this[dn];
                            bn = cn.nodeType === 1 && (cn.className ? (" " + cn.className + " ").replace(aK, " ") : " ");
                            if (bn) {
                                dq = 0;
                                while (ct = dp[dq++]) {
                                    if (bn.indexOf(" " + ct + " ") < 0) {
                                        bn += ct + " ";
                                    }
                                }
                                bt = ca.trim(bn);
                                if (cn.className !== bt) {
                                    cn.className = bt;
                                }
                            }
                        }
                    }
                    return this;
                }, removeClass: function (dl) {
                    var dp, cn, bn, ct, dq, bt, dn = 0, dm = this.length, dk = arguments.length === 0 || typeof dl === "string" && dl;
                    if (ca.isFunction(dl)) {
                        return this.each(function (dr) {
                            ca(this).removeClass(dl.call(this, dr, this.className));
                        });
                    }
                    if (dk) {
                        dp = (dl || "").match(cD) || [];
                        for (; dn < dm; dn++) {
                            cn = this[dn];
                            bn = cn.nodeType === 1 && (cn.className ? (" " + cn.className + " ").replace(aK, " ") : "");
                            if (bn) {
                                dq = 0;
                                while (ct = dp[dq++]) {
                                    while (bn.indexOf(" " + ct + " ") >= 0) {
                                        bn = bn.replace(" " + ct + " ", " ");
                                    }
                                }
                                bt = dl ? ca.trim(bn) : "";
                                if (cn.className !== bt) {
                                    cn.className = bt;
                                }
                            }
                        }
                    }
                    return this;
                }, toggleClass: function (bt, bn) {
                    var cn = typeof bt;
                    if (typeof bn === "boolean" && cn === "string") {
                        return bn ? this.addClass(bt) : this.removeClass(bt);
                    }
                    if (ca.isFunction(bt)) {
                        return this.each(function (ct) {
                            ca(this).toggleClass(bt.call(this, ct, this.className, bn), bn);
                        });
                    }
                    return this.each(function () {
                        if (cn === "string") {
                            var dk, dm = 0, ct = ca(this), dl = bt.match(cD) || [];
                            while (dk = dl[dm++]) {
                                if (ct.hasClass(dk)) {
                                    ct.removeClass(dk);
                                } else {
                                    ct.addClass(dk);
                                }
                            }
                        } else {
                            if (cn === cX || cn === "boolean") {
                                if (this.className) {
                                    ca._data(this, "__className__", this.className);
                                }
                                this.className = this.className || bt === false ? "" : ca._data(this, "__className__") || "";
                            }
                        }
                    });
                }, hasClass: function (cn) {
                    var bn = " " + cn + " ", ct = 0, bt = this.length;
                    for (; ct < bt; ct++) {
                        if (this[ct].nodeType === 1 && (" " + this[ct].className + " ").replace(aK, " ").indexOf(bn) >= 0) {
                            return true;
                        }
                    }
                    return false;
                }
            });
            ca.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (bt, bn) {
                ca.fn[bn] = function (cn, ct) {
                    return arguments.length > 0 ? this.on(bn, null, cn, ct) : this.trigger(bn);
                };
            });
            ca.fn.extend({
                hover: function (bt, bn) {
                    return this.mouseenter(bt).mouseleave(bn || bt);
                }, bind: function (bt, bn, cn) {
                    return this.on(bt, null, bn, cn);
                }, unbind: function (bt, bn) {
                    return this.off(bt, null, bn);
                }, delegate: function (cn, bn, ct, bt) {
                    return this.on(bn, cn, ct, bt);
                }, undelegate: function (bt, bn, cn) {
                    return arguments.length === 1 ? this.off(bt, "**") : this.off(bn, bt || "**", cn);
                }
            });
            var di = ca.now();
            var dj = /\?/;
            var da = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            ca.parseJSON = function (bt) {
                if (ce.JSON && ce.JSON.parse) {
                    return ce.JSON.parse(bt + "");
                }
                var ct, cn = null, bn = ca.trim(bt + "");
                return bn && !ca.trim(bn.replace(da, function (dn, dl, dk, dm) {
                    if (ct && dl) {
                        cn = 0;
                    }
                    if (cn === 0) {
                        return dn;
                    }
                    ct = dk || dl;
                    cn += !dm - !dk;
                    return "";
                })) ? Function("return " + bn)() : ca.error("Invalid JSON: " + bt);
            };
            ca.parseXML = function (bt) {
                var ct, cn;
                if (!bt || typeof bt !== "string") {
                    return null;
                }
                try {
                    if (ce.DOMParser) {
                        cn = new DOMParser;
                        ct = cn.parseFromString(bt, "text/xml");
                    } else {
                        ct = new ActiveXObject("Microsoft.XMLDOM");
                        ct.async = "false";
                        ct.loadXML(bt);
                    }
                } catch (bn) {
                    ct = undefined;
                }
                if (!ct || !ct.documentElement || ct.getElementsByTagName("parsererror").length) {
                    ca.error("Invalid XML: " + bt);
                }
                return ct;
            };
            var be, a0, aD = /#.*$/, bA = /([?&])_=[^&]*/, bk = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, a5 = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, bq = /^(?:GET|HEAD)$/, az = /^\/\//, aT = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, aW = {}, c5 = {}, a9 = "*/".concat("*");
            try {
                a0 = location.href;
            } catch (aL) {
                a0 = cv.createElement("a");
                a0.href = "";
                a0 = a0.href;
            }
            be = aT.exec(a0.toLowerCase()) || [];
            ca.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: a0,
                    type: "GET",
                    isLocal: a5.test(be[1]),
                    global: true,
                    processData: true,
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": a9,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {xml: /xml/, html: /html/, json: /json/},
                    responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                    converters: {
                        "* text": String,
                        "text html": true,
                        "text json": ca.parseJSON,
                        "text xml": ca.parseXML
                    },
                    flatOptions: {url: true, context: true}
                },
                ajaxSetup: function (bt, bn) {
                    return bn ? bB(bB(bt, ca.ajaxSettings), bn) : bB(ca.ajaxSettings, bt);
                },
                ajaxPrefilter: aC(aW),
                ajaxTransport: aC(c5),
                ajax: function (dz, dn) {
                    function cn(dJ, dN, dF, dE) {
                        var dI, dH, dK, dM, dG, dL = dN;
                        if (dC === 2) {
                            return;
                        }
                        dC = 2;
                        if (ds) {
                            clearTimeout(ds);
                        }
                        dD = undefined;
                        dp = dE || "";
                        dm.readyState = dJ > 0 ? 4 : 0;
                        dI = dJ >= 200 && dJ < 300 || dJ === 304;
                        if (dF) {
                            dM = aG(dv, dm, dF);
                        }
                        dM = cZ(dv, dM, dm, dI);
                        if (dI) {
                            if (dv.ifModified) {
                                dG = dm.getResponseHeader("Last-Modified");
                                if (dG) {
                                    ca.lastModified[dw] = dG;
                                }
                                dG = dm.getResponseHeader("etag");
                                if (dG) {
                                    ca.etag[dw] = dG;
                                }
                            }
                            if (dJ === 204 || dv.type === "HEAD") {
                                dL = "nocontent";
                            } else {
                                if (dJ === 304) {
                                    dL = "notmodified";
                                } else {
                                    dL = dM.state;
                                    dH = dM.data;
                                    dK = dM.error;
                                    dI = !dK;
                                }
                            }
                        } else {
                            dK = dL;
                            if (dJ || !dL) {
                                dL = "error";
                                if (dJ < 0) {
                                    dJ = 0;
                                }
                            }
                        }
                        dm.status = dJ;
                        dm.statusText = (dN || dL) + "";
                        if (dI) {
                            dA.resolveWith(dB, [dH, dL, dm]);
                        } else {
                            dA.rejectWith(dB, [dm, dL, dK]);
                        }
                        dm.statusCode(du);
                        du = undefined;
                        if (dl) {
                            dr.trigger(dI ? "ajaxSuccess" : "ajaxError", [dm, dv, dI ? dH : dK]);
                        }
                        dk.fireWith(dB, [dm, dL]);
                        if (dl) {
                            dr.trigger("ajaxComplete", [dm, dv]);
                            if (!--ca.active) {
                                ca.event.trigger("ajaxStop");
                            }
                        }
                    }

                    if (typeof dz === "object") {
                        dn = dz;
                        dz = undefined;
                    }
                    dn = dn || {};
                    var dt, dq, dw, dp, ds, dl, dD, dy, dv = ca.ajaxSetup({}, dn), dB = dv.context || dv, dr = dv.context && (dB.nodeType || dB.jquery) ? ca(dB) : ca.event, dA = ca.Deferred(), dk = ca.Callbacks("once memory"), du = dv.statusCode || {}, dx = {}, bt = {}, dC = 0, ct = "canceled", dm = {
                        readyState: 0,
                        getResponseHeader: function (dF) {
                            var dE;
                            if (dC === 2) {
                                if (!dy) {
                                    dy = {};
                                    while (dE = bk.exec(dp)) {
                                        dy[dE[1].toLowerCase()] = dE[2];
                                    }
                                }
                                dE = dy[dF.toLowerCase()];
                            }
                            return dE == null ? null : dE;
                        },
                        getAllResponseHeaders: function () {
                            return dC === 2 ? dp : null;
                        },
                        setRequestHeader: function (dF, dE) {
                            var dG = dF.toLowerCase();
                            if (!dC) {
                                dF = bt[dG] = bt[dG] || dF;
                                dx[dF] = dE;
                            }
                            return this;
                        },
                        overrideMimeType: function (dE) {
                            if (!dC) {
                                dv.mimeType = dE;
                            }
                            return this;
                        },
                        statusCode: function (dF) {
                            var dE;
                            if (dF) {
                                if (dC < 2) {
                                    for (dE in dF) {
                                        du[dE] = [du[dE], dF[dE]];
                                    }
                                } else {
                                    dm.always(dF[dm.status]);
                                }
                            }
                            return this;
                        },
                        abort: function (dF) {
                            var dE = dF || ct;
                            if (dD) {
                                dD.abort(dE);
                            }
                            cn(0, dE);
                            return this;
                        }
                    };
                    dA.promise(dm).complete = dk.add;
                    dm.success = dm.done;
                    dm.error = dm.fail;
                    dv.url = ((dz || dv.url || a0) + "").replace(aD, "").replace(az, be[1] + "//");
                    dv.type = dn.method || dn.type || dv.method || dv.type;
                    dv.dataTypes = ca.trim(dv.dataType || "*").toLowerCase().match(cD) || [""];
                    if (dv.crossDomain == null) {
                        dt = aT.exec(dv.url.toLowerCase());
                        dv.crossDomain = !!(dt && (dt[1] !== be[1] || dt[2] !== be[2] || (dt[3] || (dt[1] === "http:" ? "80" : "443")) !== (be[3] || (be[1] === "http:" ? "80" : "443"))));
                    }
                    if (dv.data && dv.processData && typeof dv.data !== "string") {
                        dv.data = ca.param(dv.data, dv.traditional);
                    }
                    cL(aW, dv, dn, dm);
                    if (dC === 2) {
                        return dm;
                    }
                    dl = dv.global;
                    if (dl && ca.active++ === 0) {
                        ca.event.trigger("ajaxStart");
                    }
                    dv.type = dv.type.toUpperCase();
                    dv.hasContent = !bq.test(dv.type);
                    dw = dv.url;
                    if (!dv.hasContent) {
                        if (dv.data) {
                            dw = dv.url += (dj.test(dw) ? "&" : "?") + dv.data;
                            delete dv.data;
                        }
                        if (dv.cache === false) {
                            dv.url = bA.test(dw) ? dw.replace(bA, "$1_=" + di++) : dw + (dj.test(dw) ? "&" : "?") + "_=" + di++;
                        }
                    }
                    if (dv.ifModified) {
                        if (ca.lastModified[dw]) {
                            dm.setRequestHeader("If-Modified-Since", ca.lastModified[dw]);
                        }
                        if (ca.etag[dw]) {
                            dm.setRequestHeader("If-None-Match", ca.etag[dw]);
                        }
                    }
                    if (dv.data && dv.hasContent && dv.contentType !== false || dn.contentType) {
                        dm.setRequestHeader("Content-Type", dv.contentType);
                    }
                    dm.setRequestHeader("Accept", dv.dataTypes[0] && dv.accepts[dv.dataTypes[0]] ? dv.accepts[dv.dataTypes[0]] + (dv.dataTypes[0] !== "*" ? ", " + a9 + "; q=0.01" : "") : dv.accepts["*"]);
                    for (dq in dv.headers) {
                        dm.setRequestHeader(dq, dv.headers[dq]);
                    }
                    if (dv.beforeSend && (dv.beforeSend.call(dB, dm, dv) === false || dC === 2)) {
                        return dm.abort();
                    }
                    ct = "abort";
                    for (dq in {success: 1, error: 1, complete: 1}) {
                        dm[dq](dv[dq]);
                    }
                    dD = cL(c5, dv, dn, dm);
                    if (!dD) {
                        cn(-1, "No Transport");
                    } else {
                        dm.readyState = 1;
                        if (dl) {
                            dr.trigger("ajaxSend", [dm, dv]);
                        }
                        if (dv.async && dv.timeout > 0) {
                            ds = setTimeout(function () {
                                dm.abort("timeout");
                            }, dv.timeout);
                        }
                        try {
                            dC = 1;
                            dD.send(dx, cn);
                        } catch (bn) {
                            if (dC < 2) {
                                cn(-1, bn);
                            } else {
                                throw bn;
                            }
                        }
                    }
                    return dm;
                },
                getJSON: function (bt, bn, cn) {
                    return ca.get(bt, bn, cn, "json");
                },
                getScript: function (bt, bn) {
                    return ca.get(bt, undefined, bn, "script");
                }
            });
            ca.each(["get", "post"], function (bt, bn) {
                ca[bn] = function (dk, dl, ct, cn) {
                    if (ca.isFunction(dl)) {
                        cn = cn || ct;
                        ct = dl;
                        dl = undefined;
                    }
                    return ca.ajax({url: dk, type: bn, dataType: cn, data: dl, success: ct});
                };
            });
            ca.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (bt, bn) {
                ca.fn[bn] = function (cn) {
                    return this.on(bn, cn);
                };
            });
            ca._evalUrl = function (bn) {
                return ca.ajax({url: bn, type: "GET", dataType: "script", async: false, global: false, "throws": true});
            };
            ca.fn.extend({
                wrapAll: function (bt) {
                    if (ca.isFunction(bt)) {
                        return this.each(function (cn) {
                            ca(this).wrapAll(bt.call(this, cn));
                        });
                    }
                    if (this[0]) {
                        var bn = ca(bt, this[0].ownerDocument).eq(0).clone(true);
                        if (this[0].parentNode) {
                            bn.insertBefore(this[0]);
                        }
                        bn.map(function () {
                            var cn = this;
                            while (cn.firstChild && cn.firstChild.nodeType === 1) {
                                cn = cn.firstChild;
                            }
                            return cn;
                        }).append(this);
                    }
                    return this;
                }, wrapInner: function (bn) {
                    if (ca.isFunction(bn)) {
                        return this.each(function (bt) {
                            ca(this).wrapInner(bn.call(this, bt));
                        });
                    }
                    return this.each(function () {
                        var bt = ca(this), cn = bt.contents();
                        if (cn.length) {
                            cn.wrapAll(bn);
                        } else {
                            bt.append(bn);
                        }
                    });
                }, wrap: function (bt) {
                    var bn = ca.isFunction(bt);
                    return this.each(function (cn) {
                        ca(this).wrapAll(bn ? bt.call(this, cn) : bt);
                    });
                }, unwrap: function () {
                    return this.parent().each(function () {
                        if (!ca.nodeName(this, "body")) {
                            ca(this).replaceWith(this.childNodes);
                        }
                    }).end();
                }
            });
            ca.expr.filters.hidden = function (bn) {
                return bn.offsetWidth <= 0 && bn.offsetHeight <= 0 || !b5.reliableHiddenOffsets() && (bn.style && bn.style.display || ca.css(bn, "display")) === "none";
            };
            ca.expr.filters.visible = function (bn) {
                return !ca.expr.filters.hidden(bn);
            };
            var c0 = /%20/g, bL = /\[\]$/, bD = /\r?\n/g, ck = /^(?:submit|button|image|reset|file)$/i, cH = /^(?:input|select|textarea|keygen)/i;
            ca.param = function (ct, bt) {
                var dk, cn = [], bn = function (dm, dl) {
                    dl = ca.isFunction(dl) ? dl() : dl == null ? "" : dl;
                    cn[cn.length] = encodeURIComponent(dm) + "=" + encodeURIComponent(dl);
                };
                if (bt === undefined) {
                    bt = ca.ajaxSettings && ca.ajaxSettings.traditional;
                }
                if (ca.isArray(ct) || ct.jquery && !ca.isPlainObject(ct)) {
                    ca.each(ct, function () {
                        bn(this.name, this.value);
                    });
                } else {
                    for (dk in ct) {
                        b8(dk, ct[dk], bt, bn);
                    }
                }
                return cn.join("&").replace(c0, "+");
            };
            ca.fn.extend({
                serialize: function () {
                    return ca.param(this.serializeArray());
                }, serializeArray: function () {
                    return this.map(function () {
                        var bn = ca.prop(this, "elements");
                        return bn ? ca.makeArray(bn) : this;
                    }).filter(function () {
                        var bn = this.type;
                        return this.name && !ca(this).is(":disabled") && cH.test(this.nodeName) && !ck.test(bn) && (this.checked || !cM.test(bn));
                    }).map(function (bt, bn) {
                        var cn = ca(this).val();
                        return cn == null ? null : ca.isArray(cn) ? ca.map(cn, function (ct) {
                                    return {name: bn.name, value: ct.replace(bD, "\r\n")};
                                }) : {name: bn.name, value: cn.replace(bD, "\r\n")};
                    }).get();
                }
            });
            ca.ajaxSettings.xhr = ce.ActiveXObject !== undefined ? function () {
                    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && bu() || bh();
                } : bu;
            var bI = 0, aO = {}, de = ca.ajaxSettings.xhr();
            if (ce.ActiveXObject) {
                ca(ce).on("unload", function () {
                    for (var bn in aO) {
                        aO[bn](undefined, true);
                    }
                });
            }
            b5.cors = !!de && "withCredentials" in de;
            de = b5.ajax = !!de;
            if (de) {
                ca.ajaxTransport(function (bt) {
                    if (!bt.crossDomain || b5.cors) {
                        var bn;
                        return {
                            send: function (dm, dk) {
                                var cn, ct = bt.xhr(), dl = ++bI;
                                ct.open(bt.type, bt.url, bt.async, bt.username, bt.password);
                                if (bt.xhrFields) {
                                    for (cn in bt.xhrFields) {
                                        ct[cn] = bt.xhrFields[cn];
                                    }
                                }
                                if (bt.mimeType && ct.overrideMimeType) {
                                    ct.overrideMimeType(bt.mimeType);
                                }
                                if (!bt.crossDomain && !dm["X-Requested-With"]) {
                                    dm["X-Requested-With"] = "XMLHttpRequest";
                                }
                                for (cn in dm) {
                                    if (dm[cn] !== undefined) {
                                        ct.setRequestHeader(cn, dm[cn] + "");
                                    }
                                }
                                ct.send(bt.hasContent && bt.data || null);
                                bn = function (dt, dr) {
                                    var dq, dp, ds;
                                    if (bn && (dr || ct.readyState === 4)) {
                                        delete aO[dl];
                                        bn = undefined;
                                        ct.onreadystatechange = ca.noop;
                                        if (dr) {
                                            if (ct.readyState !== 4) {
                                                ct.abort();
                                            }
                                        } else {
                                            ds = {};
                                            dq = ct.status;
                                            if (typeof ct.responseText === "string") {
                                                ds.text = ct.responseText;
                                            }
                                            try {
                                                dp = ct.statusText;
                                            } catch (dn) {
                                                dp = "";
                                            }
                                            if (!dq && bt.isLocal && !bt.crossDomain) {
                                                dq = ds.text ? 200 : 404;
                                            } else {
                                                if (dq === 1223) {
                                                    dq = 204;
                                                }
                                            }
                                        }
                                    }
                                    if (ds) {
                                        dk(dq, dp, ds, ct.getAllResponseHeaders());
                                    }
                                };
                                if (!bt.async) {
                                    bn();
                                } else {
                                    if (ct.readyState === 4) {
                                        setTimeout(bn);
                                    } else {
                                        ct.onreadystatechange = aO[dl] = bn;
                                    }
                                }
                            }, abort: function () {
                                if (bn) {
                                    bn(undefined, true);
                                }
                            }
                        };
                    }
                });
            }
            ca.ajaxSetup({
                accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
                contents: {script: /(?:java|ecma)script/},
                converters: {
                    "text script": function (bn) {
                        ca.globalEval(bn);
                        return bn;
                    }
                }
            });
            ca.ajaxPrefilter("script", function (bn) {
                if (bn.cache === undefined) {
                    bn.cache = false;
                }
                if (bn.crossDomain) {
                    bn.type = "GET";
                    bn.global = false;
                }
            });
            ca.ajaxTransport("script", function (bt) {
                if (bt.crossDomain) {
                    var bn, cn = cv.head || ca("head")[0] || cv.documentElement;
                    return {
                        send: function (dk, ct) {
                            bn = cv.createElement("script");
                            bn.async = true;
                            if (bt.scriptCharset) {
                                bn.charset = bt.scriptCharset;
                            }
                            bn.src = bt.url;
                            bn.onload = bn.onreadystatechange = function (dl, dm) {
                                if (dm || !bn.readyState || /loaded|complete/.test(bn.readyState)) {
                                    bn.onload = bn.onreadystatechange = null;
                                    if (bn.parentNode) {
                                        bn.parentNode.removeChild(bn);
                                    }
                                    bn = null;
                                    if (!dm) {
                                        ct(200, "success");
                                    }
                                }
                            };
                            cn.insertBefore(bn, cn.firstChild);
                        }, abort: function () {
                            if (bn) {
                                bn.onload(undefined, true);
                            }
                        }
                    };
                }
            });
            var bw = [], a4 = /(=)\?(?=&|$)|\?\?/;
            ca.ajaxSetup({
                jsonp: "callback", jsonpCallback: function () {
                    var bn = bw.pop() || ca.expando + "_" + di++;
                    this[bn] = true;
                    return bn;
                }
            });
            ca.ajaxPrefilter("json jsonp", function (cn, dm, dk) {
                var bt, ct, dl, bn = cn.jsonp !== false && (a4.test(cn.url) ? "url" : typeof cn.data === "string" && !(cn.contentType || "").indexOf("application/x-www-form-urlencoded") && a4.test(cn.data) && "data");
                if (bn || cn.dataTypes[0] === "jsonp") {
                    bt = cn.jsonpCallback = ca.isFunction(cn.jsonpCallback) ? cn.jsonpCallback() : cn.jsonpCallback;
                    if (bn) {
                        cn[bn] = cn[bn].replace(a4, "$1" + bt);
                    } else {
                        if (cn.jsonp !== false) {
                            cn.url += (dj.test(cn.url) ? "&" : "?") + cn.jsonp + "=" + bt;
                        }
                    }
                    cn.converters["script json"] = function () {
                        if (!dl) {
                            ca.error(bt + " was not called");
                        }
                        return dl[0];
                    };
                    cn.dataTypes[0] = "json";
                    ct = ce[bt];
                    ce[bt] = function () {
                        dl = arguments;
                    };
                    dk.always(function () {
                        ce[bt] = ct;
                        if (cn[bt]) {
                            cn.jsonpCallback = dm.jsonpCallback;
                            bw.push(bt);
                        }
                        if (dl && ca.isFunction(ct)) {
                            ct(dl[0]);
                        }
                        dl = ct = undefined;
                    });
                    return "script";
                }
            });
            ca.parseHTML = function (ct, bt, dk) {
                if (!ct || typeof ct !== "string") {
                    return null;
                }
                if (typeof bt === "boolean") {
                    dk = bt;
                    bt = false;
                }
                bt = bt || cv;
                var cn = bQ.exec(ct), bn = !dk && [];
                if (cn) {
                    return [bt.createElement(cn[1])];
                }
                cn = ca.buildFragment([ct], bt, bn);
                if (bn && bn.length) {
                    ca(bn).remove();
                }
                return ca.merge([], cn.childNodes);
            };
            var cG = ca.fn.load;
            ca.fn.load = function (dl, cn, dn) {
                if (typeof dl !== "string" && cG) {
                    return cG.apply(this, arguments);
                }
                var dk, bt, ct, dm = this, bn = dl.indexOf(" ");
                if (bn >= 0) {
                    dk = ca.trim(dl.slice(bn, dl.length));
                    dl = dl.slice(0, bn);
                }
                if (ca.isFunction(cn)) {
                    dn = cn;
                    cn = undefined;
                } else {
                    if (cn && typeof cn === "object") {
                        ct = "POST";
                    }
                }
                if (dm.length > 0) {
                    ca.ajax({url: dl, type: ct, dataType: "html", data: cn}).done(function (dp) {
                        bt = arguments;
                        dm.html(dk ? ca("<div>").append(ca.parseHTML(dp)).find(dk) : dp);
                    }).complete(dn && function (dq, dp) {
                            dm.each(dn, bt || [dq.responseText, dp, dq]);
                        });
                }
                return this;
            };
            ca.expr.filters.animated = function (bn) {
                return ca.grep(ca.timers, function (bt) {
                    return bn === bt.elem;
                }).length;
            };
            var bp = ce.document.documentElement;
            ca.offset = {
                setOffset: function (dn, ds, ct) {
                    var bn, dl, dt, cn, dr, dq, dm, dk = ca.css(dn, "position"), dp = ca(dn), bt = {};
                    if (dk === "static") {
                        dn.style.position = "relative";
                    }
                    dr = dp.offset();
                    dt = ca.css(dn, "top");
                    dq = ca.css(dn, "left");
                    dm = (dk === "absolute" || dk === "fixed") && ca.inArray("auto", [dt, dq]) > -1;
                    if (dm) {
                        bn = dp.position();
                        cn = bn.top;
                        dl = bn.left;
                    } else {
                        cn = parseFloat(dt) || 0;
                        dl = parseFloat(dq) || 0;
                    }
                    if (ca.isFunction(ds)) {
                        ds = ds.call(dn, ct, dr);
                    }
                    if (ds.top != null) {
                        bt.top = ds.top - dr.top + cn;
                    }
                    if (ds.left != null) {
                        bt.left = ds.left - dr.left + dl;
                    }
                    if ("using" in ds) {
                        ds.using.call(dn, bt);
                    } else {
                        dp.css(bt);
                    }
                }
            };
            ca.fn.extend({
                offset: function (dk) {
                    if (arguments.length) {
                        return dk === undefined ? this : this.each(function (dm) {
                                ca.offset.setOffset(this, dk, dm);
                            });
                    }
                    var bt, dl, ct = {top: 0, left: 0}, bn = this[0], cn = bn && bn.ownerDocument;
                    if (!cn) {
                        return;
                    }
                    bt = cn.documentElement;
                    if (!ca.contains(bt, bn)) {
                        return ct;
                    }
                    if (typeof bn.getBoundingClientRect !== cX) {
                        ct = bn.getBoundingClientRect();
                    }
                    dl = aS(cn);
                    return {
                        top: ct.top + (dl.pageYOffset || bt.scrollTop) - (bt.clientTop || 0),
                        left: ct.left + (dl.pageXOffset || bt.scrollLeft) - (bt.clientLeft || 0)
                    };
                }, position: function () {
                    if (!this[0]) {
                        return;
                    }
                    var cn, bn, ct = {top: 0, left: 0}, bt = this[0];
                    if (ca.css(bt, "position") === "fixed") {
                        bn = bt.getBoundingClientRect();
                    } else {
                        cn = this.offsetParent();
                        bn = this.offset();
                        if (!ca.nodeName(cn[0], "html")) {
                            ct = cn.offset();
                        }
                        ct.top += ca.css(cn[0], "borderTopWidth", true);
                        ct.left += ca.css(cn[0], "borderLeftWidth", true);
                    }
                    return {
                        top: bn.top - ct.top - ca.css(bt, "marginTop", true),
                        left: bn.left - ct.left - ca.css(bt, "marginLeft", true)
                    };
                }, offsetParent: function () {
                    return this.map(function () {
                        var bn = this.offsetParent || bp;
                        while (bn && !ca.nodeName(bn, "html") && ca.css(bn, "position") === "static") {
                            bn = bn.offsetParent;
                        }
                        return bn || bp;
                    });
                }
            });
            ca.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (bt, bn) {
                var cn = /Y/.test(bn);
                ca.fn[bt] = function (ct) {
                    return c9(this, function (dn, dm, dk) {
                        var dl = aS(dn);
                        if (dk === undefined) {
                            return dl ? bn in dl ? dl[bn] : dl.document.documentElement[dm] : dn[dm];
                        }
                        if (dl) {
                            dl.scrollTo(!cn ? dk : ca(dl).scrollLeft(), cn ? dk : ca(dl).scrollTop());
                        } else {
                            dn[dm] = dk;
                        }
                    }, bt, ct, arguments.length, null);
                };
            });
            ca.each(["top", "left"], function (bt, bn) {
                ca.cssHooks[bn] = aJ(b5.pixelPosition, function (cn, ct) {
                    if (ct) {
                        ct = c3(cn, bn);
                        return aQ.test(ct) ? ca(cn).position()[bn] + "px" : ct;
                    }
                });
            });
            ca.each({Height: "height", Width: "width"}, function (bt, bn) {
                ca.each({padding: "inner" + bt, content: bn, "": "outer" + bt}, function (ct, cn) {
                    ca.fn[cn] = function (dm, dk) {
                        var dl = arguments.length && (ct || typeof dm !== "boolean"), dn = ct || (dm === true || dk === true ? "margin" : "border");
                        return c9(this, function (dq, ds, dr) {
                            var dp;
                            if (ca.isWindow(dq)) {
                                return dq.document.documentElement["client" + bt];
                            }
                            if (dq.nodeType === 9) {
                                dp = dq.documentElement;
                                return Math.max(dq.body["scroll" + bt], dp["scroll" + bt], dq.body["offset" + bt], dp["offset" + bt], dp["client" + bt]);
                            }
                            return dr === undefined ? ca.css(dq, ds, dn) : ca.style(dq, ds, dr, dn);
                        }, bn, dl ? dm : undefined, dl, null);
                    };
                });
            });
            ca.fn.size = function () {
                return this.length;
            };
            ca.fn.andSelf = ca.fn.addBack;
            if (typeof define === "function" && define.amd) {
                define("jquery", [], function () {
                    return ca;
                });
            }
            var bd = ce.jQuery, b4 = ce.$;
            ca.noConflict = function (bn) {
                if (ce.$ === ca) {
                    ce.$ = b4;
                }
                if (bn && ce.jQuery === ca) {
                    ce.jQuery = bd;
                }
                return ca;
            };
            if (typeof bT === cX) {
                ce.jQuery = ce.$ = ca;
            }
            return ca;
        });
        window.jsplus_jquery = jQuery.noConflict();
        window.jQuery = ax;
    })();
    !function (bw, be) {
        function bl(bF, bD) {
            for (var bG, bC = [], bE = 0; bE < bF.length; ++bE) {
                if (bG = bf[bF[bE]] || bk(bF[bE]), !bG) {
                    throw"module definition dependecy not found: " + bF[bE];
                }
                bC.push(bG);
            }
            bD.apply(null, bC);
        }

        function br(bE, bC, bD) {
            if ("string" != typeof bE) {
                throw"invalid module definition, module id must be defined and be a string";
            }
            if (bC === be) {
                throw"invalid module definition, dependencies must be specified";
            }
            if (bD === be) {
                throw"invalid module definition, definition function must be specified";
            }
            bl(bC, function () {
                bf[bE] = bD.apply(null, arguments);
            });
        }

        function bg(bC) {
            return !!bf[bC];
        }

        function bk(bD) {
            for (var bF = bw, bC = bD.split(/[.\/]/), bE = 0; bE < bC.length; ++bE) {
                if (!bF[bC[bE]]) {
                    return;
                }
                bF = bF[bC[bE]];
            }
            return bF;
        }

        function bA(bH) {
            for (var bE = 0; bE < bH.length; bE++) {
                for (var bF = bw, bG = bH[bE], bC = bG.split(/[.\/]/), bD = 0; bD < bC.length - 1; ++bD) {
                    bF[bC[bD]] === be && (bF[bC[bD]] = {}), bF = bF[bC[bD]];
                }
                bF[bC[bC.length - 1]] = bf[bG];
            }
        }

        var bf = {}, bd = "moxie/core/utils/Basic", by = "moxie/core/I18n", bn = "moxie/core/utils/Mime", bx = "moxie/core/utils/Env", bv = "moxie/core/utils/Dom", bs = "moxie/core/Exceptions", bj = "moxie/core/EventTarget", bm = "moxie/core/utils/Encode", bt = "moxie/runtime/Runtime", bc = "moxie/runtime/RuntimeClient", a9 = "moxie/file/Blob", bb = "moxie/file/File", aV = "moxie/file/FileInput", bB = "moxie/file/FileDrop", ba = "moxie/runtime/RuntimeTarget", bz = "moxie/file/FileReader", aG = "moxie/core/utils/Url", aD = "moxie/file/FileReaderSync", aZ = "moxie/xhr/FormData", aF = "moxie/xhr/XMLHttpRequest", aK = "moxie/runtime/Transporter", aQ = "moxie/image/Image", aW = "moxie/runtime/html5/Runtime", aL = "moxie/runtime/html5/file/Blob", aN = "moxie/core/utils/Events", aM = "moxie/runtime/html5/file/FileInput", aX = "moxie/runtime/html5/file/FileDrop", aU = "moxie/runtime/html5/file/FileReader", aR = "moxie/runtime/html5/xhr/XMLHttpRequest", aJ = "moxie/runtime/html5/utils/BinaryReader", bo = "moxie/runtime/html5/image/JPEGHeaders", aC = "moxie/runtime/html5/image/ExifParser", aY = "moxie/runtime/html5/image/JPEG", a8 = "moxie/runtime/html5/image/PNG", aT = "moxie/runtime/html5/image/ImageInfo", bh = "moxie/runtime/html5/image/MegaPixel", az = "moxie/runtime/html5/image/Image", bq = "moxie/runtime/flash/Runtime", aB = "moxie/runtime/flash/file/Blob", aA = "moxie/runtime/flash/file/FileInput", ay = "moxie/runtime/flash/file/FileReader", a7 = "moxie/runtime/flash/file/FileReaderSync", aP = "moxie/runtime/flash/xhr/XMLHttpRequest", ax = "moxie/runtime/flash/runtime/Transporter", aO = "moxie/runtime/flash/image/Image", aI = "moxie/runtime/silverlight/Runtime", bi = "moxie/runtime/silverlight/file/Blob", bu = "moxie/runtime/silverlight/file/FileInput", bp = "moxie/runtime/silverlight/file/FileDrop", a2 = "moxie/runtime/silverlight/file/FileReader", a5 = "moxie/runtime/silverlight/file/FileReaderSync", a4 = "moxie/runtime/silverlight/xhr/XMLHttpRequest", aE = "moxie/runtime/silverlight/runtime/Transporter", aS = "moxie/runtime/silverlight/image/Image", a6 = "moxie/runtime/html4/Runtime", a0 = "moxie/runtime/html4/file/FileInput", a3 = "moxie/runtime/html4/file/FileReader", aH = "moxie/runtime/html4/xhr/XMLHttpRequest", a1 = "moxie/runtime/html4/image/Image";
        br(bd, [], function () {
            var bI = function (bQ) {
                var bP;
                return bQ === bP ? "undefined" : null === bQ ? "null" : bQ.nodeType ? "node" : {}.toString.call(bQ).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
            }, bN = function (bP) {
                var bQ;
                return bE(arguments, function (bS, bR) {
                    bR > 0 && bE(bS, function (bU, bT) {
                        bU !== bQ && (bI(bP[bT]) === bI(bU) && ~bL(bI(bU), ["array", "object"]) ? bN(bP[bT], bU) : bP[bT] = bU);
                    });
                }), bP;
            }, bE = function (bT, bR) {
                var bV, bQ, bS, bU;
                if (bT) {
                    try {
                        bV = bT.length;
                    } catch (bP) {
                        bV = bU;
                    }
                    if (bV === bU) {
                        for (bQ in bT) {
                            if (bT.hasOwnProperty(bQ) && bR(bT[bQ], bQ) === !1) {
                                return;
                            }
                        }
                    } else {
                        for (bS = 0; bV > bS; bS++) {
                            if (bR(bT[bS], bS) === !1) {
                                return;
                            }
                        }
                    }
                }
            }, bG = function (bP) {
                var bQ;
                if (!bP || "object" !== bI(bP)) {
                    return !0;
                }
                for (bQ in bP) {
                    return !1;
                }
                return !0;
            }, bC = function (bQ, bT) {
                function bP(bU) {
                    "function" === bI(bQ[bU]) && bQ[bU](function (bV) {
                        ++bU < bS && !bV ? bP(bU) : bT(bV);
                    });
                }

                var bR = 0, bS = bQ.length;
                "function" !== bI(bT) && (bT = function () {
                }), bQ && bQ.length || bT(), bP(bR);
            }, bD = function (bS, bQ) {
                var bP = 0, bR = bS.length, bT = new Array(bR);
                bE(bS, function (bU, bV) {
                    bU(function (bX) {
                        if (bX) {
                            return bQ(bX);
                        }
                        var bW = [].slice.call(arguments);
                        bW.shift(), bT[bV] = bW, bP++, bP === bR && (bT.unshift(null), bQ.apply(this, bT));
                    });
                });
            }, bL = function (bR, bQ) {
                if (bQ) {
                    if (Array.prototype.indexOf) {
                        return Array.prototype.indexOf.call(bQ, bR);
                    }
                    for (var bS = 0, bP = bQ.length; bP > bS; bS++) {
                        if (bQ[bS] === bR) {
                            return bS;
                        }
                    }
                }
                return -1;
            }, bO = function (bQ, bS) {
                var bP = [];
                "array" !== bI(bQ) && (bQ = [bQ]), "array" !== bI(bS) && (bS = [bS]);
                for (var bR in bQ) {
                    -1 === bL(bQ[bR], bS) && bP.push(bQ[bR]);
                }
                return bP.length ? bP : !1;
            }, bM = function (bR, bQ) {
                var bP = [];
                return bE(bR, function (bS) {
                    -1 !== bL(bS, bQ) && bP.push(bS);
                }), bP.length ? bP : null;
            }, bK = function (bQ) {
                var bP, bR = [];
                for (bP = 0; bP < bQ.length; bP++) {
                    bR[bP] = bQ[bP];
                }
                return bR;
            }, bF = function () {
                var bP = 0;
                return function (bR) {
                    var bS = (new Date).getTime().toString(32), bQ;
                    for (bQ = 0; 5 > bQ; bQ++) {
                        bS += Math.floor(65535 * Math.random()).toString(32);
                    }
                    return (bR || "o_") + bS + (bP++).toString(32);
                };
            }(), bJ = function (bP) {
                return bP ? String.prototype.trim ? String.prototype.trim.call(bP) : bP.toString().replace(/^\s*/, "").replace(/\s*$/, "") : bP;
            }, bH = function (bQ) {
                if ("string" != typeof bQ) {
                    return bQ;
                }
                var bP = {t: 1099511627776, g: 1073741824, m: 1048576, k: 1024}, bR;
                return bQ = /^([0-9]+)([mgk]?)$/.exec(bQ.toLowerCase().replace(/[^0-9mkg]/g, "")), bR = bQ[2], bQ = +bQ[1], bP.hasOwnProperty(bR) && (bQ *= bP[bR]), bQ;
            };
            return {
                guid: bF,
                typeOf: bI,
                extend: bN,
                each: bE,
                isEmptyObj: bG,
                inSeries: bC,
                inParallel: bD,
                inArray: bL,
                arrayDiff: bO,
                arrayIntersect: bM,
                toArray: bK,
                trim: bJ,
                parseSizeStr: bH
            };
        }), br(by, [bd], function (bD) {
            var bC = {};
            return {
                addI18n: function (bE) {
                    return bD.extend(bC, bE);
                }, translate: function (bE) {
                    return bC[bE] || bE;
                }, _: function (bE) {
                    return this.translate(bE);
                }, sprintf: function (bE) {
                    var bF = [].slice.call(arguments, 1);
                    return bE.replace(/%[a-z]/g, function () {
                        var bG = bF.shift();
                        return "undefined" !== bD.typeOf(bG) ? bG : "";
                    });
                }
            };
        }), br(bn, [bd, by], function (bE, bD) {
            var bF = "application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mp3 mpga mpega mp2,audio/x-wav,wav,audio/x-m4a,m4a,audio/ogg,oga ogg,audio/aiff,aiff aif,audio/flac,flac,audio/aac,aac,audio/ac3,ac3,audio/x-ms-wma,wma,image/bmp,bmp,image/gif,gif,image/jpeg,jpg jpeg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gpp 3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,video/ogg,ogv,video/x-matroska,mkv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe", bC = {
                mimes: {}, extensions: {}, addMimeType: function (bJ) {
                    var bH = bJ.split(/,/), bK, bG, bI;
                    for (bK = 0; bK < bH.length; bK += 2) {
                        for (bI = bH[bK + 1].split(/ /), bG = 0; bG < bI.length; bG++) {
                            this.mimes[bI[bG]] = bH[bK];
                        }
                        this.extensions[bH[bK]] = bI;
                    }
                }, extList2mimes: function (bJ, bN) {
                    var bI = this, bL, bM, bG, bK, bH = [];
                    for (bM = 0; bM < bJ.length; bM++) {
                        for (bL = bJ[bM].extensions.split(/\s*,\s*/), bG = 0; bG < bL.length; bG++) {
                            if ("*" === bL[bG]) {
                                return [];
                            }
                            if (bK = bI.mimes[bL[bG]]) {
                                -1 === bE.inArray(bK, bH) && bH.push(bK);
                            } else {
                                if (!bN || !/^\w+$/.test(bL[bG])) {
                                    return [];
                                }
                                bH.push("." + bL[bG]);
                            }
                        }
                    }
                    return bH;
                }, mimes2exts: function (bH) {
                    var bI = this, bG = [];
                    return bE.each(bH, function (bJ) {
                        if ("*" === bJ) {
                            return bG = [], !1;
                        }
                        var bK = bJ.match(/^(\w+)\/(\*|\w+)$/);
                        bK && ("*" === bK[2] ? bE.each(bI.extensions, function (bM, bL) {
                                new RegExp("^" + bK[1] + "/").test(bL) && [].push.apply(bG, bI.extensions[bL]);
                            }) : bI.extensions[bJ] && [].push.apply(bG, bI.extensions[bJ]));
                    }), bG;
                }, mimes2extList: function (bI) {
                    var bG = [], bH = [];
                    return "string" === bE.typeOf(bI) && (bI = bE.trim(bI).split(/\s*,\s*/)), bH = this.mimes2exts(bI), bG.push({
                        title: bD.translate("Files"),
                        extensions: bH.length ? bH.join(",") : "*"
                    }), bG.mimes = bI, bG;
                }, getFileExtension: function (bH) {
                    var bG = bH && bH.match(/\.([^.]+)$/);
                    return bG ? bG[1].toLowerCase() : "";
                }, getFileMime: function (bG) {
                    return this.mimes[this.getFileExtension(bG)] || "";
                }
            };
            return bC.addMimeType(bF), bC;
        }), br(bx, [bd], function (bF) {
            function bD(bL, bO, bJ) {
                var bK = 0, bH = 0, bI = 0, bM = {
                    dev: -6,
                    alpha: -5,
                    a: -5,
                    beta: -4,
                    b: -4,
                    RC: -3,
                    rc: -3,
                    "#": -2,
                    p: 1,
                    pl: 1
                }, bP = function (bQ) {
                    return bQ = ("" + bQ).replace(/[_\-+]/g, "."), bQ = bQ.replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, "."), bQ.length ? bQ.split(".") : [-8];
                }, bN = function (bQ) {
                    return bQ ? isNaN(bQ) ? bM[bQ] || -7 : parseInt(bQ, 10) : 0;
                };
                for (bL = bP(bL), bO = bP(bO), bH = Math.max(bL.length, bO.length), bK = 0; bH > bK; bK++) {
                    if (bL[bK] != bO[bK]) {
                        if (bL[bK] = bN(bL[bK]), bO[bK] = bN(bO[bK]), bL[bK] < bO[bK]) {
                            bI = -1;
                            break;
                        }
                        if (bL[bK] > bO[bK]) {
                            bI = 1;
                            break;
                        }
                    }
                }
                if (!bJ) {
                    return bI;
                }
                switch (bJ) {
                    case">":
                    case"gt":
                        return bI > 0;
                    case">=":
                    case"ge":
                        return bI >= 0;
                    case"<=":
                    case"le":
                        return 0 >= bI;
                    case"==":
                    case"=":
                    case"eq":
                        return 0 === bI;
                    case"<>":
                    case"!=":
                    case"ne":
                        return 0 !== bI;
                    case"":
                    case"<":
                    case"lt":
                        return 0 > bI;
                    default:
                        return null;
                }
            }

            var bG = function (bY) {
                var bM = "", bR = "?", bU = "function", bO = "undefined", bQ = "object", b1 = "major", bN = "model", bK = "name", b0 = "type", bT = "vendor", bZ = "version", bX = "architecture", bV = "console", bP = "mobile", bS = "tablet", bW = {
                    has: function (b3, b2) {
                        return -1 !== b2.toLowerCase().indexOf(b3.toLowerCase());
                    }, lowerize: function (b2) {
                        return b2.toLowerCase();
                    }
                }, bJ = {
                    rgx: function () {
                        for (var cb, b3 = 0, b9, cc, ca, b8, b4, b7, b6 = arguments; b3 < b6.length; b3 += 2) {
                            var b5 = b6[b3], b2 = b6[b3 + 1];
                            if (typeof cb === bO) {
                                cb = {};
                                for (ca in b2) {
                                    b8 = b2[ca], typeof b8 === bQ ? cb[b8[0]] = bY : cb[b8] = bY;
                                }
                            }
                            for (b9 = cc = 0; b9 < b5.length; b9++) {
                                if (b4 = b5[b9].exec(this.getUA())) {
                                    for (ca = 0; ca < b2.length; ca++) {
                                        b7 = b4[++cc], b8 = b2[ca], typeof b8 === bQ && b8.length > 0 ? 2 == b8.length ? cb[b8[0]] = typeof b8[1] == bU ? b8[1].call(this, b7) : b8[1] : 3 == b8.length ? cb[b8[0]] = typeof b8[1] !== bU || b8[1].exec && b8[1].test ? b7 ? b7.replace(b8[1], b8[2]) : bY : b7 ? b8[1].call(this, b7, b8[2]) : bY : 4 == b8.length && (cb[b8[0]] = b7 ? b8[3].call(this, b7.replace(b8[1], b8[2])) : bY) : cb[b8] = b7 ? b7 : bY;
                                    }
                                    break;
                                }
                            }
                            if (b4) {
                                break;
                            }
                        }
                        return cb;
                    }, str: function (b4, b3) {
                        for (var b5 in b3) {
                            if (typeof b3[b5] === bQ && b3[b5].length > 0) {
                                for (var b2 = 0; b2 < b3[b5].length; b2++) {
                                    if (bW.has(b3[b5][b2], b4)) {
                                        return b5 === bR ? bY : b5;
                                    }
                                }
                            } else {
                                if (bW.has(b3[b5], b4)) {
                                    return b5 === bR ? bY : b5;
                                }
                            }
                        }
                        return b4;
                    }
                }, bH = {
                    browser: {
                        oldsafari: {
                            major: {1: ["/8", "/1", "/3"], 2: "/4", "?": "/"},
                            version: {
                                "1.0": "/8",
                                1.2: "/1",
                                1.3: "/3",
                                "2.0": "/412",
                                "2.0.2": "/416",
                                "2.0.3": "/417",
                                "2.0.4": "/419",
                                "?": "/"
                            }
                        }
                    },
                    device: {sprint: {model: {"Evo Shift 4G": "7373KT"}, vendor: {HTC: "APA", Sprint: "Sprint"}}},
                    os: {
                        windows: {
                            version: {
                                ME: "4.90",
                                "NT 3.11": "NT3.51",
                                "NT 4.0": "NT4.0",
                                2000: "NT 5.0",
                                XP: ["NT 5.1", "NT 5.2"],
                                Vista: "NT 6.0",
                                7: "NT 6.1",
                                8: "NT 6.2",
                                8.1: "NT 6.3",
                                RT: "ARM"
                            }
                        }
                    }
                }, bI = {
                    browser: [[/(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i], [bK, bZ, b1], [/\s(opr)\/((\d+)?[\w\.]+)/i], [[bK, "Opera"], bZ, b1], [/(kindle)\/((\d+)?[\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i, /(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i, /(rekonq)((?:\/)[\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i], [bK, bZ, b1], [/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i], [[bK, "IE"], bZ, b1], [/(yabrowser)\/((\d+)?[\w\.]+)/i], [[bK, "Yandex"], bZ, b1], [/(comodo_dragon)\/((\d+)?[\w\.]+)/i], [[bK, /_/g, " "], bZ, b1], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i], [bK, bZ, b1], [/(dolfin)\/((\d+)?[\w\.]+)/i], [[bK, "Dolphin"], bZ, b1], [/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i], [[bK, "Chrome"], bZ, b1], [/((?:android.+))version\/((\d+)?[\w\.]+)\smobile\ssafari/i], [[bK, "Android Browser"], bZ, b1], [/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i], [bZ, b1, [bK, "Mobile Safari"]], [/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i], [bZ, b1, bK], [/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i], [bK, [b1, bJ.str, bH.browser.oldsafari.major], [bZ, bJ.str, bH.browser.oldsafari.version]], [/(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i], [bK, bZ, b1], [/(navigator|netscape)\/((\d+)?[\w\.-]+)/i], [[bK, "Netscape"], bZ, b1], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, /(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i, /(links)\s\(((\d+)?[\w\.]+)/i, /(gobrowser)\/?((\d+)?[\w\.]+)*/i, /(ice\s?browser)\/v?((\d+)?[\w\._]+)/i, /(mosaic)[\/\s]((\d+)?[\w\.]+)/i], [bK, bZ, b1]],
                    engine: [[/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [bK, bZ], [/rv\:([\w\.]+).*(gecko)/i], [bZ, bK]],
                    os: [[/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [bK, [bZ, bJ.str, bH.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[bK, "Windows"], [bZ, bJ.str, bH.os.windows.version]], [/\((bb)(10);/i], [[bK, "BlackBerry"], bZ], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)\/([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i], [bK, bZ], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[bK, "Symbian"], bZ], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[bK, "Firefox OS"], bZ], [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [bK, bZ], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[bK, "Chromium OS"], bZ], [/(sunos)\s?([\w\.]+\d)*/i], [[bK, "Solaris"], bZ], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [bK, bZ], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i], [[bK, "iOS"], [bZ, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i], [bK, [bZ, /_/g, "."]], [/(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i, /(unix)\s?([\w\.]+)*/i], [bK, bZ]]
                }, bL = function (b2) {
                    var b3 = b2 || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : bM);
                    this.getBrowser = function () {
                        return bJ.rgx.apply(this, bI.browser);
                    }, this.getEngine = function () {
                        return bJ.rgx.apply(this, bI.engine);
                    }, this.getOS = function () {
                        return bJ.rgx.apply(this, bI.os);
                    }, this.getResult = function () {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS()
                        };
                    }, this.getUA = function () {
                        return b3;
                    }, this.setUA = function (b4) {
                        return b3 = b4, this;
                    }, this.setUA(b3);
                };
                return (new bL).getResult();
            }(), bC = function () {
                var bH = {
                    define_property: function () {
                        return !1;
                    }(), create_canvas: function () {
                        var bI = document.createElement("canvas");
                        return !(!bI.getContext || !bI.getContext("2d"));
                    }(), return_response_type: function (bJ) {
                        try {
                            if (-1 !== bF.inArray(bJ, ["", "text", "document"])) {
                                return !0;
                            }
                            if (window.XMLHttpRequest) {
                                var bK = new XMLHttpRequest;
                                if (bK.open("get", "/"), "responseType" in bK) {
                                    return bK.responseType = bJ, bK.responseType !== bJ ? !1 : !0;
                                }
                            }
                        } catch (bI) {
                        }
                        return !1;
                    }, use_data_uri: function () {
                        var bI = new Image;
                        return bI.onload = function () {
                            bH.use_data_uri = 1 === bI.width && 1 === bI.height;
                        }, setTimeout(function () {
                            bI.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
                        }, 1), !1;
                    }(), use_data_uri_over32kb: function () {
                        return bH.use_data_uri && ("IE" !== bE.browser || bE.version >= 9);
                    }, use_data_uri_of: function (bI) {
                        return bH.use_data_uri && 33000 > bI || bH.use_data_uri_over32kb();
                    }, use_fileinput: function () {
                        var bI = document.createElement("input");
                        return bI.setAttribute("type", "file"), !bI.disabled;
                    }
                };
                return function (bJ) {
                    var bI = [].slice.call(arguments);
                    return bI.shift(), "function" === bF.typeOf(bH[bJ]) ? bH[bJ].apply(this, bI) : !!bH[bJ];
                };
            }(), bE = {
                can: bC,
                browser: bG.browser.name,
                version: parseFloat(bG.browser.major),
                os: bG.os.name,
                osVersion: bG.os.version,
                verComp: bD,
                swf_url: "../flash/Moxie.swf",
                xap_url: "../silverlight/Moxie.xap",
                global_event_dispatcher: "moxie.core.EventTarget.instance.dispatchEvent"
            };
            return bE.OS = bE.os, bE;
        }), br(bv, [bx], function (bH) {
            var bE = function (bK) {
                return "string" != typeof bK ? bK : document.getElementById(bK);
            }, bJ = function (bL, bK) {
                if (!bL.className) {
                    return !1;
                }
                var bM = new RegExp("(^|\\s+)" + bK + "(\\s+|$)");
                return bM.test(bL.className);
            }, bD = function (bL, bK) {
                bJ(bL, bK) || (bL.className = bL.className ? bL.className.replace(/\s+$/, "") + " " + bK : bK);
            }, bG = function (bL, bK) {
                if (bL.className) {
                    var bM = new RegExp("(^|\\s+)" + bK + "(\\s+|$)");
                    bL.className = bL.className.replace(bM, function (bO, bN, bP) {
                        return " " === bN && " " === bP ? " " : "";
                    });
                }
            }, bI = function (bL, bK) {
                return bL.currentStyle ? bL.currentStyle[bK] : window.getComputedStyle ? window.getComputedStyle(bL, null)[bK] : void 0;
            }, bC = function (bR, bM) {
                function bN(bW) {
                    var bU, bX, bT = 0, bV = 0;
                    return bW && (bX = bW.getBoundingClientRect(), bU = "CSS1Compat" === bS.compatMode ? bS.documentElement : bS.body, bT = bX.left + bU.scrollLeft, bV = bX.top + bU.scrollTop), {
                        x: bT,
                        y: bV
                    };
                }

                var bK = 0, bL = 0, bP, bS = document, bQ, bO;
                if (bR = bR, bM = bM || bS.body, bR && bR.getBoundingClientRect && "IE" === bH.browser && (!bS.documentMode || bS.documentMode < 8)) {
                    return bQ = bN(bR), bO = bN(bM), {x: bQ.x - bO.x, y: bQ.y - bO.y};
                }
                for (bP = bR; bP && bP != bM && bP.nodeType;) {
                    bK += bP.offsetLeft || 0, bL += bP.offsetTop || 0, bP = bP.offsetParent;
                }
                for (bP = bR.parentNode; bP && bP != bM && bP.nodeType;) {
                    bK -= bP.scrollLeft || 0, bL -= bP.scrollTop || 0, bP = bP.parentNode;
                }
                return {x: bK, y: bL};
            }, bF = function (bK) {
                return {w: bK.offsetWidth || bK.clientWidth, h: bK.offsetHeight || bK.clientHeight};
            };
            return {get: bE, hasClass: bJ, addClass: bD, removeClass: bG, getStyle: bI, getPos: bC, getSize: bF};
        }), br(bs, [bd], function (bD) {
            function bC(bF, bE) {
                var bG;
                for (bG in bF) {
                    if (bF[bG] === bE) {
                        return bG;
                    }
                }
                return null;
            }

            return {
                RuntimeError: function () {
                    function bF(bG) {
                        this.code = bG, this.name = bC(bE, bG), this.message = this.name + ": RuntimeError " + this.code;
                    }

                    var bE = {NOT_INIT_ERR: 1, NOT_SUPPORTED_ERR: 9, JS_ERR: 4};
                    return bD.extend(bF, bE), bF.prototype = Error.prototype, bF;
                }(), OperationNotAllowedException: function () {
                    function bE(bF) {
                        this.code = bF, this.name = "OperationNotAllowedException";
                    }

                    return bD.extend(bE, {NOT_ALLOWED_ERR: 1}), bE.prototype = Error.prototype, bE;
                }(), ImageError: function () {
                    function bF(bG) {
                        this.code = bG, this.name = bC(bE, bG), this.message = this.name + ": ImageError " + this.code;
                    }

                    var bE = {WRONG_FORMAT: 1, MAX_RESOLUTION_ERR: 2};
                    return bD.extend(bF, bE), bF.prototype = Error.prototype, bF;
                }(), FileException: function () {
                    function bF(bG) {
                        this.code = bG, this.name = bC(bE, bG), this.message = this.name + ": FileException " + this.code;
                    }

                    var bE = {
                        NOT_FOUND_ERR: 1,
                        SECURITY_ERR: 2,
                        ABORT_ERR: 3,
                        NOT_READABLE_ERR: 4,
                        ENCODING_ERR: 5,
                        NO_MODIFICATION_ALLOWED_ERR: 6,
                        INVALID_STATE_ERR: 7,
                        SYNTAX_ERR: 8
                    };
                    return bD.extend(bF, bE), bF.prototype = Error.prototype, bF;
                }(), DOMException: function () {
                    function bF(bG) {
                        this.code = bG, this.name = bC(bE, bG), this.message = this.name + ": DOMException " + this.code;
                    }

                    var bE = {
                        INDEX_SIZE_ERR: 1,
                        DOMSTRING_SIZE_ERR: 2,
                        HIERARCHY_REQUEST_ERR: 3,
                        WRONG_DOCUMENT_ERR: 4,
                        INVALID_CHARACTER_ERR: 5,
                        NO_DATA_ALLOWED_ERR: 6,
                        NO_MODIFICATION_ALLOWED_ERR: 7,
                        NOT_FOUND_ERR: 8,
                        NOT_SUPPORTED_ERR: 9,
                        INUSE_ATTRIBUTE_ERR: 10,
                        INVALID_STATE_ERR: 11,
                        SYNTAX_ERR: 12,
                        INVALID_MODIFICATION_ERR: 13,
                        NAMESPACE_ERR: 14,
                        INVALID_ACCESS_ERR: 15,
                        VALIDATION_ERR: 16,
                        TYPE_MISMATCH_ERR: 17,
                        SECURITY_ERR: 18,
                        NETWORK_ERR: 19,
                        ABORT_ERR: 20,
                        URL_MISMATCH_ERR: 21,
                        QUOTA_EXCEEDED_ERR: 22,
                        TIMEOUT_ERR: 23,
                        INVALID_NODE_TYPE_ERR: 24,
                        DATA_CLONE_ERR: 25
                    };
                    return bD.extend(bF, bE), bF.prototype = Error.prototype, bF;
                }(), EventException: function () {
                    function bE(bF) {
                        this.code = bF, this.name = "EventException";
                    }

                    return bD.extend(bE, {UNSPECIFIED_EVENT_TYPE_ERR: 0}), bE.prototype = Error.prototype, bE;
                }()
            };
        }), br(bj, [bs, bd], function (bD, bC) {
            function bE() {
                var bF = {};
                bC.extend(this, {
                    uid: null, init: function () {
                        this.uid || (this.uid = bC.guid("uid_"));
                    }, addEventListener: function (bK, bH, bJ, bL) {
                        var bG = this, bI;
                        return bK = bC.trim(bK), /\s/.test(bK) ? void bC.each(bK.split(/\s+/), function (bM) {
                                bG.addEventListener(bM, bH, bJ, bL);
                            }) : (bK = bK.toLowerCase(), bJ = parseInt(bJ, 10) || 0, bI = bF[this.uid] && bF[this.uid][bK] || [], bI.push({
                                fn: bH,
                                priority: bJ,
                                scope: bL || this
                            }), bF[this.uid] || (bF[this.uid] = {}), void (bF[this.uid][bK] = bI));
                    }, hasEventListener: function (bG) {
                        return bG ? !(!bF[this.uid] || !bF[this.uid][bG]) : !!bF[this.uid];
                    }, removeEventListener: function (bI, bG) {
                        bI = bI.toLowerCase();
                        var bH = bF[this.uid] && bF[this.uid][bI], bJ;
                        if (bH) {
                            if (bG) {
                                for (bJ = bH.length - 1; bJ >= 0; bJ--) {
                                    if (bH[bJ].fn === bG) {
                                        bH.splice(bJ, 1);
                                        break;
                                    }
                                }
                            } else {
                                bH = [];
                            }
                            bH.length || (delete bF[this.uid][bI], bC.isEmptyObj(bF[this.uid]) && delete bF[this.uid]);
                        }
                    }, removeAllEventListeners: function () {
                        bF[this.uid] && delete bF[this.uid];
                    }, dispatchEvent: function (bJ) {
                        var bG, bH, bM, bO, bN = {}, bL = !0, bI;
                        if ("string" !== bC.typeOf(bJ)) {
                            if (bO = bJ, "string" !== bC.typeOf(bO.type)) {
                                throw new bD.EventException(bD.EventException.UNSPECIFIED_EVENT_TYPE_ERR);
                            }
                            bJ = bO.type, bO.total !== bI && bO.loaded !== bI && (bN.total = bO.total, bN.loaded = bO.loaded), bN.async = bO.async || !1;
                        }
                        if (-1 !== bJ.indexOf("::") ? !function (bP) {
                                    bG = bP[0], bJ = bP[1];
                                }(bJ.split("::")) : bG = this.uid, bJ = bJ.toLowerCase(), bH = bF[bG] && bF[bG][bJ]) {
                            bH.sort(function (bQ, bP) {
                                return bP.priority - bQ.priority;
                            }), bM = [].slice.call(arguments), bM.shift(), bN.type = bJ, bM.unshift(bN);
                            var bK = [];
                            bC.each(bH, function (bP) {
                                bM[0].target = bP.scope, bK.push(bN.async ? function (bQ) {
                                        setTimeout(function () {
                                            bQ(bP.fn.apply(bP.scope, bM) === !1);
                                        }, 1);
                                    } : function (bQ) {
                                        bQ(bP.fn.apply(bP.scope, bM) === !1);
                                    });
                            }), bK.length && bC.inSeries(bK, function (bP) {
                                bL = !bP;
                            });
                        }
                        return bL;
                    }, bind: function () {
                        this.addEventListener.apply(this, arguments);
                    }, unbind: function () {
                        this.removeEventListener.apply(this, arguments);
                    }, unbindAll: function () {
                        this.removeAllEventListeners.apply(this, arguments);
                    }, trigger: function () {
                        return this.dispatchEvent.apply(this, arguments);
                    }, convertEventPropsToHandlers: function (bH) {
                        var bI;
                        "array" !== bC.typeOf(bH) && (bH = [bH]);
                        for (var bG = 0; bG < bH.length; bG++) {
                            bI = "on" + bH[bG], "function" === bC.typeOf(this[bI]) ? this.addEventListener(bH[bG], this[bI]) : "undefined" === bC.typeOf(this[bI]) && (this[bI] = null);
                        }
                    }
                });
            }

            return bE.instance = new bE, bE;
        }), br(bm, [], function () {
            var bE = function (bG) {
                return unescape(encodeURIComponent(bG));
            }, bD = function (bG) {
                return decodeURIComponent(escape(bG));
            }, bF = function (bP, bJ) {
                if ("function" == typeof window.atob) {
                    return bJ ? bD(window.atob(bP)) : window.atob(bP);
                }
                var bM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bG, bI, bS, bU, bT, bR, bL, bQ, bO = 0, bN = 0, bH = "", bK = [];
                if (!bP) {
                    return bP;
                }
                bP += "";
                do {
                    bU = bM.indexOf(bP.charAt(bO++)), bT = bM.indexOf(bP.charAt(bO++)), bR = bM.indexOf(bP.charAt(bO++)), bL = bM.indexOf(bP.charAt(bO++)), bQ = bU << 18 | bT << 12 | bR << 6 | bL, bG = bQ >> 16 & 255, bI = bQ >> 8 & 255, bS = 255 & bQ, bK[bN++] = 64 == bR ? String.fromCharCode(bG) : 64 == bL ? String.fromCharCode(bG, bI) : String.fromCharCode(bG, bI, bS);
                } while (bO < bP.length);
                return bH = bK.join(""), bJ ? bD(bH) : bH;
            }, bC = function (bU, bJ) {
                if (bJ && bE(bU), "function" == typeof window.btoa) {
                    return window.btoa(bU);
                }
                var bM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bG, bI, bS, bV, bT, bR, bL, bQ, bP = 0, bN = 0, bH = "", bK = [];
                if (!bU) {
                    return bU;
                }
                do {
                    bG = bU.charCodeAt(bP++), bI = bU.charCodeAt(bP++), bS = bU.charCodeAt(bP++), bQ = bG << 16 | bI << 8 | bS, bV = bQ >> 18 & 63, bT = bQ >> 12 & 63, bR = bQ >> 6 & 63, bL = 63 & bQ, bK[bN++] = bM.charAt(bV) + bM.charAt(bT) + bM.charAt(bR) + bM.charAt(bL);
                } while (bP < bU.length);
                bH = bK.join("");
                var bO = bU.length % 3;
                return (bO ? bH.slice(0, bO - 3) : bH) + "===".slice(bO || 3);
            };
            return {utf8_encode: bE, utf8_decode: bD, atob: bF, btoa: bC};
        }), br(bt, [bd, bv, bj], function (bF, bD, bH) {
            function bC(bJ, bI, bO, bQ, bP) {
                var bN = this, bK, bM = bF.guid(bI + "_"), bL = bP || "browser";
                bJ = bJ || {}, bG[bM] = this, bO = bF.extend({
                    access_binary: !1,
                    access_image_binary: !1,
                    display_media: !1,
                    do_cors: !1,
                    drag_and_drop: !1,
                    filter_by_extension: !0,
                    resize_image: !1,
                    report_upload_progress: !1,
                    return_response_headers: !1,
                    return_response_type: !1,
                    return_status_code: !0,
                    send_custom_headers: !1,
                    select_file: !1,
                    select_folder: !1,
                    select_multiple: !0,
                    send_binary_string: !1,
                    send_browser_cookies: !0,
                    send_multipart: !0,
                    slice_blob: !1,
                    stream_upload: !1,
                    summon_file_dialog: !1,
                    upload_filesize: !0,
                    use_http_method: !0
                }, bO), bJ.preferred_caps && (bL = bC.getMode(bQ, bJ.preferred_caps, bL)), bK = function () {
                    var bR = {};
                    return {
                        exec: function (bU, bV, bS, bT) {
                            return bK[bV] && (bR[bU] || (bR[bU] = {
                                context: this,
                                instance: new bK[bV]
                            }), bR[bU].instance[bS]) ? bR[bU].instance[bS].apply(this, bT) : void 0;
                        }, removeInstance: function (bS) {
                            delete bR[bS];
                        }, removeAllInstances: function () {
                            var bS = this;
                            bF.each(bR, function (bU, bT) {
                                "function" === bF.typeOf(bU.instance.destroy) && bU.instance.destroy.call(bU.context), bS.removeInstance(bT);
                            });
                        }
                    };
                }(), bF.extend(this, {
                    initialized: !1,
                    uid: bM,
                    type: bI,
                    mode: bC.getMode(bQ, bJ.required_caps, bL),
                    shimid: bM + "_container",
                    clients: 0,
                    options: bJ,
                    can: function (bR, bU) {
                        var bS = arguments[2] || bO;
                        if ("string" === bF.typeOf(bR) && "undefined" === bF.typeOf(bU) && (bR = bC.parseCaps(bR)), "object" === bF.typeOf(bR)) {
                            for (var bT in bR) {
                                if (!this.can(bT, bR[bT], bS)) {
                                    return !1;
                                }
                            }
                            return !0;
                        }
                        return "function" === bF.typeOf(bS[bR]) ? bS[bR].call(this, bU) : bU === bS[bR];
                    },
                    getShimContainer: function () {
                        var bS, bR = bD.get(this.shimid);
                        return bR || (bS = this.options.container ? bD.get(this.options.container) : document.body, bR = document.createElement("div"), bR.id = this.shimid, bR.className = "moxie-shim moxie-shim-" + this.type, bF.extend(bR.style, {
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            width: "1px",
                            height: "1px",
                            overflow: "hidden"
                        }), bS.appendChild(bR), bS = null), bR;
                    },
                    getShim: function () {
                        return bK;
                    },
                    shimExec: function (bS, bR) {
                        var bT = [].slice.call(arguments, 2);
                        return bN.getShim().exec.call(this, this.uid, bS, bR, bT);
                    },
                    exec: function (bS, bR) {
                        var bT = [].slice.call(arguments, 2);
                        return bN[bS] && bN[bS][bR] ? bN[bS][bR].apply(this, bT) : bN.shimExec.apply(this, arguments);
                    },
                    destroy: function () {
                        if (bN) {
                            var bR = bD.get(this.shimid);
                            bR && bR.parentNode.removeChild(bR), bK && bK.removeAllInstances(), this.unbindAll(), delete bG[this.uid], this.uid = null, bM = bN = bK = bR = null;
                        }
                    }
                }), this.mode && bJ.required_caps && !this.can(bJ.required_caps) && (this.mode = !1);
            }

            var bE = {}, bG = {};
            return bC.order = "html5,flash,silverlight,html4", bC.getRuntime = function (bI) {
                return bG[bI] ? bG[bI] : !1;
            }, bC.addConstructor = function (bJ, bI) {
                bI.prototype = bH.instance, bE[bJ] = bI;
            }, bC.getConstructor = function (bI) {
                return bE[bI] || null;
            }, bC.getInfo = function (bJ) {
                var bI = bC.getRuntime(bJ);
                return bI ? {
                        uid: bI.uid, type: bI.type, mode: bI.mode, can: function () {
                            return bI.can.apply(bI, arguments);
                        }
                    } : null;
            }, bC.parseCaps = function (bI) {
                var bJ = {};
                return "string" !== bF.typeOf(bI) ? bI || {} : (bF.each(bI.split(","), function (bK) {
                        bJ[bK] = !0;
                    }), bJ);
            }, bC.can = function (bK, bI) {
                var bM, bJ = bC.getConstructor(bK), bL;
                return bJ ? (bM = new bJ({required_caps: bI}), bL = bM.mode, bM.destroy(), !!bL) : !1;
            }, bC.thatCan = function (bK, bI) {
                var bL = (bI || bC.order).split(/\s*,\s*/);
                for (var bJ in bL) {
                    if (bC.can(bL[bJ], bK)) {
                        return bL[bJ];
                    }
                }
                return null;
            }, bC.getMode = function (bJ, bL, bI) {
                var bK = null;
                if ("undefined" === bF.typeOf(bI) && (bI = "browser"), bL && !bF.isEmptyObj(bJ)) {
                    if (bF.each(bL, function (bO, bM) {
                            if (bJ.hasOwnProperty(bM)) {
                                var bN = bJ[bM](bO);
                                if ("string" == typeof bN && (bN = [bN]), bK) {
                                    if (!(bK = bF.arrayIntersect(bK, bN))) {
                                        return bK = !1;
                                    }
                                } else {
                                    bK = bN;
                                }
                            }
                        }), bK) {
                        return -1 !== bF.inArray(bI, bK) ? bI : bK[0];
                    }
                    if (bK === !1) {
                        return !1;
                    }
                }
                return bI;
            }, bC.capTrue = function () {
                return !0;
            }, bC.capFalse = function () {
                return !1;
            }, bC.capTest = function (bI) {
                return function () {
                    return !!bI;
                };
            }, bC;
        }), br(bc, [bs, bd, bt], function (bE, bD, bF) {
            return function bC() {
                var bG;
                bD.extend(this, {
                    connectRuntime: function (bJ) {
                        function bK(bM) {
                            var bN, bL;
                            return bM.length ? (bN = bM.shift(), (bL = bF.getConstructor(bN)) ? (bG = new bL(bJ), bG.bind("Init", function () {
                                        bG.initialized = !0, setTimeout(function () {
                                            bG.clients++, bH.trigger("RuntimeInit", bG);
                                        }, 1);
                                    }), bG.bind("Error", function () {
                                        bG.destroy(), bK(bM);
                                    }), bG.mode ? void bG.init() : void bG.trigger("Error")) : void bK(bM)) : (bH.trigger("RuntimeError", new bE.RuntimeError(bE.RuntimeError.NOT_INIT_ERR)), void (bG = null));
                        }

                        var bH = this, bI;
                        if ("string" === bD.typeOf(bJ) ? bI = bJ : "string" === bD.typeOf(bJ.ruid) && (bI = bJ.ruid), bI) {
                            if (bG = bF.getRuntime(bI)) {
                                return bG.clients++, bG;
                            }
                            throw new bE.RuntimeError(bE.RuntimeError.NOT_INIT_ERR);
                        }
                        bK((bJ.runtime_order || bF.order).split(/\s*,\s*/));
                    }, getRuntime: function () {
                        return bG && bG.uid ? bG : (bG = null, null);
                    }, disconnectRuntime: function () {
                        bG && --bG.clients <= 0 && (bG.destroy(), bG = null);
                    }
                });
            };
        }), br(a9, [bd, bm, bc], function (bF, bD, bG) {
            function bC(bJ, bH) {
                function bI(bL, bO, bN) {
                    var bK, bM = bE[this.uid];
                    return "string" === bF.typeOf(bM) && bM.length ? (bK = new bC(null, {
                            type: bN,
                            size: bO - bL
                        }), bK.detach(bM.substr(bL, bK.size)), bK) : null;
                }

                bG.call(this), bJ && this.connectRuntime(bJ), bH ? "string" === bF.typeOf(bH) && (bH = {data: bH}) : bH = {}, bF.extend(this, {
                    uid: bH.uid || bF.guid("uid_"),
                    ruid: bJ,
                    size: bH.size || 0,
                    type: bH.type || "",
                    slice: function (bL, bK, bM) {
                        return this.isDetached() ? bI.apply(this, arguments) : this.getRuntime().exec.call(this, "Blob", "slice", this.getSource(), bL, bK, bM);
                    },
                    getSource: function () {
                        return bE[this.uid] ? bE[this.uid] : null;
                    },
                    detach: function (bK) {
                        this.ruid && (this.getRuntime().exec.call(this, "Blob", "destroy"), this.disconnectRuntime(), this.ruid = null), bK = bK || "";
                        var bL = bK.match(/^data:([^;]*);base64,/);
                        bL && (this.type = bL[1], bK = bD.atob(bK.substring(bK.indexOf("base64,") + 7))), this.size = bK.length, bE[this.uid] = bK;
                    },
                    isDetached: function () {
                        return !this.ruid && "string" === bF.typeOf(bE[this.uid]);
                    },
                    destroy: function () {
                        this.detach(), delete bE[this.uid];
                    }
                }), bH.data ? this.detach(bH.data) : bE[this.uid] = bH;
            }

            var bE = {};
            return bC;
        }), br(bb, [bd, bn, a9], function (bE, bD, bF) {
            function bC(bH, bJ) {
                var bK, bG;
                if (bJ || (bJ = {}), bG = bJ.type && "" !== bJ.type ? bJ.type : bD.getFileMime(bJ.name), bJ.name) {
                    bK = bJ.name.replace(/\\/g, "/"), bK = bK.substr(bK.lastIndexOf("/") + 1);
                } else {
                    var bI = bG.split("/")[0];
                    bK = bE.guid(("" !== bI ? bI : "file") + "_"), bD.extensions[bG] && (bK += "." + bD.extensions[bG][0]);
                }
                bF.apply(this, arguments), bE.extend(this, {
                    type: bG || "",
                    name: bK || bE.guid("file_"),
                    lastModifiedDate: bJ.lastModifiedDate || (new Date).toLocaleString()
                });
            }

            return bC.prototype = bF.prototype, bC;
        }), br(aV, [bd, bn, bv, bs, bj, by, bb, bt, bc], function (bH, bL, bE, bG, bC, bD, bJ, bM, bK) {
            function bI(bO) {
                var bR = this, bQ, bP, bN;
                if (-1 !== bH.inArray(bH.typeOf(bO), ["string", "node"]) && (bO = {browse_button: bO}), bP = bE.get(bO.browse_button), !bP) {
                    throw new bG.DOMException(bG.DOMException.NOT_FOUND_ERR);
                }
                bN = {
                    accept: [{title: bD.translate("All Files"), extensions: "*"}],
                    name: "file",
                    multiple: !1,
                    required_caps: !1,
                    container: bP.parentNode || document.body
                }, bO = bH.extend({}, bN, bO), "string" == typeof bO.required_caps && (bO.required_caps = bM.parseCaps(bO.required_caps)), "string" == typeof bO.accept && (bO.accept = bL.mimes2extList(bO.accept)), bQ = bE.get(bO.container), bQ || (bQ = document.body), "static" === bE.getStyle(bQ, "position") && (bQ.style.position = "relative"), bQ = bP = null, bK.call(bR), bH.extend(bR, {
                    uid: bH.guid("uid_"),
                    ruid: null,
                    shimid: null,
                    files: null,
                    init: function () {
                        bR.convertEventPropsToHandlers(bF), bR.bind("RuntimeInit", function (bT, bS) {
                            bR.ruid = bS.uid, bR.shimid = bS.shimid, bR.bind("Ready", function () {
                                bR.trigger("Refresh");
                            }, 999), bR.bind("Change", function () {
                                var bU = bS.exec.call(bR, "FileInput", "getFiles");
                                bR.files = [], bH.each(bU, function (bV) {
                                    return 0 === bV.size ? !0 : void bR.files.push(new bJ(bR.ruid, bV));
                                });
                            }, 999), bR.bind("Refresh", function () {
                                var bV, bX, bU, bW;
                                bU = bE.get(bO.browse_button), bW = bE.get(bS.shimid), bU && (bV = bE.getPos(bU, bE.get(bO.container)), bX = bE.getSize(bU), bW && bH.extend(bW.style, {
                                    top: bV.y + "px",
                                    left: bV.x + "px",
                                    width: bX.w + "px",
                                    height: bX.h + "px"
                                })), bW = bU = null;
                            }), bS.exec.call(bR, "FileInput", "init", bO);
                        }), bR.connectRuntime(bH.extend({}, bO, {required_caps: {select_file: !0}}));
                    },
                    disable: function (bS) {
                        var bT = this.getRuntime();
                        bT && bT.exec.call(this, "FileInput", "disable", "undefined" === bH.typeOf(bS) ? !0 : bS);
                    },
                    refresh: function () {
                        bR.trigger("Refresh");
                    },
                    destroy: function () {
                        var bS = this.getRuntime();
                        bS && (bS.exec.call(this, "FileInput", "destroy"), this.disconnectRuntime()), "array" === bH.typeOf(this.files) && bH.each(this.files, function (bT) {
                            bT.destroy();
                        }), this.files = null;
                    }
                });
            }

            var bF = ["ready", "change", "cancel", "mouseenter", "mouseleave", "mousedown", "mouseup"];
            return bI.prototype = bC.instance, bI;
        }), br(bB, [by, bv, bs, bd, bb, bc, bj, bn], function (bG, bK, bE, bF, bC, bD, bI, bL) {
            function bJ(bO) {
                var bM = this, bN;
                "string" == typeof bO && (bO = {drop_zone: bO}), bN = {
                    accept: [{
                        title: bG.translate("All Files"),
                        extensions: "*"
                    }], required_caps: {drag_and_drop: !0}
                }, bO = "object" == typeof bO ? bF.extend({}, bN, bO) : bN, bO.container = bK.get(bO.drop_zone) || document.body, "static" === bK.getStyle(bO.container, "position") && (bO.container.style.position = "relative"), "string" == typeof bO.accept && (bO.accept = bL.mimes2extList(bO.accept)), bD.call(bM), bF.extend(bM, {
                    uid: bF.guid("uid_"),
                    ruid: null,
                    files: null,
                    init: function () {
                        bM.convertEventPropsToHandlers(bH), bM.bind("RuntimeInit", function (bQ, bP) {
                            bM.ruid = bP.uid, bM.bind("Drop", function () {
                                var bR = bP.exec.call(bM, "FileDrop", "getFiles");
                                bM.files = [], bF.each(bR, function (bS) {
                                    bM.files.push(new bC(bM.ruid, bS));
                                });
                            }, 999), bP.exec.call(bM, "FileDrop", "init", bO), bM.dispatchEvent("ready");
                        }), bM.connectRuntime(bO);
                    },
                    destroy: function () {
                        var bP = this.getRuntime();
                        bP && (bP.exec.call(this, "FileDrop", "destroy"), this.disconnectRuntime()), this.files = null;
                    }
                });
            }

            var bH = ["ready", "dragenter", "dragleave", "drop", "error"];
            return bJ.prototype = bI.instance, bJ;
        }), br(ba, [bd, bc, bj], function (bE, bD, bF) {
            function bC() {
                this.uid = bE.guid("uid_"), bD.call(this), this.destroy = function () {
                    this.disconnectRuntime(), this.unbindAll();
                };
            }

            return bC.prototype = bF.instance, bC;
        }), br(bz, [bd, bm, bs, bj, a9, bb, ba], function (bG, bJ, bE, bF, bC, bD, bH) {
            function bK() {
                function bL(bS, bP) {
                    function bO(bU) {
                        bM.readyState = bK.DONE, bM.error = bU, bM.trigger("error"), bT();
                    }

                    function bT() {
                        bN.destroy(), bN = null, bM.trigger("loadend");
                    }

                    function bR(bU) {
                        bN.bind("Error", function (bW, bV) {
                            bO(bV);
                        }), bN.bind("Progress", function (bV) {
                            bM.result = bU.exec.call(bN, "FileReader", "getResult"), bM.trigger(bV);
                        }), bN.bind("Load", function (bV) {
                            bM.readyState = bK.DONE, bM.result = bU.exec.call(bN, "FileReader", "getResult"), bM.trigger(bV), bT();
                        }), bU.exec.call(bN, "FileReader", "read", bS, bP);
                    }

                    if (bN = new bH, this.convertEventPropsToHandlers(bI), this.readyState === bK.LOADING) {
                        return bO(new bE.DOMException(bE.DOMException.INVALID_STATE_ERR));
                    }
                    if (this.readyState = bK.LOADING, this.trigger("loadstart"), bP instanceof bC) {
                        if (bP.isDetached()) {
                            var bQ = bP.getSource();
                            switch (bS) {
                                case"readAsText":
                                case"readAsBinaryString":
                                    this.result = bQ;
                                    break;
                                case"readAsDataURL":
                                    this.result = "data:" + bP.type + ";base64," + bJ.btoa(bQ);
                            }
                            this.readyState = bK.DONE, this.trigger("load"), bT();
                        } else {
                            bR(bN.connectRuntime(bP.ruid));
                        }
                    } else {
                        bO(new bE.DOMException(bE.DOMException.NOT_FOUND_ERR));
                    }
                }

                var bM = this, bN;
                bG.extend(this, {
                    uid: bG.guid("uid_"),
                    readyState: bK.EMPTY,
                    result: null,
                    error: null,
                    readAsBinaryString: function (bO) {
                        bL.call(this, "readAsBinaryString", bO);
                    },
                    readAsDataURL: function (bO) {
                        bL.call(this, "readAsDataURL", bO);
                    },
                    readAsText: function (bO) {
                        bL.call(this, "readAsText", bO);
                    },
                    abort: function () {
                        this.result = null, -1 === bG.inArray(this.readyState, [bK.EMPTY, bK.DONE]) && (this.readyState === bK.LOADING && (this.readyState = bK.DONE), bN && bN.getRuntime().exec.call(this, "FileReader", "abort"), this.trigger("abort"), this.trigger("loadend"));
                    },
                    destroy: function () {
                        this.abort(), bN && (bN.getRuntime().exec.call(this, "FileReader", "destroy"), bN.disconnectRuntime()), bM = bN = null;
                    }
                });
            }

            var bI = ["loadstart", "progress", "load", "abort", "error", "loadend"];
            return bK.EMPTY = 0, bK.LOADING = 1, bK.DONE = 2, bK.prototype = bF.instance, bK;
        }), br(aG, [], function () {
            var bD = function (bM, bH) {
                for (var bI = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], bF = bI.length, bG = {
                    http: 80,
                    https: 443
                }, bK = {}, bN = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/, bL = bN.exec(bM || ""); bF--;) {
                    bL[bF] && (bK[bI[bF]] = bL[bF]);
                }
                if (!bK.scheme) {
                    bH && "string" != typeof bH || (bH = bD(bH || document.location.href)), bK.scheme = bH.scheme, bK.host = bH.host, bK.port = bH.port;
                    var bJ = "";
                    /^[^\/]/.test(bK.path) && (bJ = bH.path, /(\/|\/[^\.]+)$/.test(bJ) ? bJ += "/" : bJ = bJ.replace(/\/[^\/]+$/, "/")), bK.path = bJ + (bK.path || "");
                }
                return bK.port || (bK.port = bG[bK.scheme] || 80), bK.port = parseInt(bK.port, 10), bK.path || (bK.path = "/"), delete bK.source, bK;
            }, bC = function (bG) {
                var bH = {http: 80, https: 443}, bF = bD(bG);
                return bF.scheme + "://" + bF.host + (bF.port !== bH[bF.scheme] ? ":" + bF.port : "") + bF.path + (bF.query ? bF.query : "");
            }, bE = function (bF) {
                function bG(bH) {
                    return [bH.scheme, bH.host, bH.port].join("/");
                }

                return "string" == typeof bF && (bF = bD(bF)), bG(bD()) === bG(bF);
            };
            return {parseUrl: bD, resolveUrl: bC, hasSameOrigin: bE};
        }), br(aD, [bd, bc, bm], function (bD, bC, bE) {
            return function () {
                function bF(bL, bI) {
                    if (!bI.isDetached()) {
                        var bH = this.connectRuntime(bI.ruid).exec.call(this, "FileReaderSync", "read", bL, bI);
                        return this.disconnectRuntime(), bH;
                    }
                    var bK = bI.getSource();
                    switch (bL) {
                        case"readAsBinaryString":
                            return bK;
                        case"readAsDataURL":
                            return "data:" + bI.type + ";base64," + bE.btoa(bK);
                        case"readAsText":
                            for (var bM = "", bG = 0, bJ = bK.length; bJ > bG; bG++) {
                                bM += String.fromCharCode(bK[bG]);
                            }
                            return bM;
                    }
                }

                bC.call(this), bD.extend(this, {
                    uid: bD.guid("uid_"), readAsBinaryString: function (bG) {
                        return bF.call(this, "readAsBinaryString", bG);
                    }, readAsDataURL: function (bG) {
                        return bF.call(this, "readAsDataURL", bG);
                    }, readAsText: function (bG) {
                        return bF.call(this, "readAsText", bG);
                    }
                });
            };
        }), br(aZ, [bs, bd, a9], function (bE, bD, bF) {
            function bC() {
                var bH, bG = [];
                bD.extend(this, {
                    append: function (bK, bL) {
                        var bI = this, bJ = bD.typeOf(bL);
                        bL instanceof bF ? bH = {
                                name: bK,
                                value: bL
                            } : "array" === bJ ? (bK += "[]", bD.each(bL, function (bM) {
                                    bI.append(bK, bM);
                                })) : "object" === bJ ? bD.each(bL, function (bN, bM) {
                                        bI.append(bK + "[" + bM + "]", bN);
                                    }) : "null" === bJ || "undefined" === bJ || "number" === bJ && isNaN(bL) ? bI.append(bK, "false") : bG.push({
                                            name: bK,
                                            value: bL.toString()
                                        });
                    }, hasBlob: function () {
                        return !!this.getBlob();
                    }, getBlob: function () {
                        return bH && bH.value || null;
                    }, getBlobName: function () {
                        return bH && bH.name || null;
                    }, each: function (bI) {
                        bD.each(bG, function (bJ) {
                            bI(bJ.value, bJ.name);
                        }), bH && bI(bH.value, bH.name);
                    }, destroy: function () {
                        bH = null, bG = [];
                    }
                });
            }

            return bC;
        }), br(aF, [bd, bs, bj, bm, aG, bt, ba, a9, aD, aZ, bx, bn], function (bQ, bE, bJ, bM, bG, bI, bT, bF, bD, bS, bL, bR) {
            function bP() {
                this.uid = bQ.guid("uid_");
            }

            function bN() {
                function cg(cm, cl) {
                    return b3.hasOwnProperty(cm) ? 1 === arguments.length ? bL.can("define_property") ? b3[cm] : b8[cm] : void (bL.can("define_property") ? b3[cm] = cl : b8[cm] = cl) : void 0;
                }

                function ca(cm) {
                    function cl() {
                        ch && (ch.destroy(), ch = null), cn.dispatchEvent("loadend"), cn = null;
                    }

                    function co(cp) {
                        ch.bind("LoadStart", function (cq) {
                            cg("readyState", bN.LOADING), cn.dispatchEvent("readystatechange"), cn.dispatchEvent(cq), b4 && cn.upload.dispatchEvent(cq);
                        }), ch.bind("Progress", function (cq) {
                            cg("readyState") !== bN.LOADING && (cg("readyState", bN.LOADING), cn.dispatchEvent("readystatechange")), cn.dispatchEvent(cq);
                        }), ch.bind("UploadProgress", function (cq) {
                            b4 && cn.upload.dispatchEvent({
                                type: "progress",
                                lengthComputable: !1,
                                total: cq.total,
                                loaded: cq.loaded
                            });
                        }), ch.bind("Load", function (cq) {
                            cg("readyState", bN.DONE), cg("status", Number(cp.exec.call(ch, "XMLHttpRequest", "getStatus") || 0)), cg("statusText", bH[cg("status")] || ""), cg("response", cp.exec.call(ch, "XMLHttpRequest", "getResponse", cg("responseType"))), ~bQ.inArray(cg("responseType"), ["text", ""]) ? cg("responseText", cg("response")) : "document" === cg("responseType") && cg("responseXML", cg("response")), bU = cp.exec.call(ch, "XMLHttpRequest", "getAllResponseHeaders"), cn.dispatchEvent("readystatechange"), cg("status") > 0 ? (b4 && cn.upload.dispatchEvent(cq), cn.dispatchEvent(cq)) : (b0 = !0, cn.dispatchEvent("error")), cl();
                        }), ch.bind("Abort", function (cq) {
                            cn.dispatchEvent(cq), cl();
                        }), ch.bind("Error", function (cq) {
                            b0 = !0, cg("readyState", bN.DONE), cn.dispatchEvent("readystatechange"), cc = !0, cn.dispatchEvent(cq), cl();
                        }), cp.exec.call(ch, "XMLHttpRequest", "send", {
                            url: cb,
                            method: ck,
                            async: b7,
                            user: cj,
                            password: bX,
                            headers: b5,
                            mimeType: cf,
                            encoding: bV,
                            responseType: cn.responseType,
                            withCredentials: cn.withCredentials,
                            options: bY
                        }, cm);
                    }

                    var cn = this;
                    b1 = (new Date).getTime(), ch = new bT, "string" == typeof bY.required_caps && (bY.required_caps = bI.parseCaps(bY.required_caps)), bY.required_caps = bQ.extend({}, bY.required_caps, {return_response_type: cn.responseType}), cm instanceof bS && (bY.required_caps.send_multipart = !0), b2 || (bY.required_caps.do_cors = !0), bY.ruid ? co(ch.connectRuntime(bY)) : (ch.bind("RuntimeInit", function (cq, cp) {
                            co(cp);
                        }), ch.bind("RuntimeError", function (cq, cp) {
                            cn.dispatchEvent("RuntimeError", cp);
                        }), ch.connectRuntime(bY));
                }

                function ci() {
                    cg("responseText", ""), cg("responseXML", null), cg("response", null), cg("status", 0), cg("statusText", ""), b1 = cd = null;
                }

                var b8 = this, b3 = {
                    timeout: 0,
                    readyState: bN.UNSENT,
                    withCredentials: !1,
                    status: 0,
                    statusText: "",
                    responseType: "",
                    responseXML: null,
                    responseText: null,
                    response: null
                }, b7 = !0, cb, ck, b5 = {}, cj, bX, bV = null, cf = null, bW = !1, bZ = !1, b4 = !1, cc = !1, b0 = !1, b2 = !1, b1, cd, b9 = null, b6 = null, bY = {}, ch, bU = "", ce;
                bQ.extend(this, b3, {
                    uid: bQ.guid("uid_"), upload: new bP, open: function (cp, cm, co, cn, cq) {
                        var cl;
                        if (!cp || !cm) {
                            throw new bE.DOMException(bE.DOMException.SYNTAX_ERR);
                        }
                        if (/[\u0100-\uffff]/.test(cp) || bM.utf8_encode(cp) !== cp) {
                            throw new bE.DOMException(bE.DOMException.SYNTAX_ERR);
                        }
                        if (~bQ.inArray(cp.toUpperCase(), ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT", "TRACE", "TRACK"]) && (ck = cp.toUpperCase()), ~bQ.inArray(ck, ["CONNECT", "TRACE", "TRACK"])) {
                            throw new bE.DOMException(bE.DOMException.SECURITY_ERR);
                        }
                        if (cm = bM.utf8_encode(cm), cl = bG.parseUrl(cm), b2 = bG.hasSameOrigin(cl), cb = bG.resolveUrl(cm), (cn || cq) && !b2) {
                            throw new bE.DOMException(bE.DOMException.INVALID_ACCESS_ERR);
                        }
                        if (cj = cn || cl.user, bX = cq || cl.pass, b7 = co || !0, b7 === !1 && (cg("timeout") || cg("withCredentials") || "" !== cg("responseType"))) {
                            throw new bE.DOMException(bE.DOMException.INVALID_ACCESS_ERR);
                        }
                        bW = !b7, bZ = !1, b5 = {}, ci.call(this), cg("readyState", bN.OPENED), this.convertEventPropsToHandlers(["readystatechange"]), this.dispatchEvent("readystatechange");
                    }, setRequestHeader: function (cm, cn) {
                        var cl = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "content-transfer-encoding", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
                        if (cg("readyState") !== bN.OPENED || bZ) {
                            throw new bE.DOMException(bE.DOMException.INVALID_STATE_ERR);
                        }
                        if (/[\u0100-\uffff]/.test(cm) || bM.utf8_encode(cm) !== cm) {
                            throw new bE.DOMException(bE.DOMException.SYNTAX_ERR);
                        }
                        return cm = bQ.trim(cm).toLowerCase(), ~bQ.inArray(cm, cl) || /^(proxy\-|sec\-)/.test(cm) ? !1 : (b5[cm] ? b5[cm] += ", " + cn : b5[cm] = cn, !0);
                    }, getAllResponseHeaders: function () {
                        return bU || "";
                    }, getResponseHeader: function (cl) {
                        return cl = cl.toLowerCase(), b0 || ~bQ.inArray(cl, ["set-cookie", "set-cookie2"]) ? null : bU && "" !== bU && (ce || (ce = {}, bQ.each(bU.split(/\r\n/), function (cm) {
                                var cn = cm.split(/:\s+/);
                                2 === cn.length && (cn[0] = bQ.trim(cn[0]), ce[cn[0].toLowerCase()] = {
                                    header: cn[0],
                                    value: bQ.trim(cn[1])
                                });
                            })), ce.hasOwnProperty(cl)) ? ce[cl].header + ": " + ce[cl].value : null;
                    }, overrideMimeType: function (cl) {
                        var cm, cn;
                        if (~bQ.inArray(cg("readyState"), [bN.LOADING, bN.DONE])) {
                            throw new bE.DOMException(bE.DOMException.INVALID_STATE_ERR);
                        }
                        if (cl = bQ.trim(cl.toLowerCase()), /;/.test(cl) && (cm = cl.match(/^([^;]+)(?:;\scharset\=)?(.*)$/)) && (cl = cm[1], cm[2] && (cn = cm[2])), !bR.mimes[cl]) {
                            throw new bE.DOMException(bE.DOMException.SYNTAX_ERR);
                        }
                        b9 = cl, b6 = cn;
                    }, send: function (cn, cl) {
                        if (bY = "string" === bQ.typeOf(cl) ? {ruid: cl} : cl ? cl : {}, this.convertEventPropsToHandlers(bK), this.upload.convertEventPropsToHandlers(bK), this.readyState !== bN.OPENED || bZ) {
                            throw new bE.DOMException(bE.DOMException.INVALID_STATE_ERR);
                        }
                        if (cn instanceof bF) {
                            bY.ruid = cn.ruid, cf = cn.type || "application/octet-stream";
                        } else {
                            if (cn instanceof bS) {
                                if (cn.hasBlob()) {
                                    var cm = cn.getBlob();
                                    bY.ruid = cm.ruid, cf = cm.type || "application/octet-stream";
                                }
                            } else {
                                "string" == typeof cn && (bV = "UTF-8", cf = "text/plain;charset=UTF-8", cn = bM.utf8_encode(cn));
                            }
                        }
                        this.withCredentials || (this.withCredentials = bY.required_caps && bY.required_caps.send_browser_cookies && !b2), b4 = !bW && this.upload.hasEventListener(), b0 = !1, cc = !cn, bW || (bZ = !0), ca.call(this, cn);
                    }, abort: function () {
                        if (b0 = !0, bW = !1, ~bQ.inArray(cg("readyState"), [bN.UNSENT, bN.OPENED, bN.DONE])) {
                            cg("readyState", bN.UNSENT);
                        } else {
                            if (cg("readyState", bN.DONE), bZ = !1, !ch) {
                                throw new bE.DOMException(bE.DOMException.INVALID_STATE_ERR);
                            }
                            ch.getRuntime().exec.call(ch, "XMLHttpRequest", "abort", cc), cc = !0;
                        }
                    }, destroy: function () {
                        ch && ("function" === bQ.typeOf(ch.destroy) && ch.destroy(), ch = null), this.unbindAll(), this.upload && (this.upload.unbindAll(), this.upload = null);
                    }
                });
            }

            var bH = {
                100: "Continue",
                101: "Switching Protocols",
                102: "Processing",
                200: "OK",
                201: "Created",
                202: "Accepted",
                203: "Non-Authoritative Information",
                204: "No Content",
                205: "Reset Content",
                206: "Partial Content",
                207: "Multi-Status",
                226: "IM Used",
                300: "Multiple Choices",
                301: "Moved Permanently",
                302: "Found",
                303: "See Other",
                304: "Not Modified",
                305: "Use Proxy",
                306: "Reserved",
                307: "Temporary Redirect",
                400: "Bad Request",
                401: "Unauthorized",
                402: "Payment Required",
                403: "Forbidden",
                404: "Not Found",
                405: "Method Not Allowed",
                406: "Not Acceptable",
                407: "Proxy Authentication Required",
                408: "Request Timeout",
                409: "Conflict",
                410: "Gone",
                411: "Length Required",
                412: "Precondition Failed",
                413: "Request Entity Too Large",
                414: "Request-URI Too Long",
                415: "Unsupported Media Type",
                416: "Requested Range Not Satisfiable",
                417: "Expectation Failed",
                422: "Unprocessable Entity",
                423: "Locked",
                424: "Failed Dependency",
                426: "Upgrade Required",
                500: "Internal Server Error",
                501: "Not Implemented",
                502: "Bad Gateway",
                503: "Service Unavailable",
                504: "Gateway Timeout",
                505: "HTTP Version Not Supported",
                506: "Variant Also Negotiates",
                507: "Insufficient Storage",
                510: "Not Extended"
            };
            bP.prototype = bJ.instance;
            var bK = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"], bO = 1, bC = 2;
            return bN.UNSENT = 0, bN.OPENED = 1, bN.HEADERS_RECEIVED = 2, bN.LOADING = 3, bN.DONE = 4, bN.prototype = bJ.instance, bN;
        }), br(aK, [bd, bm, bc, bj], function (bF, bD, bG, bC) {
            function bE() {
                function bJ() {
                    bI = bL = 0, bM = this.result = null;
                }

                function bH(bR, bS) {
                    var bQ = this;
                    bO = bS, bQ.bind("TransportingProgress", function (bT) {
                        bL = bT.loaded, bI > bL && -1 === bF.inArray(bQ.state, [bE.IDLE, bE.DONE]) && bN.call(bQ);
                    }, 999), bQ.bind("TransportingComplete", function () {
                        bL = bI, bQ.state = bE.DONE, bM = null, bQ.result = bO.exec.call(bQ, "Transporter", "getAsBlob", bR || "");
                    }, 999), bQ.state = bE.BUSY, bQ.trigger("TransportingStarted"), bN.call(bQ);
                }

                function bN() {
                    var bR = this, bS, bQ = bI - bL;
                    bK > bQ && (bK = bQ), bS = bD.btoa(bM.substr(bL, bK)), bO.exec.call(bR, "Transporter", "receive", bS, bI);
                }

                var bP, bO, bM, bI, bL, bK;
                bG.call(this), bF.extend(this, {
                    uid: bF.guid("uid_"),
                    state: bE.IDLE,
                    result: null,
                    transport: function (bS, bU, bT) {
                        var bQ = this;
                        if (bT = bF.extend({chunk_size: 204798}, bT), (bP = bT.chunk_size % 3) && (bT.chunk_size += 3 - bP), bK = bT.chunk_size, bJ.call(this), bM = bS, bI = bS.length, "string" === bF.typeOf(bT) || bT.ruid) {
                            bH.call(bQ, bU, this.connectRuntime(bT));
                        } else {
                            var bR = function (bW, bV) {
                                bQ.unbind("RuntimeInit", bR), bH.call(bQ, bU, bV);
                            };
                            this.bind("RuntimeInit", bR), this.connectRuntime(bT);
                        }
                    },
                    abort: function () {
                        var bQ = this;
                        bQ.state = bE.IDLE, bO && (bO.exec.call(bQ, "Transporter", "clear"), bQ.trigger("TransportingAborted")), bJ.call(bQ);
                    },
                    destroy: function () {
                        this.unbindAll(), bO = null, this.disconnectRuntime(), bJ.call(this);
                    }
                });
            }

            return bE.IDLE = 0, bE.BUSY = 1, bE.DONE = 2, bE.prototype = bC.instance, bE;
        }), br(aQ, [bd, bv, bs, aD, aF, bt, bc, aK, bx, bj, a9, bb, bm], function (bK, bP, bF, bH, bC, bE, bN, bQ, bO, bM, bG, bL, bJ) {
            function bI() {
                function bT(bW) {
                    bW || (bW = this.getRuntime().exec.call(this, "Image", "getInfo")), this.size = bW.size, this.width = bW.width, this.height = bW.height, this.type = bW.type, this.meta = bW.meta, "" === this.name && (this.name = bW.name);
                }

                function bV(bX) {
                    var bW = bK.typeOf(bX);
                    try {
                        if (bX instanceof bI) {
                            if (!bX.size) {
                                throw new bF.DOMException(bF.DOMException.INVALID_STATE_ERR);
                            }
                            bR.apply(this, arguments);
                        } else {
                            if (bX instanceof bG) {
                                if (!~bK.inArray(bX.type, ["image/jpeg", "image/png"])) {
                                    throw new bF.ImageError(bF.ImageError.WRONG_FORMAT);
                                }
                                bU.apply(this, arguments);
                            } else {
                                if (-1 !== bK.inArray(bW, ["blob", "file"])) {
                                    bV.call(this, new bL(null, bX), arguments[1]);
                                } else {
                                    if ("string" === bW) {
                                        /^data:[^;]*;base64,/.test(bX) ? bV.call(this, new bG(null, {data: bX}), arguments[1]) : bS.apply(this, arguments);
                                    } else {
                                        if ("node" !== bW || "img" !== bX.nodeName.toLowerCase()) {
                                            throw new bF.DOMException(bF.DOMException.TYPE_MISMATCH_ERR);
                                        }
                                        bV.call(this, bX.src, arguments[1]);
                                    }
                                }
                            }
                        }
                    } catch (bY) {
                        this.trigger("error", bY.code);
                    }
                }

                function bR(bX, bY) {
                    var bW = this.connectRuntime(bX.ruid);
                    this.ruid = bW.uid, bW.exec.call(this, "Image", "loadFromImage", bX, "undefined" === bK.typeOf(bY) ? !0 : bY);
                }

                function bU(bX, bZ) {
                    function bW(b0) {
                        bY.ruid = b0.uid, b0.exec.call(bY, "Image", "loadFromBlob", bX);
                    }

                    var bY = this;
                    bY.name = bX.name || "", bX.isDetached() ? (this.bind("RuntimeInit", function (b1, b0) {
                            bW(b0);
                        }), bZ && "string" == typeof bZ.required_caps && (bZ.required_caps = bE.parseCaps(bZ.required_caps)), this.connectRuntime(bK.extend({
                            required_caps: {
                                access_image_binary: !0,
                                resize_image: !0
                            }
                        }, bZ))) : bW(this.connectRuntime(bX.ruid));
                }

                function bS(bY, bX) {
                    var bZ = this, bW;
                    bW = new bC, bW.open("get", bY), bW.responseType = "blob", bW.onprogress = function (b0) {
                        bZ.trigger(b0);
                    }, bW.onload = function () {
                        bU.call(bZ, bW.response, !0);
                    }, bW.onerror = function (b0) {
                        bZ.trigger(b0);
                    }, bW.onloadend = function () {
                        bW.destroy();
                    }, bW.bind("RuntimeError", function (b1, b0) {
                        bZ.trigger("RuntimeError", b0);
                    }), bW.send(null, bX);
                }

                bN.call(this), bK.extend(this, {
                    uid: bK.guid("uid_"),
                    ruid: null,
                    name: "",
                    size: 0,
                    width: 0,
                    height: 0,
                    type: "",
                    meta: {},
                    clone: function () {
                        this.load.apply(this, arguments);
                    },
                    load: function () {
                        this.bind("Load Resize", function () {
                            bT.call(this);
                        }, 999), this.convertEventPropsToHandlers(bD), bV.apply(this, arguments);
                    },
                    downsize: function (bX) {
                        var bW = {width: this.width, height: this.height, crop: !1, preserveHeaders: !0};
                        bX = "object" == typeof bX ? bK.extend(bW, bX) : bK.extend(bW, {
                                width: arguments[0],
                                height: arguments[1],
                                crop: arguments[2],
                                preserveHeaders: arguments[3]
                            });
                        try {
                            if (!this.size) {
                                throw new bF.DOMException(bF.DOMException.INVALID_STATE_ERR);
                            }
                            if (this.width > bI.MAX_RESIZE_WIDTH || this.height > bI.MAX_RESIZE_HEIGHT) {
                                throw new bF.ImageError(bF.ImageError.MAX_RESOLUTION_ERR);
                            }
                            this.getRuntime().exec.call(this, "Image", "downsize", bX.width, bX.height, bX.crop, bX.preserveHeaders);
                        } catch (bY) {
                            this.trigger("error", bY.code);
                        }
                    },
                    crop: function (bX, bW, bY) {
                        this.downsize(bX, bW, !0, bY);
                    },
                    getAsCanvas: function () {
                        if (!bO.can("create_canvas")) {
                            throw new bF.RuntimeError(bF.RuntimeError.NOT_SUPPORTED_ERR);
                        }
                        var bW = this.connectRuntime(this.ruid);
                        return bW.exec.call(this, "Image", "getAsCanvas");
                    },
                    getAsBlob: function (bX, bW) {
                        if (!this.size) {
                            throw new bF.DOMException(bF.DOMException.INVALID_STATE_ERR);
                        }
                        return bX || (bX = "image/jpeg"), "image/jpeg" !== bX || bW || (bW = 90), this.getRuntime().exec.call(this, "Image", "getAsBlob", bX, bW);
                    },
                    getAsDataURL: function (bX, bW) {
                        if (!this.size) {
                            throw new bF.DOMException(bF.DOMException.INVALID_STATE_ERR);
                        }
                        return this.getRuntime().exec.call(this, "Image", "getAsDataURL", bX, bW);
                    },
                    getAsBinaryString: function (bX, bW) {
                        var bY = this.getAsDataURL(bX, bW);
                        return bJ.atob(bY.substring(bY.indexOf("base64,") + 7));
                    },
                    embed: function (b1) {
                        function bW() {
                            if (bO.can("create_canvas")) {
                                var b9 = b6.getAsCanvas();
                                if (b9) {
                                    return b1.appendChild(b9), b9 = null, b6.destroy(), void bY.trigger("embedded");
                                }
                            }
                            var ca = b6.getAsDataURL(b4, b0);
                            if (!ca) {
                                throw new bF.ImageError(bF.ImageError.WRONG_FORMAT);
                            }
                            if (bO.can("use_data_uri_of", ca.length)) {
                                b1.innerHTML = '<img src="' + ca + '" width="' + b6.width + '" height="' + b6.height + '" />', b6.destroy(), bY.trigger("embedded");
                            } else {
                                var cb = new bQ;
                                cb.bind("TransportingComplete", function () {
                                    b8 = bY.connectRuntime(this.result.ruid), bY.bind("Embedded", function () {
                                        bK.extend(b8.getShimContainer().style, {
                                            top: "0px",
                                            left: "0px",
                                            width: b6.width + "px",
                                            height: b6.height + "px"
                                        }), b8 = null;
                                    }, 999), b8.exec.call(bY, "ImageView", "display", this.result.uid, bZ, b2), b6.destroy();
                                }), cb.transport(bJ.atob(ca.substring(ca.indexOf("base64,") + 7)), b4, bK.extend({}, bX, {
                                    required_caps: {display_media: !0},
                                    runtime_order: "flash,silverlight",
                                    container: b1
                                }));
                            }
                        }

                        var bY = this, b6, b4, b0, b3, bX = arguments[1] || {}, bZ = this.width, b2 = this.height, b8;
                        try {
                            if (!(b1 = bP.get(b1))) {
                                throw new bF.DOMException(bF.DOMException.INVALID_NODE_TYPE_ERR);
                            }
                            if (!this.size) {
                                throw new bF.DOMException(bF.DOMException.INVALID_STATE_ERR);
                            }
                            if (this.width > bI.MAX_RESIZE_WIDTH || this.height > bI.MAX_RESIZE_HEIGHT) {
                                throw new bF.ImageError(bF.ImageError.MAX_RESOLUTION_ERR);
                            }
                            if (b4 = bX.type || this.type || "image/jpeg", b0 = bX.quality || 90, b3 = "undefined" !== bK.typeOf(bX.crop) ? bX.crop : !1, bX.width) {
                                bZ = bX.width, b2 = bX.height || bZ;
                            } else {
                                var b5 = bP.getSize(b1);
                                b5.w && b5.h && (bZ = b5.w, b2 = b5.h);
                            }
                            return b6 = new bI, b6.bind("Resize", function () {
                                bW.call(bY);
                            }), b6.bind("Load", function () {
                                b6.downsize(bZ, b2, b3, !1);
                            }), b6.clone(this, !1), b6;
                        } catch (b7) {
                            this.trigger("error", b7.code);
                        }
                    },
                    destroy: function () {
                        this.ruid && (this.getRuntime().exec.call(this, "Image", "destroy"), this.disconnectRuntime()), this.unbindAll();
                    }
                });
            }

            var bD = ["progress", "load", "error", "resize", "embedded"];
            return bI.MAX_RESIZE_WIDTH = 6500, bI.MAX_RESIZE_HEIGHT = 6500, bI.prototype = bM.instance, bI;
        }), br(aW, [bd, bs, bt, bx], function (bG, bE, bI, bD) {
            function bF(bK) {
                var bM = this, bL = bI.capTest, bJ = bI.capTrue, bN = bG.extend({
                    access_binary: bL(window.FileReader || window.File && window.File.getAsDataURL),
                    access_image_binary: function () {
                        return bM.can("access_binary") && !!bC.Image;
                    },
                    display_media: bL(bD.can("create_canvas") || bD.can("use_data_uri_over32kb")),
                    do_cors: bL(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                    drag_and_drop: bL(function () {
                        var bO = document.createElement("div");
                        return ("draggable" in bO || "ondragstart" in bO && "ondrop" in bO) && ("IE" !== bD.browser || bD.version > 9);
                    }()),
                    filter_by_extension: bL(function () {
                        return "Chrome" === bD.browser && bD.version >= 28 || "IE" === bD.browser && bD.version >= 10;
                    }()),
                    return_response_headers: bJ,
                    return_response_type: function (bO) {
                        return "json" === bO && window.JSON ? !0 : bD.can("return_response_type", bO);
                    },
                    return_status_code: bJ,
                    report_upload_progress: bL(window.XMLHttpRequest && (new XMLHttpRequest).upload),
                    resize_image: function () {
                        return bM.can("access_binary") && bD.can("create_canvas");
                    },
                    select_file: function () {
                        return bD.can("use_fileinput") && window.File;
                    },
                    select_folder: function () {
                        return bM.can("select_file") && "Chrome" === bD.browser && bD.version >= 21;
                    },
                    select_multiple: function () {
                        return !(!bM.can("select_file") || "Safari" === bD.browser && "Windows" === bD.os || "iOS" === bD.os && bD.verComp(bD.osVersion, "7.0.4", "<"));
                    },
                    send_binary_string: bL(window.XMLHttpRequest && ((new XMLHttpRequest).sendAsBinary || window.Uint8Array && window.ArrayBuffer)),
                    send_custom_headers: bL(window.XMLHttpRequest),
                    send_multipart: function () {
                        return !!(window.XMLHttpRequest && (new XMLHttpRequest).upload && window.FormData) || bM.can("send_binary_string");
                    },
                    slice_blob: bL(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),
                    stream_upload: function () {
                        return bM.can("slice_blob") && bM.can("send_multipart");
                    },
                    summon_file_dialog: bL(function () {
                        return "Firefox" === bD.browser && bD.version >= 4 || "Opera" === bD.browser && bD.version >= 12 || "IE" === bD.browser && bD.version >= 10 || !!~bG.inArray(bD.browser, ["Chrome", "Safari"]);
                    }()),
                    upload_filesize: bJ
                }, arguments[2]);
                bI.call(this, bK, arguments[1] || bH, bN), bG.extend(this, {
                    init: function () {
                        this.trigger("Init");
                    }, destroy: function (bO) {
                        return function () {
                            bO.call(bM), bO = bM = null;
                        };
                    }(this.destroy)
                }), bG.extend(this.getShim(), bC);
            }

            var bH = "html5", bC = {};
            return bI.addConstructor(bH, bF), bC;
        }), br(aL, [aW, a9], function (bD, bC) {
            function bE() {
                function bF(bJ, bH, bK) {
                    var bG;
                    if (!window.File.prototype.slice) {
                        return (bG = window.File.prototype.webkitSlice || window.File.prototype.mozSlice) ? bG.call(bJ, bH, bK) : null;
                    }
                    try {
                        return bJ.slice(), bJ.slice(bH, bK);
                    } catch (bI) {
                        return bJ.slice(bH, bK - bH);
                    }
                }

                this.slice = function () {
                    return new bC(this.getRuntime().uid, bF.apply(this, arguments));
                };
            }

            return bD.Blob = bE;
        }), br(aN, [bd], function (bH) {
            function bE() {
                this.returnValue = !1;
            }

            function bJ() {
                this.cancelBubble = !0;
            }

            var bD = {}, bG = "moxie_" + bH.guid(), bI = function (bO, bL, bN, bM) {
                var bP, bK;
                bL = bL.toLowerCase(), bO.addEventListener ? (bP = bN, bO.addEventListener(bL, bP, !1)) : bO.attachEvent && (bP = function () {
                        var bQ = window.event;
                        bQ.target || (bQ.target = bQ.srcElement), bQ.preventDefault = bE, bQ.stopPropagation = bJ, bN(bQ);
                    }, bO.attachEvent("on" + bL, bP)), bO[bG] || (bO[bG] = bH.guid()), bD.hasOwnProperty(bO[bG]) || (bD[bO[bG]] = {}), bK = bD[bO[bG]], bK.hasOwnProperty(bL) || (bK[bL] = []), bK[bL].push({
                    func: bP,
                    orig: bN,
                    key: bM
                });
            }, bC = function (bM, bQ, bO) {
                var bK, bN;
                if (bQ = bQ.toLowerCase(), bM[bG] && bD[bM[bG]] && bD[bM[bG]][bQ]) {
                    bK = bD[bM[bG]][bQ];
                    for (var bL = bK.length - 1; bL >= 0 && (bK[bL].orig !== bO && bK[bL].key !== bO || (bM.removeEventListener ? bM.removeEventListener(bQ, bK[bL].func, !1) : bM.detachEvent && bM.detachEvent("on" + bQ, bK[bL].func), bK[bL].orig = null, bK[bL].func = null, bK.splice(bL, 1), bO === bN)); bL--) {
                    }
                    if (bK.length || delete bD[bM[bG]][bQ], bH.isEmptyObj(bD[bM[bG]])) {
                        delete bD[bM[bG]];
                        try {
                            delete bM[bG];
                        } catch (bP) {
                            bM[bG] = bN;
                        }
                    }
                }
            }, bF = function (bK, bL) {
                bK && bK[bG] && bH.each(bD[bK[bG]], function (bN, bM) {
                    bC(bK, bM, bL);
                });
            };
            return {addEvent: bI, removeEvent: bC, removeAllEvents: bF};
        }), br(aM, [aW, bd, bv, aN, bn, bx], function (bG, bE, bI, bD, bF, bH) {
            function bC() {
                var bK = [], bJ;
                bE.extend(this, {
                    init: function (bU) {
                        var bT = this, bS = bT.getRuntime(), bN, bR, bQ, bO, bL, bM;
                        bJ = bU, bK = [], bQ = bJ.accept.mimes || bF.extList2mimes(bJ.accept, bS.can("filter_by_extension")), bR = bS.getShimContainer(), bR.innerHTML = '<input id="' + bS.uid + '" type="file" style="font-size:999px;opacity:0;"' + (bJ.multiple && bS.can("select_multiple") ? "multiple" : "") + (bJ.directory && bS.can("select_folder") ? "webkitdirectory directory" : "") + (bQ ? ' accept="' + bQ.join(",") + '"' : "") + " />", bN = bI.get(bS.uid), bE.extend(bN.style, {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }), bO = bI.get(bJ.browse_button), bS.can("summon_file_dialog") && ("static" === bI.getStyle(bO, "position") && (bO.style.position = "relative"), bL = parseInt(bI.getStyle(bO, "z-index"), 10) || 1, bO.style.zIndex = bL, bR.style.zIndex = bL - 1, bD.addEvent(bO, "click", function (bW) {
                            var bV = bI.get(bS.uid);
                            bV && !bV.disabled && bV.click(), bW.preventDefault();
                        }, bT.uid)), bM = bS.can("summon_file_dialog") ? bO : bR, bD.addEvent(bM, "mouseover", function () {
                            bT.trigger("mouseenter");
                        }, bT.uid), bD.addEvent(bM, "mouseout", function () {
                            bT.trigger("mouseleave");
                        }, bT.uid), bD.addEvent(bM, "mousedown", function () {
                            bT.trigger("mousedown");
                        }, bT.uid), bD.addEvent(bI.get(bJ.container), "mouseup", function () {
                            bT.trigger("mouseup");
                        }, bT.uid), bN.onchange = function bP() {
                            if (bK = [], bJ.directory ? bE.each(this.files, function (bW) {
                                        "." !== bW.name && bK.push(bW);
                                    }) : bK = [].slice.call(this.files), "IE" !== bH.browser && "IEMobile" !== bH.browser) {
                                this.value = "";
                            } else {
                                var bV = this.cloneNode(!0);
                                this.parentNode.replaceChild(bV, this), bV.onchange = bP;
                            }
                            bT.trigger("change");
                        }, bT.trigger({type: "ready", async: !0}), bR = null;
                    }, getFiles: function () {
                        return bK;
                    }, disable: function (bN) {
                        var bM = this.getRuntime(), bL;
                        (bL = bI.get(bM.uid)) && (bL.disabled = !!bN);
                    }, destroy: function () {
                        var bL = this.getRuntime(), bM = bL.getShim(), bN = bL.getShimContainer();
                        bD.removeAllEvents(bN, this.uid), bD.removeAllEvents(bJ && bI.get(bJ.container), this.uid), bD.removeAllEvents(bJ && bI.get(bJ.browse_button), this.uid), bN && (bN.innerHTML = ""), bM.removeInstance(this.uid), bK = bJ = bN = bM = null;
                    }
                });
            }

            return bG.FileInput = bC;
        }), br(aX, [aW, bd, bv, aN, bn], function (bF, bD, bH, bC, bE) {
            function bG() {
                function bM(bS) {
                    if (!bS.dataTransfer || !bS.dataTransfer.types) {
                        return !1;
                    }
                    var bT = bD.toArray(bS.dataTransfer.types || []);
                    return -1 !== bD.inArray("Files", bT) || -1 !== bD.inArray("public.file-url", bT) || -1 !== bD.inArray("application/x-moz-file", bT);
                }

                function bI(bT) {
                    for (var bU = [], bS = 0; bS < bT.length; bS++) {
                        [].push.apply(bU, bT[bS].extensions.split(/\s*,\s*/));
                    }
                    return -1 === bD.inArray("*", bU) ? bU : [];
                }

                function bP(bS) {
                    if (!bL.length) {
                        return !0;
                    }
                    var bT = bE.getFileExtension(bS.name);
                    return !bT || -1 !== bD.inArray(bT, bL);
                }

                function bR(bT, bU) {
                    var bS = [];
                    bD.each(bT, function (bW) {
                        var bV = bW.webkitGetAsEntry();
                        if (bV) {
                            if (bV.isFile) {
                                var bX = bW.getAsFile();
                                bP(bX) && bN.push(bX);
                            } else {
                                bS.push(bV);
                            }
                        }
                    }), bS.length ? bQ(bS, bU) : bU();
                }

                function bQ(bT, bU) {
                    var bS = [];
                    bD.each(bT, function (bV) {
                        bS.push(function (bW) {
                            bO(bV, bW);
                        });
                    }), bD.inSeries(bS, function () {
                        bU();
                    });
                }

                function bO(bT, bS) {
                    bT.isFile ? bT.file(function (bU) {
                            bP(bU) && bN.push(bU), bS();
                        }, function () {
                            bS();
                        }) : bT.isDirectory ? bJ(bT, bS) : bS();
                }

                function bJ(bV, bT) {
                    function bW(bX) {
                        bU.readEntries(function (bY) {
                            bY.length ? ([].push.apply(bS, bY), bW(bX)) : bX();
                        }, bX);
                    }

                    var bS = [], bU = bV.createReader();
                    bW(function () {
                        bQ(bS, bT);
                    });
                }

                var bN = [], bL = [], bK;
                bD.extend(this, {
                    init: function (bU) {
                        var bT = this, bS;
                        bK = bU, bL = bI(bK.accept), bS = bK.container, bC.addEvent(bS, "dragover", function (bV) {
                            bM(bV) && (bV.preventDefault(), bV.dataTransfer.dropEffect = "copy");
                        }, bT.uid), bC.addEvent(bS, "drop", function (bV) {
                            bM(bV) && (bV.preventDefault(), bN = [], bV.dataTransfer.items && bV.dataTransfer.items[0].webkitGetAsEntry ? bR(bV.dataTransfer.items, function () {
                                    bT.trigger("drop");
                                }) : (bD.each(bV.dataTransfer.files, function (bW) {
                                    bP(bW) && bN.push(bW);
                                }), bT.trigger("drop")));
                        }, bT.uid), bC.addEvent(bS, "dragenter", function (bV) {
                            bT.trigger("dragenter");
                        }, bT.uid), bC.addEvent(bS, "dragleave", function (bV) {
                            bT.trigger("dragleave");
                        }, bT.uid);
                    }, getFiles: function () {
                        return bN;
                    }, destroy: function () {
                        bC.removeAllEvents(bK && bH.get(bK.container), this.uid), bN = bL = bK = null;
                    }
                });
            }

            return bF.FileDrop = bG;
        }), br(aU, [aW, bm, bd], function (bE, bD, bF) {
            function bC() {
                function bI(bJ) {
                    return bD.atob(bJ.substring(bJ.indexOf("base64,") + 7));
                }

                var bG, bH = !1;
                bF.extend(this, {
                    read: function (bK, bJ) {
                        var bL = this;
                        bG = new window.FileReader, bG.addEventListener("progress", function (bM) {
                            bL.trigger(bM);
                        }), bG.addEventListener("load", function (bM) {
                            bL.trigger(bM);
                        }), bG.addEventListener("error", function (bM) {
                            bL.trigger(bM, bG.error);
                        }), bG.addEventListener("loadend", function () {
                            bG = null;
                        }), "function" === bF.typeOf(bG[bK]) ? (bH = !1, bG[bK](bJ.getSource())) : "readAsBinaryString" === bK && (bH = !0, bG.readAsDataURL(bJ.getSource()));
                    }, getResult: function () {
                        return bG && bG.result ? bH ? bI(bG.result) : bG.result : null;
                    }, abort: function () {
                        bG && bG.abort();
                    }, destroy: function () {
                        bG = null;
                    }
                });
            }

            return bE.FileReader = bC;
        }), br(aR, [aW, bd, bn, aG, bb, a9, aZ, bs, bx], function (bG, bK, bE, bF, bC, bD, bI, bL, bJ) {
            function bH() {
                function bQ(bW, bU) {
                    var bX = this, bT, bV;
                    bT = bU.getBlob().getSource(), bV = new window.FileReader, bV.onload = function () {
                        bU.append(bU.getBlobName(), new bD(null, {
                            type: bT.type,
                            data: bV.result
                        })), bO.send.call(bX, bW, bU);
                    }, bV.readAsBinaryString(bT);
                }

                function bS() {
                    return !window.XMLHttpRequest || "IE" === bJ.browser && bJ.version < 8 ? function () {
                            for (var bU = ["Msxml2.XMLHTTP.6.0", "Microsoft.XMLHTTP"], bT = 0; bT < bU.length; bT++) {
                                try {
                                    return new ActiveXObject(bU[bT]);
                                } catch (bV) {
                                }
                            }
                        }() : new window.XMLHttpRequest;
                }

                function bM(bU) {
                    var bT = bU.responseXML, bV = bU.responseText;
                    return "IE" === bJ.browser && bV && bT && !bT.documentElement && /[^\/]+\/[^\+]+\+xml/.test(bU.getResponseHeader("Content-Type")) && (bT = new window.ActiveXObject("Microsoft.XMLDOM"), bT.async = !1, bT.validateOnParse = !1, bT.loadXML(bV)), bT && ("IE" === bJ.browser && 0 !== bT.parseError || !bT.documentElement || "parsererror" === bT.documentElement.tagName) ? null : bT;
                }

                function bR(bX) {
                    var bV = "----moxieboundary" + (new Date).getTime(), bY = "--", bU = "\r\n", bW = "", bT = this.getRuntime();
                    if (!bT.can("send_binary_string")) {
                        throw new bL.RuntimeError(bL.RuntimeError.NOT_SUPPORTED_ERR);
                    }
                    return bN.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + bV), bX.each(function (b0, bZ) {
                        bW += b0 instanceof bD ? bY + bV + bU + 'Content-Disposition: form-data; name="' + bZ + '"; filename="' + unescape(encodeURIComponent(b0.name || "blob")) + '"' + bU + "Content-Type: " + (b0.type || "application/octet-stream") + bU + bU + b0.getSource() + bU : bY + bV + bU + 'Content-Disposition: form-data; name="' + bZ + '"' + bU + bU + unescape(encodeURIComponent(b0)) + bU;
                    }), bW += bY + bV + bY + bU;
                }

                var bO = this, bN, bP;
                bK.extend(this, {
                    send: function (b0, bY) {
                        var bW = this, bU = "Mozilla" === bJ.browser && bJ.version >= 4 && bJ.version < 7, bZ = "Android Browser" === bJ.browser, bT = !1;
                        if (bP = b0.url.replace(/^.+?\/([\w\-\.]+)$/, "$1").toLowerCase(), bN = bS(), bN.open(b0.method, b0.url, b0.async, b0.user, b0.password), bY instanceof bD) {
                            bY.isDetached() && (bT = !0), bY = bY.getSource();
                        } else {
                            if (bY instanceof bI) {
                                if (bY.hasBlob()) {
                                    if (bY.getBlob().isDetached()) {
                                        bY = bR.call(bW, bY), bT = !0;
                                    } else {
                                        if ((bU || bZ) && "blob" === bK.typeOf(bY.getBlob().getSource()) && window.FileReader) {
                                            return void bQ.call(bW, b0, bY);
                                        }
                                    }
                                }
                                if (bY instanceof bI) {
                                    var bX = new window.FormData;
                                    bY.each(function (b2, b1) {
                                        b2 instanceof bD ? bX.append(b1, b2.getSource()) : bX.append(b1, b2);
                                    }), bY = bX;
                                }
                            }
                        }
                        bN.upload ? (b0.withCredentials && (bN.withCredentials = !0), bN.addEventListener("load", function (b1) {
                                bW.trigger(b1);
                            }), bN.addEventListener("error", function (b1) {
                                bW.trigger(b1);
                            }), bN.addEventListener("progress", function (b1) {
                                bW.trigger(b1);
                            }), bN.upload.addEventListener("progress", function (b1) {
                                bW.trigger({type: "UploadProgress", loaded: b1.loaded, total: b1.total});
                            })) : bN.onreadystatechange = function bV() {
                                switch (bN.readyState) {
                                    case 1:
                                        break;
                                    case 2:
                                        break;
                                    case 3:
                                        var b3, b1;
                                        try {
                                            bF.hasSameOrigin(b0.url) && (b3 = bN.getResponseHeader("Content-Length") || 0), bN.responseText && (b1 = bN.responseText.length);
                                        } catch (b2) {
                                            b3 = b1 = 0;
                                        }
                                        bW.trigger({
                                            type: "progress",
                                            lengthComputable: !!b3,
                                            total: parseInt(b3, 10),
                                            loaded: b1
                                        });
                                        break;
                                    case 4:
                                        bN.onreadystatechange = function () {
                                        }, bW.trigger(0 === bN.status ? "error" : "load");
                                }
                            }, bK.isEmptyObj(b0.headers) || bK.each(b0.headers, function (b2, b1) {
                            bN.setRequestHeader(b1, b2);
                        }), "" !== b0.responseType && "responseType" in bN && (bN.responseType = "json" !== b0.responseType || bJ.can("return_response_type", "json") ? b0.responseType : "text"), bT ? bN.sendAsBinary ? bN.sendAsBinary(bY) : !function () {
                                    for (var b2 = new Uint8Array(bY.length), b1 = 0; b1 < bY.length; b1++) {
                                        b2[b1] = 255 & bY.charCodeAt(b1);
                                    }
                                    bN.send(b2.buffer);
                                }() : bN.send(bY), bW.trigger("loadstart");
                    }, getStatus: function () {
                        try {
                            if (bN) {
                                return bN.status;
                            }
                        } catch (bT) {
                        }
                        return 0;
                    }, getResponse: function (bX) {
                        var bV = this.getRuntime();
                        try {
                            switch (bX) {
                                case"blob":
                                    var bU = new bC(bV.uid, bN.response), bY = bN.getResponseHeader("Content-Disposition");
                                    if (bY) {
                                        var bT = bY.match(/filename=([\'\"'])([^\1]+)\1/);
                                        bT && (bP = bT[2]);
                                    }
                                    return bU.name = bP, bU.type || (bU.type = bE.getFileMime(bP)), bU;
                                case"json":
                                    return bJ.can("return_response_type", "json") ? bN.response : 200 === bN.status && window.JSON ? JSON.parse(bN.responseText) : null;
                                case"document":
                                    return bM(bN);
                                default:
                                    return "" !== bN.responseText ? bN.responseText : null;
                            }
                        } catch (bW) {
                            return null;
                        }
                    }, getAllResponseHeaders: function () {
                        try {
                            return bN.getAllResponseHeaders();
                        } catch (bT) {
                        }
                        return "";
                    }, abort: function () {
                        bN && bN.abort();
                    }, destroy: function () {
                        bO = bP = null;
                    }
                });
            }

            return bG.XMLHttpRequest = bH;
        }), br(aJ, [], function () {
            return function () {
                function bE(bK, bJ) {
                    var bL = bD ? 0 : -8 * (bJ - 1), bI = 0, bH;
                    for (bH = 0; bJ > bH; bH++) {
                        bI |= bF.charCodeAt(bK + bH) << Math.abs(bL + 8 * bH);
                    }
                    return bI;
                }

                function bG(bI, bH, bJ) {
                    bJ = 3 === arguments.length ? bJ : bF.length - bH - 1, bF = bF.substr(0, bH) + bI + bF.substr(bJ + bH);
                }

                function bC(bL, bJ, bI) {
                    var bM = "", bH = bD ? 0 : -8 * (bI - 1), bK;
                    for (bK = 0; bI > bK; bK++) {
                        bM += String.fromCharCode(bJ >> Math.abs(bH + 8 * bK) & 255);
                    }
                    bG(bM, bL, bI);
                }

                var bD = !1, bF;
                return {
                    II: function (bH) {
                        return bH === be ? bD : void (bD = bH);
                    }, init: function (bH) {
                        bD = !1, bF = bH;
                    }, SEGMENT: function (bJ, bI, bH) {
                        switch (arguments.length) {
                            case 1:
                                return bF.substr(bJ, bF.length - bJ - 1);
                            case 2:
                                return bF.substr(bJ, bI);
                            case 3:
                                bG(bH, bJ, bI);
                                break;
                            default:
                                return bF;
                        }
                    }, BYTE: function (bH) {
                        return bE(bH, 1);
                    }, SHORT: function (bH) {
                        return bE(bH, 2);
                    }, LONG: function (bI, bH) {
                        return bH === be ? bE(bI, 4) : void bC(bI, bH, 4);
                    }, SLONG: function (bH) {
                        var bI = bE(bH, 4);
                        return bI > 2147483647 ? bI - 4294967296 : bI;
                    }, STRING: function (bI, bJ) {
                        var bH = "";
                        for (bJ += bI; bJ > bI; bI++) {
                            bH += String.fromCharCode(bE(bI, 1));
                        }
                        return bH;
                    }
                };
            };
        }), br(bo, [aJ], function (bD) {
            return function bC(bJ) {
                var bF = [], bH, bI, bE, bG = 0;
                if (bH = new bD, bH.init(bJ), 65496 === bH.SHORT(0)) {
                    for (bI = 2; bI <= bJ.length;) {
                        if (bE = bH.SHORT(bI), bE >= 65488 && 65495 >= bE) {
                            bI += 2;
                        } else {
                            if (65498 === bE || 65497 === bE) {
                                break;
                            }
                            bG = bH.SHORT(bI + 2) + 2, bE >= 65505 && 65519 >= bE && bF.push({
                                hex: bE,
                                name: "APP" + (15 & bE),
                                start: bI,
                                length: bG,
                                segment: bH.SEGMENT(bI, bG)
                            }), bI += bG;
                        }
                    }
                    return bH.init(null), {
                        headers: bF, restore: function (bL) {
                            var bK, bM;
                            for (bH.init(bL), bI = 65504 == bH.SHORT(2) ? 4 + bH.SHORT(4) : 2, bM = 0, bK = bF.length; bK > bM; bM++) {
                                bH.SEGMENT(bI, 0, bF[bM].segment), bI += bF[bM].length;
                            }
                            return bL = bH.SEGMENT(), bH.init(null), bL;
                        }, strip: function (bL) {
                            var bN, bK, bM;
                            for (bK = new bC(bL), bN = bK.headers, bK.purge(), bH.init(bL), bM = bN.length; bM--;) {
                                bH.SEGMENT(bN[bM].start, bN[bM].length, "");
                            }
                            return bL = bH.SEGMENT(), bH.init(null), bL;
                        }, get: function (bM) {
                            for (var bK = [], bN = 0, bL = bF.length; bL > bN; bN++) {
                                bF[bN].name === bM.toUpperCase() && bK.push(bF[bN].segment);
                            }
                            return bK;
                        }, set: function (bN, bL) {
                            var bP = [], bM, bO, bK;
                            for ("string" == typeof bL ? bP.push(bL) : bP = bL, bM = bO = 0, bK = bF.length; bK > bM && (bF[bM].name === bN.toUpperCase() && (bF[bM].segment = bP[bO], bF[bM].length = bP[bO].length, bO++), !(bO >= bP.length)); bM++) {
                            }
                        }, purge: function () {
                            bF = [], bH.init(null), bH = null;
                        }
                    };
                }
            };
        }), br(aC, [bd, aJ], function (bD, bE) {
            return function bC() {
                function bI(bW, bQ) {
                    var bS = bG.SHORT(bW), bN, bP, bZ, bY, bX, bV, bT, bO, bR = [], bU = {};
                    for (bN = 0; bS > bN; bN++) {
                        if (bT = bV = bW + 12 * bN + 2, bZ = bQ[bG.SHORT(bT)], bZ !== be) {
                            switch (bY = bG.SHORT(bT += 2), bX = bG.LONG(bT += 2), bT += 4, bR = [], bY) {
                                case 1:
                                case 7:
                                    for (bX > 4 && (bT = bG.LONG(bT) + bM.tiffHeader), bP = 0; bX > bP; bP++) {
                                        bR[bP] = bG.BYTE(bT + bP);
                                    }
                                    break;
                                case 2:
                                    bX > 4 && (bT = bG.LONG(bT) + bM.tiffHeader), bU[bZ] = bG.STRING(bT, bX - 1);
                                    continue;
                                case 3:
                                    for (bX > 2 && (bT = bG.LONG(bT) + bM.tiffHeader), bP = 0; bX > bP; bP++) {
                                        bR[bP] = bG.SHORT(bT + 2 * bP);
                                    }
                                    break;
                                case 4:
                                    for (bX > 1 && (bT = bG.LONG(bT) + bM.tiffHeader), bP = 0; bX > bP; bP++) {
                                        bR[bP] = bG.LONG(bT + 4 * bP);
                                    }
                                    break;
                                case 5:
                                    for (bT = bG.LONG(bT) + bM.tiffHeader, bP = 0; bX > bP; bP++) {
                                        bR[bP] = bG.LONG(bT + 4 * bP) / bG.LONG(bT + 4 * bP + 4);
                                    }
                                    break;
                                case 9:
                                    for (bT = bG.LONG(bT) + bM.tiffHeader, bP = 0; bX > bP; bP++) {
                                        bR[bP] = bG.SLONG(bT + 4 * bP);
                                    }
                                    break;
                                case 10:
                                    for (bT = bG.LONG(bT) + bM.tiffHeader, bP = 0; bX > bP; bP++) {
                                        bR[bP] = bG.SLONG(bT + 4 * bP) / bG.SLONG(bT + 4 * bP + 4);
                                    }
                                    break;
                                default:
                                    continue;
                            }
                            bO = 1 == bX ? bR[0] : bR, bU[bZ] = bF.hasOwnProperty(bZ) && "object" != typeof bO ? bF[bZ][bO] : bO;
                        }
                    }
                    return bU;
                }

                function bK() {
                    var bN = bM.tiffHeader;
                    return bG.II(18761 == bG.SHORT(bN)), 42 !== bG.SHORT(bN += 2) ? !1 : (bM.IFD0 = bM.tiffHeader + bG.LONG(bN += 2), bH = bI(bM.IFD0, bJ.tiff), "ExifIFDPointer" in bH && (bM.exifIFD = bM.tiffHeader + bH.ExifIFDPointer, delete bH.ExifIFDPointer), "GPSInfoIFDPointer" in bH && (bM.gpsIFD = bM.tiffHeader + bH.GPSInfoIFDPointer, delete bH.GPSInfoIFDPointer), !0);
                }

                function bL(bT, bW, bP) {
                    var bR, bN, bO, bV = 0;
                    if ("string" == typeof bW) {
                        var bQ = bJ[bT.toLowerCase()];
                        for (var bU in bQ) {
                            if (bQ[bU] === bW) {
                                bW = bU;
                                break;
                            }
                        }
                    }
                    bR = bM[bT.toLowerCase() + "IFD"], bN = bG.SHORT(bR);
                    for (var bS = 0; bN > bS; bS++) {
                        if (bO = bR + 12 * bS + 2, bG.SHORT(bO) == bW) {
                            bV = bO + 8;
                            break;
                        }
                    }
                    return bV ? (bG.LONG(bV, bP), !0) : !1;
                }

                var bG, bJ, bH, bM = {}, bF;
                return bG = new bE, bJ = {
                    tiff: {
                        274: "Orientation",
                        270: "ImageDescription",
                        271: "Make",
                        272: "Model",
                        305: "Software",
                        34665: "ExifIFDPointer",
                        34853: "GPSInfoIFDPointer"
                    },
                    exif: {
                        36864: "ExifVersion",
                        40961: "ColorSpace",
                        40962: "PixelXDimension",
                        40963: "PixelYDimension",
                        36867: "DateTimeOriginal",
                        33434: "ExposureTime",
                        33437: "FNumber",
                        34855: "ISOSpeedRatings",
                        37377: "ShutterSpeedValue",
                        37378: "ApertureValue",
                        37383: "MeteringMode",
                        37384: "LightSource",
                        37385: "Flash",
                        37386: "FocalLength",
                        41986: "ExposureMode",
                        41987: "WhiteBalance",
                        41990: "SceneCaptureType",
                        41988: "DigitalZoomRatio",
                        41992: "Contrast",
                        41993: "Saturation",
                        41994: "Sharpness"
                    },
                    gps: {
                        0: "GPSVersionID",
                        1: "GPSLatitudeRef",
                        2: "GPSLatitude",
                        3: "GPSLongitudeRef",
                        4: "GPSLongitude"
                    }
                }, bF = {
                    ColorSpace: {1: "sRGB", 0: "Uncalibrated"},
                    MeteringMode: {
                        0: "Unknown",
                        1: "Average",
                        2: "CenterWeightedAverage",
                        3: "Spot",
                        4: "MultiSpot",
                        5: "Pattern",
                        6: "Partial",
                        255: "Other"
                    },
                    LightSource: {
                        1: "Daylight",
                        2: "Fliorescent",
                        3: "Tungsten",
                        4: "Flash",
                        9: "Fine weather",
                        10: "Cloudy weather",
                        11: "Shade",
                        12: "Daylight fluorescent (D 5700 - 7100K)",
                        13: "Day white fluorescent (N 4600 -5400K)",
                        14: "Cool white fluorescent (W 3900 - 4500K)",
                        15: "White fluorescent (WW 3200 - 3700K)",
                        17: "Standard light A",
                        18: "Standard light B",
                        19: "Standard light C",
                        20: "D55",
                        21: "D65",
                        22: "D75",
                        23: "D50",
                        24: "ISO studio tungsten",
                        255: "Other"
                    },
                    Flash: {
                        0: "Flash did not fire.",
                        1: "Flash fired.",
                        5: "Strobe return light not detected.",
                        7: "Strobe return light detected.",
                        9: "Flash fired, compulsory flash mode",
                        13: "Flash fired, compulsory flash mode, return light not detected",
                        15: "Flash fired, compulsory flash mode, return light detected",
                        16: "Flash did not fire, compulsory flash mode",
                        24: "Flash did not fire, auto mode",
                        25: "Flash fired, auto mode",
                        29: "Flash fired, auto mode, return light not detected",
                        31: "Flash fired, auto mode, return light detected",
                        32: "No flash function",
                        65: "Flash fired, red-eye reduction mode",
                        69: "Flash fired, red-eye reduction mode, return light not detected",
                        71: "Flash fired, red-eye reduction mode, return light detected",
                        73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                        77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                        79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                        89: "Flash fired, auto mode, red-eye reduction mode",
                        93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                        95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
                    },
                    ExposureMode: {0: "Auto exposure", 1: "Manual exposure", 2: "Auto bracket"},
                    WhiteBalance: {0: "Auto white balance", 1: "Manual white balance"},
                    SceneCaptureType: {0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene"},
                    Contrast: {0: "Normal", 1: "Soft", 2: "Hard"},
                    Saturation: {0: "Normal", 1: "Low saturation", 2: "High saturation"},
                    Sharpness: {0: "Normal", 1: "Soft", 2: "Hard"},
                    GPSLatitudeRef: {N: "North latitude", S: "South latitude"},
                    GPSLongitudeRef: {E: "East longitude", W: "West longitude"}
                }, {
                    init: function (bN) {
                        return bM = {tiffHeader: 10}, bN !== be && bN.length ? (bG.init(bN), 65505 === bG.SHORT(0) && "EXIF\x00" === bG.STRING(4, 5).toUpperCase() ? bK() : !1) : !1;
                    }, TIFF: function () {
                        return bH;
                    }, EXIF: function () {
                        var bN;
                        if (bN = bI(bM.exifIFD, bJ.exif), bN.ExifVersion && "array" === bD.typeOf(bN.ExifVersion)) {
                            for (var bP = 0, bO = ""; bP < bN.ExifVersion.length; bP++) {
                                bO += String.fromCharCode(bN.ExifVersion[bP]);
                            }
                            bN.ExifVersion = bO;
                        }
                        return bN;
                    }, GPS: function () {
                        var bN;
                        return bN = bI(bM.gpsIFD, bJ.gps), bN.GPSVersionID && "array" === bD.typeOf(bN.GPSVersionID) && (bN.GPSVersionID = bN.GPSVersionID.join(".")), bN;
                    }, setExif: function (bO, bN) {
                        return "PixelXDimension" !== bO && "PixelYDimension" !== bO ? !1 : bL("exif", bO, bN);
                    }, getBinary: function () {
                        return bG.SEGMENT();
                    }, purge: function () {
                        bG.init(null), bG = bH = null, bM = {};
                    }
                };
            };
        }), br(aY, [bd, bs, bo, aJ, aC], function (bF, bD, bH, bC, bE) {
            function bG(bI) {
                function bO() {
                    for (var bS = 0, bR, bT; bS <= bP.length;) {
                        if (bR = bN.SHORT(bS += 2), bR >= 65472 && 65475 >= bR) {
                            return bS += 5, {height: bN.SHORT(bS), width: bN.SHORT(bS += 2)};
                        }
                        bT = bN.SHORT(bS += 2), bS += bT - 2;
                    }
                    return null;
                }

                function bQ() {
                    bM && bJ && bN && (bM.purge(), bJ.purge(), bN.init(null), bP = bL = bJ = bM = bN = null);
                }

                var bP, bN, bJ, bM, bL, bK;
                if (bP = bI, bN = new bC, bN.init(bP), 65496 !== bN.SHORT(0)) {
                    throw new bD.ImageError(bD.ImageError.WRONG_FORMAT);
                }
                bJ = new bH(bI), bM = new bE, bK = !!bM.init(bJ.get("app1")[0]), bL = bO.call(this), bF.extend(this, {
                    type: "image/jpeg",
                    size: bP.length,
                    width: bL && bL.width || 0,
                    height: bL && bL.height || 0,
                    setExif: function (bR, bS) {
                        return bK ? ("object" === bF.typeOf(bR) ? bF.each(bR, function (bU, bT) {
                                    bM.setExif(bT, bU);
                                }) : bM.setExif(bR, bS), void bJ.set("app1", bM.getBinary())) : !1;
                    },
                    writeHeaders: function () {
                        return arguments.length ? bJ.restore(arguments[0]) : bP = bJ.restore(bP);
                    },
                    stripHeaders: function (bR) {
                        return bJ.strip(bR);
                    },
                    purge: function () {
                        bQ.call(this);
                    }
                }), bK && (this.meta = {tiff: bM.TIFF(), exif: bM.EXIF(), gps: bM.GPS()});
            }

            return bG;
        }), br(a8, [bs, bd, aJ], function (bE, bD, bF) {
            function bC(bJ) {
                function bG() {
                    var bQ, bP;
                    return bQ = bM.call(this, 8), "IHDR" == bQ.type ? (bP = bQ.start, {
                            width: bN.LONG(bP),
                            height: bN.LONG(bP += 4)
                        }) : null;
                }

                function bH() {
                    bN && (bN.init(null), bO = bK = bL = bI = bN = null);
                }

                function bM(bS) {
                    var bQ, bT, bP, bR;
                    return bQ = bN.LONG(bS), bT = bN.STRING(bS += 4, 4), bP = bS += 4, bR = bN.LONG(bS + bQ), {
                        length: bQ,
                        type: bT,
                        start: bP,
                        CRC: bR
                    };
                }

                var bO, bN, bL, bI, bK;
                bO = bJ, bN = new bF, bN.init(bO), function () {
                    var bQ = 0, bR = 0, bP = [35152, 20039, 3338, 6666];
                    for (bR = 0; bR < bP.length; bR++, bQ += 2) {
                        if (bP[bR] != bN.SHORT(bQ)) {
                            throw new bE.ImageError(bE.ImageError.WRONG_FORMAT);
                        }
                    }
                }(), bK = bG.call(this), bD.extend(this, {
                    type: "image/png",
                    size: bO.length,
                    width: bK.width,
                    height: bK.height,
                    purge: function () {
                        bH.call(this);
                    }
                }), bH.call(this);
            }

            return bC;
        }), br(aT, [bd, bs, aY, a8], function (bE, bD, bF, bC) {
            return function (bH) {
                var bI = [bF, bC], bG;
                bG = function () {
                    for (var bJ = 0; bJ < bI.length; bJ++) {
                        try {
                            return new bI[bJ](bH);
                        } catch (bK) {
                        }
                    }
                    throw new bD.ImageError(bD.ImageError.WRONG_FORMAT);
                }(), bE.extend(this, {
                    type: "", size: 0, width: 0, height: 0, setExif: function () {
                    }, writeHeaders: function (bJ) {
                        return bJ;
                    }, stripHeaders: function (bJ) {
                        return bJ;
                    }, purge: function () {
                    }
                }), bE.extend(this, bG), this.purge = function () {
                    bG.purge(), bG = null;
                };
            };
        }), br(bh, [], function () {
            function bD(bV, bR, bM) {
                var bO = bV.naturalWidth, bZ = bV.naturalHeight, bL = bM.width, bJ = bM.height, bX = bM.x || 0, bQ = bM.y || 0, bW = bR.getContext("2d");
                bC(bV) && (bO /= 2, bZ /= 2);
                var bU = 1024, bS = document.createElement("canvas");
                bS.width = bS.height = bU;
                for (var bN = bS.getContext("2d"), bP = bE(bV, bO, bZ), bT = 0; bZ > bT;) {
                    for (var bI = bT + bU > bZ ? bZ - bT : bU, bF = 0; bO > bF;) {
                        var bH = bF + bU > bO ? bO - bF : bU;
                        bN.clearRect(0, 0, bU, bU), bN.drawImage(bV, -bF, -bT);
                        var bK = bF * bL / bO + bX << 0, b0 = Math.ceil(bH * bL / bO), bG = bT * bJ / bZ / bP + bQ << 0, bY = Math.ceil(bI * bJ / bZ / bP);
                        bW.drawImage(bS, 0, 0, bH, bI, bK, bG, b0, bY), bF += bU;
                    }
                    bT += bU;
                }
                bS = bN = null;
            }

            function bC(bI) {
                var bG = bI.naturalWidth, bJ = bI.naturalHeight;
                if (bG * bJ > 1048576) {
                    var bF = document.createElement("canvas");
                    bF.width = bF.height = 1;
                    var bH = bF.getContext("2d");
                    return bH.drawImage(bI, -bG + 1, 0), 0 === bH.getImageData(0, 0, 1, 1).data[3];
                }
                return !1;
            }

            function bE(bK, bO, bH) {
                var bJ = document.createElement("canvas");
                bJ.width = 1, bJ.height = bH;
                var bF = bJ.getContext("2d");
                bF.drawImage(bK, 0, 0);
                for (var bG = bF.getImageData(0, 0, 1, bH).data, bM = 0, bP = bH, bN = bH; bN > bM;) {
                    var bL = bG[4 * (bN - 1) + 3];
                    0 === bL ? bP = bN : bM = bN, bN = bP + bM >> 1;
                }
                bJ = null;
                var bI = bN / bH;
                return 0 === bI ? 1 : bI;
            }

            return {isSubsampled: bC, renderTo: bD};
        }), br(az, [aW, bd, bs, bm, bb, aT, bh, bn, bx], function (bG, bK, bE, bF, bC, bD, bI, bL, bJ) {
            function bH() {
                function bT() {
                    if (!b2 && !bX) {
                        throw new bE.ImageError(bE.DOMException.INVALID_STATE_ERR);
                    }
                    return b2 || bX;
                }

                function bV(b3) {
                    return bF.atob(b3.substring(b3.indexOf("base64,") + 7));
                }

                function bO(b4, b3) {
                    return "data:" + (b3 || "") + ";base64," + bF.btoa(b4);
                }

                function bU(b4) {
                    var b3 = this;
                    bX = new Image, bX.onerror = function () {
                        bR.call(this), b3.trigger("error", bE.ImageError.WRONG_FORMAT);
                    }, bX.onload = function () {
                        b3.trigger("load");
                    }, bX.src = /^data:[^;]*;base64,/.test(b4) ? b4 : bO(b4, bY.type);
                }

                function bS(b6, b4) {
                    var b3 = this, b5;
                    return window.FileReader ? (b5 = new FileReader, b5.onload = function () {
                            b4(this.result);
                        }, b5.onerror = function () {
                            b3.trigger("error", bE.ImageError.WRONG_FORMAT);
                        }, b5.readAsDataURL(b6), void 0) : b4(b6.getAsDataURL());
                }

                function bQ(b5, b7, b3, b4) {
                    var cd = this, cg, cf, cc = 0, b6 = 0, cb, ca, b8, b9;
                    if (bP = b4, b9 = this.meta && this.meta.tiff && this.meta.tiff.Orientation || 1, -1 !== bK.inArray(b9, [5, 6, 7, 8])) {
                        var ce = b5;
                        b5 = b7, b7 = ce;
                    }
                    return cb = bT(), b3 ? (b5 = Math.min(b5, cb.width), b7 = Math.min(b7, cb.height), cg = Math.max(b5 / cb.width, b7 / cb.height)) : cg = Math.min(b5 / cb.width, b7 / cb.height), cg > 1 && !b3 && b4 ? void this.trigger("Resize") : (b2 || (b2 = document.createElement("canvas")), ca = Math.round(cb.width * cg), b8 = Math.round(cb.height * cg), b3 ? (b2.width = b5, b2.height = b7, ca > b5 && (cc = Math.round((ca - b5) / 2)), b8 > b7 && (b6 = Math.round((b8 - b7) / 2))) : (b2.width = ca, b2.height = b8), bP || bN(b2.width, b2.height, b9), bM.call(this, cb, b2, -cc, -b6, ca, b8), this.width = b2.width, this.height = b2.height, bW = !0, void cd.trigger("Resize"));
                }

                function bM(b7, b4, b9, b3, b6, b8) {
                    if ("iOS" === bJ.OS) {
                        bI.renderTo(b7, b4, {width: b6, height: b8, x: b9, y: b3});
                    } else {
                        var b5 = b4.getContext("2d");
                        b5.drawImage(b7, b9, b3, b6, b8);
                    }
                }

                function bN(b5, b4, b6) {
                    switch (b6) {
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            b2.width = b4, b2.height = b5;
                            break;
                        default:
                            b2.width = b5, b2.height = b4;
                    }
                    var b3 = b2.getContext("2d");
                    switch (b6) {
                        case 2:
                            b3.translate(b5, 0), b3.scale(-1, 1);
                            break;
                        case 3:
                            b3.translate(b5, b4), b3.rotate(Math.PI);
                            break;
                        case 4:
                            b3.translate(0, b4), b3.scale(1, -1);
                            break;
                        case 5:
                            b3.rotate(0.5 * Math.PI), b3.scale(1, -1);
                            break;
                        case 6:
                            b3.rotate(0.5 * Math.PI), b3.translate(0, -b4);
                            break;
                        case 7:
                            b3.rotate(0.5 * Math.PI), b3.translate(b5, -b4), b3.scale(-1, 1);
                            break;
                        case 8:
                            b3.rotate(-0.5 * Math.PI), b3.translate(-b5, 0);
                    }
                }

                function bR() {
                    bZ && (bZ.purge(), bZ = null), b0 = bX = b2 = bY = null, bW = !1;
                }

                var b1 = this, bX, bZ, b2, b0, bY, bW = !1, bP = !0;
                bK.extend(this, {
                    loadFromBlob: function (b6) {
                        var b4 = this, b3 = b4.getRuntime(), b5 = arguments.length > 1 ? arguments[1] : !0;
                        if (!b3.can("access_binary")) {
                            throw new bE.RuntimeError(bE.RuntimeError.NOT_SUPPORTED_ERR);
                        }
                        return bY = b6, b6.isDetached() ? (b0 = b6.getSource(), void bU.call(this, b0)) : void bS.call(this, b6.getSource(), function (b7) {
                                b5 && (b0 = bV(b7)), bU.call(b4, b7);
                            });
                    }, loadFromImage: function (b4, b3) {
                        this.meta = b4.meta, bY = new bC(null, {
                            name: b4.name,
                            size: b4.size,
                            type: b4.type
                        }), bU.call(this, b3 ? b0 = b4.getAsBinaryString() : b4.getAsDataURL());
                    }, getInfo: function () {
                        var b3 = this.getRuntime(), b4;
                        return !bZ && b0 && b3.can("access_image_binary") && (bZ = new bD(b0)), b4 = {
                            width: bT().width || 0,
                            height: bT().height || 0,
                            type: bY.type || bL.getFileMime(bY.name),
                            size: b0 && b0.length || bY.size || 0,
                            name: bY.name || "",
                            meta: bZ && bZ.meta || this.meta || {}
                        };
                    }, downsize: function () {
                        bQ.apply(this, arguments);
                    }, getAsCanvas: function () {
                        return b2 && (b2.id = this.uid + "_canvas"), b2;
                    }, getAsBlob: function (b4, b3) {
                        return b4 !== this.type && bQ.call(this, this.width, this.height, !1), new bC(null, {
                            name: bY.name || "",
                            type: b4,
                            data: b1.getAsBinaryString.call(this, b4, b3)
                        });
                    }, getAsDataURL: function (b4) {
                        var b3 = arguments[1] || 90;
                        if (!bW) {
                            return bX.src;
                        }
                        if ("image/jpeg" !== b4) {
                            return b2.toDataURL("image/png");
                        }
                        try {
                            return b2.toDataURL("image/jpeg", b3 / 100);
                        } catch (b5) {
                            return b2.toDataURL("image/jpeg");
                        }
                    }, getAsBinaryString: function (b5, b4) {
                        if (!bW) {
                            return b0 || (b0 = bV(b1.getAsDataURL(b5, b4))), b0;
                        }
                        if ("image/jpeg" !== b5) {
                            b0 = bV(b1.getAsDataURL(b5, b4));
                        } else {
                            var b6;
                            b4 || (b4 = 90);
                            try {
                                b6 = b2.toDataURL("image/jpeg", b4 / 100);
                            } catch (b3) {
                                b6 = b2.toDataURL("image/jpeg");
                            }
                            b0 = bV(b6), bZ && (b0 = bZ.stripHeaders(b0), bP && (bZ.meta && bZ.meta.exif && bZ.setExif({
                                PixelXDimension: this.width,
                                PixelYDimension: this.height
                            }), b0 = bZ.writeHeaders(b0)), bZ.purge(), bZ = null);
                        }
                        return bW = !1, b0;
                    }, destroy: function () {
                        b1 = null, bR.call(this), this.getRuntime().getShim().removeInstance(this.uid);
                    }
                });
            }

            return bG.Image = bH;
        }), br(bq, [bd, bx, bv, bs, bt], function (bG, bJ, bE, bF, bC) {
            function bD() {
                var bM;
                try {
                    bM = navigator.plugins["Shockwave Flash"], bM = bM.description;
                } catch (bL) {
                    try {
                        bM = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");
                    } catch (bN) {
                        bM = "0.0";
                    }
                }
                return bM = bM.match(/\d+/g), parseFloat(bM[0] + "." + bM[1]);
            }

            function bH(bM) {
                var bN = this, bL;
                bM = bG.extend({swf_url: bJ.swf_url}, bM), bC.call(this, bM, bK, {
                    access_binary: function (bO) {
                        return bO && "browser" === bN.mode;
                    },
                    access_image_binary: function (bO) {
                        return bO && "browser" === bN.mode;
                    },
                    display_media: bC.capTrue,
                    do_cors: bC.capTrue,
                    drag_and_drop: !1,
                    report_upload_progress: function () {
                        return "client" === bN.mode;
                    },
                    resize_image: bC.capTrue,
                    return_response_headers: !1,
                    return_response_type: function (bO) {
                        return "json" === bO && window.JSON ? !0 : !bG.arrayDiff(bO, ["", "text", "document"]) || "browser" === bN.mode;
                    },
                    return_status_code: function (bO) {
                        return "browser" === bN.mode || !bG.arrayDiff(bO, [200, 404]);
                    },
                    select_file: bC.capTrue,
                    select_multiple: bC.capTrue,
                    send_binary_string: function (bO) {
                        return bO && "browser" === bN.mode;
                    },
                    send_browser_cookies: function (bO) {
                        return bO && "browser" === bN.mode;
                    },
                    send_custom_headers: function (bO) {
                        return bO && "browser" === bN.mode;
                    },
                    send_multipart: bC.capTrue,
                    slice_blob: function (bO) {
                        return bO && "browser" === bN.mode;
                    },
                    stream_upload: function (bO) {
                        return bO && "browser" === bN.mode;
                    },
                    summon_file_dialog: !1,
                    upload_filesize: function (bO) {
                        return bG.parseSizeStr(bO) <= 2097152 || "client" === bN.mode;
                    },
                    use_http_method: function (bO) {
                        return !bG.arrayDiff(bO, ["GET", "POST"]);
                    }
                }, {
                    access_binary: function (bO) {
                        return bO ? "browser" : "client";
                    }, access_image_binary: function (bO) {
                        return bO ? "browser" : "client";
                    }, report_upload_progress: function (bO) {
                        return bO ? "browser" : "client";
                    }, return_response_type: function (bO) {
                        return bG.arrayDiff(bO, ["", "text", "json", "document"]) ? "browser" : ["client", "browser"];
                    }, return_status_code: function (bO) {
                        return bG.arrayDiff(bO, [200, 404]) ? "browser" : ["client", "browser"];
                    }, send_binary_string: function (bO) {
                        return bO ? "browser" : "client";
                    }, send_browser_cookies: function (bO) {
                        return bO ? "browser" : "client";
                    }, send_custom_headers: function (bO) {
                        return bO ? "browser" : "client";
                    }, stream_upload: function (bO) {
                        return bO ? "client" : "browser";
                    }, upload_filesize: function (bO) {
                        return bG.parseSizeStr(bO) >= 2097152 ? "client" : "browser";
                    }
                }, "client"), bD() < 10 && (this.mode = !1), bG.extend(this, {
                    getShim: function () {
                        return bE.get(this.uid);
                    }, shimExec: function (bP, bO) {
                        var bQ = [].slice.call(arguments, 2);
                        return bN.getShim().exec(this.uid, bP, bO, bQ);
                    }, init: function () {
                        var bQ, bO, bP;
                        bP = this.getShimContainer(), bG.extend(bP.style, {
                            position: "absolute",
                            top: "-8px",
                            left: "-8px",
                            width: "9px",
                            height: "9px",
                            overflow: "hidden"
                        }), bQ = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + bM.swf_url + '" ', "IE" === bJ.browser && (bQ += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '), bQ += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + bM.swf_url + '" /><param name="flashvars" value="uid=' + escape(this.uid) + "&target=" + bJ.global_event_dispatcher + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>', "IE" === bJ.browser ? (bO = document.createElement("div"), bP.appendChild(bO), bO.outerHTML = bQ, bO = bP = null) : bP.innerHTML = bQ, bL = setTimeout(function () {
                            bN && !bN.initialized && bN.trigger("Error", new bF.RuntimeError(bF.RuntimeError.NOT_INIT_ERR));
                        }, 5000);
                    }, destroy: function (bO) {
                        return function () {
                            bO.call(bN), clearTimeout(bL), bM = bL = bO = bN = null;
                        };
                    }(this.destroy)
                }, bI);
            }

            var bK = "flash", bI = {};
            return bC.addConstructor(bK, bH), bI;
        }), br(aB, [bq, a9], function (bD, bC) {
            var bE = {
                slice: function (bH, bJ, bF, bG) {
                    var bI = this.getRuntime();
                    return 0 > bJ ? bJ = Math.max(bH.size + bJ, 0) : bJ > 0 && (bJ = Math.min(bJ, bH.size)), 0 > bF ? bF = Math.max(bH.size + bF, 0) : bF > 0 && (bF = Math.min(bF, bH.size)), bH = bI.shimExec.call(this, "Blob", "slice", bJ, bF, bG || ""), bH && (bH = new bC(bI.uid, bH)), bH;
                }
            };
            return bD.Blob = bE;
        }), br(aA, [bq], function (bD) {
            var bC = {
                init: function (bE) {
                    this.getRuntime().shimExec.call(this, "FileInput", "init", {
                        name: bE.name,
                        accept: bE.accept,
                        multiple: bE.multiple
                    }), this.trigger("ready");
                }
            };
            return bD.FileInput = bC;
        }), br(ay, [bq, bm], function (bF, bD) {
            function bG(bH, bI) {
                switch (bI) {
                    case"readAsText":
                        return bD.atob(bH, "utf8");
                    case"readAsBinaryString":
                        return bD.atob(bH);
                    case"readAsDataURL":
                        return bH;
                }
                return null;
            }

            var bC = "", bE = {
                read: function (bJ, bH) {
                    var bI = this, bK = bI.getRuntime();
                    return "readAsDataURL" === bJ && (bC = "data:" + (bH.type || "") + ";base64,"), bI.bind("Progress", function (bL, bM) {
                        bM && (bC += bG(bM, bJ));
                    }), bK.shimExec.call(this, "FileReader", "readAsBase64", bH.uid);
                }, getResult: function () {
                    return bC;
                }, destroy: function () {
                    bC = null;
                }
            };
            return bF.FileReader = bE;
        }), br(a7, [bq, bm], function (bE, bD) {
            function bF(bG, bH) {
                switch (bH) {
                    case"readAsText":
                        return bD.atob(bG, "utf8");
                    case"readAsBinaryString":
                        return bD.atob(bG);
                    case"readAsDataURL":
                        return bG;
                }
                return null;
            }

            var bC = {
                read: function (bJ, bH) {
                    var bG, bI = this.getRuntime();
                    return (bG = bI.shimExec.call(this, "FileReaderSync", "readAsBase64", bH.uid)) ? ("readAsDataURL" === bJ && (bG = "data:" + (bH.type || "") + ";base64," + bG), bF(bG, bJ, bH.type)) : null;
                }
            };
            return bE.FileReaderSync = bC;
        }), br(aP, [bq, bd, a9, bb, aD, aZ, aK], function (bH, bE, bJ, bD, bG, bI, bC) {
            var bF = {
                send: function (bO, bM) {
                    function bK() {
                        bO.transport = bL.mode, bL.shimExec.call(bQ, "XMLHttpRequest", "send", bO, bM);
                    }

                    function bS(bU, bT) {
                        bL.shimExec.call(bQ, "XMLHttpRequest", "appendBlob", bU, bT.uid), bM = null, bK();
                    }

                    function bR(bU, bT) {
                        var bV = new bC;
                        bV.bind("TransportingComplete", function () {
                            bT(this.result);
                        }), bV.transport(bU.getSource(), bU.type, {ruid: bL.uid});
                    }

                    var bQ = this, bL = bQ.getRuntime();
                    if (bE.isEmptyObj(bO.headers) || bE.each(bO.headers, function (bU, bT) {
                            bL.shimExec.call(bQ, "XMLHttpRequest", "setRequestHeader", bT, bU.toString());
                        }), bM instanceof bI) {
                        var bP;
                        if (bM.each(function (bU, bT) {
                                bU instanceof bJ ? bP = bT : bL.shimExec.call(bQ, "XMLHttpRequest", "append", bT, bU);
                            }), bM.hasBlob()) {
                            var bN = bM.getBlob();
                            bN.isDetached() ? bR(bN, function (bT) {
                                    bN.destroy(), bS(bP, bT);
                                }) : bS(bP, bN);
                        } else {
                            bM = null, bK();
                        }
                    } else {
                        bM instanceof bJ ? bM.isDetached() ? bR(bM, function (bT) {
                                    bM.destroy(), bM = bT.uid, bK();
                                }) : (bM = bM.uid, bK()) : bK();
                    }
                }, getResponse: function (bL) {
                    var bN, bM, bK = this.getRuntime();
                    if (bM = bK.shimExec.call(this, "XMLHttpRequest", "getResponseAsBlob")) {
                        if (bM = new bD(bK.uid, bM), "blob" === bL) {
                            return bM;
                        }
                        try {
                            if (bN = new bG, ~bE.inArray(bL, ["", "text"])) {
                                return bN.readAsText(bM);
                            }
                            if ("json" === bL && window.JSON) {
                                return JSON.parse(bN.readAsText(bM));
                            }
                        } finally {
                            bM.destroy();
                        }
                    }
                    return null;
                }, abort: function (bL) {
                    var bK = this.getRuntime();
                    bK.shimExec.call(this, "XMLHttpRequest", "abort"), this.dispatchEvent("readystatechange"), this.dispatchEvent("abort");
                }
            };
            return bH.XMLHttpRequest = bF;
        }), br(ax, [bq, a9], function (bD, bC) {
            var bE = {
                getAsBlob: function (bG) {
                    var bH = this.getRuntime(), bF = bH.shimExec.call(this, "Transporter", "getAsBlob", bG);
                    return bF ? new bC(bH.uid, bF) : null;
                }
            };
            return bD.Transporter = bE;
        }), br(aO, [bq, bd, aK, a9, aD], function (bF, bD, bH, bC, bE) {
            var bG = {
                loadFromBlob: function (bL) {
                    function bJ(bN) {
                        bK.shimExec.call(bI, "Image", "loadFromBlob", bN.uid), bI = bK = null;
                    }

                    var bI = this, bK = bI.getRuntime();
                    if (bL.isDetached()) {
                        var bM = new bH;
                        bM.bind("TransportingComplete", function () {
                            bJ(bM.result.getSource());
                        }), bM.transport(bL.getSource(), bL.type, {ruid: bK.uid});
                    } else {
                        bJ(bL.getSource());
                    }
                }, loadFromImage: function (bJ) {
                    var bI = this.getRuntime();
                    return bI.shimExec.call(this, "Image", "loadFromImage", bJ.uid);
                }, getAsBlob: function (bK, bI) {
                    var bL = this.getRuntime(), bJ = bL.shimExec.call(this, "Image", "getAsBlob", bK, bI);
                    return bJ ? new bC(bL.uid, bJ) : null;
                }, getAsDataURL: function () {
                    var bJ = this.getRuntime(), bI = bJ.Image.getAsBlob.apply(this, arguments), bK;
                    return bI ? (bK = new bE, bK.readAsDataURL(bI)) : null;
                }
            };
            return bF.Image = bG;
        }), br(aI, [bd, bx, bv, bs, bt], function (bG, bJ, bE, bF, bC) {
            function bD(bQ) {
                var bV = !1, bN = null, bP, bL, bM, bT, bW, bU = 0;
                try {
                    try {
                        bN = new ActiveXObject("AgControl.AgControl"), bN.IsVersionSupported(bQ) && (bV = !0), bN = null;
                    } catch (bS) {
                        var bO = navigator.plugins["Silverlight Plug-In"];
                        if (bO) {
                            for (bP = bO.description, "1.0.30226.2" === bP && (bP = "2.0.30226.2"), bL = bP.split("."); bL.length > 3;) {
                                bL.pop();
                            }
                            for (; bL.length < 4;) {
                                bL.push(0);
                            }
                            for (bM = bQ.split("."); bM.length > 4;) {
                                bM.pop();
                            }
                            do {
                                bT = parseInt(bM[bU], 10), bW = parseInt(bL[bU], 10), bU++;
                            } while (bU < bM.length && bT === bW);
                            bW >= bT && !isNaN(bT) && (bV = !0);
                        }
                    }
                } catch (bR) {
                    bV = !1;
                }
                return bV;
            }

            function bH(bM) {
                var bN = this, bL;
                bM = bG.extend({xap_url: bJ.xap_url}, bM), bC.call(this, bM, bK, {
                    access_binary: bC.capTrue,
                    access_image_binary: bC.capTrue,
                    display_media: bC.capTrue,
                    do_cors: bC.capTrue,
                    drag_and_drop: !1,
                    report_upload_progress: bC.capTrue,
                    resize_image: bC.capTrue,
                    return_response_headers: function (bO) {
                        return bO && "client" === bN.mode;
                    },
                    return_response_type: function (bO) {
                        return "json" !== bO ? !0 : !!window.JSON;
                    },
                    return_status_code: function (bO) {
                        return "client" === bN.mode || !bG.arrayDiff(bO, [200, 404]);
                    },
                    select_file: bC.capTrue,
                    select_multiple: bC.capTrue,
                    send_binary_string: bC.capTrue,
                    send_browser_cookies: function (bO) {
                        return bO && "browser" === bN.mode;
                    },
                    send_custom_headers: function (bO) {
                        return bO && "client" === bN.mode;
                    },
                    send_multipart: bC.capTrue,
                    slice_blob: bC.capTrue,
                    stream_upload: !0,
                    summon_file_dialog: !1,
                    upload_filesize: bC.capTrue,
                    use_http_method: function (bO) {
                        return "client" === bN.mode || !bG.arrayDiff(bO, ["GET", "POST"]);
                    }
                }, {
                    return_response_headers: function (bO) {
                        return bO ? "client" : "browser";
                    }, return_status_code: function (bO) {
                        return bG.arrayDiff(bO, [200, 404]) ? "client" : ["client", "browser"];
                    }, send_browser_cookies: function (bO) {
                        return bO ? "browser" : "client";
                    }, send_custom_headers: function (bO) {
                        return bO ? "client" : "browser";
                    }, use_http_method: function (bO) {
                        return bG.arrayDiff(bO, ["GET", "POST"]) ? "client" : ["client", "browser"];
                    }
                }), bD("2.0.31005.0") && "Opera" !== bJ.browser || (this.mode = !1), bG.extend(this, {
                    getShim: function () {
                        return bE.get(this.uid).content.Moxie;
                    }, shimExec: function (bP, bO) {
                        var bQ = [].slice.call(arguments, 2);
                        return bN.getShim().exec(this.uid, bP, bO, bQ);
                    }, init: function () {
                        var bO;
                        bO = this.getShimContainer(), bO.innerHTML = '<object id="' + this.uid + '" data="data:application/x-silverlight," type="application/x-silverlight-2" width="100%" height="100%" style="outline:none;"><param name="source" value="' + bM.xap_url + '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="uid=' + this.uid + ",target=" + bJ.global_event_dispatcher + '"/></object>', bL = setTimeout(function () {
                            bN && !bN.initialized && bN.trigger("Error", new bF.RuntimeError(bF.RuntimeError.NOT_INIT_ERR));
                        }, "Windows" !== bJ.OS ? 10000 : 5000);
                    }, destroy: function (bO) {
                        return function () {
                            bO.call(bN), clearTimeout(bL), bM = bL = bO = bN = null;
                        };
                    }(this.destroy)
                }, bI);
            }

            var bK = "silverlight", bI = {};
            return bC.addConstructor(bK, bH), bI;
        }), br(bi, [aI, bd, aB], function (bD, bC, bE) {
            return bD.Blob = bC.extend({}, bE);
        }), br(bu, [aI], function (bD) {
            var bC = {
                init: function (bF) {
                    function bE(bH) {
                        for (var bG = "", bI = 0; bI < bH.length; bI++) {
                            bG += ("" !== bG ? "|" : "") + bH[bI].title + " | *." + bH[bI].extensions.replace(/,/g, ";*.");
                        }
                        return bG;
                    }

                    this.getRuntime().shimExec.call(this, "FileInput", "init", bE(bF.accept), bF.name, bF.multiple), this.trigger("ready");
                }
            };
            return bD.FileInput = bC;
        }), br(bp, [aI, bv, aN], function (bE, bD, bF) {
            var bC = {
                init: function () {
                    var bI = this, bG = bI.getRuntime(), bH;
                    return bH = bG.getShimContainer(), bF.addEvent(bH, "dragover", function (bJ) {
                        bJ.preventDefault(), bJ.stopPropagation(), bJ.dataTransfer.dropEffect = "copy";
                    }, bI.uid), bF.addEvent(bH, "dragenter", function (bJ) {
                        bJ.preventDefault();
                        var bK = bD.get(bG.uid).dragEnter(bJ);
                        bK && bJ.stopPropagation();
                    }, bI.uid), bF.addEvent(bH, "drop", function (bJ) {
                        bJ.preventDefault();
                        var bK = bD.get(bG.uid).dragDrop(bJ);
                        bK && bJ.stopPropagation();
                    }, bI.uid), bG.shimExec.call(this, "FileDrop", "init");
                }
            };
            return bE.FileDrop = bC;
        }), br(a2, [aI, bd, ay], function (bD, bC, bE) {
            return bD.FileReader = bC.extend({}, bE);
        }), br(a5, [aI, bd, a7], function (bD, bC, bE) {
            return bD.FileReaderSync = bC.extend({}, bE);
        }), br(a4, [aI, bd, aP], function (bD, bC, bE) {
            return bD.XMLHttpRequest = bC.extend({}, bE);
        }), br(aE, [aI, bd, ax], function (bD, bC, bE) {
            return bD.Transporter = bC.extend({}, bE);
        }), br(aS, [aI, bd, aO], function (bD, bC, bE) {
            return bD.Image = bC.extend({}, bE, {
                getInfo: function () {
                    var bH = this.getRuntime(), bI = ["tiff", "exif", "gps"], bF = {meta: {}}, bG = bH.shimExec.call(this, "Image", "getInfo");
                    return bG.meta && bC.each(bI, function (bM) {
                        var bK = bG.meta[bM], bO, bN, bJ, bL;
                        if (bK && bK.keys) {
                            for (bF.meta[bM] = {}, bN = 0, bJ = bK.keys.length; bJ > bN; bN++) {
                                bO = bK.keys[bN], bL = bK[bO], bL && (/^(\d|[1-9]\d+)$/.test(bL) ? bL = parseInt(bL, 10) : /^\d*\.\d+$/.test(bL) && (bL = parseFloat(bL)), bF.meta[bM][bO] = bL);
                            }
                        }
                    }), bF.width = parseInt(bG.width, 10), bF.height = parseInt(bG.height, 10), bF.size = parseInt(bG.size, 10), bF.type = bG.type, bF.name = bG.name, bF;
                }
            });
        }), br(a6, [bd, bs, bt, bx], function (bG, bE, bI, bD) {
            function bF(bK) {
                var bM = this, bL = bI.capTest, bJ = bI.capTrue;
                bI.call(this, bK, bH, {
                    access_binary: bL(window.FileReader || window.File && File.getAsDataURL),
                    access_image_binary: !1,
                    display_media: bL(bC.Image && (bD.can("create_canvas") || bD.can("use_data_uri_over32kb"))),
                    do_cors: !1,
                    drag_and_drop: !1,
                    filter_by_extension: bL(function () {
                        return "Chrome" === bD.browser && bD.version >= 28 || "IE" === bD.browser && bD.version >= 10;
                    }()),
                    resize_image: function () {
                        return bC.Image && bM.can("access_binary") && bD.can("create_canvas");
                    },
                    report_upload_progress: !1,
                    return_response_headers: !1,
                    return_response_type: function (bN) {
                        return "json" === bN && window.JSON ? !0 : !!~bG.inArray(bN, ["text", "document", ""]);
                    },
                    return_status_code: function (bN) {
                        return !bG.arrayDiff(bN, [200, 404]);
                    },
                    select_file: function () {
                        return bD.can("use_fileinput");
                    },
                    select_multiple: !1,
                    send_binary_string: !1,
                    send_custom_headers: !1,
                    send_multipart: !0,
                    slice_blob: !1,
                    stream_upload: function () {
                        return bM.can("select_file");
                    },
                    summon_file_dialog: bL(function () {
                        return "Firefox" === bD.browser && bD.version >= 4 || "Opera" === bD.browser && bD.version >= 12 || !!~bG.inArray(bD.browser, ["Chrome", "Safari"]);
                    }()),
                    upload_filesize: bJ,
                    use_http_method: function (bN) {
                        return !bG.arrayDiff(bN, ["GET", "POST"]);
                    }
                }), bG.extend(this, {
                    init: function () {
                        this.trigger("Init");
                    }, destroy: function (bN) {
                        return function () {
                            bN.call(bM), bN = bM = null;
                        };
                    }(this.destroy)
                }), bG.extend(this.getShim(), bC);
            }

            var bH = "html4", bC = {};
            return bI.addConstructor(bH, bF), bC;
        }), br(a0, [a6, bd, bv, aN, bn, bx], function (bG, bE, bI, bD, bF, bH) {
            function bC() {
                function bM() {
                    var bS = this, bP = bS.getRuntime(), bV, bT, bQ, bU, bO, bR;
                    bR = bE.guid("uid_"), bV = bP.getShimContainer(), bJ && (bQ = bI.get(bJ + "_form"), bQ && bE.extend(bQ.style, {top: "100%"})), bU = document.createElement("form"), bU.setAttribute("id", bR + "_form"), bU.setAttribute("method", "post"), bU.setAttribute("enctype", "multipart/form-data"), bU.setAttribute("encoding", "multipart/form-data"), bE.extend(bU.style, {
                        overflow: "hidden",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }), bO = document.createElement("input"), bO.setAttribute("id", bR), bO.setAttribute("type", "file"), bO.setAttribute("name", bN.name || "Filedata"), bO.setAttribute("accept", bK.join(",")), bE.extend(bO.style, {
                        fontSize: "999px",
                        opacity: 0
                    }), bU.appendChild(bO), bV.appendChild(bU), bE.extend(bO.style, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }), "IE" === bH.browser && bH.version < 10 && bE.extend(bO.style, {filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"}), bO.onchange = function () {
                        var bX;
                        this.value && (bX = this.files ? this.files[0] : {name: this.value}, bL = [bX], this.onchange = function () {
                        }, bM.call(bS), bS.bind("change", function bW() {
                            var bZ = bI.get(bR), bY = bI.get(bR + "_form"), b0;
                            bS.unbind("change", bW), bS.files.length && bZ && bY && (b0 = bS.files[0], bZ.setAttribute("id", b0.uid), bY.setAttribute("id", b0.uid + "_form"), bY.setAttribute("target", b0.uid + "_iframe")), bZ = bY = null;
                        }, 998), bO = bU = null, bS.trigger("change"));
                    }, bP.can("summon_file_dialog") && (bT = bI.get(bN.browse_button), bD.removeEvent(bT, "click", bS.uid), bD.addEvent(bT, "click", function (bW) {
                        bO && !bO.disabled && bO.click(), bW.preventDefault();
                    }, bS.uid)), bJ = bR, bV = bQ = bT = null;
                }

                var bJ, bL = [], bK = [], bN;
                bE.extend(this, {
                    init: function (bP) {
                        var bR = this, bO = bR.getRuntime(), bQ;
                        bN = bP, bK = bP.accept.mimes || bF.extList2mimes(bP.accept, bO.can("filter_by_extension")), bQ = bO.getShimContainer(), function () {
                            var bU, bT, bS;
                            bU = bI.get(bP.browse_button), bO.can("summon_file_dialog") && ("static" === bI.getStyle(bU, "position") && (bU.style.position = "relative"), bT = parseInt(bI.getStyle(bU, "z-index"), 10) || 1, bU.style.zIndex = bT, bQ.style.zIndex = bT - 1), bS = bO.can("summon_file_dialog") ? bU : bQ, bD.addEvent(bS, "mouseover", function () {
                                bR.trigger("mouseenter");
                            }, bR.uid), bD.addEvent(bS, "mouseout", function () {
                                bR.trigger("mouseleave");
                            }, bR.uid), bD.addEvent(bS, "mousedown", function () {
                                bR.trigger("mousedown");
                            }, bR.uid), bD.addEvent(bI.get(bP.container), "mouseup", function () {
                                bR.trigger("mouseup");
                            }, bR.uid), bU = null;
                        }(), bM.call(this), bQ = null, bR.trigger({type: "ready", async: !0});
                    }, getFiles: function () {
                        return bL;
                    }, disable: function (bP) {
                        var bO;
                        (bO = bI.get(bJ)) && (bO.disabled = !!bP);
                    }, destroy: function () {
                        var bQ = this.getRuntime(), bO = bQ.getShim(), bP = bQ.getShimContainer();
                        bD.removeAllEvents(bP, this.uid), bD.removeAllEvents(bN && bI.get(bN.container), this.uid), bD.removeAllEvents(bN && bI.get(bN.browse_button), this.uid), bP && (bP.innerHTML = ""), bO.removeInstance(this.uid), bJ = bL = bK = bN = bP = bO = null;
                    }
                });
            }

            return bG.FileInput = bC;
        }), br(a3, [a6, aU], function (bD, bC) {
            return bD.FileReader = bC;
        }), br(aH, [a6, bd, bv, aG, bs, aN, a9, aZ], function (bG, bJ, bE, bF, bC, bD, bH, bK) {
            function bI() {
                function bN(bV) {
                    var bS = this, bR, bU, bP, bT, bQ = !1;
                    if (bL) {
                        if (bR = bL.id.replace(/_iframe$/, ""), bU = bE.get(bR + "_form")) {
                            for (bP = bU.getElementsByTagName("input"), bT = bP.length;
                                 bT--;) {
                                switch (bP[bT].getAttribute("type")) {
                                    case"hidden":
                                        bP[bT].parentNode.removeChild(bP[bT]);
                                        break;
                                    case"file":
                                        bQ = !0;
                                }
                            }
                            bP = [], bQ || bU.parentNode.removeChild(bU), bU = null;
                        }
                        setTimeout(function () {
                            bD.removeEvent(bL, "load", bS.uid), bL.parentNode && bL.parentNode.removeChild(bL);
                            var bW = bS.getRuntime().getShimContainer();
                            bW.children.length || bW.parentNode.removeChild(bW), bW = bL = null, bV();
                        }, 1);
                    }
                }

                var bM, bO, bL;
                bJ.extend(this, {
                    send: function (bU, bT) {
                        function bR() {
                            var bZ = bQ.getShimContainer() || document.body, bY = document.createElement("div");
                            bY.innerHTML = '<iframe id="' + bS + '_iframe" name="' + bS + '_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>', bL = bY.firstChild, bZ.appendChild(bL), bD.addEvent(bL, "load", function () {
                                var b1;
                                try {
                                    b1 = bL.contentWindow.document || bL.contentDocument || window.frames[bL.id].document, /^4(0[0-9]|1[0-7]|2[2346])\s/.test(b1.title) ? bM = b1.title.replace(/^(\d+).*$/, "$1") : (bM = 200, bO = bJ.trim(b1.body.innerHTML), bP.trigger({
                                            type: "progress",
                                            loaded: bO.length,
                                            total: bO.length
                                        }), bW && bP.trigger({
                                            type: "uploadprogress",
                                            loaded: bW.size || 1025,
                                            total: bW.size || 1025
                                        }));
                                } catch (b0) {
                                    if (!bF.hasSameOrigin(bU.url)) {
                                        return void bN.call(bP, function () {
                                            bP.trigger("error");
                                        });
                                    }
                                    bM = 404;
                                }
                                bN.call(bP, function () {
                                    bP.trigger("load");
                                });
                            }, bP.uid);
                        }

                        var bP = this, bQ = bP.getRuntime(), bS, bX, bV, bW;
                        if (bM = bO = null, bT instanceof bK && bT.hasBlob()) {
                            if (bW = bT.getBlob(), bS = bW.uid, bV = bE.get(bS), bX = bE.get(bS + "_form"), !bX) {
                                throw new bC.DOMException(bC.DOMException.NOT_FOUND_ERR);
                            }
                        } else {
                            bS = bJ.guid("uid_"), bX = document.createElement("form"), bX.setAttribute("id", bS + "_form"), bX.setAttribute("method", bU.method), bX.setAttribute("enctype", "multipart/form-data"), bX.setAttribute("encoding", "multipart/form-data"), bX.setAttribute("target", bS + "_iframe"), bQ.getShimContainer().appendChild(bX);
                        }
                        bT instanceof bK && bT.each(function (bZ, b0) {
                            if (bZ instanceof bH) {
                                bV && bV.setAttribute("name", b0);
                            } else {
                                var bY = document.createElement("input");
                                bJ.extend(bY, {
                                    type: "hidden",
                                    name: b0,
                                    value: bZ
                                }), bV ? bX.insertBefore(bY, bV) : bX.appendChild(bY);
                            }
                        }), bX.setAttribute("action", bU.url), bR(), bX.submit(), bP.trigger("loadstart");
                    }, getStatus: function () {
                        return bM;
                    }, getResponse: function (bP) {
                        if ("json" === bP && "string" === bJ.typeOf(bO) && window.JSON) {
                            try {
                                return JSON.parse(bO.replace(/^\s*<pre[^>]*>/, "").replace(/<\/pre>\s*$/, ""));
                            } catch (bQ) {
                                return null;
                            }
                        }
                        return bO;
                    }, abort: function () {
                        var bP = this;
                        bL && bL.contentWindow && (bL.contentWindow.stop ? bL.contentWindow.stop() : bL.contentWindow.document.execCommand ? bL.contentWindow.document.execCommand("Stop") : bL.src = "about:blank"), bN.call(this, function () {
                            bP.dispatchEvent("abort");
                        });
                    }
                });
            }

            return bG.XMLHttpRequest = bI;
        }), br(a1, [a6, az], function (bD, bC) {
            return bD.Image = bC;
        }), bA([bd, by, bn, bx, bv, bs, bj, bm, bt, bc, a9, bb, aV, bB, ba, bz, aG, aD, aZ, aF, aK, aQ, aN]);
    }(this);
    (function (az) {
        var ax = {}, aA = az.moxie.core.utils.Basic.inArray;
        return function ay(aD) {
            var aB, aC;
            for (aB in aD) {
                aC = typeof aD[aB], aC === "object" && !~aA(aB, ["Exceptions", "Env", "Mime"]) ? ay(aD[aB]) : aC === "function" && (ax[aB] = aD[aB]);
            }
        }(az.moxie), ax.Env = az.moxie.core.utils.Env, ax.Mime = az.moxie.core.utils.Mime, ax.Exceptions = az.moxie.core.Exceptions, az.mOxie = ax, az.o || (az.o = ax), ax;
    })(this);
    (function (aB, ay, aD) {
        function az(aG) {
            function aF(aL, aJ, aK) {
                var aI = {
                    chunks: "slice_blob",
                    jpgresize: "send_binary_string",
                    pngresize: "send_binary_string",
                    progress: "report_upload_progress",
                    multi_selection: "select_multiple",
                    dragdrop: "drag_and_drop",
                    drop_element: "drag_and_drop",
                    headers: "send_custom_headers",
                    urlstream_upload: "send_binary_string",
                    canSendBinary: "send_binary",
                    triggerDialog: "summon_file_dialog"
                };
                aI[aL] ? aH[aI[aL]] = aJ : aK || (aH[aL] = aJ);
            }

            var aE = aG.required_features, aH = {};
            if (typeof aE == "string") {
                aC.each(aE.split(/\s*,\s*/), function (aI) {
                    aF(aI, !0);
                });
            } else {
                if (typeof aE == "object") {
                    aC.each(aE, function (aJ, aI) {
                        aF(aI, aJ);
                    });
                } else {
                    if (aE === !0) {
                        aG.chunk_size > 0 && (aH.slice_blob = !0);
                        if (aG.resize.enabled || !aG.multipart) {
                            aH.send_binary_string = !0;
                        }
                        aC.each(aG, function (aJ, aI) {
                            aF(aI, !!aJ, !0);
                        });
                    }
                }
            }
            return aH;
        }

        var aA = aB.setTimeout, ax = {}, aC = {
            VERSION: "2.1.2",
            STOPPED: 1,
            STARTED: 2,
            QUEUED: 1,
            UPLOADING: 2,
            FAILED: 4,
            DONE: 5,
            GENERIC_ERROR: -100,
            HTTP_ERROR: -200,
            IO_ERROR: -300,
            SECURITY_ERROR: -400,
            INIT_ERROR: -500,
            FILE_SIZE_ERROR: -600,
            FILE_EXTENSION_ERROR: -601,
            FILE_DUPLICATE_ERROR: -602,
            IMAGE_FORMAT_ERROR: -700,
            MEMORY_ERROR: -701,
            IMAGE_DIMENSIONS_ERROR: -702,
            mimeTypes: ay.mimes,
            ua: ay.ua,
            typeOf: ay.typeOf,
            extend: ay.extend,
            guid: ay.guid,
            get: function (aH) {
                var aG = [], aE;
                ay.typeOf(aH) !== "array" && (aH = [aH]);
                var aF = aH.length;
                while (aF--) {
                    aE = ay.get(aH[aF]), aE && aG.push(aE);
                }
                return aG.length ? aG : null;
            },
            each: ay.each,
            getPos: ay.getPos,
            getSize: ay.getSize,
            xmlEncode: function (aF) {
                var aE = {"<": "lt", ">": "gt", "&": "amp", '"': "quot", "'": "#39"}, aG = /[<>&\"\']/g;
                return aF ? ("" + aF).replace(aG, function (aH) {
                        return aE[aH] ? "&" + aE[aH] + ";" : aH;
                    }) : aF;
            },
            toArray: ay.toArray,
            inArray: ay.inArray,
            addI18n: ay.addI18n,
            translate: ay.translate,
            isEmptyObj: ay.isEmptyObj,
            hasClass: ay.hasClass,
            addClass: ay.addClass,
            removeClass: ay.removeClass,
            getStyle: ay.getStyle,
            addEvent: ay.addEvent,
            removeEvent: ay.removeEvent,
            removeAllEvents: ay.removeAllEvents,
            cleanName: function (aF) {
                var aE, aG;
                aG = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"];
                for (aE = 0; aE < aG.length; aE += 2) {
                    aF = aF.replace(aG[aE], aG[aE + 1]);
                }
                return aF = aF.replace(/\s+/g, "_"), aF = aF.replace(/[^a-z0-9_\-\.]+/gi, ""), aF;
            },
            buildUrl: function (aF, aE) {
                var aG = "";
                return aC.each(aE, function (aI, aH) {
                    aG += (aG ? "&" : "") + encodeURIComponent(aH) + "=" + encodeURIComponent(aI);
                }), aG && (aF += (aF.indexOf("?") > 0 ? "&" : "?") + aG), aF;
            },
            formatSize: function (aG) {
                function aE(aI, aH) {
                    return Math.round(aI * Math.pow(10, aH)) / Math.pow(10, aH);
                }

                if (aG === aD || /\D/.test(aG)) {
                    return aC.translate("N/A");
                }
                var aF = Math.pow(1024, 4);
                return aG > aF ? aE(aG / aF, 1) + " " + aC.translate("tb") : aG > (aF /= 1024) ? aE(aG / aF, 1) + " " + aC.translate("gb") : aG > (aF /= 1024) ? aE(aG / aF, 1) + " " + aC.translate("mb") : aG > 1024 ? Math.round(aG / 1024) + " " + aC.translate("kb") : aG + " " + aC.translate("b");
            },
            parseSize: ay.parseSizeStr,
            predictRuntime: function (aG, aH) {
                var aF, aE;
                return aF = new aC.Uploader(aG), aE = ay.Runtime.thatCan(aF.getOption().required_features, aH || aG.runtimes), aF.destroy(), aE;
            },
            addFileFilter: function (aF, aE) {
                ax[aF] = aE;
            }
        };
        aC.addFileFilter("mime_types", function (aF, aE, aG) {
            aF.length && !aF.regexp.test(aE.name) ? (this.trigger("Error", {
                    code: aC.FILE_EXTENSION_ERROR,
                    message: aC.translate("File extension error."),
                    file: aE
                }), aG(!1)) : aG(!0);
        }), aC.addFileFilter("max_file_size", function (aG, aE, aH) {
            var aF;
            aG = aC.parseSize(aG), aE.size !== aF && aG && aE.size > aG ? (this.trigger("Error", {
                    code: aC.FILE_SIZE_ERROR,
                    message: aC.translate("File size error."),
                    file: aE
                }), aH(!1)) : aH(!0);
        }), aC.addFileFilter("prevent_duplicates", function (aG, aE, aH) {
            if (aG) {
                var aF = this.files.length;
                while (aF--) {
                    if (aE.name === this.files[aF].name && aE.size === this.files[aF].size) {
                        this.trigger("Error", {
                            code: aC.FILE_DUPLICATE_ERROR,
                            message: aC.translate("Duplicate file error."),
                            file: aE
                        }), aH(!1);
                        return;
                    }
                }
            }
            aH(!0);
        }), aC.Uploader = function (a0) {
            function aY() {
                var a7, a6 = 0, a8;
                if (this.state == aC.STARTED) {
                    for (a8 = 0; a8 < aZ.length; a8++) {
                        !a7 && aZ[a8].status == aC.QUEUED ? (a7 = aZ[a8], this.trigger("BeforeUpload", a7) && (a7.status = aC.UPLOADING, this.trigger("UploadFile", a7))) : a6++;
                    }
                    a6 == aZ.length && (this.state !== aC.STOPPED && (this.state = aC.STOPPED, this.trigger("StateChanged")), this.trigger("UploadComplete", aZ));
                }
            }

            function aK(a6) {
                a6.percent = a6.size > 0 ? Math.ceil(a6.loaded / a6.size * 100) : 100, a3();
            }

            function a3() {
                var a7, a6;
                a1.reset();
                for (a7 = 0; a7 < aZ.length; a7++) {
                    a6 = aZ[a7], a6.size !== aD ? (a1.size += a6.origSize, a1.loaded += a6.loaded * a6.origSize / a6.size) : a1.size = aD, a6.status == aC.DONE ? a1.uploaded++ : a6.status == aC.FAILED ? a1.failed++ : a1.queued++;
                }
                a1.size === aD ? a1.percent = aZ.length > 0 ? Math.ceil(a1.uploaded / aZ.length * 100) : 0 : (a1.bytesPerSec = Math.ceil(a1.loaded / ((+(new Date) - aS || 1) / 1000)), a1.percent = a1.size > 0 ? Math.ceil(a1.loaded / a1.size * 100) : 0);
            }

            function aM() {
                var a6 = a2[0] || aX[0];
                return a6 ? a6.getRuntime().uid : !1;
            }

            function aP(a7, a8) {
                if (a7.ruid) {
                    var a6 = ay.Runtime.getInfo(a7.ruid);
                    if (a6) {
                        return a6.can(a8);
                    }
                }
                return !1;
            }

            function aF() {
                this.bind("FilesAdded FilesRemoved", function (a6) {
                    a6.trigger("QueueChanged"), a6.refresh();
                }), this.bind("CancelUpload", aG), this.bind("BeforeUpload", aR), this.bind("UploadFile", aW), this.bind("UploadProgress", aJ), this.bind("StateChanged", aT), this.bind("QueueChanged", a3), this.bind("Error", a5), this.bind("FileUploaded", aI), this.bind("Destroy", aQ);
            }

            function aL(ba, bb) {
                var a9 = this, a7 = 0, a8 = [], a6 = {
                    runtime_order: ba.runtimes,
                    required_caps: ba.required_features,
                    preferred_caps: aV,
                    swf_url: ba.flash_swf_url,
                    xap_url: ba.silverlight_xap_url
                };
                aC.each(ba.runtimes.split(/\s*,\s*/), function (bc) {
                    ba[bc] && (a6[bc] = ba[bc]);
                }), ba.browse_button && aC.each(ba.browse_button, function (bc) {
                    a8.push(function (be) {
                        var bd = new ay.FileInput(aC.extend({}, a6, {
                            accept: ba.filters.mime_types,
                            name: ba.file_data_name,
                            multiple: ba.multi_selection,
                            container: ba.container,
                            browse_button: bc
                        }));
                        bd.onready = function () {
                            var bf = ay.Runtime.getInfo(this.ruid);
                            ay.extend(a9.features, {
                                chunks: bf.can("slice_blob"),
                                multipart: bf.can("send_multipart"),
                                multi_selection: bf.can("select_multiple")
                            }), a7++, a2.push(this), be();
                        }, bd.onchange = function () {
                            a9.addFile(this.files);
                        }, bd.bind("mouseenter mouseleave mousedown mouseup", function (bf) {
                            aN || (ba.browse_button_hover && ("mouseenter" === bf.type ? ay.addClass(bc, ba.browse_button_hover) : "mouseleave" === bf.type && ay.removeClass(bc, ba.browse_button_hover)), ba.browse_button_active && ("mousedown" === bf.type ? ay.addClass(bc, ba.browse_button_active) : "mouseup" === bf.type && ay.removeClass(bc, ba.browse_button_active)));
                        }), bd.bind("mousedown", function () {
                            a9.trigger("Browse");
                        }), bd.bind("error runtimeerror", function () {
                            bd = null, be();
                        }), bd.init();
                    });
                }), ba.drop_element && aC.each(ba.drop_element, function (bc) {
                    a8.push(function (be) {
                        var bd = new ay.FileDrop(aC.extend({}, a6, {drop_zone: bc}));
                        bd.onready = function () {
                            var bf = ay.Runtime.getInfo(this.ruid);
                            a9.features.dragdrop = bf.can("drag_and_drop"), a7++, aX.push(this), be();
                        }, bd.ondrop = function () {
                            a9.addFile(this.files);
                        }, bd.bind("error runtimeerror", function () {
                            bd = null, be();
                        }), bd.init();
                    });
                }), ay.inSeries(a8, function () {
                    typeof bb == "function" && bb(a7);
                });
            }

            function aE(a9, a8, a6) {
                var a7 = new ay.Image;
                try {
                    a7.onload = function () {
                        if (a8.width > this.width && a8.height > this.height && a8.quality === aD && a8.preserve_headers && !a8.crop) {
                            return this.destroy(), a6(a9);
                        }
                        a7.downsize(a8.width, a8.height, a8.crop, a8.preserve_headers);
                    }, a7.onresize = function () {
                        a6(this.getAsBlob(a9.type, a8.quality)), this.destroy();
                    }, a7.onerror = function () {
                        a6(a9);
                    }, a7.load(a9);
                } catch (ba) {
                    a6(a9);
                }
            }

            function aH(ba, bb, a8) {
                function a9(be, bc, bf) {
                    var bd = a4[be];
                    switch (be) {
                        case"max_file_size":
                            be === "max_file_size" && (a4.max_file_size = a4.filters.max_file_size = bc);
                            break;
                        case"chunk_size":
                            if (bc = aC.parseSize(bc)) {
                                a4[be] = bc, a4.send_file_name = !0;
                            }
                            break;
                        case"multipart":
                            a4[be] = bc, bc || (a4.send_file_name = !0);
                            break;
                        case"unique_names":
                            a4[be] = bc, bc && (a4.send_file_name = !0);
                            break;
                        case"filters":
                            aC.typeOf(bc) === "array" && (bc = {mime_types: bc}), bf ? aC.extend(a4.filters, bc) : a4.filters = bc, bc.mime_types && (a4.filters.mime_types.regexp = function (bh) {
                                var bg = [];
                                return aC.each(bh, function (bi) {
                                    aC.each(bi.extensions.split(/,/), function (bj) {
                                        /^\s*\*\s*$/.test(bj) ? bg.push("\\.*") : bg.push("\\." + bj.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"));
                                    });
                                }), new RegExp("(" + bg.join("|") + ")$", "i");
                            }(a4.filters.mime_types));
                            break;
                        case"resize":
                            bf ? aC.extend(a4.resize, bc, {enabled: !0}) : a4.resize = bc;
                            break;
                        case"prevent_duplicates":
                            a4.prevent_duplicates = a4.filters.prevent_duplicates = !!bc;
                            break;
                        case"browse_button":
                        case"drop_element":
                            bc = aC.get(bc);
                        case"container":
                        case"runtimes":
                        case"multi_selection":
                        case"flash_swf_url":
                        case"silverlight_xap_url":
                            a4[be] = bc, bf || (a6 = !0);
                            break;
                        default:
                            a4[be] = bc;
                    }
                    bf || a7.trigger("OptionChanged", be, bc, bd);
                }

                var a7 = this, a6 = !1;
                typeof ba == "object" ? aC.each(ba, function (bd, bc) {
                        a9(bc, bd, a8);
                    }) : a9(ba, bb, a8), a8 ? (a4.required_features = az(aC.extend({}, a4)), aV = az(aC.extend({}, a4, {required_features: !0}))) : a6 && (a7.trigger("Destroy"), aL.call(a7, a4, function (bc) {
                        bc ? (a7.runtime = ay.Runtime.getInfo(aM()).type, a7.trigger("Init", {runtime: a7.runtime}), a7.trigger("PostInit")) : a7.trigger("Error", {
                                code: aC.INIT_ERROR,
                                message: aC.translate("Init error.")
                            });
                    }));
            }

            function aR(a8, a6) {
                if (a8.settings.unique_names) {
                    var a9 = a6.name.match(/\.([^.]+)$/), a7 = "part";
                    a9 && (a7 = a9[1]), a6.target_name = a6.id + "." + a7;
                }
            }

            function aW(bb, a7) {
                function a9() {
                    be-- > 0 ? aA(a6, 1000) : (a7.loaded = ba, bb.trigger("Error", {
                            code: aC.HTTP_ERROR,
                            message: aC.translate("HTTP Error."),
                            file: a7,
                            response: aU.responseText,
                            status: aU.status,
                            responseHeaders: aU.getAllResponseHeaders()
                        }));
                }

                function a6() {
                    var bi, bg, bh = {}, bj;
                    if (a7.status !== aC.UPLOADING || bb.state === aC.STOPPED) {
                        return;
                    }
                    bb.settings.send_file_name && (bh.name = a7.target_name || a7.name), bf && bd.chunks && bc.size > bf ? (bj = Math.min(bf, bc.size - ba), bi = bc.slice(ba, ba + bj)) : (bj = bc.size, bi = bc), bf && bd.chunks && (bb.settings.send_chunk_number ? (bh.chunk = Math.ceil(ba / bf), bh.chunks = Math.ceil(bc.size / bf)) : (bh.offset = ba, bh.total = bc.size)), aU = new ay.XMLHttpRequest, aU.upload && (aU.upload.onprogress = function (bk) {
                        a7.loaded = Math.min(a7.size, ba + bk.loaded), bb.trigger("UploadProgress", a7);
                    }), aU.onload = function () {
                        if (aU.status >= 400) {
                            a9();
                            return;
                        }
                        be = bb.settings.max_retries, bj < bc.size ? (bi.destroy(), ba += bj, a7.loaded = Math.min(ba, bc.size), bb.trigger("ChunkUploaded", a7, {
                                offset: a7.loaded,
                                total: bc.size,
                                response: aU.responseText,
                                status: aU.status,
                                responseHeaders: aU.getAllResponseHeaders()
                            }), ay.Env.browser === "Android Browser" && bb.trigger("UploadProgress", a7)) : a7.loaded = a7.size, bi = bg = null, !ba || ba >= bc.size ? (a7.size != a7.origSize && (bc.destroy(), bc = null), bb.trigger("UploadProgress", a7), a7.status = aC.DONE, bb.trigger("FileUploaded", a7, {
                                response: aU.responseText,
                                status: aU.status,
                                responseHeaders: aU.getAllResponseHeaders()
                            })) : aA(a6, 1);
                    }, aU.onerror = function () {
                        a9();
                    }, aU.onloadend = function () {
                        this.destroy(), aU = null;
                    }, bb.settings.multipart && bd.multipart ? (aU.open("post", a8, !0), aC.each(bb.settings.headers, function (bl, bk) {
                            aU.setRequestHeader(bk, bl);
                        }), bg = new ay.FormData, aC.each(aC.extend(bh, bb.settings.multipart_params), function (bl, bk) {
                            bg.append(bk, bl);
                        }), bg.append(bb.settings.file_data_name, bi), aU.send(bg, {
                            runtime_order: bb.settings.runtimes,
                            required_caps: bb.settings.required_features,
                            preferred_caps: aV,
                            swf_url: bb.settings.flash_swf_url,
                            xap_url: bb.settings.silverlight_xap_url
                        })) : (a8 = aC.buildUrl(bb.settings.url, aC.extend(bh, bb.settings.multipart_params)), aU.open("post", a8, !0), aU.setRequestHeader("Content-Type", "application/octet-stream"), aC.each(bb.settings.headers, function (bl, bk) {
                            aU.setRequestHeader(bk, bl);
                        }), aU.send(bi, {
                            runtime_order: bb.settings.runtimes,
                            required_caps: bb.settings.required_features,
                            preferred_caps: aV,
                            swf_url: bb.settings.flash_swf_url,
                            xap_url: bb.settings.silverlight_xap_url
                        }));
                }

                var a8 = bb.settings.url, bf = bb.settings.chunk_size, be = bb.settings.max_retries, bd = bb.features, ba = 0, bc;
                a7.loaded && (ba = a7.loaded = bf ? bf * Math.floor(a7.loaded / bf) : 0), bc = a7.getSource(), bb.settings.resize.enabled && aP(bc, "send_binary_string") && !!~ay.inArray(bc.type, ["image/jpeg", "image/png"]) ? aE.call(this, bc, bb.settings.resize, function (bg) {
                        bc = bg, a7.size = bg.size, a6();
                    }) : a6();
            }

            function aJ(a7, a6) {
                aK(a6);
            }

            function aT(a7) {
                if (a7.state == aC.STARTED) {
                    aS = +(new Date);
                } else {
                    if (a7.state == aC.STOPPED) {
                        for (var a6 = a7.files.length - 1; a6 >= 0; a6--) {
                            a7.files[a6].status == aC.UPLOADING && (a7.files[a6].status = aC.QUEUED, a3());
                        }
                    }
                }
            }

            function aG() {
                aU && aU.abort();
            }

            function aI(a6) {
                a3(), aA(function () {
                    aY.call(a6);
                }, 1);
            }

            function a5(a7, a6) {
                a6.code === aC.INIT_ERROR ? a7.destroy() : a6.file && (a6.file.status = aC.FAILED, aK(a6.file), a7.state == aC.STARTED && (a7.trigger("CancelUpload"), aA(function () {
                        aY.call(a7);
                    }, 1)));
            }

            function aQ(a6) {
                a6.stop(), aC.each(aZ, function (a7) {
                    a7.destroy();
                }), aZ = [], a2.length && (aC.each(a2, function (a7) {
                    a7.destroy();
                }), a2 = []), aX.length && (aC.each(aX, function (a7) {
                    a7.destroy();
                }), aX = []), aV = {}, aN = !1, aS = aU = null, a1.reset();
            }

            var aO = aC.guid(), a4, aZ = [], aV = {}, a2 = [], aX = [], aS, a1, aN = !1, aU;
            a4 = {
                runtimes: ay.Runtime.order,
                max_retries: 0,
                chunk_size: 0,
                multipart: !0,
                multi_selection: !0,
                file_data_name: "file",
                flash_swf_url: "js/Moxie.swf",
                silverlight_xap_url: "js/Moxie.xap",
                filters: {mime_types: [], prevent_duplicates: !1, max_file_size: 0},
                resize: {enabled: !1, preserve_headers: !0, crop: !1},
                send_file_name: !0,
                send_chunk_number: !0
            }, aH.call(this, a0, null, !0), a1 = new aC.QueueProgress, aC.extend(this, {
                id: aO,
                uid: aO,
                state: aC.STOPPED,
                features: {},
                runtime: null,
                files: aZ,
                settings: a4,
                total: a1,
                init: function () {
                    var a6 = this;
                    typeof a4.preinit == "function" ? a4.preinit(a6) : aC.each(a4.preinit, function (a7, a8) {
                            a6.bind(a8, a7);
                        }), aF.call(this);
                    if (!a4.browse_button || !a4.url) {
                        this.trigger("Error", {code: aC.INIT_ERROR, message: aC.translate("Init error.")});
                        return;
                    }
                    aL.call(this, a4, function (a7) {
                        typeof a4.init == "function" ? a4.init(a6) : aC.each(a4.init, function (a8, a9) {
                                a6.bind(a9, a8);
                            }), a7 ? (a6.runtime = ay.Runtime.getInfo(aM()).type, a6.trigger("Init", {runtime: a6.runtime}), a6.trigger("PostInit")) : a6.trigger("Error", {
                                code: aC.INIT_ERROR,
                                message: aC.translate("Init error.")
                            });
                    });
                },
                setOption: function (a7, a6) {
                    aH.call(this, a7, a6, !this.runtime);
                },
                getOption: function (a6) {
                    return a6 ? a4[a6] : a4;
                },
                refresh: function () {
                    a2.length && aC.each(a2, function (a6) {
                        a6.trigger("Refresh");
                    }), this.trigger("Refresh");
                },
                start: function () {
                    this.state != aC.STARTED && (this.state = aC.STARTED, this.trigger("StateChanged"), aY.call(this));
                },
                stop: function () {
                    this.state != aC.STOPPED && (this.state = aC.STOPPED, this.trigger("StateChanged"), this.trigger("CancelUpload"));
                },
                disableBrowse: function () {
                    aN = arguments[0] !== aD ? arguments[0] : !0, a2.length && aC.each(a2, function (a6) {
                        a6.disable(aN);
                    }), this.trigger("DisableBrowse", aN);
                },
                getFile: function (a7) {
                    var a6;
                    for (a6 = aZ.length - 1; a6 >= 0; a6--) {
                        if (aZ[a6].id === a7) {
                            return aZ[a6];
                        }
                    }
                },
                addFile: function (bb, bd) {
                    function bc(bf, bg) {
                        var be = [];
                        ay.each(a9.settings.filters, function (bh, bi) {
                            ax[bi] && be.push(function (bj) {
                                ax[bi].call(a9, bh, bf, function (bk) {
                                    bj(!bk);
                                });
                            });
                        }), ay.inSeries(be, bg);
                    }

                    function ba(bf) {
                        var be = ay.typeOf(bf);
                        if (bf instanceof ay.File) {
                            if (!bf.ruid && !bf.isDetached()) {
                                if (!a6) {
                                    return !1;
                                }
                                bf.ruid = a6, bf.connectRuntime(a6);
                            }
                            ba(new aC.File(bf));
                        } else {
                            bf instanceof ay.Blob ? (ba(bf.getSource()), bf.destroy()) : bf instanceof aC.File ? (bd && (bf.name = bd), a8.push(function (bg) {
                                        bc(bf, function (bh) {
                                            bh || (aZ.push(bf), a7.push(bf), a9.trigger("FileFiltered", bf)), aA(bg, 1);
                                        });
                                    })) : ay.inArray(be, ["file", "blob"]) !== -1 ? ba(new ay.File(null, bf)) : be === "node" && ay.typeOf(bf.files) === "filelist" ? ay.each(bf.files, ba) : be === "array" && (bd = null, ay.each(bf, ba));
                        }
                    }

                    var a9 = this, a8 = [], a7 = [], a6;
                    a6 = aM(), ba(bb), a8.length && ay.inSeries(a8, function () {
                        a7.length && a9.trigger("FilesAdded", a7);
                    });
                },
                removeFile: function (a7) {
                    var a6 = typeof a7 == "string" ? a7 : a7.id;
                    for (var a8 = aZ.length - 1; a8 >= 0; a8--) {
                        if (aZ[a8].id === a6) {
                            return this.splice(a8, 1)[0];
                        }
                    }
                },
                splice: function (a9, a7) {
                    var a8 = aZ.splice(a9 === aD ? 0 : a9, a7 === aD ? aZ.length : a7), a6 = !1;
                    return this.state == aC.STARTED && (aC.each(a8, function (ba) {
                        if (ba.status === aC.UPLOADING) {
                            return a6 = !0, !1;
                        }
                    }), a6 && this.stop()), this.trigger("FilesRemoved", a8), aC.each(a8, function (ba) {
                        ba.destroy();
                    }), a6 && this.start(), a8;
                },
                bind: function (a8, a6, a9) {
                    var a7 = this;
                    aC.Uploader.prototype.bind.call(this, a8, function () {
                        var ba = [].slice.call(arguments);
                        return ba.splice(0, 1, a7), a6.apply(this, ba);
                    }, 0, a9);
                },
                destroy: function () {
                    this.trigger("Destroy"), a4 = a1 = null, this.unbindAll();
                }
            });
        }, aC.Uploader.prototype = ay.EventTarget.instance, aC.File = function () {
            function aF(aG) {
                aC.extend(this, {
                    id: aC.guid(),
                    name: aG.name || aG.fileName,
                    type: aG.type || "",
                    size: aG.size || aG.fileSize,
                    origSize: aG.size || aG.fileSize,
                    loaded: 0,
                    percent: 0,
                    status: aC.QUEUED,
                    lastModifiedDate: aG.lastModifiedDate || (new Date).toLocaleString(),
                    getNative: function () {
                        var aH = this.getSource().getSource();
                        return ay.inArray(ay.typeOf(aH), ["blob", "file"]) !== -1 ? aH : null;
                    },
                    getSource: function () {
                        return aE[this.id] ? aE[this.id] : null;
                    },
                    destroy: function () {
                        var aH = this.getSource();
                        aH && (aH.destroy(), delete aE[this.id]);
                    }
                }), aE[this.id] = aG;
            }

            var aE = {};
            return aF;
        }(), aC.QueueProgress = function () {
            var aE = this;
            aE.size = 0, aE.loaded = 0, aE.uploaded = 0, aE.failed = 0, aE.queued = 0, aE.percent = 0, aE.bytesPerSec = 0, aE.reset = function () {
                aE.size = aE.loaded = aE.uploaded = aE.failed = aE.queued = aE.percent = aE.bytesPerSec = 0;
            };
        }, aB.plupload = aC;
    })(window, mOxie);
    (function (aA, ay) {
        function az(aC) {
            return plupload.translate(aC) || aC;
        }

        function ax(aC, aD) {
            aD.contents().each(function (aE, aF) {
                aF = aA(aF), aF.is(".plupload") || aF.remove();
            }), aD.prepend('<div class="plupload_wrapper plupload_scroll"><div id="' + aC + '_container" class="plupload_container">' + '<div class="plupload">' + '<div class="plupload_header">' + '<div class="plupload_header_content">' + '<div class="plupload_header_title">' + az("Select files") + "</div>" + '<div class="plupload_header_text">' + az("Add files to the upload queue and click the start button.") + "</div>" + "</div>" + "</div>" + '<div class="plupload_content">' + '<div class="plupload_filelist_header">' + '<div class="plupload_file_name">' + az("Filename") + "</div>" + '<div class="plupload_file_action">&nbsp;</div>' + '<div class="plupload_file_status"><span>' + az("Status") + "</span></div>" + '<div class="plupload_file_size">' + az("Size") + "</div>" + '<div class="plupload_clearer">&nbsp;</div>' + "</div>" + '<ul id="' + aC + '_filelist" class="plupload_filelist"></ul>' + '<div class="plupload_filelist_footer">' + '<div class="plupload_file_name">' + '<div class="plupload_buttons">' + '<a href="#" class="plupload_button plupload_add" id="' + aC + '_browse">' + az("Add Files") + "</a>" + '<a href="#" class="plupload_button plupload_start">' + az("Start Upload") + "</a>" + "</div>" + '<span class="plupload_upload_status"></span>' + "</div>" + '<div class="plupload_file_action"></div>' + '<div class="plupload_file_status"><span class="plupload_total_status">0%</span></div>' + '<div class="plupload_file_size"><span class="plupload_total_file_size">0 b</span></div>' + '<div class="plupload_progress">' + '<div class="plupload_progress_container">' + '<div class="plupload_progress_bar"></div>' + "</div>" + "</div>" + '<div class="plupload_clearer">&nbsp;</div>' + "</div>" + "</div>" + "</div>" + "</div>" + '<input type="hidden" id="' + aC + '_count" name="' + aC + '_count" value="0" />' + "</div>");
        }

        var aB = {};
        aA.fn.pluploadQueue = function (aC) {
            return aC ? (this.each(function () {
                    function aK(aL) {
                        var aN;
                        aL.status == plupload.DONE && (aN = "plupload_done"), aL.status == plupload.FAILED && (aN = "plupload_failed"), aL.status == plupload.QUEUED && (aN = "plupload_delete"), aL.status == plupload.UPLOADING && (aN = "plupload_uploading");
                        var aM = aA("#" + aL.id).attr("class", aN).find("a").css("display", "block");
                        aL.hint && aM.attr("title", aL.hint);
                    }

                    function aG() {
                        aA("span.plupload_total_status", aE).html(aF.total.percent + "%"), aA("div.plupload_progress_bar", aE).css("width", aF.total.percent + "%"), aA("span.plupload_upload_status", aE).html(ay.sprintf(az("Uploaded %d/%d files"), aF.total.uploaded, aF.files.length));
                    }

                    function aI() {
                        var aN = aA("ul.plupload_filelist", aE).html(""), aL = 0, aM;
                        aA.each(aF.files, function (aO, aP) {
                            aM = "", aP.status == plupload.DONE && (aP.target_name && (aM += '<input type="hidden" name="' + aH + "_" + aL + '_tmpname" value="' + plupload.xmlEncode(aP.target_name) + '" />'), aM += '<input type="hidden" name="' + aH + "_" + aL + '_name" value="' + plupload.xmlEncode(aP.name) + '" />', aM += '<input type="hidden" name="' + aH + "_" + aL + '_status" value="' + (aP.status == plupload.DONE ? "done" : "failed") + '" />', aL++, aA("#" + aH + "_count").val(aL)), aN.append('<li id="' + aP.id + '">' + '<div class="plupload_file_name"><span>' + aP.name + "</span></div>" + '<div class="plupload_file_action"><a href="#"></a></div>' + '<div class="plupload_file_status">' + aP.percent + "%</div>" + '<div class="plupload_file_size">' + plupload.formatSize(aP.size) + "</div>" + '<div class="plupload_clearer">&nbsp;</div>' + aM + "</li>"), aK(aP), aA("#" + aP.id + ".plupload_delete a").click(function (aQ) {
                                aA("#" + aP.id).remove(), aF.removeFile(aP), aQ.preventDefault();
                            });
                        }), aA("span.plupload_total_file_size", aE).html(plupload.formatSize(aF.total.size)), aF.total.queued === 0 ? aA("span.plupload_add_text", aE).html(az("Add Files")) : aA("span.plupload_add_text", aE).html(ay.sprintf(az("%d files queued"), aF.total.queued)), aA("a.plupload_start", aE).toggleClass("plupload_disabled", aF.files.length == aF.total.uploaded + aF.total.failed), aN[0].scrollTop = aN[0].scrollHeight, aG(), !aF.files.length && aF.features.dragdrop && aF.settings.dragdrop && aA("#" + aH + "_filelist").append('<li class="plupload_droptext">' + az("Drag files here.") + "</li>");
                    }

                    function aJ() {
                        delete aB[aH], aF.destroy(), aE.html(aD), aF = aE = aD = null;
                    }

                    var aF, aE, aH, aD;
                    aE = aA(this), aH = aE.attr("id"), aH || (aH = plupload.guid(), aE.attr("id", aH)), aD = aE.html(), ax(aH, aE), aC = aA.extend({
                        dragdrop: !0,
                        browse_button: aH + "_browse",
                        container: aH
                    }, aC), aC.dragdrop && (aC.drop_element = aH + "_filelist"), aF = new plupload.Uploader(aC), aB[aH] = aF, aF.bind("UploadFile", function (aL, aM) {
                        aA("#" + aM.id).addClass("plupload_current_file");
                    }), aF.bind("Init", function (aL, aM) {
                        !aC.unique_names && aC.rename && aE.on("click", "#" + aH + "_filelist div.plupload_file_name span", function (aS) {
                            var aQ = aA(aS.target), aO, aP, aR, aN = "";
                            aO = aL.getFile(aQ.parents("li")[0].id), aR = aO.name, aP = /^(.+)(\.[^.]+)$/.exec(aR), aP && (aR = aP[1], aN = aP[2]), aQ.hide().after('<input type="text" />'), aQ.next().val(aR).focus().blur(function () {
                                aQ.show().next().remove();
                            }).keydown(function (aT) {
                                var aU = aA(this);
                                aT.keyCode == 13 && (aT.preventDefault(), aO.name = aU.val() + aN, aQ.html(aO.name), aU.blur());
                            });
                        }), aA("#" + aH + "_container").attr("title", "Using runtime: " + aM.runtime), aA("a.plupload_start", aE).click(function (aN) {
                            aA(this).hasClass("plupload_disabled") || aF.start(), aN.preventDefault();
                        }), aA("a.plupload_stop", aE).click(function (aN) {
                            aN.preventDefault(), aF.stop();
                        }), aA("a.plupload_start", aE).addClass("plupload_disabled");
                    }), aF.bind("Error", function (aM, aO) {
                        var aL = aO.file, aN;
                        aL && (aN = aO.message, aO.details && (aN += " (" + aO.details + ")"), aO.code == plupload.FILE_SIZE_ERROR && alert(az("Error: File too large:") + " " + aL.name), aO.code == plupload.FILE_EXTENSION_ERROR && alert(az("Error: Invalid file extension:") + " " + aL.name), aL.hint = aN, aA("#" + aL.id).attr("class", "plupload_failed").find("a").css("display", "block").attr("title", aN)), aO.code === plupload.INIT_ERROR && setTimeout(function () {
                            aJ();
                        }, 1);
                    }), aF.bind("PostInit", function (aL) {
                        aL.settings.dragdrop && aL.features.dragdrop && aA("#" + aH + "_filelist").append('<li class="plupload_droptext">' + az("Drag files here.") + "</li>");
                    }), aF.init(), aF.bind("StateChanged", function () {
                        aF.state === plupload.STARTED ? (aA("li.plupload_delete a,div.plupload_buttons", aE).hide(), aF.disableBrowse(!0), aA("span.plupload_upload_status,div.plupload_progress,a.plupload_stop", aE).css("display", "block"), aA("span.plupload_upload_status", aE).html("Uploaded " + aF.total.uploaded + "/" + aF.files.length + " files"), aC.multiple_queues && aA("span.plupload_total_status,span.plupload_total_file_size", aE).show()) : (aI(), aA("a.plupload_stop,div.plupload_progress", aE).hide(), aA("a.plupload_delete", aE).css("display", "block"), aC.multiple_queues && aF.total.uploaded + aF.total.failed == aF.files.length && (aA(".plupload_buttons,.plupload_upload_status", aE).css("display", "inline"), aF.disableBrowse(!1), aA(".plupload_start", aE).addClass("plupload_disabled"), aA("span.plupload_total_status,span.plupload_total_file_size", aE).hide()));
                    }), aF.bind("FilesAdded", aI), aF.bind("FilesRemoved", function () {
                        var aL = aA("#" + aH + "_filelist").scrollTop();
                        aI(), aA("#" + aH + "_filelist").scrollTop(aL);
                    }), aF.bind("FileUploaded", function (aM, aL) {
                        aK(aL);
                    }), aF.bind("UploadProgress", function (aL, aM) {
                        aA("#" + aM.id + " div.plupload_file_status", aE).html(aM.percent + "%"), aK(aM), aG();
                    }), aC.setup && aC.setup(aF);
                }), this) : aB[aA(this[0]).attr("id")];
        };
    })(window.jsplus_jquery, mOxie);
    function C(ax, aB, az) {
        if (typeof aB == "undefined") {
            aB = true;
        }
        if (typeof az == "undefined") {
            az = " ";
        }
        if (typeof(ax) == "undefined") {
            return "";
        }
        var aC = 1000;
        if (ax < aC) {
            return ax + az + (aB ? "b" : "");
        }
        var ay = ["K", "M", "G", "T", "P", "E", "Z", "Y"];
        var aA = -1;
        do {
            ax /= aC;
            ++aA;
        } while (ax >= aC);
        return ax.toFixed(1) + az + ay[aA] + (aB ? "b" : "");
    }

    function W(ax) {
        return ax.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function am(ax) {
        return ax.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    function ac(ax) {
        var ay = document.createElement("div");
        ay.innerHTML = ax;
        return ay.childNodes;
    }

    function ai(ax) {
        return ax.getElementsByTagName("head")[0];
    }

    function af(ax) {
        return ax.getElementsByTagName("body")[0];
    }

    function aq(az, aB) {
        var ax = az.getElementsByTagName("link");
        var aA = false;
        for (var ay = ax.length - 1; ay >= 0; ay--) {
            if (ax[ay].href == aB) {
                ax[ay].parentNode.removeChild(ax[ay]);
            }
        }
    }

    function U(aA, aC) {
        if (!aA) {
            return;
        }
        var ax = aA.getElementsByTagName("link");
        var aB = false;
        for (var ay = 0; ay < ax.length; ay++) {
            if (ax[ay].href.indexOf(aC) != -1) {
                aB = true;
            }
        }
        if (!aB) {
            var az = aA.createElement("link");
            az.href = aC;
            az.type = "text/css";
            az.rel = "stylesheet";
            ai(aA).appendChild(az);
        }
    }

    function g(aA, aC) {
        if (!aA) {
            return;
        }
        var ax = aA.getElementsByTagName("script");
        var aB = false;
        for (var az = 0; az < ax.length; az++) {
            if (ax[az].src.indexOf(aC) != -1) {
                aB = true;
            }
        }
        if (!aB) {
            var ay = aA.createElement("script");
            ay.src = aC;
            ay.type = "text/javascript";
            ai(aA).appendChild(ay);
        }
    }

    function au(ax, az, ay) {
        U(b(ax), az);
        if (document != b(ax) && ay) {
            U(document, az);
        }
    }

    function X(ax, az, ay) {
        g(b(ax), az);
        if (document != b(ax) && ay) {
            g(document, az);
        }
    }

    function ae(ay, ax) {
        var az = b(ay);
        s(az, ax);
    }

    function s(az, ax) {
        var ay = az.createElement("style");
        ai(az).appendChild(ay);
        ay.innerHTML = ax;
    }

    function al(ay, ax) {
        if (aw(ay, ax)) {
            return;
        }
        ay.className = ay.className.length == 0 ? ax : ay.className + " " + ax;
    }

    function ap(az, ax) {
        var ay = a(az);
        while (ay.indexOf(ax) > -1) {
            ay.splice(ay.indexOf(ax), 1);
        }
        var aA = ay.join(" ").trim();
        if (aA.length > 0) {
            az.className = aA;
        } else {
            if (az.hasAttribute("class")) {
                az.removeAttribute("class");
            }
        }
    }

    function a(ax) {
        if (typeof(ax.className) === "undefined" || ax.className == null) {
            return [];
        }
        return ax.className.split(/\s+/);
    }

    function aw(aA, ax) {
        var az = a(aA);
        for (var ay = 0; ay < az.length; ay++) {
            if (az[ay].toLowerCase() == ax.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    function av(az, aA) {
        var ay = a(az);
        for (var ax = 0; ax < ay.length; ax++) {
            if (ay[ax].indexOf(aA) === 0) {
                return true;
            }
        }
        return false;
    }

    function R(az) {
        if (typeof(az.getAttribute("style")) === "undefined" || az.getAttribute("style") == null || az.getAttribute("style").trim().length == 0) {
            return {};
        }
        var aB = {};
        var aA = az.getAttribute("style").split(/;/);
        for (var ay = 0; ay < aA.length; ay++) {
            var aC = aA[ay].trim();
            var ax = aC.indexOf(":");
            if (ax > -1) {
                aB[aC.substr(0, ax).trim()] = aC.substr(ax + 1);
            } else {
                aB[aC] = "";
            }
        }
        return aB;
    }

    function aa(az, ay) {
        var aA = R(az);
        for (var ax in aA) {
            var aB = aA[ax];
            if (ax == ay) {
                return aB;
            }
        }
        return null;
    }

    function V(aA, az, ax) {
        var aB = R(aA);
        for (var ay in aB) {
            var aC = aB[ay];
            if (ay == az && aC == ax) {
                return true;
            }
        }
        return false;
    }

    function u(az, ay, ax) {
        var aA = R(az);
        aA[ay] = ax;
        l(az, aA);
    }

    function T(ay, ax) {
        var az = R(ay);
        delete az[ax];
        l(ay, az);
    }

    function l(ay, aA) {
        var az = [];
        for (var ax in aA) {
            az.push(ax + ":" + aA[ax]);
        }
        if (az.length > 0) {
            ay.setAttribute("style", az.join(";"));
        } else {
            if (ay.hasAttribute("style")) {
                ay.removeAttribute("style");
            }
        }
    }

    function r(aB, ay) {
        var az;
        if (Object.prototype.toString.call(ay) === "[object Array]") {
            az = ay;
        } else {
            az = [ay];
        }
        for (var aA = 0; aA < az.length; aA++) {
            az[aA] = az[aA].toLowerCase();
        }
        var ax = [];
        for (var aA = 0; aA < aB.childNodes.length; aA++) {
            if (aB.childNodes[aA].nodeType == 1 && az.indexOf(aB.childNodes[aA].tagName.toLowerCase()) > -1) {
                ax.push(aB.childNodes[aA]);
            }
        }
        return ax;
    }

    function ah(ay) {
        var aC = new RegExp("(^|.*[\\/])" + ay + ".js(?:\\?.*|;.*)?$", "i");
        var aB = "";
        if (!aB) {
            var ax = document.getElementsByTagName("script");
            for (var aA = 0; aA < ax.length; aA++) {
                var az = aC.exec(ax[aA].src);
                if (az) {
                    aB = az[1];
                    break;
                }
            }
        }
        if (aB.indexOf(":/") == -1 && aB.slice(0, 2) != "//") {
            if (aB.indexOf("/") === 0) {
                aB = location.href.match(/^.*?:\/\/[^\/]*/)[0] + aB;
            } else {
                aB = location.href.match(/^[^\?]*\/(?:)/)[0] + aB;
            }
        }
        return aB.length > 0 ? aB : null;
    }

    var h = 104;
    P("jsplus_uploader_url", e("jsplus_uploader") + "uploader.php");
    n("runtimes", "html5,flash,html4,silverlight,browserplus,gears");
    n("auto_upload", true);
    if (h == 101 || h == 102 || h == 104 || h == 1 || h == 2) {
        n("allowed_ext", "jpg,jpeg,gif,png,bmp,tif,tiff");
    } else {
        if (h == 103) {
            n("allowed_ext", "*");
        }
    }
    if (h == 101 || h == 102 || h == 104 || h == 1 || h == 2) {
        n("default_img_resize", true);
        n("default_img_resize_width", 800);
        n("default_img_resize_height", 600);
        n("default_img_resize_enlarge", false);
        n("img_resize_show", true);
    }
    if (h == 102 || h == 104 || h == 1 || h == 2) {
        n("default_thumb_resize_width", 200);
        n("default_thumb_resize_height", 200);
        n("default_thumb_resize_enlarge", false);
        n("thumb_resize_show", true);
    }
    if (h == 1 || h == 2) {
        n("default_col_count", 3);
        n("col_count_show", true);
    }
    if (h == 101) {
        n("template", "<img src='{IMAGE}'/>");
    } else {
        if (h == 102) {
            n("template", "<a class='jsplus_preview_href' rel='lightbox' href='{IMAGE}'><img src='{PREVIEW}'/></a>");
        } else {
            if (h == 103) {
                n("template", "<div style='display:inline-block'>" + '<img src="{PLUGIN_PATH}img/download.png" style="width:24px;height:24px;margin-right:5px;margin-top:-4px;vertical-align: middle"/>' + "<a class='jsplus_easy_file' style=\"font-size:16px;margin-right:15px;\" href='{FILE}'>Download file</a>" + "</div>");
            } else {
                if (h == 104) {
                    n("template", "<div class='jsplus_gallery_item' style='height: {PREVIEW_HEIGHT}px; width: {PREVIEW_WIDTH}px; border: 1px solid silver; white-space: nowrap; padding: 10px; display: inline-block; text-align: center; margin: 5px;'>" + "<a rel='lightbox' href='{IMAGE}' data-lightbox='{SET_ID}'>" + "<span style='display: inline-block; height: 100%; vertical-align: middle;'></span>" + "<img src='{PREVIEW}' style='vertical-align: middle; max-height: {PREVIEW_HEIGHT}px; max-width: {PREVIEW_WIDTH}px'/>" + "</a>" + "</div>");
                    n("template_wrap", "<div class='jsplus_gallery'  data-lightbox-id='{SET_ID}' style='padding:10px;border:1px solid #DFDFDF; display: table'>{ITEMS}</div>");
                } else {
                    if (h == 1) {
                        n("template", "<div class='col-xs-{COL_WIDTH}' style='white-space: nowrap; padding: 5px; text-align: center'>" + "<div style='border: 1px solid silver; padding: 10px'>" + "<a rel='lightbox' href='{IMAGE}' data-lightbox='{SET_ID}'>" + "<span style='display: inline-block; height: 100%; vertical-align: middle;'></span>" + "<img src='{PREVIEW}' style='vertical-align: middle; max-height: {PREVIEW_HEIGHT}px; max-width: {PREVIEW_WIDTH}px'/>" + "</a>" + "</div>" + "</div>");
                        n("template_wrap", "<div class='row jsplus_gallery'>{ITEMS}</div>");
                    } else {
                        if (h == 2) {
                            n("template", "<div class='small-{COL_WIDTH} columns' style='white-space: nowrap; padding: 5px; text-align: center'>" + "<div style='border: 1px solid silver; padding: 10px'>" + "<a rel='lightbox' href='{IMAGE}' data-lightbox='{SET_ID}'>" + "<span style='display: inline-block; height: 100%; vertical-align: middle;'></span>" + "<img src='{PREVIEW}' style='vertical-align: middle; max-height: {PREVIEW_HEIGHT}px; max-width: {PREVIEW_WIDTH}px'/>" + "</a>" + "</div>" + "</div>");
                            n("template_wrap", "<div class='row jsplus_gallery'>{ITEMS}</div>");
                        }
                    }
                }
            }
        }
    }
    var I = [];
    var Z = false;
    var ar = null;
    var U = function (aA, aC) {
        var ax = aA.getElementsByTagName("link");
        var aB = false;
        for (var ay = 0; ay < ax.length; ay++) {
            if (ax[ay].href.indexOf(aC) != -1) {
                aB = true;
            }
        }
        if (!aB) {
            var az = aA.createElement("link");
            az.href = aC;
            az.type = "text/css";
            az.rel = "stylesheet";
            aA.getElementsByTagName("head")[0].appendChild(az);
        }
    };
    var w = null;

    function M(aE, ay) {
        var ax = ay.substring(ay.lastIndexOf("/") + 1);
        var aG = O(aE, "template");
        if (h == 101) {
            aG = aG.replace(/\{IMAGE\}/g, ay);
            aG = aG.replace(/\{FILENAME\}/g, ax);
        } else {
            if (h == 102) {
                aG = aG.replace(/\{IMAGE\}/g, ay);
                aG = aG.replace(/\{FILENAME\}/g, ax);
                var aC = ay.split(".");
                aC[aC.length - 2];
                ay = aC.join(".");
                ax = ay.substring(ay.lastIndexOf("/") + 1);
                aG = aG.replace(/\{PREVIEW\}/g, ay);
                aG = aG.replace(/\{FILENAME\}/g, ax);
            } else {
                if (h == 103) {
                    aG = aG.replace(/\{FILE\}/g, ay);
                    aG = aG.replace(/\{FILENAME\}/g, ax);
                    aG = aG.replace(/\{PLUGIN_PATH\}/g, ao());
                } else {
                    if (h == 104 || h == 1 || h == 2) {
                        if (!w) {
                            w = Math.random().toString(36).substr(2, 5);
                        }
                        aG = aG.replace(/\{SET_ID\}/g, w);
                        aG = aG.replace(/\{IMAGE\}/g, ay);
                        aG = aG.replace(/\{FILENAME\}/g, ax);
                        var aC = ay.split(".");
                        aC[aC.length - 2];
                        ay = aC.join(".");
                        ax = ay.substring(ay.lastIndexOf("/") + 1);
                        aG = aG.replace(/\{PREVIEW\}/g, ay);
                        aG = aG.replace(/\{FILENAME\}/g, ax);
                        if (h == 1 || h == 2) {
                            var aF = parseInt(window.jsplus_jquery("#jsplus_gallery-col-count-" + v(aE)).val());
                            var aB = 3;
                            if (aF == 1) {
                                aB = 12;
                            }
                            if (aF == 2) {
                                aB = 6;
                            }
                            if (aF == 3) {
                                aB = 4;
                            }
                            if (aF == 4) {
                                aB = 3;
                            }
                            if (aF == 6) {
                                aB = 2;
                            }
                            if (aF == 12) {
                                aB = 1;
                            }
                            aG = aG.replace(/\{COL_WIDTH\}/g, aB);
                        }
                        var az = parseInt(window.jsplus_jquery("#jsplus_gallery-thumb-resize-width-" + v(aE)).val());
                        var aD = parseInt(window.jsplus_jquery("#jsplus_gallery-thumb-resize-height-" + v(aE)).val());
                        var aH = function () {
                            if (aD == 0) {
                                return az;
                            }
                            if (az == 0) {
                                return aD;
                            }
                            return aD > az ? aD : az;
                        };
                        var aA = function () {
                            if (aD == 0) {
                                return az;
                            }
                            if (az == 0) {
                                return aD;
                            }
                            return aD < az ? aD : az;
                        };
                        aG = aG.replace(/\{PREVIEW_WIDTH\}\s*\+\s*(\d+)/g, function (aL, aK, aJ, aI) {
                            return az + parseInt(aK);
                        });
                        aG = aG.replace(/\{PREVIEW_HEIGHT\}\s*\+\s*(\d+)/g, function (aL, aK, aJ, aI) {
                            return aD + parseInt(aK);
                        });
                        aG = aG.replace(/\{PREVIEW_MIN_WIDTH_OR_HEIGHT\}\s*\+\s*(\d+)/g, function (aL, aK, aJ, aI) {
                            return aH() + parseInt(aK);
                        });
                        aG = aG.replace(/\{PREVIEW_MAX_WIDTH_OR_HEIGHT\}\s*\+\s*(\d+)/g, function (aL, aK, aJ, aI) {
                            return aA() + parseInt(aK);
                        });
                        aG = aG.replace(/\{PREVIEW_WIDTH\}/g, az);
                        aG = aG.replace(/\{PREVIEW_HEIGHT\}/g, aD);
                        aG = aG.replace(/\{PREVIEW_MIN_WIDTH_OR_HEIGHT\}/g, aH());
                        aG = aG.replace(/\{PREVIEW_MAX_WIDTH_OR_HEIGHT\}/g, aA());
                    }
                }
            }
        }
        return aG;
    }

    function S(ax) {
        return '<div class="jsplus_gallery-plupload2-' + v(ax) + '" style="height:258px;font-size:12px;background-color:#DFDFDF !important">' + "</div>" + A(ax);
    }

    function A(ay) {
        if (h == 103) {
            return "";
        }
        var ax = "";
        if (h == 1 || h == 2) {
            var ax = '<style type="text/css" media="all">' + "#jsplus_gallery-panel-col-count-" + v(ay) + " { padding: 4px 0;  line-height: 16px; }" + "#jsplus_gallery-panel-col-count-" + v(ay) + " select { background-color: white; width:66px;border:1px solid #AAA;padding:2px;margin:0 4px 0 4px;font-size:12px; }" + "#jsplus_gallery-panel-col-count-" + v(ay) + " .jsplus_gallery-label-" + v(ay) + " { display: inline-block; padding-left: 15px; text-indent: -15px; width: 80px; font-size: 12px; vertical-align: baseline; padding-right: 10px;}" + (O(ay, "col_count_show") ? "" : "#jsplus_gallery-panel-col-count-" + v(ay) + " { display: none !important; }") + "</style>" + '<div id="jsplus_gallery-panel-col-count-' + v(ay) + '" class="enabled">' + '<div style="display:inline-block">' + '<div class="jsplus_gallery-label-' + v(ay) + '" style="color:black">' + o(ay, "jsplus_gallery_col_count") + "</div>" + '<select style="box-sizing:content-box;width:60px;padding:2px;margin:0 4px;color:black;height:inherit" id="jsplus_gallery-col-count-' + v(ay) + '">' + '<option value="1" ' + (O(ay, "default_col_count") == 1 ? "selected" : "") + ">1</option>" + '<option value="2"' + (O(ay, "default_col_count") == 2 ? "selected" : "") + ">2</option>" + '<option value="3"' + (O(ay, "default_col_count") == 3 ? "selected" : "") + ">3</option>" + '<option value="4"' + (O(ay, "default_col_count") == 4 ? "selected" : "") + ">4</option>" + '<option value="6"' + (O(ay, "default_col_count") == 6 ? "selected" : "") + ">6</option>" + '<option value="12"' + (O(ay, "default_col_count") == 12 ? "selected" : "") + ">12</option>" + "</select>" + "</div>" + "</div>";
        }
        var az = "";
        if (h == 102 || h == 104 || h == 1 || h == 2) {
            var az = '<style type="text/css" media="all">' + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + " #jsplus_gallery-thumb-resize-up-" + v(ay) + ' { background-color: white; background-image: url("' + ao() + 'img/resize_up_disabled.png"); background-repeat: no-repeat; background-position: top left; width:19px; height:19px; display: inline-block; margin-left: 5px; font-size:15px; border: 1px solid #aaa; border-radius: 2px; }' + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + ".enabled #jsplus_gallery-thumb-resize-up-" + v(ay) + ' { background-image: url("' + ao() + 'img/resize_up.png"); cursor: pointer; } ' + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + ".enabled #jsplus_gallery-thumb-resize-up-" + v(ay) + ':hover { background-image: url("' + ao() + 'img/resize_up_hover.png"); }' + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + ".enabled #jsplus_gallery-thumb-resize-up-" + v(ay) + '.jsplus_gallery-checked { background-image: url("' + ao() + 'img/resize_up_checked.png"); }' + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + ".enabled #jsplus_gallery-thumb-resize-up-" + v(ay) + '.jsplus_gallery-checked:hover { background-image: url("' + ao() + 'img/resize_up_checked_hover.png"); }' + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + " { padding: 4px 0;  line-height: 16px;}" + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + ' input[type="text"] {background-color: rgb(238, 238, 238); width:60px;border:1px solid #AAA;padding:2px;margin:0 4px 0 4px;font-size:12px; }' + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + '.enabled input[type="text"] {background-color: white; }' + "#jsplus_gallery-panel-thumb-resize-" + v(ay) + " .jsplus_gallery-label-" + v(ay) + " { display: inline-block; padding-left: 15px; text-indent: -15px; width: 80px; font-size: 12px; vertical-align: baseline; padding-right:10px;}" + (O(ay, "thumb_resize_show") ? "" : "#jsplus_gallery-panel-thumb-resize-" + v(ay) + " { display: none !important; }") + "</style>" + '<div id="jsplus_gallery-panel-thumb-resize-' + v(ay) + '" class="enabled">' + '<div style="display:inline-block">' + '<div class="jsplus_gallery-label-' + v(ay) + '" style="color:black">' + o(ay, "resize_thumb") + "</div>" + '<input style="width:60px;padding:2px;margin:0 4px;display:inline-block;height:inherit;color:black;box-sizing:content-box" type="text" id="jsplus_gallery-thumb-resize-width-' + v(ay) + '" value="' + O(ay, "default_thumb_resize_width") + '"/>' + "&nbsp;&#215;&nbsp;" + '<input style="width:60px;padding:2px;margin:0 4px;display:inline-block;height:inherit;color:black;box-sizing:content-box" type="text" id="jsplus_gallery-thumb-resize-height-' + v(ay) + '" value="' + O(ay, "default_thumb_resize_height") + '"/>' + "</div>" + '<div alt="' + o(ay, "resize_up") + '" title="' + o(ay, "resize_up") + '"' + (O(ay, "default_thumb_resize_enlarge") ? ' class="jsplus_gallery-checked"' : "") + ' id="jsplus_gallery-thumb-resize-up-' + v(ay) + '" style="box-sizing: content-box;">&nbsp;</div>' + "</div>";
        }
        var aC = "";
        if (h == 101 || h == 102 || h == 104 || h == 1 || h == 2) {
            var aC = '<style type="text/css" media="all">' + "#jsplus_gallery-panel-img-resize-" + v(ay) + " #jsplus_gallery-img-resize-up-" + v(ay) + ' { background-color: white; background-image: url("' + ao() + 'img/resize_up_disabled.png"); background-repeat: no-repeat; background-position: top left; width:19px; height:19px; display: inline-block; margin-left: 5px; font-size:15px; border: 1px solid #aaa; border-radius: 2px; }' + "#jsplus_gallery-panel-img-resize-" + v(ay) + ".enabled #jsplus_gallery-img-resize-up-" + v(ay) + ' { background-image: url("' + ao() + 'img/resize_up.png"); cursor: pointer; } ' + "#jsplus_gallery-panel-img-resize-" + v(ay) + ".enabled #jsplus_gallery-img-resize-up-" + v(ay) + ':hover { background-image: url("' + ao() + 'img/resize_up_hover.png"); }' + "#jsplus_gallery-panel-img-resize-" + v(ay) + ".enabled #jsplus_gallery-img-resize-up-" + v(ay) + '.jsplus_gallery-checked { background-image: url("' + ao() + 'img/resize_up_checked.png"); }' + "#jsplus_gallery-panel-img-resize-" + v(ay) + ".enabled #jsplus_gallery-img-resize-up-" + v(ay) + '.jsplus_gallery-checked:hover { background-image: url("' + ao() + 'img/resize_up_checked_hover.png"); }' + "#jsplus_gallery-img-resize-" + v(ay) + " { width: 13px; height: 13px; padding: 0; margin:0; vertical-align: bottom; position: relative; top: -1px; *overflow: hidden;}" + "#jsplus_gallery-panel-img-resize-" + v(ay) + " { padding: 4px 0; line-height: 16px;}" + "#jsplus_gallery-panel-img-resize-" + v(ay) + ' input[type="text"] {background-color: rgb(238, 238, 238); width:60px;border:1px solid #AAA;padding:2px;margin:0 4px 0 4px;font-size:12px; }' + "#jsplus_gallery-panel-img-resize-" + v(ay) + '.enabled input[type="text"] {background-color: white; }' + "#jsplus_gallery-panel-img-resize-" + v(ay) + " .jsplus_gallery-label-" + v(ay) + " { display: inline-block; padding-left: 15px; text-indent: -15px; width: 80px; font-size: 12px; vertical-align: baseline;padding-right:10px;}" + (O(ay, "img_resize_show") ? "" : "#jsplus_gallery-panel-img-resize-" + v(ay) + " { display: none !important; }") + "</style>" + '<div id="jsplus_gallery-panel-img-resize-' + v(ay) + '"' + (O(ay, "default_img_resize") ? ' class="enabled"' : "") + ">" + '<div style="display:inline-block">' + '<label class="jsplus_gallery-label-' + v(ay) + '" style="color:black !important;font-weight:normal">' + '<input id="jsplus_gallery-img-resize-' + v(ay) + '" type="checkbox"' + (O(ay, "default_img_resize") ? ' checked="checked"' : "") + "/>" + "&nbsp; " + o(ay, "resize") + "</label>" + '<input style="width:60px;padding:2px;margin:0 4px;display:inline-block;height:inherit;color:black;box-sizing:content-box" type="text" id="jsplus_gallery-img-resize-width-' + v(ay) + '" value="' + O(ay, "default_img_resize_width") + '" ' + (O(ay, "default_img_resize") ? "" : 'disabled="disabled"') + "/>" + "&nbsp;&#215;&nbsp;" + '<input style="width:60px;padding:2px;margin:0 4px;display:inline-block;height:inherit;color:black;box-sizing:content-box" type="text" id="jsplus_gallery-img-resize-height-' + v(ay) + '" value="' + O(ay, "default_img_resize_height") + '"' + (O(ay, "default_img_resize") ? "" : 'disabled="disabled"') + "/>" + "</div>" + '<div alt="' + o(ay, "resize_up") + '" title="' + o(ay, "resize_up") + '"' + (O(ay, "default_img_resize_enlarge") ? ' class="jsplus_gallery-checked"' : "") + ' id="jsplus_gallery-img-resize-up-' + v(ay) + '" style="box-sizing: content-box;">&nbsp;</div>' + "</div>";
        }
        var aB = "";
        if (az.length > 0 || aC.length > 0 || ax.length > 0) {
            var aA = (O(ay, "img_resize_show") || O(ay, "thumb_resize_show") || O(ay, "col_count_show")) ? 10 : 0;
            aB = '<div style="border-top: 1px solid #aaa;width:100%;padding:' + aA + 'px; background-color: #DFDFDF;margin:0;">' + az + aC + ax + "</div>";
        }
        return aB;
    }

    function aj(aA, az) {
        if (typeof(window["jsplus_gallery_insert_range"]) != "undefined" && window["jsplus_gallery_insert_range"] != null) {
            var ax = window["jsplus_gallery_insert_range"];
            window["jsplus_gallery_insert_range"] = null;
            var aD;
            if (ax.startContainer) {
                aD = ax.startContainer;
                if (aD.nodeType == document.TEXT_NODE) {
                    aD = aD.parentNode;
                } else {
                    if (ax.startOffset < aD.childNodes.length) {
                        aD = aD.childNodes[ax.startOffset];
                    }
                }
            } else {
                aD = ax.parentElement();
            }
            var aC = window["jsplus_gallery_event_target"];
            if (!aD || aC.nodeName.toLowerCase() == "img") {
                aD = aC;
            }
            var aB = ac(az);
            for (var ay = 0; ay < aB.count; ay++) {
                aD.appendChild(aB[ay]);
            }
        } else {
            ak(aA, az);
        }
    }

    function an(ay, ax) {
        if (!Z) {
            at(ay, ax);
            U(document, ao() + "lib/css/jquery.plupload.queue.css");
            Z = true;
        } else {
            I = [];
            m();
        }
        ar = ag(ay, ax);
    }

    function ab(aA, ay) {
        if (I.length == 0) {
            var aC = ar.pluploadQueue();
            if (O(aA, "auto_upload") && aC.files.length > 0) {
                aC.start();
                return false;
            } else {
                alert(o(aA, "select_files_first"));
            }
            return false;
        }
        if (h == 101 || h == 102 || h == 103) {
            for (var ax = 0; ax < I.length; ax++) {
                var az = M(aA, I[ax]);
                aj(aA, az);
            }
        } else {
            if (h == 104 || h == 1 || h == 2) {
                z(aA);
            }
        }
        // var aB = createUpcastIterator(aA.widgets);
        // evt.data.dataValue.forEach(aB.iterator, CKEDITOR.NODE_ELEMENT, true);
        return true;
    }

    function t(az) {
        var aA = "";
        for (var ay = 0; ay < I.length; ay++) {
            aA += M(az, I[ay]);
        }
        var ax = O(az, "template_wrap");
        ax = ax.replace("{SET_ID}", w);
        ax = ax.replace("{ITEMS}", aA);
        return ax;
    }

    function ag(aA, az) {
        if (h == 101 || h == 102 || h == 104 || h == 1 || h == 2) {
            window.jsplus_jquery("#jsplus_gallery-img-resize-up-" + v(aA)).unbind("click");
            window.jsplus_jquery("#jsplus_gallery-img-resize-up-" + v(aA)).click(function () {
                if (window.jsplus_jquery("#jsplus_gallery-img-resize-" + v(aA)).is(":checked")) {
                    if (window.jsplus_jquery(this).hasClass("jsplus_gallery-checked")) {
                        window.jsplus_jquery(this).removeClass("jsplus_gallery-checked");
                    } else {
                        window.jsplus_jquery(this).addClass("jsplus_gallery-checked");
                    }
                }
            });
            window.jsplus_jquery("#jsplus_gallery-img-resize-" + v(aA)).unbind("change");
            window.jsplus_jquery("#jsplus_gallery-img-resize-" + v(aA)).change(function () {
                if (window.jsplus_jquery("#jsplus_gallery-img-resize-" + v(aA)).is(":checked")) {
                    window.jsplus_jquery("#jsplus_gallery-panel-img-resize-" + v(aA)).addClass("enabled");
                    window.jsplus_jquery("#jsplus_gallery-panel-img-resize-" + v(aA) + ' input[type="text"]').removeAttr("disabled");
                } else {
                    window.jsplus_jquery("#jsplus_gallery-panel-img-resize-" + v(aA)).removeClass("enabled");
                    window.jsplus_jquery("#jsplus_gallery-panel-img-resize-" + v(aA) + ' input[type="text"]').attr("disabled", "disabled");
                }
            });
        }
        if (h == 102 || h == 104 || h == 1 || h == 2) {
            window.jsplus_jquery("#jsplus_gallery-thumb-resize-up-" + v(aA)).unbind("click");
            window.jsplus_jquery("#jsplus_gallery-thumb-resize-up-" + v(aA)).click(function () {
                if (window.jsplus_jquery(this).hasClass("jsplus_gallery-checked")) {
                    window.jsplus_jquery(this).removeClass("jsplus_gallery-checked");
                } else {
                    window.jsplus_jquery(this).addClass("jsplus_gallery-checked");
                }
            });
        }
        var aB = {};
        if (O(aA, "allowed_ext") != "*") {
            aB = {mime_types: [{title: o(aA, "file_filter_name"), extensions: O(aA, "allowed_ext")}]};
        }
        var ay = L(aA, "jsplus_uploader_url");
        if (ay.indexOf("?") >= 0) {
            ay += "&";
        } else {
            ay += "?";
        }
        ay += "client=plupload&";
        if (h == 101) {
            ay += "type=Images";
        } else {
            if (h == 102 || h == 104 || h == 1 || h == 2) {
                ay += "type=Images&makeThumb=true";
            } else {
                if (h == 103) {
                    ay += "type=Files";
                }
            }
        }
        var ax = window.jsplus_jquery(".jsplus_gallery-plupload2-" + v(aA)).pluploadQueue({
            runtimes: O(aA, "runtimes"),
            url: ay,
            unique_names: true,
            filters: aB,
            flash_swf_url: ao() + "lib/uploader.swf",
            silverlight_xap_url: ao() + "lib/uploader.xap",
            preinit: {
                Init: function (aE, aD) {
                    if (O(aA, "auto_upload")) {
                        window.jsplus_jquery(".plupload_button.plupload_start").remove();
                    }
                    if (typeof(window["jsplus_gallery_upload_dropped_files_value"]) !== "undefined" && window["jsplus_gallery_upload_dropped_files_value"] != null) {
                        var aC = window["jsplus_gallery_upload_dropped_files_value"];
                        for (var aF = 0; aF < aC.length; aF++) {
                            plupload.pluploadQueue().addFile(aC[aF]);
                        }
                        window["jsplus_gallery_upload_dropped_files_value"] = null;
                    }
                }
            },
            init: {
                BeforeUpload: function (aG, aE) {
                    if (h == 101 || h == 102 || h == 104 || h == 1 || h == 2) {
                        var aF = "";
                        if (window.jsplus_jquery("#jsplus_gallery-img-resize-" + v(aA)).is(":checked")) {
                            var aC;
                            var aD;
                            aC = window.jsplus_jquery("#jsplus_gallery-img-resize-width-" + v(aA)).val();
                            aD = aC.match(/^\d+$/);
                            if (aD != null && aD.length == 1 && aC > 0) {
                                aF += "&iw=" + aC;
                            }
                            aC = window.jsplus_jquery("#jsplus_gallery-img-resize-height-" + v(aA)).val();
                            aD = aC.match(/^\d+$/);
                            if (aD != null && aD.length == 1 && aC > 0) {
                                aF += "&ih=" + aC;
                            }
                            if (window.jsplus_jquery("#jsplus_gallery-img-resize-up-" + v(aA)).hasClass("jsplus_gallery-checked")) {
                                aF += "&ie=1";
                            }
                        }
                    }
                    if (h == 102 || h == 104 || h == 1 || h == 2) {
                        aC = window.jsplus_jquery("#jsplus_gallery-thumb-resize-width-" + v(aA)).val();
                        aD = aC.match(/^\d+$/);
                        if (aD != null && aD.length == 1 && aC > 0) {
                            aF += "&tw=" + aC;
                        }
                        aC = window.jsplus_jquery("#jsplus_gallery-thumb-resize-height-" + v(aA)).val();
                        aD = aC.match(/^\d+$/);
                        if (aD != null && aD.length == 1 && aC > 0) {
                            aF += "&th=" + aC;
                        }
                        if (window.jsplus_jquery("#jsplus_gallery-thumb-resize-up-" + v(aA)).hasClass("jsplus_gallery-checked")) {
                            aF += "&te=1";
                        }
                    }
                    if (h == 101 || h == 102 || h == 104 || h == 1 || h == 2) {
                        if (aF.length > 0) {
                            aG.settings.url = ay + aF;
                        }
                    }
                }, FileUploaded: function (aF, aD, aC) {
                    if (aC.response.substr(0, 1) == "!") {
                        aF.trigger("Error", {code: 500, message: aC.response.substr(1), details: "", file: aD});
                    } else {
                        var aE = aC.response;
                        aE = aE.replace(/^<pre>(.*?)<\/pre>$/i, "$1");
                        if (I[I.length - 1] != aE) {
                            I.push(aE.trim());
                        }
                    }
                }, Error: function (aD, aC) {
                    var aE = aC.message;
                    if (aE.toLowerCase().substr("exten") > -1) {
                        aE += "\nAllowed file exntesions: " + allowedExt.replace(",", ", ");
                    }
                    alert(aE);
                }, UploadComplete: function (aC) {
                    if (O(aA, "auto_upload")) {
                        if (I.length > 0) {
                            q(az);
                        } else {
                            aC.destroy();
                            ag(aA, az);
                        }
                    }
                }
            }
        });
        return ax;
    }

    function m() {
        ar.pluploadQueue().destroy();
    }

    function q(ax) {
        ax.getButton("ok").click();
    }

    function at(az, ax) {
        var ay = ax.getElement().getFirst();
        ay.setAttribute("class", ay.getAttribute("class") + " dlg_jsplus_plupload");
    }

    function z(aD) {
        var ax = false;
        var aE = aD.getSelection().getStartElement().$;
        do {
            if (aE.className != null) {
                var aA = aE.className.split(" ");
                if (aA.indexOf("jsplus_gallery") !== -1) {
                    ax = true;
                    break;
                }
            }
            if (aE.parentElement != null && aE.parentElement.tagName.toLowerCase() != "body" && aE.parentElement !== b(aD)) {
                aE = aE.parentElement;
            } else {
                break;
            }
        } while (true);
        if (ax) {
            for (var az = 0; az < I.length; az++) {
                var aC = M(aD, I[az]);
                var aB = CKEDITOR.dom.element.createFromHtml(aC);
                aE.appendChild(aB.$);
            }
        } else {
            var ay = t(aD);
            aj(aD, ay);
        }
    }

    CKEDITOR.plugins.add("jsplus_gallery", {
        lang: ["en", "ru", "es"], init: function (ax) {
            var az = ax.addCommand("jsplus_gallery", new CKEDITOR.dialogCommand("jsplus_gallery-" + v(ax)));
            az.modes = {wysiwyg: 1, source: 0};
            az.canUndo = true;
            var ay = false;
            if (h == 1) {
                if (L(ax, "jsplus_bootstrap_include_bw_icons") === true) {
                    ay = true;
                }
            }
            if (h == 2) {
                if (L(ax, "jsplus_foundation_include_bw_icons") === true) {
                    ay = true;
                }
            }
            if (ay) {
                ax.ui.addButton("jsplus_gallery", {
                    label: o(ax, "jsplus_gallery_title"),
                    command: "jsplus_gallery",
                    icon: this.path + "icons/jsplus_gallery_bw.png"
                });
            } else {
                ax.ui.addButton("jsplus_gallery", {
                    label: o(ax, "jsplus_gallery_title"),
                    command: "jsplus_gallery",
                    icon: this.path + "icons/jsplus_gallery.png"
                });
            }
            CKEDITOR.dialog.add("jsplus_gallery-" + v(ax), function (aA) {
                CKEDITOR.dtd.$removeEmpty["span"] = false;
                return {
                    title: o(aA, "jsplus_gallery_title"),
                    width: 440,
                    minWidth: 440,
                    height: 250,
                    minHeight: 250,
                    resizable: false,
                    onShow: function (aB) {
                        var aC = aB.sender;
                        an(aA, aC);
                    },
                    onOk: function (aB) {
                        var aC = aB.sender;
                        return ab(aA, aC);
                    },
                    contents: [{
                        id: "tab1",
                        label: "tab1",
                        title: "tab1",
                        accessKey: "Q",
                        elements: [{
                            type: "html",
                            html: '<div style="width:100%;margin:0;padding:0;overflow:hidden">' + S(aA) + "</div>"
                        }]
                    }]
                };
            });
            window["jsplus_gallery_upload_dropped_files"] = function (aC, aB, aA, aD) {
                window["jsplus_gallery_upload_dropped_files_value"] = aC;
                window["jsplus_gallery_insert_range"] = aA;
                window["jsplus_gallery_event_target"] = aD;
                aB.openDialog("jsplus_gallery-" + v(aB));
            };
        }
    });
})();