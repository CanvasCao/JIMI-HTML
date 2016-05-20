/*!
 * lightUpMask, a JavaScriptPlugIn v1.0.1
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-5-19 16:54:40
 */

//1.0.1 增加评论框样式

;
(function (w, d, $, undefined) {
    function LightUpMask(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;//data里有mask消失以后的hideCallback
        this.config = {};
        this.JM = this.jqueryMap = {};
        this.ifShow = false;
        this.init();
    }

    LightUpMask.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {

            if ($('.lightUpMask').length > 0) {
                this.JM.mask = $('.lightUpMask');
                return;
            }

            $('body').append(" <div class='lightUpMask'></div>");
            this.JM.mask = $('.lightUpMask');

            this.JM.mask.html("<div class='maskSectionCon'></div>");


        },
        initCSS: function () {
            var that = this;

            this.JM.mask.css({
                position: 'fixed',
                width: '100%',
                height: '100%',
                left: '0',
                top: '0',
                'background-color': 'rgba(0, 0, 0, 0.7)',
                display: 'none',
                //opacity: '0',
            })
            this.JM.mask.find('.maskSectionCon').css({
                position: 'absolute',
                width: '100%',
                'background-color': 'white',
            })


        },
        bindEvent: function () {
            var that = this;

            this.JM.mask.click(function (e) {
                that.hide();
            })
            this.JM.mask.find('.maskSectionCon').click(function (e) {
                e.stopPropagation()
            })


            //阻止评论出现时 mask的滚动
            this.JM.mask[0].addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false)

        },

        show: function (data) {
            var that = this;
            this.ifShow = true;//showTag


            var contentArr = [];
            for (i = 0; i < data.length; i++) {
                contentArr.push(data[i].content);
            }

            if (contentArr.length > 0) {
                var str = '';
                for (i = 0; i < contentArr.length; i++) {
                    str += "<div class='maskSection'>" + contentArr[i] + "</div>"
                }
                this.JM.mask.find('.maskSectionCon').html(str);
            }
            else {
                this.JM.mask.find('.maskSectionCon').html("<div class='maskSection'>暂无评论</div>");
            }

            this.JM.mask.find('.maskSectionCon').append('<div class="maskSection"><input type="text" style="height:60px"/><button>发送</button></div>')


            //bindCSS
            this.JM.mask.find('.maskSection').css({
                width: '100%',
                'background-color': 'white',
                border: '1px solid #000',
                'box-sizing': 'border-box',
                'height': 40,
            })


            //real show
            setTimeout(function () {
                that.JM.mask.fadeIn('normal', 'swing', that.data.showCallback);
                that.JM.mask.find('.maskSectionCon')
                    .css({opacity: 0, bottom: -300})
                    .animate({opacity: 1, bottom: 0}, 'normal', 'swing');

                $('.light').animate({opacity: 0}, 'fast', 'swing');
            }, 800)
        },

        hide: function () {
            var that = this;
            this.ifShow = false;
            this.JM.mask.fadeOut('normal', 'swing', that.data.hideCallback);
            this.JM.mask.find('.maskSectionCon').animate({opacity: 0, bottom: -300}, 'normal', 'swing');
            $('.light').animate({opacity: 1}, 'fast', 'swing');
        }
    }

    w.LightUpMask = LightUpMask;
})(window, document, jQuery)


