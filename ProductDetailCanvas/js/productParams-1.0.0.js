/*!
 * productparams, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-6-11 19:12:28
 */

;
(function (w, d, $, undefined) {

    'use strict';


    function ProductParams(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.config = {};
        this.init();
    }

    ProductParams.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            this.config.rowLeftArr = ['品名', '容量', '别名', '品牌'];
        },
        createDom: function () {
            var that = this;

            var str = '';
            [].forEach.call(that.config.rowLeftArr, function (e, i, arr) {
                str += '<div class="row">' +
                    '<div class="rowL">' + e + '</div>' +
                    '<div class="rowR"></div>' +
                    '</div>'
            });

            $(this.C).html(str);

            var $rowR = $(this.C).find('.rowR');
            $rowR.eq(0).html(that.data.chineseName);
            $rowR.eq(1).html(that.data.volume || '暂无数据');
            $rowR.eq(2).html(that.data.alias || '无');
            $rowR.eq(3).html(that.data.brand);

        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.row').css({
                'margin-bottom': '7px',
                display: 'table',
                width: '100%',
            })

            $(this.C).find('.rowL').css({
                display: 'table-cell',
                width: '20%',
                color: '#444',
            })

            $(this.C).find('.rowR').css({
                display: 'table-cell',
                width: '70%',
                'word-break': 'break-all',
                color: '#999',
            })

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.ProductParams = ProductParams;
})(window, document, jQuery)


