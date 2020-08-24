var path = require('path')
module.exports = {
  entry: {
    apm: path.resolve('./src/index.js')
  },
  output: {
    filename: 'apm-sdk-V1.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: { ie: '9' }
                  // useBuiltIns: 'usage',
                  // corejs: '3'
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
