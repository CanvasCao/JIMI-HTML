;
(function (w, d, $, undefined) {
    function CompositionContainer(container, data) {
        this.C = this.container = container;
        this.data = data;
        this.config = {};
        this.init();
    }

    CompositionContainer.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            <!--类型和安全的成分  一个二选一按钮-->
            $(this.C).html(
                "<div class='compositions'></div>" +
                "<div class='alBtn'></div>"
            )

            $(this.C).find('.compositions').html(
                "<div>" +
                "<ul>" +
                "<li data='功效型成分'>" +
                "<span class='point' style='background-color:#fba41a'></span>" +
                "<span style='color:#fba41a'>功效型成分</span>" +
                "   </li>" +
                "   <li data='剂型需求'>" +
                "   <span class='point' style='background-color:#949494'></span>" +
                "   <span style='color:#949494'>剂型需求</span>" +
                "   </li>" +
                "   <li data='保湿型成分'>" +
                "   <span class='point' style='background-color:#3982e1'></span>" +
                "   <span style='color:#3982e1'>保湿型成分</span>" +
                "   </li>" +
                "   <li data='防晒型成分'>" +
                "   <span class='point' style='background-color:#23ad39'></span>" +
                "   <span style='color:#23ad39'>防晒型成分</span>" +
                "   </li>" +
                "   </ul>" +
                "   </div>" +
                "   <div style='display: none; margin-top: 10px'>" +
                "   <ul>" +
                "   <li data='慎用成分'>" +
                "   <span class='point' style='background-color:#e5004f'></span>" +
                "   <span style='color:#e5004f'>慎用成分</span>" +
                "   </li>" +
                "   <li data='正常成分'>" +
                "   <span class='point' style='background-color:#949494'></span>" +
                "   <span style='color:#949494'>正常成分</span>" +
                "   </li>" +
                "   </ul>" +
                "   </div>"
            )

        },
        initCSS: function () {
            var that = this;


            /*左侧成分 加 二选一控件*/
            $(this.C).css({
                'box-sizing': 'border-box',
                padding: '10px 0px',
                'margin-bottom':10,
                'background-color': '#f7f7f7',
                height: '60px',
            })

            $(this.C).find('.compositions').css({
                width: '180px',
                float: 'left',
            }).find('li').css({
                float: 'left',
                width: '50%',
                'font-size': '12px',
                position: 'relative',
                padding: '2px 0',
            }).find('span').css({
                float: 'left',
            })
                .end().find('.point').css({
                    float: 'left',
                    width: '10px',
                    height: '10px',
                    'border-radius': '3px',
                    'margin-right': '5px',
                    'margin-top': '4px'
                })


            $(this.C).find('.alBtn').css({
                float: 'right',
                padding: '3px 0',
            })


        },
        bindEvent: function () {
            var that = this;


        }
    }
    w.CompositionContainer = CompositionContainer;
})(window, document, jQuery)


