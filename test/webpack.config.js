const {resolve} = require('path')

module.exports = {
  entry: {
    bundle: resolve(__dirname, './main')
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.png/i,
        use: [
          {
            loader: resolve(__dirname, '../'),
            options: {
              outputPath: resolve(__dirname, './dist'),
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}