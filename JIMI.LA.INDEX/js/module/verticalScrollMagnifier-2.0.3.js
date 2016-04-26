/*!
 * verticalScrollMagnifier, a JavaScriptModule v2.0.3
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-4-19 11:12:10
 */

//2.0.3 加入jqMap 暴露两个全局方法STOP和START
;
(function (w, d, $, undefined) {


    function VerticalScrollMagnifier(container, data, newConfig) {
        this.C = this.container = container;
        this.data = data;
        this.newConfig = newConfig;
        this.config = {
            width: 400,
            height: 80,
            showLimit: 5,
            totalNum: 0,
            colorArr: ['#ff794c', '#f2ae24', '#8cb33e', '#62b3ac', '#6286b3'],
            duration: 600, //单位是秒
            circleMargin: 20,
            timer: null,
            ifTimer:false
        };
        this.jQueryMap = {}
        this.init();
    };

    VerticalScrollMagnifier.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.adjustVelocityArr();
            this.bindEvent();
        },
        initConfig: function () {
            var that = this;
            //适配器
            for (k in that.newConfig) {
                that.config[k] = that.newConfig[k];
            }
            //console.log(that.config);
            //更新总个数
            this.config.totalNum = this.data.title.length;

            //更新显示中位数 pushVelocity调用的Json时用
            //this.config.showMiddleNum=


            this.config.jsonArr = [
                {
                    translateY: 0.0001,
                    scale: 0.6,
                    opacity: 0.2
                },
                {
                    translateY: 100,

                    scale: 0.8,
                    opacity: 0.6
                },
                {
                    translateY: 200,

                    scale: 1,
                    opacity: 1
                },
                {
                    translateY: 300,

                    scale: 0.8,
                    opacity: 0.6
                },
                {
                    translateY: 400,

                    scale: 0.6,
                    opacity: 0.2
                }
            ];
            //this.config.jsonArr = [];
            //for (i = 0; i < this.config.totalNum; i++) {
            //    if (i < this.config.showLimit) {
            //
            //        this.config.jsonArr.push({});
            //    }
            //    else {
            //        this.config.jsonArr.push({opacity: 0});
            //    }
            //}

            //console.log(this.config.jsonArr);
        },
        createDom: function () {
            $(this.C).hide();
            $(this.C).html('<div class="verticalScrollMagnifier"></div>');
            $(this.C).find('.verticalScrollMagnifier').html('<ul></ul>');

            var str = '';
            for (i = 0; i < this.config.totalNum; i++) {
                str += "<li>" +
                    " <span class='compPro1'>" + this.data.pro1[i] + "</span>" +
                    "<span class='compPro2'>" + this.data.pro2[i] + "</span>" +
                    "<div class='compCir'>" + this.data.title[i] + "</div>" +
                    "</li>";
            }
            ;
            $(this.C).find('.verticalScrollMagnifier ul').html(str);


            this.jQueryMap.$vsm = $(this.C).find('.verticalScrollMagnifier');

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
                cursor: 'default',
                'font-weight': 'bold'
            });

            $(this.C).find('.verticalScrollMagnifier li').css({
                position: 'absolute',
                width: that.config.width,
                height: that.config.height,
                //border: '1px solid red',
                'box-sizing': 'border-box',
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

        //目前只更新间距
        adjustVelocityArr: function () {
            var jsonArr = this.config.jsonArr;
            var translateY = 0.000001;//设0velocity会忽略这一行代码
            for (i = 0; i < 5; i++) {
                jsonArr[i]['translateY'] = translateY;
                translateY += this.config.height;
            }


        },
        bindEvent: function () {
            var that = this;


            //init
            that.jQueryMap.$vsm.find('li').each(function (i, e) {
                $(e).velocity(that.config.jsonArr[i], 0);
            });
            $(that.C).show();



            var animateFlag = false; //mouseWheel的flag
            that.jQueryMap.$vsm.mousewheel(function (e, d) {
                //e.preventDefault();

                if (!animateFlag) {
                    if (d == -1) {
                        that.config.jsonArr.unshift(that.config.jsonArr.pop());//上移
                    }
                    else if (d == 1) {
                        that.config.jsonArr.push(that.config.jsonArr.shift());//下移
                    }

                    animateFlag = true;
                    setTimeout(function () {
                        animateFlag = false;
                    }, that.config.duration)

                    that.jQueryMap.$vsm.find('li').each(function (i, e) {
                        $(e).velocity(that.config.jsonArr[i], that.config.duration, 'easieEaseInOutQuart');
                    });
                }
            });


            //Fns...............................................................
            that.START = function () {
                    that.config.timer = setInterval(MoveOnce, 4000);
            }
            that.STOP = function () {
                clearInterval(that.config.timer);
            }
            function MoveOnce() {
                that.config.jsonArr.unshift(that.config.jsonArr.pop());//上移
                that.jQueryMap.$vsm.find('li').each(function (i, e) {
                    $(e).velocity(that.config.jsonArr[i], that.config.duration, 'easieEaseInOutQuart');
                });
                //console.log('Move');
            }


            //init.............................................................
            //that.START();

            $(that.C).hover(function () {
                that.STOP();
            }, function () {
                that.START();
            })

        }
    };
    w.VerticalScrollMagnifier = VerticalScrollMagnifier;
})(window, document, jQuery)


