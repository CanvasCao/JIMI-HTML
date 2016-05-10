/*!
 * JimiSdk, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-4-8 10:08:28
 */

;
(function (w, d,$, undefined) {
    function CAOOOOOO(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.config = {};
        this.init();
    }

    CAOOOOOO.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {

        },
        initCSS: function () {
            var that=this;

        },
        bindEvent: function () {
            var that=this;
        }
    }
    w.CAOOOOOO = CAOOOOOO;
})(window, document,jQuery)


