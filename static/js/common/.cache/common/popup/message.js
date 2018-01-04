/*TMODJS:{"version":1,"md5":"661da4f97fd91c5d0b831621b48f4869"}*/
template('common/popup/message',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,classname=$data.classname,top=$data.top,message=$data.message,$out='';$out+='<div id="message" class="message ';
$out+=$escape(classname);
$out+='" style="top:';
$out+=$escape(top);
$out+='"> <span class="message-close icon-cross"></span> <div class="message-content">';
$out+=$escape(message);
$out+='</div> </div>';
return new String($out);
});