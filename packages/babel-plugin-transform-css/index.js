const path = require('path')
const postcss = require('postcss')
const Scope = require('postcss-modules-scope')
const LocalByDefault = require('postcss-modules-local-by-default')
const ExtractImports = require('postcss-modules-extract-imports')
const Values = require('postcss-modules-values')
const ResolveImports = require('postcss-modules-resolve-imports')

const { readFileSync } = require('fs')

module.exports = function babelPlugin (babel, opts) {
  const { types: t } = babel
  const {
    extensions, generateScopedName, keepImport
  } = opts

  function buildClassNameToScopeNameMap (tokens) {
    /* eslint-disable new-cap */
    return t.ObjectExpression(Object.keys(tokens).map(token => t.ObjectProperty(t.StringLiteral(token), t.StringLiteral(tokens[token]))))
  }

  return {
    visitor: {
      ImportDefaultSpecifier (nodePath, { file }) {
        const { value } = nodePath.parent.source
        if (extensions.indexOf(path.extname(value)) > -1) {
          const filename = path.resolve(path.dirname(file.opts.filename), value)
          const css = readFileSync(filename, 'utf8')
          const plugins = [].concat(
            new Values(),
            new LocalByDefault(),
            new ExtractImports(),
            new Scope({ generateScopedName }),
            new ResolveImports({ resolve: extensions }) // 同步输出插件
          )
          const runner = postcss(plugins)
          const lazyResult = runner.process(css, { from: filename })
          const tokens = lazyResult.root.exports || {} // 由resolveImport提供
          const varDeclaration = t.variableDeclaration('const', [t.variableDeclarator(nodePath.node.local, buildClassNameToScopeNameMap(tokens))])
          nodePath.parentPath.insertBefore(varDeclaration)
          if (keepImport) {
            nodePath.parentPath.node.specifiers = []
          } else {
            nodePath.parentPath.remove()
          }
        }
      }
    }
  }
}
