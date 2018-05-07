const {resolve} = require('path')

module.exports = {
  entry: {
    bundle: resolve(__dirname, './test')
  },
  output: {
    path: resolve(__dirname, './test-dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        use: [
          {
            loader: resolve(__dirname, './index.js'),
            options: {
              name: 'images/[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}