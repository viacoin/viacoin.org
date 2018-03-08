/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/viacoin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/alloyFinger/alloy_finger.js":
/***/ (function(module, exports, __webpack_require__) {

/* AlloyFinger v0.1.10
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyFinger
 */
; (function () {
    function getLen(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    function dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    function getAngle(v1, v2) {
        var mr = getLen(v1) * getLen(v2);
        if (mr === 0) return 0;
        var r = dot(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
    }

    function cross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    }

    function getRotateAngle(v1, v2) {
        var angle = getAngle(v1, v2);
        if (cross(v1, v2) > 0) {
            angle *= -1;
        }

        return angle * 180 / Math.PI;
    }

    var HandlerAdmin = function(el) {
        this.handlers = [];
        this.el = el;
    };

    HandlerAdmin.prototype.add = function(handler) {
        this.handlers.push(handler);
    }

    HandlerAdmin.prototype.del = function(handler) {
        if(!handler) this.handlers = [];

        for(var i=this.handlers.length; i>=0; i--) {
            if(this.handlers[i] === handler) {
                this.handlers.splice(i, 1);
            }
        }
    }

    HandlerAdmin.prototype.dispatch = function() {
        for(var i=0,len=this.handlers.length; i<len; i++) {
            var handler = this.handlers[i];
            if(typeof handler === 'function') handler.apply(this.el, arguments);
        }
    }

    function wrapFunc(el, handler) {
        var handlerAdmin = new HandlerAdmin(el);
        handlerAdmin.add(handler);

        return handlerAdmin;
    }

    var AlloyFinger = function (el, option) {

        this.element = typeof el == 'string' ? document.querySelector(el) : el;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.cancel = this.cancel.bind(this);
        this.element.addEventListener("touchstart", this.start, false);
        this.element.addEventListener("touchmove", this.move, false);
        this.element.addEventListener("touchend", this.end, false);
        this.element.addEventListener("touchcancel", this.cancel, false);

        this.preV = { x: null, y: null };
        this.pinchStartLen = null;
        this.zoom = 1;
        this.isDoubleTap = false;

        var noop = function () { };

        this.rotate = wrapFunc(this.element, option.rotate || noop);
        this.touchStart = wrapFunc(this.element, option.touchStart || noop);
        this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
        this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
        this.pinch = wrapFunc(this.element, option.pinch || noop);
        this.swipe = wrapFunc(this.element, option.swipe || noop);
        this.tap = wrapFunc(this.element, option.tap || noop);
        this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
        this.longTap = wrapFunc(this.element, option.longTap || noop);
        this.singleTap = wrapFunc(this.element, option.singleTap || noop);
        this.pressMove = wrapFunc(this.element, option.pressMove || noop);
        this.twoFingerPressMove = wrapFunc(this.element, option.twoFingerPressMove || noop);
        this.touchMove = wrapFunc(this.element, option.touchMove || noop);
        this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
        this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);

        this._cancelAllHandler = this.cancelAll.bind(this);
        window.removeEventListener('scroll', this._cancelAllHandler);

        window.addEventListener('scroll', this._cancelAllHandler);

        this.delta = null;
        this.last = null;
        this.now = null;
        this.tapTimeout = null;
        this.singleTapTimeout = null;
        this.longTapTimeout = null;
        this.swipeTimeout = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.preTapPosition = { x: null, y: null };
    };

    AlloyFinger.prototype = {
        start: function (evt) {
            if (!evt.touches) return;
            this.now = Date.now();
            this.x1 = evt.touches[0].pageX;
            this.y1 = evt.touches[0].pageY;
            this.delta = this.now - (this.last || this.now);
            this.touchStart.dispatch(evt, this.element);
            if (this.preTapPosition.x !== null) {
                this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
            }
            this.preTapPosition.x = this.x1;
            this.preTapPosition.y = this.y1;
            this.last = this.now;
            var preV = this.preV,
                len = evt.touches.length;
            if (len > 1) {
                this._cancelLongTap();
                this._cancelSingleTap();
                var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
                preV.x = v.x;
                preV.y = v.y;
                this.pinchStartLen = getLen(preV);
                this.multipointStart.dispatch(evt, this.element);
            }
            this._preventTap = false;
            this.longTapTimeout = setTimeout(function () {
                this.longTap.dispatch(evt, this.element);
                this._preventTap = true;
            }.bind(this), 750);
        },
        move: function (evt) {
            if (!evt.touches) return;
            var preV = this.preV,
                len = evt.touches.length,
                currentX = evt.touches[0].pageX,
                currentY = evt.touches[0].pageY;
            this.isDoubleTap = false;
            if (len > 1) {
                var sCurrentX = evt.touches[1].pageX,
                    sCurrentY = evt.touches[1].pageY
                var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

                if (preV.x !== null) {
                    if (this.pinchStartLen > 0) {
                        evt.zoom = getLen(v) / this.pinchStartLen;
                        this.pinch.dispatch(evt, this.element);
                    }

                    evt.angle = getRotateAngle(v, preV);
                    this.rotate.dispatch(evt, this.element);
                }
                preV.x = v.x;
                preV.y = v.y;

                if (this.x2 !== null && this.sx2 !== null) {
                    evt.deltaX = (currentX - this.x2 + sCurrentX - this.sx2) / 2;
                    evt.deltaY = (currentY - this.y2 + sCurrentY - this.sy2) / 2;
                } else {
                    evt.deltaX = 0;
                    evt.deltaY = 0;
                }
                this.twoFingerPressMove.dispatch(evt, this.element);

                this.sx2 = sCurrentX;
                this.sy2 = sCurrentY;
            } else {
                if (this.x2 !== null) {
                    evt.deltaX = currentX - this.x2;
                    evt.deltaY = currentY - this.y2;

                } else {
                    evt.deltaX = 0;
                    evt.deltaY = 0;
                }
                
                
                this.pressMove.dispatch(evt, this.element);
            }

            this.touchMove.dispatch(evt, this.element);

            this._cancelLongTap();
            this.x2 = currentX;
            this.y2 = currentY;
            
            if (len > 1) {
                evt.preventDefault();
            }
        },
        end: function (evt) {
            if (!evt.changedTouches) return;
            this._cancelLongTap();
            var self = this;
            if (evt.touches.length < 2) {
                this.multipointEnd.dispatch(evt, this.element);
                this.sx2 = this.sy2 = null;
            }

            //swipe
            if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
                (this.y2 && Math.abs(this.y1 - this.y2) > 30)) {
                evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
                this.swipeTimeout = setTimeout(function () {
                    self.swipe.dispatch(evt, self.element);

                }, 0)
            } else {
                this.tapTimeout = setTimeout(function () {
                    if(!self._preventTap){
                        self.tap.dispatch(evt, self.element);
                    }
                    // trigger double tap immediately
                    if (self.isDoubleTap) {
                        self.doubleTap.dispatch(evt, self.element);
                        clearTimeout(self.singleTapTimeout);
                        self.isDoubleTap = false;
                    }
                }, 0)

                if (!self.isDoubleTap) {
                    self.singleTapTimeout = setTimeout(function () {
                        self.singleTap.dispatch(evt, self.element);
                    }, 250);
                }
            }

            this.touchEnd.dispatch(evt, this.element);

            this.preV.x = 0;
            this.preV.y = 0;
            this.zoom = 1;
            this.pinchStartLen = null;
            this.x1 = this.x2 = this.y1 = this.y2 = null;
        },
        cancelAll: function () {
            this._preventTap = true
            clearTimeout(this.singleTapTimeout);
            clearTimeout(this.tapTimeout);
            clearTimeout(this.longTapTimeout);
            clearTimeout(this.swipeTimeout);
        },
        cancel: function (evt) {
            this.cancelAll()
            this.touchCancel.dispatch(evt, this.element);
        },
        _cancelLongTap: function () {
            clearTimeout(this.longTapTimeout);
        },
        _cancelSingleTap: function () {
            clearTimeout(this.singleTapTimeout);
        },
        _swipeDirection: function (x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        },

        on: function(evt, handler) {
            if(this[evt]) {
                this[evt].add(handler);
            }
        },

        off: function(evt, handler) {
            if(this[evt]) {
                this[evt].del(handler);
            }
        },

        destroy: function() {
            if(this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
            if(this.tapTimeout) clearTimeout(this.tapTimeout);
            if(this.longTapTimeout) clearTimeout(this.longTapTimeout);
            if(this.swipeTimeout) clearTimeout(this.swipeTimeout);

            this.element.removeEventListener("touchstart", this.start);
            this.element.removeEventListener("touchmove", this.move);
            this.element.removeEventListener("touchend", this.end);
            this.element.removeEventListener("touchcancel", this.cancel);

            this.rotate.del();
            this.touchStart.del();
            this.multipointStart.del();
            this.multipointEnd.del();
            this.pinch.del();
            this.swipe.del();
            this.tap.del();
            this.doubleTap.del();
            this.longTap.del();
            this.singleTap.del();
            this.pressMove.del();
            this.twoFingerPressMove.del()
            this.touchMove.del();
            this.touchEnd.del();
            this.touchCancel.del();

            this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null;

            return null;
        }
    };

    if (true) {
        module.exports = AlloyFinger;
    } else {
        window.AlloyFinger = AlloyFinger;
    }
})();


/***/ }),

/***/ "./node_modules/aos/dist/aos.js":
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(1),a=(o(r),n(6)),u=o(a),c=n(7),f=o(c),s=n(8),d=o(s),l=n(9),p=o(l),m=n(10),b=o(m),v=n(11),y=o(v),g=n(14),h=o(g),w=[],k=!1,x=document.all&&!window.atob,j={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded"},O=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(k=!0),k)return w=(0,y.default)(w,j),(0,b.default)(w,j.once),w},S=function(){w=(0,h.default)(),O()},_=function(){w.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},E=function(e){return e===!0||"mobile"===e&&p.default.mobile()||"phone"===e&&p.default.phone()||"tablet"===e&&p.default.tablet()||"function"==typeof e&&e()===!0},z=function(e){return j=i(j,e),w=(0,h.default)(),E(j.disable)||x?_():(document.querySelector("body").setAttribute("data-aos-easing",j.easing),document.querySelector("body").setAttribute("data-aos-duration",j.duration),document.querySelector("body").setAttribute("data-aos-delay",j.delay),"DOMContentLoaded"===j.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?O(!0):"load"===j.startEvent?window.addEventListener(j.startEvent,function(){O(!0)}):document.addEventListener(j.startEvent,function(){O(!0)}),window.addEventListener("resize",(0,f.default)(O,50,!0)),window.addEventListener("orientationchange",(0,f.default)(O,50,!0)),window.addEventListener("scroll",(0,u.default)(function(){(0,b.default)(w,j.once)},99)),document.addEventListener("DOMNodeRemoved",function(e){var t=e.target;t&&1===t.nodeType&&t.hasAttribute&&t.hasAttribute("data-aos")&&(0,f.default)(S,50,!0)}),(0,d.default)("[data-aos]",S),w)};e.exports={init:z,refresh:O,refreshHard:S}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function n(e,t,n){function o(t){var n=b,o=v;return b=v=void 0,k=t,g=e.apply(o,n)}function r(e){return k=e,h=setTimeout(s,t),S?o(e):g}function a(e){var n=e-w,o=e-k,i=t-n;return _?j(i,y-o):i}function c(e){var n=e-w,o=e-k;return void 0===w||n>=t||n<0||_&&o>=y}function s(){var e=O();return c(e)?d(e):void(h=setTimeout(s,a(e)))}function d(e){return h=void 0,E&&b?o(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),k=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(O())}function m(){var e=O(),n=c(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(_)return h=setTimeout(s,t),o(w)}return void 0===h&&(h=setTimeout(s,t)),g}var b,v,y,g,h,w,k=0,S=!1,_=!1,E=!0;if("function"!=typeof e)throw new TypeError(f);return t=u(t)||0,i(n)&&(S=!!n.leading,_="maxWait"in n,y=_?x(u(n.maxWait)||0,t):y,E="trailing"in n?!!n.trailing:E),m.cancel=l,m.flush=p,m}function o(e,t,o){var r=!0,a=!0;if("function"!=typeof e)throw new TypeError(f);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(e,t,{leading:r,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==("undefined"==typeof e?"undefined":c(e))}function a(e){return"symbol"==("undefined"==typeof e?"undefined":c(e))||r(e)&&k.call(e)==d}function u(e){if("number"==typeof e)return e;if(a(e))return s;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(l,"");var n=m.test(e);return n||b.test(e)?v(e.slice(2),n?2:8):p.test(e)?s:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f="Expected a function",s=NaN,d="[object Symbol]",l=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,b=/^0o[0-7]+$/i,v=parseInt,y="object"==("undefined"==typeof t?"undefined":c(t))&&t&&t.Object===Object&&t,g="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,h=y||g||Function("return this")(),w=Object.prototype,k=w.toString,x=Math.max,j=Math.min,O=function(){return h.Date.now()};e.exports=o}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function n(e,t,n){function i(t){var n=b,o=v;return b=v=void 0,O=t,g=e.apply(o,n)}function r(e){return O=e,h=setTimeout(s,t),S?i(e):g}function u(e){var n=e-w,o=e-O,i=t-n;return _?x(i,y-o):i}function f(e){var n=e-w,o=e-O;return void 0===w||n>=t||n<0||_&&o>=y}function s(){var e=j();return f(e)?d(e):void(h=setTimeout(s,u(e)))}function d(e){return h=void 0,E&&b?i(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),O=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(j())}function m(){var e=j(),n=f(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(_)return h=setTimeout(s,t),i(w)}return void 0===h&&(h=setTimeout(s,t)),g}var b,v,y,g,h,w,O=0,S=!1,_=!1,E=!0;if("function"!=typeof e)throw new TypeError(c);return t=a(t)||0,o(n)&&(S=!!n.leading,_="maxWait"in n,y=_?k(a(n.maxWait)||0,t):y,E="trailing"in n?!!n.trailing:E),m.cancel=l,m.flush=p,m}function o(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||i(e)&&w.call(e)==s}function a(e){if("number"==typeof e)return e;if(r(e))return f;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||m.test(e)?b(e.slice(2),n?2:8):l.test(e)?f:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c="Expected a function",f=NaN,s="[object Symbol]",d=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,b=parseInt,v="object"==("undefined"==typeof t?"undefined":u(t))&&t&&t.Object===Object&&t,y="object"==("undefined"==typeof self?"undefined":u(self))&&self&&self.Object===Object&&self,g=v||y||Function("return this")(),h=Object.prototype,w=h.toString,k=Math.max,x=Math.min,j=function(){return g.Date.now()};e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";function n(e,t){a.push({selector:e,fn:t}),!u&&r&&(u=new r(o),u.observe(i.documentElement,{childList:!0,subtree:!0,removedNodes:!0})),o()}function o(){for(var e,t,n=0,o=a.length;n<o;n++){e=a[n],t=i.querySelectorAll(e.selector);for(var r,u=0,c=t.length;u<c;u++)r=t[u],r.ready||(r.ready=!0,e.fn.call(r,r))}}Object.defineProperty(t,"__esModule",{value:!0});var i=window.document,r=window.MutationObserver||window.WebKitMutationObserver,a=[],u=void 0;t.default=n},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,f=function(){function e(){n(this,e)}return i(e,[{key:"phone",value:function(){var e=o();return!(!r.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=o();return!(!u.test(e)&&!c.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new f},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var o=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof o&&("false"===o||!n&&"true"!==o)&&e.node.classList.remove("aos-animate")},o=function(e,t){var o=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,r){n(e,i+o,t)})};t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),r=o(i),a=function(e,t){return e.forEach(function(e,n){e.node.classList.add("aos-init"),e.position=(0,r.default)(e.node,t.offset)}),e};t.default=a},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=o(i),a=function(e,t){var n=0,o=0,i=window.innerHeight,a={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(o=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(e=document.querySelectorAll(a.anchor)[0]),n=(0,r.default)(e).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=e.offsetHeight/2;break;case"bottom-bottom":n+=e.offsetHeight;break;case"top-center":n+=i/2;break;case"bottom-center":n+=i/2+e.offsetHeight;break;case"center-center":n+=i/2+e.offsetHeight/2;break;case"top-top":n+=i;break;case"bottom-top":n+=e.offsetHeight+i;break;case"center-top":n+=e.offsetHeight/2+i}return a.anchorPlacement||a.offset||isNaN(t)||(o=t),n+o};t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){e=e||document.querySelectorAll("[data-aos]");var t=[];return[].forEach.call(e,function(e,n){t.push({node:e})}),t};t.default=n}])});
//# sourceMappingURL=aos.js.map

/***/ }),

