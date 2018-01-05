/**
 * 固定某个元素在浏览器顶部(也可以自定义距离浏览器顶部多高的位置)，不随滚动条的下拉而移动
 *  **/

; (function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["jquery"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    $.fn.extend({
        'affix': function (opt) {
            var DEFAULT = {
                'offLeft': '0',
                'offT': '0'
            };
            var options = $.extend({}, DEFAULT, opt);
            this.each(function () {
                var obj = $(this);
                var offTop = obj.offset().top;
                $(window).bind('scroll', checkTop);
                function checkTop() {
                    var scrollT = $(window).scrollTop();
                    if (scrollT >= offTop) {
                        obj.css({ 'position': 'fixed', 'left': '0', 'top': options.offT });
                    } else {
                        obj.css({ 'position': 'static' });
                    }
                }
            });

        }
    });
}));
