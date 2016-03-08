;
(function (w, d, undefined) {
//version 1.0.0
//create by CAO on 2016/3/7

    function AlternateBtn(container, data) {
        this.container = container;
        this.data = data;
        this.config = {
            jsonUnCurrent:{'color': '#000',background:'#fff'},
            jsonCurrent:{'color': '#fff',background:'#0e93ff'}
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

            $('.alterTab').css({
                background: '#fff',
                border: '1px solid #bdbdbd',
                'border-radius': '20px',
                padding: '2px 3px',
                display: 'inline-block'
            })

            $('.alterTab li').css({
                'border-radius': '20px',
                float: 'left',
                padding: '5px 10px'
            }).eq(0).css(that.config.jsonCurrent);

        },
        bindEvent: function () {
            var that=this;

            $('.alterTab li').click(function(){
                $(this).css(that.config.jsonCurrent).siblings().css(that.config.jsonUnCurrent)
            })
        }
    }
    w.AlternateBtn = AlternateBtn;
})(window, document)


