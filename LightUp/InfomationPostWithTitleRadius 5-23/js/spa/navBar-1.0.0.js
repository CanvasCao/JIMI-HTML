/*!
 * navBar, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-5-18 12:46:49
 */

;
(function (w, d, $, undefined) {
    function NavBar(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;//是数据库返的json
        this.config = {};
        this.init();
    }

    NavBar.prototype = {
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
            $(this.C).append("<div class='navBar'></div>");

            $(this.C).find('.navBar').append("<img class='navImg' src='" +'img/c.png' + "' />")
            $(this.C).find('.navBar').append("<div class='navText'>" + '成分分布'+ "</div>")
            $(this.C).find('.navBar').append("<img class='navArrow' src='" + 'img/arrow.png' + "' height='12px'/>");
            $(this.C).find('.navBar').append("<a href="+ that.data.jimiUrl+"></a>")
        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.navBar').css({
                'margin-top': 10,
                padding: '10px 0',
                height: '20px',
                'border-bottom': '3px solid #f4f4f4',
                'border-top': '3px solid #f4f4f4',
                'position': 'relative',
            })


            $(this.C).find('.navImg').css({
                float: 'left',
                'margin-right': '10px',
            })


            $(this.C).find('.navText').css({
                float: 'left',
            })


            $(this.C).find('.navArrow').css({
                float: 'right',
                'margin-top': '5px',
            })

            $(this.C).find('.navBar a').css({
                position:'absolute',
                width:'100%',
                height:'100%',
                top:0,
                left:0,
            })

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.NavBar = NavBar;
})(window, document, jQuery)


