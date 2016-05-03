;
(function (w, d, undefined) {
//version 1.0.1
//data换成了一个json
//create by CAO on 2016/3/29
//为了配合prism.js的高亮 生成的pre内部必须加入code标签
    function OriginalOutputCode(container, data) {
        this.C = this.container = container;
        this.codeArr = data.codeArr;
        this.language = data.language;
        this.config = {};
        this.init();
    }

    OriginalOutputCode.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {
            this.config.lineNum = this.codeArr.length;
        },
        createDom: function () {
            $(this.C).html('<table style="border-spacing: 0"></table>')
            $(this.C).find('table').html('<tr></tr>')//表格只有一行
            $(this.C).find('tr').html('<td><pre><code></code></pre></td>' + '<td><pre><code></code></pre></td>')//左面是行号 右面是代码
            $(this.C).find('code').eq(0).addClass('language-css')
            $(this.C).find('code').eq(1).addClass('language-' + this.language)

            var str = '';
            for (i = 0; i < this.config.lineNum; i++) {
                str += (i + 1) + '\r\n';
            }
            $(this.C).find('code').eq(0).html(str);

            var str = ''
            for (i = 0; i < this.config.lineNum; i++) {
                str += this.codeArr[i] + '\r\n';
            }
            $(this.C).find('code').eq(1).html(str)

        },
        initCSS: function () {
            var that = this;
            $(this.C).find('pre').css({
                display: 'block',
                padding: '9.5px',
                margin: '0 0 10px',
                'font-size': '13px',
                'line-height': '1.42857143',
                'word-break': 'break-all',
                'word-wrap': 'break-word',
                color: '#333',
                'background-color': '#f5f5f5',
                border: '1px solid #ccc',
                'border-radius': '3px'
            })

        },
        bindEvent: function () {
            var that = this;
        }
    }
    w.OriginalOutputCode = OriginalOutputCode;
})(window, document)


