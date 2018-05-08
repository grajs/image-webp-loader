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
  const self = this
  const options = loaderUtils.getOptions(this) || {}
  options.name = options.name ? options.name : '[name].[hash].[ext]'
  options.publicPath = options.publicPath ? options.publicPath : ''
  options.outputPath = options.outputPath ? options.outputPath : resolve(__dirname, '../../dist')
  options.quality = options.quality ? options.quality : 100
  options.requestType = options.requestType ? options.requestType : false
  const url = _loaderUtils.default.interpolateName(this, options.name, {content, regExp: options.regExp})
  const fileName = this.resourcePath.replace(/.*[/\\]/, '')
  this.emitFile(url, content)
  const matchSubQuality = () => {
    let back = false
    if (typeof options.subQuality === 'object') {
      if (options.subQuality[fileName]) {
        back = options.subQuality[fileName]
      }
    }
    return back
  }
  const webpPath = options.name ? /\//.test(options.name) ? url.match(/.*\//)[0] : './' : './'
  imagemin([this.resourcePath], resolve(options.outputPath, webpPath), {
    use: [imageminWebp({
      quality: matchSubQuality() ? matchSubQuality() : options.quality,
      method: 6
    })]
  }).then(back => {
    let webpPath = back[0].path
    // Check whether the conversion is successful
    if (/\.webp$/.test(webpPath)) {
      const newPath = resolve(options.outputPath, url.replace(/\.(png|jpe?g)$/i, '.webp'))
      fs.rename(webpPath, newPath, error => error && console.log(error))
    } else {
      fs.unlink(webpPath, error => error && console.log(error))
      console.log('\n')
      console.log('\x1B[46m%s\x1b[49m', fileName + " to webp fail,try to adjust the quality attribute or add subQuality attribute")
    }
  })
  let publicPath = url
  if (options.publicPath && options.publicPath.trim() !== '') {
    if (/\/$/.test(options.publicPath)) {
      publicPath = options.publicPath + publicPath
    } else {
      publicPath = options.publicPath + '/' + publicPath
    }
  }
  if (options.requestType) {
    publicPath = publicPath.replace(/\.(webp|png|jpe?g)/i, '.' + options.requestType)
  }
  return `module.exports = __webpack_public_path__ + ${JSON.stringify(publicPath)};`
}