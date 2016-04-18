(function (w, d, $) {
    $page1 = $('.page1');
    $scanBar = $page1.find('.scanBar')
    var timer = null;
    var isTop = true;
    var duration = 1000;
    $page1.find('.hoverArea').hover(function () {
        $(this).animate({opacity: 1}, 'fast');
        timer = setTimeout(move, 50);

    }, function () {
        $(this).animate({opacity: 0}, 'fast');
        timer = null;
    });


    function move() {
        if (!isTop) {
            $scanBar.animate({top: GetRandom(20, 40) + '%'}, duration, 'easieEase', function () {
                isTop = !isTop;
                move();
            });

        }
        else {
            $scanBar.animate({top: GetRandom(70, 90) + '%'}, duration, 'easieEase', function () {
                isTop = !isTop;
                move();
            });
        }
    }

    function GetRandom(begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    }
})(window, document, $)