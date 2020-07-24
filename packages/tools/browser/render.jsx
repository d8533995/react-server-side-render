
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
    result.component().then((data) => {
      ReactDOM.hydrate((
        <App>
          <Provider store={store}>
            <BrowserRouter>
              <Switch>
                {routes.map(i => {
                  if (result === i) {
                    const Component = data.default
                    return <Route path={i.path} key={i.path}><Component /></Route>
                  } else {
                    const Component = React.lazy(i.component)
                    return (
                      <Route path={i.path} key={i.path} >
                        <Suspense fallback={<Loading />}>
                          <Component />
                        </Suspense>
                      </Route>
                    )
                  }
                })}
              </Switch>
            </BrowserRouter>
          </Provider>
        </App>
      ), el)
    })
  }
}
