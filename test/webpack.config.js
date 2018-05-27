const {resolve} = require('path')
module.exports = {
  entry: {
    bundle: resolve(__dirname, './main')
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: resolve(__dirname, '../'),
            options: {
              outputPath: resolve(__dirname, './dist'),
              name: 'images/[name].[hash].[ext]',
              quality: 100,
              subQuality: {
                'index-back.jpg': 83
              },
              // copy: false,
              requestType: 'image'
            }
          }
        ]
      }
    ]
  }
}
