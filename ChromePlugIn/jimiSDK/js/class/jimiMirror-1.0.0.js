/*!
 * jimiMirror, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-6-28 18:56:28
 */
(function (w, d, $, undefined) {
    //'use strict';
    function HoneyComb(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.txt = data.txt || 'jimi.la';
        this.config = {};
        this.JM = this.jQueryMap = {};
        this.init();
        this.move();
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
            this.config.moveDistance = 500;
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
                background: 'url("' + jimiHost + '/img/honeyComb.png") 0 0',
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

        moveOnce:function(){
            var that = this;
            //velocity........................................
            this.JM.honeyComb.css({top: that.config.moveDistance, opacity: 0.1})
                .animate({opacity: 1, top: 0}, 4000, 'swing');
        },
        move: function () {
            var that = this;


            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame;
            var startTime = new Date().getTime();
            var FPS = 0.25;
            var timer = null;


            function move() {
                var curTime = new Date().getTime();
                var diff = curTime - startTime;
                if (diff >= 5000) {
                    startTime = new Date().getTime();
                    that.moveOnce();
                }
                timer = requestAnimationFrame(move);
            }

            that.moveOnce();
            move();
        },
    }

    function JimiMirror(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.honeyCombManager = [];
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

            $(this.C).find('.jimiMirrorBottom').html("<div class='qrCode'><img /></div>" +
                "<div class='qrTxt'>想要了解更多功能请下载肌秘APP<br>肌秘提供专业的化妆品对比，化妆品资讯等功能</div>"
            );


            var str = '';
            for (i = 0; i < 3; i++) {
                str += '<img width="100%"/>';
            }
            $(this.C).find('.jimiMirrorWaveCon img').each(function (i, e) {
                $(e).attr({src: jimiHost + '/img/wave' + (i + 1) + '.png'});
            })

            $(this.C).find('.qrCode img').attr({src: jimiHost + '/img/qr.png'})

        },
        initCSS: function () {
            var that = this;

            $(this.C).css({top: that.data.top});

            $(this.C).find('.jimiMirrorClose').css({

                position: 'absolute',
                width: '20px',
                height: '20px',
                top: '-15px',
                right: '-15px',
                color: '#3881e0',
                background: 'white',
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
                'box-sizing': 'border-box',
                padding: '10px',
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
                $(that.C).fadeOut();
            });
        },
        show: function (arr) {
            var that = this;
            [].forEach.call(arr, function (e, i, arr) {
                var $container = $(that.C).find('.jimiMirrorHoneyCombCon');
                var hc = new HoneyComb($container, {txt: e});
                that.honeyCombManager.push(hc);
            })

            $(this.C).fadeIn();
        },
        clear: function () {
            var that = this;
            $(that.C).find('.jimiMirrorHoneyCombCon').html('');
            that.honeyCombManager = [];
        },
    }
    w.JimiMirror = JimiMirror;
})(window, document, $)

