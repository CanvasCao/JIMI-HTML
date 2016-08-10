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
                '保湿型成分': '具有保湿功能的成分。',
                '功效型成分': '功效型成分指为了达到某种目的（如美白、角质调理等）添加在化妆品中的功能性成分，添加量一般较低。',
                '防晒型成分': '具有防晒功能的成分，包括物理防晒和化学防晒成分。',
                '剂型需求': '剂型需求一般指溶剂或使化妆品性状稳定（不分层、不受污染、不失去活性）的成分，与产品功效无关。比如防腐剂，它的添加是为了防止微生物污染，从而使化妆品在保存期间内性状稳定不会失活。',
                '慎用成分': '慎用成分指可能刺激或引起过敏的成分。',
                '正常成分': '正常成分指非刺激性、无致敏性的成分。',
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


