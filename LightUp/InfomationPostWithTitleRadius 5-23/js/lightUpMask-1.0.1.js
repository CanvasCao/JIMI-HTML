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
        this.config = {
            imgW: 60
        };
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
            var that = this;
            $(this.C).html("<div class='lightUpMaskBottom'></div>");
            $(this.C).find('.lightUpMaskBottom').append(" <div class='maskHeader'> <div class='maskClose'>关闭</div> </div>");
            $(this.C).find('.lightUpMaskBottom').append("<div class='maskSectionCon'></div>");
            $(this.C).find('.lightUpMaskBottom').append("<div class='maskInputBox'></div>");

            if(that.data.ifUid){
                var jimiInputBox = new JimiInputBox($(that.C).find('.maskInputBox')[0], null);
                this.jimiInputBox = jimiInputBox;
            }

        },
        initCSS: function () {
            var that = this;

            $(this.C).css({//mask就是后面的背景
                position: 'fixed',
                width: '100%',
                height: '100%',
                left: '0',
                top: '0',
                'background-color': 'rgba(0, 0, 0, 0.7)',
                display: 'none',
                'z-index': 2
                //opacity: '0',
            });

            $(this.C).find('.lightUpMaskBottom').css({
                position: 'absolute',
                width: '100%',
                'background-color': 'white',
                //bottom 0
            });


            $(this.C).find('.maskHeader').css({
                height: '40px',
                'background-color': 'white',
            })

            $(this.C).find('.maskClose').css({
                float: 'right',
                width: '50px',
                'margin-top': '12px',
                'font-size': '12px',
            })

            $(this.C).find('.maskSectionCon').css({
                'background-color': 'white',
                padding: '0 5px',
                'border-top': '1px solid #cccccc',
                'border-bottom': '1px solid #cccccc',
            })

        },
        bindEvent: function () {
            var that = this;

            $(this.C).click(function (e) {
                that.hide();
            })

            $(this.C).find('.maskClose').click(function () {
                that.hide();
            })

            $(this.C).find('.lightUpMaskBottom').click(function (e) {
                e.stopPropagation(); //因为 冒泡的情况下点了mask会消失
            })

            //阻止评论出现时 mask的滚动
            this.C.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false)

        },

        show: function (data) {
            var that = this;
            this.ifShow = true;//showTag

            //appendDom................................................................
            $(this.C).find('.maskSectionCon').html("");

            if (data.length > 0) {
                for (i = 0; i < data.length; i++) {
                    var userImgUrl = data[i].userImgUrl || 'img/logo.jpg';

                    $(that.C).find('.maskSectionCon').append(
                        "<div class='maskSection'>" +
                        "<div class='maskSectionImg'> <img src='" + userImgUrl + "' width='" + 40 + "' /> </div>" +
                        "<div class='maskSectionContent'>" +
                        "<div class='maskSectionUserName'>" + data[i].userName + "</div>" +
                        "<div class='maskSectionCtime'>" + data[i].ctime + "</div>" +
                        "<div class='maskSectionComment'>" + data[i].content + "</div>" +
                        "</div>");
                }
            }
            else {
                $(that.C).find('.maskSectionCon').append("<div style='text-align: center;height: 100px;line-height: 100px'>暂无评论</div>")
            }


            //bindCSS
            initMaskSectionCSS();
            function initMaskSectionCSS(){
                $(that.C).find('.maskSection').css({
                    'box-sizing': 'border-box',
                    'padding-left': that.config.imgW,
                    position: 'relative',
                    'background-color': 'white',
                    'margin-bottom': '5px',
                })

                $(that.C).find('.maskSectionImg').css({
                    float: 'left',
                    height: that.config.imgW,
                    width: that.config.imgW,
                    //border: '1px solid #000',
                    'box-sizing': 'border-box',
                    'padding': 10,
                    position: 'absolute',
                    top: '10px',
                    left: '0',
                })

                $(that.C).find('.maskSectionContent').css({
                    width: '100%',
                    padding: '10px 15px',
                    'box-sizing': 'border-box',
                })


                $(that.C).find('.maskSectionUserName').css({
                    'font-size': '16px',
                    color: '#058eff',
                    //'margin-bottom': '5px',
                })


                $(that.C).find('.maskSectionCtime').css({
                    'font-size': '12px',
                    color: '#747474',
                    'margin-bottom': '5px',
                })


                $(that.C).find('.maskSectionComment').css({
                    'font-size': '12px',
                })

            }


            //real show
            setTimeout(function () {
                that.freshInputBox();
                $(that.C).fadeIn('normal', 'swing');
                $(that.C).find('.lightUpMaskBottom')
                    .css({opacity: 0, bottom: -300})
                    .animate({opacity: 1, bottom: 0}, 'normal', 'swing', that.data.showCallback);

            }, 800)
        },

        hide: function () {
            var that = this;
            this.ifShow = false;
            $(that.C).fadeOut('normal', 'swing');
            $(that.C).find('.lightUpMaskBottom').animate({opacity: 0, bottom: -300}, 'normal', 'swing', that.data.hideCallback);
        },

        freshInputBox: function () {
            if(this.jimiInputBox){
                this.jimiInputBox.fresh();
            }
        }
    }

    w.LightUpMask = LightUpMask;
})(window, document, jQuery)


