[![npm][npm]][npm-url]

# image-webp-laoder

Your can with webpack-loader to convert ordinary picture format to webp pictures, you can produce **original pictures and webp pictures** together and keep the **same hash**

## Install

```sh
npm install image-webp-laoder --save-dev
```

## Usage

Here is the example of using `image-webp-laoder`, after packaging will produce the original picture and webp picture to the specified path:

```javascript
rules: [
  {
    test: /\.(png|jpe?g)$/i,
    use: [
      {
        loader: 'image-webp-loader',
        options: {
            publicPath: '/',
            outputPath: resolve(__dirname, './dist'),
            name: 'images/[name].[hash].[ext]'
        }
      }
    ]
  }
]
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`name`**|`String`|`[name].[hash].[ext]`|Configure a custom filename template for your file|
|**`publicPath`**|`String`|`'/'`|Configure a custom `public` path for your file, but you should note that there is an interaction with `module.exports.output.publicPath`|
|**`outputPath`**|`String`|`resolve(__dirname, '../../dist')`|Configure a custom `output` path for your file (`distPath`)|
|**`quality`**|`Int`|`100`|Set webp picture compression quality, (`1~100`)|
|**`requestWebp`**|`Boolean`|`false`|Whether to directly request webp pictures|

## License

[MIT](http://opensource.org/licenses/MIT)

[npm]: https://img.shields.io/npm/v/image-webp-loader.svg
[npm-url]: https://npmjs.com/package/image-webp-loader
