/*!
 * slotMachine, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-5-4 14:21:41
 */


;
(function (w, d, $, undefined) {
    function SlotMachine(container, data) {
        this.C = this.container = container;//先假设这里容器 psa 宽高都是100%等于屏幕
        this.D = this.data = data; //传进来的是data.data 所以D是个数组
        this.config = {
            winH: $(window).height(),
            winW: $(window).width(),

            //var itemEdgeLength = 90 * RATE;
            index: 0, //window窗口的起始索引
            ifRunning: false, //就是ifWinRunning
            ifStopping: false,
            timer: null,//全局定时器
            len: 4, //不是下标最大值 而是数量
            duration: 500,//起始移动时间
            stopCount: 5
        };
        this.init();
    }

    SlotMachine.prototype = {
        init: function () {
            this.createDom();
            this.initConfig();
            this.initCSS();
            this.initRATE();
            this.bindEvent();
        },


        createDom: function () {
            $(this.C).html(" <div class='machine'></div>");
            $(this.C).find('.machine').html('<div class="board"></div>' + "<div class='btn'>启 动</div>")

            //暂时只有两个窗格
            $(this.C).find('.board').html('<div class="win"></div>' + "<div class='win'></div>")


            var str = '';
            for (i = 1; i <= 3; i++) {
                str += '<div class="item"><img src="img/' + i + '.jpg" alt=""/></div>';
            }
            $(this.C).find('.win').eq(0).html(str).append('<img src="'+this.D[0]['imgUrl']+'" alt=""/>');



            var str = '';
            for (i = 4; i <= 6; i++) {
                str += '<div class="item"><img src="img/' + i + '.jpg" alt=""/></div>';
            }
            $(this.C).find('.win').eq(1).html(str).append('<img src="'+this.D[1]['imgUrl']+'" alt=""/>');


        },
        initConfig: function () {
            //修正比例 以iphone6为基准
            this.config.RATE = this.config.winW / 375;
            this.config.len = $(this.C).find('.win').eq(0).find('.item').length;
        },
        initCSS: function () {
            var that = this;


            $(this.C).find('.machine').css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                'background-color': '#9ab1a7',
                width: 340,
                height: 320,
                'border-radius': '10px'
            })

            $(this.C).find('.board').css({
                position: 'absolute',
                width: 300,
                height: 180,
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                'background-color': '#decfa4',
                'border-radius': '10px'
            })

            $(this.C).find('.win').css({
                position: 'absolute',
                width: 80,
                height: 80,
                //'box-sizing': 'border-box',
                /*item的宽高是100% 所以box-sizing不能写border-box*/
                'background-color': 'white',
                border: '5px solid #cf7649',
                //padding:5,
                top: '15%',
                overflow: 'hidden',
            })

            $(this.C).find('.win').eq(0).css({
                left: '6%'
            })

            $(this.C).find('.win').eq(1).css({
                right: '6%'
            })


            var $win = $(this.C).find('.win');
            var itemEdge = parseFloat($win.css('width'))
            $(this.C).find('.item').css({
                position: 'absolute',
                height: itemEdge, //90的原因只是因为他父容器宽高是90
                width: itemEdge,
                'background-color': 'white',
                left: 0,
                //text-align: center;
            }).find('img').css({
                width: '100%',
                height: '100%',
            })


            $(this.C).find('.btn').css({
                position: 'absolute',
                width: '100px',
                height: '40px',
                top: '89%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                cursor: 'pointer',
                'backgroundColor': '#decfa4',
                'text-align': 'center',
                'border-radius': '5px'
            })

        },

        initRATE: function () {
            if ($.fn.jimiFixedRate) {
                $('.machine').jimiFixedRate();
                $('.board').jimiFixedRate();
                $('.win').jimiFixedRate();
                $('.win .item').jimiFixedRate();
                $('.btn').jimiFixedRate();

            } else {
                //console.log($.fn.jimiFixedRate)
                throw new Error('没有引用曹昱豪写的牛逼等比例缩放jq插件');
            }
        },
        bindEvent: function () {
            var that = this;

            //var itemEdgeLength=$(this.C).find('.win').eq(0)
            //init.......................................................................
            $(this.C).find('.win').each(function (i, e) {
                $(e).find('.item').eq(that.config.index).css({top: 0}).siblings().css({top: 1000});
            });


            $(this.C).find('.btn').click(function () {
                if (!that.config.ifRunning) { //如果是不正在跑 那就跑  否则让他正在跑 并且正在停
                    that.config.duration = 300;
                    that.config.timer = setTimeout(MoveOnce, that.config.duration);
                    that.config.ifRunning = !that.config.ifRunning;
                }
                else {
                    that.config.stopCount = 12;
                    that.config.duration = 50;
                    that.config.ifStopping = true;
                }
            })


            function MoveOnce() {
                var indexAdd1 = (that.config.index + 1) >= that.config.len ? 0 : (that.config.index + 1);
                $('.win').each(function (i, e) {
//               console.log($(e))
                    $(e).find('.item').eq(that.config.index).css({
                        top: 0,
                        'z-index': 0
                    }).animate({top: '-100%'}, that.config.duration, 'linear');

                    $(e).find('.item').eq(indexAdd1).css({
                        top: '100%',
                        'z-index': 1
                    }).animate({top: 0}, that.config.duration, 'linear', function () {
                    });
                })

                that.config.index = (that.config.index + 1) >= that.config.len ? 0 : (that.config.index + 1);//验收下标

                if (that.config.ifStopping) { //正在停止的情况下dur++ 否则dur--

                    if (that.config.stopCount == 0) {
                        clearInterval(that.config.timer);
                        that.config.ifRunning = !that.config.ifRunning;
                        that.config.ifStopping = false;
                        return;
                    }
                    that.config.timer = setTimeout(MoveOnce, that.config.duration);

                    that.config.stopCount--;
                    that.config.duration += 50;
                }

                else {
                    that.config.duration = (that.config.duration - 50) <= 50 ? 50 : (that.config.duration - 50);
                    that.config.timer = setTimeout(MoveOnce, that.config.duration);
                }
            }

        }
    }
    w.SlotMachine = SlotMachine;
})(window, document, jQuery)


