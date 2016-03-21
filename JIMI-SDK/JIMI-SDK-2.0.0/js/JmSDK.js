/**
 * Created by Administrator on 2016/3/18.
 */
;
(function () {
    //ajax的数据
    var data = {
        "code": 200,
        "message": "",
        "success": true,
        "data": {
            "pname": "温碧泉力透白雪肌霜",
            "alias": null,
            "brand": "温碧泉",
            "formula": {
                "component": [
                    "水",
                    "甘油",
                    "环五聚二甲基硅氧烷",
                    "1,2-戊二醇",
                    "C12-20 烷基葡糖苷",
                    "丙二醇",
                    "辛酸/癸酸甘油三酯",
                    "硬脂醇",
                    "棕榈酸乙基己酯",
                    "苯氧乙醇",
                    "浮游生物提取物",
                    "小球藻（CHLORELLA VULGARIS）提取物",
                    "丁二醇",
                    "凝血酸",
                    "温泉水",
                    "异壬酸异壬酯",
                    "聚二甲基硅氧烷",
                    "乙基己基甘油",
                    "角鲨烷",
                    "氢化卵磷脂",
                    "山梨坦硬脂酸酯",
                    "十一碳烯酰基苯丙氨酸",
                    "3-o-乙基抗坏血酸",
                    "黄原胶",
                    "甘草酸二钾",
                    "丙烯酰二甲基牛磺酸铵/VP 共聚物",
                    "羟苯甲酯",
                    "香精",
                    "EDTA 二钠",
                    "透明质酸钠"
                ],
                "type": {
                    "conditioner": [
                        "环五聚二甲基硅氧烷",
                        "辛酸/癸酸甘油三酯",
                        "小球藻（CHLORELLA VULGARIS）提取物",
                        "丁二醇",
                        "凝血酸",
                        "温泉水",
                        "异壬酸异壬酯",
                        "十一碳烯酰基苯丙氨酸",
                        "甘草酸二钾",
                        "透明质酸钠"
                    ],
                    "emollient": [
                        "甘油",
                        "环五聚二甲基硅氧烷",
                        "1,2-戊二醇",
                        "丙二醇",
                        "辛酸/癸酸甘油三酯",
                        "硬脂醇",
                        "棕榈酸乙基己酯",
                        "角鲨烷",
                        "透明质酸钠"
                    ],
                    "sunScreener": []
                },
                "safe": {
                    "sensitization": [
                        "丙二醇",
                        "硬脂醇",
                        "棕榈酸乙基己酯",
                        "苯氧乙醇",
                        "山梨坦硬脂酸酯",
                        "羟苯甲酯",
                        "香精"
                    ]
                }
            },
            "specification": "50ml",
            "methods": "取适量均匀涂抹于肌肤，直至完全吸收。注意事项：1.请放置于儿童不易触及处；2.避免让产品进入眼睛，如不慎入眼，请用大量清水冲洗；3.如有不适，请立即停用。",
            "feature": [
                "中国",
                "保湿",
                "抗氧化",
                "抗皱",
                "修复",
                "舒敏",
                "美白",
                "0-100元",
                "易致痘",
                "含一定香精",
                "含一定防腐剂",
                "夜间使用/加强防晒",
                "滋润度强",
                "秋冬、夜间"
            ]
        }
    }


    //init....................................
    //让人有点击的欲望
    $('.jimi-sdk').css({cursor: "pointer"})

    //点击事件
    $('.jimi-sdk').click(function (e) {
        //var absClassName='JSC' //JmSdkComponent

        //relative(就是点击的span的className是.jimi-sdk)
        //absoulute（生成的div的className是.JSC）

        //假设ajax正常；


        //只有当前span被点击才会触发事件
        if (e.srcElement == this) {
            var $this = $(this);
            if ($this.find('.JSC').length == 0) {
                //先让点击的span变成relative
                if ($this.css('position') == 'static') {
                    $this.css({'position': 'relative'});
                }

                //再让添加的div变成 绝对定位
                $this.append("<div class='JSC'></div>");
                //生成的div 绝对定位, left top 根据父容器位置页面动态写
                $this.find('.JSC').css({'position': 'absolute', left: 0, top: 50});


                //生成的div 对于组件而言就是父容器了
                var Jsc = new JmSdkComponent($this.find('.JSC')[0],null,data.data)
            }
            else {
                $this.find('.JSC').toggle();
            }
        }
        else {

        }

    })
})()