/*
 *  基本配置
 */

define([
        'require',
        'jquery',
        'lib/jbase64',
        'common/services',
        'common/utils',
        'common/ui',
        'common/template',
        'common/validate.expand',
        'common/webapi',
        'common/tab',
        'common/paginator'
    ],
    function(
        require,
        $,
        base64,
        services,
        utils,
        ui,
        template,
        validateExpand, 
        webapi,
        tabCom,
        paginatorCom) {
        return {
            debug: location.host.indexOf('.component.com') !== -1 ? false : true,
            //模型引擎
            tpls: template,

            //当前域名
            domain: location.protocol + "//" + location.host,

            /*
             *后台接口服务
             *
             * property: CODE_xxx
             * function: post, get
             */
            services: services,

            webapi: webapi,

            /*
             *通用方法
             */
            utils: utils,

            /*
             *UI组件
             */
            ui: ui,
            /*
             *组件
             */
            com: {
                tab: tabCom,
                paginator: paginatorCom
            }
        };
    }
);