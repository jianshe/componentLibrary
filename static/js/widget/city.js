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
    'common/base',
    'common/city'
], function ($, base,city) {
    $(function ($) {
        $(".widget-left").append(base.tpls("common/menu_left")).find("li").eq(4).addClass("widget-active");;
        base.com.tab.init("J-Normal");
        $("#city").click(function() {
            city.init($(this), function(city) {
                $("#city").attr("data-cityid", city.id).html(city.name);
            });
        });
    });
});