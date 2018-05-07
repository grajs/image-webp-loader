Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.raw = undefined
exports.default = loader

var loaderUtils = require('loader-utils')
var schemaUtils = require('schema-utils')


function loader(source) {
  var options = loaderUtils.getOptions(this) || {}
  source += 'ljh'
  return `module.exports = ${JSON.stringify(source)}`
}