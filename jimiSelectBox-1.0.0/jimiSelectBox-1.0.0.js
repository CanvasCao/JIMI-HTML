/*!
 * JIMI JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * Date: 2016-4-5 15:07:30
 */
;
(function (w, d, $, undefined) {
    function JimiSelectBox(container, data) {
        this.C = this.container = container;
        this.data = data;
        this.config = {
            height: 25,//单元格的宽高
            width: 100,
            showLimit: 10,
            ifDragging: false,
            clientY: 0, //鼠标每次的偏移量
            barDy: 0, //bar每次的偏移量
            barHeight: 100,
        };
        this.init();
    }

    JimiSelectBox.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            var itemDis = (this.data.length - this.showLimit) * this.config.height;
            var barDis = this.showLimit * this.config.height - this.config.barHeight;
            this.config.RATE = barDis / itemDis;
        },
        createDom: function () {
            $(this.C).html("<div class='selTop'></div><div class='selBottom'></div>");
            $(this.C).find('.selTop').html("<span class='selTxt'>" + this.data[0] + "</span>" +
                "<div class='topBtn'>" +
                "<div class='topBtnArr l'></div>" +
                "<div class='topBtnArr r'></div>" +
                "</div>")

            var str = '';
            for (i = 0; i < this.data.length; i++) {
                str += "<div class='item'>" + this.data[i] + "</div>";
            }
            $(this.C).find('.selBottom').html("<div class='list'>" + str + "</div>");

            if (this.data.length > this.config.showLimit) {
                $(this.C).find('.selBottom').append("<div class='bar'></div>")
            }
        },
        initCSS: function () {
            var that = this;
            $(this.C).css({font: "12px '微软雅黑'"})

            $(this.C).find('.selTop').css({
                width: that.config.width,
                height: that.config.height,
                'border-radius': '3px',
                'box-shadow': '0px 0px 10px #979797',
                position: 'relative',
                transition: 'all 0.4s ease 0s',
                cursor: 'pointer',
                'background-color': 'white'
            }).find('.selTxt').css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)'
            })

            //头部hover时的阴影 代码
            $(this.C).find('.selTop').hover(function () {
                $(this).css({'box-shadow': '0px 0px 5px #7499fc'})
            }, function () {
                $(this).css({'box-shadow': '0px 0px 10px #979797'})
            })

            var bottomNum = this.data.length >= this.config.showLimit ? this.config.showLimit : this.data.length;
            $(this.C).find('.selBottom').css({
                position: 'relative',
                height: that.config.height * bottomNum,
                width: that.config.width,
                overflow: 'hidden',
                'border-radius': '3px',
                'box-shadow': '0px 5px 10px #979797',
                display: 'none'
            })


            $(this.C).find('.list').css({
                position: 'absolute'
            })

            $(this.C).find('.item').css({
                width: that.config.width,
                height: that.config.height,
                border: '1px solid #e6e6e6',
                'background-color': 'white',
                transition: 'all 0.4s ease 0s',
                'line-height': that.config.height + 'px',
                'padding-left': (that.config.width / 10) + 'px',
                'box-sizing': 'border-box'
            }).hover(function () {
                $(this).css({'background-color': '#a9d1fa'})
            }, function () {
                $(this).css({'background-color': 'white'})
            })

            $(this.C).find('.bar').css({
                position: 'absolute',
                width: '10px',
                height: that.config.barHeight,
                'background-color': '#979797',
                right: '0',
                top: '0',
                display: 'none',
                'border-radius': '3px',
                cursor: 'pointer',
                opacity: '0.4'
            })

        },
        bindEvent: function () {
            var that = this;
            $(this.C).find('.selTop').click(function () {
                $(that.C).find('.selBottom').stop().fadeToggle('fast');
                $(that.C).find('.bar').stop().fadeToggle('fast');
            })
            $(this.C).find('.item').click(function () {
                var html = $(this).html()
                $(that.C).find('.selTxt').html(html);
                $(that.C).find('.selBottom').stop().fadeOut('fast')
                $(that.C).find('.bar').stop().fadeOut('fast')
            })


            $(this.C).find('.list').mousewheel(function (e, delta) {
                var e = e || event;
                var dy = that.config.barHeight / that.config.RATE;
                e.preventDefault();
                //delta可能是-1 1
                console.log(delta)
                if (delta == -1) {
                    that.barDy += dy;
                }
                else if (delta == 1) {
                    that.barDy -= dy;
                }
                //that.barDy = that.barDy >= 300 ? 300 : that.barDy;
                that.barDy = that.barDy <= 0 ? 0 : that.barDy;
                $(that.C).find('.bar').css({top: that.barDy})

                //$('.drop').css({top: -barDy * RATE})
            })
        },
        GetValue: function () {
        },
        Refresh: function () {
        }

    }
    w.JimiSelectBox = JimiSelectBox;
})(window, document, jQuery)


