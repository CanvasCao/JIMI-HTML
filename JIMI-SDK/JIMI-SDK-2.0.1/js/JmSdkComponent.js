;
(function (w, d, undefined) {
    function JmSdkComponent(container, data, ajaxJson) {
        console.log(new Date().getTime())
        this.C = this.container = container;

        //这里的data是其他的参数 比方click时候传入的其他参数
        this.data = data;

        //初始化图1用的ajaxJson 根据接口接受的是data.data
        this.ajaxJson = ((typeof ajaxJson) == 'string') ? JSON.parse(ajaxJson) : ajaxJson;
        this.pname = this.ajaxJson.pname || '暂无数据';
        this.alias = this.ajaxJson.alias || '无';
        this.brand = this.ajaxJson.brand || '无';
        this.specification = this.ajaxJson.specification || '无'; //容量
        this.methods = this.ajaxJson.methods || '无';
        this.feature = this.ajaxJson.feature || [];
        this.formula = this.ajaxJson.formula;
        this.anxindu = this.ajaxJson.anxindu || 30;
        this.pipeidu = this.ajaxJson.pipeidu || 70;

        //第一个canvas的原始json
        this.pieJson = {
            "tooltip": {
                "formatter": "{a} <br/>{b}: {c}种 ({d}%)"
            },
            "textStyle": {
                "fontSize": 12,
//                color:'black'
//                fontWeight:"bolder"
            },
            "series": [
                {
                    "name": "按安全分类", //鼠标hover时的显示的分类
                    "type": "pie",
                    "minAngle": '0',
                    "radius": [0, "35%"],
                    "label": {
                        "normal": {"position": "inner"}
                    },

                    "data": [
                        // {"value": 2, "name": "致敏/致痘"}
                    ],
                },
                {
                    "name": "按成分分类",
                    "type": "pie",
                    "minAngle": '4',
                    "radius": ["45%", "62%"],
                    "data": [
                        //  {"value": 3, "name": "皮肤/头发调理剂"}
                    ]
                }
            ]
            ,
            backgroundColor: '#fff',
            textStyle: {
                fontWeight: 'bolder',
            },
            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
        };

        this.relationJson = {
            title: {
                text: '肌秘科技',
                subtext: 'Echarts',
                top: 'bottom',
                right: 10

            },
            "tooltip": {
                "formatter": "{b}"

            },
            legend: [{//顶部显示
                data: ['皮肤/头发调理剂', '剂型', '皮肤柔润剂', '防晒剂'],
                orient: 'vertical',
                align: 'right',
                right: 10

            }],
            animation: true,
            series: [
                {
                    name: '成分详情',
                    type: 'graph',
                    layout: 'force',
                    data: [
//                            {name: '水', value: 1, category: 0,}
                    ],
                    links: [//{source: '水', target: '二氧化碳'},
                    ],
                    categories: [{name: '皮肤/头发调理剂'}, {name: '剂型'}, {name: '皮肤柔润剂'}, {name: '防晒剂'}],
                    roam: true,
                    label: {
                        normal: {position: 'right', formatter: ''},
                    },
                    force: {
                        edgeLength: 30,
                        gravity: 0.1,
                        repulsion: 100
                    },
                    lineStyle: {
                        normal: {
                            curveness: 0.3
                        }
                    },
                    color: ['#61a0a8', '#d48265', '#91c7ae', '#749f83']
                    //color: ['#c23531', '#314656', '#61a0a8', '#dd8668', '#91c7ae', '#6e7074', '#61a0a8', '#bda29a', '#44525d', '#c4ccd3'],
//                        width:480,
//                        height:280
                }

            ]
        };

        //配置文件
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
            this.bindCanvas();
        },
        initConfig: function () {

        },
        createDom: function () {
            var that = this;
            $(this.C).html("<div class='jimi-arrow'></div><div class='jimi-scrOut'></div>")
            $(this.C).find('.jimi-scrOut').html("<div class='jimi-scrIn'></div>")

            //内部 顶部标签 是固定的
            var str = "<div class='jimi-top'><div class='jimi-topTxt'>" + this.pname + "</div></div>";
            $(this.C).find('.jimi-scrIn').append(str);


            //匹配度 安全度 写死了 罪过
            var str = '<div class="jimi-degree">' +
                '<div class="jimi-degreeTxt">安心度：' + this.anxindu + '%</div>' +
                '<div class="jimi-degreeBar"><div class="jimi-degreeBarBar"><span></span></div></div>' +
                '</div>' +
                '<div class="jimi-degree">' +
                '<div class="jimi-degreeTxt">匹配度：' + this.pipeidu + '%</div>' +
                '<div class="jimi-degreeBar"><div class="jimi-degreeBarBar"><span></span></div></div>' +
                '</div>'
            $(this.C).find('.jimi-scrIn').append(str);
            //改变安全度和匹配度的长度 必须改css
            $(this.C).find('.jimi-degreeBarBar span').eq(0).css({width: that.anxindu + "%", backgroundColor: '#29c741'})
            $(this.C).find('.jimi-degreeBarBar span').eq(1).css({width: that.pipeidu + "%", backgroundColor: '#ff9d00'})


            //内部还有3个jimi-content
            var str = '';
            var contentArr = ['产品成分', '产品参数', '标签']
            for (i = 0; i < 3; i++) {
                str += "<div class='jimi-content'>" +
                    "<div class='jimi-title'>" + contentArr[i] + "</div>" +
                    "</div>";
            }
            $(this.C).find('.jimi-scrIn').append(str);


            //成分分布 有两个canvas 写死了
            $(this.C).find('.jimi-content').eq(0).append('<div class="jimi-canvasBox"></div>')
                .append('<div class="jimi-canvasBox" style="display:none"></div>')

            //成分分布 canvas转换代码
            var str = '';
            str += '<div class="jimi-canvasChange">' +
                '<div class="jimi-canvasBtn">成分分布</div>' +
                '<div class="jimi-canvasBtn">成分详情</div>' +
                '</div>'
            $(this.C).find('.jimi-content').eq(0).append(str)


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
                height: this.config.height
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
                background: '#2BA5DD url(images/icon3.png) no-repeat right 40px center',
                'border-bottom': '3px solid #299bcf'
            })

            $(this.C).find('.jimi-topTxt').css({
                'font-weight': 'bold',
                'font-size': '14px',
                'line-height': '60px',
                'padding-left': '15px',
                color: '#fff',

            })
            //...............................................................


            //安心度 匹配度
            $(this.C).find('.jimi-degree').css({
                padding: '5px 15px',
                'box-sizing': 'border-box',
                float: 'left'
            }).find('.jimi-degreeTxt').css({
                float: 'left',
                'margin-bottom': '8px'
            }).end()
                .find('.jimi-degreeBar').css({
                    float: 'left'
                })
                .find('.jimi-degreeBarBar').css({
                    width: '380px',
                    padding: '2px',
                    border: '1px solid #e8e8e8',
                    'border-radius': '5px',
                    background: '#f4f4f4',
                    float: 'left'
                })
                .find('span').css({
                    float: 'left',
                    height: '5px',
                    'border-radius': '3px'
                })
            //.............................................................


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
                height: this.config.canvasHeight,
            })

            $(this.C).find('.jimi-canvasChange').css({
                float: 'left',
                'padding-left': '110px'
            })
                .find('.jimi-canvasBtn').css({
                    width: '80px',
                    background: '#fff',
                    margin: '0 10px',
                    border: '1px solid #d8d8d8',
                    'border-radius': '15px',
                    cursor: 'pointer',
                    float: 'left',
                    'text-align': 'center',
                    'line-height': '25px'
                })


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


            //点击伸缩............................................
            $(this.C).find('.jimi-clickMore').css({
                width: this.config.width,
                float: 'left',
                'text-align': 'center',
                'margin-bottom': '10px'
            }).find('span').css({
                'background-color': '#fff',
                border: '1px solid #727272',
                padding: '5px'

            })


            //标签............................................
            $(this.C).find('.jimi-label').find('ul').css({
                margin: '10px 15px 0 0',
                width: this.config.width - 15,
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

            //超过五个能缩放
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


        },
        bindCanvas: function () {
            var that = this;
            var formula = this.formula;
            var comp = formula.component;
            var sens = formula.safe.sensitization;
            var cond = formula.type.conditioner;
            var emol = formula.type.emollient;
            var sunS = formula.type.sunScreener;
            //sunS = ['1', '2', '3', '4']
            //第一 二个canvas
            var canvasBox1 = $(this.C).find('.jimi-canvasBox')[0];//第一个canvas
            var mychart1 = echarts.init(canvasBox1);
            var canvasBox2 = $(that.C).find('.jimi-canvasBox')[1];//第二个canvas
            var mychart2 = echarts.init(canvasBox2);


            //resetPieJson
            //安全 "致敏/致痘""正常成分"
            this.pieJson.series[0].data.push(
                {"value": sens.length, "name": "致敏/致痘"},
                {"value": comp.length - sens.length, "name": "正常成分"})
            //成分 "皮肤/头发调理剂""剂型""皮肤柔润剂""防晒剂"
            this.pieJson.series[1].data.push(
                {"value": cond.length, "name": "皮肤/头发调理剂"},
                {"value": comp.length - cond.length - emol.length - sunS.length, "name": "剂型"},
                {"value": emol.length, "name": "皮肤柔润剂"},
                {"value": sunS.length, "name": "防晒剂"})
            mychart1.setOption(this.pieJson);


            //resetRelationJson
            var arrArr = [cond, comp.difference(cond).difference(emol).difference(sunS), emol, sunS]
            var arrArrName = ['皮肤/头发调理剂', '剂型', '皮肤柔润剂', '防晒剂']
            for (i = 0; i < arrArr.length; i++) {
                var maxSize = 30;
                var minSize = 10;
                var step = 5;
                //点
                for (a = 0; a < arrArr[i].length; a++) {
                    that.relationJson.series[0].data.push({
                        name: arrArrName[i] + ' : ' + arrArr[i][a],
                        value: (maxSize - a * step) <= minSize ? minSize : (maxSize - a * step),
                        category: arrArrName[i],
                        draggable: true,
                        symbolSize: (maxSize - a * step) <= minSize ? minSize : (maxSize - a * step)
                    })
                }
                //线
                for (a = 1; a <= arrArr[i].length; a++) {
                    that.relationJson.series[0].links.push({
                        source: arrArrName[i] + ' : ' + arrArr[i][0],
                        target: arrArrName[i] + ' : ' + arrArr[i][a]
                    })
                }
            }
            //最后把不同剂型连接起来
            for (i = 0; i < arrArrName.length; i++) {
//            var oldP = i;
//            var newP = (i + 1) >= arrArrName.length ? 0 : i + 1;
                for (j = i; j < arrArrName.length; j++) {
                    that.relationJson.series[0].links.push({
                        source: arrArrName[i] + ' : ' + arrArr[i][0],
                        target: arrArrName[j] + ' : ' + arrArr[j][0]
                    })
                }
            }


            //点击切换canvas画布
            var clickJson = {background: '#36aadf', border: '1px solid #36aadf', color: '#fff'};
            var oriJson = {background: '#fff', border: '1px solid #d8d8d8', color: '#727272'};
            $(this.C).find('.jimi-canvasBtn').eq(0).css(clickJson).end()
                .each(function (i, ele) {
                    //canvasBtn
                    $(ele).click(function () {
                        $(this).css(clickJson).siblings().css(oriJson)
                        $(that.C).find('.jimi-canvasBox').eq(i).show().siblings('.jimi-canvasBox').hide();
                    })
                })

            $(this.C).find('.jimi-canvasBtn').eq(0).click(function () {

                mychart1.clear()
                mychart1.setOption(that.pieJson)

            })
            $(this.C).find('.jimi-canvasBtn').eq(1).click(function () {
                mychart2.clear()
                mychart2.setOption(that.relationJson)

            })
            console.log(new Date().getTime())

        }
    }

    w.JmSdkComponent = JmSdkComponent;
})
(window, document)