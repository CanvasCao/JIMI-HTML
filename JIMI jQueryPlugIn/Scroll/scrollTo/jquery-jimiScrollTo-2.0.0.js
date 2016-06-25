;
(function ($) {
    //this是按钮集合 jqObj是按钮点击移动到jqObj顶部
    $.fn.jimiScrollTo = function (jqObj, sourceJson, curBtnClassName) {
        var that = this;
        //这一步相当于数据的适配器
        var json = {marginTop: 105};
        for (k in sourceJson) {
            json[k] = sourceJson[k];
        }

        //console.log(json)

        var scrollTopArr = [];
        for (i = 0; i < jqObj.length; i++) {
            scrollTopArr.push($(jqObj[i]).offset().top - json.marginTop);
        }

        var intervalArr = [];
        intervalArr.push([0, scrollTopArr[0]]);
        for (i = 0; i < scrollTopArr.length - 1; i++) {
            intervalArr.push([scrollTopArr[i], scrollTopArr[i + 1]]);
        }
        intervalArr.push([scrollTopArr[scrollTopArr.length - 1], Number.MAX_VALUE]);
        //console.log(intervalArr)
        $(this).click(function () {
            var index = $(this).index();
            //console.log(index);
            //console.log(scrollTopArr[index])
            $('html,body').animate({'scrollTop': scrollTopArr[index]}, 'slow', 'swing', function () {
                checkAlign();
            })
        })


        $(window).scroll(function () {
            checkAlign();
        })

        //init..................................................
        checkAlign()
        function checkAlign() {
            if (curBtnClassName) {
                var curScrollTop = $('html').scrollTop() || $('body').scrollTop();
                for (i = 0; i < intervalArr.length; i++) {
                    if (curScrollTop >= intervalArr[i][0] && curScrollTop <= intervalArr[i][1]) {
                        var laibuji = i;
                        //console.log(laibuji)
                        laibuji = (laibuji == (intervalArr.length - 1)) ? intervalArr.length - 2 : laibuji;
                        //console.log(laibuji)

                        $(that).eq(laibuji).addClass(curBtnClassName).siblings().removeClass(curBtnClassName);
                        //console.log(i);
                        $(that).find('.tri').hide();
                        $(that).find('.tri').eq(laibuji).show();
                        //console.log(i)
                        return;
                    }
                }
            }
        }

        return this;
    }
})(jQuery);