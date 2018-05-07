Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.raw = true

const fs = require('fs')
const {resolve} = require('path')
const loaderUtils = require('loader-utils')
const _loaderUtils = loaderUtils['__esModule'] ? loaderUtils : {default: loaderUtils}
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

exports.default = function (content) {
  const options = loaderUtils.getOptions(this) || {}
  const hasHash = /\[hash.*?\]/.test(options.name) ? 1 : 0
  const url = _loaderUtils.default.interpolateName(this, options.name, {content, regExp: options.regExp})
  this.emitFile(url, content)
  this.targetFilePath = url
  const webpPath = options.name ? /[\//]/.test(options.name) ? url.match(/.*[\//]/)[0] : './' : './'
  imagemin([this.resourcePath], resolve(options.outputPath, webpPath), {
    use: [imageminWebp({quality: 90})]
  }).then(back => {
    if (hasHash) {
      let webpPath = back[0].path
      const hash = url.match(/\.[^.]+(?=\.(png|jpe?g))/i)[0].substr(1)
      let newPath = webpPath.replace(/\.webp$/g, "." + hash) + '.webp'
      fs.rename(webpPath, newPath)
    }
  })
  return `module.exports = __webpack_public_path__ + ${JSON.stringify(url)}`
}