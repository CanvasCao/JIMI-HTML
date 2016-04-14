;
(function (w, d, $, undefined) {
//version 1.0.1
//2016-4-14 16:24:52
    function MiddleComponent(container, data) {
        this.C = this.container = container;
        this.data = data;
        //console.log(JSON.stringify(data))
        this.config = {
            backgroundColor: 'white',
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

            $(this.C).html('<div class="typeCom"></div><div class="safeCom"></div>');

            var str = '';
            for (i = 0; i < this.data.component.length; i++) {
                var pname = (this.data.component[i].length > 12) ? this.data.component[i].substr(0, 12) + '...' : this.data.component[i]
                //console.log(pname)
                str += '<span>' + pname + '</span>'
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
                'font-size':'12px'
            })
            $(this.C).find('span').css({
                border: '1px solid black',
                display: 'inline-block',
                padding: '5px 16px',
                'margin': '5px 5px',
                'border-radius': 20

            })


            //给文字加颜色了
            $(this.C).find('.typeCom span').map(function () {
                var innerHtml = $(this).html(); //span是单个成分
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

            $(this.C).find('.safeCom span').map(function () {
                var innerHtml = $(this).html(); //span是单个成分
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

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.MiddleComponent = MiddleComponent;
})(window, document, jQuery)


