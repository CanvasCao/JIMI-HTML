//只能渲染颜色块  类对象
function TableBlock(json, ctx, data) {
    this.ctx = ctx;
    this.columnNum = json.columnNum;//columnNum
    this.rowNum = json.rowNum;//rowNum
    this.locX = json.locX; //数据块起始位置 以后会移动
    this.locY = json.locY;
    this.cellX = json.cellX;
    this.cellY = json.cellY;
    this.strokeStyle = json.strokeStyle || "#bbb";
    this.data = data; //保存数据的二维数组
    this.Render();
}

TableBlock.prototype = {

    FixLocation: function (dx, dy) {
        this.locX += dx;
        this.locY += dy;
    },
    Render: function (dx, dy) { //dxdy是手指滑动中的修正值
        this.ctx.fillStyle = this.fillStyle;
        dx = dx === undefined ? 0 : dx;
        dy = dy === undefined ? 0 : dy;//这两行只在忘记传值的时候有用(构造函数简写有用)

        //画网格
        for (i = 0; i <= (this.rowNum - 1); i++) { //rowNum就是几行的意思 遍历行
            for (j = 0; j <= (this.columnNum - 1); j++) {
                this.ctx.save();

                //画矩形
                this.ctx.lineWidth = 5;
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.strokeStyle;
                //X+偏移量+ 几个j就偏移了几个cellX
                this.ctx.strokeRect(this.locX + dx + j * this.cellX, this.locY + dy + i * this.cellY, this.cellX, this.cellY);
                //矩形填充白色背景
                this.ctx.beginPath();
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(this.locX + dx + j * this.cellX, this.locY + dy + i * this.cellY, this.cellX, this.cellY)

                //有数据写字再写字
                if (this.data) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = 'black';
                    this.ctx.fillText(this.data[i][j]||'无', this.locX + dx + j * this.cellX + this.cellX / 2, this.locY + dy + i * this.cellY + this.cellY / 2)

                }


                this.ctx.restore();
            }
        }
    }

}
