#!/usr/bin/env node
const path = require('path')
const nodeModule = require('module')
const getbabelConfig = require('../utils/getbabelConfig')

require('@babel/register')({
  ...getbabelConfig({ isBrowser: false, transformCss: true }),
  ignore: [/node_modules/],
  cache: false
})

process.argv = ['nodemon', path.resolve('src/server')]

nodeModule.runMain()
