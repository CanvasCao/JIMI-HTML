/*!
 * Honeycomb, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-4-8 10:08:28
 */

;
(function (w, d, $, undefined) {
    function Honeycomb(container, data, ifStagger) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;//主页自己写容器
        this.data = data;
        this.ifStagger = ifStagger;
        this.config = {
            dX: -20,
            dY: 40,
            honeyArr: [
                {left: 80, top: 50},
                {left: 50, top: 0},
                {left: 140, top: 50},
                {left: 110, top: 0},
                {left: 50, top: 100},
                {left: 20, top: 50},
                {left: 200, top: 50},
                {left: 260, top: 50},
                {left: 290, top: 100},
                {left: 170, top: 100},
                {left: 290, top: 0},
                {left: 230, top: 0},
                {left: 320, top: 50},
                {left: 380, top: 50},
                {left: 410, top: 0},
                {left: 350, top: 100},
                {left: 410, top: 100},
            ]
        };
        this.init();
    }

    Honeycomb.prototype = {
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
            $(this.C).html('<div class="honeyCon"></div>'); //这个honeyCon提供por


            if (this.data.feature.length == 0) { //没有标签就杀死父元素
                $(that.C).remove();
                return;
            }
            else {
                for (i = 0; i < this.data.feature.length; i++) {
                    var feature = this.data.feature[i].length > 9 ? this.data.feature[i].substring(0, 9) : this.data.feature[i];
                    $(this.C).find('.honeyCon').append("<div class='honeyComb'>" + "<div class='honeyTxt'>" + feature + "</div>" + "</div>");
                }

            }

        },
        initCSS: function () {
            var that = this;

            $(this.C).css({
                'box-sizing': 'border-box',
                padding: '10px 20px',
            })

            $(this.C).find('.honeyCon').css({
                position: 'relative',
                height: 260,
                overflow: 'scroll',
            })


            /*第一张是 下标是1*/
            $(this.C).find('.honeyCon .honeyComb').css({
                position: 'absolute',
                height: '63',
                width: '57',
                background: 'url("img/honeyComb.png") 0 0',
                'text-align': 'center',
                'word-break': 'break-all',
                display: 'table',
                color: '#3881e0',
                display: 'table',
                opacity: 0

            })

            $(this.C).find('.honeyCon .honeyTxt').css({
                'font-size': '12px',
                display: 'table-cell',
                'vertical-align': 'middle',
                padding: '5px'
            })

        },
        bindEvent: function () {
            var that = this;

            //重设位置
            $(this.C).find('.honeyComb').each(function (i, e) {
                var json = that.config.honeyArr[i];
                if (json) {
                    $(e).css({left: (json.left + that.config.dX), top: (json.top + that.config.dY)});
                }
                else {
                    $(e).hide();//蜂巢超过数量就消失
                }
            })


            if (this.ifStagger) {
                for (i = 0; i < $(this.C).find('.honeyComb').length; i++) {
                    eval(
                        'setTimeout(function(){' +
                        '$(that.C).find(".honeyComb").eq(' + i + ').animate({opacity:1},"normal","swing");' +
                        '},' + i + '*500)'
                    )

                }
            } else {
                $(that.C).find(".honeyComb").css({opacity: 1});
            }


        }
    }
    w.Honeycomb = Honeycomb;
})(window, document, jQuery)


