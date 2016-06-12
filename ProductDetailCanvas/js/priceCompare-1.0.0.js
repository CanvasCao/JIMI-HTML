/*!
 * PriceCompare, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-6-12 13:52:21
 */

;
(function (w, d, $, undefined) {

    'use strict';


    function PriceCompare(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data; //data是个对象数组
        this.num = data.length;
        this.config = {
            secMarginRight: 15,
            imgW: 60,
        };
        this.init();
    }

    PriceCompare.prototype = {
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

            if (!this.data || this.data.length == 0) {
                $(that.C).remove();
                return;
            }

            $(this.C).html('<div class="priceCon"></div>');

            var str = '';
            [].forEach.call(that.data, function (e, i, arr) {
                str += "<div class='priceSec'>" +
                    "<img src='" + e.logoIcon + "'/>" +
                    "<div class='priceTxt'>" + '￥' + e.spprice + "</div>" +
                    "</div>"
            })

            $(this.C).find('.priceCon').html(str);

        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.priceCon').css({

                display: 'inline-block',
                width: that.num * (that.config.imgW + that.config.secMarginRight),
            })

            $(this.C).find('.priceSec').css({
                display: 'inline-block',
                float: 'left',
                'margin-right': that.config.secMarginRight,
            }).find('img').css({
                display: 'block',
                width: that.config.imgW,
            })

            $(this.C).find('.priceTxt').css({
                'text-align': 'center'
            })


        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.PriceCompare = PriceCompare;
})(window, document, jQuery)