/***/ "./node_modules/particles.js/particles.js":
/***/ (function(module, exports) {

/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 100,
          line_linked:{
            opacity: 1
          }
        },
        bubble:{
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse:{
          distance: 200,
          duration: 0.4
        },
        push:{
          particles_nb: 4
        },
        remove:{
          particles_nb: 2
        }
      },
      mouse:{}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors:{}
    },
    tmp: {}
  };

  var pJS = this.pJS;

  /* params settings */
  if(params){
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
  };


  pJS.fn.retinaInit = function(){

    if(pJS.retina_detect && window.devicePixelRatio > 1){
      pJS.canvas.pxratio = window.devicePixelRatio; 
      pJS.tmp.retina = true;
    } 
    else{
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;

  };



  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function(){
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function(){

    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if(pJS && pJS.interactivity.events.resize){

      window.addEventListener('resize', function(){

          pJS.canvas.w = pJS.canvas.el.offsetWidth;
          pJS.canvas.h = pJS.canvas.el.offsetHeight;

          /* resize canvas */
          if(pJS.tmp.retina){
            pJS.canvas.w *= pJS.canvas.pxratio;
            pJS.canvas.h *= pJS.canvas.pxratio;
          }

          pJS.canvas.el.width = pJS.canvas.w;
          pJS.canvas.el.height = pJS.canvas.h;

          /* repaint canvas on anim disabled */
          if(!pJS.particles.move.enable){
            pJS.fn.particlesEmpty();
            pJS.fn.particlesCreate();
            pJS.fn.particlesDraw();
            pJS.fn.vendors.densityAutoParticles();
          }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  pJS.fn.canvasPaint = function(){
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function(){
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };


  /* --------- pJS functions - particles ----------- */

  pJS.fn.particle = function(color, opacity, position){

    /* size */
    this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;
    if(pJS.particles.size.anim.enable){
      this.size_status = false;
      this.vs = pJS.particles.size.anim.speed / 100;
      if(!pJS.particles.size.anim.sync){
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* check position  - into the canvas */
    if(this.x > pJS.canvas.w - this.radius*2) this.x = this.x - this.radius;
    else if(this.x < this.radius*2) this.x = this.x + this.radius;
    if(this.y > pJS.canvas.h - this.radius*2) this.y = this.y - this.radius;
    else if(this.y < this.radius*2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if(pJS.particles.move.bounce){
      pJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if(typeof(color.value) == 'object'){

      if(color.value instanceof Array){
        var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      }else{
        if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }

    }
    else if(color.value == 'random'){
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
    else if(typeof(color.value) == 'string'){
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;
    if(pJS.particles.opacity.anim.enable){
      this.opacity_status = false;
      this.vo = pJS.particles.opacity.anim.speed / 100;
      if(!pJS.particles.opacity.anim.sync){
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {}
    switch(pJS.particles.move.direction){
      case 'top':
        velbase = { x:0, y:-1 };
      break;
      case 'top-right':
        velbase = { x:0.5, y:-0.5 };
      break;
      case 'right':
        velbase = { x:1, y:-0 };
      break;
      case 'bottom-right':
        velbase = { x:0.5, y:0.5 };
      break;
      case 'bottom':
        velbase = { x:0, y:1 };
      break;
      case 'bottom-left':
        velbase = { x:-0.5, y:1 };
      break;
      case 'left':
        velbase = { x:-1, y:0 };
      break;
      case 'top-left':
        velbase = { x:-0.5, y:-0.5 };
      break;
      default:
        velbase = { x:0, y:0 };
      break;
    }

    if(pJS.particles.move.straight){
      this.vx = velbase.x;
      this.vy = velbase.y;
      if(pJS.particles.move.random){
        this.vx = this.vx * (Math.random());
        this.vy = this.vy * (Math.random());
      }
    }else{
      this.vx = velbase.x + Math.random()-0.5;
      this.vy = velbase.y + Math.random()-0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    

    /* if shape is image */

    var shape_type = pJS.particles.shape.type;
    if(typeof(shape_type) == 'object'){
      if(shape_type instanceof Array){
        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    }else{
      this.shape = shape_type;
    }

    if(this.shape == 'image'){
      var sh = pJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      }
      if(!this.img.ratio) this.img.ratio = 1;
      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg != undefined){
        pJS.fn.vendors.createSvgImg(this);
        if(pJS.tmp.pushing){
          this.img.loaded = false;
        }
      }
    }

    

  };


  pJS.fn.particle.prototype.draw = function() {

    var p = this;

    if(p.radius_bubble != undefined){
      var radius = p.radius_bubble; 
    }else{
      var radius = p.radius;
    }

    if(p.opacity_bubble != undefined){
      var opacity = p.opacity_bubble;
    }else{
      var opacity = p.opacity;
    }

    if(p.color.rgb){
      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
    }else{
      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')';
    }

    pJS.canvas.ctx.fillStyle = color_value;
    pJS.canvas.ctx.beginPath();

    switch(p.shape){

      case 'circle':
        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
      break;

      case 'edge':
        pJS.canvas.ctx.rect(p.x-radius, p.y-radius, radius*2, radius*2);
      break;

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x-radius, p.y+radius / 1.66, radius*2, 3, 2);
      break;

      case 'polygon':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius / (pJS.particles.shape.polygon.nb_sides/3.5), // startX
          p.y - radius / (2.66/3.5), // startY
          radius*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
      break;

      case 'star':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius*2 / (pJS.particles.shape.polygon.nb_sides/4), // startX
          p.y - radius / (2*2.66/3.5), // startY
          radius*2*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
      break;

      case 'image':

        function draw(){
          pJS.canvas.ctx.drawImage(
            img_obj,
            p.x-radius,
            p.y-radius,
            radius*2,
            radius*2 / p.img.ratio
          );
        }

        if(pJS.tmp.img_type == 'svg'){
          var img_obj = p.img.obj;
        }else{
          var img_obj = pJS.tmp.img_obj;
        }

        if(img_obj){
          draw();
        }

      break;

    }

    pJS.canvas.ctx.closePath();

    if(pJS.particles.shape.stroke.width > 0){
      pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
      pJS.canvas.ctx.stroke();
    }
    
    pJS.canvas.ctx.fill();
    
  };


  pJS.fn.particlesCreate = function(){
    for(var i = 0; i < pJS.particles.number.value; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
    }
  };

  pJS.fn.particlesUpdate = function(){

    for(var i = 0; i < pJS.particles.array.length; i++){

      /* the particle */
      var p = pJS.particles.array[i];

      // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if(pJS.particles.move.enable){
        var ms = pJS.particles.move.speed/2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if(pJS.particles.opacity.anim.enable) {
        if(p.opacity_status == true) {
          if(p.opacity >= pJS.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        }else {
          if(p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if(p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if(pJS.particles.size.anim.enable){
        if(p.size_status == true){
          if(p.radius >= pJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        }else{
          if(p.radius <= pJS.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }
        if(p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if(pJS.particles.move.out_mode == 'bounce'){
        var new_pos = {
          x_left: p.radius,
          x_right:  pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h
        }
      }else{
        var new_pos = {
          x_left: -p.radius,
          x_right: pJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS.canvas.h + p.radius
        }
      }

      if(p.x - p.radius > pJS.canvas.w){
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS.canvas.h;
      }
      else if(p.x + p.radius < 0){
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS.canvas.h;
      }
      if(p.y - p.radius > pJS.canvas.h){
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS.canvas.w;
      }
      else if(p.y + p.radius < 0){
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS.canvas.w;
      }

      /* out of canvas modes */
      switch(pJS.particles.move.out_mode){
        case 'bounce':
          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
        break;
      }

      /* events */
      if(isInArray('grab', pJS.interactivity.events.onhover.mode)){
        pJS.fn.modes.grabParticle(p);
      }

      if(isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)){
        pJS.fn.modes.bubbleParticle(p);
      }

      if(isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)){
        pJS.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if(pJS.particles.line_linked.enable || pJS.particles.move.attract.enable){
        for(var j = i + 1; j < pJS.particles.array.length; j++){
          var p2 = pJS.particles.array[j];

          /* link particles */
          if(pJS.particles.line_linked.enable){
            pJS.fn.interact.linkParticles(p,p2);
          }

          /* attract particles */
          if(pJS.particles.move.attract.enable){
            pJS.fn.interact.attractParticles(p,p2);
          }

          /* bounce particles */
          if(pJS.particles.move.bounce){
            pJS.fn.interact.bounceParticles(p,p2);
          }

        }
      }


    }

  };

  pJS.fn.particlesDraw = function(){

    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* update each particles param */
    pJS.fn.particlesUpdate();

    /* draw each particle */
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p = pJS.particles.array[i];
      p.draw();
    }

  };

  pJS.fn.particlesEmpty = function(){
    pJS.particles.array = [];
  };

  pJS.fn.particlesRefresh = function(){

    /* init all */
    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
    pJS.tmp.source_svg = undefined;
    pJS.tmp.img_obj = undefined;
    pJS.tmp.count_svg = 0;
    pJS.fn.particlesEmpty();
    pJS.fn.canvasClear();
    
    /* restart */
    pJS.fn.vendors.start();

  };


  /* ---------- pJS functions - particles interaction ------------ */

  pJS.fn.interact.linkParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if(dist <= pJS.particles.line_linked.distance){

      var opacity_line = pJS.particles.line_linked.opacity - (dist / (1/pJS.particles.line_linked.opacity)) / pJS.particles.line_linked.distance;

      if(opacity_line > 0){        
        
        /* style */
        var color_line = pJS.particles.line_linked.color_rgb_line;
        pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
        //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
        
        /* path */
        pJS.canvas.ctx.beginPath();
        pJS.canvas.ctx.moveTo(p1.x, p1.y);
        pJS.canvas.ctx.lineTo(p2.x, p2.y);
        pJS.canvas.ctx.stroke();
        pJS.canvas.ctx.closePath();

      }

    }

  };


  pJS.fn.interact.attractParticles  = function(p1, p2){

    /* condensed particles */
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    if(dist <= pJS.particles.line_linked.distance){

      var ax = dx/(pJS.particles.move.attract.rotateX*1000),
          ay = dy/(pJS.particles.move.attract.rotateY*1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;

    }
    

  }


  pJS.fn.interact.bounceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy),
        dist_p = p1.radius+p2.radius;

    if(dist <= dist_p){
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }

  }


  /* ---------- pJS functions - modes events ------------ */

  pJS.fn.modes.pushParticles = function(nb, pos){

    pJS.tmp.pushing = true;

    for(var i = 0; i < nb; i++){
      pJS.particles.array.push(
        new pJS.fn.particle(
          pJS.particles.color,
          pJS.particles.opacity.value,
          {
            'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
            'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
          }
        )
      )
      if(i == nb-1){
        if(!pJS.particles.move.enable){
          pJS.fn.particlesDraw();
        }
        pJS.tmp.pushing = false;
      }
    }

  };


  pJS.fn.modes.removeParticles = function(nb){

    pJS.particles.array.splice(0, nb);
    if(!pJS.particles.move.enable){
      pJS.fn.particlesDraw();
    }

  };


  pJS.fn.modes.bubbleParticle = function(p){

    /* on hover event */
    if(pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)){

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
          ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

      function init(){
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if(dist_mouse <= pJS.interactivity.modes.bubble.distance){

        if(ratio >= 0 && pJS.interactivity.status == 'mousemove'){
          
          /* size */
          if(pJS.interactivity.modes.bubble.size != pJS.particles.size.value){

            if(pJS.interactivity.modes.bubble.size > pJS.particles.size.value){
              var size = p.radius + (pJS.interactivity.modes.bubble.size*ratio);
              if(size >= 0){
                p.radius_bubble = size;
              }
            }else{
              var dif = p.radius - pJS.interactivity.modes.bubble.size,
                  size = p.radius - (dif*ratio);
              if(size > 0){
                p.radius_bubble = size;
              }else{
                p.radius_bubble = 0;
              }
            }

          }

          /* opacity */
          if(pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value){

            if(pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value){
              var opacity = pJS.interactivity.modes.bubble.opacity*ratio;
              if(opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity){
                p.opacity_bubble = opacity;
              }
            }else{
              var opacity = p.opacity - (pJS.particles.opacity.value-pJS.interactivity.modes.bubble.opacity)*ratio;
              if(opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity){
                p.opacity_bubble = opacity;
              }
            }

          }

        }

      }else{
        init();
      }


      /* mouseleave */
      if(pJS.interactivity.status == 'mouseleave'){
        init();
      }
    
    }

    /* on click event */
    else if(pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)){


      if(pJS.tmp.bubble_clicking){
        var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
            dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
            dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
            time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time)/1000;

        if(time_spent > pJS.interactivity.modes.bubble.duration){
          pJS.tmp.bubble_duration_end = true;
        }

        if(time_spent > pJS.interactivity.modes.bubble.duration*2){
          pJS.tmp.bubble_clicking = false;
          pJS.tmp.bubble_duration_end = false;
        }
      }


      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id){

        if(bubble_param != particles_param){

          if(!pJS.tmp.bubble_duration_end){
            if(dist_mouse <= pJS.interactivity.modes.bubble.distance){
              if(p_obj_bubble != undefined) var obj = p_obj_bubble;
              else var obj = p_obj;
              if(obj != bubble_param){
                var value = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration);
                if(id == 'size') p.radius_bubble = value;
                if(id == 'opacity') p.opacity_bubble = value;
              }
            }else{
              if(id == 'size') p.radius_bubble = undefined;
              if(id == 'opacity') p.opacity_bubble = undefined;
            }
          }else{
            if(p_obj_bubble != undefined){
              var value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration),
                  dif = bubble_param - value_tmp;
                  value = bubble_param + dif;
              if(id == 'size') p.radius_bubble = value;
              if(id == 'opacity') p.opacity_bubble = value;
            }
          }

        }

      }

      if(pJS.tmp.bubble_clicking){
        /* size */
        process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
        /* opacity */
        process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
      }

    }

  };


  pJS.fn.modes.repulseParticle = function(p){

    if(pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      var normVec = {x: dx_mouse/dist_mouse, y: dy_mouse/dist_mouse},
          repulseRadius = pJS.interactivity.modes.repulse.distance,
          velocity = 100,
          repulseFactor = clamp((1/repulseRadius)*(-1*Math.pow(dist_mouse/repulseRadius,2)+1)*repulseRadius*velocity, 0, 50);
      
      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      }

      if(pJS.particles.move.out_mode == 'bounce'){
        if(pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
        if(pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
      }else{
        p.x = pos.x;
        p.y = pos.y;
      }
    
    }


    else if(pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {

      if(!pJS.tmp.repulse_finish){
        pJS.tmp.repulse_count++;
        if(pJS.tmp.repulse_count == pJS.particles.array.length){
          pJS.tmp.repulse_finish = true;
        }
      }

      if(pJS.tmp.repulse_clicking){

        var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance/6, 3);

        var dx = pJS.interactivity.mouse.click_pos_x - p.x,
            dy = pJS.interactivity.mouse.click_pos_y - p.y,
            d = dx*dx + dy*dy;

        var force = -repulseRadius / d * 1;

        function process(){

          var f = Math.atan2(dy,dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if(pJS.particles.move.out_mode == 'bounce'){
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            }
            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
            else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
            else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }

        }

        // default
        if(d <= repulseRadius){
          process();
        }

        // bang - slow motion mode
        // if(!pJS.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }
        

      }else{

        if(pJS.tmp.repulse_clicking == false){

          p.vx = p.vx_i;
          p.vy = p.vy_i;
        
        }

      }

    }

  }


  pJS.fn.modes.grabParticle = function(p){

    if(pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove'){

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if(dist_mouse <= pJS.interactivity.modes.grab.distance){

        var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1/pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance;

        if(opacity_line > 0){

          /* style */
          var color_line = pJS.particles.line_linked.color_rgb_line;
          pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
          //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
          
          /* path */
          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p.x, p.y);
          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();

        }

      }

    }

  };



  /* ---------- pJS functions - vendors ------------ */

  pJS.fn.vendors.eventsListeners = function(){

    /* events target element */
    if(pJS.interactivity.detect_on == 'window'){
      pJS.interactivity.el = window;
    }else{
      pJS.interactivity.el = pJS.canvas.el;
    }


    /* detect mouse pos - on hover / click event */
    if(pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable){

      /* el on mousemove */
      pJS.interactivity.el.addEventListener('mousemove', function(e){

        if(pJS.interactivity.el == window){
          var pos_x = e.clientX,
              pos_y = e.clientY;
        }
        else{
          var pos_x = e.offsetX || e.clientX,
              pos_y = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if(pJS.tmp.retina){
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';

      });

      /* el on onmouseleave */
      pJS.interactivity.el.addEventListener('mouseleave', function(e){

        pJS.interactivity.mouse.pos_x = null;
        pJS.interactivity.mouse.pos_y = null;
        pJS.interactivity.status = 'mouseleave';

      });

    }

    /* on click event */
    if(pJS.interactivity.events.onclick.enable){

      pJS.interactivity.el.addEventListener('click', function(){

        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
        pJS.interactivity.mouse.click_time = new Date().getTime();

        if(pJS.interactivity.events.onclick.enable){

          switch(pJS.interactivity.events.onclick.mode){

            case 'push':
              if(pJS.particles.move.enable){
                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
              }else{
                if(pJS.interactivity.modes.push.particles_nb == 1){
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                }
                else if(pJS.interactivity.modes.push.particles_nb > 1){
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
                }
              }
            break;

            case 'remove':
              pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
            break;

            case 'bubble':
              pJS.tmp.bubble_clicking = true;
            break;

            case 'repulse':
              pJS.tmp.repulse_clicking = true;
              pJS.tmp.repulse_count = 0;
              pJS.tmp.repulse_finish = false;
              setTimeout(function(){
                pJS.tmp.repulse_clicking = false;
              }, pJS.interactivity.modes.repulse.duration*1000)
            break;

          }

        }

      });
        
    }


  };

  pJS.fn.vendors.densityAutoParticles = function(){

    if(pJS.particles.number.density.enable){

      /* calc area */
      var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
      if(pJS.tmp.retina){
        area = area/(pJS.canvas.pxratio*2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = pJS.particles.array.length - nb_particles;
      if(missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else pJS.fn.modes.removeParticles(missing_particles);

    }

  };


  pJS.fn.vendors.checkOverlap = function(p1, position){
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p2 = pJS.particles.array[i];

      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx*dx + dy*dy);

      if(dist <= p1.radius + p2.radius){
        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
        pJS.fn.vendors.checkOverlap(p1);
      }
    }
  };


  pJS.fn.vendors.createSvgImg = function(p){

    /* set color to svg element */
    var svgXml = pJS.tmp.source_svg,
        rgbHex = /#([0-9A-F]{3,6})/gi,
        coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
          if(p.color.rgb){
            var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+p.opacity+')';
          }else{
            var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+p.opacity+')';
          }
          return color_value;
        });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], {type: 'image/svg+xml;charset=utf-8'}),
        DOMURL = window.URL || window.webkitURL || window,
        url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener('load', function(){
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS.tmp.count_svg++;
    });
    img.src = url;

  };


  pJS.fn.vendors.destroypJS = function(){
    cancelAnimationFrame(pJS.fn.drawAnimFrame);
    canvas_el.remove();
    pJSDom = null;
  };


  pJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator){

    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0,0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength,0);
      c.translate(sideLength,0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();

  };

  pJS.fn.vendors.exportImg = function(){
    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
  };


  pJS.fn.vendors.loadImg = function(type){

    pJS.tmp.img_error = undefined;

    if(pJS.particles.shape.image.src != ''){

      if(type == 'svg'){

        var xhr = new XMLHttpRequest();
        xhr.open('GET', pJS.particles.shape.image.src);
        xhr.onreadystatechange = function (data) {
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              pJS.tmp.source_svg = data.currentTarget.response;
              pJS.fn.vendors.checkBeforeDraw();
            }else{
              console.log('Error pJS - Image not found');
              pJS.tmp.img_error = true;
            }
          }
        }
        xhr.send();

      }else{

        var img = new Image();
        img.addEventListener('load', function(){
          pJS.tmp.img_obj = img;
          pJS.fn.vendors.checkBeforeDraw();
        });
        img.src = pJS.particles.shape.image.src;

      }

    }else{
      console.log('Error pJS - No image.src');
      pJS.tmp.img_error = true;
    }

  };


  pJS.fn.vendors.draw = function(){

    if(pJS.particles.shape.type == 'image'){

      if(pJS.tmp.img_type == 'svg'){

        if(pJS.tmp.count_svg >= pJS.particles.number.value){
          pJS.fn.particlesDraw();
          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }else{
          //console.log('still loading...');
          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }else{

        if(pJS.tmp.img_obj != undefined){
          pJS.fn.particlesDraw();
          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }else{
          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }

    }else{
      pJS.fn.particlesDraw();
      if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
      else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
    }

  };


  pJS.fn.vendors.checkBeforeDraw = function(){

    // if shape is image
    if(pJS.particles.shape.type == 'image'){

      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined){
        pJS.tmp.checkAnimFrame = requestAnimFrame(check);
      }else{
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
        if(!pJS.tmp.img_error){
          pJS.fn.vendors.init();
          pJS.fn.vendors.draw();
        }
        
      }

    }else{
      pJS.fn.vendors.init();
      pJS.fn.vendors.draw();
    }

  };


  pJS.fn.vendors.init = function(){

    /* init canvas + particles */
    pJS.fn.retinaInit();
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

  };


  pJS.fn.vendors.start = function(){

    if(isInArray('image', pJS.particles.shape.type)){
      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
      pJS.fn.vendors.loadImg(pJS.tmp.img_type);
    }else{
      pJS.fn.vendors.checkBeforeDraw();
    }

  };




  /* ---------- pJS - start ------------ */


  pJS.fn.vendors.eventsListeners();

  pJS.fn.vendors.start();
  


};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];

window.particlesJS = function(tag_id, params){

  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* pJS elements */
  var pJS_tag = document.getElementById(tag_id),
      pJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if(exist_canvas.length){
    while(exist_canvas.length > 0){
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = pJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    pJSDom.push(new pJS(tag_id, params));
  }

};

window.particlesJS.load = function(tag_id, path_config_json, callback){

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if(callback) callback();
      }else{
        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();

};

/***/ }),

/***/ "./node_modules/preact/dist/preact.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virutal DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hyrdating=false]	If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return node.splitText !== undefined;
  }
  if (typeof vnode.nodeName === 'string') {
    return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  }
  return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
  return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
  var props = extend({}, vnode.attributes);
  props.children = vnode.children;

  var defaultProps = vnode.nodeName.defaultProps;
  if (defaultProps !== undefined) {
    for (var i in defaultProps) {
      if (props[i] === undefined) {
        props[i] = defaultProps[i];
      }
    }
  }

  return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};


/* harmony default export */ __webpack_exports__["default"] = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),

/***/ "./node_modules/rellax/rellax.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
// ------------------------------------------
// Rellax.js
// Buttery smooth parallax library
// Copyright (c) 2016 Moe Amaya (@moeamaya)
// MIT license
//
// Thanks to Paraxify.js and Jaime Cabllero
// for parallax concepts
// ------------------------------------------

(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Rellax = factory();
  }
}(this, function () {
  var Rellax = function(el, options){
    "use strict";

    var self = Object.create(Rellax.prototype);

    var posY = 0;
    var screenY = 0;
    var posX = 0;
    var screenX = 0;
    var blocks = [];
    var pause = false;

    // check what requestAnimationFrame to use, and if
    // it's not supported, use the onscroll event
    var loop = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback){ setTimeout(callback, 1000 / 60); };

    // check which transform property to use
    var transformProp = window.transformProp || (function(){
        var testEl = document.createElement('div');
        if (testEl.style.transform === null) {
          var vendors = ['Webkit', 'Moz', 'ms'];
          for (var vendor in vendors) {
            if (testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
              return vendors[vendor] + 'Transform';
            }
          }
        }
        return 'transform';
      })();

    // Default Settings
    self.options = {
      speed: -2,
      center: false,
      round: true,
      vertical: true,
      horizontal: false,
      callback: function() {},
    };

    // User defined options (might have more in the future)
    if (options){
      Object.keys(options).forEach(function(key){
        self.options[key] = options[key];
      });
    }

    // By default, rellax class
    if (!el) {
      el = '.rellax';
    }

    // check if el is a className or a node
    var elements = typeof el === 'string' ? document.querySelectorAll(el) : [el];

    // Now query selector
    if (elements.length > 0) {
      self.elems = elements;
    }

    // The elements don't exist
    else {
      throw new Error("The elements you're trying to select don't exist.");
    }

    // Let's kick this script off
    // Build array for cached element values
    var init = function() {
      for (var i = 0; i < blocks.length; i++){
        self.elems[i].style.cssText = blocks[i].style;
      }

      blocks = [];

      screenY = window.innerHeight;
      screenX = window.innerWidth;
      setPosition();

      // Get and cache initial position of all elements
      for (var i = 0; i < self.elems.length; i++){
        var block = createBlock(self.elems[i]);
        blocks.push(block);
      }

      animate();
    };

    // We want to cache the parallax blocks'
    // values: base, top, height, speed
    // el: is dom object, return: el cache values
    var createBlock = function(el) {
      var dataPercentage = el.getAttribute( 'data-rellax-percentage' );
      var dataSpeed = el.getAttribute( 'data-rellax-speed' );
      var dataZindex = el.getAttribute( 'data-rellax-zindex' ) || 0;

      // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
      // ensures elements are positioned based on HTML layout.
      //
      // If the element has the percentage attribute, the posY and posX needs to be
      // the current scroll position's value, so that the elements are still positioned based on HTML layout
      var posY = self.options.vertical ? ( dataPercentage || self.options.center ? (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) : 0 ) : 0;
      var posX = self.options.horizontal ? ( dataPercentage || self.options.center ? (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft) : 0 ) : 0;

      var blockTop = posY + el.getBoundingClientRect().top;
      var blockHeight = el.clientHeight || el.offsetHeight || el.scrollHeight;

      var blockLeft = posX + el.getBoundingClientRect().left;
      var blockWidth = el.clientWidth || el.offsetWidth || el.scrollWidth;

      // apparently parallax equation everyone uses
      var percentageY = dataPercentage ? dataPercentage : (posY - blockTop + screenY) / (blockHeight + screenY);
      var percentageX = dataPercentage ? dataPercentage : (posX - blockLeft + screenX) / (blockWidth + screenX);
      if(self.options.center){ percentageX = 0.5; percentageY = 0.5; }

      // Optional individual block speed as data attr, otherwise global speed
      var speed = dataSpeed ? dataSpeed : self.options.speed;

      var bases = updatePosition(percentageX, percentageY, speed);

      // ~~Store non-translate3d transforms~~
      // Store inline styles and extract transforms
      var style = el.style.cssText;
      var transform = '';

      // Check if there's an inline styled transform
      if (style.indexOf('transform') >= 0) {
        // Get the index of the transform
        var index = style.indexOf('transform');

        // Trim the style to the transform point and get the following semi-colon index
        var trimmedStyle = style.slice(index);
        var delimiter = trimmedStyle.indexOf(';');

        // Remove "transform" string and save the attribute
        if (delimiter) {
          transform = " " + trimmedStyle.slice(11, delimiter).replace(/\s/g,'');
        } else {
          transform = " " + trimmedStyle.slice(11).replace(/\s/g,'');
        }
      }

      return {
        baseX: bases.x,
        baseY: bases.y,
        top: blockTop,
        left: blockLeft,
        height: blockHeight,
        width: blockWidth,
        speed: speed,
        style: style,
        transform: transform,
        zindex: dataZindex
      };
    };

    // set scroll position (posY, posX)
    // side effect method is not ideal, but okay for now
    // returns true if the scroll changed, false if nothing happened
    var setPosition = function() {
      var oldY = posY;
      var oldX = posX;

      posY = (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;

      posX = (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset;

      if (oldY != posY && self.options.vertical) {
        // scroll changed, return true
        return true;
      }

      if (oldX != posX && self.options.horizontal) {
        // scroll changed, return true
        return true;
      }

      // scroll did not change
      return false;
    };

    // Ahh a pure function, gets new transform value
    // based on scrollPosition and speed
    // Allow for decimal pixel values
    var updatePosition = function(percentageX, percentageY, speed) {
      var result = {};
      var valueX = (speed * (100 * (1 - percentageX)));
      var valueY = (speed * (100 * (1 - percentageY)));

      result.x = self.options.round ? Math.round(valueX) : Math.round(valueX * 100) / 100;
      result.y = self.options.round ? Math.round(valueY) : Math.round(valueY * 100) / 100;

      return result;
    };

    // Loop
    var update = function() {
      if (setPosition() && pause === false) {
        animate();
      }

      // loop again
      loop(update);
    };

    // Transform3d on parallax element
    var animate = function() {
      var positions;
      for (var i = 0; i < self.elems.length; i++){
        var percentageY = ((posY - blocks[i].top + screenY) / (blocks[i].height + screenY));
        var percentageX = ((posX - blocks[i].left + screenX) / (blocks[i].width + screenX));

        // Subtracting initialize value, so element stays in same spot as HTML
        positions = updatePosition(percentageX, percentageY, blocks[i].speed);// - blocks[i].baseX;
        var positionY = positions.y - blocks[i].baseY;
        var positionX = positions.x - blocks[i].baseX;

        var zindex = blocks[i].zindex;

        // Move that element
        // (Set the new translation and append initial inline transforms.)
        var translate = 'translate3d(' + (self.options.horizontal ? positionX : '0') + 'px,' + (self.options.vertical ? positionY : '0') + 'px,' + zindex + 'px) ' + blocks[i].transform;
        self.elems[i].style[transformProp] = translate;
      }
      self.options.callback(positions);
    };

    self.destroy = function() {
      for (var i = 0; i < self.elems.length; i++){
        self.elems[i].style.cssText = blocks[i].style;
      }
      pause = true;
    };

    // Init
    init();

    // Re-init on window resize
    window.addEventListener('resize', function() {
      init();
    });

    // Start the loop
    update();

    // Allow to recalculate the initial values whenever we want
    self.refresh = init;

    return self;
  };
  return Rellax;
}));


/***/ }),

/***/ "./node_modules/svg-gauge/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/svg-gauge/src/gauge.js");


/***/ }),

