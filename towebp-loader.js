var imagemin = require('imagemin');
var imageminWebp = require('imagemin-webp');
var loaderUtils = require('loader-utils');
var mime = require("mime");

module.exports = function(content) {
  this.cacheable && this.cacheable();
  if (!this.emitFile) throw new Error("emitFile is required from module system");

  var callback = this.async();
  var called = false;

  var query = loaderUtils.getOptions(this);
  // save file path  as source file hash
  var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
    content: content,
    regExp: query.regExp
  });
  var webpUrl = url.substring(0, url.lastIndexOf('.')) + '.webp';

  if (query.limit) {
    limit = parseInt(query.limit, 10);
  }
  var mimetype = query.mimetype || query.minetype || mime.lookup(this.resourcePath);
  if (limit <= 0 || content.length < limit) {
    callback(null, "module.exports = " + JSON.stringify("data:" + (mimetype ? mimetype + ";" : "") + "base64," + content.toString("base64")));
  }

  var options = {
    preset: query.preset || 'default',
    quality: query.quality || 75,
    alphaQuality: query.alphaQuality || 100,
    method: query.method || 1,
    sns: query.sns || 80,
    autoFilter: query.autoFilter || false,
    sharpness: query.sharpness || 0,
    lossless: query.lossless || false,
    bypassOnDebug: query.bypassOnDebug || false,
  };

  if (query.size) {
    options.size = query.size;
  }

  if (query.filter) {
    options.filter = query.filter;
  }

  if (this.debug === true && options.bypassOnDebug === true) {
    callback(null, "module.exports = __webpack_public_path__ + " + JSON.stringify(url) + ";");
  } else {
    imagemin.buffer(content, { plugins: [imageminWebp(options)] }).then(file => {
      this.emitFile(url, content);
      this.emitFile(webpUrl, file);
      callback(null, "module.exports = __webpack_public_path__ + " + JSON.stringify(url) + ";");
    }).catch(err => {
      callback(err);
    });
  }
};

module.exports.raw = true;