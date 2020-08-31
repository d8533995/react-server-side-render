import gatewayRequest from '@fdd/gateway-request'
// import Axios from 'axios'

if (typeof window !== 'undefined') {
  gatewayRequest.init({
    secret: {
      secretId: 'I4qZ1zeSFbDa2j4y9P4n',
      secretKey: 'SiqYIQHJayVxj2rgdg9u8VHeQxTd1Tnm',
      userSpace: 'bp'
    },
    env: 'production'
  })
}

export default function gwRequest ({
  path, method, json, qs
}) {
  // return Axios({
  //   method,
  //   url: `http://127.0.0.1:63457${path}`,
  //   data: json,
  //   params: qs
  // })
  return gatewayRequest({
    host: 'web.monitor.ip.fdd',
    url: path,
    method,
    json,
    qs
  })
}