/***/ "./node_modules/svg-gauge/src/gauge.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, define, module */
(function(global, factory) {
  var Gauge = factory(global);
  if(true) {
    // AMD support
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {return Gauge;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }else if(typeof module === "object" && module.exports) {
    // CommonJS support
    module.exports = Gauge;
  }else {
    // We are probably running in the browser
    global.Gauge = Gauge;
  }
})(typeof window === "undefined" ? this : window, function(global, undefined) {

  var document = global.document,
    slice = Array.prototype.slice,
    requestAnimationFrame = (global.requestAnimationFrame ||
        global.mozRequestAnimationFrame ||
        global.webkitRequestAnimationFrame ||
        global.msRequestAnimationFrame ||
        function(cb) {
          return setTimeout(cb, 1000 / 60);
        });

  // EXPERIMENTAL!!
  /**
   * Simplistic animation function for animating the gauge. That's all!
   * Options are:
   * {
   *  duration: 1,    // In seconds
   *  start: 0,       // The start value
   *  end: 100,       // The end value
   *  step: function, // REQUIRED! The step function that will be passed the value and does something
   *  easing: function // The easing function. Default is easeInOutCubic
   * }
   */
  function Animation(options) {
    console.log("ddfdfsdfsdf");
    var duration = options.duration,
        currentIteration = 1,
        iterations = 60 * duration,
        start = options.start || 0,
        end = options.end,
        change = end - start,
        step = options.step,
        easing = options.easing || function easeInOutCubic(pos) {
          // https://github.com/danro/easing-js/blob/master/easing.js
          if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
          return 0.5 * (Math.pow((pos-2),3) + 2);
        };

    function animate() {
      var progress = currentIteration / iterations, 
          value = change * easing(progress) + start;
      // console.log(progress + ", " + value);
      step(value, currentIteration);
      currentIteration += 1;

      if(progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    // start!
    requestAnimationFrame(animate);
  }



  var Gauge = (function() {
    var SVG_NS = "http://www.w3.org/2000/svg";

    var GaugeDefaults = {
      centerX: 50,
      centerY: 50
    };

    var defaultOptions = {
      dialRadius: 40,
      dialStartAngle: 135,
      dialEndAngle: 45,
      value: 0,
      max: 100,
      min: 0,
      valueDialClass: "value",
      valueClass: "value-text",
      dialClass: "dial",
      gaugeClass: "gauge",
      showValue: true,
      gaugeColor: null,
      label: function(val) {return Math.round(val);}
    };

    function shallowCopy(/* source, ...targets*/) {
      var target = arguments[0], sources = slice.call(arguments, 1);
      sources.forEach(function(s) {
        for(k in s) {
          if(s.hasOwnProperty(k)) {
            target[k] = s[k];
          }
        }
      });
      return target;
    }

    /**
     * A utility function to create SVG dom tree
     * @param {String} name The SVG element name
     * @param {Object} attrs The attributes as they appear in DOM e.g. stroke-width and not strokeWidth
     * @param {Array} children An array of children (can be created by this same function)
     * @return The SVG element
     */
    function svg(name, attrs, children) {
      var elem = document.createElementNS(SVG_NS, name);
      for(var attrName in attrs) {
        elem.setAttribute(attrName, attrs[attrName]);
      }

      if(children) {
        children.forEach(function(c) {
          elem.appendChild(c);
        });
      }
      return elem;
    }

    /**
     * Translates percentage value to angle. e.g. If gauge span angle is 180deg, then 50%
     * will be 90deg
     */
    function getAngle(percentage, gaugeSpanAngle) {
      return percentage * gaugeSpanAngle / 100;
    }

    function normalize(value, min, limit) {
      var val = Number(value);
      if(val > limit) return limit;
      if(val < min) return min;
      return val;
    }

    function getValueInPercentage(value, min, max) {
      const newMax = max - min, newVal = value - min;
      return 100 * newVal / newMax;
      // var absMin = Math.abs(min);
      // return 100 * (absMin + value) / (max + absMin);
    }

    /**
     * Gets cartesian co-ordinates for a specified radius and angle (in degrees)
     * @param cx {Number} The center x co-oriinate
     * @param cy {Number} The center y co-ordinate
     * @param radius {Number} The radius of the circle
     * @param angle {Number} The angle in degrees
     * @return An object with x,y co-ordinates
     */
    function getCartesian(cx, cy, radius, angle) {
      var rad = angle * Math.PI / 180;
      return {
        x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
        y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000
      };
    }

    // Returns start and end points for dial
    // i.e. starts at 135deg ends at 45deg with large arc flag
    // REMEMBER!! angle=0 starts on X axis and then increases clockwise
    function getDialCoords(radius, startAngle, endAngle) {
      var cx = GaugeDefaults.centerX,
          cy = GaugeDefaults.centerY;
      return {
        end: getCartesian(cx, cy, radius, endAngle),
      	start: getCartesian(cx, cy, radius, startAngle)
      };
    }

    /**
     * Creates a Gauge object. This should be called without the 'new' operator. Various options
     * can be passed for the gauge:
     * {
     *    dialStartAngle: The angle to start the dial. MUST be greater than dialEndAngle. Default 135deg
     *    dialEndAngle: The angle to end the dial. Default 45deg
     *    radius: The gauge's radius. Default 400
     *    max: The maximum value of the gauge. Default 100
     *    value: The starting value of the gauge. Default 0
     *    label: The function on how to render the center label (Should return a value)
     * }
     * @param {Element} elem The DOM into which to render the gauge
     * @param {Object} opts The gauge options
     * @return a Gauge object
     */
    return function Gauge(elem, opts) {
      opts = shallowCopy({}, defaultOptions, opts);
      var gaugeContainer = elem,
          limit = opts.max,
          min = opts.min,
          value = normalize(opts.value, min, limit),
          radius = opts.dialRadius,
          displayValue = opts.showValue,
          startAngle = opts.dialStartAngle,
          endAngle = opts.dialEndAngle,
          valueDialClass = opts.valueDialClass,
          valueTextClass = opts.valueClass,
          valueLabelClass = opts.valueLabelClass,
          dialClass = opts.dialClass,
          gaugeClass = opts.gaugeClass,
          gaugeColor = opts.color,
          gaugeValueElem,
          gaugeValuePath,
          label = opts.label,
          instance;

      if(startAngle < endAngle) {
        console.log("WARN! startAngle < endAngle, Swapping");
        var tmp = startAngle;
        startAngle = endAngle;
        endAngle = tmp;
      }

      function pathString(radius, startAngle, endAngle, largeArc) {
        var coords = getDialCoords(radius, startAngle, endAngle),
            start = coords.start,
            end = coords.end,
            largeArcFlag = typeof(largeArc) === "undefined" ? 1 : largeArc;

        return [
          "M", start.x, start.y, 
          "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
        ].join(" ");
      }

      function initializeGauge(elem) {
        gaugeValueElem = svg("text", {
          x: 50,
          y: 50,
          fill: "#999",
          "class": valueTextClass,
          "font-size": "100%",
          "font-family": "sans-serif",
          "font-weight": "normal",
          "text-anchor": "middle",
          "alignment-baseline": "middle",
        });

        gaugeValuePath = svg("path", {
          "class": valueDialClass,
          fill: "none",
          stroke: "#666",
          "stroke-width": 2.5,
          d: pathString(radius, startAngle, startAngle) // value of 0
        });

        var angle = getAngle(100, 360 - Math.abs(startAngle - endAngle));
        var flag = angle <= 180 ? 0 : 1;
        var gaugeElement = svg("svg", {"viewBox": "0 0 100 100", "class": gaugeClass},
          [
            svg("path", {
              "class": dialClass,
              fill: "none",
              stroke: "#eee",
              "stroke-width": 2,
              d: pathString(radius, startAngle, endAngle, flag)
            }),
            gaugeValueElem,
            gaugeValuePath
          ]
        );
        elem.appendChild(gaugeElement);
      }

      function updateGauge(theValue, frame) {
        var val = getValueInPercentage(theValue, min, limit),
            // angle = getAngle(val, 360 - Math.abs(endAngle - startAngle)),
            angle = getAngle(val, 360 - Math.abs(startAngle - endAngle)),
            // this is because we are using arc greater than 180deg
            flag = angle <= 180 ? 0 : 1;
        if(displayValue) {
          gaugeValueElem.textContent = label.call(opts, theValue);
        }
        gaugeValuePath.setAttribute("d", pathString(radius, startAngle, angle + startAngle, flag));
      }

      function setGaugeColor(value, duration) {        
        var c = gaugeColor(value), 
            dur = duration * 1000,
            pathTransition = "stroke " + dur + "ms ease";
            // textTransition = "fill " + dur + "ms ease";

        gaugeValuePath.style = [
          "stroke: " + c,
          "-webkit-transition: " + pathTransition,
          "-moz-transition: " + pathTransition,
          "transition: " + pathTransition,
        ].join(";");
        /*
        gaugeValueElem.style = [
          "fill: " + c,
          "-webkit-transition: " + textTransition,
          "-moz-transition: " + textTransition,
          "transition: " + textTransition,
        ].join(";");
        */
      }

      instance = {
        setMaxValue: function(max) {
          limit = max;
        },
        setValue: function(val) {
          value = normalize(val, min, limit);
          if(gaugeColor) {
            setGaugeColor(value, 0)
          }
          updateGauge(value);
        },
        setValueAnimated: function(val, duration) {
        	var oldVal = value;
          value = normalize(val, min, limit);
          if(oldVal === value) {
            return;
          }

          if(gaugeColor) {
            setGaugeColor(value, duration);
          }
          Animation({
            start: oldVal || 0,
            end: value,
            duration: duration || 1,
            step: function(val, frame) {
              updateGauge(val, frame);
            }
          });
        },
        getValue: function() {
          return value;
        }
      };

      initializeGauge(gaugeContainer);
      instance.setValue(value);
      return instance;
    };
  })();

  return Gauge;
});


/***/ }),

/***/ "./src/components/app.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

var _background = __webpack_require__("./src/components/particles/background.js");

var _background2 = _interopRequireDefault(_background);

var _section = __webpack_require__("./src/components/layout/intro/section.js");

var _section2 = _interopRequireDefault(_section);

var _section3 = __webpack_require__("./src/components/layout/features/section.js");

var _section4 = _interopRequireDefault(_section3);

var _section5 = __webpack_require__("./src/components/layout/roadmap/section.js");

var _section6 = _interopRequireDefault(_section5);

__webpack_require__("./src/components/app.sass");

__webpack_require__("./src/components/bg-blue-space.jpg");

var _rellax = __webpack_require__("./node_modules/rellax/rellax.js");

var _rellax2 = _interopRequireDefault(_rellax);

var _aos = __webpack_require__("./node_modules/aos/dist/aos.js");

var _aos2 = _interopRequireDefault(_aos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var App = function (_preact$Component) {
  _inherits(App, _preact$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rellax = new _rellax2.default('.rellax', { center: true });
      _aos2.default.init();
    }
  }, {
    key: 'componentWillUnMount',
    value: function componentWillUnMount() {
      this.rellax.destroy();
    }
  }, {
    key: 'render',
    value: function render() {
      return _preact2.default.h(
        'section',
        { 'class': 'app' },
        _preact2.default.h(_background2.default, null),
        _preact2.default.h(_section2.default, null),
        _preact2.default.h(
          'div',
          { 'class': 'has-background-blue-space' },
          _preact2.default.h(_section4.default, null),
          _preact2.default.h(_section6.default, null)
        )
      );
    }
  }]);

  return App;
}(_preact2.default.Component);

