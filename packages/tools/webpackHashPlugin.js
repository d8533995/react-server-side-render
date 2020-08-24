const fse = require('fs-extra')
const path = require('path')
const { babelOutDir } = require('./configs/outputConfig')

function WebpackHashPlugin (options) {
  this.options = options
};

WebpackHashPlugin.prototype.apply = function (compiler) {
  compiler.hooks.emit.tap('WebpackHashPlugin', (compilation) => {
    // 在功能流程完成后可以调用 webpack 提供的回调函数；
    const entrypoints = Array.from(compilation.entrypoints.entries())
    const appJson = entrypoints.reduce(
      (e, [name, entrypoint]) => Object.assign(e, { [name]: entrypoint.getFiles() }),
      {}
    )
    const styleJson = compilation.chunks.reduce((e, chunk) => {
      if (/.css/.test(chunk.files[0])) {
        Object.assign(e, { [chunk.name]: chunk.files })
      }
      return e
    }, {})
    const json = {
      ...appJson,
      ...styleJson,
      hash: compilation.hash
    }
    fse.outputJsonSync(path.resolve(`./${babelOutDir}/manifest.json`), json)
  })
}

module.exports = WebpackHashPlugin
