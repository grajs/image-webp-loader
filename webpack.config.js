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
        test: /\.txt$/,
        use: [
          {
            loader: resolve(__dirname, './text-loader')
          }
        ]
      },
      {
        test: /\.png/,
        use: [
          {
            loader: resolve(__dirname, './image-loader'),
            options: {
              name: 'assets/images/[name].[hash]-m.[ext]'
            }
          }
        ]
      }
    ]
  }
}