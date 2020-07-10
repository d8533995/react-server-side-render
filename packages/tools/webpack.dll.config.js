var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    dll: ['react', 'react-dom', 'prop-types', 'core-js', 'regenerator-runtime']
  },
  output: {
    path: path.resolve(__dirname, './dll'),
    filename: '[name]_[hash].dll.js',
    library: '[name]_[hash]'
  },
  mode: 'production',
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, './dll/[name]_manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
