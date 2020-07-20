const path = require('path')
const express = require('express')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')
const { outputPath, publicPath } = require('./utils/getOutputConfig')
const PathToRegex = require('path-to-regex')
const serverRender = require('./render/server')
const getManifest = require('./utils/getManifest')

const isDev = process.env.NODE_ENV !== 'production'

exports.ssr = function (app) {
  const routes = require(path.resolve(path.join(isDev ? 'src' : 'dist', './client/routes'))).default
  if (isDev) {
    app.use(middleware(
      webpack({
        ...webpackConfig
      }),
      {}
    ))
  }
  app.use(express.static(path.resolve(outputPath), {
    maxAge: '1d'
  }))
  app.use(express.static(path.resolve('dll'), {
    maxAge: '1d'
  }))

  app.get('*', async (req, res, next) => {
    console.log(req.path)
    try {
      const result = routes.find(i => {
        const parser = new PathToRegex(i.path)
        return parser.match(req.path)
      })
      if (result) {
        const component = await result.component()
        if (!global.manifest) {
          global.manifest = getManifest()
        }
        const { html, state } = await serverRender(component.default)
        res.render('index', {
          ...(state.html || { title: '', meta: null }),
          html,
          state: JSON.stringify(state).replace(/</g, '\\u003c'), // prevent xss
          dll: publicPath + require(path.resolve('dll/dll_manifest.json')).name + '.dll.js',
          app: publicPath + (global.manifest['app.js'] || ''),
          css: publicPath + (global.manifest['styles.css'] || ''),
          stylejs: publicPath + (global.manifest['styles.js'] || '')
        })
      } else {
        res.status(404).end('404')
      }
    } catch (e) {
      console.error(e)
      next()
    }
  })
}
