function app() {

    //init 头部图片起始位置................................................................
    $('#con').css({width: $(window).width(), height: $(window).height()})
    $('.titleImg').css({height: 400});


    //jqObj............................................................................
    var $txtContainer = $('.txtContainer');
    var $light = $('.light');
    //initLightPos.........................................................................
    var winH=$(window).height();
    $light.css({top: 1 / 3 * winH - 120});

    //点亮标签相关 全局变量...................................................................................
    var ifDragging = false;
    var ifMoved = false;
    var mouseDown = {x: 0, y: 0};
    var mouseCurrent = {x: 0, y: 0};
    var timer = null; //setTimeOut的定时器
    var lightState = {
        touchStart: {
            'box-shadow': '0 0px 0px 15px rgba(70,170,255,0.2)',
        },
        touchMove: {
            transition: 'all 0s ease',
            'pointer-events': 'none'
        },
        touchEnd: {
            transition: 'all 0.7s ease-in-out',
            transform: 'translate3d(0px,0px,0px)',
            'pointer-events': 'auto',
            'box-shadow': '0 2px 4px 1px rgba(0, 0, 0, 0.8)',
        }
    }


    $('.light')[0].addEventListener('touchstart', function (e) {
        //if (globalManager.lightUpMask.ifShow) {
        //    e.preventDefault();
        //    return;
        //}

        var touch = e.touches[0];
        mouseDown.x = touch.clientX;
        mouseDown.y = touch.clientY;
        ifDragging = true;
        $light.css(lightState.touchStart);

    }, false)

    window.addEventListener('touchmove', function (e) {
        //light不能拖动
        //if (globalManager.lightUpMask.ifShow) {
        //    e.preventDefault();
        //    return;
        //}

        if (ifDragging) {
            e.preventDefault();


            ifMoved = true;//标记移动
            var touch = e.touches[0];
            mouseCurrent.x = touch.clientX;
            mouseCurrent.y = touch.clientY;
            lightState.touchMove.transform = 'translate3d(' + (mouseCurrent.x - mouseDown.x) + 'px,' + (mouseCurrent.y - mouseDown.y) + 'px,0px)';
            $light.css(lightState.touchMove);


            ClearTimer();
            timer = setTimeout(function () {
                LightUp();
            }, 200);

        }
    }, false)

    //window.addEventListener('touchend', function (e) {
    //    //e.preventDefault();
    //    if (ifDragging && ifMoved) {
    //        ClearTimer();
    //
    //        if (LightUp()) {
    //            ResetAjaxParas();
    //            GM.ajaxParas.curPage = 1; //点亮成功一定是请求第一页
    //
    //            GM.lightUpMask.clear();
    //            GM.lightUpMask.show();
    //            controller.getLightUp(GM.ajaxParas, null);
    //        }
    //        ifDragging = false;
    //        ifMoved = false;
    //    }
    //    $light.css(lightState.touchEnd);
    //}, false)

    function ClearTimer() {
        clearTimeout(timer);
        delete(timer);
    }

    function RemoveClass() {
        $('.paragraphImg,.paragraphWeb,.sentence').removeClass('active'); //removeAll
    }

    function AddClass() {
        var type = GM.elementType;
        if (type == 1) {
            $(GM.element).closest('.sentence').addClass('active');
        } else if (type == 2) {
            $(GM.element).parent('.paragraphImg').addClass('active');
        } else if (type == 3) {
            $(GM.element).closest('.paragraphWeb').addClass('active');
        }
    }

    function GetTypeFromElement() {
        var ele = GM.element;
        if ($(ele).closest('.sentence').length) {
            return 1;
        }
        else if ($(ele).closest('.paragraphImg').length) {
            return 2;
        } else if ($(ele).closest('.paragraphWeb').length) {
            return 3;
        } else {
            return null;
        }
    }

    //UI层点亮函数 返回布尔是否点亮成功 刷新全局ele和eleType
    function LightUp() {
        GM.element = document.elementFromPoint(mouseCurrent.x, mouseCurrent.y);

        globalManager.elementType = GetTypeFromElement();

        if (globalManager.elementType != 0) {
            RemoveClass();
            AddClass();
            return true;
        }

        return false;
    };

    //重新设置全局的ajax参数 此时element改了 所以全局ajax参数也改了
    function ResetAjaxParas() {
        if (GM.elementType == 1) { //判断当前是类图片还是文字
            var paragraph = $(GM.element).closest('.paragraph').index('.paragraph');
            var sentence;

            var $sentence = $(GM.element).closest('.sentence');
            var $parent = $(GM.element).closest('.sentence').parent();
            var $sens = $parent.find('.sentence');
            for (i = 0; i < $sens.length; i++) {
                if ($sentence[0] == $sens.eq(i)[0]) {
                    sentence = i;
                    break;
                }
            }

            GM.ajaxParas.type = GM.elementType;
            GM.ajaxParas.paragraph = paragraph;
            GM.ajaxParas.sentence = sentence;

        }
        else if (GM.elementType == 2) {
            var paragraph = $(GM.element).closest('.paragraphImg').index('.paragraphImg');
            GM.ajaxParas.type = GM.elementType;
            GM.ajaxParas.paragraph = paragraph;


        }
        else if (GM.elementType == 3) {
            var paragraph = $(GM.element).closest('.paragraphWeb').index('.paragraphWeb');
            GM.ajaxParas.type = GM.elementType;
            GM.ajaxParas.paragraph = paragraph;

        }
    }

    //count类名 相关的方法
    function addCount(eleType, paragraph, sentence, count) {
        if (count == 0) { //0吐槽的时候就会不显示
            return;
        }

        var $ele = null;
//                    count前面的元素加addClass init类名
        if (eleType == 1) {
            $ele = $('.paragraph').eq(paragraph).find('.sentence').eq(sentence);
        } else if (eleType == 2) {
            $ele = $('.paragraphImg').eq(paragraph);
        } else if (eleType == 3) {
            $ele = $('.paragraphWeb').eq(paragraph);
        }

        $ele.addClass('init').find('.count').html(count + '吐槽').fadeIn();//显示吐槽数量
    }

    function updateCount() {
        var $ele = null;
        var para = GM.ajaxParas;
//                    count前面的元素加addClass init类名
        if (para.type == 1) {
            $ele = $('.paragraph').eq(para.paragraph).find('.sentence').eq(para.sentence);
        } else if (para.type == 2) {
            $ele = $('.paragraphImg').eq(para.paragraph);
        } else if (para.type == 3) {
            $ele = $('.paragraphWeb').eq(para.paragraph);
        }

        var count = parseInt($ele.find('.count').html()) || 0;
        $ele.addClass('init').find('.count').html(count + 1 + '吐槽').fadeIn();//显示吐槽数量
    }

    GM.updateCount = updateCount; //暴露给inputBox输入完以后更新用了


    //这里的ajax只是为了绑定起始数据..........................................................................
    $.ajax({
        type: "get",
        url: jimiHost + '/informationPost.php' + window.location.search,
//            url: 'r.json',
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function (data) {
            console.log(JSON.stringify(data));
            $('body').animate({opacity: 1});

            //txtContainer容器 绑定数据
            var text = data.content;
            $txtContainer.html(text);
            labelAdapter($txtContainer);//适配标签...........................................................

            //这一步Ajax 递归绑定肌秘yunying的数据.............................................................
            var $jimiYunYing = $('.jimi-Yunying'); //jq对象

            (function ajaxComplete(index) {
                if (index == $jimiYunYing.length) {

                    //这里代表数据绑定完可以显示有点亮的数据
                    initCss(data.lightUpData);
                    function initCss(lightUpData) {
//                                    console.log(JSON.stringify(lightUpData));
                        [].forEach.call(lightUpData, function (e, i, arr) {
                            addCount(e.type, e.paragraph, e.sentence, e.count);
                        })
                    }


                    //JS bridge............................................................................
                    function setupWebViewJavascriptBridge(callback) {
                        if (window.WebViewJavascriptBridge) {
                            return callback(WebViewJavascriptBridge);
                        }
                        if (window.WVJBCallbacks) {
                            return window.WVJBCallbacks.push(callback);
                        }
                        window.WVJBCallbacks = [callback];
                        var WVJBIframe = document.createElement('iframe');
                        WVJBIframe.style.display = 'none';
                        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                        document.documentElement.appendChild(WVJBIframe);
                        setTimeout(function () {
                            document.documentElement.removeChild(WVJBIframe)
                        }, 0)
                    }

                    setupWebViewJavascriptBridge(function (bridge) {

                        bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
                            if (data.CRDetailRecommendDY) {
                                var dy = data.CRDetailRecommendDY
                                $light.stop().animate({top: (1 / 3 * winH - 120 + dy)}, 'fast', 'swing');
                            }
                            else if (data.removeClass) {
                                if (data.removeClass) {
                                    RemoveClass();
                                }
                            }
                            else if (data) {
                                addCount(data.type, data.paragraph, data.sentence, data.count);
                            }
                            var responseData = {'CaoYuhao Says': 'Right back Bitch!!!'}
                            responseCallback(responseData)
                        })


                        window.addEventListener('touchend', function (e) {
                            if (ifDragging && ifMoved) {
                                ClearTimer();

                                if (LightUp()) {
                                    ResetAjaxParas();
                                    bridge.callHandler('testObjcCallback', GM.ajaxParas, function (response) {
                                    })
                                }

                                ifDragging = false;
                                ifMoved = false;
                            }
                            $light.css(lightState.touchEnd);
                        }, false);

                        //点亮的count被点击的时候
                        $('.count').click(function () {
                            var $that = $(this);
                            GM.element = $that[0];
                            GM.elementType = GetTypeFromElement(GM.element);
                            ResetAjaxParas();
                            bridge.callHandler('testObjcCallback', GM.ajaxParas, function (response) {
                            })
                        })
                    })
                    console.log('下标溢出');
                    return;
                }

                var jqObj = $jimiYunYing.eq(index);
                var pid = jqObj.attr('data-pid');
                $.ajax({
                    type: "get",
                    url: jimiHost + '/formual_safe.php?pid=' + pid,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "jsonpcallback",
                    success: function (data) {
//                                  console.log(JSON.stringify(data))
                        jqObj.html('<div class="header"></div>' +
                            '<div class="navBar"></div>' +
                            '<div class="productDetailCanvas"></div>');

                        var header = new Header(jqObj.find('.header')[0], data);
                        var navBar = new NavBar(jqObj.find('.navBar')[0], {
                            navImg: "img/navBar/b.png",
                            navTxt: '产品参数',
                        });
                        jqObj.find('.navBar').css({'position': 'relative'})
                            .append(' <img src="img/navBar/arrow.png" height="12px"  style="float: right;margin-top: 3px"/>')
                            .append('<a></a>');


                        var href = base64_encode('{ "type": 4, "objId": "' + pid + '","altBtnIndex":0}');
                        jqObj.find('.navBar a').css({
                            'position': 'absolute', width: '100%', height: '100%', left: 0, top: 0,
                        }).attr({href: 'jimi://' + href});
//

                        var pdc = new ProductDetailCanvas(jqObj.find('.productDetailCanvas')[0], data, false);

                        //count标签
                        jqObj.append('<span class="count"></span>');

                        //递归..............................................................................
                        ajaxComplete(index + 1);
                    },
                    error: function (err) {
                        console.log('YUNYING ERROR!');
                        console.log(err);

                        //递归..............................................................................
                        ajaxComplete(index + 1);

                    }
                });
            })(0);
        },
        error: function (err) {
            console.log('ERROR!');
            console.log(err);
        }
    });
}