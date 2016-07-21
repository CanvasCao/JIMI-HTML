/**
 * Created by Administrator on 2016/7/21.
 */
function app() {

    if (!window.location.search) {
//            window.location = window.location + '?pid=5682a03defb80c4e26c48c39&altBtnIndex=1';
        window.location = window.location + '?pid=56f4f7efefb80c57428ba8d2&altBtnIndex=1';
    }
    window.searchJson = searchJson = window.location.search.searchToJson();

//FastClick......................................................................................
    FastClick.attach(document.body);

    $.ajax({
        type: "get",
        url: jimiHost + '/formual_safe.php' + window.location.search,
//            url: 'package.json',
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function (data) {
            console.log(JSON.stringify(data));
            var compositionHeader = new CompositionHeader('.compositionHeader', data);
            var alternateTab = new AlternateTab('.alternateTab', {txtArray: ['按类型', '按安全']});
            var compositionList = new CompositionList('.compositionList',
                {
                    color: '#555',
                    listArray: [
                        [
                            {color: '#fba41a', txt: '功效型成分'},
                            {color: '#555', txt: '剂型需求'},
                            {color: '#3982e1', txt: '保湿型成分'},
                            {color: '#23ad39', txt: '防晒型成分'},
                        ],
                        [
                            {color: '#e5004f', txt: '慎用成分'},
                            {color: '#555', txt: '剂型需求'},
                        ]
                    ],
                });

            var middleComponent = new MiddleComponent('.middleComponent', data);
            var alertCon = new AlertCon('.alertCon', data);


            //控件与控件的关联 点击按钮 类型和成分的切换 控件的事件只能写在所有元素加载完成
            var $spa = $('.spa');

            $spa.find('.alternateTab .alterDiv').click(function () {
                var index = $(this).index();
                $ele1 = $('.compositionList .listCon').eq(index);
                $ele2 = $('.middleComponent>div').eq(index);
                $ele1.siblings().stop().fadeOut(100, 'swing', function () {
                    $ele1.stop().fadeIn(100);
                    appendTagA();//每次切换重新绑定a标签 因为第一次有标签没有显示 ROSHANBB的a标签大小会计算错误
                });
                $ele2.siblings().stop().fadeOut(100, 'swing', function () {
                    $ele2.stop().fadeIn(100);
                });

            })

            //模拟点击..............................................................................
            var altbtnindex = searchJson.altbtnindex || 0;
            $spa.find('.alternateTab .alterDiv').eq(altbtnindex).click();


            //成分类型和警告框的关联.................................................................
            //警告框 手机端是肌秘协议头..............................................................
            function appendTagA() {
                $spa.find('.listDiv').each(function (i, e) {
                    var title = $(e).attr('data');
                    var des = alertCon.getDes(title);
                    var json = {type: 1, title: title, des: des};//警告框 type=1
                    $(e).RoshanBB('jimi://' + Base64.encode(JSON.stringify(json)));
                })
            }

            if (GM.version.toLowerCase() == 'android' || GM.version.toLowerCase() == 'ios') {
                appendTagA();
            }
            else if (GM.version.toLowerCase() == 'web') {
                $spa.find('.listDiv').click(function () {
                    var data = $(this).attr('data');
                    alertCon.show(data);
                })
            }

        }
        ,
        error: function (err) {
            console.log('ERROR!');
            console.log(err);
        }
    })
    ;


}