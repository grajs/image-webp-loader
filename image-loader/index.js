Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.raw = true
exports.default = loader

var loaderUtils = require('loader-utils')
var schemaUtils = require('schema-utils')
var _loaderUtils2 = _interopRequireDefault(loaderUtils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function loader(content) {
  var options = loaderUtils.getOptions(this) || {}

  // 获取hash
  console.log(loaderUtils.getHashDigest(content) + '-----------------')

  var url = _loaderUtils2.default.interpolateName(this, options.name, {
    content,
    regExp: options.regExp
  })


  this.emitFile(url, content)

  return `module.exports = __webpack_public_path__ + ${JSON.stringify(url)}`
}