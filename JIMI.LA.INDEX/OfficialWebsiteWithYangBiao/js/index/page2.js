/**
 * Created by Administrator on 2016/4/25.
 */
(function (w, d, $) {
    $page2 = $('.page2');
    $cars = $page2.find('.carousel');

    //电脑内部的轮播
    var cIndex = 0;//电脑内部的轮播序号
    var cNext = 0;//下一张轮播序号
    var clen = $cars.length;//轮播数量


    //event................................
    $page2.find('.carBtn').click(function () {
        MoveOnce();
    });

    $page2.find('.carBtn').mouseover(function () {

    })

    var canvasTimer = null;
    $cars.hover(function () {
        clearInterval(canvasTimer);
    }, function () {
        canvasTimer = setInterval(MoveOnce, 4000);
    })

    w.canvasStart = function () {
        canvasTimer = setInterval(MoveOnce, 4000);
    }
    w.canvasStop = function () {
        clearInterval(canvasTimer);
    }

    //canvas必须给具体宽高 原来是百分比
    var height = parseInt($page2.find('.screen').css('height'));
    var width = parseInt($page2.find('.screen').css('width'));
    $cars.css({
        width: width,
        height: height
    });


    function MoveOnce() {
        if (!$cars.is(':animated')) {

            //弹一下
            $page2.find('.carBtn').velocity({
                scaleX: 0.9,
                scaleY: 1.1
            }, 100).velocity({
                scaleX: 1.1,
                scaleY: 0.9
            }, 200).velocity({
                scaleX: 1,
                scaleY: 1
            }, 100);


            //console.log(11);
            $cars.eq(cIndex).animate({left: '-100%'}, 'slow', 'easieEaseInOutQuart');
            cNext = (cIndex + 1) >= clen ? 0 : (cIndex + 1);
            $cars.eq(cNext).css({left: '100%'}).animate({left: 0}, 'slow', 'easieEaseInOutQuart', function () {
                cIndex = (cIndex + 1) >= clen ? 0 : (cIndex + 1);
            });
        }
    }


    //init.................................
    $cars.eq(0).css({left: 0}).siblings('.carousel').css({left: '100%'});


    //canvas
    //pie
//    var pieJson = {
//        "tooltip": {
//            "formatter": "{a} <br/>{b}: {c}种 ({d}%)"
//        },
//        "textStyle": {
//            "fontSize": 12,
////                color:'black'
////                fontWeight:"bolder"
//        },
//        "legend": {
//            "show": false,
//            "orient": "horizontal",
//            "x": "left",
//            "data": [
//                "功效型",
//                "保湿型",
//                "防晒型",
//                "剂型需求",
//                "致敏/致痘",
//                "正常成分"
//            ]
//        },
//        "series": [
//
//            {
//                "name": "按成分分类",
//                "type": "pie",
//                "minAngle": '1',
//                "radius": [
//                    "50%",
//                    "70%"
//                ],
//                "data": [
//                    {
//                        "value": 3,
//                        "name": "功效型"
//                    },
//
//                    {
//                        "value": 10,
//                        "name": "剂型需求"
//                    },
//                    {
//                        "value": 4,
//                        "name": "保湿型"
//                    },
//                    {
//                        "value": 2,
//                        "name": "防晒型"
//                    }
//                ]
//            },
//
//            {
//                "name": "按安全分类", //鼠标hover时的显示的分类
//                "type": "pie",
//                "minAngle": '1',
//                "radius": [
//                    0,
//                    "30%"
//                ],
//                //"label": {
//                //    "normal": {
//                //        "position": "inner"
//                //    }
//                //},
//
//                "data": [
//                    {
//                        "value": 2,
//                        "name": "致敏/致痘"
//                    },
//                    {
//                        "value": 10,
//                        "name": "正常成分"
//                    }
//                ],
//                "z": 3,
//            },
//        ]
//        ,
//        backgroundColor: '#fff'
//        ,
//        textStyle: {
//            fontWeight: 'bolder',
//        }
//
//        //按series出现的顺序 而不是lengend.data的顺序
//        ,
//        color: ['#61a0a8', '#d48265', '#91c7ae', '#749f83', '#c23531', '#2f4554', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
////            color: ['#eb231d', '#126dac', '#51c2d0', '#e67851', '#90e0bb', '#51d880', '#ea9211', '#ecbcae', '#6e7074', '#7fadcb', '#d7e3ee']
//    };
//    var pieChart = echarts.init($cars[0]);
//    pieChart.setOption(pieJson);


    //line
    var lineJson = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            "formatter": "{b}"
        },
        legend: {
            show: false,
            //data:[ '支出', '收入']
        },
        grid: {
            left: '20%',
            right: '20%',
            top: 30,
            bottom: 50
            //containLabel: true
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {show: true},
                data: ['油性肤质', '干性肤质', '混合型肤质']
            }
        ],
        series: [
            {
                name: '收入',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true
                    }
                },
                data: [40, 60, 50]
            },
            {
                name: '支出',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                    }
                },
                data: [-60, -40, -50]
            }
        ]
    };
    var lineChart = echarts.init($cars[0]);
    lineChart.setOption(lineJson);


    //relation
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


    var relationJson = {
        "tooltip": {
            "formatter": "{b}",
//                            showContent: false
            triggerOn: 'mousemove',
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
                    repulsion: 80
                },
                lineStyle: {
                    normal: {
//                                        curveness: 0.3
                    }
                },
                color: ['#fba41a', '#d2d2d2', '#3982e1', '#23ad39']

            }

        ]
    };
    var relationChart = echarts.init($cars[1]);

    //四个初始化数组
    var comp = ["水", "乙醇", "甘油", "东当归（ANGELICA ACUTILOBA）根提取物", "川谷（COIX LACRYMA-JOBI MA-YUEN）籽提取物", "甘草酸二钾", "北美金缕梅（HAMAMELIS VIRGINIANA）提取物", "茅瓜（MELOTHRIA HETEROPHYLLA）根提取物", "生育酚乙酸酯", "小麦（TRITICUMVULGARE）胚芽油", "柠檬酸", "二C12-15 链烷醇聚醚-8 磷酸酯", "甲氧基肉桂酸乙基己酯", "柠檬酸钠", "山梨坦倍半油酸酯", "甘油三（乙基己酸）酯", "羟苯乙酯", "香精", "聚山梨醇酯-80", "丁二醇", "羟苯甲酯", "羟苯丙酯"];
    var cond = ["乙醇", "东当归（ANGELICA ACUTILOBA）根提取物", "川谷（COIX LACRYMA-JOBI MA-YUEN）籽提取物", "甘草酸二钾", "北美金缕梅（HAMAMELIS VIRGINIANA）提取物", "茅瓜（MELOTHRIA HETEROPHYLLA）根提取物", "生育酚乙酸酯", "小麦（TRITICUM VULGARE）胚芽油", "柠檬酸", "甘油三（乙基己酸）酯", "丁二醇"];
    var emol = ["甘油"];
    var sunS = ["甲氧基肉桂酸乙基己酯"];
    //去重
    emol = emol.difference(sunS);//保湿arr次之
    cond = cond.difference(sunS).difference(emol);

    //重置JSON
    ResetRelationJsonAndInit();
    relationChart.setOption(relationJson);
    function ResetRelationJsonAndInit() {
        var arrArr = [cond, comp.difference(cond).difference(emol).difference(sunS), emol, sunS];
        var arrArrName = ['功效型', '剂型需求', '保湿型', '防晒型'];
        for (i = 0; i < arrArr.length; i++) {
            var maxSize = 12;
            var minSize = 6;
            var step = 2;
            //点
            for (a = 0; a < arrArr[i].length; a++) {
                relationJson.series[0].data.push({
                    name: arrArr[i][a],
                    value: (maxSize - a * step) <= minSize ? minSize : (maxSize - a * step),
                    category: arrArrName[i],
                    draggable: true,
                    symbolSize: (maxSize - a * step) <= minSize ? minSize : (maxSize - a * step),
                })
            }
            ;

            //线
            for (a = 1; a <= arrArr[i].length; a++) {
                relationJson.series[0].links.push({
                    source: arrArr[i][0],
                    target: arrArr[i][a]
                })
            }
            ;
        }
        ;
        //最后把不同剂型连接起来
        for (i = 0; i < arrArrName.length; i++) {
            for (j = i; j < arrArrName.length; j++) {
                relationJson.series[0].links.push({
                    source: arrArr[i][0],
                    target: arrArr[j][0]
                })
            }
        }


    }


})(window, document, $)