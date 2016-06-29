/**
 * Created by Administrator on 2016/5/19.
 */

String.prototype.AppendSpansByPeriod = function () {


    var lastChar = this.substr(this.length - 1, 1);

    var arr = ['。', '！', '!', '？', '?']; //。?？！!
    if ($.inArray(lastChar, arr) == -1) { // 没有句号 默认是整段

        var str = '<span class="sentence">' + this + '<span class="count"></span></span>';
        return str;
    }
    else {
        var pattern = /[^。?？！!]*[。?？！!]{1}/ig;
        var htmlArr = this.match(pattern);


        var str = '';
        for (var i = 0; i < htmlArr.length; i++) {
            str += '<span class="sentence">' + htmlArr[i] + '<span class="count"></span>' + '</span>';
        }

        return str;
    }
}


function labelAdapter($con) {//传进一个jq对象 是个容器 会对容器内部的所有标签进行适配
    var winW = $(window).width();
    var winH = $(window).height();
    var bodyPaddingW = parseInt($('.txtContainer').css('padding-left'));
    var pPaddingW = parseInt($('p').css('padding-left'));


    //图片适配
    $con.find('img').css({ //把所有图片转块 左右居中
        display: 'block',
        margin: '0 auto',
    }).each(function (i, e) { //遍历图片 如果宽度大于屏幕宽-30  则强行等比例宽等于屏宽
        var imgW = parseInt($(e).css('width'));
        var imgH = parseInt($(e).css('height'));
        var RATE = imgW / imgH;
        //console.log(imgW + " " + imgH)
        //console.log(RATE);
        var imgFixedW = (winW - bodyPaddingW * 2 - pPaddingW * 2) - 2;


        if (imgW > imgFixedW) {
            $(e).attr({width: imgFixedW, height: imgFixedW / RATE});
            $(e).css({width: imgFixedW, height: imgFixedW / RATE});
        }
        //else
        if (imgW == 0) {
            $(e).attr({width: imgFixedW});
            $(e).css({width: imgFixedW});

        }

        $(this).click(function(){
            var src=$(this).attr('src');
            var href=base64_encode('{"type":6,"imgSrc":"'+src+'"}');
            window.location.href='jimi://'+href;
        })

    })
    //视频适配16比9.........................................................................................
    $con.find('iframe').css({width: (winW - bodyPaddingW * 2), height: (winW - bodyPaddingW * 2) * 9 / 16})


    //这一步增加点亮专用类名 删除不是p的标签 ..................................................................
    $con.children().each(function (i, e) {
        if (!$(e).is('p')) { //不是p直接删除
            $(e).remove();
            return;
        }


        //paragraphWeb.....................................................
        if ($(e).hasClass('jimi-Yunying')) { //内部元素还没ajax 注意！jimi-Yunying只是一个容器
            $(e).addClass('paragraphWeb');//他不是paragraph段落 而是一个web段落
            //$(e).append('<span class="count"></span>'); 很遗憾这里不能加 ajax会覆盖全部
            return;
        }

        //paragraphImg
        if ($(e).find('img').length > 0) {//一个para里最多放一张图 imgBorder
            $(e).addClass('paragraphImg');
            $(e).append("<span class='count'></span>");
            $(e).find('img').each(function (i, e) {
                $(e).click(function () {
                    //点击放大..................
                    console.log($(e).attr('src'))
                });
            });
            return;  //return依然会遍历所有元素
        }


        //paragraph sentence
        //认为是真正的文本标签
        $(e).addClass('paragraph');
        //漏到最后的暂时认为他就是纯文本

        var brSplitArr = $(e).html().split('<br>');
        var brProcessedArr = [];
        for (i = 0; i < brSplitArr.length; i++) {
            if (brSplitArr[i].trim() == '') {
                continue; //解释一下 因为br和br之间split之后会有'' 空字符串就不加span了
            }
            brProcessedArr.push(brSplitArr[i].AppendSpansByPeriod()); //句子增加span已经添加在原型方法里 根据句号加span然后每一个span加一个count
        }
        //console.log(brProcessedArr)
        $(e).html(brProcessedArr.join('<br><br>'));

    });

}

