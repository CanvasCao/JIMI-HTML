/**
 * Created by Administrator on 2016/7/25.
 */

var mirrorUid=localStorage.getItem('mirrorUid');
document.domin='jd.com';
if(!mirrorUid){
    $.ajax({
        type: "get",
        url: jimiHost + '/getUid.php',
        success: function (data) {
            console.log(JSON.stringify(data));
            var data=JSON.parse(data);

            localStorage.setItem('mirrorUid',new Date().toLocaleString());
        },
        error: function (err) {
            console.log('ERROR!')
            console.log(err);
        }
    })
}
