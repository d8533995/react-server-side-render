import getRender from '@my/tools/render/browser' // 一定要放在顶部
import React from 'react'
import routes from './routes'
import reducers from './reducers'
import './utils/apm'

class App extends React.Component {
  componentDidCatch (error, info) {
    const img = document.createElement('img')
    img.src = `/error?errorStack=${error.stack.toString()}`
  }

  componentDidMount () {
    Promise.reject(Error('错误'))
  }

  render () {
    return this.props.children
  }
}
const render = getRender({ App, routes, reducers })
render(document.getElementById('1'))
