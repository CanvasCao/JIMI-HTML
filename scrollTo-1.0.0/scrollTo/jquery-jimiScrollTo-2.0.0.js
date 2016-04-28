;
//2.0.0可以给$()对象增加marginTop适配器 或者加减className了
(function ($) {
    //this是按钮集合 jqObj是按钮点击移动到jqObj顶部
    $.fn.jimiScrollTo = function (jqObj, sourceJson, curBtnClassName) {
        var that = this;
        //这一步相当于数据的适配器
        var json = {marginTop: 15};
        for (k in sourceJson) {
            json[k] = sourceJson[k];
        }

        //console.log(json)

        //右侧滚动位置数组
        var scrollTopArr = [];
        for (i = 0; i < jqObj.length; i++) {
            scrollTopArr.push($(jqObj[i]).offset().top - json.marginTop);//滚动位置减去15是为了稍微往上滚一点 这样右侧就会稍微偏下一点
        }

        //滚动区间数组 数量=右侧滚动位置数组+1
        var intervalArr = [];
        intervalArr.push([0, scrollTopArr[0]]);
        for (i = 0; i < scrollTopArr.length - 1; i++) {
            intervalArr.push([scrollTopArr[i], scrollTopArr[i + 1]]);
        }
        //最后加入最后一个到正无穷区间
        intervalArr.push([scrollTopArr[i], Number.MAX_VALUE]);


        //scrollTopArr是给click事件对齐用的
        $(this).click(function () {
            var index = $(this).index();
            $('html,body').animate({'scrollTop': scrollTopArr[index]}, 'slow', 'swing')
        })


        //intervalArr是给scroll事件对齐用的
        $(window).scroll(function () {
            checkAlign();
        })

        //init................................................
        checkAlign();

        function checkAlign() {
            //有ClassName我判断滚动位置再加减className
            if (curBtnClassName) {
                var curScrollTop = $('html').scrollTop() || $('body').scrollTop();
                for (i = 0; i < intervalArr.length; i++) {
                    if (curScrollTop >= intervalArr[i][0] && curScrollTop <= intervalArr[i][1]) {
                        $(that).eq(i).addClass(curBtnClassName).siblings().removeClass(curBtnClassName);
                    }
                }

            }
        }

        return this;
    }
})(jQuery);