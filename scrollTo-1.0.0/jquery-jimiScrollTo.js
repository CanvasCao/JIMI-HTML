;
(function ($) {
    $.fn.jimiScrollTo = function (jqObj) {
        var scrollTopArr=[];
        for(i=0;i<jqObj.length;i++){
            scrollTopArr.push($(jqObj[i]).offset().top);
        }
        //console.log(scrollTopArr)
        this.click(function () {
            var index = $(this).index();
            $('html,body').animate({'scrollTop': scrollTopArr[index]}, 'normal', 'swing')
        })

        return this;
    }
})(jQuery);