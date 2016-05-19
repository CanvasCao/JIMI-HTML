/**
 * Created by Administrator on 2016/5/19.
 */



function labelAdapter($con) {//传进一个jq对象 是个容器 会对容器内部的所有标签进行适配
    var winW = $(window).width();
    var winH = $(window).height();
    var bodyPaddingW = parseInt($('body').css('padding-left'));
    var pPaddingW = parseInt($('p').css('padding-left'));


    //图片适配
    $con.find('img').css({ //把所有图片转块 左右居中
        display: 'block',
        margin: '0 auto',
    }).each(function (i, e) { //遍历图片 如果宽度大于屏幕宽-30  则强行等比例宽等于屏宽
        var imgW = parseInt($(e).css('width'));
        var imgH = parseInt($(e).css('height'));
        var RATE = imgW / imgH;
        //alert(imgW+" "+imgH)

        var imgFixedW = (winW - bodyPaddingW * 2 - pPaddingW * 2);
        if (imgW > imgFixedW || imgW == 0) {
            //$(e).attr({width: imgFixedW, height: imgFixedW * RATE});
            //$(e).css({width: imgFixedW, height: imgFixedW * RATE});
            $(e).attr({width: imgFixedW});
            $(e).css({width: imgFixedW});
        }
    })
    //视频适配16比9
    $con.find('iframe').css({width: (winW - bodyPaddingW * 2), height: (winW - bodyPaddingW * 2) * 9 / 16});

    //这一步增加点亮专用类名 删除不是p的标签 ..................................................................
    $con.children().each(function (i, e) {
        if (!$(e).is('p')) { //不是p直接删除
            $(e).remove();
            return;
        }


        //paragraphWeb
        if ($(e).hasClass('jimi-Yunying')) { //内部元素还没ajax 注意！jimi-Yunying只是一个容器
            $(e).addClass('paragraphWeb')//他不是paragraph段落 而是一个web段落
            return;
        }

        //paragraphImg
        if ($(e).find('img').length > 0) {//一个para里最多放一张图 imgBorder
            $(e).parent().addClass('paragraphImg');
            $(e).find('img').each(function (i, e) {
                $(e).addClass('sentenceImg');//类图片类名叫做sentenceImg
            })
            return;  //return依然会遍历所有元素
        }


        //paragraph sentence
        var innerHtml = $(e).html().trim();
        if (innerHtml == '' || innerHtml == '<br>' || innerHtml == '<br/>') { //空标签删除自己
            $(e).remove();  //remove自身父节点循环依然是正确的
            return;
        } else {//认为是真正的文本标签
            $(e).addClass('paragraph');
            //漏到最后的暂时认为他就是纯文本
            var html = innerHtml.AppendSpansByPeriod(); //句子增加span已经添加在原型方法里
            $(e).html(html);
        }
    });

}

