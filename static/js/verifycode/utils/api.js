/**
 * 验证码api接口
 *
 */
define([
    'jquery',
    'common/services'
], function($, services) {

    var _MOBILE_CREATE_API = '/verifycode/mobile/create/';

    return {
        mobileCreate: function(parameters, callback) {
            services.post(_MOBILE_CREATE_API, parameters, function(code, msg, data) {
                if (callback) {
                    callback(code, msg, data);
                }
            });
        }
    };

});