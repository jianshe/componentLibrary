/*TMODJS:{"version":1,"md5":"b41db6fee594c78049fceb1b9de6e827"}*/
template('common/icheck_radio_list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(list,function(value,$index){
$out+=' <input type="';
$out+=$escape(value.type);
$out+='" id="';
$out+=$escape(value.id);
$out+='" name="';
$out+=$escape(value.name);
$out+='" value="';
$out+=$escape(value.value);
$out+='"> <label for="';
$out+=$escape(value.id);
$out+='">';
$out+=$escape(value.content);
$out+='</label> ';
});
return new String($out);
});