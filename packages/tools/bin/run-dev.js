#!/usr/bin/env node
const path = require('path')
const nodeModule = require('module')
const getbabelConfig = require('../utils/getbabelConfig')

require('@babel/register')({
  ...getbabelConfig({ isBrowser: false, transformCss: true }),
  // include: ['src', /node_modules/],
  ignore: [/node_modules/],
  cache: false
})

process.argv = ['node', path.resolve('src/server')]

nodeModule.runMain()
