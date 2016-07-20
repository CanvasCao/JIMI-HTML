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

            //$(this.C).html(
            //    "<div>" +
            //    "<ul>" +
            //    "<li data='功效型成分'>" +
            //    "<span class='point' style='background-color:#fba41a'></span>" +
            //    "<span style='color:#fba41a'>功效型成分</span>" +
            //    "   </li>" +
            //    "   <li data='剂型需求'>" +
            //    "   <span class='point' style='background-color:#949494'></span>" +
            //    "   <span style='color:#949494'>剂型需求</span>" +
            //    "   </li>" +
            //    "   <li data='保湿型成分'>" +
            //    "   <span class='point' style='background-color:#3982e1'></span>" +
            //    "   <span style='color:#3982e1'>保湿型成分</span>" +
            //    "   </li>" +
            //    "   <li data='防晒型成分'>" +
            //    "   <span class='point' style='background-color:#23ad39'></span>" +
            //    "   <span style='color:#23ad39'>防晒型成分</span>" +
            //    "   </li>" +
            //    "   </ul>" +
            //    "   </div>" +
            //    "   <div style='display: none; margin-top: 10px'>" +
            //    "   <ul>" +
            //    "   <li data='慎用成分'>" +
            //    "   <span class='point' style='background-color:#e5004f'></span>" +
            //    "   <span style='color:#e5004f'>慎用成分</span>" +
            //    "   </li>" +
            //    "   <li data='正常成分'>" +
            //    "   <span class='point' style='background-color:#949494'></span>" +
            //    "   <span style='color:#949494'>正常成分</span>" +
            //    "   </li>" +
            //    "   </ul>" +
            //    "   </div>"
            //)

            var str = '';
            for (i = 0; i < 4; i++) {
                str += "<div class='listDiv'><span style='color:#949494'>● 正常成分</span></div>";
            }
            $(this.C).html(str);

        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.listDiv').css({

                width: '25%',
                float: 'left',
                'border': '1px solid black',
                'box-sizing': 'border-box',
                height: 40,
                'font-size':'14px',
                'text-align': 'center',
            })
        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.CompositionList = CompositionList;
})(window, document, jQuery)