exports.default = App;

/***/ }),

/***/ "./src/components/app.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/bg-blue-space.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bg-blue-space-7458e5fcff3f552042cac60d18165ec6.jpg";

/***/ }),

/***/ "./src/components/feature/card.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

__webpack_require__("./src/components/feature/styles.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var FeatureCard = function (_preact$Component) {
  _inherits(FeatureCard, _preact$Component);

  function FeatureCard() {
    _classCallCheck(this, FeatureCard);

    var _this = _possibleConstructorReturn(this, (FeatureCard.__proto__ || Object.getPrototypeOf(FeatureCard)).call(this));

    _this.toggleActiveClass = _this.toggleActiveClass.bind(_this);
    _this.activeClassName = "is-active";
    _this.state = {
      activeClass: ""
    };
    return _this;
  }

  _createClass(FeatureCard, [{
    key: 'toggleActiveClass',
    value: function toggleActiveClass(e) {
      var _this2 = this;

      var currentActiveClass = this.state.activeClass == "" ? this.activeClassName : "";
      e.target.closest(".columns").querySelectorAll("." + this.activeClassName).forEach(function (c) {
        c.classList.remove(_this2.activeClassName);
      });
      this.setState({ activeClass: currentActiveClass });
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      var title = props.title,
          text = props.text;

      var icon = this.props.children[0];
      // const isActive = this.state.activeClass || false;
      var classes = "card is-vcentered has-text-centered " + this.state.activeClass;
      return _preact2.default.h(
        'article',
        { 'class': classes, onclick: this.toggleActiveClass },
        _preact2.default.h(
          'div',
          { 'class': 'card-image' },
          _preact2.default.h(
            'span',
            { 'class': 'is-icon' },
            icon
          ),
          _preact2.default.h(
            'h4',
            { 'class': 'title is-4' },
            title
          )
        ),
        _preact2.default.h(
          'div',
          { 'class': "card-content " + this.state.activeClass },
          _preact2.default.h(
            'div',
            { 'class': 'content' },
            text
          )
        ),
        _preact2.default.h(
          'footer',
          { 'class': "card-footer " + this.state.activeClass },
          _preact2.default.h(
            'p',
            { 'class': 'card-footer-item' },
            '...'
          )
        )
      );
    }
  }]);

  return FeatureCard;
}(_preact2.default.Component);

exports.default = FeatureCard;

