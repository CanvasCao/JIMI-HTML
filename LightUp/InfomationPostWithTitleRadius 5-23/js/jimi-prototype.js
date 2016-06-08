/**
 * Created by Administrator on 2016/5/17.
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

String.prototype.searchToJson = function () {
    var search = window.location.search.replace('?', "");
    var kvArr = search.split('&');
    var finalJson = {}
    for (i = 0; i < kvArr.length; i++) {
        var kvSplit = kvArr[i].split('=');
        finalJson[kvSplit[0].toLowerCase()] = decodeURI(kvSplit[1]);

    }
    return finalJson;
}
