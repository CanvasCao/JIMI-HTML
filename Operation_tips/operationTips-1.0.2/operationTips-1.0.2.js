/*!
 * operationTips, a JavaScriptPlugIn v1.0.2
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-6-12 15:12:37
 */
//更新说明：提示的手指改为滑动和点击的两种
;
(function (w, d, $, undefined) {
    function Operationtips(container, data) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.data = data;
        this.timer = null;
        this.config = {
            RATE: $(window).width() / 375,
        };
        this.init();
    }

    Operationtips.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
            this._skip(0);
        },
        initConfig: function () {

            this.config.bgIndex = 0;
            this.config.bgLength = this.data.bgImgs.length;
        },
        createDom: function () {
            var str = '';
            str += '<ul class="picUl">';

            //加图片的li
            for (i = 0; i < this.data.bgImgs.length; i++) {
                str += '<li><img src=' + this.data.bgImgs[i] + ' /></li>';
            }

            str += "<img class='clickImg'/>";
            str += '</ul>';

            //提示文字.........................................................
            if (this.data.word) {
                str += '<div class="word"></div>';
            }


            str += "<a href='jimi://closeItBitch'></a>";
            $(this.C).html(str);


        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.picUl').css({
                'position': 'absolute',
                left: '50%',
                'transform': ' translateX(-50%)',
            })


            $(this.C).find('.picUl').find('img').css({'height': $(window).height()});


            //点击图和文字绝对定位............................
            $(this.C).find('.clickImg').css({
                'position': 'absolute',
                'transform': ' translateX(-50%) translateY(-50%)',
                width: '50',
                height: '50',
                'z-index': 999,
            });

            //提示文字....................................................................
            if (this.data.word) {
                $(that.C).find('.word').css({
                    'position': 'absolute',
                    backgroundColor: '#0093FF',
                    'border-radius': '40px',
                    padding: '8px 15px',
                    color: 'white',
                    'box-sizing': 'border-box',
                })
            }

        },
        bindEvent: function () {
            var that = this;

            //点击页面跳转
            $(this.C).find('.picUl').click(function () {
                that.config.bgIndex++;
                if (that.config.bgIndex >= that.config.bgLength) {
                    $(that.C).find('a')[0].click();

                    that.config.bgIndex = 0;
                }
                that._skip(that.config.bgIndex);
            })


        },

        startBling: function (position) {
            var that = this;
            clearTimeout(that.timer);
            delete(that.timer);

            $(that.C).find('.clickImg').stop().css(position);

            var clickIndex = 0;
            that.timer = setInterval(function () {
                clickIndex = ((clickIndex + 1) > that.data.clickImgs.length) ? 0 : (clickIndex + 1);
                var src = that.data.clickImgs[clickIndex];
                $(that.C).find('.clickImg').attr('src', src);
            }, 200)
        },

        startMoving: function (positionArr) {
            var that = this;
            clearTimeout(that.timer);
            delete(that.timer);

            $(that.C).find('.clickImg').attr('src', that.data.clickImgs[0]);
            $(that.C).find('.clickImg').stop().css(positionArr[0]);

            that.timer = setInterval(function () {
                $(that.C).find('.clickImg').css(positionArr[0]).animate(positionArr[1], 1500, 'linear');
            }, 2000)
        },

        //内部函数 跳转页面
        _skip: function (pageNum) {
            var that = this;

            this.config.bgIndex = pageNum;

            //替换背景图........................................................
            $(this.C).find('.picUl li').eq(pageNum).show().siblings('li').hide();


            //手指 是在移动还是在换图片
            var clickPosition = that.data.clickPosition[pageNum];
            //是数组就要startMoving
            Object.prototype.toString.call(clickPosition) == '[object Array]' ? that.startMoving(clickPosition) : that.startBling(clickPosition);


            if (that.data.word) {
                var posJson = this.data.wordPosition[pageNum];
                $(that.C).find('.word').hide().html(this.data.word[pageNum]).css(posJson).fadeIn(1000);
            }
        }
    }

    w.Operationtips = Operationtips;
})(window, document, $)


