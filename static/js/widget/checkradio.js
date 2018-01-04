window.g_config = window.g_config || {};

require.config({
    baseUrl: window.g_config.staticHost != undefined ? window.g_config.staticHost : '/static/js/',

    paths: {
        jquery: 'lib/jquery',
        iCheck:'lib/icheck'
    },
    shim: {

    }
});

require([
    'jquery',
    'common/base',
    'iCheck'
], function ($, base) {
    $(function ($) {
        $(".widget-left").append(base.tpls("common/menu_left")).find("li").eq(5).addClass("widget-active");;
        base.com.tab.init("J-Normal");
        $(".widget-content-info").iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%'
        });
    });
});
