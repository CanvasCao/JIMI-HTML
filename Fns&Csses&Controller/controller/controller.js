/**
 * Created by Administrator on 2016/6/17.
 */
(function (w, d, $, undefined) {
    var controller = {};

    controller.ifAjaxing=false;

    controller.getSomething = function (callback) {
        $.ajax({
            type: "get",
            url: 'http://n1.jimi.la/apps_T1/WebJsonpTest/test2.php',
            //data: {imgString: dataUrl.substring(22)},
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonpcallback",
            success: function (data) {
                console.log('Success');
                console.log(JSON.stringify(data));
                $('#btn1').html(JSON.stringify(data));
            },
            error: function (err) {
                console.log('Error');
                console.log(JSON.stringify(err));
            }
        });
    };


    controller.postSomething = function (callback) {
        $.ajax({
            type: "post",
            url: 'http://n1.jimi.la/apps_T1/WebJsonpTest/test2.php',
            //data: {imgString: dataUrl.substring(22)},
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonpcallback",
            success: function (data) {
                console.log('Success');
                console.log(JSON.stringify(data));
                $('#btn2').html(JSON.stringify(data));

            },
            error: function (err) {
                console.log('Error');
                console.log(JSON.stringify(err));
            }
        });
    };
    w.controller = controller;
})(window, document, $)