/***/ }),

/***/ "./src/components/feature/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/gauge/circle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

var _svgGauge = __webpack_require__("./node_modules/svg-gauge/index.js");

var _svgGauge2 = _interopRequireDefault(_svgGauge);

__webpack_require__("./src/components/gauge/circle.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const Config = require('Config');

/** @jsx preact.h */

var defaultOptions = {
  min: 0,
  max: 100,
  dialStartAngle: -90,
  dialEndAngle: -90.001,
  animDuration: 1,
  label: function label(value) {
    return (Math.round(value * 100) / 100).toFixed();
  }
};

var GaugeCircle = function (_preact$Component) {
  _inherits(GaugeCircle, _preact$Component);

  function GaugeCircle() {
    _classCallCheck(this, GaugeCircle);

    return _possibleConstructorReturn(this, (GaugeCircle.__proto__ || Object.getPrototypeOf(GaugeCircle)).apply(this, arguments));
  }

  _createClass(GaugeCircle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderGauge(this.props);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var props = this.props;

      if (props.value !== nextProps.value) {
        this.renderGauge(nextProps);
      }
      return false;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var _this2 = this;

      var classes = "gauge-container " + props.classes;
      return _preact2.default.h("div", { "class": classes, ref: function ref(el) {
          return _this2.gaugeEl = el;
        } });
    }
  }, {
    key: "renderGauge",
    value: function renderGauge(props) {
      var gaugeOptions = Object.assign({}, defaultOptions, props);
      if (!this.gauge) {
        this.gauge = (0, _svgGauge2.default)(this.gaugeEl, gaugeOptions);
      }
      this.gauge.setValue(props.min || gaugeOptions.min);
      this.gauge.setValueAnimated(props.value, gaugeOptions.animDuration);
    }
  }]);

  return GaugeCircle;
}(_preact2.default.Component);

exports.default = GaugeCircle;

/***/ }),

/***/ "./src/components/gauge/circle.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/icons/atomic-swap.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var AtomicSwap = function (_preact$Component) {
  _inherits(AtomicSwap, _preact$Component);

  function AtomicSwap() {
    _classCallCheck(this, AtomicSwap);

    return _possibleConstructorReturn(this, (AtomicSwap.__proto__ || Object.getPrototypeOf(AtomicSwap)).apply(this, arguments));
  }

  _createClass(AtomicSwap, [{
    key: "render",
    value: function render() {
      return _preact2.default.h(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", "class": "icon-atomic-swap", viewBox: "0 0 508.25 507.68" },
        _preact2.default.h("path", { d: "M480.71,131.14c22.9,6.49,31.17,25.38,39.15,45.54l-22.05,7.15-2.39-4.71c-2.45-4.86-4.46-10-7.44-14.53-8.28-12.54-16.33-12.63-24.68-.2-11.33,16.89-15.89,36.27-19.42,55.9-5.34,29.66-5.9,59.52-3,89.48,1,10.15.94,10.15-9,13.23-3.95,1.22-7.89,2.47-12.7,4-.7-5.49-1.53-10.57-2-15.67-4-44.6-1.84-88.65,12.31-131.52a145.83,145.83,0,0,1,8.88-20.37c6.88-13.51,16.66-24,31.82-28.28Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M403.81,248.6c0,2.16,0,2.8,0,3.45-.27,9.17,1.78,19.29-1.46,27.26s-12.23,13.33-17.81,20.52a131.93,131.93,0,0,0-14.84,23.05c-5.87,12.14-1.64,19.3,11.95,19.5C393.11,342.54,405,342,416,339c55.48-15.1,104.32-42.34,144.74-83.55,8-8.14,14.65-18,20.11-28.06,6.63-12.21,2.22-18.83-11.74-20.17-15.32-1.48-29.91,2.35-44.56,6.12a17.22,17.22,0,0,1-10.25-1.13c-7.21-3.06-14.08-6.93-21.86-10.86a28.74,28.74,0,0,1,4-2.36c19.25-7.38,38.88-13.69,59.62-14.34a97,97,0,0,1,29.07,3.19c17.58,5,25.6,19.71,22.23,37.72-2.49,13.27-9.39,24.39-17.57,34.77-15.73,20-35,36.1-56.35,49.65-33.1,21-67.15,40.23-105.55,50.12-18.1,4.66-36.39,7.94-55.07,3.76-24.23-5.41-34.57-24.13-26.11-47.54a90.24,90.24,0,0,1,8.77-17.52C367.9,279.23,384.71,263.76,403.81,248.6Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M431.19,374.28l21.66-6.91c3.53,6.74,6.33,13.4,10.25,19.31,8.25,12.45,17.27,12.89,24.54-.09,6.52-11.66,10.69-24.71,15.19-37.4,1.5-4.24,3.08-7,7.33-8.95,7.12-3.25,13.82-7.39,20.63-11.11.5,12.24-7.9,44.22-17,59.88-4.88,8.36-10.72,16.74-17.93,23-13.6,11.87-31.49,10.2-44.41-2.5C441.64,400,436,388,431.19,374.28Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M535.58,368.6c2.52-9.71,4.38-16.86,6.45-24.8,2.78.24,5.71.69,8.64.71,7.16,0,14.47.73,21.46-.4,10.87-1.75,14.15-7.67,10-18-2.93-7.2-7.49-13.74-11.39-20.53-.86-1.51-2-2.85-3.3-4.64l17.54-16.56c11.73,13.92,21.86,28.23,22.61,46.93.79,19.71-13.68,35-35.69,37.07C560.23,369.48,548.43,368.6,535.58,368.6Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M408.9,208.53c-7.1-.55-13.81-1.53-20.52-1.5-21.35.08-26.53,9.12-15.84,27.49,3.16,5.42,7,10.44,10.72,15.88l-17.39,16.26c-9.93-11.88-18.31-24.06-21.32-39.05-4.64-23.13,9-41.29,33.4-43.6,12-1.13,24.28-.19,37.3-.19C412.85,193.17,411,200.5,408.9,208.53Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M461.1,199.73c31.89,13.52,60.28,31,88.08,51.85l-17.39,16c-15-9.57-29.18-19-43.77-27.71a268.55,268.55,0,0,0-28-14.15c-3.91-1.74-4.74-3.56-3.63-7.37C458,212.53,459.37,206.62,461.1,199.73Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M475.26,263.78c7.19-.1,11.95,4.54,12,11.68,0,6.92-4.42,11.67-11.14,11.88a11.75,11.75,0,0,1-12.44-11.49C463.44,268.73,468.11,263.88,475.26,263.78Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M476.31,492.57c7.56-13.38,14.47-25.83,21.7-38.1.9-1.53,3.38-2.64,5.3-3C555.89,442.13,597,415.36,626,370.44c17-26.45,25.94-55.64,27.18-87.12.09-2.2.28-4.39.55-8.47,12.77,10,24.37,19.09,37.19,29.12L730,276.43c-1.17,12.83-1.56,25.13-3.49,37.18C708.59,425.11,625.27,508.47,514,526.71c-3.45.56-6.07.21-8.58-2.43-5.94-6.27-12.25-12.19-18.13-18.51C483.19,501.38,479.59,496.55,476.31,492.57Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M475.56,96.74,503.87,60.5,476.56,21.76c8.77.54,17.28.7,25.7,1.62,110.3,12,198.59,91.93,221.81,200.65,4,18.73,4.11,18.84-9.68,32-7.2,6.85-14.84,13.23-21.69,19.28-13.41-7.6-26.15-14.7-38.72-22.1-1.39-.81-2.3-3.19-2.6-5-6.13-36.39-21.46-68.26-47.07-94.9q-49-51-119.85-55c-2.25-.13-4.5-.25-6.74-.42C477.38,97.85,477.07,97.55,475.56,96.74Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M296.26,275.65l-35.83-28.17-38.68,27.31c.49-8.65.42-17.15,1.53-25.5q19.1-144.13,150.76-206c20.35-9.56,42-15.06,64.18-18.5,1.84-.28,4.56-.18,5.68.94,11,11,21.67,22.2,31.57,32.44-8,14.14-15,26.74-22.31,39.18-.82,1.39-3.15,2.36-4.93,2.66-36.59,6.17-68.66,21.59-95.36,47.41q-51,49.37-54.68,120.56c-.11,2.21-.28,4.43-.43,6.64Z", transform: "translate(-221.75 -21.76)" }),
        _preact2.default.h("path", { d: "M475.92,454.6,447.4,491q12.84,18.19,27.14,38.42c-1.82,0-3.72,0-5.61,0-115.85-2.14-217.68-86.76-241.45-200.63-4.23-20.27-4.31-20.36,10.89-34.7,6.8-6.41,14-12.36,20.3-17.83,13.42,7.6,26,14.61,38.44,22,1.51.89,2.53,3.45,2.87,5.4,9.35,52.84,36.48,93.94,81.63,122.86,26.16,16.76,55.08,25.35,86.12,26.78,1.87.09,3.75.19,5.62.32A19.38,19.38,0,0,1,475.92,454.6Z", transform: "translate(-221.75 -21.76)" })
      );
    }
  }]);

  return AtomicSwap;
}(_preact2.default.Component);

exports.default = AtomicSwap;

/***/ }),

/***/ "./src/components/icons/digit.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var Digit = function (_preact$Component) {
  _inherits(Digit, _preact$Component);

  function Digit() {
    _classCallCheck(this, Digit);

    return _possibleConstructorReturn(this, (Digit.__proto__ || Object.getPrototypeOf(Digit)).apply(this, arguments));
  }

  _createClass(Digit, [{
    key: "render",
    value: function render() {
      return _preact2.default.h(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", "class": "icon-digit", viewBox: "0 0 458.85 516.61" },
        _preact2.default.h("path", { d: "M508.44,22c21.55,2.64,41.16,9.13,60.23,17.23,80.6,34.27,128.81,112.45,126.5,201.86-1.44,56-21.64,105.8-49.69,153-23.54,39.62-51.78,75.75-83.42,109.23-9.08,9.61-19.47,11-27,3.74-7.34-7.1-6.93-16.75,1.89-26.36,38.18-41.61,72.61-85.91,97.26-137s36-104.1,19.76-160C623.56,78.56,511.48,27.45,408.64,71.22c-41.38,17.62-72.76,45.66-92.11,86.78-9.14,19.42-19.36,38.46-37.51,51.24a70.67,70.67,0,0,1-20.35,10.06c-8.59,2.52-15.75-.9-19.61-9.63-4-9-1.08-17.45,6.83-20.54,21.49-8.41,29.29-27.53,40-45.12C298,124.25,310,103.8,325.59,87c34-36.69,77.73-55.94,126.59-63.74,0,0,8.56-1.38,26.86-2.07S508.44,22,508.44,22Z", transform: "translate(-236.4 -20.97)" }),
        _preact2.default.h("path", { d: "M631.65,234c-.66,45.58-16.84,86-39.75,124.19-41.08,68.41-94.33,125.9-157.88,174-10.28,7.77-21.16,7-27.2-1.57-5.77-8.22-3.24-17.81,6.86-25.53,62.09-47.44,114.57-103.54,153.38-171.7,15-26.36,26.2-54.19,29-85,5-55.1-22.21-102.69-69.64-120.79-50.55-19.28-106.81-2-139.11,43.43-6.58,9.25-11.62,19.73-16.45,30.08C347.63,250.93,314.79,292,266,319c-12.31,6.78-21.54,5.53-27-3.64-5.64-9.48-1.85-18.9,10.65-25.88,43.57-24.35,72.22-61.52,92.16-106.41,24.43-55,66.35-87.52,126.05-96.15,73.07-10.55,146.06,42.16,160,115.36C629.81,212.7,630.4,223.43,631.65,234Z", transform: "translate(-236.4 -20.97)" }),
        _preact2.default.h("path", { d: "M566.13,247.78c-.31,16.29-9.29,41.36-22.49,64.9-40.33,72-95.17,130.83-162.62,178.1a140.31,140.31,0,0,1-15.69,9.48c-9.55,5-19.23,2.47-24-5.78S339,476.69,348.58,471c39.67-23.44,72.88-54.43,103.37-88.48,28.66-32,54.79-66,71-106.24a143.4,143.4,0,0,0,8.84-34.18c3.57-26.55-8.71-47.47-30.88-55.07-23-7.9-49.45,1.72-62.87,23.18-3.22,5.15-5.51,10.89-8.21,16.36C401.4,284.14,365.93,336.29,314.48,376a203.63,203.63,0,0,1-25.91,16.87c-8.57,4.73-18.88,1.57-22.78-6.46-4.2-8.66-2.87-17.07,5.48-22.19,62.61-38.37,101.2-96.28,131.74-160.85,17.34-36.65,50.91-56,91-52.7C536.07,154.15,566.5,190.37,566.13,247.78Z", transform: "translate(-236.4 -20.97)" }),
        _preact2.default.h("path", { d: "M499,236.86c-2.05,6.91-2.66,10.74-4.26,14.11-38.88,82-92.64,151.52-168.85,202.33a53.62,53.62,0,0,1-7,3.94c-9.15,4.22-18.64,1.75-23.13-5.91-4.75-8.12-2-18,6.78-23.68,73.53-47.43,124.46-114,161.77-191.87,4.48-9.34,11.21-14.58,20.7-11.22C490.81,226.58,494.94,233.07,499,236.86Z", transform: "translate(-236.4 -20.97)" })
      );
    }
  }]);

  return Digit;
}(_preact2.default.Component);

exports.default = Digit;

/***/ }),

/***/ "./src/components/icons/fast-and-secure.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var FastAndSecure = function (_preact$Component) {
  _inherits(FastAndSecure, _preact$Component);

  function FastAndSecure() {
    _classCallCheck(this, FastAndSecure);

    return _possibleConstructorReturn(this, (FastAndSecure.__proto__ || Object.getPrototypeOf(FastAndSecure)).apply(this, arguments));
  }

  _createClass(FastAndSecure, [{
    key: "render",
    value: function render() {
      return _preact2.default.h(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", "class": "icon-fast-and-secure", viewBox: "0 0 677.51 494.38" },
        _preact2.default.h("path", { d: "M567.55,40.19a333.87,333.87,0,0,0-68.42-10.46c-2.06-.11-4.1-.61-6.14-.92h-30.9c-6.84.67-13.69,1.32-20.53,2C362.78,39,293.83,68.82,236.42,124c-2.08,2-4,4.11-6.07,6.18v20.27c.68,9.91,1.3,19.81,2.05,29.71,5.17,68.35,20.17,134,54.73,194C327.84,444.8,386,494.6,464.3,519.57l11.31,3.62h3.86c3.77-1.2,7.53-2.43,11.31-3.61,62.17-19.41,112.31-56,151.91-107.25,33-42.8,53.77-91.41,66.44-143.68a547.62,547.62,0,0,0,14.73-111.11c.07-2.37.57-4.71.87-7.07V130.2C681,85,628,56,567.55,40.19Zm54,299.52C591.22,395.61,547.76,437.33,488,461a26.07,26.07,0,0,1-20.64.07c-56.83-22.25-99.26-60.94-129.82-113.18-21.25-36.34-34.42-75.71-41.43-117-3.84-22.63-6.08-45.53-9-68.31l1.67.1c-2.89-7.51,1.38-11.39,6.53-15.44A280,280,0,0,1,429.61,89.37C504.18,78.3,573.94,91.5,638,132c9.22,5.83,17.78,12.73,26.45,19.38a7.17,7.17,0,0,1,2.49,5.17C664.29,220.68,652.51,282.67,621.55,339.71Z", transform: "translate(-47.22 -28.81)" }),
        _preact2.default.h("path", { d: "M468.78,277.29,402.58,232c-10,13.31-19.22,25.63-28.46,38,16.85,13.58,33.67,26.51,49.78,40.27s31.41,28.28,46.35,41.82q69.82-79.49,140.18-159.54l-30.19-27Z", transform: "translate(-47.22 -28.81)" }),
        _preact2.default.h("path", { d: "M83.26,213.41h115.2a9,9,0,0,0,0-18H83.26a9,9,0,0,0,0,18Z", transform: "translate(-47.22 -28.81)" }),
        _preact2.default.h("path", { d: "M219.46,288.39a9,9,0,0,0-9-9H56.22a9,9,0,0,0,0,18H210.46A9,9,0,0,0,219.46,288.39Z", transform: "translate(-47.22 -28.81)" }),
        _preact2.default.h("path", { d: "M237.18,363.38H121.34a9,9,0,0,0,0,18H237.18a9,9,0,0,0,0-18Z", transform: "translate(-47.22 -28.81)" })
      );
    }
  }]);

  return FastAndSecure;
}(_preact2.default.Component);

