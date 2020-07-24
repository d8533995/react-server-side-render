#!/usr/bin/env node

const webpack = require('webpack')
const config = require('../configs/webpackConfig')

webpack(config).run((err, stats) => {
  if (stats.hasErrors()) {
    console.error(err)
    console.error(stats.toString({
      // Add console colors
      colors: true,
      chunks: true
    }))
  }
})
