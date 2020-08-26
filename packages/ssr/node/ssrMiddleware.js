const path = require('path')
const express = require('express')
const webpack = require('webpack')
const { match } = require('path-to-regexp')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('@my/tools/configs/webpackConfig')
const { outputPath, publicPath, babelOutDir } = require('@my/tools/configs/outputConfig')
const getManifest = require('@my/tools/utils/getManifest')

const serverRender = require('./render')

const isDev = process.env.NODE_ENV === 'development'

module.exports = function (app) {
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
      let matchParams
      const result = routes.find(i => {
        const matchInstance = match(i.path)
        const isMatch = matchInstance(req.path)
        if (isMatch) {
          matchParams = isMatch.params
          return true
        }
      })

      if (result) {
        const component = await result.component()
        const { html, state } = await serverRender(component.default, matchParams)
        const manifest = getManifest()
        const commonPath = publicPath.replace('[hash]', manifest.hash)
        res.render('index', {
          ...(state.html || { title: '', meta: null }),
          html,
          state: JSON.stringify(state).replace(/</g, '\\u003c'), // prevent xss
          dll: `/${require(path.resolve('dll/dll_manifest.json')).name}.dll.js`,
          app: `${commonPath}app.js`,
          css: `${commonPath}styles.css`,
          stylejs: `${commonPath}styles.js`
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
