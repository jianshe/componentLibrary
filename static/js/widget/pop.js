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
        base.com.tab.init("tab-boder");
        $(".widget-left").append(base.tpls("common/menu_left")).find("li").eq(1).addClass("widget-active");;
        //弹出窗口
        $(".J-Pop").click(function () {
            var data = {
                title: "弹出窗口",
                content: "弹出窗口",
                style: {
                    width: "300px",
                    height: "200px",
                    marginLeft: "-150px",
                    marginTop: "-100px"
                }
            };
            $("body").append(base.tpls("common/popup/dialog", data));
            $(".pop-close").click(function () {
                $(".screen-bg").remove();
                $(".pop").remove();
            });
        });
        //确认窗口
        $(".J-Confirm").click(function () {
            base.ui.confirm("确认信息", "确认删除信息", "300", "200");
        });
        //浮动窗口
        $(".J-Float").click(function () {
            var _this = $(this),
                left = _this.offset().left + "px",
                top = _this.offset().top + _this.width() + "px";
            var data = {
                istriangle: true,
                direction: true,
                classname: "float-window",
                left: left,
                top: top,
                content: "<div class=''>浮动窗口<br>test</div>"
            };
            $("body").append(base.tpls("common/popup/float_window", data));
        });
        //信息窗口
        $(".J-Message").click(function () {
            base.ui.alert("success", "测试");
        });
    });
});