/**
 * Created by Administrator on 2016/6/3.
 */
(function (w, d, $, undefined) {

    var $title = $('.tb-main-title');
    var $img = $('#J_ImgBooth');

    console.log($('.search-panel-fields').css('z-index'));
    //appendDom.........................................................................
    $('body').append('<div id="jimiSDK">人</div>');
    $('#jimiSDK').css({
        position: 'fixed',
        left: 10,
        bottom: 10,
        width: 100,
        height: 100,
        border: '1px solid black',
        background: 'red',
    })

    $jimiSDK = $('#jimiSDK');

    //点亮标签相关 全局变量...................................................................................
    var ifDragging = false;
    var mouseDown = {x: 0, y: 0};
    var mouseCurrent = {x: 0, y: 0};
    var timer = null; //setTimeOut的定时器
    var SdkState = {
        touchStart: {},
        touchMove: {
            transition: 'all 0s ease',
            'pointer-events': 'none'
        },
        touchEnd: {
            transition: 'all 0.7s ease-in-out',
            transform: 'translate3d(0px,0px,0px)',
            'pointer-events': 'auto',
        }
    }

    $jimiSDK.mousedown(function (e) {

        mouseDown.x = e.clientX;
        mouseDown.y = e.clientY;
        ifDragging = true;
        $jimiSDK.css(SdkState.touchStart);

    })

    $(window).mousemove(function (e) {
        if (ifDragging) {
            e.preventDefault();
            SdkState.touchMove.transform = 'translate3d(' + (e.clientX - mouseDown.x) + 'px,' + (e.clientY - mouseDown.y) + 'px,0px)';
            $jimiSDK.css(SdkState.touchMove);
        }
    })


    $(window).mouseup(function (e) {
        if (ifDragging) {
            console.log(e.target)
            ifDragging = false;
        }
        $jimiSDK.css(SdkState.touchEnd);

    })


})(window, document, $)


