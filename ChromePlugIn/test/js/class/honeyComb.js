;
(function (w, d, $, undefined) {

    function HoneyComb(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.txt = data.txt || 'jimi.la';
        this.config = {};
        this.JM = this.jQueryMap = {};
        this.init();
    }

    HoneyComb.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            var that = this;
            this.config.id = 'hc' + new Date().getTime();
            this.config.moveDistance = $(that.C).height();
        },
        createDom: function () {
            var that = this;
            $(this.C).append('<div class="honeyComb" id="' + that.config.id + '">' +
                '<div class="honeyTxt">' + that.data.txt + '</div>' +
                '</div>');

            this.JM.honeyComb = $('#' + that.config.id);

        },
        initCSS: function () {
            var that = this;

            //定位让它从底部升起.......................
            this.JM.honeyComb.css({opacity: 0.1, top: that.config.moveDistance})
            this.JM.honeyComb.css({left:150})

            this.JM.honeyComb.css({
                position: 'absolute',
                height: 64,
                width: 58,
                background: 'url("img/honeyComb.png") 0 0',
                'background-size': 'cover',
                'text-align': 'center',
                'word-break': 'break-all',
                display: 'table',
                transform: 'translateY(-50%)'
            });

            this.JM.honeyComb.find('.honeyTxt').css({
                'font-size': '12px',
                display: 'table-cell',
                'vertical-align': 'middle',
                color: 'white',
                padding: 5,
            });
        },
        bindEvent: function () {
            var that = this;
        },
        move: function () {
            var that = this;
            //velocity........................................
            this.JM.honeyComb.css({top:that.config.moveDistance, opacity: 0.1})
              .animate({opacity: 1, top: 0}, 4000, 'swing');

        },
    }
    w.HoneyComb = HoneyComb;
})(window, document, jQuery)


