/**
 * Created by Administrator on 2016/5/25.
 */
var ua = navigator.userAgent;
if (ua.charAt('iphone') != -1 && ua.charAt('Mac') != -1) {//说明不是IPHONE
    $('.downloadBtn').click(function () {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jimi.skinsecret#opened';
    })
}
else {
    $('.downloadBtn').click(function () {
        window.location.href = 'https://itunes.apple.com/us/app/id1074206874';
    })
}