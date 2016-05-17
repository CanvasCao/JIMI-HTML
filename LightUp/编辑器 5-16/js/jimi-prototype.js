/**
 * Created by Administrator on 2016/5/17.
 */

String.prototype.AppendSpansByPeriod = function () {
    var lastChar = this.substr(this.length - 1, 1);

    var arr = ['。', '！', '!', '？', '?']; //。?？！!
    if ($.inArray(lastChar, arr) == -1) { // 没有句号 默认是整段

        var str = '<span class="sentence">' + this + '</span>';
        return str;
    }
    else {
        var pattern = /[^。?？！!]*[。?？！!]{1}/ig;
        var htmlArr = this.match(pattern);


        var str = '';
        for (var i = 0; i < htmlArr.length; i++) {
            str += '<span class="sentence">' + htmlArr[i] + '</span>';
        }
        return str;
    }
}
