/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function(e){"use strict";function t(t){var n,r=t.attr("data-target")||(n=t.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"");return e(r)}function n(t){return this.each(function(){var n=e(this),i=n.data("bs.collapse"),s=e.extend({},r.DEFAULTS,n.data(),typeof t=="object"&&t);!i&&s.toggle&&/show|hide/.test(t)&&(s.toggle=!1),i||n.data("bs.collapse",i=new r(this,s)),typeof t=="string"&&i[t]()})}var r=function(t,n){this.$element=e(t),this.options=e.extend({},r.DEFAULTS,n),this.$trigger=e('[data-toggle="collapse"][href="#'+t.id+'"],'+'[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};r.VERSION="3.3.4",r.TRANSITION_DURATION=350,r.DEFAULTS={toggle:!0},r.prototype.dimension=function(){var e=this.$element.hasClass("width");return e?"width":"height"},r.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in"))return;var t,i=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(i&&i.length){t=i.data("bs.collapse");if(t&&t.transitioning)return}var s=e.Event("show.bs.collapse");this.$element.trigger(s);if(s.isDefaultPrevented())return;i&&i.length&&(n.call(i,"hide"),t||i.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var u=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)return u.call(this);var a=e.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",e.proxy(u,this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][a])},r.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in"))return;var t=e.Event("hide.bs.collapse");this.$element.trigger(t);if(t.isDefaultPrevented())return;var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!e.support.transition)return i.call(this);this.$element[n](0).one("bsTransitionEnd",e.proxy(i,this)).emulateTransitionEnd(r.TRANSITION_DURATION)},r.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},r.prototype.getParent=function(){return e(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(e.proxy(function(n,r){var i=e(r);this.addAriaAndCollapsedClass(t(i),i)},this)).end()},r.prototype.addAriaAndCollapsedClass=function(e,t){var n=e.hasClass("in");e.attr("aria-expanded",n),t.toggleClass("collapsed",!n).attr("aria-expanded",n)};var i=e.fn.collapse;e.fn.collapse=n,e.fn.collapse.Constructor=r,e.fn.collapse.noConflict=function(){return e.fn.collapse=i,this},e(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(r){var i=e(this);i.attr("data-target")||r.preventDefault();var s=t(i),o=s.data("bs.collapse"),u=o?"toggle":i.data();n.call(s,u)})}(jQuery);