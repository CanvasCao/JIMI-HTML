//ֻ����Ⱦ��ɫ��  �����
function TableBlock(json,ctx) {
    this.ctx=ctx
    this.Wnum = json.Wnum;
    this.Hnum = json.Hnum;
    this.locX = json.locX; //���ݿ���ʼλ�� �Ժ���ƶ�
    this.locY = json.locY;
    this.cellX=json.cellX;
    this.cellY=json.cellY;
    this.fillStyle = json.fillStyle;
    this.Render();

}

TableBlock.prototype = {

    FixLocation: function (dx, dy) {
        this.locX += dx;
        this.locY += dy;
    },
    Render: function (dx, dy) { //dxdy����ָ�����е�����ֵ
        this.ctx.fillStyle = this.fillStyle;
        dx=dx===undefined?0:dx;
        dy=dy===undefined?0:dy;//������ֻ�����Ǵ�ֵ��ʱ������

        //Ŀǰֻ������
        //this.ctx.fillRect(this.locX + dx, this.locY + dy, cell.x * this.Wnum, cell.y * this.Hnum);

        //������
        this.ctx.strokeStyle='#aaa';
        this.ctx.fillStyle='white';
        this.ctx.lineWidth=5;
        for(i=1;i<=this.Hnum;i++){ //Hnum���Ǽ��е���˼ ������
            for(j=1;j<=this.Wnum;j++){
                //X+ƫ����+ ����j��ƫ���˼���cellX
                this.ctx.strokeRect(this.locX+dx+(j-1)*this.cellX,this.locY+dy+(i-1)*this.cellY,this.cellX,this.cellY);
                this.ctx.fillRect(this.locX+dx+(j-1)*this.cellX,this.locY+dy+(i-1)*this.cellY,this.cellX,this.cellY)
            }
        }
    }

}
