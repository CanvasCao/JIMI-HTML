;
(function (w, d, $, undefined) {

    function HoneyCombManagerr(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.config = {};
        this.init();
    }

    HoneyCombManagerr.prototype = {
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
            var that = this;
            //.honeyComb {
            //    position: absolute;
            //    transform: translateY(-50%);
            //}
        },
        bindEvent: function () {
            var that = this;
        },
        move: function () {

        },
    }
    w.HoneyCombManagerr = HoneyCombManagerr;
})(window, document, jQuery)


