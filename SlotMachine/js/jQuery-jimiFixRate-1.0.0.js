;
(function ($) {
    $.fn.jimiFixedRate = function (standardWidth) {
        var standardWidth=standardWidth||375;
        var that=this;

        var winH=$(window).height();
        var winW=$(window).width();
        var RATE = winW / standardWidth;


        var h = parseFloat(that.css('height')) * RATE;
        var w = parseFloat(that.css('width')) * RATE;


        that.css({height: h, width: w}).css({'line-height':h+'px','font-size':h*0.6+'px'});

        return this;
    }

})(jQuery);