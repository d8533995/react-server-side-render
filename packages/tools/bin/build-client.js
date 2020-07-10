#!/usr/bin/env node

const webpack = require('webpack')
const config = require('../webpack.config')

webpack(config).run((err, stats) => {
  console.error(err)
  if (stats.hasErrors()) {
    console.error(stats.toString({
      // Add console colors
      colors: process.env.NODE_ENV !== 'production',
      chunks: true
    }))
  }
})
