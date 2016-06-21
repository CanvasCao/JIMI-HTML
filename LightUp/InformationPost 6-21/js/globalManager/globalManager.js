/**
 * Created by Administrator on 2016/6/21.
 */
(function (w, d, $, undefined) {
    var globalManager = {};

    globalManager.JM = globalManager.jQueryMap = {};


    //insert和select共享的paras............................................................
    globalManager.ajaxParas = {};

    //保存了点亮的数字的对象数组 是老孙返回给我的数据库groupBy以后的数据
    globalManager.lightUpData = null;

    //light的clientXY所在的dom元素的位置和类型
    globalManager.element = null;
    globalManager.elementType = 0; //1文字 2图片 3离散图

    w.GM=w.globalManager = globalManager;
})(window, document, $);
