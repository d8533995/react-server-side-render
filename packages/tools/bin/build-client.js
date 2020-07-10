#!/usr/bin/env node

const webpack = require('webpack')
const config = require('../webpack.config')

webpack(config).run((err, stats) => {
  if (stats.hasErrors()) {
    console.error(err)
    console.error(stats.toString({
      // Add console colors
      colors: process.env.NODE_ENV !== 'production',
      chunks: true
    }))
  }
})
