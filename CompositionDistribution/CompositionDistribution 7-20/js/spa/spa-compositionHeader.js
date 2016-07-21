;
(function (w, d, $, undefined) {
    function CompositionHeader(container, data) {
        this.C = this.container = container;
        this.data = data;
        this.config = {};
        this.init();
    }

    CompositionHeader.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            this.config.fixedLeftW = 120;
        },
        createDom: function () {
            var that = this;

            $(this.C).html(
                "<div class='headerCon'>" +
                "<div class='headerImg'><img /></div>" +
                "<div class='headerPname'></div>" +
                "</div>"
            )

            $(this.C).find('.headerPname').html("<div class='pnameCon'>" +
                "<div class='pname1'></div><div class='pname2'></div>" +
                "</div>")


            //更新头部图片和文字...........................................
            var englishName = this.data.englishName;
            var chineseName = this.data.chineseName;
            var imgUrl = this.data.imgUrl[0] || 'img/logo.jpg';
            var count = this.data.component.length;
            $(this.C).find('.headerImg img').attr('src', imgUrl).css({width: (that.config.fixedLeftW - 2 * 20)});
            $(this.C).find('.headerPname .pname1').html(chineseName);
            $(this.C).find('.headerPname .pname2').html('共含' + count + '种成分');


            //给方辉的a标签................................................
            var json = {type: 1, objId: that.data.objId};//警告框 type=1
            $(this.C).find('.headerCon').RoshanBB('jimi://' + Base64.encode(JSON.stringify(json)));

        },
        initCSS: function () {
            var that = this;

            $(this.C).find('.headerCon').css({
                height: 170,
                position: 'relative',
                'padding-left': '120px',
            })

            $(this.C).find('.headerImg').css({
                height: 170,
                float: 'left',
                width: '120px',
                position: 'absolute',
                top: '0',
                left: '0',
            }).find('img').css({
                display: 'block',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
            })

            $(this.C).find('.headerPname').css({
                height: 170,
                float: 'left',
                width: '100%',
                'position': 'relative',
            }).find('.pnameCon').css({
                'position': 'absolute',
                //'background': 'red',
                top: '50%',
                transform: 'translateY(-50%)',
            })

            $(this.C).find('.pname1').css({
                'font-size': '18px',
                'margin': '0 0 5px 0',
                color: '#444',
                'word-break': 'break-word'
            })

            $(this.C).find('.pname2').css({
                'font-size': '16px',
                color: '#999'
            })


            $(this.C).find('a').css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
            });

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.CompositionHeader = CompositionHeader;
})(window, document, jQuery)


