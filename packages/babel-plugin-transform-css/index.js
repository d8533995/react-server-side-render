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
      ImportDeclaration (nodePath, { filename }) {
        const { node } = nodePath
        const { value } = node.source
        if (extensions.indexOf(path.extname(value)) > -1) {
          if (node.specifiers && node.specifiers.length && node.specifiers[0].type === 'ImportDefaultSpecifier') {
            const local = node.specifiers[0].local
            const sourcePath = path.join(path.dirname(filename), value)
            const css = readFileSync(sourcePath, 'utf8')
            const plugins = [
              new Values(),
              new LocalByDefault(),
              new ExtractImports(),
              new Scope({ generateScopedName }),
              new ResolveImports({ resolve: extensions }) // 同步输出插件
            ]
            const runner = postcss(plugins)
            const lazyResult = runner.process(css, { from: sourcePath })
            const tokens = lazyResult.root.exports || {} // 由resolveImport提供
            const varDeclaration = t.variableDeclaration('const', [t.variableDeclarator(local, buildClassNameToScopeNameMap(tokens))])
            nodePath.insertBefore(varDeclaration)
          }
          if (keepImport) {
            node.specifiers = []
          } else {
            nodePath.remove()
          }
        }
      }
    }
  }
}
