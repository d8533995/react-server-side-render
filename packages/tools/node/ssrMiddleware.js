const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../configs/webpackConfig')
const { outputPath, publicPath, babelOutDir } = require('../configs/outputConfig')
const PathToRegex = require('path-to-regex')
const serverRender = require('./render')
const getManifest = require('../utils/getManifest')

const isDev = process.env.NODE_ENV === 'development'

exports.ssr = function (app) {
  const routes = require(path.resolve(path.join(isDev ? 'src' : babelOutDir, './client/routes'))).default
  if (isDev) {
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {
      open: true,
      stats: {
        colors: true
      }
    }))
  }

  app.use(express.static(outputPath.replace('[hash]', ''), {
    maxAge: '1d'
  }))

  app.use(express.static(path.resolve('dll'), {
    maxAge: '1d'
  }))

  app.get('*', async (req, res, next) => {
    try {
      const result = routes.find(i => {
        const parser = new PathToRegex(i.path)
        return parser.match(req.path)
      })
      if (result) {
        const component = await result.component()
        const { html, state } = await serverRender(component.default)
        const manifest = getManifest()
        const commonPath = publicPath.replace('[hash]', manifest.hash)
        res.render('index', {
          ...(state.html || { title: '', meta: null }),
          html,
          state: JSON.stringify(state).replace(/</g, '\\u003c'), // prevent xss
          dll: `/${require(path.resolve('dll/dll_manifest.json')).name}.dll.js`,
          app: `${commonPath}${manifest.app[0]}`,
          css: `${commonPath}${manifest.styles[0]}`,
          stylejs: `${commonPath}${manifest.styles[1]}`
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
