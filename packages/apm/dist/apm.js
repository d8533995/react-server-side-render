!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";t.r(r);var n=[];n[1]={df:["url","http_code","during_ms","size"],ef:["params","response"],dft:{size:"response_size_b"}},n[2]={df:["url"],ef:["params","response"],dft:{}},n[3]={df:["url","reason"],ef:["code"],dft:{reason:"error_no"}},n[4]={df:["step"],ef:["desc"],dft:{step:"error_no"}},n[5]={df:["url","step"],ef:["params"],dft:{step:"error_no"}},n[8]={df:[],dft:{error_name:"error_no",http_code:"http_code",during_ms:"during_ms",url:"url",request_size_b:"request_size_b",response_size_b:"response_size_b"}};var o=n;function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var u=[],f={concat:!1,delay:2e3,maxError:5,sampling:1},s={SCRIPT:2,LINK:3,IMG:4,AUDIO:5,VIDEO:6,PROMISE:9};function d(e){f=a(a({},f),e),window.addEventListener("error",(function(e){var r=e.target;r!==window&&r.nodeName&&s[r.nodeName.toUpperCase()]?l(function(e){return{type:s[e.nodeName.toUpperCase()],desc:e.baseURI+"@"+(e.src||e.href),stack:"no stack"}}(r)):l(function(e,r,t,n,o){return{type:1,desc:e+" at "+r+":"+t+":"+n,stack:o&&o.stack?o.stack:"no stack"}}(e.message,e.filename,e.lineno,e.colno,e.error))}),!0),window.addEventListener("unhandledrejection",(function(e){l({desc:e.reason.message,stack:e.reason.stack,type:s.PROMISE})}),!0)}function l(e){f.concat?function(e){p(f.sampling)&&u.length<f.maxError&&u.push(e)}(e):!p(f.sampling)||f.report([e])}function p(e){return Math.random()<(e||1)}function O(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function b(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?O(Object(t),!0).forEach((function(r){y(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function y(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function m(e,r){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,r){if(!e)return;if("string"==typeof e)return _(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return _(e,r)}(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return a=e.done,e},e:function(e){c=!0,i=e},f:function(){try{a||null==t.return||t.return()}finally{if(c)throw i}}}}function _(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var g={target:"http://localhost:63457",pid:""},v={1:"JS_RUNTIME_ERROR",2:"SCRIPT_LOAD_ERROR",3:"CSS_LOAD_ERROR",4:"IMAGE_LOAD_ERROR",5:"AUDIO_LOAD_ERROR",6:"VIDEO_LOAD_ERROR",7:"CONSOLE_ERROR",8:"TRY_CATCH_ERROR",9:"PROMISE_ERROR"},w=function(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=m(r);try{for(t.s();!(e=t.n()).done;){var n=e.value,o=n.type,i=n.desc,a=n.stack,c="页面报错_"+v[o],u=window.location;j("error",7,{error_no:c,url:"".concat(u.host).concat(u.pathname)},{desc:i,stack:a})}}catch(e){t.e(e)}finally{t.f()}};j.init=function(e){g=b(b({},g),e),d({report:w}),window.addEventListener("load",(function(){var e=window.performance;e?j("perf",20001,b(b({},e.timing.toJSON()),{},{url:"".concat(window.location.host).concat(window.location.pathname)})):console.log("你的浏览器不支持 performance 接口")}));var r=Date.now();window.addEventListener("beforeunload",(function(){var e={duration_ms:Date.now()-r};j.product(10001,{duration_ms:e})}))};var h=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t={error_no:"",http_code:"",during_ms:"",url:"",request_size_b:"",response_size_b:""},n=o[e];if(n){var i=b({},t),a=Object.keys(r);return a.forEach((function(e){var t=n.dft[e];t?(i[t]=r[e],delete r[e]):i[e]=r[e]})),i}return r};function j(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1?arguments[1]:void 0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o={type:e,code:r,detail:h(r,t),extra:n,common:{pid:g.pid,timestamp:Date.now(),page_type:window.location.href}},i=new window.Image;i.src="".concat(g.target,"/monitor?d=").concat(encodeURIComponent(JSON.stringify(o)))}j.product=function(e,r,t){return j("product",e,r,t)},j.error=function(e,r,t){return j("error",e,r,t)},j.info=function(e,r,t){return j("info",e,r,t)},"undefined"!=typeof window&&(window.dt=j)}]);