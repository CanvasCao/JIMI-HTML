;
(function (w, d, undefined) {
//version 1.0.1
//2016-4-14 14:24:55

    function AlternateBtn(container, data) {
        this.C=this.container = container;
        this.data = data;
        this.config = {
            jsonUnCurrent:{'color': '#000',background:'#fff'},
            jsonCurrent:{'color': '#fff',background:'rgb(39, 126, 234)'}
    };
        this.init();
    }

    AlternateBtn.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            var str = '';
            str += '<div class="alterTab"><ul>';

            for (i = 0; i < this.data.showTxt.length; i++) {
                str += '<li>' + this.data.showTxt[i] + '</li>'
            }

            str += '</ul></div>';
            $(this.container).html(str)

        },
        initCSS: function () {
            var that=this;

            $(this.C).find('.alterTab').css({
                background: '#fff',
                border: '1px solid #bdbdbd',
                'box-sizing':'border-box',
                'border-radius': '20px',
                display: 'inline-block',
                font:'12px "微软雅黑"',
            })

            $(this.C).find('.alterTab li').css({
                'border-radius': '20px',
                float: 'left',
                padding: '8px 8px'
            }).eq(0).css(that.config.jsonCurrent);

        },
        bindEvent: function () {
            var that=this;

            $(this.C).find('.alterTab li').click(function(){
                $(this).css(that.config.jsonCurrent).siblings().css(that.config.jsonUnCurrent)
            })
        }
    }
    w.AlternateBtn = AlternateBtn;
})(window, document)


