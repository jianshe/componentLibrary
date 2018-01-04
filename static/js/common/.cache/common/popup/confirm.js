/*TMODJS:{"version":1,"md5":"30503db86dafc818942e1da0637d2d33"}*/
template('common/popup/confirm',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,height=$data.height,width=$data.width,marginTop=$data.marginTop,marginLeft=$data.marginLeft,title=$data.title,$string=$utils.$string,content=$data.content,$out='';$out+='<div id="confirm" class="screen-bg"></div> <div class="pop confirm" style="height: ';
$out+=$escape(height);
$out+='; width: ';
$out+=$escape(width);
$out+='; margin-top: ';
$out+=$escape(marginTop);
$out+='; margin-left: ';
$out+=$escape(marginLeft);
$out+=';"> <span class="pop-close icon-cross" data-op="close"></span> <div class="pop-title">';
$out+=$escape(title);
$out+='</div> <div class="pop-content"> ';
$out+=$string(content);
$out+=' </div> <div class="pop-bottom"> <span class="btn btn-middle btn-orange" data-op="confirm">确认</span> <span class="btn btn-middle btn-disabled" data-op="cancel">取消</span> </div> </div>';
return new String($out);
});