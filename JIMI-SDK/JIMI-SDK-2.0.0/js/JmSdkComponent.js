;
(function (w, d, undefined) {
    function JmSdkComponent(container, data,ajaxJson) {
        //console.log(new Date().getTime())
        this.C = this.container = container;
        this.data = data;
        this.ajaxJson=((typeof ajaxJson)=='string')?JSON.parse(ajaxJson):ajaxJson;
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
            $(this.C).html("<div class='jimi-arrow'></div><div class='jimi-scrOut'></div>")
            $(this.C).find('.jimi-scrOut').html("<div class='jimi-scrIn'></div>")
            $(this.C).find('.jimi-scrIn').html("<div class='jimi-top'></div>" + "<div class='content'></div>" + "<div class='content'></div>" + "<div class='content'></div>");//有三块内容 代码写死了
            $(this.C).find('.jimi-top').html("<div class='jimi-topTxt'>温碧泉</div>")

            //成分分布 产品参数 标签

        },
        initCSS: function () {
            //父容器设置宽高
            $(this.C).css({
                width: this.config.width,
                height: this.config.height,
                margin: '10px 0px 0px 0px',
                'box-shadow': '5px 5px 40px rgba(0, 0, 0, 0.5)'
            })

            $(this.C).find('.jimi-arrow').css({
                position: 'absolute',
                width: '17px',
                height: '11px',
                left: '15px',
                top: '-11px',
                background: 'url(images/icon1.png) no-repeat'
            })

            $(this.C).find('.jimi-scrOut').css({
                'background-color': '#0093ff',
                width: this.config.width,
                height: this.config.height,
                overflow: 'hidden'
            })

            $(this.C).find('.jimi-scrIn').css({
                'background-color': '#fff',
                width: this.config.width + 30,
                height: this.config.height,
                'overflow-y': 'auto'
            })

            $(this.C).find('.jimi-top').css({
                height: '60px',
                background: '#2BA5DD url(images/icon3.png) no-repeat right 40px center'
            })

            $(this.C).find('.jimi-topTxt').css({
                'font-weight': 'bold',
                'font-size': '14px',
                color: '#fff',
                'line-height': '60px',
                'padding-left': '15px'
            })
        },
        bindEvent: function () {



            //console.log(new Date().getTime())
        }
    }

    w.JmSdkComponent = JmSdkComponent;
})(window, document)