exports.default = FastAndSecure;

/***/ }),

/***/ "./src/components/icons/hamburger.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var Hamburger = function (_preact$Component) {
  _inherits(Hamburger, _preact$Component);

  function Hamburger() {
    _classCallCheck(this, Hamburger);

    var _this = _possibleConstructorReturn(this, (Hamburger.__proto__ || Object.getPrototypeOf(Hamburger)).call(this));

    _this.toggleActiveClass = _this.toggleActiveClass.bind(_this);
    _this.state = {
      activeClass: ""
    };
    return _this;
  }

  _createClass(Hamburger, [{
    key: "toggleActiveClass",
    value: function toggleActiveClass() {
      var currentActiveClass = this.state.activeClass == "" ? "is-active" : "";
      this.setState({ activeClass: currentActiveClass });
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var classes = "hamburger hamburger--spin " + state.activeClass;
      return _preact2.default.h(
        "button",
        { "class": classes.trim(), type: "button", onclick: this.toggleActiveClass },
        _preact2.default.h(
          "span",
          { "class": "hamburger-box" },
          _preact2.default.h("span", { "class": "hamburger-inner" })
        )
      );
    }
  }]);

  return Hamburger;
}(_preact2.default.Component);

exports.default = Hamburger;

/***/ }),

/***/ "./src/components/icons/lightning-network.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var LightningNetwork = function (_preact$Component) {
  _inherits(LightningNetwork, _preact$Component);

  function LightningNetwork() {
    _classCallCheck(this, LightningNetwork);

    return _possibleConstructorReturn(this, (LightningNetwork.__proto__ || Object.getPrototypeOf(LightningNetwork)).apply(this, arguments));
  }

  _createClass(LightningNetwork, [{
    key: "render",
    value: function render() {
      return _preact2.default.h(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", "class": "icon-lightning-network", viewBox: "0 0 410.4 492.1" },
        _preact2.default.h("path", { d: "M688.23,267.68a205.48,205.48,0,0,0-97.65-163.29l24.89-72-2.14-1.33q-28,28.4-56,56.8a202,202,0,0,0-29.89-9,206.8,206.8,0,0,0-51.93-4.59,205.28,205.28,0,0,0-192.59,161A216.28,216.28,0,0,0,278.46,268c0,.45.2,1-.31,1.37v20a9.78,9.78,0,0,1,.52,3.9,203.92,203.92,0,0,0,50.2,121.06,204.76,204.76,0,0,0,53.77,43.8q-12.13,32.13-24.24,64.18l1.54.87L412.64,472a202.28,202.28,0,0,0,37.69,9.9c7.17,1.17,14.4,1.86,21.65,2.37.46,0,1-.2,1.37.31h12a208,208,0,0,0,57.52-8.79,204.65,204.65,0,0,0,145.2-182A207.16,207.16,0,0,0,688.23,267.68Zm-51.91-51a2.55,2.55,0,0,1-1.47-.57,239.31,239.31,0,0,0-50.68-20.85,1.89,1.89,0,0,1-1.64-1.73c-1.91-13.33-13.13-24.46-26.23-27.56a26.49,26.49,0,0,0-6.79-.9,2.24,2.24,0,0,1-2.33-1.37,240.22,240.22,0,0,0-22.9-34.4q-4.47-5.61-9.26-10.95c-.36-.4-.69-.81-1.15-1.35C565.69,125.71,615.26,163.69,636.32,216.64Zm-79,65.92a222.5,222.5,0,0,1-6.3,51.29c-.17.71-.21,1.6-1.28,1.49s-2.43.87-3.43-.76a231.81,231.81,0,0,0-15.51-22.31,246.55,246.55,0,0,0-44.27-43.83,243,243,0,0,0-65.36-35.77,3.42,3.42,0,0,1-2.32-3.72c.08-.73.7-.77,1.15-1a219.25,219.25,0,0,1,28-11.22,222,222,0,0,1,45.32-9.64,234.84,234.84,0,0,1,28.19-1.22,2,2,0,0,1,2,1.2,35,35,0,0,0,25.43,17.73,1.78,1.78,0,0,1,1.67,1.52C554.88,243.7,557.09,261.34,557.31,282.56ZM330.16,217a165.74,165.74,0,0,1,102-94.91,160,160,0,0,1,35.59-7.32c3.28-.29,6.55-.53,10.53-.65,3-1.11,5.37.92,7.89,3.3a229.68,229.68,0,0,1,42.08,53.44,1.16,1.16,0,0,1-.26,1.74,24.92,24.92,0,0,0-7.46,12.18c-.29,1.1-.89,1.19-1.81,1.18A237.3,237.3,0,0,0,489,187.49a241.9,241.9,0,0,0-60,14.68c-6.87,2.65-13.61,5.6-20.2,8.9a2.08,2.08,0,0,1-2.41-.11,29.89,29.89,0,0,0-41.55,7.51,2.12,2.12,0,0,1-2.2,1,230.39,230.39,0,0,0-31.63-1.07C329.67,218.49,329.73,218,330.16,217Zm-11.88,70.75c-.26-4.08-.35-8.09-.24-12.1a170.93,170.93,0,0,1,4.62-35.46c.29-1.21.8-1.54,2-1.6a238.83,238.83,0,0,1,33.73.52c.95.09,1.17.44,1.43,1.28.54,1.82,0,3-1.45,4.19a241.58,241.58,0,0,0-38.91,42C319.14,287,319,287.5,318.28,287.74Zm169.05,156a3.05,3.05,0,0,1-2.5,1c-1.19-.09-2.39-.05-3.59-.05h-3.43a166.06,166.06,0,0,1-53.33-10.76,162.3,162.3,0,0,1-52.13-32,164.21,164.21,0,0,1-49.51-82.7,2.18,2.18,0,0,1,.34-1.8,227.45,227.45,0,0,1,47.12-56.78,1.36,1.36,0,0,1,2-.16c8.65,5.84,17.94,7,27.74,3.48a28,28,0,0,0,13.86-10.67,2,2,0,0,1,2.86-.92A226.27,226.27,0,0,1,528.59,344a1.24,1.24,0,0,1-.18,1.79,31.08,31.08,0,0,0-8.52,20.5,28.37,28.37,0,0,0,8.22,21.54c1,1.08,1.2,1.76.43,3.11A228.71,228.71,0,0,1,487.33,443.72Zm71.1-16.93a166.2,166.2,0,0,1-39.23,14,2.37,2.37,0,0,1-1.29.1c0-.55.48-.83.79-1.19a239.12,239.12,0,0,0,28.42-41.07,3.1,3.1,0,0,1,3.32-2c2.23.14,2.22,0,2.86,2.12a233.81,233.81,0,0,1,6.07,26A1.54,1.54,0,0,1,558.43,426.79Zm54.87-45.08A163.18,163.18,0,0,1,579,414.33c-.84.6-1.13.65-1.37-.52a222.39,222.39,0,0,0-6.23-24.26,1.86,1.86,0,0,1,.64-2.19A30.33,30.33,0,0,0,581,371c2.14-11.36-.86-21.1-9.68-28.78a2.79,2.79,0,0,1-1.05-3.26,247.18,247.18,0,0,0-.16-116.53,1.56,1.56,0,0,1,.76-2.07,22.42,22.42,0,0,0,6-5.35,1.52,1.52,0,0,1,1.92-.57,225.67,225.67,0,0,1,65.77,31.23,2.37,2.37,0,0,1,1.08,1.65,179.32,179.32,0,0,1,3.16,34.33C648.36,317.46,636.73,351.64,613.3,381.71Z", transform: "translate(-278.15 -31.09)" })
      );
    }
  }]);

  return LightningNetwork;
}(_preact2.default.Component);

exports.default = LightningNetwork;

/***/ }),

/***/ "./src/components/icons/scalable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var Scalable = function (_preact$Component) {
  _inherits(Scalable, _preact$Component);

  function Scalable() {
    _classCallCheck(this, Scalable);

    return _possibleConstructorReturn(this, (Scalable.__proto__ || Object.getPrototypeOf(Scalable)).apply(this, arguments));
  }

  _createClass(Scalable, [{
    key: "render",
    value: function render() {
      return _preact2.default.h(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", "class": "icon-scalable", viewBox: "0 0 491.82 519" },
        _preact2.default.h("path", { d: "M350.19,65.25l.2-.46h0a13.57,13.57,0,0,1,7.59-7h0L344.39,19.19h0a53.73,53.73,0,0,0-18.15,11,54.43,54.43,0,0,0-12.49,17.22c-.28.61-.56,1.25-.83,1.88h0l37.27,15.89Zm66.7-49.18H389V56.91h27.93ZM349.12,198H308.78v28.28h40.44Zm0-56.42H308.78v28.28h40.44Zm0-56.43H308.78v28.28h40.44ZM472.5,16H444.57V56.91H472.5ZM687.11,68.85h0V94.74h40.44V70.47a35.47,35.47,0,0,0-.16-4.13,19.66,19.66,0,0,0-.18-2h0ZM528.19,16h-28V56.91h28Zm55.63,0h-28V56.91h28ZM687.29,320.46h40.44v-28.2H687.29Zm0,56.43h40.44v-28.2H687.29Zm-2,16.44h0a4.38,4.38,0,0,1-.28.42,13.35,13.35,0,0,1-8.6,5.88h0L684,439.87h0a53.62,53.62,0,0,0,34.51-23.24c.42-.62.78-1.17,1.1-1.73h0l-34.38-21.49Zm1.94-242.1h40.44V123H687.25Zm0,112.83h40.44v-28.2H687.25Zm0-56.43h40.44v-28.2H687.25ZM513.41,440.8h28V399.91h-28Zm55.63,0H597V399.91H569Zm55.61,0h28V399.91h-28ZM639.43,16H611.5V56.91h27.93Zm42.36,43.55,23.83-33.13h0A53,53,0,0,0,674.09,16h-6.86V56.91h6.82a12.89,12.89,0,0,1,7.8,2.56Zm-249,230.84H280.18a44.66,44.66,0,0,0-44.27,44.91V490.09A44.65,44.65,0,0,0,280.18,535h152.6a44.65,44.65,0,0,0,44.27-44.91V335.26A44.65,44.65,0,0,0,432.78,290.39Zm22.78,199.7a23,23,0,0,1-22.78,23.12H280.18a23,23,0,0,1-22.82-23.13V335.26a23,23,0,0,1,22.82-23h152.6a23,23,0,0,1,22.78,23.1Zm-82.33-59.58H349.16L378,401.22a6.33,6.33,0,0,0,2-5.09,7.93,7.93,0,0,0-2.39-5.12l-5.28-5.28a7.67,7.67,0,0,0-5-2.41,6.14,6.14,0,0,0-5,2l-28.86,29.21V390.15a7.38,7.38,0,0,0-2.16-5.36,7.12,7.12,0,0,0-5.29-2.2h-6.15a7.34,7.34,0,0,0-5.21,2.2,7.64,7.64,0,0,0-2.2,5.32v54.17a7.33,7.33,0,0,0,2.2,5.32,6.82,6.82,0,0,0,5.21,2.2h53.38a7.14,7.14,0,0,0,5.29-2.2,7.29,7.29,0,0,0,2.12-5.32V438a7,7,0,0,0-2.12-5.32,6.82,6.82,0,0,0-5.27-2.17ZM583,261.69a9.91,9.91,0,0,0,7.11-3,10.4,10.4,0,0,0,3-7.27v-74a9.88,9.88,0,0,0-3-7.26,9.26,9.26,0,0,0-7.11-3H510.05a9.74,9.74,0,0,0-7.22,3,9.88,9.88,0,0,0-2.92,7.26v8.52a9.63,9.63,0,0,0,2.92,7.27,9.32,9.32,0,0,0,7.17,3h32.86l-39.42,40.06a8.62,8.62,0,0,0-2.62,6.93,10.81,10.81,0,0,0,3.26,7l7.17,7.26a10.5,10.5,0,0,0,6.89,3.3A8.34,8.34,0,0,0,525,258l39.42-40v33.29a10.09,10.09,0,0,0,3,7.33,9.77,9.77,0,0,0,7.23,3Z", transform: "translate(-235.91 -16)" })
      );
    }
  }]);

  return Scalable;
}(_preact2.default.Component);

exports.default = Scalable;

/***/ }),

/***/ "./src/components/icons/scrolling-chevrons.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

__webpack_require__("./src/components/icons/scrolling-chevrons.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var ScrollingChevrons = function (_preact$Component) {
  _inherits(ScrollingChevrons, _preact$Component);

  function ScrollingChevrons() {
    _classCallCheck(this, ScrollingChevrons);

    return _possibleConstructorReturn(this, (ScrollingChevrons.__proto__ || Object.getPrototypeOf(ScrollingChevrons)).apply(this, arguments));
  }

  _createClass(ScrollingChevrons, [{
    key: 'render',
    value: function render() {
      return _preact2.default.h(
        'div',
        { 'class': 'scrolling-chevrons' },
        _preact2.default.h('div', { 'class': 'chevron' }),
        _preact2.default.h('div', { 'class': 'chevron' }),
        _preact2.default.h('div', { 'class': 'chevron' })
      );
    }
  }]);

  return ScrollingChevrons;
}(_preact2.default.Component);

exports.default = ScrollingChevrons;

/***/ }),

/***/ "./src/components/icons/scrolling-chevrons.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/layout/features/section.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

var _picture = __webpack_require__("./src/components/logo/picture.js");

var _picture2 = _interopRequireDefault(_picture);

var _card = __webpack_require__("./src/components/feature/card.js");

var _card2 = _interopRequireDefault(_card);

var _fastAndSecure = __webpack_require__("./src/components/icons/fast-and-secure.js");

var _fastAndSecure2 = _interopRequireDefault(_fastAndSecure);

var _digit = __webpack_require__("./src/components/icons/digit.js");

var _digit2 = _interopRequireDefault(_digit);

