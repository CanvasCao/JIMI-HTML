;
(function (w, d, undefined) {
//version 1.0.0
//create by CAO on 2016/3/28

    function OriginalOutputCode(container, strArr) {
        this.C = this.container = container;
        this.strArr = strArr;
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
            this.config.lineNum=this.strArr.length;
        },
        createDom: function () {
            $(this.C).html('<table style="border-spacing: 0"></table>')
            $(this.C).find('table').html('<tr></tr>')
            $(this.C).find('tr').html('<td><pre></pre></td>'+'<td><pre></pre></td>')

            var str='';
            for(i=0;i<this.config.lineNum;i++){
                str+=(i+1)+'\r\n';
            }
            $(this.C).find('pre').eq(0).html(str);

            var str=''
            for(i=0;i<this.config.lineNum;i++){
                str+=this.strArr[i]+'\r\n';
            }
            $(this.C).find('pre').eq(1).html(str)

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


