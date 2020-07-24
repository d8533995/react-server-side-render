import getRender from '@my/tools/browser/render' // 一定要放在顶部
import log from '@my/apm/src/index'
import React from 'react'
import Axios from 'axios'
import routes from './routes'
import reducers from './reducers'

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
