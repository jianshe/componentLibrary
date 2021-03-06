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
        $(".widget-left").append(base.tpls("common/menu_left")).find("li").eq(2).addClass("widget-active");;
        base.com.tab.init("J-Normal");
        base.com.tab.init("J-Tab-1");
        base.com.tab.init("J-Tab-2");
    });
});