"use strict";

window.define('hello', function (require, exports, module) {
  requestIdleCallback(() => {
    console.log('空闲1');
  });
  setTimeout(() => {
    console.log('timeout');
  });
  requestAnimationFrame(() => {
    console.log('2');
  });
  exports.a = 1;
});