/*TMODJS:{"version":1,"md5":"f883b30a853164b124eb173d0be84932"}*/
template('common/popup/float_window',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,istriangle=$data.istriangle,direction=$data.direction,$escape=$utils.$escape,classname=$data.classname,left=$data.left,top=$data.top,$string=$utils.$string,content=$data.content,$out='';if(istriangle){
$out+=' ';
if(direction){
$out+=' <div class="float-window triangle-left ';
$out+=$escape(classname);
$out+='" style="left:';
$out+=$escape(left);
$out+=';top:';
$out+=$escape(top);
$out+='"> ';
}else{
$out+=' <div class="float-window triangle-right ';
$out+=$escape(classname);
$out+='" style="left:';
$out+=$escape(left);
$out+=';top:';
$out+=$escape(top);
$out+='"> ';
}
$out+=' ';
}else{
$out+=' <div class="float-window ';
$out+=$escape(classname);
$out+='" style="left:';
$out+=$escape(left);
$out+=';top:';
$out+=$escape(top);
$out+='"> ';
}
$out+=' ';
$out+=$string(content);
$out+=' </div>';
return new String($out);
});