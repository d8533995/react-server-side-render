#!/usr/bin/env node

const webpack = require('webpack')
const config = require('../configs/DllWebpackConfig')

webpack(config).run((err, stats) => {
  if (stats.hasErrors()) {
    console.error(err)
    console.error(stats.toString({
      colors: true,
      chunks: true
    }))
  }
  console.log(stats.toString({
    colors: true,
    chunks: false
  }))
})
