;
(function (w, d, undefined) {
    //version 1.0.1
    //create by CAO on 2016/3/4


    //不需要container 这是一个基于window fixed的一个控件
    function IntroBottomBar(data) {
        this.data = data;
        this.config = {
            btTxt: '高级搜索',
            popTxt: '高级搜索，提供更精确的搜索方式！',
            index: 1,//不能从0开始
            length: 9,
            bottomBarHeight: 29,
            bottomBarPaddingTop: 10,
            state: 'down'
        }
        this.init();
    }


    IntroBottomBar.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            this.config.length = this.data.pageNum;
        },
        createDom: function () {
            $('body').append('<div class="footer"></div>').append('<div class="popTxt">' + this.config.popTxt + '</div>')

            var str = '';
            str += '<div class="ftLeft"></div>' +
                '<img src="img/down.png" class="ftRight"/>' +
                '<div class="ftTxt">' + this._getBtTxt() + '</div>'

            $('.footer').html(str);
        },
        initCSS: function () {
            //footer........................................................
            $('.footer').css({
                'position': 'fixed',
                'width': '100%',
                'height': this.config.bottomBarHeight,
                'padding': this.config.bottomBarPaddingTop + 'px 0',
                'bottom': 0,
                'backgroundColor': 'white',
                'z-index': 99
            })

            $('.ftRight').css({
                float: 'right',
                'margin-right': '20px',
                'margin-top': '6px',
                'height': 29 / 2
            })

            $('.ftTxt').css({
                margin: 'auto auto',
                width: '50%',
                height: this.config.bottomBarHeight,
                'line-height': '29px',
                'text-align': 'center',
            })

            $('.popTxt').css({
                'position': 'fixed',
                width: '100%',
                'bottom': '0px',
                'height': '20px',
                'padding': '10px 0 10px 20px',
                'backgroundColor': 'white',
                'z-index': '98'

            })
        },
        bindEvent: function () {
            var that = this;
            $('.ftRight').click(function () {
                if (that.config.state == 'down') {
                    $(this).attr('src', 'img/up.png');
                    that.config.state = 'up';
                    $('.popTxt').animate({'bottom': '37px'}, 200)
                } else {
                    $(this).attr('src', 'img/down.png');
                    that.config.state = 'down';
                    $('.popTxt').animate({'bottom': '0px'}, 200)

                }
            })
        },
        _getBtTxt: function () {
            return this.config.btTxt + '(' + this.config.index + '/' + this.config.length + ')';
        },

        setIndex: function (index) {
            this.config.index = index;
            $('.ftTxt').html(this._getBtTxt())
        }


    }

    w.IntroBottomBar = IntroBottomBar;
})(window, document)

