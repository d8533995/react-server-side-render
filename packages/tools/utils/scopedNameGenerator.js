const genericNames = require('generic-names')

const devMode = process.env.NODE_ENV === 'development'

const localIdentName = devMode ? '[name]_[local]-[hash:base64:5]' : '[hash:base64:5]'
function getScopedNameGenerator () {
  return genericNames(localIdentName, {
    context: process.cwd()
  })
}
module.exports = getScopedNameGenerator
