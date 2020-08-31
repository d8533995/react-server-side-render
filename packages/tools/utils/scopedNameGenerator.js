const genericNames = require('generic-names')

const devMode = process.env.NODE_ENV === 'development'

function getScopedNameGenerator () {
  const localIdentName = devMode ? '[name]_[local]-[hash:base64:5]' : '[hash:base64:5]'
  return genericNames(localIdentName)
}
module.exports = getScopedNameGenerator
