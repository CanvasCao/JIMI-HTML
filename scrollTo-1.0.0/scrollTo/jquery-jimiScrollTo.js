;
(function ($) {
    //this�ǰ�ť���� jqObj�ǰ�ť����ƶ���jqObj����
    $.fn.jimiScrollTo = function (jqObj, sourceJson) {
        //��һ���൱�����ݵ�������
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