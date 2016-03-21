;
(function (w, d, undefined) {
    function JmSdkComponent(container, data, ajaxJson) {
        console.log(new Date().getTime())
        this.C = this.container = container;

        //data是其他的参数 比方click时候传入的其他参数
        this.data = data;

        //初始化图1用的ajaxJson
        this.ajaxJson = ((typeof ajaxJson) == 'string') ? JSON.parse(ajaxJson) : ajaxJson;
        this.pname = this.ajaxJson.pname || '暂无数据';
        this.alias = this.ajaxJson.alias || '无';
        this.brand = this.ajaxJson.brand || '无';
        this.formula = this.ajaxJson.formula;
        this.specification = this.ajaxJson.specification || '无';
        this.methods = this.ajaxJson.methods || '无';
        this.feature = this.ajaxJson.feature || [];


        this.config = {
            height: 520,
            width: 420,
            canvasHeight: 280
        };
        this.init();
    }

    JmSdkComponent.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            $(this.C).html("<div class='jimi-arrow'></div><div class='jimi-scrOut'></div>")
            $(this.C).find('.jimi-scrOut').html("<div class='jimi-scrIn'></div>")

            //内部 顶部标签 和匹配度 是固定的
            var str = "<div class='jimi-top'><div class='jimi-topTxt'>温碧泉</div></div>";
            str += "<div class='jimi-matching'></div>"


            //内部还有3个jimi-content
            var contentArr = ['成分分布', '产品参数', '标签']
            for (i = 0; i < 3; i++) {
                str += "<div class='jimi-content'>" +
                    "<div class='jimi-title'>" + contentArr[i] + "</div>" +
                    "</div>";
            }
            $(this.C).find('.jimi-scrIn').html(str);


            //成分分布
            $(this.C).find('.jimi-content').eq(0).append('<div class="jimi-canvasBox"></div>');


            //产品参数
            var arr = ['pname', 'specification', 'alias', 'brand', 'methods'];
            var arrChi = ['品名', '容量', '别名', '品牌', '使用方法'];
            var str = "<div class='jimi-param'><ul>"
            for (i = 0; i < 5; i++) {
                str += '<li>' +
                    "<span class='jimi-sp1'>" + arrChi[i] + "</span><span class='jimi-sp2'>" + this[arr[i]] + "</span>" +
                    '</li>'
            }
            str += "</ul></div>"
            str += '<div class="jimi-clickMore" style="display:none;"><span>查看更多 ↓</span></div>'
            $(this.C).find('.jimi-content').eq(1).append(str)


            //标签
            var str = '';
            str += "<div class='jimi-label'>" + "<ul>"
            for (i = 0; i < this.feature.length; i++) {
                str += '<li>' + this.feature[i] + '</li>'
            }
            str += "</ul>" + "</div>"
            $(this.C).find('.jimi-content').eq(2).append(str)


        },
        initCSS: function () {
            //父容器设置宽高
            $(this.C).css({
                width: this.config.width,
                height: this.config.height,
                margin: '10px 0px 0px 0px',
                'box-shadow': '5px 5px 40px rgba(0, 0, 0, 0.5)',
                font: "12px '微软雅黑'"
            })

            $(this.C).find('.jimi-arrow').css({
                position: 'absolute',
                width: '17px',
                height: '11px',
                left: '15px',
                top: '-11px',
                background: 'url(images/icon1.png) no-repeat'
            })

            $(this.C).find('.jimi-scrOut').css({
                'background-color': '#0093ff',
                width: this.config.width,
                height: this.config.height,
                overflow: 'hidden'
            })

            $(this.C).find('.jimi-scrIn').css({
                'background-color': '#fff',
                width: this.config.width + 30,
                height: this.config.height,
                'overflow-y': 'auto'
            })

            //顶部........................................................
            $(this.C).find('.jimi-top').css({
                height: '60px',
                background: '#2BA5DD url(images/icon3.png) no-repeat right 40px center'
            })

            $(this.C).find('.jimi-topTxt').css({
                'font-weight': 'bold',
                'font-size': '14px',
                color: '#fff',
                'line-height': '60px',
                'padding-left': '15px'
            })
            //...............................................................


            //内容和内容标签..................................................
            $(this.C).find('.jimi-content').css({
                    'border-bottom': '1px solid #eaeaea',
                    padding: '10px 0',
                    float: 'left'
                }
            )

            $(this.C).find('.jimi-title').css({
                padding: '0 25px 0 15px',
                'line-height': '25px',
                background: '#dcebf2 url(images/icon2.png) no-repeat right center',
                height: '25px',
                display: 'inline-block',
            })
            //...............................................................

            //canvas..........................................................
            $(this.C).find('.jimi-canvasBox').css({
                width: this.config.width,
                height: this.config.canvasHeight
            })
            //...............................................................


            //产品参数.......................................................
            $(this.C).find('.jimi-param')
                .find('ul').css({
                    margin: "10px 0 0 15px"
                }).end()
                .find('li').css({
                    'margin-bottom': '10px',
                    display: 'block',
                    float: 'left'
                }).end()
                .find('span').css({
                    display: 'block',
                    float: 'left',
                    'word-wrap': 'break-word'
                }).end()
                .find('.jimi-sp1').css({
                    width: '75px'
                }).end()
                .find('.jimi-sp2').css({
                    width: '315px'
                }).end()
            //...............................................................


            //点击伸缩
            $(this.C).find('.jimi-clickMore').css({
                width: '100%',
                float: 'left',
                'text-align': 'center',
                color: '#000',
                'margin-bottom': '10px'
            }).find('span').css({
                'background-color': '#fff',
                border: '1px solid #000',
                padding: '5px'

            })


            $(this.C).find('.jimi-label').find('ul').css({
                margin: '10px 15px 0 0',
                width: '100%',
            }).find('li').css({
                float: 'left',
                height: '26px',
                margin: '0px 0 10px 10px',
                padding: '0 9px',
                border: '1px solid #36aadf',
                color: '#36aadf',
                'line-height': '26px',
            })

        },
        bindEvent: function () {
            var that = this;
            //canvasBox
            var canvasBox = $(that.C).find('.jimi-canvasBox')[0];
            var mychart = echarts.init(canvasBox);
            mychart.setOption(window.echartJson);

            //超过五个能缩放
            flex();
            function flex() {
                var $jimiParam = $(that.C).find('.jimi-param');
                var $jimiClickMore = $(that.C).find('.jimi-clickMore');
                var $jimiClickMoreSpan = $jimiClickMore.find('span');
                var paramLen = $jimiParam.find('li').length;
                if (paramLen > 4) {
                    $jimiParam.find("li:gt(3)").hide();
                    $jimiClickMore.show();

                    $jimiClickMore.click(function () {
                        if ($jimiClickMoreSpan.html() == "查看更多 ↓") {
                            $jimiParam.find("li:gt(3)").slideDown();
                            $jimiClickMoreSpan.html("折叠栏目 ↑")
                        }
                        else {
                            $jimiParam.find("li:gt(3)").slideUp();
                            $jimiClickMoreSpan.html("查看更多 ↓");
                        }
                    })
                }

            }


            console.log(new Date().getTime())
        }
    }

    w.JmSdkComponent = JmSdkComponent;
})
(window, document)