;(function(w,d,undefined){
    function JMSDK(container, data) {
        this.container = container;
        this.data = data;
        this.config = {};
        this.init();
    }

    JMSDK.prototype={
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

        },
        bindEvent: function () {

        }
    }

    w.JMSDK = JMSDK;
})(window,document)