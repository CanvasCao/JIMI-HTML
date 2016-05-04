/*!
 * slotMachine, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-5-4 14:21:41
 */

;
(function (w, d,$, undefined) {
    function SlotMachine(container, data) {
        this.container = container;
        this.data = data;
        this.config = {};
        this.init();
    }

    SlotMachine.prototype = {
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
    w.SlotMachine = SlotMachine;
})(window, document,jQuery)


