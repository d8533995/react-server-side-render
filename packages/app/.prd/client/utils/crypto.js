"use strict";

var _sha = _interopRequireDefault(require("crypto-js/sha1"));

var _encBase = _interopRequireDefault(require("crypto-js/enc-base64"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 密码加密
var hash = (0, _sha.default)('1');
console.log(hash.toString(_encBase.default)); // 请求加密
// var hash1 = window.HmacSHA1('1', '123')
// console.log(hash.toString(window.enc.Base64))