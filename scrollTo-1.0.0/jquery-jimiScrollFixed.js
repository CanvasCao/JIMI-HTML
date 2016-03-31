;
(function ($) {
    $.fn.jimiScrollFixed = function (json) {
        var that = this;
        var fixedMarginTop=json.fixedMarginTop||15;


        //��õ�ǰԪ�ؾ��� ���������ľ���
        //��Ϊ��Ԫ�ػ��ڴ���fixed��ʱ�� topֵ��֪��15 left����һ��ʼ��Ԫ�ػ������ľ���
        var fixedTop = $(this[0]).offset().top;
        var fixedLeft = $(this[0]).offset().left;

        //������Ҫfixed��Ԫ�صı����������ĵ���
        var oriPos = that.css('position');

        $(window).size(function(){

        })


        $(window).scroll(function () {
            //���ϻ�õ�ǰbody����ȥ����            
			var winScrollTop = $('body').scrollTop()||$('html').scrollTop();

            if (winScrollTop+fixedMarginTop >= fixedTop) {
                that.css({
                    'position': 'fixed',
                    top: fixedMarginTop,
                    //left: fixedLeft
                })
            }
            else {
                if (oriPos == 'absolute') {
                    that.css({
                        'position': oriPos,
                        top: fixedTop
                    })
                }
                else if (oriPos == 'static') {
                    that.css({
                        'position': oriPos
                    })
                }

            }
        })
        return this;
    }
})(jQuery);