//ֻ����Ⱦ��ɫ��  �����
function TableBlock(json,ctx) {
    this.ctx=ctx
    this.Wnum = json.Wnum;
    this.Hnum = json.Hnum;
    this.locX = json.locX; //���ݿ���ʼλ�� �Ժ���ƶ�
    this.locY = json.locY;
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
        this.ctx.strokeStyle=this.fillStyle;
        for(i=1;i<=this.Hnum;i++){ //Hnum���Ǽ��е���˼ ������
            for(j=1;j<=this.Wnum;j++){
                this.ctx.strokeRect(this.locX+dx+j*)
                //X+ƫ����+ ����j��ƫ���˼���x
            }
        }
    }

}
