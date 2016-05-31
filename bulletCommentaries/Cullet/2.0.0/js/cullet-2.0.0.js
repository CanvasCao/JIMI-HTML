/*!
 * cullet Cao+Bullet, a JavaScriptPlugIn v2.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-5-31 14:45:10
 */

/*!
 2.0.0
 更新背景颜色
 更新弹幕样式
 点赞样式
 点赞存数据库
 取消本人弹幕在右侧设定

 **基础算法重写 弹幕消失不再清楚内存 只是停止移动等待下次队列启动
 */

;
(function (w, d, $, undefined) {

    //弹幕CommentCell与dom有关 因为dom是他的表现层
    function CommentCell(container, json) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.json = json;

        this.txt = json.txt || Math.random();
        this.txt = (json.txt.length > 20) ? json.txt.substr(0, 20) + '..' : json.txt;
        this.lineNum = json.lineNum || 1;//不能不给
        this.top = json.top || 1; //出身位置一定是top随机 left 100%（就是屏幕右端）
        this.id=json.commentsPK; //数据库comments表的主键 作为id

        this.speed = json.speed || 2.1;
        this.expression = json.expression || 1;
        this.ccm = json.ccm;//不能不给


        this.occupied = false; //是否占据屏幕右侧
        this.liked = false; //是否点赞了 ajax后应该是后台返
        this.moving = false;//是否需要移动

        this.winH = $(window).height();
        this.winW = $(window).width();
        this.JM = this.jqueryMap = {};


        this.uid = json.uid;//这个版本没用了
        this.config = {//这个版本没用了
            ifUser: false
        };


        this.init();

    };

    CommentCell.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            //这不是后台传的 我需要自己判断 这个版本不需要知道是否是自己的弹幕
            //this.config.ifUser = (this.json.uid == searchJson.uid) ? true : false;
        },
        createDom: function () {
            var that = this;

            //我给每一个cell一个id值 cell+时间戳 这个版本应该用不到
            $(this.C).find('.commentCon').append('<div class="comment" id=cell' + that.id + '>' +
                '<div class="commentImg">' + '<img src="img/expression/' + that.expression + '.png" />' + '</div>' +
                '<div class="commentTxt">' + that.txt + '</div>' +
                '<div class="commentLike"><img src="img/like.png" width="30"/></div>' +
                '</div>');

            //setJqMap
            this.JM.$cell = $(this.C).find('#cell' + that.id);
        },
        initCSS: function () {
            var that = this;


            //设置当前弹幕本身的css
            this.JM.$cell.css({left: 2 * that.winW});
            this.JM.$cell.css({top: that.top});

            this.JM.$cell.css({
                position: 'absolute',
                display: 'block',
                'box-sizing': 'border-box',
                'font-size': '16px',
                'padding': '3px 25px',
                'border-radius': '30px',
                'border': '1px solid white',
                'background-color': 'transparent',
                opacity: 1,
            });


            this.JM.$cell.find('.commentImg').css({
                'position': 'absolute',
                'border-radius': '50%',
                top: -5,
                left: -15,
                //'margin-top': '2px',
            }).find('img').css({
                width: '40px',
                'border-radius': '50%'
            });

            this.JM.$cell.find('.commentTxt').css({
                color: 'white',
                'font-size': '16px'
            });

            this.JM.$cell.find('.commentLike').css({
                'position': 'absolute',
                'top': -15,
                left: '55%',
                transform: 'translateX(-50%)',
                color: 'white',
                'font-size': '16px',
                'opacity': 0
            })


            //that.config.ifUser保存了当前的弹幕是否是用户发送的 现在没有了
            if (that.config.ifUser) {
            }
            //that.json.ifCurrent 保存了当前弹幕是否是在当前inputbox发送的 现在也没有了
            if (that.json.ifCurrent) {
            }

        },
        bindEvent: function () {
            var that = this;
            this.JM.$cell.click(function () {
                if (that.liked) {
                    that.liked = false;
                    $(this).css({backgroundColor: 'transparent'});
                    $(this).find('.commentLike').stop().animate({ 'opacity': 0},0);
                } else {
                    that.liked = true;
                    $(this).css({backgroundColor: '#3881e0'});
                    $(this).find('.commentLike').css({'top': 0}).stop().animate({'top': -15, 'opacity': 1});
                }

                that.speed+=1;
            })

        },
        move: function () {
            var that = this;

            if (!that.moving) {
                return;
            }

            var cellLeft = that.cssCell('left');
            var cellWidth = that.cssCell('width');

            this.cssCell('left', (cellLeft - that.speed));
            //一开始一定占据屏幕右侧 一旦开始不占据屏幕右侧就让occupied=false

            if (that.occupied) {
                if (cellLeft + cellWidth + 20 < $(window).width()) {
                    that.occupied = false;
                }

            }


            //如果移动出屏幕就停止
            if (this.cssCell('left') <= (-this.cssCell('width'))) {
                that.stop();
            }
            ;
        },
        ready: function (json) {
            var that = this;
            var lineNum = json.lineNum;
            var top = json.top;

            that.moving = true;
            that.occupied = true;
            this.cssCell('left', that.winW);
            this.cssCell('top', top);
            this.lineNum = lineNum;
            this.speed=json.speed;
        },
        stop: function () {
            var that = this;
            that.moving = false;
        },
        cssCell: function (property, value) {
            if (!value) {
                //return Math.floor(parseFloat(this.jqueryMap.$cell.css(property))); //Math.floor就不会出现弹幕偶然卡住的情况了
                return (parseFloat(this.jqueryMap.$cell.css(property))); //Math.floor就不会出现弹幕偶然卡住的情况了
            }
            else {
                this.jqueryMap.$cell.css(property, value);
            }
        },


        //showLength: function () {
        //    var that = this;
        //    console.log("dom树  " + $('.comment').length);
        //    console.log("ccm列表  " + that.ccm.commentArr.length);
        //
        //},

    };

    //管理类与dom无关 容器只能加这里 写在弹幕类里有延迟
    function CommentCellManage(container, json) {
        this.C = this.container = (typeof container == 'string') ? $(container) : container;
        this.json = json;

        this.ccmH = $(this.C).height();//可能是半屏
        this.winW = $(window).width();
        this.cellH = 30;
        this.cellPaddingTop = 15;

        this.lineNumber = Math.floor(this.ccmH / (this.cellH + this.cellPaddingTop)); //弹幕应该有的行数

        this.lineResArr = [];//保存了所有行的数组 一开始是空


        this.serverCommentArr = [];//ajax加载的弹幕 现在他来维护弹幕
        this.serverCommentIndex = 0;//加载到索引值
        this.commentCellArr = [];//ajax加载以后赋值 只赋值一次

        this.speedHash = {
            slow: 1.1,
            normal: 2.1,
            fast: 3.1,
            superfast: 4.1,
        };
        this.speedKey = 'normal';

        this.moveFPS = 60;
        this.moveTimer = null;
        this.pushFPS = 1;
        this.pushTimer = null; //push严格来说是 make commentCell ready 的意思了

        this.pid = '';
        this.pname = '';
        this.init();

    };

    CommentCellManage.prototype = {
        init: function () {
            w.ccm = this; //调试用
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            $(this.C).append("<div class='commentCon'></div><div class='commentPname'></div><div class='commentClose'>×</div>")
            $(this.C).find('.commentCon').css({
                position: 'absolute',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                'box-sizing': 'border-box',
                'background-color': 'rgba(49, 73, 104,0.8)',
                opacity: 1,
            });

            $(this.C).find('.commentPname').css({
                position: 'absolute',
                height: 40,
                width: $(window).width() * 0.8,
                left: 0,
                top: 0,
                'font-size': '16px',
                'line-height': '40px',
                color: 'white',
                'padding-left': 20
            });

            $(this.C).find('.commentClose').css({
                position: 'absolute',
                top: 0,
                left: $(window).width() - 40,
                color: 'white',
                'font-size': 40,
                'line-height': '40px',

            })
        },
        bindEvent: function () {
            var that = this;

            $(this.C).find('.commentClose').click(function () {
                that.pause();
                $(that.C).fadeOut();
            })

        },
        push: function () { //push是makeReady的意思了
            var that = this;


            function GetRandom(begin, end) {
                return Math.floor(Math.random() * (end - begin)) + begin;
            };

            function GetTop(lineIndex) { //静态方法 根据行号返回top值
                return (lineIndex * (that.cellH + that.cellPaddingTop) + that.cellPaddingTop);
            };

            function GetLineNum() {
                that.lineResArr = [];
                for (i = 1; i < that.lineNumber - 1; i++) { //第一行和最后两行不能有弹幕
                    that.lineResArr.push(i);
                }
                for (i = 0; i < that.commentCellArr.length; i++) {
                    if (that.commentCellArr[i].occupied) {
                        that.lineResArr = _.without(that.lineResArr, that.commentCellArr[i].lineNum);
                    }
                }
                //lineResArr里面存了哪几行可以插弹幕
                if (that.lineResArr.length) {
                    return that.lineResArr[GetRandom(0, that.lineResArr.length)]
                }
                else {
                    return null;
                }
            };


            //给json赋值 决定弹幕出现的行数
            var lineNum = GetLineNum(); //随机行数
            if (!lineNum) {
                return;
            }
            var top = GetTop(lineNum);


            if (that.commentCellArr[that.serverCommentIndex].moving) {
                return; //要出来的那条还在动
            }
            that.commentCellArr[that.serverCommentIndex].ready({
                lineNum: lineNum,
                top: top,
                speed:that.speedHash['normal'],
            });
            that.serverCommentIndex = (that.serverCommentIndex + 1) >= that.commentCellArr.length ? 0 : (that.serverCommentIndex + 1);
            //console.log(that.serverCommentIndex);

        },
        move: function () {
            var that = this;
            for (i = 0; i < that.commentCellArr.length; i++) {
                if (that.commentCellArr[i]) {
                    that.commentCellArr[i].move();
                    //console.log(that.commentArr[i].speed)
                }
                ;
            }
            ;
        },


        start: function () {
            //循环移动
            var that = this;

            $(that.C).fadeIn();

            if (that.moveTimer) {
                console.log('Timer already exists');
                return;
            } else {
                that.moveTimer = setInterval(function () {
                    that.move();
                }, 1000 / that.moveFPS);

                that.pushTimer = setInterval(function () {
                    that.push();
                }, 1000 / that.pushFPS);
            }
            ;

        },
        pause: function () {
            var that = this;
            clearInterval(that.moveTimer);
            delete(that.moveTimer); //原来moveTimer要delete

            clearInterval(that.pushTimer);
            delete(that.pushTimer);
        },
        changeSpeed: function (speedKey) {
            var that = this;

            that.speedKey = that.speedHash.hasOwnProperty(speedKey) ? speedKey : 'normal';
            //旧的也改变速度
            for (i = 0; i < that.commentCellArr.length; i++) {
                if (that.commentCellArr[i]) {
                    that.commentCellArr[i].speed = that.speedHash[that.speedKey];
                }
            }
        },

        //that.commentCellArr.push
        add: function (json) {
            var that = this;
            that.commentCellArr.push(new CommentCell(that.C, json));
        },
        load: function (pid) { //传入php问号后面的查询参数
            var that = this;
            if (pid == that.pid) {
                that.start(); //加载完成以后开始播放
                return; //加载过了
            }

            $.ajax({
                type: "get",
                url: 'http://n1.jimi.la/apps_T1/culletSelect.php?pid=' + pid,
//                url: 'package.json',
                dataType: "jsonp",
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback: "jsonpcallback",
                success: function (data) {
                    console.log(JSON.stringify(data));

                    that.pid = pid;//记录一下 没什么用
                    that.pname = data.pname;//记录一下 产品id和名字 没什么用
                    that.clear(); //清除arr列表和dom树
                    that.changePname(data.pname);
                    that.serverCommentArr = data.data;
                    for (i = 0; i < that.serverCommentArr.length; i++) {
                        //for (i = 0; i < 1; i++) {
                        var serverJson = that.serverCommentArr[i];
                        that.commentCellArr.push(new CommentCell(that.C, serverJson));
                    }
                    that.start(); //加载完成以后开始播放
                },
                error: function (err) {
                    console.log('LOAD ERROR!')
                    console.log(err);
                }
            });
        },
        clear: function () {
            var that = this;
            that.commentCellArr = [];
            that.serverCommentArr=[];
            $(that.C).find('.commentCon').html('');
            that.serverCommentIndex = 0;
            that.pause();
        },
        changePname: function (pname) {
            var that = this;
            $(that.C).find('.commentPname').html(pname);
        }
    };

    w.CommentCell = CommentCell;
    w.CommentCellManage = CommentCellManage;
})(window, document, jQuery);



