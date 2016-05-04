/**
 * Created by Administrator on 2016/5/4.
 */
(function () {


    var winH = $(window).height();
    var winW = $(window).width();
    var duration = 1000;
    var ease = 'easeInOutQuart';

    function svgCircle(container, x, y, elength, index, callback) {
        this.C = this.container = container;
        this.x = x;//left
        this.y = y;//top
        this.EL = this.elength = elength;
        this.index = index;
        this.pathId = 'path' + this.index;
        this.callback = callback;
        this.svgObj = null;
        this.init();

    }

    svgCircle.prototype = {
        init: function () {
            this.createDom();
            this.initCSS();
        },
        createDom: function () {
            $(this.C).append(
                //宽高关系不大 因为没有overflow hidden
                '<svg class="path"  id=' + this.pathId + ' width="300" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<path xmlns="http://www.w3.org/2000/svg"' +
                'd="M' + 3 * this.EL + ' ' + this.EL + ' ' +
                'C' + 3 * this.EL + ' ' + this.EL + ' ' + 5 * this.EL + ' ' + this.EL + ' ' + 5 * this.EL + ' ' + 3 * this.EL + ' ' +
                'C' + 5 * this.EL + ' ' + 3 * this.EL + ' ' + 5 * this.EL + ' ' + 5 * this.EL + ' ' + 3 * this.EL + ' ' + 5 * this.EL + ' ' +
                'C' + 3 * this.EL + ' ' + 5 * this.EL + ' ' + 1 * this.EL + ' ' + 5 * this.EL + ' ' + 1 * this.EL + ' ' + 3 * this.EL + ' ' +
                'C' + 1 * this.EL + ' ' + 3 * this.EL + ' ' + 1 * this.EL + ' ' + 1 * this.EL + ' ' + 3 * this.EL + ' ' + 1 * this.EL + ' "/>' +
                '</svg>'
            );
        },
        initCSS: function () {
            var that = this;
            $(this.C).find('#' + that.pathId).css({top: that.y}).css({left: that.x});
        },
        draw: function () {
            var that = this;
            $(that.C).find('#' + that.pathId).show();
//                console.log($(this.C).find('#' + that.pathId))
            that.svgObj = new Walkway({
                selector: '#' + that.pathId,
                duration: 2500,
                easing: 'easeInOut'
            }).draw(that.callback);


        }
    }


    var B = 30;
    var gen3 = Math.sqrt(3);
    var cirCenterArr = [ //六个圆心的坐标
        [0, -B],
        [B * gen3 / 2, -B / 2],
        [B * gen3 / 2, B / 2],
        [0, B],
        [-B * gen3 / 2, B / 2],
        [-B * gen3 / 2, -B / 2],
    ]

    var svgCirCleArr = [];
    for (i = 0; i < 6; i++) {
        var callback = (i == 5) //等于最后一个就加回调 否则不加
            ? function () {
            $('.svgCon').animate({opacity: 0});
            $('.jimiName').show().css({top: '100%'}).velocity({top: '50%'}, 1000, ease);
            $('.svgBtn').show().css({top: '100%'}).velocity({top: '50%'}, 1200, ease);
            $('.imgDiv').css({'z-index': 2}).velocity({opacity: 1}, 1200, ease, function () {
                $('.header').css({top: '-80px'}).velocity({top: 0}, 'slow', ease);
                $('.svgCon').empty(); //这里只是图片出来的回调 不要加其他代码
            });
        }
            : function () {
        };

        svgCirCleArr.push(new svgCircle($('.svgCon')[0], cirCenterArr[i][0], cirCenterArr[i][1], 33, i, callback))
    }

//        console.log(svgCirCleArr)
    //画线定时器
    for (i = 0; i < svgCirCleArr.length; i++) {
        eval(
            'setTimeout(function(){' +
            'svgCirCleArr[' + i + '].draw();' +
            '},' + i + '*500)'
        )
    }


    $('.svgBtn').click(function () {
        $('.pageSvg').velocity({'top': (-winH)}, duration, ease);
        $('.page').eq(0).css({top: 0}).siblings('.page').css({top: '100%'}) //siblings 有page 也有pageSvg
        window.AnimateInArr[0]()
    });
})();