window.g_config = window.g_config || {};

require.config({
    baseUrl: window.g_config.staticHost != undefined ? window.g_config.staticHost : '/static/js/',

    paths: {
        jquery: 'lib/jquery',
        datepicker: 'lib/glDatePicker'
    },
    shim: {

    }
});

require([
    'jquery',
    'common/base',
    'datepicker'
], function ($, base) {
    $(function ($) {
        var dateyear, datemonth, dateday, datetime;

        $(".widget-left").append(base.tpls("common/menu_left")).find("li").eq(3).addClass("widget-active");;
        base.com.tab.init("J-Normal");

        datetime = new Date();
        dateyear = datetime.getFullYear();
        datemonth = datetime.getMonth();
        dateday = datetime.getDate();
        $("#start_time").glDatePicker({
            cssName: 'flatwhite',
            pickerWidth: 250,
            selectedDate: new Date(dateyear, datemonth, dateday),
            onClick: function (target, cell, datetime, data) {
                target.val(datetime.getFullYear() + '-' +
                    (datetime.getMonth() + 1) + '-' +
                    datetime.getDate());
            }
        });
        $("#end_time").glDatePicker({
            cssName: 'flatwhite',
            pickerWidth: 250,
            // selectableDateRange: [
            //     { from: new Date(1985,6,1),
            //         to: new Date(2100,1,1) }
            // ],
            selectedDate: new Date(dateyear, datemonth, dateday),
            onClick: function (target, cell, datetime, data) {
                target.val(datetime.getFullYear() + '-' +
                    (datetime.getMonth() + 1) + '-' +
                    datetime.getDate());
                var end_date = datetime.getFullYear() + '-' +
                    (datetime.getMonth() + 1) + '-' +
                    datetime.getDate();
                var star_end = $("#start_time").val();
                star_end = new Date((star_end || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
                var dateDown = new Date((end_date || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
                    diffDown = ((dateDown.getTime() - star_end.getTime()) / 1000),
                    day_Down = Math.floor(diffDown / 86400);
                if (isNaN(day_Down) || day_Down <= 0) {
                    alert("结束时间不能小于开始时间");
                    return;
                }
            }
        });
    });
});