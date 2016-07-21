;
(function (w, d, $, undefined) {
    function AlertCon(container, data) {
        this.C = this.container = container;
        this.data = data;
        //console.log(JSON.stringify(data))
        this.config = {};
        this.JM = this.jQueryMap = {};
        this.init();
    }

    AlertCon.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            //events.....................................................
            var that = this;

            this.config.alertJson = {
                '保湿型成分': '提供皮肤保湿、锁水功效的成分',
                '功效型成分': '在皮肤或头发上起生理功效,如美白、修复、抗氧化等成分',
                '防晒型成分': '有效阻挡紫外线，为皮肤提供屏障，起防护作用的成分',
                '剂型需求': '改善产品质地质感，维持产品稳定的成分,如溶剂成分、防腐剂成分等',
                '慎用成分': '该成分有一定刺激性，敏感肌肤谨慎选择',
                '正常成分': '正常情况下对皮肤没有安全风险的成分',
            };
        },
        createDom: function () {
            //拼加组件

            $(this.C).html('<div class="alert">' +
                '<div class="title1"></div>' +
                '<div class="title2"></div>' +
                '<div class="close">关闭</div>' +
                '</div>'
            )

        },
        initCSS: function () {
            var that = this;


            $(this.C).css({
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                'background-color': 'rgba(0, 0, 0, 0.2)',
                display: 'none',
            })

            $(this.C).find('.alert').css({

                width: '80%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                'text-align': 'center',
                'background-color': 'white',
                'font-size': '12px',
                padding: '10px',
                'box-sizing': 'border-box',
            })


            $(this.C).find('.title1').css({
                color: '#8b8b8b',

            })


            $(this.C).find('.title2').css({
                'font-size': '14px',
                margin: '8px 0',
            })

            $(this.C).find('.close').css({
                height: '25px',
                width: '100px',
                'border-radius': '20px',
                'background-color': '#018cff',
                margin: '0 auto',
                'line-height': '25px',
                color: 'white',
            })


        },
        bindEvent: function () {
            var that = this;

            $(that.C).find('.close').click(function () {
                $(that.C).fadeOut('fast');
            })
        },

        show: function (textDes) {
            var that = this;


            $(this.C).find('.title1').html(textDes);
            $(this.C).find('.title2').html(that.config.alertJson[textDes]);
            $(this.C).fadeIn('fast');
        },
        getDes: function (textDes) {
            var that = this;
            return that.config.alertJson[textDes];
        },
    }
    w.AlertCon = AlertCon;
})(window, document, jQuery)


