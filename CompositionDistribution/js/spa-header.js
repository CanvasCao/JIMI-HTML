;
(function (w, d, $, undefined) {
    function Header(container, data) {
        this.C = this.container = container;
        this.data = data;
        //console.log(JSON.stringify(data))
        this.config = {};
        this.init();
    }

    Header.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            var that=this;
            //拼加组件
            $(this.C).append("<div class='header'></div>");

            $(this.C).find('.header').html(
                "<div class='imgCon'></div>" +
                "<div class='pname'></div>"
            )

            //更新头部图片和文字
            var englishName = this.data.englishName;
            var chineseName = this.data.chineseName;
            var imgUrl = this.data.imgUrl || 'img/a.png';
//                $imgCon.find('img').attr('src', imgUrl);
            $(this.C).find('.imgCon').css('background', 'url(' + imgUrl + ') no-repeat 50% 50%').css('background-size', 'contain');
            $(this.C).find('.pname').html(englishName + '<br>' + chineseName);


            //给方辉的a标签
            $(this.C).find('.header').append("<a href="+ that.data.jimiUrl+"></a>")
        },
        initCSS: function () {
            var that = this;


            $(this.C).find('.header').css({
                height: '200px',
                'box-sizing': 'border-box',
                position: 'relative',
            })


            $(this.C).find('.header .imgCon').css({
                top: '50%',
                transform: 'translateY(-50%)',
                //-webkit-transform: translateY(-50%);
                //-ms-transform: translateY(-50%);
                //-moz-transform: translateY(-50%);
                width: '40%',
                height: '90%',
                position: 'absolute',
                left: '3%',
                overflow: 'hidden'
            })


            $(this.C).find('.header .pname').css({
                top: '50%',
                transform: 'translateY(-50%)',
                //-webkit-transform: translateY(-50%);
                //-ms-transform: translateY(-50%);
                //-moz-transform: translateY(-50%);
                width: '50%',
                position: 'absolute',
                right: '3%',
                'word-break': 'normal',
                color: '#2e2e2e',
            })

        },
        bindEvent: function () {
            var that = this;


        }
    }
    w.Header = Header;
})(window, document, jQuery)


