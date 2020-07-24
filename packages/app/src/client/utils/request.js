import gatewayRequest from '@fdd/gateway-request'

if (typeof window !== 'undefined') {
  gatewayRequest.init({
    secret: {
      secretId: 'I4qZ1zeSFbDa2j4y9P4n',
      secretKey: 'SiqYIQHJayVxj2rgdg9u8VHeQxTd1Tnm',
      userSpace: 'bp'
    },
    env: 'staging'
  })
}

export default function gwRequest ({
  path, method, json, qs
}) {
  return gatewayRequest({
    host: 'web.monitor.ip.fdd',
    url: path,
    method,
    json,
    qs
  })
}
