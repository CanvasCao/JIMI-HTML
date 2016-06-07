/*!
 * lightUpMask, a JavaScriptPlugIn v1.0.2
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-6-7 15:23:58
 */

//1.0.2 瀑布流


;
(function (w, d, $, undefined) {
    function LightUpMask(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;//data里有mask消失以后的hideCallback
        this.ajaxGetData = data.ajaxGetData;
        this.config = {
            imgW: 60
        };
        this.JM = this.jqueryMap = {};
        this.ifShow = false;
        this.ifNeedAjax = true;
        this.init();
    }

    LightUpMask.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
            this.bindWaterfallEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            var that = this;
            $(this.C).html("<div class='lightUpMaskBottom'></div>");
            $(this.C).find('.lightUpMaskBottom').append(" <div class='maskHeader'> <div class='maskClose'>关闭</div> </div>");

            $(this.C).find('.lightUpMaskBottom')
                .append("<div class='maskSectionCon'>" +
                "<div class='maskSectionScroll'></div>" +
                "</div>");

            $(this.C).find('.lightUpMaskBottom').append("<div class='maskInputBox'></div>");

            if (that.data.ifUid) {
                var jimiInputBox = new JimiInputBox($(that.C).find('.maskInputBox')[0], null);
                that.jimiInputBox = jimiInputBox;
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
                'border-bottom': '1px solid #cccccc',
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
                //不能加box-sizing 是因为height会算成198
                'box-sizing': 'border-box',
                height: 200,
                overflow: 'scroll'
            })

            $(this.C).find('.maskSectionScroll').css({})

        },
        bindEvent: function () {
            var that = this;

            $(this.C).click(function () {
                that.hide();
            })

            $(this.C).find('.maskClose').click(function () {
                that.hide();
            })

            //因为 冒泡的情况下点了mask会消失
            $(this.C).find('.lightUpMaskBottom').click(function (e) {
                e.stopPropagation();
            })

            //阻止评论出现时 mask的滚动
            this.C.addEventListener('touchmove', function (e) {
                //e.preventDefault();
                e.stopPropagation();
            }, false)

        },
        bindWaterfallEvent: function () {
            var that = this;
            $(this.C).find('.maskSectionCon').scroll(function () {

                if (!that.ifNeedAjax) {
                    return;
                }

                var top = $(this).scrollTop();
                var conH = $(that.C).find('.maskSectionCon').outerHeight();
                var scrollH = $(that.C).find('.maskSectionScroll').outerHeight();
                //console.log(top);
                //console.log($(that.C).find('.maskSectionCon').outerHeight());
                //console.log($(that.C).find('.maskSectionScroll').outerHeight());

                if (top >= (scrollH - conH)) { //动态高-容器高
                    that.JuHuaOn();
                    that.ajaxGetContent();
                }
            })

        },

        appendContent: function (data) {
            var that = this;
            //appendDom................................................................
            if (data.length > 0) {
                for (i = 0; i < data.length; i++) {
                    var userImgUrl = data[i].userImgUrl || 'img/logo.jpg';

                    $(that.C).find('.maskSectionScroll').append(
                        "<div class='maskSection'>" +
                        "<div class='maskSectionImg'> <img src='" + userImgUrl + "' width='" + 40 + "' /> </div>" +
                        "<div class='maskSectionContent'>" +
                        "<div class='maskSectionUserName'>" + data[i].userName + "</div>" +
                        "<div class='maskSectionCtime'>" + data[i].ctime + "</div>" +
                        "<div class='maskSectionComment'>" + data[i].content + "</div>" +
                        "</div>");
                }

                that.initMaskSectionCSS();
            }
            else {

            }


        },

        initMaskSectionCSS: function () {
            var that = this;
            $(that.C).find('.maskSection').css({
                'box-sizing': 'border-box',
                'padding-left': that.config.imgW,
                position: 'relative',
                'background-color': 'white',
                //'margin-bottom': '5px',
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

        },
        show: function () {
            var that = this;
            this.ifShow = true;//showTag

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
            this.ifShow = false;//showTag
            $(that.C).fadeOut('normal', 'swing');
            $(that.C).find('.lightUpMaskBottom').animate({
                opacity: 0,
                bottom: -300
            }, 'normal', 'swing', that.data.hideCallback);
        },

        clear: function () {
            var that = this;
            $(this.C).find('.maskSectionScroll').html("");
            that.ifNeedAjax=true;

        },

        JuHuaOn: function () {
            var that = this;
            if (!$(that.C).find('#juhua').length) {
                $(that.C).find('.maskSectionScroll').append("<div id='juhua' style='text-align: center;height: 100px;line-height: 100px'>正在加载...</div>")
            }
        },
        JuHuaOff: function () {
            $(this.C).find('#juhua').remove();
        },

        ajaxGetContent: function () {
            var that = this;
            $.ajax({
                type: "post",
                url: 'http://n1.jimi.la/apps_T1/getLightUp.php',
                //url: 'content.json',
                data: that.ajaxGetData,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "jsonpcallback",
                success: function (data) {
                    //console.log(JSON.stringify(data));
                    that.JuHuaOff();

                    console.log(that.ajaxGetData);
                    if (data.data.length == 0) {
                        if (that.ajaxGetData.curPage == 1) {
                            if (!$(that.C).find('#nodata').length) {
                                $(that.C).find('.maskSectionScroll').append("<div id='nodata' style='text-align: center;height: 200px;line-height: 200px'>暂无数据</div>");
                            }
                            that.ifNeedAjax = false;
                            return;
                        }
                        if (that.ajaxGetData.curPage > 1) {
                            if (!$(that.C).find('#nodata').length) {
                                $(that.C).find('.maskSectionScroll').append("<div id='nodata' style='text-align: center;height: 50px;line-height: 50px'>加载完成</div>");
                            }
                            that.ifNeedAjax = false;
                            return;
                        }
                    }
                    else {
                        that.appendContent(data.data);
                        that.ajaxGetData.curPage++;
                    }


                },
                error: function (err) {
                    console.log('ERROR!');
                    console.log(err);
                }
            });
        },

        freshInputBox: function () {
            if (this.jimiInputBox) {
                this.jimiInputBox.fresh();
            }
        }
    }

    w.LightUpMask = LightUpMask;
})(window, document, jQuery)


