;
(function (w, d, undefined) {
    //version 1.0.0
    //create by CAO on 2016/3/1
    //container 必须设宽

    function IntroFrame(container, data) {
        this.container = container;
        this.data = data;
        this.timer = null;
        this.config = {};
        this.init();
    }

    IntroFrame.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindData();
        },
        initConfig: function () {
            this.config.containerW = this.data.bgSize || parseInt($(this.container).css('width'));
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
                str += '<li><img src="' + this.data.bgImgs[i] + '" alt="" width=' + this.config.containerW + '/></li>';
            }
            str += '</ul>';

            //....................................................................................
            str += '<div class="word"></div>'

            //...................................................................................
            str += '<ul class="clickUl">'

            //加闪动的点击图片
            for (i = 0; i < this.data.clickImgs.length; i++) {
                str += '<li><img src=' + this.data.clickImgs[i] + ' alt="" /></li>';
            }
            str += '</ul>'


            $(this.container).html(str);

        },
        initCSS: function () {
            var that = this;
            //初始化让容器绝对定位
            $(this.container).css('position', 'absolute');


            //点击图和文字绝对定位
            $('.clickUl').css({'position': 'absolute', 'transform': ' translateX(-50%) translateY(-50%)'});
            //初始化点击图大小
            $('.clickUl li img').css({width: that.data.clickSize + 'px'})
            //小图只显示第一张
            $('.clickUl li').eq(0).show().siblings().hide();
            //点击图片闪起来
            this.timer = setInterval(function () {
                $('.clickUl li').eq(that.config.clickIndex).show().siblings().hide();
                that.config.clickIndex++;
                if (that.config.clickIndex >= that.config.clickLength) {
                    that.config.clickIndex = 0;
                }
            }, 200)

            $('.word').css({
                'position': 'absolute',
                //'transform': ' translateX(-50%) translateY(-50%)',
                backgroundColor: '#0093FF',
                'border-radius': '15px',
                padding:'8px 15px',
                color:'white'
            })

            //大图只显示第一张
            this._skip(0);
        },
        bindData: function () {
            var that = this;

            //点击页面跳转
            $('.clickUl').click(function () {
                that.config.bgIndex++;
                if (that.config.bgIndex >= that.config.bgLength) {
                    that.config.bgIndex = 0;
                }
                that._skip(that.config.bgIndex);
            })
        },
        //内部函数 跳转页面
        _skip: function (pageNum) {
            this.config.bgIndex=pageNum;
            //替换背景图
            $('.picUl li').eq(pageNum).show().siblings().hide();

            //点击图换位置
            if(this.config.bgIndex==this.config.bgLength-1){
                //隐藏
                $('.clickUl').hide()
            }else{
                //出现
                var top = '50%', left = '50%';
                var posData = this.data.clickPosition[pageNum];
                if (posData) {
                    left = posData[0] + '%';
                    top = posData[1] + '%';
                }
                $('.clickUl').show().css({top: top, left: left})
            }



            //提示文字换位置
            var top2 = '50%', left2 = '50%';
            var posData2 = this.data.wordPosition[pageNum];
            if (posData2) {
                left2 = posData2[0] + '%';
                top2 = posData2[1] + '%';
            }
            $('.word').hide().html(this.data.word[pageNum]).css({
                top: top2,
                left: left2
            }).fadeIn(1000)
            //    .animate({
            //    opacity:1
            //},1000)
        }

    }

    w.IntroFrame = IntroFrame;
})(window, document)


