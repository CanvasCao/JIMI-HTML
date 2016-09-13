/**
 * Created by Administrator on 2016/6/17.
 */
(function (w, d, $, undefined) {
    var controller = {};

    controller.ifAjaxing = false;

    controller.getExchangeCode = function (code, callback) {

        alert('兑换码不正确');
//        $.ajax({
//            type: "post",
//            url: 'http://n1.jimi.la/apps_TN/getExchangeCode.php',
////                url: 'package.json',
//            data: {exchangeCode:code},
//            dataType: "jsonp",
//            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
//            jsonpCallback: "jsonpcallback",
//            success: function (data) {
//                console.log(JSON.stringify(data));
//            },
//            error: function (err) {
//                console.log('ERROR!');
//                console.log(err);
//
//            }
//        });
    };

    w.controller = controller;
})(window, document, $)
