const path = require('path')
const babelConfig = require('../configs/babelConfig')

require('@babel/register')({
  ...babelConfig({ isBrowser: false, transformCss: true }),
  // include: ['src', /node_modules/],
  ignore: [/node_modules/],
  cache: true
})

require(path.resolve('src/server'))
