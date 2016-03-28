;
(function ($) {
    $.fn.jimiScrollFixed = function (json) {
        var that = this;
        var fixedMarginTop=json.fixedMarginTop||15;


        var fixedTop = $(this[0]).offset().top;
        var fixedLeft = $(this[0]).offset().left;
        var oriPos = that.css('position');
        $(window).scroll(function () {
            var winScrollTop = ($('body').scrollTop());
            if (winScrollTop+fixedMarginTop >= fixedTop) {
                that.css({
                    'position': 'fixed',
                    top: fixedMarginTop,
                    left: fixedLeft
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