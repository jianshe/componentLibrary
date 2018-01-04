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
        $(".widget-left").append(base.tpls("common/menu_left")).find("li").eq(6).addClass("widget-active");;
        base.com.tab.init("J-Normal");
        //校验
       var validator = $("#post_form").validate({
           ignore: "",
           rules: {
               username: {
                   required: true,
                   rangelength: [4, 30]
               },
               realname: {
                   required: true,
                   realName: true
               },
               pwd: "required",
               email: {
                   required: true,
                   iemail: true
               },
               tel: {
                   required: true,
                   imobile: true
               },
               verifycode: {
                   required: true,
                   authCode: true
               }
           },
           messages: {
               username: {
                   required: "请填写用户名",
                   rangelength: "标题长度应在5-30个字符之间"
               },
               realname: {
                   required: "请填写真实姓名",
                   realname: "请输入中文真实姓名"
               },
               pwd: "密码不能为空",
               email: {
                   required: "请填写邮箱",
                   iemail: "请输入正确格式的电子邮件"
               },
               tel: {
                   required: "请填写手机号码",
                   imobile: "请填写正确的手机号码"
               },
               verifycode: {
                   required: "请输入验证码",
                   authCode: "请填写六位数字验证码"
               }
           },
           errorPlacement: function(error, element) {
               error.appendTo(element.closest(".form-list dd"));
           },
           submitHandler: function() {
              
           }
       });

       //保存
       $(".J-Save").click(function() {
           if (base.debug === false && base.account.isLogin() === false) {
               base.account.login();
               return;
           }
           if ($(this).hasClass('btn-disabled')) {
               return;
           }
           $('#post_form').submit();
       });

       //验证码
       $("#verify_code").click(function(){
           var _this = $(this),
               mobile = base.utils.strTrim($("#tel").val());
           if(mobile == ""){
               base.ui.alert("error", "手机号码不能为空");
               return;
           }
           base.account.verifycode(_this, mobile);
       });

    });
});