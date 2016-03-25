;
(function (w,d,undefined) {
    Array.prototype.difference=function(other){
        var  res=[];
        for(var i=0; i < this.length; i++){
            var flag = true;
            for(var j=0; j < other.length; j++){
                if(this[i] == other[j]){
                    flag = false;
                }
            }
            if(flag){
                res.push(this[i]);
            }
        }
        return res;
    }

    //init..................................................................
    //让人有点击的欲望
    $('.jimi-sdk').css({cursor: "pointer"})

    //点击事件 先调ajax 注册点击事件再判断是否点击了当前dom
    $('.jimi-sdk').click(function (e) {
        var that = this;
        //click时还需要得到的是ajax Post时得到的data
        var appid = '123456';
        var dataName = $(that).text();
        var access_token = $.md5(appid + dataName);


        //先判断是否是点击的当前位置 再判断ajax..........................................
        //只有当前span被点击才会触发事件
        if (e.srcElement == that) {
            var $this = $(that); //$this 指点击的span
            if ($this.find('.JSC').length == 0) {

                //ajax之前应该先loading
                var timer = setInterval(function () {
                    console.log('loading')
                }, 400)


                if ($this.css('position') == 'static') {
                    $this.css({'position': 'relative'});
                }
                //再让添加的div变成 绝对定位
                $this.append("<div class='JSC'></div>");
                //生成的div 绝对定位, left top 根据父容器位置页面动态写
                $this.find('.JSC').css({
                    'position': 'absolute',
                    left: 0,
                    top: 50,
                    margin: '10px 0px 0px 0px',
                    'box-shadow': '5px 5px 40px rgba(0, 0, 0, 0.5)',
                    font: "12px '微软雅黑'",
                    color: '#727272',
                    width: 420,
                    height: 520
                });

                //假canvas假装加载
                var myChart = echarts.init( $this.find('.JSC')[0]);
                myChart.showLoading();

                $.ajax({
                    type: "post",
                    url: 'http://openapi.jimi.la/',
                    //url: 'js/r.json',
                    data: {
                        "grant_type": "product_info",//获取信息类型
                        "appid": "123456",
                        "data": "温碧泉力透白雪肌霜",
                        "access_token": "76821f67f4fe4636988c51941fb33be0",//md5(appid+data)
                        "req_type": "2",//请求类型：1为条形码，2为产品名称
                        "ret_type": "1"//默认1，JSON格式返回消息 2，XML格式返回消息 3，返回HTML内容
                    },
                    dataType: "jsonp",
                    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                    jsonpCallback: "jsonpcallback",
                    success: function (data) {
                        console.log(JSON.stringify(data));//状态码是data.code
                        console.log('finish');
                        clearInterval(timer)
                        myChart.hideLoading();

                        //生成的div 对于组件而言就是父容器了  data.data是json的数据
                        var Jsc = new JmSdkComponent($this.find('.JSC')[0], null, data.data)

                    },
                    error: function (err) {
                        console.log(err);
                        console.log('ERROR!');
                        clearInterval(timer)
                    }
                });

            }
            else {
                //页面已经append过了 那就让他显示/隐藏
                $this.find('.JSC').toggle();
            }
        }
        else {
            //没有点击当前 什么都不做
        }
        //.........................................................


    })
})(window,document)