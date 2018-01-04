/*TMODJS:{"version":1,"md5":"2799be925b914d93233e94e7281eecf4"}*/
template('common/popup/dialog',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,style=$data.style,title=$data.title,$string=$utils.$string,content=$data.content,$out='';$out+='<div class="screen-bg"></div> <div class="pop" style="width: ';
$out+=$escape(style.width);
$out+='; margin-top: ';
$out+=$escape(style.marginTop);
$out+='; margin-left: ';
$out+=$escape(style.marginLeft);
$out+=';height:';
$out+=$escape($helpers. defaultVal(style.height , '250px;'));
$out+='"> <span class="pop-close icon-cross"></span> <div class="pop-title">';
$out+=$escape(title);
$out+='</div> <div class="pop-content"> ';
$out+=$string(content);
$out+=' </div> </div>';
return new String($out);
});