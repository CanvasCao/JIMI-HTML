/**
 * Created by Administrator on 2016/3/10.
 */
var CC={}

//�����������Ļ��xy ����canvas������xy
CC.windowToCanvas=function windowToCanvas(canvas, clientX, clientY) {
    var boundingRect = canvas.getBoundingClientRect();

    return {
        //����x-boundingRect��x
        x: (clientX - boundingRect.left) / (boundingRect.width / canvas.width), //boundingRect.width/canvas.width���ǷŴ�ı���
        y: (clientY - boundingRect.top) / (boundingRect.height / canvas.height)
    }

}
