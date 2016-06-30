/**
 * Created by Administrator on 2016/6/3.
 */

(function () {
    //appendDom.........................................................................
    $('body').append('<div id="jimiLight"></div>');
    $('body').append('<div id="jimiMirror"></div>');

    //JQ对象
    var $title = $('#name h1').eq(0);
    var $triggerDom = $('#spec-n1').eq(0);
    var $TD = {
        top: $triggerDom.offset().top,
        left: $triggerDom.offset().left,
        height: $triggerDom.height(),
        width: $triggerDom.width(),
    };

    $jimiLight = $('#jimiLight');
    $jimiLight.css({
        'background': 'url("' + jimiHost + '/img/logo.png")',
        'background-size': 'cover',
    });
    var jimiMirror = new JimiMirror('#jimiMirror', {top: $TD.top - 30});

    //$triggerDom TADA的定时器
    var tadaTimer = null;


    //点亮标签相关 全局变量...................................................................................
    var ifDragging = false;
    var mouseDown = {x: 0, y: 0};
    var lightState = {
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
        $jimiLight.css(lightState.touchStart);
        tadaTimer = setInterval(function () {
            $triggerDom.velocity('callout.tada', 3000, true);
        }, 3200)

    })

    $(window).mousemove(function (e) {
        if (ifDragging) {
            e.preventDefault();

            //重置左下角的标记.............................
            lightState.touchMove.transform = 'translate3d(' + (e.clientX - mouseDown.x) + 'px,' + (e.clientY - mouseDown.y) + 'px,0px)';
            $jimiLight.css(lightState.touchMove);

            var pageX = e.pageX;
            var pageY = e.pageY;

            if (ifTrigged(pageX, pageY)) {
                //$triggerDom.css({border: '10px solid blue'});
            } else {
                //$triggerDom.css({border: 'none'});
            }
        }
    })


    $(window).mouseup(function (e) {
        if (ifDragging) {
            ifDragging = false;
        }
        $jimiLight.css(lightState.touchEnd);
        clearInterval(tadaTimer);
        delete(tadaTimer);
        //$triggerDom.css({border: 'none'});

        var pageX = e.pageX;
        var pageY = e.pageY;
        if (ifTrigged(pageX, pageY)) {
            $.ajax({
                type: "get",
                url: jimiHost + '/test2.php',
                success: function (data) {
                    console.log(JSON.stringify(data));

                    var arr = ['防晒']
                    jimiMirror.clear();
                    jimiMirror.show(arr);
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
})()
