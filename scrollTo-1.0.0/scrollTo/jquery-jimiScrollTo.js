;
(function ($) {
    //this是按钮集合 jqObj是按钮点击移动到jqObj顶部
    $.fn.jimiScrollTo = function (jqObj, sourceJson) {
        //这一步相当于数据的适配器
        var json = {marginTop: 15};
        for (k in sourceJson) {
            json[k] = sourceJson[k];
        }
        //console.log(json)

        var scrollTopArr = [];
        for (i = 0; i < jqObj.length; i++) {
            scrollTopArr.push($(jqObj[i]).offset().top - json.marginTop);
        }
        //console.log(scrollTopArr)
        this.click(function () {
            var index = $(this).index();
            $('html,body').animate({'scrollTop': scrollTopArr[index]}, 'normal', 'swing')
        })

        return this;
    }
})(jQuery);