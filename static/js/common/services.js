/*
 * 后台服务接口调用模块
 *
 */

define([
    'jquery',
    'common/ui'
], function($, ui) {

    // 正在请求的接口
    var requesting = '';

    // 统一隐藏Loading
    var _hideLoading = function() {
    };

    // 统一显示loading
    var _showLoading = function() {
    };

    // response 处理
    var _rspHandle = function(rsp, callback, arg) {
        if (rsp.code) {
            if (callback) {
                callback(rsp.code, rsp.msg, rsp.data || {}, arg);
            }
        } else {
            ui.alert('error', '服务出现异常！');
        }
    };

    var _404 = function() {
        requesting = '';
        _hideLoading();
        ui.alert('error', '404：服务器没有响应！');
    };

    var _500 = function() {
        requesting = '';
        _hideLoading();
        ui.alert('error', '500：服务器出错！');
    };

    var _504 = function() {
        requesting = '';
        _hideLoading();
        ui.alert('error', '504：服务器超时！');
    };

    var _302 = function() {
        requesting = '';
        _hideLoading();
        ui.alert('error', '302：接口发生了跳转！');
    };

    var _requestAlert = function() {
        ui.alert('waring', '正在处理上一个请求！');
    };

    return {
        // 是否debug模式
        DEBUG: location.host.indexOf('.component.com') !== -1 ? false : true,

        HOST: 'http://www.component.com',

        //服务器返回码对应信息
        CODE_SUCC: '10000', //成功
        CODE_ERROR: '10001', //失败
        CODE_PARAM_ERR: '10002', //参数错误
        CODE_NOT_EXIST_ERR: '10003', //记录不存在
        CODE_PERM_ERR: '10004', //权限错误
        CODE_EXIST_ERR: '10006', //记录已存在
        CODE_VERIFI_ERROR: "10012", //验证码错误
        CODE_NOT_LOGIN: "11004", //未登录

        /*
         * HTTP POST 请求
         *
         * api      接口url
         * data     数据
         * callback 回调方法
         */
        post: function(api, data, callback, arg, async) {
            var reqSlug = api;
            if (requesting === reqSlug) {
                _requestAlert();
                return;
            }

            var url = api;
            window.g_config = window.g_config || {};
            if (window.g_config.serviceHost != undefined) {
                url = window.g_config.serviceHost == location.host ? url : "http://" + window.g_config.serviceHost + url;
            }
            if (url !== '') {
                requesting = reqSlug;
                _showLoading();
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    async: async === undefined ? true : async,
                    data: data,
                    xhrFields: window.g_config.serviceHost == undefined || window.g_config.serviceHost == location.host ? "" : {
                        "withCredentials": true
                    },
                    success: function(rsp) {
                        requesting = '';
                        _hideLoading();
                        _rspHandle(rsp, callback, arg);
                    },
                    error: function() {
                        requesting = '';
                        _hideLoading();
                    },
                    statusCode: {
                        404: function() {
                            _404();
                        },
                        500: function() {
                            _500();
                        },
                        504: function() {
                            _504();
                        },
                        302: function() {
                            _302();
                        }
                    }
                });
            }

        },

        /*
         * HTTP GET 请求
         *
         * api      接口url
         * data     数据
         * callback 回调方法
         */
        get: function(api, data, callback, arg, async) {
            var reqSlug = api;
            if (requesting === reqSlug) {
                _requestAlert();
                return;
            }
            var url = api;
            window.g_config = window.g_config || {};
            if (window.g_config.serviceHost != undefined) {
                url = window.g_config.serviceHost == location.host ? url : "http://" + window.g_config.serviceHost + url;
            }
            if (url !== '') {
                requesting = reqSlug;
                _showLoading();
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'GET',
                    async: async === undefined ? true : async,
                    data: data,
                    // xhrFields: {
                    //     "withCredentials": true
                    // },
                    xhrFields: window.g_config.serviceHost == undefined || window.g_config.serviceHost == location.host ? "" : {
                        "withCredentials": true
                    },
                    success: function(rsp) {
                        requesting = '';
                        //$('.loading').remove();
                        _hideLoading();
                        _rspHandle(rsp, callback, arg);
                    },
                    error: function() {
                        requesting = '';
                        //$('.loading').remove();
                        _hideLoading();
                    },
                    statusCode: {
                        404: function() {
                            _404();
                        },
                        500: function() {
                            _500();
                        },
                        504: function() {
                            _504();
                        },
                        302: function() {
                            _302();
                        }
                    }
                });
            }
        }
    };
});