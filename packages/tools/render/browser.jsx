
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import PathToRegex from 'path-to-regex'

function Loading () {
  return <div>loading</div>
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

export default function getRender ({ App, routes, reducers }) {
  return function (el) {
    const result = routes.find(i => {
      const parser = new PathToRegex(i.path)
      return parser.match(window.location.pathname)
    })
    const store = createStore(combineReducers(reducers), preloadedState)
    result.component().then(() => {
      ReactDOM.hydrate((
        <App>
          <Provider store={store}>
            <BrowserRouter>
              <Switch>
                {routes.map(i => {
                  const Component = Loadable({ loader: i.component, loading: Loading })
                  return <Route path={i.path} key={i.path}><Component /></Route>
                })}
              </Switch>
            </BrowserRouter>
          </Provider>
        </App>
      ), el)
    })
  }
}
