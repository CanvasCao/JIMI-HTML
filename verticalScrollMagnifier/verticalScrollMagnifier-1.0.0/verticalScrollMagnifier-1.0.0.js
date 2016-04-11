/*!
 * verticalScrollMagnifier, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-4-8 11:42:23
 */


//var data = {
//    title: ['生产国', '规格', '单价', '适应场景', '致痘性'],
//    pro1: ['日本', '125ml', '￥220', '淡妆或防晒', '一般致痘性'],
//    pro2: ['日本', '125ml', '￥220', '淡妆或防晒', '一般致痘性']
//};

;
(function (w, d, $, undefined) {
    function VerticalScrollMagnifier(container, data, newConfig) {
        this.C = this.container = container;
        this.data = data;
        this.newConfig = newConfig;
        this.config = {
            width: 400,
            height: 100,
            showLimit: 5,
            totalNum: 0,
            colorArr: ['#ff794c', '#f2ae24', '#8cb33e', '#62b3ac', '#6286b3'],
            duration: 0.5, //单位是秒
            circleMargin: 20
        };
        this.init();
    };

    VerticalScrollMagnifier.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            var that = this;
            for (k in that.newConfig) {
                that.config[k] = that.newConfig[k];
            }
            //console.log(that.config);
            //更新总个数
            this.config.totalNum = this.data.title.length;

        },
        createDom: function () {
            $(this.C).html('<div class="verticalScrollMagnifier"></div>');
            $(this.C).find('.verticalScrollMagnifier').html('<ul></ul>');

            var str = '';
            for (i = 1; i <= this.config.totalNum; i++) {
                var curLiClassName = (i > this.config.showLimit) ? 'wait' : ('state' + i);
                str += "<li class=" + curLiClassName + ">" +
                    " <span class='compPro1'>" + this.data.pro1[i - 1] + "</span>" +
                    "<span class='compPro2'>" + this.data.pro2[i - 1] + "</span>" +
                    "<div class='compCir'>" + this.data.title[i - 1] + "</div>" +
                    "</li>";
            }
            ;
            $(this.C).find('.verticalScrollMagnifier ul').html(str);

        },
        initCSS: function () {
            var that = this;
            $(this.C).find('.verticalScrollMagnifier').css({
                //border: '1px solid #000',
                height: that.config.showLimit * that.config.height,
                width: that.config.width,
                'box-sizing': 'border-box',
                position: 'relative',
                'user-select': 'none',
                cursor: 'default'
            });

            $(this.C).find('.verticalScrollMagnifier li').css({
                position: 'absolute',
                width: that.config.width,
                height: that.config.height,
                //border: '1px solid red',
                'box-sizing': 'border-box',
                transition: 'all ' + that.config.duration + 's ease-out 0s',
                'line-height': that.config.height + 'px'
            });


            $(this.C).find('.verticalScrollMagnifier li').each(function (i, e) {
                //着色
                $(e).css('color', that.config.colorArr[i] || 'red');
            });

            $(this.C).find('.compCir').each(function (i, e) {
                //着色
                $(e).css({
                    'backgroundColor': that.config.colorArr[i] || 'red',
                    color: 'white'
                });
            });

            $(this.C).find('.compPro1').css({
                'box-sizing': 'border-box',
                'padding-right': that.config.circleMargin,
                'line-height': that.config.height + 'px',
                height: that.config.height,
                width: (that.config.width - that.config.height) / 2,
                position: 'absolute',
                left: 0,
                'text-align': 'right'
            });

            $(this.C).find('.compPro2').css({
                'box-sizing': 'border-box',
                'padding-left': that.config.circleMargin,
                'line-height': that.config.height + 'px',
                height: that.config.height,
                width: (that.config.width - that.config.height) / 2,
                position: 'absolute',
                right: 0,
                'text-align': 'left'
            });


            $(this.C).find('.compCir').css({
                'text-align': 'center',
                'border-radius': '50%',
                width: that.config.height,
                height: that.config.height,
                'line-height': that.config.height + 'px',
                margin: 'auto auto'
            });


        },
        bindEvent: function () {
            var that = this;
            var classArr = [];
            $('.verticalScrollMagnifier li').each(function (i, e) {
                classArr.push($(e).attr('class'))
            });
            //console.log(classArr)

            var animateFlag = false;
            $(that.C).find('.verticalScrollMagnifier').mousewheel(function (e, d) {
                e.preventDefault();

                //这时候B要变成A 把最后一个插到第一个
                if (!animateFlag) {
                    if (d == -1) {
                        classArr.unshift(classArr.pop());//上移
                    }
                    else if (d == 1) {
                        classArr.push(classArr.shift());//下移
                    }

                    animateFlag = true;
                    setTimeout(function () {
                        animateFlag = false;
                    }, 1000)
                    $(that.C).find('.verticalScrollMagnifier li').each(function (i, e) {
                        $(e).attr('class', classArr[i]);
                    });
                }
            })
        }
    };
    w.VerticalScrollMagnifier = VerticalScrollMagnifier;
})(window, document, jQuery)


