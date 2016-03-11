//只能渲染颜色块  类对象
function TableBlock(json,ctx) {
    this.ctx=ctx
    this.Wnum = json.Wnum;
    this.Hnum = json.Hnum;
    this.locX = json.locX; //数据块起始位置 以后会移动
    this.locY = json.locY;
    this.fillStyle = json.fillStyle;
    this.Render();

}

TableBlock.prototype = {

    FixLocation: function (dx, dy) {
        this.locX += dx;
        this.locY += dy;
    },
    Render: function (dx, dy) { //dxdy是手指滑动中的修正值
        this.ctx.fillStyle = this.fillStyle;
        dx=dx===undefined?0:dx;
        dy=dy===undefined?0:dy;//这两行只在忘记传值的时候有用

        //目前只是填充块
        //this.ctx.fillRect(this.locX + dx, this.locY + dy, cell.x * this.Wnum, cell.y * this.Hnum);

        //画网格
        this.ctx.strokeStyle=this.fillStyle;
        for(i=1;i<=this.Hnum;i++){ //Hnum就是几行的意思 遍历行
            for(j=1;j<=this.Wnum;j++){
                this.ctx.strokeRect(this.locX+dx+j*)
                //X+偏移量+ 几个j就偏移了几个x
            }
        }
    }

}
