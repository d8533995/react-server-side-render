import getRender from '@my/tools/render/browser' // 一定要放在顶部
import log from '@my/apm/src/index'
import gwRequest from '@fdd/gateway-request'
import React from 'react'
import Axios from 'axios'
import routes from './routes'
import reducers from './reducers'

gwRequest.init({
  secret: {
    secretId: 'I4qZ1zeSFbDa2j4y9P4n',
    secretKey: 'SiqYIQHJayVxj2rgdg9u8VHeQxTd1Tnm',
    userSpace: 'bp'
  },
  env: 'staging'
})

log.init({
  pid: 'hello_fee',
  target: 'http://localhost:63457'
})

Axios.defaults.withCredentials = true

class App extends React.Component {
  componentDidMount () {
    // Promise.reject(Error('错误'))
  }

  render () {
    return this.props.children
  }
}
const render = getRender({ App, routes, reducers })
render(document.getElementById('1'))
