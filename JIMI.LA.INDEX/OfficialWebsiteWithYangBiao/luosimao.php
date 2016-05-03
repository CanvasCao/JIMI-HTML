<?php
//姓名
$uname = $_REQUEST['uname'];
//公司
$company = $_REQUEST['company'];
//电话
$phone = $_REQUEST['phone'];
//邮箱
$email = $_REQUEST['email'];
$send = new LuoSiMaoApi();
$bool = $send->sendMsg($uname,$company,$phone,$email);
echo $bool;
/*
http://luosimao.com/类
*/

class LuoSiMaoApi
{
    public  static $key="cec6dbe5e9dcde5bcb694373df991979";
    public  static $signature="【肌秘API申请】";
    public  static $username = '姓名:';
    public  static $companyTitle = '公司:';
    public  static $telPhone = '电话:';
    public  static $emailTitle = '邮箱:';
    public  static $url="http://sms-api.luosimao.com/v1/send.json";
    public  static $timeout=5;
    //==========================================================================
    //==========================================================================
    //==========================================================================
    //==========================================================================
    /*
    作用：发送短信
    输入：$phone=号码/$msg=内容(不带签名)
    */
    public static  function sendMsg($uname,$company,$phone,$email)
    {
        //组织内容
        $curlPost=array();
        $curlPost['mobile']='18019117329';
        $curlPost['message']=self::$username.$uname."\r\n".
                             self::$companyTitle.$company."\r\n".
                             self::$telPhone.$phone."\r\n".
                             self::$emailTitle.$email."\r\n".
                             self::$signature;

        //发送
        $ch=curl_init();
        curl_setopt($ch,CURLOPT_URL,self::$url);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,self::$timeout);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_POST,1);
        curl_setopt($ch,CURLOPT_POSTFIELDS,$curlPost);
        curl_setopt($ch,CURLOPT_USERPWD,'api:key-'.self::$key);
        $res = curl_exec( $ch );
        curl_close( $ch );
        $mess = json_decode($res,true);
        switch($mess['error']){
            case 0:
                return 0;
                break;
            case -10:
                ResponseJson::show('-10','验证信息失败',false);
                break;
            case -20:
                ResponseJson::show('-20','短信余额不足',false);
                break;
            case -30:
                ResponseJson::show('-30','短信内容为空',false);
                break;
            case -31:
                ResponseJson::show('-31','短信内容存在敏感词',false);
                break;
            case -32:
                ResponseJson::show('-32','短信内容缺少签名信息',false);
                break;
            case -40:
                ResponseJson::show('-32','错误的手机号',false);
                break;
            case -50:
                ResponseJson::show('-32','请求发送IP不在白名单内',false);
                break;
        }
    }
}