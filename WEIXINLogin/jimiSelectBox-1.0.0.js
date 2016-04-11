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
            height: 60,//单元格的宽高
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
            var itemDis = (this.data.length - this.config.showLimit) * this.config.height;
            var barDis = this.config.showLimit * this.config.height - this.config.barHeight;
            this.config.RATE = itemDis / barDis;
            this.config.itemDis = itemDis;
            this.config.barDis = barDis;
            //console.log(this.config.RATE)
            //item移动1格bar移动RATE格
        },
        createDom: function () {
            $(this.C).html("<div class='selTop'></div><div class='selBottom'></div>");
            $(this.C).find('.selTop').html("<span class='selTxt'>" + this.data[0] + "</span>" +
                "<div class='topCir'>" +
                "<div class='topArr topArrL'></div>" +
                "<div class='topArr topArrR'></div>" +
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

            //容器本身
            $(this.C).css({
                //'z-index':2,
                font: "12px '微软雅黑'",
                //width: that.config.width,
                height: that.config.height,
                position: 'relative',
                //border:'1px solid #000'
            })

            //头部显示当前数据
            $(this.C).find('.selTop').css({
                width: that.config.width,
                height: that.config.height - 2,
                'border-radius': '3px',
                //'box-shadow': '0px 0px 10px #979797',
                position: 'absolute',
                transition: 'all 0.4s ease 0s',
                //cursor: 'pointer',
                'background-color': 'white'
            }).find('.selTxt').css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)'
            })

            //头部hover时的阴影 代码
            $(this.C).find('.selTop').hover(function () {
                //$(this).css({'box-shadow': '0px 0px 5px #7499fc'})
            }, function () {
                //$(this).css({'box-shadow': '0px 0px 10px #979797'})
            })

            //底部显示供选择的数据
            var bottomNum = this.data.length >= this.config.showLimit ? this.config.showLimit : this.data.length;
            $(this.C).find('.selBottom').css({
                top: that.config.height,
                position: 'absolute',
                height: that.config.height * bottomNum,
                width: that.config.width,
                overflow: 'hidden',
                'border-radius': '3px',
                'box-shadow': '0px 5px 10px #979797',
                display: 'none',
                'z-index': 2

            })


            //列表
            $(this.C).find('.list').css({
                position: 'absolute',
            })

            //列表中的每个选项
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


            //滚动条
            $(this.C).find('.bar').css({
                position: 'absolute',
                width: '10px',
                height: that.config.barHeight,
                'background-color': '#979797',
                right: '0',
                top: '0',
                'border-radius': '3px',
                cursor: 'pointer',
                opacity: '0.4'
            })


            //顶部的选择箭头
            $(this.C).find('.topCir').css({
                position: 'absolute',
                width: that.config.height * 0.5,
                height: that.config.height * 0.5,
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                'background-color': '#a5a5a5',
                'border-radius': '50%',
            })

            $(this.C).find('.topArr').css({
                position: 'absolute',
                'background-color': 'white',
                width: '3px',
                height: '6px',
                top: '50%',
                left: '50%',
                'transform-origin': '50% 50%'
            })
            $(this.C).find('.topArrL').css({
                transform: 'translateX(-3px) translateY(-50%) rotate(-45deg)'
            })
            $(this.C).find('.topArrR').css({
                transform: 'translateX(-0px) translateY(-50%) rotate(45deg)'
            })

        },
        bindEvent: function () {
            var that = this;
            $(this.C).find('.selTop').click(function () {
                $(that.C).find('.selBottom').toggle();
            })
            $(this.C).find('.item').click(function () {
                var html = $(this).html()
                //$(this).backgroundColor
                $(that.C).find('.selTxt').html(html);
                $(that.C).find('.selBottom').hide()
            })


            $(this.C).find('.list').mousewheel(function (e, delta) {
                var e = e || event;
                e.preventDefault();
                //delta可能是-1 1
                //console.log(delta)
                var dy = that.config.height / that.config.RATE;
                if (delta == -1) {
                    that.config.barDy += dy;
                }
                else if (delta == 1) {
                    that.config.barDy -= dy;
                }
                that.config.barDy = that.config.barDy >= that.config.barDis ? that.config.barDis : that.config.barDy;
                that.config.barDy = that.config.barDy <= 0 ? 0 : that.config.barDy;

                $(that.C).find('.bar').css({top: that.config.barDy})
                $(that.C).find('.list').css({top: -that.config.barDy * that.config.RATE})
            })


            $(this.C).find('.bar').mousedown(function (e) {
                e.preventDefault();
                that.config.ifDragging = true;
                that.config.clientY = e.clientY;
            })

            $(window).mousemove(function (e) {

                if (that.config.ifDragging) {
                    e.preventDefault();
                    //可视距离500 bar高度200 可移动距离500-200=300
                    var dy = e.clientY - that.config.clientY;
                    //验收
                    dy = (dy + that.config.barDy >= that.config.barDis) ? that.config.barDis - that.config.barDy : dy;
                    dy = (dy + that.config.barDy <= 0) ? 0 - that.config.barDy : dy;
                    $(that.C).find('.bar').css({top: dy + that.config.barDy})//bar移动完 drop也要移动
                    $(that.C).find('.list').css({top: (dy + that.config.barDy) * (-that.config.RATE)})
                }
            })
            $(window).mouseup(function (e) {
                e.preventDefault();
                that.config.barDy = parseInt($(that.C).find('.bar').css('top'));//修正一下bar的偏移量
                that.config.ifDragging = false;
            })
        },
        GetValue: function () {
            return $(this.C).find('.selTxt').html()
        },
        Refresh: function (data) {
            this.data = data;
            this.init();
        }

    }
    w.JimiSelectBox = JimiSelectBox;
})(window, document, jQuery)


