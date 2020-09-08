"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gwRequest;

var _gatewayRequest = _interopRequireDefault(require("@fdd/gateway-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Axios from 'axios'
if (typeof window !== 'undefined') {
  _gatewayRequest.default.init({
    secret: {
      secretId: 'I4qZ1zeSFbDa2j4y9P4n',
      secretKey: 'SiqYIQHJayVxj2rgdg9u8VHeQxTd1Tnm',
      userSpace: 'bp'
    },
    env: 'production'
  });
}

function gwRequest({
  path,
  method,
  json,
  qs
}) {
  // return Axios({
  //   method,
  //   url: `http://127.0.0.1:63457${path}`,
  //   data: json,
  //   params: qs
  // })
  return (0, _gatewayRequest.default)({
    host: 'web.monitor.ip.fdd',
    url: path,
    method,
    json,
    qs
  });
}