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
            var that = this;

            $(this.C).html(
                "<div class='imgCon'></div>" +
                "<div class='pname'></div>"
            )

            //更新头部图片和文字
            var englishName = this.data.englishName;
            var chineseName = this.data.chineseName;
            var imgUrl = this.data.imgUrl[0] || 'img/a.png';
            console.log(imgUrl)
//                $imgCon.find('img').attr('src', imgUrl);
            $(this.C).find('.imgCon').css('background', 'url(' + imgUrl + ') no-repeat 50% 50%').css('background-size', 'contain');
            $(this.C).find('.pname').html(englishName + '<br>' + chineseName);


            //给方辉的a标签................................................
            $(this.C).append("<a></a>");
            var href = base64_encode('{ "type": 1, "objId": "' + that.data.objId + '"}');
            $(this.C).find('a').attr({'href': 'jimi://' + href})


        },
        initCSS: function () {
            var that = this;


            $(this.C).css({
                height: '200px',
                'box-sizing': 'border-box',
                position: 'relative',
            })


            $(this.C).find('.imgCon').css({
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40%',
                height: '90%',
                position: 'absolute',
                left: '3%',
                overflow: 'hidden'
            })


            $(this.C).find('.pname').css({
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50%',
                position: 'absolute',
                right: '3%',
                'word-break': 'normal',
                color: '#2e2e2e',
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
    w.Header = Header;
})(window, document, jQuery)


