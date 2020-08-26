#!/usr/bin/env node
process.env.NODE_ENV = 'development'

const { program } = require('commander')
const webpack = require('webpack')
const config = require('../configs/webpackConfig')
const rimraf = require('rimraf')
const { outputPath } = require('../configs/outputConfig')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

program.option('-R --report', 'webpack-bundle-analyzer')
program.parse(process.argv)
if (program.report) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

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
