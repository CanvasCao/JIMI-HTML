(function () {
    //#3881e0
    //窗口宽高
    var winH = $(window).height();
    var winW = $(window).width();
    var pageIndex = 0//当前页面（初始化用）

    var isConVelocited = false;
    //操作的jq对象
    var $cirLis = $('#circles ul li');
    var $con = $('#container');
    var $pages = $con.find('.page');
    var pageNum = $pages.length - 1;//最大索引数所以-1
    var $header = $('.header')

    //jqPage对象
    var $page0 = $pages.eq(0);
    var $page1 = $pages.eq(1);
    var $page2 = $pages.eq(2);
    var $page3 = $pages.eq(3);
    var $page4 = $pages.eq(4);

    //page0 jq对象
    var $scroll = $page0.find('.scroll');


    //添加背景颜色
    var colorArr = ['#fff', '#fff', '#fff', 'white', 'white'];
    $pages.each(function (i, e) {
        $(this).css('backgroundColor', colorArr[i]);
    })


    //Events....................................................................
    $(window).mousewheel(function (e, delta) {
        var e = e || event;
        e.preventDefault();	//阻止页面的默认滚动。

        //e.target是事件环的第一环
        if ($.contains($scroll[0], e.target)) {
            return;
        }

        if (!isConVelocited) {
            //console.log('可动')

            var oldIndex = pageIndex;
            if (delta == -1) {
                pageIndex++;
            }
            else if (delta == 1) {
                pageIndex--;
            }
            pageIndex = pageIndex > pageNum ? pageNum : pageIndex;//验收
            pageIndex = pageIndex < 0 ? 0 : pageIndex;

            DoPageChange(oldIndex, pageIndex);
        }
        else {
            //console.log('不可动')
        }
    })

    $(window).keydown(function (e) {
            var e = e || event;
            if (!isConVelocited) {
                var oldIndex = pageIndex;

                if (e.keyCode == 38 || e.keyCode == 40) {
                    e.preventDefault();	//阻止页面的默认滚动。
                    if (e.keyCode == 38) {
                        pageIndex--;
                    }
                    else if (e.keyCode == 40) {
                        pageIndex++;
                    }
                    pageIndex = pageIndex > pageNum ? pageNum : pageIndex;//验收
                    pageIndex = pageIndex < 0 ? 0 : pageIndex;

                    DoPageChange(oldIndex, pageIndex);
                }
            }
        }
    )


    $cirLis.each(function (i, e) {
        $(this).click(function () {
            var oldIndex = pageIndex;
            pageIndex = i;
            DoPageChange(oldIndex, pageIndex);
        })
    })

    //functions.......................................................
    function DoPageChange(oldIndex, pageIndex) {

        if (oldIndex == pageIndex) {
            return;
        }

        isConVelocited = true;
        var duration = 1000;
        var ease = 'easeInOutQuart';


        //判断当前的page是上移还是下移
        var dir = (oldIndex < pageIndex) ? 'up' : 'down'; //-1 1

        //上移的代码
        if (dir == 'up') {
            var oldIndexTop = parseInt($pages.eq(oldIndex).css('top'));
            var newTop = (pageIndex == pageNum) ? 150 : winH;//是最后一页只移动150 不然就移动整屏
            $pages.eq(oldIndex).velocity({'top': (oldIndexTop - newTop)}, duration, ease);
            $pages.eq(pageIndex).velocity({top: winH}, 0).velocity({'top': winH - newTop}, duration, ease);
        }
        //下移的代码
        else {
            var oldIndexTop = parseInt($pages.eq(oldIndex).css('top'));
            var newTop = (oldIndex == pageNum) ? 150 : winH;//是最后一页只移动150 不然就移动整屏
            $pages.eq(oldIndex).stop().velocity({'top': (oldIndexTop + newTop)}, duration, ease);
            $pages.eq(pageIndex).stop().velocity({top: 0 - newTop}, 0).velocity({'top': 0}, duration, ease);
        }

        setTimeout(function () {   //滚轮截流
            isConVelocited = false;
        }, 1500)

        var cirArr = [0, 1, 2, 3, 3];//
        $cirLis.eq(cirArr[pageIndex]).addClass('cur').siblings().removeClass('cur');

        if (oldIndex != pageNum) { //如果是5到4这一步不需要出入场动画
            AnimateInArr[pageIndex]();
            AnimateOutArr[oldIndex]();
        }

    }

    //AnimateJSON.................................................................
    var AnimateInArr = [
        function () {
            var total = 1200;
            $page0.find('.eye').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total), 'ease');
            $page0.find('.scroll').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 400), 'ease');
            $page0.find('.title').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 200), 'ease');
            $page0.find('.btnIOS').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 400), 'ease');
            $page0.find('.btnAZ').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 600), 'ease');

            vsm.START();
        },
        function () {
            var total = 1200;
            $page1.find('.bottle').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 200), 'ease');
            $page1.find('.cirsCon').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 400), 'ease');
            $page1.find('.title').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 600), 'ease');


            //scanBar动画
            (function () {
                $scanBar = $page1.find('.scanBar')
                window.scanBarTimer = null;
                window.ifScanBarTimer = false;
                var duration = 1500;

                if (!window.ifScanBarTimer) {
                    window.ifScanBarTimer = true;
                    window.scanBarTimer = setInterval(MoveOnce, duration);
                }

                //只有显示才是延迟的
                setTimeout(function () {
                    $page1.find('.hoverArea').stop().animate({opacity: 1}, 'fast');
                }, 2000);


                function MoveOnce() {
                    //console.log(1);
                    //总长是220所以110是分界线
                    var topValue = parseInt($scanBar.css('top'));
                    //console.log(topValue);
                    if (topValue >= 110) {
                        $scanBar.animate({top: GetRandom(20, 40) + '%'}, duration, 'easieEase', function () {
                            //isTop = !isTop;
                        });
                    }
                    else {

                        $scanBar.animate({top: GetRandom(70, 90) + '%'}, duration, 'easieEase', function () {
                            //isTop = !isTop;
                        });
                    }
                }

                function GetRandom(begin, end) {
                    return Math.floor(Math.random() * (end - begin)) + begin;
                }
            })();

            //第二页的数字动画 两秒会运动完
            (function () {
                var count = 0;
                var txt1 = 0, txt2 = 0, txt3 = 0;
                var txtTimer = setInterval(function () {
                    txt1 += 60 / 60;
                    $page1.find('.title2').eq(0).html(txt1 + '万');

                    txt2 += 15000 / 60;
                    $page1.find('.title2').eq(1).html(txt2);

                    txt3 += 6000 / 60;
                    $page1.find('.title2').eq(2).html(txt3);

                    count++;
                    if (count >= 60) {
                        clearTimeout(txtTimer);
                    }
                }, 2000 / 60)
            })()

        },
        function () {
            var total = 1200;
            $page2.find('.pc').velocity(
                {
                    'translateX': '-350',
                    'translateY': '-82',
                    'translateZ': '-10000px',
                    'top': '50%',
                    'opacity': 0
                }, 0).delay(600).velocity({
                    'translateX': '-350',
                    'translateY': '-82',
                    'translateZ': 1,
                    'top': '50%',
                    'opacity': 1
                }, (total - 600), 'ease');
            $page2.find('.roof').velocity({'top': '-200%'}, 0).delay(700).velocity({'top': '50%'}, (total), 'ease');
            $page2.find('.lamp').velocity({'left': '-100%'}, 0).delay(0).velocity({'left': '50%'}, (total + 600), 'ease');
            $page2.find('.title').velocity({'top': '-200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 400), 'ease');


            var circleTotal=700;
            var circleDalay=1800;
            $page2.find('.dashLine').velocity({'opacity':0,'left': '20%'}, 0).delay(circleDalay).velocity({'opacity':1,'left': '50%'}, (circleTotal + 0), 'ease');
            $page2.find('.pie').velocity({'opacity':0,'left': '20%'}, 0).delay(circleDalay+100).velocity({'opacity':1,'left': '50%'}, (circleTotal + 0), 'ease');
            $page2.find('.line3').velocity({'opacity':0,'left': '20%'}, 0).delay(circleDalay+200).velocity({'opacity':1,'left': '50%'}, (circleTotal + 0), 'ease');
            $page2.find('.apple').velocity({'opacity':0,'left': '20%'}, 0).delay(circleDalay+300).velocity({'opacity':1,'left': '50%'}, (circleTotal + 0), 'ease');
            $page2.find('.az').velocity({'opacity':0,'left': '20%'}, 0).delay(circleDalay+400).velocity({'opacity':1,'left': '50%'}, (circleTotal + 0), 'ease');
            $page2.find('.sdk').velocity({'opacity':0,'left': '20%'}, 0).delay(circleDalay+500).velocity({'opacity':1,'left': '50%'}, (circleTotal + 0), 'ease');
            window.canvasStart();

        },
        function () {
            var total = 1200;
            $page3.find('.title1').velocity({'top': '200%'}, 0).velocity({'top': '50%'}, total, 'ease');
            $page3.find('.title2').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 200), 'ease');
            $page3.find('.title3').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 400), 'ease');
            $page3.find('.btn1').velocity({'top': '200%'}, 0).delay(0).velocity({'top': '50%'}, (total + 600), 'ease');
        },
        function () {
        },
        function () {
        }
    ];
    var AnimateOutArr = [
        function () {
            vsm.STOP();
        },
        function () {

            //scanBar的退场动画
            $page1.find('.hoverArea').css({opacity: 0});
            clearInterval(window.scanBarTimer);
            window.ifScanBarTimer = false;
        },
        function () {
            window.canvasStop();
        },
        function () {
        },
        function () {
        },
        function () {
        }
    ];


    //init.............................................................
    $cirLis.eq(pageIndex).addClass('cur').siblings().removeClass('cur');
    $pages.eq(pageIndex).css({top: 0}).siblings().css({top: '100%'})
    AnimateInArr[pageIndex]() //首页入场
    $header.css({top: '-80px'}).delay(1000).velocity({top: 0}, 'slow', 'easeInQuart')

})()