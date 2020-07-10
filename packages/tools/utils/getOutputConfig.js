const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: devMode ? '' : '',
  outputPath: 'dist/public',
  outputFileName: '[name].[ext]?[hash:base64:5]'
}
