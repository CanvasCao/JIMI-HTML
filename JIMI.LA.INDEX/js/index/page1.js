(function (w, d, $) {
    $page1 = $('.page1');

    //scanBar动画
    $scanBar = $page1.find('.scanBar')
    var timer = null;
    var isTop = true;
    var duration = 1000;
    $page1.find('.bottle').hover(function () {
        $page1.find('.hoverArea').animate({opacity: 1}, 'fast');
        timer = setTimeout(move, 50);

    }, function () {
        $page1.find('.hoverArea').animate({opacity: 0}, 'fast');
        timer = null;
    });

    //递归
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



})(window, document, $);


(function (w, d, $) {
    $page2 = $('.page2');

})(window, document, $)