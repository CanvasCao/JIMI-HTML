;
(function (w, d, $, undefined) {
    function CompositionList(container, data) {
        this.C = this.container = container;
        this.data = data;
        this.config = {};
        this.init();
    }

    CompositionList.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            var that = this;

            [].forEach.call(that.data.listArray, function (e, i, arr) {
                var str = '';
                var list = e;
                [].forEach.call(list, function (e2, i2, arr2) {
                    //appendColor..........................................
                    var span1CSS = 'style=color:' + list[i2].color + ';';
                    var span2CSS = 'style=color:' + that.data.color + ';';

                    str += "<div class='listDiv' data=" + e2.txt + "><span " + span1CSS + ">● </span><span " + span2CSS + ">" + e2.txt + "</span></div>";
                });
                str = '<div class="listCon">' + str + '</div>';//LISTCON
                $(that.C).append(str);
            });
        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.listCon').css({
                height: 40,
            });

            $(this.C).find('.listDiv').css({
                float: 'left',
                //'border': '1px solid black',
                'box-sizing': 'border-box',
                height: 40,
                'font-size': '12px',
                'text-align': 'center',
            }).find('span').css({
                'line-height': '40px',
            })

            //修正百分比....................................
            //width: '25%',
            $(this.C).find('.listCon').each(function (i, e) {
                var length = $(e).find('.listDiv').length;
                $(e).find('.listDiv').css({width: (100 / length) + '%'});
            })

        },
        bindEvent: function () {
            var that = this;

            //init................................
            $(this.C).find('.listCon').eq(0).show().siblings().hide();


        }
    }
    w.CompositionList = CompositionList;
})(window, document, jQuery)


