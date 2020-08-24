#!/usr/bin/env node

const webpack = require('webpack')
const config = require('../configs/webpackConfig')
const rimraf = require('rimraf')
const { outputPath } = require('../configs/outputConfig')

process.env.NODE_ENV = 'production'

rimraf(outputPath, () => {
  webpack(config).run((err, stats) => {
    if (stats.hasErrors()) {
      console.error(err)
      console.error(stats.toString({
        colors: true,
        chunks: true
      }))
      return
    }
    console.log(stats.toString({
      colors: true,
      chunks: false
    }))
  })
})
