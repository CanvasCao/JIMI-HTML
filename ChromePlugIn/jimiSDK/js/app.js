/**
 * Created by Administrator on 2016/6/3.
 */
(function (w, d, $, undefined) {

    //JQ对象
    var $title = $('#name h1').eq(0);
    var $triggerDom = $('#spec-n1').eq(0);
    var $TD = {
        top: $triggerDom.offset().top,
        left: $triggerDom.offset().left,
        height: $triggerDom.height(),
        width: $triggerDom.width(),
    };


    //appendDom.........................................................................
    $('body').append('<div id="jimiLight">人</div>');
    $('body').append('<div id="jimiMirror"></div>');
    $jimiLight = $('#jimiLight');

    //点亮标签相关 全局变量...................................................................................
    var ifDragging = false;
    var mouseDown = {x: 0, y: 0};
    //var mouseCurrent = {x: 0, y: 0};
    var timer = null; //setTimeOut的定时器
    var SdkState = {
        touchStart: {},
        touchMove: {
            transition: 'all 0s ease',
            //'pointer-events': 'none'
        },
        touchEnd: {
            transition: 'all 0.7s ease-in-out',
            transform: 'translate3d(0px,0px,0px)',
            //'pointer-events': 'auto',
        }
    }


    //mouseUpDownEvent...................................................
    $jimiLight.mousedown(function (e) {

        mouseDown.x = e.clientX;
        mouseDown.y = e.clientY;
        ifDragging = true;
        $jimiLight.css(SdkState.touchStart);

    })

    $(window).mousemove(function (e) {
        if (ifDragging) {
            e.preventDefault();

            //重置左下角的标记.............................
            SdkState.touchMove.transform = 'translate3d(' + (e.clientX - mouseDown.x) + 'px,' + (e.clientY - mouseDown.y) + 'px,0px)';
            $jimiLight.css(SdkState.touchMove);

            var pageX = e.pageX;
            var pageY = e.pageY;

            if (ifTrigged(pageX, pageY)) {
                $triggerDom.css({border: '10px solid blue'});
            } else {
                $triggerDom.css({border: 'none'});
            }
        }
    })


    $(window).mouseup(function (e) {
        if (ifDragging) {
            ifDragging = false;
        }
        $jimiLight.css(SdkState.touchEnd);
        $triggerDom.css({border: 'none'});

        var pageX = e.pageX;
        var pageY = e.pageY;
        if (ifTrigged(pageX, pageY)) {
            $.ajax({
                type: "get",
                url: 'http://n1.jimi.la/apps_T1/WebJsonpTest/test2.php',
                data: {},
                success: function (data) {
                    console.log(JSON.stringify(data));


                    var jimiMirror = new JimiMirror('#jimiMirror');
                    jimiMirror.show();
                    var hc=jimiMirror.addHoneyComb();


                    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame;
                    var startTime = new Date().getTime();
                    var FPS = 0.25;
                    var timer = null;


                    function move() {
                        var curTime = new Date().getTime();
                        var diff = curTime - startTime;
                        if (diff >= 5000) {
                            startTime = new Date().getTime();
                            hc.move();
                        }
                        timer = requestAnimationFrame(move);
                    }
                    hc.move();
                    move();
                },
                error: function (err) {
                    console.log('ERROR!')
                    console.log(err);
                }
            })
        }

    })


    function ifTrigged(pageX, pageY) {
        if (pageX > $TD.left && pageX < ($TD.left + $TD.width) && pageY > $TD.top && pageY < ($TD.top + $TD.height)) {
            return true;
        } else {
            return false;
        }
    }

})(window, document, $)