var _atomicSwap = __webpack_require__("./src/components/icons/atomic-swap.js");

var _atomicSwap2 = _interopRequireDefault(_atomicSwap);

var _scalable = __webpack_require__("./src/components/icons/scalable.js");

var _scalable2 = _interopRequireDefault(_scalable);

var _lightningNetwork = __webpack_require__("./src/components/icons/lightning-network.js");

var _lightningNetwork2 = _interopRequireDefault(_lightningNetwork);

__webpack_require__("./src/components/layout/features/styles.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Config = __webpack_require__("Config");

/** @jsx preact.h */

var LayoutFeatures = function (_preact$Component) {
  _inherits(LayoutFeatures, _preact$Component);

  function LayoutFeatures() {
    _classCallCheck(this, LayoutFeatures);

    return _possibleConstructorReturn(this, (LayoutFeatures.__proto__ || Object.getPrototypeOf(LayoutFeatures)).apply(this, arguments));
  }

  _createClass(LayoutFeatures, [{
    key: 'cards',
    value: function cards() {
      var icons = {
        FastAndSecureIcon: _fastAndSecure2.default,
        DigitIcon: _digit2.default,
        AtomicSwapIcon: _atomicSwap2.default,
        ScalableIcon: _scalable2.default,
        LightningNetworkIcon: _lightningNetwork2.default
      };
      return Config.features.map(function (f) {
        var Icon = icons[f.icon];
        return _preact2.default.h(
          'div',
          { 'class': 'column is-narrow rellax', 'data-rellax-speed': '3', 'data-aos': 'fade-up', 'data-aos-easing': 'ease' },
          _preact2.default.h(
            _card2.default,
            { title: f.title, text: f.text },
            _preact2.default.h(Icon, null)
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var cards = this.cards();
      return _preact2.default.h(
        'section',
        { 'class': 'container is-features' },
        _preact2.default.h(
          'div',
          { 'class': 'has-text-centered rellax', 'data-rellax-speed': '3', 'data-aos': 'fade-up', 'data-aos-easing': 'ease', 'data-aos-anchor-placement': 'top-bottom' },
          _preact2.default.h(_picture2.default, { text: 'true' }),
          _preact2.default.h(
            'h3',
            { 'class': 'title is-1 has-text-weight-light' },
            '4 YEARS OF EXPERIENCE ',
            _preact2.default.h(
              'strong',
              null,
              'FEATURES FOR THE FUTURE'
            )
          )
        ),
        _preact2.default.h(
          'div',
          { 'class': 'columns is-centered rellax', 'data-rellax-speed': '4', 'data-aos': 'fade-down', 'data-aos-easing': 'ease', 'data-aos-anchor-placement': 'top-bottom' },
          cards
        )
      );
    }
  }]);

  return LayoutFeatures;
}(_preact2.default.Component);

exports.default = LayoutFeatures;

/***/ }),

/***/ "./src/components/layout/features/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/layout/intro/bg-intro.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bg-intro-c6ab2df3c19caf812938afdf5d1f7f6c.jpg";

/***/ }),

/***/ "./src/components/layout/intro/section.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

var _container = __webpack_require__("./src/components/slider/container.js");

var _container2 = _interopRequireDefault(_container);

var _bar = __webpack_require__("./src/components/nav/bar.js");

var _bar2 = _interopRequireDefault(_bar);

var _scrollingChevrons = __webpack_require__("./src/components/icons/scrolling-chevrons.js");

var _scrollingChevrons2 = _interopRequireDefault(_scrollingChevrons);

__webpack_require__("./src/components/layout/intro/styles.sass");

__webpack_require__("./src/components/layout/intro/bg-intro.jpg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Slider from "./slider"


var Config = __webpack_require__("Config");

/** @jsx preact.h */

var LayoutIntro = function (_preact$Component) {
  _inherits(LayoutIntro, _preact$Component);

  function LayoutIntro() {
    _classCallCheck(this, LayoutIntro);

    return _possibleConstructorReturn(this, (LayoutIntro.__proto__ || Object.getPrototypeOf(LayoutIntro)).apply(this, arguments));
  }

  _createClass(LayoutIntro, [{
    key: 'render',
    value: function render() {
      return _preact2.default.h(
        'section',
        { 'class': 'hero is-fullheight is-intro' },
        _preact2.default.h(
          'div',
          { 'class': 'hero-head' },
          _preact2.default.h(_bar2.default, null)
        ),
        _preact2.default.h(
          'div',
          { 'class': 'hero-body is-paddingless' },
          _preact2.default.h(_container2.default, { config: Config.slider.slides })
        ),
        _preact2.default.h(
          'div',
          { 'class': 'hero-foot', 'data-aos': 'fade-up', 'data-aos-easing': 'ease', 'data-aos-delay': '1600' },
          _preact2.default.h(_scrollingChevrons2.default, null)
        )
      );
    }
  }]);

  return LayoutIntro;
}(_preact2.default.Component);

exports.default = LayoutIntro;

/***/ }),

/***/ "./src/components/layout/intro/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/layout/roadmap/section.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

var _media = __webpack_require__("./src/components/roadmap/media.js");

var _media2 = _interopRequireDefault(_media);

__webpack_require__("./src/components/layout/roadmap/styles.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Config = __webpack_require__("Config");

/** @jsx preact.h */

var LayoutRoadmap = function (_preact$Component) {
  _inherits(LayoutRoadmap, _preact$Component);

  function LayoutRoadmap() {
    _classCallCheck(this, LayoutRoadmap);

    return _possibleConstructorReturn(this, (LayoutRoadmap.__proto__ || Object.getPrototypeOf(LayoutRoadmap)).apply(this, arguments));
  }

  _createClass(LayoutRoadmap, [{
    key: 'medias',
    value: function medias() {
      var icons = {
        // FastAndSecureIcon,
        // DigitIcon,
        // AtomicSwapIcon,
        // ScalableIcon,
        // LightningNetworkIcon
      };
      return Config.roadmap.map(function (r, idx) {
        // const Icon = icons[f.icon];
        return _preact2.default.h(_media2.default, { title: r.title, text: r.text, progress: r.progress });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var medias = this.medias();
      return _preact2.default.h(
        'section',
        { 'class': 'section is-roadmap' },
        _preact2.default.h(
          'div',
          { 'class': 'container' },
          _preact2.default.h(
            'h3',
            { 'class': 'title is-1 has-text-weight-light', 'data-aos': 'fade-up', 'data-aos-easing': 'ease', 'data-aos-anchor-placement': 'top-center' },
            _preact2.default.h(
              'strong',
              null,
              '2018'
            ),
            'FOCUSED ON ',
            _preact2.default.h(
              'strong',
              null,
              'IMPROVING'
            ),
            ' ',
            _preact2.default.h(
              'strong',
              null,
              'PERFORMANCE'
            )
          ),
          _preact2.default.h(
            'div',
            { 'class': 'timeline is-centered' },
            medias
          )
        )
      );
    }
  }]);

  return LayoutRoadmap;
}(_preact2.default.Component);

exports.default = LayoutRoadmap;

/***/ }),

/***/ "./src/components/layout/roadmap/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/logo/picture.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

__webpack_require__("./src/components/logo/styles.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var Picture = function (_preact$Component) {
  _inherits(Picture, _preact$Component);

  function Picture() {
    _classCallCheck(this, Picture);

    return _possibleConstructorReturn(this, (Picture.__proto__ || Object.getPrototypeOf(Picture)).apply(this, arguments));
  }

  _createClass(Picture, [{
    key: 'render',
    value: function render(props, state) {
      var circle = props.circle || false;
      var text = props.text || false;
      return _preact2.default.h(
        'span',
        { 'class': 'has-svg-align' },
        _preact2.default.h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', 'class': 'logo-svg', viewBox: '0 0 1000 1000' },
          circle && _preact2.default.h('path', { 'class': 'logo-svg-circle', d: 'M500 125a374.998 374.998 0 0 1 375 375 374.998 374.998 0 0 1-375 375 374.998 374.998 0 0 1-375-375c-.001-207.107 167.893-375.001 375-375zm0-30C276.324 94.999 94.999 276.324 95 500a404.998 404.998 0 0 0 405 405 404.998 404.998 0 0 0 405-405A404.998 404.998 0 0 0 500 95z' }),
          _preact2.default.h('path', { 'class': 'logo-svg-icon', d: 'M471.875 561.786h56.25L500 628.928zM300 310l50 117.5h-50v50.357h71.354l14.324 33.572H300v50.357h107.031L500 780l92.969-218.214H700V511.43h-85.678l14.324-33.572H700V427.5h-50L700 310h-66.666l-84.115 201.429H450.78L366.666 310z' })
        ),
        text && _preact2.default.h(
          'span',
          { 'class': 'logo-text' },
          'VIACOIN'
        )
      );
    }
  }]);

  return Picture;
}(_preact2.default.Component);

exports.default = Picture;

/***/ }),

/***/ "./src/components/logo/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/nav/bar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

__webpack_require__("./src/components/nav/styles.sass");

var _picture = __webpack_require__("./src/components/logo/picture.js");

var _picture2 = _interopRequireDefault(_picture);

var _hamburger = __webpack_require__("./src/components/icons/hamburger.js");

var _hamburger2 = _interopRequireDefault(_hamburger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var Navbar = function (_preact$Component) {
  _inherits(Navbar, _preact$Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: 'render',
    value: function render() {
      return _preact2.default.h(
        'nav',
        { 'class': 'navbar is-transparent', role: 'navigation', 'aria-label': 'main navigation' },
        _preact2.default.h(
          'div',
          { 'class': 'navbar-brand' },
          _preact2.default.h(
            'a',
            { 'class': 'navbar-item', href: '' },
            _preact2.default.h(_picture2.default, { circle: 'true', text: 'true' })
          ),
          _preact2.default.h(_hamburger2.default, null)
        )
      );
    }
  }]);

  return Navbar;
}(_preact2.default.Component);

exports.default = Navbar;

/***/ }),

/***/ "./src/components/nav/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/particles/background.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

__webpack_require__("./src/components/particles/styles.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var particles = __webpack_require__("./node_modules/particles.js/particles.js");

/** @jsx preact.h */

var ParticlesBackground = function (_preact$Component) {
  _inherits(ParticlesBackground, _preact$Component);

  function ParticlesBackground() {
    _classCallCheck(this, ParticlesBackground);

    return _possibleConstructorReturn(this, (ParticlesBackground.__proto__ || Object.getPrototypeOf(ParticlesBackground)).apply(this, arguments));
  }

  _createClass(ParticlesBackground, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.particles = particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 500,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle"
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 2,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 0.5,
              "size_min": 1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false
          },
          "move": {
            "enable": true,
            "speed": 0.4,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 10000,
              "rotateY": 10000
            }
          }
        },
        "interactivity": {
          "events": {
            "onhover": {
              "enable": false
            }
          }
        },
        "retina_detect": true
      });
    }
  }, {
    key: 'componentDidUnMount',
    value: function componentDidUnMount() {
      this.particles.destroy();
      this.slider = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _preact2.default.h('div', { id: 'particles-js' });
    }
  }]);

  return ParticlesBackground;
}(_preact2.default.Component);

/*
particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":3},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":true,"speed":0.5,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":0.4,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":true,"rotateX":10000,"rotateY":10000}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
*/


exports.default = ParticlesBackground;

/***/ }),

/***/ "./src/components/particles/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/roadmap/media.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

var _circle = __webpack_require__("./src/components/gauge/circle.js");

var _circle2 = _interopRequireDefault(_circle);

__webpack_require__("./src/components/roadmap/styles.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var RoadmapMedia = function (_preact$Component) {
  _inherits(RoadmapMedia, _preact$Component);

  function RoadmapMedia() {
    _classCallCheck(this, RoadmapMedia);

    var _this = _possibleConstructorReturn(this, (RoadmapMedia.__proto__ || Object.getPrototypeOf(RoadmapMedia)).call(this));

    _this.toggleActiveClass = _this.toggleActiveClass.bind(_this);
    _this.activeClassName = "is-active";
    _this.state = {
      activeClass: ""
    };
    return _this;
  }

  _createClass(RoadmapMedia, [{
    key: 'toggleActiveClass',
    value: function toggleActiveClass(e) {
      var currentActiveClass = this.state.activeClass == "" ? this.activeClassName : "";
      // e.target.closest(".columns").querySelectorAll("." + this.activeClassName).forEach(c => {
      //   c.classList.remove(this.activeClassName);
      // });
      this.setState({ activeClass: currentActiveClass });
    }
  }, {
    key: 'notificationColor',
    value: function notificationColor(progress) {
      if (progress <= 30) {
        return "is-danger";
      } else if (progress <= 60) {
        return "is-warning";
      } else if (progress < 100) {
        return "is-info";
      } else {
        return "is-success";
      }
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      var progress = props.progress,
          title = props.title,
          text = props.text;

      var icons = this.props.children[0];
      var colorClass = this.notificationColor(progress);
      var classes = "timeline-item " + colorClass + " " + this.state.activeClass;

      return _preact2.default.h(
        'article',
        { 'class': classes, 'data-aos': 'fade-up', 'data-aos-easing': 'ease', 'data-aos-anchor-placement': 'top-center' },
        _preact2.default.h(
          'div',
          { 'class': 'timeline-marker' },
          _preact2.default.h(_circle2.default, { value: progress, classes: colorClass })
        ),
        _preact2.default.h(
          'div',
          { 'class': 'timeline-content' },
          _preact2.default.h(
            'p',
            { 'class': 'heading' },
            title
          ),
          _preact2.default.h(
            'p',
            null,
            text
          )
        )
      );
    }
  }]);

  return RoadmapMedia;
}(_preact2.default.Component);

exports.default = RoadmapMedia;

/***/ }),

/***/ "./src/components/roadmap/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/components/slider/container.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

var _alloyFinger = __webpack_require__("./node_modules/alloyFinger/alloy_finger.js");

var _alloyFinger2 = _interopRequireDefault(_alloyFinger);

