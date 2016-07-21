;
(function (w, d, $, undefined) {
    function ProductDetailCanvas(container, data, ifBtn) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;//主页自己写容器
        this.data = data;
        this.ifBtn = ifBtn; //下面是不是要加补全成分的按钮 扩展性有点差
        this.config = {};
        this.init();
    }

    ProductDetailCanvas.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            //添加数组原型方法
            Array.prototype.difference = function (other) {
                var res = [];
                for (var i = 0; i < this.length; i++) {
                    var flag = true;
                    for (var j = 0; j < other.length; j++) {
                        if (this[i] == other[j]) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        res.push(this[i]);
                    }
                }
                return res;
            };
        },
        createDom: function () {
            var that = this;
            var str = "<div class='canvasBox'></div>" +
                "<div class='nonCanvas'>" +
                "<div style='height: 20px ;border-top: 1px solid #bdbdbd;'></div>" +
                "<div class='barCon'>" +
                "<div class='barSafe'></div>" +
                "<div class='barSense'></div>" +
                "</div>" +
                "<div class='number'></div>" +

                    //.....................................................................
                "<div class='formulaCon'>" +
                "<div class='formulaTxtSec'>" +
                "<span class='formulaPoint' style='background-color:#d2d2d2'></span>" +
                "<span class='formulaTxt' style='color:#d2d2d2'>正常成分</span>" +
                "</div>" +
                "<div class='formulaTxtSec'>" +
                "<span class='formulaPoint' style='background-color:#e5004f'></span>" +
                "<span class='formulaTxt' style='color:#e5004f'>慎用成分</span>" +
                "</div>" +
                "</div>" +
                    //.....................................................................
                "</div>"

            $(this.C).append(str);


        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.canvasBox').css({});


            $(this.C).find('.nonCanvas').css({
                display: 'none',
                'padding-bottom': '40px',
            })


            $(this.C).find('.barCon').css({
                height: '24px'
            })

            $(this.C).find('.barSafe').css({
                backgroundColor: '#d2d2d2',
                float: 'left',
                height: '12px',

            })
            $(this.C).find('.barSense').css({
                'background-color': '#d13052',
                float: 'right',
                height: '12px',
            })


            $(this.C).find('.number').css({
                margin: '10px 0',
                color: '#d2d2d2',
            })

            $(this.C).find('.formulaCon').css({
                display: 'inline-block',
                float: 'right',
            })

            $(this.C).find('.formulaTxtSec').css({
                display: 'inline-block',
                'margin-left': '20px',
                'position': 'relative',

            })

            $(this.C).find('.formulaPoint').css({
                float: 'left',
                width: '10px',
                height: '10px',
                'border-radius': '3px',
                'margin-right': '5px',
                'margin-top': '4px'
            })
        },
        bindEvent: function () {
            var that = this;
            var data = this.data;


            //初始化数据 echartJson 和canvas宽高
            $canvas = $(this.C).find('.canvasBox');
            $canvas.css({height: 300, 'overflow': 'hidden'}); //不用设宽

            //初始化Echart div转canvas
            var canvasBox = $canvas[0];//第一个canvas
            var mychart = echarts.init(canvasBox);
            //mychart.showLoading();

            //mychart.hideLoading();
            if (data.component) { //说明有成分
                var relationJson = {
                    title: {
                        //text: '肌秘科技',
                        //subtext: 'Echarts',
                        top: 'bottom',
                        right: 10

                    },
                    "tooltip": {
                        "formatter": "{b}",
//                            showContent: false
                        triggerOn: 'click',
                        position: [10, 10]

                    },
                    legend: [{//顶部显示
                        data: ['功效型', '剂型需求', '保湿型', '防晒型'],
                        orient: 'vertical',
                        align: 'right',
                        top: 10,
                        right: 10
                    }],
                    animation: true,
                    series: [
                        {
                            name: '成分详情',
                            type: 'graph',
                            layout: 'force',
                            data: [
//                        {name: '水', value: 1, category: 0,}
                            ],
                            links: [
//                        {source: '水', target: '二氧化碳'},
                            ],
                            categories: [{name: '功效型'}, {name: '剂型需求'}, {name: '保湿型'}, {name: '防晒型'}],
                            roam: 'false',
                            label: {
                                normal: {
                                    position: 'right',
                                    formatter: ''
                                },
                            },
                            force: {
                                edgeLength: 20,
                                gravity: 0.1,//重力算法 30--0.1 100-0.8
                                repulsion: 180
                            },
                            lineStyle: {
                                normal: {
//                                        curveness: 0.3
                                }
                            },
                            color: ['#fba41a', '#d2d2d2', '#3982e1', '#23ad39'],


                        }

                    ]
                };

                var comp = []; //总成分数组
                for (i = 0; i < data.component.length; i++) { //data.component是个对象数组
                    comp.push(data.component[i].name);
                }
                ;
                var sunS = data.type[2].arr;//防晒arr权限最高
                var emol = data.type[1].arr.difference(sunS);//保湿arr次之
                var cond = data.type[0].arr.difference(sunS).difference(emol);
                //防晒型arr独立存在
                var sens = data.safe[0].arr;

                ResetRelationJsonAndInit();
                function ResetRelationJsonAndInit() {
                    var arrArr = [cond, comp.difference(cond).difference(emol).difference(sunS), emol, sunS];
                    var arrArrName = ['功效型', '剂型需求', '保湿型', '防晒型'];
                    for (i = 0; i < arrArr.length; i++) {
                        var maxSize = 14;
                        var minSize = 8;
                        var step = 2;
                        //点
                        for (a = 0; a < arrArr[i].length; a++) {
                            relationJson.series[0].data.push({
                                name: arrArrName[i] + ' : ' + arrArr[i][a],
                                value: (maxSize - a * step) <= minSize ? minSize : (maxSize - a * step),
                                category: arrArrName[i],
                                //draggable: true,
                                symbolSize: (maxSize - a * step) <= minSize ? minSize : (maxSize - a * step),
                            })
                        }
                        ;

                        //线
                        for (a = 1; a <= arrArr[i].length; a++) {
                            relationJson.series[0].links.push({
                                source: arrArrName[i] + ' : ' + arrArr[i][0],
                                target: arrArrName[i] + ' : ' + arrArr[i][a]
                            })
                        }
                        ;
                    }
                    ;
                    //最后把不同剂型连接起来
                    for (i = 0; i < arrArrName.length; i++) {
                        for (j = i; j < arrArrName.length; j++) {
                            relationJson.series[0].links.push({
                                source: arrArrName[i] + ' : ' + arrArr[i][0],
                                target: arrArrName[j] + ' : ' + arrArr[j][0]
                            })
                        }
                    }


                    //更新重力 算法 30种-0.1 对应 100种-0.8
                    if (comp.length > 30) {
                        relationJson.series[0].force.gravity = 0.1 + (comp.length - 30) * 0.01;
                    }

                    mychart.setOption(relationJson);


                }


                //更新 共x种成分 和n/m
                var compLen = comp.length;
                var sensLen = sens.length;
                var normalLen = compLen - sensLen;
                var sensPct = sensLen / compLen; //0-1之间的数字
                if (sensPct == 1) {
                    $(that.C).find('.barSafe').hide()
                }
                if (sensPct == 0) {
                    $(that.C).find('.barSense').hide()
                }
                var normalPct = (1 - sensPct);
                $(that.C).find('.number').html('共' + compLen + '种成份');
                $(that.C).find('.barSense').css({width: sensPct * 100 + '%'});
                $(that.C).find('.barSafe').css({width: normalPct * 100 + '%'});


                $(that.C).find('.formulaTxt').eq(0).html('正常成分(' + normalLen + ')');
                $(that.C).find('.formulaTxt').eq(1).html('慎用成分(' + sensLen + ')');

                //canvas下面本来是隐藏的
                $(that.C).find('.nonCanvas').show();

                var canvasBeenClicked = false;
                $(that.C).find('canvas').click(function () {
                    if (!canvasBeenClicked) {
                        mychart = echarts.init(canvasBox);
                        mychart.setOption(relationJson);
                        canvasBeenClicked = true;
                    }

                })
            }
            else {
                //说明没有成分
                //mychart.hideLoading();
                //下面是否加补全成分的按钮Btn 代码很不好
                var BtnTXT = '';
                if (that.ifBtn) {
                    BtnTXT = '<a class="btn" href="http://n1.jimi.la/apps_T1/html5/whatever.html">补全成分</a>';
                }


                $(that.C).html('<div class="Con"></div>');
                $(that.C).find('.Con').css({
                    padding: 20,
                    'text-align': 'center'
                }).html('<img class="nodataImg" src="img/nodata.png" width="30">' +
                    '<div class="txt">成分数据补全中...</div>' +
                    BtnTXT
                )
                $(that.C).find('.nodataImg').css({display: 'block', margin: '0 auto'});
                $(that.C).find('.txt').css({
//                        'font-size':'16px',
                    color: '#bcbcbc',
                    margin: '20px auto',
                });
                $(that.C).find('.btn').css({
                    padding: '6px 15px',
                    margin: '0 auto',
                    'border-radius': 30,
                    'backgroundColor': '#018cff',
                    color: 'white',
                    'display': 'inline-block'
                })
            }


            //给方辉加的a标签.................................................................
            var alertJson = [
                ['正常成分', '正常情况下对皮肤没有安全风险的成分'],
                ['慎用成分', '该成分有一定刺激性，敏感肌肤谨慎选择'],
            ];

            $(this.C).find('.formulaTxtSec').each(function (i, e) {
                var json = {type: 4, objId: that.data.objId, altBtnIndex: i};//警告框 type=1
                json.title = alertJson[i][0];
                json.des = alertJson[i][1];
                $(e).RoshanBB('jimi://' + Base64.encode(JSON.stringify(json)));
            });

        }
    }
    w.ProductDetailCanvas = ProductDetailCanvas;
})(window, document, jQuery)
