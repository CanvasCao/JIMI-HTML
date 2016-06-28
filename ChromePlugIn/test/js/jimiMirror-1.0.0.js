/*!
 * jimiMirror, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-6-28 18:56:28
 */

;
(function (w, d, $, undefined) {

    //'use strict';
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

            $(this.C).show();
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
            this.JM.honeyComb.css({left: 150})

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
            this.JM.honeyComb.css({top: that.config.moveDistance, opacity: 0.1})
                .animate({opacity: 1, top: 0}, 4000, 'swing');

        },
    }

    function JimiMirror(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.config = {};
        this.init();
    }

    JimiMirror.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            $(this.C).html("<div class='jimiMirrorTop'></div> <div class='jimiMirrorBottom'></div><div class='jimiMirrorClose'>×</div>");
            $(this.C).find('.jimiMirrorTop').html('<div class="jimiMirrorWaveCon"></div><div class="jimiMirrorHoneyCombCon"></div>')
            //$(this.C).find('.jimiMirrorWaveCon').html('<img src="img/wave1.png" width="100%"/>' +
            //    '<img src="img/wave2.png" width="100%"/>' +
            //    '<img src="img/wave3.png" width="100%"/>')

            $(this.C).find('.jimiMirrorBottom').html("<div class='qrCode'><img src='img/qr.png'/></div>" +
                "<div class='qrTxt'>想要了解更多功能请下载肌秘APP<br>肌秘提供专业的化妆品对比，化妆品资讯等功能</div>"
            )

        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.jimiMirrorClose').css({

                position: 'absolute',
                width: '20px',
                height: '20px',
                top: '-15px',
                right: '-15px',
                color: '#3881e0',
                background:'white',
                border: '3px solid #3881e0',
                'border-radius': '50%',
                'line-height': '20px',
                'text-align': 'center',
                'font-weight': 'bold',
                cursor: 'pointer',

            })

            $(this.C).find('.jimiMirrorTop').css({
                height: '250px',
                'background': '#3881e0',
                'background-image': '-webkit-linear-gradient(to bottom, #3881e0, #89bbff)',
                'background-image': 'linear-gradient(to bottom, #3881e0, #89bbff)',
                'border-top-left-radius': '20px',
                'border-top-right-radius': '20px',
                overflow: 'hidden',
                position: 'relative',
            })

            $(this.C).find('.jimiMirrorWaveCon img').css({
                display: 'block',
                position: 'absolute',
                bottom: '-40px',
                opacity: '0.5',
            })


            $(this.C).find('.jimiMirrorHoneyCombCon').css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
            })

            $(this.C).find('.jimiMirrorBottom').css({
                'background-color': 'white',
                height: '250px',
                'border-bottom-left-radius': '20px',
                'border-bottom-right-radius': '20px',
            })


            $(this.C).find('.qrCode').css({
                'box-sizing': 'border-box',
                border: '1px solid #dbf7ff',
                width: '120px',
                height: '120px',
                margin: '30px auto',
            }).find('img').css({
                width: '118px',
                display: 'block',
            })

            $(this.C).find('.qrTxt').css({
                'text-align': 'center',
            })

        },
        bindEvent: function () {
            var that = this;

            $(this.C).find('.jimiMirrorClose').click(function () {
                $(that.C).hide();
            });
        },
        show: function () {
            $(this.C).show();
        },
        addHoneyComb: function () {
            var hc = new HoneyComb('.jimiMirrorHoneyCombCon', {txt: '防晒'});
            return hc;
        },
    }
    w.JimiMirror = JimiMirror;
})(window, document, jQuery)


