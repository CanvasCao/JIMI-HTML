/**
 * Created by Administrator on 2016/4/25.
 */
(function (w, d, $) {
    $page2 = $('.page2');
    $cars=$page2.find('.carousel');

    //电脑内部的轮播
    var cIndex = 0;//电脑内部的轮播序号
    var cNext = 0;
    var clen=3;//轮播数量


    //init.................................
    $cars.eq(0).css({left:0}).siblings().css({left:'100%'});

    //event................................
    $page2.find('.pc').click(function () {
        if (!$cars.is(':animated')) {

            $cars.eq(cIndex).animate({left:'-100%'},'slow','easieEaseInOutQuart');
            cNext=(cIndex+1)>=clen?0:(cIndex+1);
            $cars.eq(cNext).css({left:'100%'}).animate({left:0},'slow','easieEaseInOutQuart',function(){
                cIndex=(cIndex+1)>=clen?0:(cIndex+1);
            });
        }

    });
})(window, document, $)