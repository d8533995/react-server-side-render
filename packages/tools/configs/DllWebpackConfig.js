var path = require('path')
var webpack = require('webpack')
const { dllOutputPath } = require('./outputConfig')

module.exports = {
  entry: {
    dll: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'regenerator-runtime/runtime',
      'moment'
    ]
  },
  output: {
    path: dllOutputPath,
    filename: '[name]_[hash].dll.js',
    library: '[name]_[hash]'
  },
  mode: 'production',
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new webpack.DllPlugin({
      path: path.join(dllOutputPath, '[name]_manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
