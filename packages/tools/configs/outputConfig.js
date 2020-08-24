const path = require('path')
const devMode = process.env.NODE_ENV === 'development'

const CDNPath = 'http://localhost:8080'

module.exports = {
  publicPath: devMode ? '/' : `${CDNPath}/[hash]/`,
  outputPath: path.resolve('./dist' + (devMode ? '' : '/[hash]')),
  outputFileName: '[name].js',
  babelOutDir: '.prd',
  dllOutputPath: path.resolve('dll')
}
