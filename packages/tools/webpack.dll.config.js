var path = require('path')
var webpack = require('webpack')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    dll: [
      'react',
      'react-dom',
      'prop-types',
      'core-js/stable',
      'regenerator-runtime/runtime',
      'moment'
    ]
  },
  output: {
    path: path.resolve('dll'),
    filename: '[name]_[hash].dll.js',
    library: '[name]_[hash]'
  },
  mode: devMode ? 'development' : 'production',
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve('dll/[name]_manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
