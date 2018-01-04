//字符串截取
template.helper('subStr', function(str, length) {
    if (str.length > length) {
        return str.substr(0, parseInt(length)) + '...';
    }
    return str;
});
//HTML标签过滤
template.helper('delHtmlTag', function(str){
    return str.replace(/<[^>]+>/g,"");
});

//时间美化
template.helper('beautyDate', function(time) {
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
    if (isNaN(day_diff) || day_diff < 0){
        return;
    } else if(day_diff >= 31){
        return time;
    }
    return day_diff == 0 && (
            diff < 60 && "刚刚" ||
            diff < 120 && "1分钟前" ||
            diff < 3600 && Math.floor(diff / 60) + "分钟前" ||
            diff < 7200 && "1个小时前" ||
            diff < 86400 && Math.floor(diff / 3600) + "小时前") ||
        day_diff == 1 && "昨天" ||
        day_diff < 7 && day_diff + "天前" ||
        day_diff < 31 && Math.ceil(day_diff / 7) + "周前";
});
template.helper("formatTime", function(date, length){
    if (date.length > length) {
        return date.substr(0, parseInt(length));
    }
    return date;
});
//倒计时
template.helper('countDown', function(endtime){
    var day=fomatdate(endtime);
    if(day>0){
        return "仅剩 "+day+" 天";
    }
    
});

//bidding
template.helper('bidcountDown', function(endtime){
    var day=fomatdate(endtime);
    if(day>0){
        return "仅剩"+day+"天招标截止";
    }
    
});

//默认值
template.helper('defaultVal', function(str, def){
    if (str == ""){
        return def;
    }
    return str;
});
//radio/checkbox checked
template.helper('inputChecked', function(curVal, val) {
    if (val == curVal){
       return 'checked';
    }
    return '';
});
//设计师等级
template.helper('designerLevel', function(level){
    switch(parseInt(level)){
        case 1:
            return '体验设计师';
        break;
        case 2:
            return '认证设计师';
        break;
        case 3:
            return '签约设计师';
        break;
        default:
            return '设计师';
        break;
    };
    return '设计师';
});
//金额格式化
//split 分隔符，比如','
template.helper('formatCurrency', function(money, split){
    split = split || '';
    var num = money.toString().replace(/\$|\,/g,'');
    if(isNaN(num)) {
        num = "0";  
    }
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+split+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents); 
});
//取字典的对象
template.helper('dictObj', function(dict, key){
    return dict[key];
});
function fomatdate(endtime){
    var dateDown = new Date((endtime || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
        diffDown = ((dateDown.getTime() - (new Date()).getTime()) / 1000),
        day_Down = Math.floor(diffDown / 86400);
        if (isNaN(day_Down) || day_Down <=0){
            return day_Down=0;
        }
        return day_Down;
}


