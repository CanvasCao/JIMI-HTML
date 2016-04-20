;
(function (w, d, $, undefined) {
//version 1.0.2 中间改成a标签 最大显示长度为18+...
//2016-4-19 11:32:15
    function MiddleComponent(container, data) {
        this.C = this.container = container;
        this.data = data;
        //console.log(JSON.stringify(data))
        this.config = {
            backgroundColor: 'white',
            colorList: {
                conditioner: '#fba41a',//调理
                emollient: '#3982e1',//柔润
                sunScreener: '#23ad39', //防晒
                sensitization: '#e5004f', //致敏
                safe: '#949494'
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
            var componentsWithIdArr = this.data.component;//二维数组 [0]是name [1]是id


            $(this.C).html('<div class="typeCom"></div><div class="safeCom"></div>');

            var str = '';
            if (componentsWithIdArr) {
                for (i = 0; i < componentsWithIdArr.length; i++) {
                    var oriName = componentsWithIdArr[i].name;
                    var oriId = componentsWithIdArr[i].obj_id;

                    //pname是字符串截过的
                    var pname = (oriName.length > 22) ? oriName.substr(0, 22) + '...' : oriName;

                    //加跳转事件
                    var event = " href='" + oriId + "' ";
                    //var event = "href='" + "jimi://eyJmaWQiOiI1NjcyNWUwMGVmYjgwYzM0NDUxNzRmNTUifQ==" + "'";

                    //存贮原名
                    var oriData = " data-ori='" + oriName + "' ";
                    str += '<a ' + event + oriData + ' >' + pname + '</a>';
                }
            }

            else {
                str += '<a>暂无成分</a>'
            }

            $(this.C).find('.typeCom,.safeCom').html(str);

            //第一个显示 第二个隐藏
            $(this.C).find('.typeCom').show().siblings().hide();
        },
        initCSS: function () {
            var that = this;

            $(this.C).css({
                //'line-height': '30px',
                padding: '10px',
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
                $(this.C).find('.typeCom a').map(function () {
                    var innerHtml = $(this).attr('data-ori'); //span是单个成分

                    for (i = 0; i < that.data.type.length; i++) {//遍历过来的 type数组
                        var name = that.data.type[i].name;
                        var arr = that.data.type[i].arr;

                        if ($.inArray(innerHtml, arr) != -1) { //!=-1说明在数组里
                            $(this).css({
                                'color': that.config.colorList[name],
                                'border-color': that.config.colorList[name]
                            })
                        }
                    }
                })
            }

            if (that.data.safe) {
                $(this.C).find('.safeCom a').map(function () {
                    var innerHtml = $(this).attr('data-ori'); //span是单个成分

                    for (i = 0; i < that.data.safe.length; i++) {//遍历过来的 type数组
                        var name = that.data.safe[i].name;
                        var arr = that.data.safe[i].arr;

                        if ($.inArray(innerHtml, arr) != -1) { //!=-1说明在数组里
                            $(this).css({
                                'color': that.config.colorList[name],
                                'border-color': that.config.colorList[name]
                            })
                        }
                    }
                })

            }

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.MiddleComponent = MiddleComponent;
})(window, document, jQuery)


