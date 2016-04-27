/*!
 * officialPageHeader, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-4-25 13:34:21
 */

;
(function (w, d, $, undefined) {
    function Header(container, data) {
        this.C = this.container = container;
        this.data = data;
        this.config = {
            curJson: {
                'background-color': '#3881e0',
                color: 'white'
            },
            oriJson: {
                'background-color': 'white',
                color: 'black'
            },
            hrefArr: ['首页', '关于肌秘', '开放数据平台', '媒体开放平台', '专业服务', '加入我们'],
            urlArr: ['index.html', 'about.html', 'open.html', 'javascript:;', 'service.html', 'join_us.html']
        };
        this.init();
    }

    Header.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            $(this.C).html("<div class='hInnerC'></div>");//版心

            $(this.C).find('.hInnerC').html(
                "<div class='company'></div>" +
                "<div class='options'></div>");

            $(this.C).find('.company').html(
                '<div><img src="img/logo.jpg" alt="" width="60" style="margin-top: 10px"/></div>' +
                "<div style='font-size:25px'>肌秘</div>" +
                    //"<div style='border-left: 1px solid #a1a1a1; margin-top:25px;height: 30px;'></div>" +
                "<div style='font-size:12px'>用科学重新定义美丽</div>"
            )


            var str = '';
            for (i = 0; i < this.config.hrefArr.length; i++) {
                str += '<div>' + this.config.hrefArr[i] + '</div>';

            }
            $(this.C).find('.options').html(str);


        },
        initCSS: function () {
            var that = this;


            //this.C就是class=.header的容器 自动fixed zindex=2 高度80
            $(this.C).css({
                position: 'fixed',
                height: '80',
                width: '100%',
                'background-color': 'white',
                'z-index': '2',
                top: '0',
                'box-shadow': '0px 3px 15px rgba(0, 0, 0, 0.1)'
            })


            $(this.C).find('.hInnerC').css({
                width: '1024',
                margin: '0 auto',
                height: '100%',
                'box-sizing': 'border-box'
            })


            $(this.C).find('.company').css({
                float: 'left',
                height: '80'
            })


            $(this.C).find('.company>div').css({
                display: 'block',
                float: 'left',
                height: '80px',
                'line-height': '80px',
                color: '#464646',
                'margin-right': 20
            })


            $(this.C).find('.options').css({
                float: 'right',
                'padding-top': '24px'
            })

            $(this.C).find('.options>div').css({
                'text-align': 'center',
                display: 'block',
                float: 'left',
                width: '75',
                height: '30',
                'line-height': '30px',
                'margin-right': '10px',
                'border-radius': '20px',
                'font-size': '12px',
                padding: '0px 8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease 0s'
            })
        },
        bindEvent: function () {
            var that = this;

            //event...........................................
            //sibs没用
            //$(this.C).find('.options div').click(function () {
            //    $(this).css(that.config.curJson).siblings().css(that.config.oriJson);
            //})

            //点击跳转
            $(this.C).find('.options>div').each(function (i, e) {
                $(e).click(function () {
                    window.location.href = that.config.urlArr[i];
                })
            })

            //媒体开放平台正在开发中......
            $(this.C).find('.options>div').eq(3).css({'position': 'relative'}).append(
                '<div class="mtct">' +
                '<i></i>' +
                '<span>功能开发中...</span>' +
                '</div>'
            )

            $(this.C).find('.mtct').css({
                position: 'absolute',
                height: '52px',
                left: '0',
                'z-index': '100',
                top: '55px',
                background: '#fff url(img/icon03.jpg) 10px center no-repeat',
                border: '1px solid #d6d6d6',
                'border-radius': '10px',
                padding: '0 10px 0 60px',
                display: 'none'
            })


            $(this.C).find('.mtct span').css({
                float: 'left',
                'font-size': '14px',
                'white-space': 'nowrap',
                'line-height': '52px'
            })

            $(this.C).find('.mtct i').css({
                position: 'absolute',
                'z-index': '101',
                width: '30px',
                height: '19px',
                background: 'url(img/icon04.png) 0 0 no-repeat',
                left: '30px',
                top: '-17px'
            })

            $(this.C).find('.options>div').eq(3).hover(function () {
                $(this).find('.mtct').stop().fadeIn('fast')
            }, function () {
                $(this).find('.mtct').stop().fadeOut('fast')
            })


            //init.................................
            this.initCur(0);

        },
        initCur: function (index) {
            var that = this;
            $(this.C).find('.options>div').eq(index).css(that.config.curJson).siblings().css(that.config.oriJson);
        }

    }
    w.Header = Header;
})(window, document, jQuery)


