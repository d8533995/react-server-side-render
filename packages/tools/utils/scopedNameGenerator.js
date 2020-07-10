const genericNames = require('generic-names')

function getScopedNameGenerator () {
  return genericNames('[hash:base64:5]', {
    context: process.cwd()
  })
}

module.exports = getScopedNameGenerator
