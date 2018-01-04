/*TMODJS:{"version":1,"md5":"91108a1ab91bbda8d2d7edf466973f80"}*/
template('common/icheck_radio',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,type=$data.type,id=$data.id,name=$data.name,$string=$utils.$string,content=$data.content,$out='';$out+='<input type="';
$out+=$escape(type);
$out+='" id="';
$out+=$escape(id);
$out+='" name="';
$out+=$escape(name);
$out+='"> <label for="';
$out+=$escape(id);
$out+='">';
$out+=$string(content);
$out+='</label>';
return new String($out);
});