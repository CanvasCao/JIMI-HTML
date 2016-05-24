/* JimiInputBox, a JavaScriptPlugIn v2.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-5-24 11:31:08
 */


;
(function (w, d, $, undefined) {
    function JimiInputBox(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;//主页自己写容器
        this.data = data;
        this.config = {
            winW: $(window).width(),
            winH: $(window).height(),
        };
        this.JM = this.jqueryMap = {};
        this.hasFocused = false;
        this.btnDisable = false;


        this.type = 1;
        this.paragraph = 0;
        this.sentence = 0;
        this.content = '这是一条评论';
        this.uid = 10450;
        this.rid = 469;

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
            var that = this;
            $(this.C).html('<div class="jimiInputBoxImg"></div><div class="jimiInputBoxText"></div>');

            $(this.C).find('.jimiInputBoxImg').html('<img src="img/logo.jpg" alt=""/></div>')
            $(this.C).find('.jimiInputBoxText').html(' <input type="text" maxlength="40" value="随便说点什么"/>' +
                '<div class="jimiInputBoxSubmit">微评</div>');


        },
        initCSS: function () {
            var that = this;


            $(this.C).css({
                position: 'relative',
                height: '50px',
                'box-sizing': 'border-box',
                padding: '10px 10px 5px 40px',
                'background-color': 'white',
                'font-size': '16px',
            })
            $(this.C).find('.jimiInputBoxImg').css({
                position: 'absolute',
                top: '5px',
                left: '0',
                width: '40px',
                height: '40px',
                /*border: 1px solid #000;*/
                'box-sizing': 'border-box',
                padding: '5px',
            })


            $(this.C).find('.jimiInputBoxImg img').css({
                width: '30px',
                'border-radius': '50%',
            })

            $(this.C).find('.jimiInputBoxText').css({
                'box-sizing': 'border-box',
                'border-radius': '20px',
                width: '100%',
                height: '30px',
                'background-color': '#eee',
                position: 'relative',
            })


            $(this.C).find('.jimiInputBoxText input').css({
                'background-color': '#eee',
                color: 'gray',
                height: '30px',
                'margin-left': '15px',
            })


            $(this.C).find('.jimiInputBoxSubmit').css({
                position: 'absolute',
                right: '10px',
                top: '5px',
                'border-radius': '30px',
                'font-size': '12px',
                'box-sizing': 'border-box',
                padding: '2px 6px',
                color: 'white',
                'background-color': '#3982e1',
            })

        },
        bindEvent: function () {
            var that = this;


            //input的focus和blur事件
            $(this.C).find('input').focus(function () {
                if (that.hasFocused == false) {
                    that.hasFocused = true;
                    $(this).val('').css({color: 'black'});
                }

            }).blur(function () {

            });

            //发送按钮的事件
            $(this.C).find('.jimiInputBoxSubmit').click(function () {


                console.log(that.btnDisable)
                var txt = $(that.C).find('input').val();
                if (txt == '' || that.hasFocused == false) {
                    return;
                }
                else {

                    if (this.btnDisable == true) {
                        return;
                    }
                    else {
                        that.btnDisabled();
                        setTimeout(function () {
                            that.btnAbled();
                        }, 2000)


                        //ajax
                        var txt = $(that.C).find('input').val();
                        insertContentAjax(txt);

                        //clearInput
                        $(that.C).find('input').val("");


                    }

                }

                //发送以后清空

            });
        },

        fresh: function () {
            var that = this;
            $(that.C).find('input').css({color: 'gray'}).val('随便说点什么');
            that.hasFocused = false;
        },
        btnDisabled: function () {
            var that = this;

            $(that.C).find('.jimiInputBoxSubmit').css('background', 'gray');
            that.btnDisable = true;
        },
        btnAbled: function () {
            var that = this;

            $(that.C).find('.jimiInputBoxSubmit').css('background', '#3982e1');
            that.btnDisable = false;
        },

    }

    w.JimiInputBox = JimiInputBox;
})(window, document, jQuery)


