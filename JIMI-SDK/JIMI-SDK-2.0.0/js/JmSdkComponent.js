;
(function (w, d, undefined) {
    function JmSdkComponent(container, data) {
        this.container = container;
        this.data = data;
        this.config = {
            height: 520,
            width: 420
        };
        this.init();
    }

    JmSdkComponent.prototype = {
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
            $(this.container).css({
                width:this.config.width,
                height:this.config.height,
                margin: '10px 0px 0px 0px',
                'box-shadow': '5px 5px 40px rgba(0, 0, 0, 0.5)'
            })
        },
        bindEvent: function () {

        }
    }

    w.JmSdkComponent = JmSdkComponent;
})(window, document)