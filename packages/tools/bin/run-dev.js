#!/usr/bin/env node
process.env.NODE_ENV = 'development'

const path = require('path')
const babelConfig = require('../configs/babelConfig')

require('@babel/register')({
  ...babelConfig({ isBrowser: false }),
  ignore: [/node_modules/],
  cache: true
})

require(path.resolve('src/server'))
