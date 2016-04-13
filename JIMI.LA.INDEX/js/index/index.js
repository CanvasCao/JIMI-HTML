$(function () {
    //窗口宽高
    var winH = $(window).height();
    var winW = $(window).width();
    var pageIndex = 1;//当前页面（初始化用）

    //操作的jq对象
    var $cirLis = $('#circles ul li');
    var $con = $('#container');
    var $pages = $con.find('.page');

    //添加背景颜色
    var colorArr = ['#46AC99', 'yellowgreen', '#46AC99', 'yellowgreen', '#46AC99'];
    $pages.each(function (i, e) {
        $(this).css('backgroundColor', colorArr[i]);
    })


    //pageChangeLengthArr是除了首页后面每一页应该增加的高度
    var pageChangeLengthArr = [winH, winH, winH, 200]; //4页
    var pageNum = pageChangeLengthArr.length;//4

    //求出每一页应该在的top值
    var pageTopValueArr = [0];//记录每一页顶部高度的数组
    for (var i = 0; i < pageNum; i++) { //不-1
        pageTopValueArr.push(pageTopValueArr[i] + pageChangeLengthArr[i]);
    }

    //init.............................................................
    $con.animate({'top': -pageTopValueArr[pageIndex]}, 0);
    $cirLis.eq(pageIndex).addClass('cur').siblings().removeClass('cur')


    //Events....................................................................
    $(window).mousewheel(function (e, delta) {
        var e = e || event;
        e.preventDefault();	//阻止页面的默认滚动。

        if (!$con.is(':animated')) {
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
            if (!$con.is(':animated')) {
                var oldIndex = pageIndex;

                if (e.keyCode == 38 || e.keyCode == 40) {
                    e.preventDefault();	//阻止页面的默认滚动。
                    if (e.keyCode == 38) {
                        pageIndex--;
                    }
                    else if (e.keyCode == 40) {
                        pageIndex++;
                    }
                    pageIndex = pageIndex > pageNum - 1 ? pageNum - 1 : pageIndex;//验收
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
        $con.animate({'top': -pageTopValueArr[pageIndex]}, 1000, 'easieEaseInOutQuart');

        var cirArr = [0, 1, 2, 3, 4, 5, 5];
        $cirLis.eq(cirArr[pageIndex]).addClass('cur').siblings().removeClass('cur');

        AnimateInArr[pageIndex]();
        AnimateOutArr[oldIndex]();
    }


    //AnimateJSON.................................................................
    AnimateInArr = [
        function () {
        },
        function () {
        },
        function () {
            $('.page2 img').show().css({'top': '80%', 'opacity': 0}).animate({'top': '20%', 'opacity': 1}, 1200);
        },
        function () {
        },
        function () {
        },
        function () {
        }
    ];
    AnimateOutArr = [
        function () {
        },
        function () {
        },
        function () {
            $('.page2 img').fadeOut(800);
        },
        function () {
        },
        function () {
        },
        function () {
        }
    ];


})