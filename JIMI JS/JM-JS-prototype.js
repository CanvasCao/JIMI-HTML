/*!
 * JIMI JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * Date: 2016年3月31日 14:38:55
 */
;
(function (w, d,$, undefined) {
    function CAOOOOOO(container, data) {
        this.container = container;
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


