
//ֻ����Ⱦ��ɫ��  �����
function TableBlock(locX, locY, Wnum, Hnum, fillStyle) {
    this.Wnum = Wnum;
    this.Hnum = Hnum;
    this.locX = locX; //���ݿ���ʼλ�� �Ժ���ƶ�
    this.locY = locY;
    this.fillStyle = fillStyle;
    this.Render()

}
TableBlock.prototype = {

    FixLocation: function (dx, dy) {
        this.locX += dx;
        this.locY += dy;
    },
    Render: function (dx, dy) {
        context.fillStyle = this.fillStyle;
        dx=dx===undefined?0:dx;
        dy=dy===undefined?0:dy;
        context.fillRect(this.locX + dx, this.locY + dy, cell.x * this.Wnum, cell.y * this.Hnum);
    }

}
