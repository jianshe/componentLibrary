window.g_config = window.g_config || {};

require.config({
    baseUrl: window.g_config.staticHost != undefined ? window.g_config.staticHost : '/static/js/',

    paths: {
        jquery: 'lib/jquery'
    },
    shim: {

    }
});

require([
    'jquery',
    'common/base'
], function ($, base) {
    $(function ($) {
        var uid = '2037269',
            api = 'http://www.jiathis.com/send/';
        $(".widget-left").append(base.tpls("common/menu_left")).find("li").eq(8).addClass("widget-active");;
        base.com.tab.init("J-Normal");
        $('.js-share').click(function (event) {//防止冒泡
            // event.preventDefault();
            event.stopPropagation();
            var webid = $(this).data('webid'),
                url,
                title = $(this).data('title') || document.title;
            if ($(this).data('url')) {
                url = $(this).data('url');
            } else {
                url = location.href;
            }
            window.open(api + '?webid=' + webid + '&url=' + url + '&title=' + title + '&uid=' + uid);
        });
    });
});