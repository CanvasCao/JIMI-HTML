;
(function (w, d, undefined) {
//version 1.0.0
//create by CAO on 2016/3/8

    function MiddleComponent(container, data) {
        this.container = container;
        this.data = data;
        this.config = {
            backgroundColor: '#f3f3f3',
            colorList: {
                conditioner: '#ff9000',//调理
                emollient: '#018cff',//柔润
                sunScreener: '#52d200', //防晒
                sensitization: '#ff4005'//致敏
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

            $(this.container).html('').html('<div class="typeCom"></div><div class="safeCom"></div>');

            var str = '';
            for (i = 0; i < this.data.component.length; i++) {
                str += '<span>' + this.data.component[i] + '</span>' + ( (i == this.data.component.length - 1) ? "" : "、")
            }

            $('.typeCom,.safeCom').html(str);

            //第一个显示 第二个隐藏
            $('.typeCom').show().siblings().hide();
        },
        initCSS: function () {
            var that = this;

            $(this.container).css({
                'line-height': '30px',
                padding: '15px',
                'background-color': that.config.backgroundColor
            }).css('padding-bottom','80px')//成分很长的时候看见最后几排

            //给文字加颜色了
            $('.typeCom').find('span').map(function () {
                var innerHtml = $(this).html(); //span是单个成分
                for (i = 0; i < that.data.type.length; i++) {//遍历过来的 type数组
                    var name = that.data.type[i].name;
                    var arr = that.data.type[i].arr;

                    if ($.inArray(innerHtml, arr) != -1) { //!=-1说明在数组里
                        $(this).css({'color': that.config.colorList[name]})
                    }
                }
            })

            $('.safeCom').find('span').map(function () {
                var innerHtml = $(this).html(); //span是单个成分
                for (i = 0; i < that.data.safe.length; i++) {//遍历过来的 type数组
                    var name = that.data.safe[i].name;
                    var arr = that.data.safe[i].arr;

                    if ($.inArray(innerHtml, arr) != -1) { //!=-1说明在数组里
                        $(this).css({'color': that.config.colorList[name]})
                    }
                }
            })

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.MiddleComponent = MiddleComponent;
})(window, document)