__webpack_require__("./src/components/slider/styles.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @jsx preact.h */

var SliderIntro = function (_preact$Component) {
  _inherits(SliderIntro, _preact$Component);

  function SliderIntro() {
    _classCallCheck(this, SliderIntro);

    var _this = _possibleConstructorReturn(this, (SliderIntro.__proto__ || Object.getPrototypeOf(SliderIntro)).call(this));

    _this.toggleControls = _this.toggleControls.bind(_this);
    _this.next = _this.next.bind(_this);
    _this.previous = _this.previous.bind(_this);
    _this.setSlide = _this.setSlide.bind(_this);
    _this.hiddenClass = "is-hidden";
    _this.af = null;

    _this.state = {
      active: 0,
      slides: null,
      prev: null,
      next: null
    };
    return _this;
  }

  _createClass(SliderIntro, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var slider = document.querySelector(".slider");
      var slides = slider.querySelectorAll(".slide") || [];
      var that = this;
      this.af = new _alloyFinger2.default(slider, {
        swipe: function swipe(evt) {
          if (evt.direction == "Right") {
            that.previous();
          } else {
            that.next();
          }
        }
      });

      if (slides.length > 0) {
        var prev = slider.querySelector(".prev");
        var next = slider.querySelector(".next");

        slides[0].classList.remove(this.hiddenClass);

        this.setState({
          slides: slides,
          prev: prev,
          next: next
        });
      }

      this.toggleControls();
    }
  }, {
    key: 'componentDidUnMount',
    value: function componentDidUnMount() {
      this.af = this.af.destroy();
    }
  }, {
    key: 'setSlide',
    value: function setSlide() {
      var _this2 = this;

      this.state.slides.forEach(function (element, idx) {
        if (_this2.state.active == idx) {
          element.classList.remove(_this2.hiddenClass);
        } else {
          element.classList.add(_this2.hiddenClass);
        }
      });
    }
  }, {
    key: 'next',
    value: function next() {
      if (this.state.active < this.state.slides.length - 1) {
        this.state.active++;
        this.setSlide();
        this.toggleControls();
      }
    }
  }, {
    key: 'previous',
    value: function previous() {
      if (this.state.active > 0) {
        this.state.active--;
        this.setSlide();
        this.toggleControls();
      }
    }
  }, {
    key: 'toggleControls',
    value: function toggleControls() {
      if (this.state.active == 0) {
        this.state.prev.classList.add(this.hiddenClass);
        this.state.next.classList.remove(this.hiddenClass);
      } else if (this.state.active == this.state.slides.length - 1) {
        this.state.prev.classList.remove(this.hiddenClass);
        this.state.next.classList.add(this.hiddenClass);
      } else {
        if (this.state.prev.classList.contains(this.hiddenClass)) {
          this.state.prev.classList.remove(this.hiddenClass);
        }
        if (this.state.next.classList.contains(this.hiddenClass)) {
          this.state.next.classList.remove(this.hiddenClass);
        }
      }
    }
  }, {
    key: 'navigation',
    value: function navigation() {
      return _preact2.default.h('div', { 'class': 'navigation' });
    }
  }, {
    key: 'renderSlides',
    value: function renderSlides(slides) {
      return slides.map(function (slide) {
        return _preact2.default.h('div', { 'class': 'slide is-hidden has-text-centered', dangerouslySetInnerHTML: { __html: slide } });
      });
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      var slides = this.renderSlides(props.config);
      return _preact2.default.h(
        'div',
        { 'class': 'slider' },
        _preact2.default.h(
          'div',
          { 'class': 'container' },
          slides
        ),
        _preact2.default.h(
          'span',
          { 'class': 'prev', onclick: this.previous },
          _preact2.default.h(
            'svg',
            { viewBox: '0 0 50 80' },
            _preact2.default.h('polyline', { fill: 'none', points: '45.63,75.8 0.375,38.087 45.63,0.375 ' })
          )
        ),
        _preact2.default.h(
          'span',
          { 'class': 'next', onclick: this.next },
          _preact2.default.h(
            'svg',
            { viewBox: '0 0 50 80' },
            _preact2.default.h('polyline', { fill: 'none', stroke: '#FFFFFF', 'stroke-width': '1', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', points: '0.375,0.375 45.63,38.087 0.375,75.8 ' })
          )
        )
      );
    }
  }]);

  return SliderIntro;
}(_preact2.default.Component);

exports.default = SliderIntro;

/***/ }),

/***/ "./src/components/slider/styles.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/main.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/viacoin.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("./src/main.sass");

var _preact = __webpack_require__("./node_modules/preact/dist/preact.esm.js");

var _preact2 = _interopRequireDefault(_preact);

var _app = __webpack_require__("./src/components/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx preact.h */

_preact2.default.render(_preact2.default.h(_app2.default, null), document.body);

/***/ }),

/***/ "Config":
/***/ (function(module, exports) {

module.exports = {"slider":{"slides":["<h1 class=\"title is-1 is-spaced has-text-weight-normal has-text-black-ter\">THE <strong>NEXT</strong> GENERATION OF <strong class=\"has-text-weight-semibold\">CRYPTO</strong> <strong>CURRENCY</strong></h1><h2 class=\"subtitle\">Viacoin is an open source crypto-currency created in 2014, derived from the Bitcoin protocol that supports embedded consensus with an <strong>extended OP_RETURN</strong> of <strong>120 byte</strong>.</h2>","<h1 class=\"title is-1 is-spaced has-text-weight-normal has-text-black-ter\">THE <strong>NEXT</strong> GENERATION OF <strong class=\"has-text-weight-semibold\">CRYPTO</strong> <strong>CURRENCY</strong></h1><h2 class=\"subtitle\">Viacoin is an open source crypto-currency created in 2014, derived from the Bitcoin protocol that supports embedded consensus with an <strong>extended OP_RETURN</strong> of <strong>120 byte</strong>.</h2>","<h1 class=\"title is-1 is-spaced has-text-weight-normal has-text-black-ter\">THE <strong>NEXT</strong> GENERATION OF <strong class=\"has-text-weight-semibold\">CRYPTO</strong> <strong>CURRENCY</strong></h1><h2 class=\"subtitle\">Viacoin is an open source crypto-currency created in 2014, derived from the Bitcoin protocol that supports embedded consensus with an <strong>extended OP_RETURN</strong> of <strong>120 byte</strong>.</h2>"]},"features":[{"icon":"FastAndSecureIcon","title":"Fast & Secure","text":"Viacoin is an open source cryptocurrency created in 2014, derived from the Bitcoin protocol that supports embedded consensus with an extended OP_RETURN of 120 byte. Viacoin has a total supply of 23 million coins and a 24 second block time, which means a transaction speed 25x faster than Bitcoin. Other features include a mining difficulty adjustment algorithm called DarkGravityWave, Scrypt Auxpow and Versionbits to allow for 29 simultaneous Soft Fork changes to be implemented at a time"},{"icon":"AtomicSwapIcon","title":"Atomic Swaps","text":"With Viacoin you can perform cross-chain atomic swaps between different cryptocurrencies without using centralized exchanges. Viacoin was the first altcoin to integrate Peter Todd's OP_CHECKLOCKTIMEVERIFY BIP 65 proposal. Our atomic swap contract uses SHA256 secret hashes (instead of RIPEMD160) as it is more secure and has wider compatibility with altcoins."},{"icon":"DigitIcon","title":"Auxiliary Proof-of-Work","text":"Viacoin uses merged mining, allowing a miner to mine for more than one blockchain at the same time. A miner could mine Viacoin and Litecoin or any other Scrypt coin together. Miners have an incentive to mine Viacoin even if the reward is low as they are able to mine any other Scrypt coin simultaneously Viacoin for “free”. This results in a very high network hashrate, which highly increases the network security. As Viacoin mining isn’t driven by large block rewards, this allows Viacoin to have a lower rate of inflation compared to other cryptocurrencies that do not support merged mining."},{"icon":"ScalableIcon","title":"Scalable","text":"Viacoin has adopted SegWit. Segregated Witness helps to shrink the size of a transaction and cope with the UTXO growth. It also aims to increase the per-block transaction throughput by a factor of 2 or 3, while simultaneously making block syncing faster for new nodes. Viacoin will also integrate other features like Schnorr signatures, which will help lowering the transaction size and costs."},{"icon":"LightningNetworkIcon","title":"Lightning Network","text":"Viacoin is ready to use the Lightning Network. This enables improvements of several orders of magnitude in transaction throughput by moving the majority of transactions outside the consensus ledgers into payment channels. This allows millions to billions of transactions per second across the network. A capacity that blows away legacy payment rails."}],"roadmap":[{"progress":90,"title":"TREZOR HARDWARE WALLET SUPPORT","text":"TREZOR is one of the most trusted and secure ways to store your Viacoins. Isolate your private keys into the safety of TREZOR & enjoy Viacoin without risk. The best protection at no cost to your inconvenience.","icons":["WindowsIcon","MacOsIcon","LinuxIcon","ChromeOsIcon","AndroidIcon"]},{"progress":100,"title":"GENERAL BYTES ATM SUPPORT","text":"General Bytes is the leading cryptocurrency hardware manufacturer. They have sold over 1250+ ATMS spread across 40+ countries. Viacoin is now available on all General Bytes ATMs. ","icons":[]},{"progress":100,"title":"VIALECTRUM 3.0.5","text":"Vialectrum is a fast, secure and very easy to use lightweight Viacoin client. Your funds are securely stored and can easily be recovered from any device using a secret phrase. Vialectrum 3.0.5 comes has Bech32 address support, better fee estimation and VialectrumX Tor nodes.","icons":["WindowsIcon","LinuxIcon","AndroidIcon"]},{"progress":90,"title":"LIGHTNING NETWORK DAEMON (LND)","text":"Faster and cheaper than Bitcoin. The Lightning Network Daemon (lnd) is a complete implementation of a Lightning Network node.","icons":[]},{"progress":0,"title":"ZAP LIGHTNING NETWORK WALLET","text":"Trustlessly send and receive viacoins instantly with minimal fees via the Lightning Network. Zap is a free Lightning Network wallet focused on user experience and ease of use, with the overall goal of helping the cryptocurrency community scale Bitcoin and other cryptocurrencies. Currently available for Bitcoin: zap.jackmallers.com.","icons":["WindowsIcon","MacOsIcon","LinuxIcon"]},{"progress":80,"title":"Viacoin Bech32 for Native SegWit addresses","text":"Bech32 addresses are natively SegWit compatible, meaning the transaction doesn’t need extra space to put SegWit in the P2SH address. It also has more advantages like smaller QR codes, stronger protection against typing errors, enables auto completion and only consisting of lower cases. Vialectrum 3.0.5. already supports Bech32 addresses. Ledger and Coinomi are adding Bech32 support soon.","icons":[]},{"progress":20,"title":"VIACOINJ","text":"Viacoin Core alternative implementation in Java. ViacoinJ is a library for working with the Viacoin protocol. It can maintain a wallet, send/receive transactions without needing a local copy of Viacoin Core and has many other advanced features. It’s implemented in Java but can be used from any JVM compatible language.","icons":[]},{"progress":60,"title":"COPAY FOR VIACOIN","text":"Secure your personal funds with multiple signatures, or just one. Take security into your own hands and avoid trusting third parties with your savings. Like a joint-checking account, your Copay wallet can have multiple users. Manage shared funds with friends and coworkers. Share a wallet with your child and introduce them to Viacoin. Copay makes sharing a wallet simple and secure.","icons":["WindowsIcon","MacOsIcon","LinuxIcon","ChromeOsIcon","AndroidIcon","IosIcon","WindowsPhoneIcon"]},{"progress":20,"title":"VIENNAWALLET","text":"Simplicity is Viennawallet's core design principle. As a real standalone Viacoin client, there is no server to get hacked or go down, and by building on iOS's strong security base, Viennawallet is designed to protect you from malware, browser security holes, even physical theft. Buy. Save. Send. Receive. Viennawallet is the simple and secure way to get started with crypto. Send and receive any amount of Viacoin, anywhere in the world, instantly.","icons":["IosIcon"]},{"progress":0,"title":"SAMOURAI MOBILE WALLET FORK FOR VIACOIN","text":"A modern Viacoin wallet hand forged to keep your transactions private, your identity masked, and your funds secure. Currently available for Bitcoin: samouraiwallet.com.","icons":["AndroidIcon"]},{"progress":0,"title":"VIALECTRUM ANDROID WALLET","text":"An Android version of the Vialectrum wallet An iOS version will be released at later stage.","icons":["AndroidIcon"]},{"progress":0,"title":"COLORED COINS","text":"By coloring a Viacoin, it turns into a token Very similar to ’Counterparty’ but there are some key differences. It does not issue an auxiliary coin (e.g Counterparty and Mastercoin). For creating tokens, Viacoin itself need to be 'colored'.","icons":[]},{"progress":0,"title":"RSK SMART CONTRACTS","text":"Ethereum Compatible Smart Contracts. Rootstock is a smart contract platform which has a two-way peg. The idea is to enable it to work with smart contracts. Rootstock runs a turing complete Virtual machine called Rootstock Virtual Machine (which is also compatible with Ethereum virtual machine!) and allows solidity compiled smart contracts to run.","icons":[]},{"progress":30,"title":"STYX ANONYMOUS TRANSACTIONS","text":"Styx is an unlinkable anonymous atomic payment hub for Viacoin. Read our STYX Whitepaper.","icons":[]},{"progress":20,"title":"CHAINSTATE DATABASE RESTRUCTURE","text":"The way the state of a blockchain is stored is also referred to as the ‘chainstate’, which is stored in a dedicated database. In Viacoin Core 0.15 the outputs are stored as a single database entry per output. So if you send Viacoin to several addresses in 1 transaction, every output gets its own database entry. This method requires more disk space being used but it results in 10–20% less CPU usage if one of the outputs is spent at a later time.","icons":[]},{"progress":20,"title":"VALID BLOCK ASSERTION","text":"When setting up a new wallet using Viacoin Core you go through a process called the ‘Initial Block Download’ (IBD). During IBD you download all of the past blocks up until the most recent block. During the download all of the blocks will be checked for the ‘consensus-rules’. Verifying block signatures, which is part of the ‘consensus-rules’, consumes a lot of CPU during IBD. By using ‘assume valid block’ you will skip checking the signatures in all blocks up to the assumed valid block. This causes to significantly speed up the IBD.","icons":[]},{"progress":30,"title":"P2P NETWORK OPTIMIZATION","text":"Concurrency helps creating consistency by locking or freezing parts of a database while they are in use by one transaction. This prevents other transactions from operating on the same information, resulting in a conflict. The concurrency improvements help allow newly-received blocks to be processed ahead of lower-priority traffic, ensuring that blocks are relayed and validated as fast as possible. The refactor also allows network activity to continue in the background during message processing, notably providing an improvement in the ‘Initial Block Download’ (IBD) speed.","icons":[]},{"progress":20,"title":"UXTO MEMPOOL OPTIMIZATION","text":"In Viacoin Core 0.15, unused mempool memory is shared with the UTXO database cache, which increases the number of ‘Unspent Transaction Outputs’ (UTXOs). This results in speeding up the Initial Block Download.","icons":[]},{"progress":20,"title":"BLOCK RELAY IMPROVEMENTS","text":"Relaying Optimization, increasing block propagation speed.","icons":[]},{"progress":25,"title":"SCHNORR SIGNATURES","text":"The successor of Elliptic Curve Digital Signatures. It is a more efficient algorithm than Elliptic Curve Digital Signatures. Schnorr signatures support “native multisig” which enables the aggregation of multiple signatures into a single one valid for the sum of the keys. /batch validation. It could reduce the use of storage & bandwidth by 25% or more.","icons":[]},{"progress":25,"title":"MAST (MERKELIZED ABSTRACT SYNTAX TREES)","text":"Node Interaction with Merkle Trees. M.A.S.T allows Viacoin transaction validation scripts to be stored in partially-hashed form and nodes to interact with the merkle tree. This enables complicated redemption conditions, improves privacy by hiding unexecuted branches & allows inclusion of non-consensus enforced data. MAST allows for complicated smart contracts to be created on the VIA blockchain without clogging it up.","icons":[]},{"progress":20,"title":"NO KEYPOOL REFILL FLUSH","text":"~20x Speedup in creating a new wallet.","icons":[]},{"progress":50,"title":"UPGRADE LEVELDB","text":"Contains hardware acceleration for CRC on architectures supporting SSE 4.2. As a result, synchronization and block validation will be faster.","icons":[]}]};

/***/ })

/******/ });