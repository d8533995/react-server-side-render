const path = require('path')
const { publicPath, outputPath } = require('./getOutputConfig')

module.exports = function () {
  const manifestPath = publicPath + path.resolve(path.join(outputPath, 'manifest.json'))
  let manifest = {}
  try {
    manifest = require(manifestPath)
  } catch (e) {
    console.log(e)
  }
  return manifest
}
