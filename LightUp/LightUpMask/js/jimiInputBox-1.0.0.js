/*!
 * JimiInputBox, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-5-20 16:38:14
 */


;
(function (w, d, $, undefined) {
    function JimiInputBox(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;//data里有mask消失以后的hideCallback
        this.config = {};
        this.JM = this.jqueryMap = {};
        this.ifShow = false;
        this.init();
    }

    JimiInputBox.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            $(this.C).append("<div class='jimiInputBox'></div>");

            $(this.C).find('.jimiInputBox').html(
                "<div class='imgCon'></div>" +
                "<div class='txtCon'></div>"
            );

            $(this.C).find('.imgCon').html('<img src="img/logo.jpg" alt=""/>');
            $(this.C).find('.txtCon').html('<input type="text" maxlength="25" value="随便说点什么"/>' +
                '<div class="submit">微评</div>');



            $(this.C).find('.jimiInputBox').css({
                width: winW,
                height: '40px',
                'box-sizing': 'border-box',
                padding: '5px',
                'background-color': '#4b85fd',
//                    opacity: '0.6',
                'font-size': '16px',
            });


            $(this.C).find('.imgCon').css({
                float: 'left',
            })

            $(this.C).find('.imgCon img').css({
                width: '30px',
                display: 'block',
                'border-radius': '50%',
            });

            $(this.C).find('.txtCon').css({
                float: 'right',
                'background-color': '#e6efff',
                'border-radius': '20px',
                width: '150px',
                height: '30px',
                position: 'relative',
            });


            $(this.C).find('.txtCon input').css({
                'background-color': '#bcc3d0',
                'background-color': '#e6efff',

                color: 'gray',
                height: '30px',
                'margin-left': '15px',

            });

            $(this.C).find('.txtCon .submit').css({
                position: 'absolute',
                right: '10px',
                top: '5px',
                border: '1px solid #000',
                'border-radius': '30px',
                'font-size': '12px',
                'box-sizing': 'border-box',
                padding: '1px 5px',
            });

            $(this.C).find('.imgCon').css({width: 30});
            $(this.C).find('.txtCon').css({width: (winW - 10 - 30 - 5)});

            //input的focus和blur事件
            $(this.C).find('.txtCon input').focus(function () {
                if ($(this).val() == '随便说点什么') {
                    $(this).val('').css({color: 'black'});
                }
            }).blur(function () {
                if ($(this).val() == '') {
                    $(this).val('随便说点什么').css({color: 'gray'});
                }
            });

            //发送按钮的事件
            $(this.C).find('.submit').click(function () {
                var txt = $('.txtCon input').val();

            });



        },
        initCSS: function () {
            var that = this;

        },
        bindEvent: function () {
            var that = this;
        },

    }

    w.JimiInputBox = JimiInputBox;
})(window, document, jQuery)


