/*
 * 扩展validate,添加自定义验证规则
 *
 */

define([
    'jquery',
    'lib/jquery.validate',
    'common/utils',
    'common/services'
], function($, validate, utils, services) {
    //用户名使用邮箱或者手机
    jQuery.validator.addMethod('userName', function(value, element) {
        return this.optional(element) || utils.reMobileEmail.test(value);
    }, '请填写正确的邮箱或手机号');

    jQuery.validator.addMethod('imobile', function(value, element){
        return this.optional(element) || utils.reMobile.test(value);
    }, '请填写正确的手机号');

    jQuery.validator.addMethod('iemail', function(value, element){
        return this.optional(element) || utils.reEmail.test(value);
    }, '请填写正确的邮箱');

     //密码
    jQuery.validator.addMethod('passWord', function(value, element){
        return this.optional(element) || /^.{6,20}$/.test(value);
    }, '密码为6-20个字符');

    //验证码
    jQuery.validator.addMethod('authCode', function(value, element) {
        return this.optional(element) || /^\d{6}$/.test(value);
    }, '请填写六位数字验证码');

    //中文名
    jQuery.validator.addMethod('realName', function(value, element){
        return this.optional(element) || /^[\u4E00-\u9FA5]{2,4}$/.test(value);
    }, '请输入中文真实姓名');

    //不允许5位及以上数字
    jQuery.validator.addMethod('authNumber', function(value, element){
        return this.optional(element) || !(/[0-9]{5}/.test(value));
    }, '不允许输入带有5位及以上的数字'),

    //验证邮箱或手机是否存在
    jQuery.validator.addMethod('userSame', function(value, element) {
        var flag = 1;
        services.get('/account/check_username/', {
            field: 'user',
            username: value
        }, function(code, msg, data) {
            if (code === services.CODE_SUCC) {
                flag = data.exists;
            }
        }, null, false);
        if (flag === 0) {
            return true;
        } else {
            return false;
        }
    }, '该账号已被注册，<a href="javascript:;">直接登录?</a>');

    //验证用户名是否存在
    jQuery.validator.addMethod('usernameSame', function(value, element) {
        var flag = 1;
        services.post('/account/check_username/', {
            field: 'username',
            value: value
        }, function(code, msg, data) {
            if (code === services.CODE_SUCC) {
                flag = 0;
            }
        }, null, false);
        if (flag === 0)
            return true;
        else
            return false;
    }, '用户名已存在');

});