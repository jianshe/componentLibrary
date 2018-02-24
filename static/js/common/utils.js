/*
 *  通用工具
 */

define(['jquery'], function ($) {

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    var _toQueryPair = function (key, value) {
        if (typeof value === 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    };

    return {
        //手机，邮箱验证正则式
        reMobileEmail: /^(1[34578]\d{9}|[a-zA-Z0-9_\.\-]+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4}))$/,
        //手机
        reMobile: /^(1[34578]\d{9})$/,
        //邮件
        reEmail: /^[a-zA-Z0-9_\.\-]+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})$/,
        /**
         * 字符串截取
         */
        subStr: function (str, length) {
            if (str.length > length) {
                return str.substr(0, parseInt(length)) + '...';
            }
            return str;
        },
        /*
         * 去掉前后空格
         */
        strTrim: function (s) {
            return s.replace(/(^\s+)|(\s+$)/g, "");
        },
        /*
         * 解析RUI参数
         * str: uri字符串
         */
        parseURIParams: function (str) {
            var params = {},
                e,
                a = /\+/g,
                r = /([^&=]+)=?([^&]*)/g,
                d = function (s) {
                    return decodeURIComponent(s.replace(a, " "));
                };

            while ((e = r.exec(str))) {
                params[d(e[1])] = d(e[2]);
            }
            return params;
        },

        /*
         * 对像转成URI
         */
        objToQuery: function (obj) {
            var ret = [];
            for (var key in obj) {
                key = encodeURIComponent(key);
                var values = obj[key];
                if (values && values.constructor === Array) {
                    var queryValues = [];
                    for (var i = 0, len = values.length, value; i < len; i++) {
                        value = values[i];
                        queryValues.push(_toQueryPair(key, value));
                    }
                    ret = ret.concat(queryValues);
                } else {
                    ret.push(_toQueryPair(key, values));
                }
            }
            return ret.join('&');
        },
        /*
         * 取当前路径的参数值
         * arg: 参数名
         */
        parseLocation: function (arg) {
            var uri = location.search;
            if (uri !== "") {
                var argsObj = this.parseURIParams(uri.substr(1));
                return argsObj[arg] || "";
            }
            return "";
        },
        /*
         * 中文链接编码 
         */
        b64EncodeUrl: function (string) {
            if (window.BASE64) {
                return BASE64.encoder(string.replace('风格', '')).replace('+', '-').replace('/', '_').replace('=', '');
            }
            return string;
        },
        /*
         * Timeago 相对时间美化  2011-05-06 12:30:22  ---> 三分钟之前
         */
        prettyDate: function (time) {
            var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
                diff = (((new Date()).getTime() - date.getTime()) / 1000),
                day_diff = Math.floor(diff / 86400);

            if (isNaN(day_diff) || day_diff < 0) {
                return;
            } else if (day_diff >= 31) {
                return time;
            }


            return day_diff === 0 && (
                    diff < 60 && "刚刚" ||
                    diff < 120 && "1分钟前" ||
                    diff < 3600 && Math.floor(diff / 60) + "分钟前" ||
                    diff < 7200 && "1个小时前" ||
                    diff < 86400 && Math.floor(diff / 3600) + "小时前") ||
                day_diff === 1 && "昨天" ||
                day_diff < 7 && day_diff + "天前" ||
                day_diff < 31 && Math.ceil(day_diff / 7) + "周前";
        },
        /**
         * 切换城市刷新URL
         */
        changeURLArg: function (url, arg, arg_val) {
            if (url.indexOf('#')) {
                url = url.split('#')[0];
            }
            var pattern = arg + '=([^&]*)';
            var replaceText = arg + '=' + arg_val;
            if (url.match(pattern)) {
                var tmp = '/(' + arg + '=)([^&]*)/gi';
                tmp = url.replace(eval(tmp), replaceText);
                return tmp;
            } else {
                if (url.match('[\?]')) {
                    return url + '&' + replaceText;
                } else {
                    return url + '?' + replaceText;
                }
            }
            return url + '\n' + arg + '\n' + arg_val;
        },
        /**
         * url跳转
         */
        locationUrl: function (url) {
            var w = window.open();
            return w.location = url;
        },
        /**
         * 计算总页数
         * total 记录总数
         * size 每页显示的记录个数
         */
        pageCount: function (total, size) {
            var count = Math.floor(total / size),
                vod = total % size;
            if (vod > 0) {
                count += 1;
            }
            return count;
        },
        /**
         * 金额格式化
         * money 数额
         * split 是否每3位添加一个分隔，通常是','，不分不要传
         */
        formatCurrency: function (money, split) {
            split = split || '';
            var num = money.toString().replace(/\$|\,/g, ''),
                sign;
            if (isNaN(num)) {
                num = "0";
            }
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + split +
                num.substring(num.length - (4 * i + 3));
            return (((sign) ? '' : '-') + num + '.' + cents);
        },
        /**
         * 链接中的Next参数
         */
        uriNext: function (def) {
            uriObj = this.parseURIParams(location.search.substr(1));
            return uriObj.next || (def || '');
        },

        //优化url，去掉url中不合法的token
        optimizeUrl: function (url) {
            var re = new RegExp("<[^>]*>", "gi");
            url = url.replace(re, "");
            return url;
        },

        //判断是否邮件
        isEmail: function (str) {
            return this.reEmail.test(str);
        },

        /*
         * 检查发布内容是否包含链接
         */
        checkContentUrl: function (content) {
            var matchStr = "component";
            var flag = false;
            var indexResult;
            var re_http = new RegExp("(http[s]{0,1}|ftp)?(:)?(//)?[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?", "gi");
            var pic_re = new RegExp(".+\.(png|PNG|jpg|JPG|bmp|gif|GIF)$");
            if (content.match(re_http) === null) {
                return true;
            } else {
                var result_http = content.match(re_http) === null ? '' : content.match(re_http).toString();
                var resultArray_http = [];
                resultArray_http = result_http.split(",");
                //http验证
                if (resultArray_http !== '') {
                    for (var i = 0; i < resultArray_http.length; i++) {
                        resultArray_http[i] = this.optimizeUrl(resultArray_http[i]);
                        if (!pic_re.test(resultArray_http[i])) {
                            if (!this.isEmail(resultArray_http[i])) {
                                indexResult = resultArray_http[i].indexOf(matchStr) >= 0 ? true : false;
                                if (!indexResult) {
                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (flag) {
                    return false;
                }
                return true;
            }
        },

        //首字母大写
        ucFirst: function (word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        },
        //数组乱序
        aryex: function (ary) {
            if (!ary || !ary.length) return ary;
            ary.sort(function () {
                return Math.random - 0.05;
            })
            return ary;
        },
        //格式化时间 eg:formatDate("2018-03-12 09:00:30:20", 'yyyy-MM-dd hh:mm:ss:S')
        formatDate: function (param, fmt) {
            let date = new Date(param);
            let o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        //向左跑马灯
        scrollLeft: function ($obj) {
            var $child = $obj.children().clone();
            $obj.append($child);
            var initLeft = 0;
            var timer = null;
            clearInterval(timer);
            timer = setInterval(function () {
                initLeft = $obj.scrollLeft();
                initLeft++;
                if (initLeft >= $child.width()) {
                    initLeft -= $child.width();
                }
                $obj.scrollLeft(initLeft);
            }, 30);
        },
        //向上跑马灯
        scrollTop: function ($obj) {
            var $child = $obj.children().clone();
            $obj.append($child);
            var initTop = 0;
            var timer = null;
            clearInterval(timer);
            timer = setInterval(function () {
                initTop = $obj.scrollTop();
                initTop++;
                if (initTop >= $child.height()) {
                    initTop -= $child.height();
                }
                $obj.scrollTop(initTop);
            }, 30);
        },
        // 获取url参数
        getQuerySearchString: function (key) {
            let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            let result = window.location.search.substr(1).match(reg);
            return result ? decodeURIComponent(result[2]) : null;
        },
        //set cookie
        setCookie: function (cookiename, cookievalue, hours) {
            let date = new Date();
            date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
            document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
        },
        //get cookie
        getCookie: function (name) {
            let mn = name + "=";
            let b, e;
            let co = document.cookie;
            if (mn == "=") {
                return co;
            }
            b = co.indexOf(mn);
            if (b < 0) {
                return "";
            }
            e = co.indexOf(";", b + name.length);
            if (e < 0) {
                return co.substring(b + name.length + 1);
            } else {
                return co.substring(b + name.length + 1, e);
            }
        }
    };
});