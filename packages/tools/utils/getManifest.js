const path = require('path')
const { babelOutDir } = require('../configs/outputConfig')

module.exports = function () {
  const manifestPath = path.resolve(`${babelOutDir}/manifest.json`)

  let manifest = {}
  try {
    manifest = require(manifestPath)
  } catch (e) {
    console.log(e)
  }
  return manifest
}
