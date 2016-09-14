/*!
 * ProductCarousel, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-9-12 10:13:00
 */

;
(function (w, d, $, undefined) {

    'use strict';

    function ProductCarousel(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.imgUrlArr = data.imgUrlArr;
        this.config = {
            cirCurCssJson: {
                background: '#3881E0',
                border: '0px solid black',
            },
            cirCssJson: {
                background: 'white',
                border: '1px solid #ddd',
            }
        };
        this.init();
    }

    ProductCarousel.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            var that = this;

            //适配imgUrlArr 如果不是数组 强行转数组.......................................
            if (Object.prototype.toString.call(that.imgUrlArr) != '[object Array]') {
                if (!that.imgUrlArr) {
                    return;
                }
                var img = that.imgUrlArr;
                that.imgUrlArr = [];
                that.imgUrlArr.push(img);
            }

        },
        createDom: function () {
            var that = this;

            //图片容器 和 底部按钮
            $(this.C).html(" <div class='carouselImgUl'></div>")
            if (that.imgUrlArr.length > 1) {
                $(that.C).append("<div class='carouselBottom'></div>");
            }

            var strImg = '';
            var strBtn = '';
            [].forEach.call(that.imgUrlArr, function (e, i, arr) {
                strImg += "<div class='carouselImgLi'><img src=" + e + " /></div>";
                strBtn += "<span class=carouselCir></span>";
            });

            //绑定图片............................
            $(this.C).find('.carouselImgUl').html(strImg);

            //绑定按钮............................
            strBtn = "<span class='carouselBtnL'><<</span>" + strBtn + "<span class='carouselBtnR'>>></span>"
            $(this.C).find('.carouselBottom').html(strBtn);

        },
        initCSS: function () {
            var that = this;

            $(that.C).find('.carouselImgUl').css({
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
            })
            $(that.C).find('.carouselImgLi').css({
                position: 'absolute',
                height: '100%',
                width: '100%',
                top: '0%',
                left: '0%',
                'box-sizing': 'border-box',
                padding: '15px 10px',
            }).find('img').css({
                height: '100%',
                margin: '0 auto',
                display: 'block',
            })


            $(that.C).find('.carouselBottom').css({
                position: 'absolute',
                bottom: '-14px',
                width: '100%',
                'text-align': 'center',
                'z-index': 10000,
            })

            $(that.C).find('.carouselBtnL, .carouselBtnR').css({
                display: 'inline-block',
                border: '1px solid #ddd',
                'border-radius': '20px',
                padding: '3px 6px',
                'background-color': 'white',
            })


            $(that.C).find('.carouselBtnL').css({
                margin: '0px 8px 0px 0px',
            })

            $(that.C).find('.carouselBtnR').css({
                'margin-left': '8px',
            })

            $(that.C).find('.carouselCir').css({
                margin: '0px 3px',
                display: 'inline-block',
                height: '12px',
                width: '12px',
                border: '1px solid #ddd',
                'border-radius': '50%',
                'background-color': 'white',
                'vertical-align': 'middle',
            })

        },
        bindEvent: function () {
            var that = this;

            var imgIndex = 0;
            var $lis = $(that.C).find('.carouselImgLi');
            var $cirs = $(that.C).find('.carouselCir');
            var lisLen = $lis.length;

            if (lisLen <= 1) {
                return;
            }
            //init.............................................
            $lis.eq(0).css({left: '0%'}).siblings().css({left: '100%'});
            $cirs.eq(0).css(that.config.cirCurCssJson).siblings('.carouselCir').css(that.config.cirCssJson);


            $(that.C).find('.carouselBtnR').click(function () {
                var oldIndex = imgIndex;
                var newIndex = ((oldIndex + 1) == lisLen) ? 0 : (oldIndex + 1);
                $lis.eq(oldIndex).stop().animate({left: '-100%'});
                $lis.eq(newIndex).css({left: '100%'}).stop().animate({left: '0%'});
                imgIndex = newIndex;
                $cirs.eq(imgIndex).css(that.config.cirCurCssJson).siblings('.carouselCir').css(that.config.cirCssJson);

            })

            $(that.C).find('.carouselBtnL').click(function () {
                var oldIndex = imgIndex;
                var newIndex = ((oldIndex - 1) == -1) ? (lisLen - 1) : (oldIndex - 1);
                $lis.eq(oldIndex).stop().animate({left: '100%'});
                $lis.eq(newIndex).css({left: '-100%'}).stop().animate({left: '0%'});
                imgIndex = newIndex;
                $cirs.eq(imgIndex).css(that.config.cirCurCssJson).siblings('.carouselCir').css(that.config.cirCssJson);

            })

        }
    }
    w.ProductCarousel = ProductCarousel;
})
(window, document, jQuery)


