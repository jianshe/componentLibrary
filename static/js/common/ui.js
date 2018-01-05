/*
 * UI通用模块
 *
 */

define([
    'jquery',
    'lib/bowser',
    'lib/jquery.lazyload',
    'common/template'
], function($, bowser, lazyload, template) {

    // 文本输入框的place holder 效果
    var _placeholderHandle = function() {
        if ('placeholder' in document.createElement('input')) { //如果浏览器原生支持placeholder
            return;
        }

        function target(e) {
            var ee = ee || window.event;
            return ee.target || ee.srcElement;
        }

        function _getEmptyHintEl(el) {
            var hintEl = el.hintEl;
            return hintEl && g(hintEl);
        }

        function blurFn(e) {
            var el = target(e);
            if (!el || el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                return; //IE下，onfocusin会在div等元素触发
            }
            var emptyHintEl = el.__emptyHintEl;
            if (emptyHintEl) {
                //clearTimeout(el.__placeholderTimer||0);
                //el.__placeholderTimer=setTimeout(function(){//在360浏览器下，autocomplete会先blur再change
                if (el.value) {
                    emptyHintEl.style.display = 'none';
                } else {
                    emptyHintEl.style.display = '';
                }
                //},600);
            }
        }

        function focusFn(e) {
            var el = target(e);
            if (!el || el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                return; //IE下，onfocusin会在div等元素触发
            }
            var emptyHintEl = el.__emptyHintEl;
            if (emptyHintEl) {
                //clearTimeout(el.__placeholderTimer||0);
                emptyHintEl.style.display = 'none';
            }
        }
        if (document.addEventListener) { //ie
            document.addEventListener('focus', focusFn, true);
            document.addEventListener('blur', blurFn, true);
        } else {
            document.attachEvent('onfocusin', focusFn);
            document.attachEvent('onfocusout', blurFn);
        }

        var elss = [document.getElementsByTagName('input'), document.getElementsByTagName('textarea')];
        for (var n = 0; n < 2; n++) {
            var els = elss[n];
            for (var i = 0; i < els.length; i++) {
                var el = els[i];
                var placeholder = el.getAttribute('placeholder'),
                    emptyHintEl = el.__emptyHintEl;
                if (placeholder && !emptyHintEl) {
                    emptyHintEl = document.createElement('strong');
                    emptyHintEl.innerHTML = placeholder;
                    emptyHintEl.className = 'placeholder';
                    emptyHintEl.onclick = function(el) {
                        return function() {
                            try {
                                el.focus();
                            } catch (ex) {}
                        };
                    }(el);
                    if (el.value) {
                        emptyHintEl.style.display = 'none';
                    }
                    el.parentNode.insertBefore(emptyHintEl, el);
                    el.__emptyHintEl = emptyHintEl;
                }
            }
        }
    };

    // 返回顶部
    var _retunrTop = function() {
        var left = "",
            right = "";
        if ($(".container").length > 0) {
            left = $(".container").offset().left + $(".container").width() + 20 + "px";
        } else {
            right = "50px";
        }
        if (window.g_config === undefined || window.g_config.disableBackTop === undefined || window.g_config.disableBackTop) {
            if ($(document).scrollTop() <= 100) {
                $(".js-return-top").remove();
            } else {
                $(".js-return-top").remove();
                $("body").append('<div class="share-top js-return-top" style="bottom:120px;cursor:pointer;position:fixed;left:' + left + ';right:' + right + ';"></div>');
            }
        }
        $(document).delegate(".js-return-top", "click", function() {
            $(document).scrollTop(0);
        });
    };

    // 
    $(function($) {
        
        /**
         * 对ie进行监测
         */
        var ieSize;
        var bowser = navigator.appName;
        var b_version = navigator.appVersion;
        // var version=b_version.split(";"); 
        // var trim_Version=version[1].replace(/[ ]/g,""); 
        if (bowser === "Microsoft Internet Explorer" && b_version.indexOf("MSIE 6.0") > -1) {
            ieSize = 6;
        } else if (bowser === "Microsoft Internet Explorer" && b_version.indexOf("MSIE 7.0") > -1) {
            ieSize = 7;
        }
        if (ieSize < 8) {
            $("body").append($("<div>", {
                    "class": "screen-bg"
                }))
                .append($("<div>", {
                        "class": "pop",
                        "style": "height: ; width: 600px; margin-top: -120px; margin-left: -300px; height:240px"
                    })
                    .append($("<span>", {
                        "class": "ie7-close"
                    }).append("X").click(function() {
                        $(".screen-bg").remove();
                        $(".pop").remove();
                    }))
                    .append($("<div>", {
                            "class": "designer-list"
                        })
                        .append($("<div>", {
                                "class": "designer-list-none"
                            })
                            .append($("<a>", {
                                "class": "btn btn-large btn-success",
                                "target": "_blank",
                                "href": "http://windows.microsoft.com/zh-cn/internet-explorer/download-ie"
                            }).append("升级ie"))
                            .append("<br>您的浏览器版本过于陈旧，请点击升级ie。")
                        )
                    )
                );
            return;
        }

        /**
         * header scroll
         */
        _placeholderHandle();

        // 隐藏弹出层
        $(document).mouseup(function(e) {
            var _target = $('.float-window,.header-search,.share-meitu-pop'); // 设置目标区域
            if (!_target.is(e.target) && _target.has(e.target).length === 0) { // Mark 1
                $(".float-window").remove();
                $(".js-search-type").css("display", "none");
                $(".js-type-list").hide();
                $(".js-search").animate({
                    paddingLeft: "10px",
                    width: "200px"
                });
                $(".header-search").find(".placeholder").removeAttr("style");
                $(".share-meitu-pop").hide();
            }
        });


        $(".navbar-nav li").on('mouseenter', function() {
            $(this).find(".subnav").css("display", "block");
            if ($(this).find(".subnav").length > 0) {
                $(this).css("border", "0");
            }
        }).on('mouseleave', function() {
            $(this).find(".subnav").css("display", "none");
            $(this).removeAttr("style");
        });


        //友链
        $(".link-fold").click(function(event) {
            event.preventDefault();
            if ($(this).find("i").attr("class") === "share-show") {
                $(this).parent().addClass("link-unfold");
                $(this).find("i").attr("class", "share-show-down");
            } else {
                $(this).parent().removeClass("link-unfold");
                $(this).find("i").attr("class", "share-show");
            }
        });

        //搜索
        $(".J-Search").focus(function() {
            $(this).animate({
                paddingLeft: "85px",
                width: "200px"
            });
            $(".placeholder").css("paddingLeft", "90px");
            $(".J-Search-Type").css("display", "inline-block");
        });
        $(".J-Type-List").find("li").each(function() {
            $(this).click(function() {
                $(".J-Search-Type").find("span").html($(this).html()).attr("data-href", $(this).data("href"));
                $(".J-Search").attr("placeholder", $(this).data("placeholder"));
                $(".placeholder").html($(this).data("placeholder"));
                $(".J-Type-List").hide();
            });
        });
        $(".J-Search-Type").on("mouseenter", function() {
            $(".J-Type-List").show();
        });

        //返回顶部
        _retunrTop();
        $(window).scroll(function() {
            _retunrTop();
        });

        $(window).resize(function() {
            _retunrTop();
        });


        // 百度统计
        if (window.baiduRequired && window.baiduSrc) {
            var _hmt = _hmt || [];
            var hm = document.createElement("script");
            hm.src = window.baiduSrc;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        }

        // tip统一控制，鼠标移入显示并延迟操作
        var delayTime;
        $(".J-Pop-Parent, .J-Pop-Child").mousemove(function() {
            $(".J-Pop-Child").show();
            clearTimeout(delayTime);
        });
        $(".J-Pop-Child").mouseleave(function() {
            $(this).hide();
        });
        $(".J-Pop-Parent").mouseleave(function(e) {
            var _target = $('.J-Pop-Parent,.J-Pop-Child'); // 设置目标区域
            //if (!_target.is(e.target) && _target.has(e.target).length === 0) { // Mark 1
            delayTime = setTimeout(function() {
                if (_target.has(e.target).length === 0) { // Mark 1
                    $(".J-Pop-Child").hide();
                }
            }, 200);
        });

    });

    return {
        /*
         * 警告框
         *
         * status   状态 success|info|error|waring
         * msg      信息
         */
        alert: function(status, msg) {
            var messageDom = $('#message'),
                top = 0;
            className = 'message-success';
            switch (status) {
                case 'info':
                    className = 'message-info';
                    break;
                case 'waring':
                    className = 'message-waring';
                    break;
                case 'error':
                    className = 'message-error';
                    break;
                default:
                    className = 'message-success';
                    break;
            }
            if (messageDom.length === 0) {
                var data = {
                    classname: className,
                    message: msg,
                    top: top
                };
                $('body').append(template("common/popup/message", data));
                $(".message-close").click(function() {
                    $(this).parent().remove();
                });

                // setTimeout(function() {
                //     messageDom = $('#message');
                //     messageDom.removeClass("message").addClass("message-out");
                //     setTimeout(function() {
                //         messageDom.remove();
                //     }, 200);
                // }, 3000);
            } else {
                messageDom.css('top', top);
                messageDom.attr('class', 'message ' + className);
                $('#message .message-content').text(msg);
            }
        },
        /*
         * 确认框
         *
         * title 标题
         * content 内容
         * confirmCallback　确认后回调方法
         * cancelCallback 取消后回调方法
         */
        confirm: function(title, content, width, height, confirmCallback, cancelCallback, arg) {
            var data = {
                title: title,
                content: content,
                width: (width ? width : '400') + 'px',
                height: (height ? height : '220') + 'px',
                marginTop: parseInt(-(height ? height : 220) / 2) + 'px',
                marginLeft: parseInt(-(width ? width : 400) / 2) + 'px'
            };
            $("body").append(template("common/popup/confirm", data));
            $(".pop-close, .pop .btn").click(function() {
                var op = $(this).data('op');
                if (op === 'confirm' && confirmCallback) {
                    confirmCallback(arg);
                } else if (op === 'cancel' && cancelCallback) {
                    cancelCallback();
                }
                $(".screen-bg").remove();
                $(".pop").remove();
            });
        },
        /*
         * 处理文本输入框的placeholder
         */
        placeholder: function() {
            _placeholderHandle();
        },

        /**
         * 懒加载
         */
        lazy: function() {
            $("img.lazy").lazyload({
                effect: "fadeIn",
                placeholder: "/static/images/new/common/placeholder.jpg",
                data_attribute: "lazyload",
                failure_limit: 10
            });
        },

        /*
         * 表单提交结果
         * title 如：恭喜，您已成功上传画册！
         * content 如：去其他地方逛逛吧~~
         * btnList 如：［{title:'查看更多', url:'/photo/list/'},{title:'回到主页', url:'/'}]
         * skip 如：{title:'相册列表', url:'/photo/list'}
         */
        submitResult: function(title, content, btnList, skip) {
            $("#submit_result").empty();
            var data = {
                title: title,
                content: content,
                btnList: btnList,
                skip: skip
            };
            $("#submit_result").append(template("common/submit_result", data));
            var sec = 5;
            var secTimer = null;
            $("#count-down").text(sec);
            $(window).scrollTop(0);
            secTimer = setInterval(function() {
                sec--;
                $("#count-down").text(sec);
                if (sec === 0) {
                    clearInterval(secTimer);
                    if (skip) {
                        location.href = skip.url;
                    }
                }
            }, 1000);
        }
    };
});