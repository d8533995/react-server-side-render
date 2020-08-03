import SHA1 from 'crypto-js/sha1'
import Base64 from 'crypto-js/enc-base64'

// 密码加密
var hash = SHA1('1')
console.log(hash.toString(Base64))

// 请求加密
// var hash1 = window.HmacSHA1('1', '123')
// console.log(hash.toString(window.enc.Base64))
