$(function () {
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


        //init.............................................................
        $cirLis.eq(pageIndex).addClass('cur').siblings().removeClass('cur');
        $pages.eq(pageIndex).css({top: 0}).siblings().css({top: '100%'})


        //Events....................................................................
        $(window).mousewheel(function (e, delta) {
            var e = e || event;
            e.preventDefault();	//阻止页面的默认滚动。


            //e.target是事件环的第一环
            if ($.contains($scroll[0], e.target)) {
                return;
            }

            if (!isConVelocited) {

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


            //页数不同说明可以移动了
            isConVelocited = true;


            //判断上移还是下移
            //上移的话 当前到-100% 下移的话 当前到100%
            var dir=(oldIndex<pageIndex)?'up':'down';
            var dirJSON={
                //'up':['-100%','100%'],
                'up':['-300','300'],
                //'down':['100%','-100%'],
                'down':['300','-300'],
            }


            $pages.eq(oldIndex).velocity({'top': '-100%'}, 1000, 'easeInQuart', function () {
                isConVelocited = false;
            });

            $pages.eq(pageIndex).velocity({top:"100%"}, 0).velocity({'top': 0}, 1000, 'easeInQuart', function () {
                isConVelocited = false;
            });

            var cirArr = [0, 1, 2, 3, 3];//
            $cirLis.eq(cirArr[pageIndex]).addClass('cur').siblings().removeClass('cur');

            if (oldIndex != pageNum) {
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
                (function () {
                    //scanBar动画
                    $scanBar = $page1.find('.scanBar')
                    window.scanBarTimer = null;
                    var isTop = true;
                    var duration = 1500;

                    setTimeout(function () {
                        $page1.find('.hoverArea').stop().animate({opacity: 1}, 'fast');
                        if (!window.scanBarTimer) {
                            window.scanBarTimer = setInterval(move, duration);
                        }
                    }, 2000);


                    function move() {
                        if (!isTop) {
                            $scanBar.animate({top: GetRandom(20, 40) + '%'}, duration, 'easieEase');
                            isTop = !isTop;
                        }
                        else {
                            $scanBar.animate({top: GetRandom(70, 90) + '%'}, duration, 'easieEase');
                            isTop = !isTop;
                        }
                    }

                    function GetRandom(begin, end) {
                        return Math.floor(Math.random() * (end - begin)) + begin;
                    }
                })();
                (function () {
                    //第二页的数字动画
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
                //$('.page2 img').show().css({'top': '80%', 'opacity': 0}).animate({'top': '20%', 'opacity': 1}, 1200);
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
                $page1.find('.hoverArea').stop().animate({opacity: 0}, 'fast');
                clearInterval(window.scanBarTimer);
            },
            function () {
                //$('.page2 img').fadeOut(800);
            },
            function () {
            },
            function () {
            },
            function () {
            }
        ];

    }
)