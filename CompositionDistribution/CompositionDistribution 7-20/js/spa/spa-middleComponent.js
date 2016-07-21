;
(function (w, d, $, undefined) {
//version 1.0.2 中间改成a标签 最大显示长度为18+...
//2016-4-19 11:32:15
    function MiddleComponent(container, data) {
        this.C = this.container = container;
        this.data = data;
        this.config = {
            backgroundColor: 'white',
            colorList: {
                conditioner: '#fba41a',//调理
                emollient: '#3982e1',//柔润
                sunScreener: '#23ad39', //防晒
                sensitization: '#e5004f', //致敏
                safe: '#555',
            }
        };
        this.init();
    }

    MiddleComponent.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            //对象数组
            var componentsWithIdArr = this.data.component;

            //拼加组件
            $(this.C).html('<div class="typeCom"></div><div class="safeCom"></div>');

            var str = '';
            if (componentsWithIdArr) {
                [].forEach.call(componentsWithIdArr, function (e, i, arr) {
                    var oriName = e.name;
                    var oriId = e['obj_id'];
                    var pname = (oriName.length > 18) ? oriName.substr(0, 18) + '...' : oriName;
                    var href = '{"type":5,"fid":"' + oriId + '"}';
                    var eventData = " href=jimi://" +Base64.encode(href) + "";
                    var oriData = " data-ori='" + oriName + "' ";

                    //str.........................................
                    str += '<a ' + eventData + oriData + ' >' + pname + '</a>';
                })
            }

            else {
                str += '<a>暂无成分</a>'
            }

            $(this.C).find('.typeCom,.safeCom').html(str);

            //第一个显示 第二个隐藏
            $(this.C).children('div').eq(0).show().siblings().hide();

        },
        initCSS: function () {
            var that = this;

            $(this.C).css({
                'background-color': that.config.backgroundColor,
                'padding-bottom': '80px',
                'text-align': 'center',
                'font-size': '12px'
            })
            $(this.C).find('a').css({
                border: '1px solid ' + that.config.colorList.safe,
                display: 'inline-block',
                padding: '5px 16px',
                'margin': '5px 5px',
                'border-radius': 20,
                color: that.config.colorList.safe,

            })


            //给文字加颜色了
            if (that.data.type) {
                $(this.C).find('.typeCom a').each(function (i, e) {
                    var $that = $(this);
                    var oriName = $(this).attr('data-ori');
                    [].forEach.call(that.data.type, function (e, i, arr) {
                        var name = e.name;
                        var arr = e.arr;
                        if ($.inArray(oriName, arr) != -1) { //!=-1说明在数组里
                            $that.css({
                                'color': that.config.colorList[name],
                                'border-color': that.config.colorList[name]
                            })
                        }
                    })
                });
            }
            if (that.data.safe) {
                $(this.C).find('.safeCom a').each(function (i, e) {
                    var $that = $(this);
                    var oriName = $(this).attr('data-ori');
                    [].forEach.call(that.data.safe, function (e, i, arr) {
                        var name = e.name;
                        var arr = e.arr;
                        if ($.inArray(oriName, arr) != -1) { //!=-1说明在数组里
                            $that.css({
                                'color': that.config.colorList[name],
                                'border-color': that.config.colorList[name]
                            })
                        }
                    })
                });
            }

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.MiddleComponent = MiddleComponent;
})(window, document, jQuery)


