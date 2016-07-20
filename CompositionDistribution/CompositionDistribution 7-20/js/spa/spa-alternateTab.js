;
(function (w, d, $, undefined) {


    function AlternateTab(container, data) {
        this.C = this.container = container;
        this.data = data;
        this.txtArray = data.txtArray;
        this.config = {};
        this.init();
    }

    AlternateTab.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
        },
        createDom: function () {
            var that = this;

            var str = '';
            [].forEach.call(that.txtArray, function (e, i, arr) {
                if (i > 1) {
                    return;
                }
                str += '<div class="alterDiv"><span class="alterSpan">' + e + '</span></div>';
            })
            $(this.C).html(str);
        },
        initCSS: function () {
            var that = this;

            $(this.C).css({
                height: 40,
                'box-shadow': '0px -1px 1px rgba(0,0,0,0.3)',
            })
            $(this.C).find('.alterDiv').css({
                width: '50%',
                float: 'left',
                'box-sizing': 'border-box',
                height: 40,
                'line-height': '40px',
                'text-align': 'center',
                backgroundColor: '#f1f1f1'
            }).css({
                'border-right': '1px solid #ddd'
            })

            $(this.C).find('.alterSpan').css({
                height: 40,
                display: 'inline-block',
                'box-sizing': 'border-box',
            });

        },
        bindEvent: function () {
            var that = this;

            $(this.C).find('.alterDiv').click(function () {
                var index = $(this).index();

                $(that.C).find('.alterSpan').css({'border-bottom': 'none',})
                $(this).find('.alterSpan').css({'border-bottom': '2px solid #3982e1'});
            });
            $(this.C).find('.alterDiv').eq(0).click();
        }
    }
    w.AlternateTab = AlternateTab;
})(window, document, jQuery)


