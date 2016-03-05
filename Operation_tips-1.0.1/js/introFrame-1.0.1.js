;
(function (w, d, undefined) {
    //version 1.0.1
    //create by CAO on 2016/3/3

    //更新说明：父容器不需要给宽
    //将iphone6作为基准高度
    function IntroFrame(container, data, bar) {
        this.container = container;
        this.data = data;
        this.bar = bar;//下栏
        this.timer = null;
        this.config = {
            baseWidth: 375,
            baseHeight: 667,
            baseClickSize: 50,
            baseFontSize: 14,
            baseLineHeight: 20,
            bottomBarHeight: 29,
            bottomBarPaddingTop: 10
        };
        this.init();
    }

    IntroFrame.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            this.config.scrW = document.documentElement.clientWidth;
            this.config.scrH = document.documentElement.clientHeight;
            this.config.scaleRate = this.config.scrH / this.config.baseHeight;
            this.config.clickSize = this.config.baseClickSize * this.config.scaleRate;
            this.config.fontSize = this.config.baseFontSize * this.config.scaleRate;
            this.config.lineHeight = this.config.baseLineHeight * this.config.scaleRate;


            this.config.bgH = this.config.scrH - this.config.bottomBarHeight; //动态计算大图的高

            this.config.bgIndex = 0;
            this.config.bgLength = this.data.bgImgs.length;

            this.config.clickIndex = 0;
            this.config.clickLength = this.data.clickImgs.length;
        },
        createDom: function () {
            var str = '';
            str += '<ul class="picUl">';

            //加图片的li
            for (i = 0; i < this.data.bgImgs.length; i++) {
                //适配所有屏幕
                str += '<li><img src="' + this.data.bgImgs[i] + '" alt="" height=' + this.config.bgH + '/></li>';
            }
            str += '</ul>';

            //提示文字.........................................................
            str += '<div class="word"></div>'

            //加闪动的点击图片...................................................
            str += '<ul class="clickUl">'
            for (i = 0; i < this.data.clickImgs.length; i++) {
                str += '<li><img src=' + this.data.clickImgs[i] + ' alt="" /></li>';
            }
            str += '</ul>'

            //最后的棒棒哒
            str += '<img class="bbd" src=' + this.data.bbdImg + '/>' +
                '<span class="bbd">新技能GET√</span>' +
                '<div class="bbd">再看一遍</div>'


            $(this.container).html(str);

        },
        initCSS: function () {
            var that = this;
            //初始化让容器绝对定位 防止用户不写
            $(this.container).css('position', 'absolute');

            //点击图和文字绝对定位
            $('.clickUl').css({'position': 'absolute', 'transform': ' translateX(-50%) translateY(-50%)'});
            //初始化点击图大小
            $('.clickUl li img').css({width: that.config.clickSize + 'px'})
            //小图只显示第一张
            $('.clickUl li').eq(0).show().siblings().hide();
            //小图闪就是点击图
            this.timer = setInterval(function () {
                $('.clickUl li').eq(that.config.clickIndex).show().siblings().hide();
                that.config.clickIndex++;
                if (that.config.clickIndex >= that.config.clickLength) {
                    that.config.clickIndex = 0;
                }
            }, 200)

            //提示文字....................................................................
            $('.word').css({
                'position': 'absolute',
                //'transform': ' translateX(-50%) translateY(-50%)',
                backgroundColor: '#0093FF',
                'border-radius': '40px',
                padding: (8 * that.config.scaleRate) + 'px ' + (15 * that.config.scaleRate) + 'px',
                color: 'white',
                'box-sizing': 'border-box',
                'font-size': that.config.fontSize,
                'line-height': that.config.lineHeight + 'px'
            })


            //最后一页 棒棒哒.................................................
            $('.bbd').css({
                'position': 'absolute',
                'transform': 'translateX(-50%) translateY(-50%)'
            })
            $('img.bbd').css({//class是bbd的img标签
                'width': 200 * that.config.scaleRate,
                'top': '35%',
                'left': '50%'
            })
            $('span.bbd').css({//新技能get
                'top': '60%',
                'left': '50%',
                'font-size': 18 * that.config.scaleRate,
                'color': 'white'
            })
            $('div.bbd').css({
                'top': '70%',
                'left': '50%',
                'font-size': 20 * that.config.scaleRate,
                backgroundColor: '#0093FF',
                'border-radius': '8px',
                padding: (8 * that.config.scaleRate) + 'px ' + (20 * that.config.scaleRate) + 'px',
                color: 'white'
            })
            //大图只显示第一张
            this._skip(0);
        },
        bindEvent: function () {
            var that = this;

            //点击页面跳转
            $('.clickUl').click(function () {
                that.config.bgIndex++;
                if (that.config.bgIndex >= that.config.bgLength) {
                    that.config.bgIndex = 0;
                }
                that._skip(that.config.bgIndex);
            })


            $('div.bbd').click(function () {
                that.config.bgIndex = 0;
                that._skip(that.config.bgIndex);
            })
        },
        //内部函数 跳转页面
        _skip: function (pageNum) {
            this.config.bgIndex = pageNum;
            //替换背景图
            $('.picUl li').eq(pageNum).show().siblings().hide();

            //点击图换位置
            if (this.config.bgIndex == this.config.bgLength - 1) {
                //隐藏
                $('.clickUl').hide()
            } else {
                //出现
                var posJson = this.data.clickPosition[pageNum];
                $('.clickUl').show().css(posJson)
            }

            //提示文字换位置
            if (this.config.bgIndex == this.config.bgLength - 1) {
                //隐藏
                $('.word').hide()
            } else {
                var posJson = this.data.wordPosition[pageNum];
                $('.word').hide().html(this.data.word[pageNum]).css(posJson).fadeIn(1000)
            }

            //最后一页显示新技能
            if (this.config.bgIndex == this.config.bgLength - 1) {
                $('.bbd').fadeIn(1200);
            } else {
                $('.bbd').hide();
            }


            if (this.bar) {
                this.bar.setIndex(pageNum + 1) //因为下标是0 页数从1开始所以加1
            }
        }

    }

    w.IntroFrame = IntroFrame;
})(window, document)


