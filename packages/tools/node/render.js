const path = require('path')
const React = require('react')
const { Provider } = require('react-redux')
const ReactDOM = require('react-dom/server')
const { StaticRouter } = require('react-router')
const { createStore, combineReducers } = require('redux')
const { babelOutDir } = require('../configs/outputConfig')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = async function serverRender (component) {
  const reducers = require(path.resolve(path.join(isDev ? 'src' : babelOutDir, './client/reducers'))).default
  const store = createStore(combineReducers(reducers))
  if (typeof component.inistallData === 'function') {
    await component.inistallData(store.dispatch)
  }
  const state = store.getState()
  const SSR = React.createElement(Provider, { store },
    React.createElement(StaticRouter, {},
      React.createElement(component)))
  const html = ReactDOM.renderToString(SSR)
  return {
    html,
    state
  }
}
