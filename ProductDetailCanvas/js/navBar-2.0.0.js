/*!
 * navBar, a JavaScriptPlugIn v2.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-6-11 18:40:29
 */

;
(function (w, d, $, undefined) {

    'use strict';


    function NavBar(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
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

            $(this.C).html('<div class="navCon"></div>')
            $(this.C).find('.navCon').html('<img class="navImg" src="' + that.data.navImg + '"/> <div class="navTxt">' + that.data.navTxt + '</div>');
        },
        initCSS: function () {
            var that = this;

            $(this.C).css({
                'border-bottom': '1px solid #f4f4f4',
                'border-top': '5px solid #f4f4f4',
                'padding-bottom':'10px',
                'padding-top':'10px',
            })

            $(this.C).find('.navCon').css({
                display: 'inline-block',
            })
            $(this.C).find('.navImg').css({
                display: 'inline-block',
                float: 'left',
                'margin-right': '20px',
            })

            $(this.C).find('.navTxt').css({
                display: 'inline-block',
                float: 'left',
            })

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.NavBar = NavBar;
})(window, document, jQuery)


