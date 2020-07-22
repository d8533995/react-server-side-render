import gatewayRequest from '@fdd/gateway-request'

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
