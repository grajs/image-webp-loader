Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.raw = true

const fs = require('fs-extra')
const {resolve} = require('path')
const loaderUtils = require('loader-utils')
const _loaderUtils = loaderUtils['__esModule'] ? loaderUtils : {default: loaderUtils}
const sharp = require('sharp')

exports.default = function (content) {
  // set default option
  const options = loaderUtils.getOptions(this) || {}
  options.name = options.name ? options.name : '[name].[ext]'
  options.publicPath = options.publicPath ? options.publicPath : '/'
  options.outputPath = options.outputPath ? options.outputPath : resolve(__dirname, '../../dist')
  options.quality = options.quality ? options.quality : 100

  const imageUrl = _loaderUtils.default.interpolateName(this, options.name, {content, regExp: options.regExp})
  this.emitFile(imageUrl, content)

  const webpUrl = imageUrl.replace(/[^.]+$/, 'webp')
  const webpPath = resolve(options.outputPath, webpUrl)


  fs.ensureDir(webpPath.replace(/\\[^\\]+$/, '')).then(() => {
    sharp(this.resourcePath).webp({alphaQuality: options.quality}).toFile(webpPath, err => {
      if (err) {
        throw err
      }
    })
  })

  return `module.exports = __webpack_public_path__ + ${ JSON.stringify(options.publicPath + (options.requestWebp ? webpUrl : imageUrl))};`
}