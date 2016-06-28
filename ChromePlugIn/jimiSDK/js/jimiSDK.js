/**
 * Created by Administrator on 2016/6/3.
 */
(function (w, d, $, undefined) {

    $('head').append('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />')
    //JQ对象
    var $title = $('.tb-main-title').eq(0);
    var $triggerDom = $('.tb-booth').eq(0);
    var $TD = {
        top: $triggerDom.offset().top,
        left: $triggerDom.offset().left,
        height: $triggerDom.height(),
        width: $triggerDom.width(),
    };


    //appendDom.........................................................................
    $('body').append('<div id="jimiSDK">人</div>');
    $jimiSDK = $('#jimiSDK');

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
    $jimiSDK.mousedown(function (e) {

        mouseDown.x = e.clientX;
        mouseDown.y = e.clientY;
        ifDragging = true;
        $jimiSDK.css(SdkState.touchStart);

    })

    $(window).mousemove(function (e) {
        if (ifDragging) {
            e.preventDefault();

            //重置左下角的标记.............................
            SdkState.touchMove.transform = 'translate3d(' + (e.clientX - mouseDown.x) + 'px,' + (e.clientY - mouseDown.y) + 'px,0px)';
            $jimiSDK.css(SdkState.touchMove);

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
        $jimiSDK.css(SdkState.touchEnd);
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
                    alert(1);
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


