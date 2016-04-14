<?php
include_once('./common/DBMongo.class.php');
include_once('./common/Db.class.php');
set_time_limit(0);
if(isset($_REQUEST['pid'])) {
    $pid = $_REQUEST['pid'];
    $mongo = new DBMongo();
    $where = array('_id' => new \MongoId($pid));
    $proList = $mongo->selectDocument(Db::get_mongo(), array(), $where);
    $formulas = $proList[0]['formula']['value'];
    foreach ($formulas as &$item) {
        if(!empty($item['obj_id'])){
            $where_f = array('_id' => new \MongoId($item['obj_id']));
            $result = reset($mongo->selectDocument('formulas', array(), $where_f));
            $array = explode('|', $result['type']);
            $item['type'] =  $result['type'];
            $item['specials'] =  $result['specials'];
            $arr_t = array_filter($array);
            $arr_f = array_merge($arr_t);
            if (in_array('皮肤调理剂', $arr_f) || in_array('头发调理剂', $arr_f)) {
                $item['active'] = 'alj_01';
            }
            if (in_array('防晒剂', $arr_f)) {
                $item['active'] = 'alj_04';
            }
            if (in_array('皮肤柔润剂', $arr_f)) {
                $item['active'] = 'alj_03';
            }
            $data = array(
                'fid' => $result['_id']->{'$id'}
            );
            $url = 'jimi://' . base64_encode(json_encode($data));
            $item['url'] = $url;
        }
    }

    foreach ($formulas as $key => $items) {
            if(empty($items['url']))
                $items['url'] = "javascript:;";
            $str .='<a href="'.$items['url'].'"><span class="'.$items['active'].'">'.$items['name'].'</span></a>、';
    }
   $xfli_01 = 'jimi://' .base64_encode(json_encode(array('type'=>1,'title'=>'皮肤/头发调理剂','content'=>'在皮肤或者头发上起生理功效的成分')));
   $xfli_02 = 'jimi://' .base64_encode(json_encode(array('type'=>1,'title'=>'剂型','content'=>'组成化妆品质地和质感的成分，与功效无关')));
   $xfli_03 = 'jimi://' .base64_encode(json_encode(array('type'=>1,'title'=>'皮肤柔润剂','content'=>'提供皮肤保湿功效的成分')));
   $xfli_04 = 'jimi://' .base64_encode(json_encode(array('type'=>1,'title'=>'防晒剂','content'=>'有阻挡紫外线功效的成分')));
   $v1 =  substr($str,0,strlen($str)-4);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $mongo = new DBMongo();
    $where =  array('_id'=>new \MongoId($pid));
    $proList  = $mongo->selectDocument(Db::get_mongo(),array(),$where);
    $formula = $proList[0]['formula']['value'];
    foreach ($formula as &$it) {
        if(!empty($it['obj_id'])) {
            $where_f = array('_id' => new \MongoId($it['obj_id']));
            $result = reset($mongo->selectDocument('formulas', array(), $where_f));
            if ($result['pox'] > 0 || $result['stimulation'] > 0)
                $it['active'] = 'alj_05';
            $data = array(
                'fid' => $result['_id']->{'$id'}
            );
            $url = 'jimi://' . base64_encode(json_encode($data));
            $it['url'] = $url;
        }
    }
    foreach ($formula as $key=>$itemt){
        if(empty($itemt['url'])) {
            $itemt['url'] = "javascript:;";
        }
       $str1 .='<a href="'.$itemt['url'].'"><span class="'.$itemt['active'].'">'.$itemt['name'].'</span></a>、';
    }
    $xfli_05 = 'jimi://' .base64_encode(json_encode(array('type'=>1,'title'=>'致敏/致痘成分','content'=>'有一定的导致过敏，或者导致致痘风险的成分')));
    $xfli_06 = 'jimi://' .base64_encode(json_encode(array('type'=>1,'title'=>'正常成分','content'=>'通常情况下没有安全风险的成分')));
    $v2 =  substr($str1,0,strlen($str1)-4);

}
?>

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <title>产品详情</title>
    <script>
        // JavaScript Document

        function setTab(name,cursel,n){
            for(i=1;i<=n;i++){
                var menu=document.getElementById(name+i);
                var con=document.getElementById("con_"+name+"_"+i);
                menu.className=i==cursel?"hover":"";
                con.style.display=i==cursel?"block":"none";
            }
        }

    </script>
    <style>
        body,html{ margin:0; height:100%; background:#fff;}
        div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,input,button,textarea,select,p,span{ margin:0;padding:0; font:14px/20px "微软雅黑"，Arial; color:#464646;}
        a { text-decoration:none;}
        ul,li,ol,ul {list-style:none;}
        .cnt_nr { width:100%; text-align:center; float:left; }
        .cf_more_bt { padding:0 15px; float:left; margin:15px 0;}
        .cf_more_bt h3{ float:left; color:#727272; font-size:14px; line-height:30px;}
        .cf_more_bt a{ width:16px; border-radius: 10px; margin:8px 0 0 5px;height:16px; color:#fff; background:#0e93ff; float:left; line-height:16px;}
        .showDetail { padding:15px; float:left; background:#f3f3f3; position:relative; z-index:2;}
        .showTabsTitle { position: fixed; background:#fff; border:1px solid #bdbdbd; border-radius: 20px; padding:2px 3px; top:15px; right:15px; }
        .showTabsTitle li{ padding:0 10px; float:left;  font-size:12px; line-height:24px; cursor:pointer;}
        .showTabsTitle li.hover { color:#fff; border-radius: 20px; background:#0e93ff;}
        .chenfen_nr { width:100%; float:left; text-align:left; padding-bottom:100px;}
        .chenfen_nr a{ color:#424242; font-size:15px; line-height:30px;}
        .chenfen_js { width:100%; padding:10px 0; position:fixed; bottom:0; left:0; background:#fff;}
        .chenfen_js li{ width:50%; float:left;}
        .chenfen_js li a{ color:#525252;}
        .chenfen_js li span{ width:5px ; height:5px; border-radius:2px; float:left; background:#525252; margin:13px 10px 0 20px;}
        .chenfen_js li.xfli_01 a,.chenfen_nr .alj_01{ color:#ff9000;}
        .chenfen_js li.xfli_01 span{ background:#ff9000;}
        .chenfen_js li.xfli_03 a,.chenfen_nr .alj_03{ color:#018cff;}
        .chenfen_js li.xfli_03 span{ background:#018cff;}
        .chenfen_js li.xfli_04 a,.chenfen_nr .alj_04{ color:#52d200;}
        .chenfen_js li.xfli_04 span{ background:#52d200;}
        .chenfen_js li.xfli_05 a,.chenfen_nr .alj_05{ color:#ff4005;}
        .chenfen_js li.xfli_05 span{ background:#ff4005;}
    </style>
</head>
<body>
<div class="main cnt_nr">
    <div class="cf_more_bt" ><h3>产品分布</h3><a href="http://n1.jimi.la/apps_V2/html5/chenfenjiedu.html">?</a></div>
    <div class="showDetail">
        <div class="showTabsTitle">
            <ul>
                <li id="one1" onclick="setTab('one',1,2)" class="hover">按类型</li>
                <li id="one2" onclick="setTab('one',2,2)" >按安全</li>
            </ul>
        </div>
        <div class="showContentbox aboutlb2">
            <div id="con_one_1">
                <div class="chenfen_nr">
                    <?php
                    echo $v1;
                    ?>
                </div>
                <ul class="chenfen_js">
                    <li class="xfli_01"><span></span><a href="<?php echo $xfli_01 ?>">皮肤/头发调理剂</a></li>
                    <li class="xfli_02"><span></span><a href="<?php echo $xfli_02 ?>">剂型</a></li>
                    <li class="xfli_03"><span></span><a href="<?php echo $xfli_03 ?>">皮肤柔润剂</a></li>
                    <li class="xfli_04"><span></span><a href="<?php echo $xfli_04 ?>">防晒剂</a></li>
                </ul>
            </div></div>
            <div id="con_one_2" style="display:none">
                <div class="chenfen_nr">
                    <?php
                    echo $v2;
                    ?>
                </div>
                <ul class="chenfen_js">
                    <li class="xfli_05"><span></span><a href="<?php echo $xfli_05 ?>">致敏/致痘成分</a></li>
                    <li class="xfli_02"><span></span><a href="<?php echo $xfli_06 ?>">正常成分</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</body>
</html>
