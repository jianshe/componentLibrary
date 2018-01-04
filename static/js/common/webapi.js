/*
 * Web Api 集合
 *
 */

define([
    'jquery',
    'verifycode/utils/api'
], function ($,
    verifycodeApi
) {
        return {
            verifycode: verifycodeApi
        }
    });