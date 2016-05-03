  $('#fancymenu li').eq(3).hover(function () {
            $(this).find('.mtct').stop().fadeIn('fast');
        }, function () {
            $(this).find('.mtct').stop().fadeOut('fast');
        })