import getRender from '@my/tools/render/browser' // 一定要放在顶部
import React from 'react'
import Axios from 'axios'
import routes from './routes'
import reducers from './reducers'
import 'antd/dist/antd.css'

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
